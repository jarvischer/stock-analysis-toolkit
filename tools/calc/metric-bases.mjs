// Reported/adjusted annual metrics remain separate from trailing and normalized estimates.
import { calc } from './metrics.mjs';
const number = Number.isFinite;
const input = (item, value, period_end, extra = {}) => number(value) ? { item, value, period_end, ...extra } : null;

export function validateNormalization(A) {
  const n = A.normalization;
  if (n == null) return;
  const t = n.tax_rate;
  if (t != null && (!number(t.value) || t.value < 0 || t.value >= 1 || !t.reason?.trim() || !t.source?.trim()))
    throw new Error('normalization.tax_rate requires value in [0, 1), reason and source');
  const c = n.maintenance_capex;
  if (c != null && (!['reported_capex', 'depreciation', 'amount'].includes(c.method) || !c.reason?.trim() || !c.source?.trim() ||
    (c.method === 'amount' && (!number(c.value) || c.value < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(c.period_end || '')))))
    throw new Error('normalization.maintenance_capex requires an explicit method, reason, source and a dated nonnegative amount when method=amount');
}

export function basisMetrics(facts, A, annual, priceMetrics) {
  validateNormalization(A);
  const last = facts.periods.at(-1), out = [];
  const annualFact = (item, end) => facts.facts.find(f => f.item === item && f.period_end === end && f.value != null);
  const annualMetric = (key, end) => annual.find(m => m.key === key && m.period_end === end && m.status === 'ok');
  const market = priceMetrics.find(m => m.key === 'market-cap');
  const cap = market?.status === 'ok' ? input('market-cap', market.value, market.inputs.find(i => i.name === 'price')?.period_end) : null;
  const periods = [{ name: 'annual', end: last, rows: facts.facts.filter(f => f.period_end === last) }];
  if (facts.ttm) periods.push({ name: 'ttm', end: facts.ttm.period_end, rows: facts.ttm.facts });
  for (const p of periods) {
    if (!p.end) continue;
    const g = item => { const f = p.rows.find(f => f.item === item && f.value != null); return f ? { ...f, source: JSON.stringify(f.source) } : null; };
    const effective = calc(`reported-tax-rate-${p.name}`, 'nopat', p.end, 'Income tax expense / Pretax income (unclipped; positive pretax income required)',
      { income_tax: g('income_tax'), pretax_income: g('pretax_income') }, v => v.pretax_income > 0 ? v.income_tax / v.pretax_income : NaN);
    effective.basis = 'reported'; effective.period_basis = p.name; out.push(effective);
    if (p.name === 'ttm') {
      const tax = effective.status === 'ok' ? input('tax_rate', Math.min(0.35, Math.max(0, effective.value)), p.end,
        { estimate: 'Legacy cash-flow tax shield proxy, clipped to 0–35%; not normalized cash taxes' }) : null;
      const add = (key, card, formula, inputs, fn) => {
        const m = calc(`ttm-${key}`, card, p.end, formula, inputs, fn); m.basis = 'reported'; m.period_basis = 'ttm'; out.push(m); return m;
      };
      const rev = add('revenue', 'revenue', 'Annual revenue + current YTD - prior YTD', { revenue: g('revenue') }, v => v.revenue);
      add('net-income', 'net-income', 'Annual net income + current YTD - prior YTD', { net_income: g('net_income') }, v => v.net_income);
      const fcf = add('fcf', 'fcf', 'TTM OCF - |TTM CapEx|', { ocf: g('ocf'), capex: g('capex') }, v => v.ocf - Math.abs(v.capex));
      add('fcff', 'fcff', 'TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized',
        { ocf: g('ocf'), interest: g('interest_expense'), tax, capex: g('capex'), sbc: g('sbc') },
        v => v.ocf + Math.abs(v.interest) * (1 - v.tax) - Math.abs(v.capex) - Math.abs(v.sbc));
      const ebitda = add('ebitda', 'ebitda', 'TTM operating income + complete TTM D&A', { operating_income: g('operating_income'), d_and_a: g('d_and_a') }, v => v.operating_income + v.d_and_a);
      add('pe', 'pe', 'Market cap / TTM net income (positive earnings required)', { market_cap: cap, net_income: g('net_income') }, v => v.net_income > 0 ? v.market_cap / v.net_income : NaN);
      const result = m => m.status === 'ok' ? input(m.key, m.value, m.period_end) : null;
      add('fcf-margin', 'fcf-margin', 'TTM FCF / TTM revenue', { fcf: result(fcf), revenue: result(rev) }, v => v.revenue > 0 ? v.fcf / v.revenue : NaN);
      add('fcf-yield', 'fcf-yield', 'TTM FCF / market cap', { fcf: result(fcf), market_cap: cap }, v => v.market_cap > 0 ? v.fcf / v.market_cap : NaN);
      const ev = priceMetrics.find(m => m.key === 'enterprise-value');
      add('ev-ebitda', 'ev-ebitda', 'Latest EV / complete TTM EBITDA', { ev: ev?.status === 'ok' ? input('enterprise-value', ev.value, ev.period_end) : null, ebitda: result(ebitda) }, v => v.ebitda > 0 ? v.ev / v.ebitda : NaN);
    }
    const norm = A.normalization, tax = norm?.tax_rate;
    const nt = tax ? input('normalized_tax_rate', tax.value, p.end, { source: tax.source, estimate: tax.reason }) : null;
    const addNorm = (key, card, formula, inputs, fn) => {
      const m = calc(`normalized-${key}-${p.name}`, card, p.end, formula, inputs, fn);
      m.basis = 'normalized'; m.period_basis = p.name; out.push(m); return m;
    };
    addNorm('tax-rate', 'nopat', 'Explicit normalized tax assumption; never replaces the reported tax rate', { normalized_tax_rate: nt }, v => v.normalized_tax_rate);
    addNorm('nopat', 'nopat', 'Operating income × (1 - normalized tax rate)', { operating_income: g('operating_income'), tax: nt }, v => v.operating_income * (1 - v.tax));
    // Annual ΔOWC is observable; for TTM use a dated balance sheet one year before the interim end.
    let owc = null, averageIC = null;
    if (p.name === 'annual') {
      const oe = annualMetric('owner-earnings', p.end);
      const delta = oe?.inputs.find(i => i.name === 'change_in_owc') ?? annual.find(m => m.key === 'fcfe' && m.period_end === p.end)?.inputs.find(i => i.name === 'change_in_owc');
      owc = delta ? input('change_in_owc', delta.value, p.end) : null;
      const ic = annualMetric('roic', p.end)?.inputs.find(i => i.name === 'average_invested_capital');
      averageIC = ic ? input('average_invested_capital', ic.value, p.end) : null;
    } else {
      const sheets = facts.ttm.balance_sheets || [];
      const values = end => {
        const rows = sheets.filter(f => f.period_end === end);
        const get = item => rows.find(f => f.item === item && number(f.value));
        const ar = get('receivables'), inv = get('inventory'), ap = get('payables');
        const eq = get('equity'), cash = get('cash_sti'), lt = get('long_term_debt'), st = get('short_term_debt');
        return { owc: ar && inv && ap ? ar.value + inv.value - ap.value : null,
          ic: eq && cash && lt && st ? eq.value + lt.value + (lt.source?.tag === 'us-gaap:LongTermDebt' && st.source?.tag !== 'us-gaap:ShortTermBorrowings' ? 0 : st.value) - cash.value : null };
      };
      const current = values(p.end), prior = values(facts.ttm.prior_ytd_end);
      owc = number(current.owc) && number(prior.owc) ? input('change_in_owc', current.owc - prior.owc, p.end) : null;
      averageIC = number(current.ic) && number(prior.ic) && current.ic > 0 && prior.ic > 0 ? input('average_invested_capital', (current.ic + prior.ic) / 2, p.end) : null;
    }
    addNorm('roic', 'roic', 'Operating income × (1 - normalized tax rate) / average invested capital',
      { operating_income: g('operating_income'), tax: nt, average_invested_capital: averageIC }, v => v.average_invested_capital > 0 ? v.operating_income * (1 - v.tax) / v.average_invested_capital : NaN);
    addNorm('fcff', 'fcff', 'Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income',
      { operating_income: g('operating_income'), tax: nt, d_and_a: g('d_and_a'), capex: g('capex'), change_in_owc: owc },
      v => v.operating_income * (1 - v.tax) + v.d_and_a - Math.abs(v.capex) - v.change_in_owc);
    const mc = norm?.maintenance_capex;
    const maintenance = !mc ? null : mc.method === 'amount' ? (mc.period_end === p.end ? input('maintenance_capex', mc.value, p.end, { estimate: mc.reason, source: mc.source }) : null)
      : g(mc.method === 'depreciation' ? 'depreciation' : 'capex');
    addNorm('owner-earnings', 'owner-earnings', 'Net income + reported tax - pretax income × normalized tax + D&A - explicit maintenance CapEx - ΔOperating working capital',
      { net_income: g('net_income'), reported_tax: g('income_tax'), pretax_income: g('pretax_income'), tax: nt, d_and_a: g('d_and_a'), maintenance_capex: maintenance, change_in_owc: owc },
      v => v.net_income + v.reported_tax - v.pretax_income * v.tax + v.d_and_a - Math.abs(v.maintenance_capex) - v.change_in_owc);
  }
  return out;
}
