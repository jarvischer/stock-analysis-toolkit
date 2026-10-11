// Stage 2 metrics. Keys are metric names; `card` is the handbook concept ID.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const SAT = require('../../src/finance/core.js');
const F = SAT.fin;
const ok = (v) => typeof v === 'number' && Number.isFinite(v);

export function calc(key, card, end, formula, named, fn) {
  const entries = Object.entries(named);
  const missing = entries.filter(([, f]) => f == null).map(([name]) => name);
  const inputs = entries.filter(([, f]) => f != null).map(([name, f]) => ({
    name, item: f.item ?? name, period_end: f.period_end ?? end, value: f.value,
    ...(f.assumed_zero ? { assumed_zero: true } : {}), ...(f.adjusted ? { adjusted: true } : {}), ...(f.estimate ? { estimate: f.estimate } : {}),
    ...(f.source && typeof f.source === 'string' ? { source: f.source } : {}),
  }));
  if (missing.length) return { key, card, period_end: end, value: null, status: 'not_available', formula, inputs, missing };
  const v = fn(Object.fromEntries(entries.map(([name, f]) => [name, f.value])));
  return { key, card, period_end: end, value: ok(v) ? v : null, status: ok(v) ? 'ok' : 'not_meaningful', formula, inputs };
}

const derived = (item, end, value) => (ok(value) ? { item, period_end: end, value } : null);

// Total debt. LongTermDebt (unlike LongTermDebtNoncurrent) already includes the current part.
// Convertible notes are used only when no long-term debt tag exists, to avoid counting them twice.
export function debtFact(T, end) {
  const lt = T.get('long_term_debt', end), conv = T.get('convertible_debt', end), st = T.get('short_term_debt', end);
  const long = lt ?? conv;
  if (!long) return null;
  const includesCurrent = lt?.tag === 'us-gaap:LongTermDebt';
  const short = includesCurrent ? (st.tag === 'us-gaap:ShortTermBorrowings' ? st.value : 0) : st.value;
  return { item: 'debt', period_end: end, value: long.value + short };
}

// Effective tax rate, limited to 0–35 %. Without data: 21 % (US federal rate), marked as an estimate.
export function taxRate(T, end) {
  const tax = T.get('income_tax', end), pre = T.get('pretax_income', end);
  if (tax && pre && pre.value > 0) return { item: 'tax_rate', period_end: end, value: Math.min(0.35, Math.max(0, tax.value / pre.value)) };
  return { item: 'tax_rate', period_end: end, value: 0.21, estimate: 'US federal rate; no usable effective rate' };
}

// 53-week years are scaled to 364 days for growth rates.
export const annualized = (f) => (f && f.flags.includes('long_year') && f.period_days ? { ...f, value: (f.value * 364) / f.period_days } : f);

function owc(T, end) {
  const r = T.get('receivables', end), i = T.get('inventory', end), p = T.get('payables', end);
  return r && i && p ? { item: 'operating_working_capital', period_end: end, value: r.value + i.value - p.value } : null;
}

function investedCapital(T, end) {
  const eq = T.get('equity', end), debt = debtFact(T, end), cash = T.get('cash_sti', end);
  return eq && debt && cash ? derived('invested_capital', end, eq.value + debt.value - cash.value) : null;
}

export function yearMetrics(facts, T, A) {
  const out = [];
  facts.periods.forEach((end, i) => {
    const prev = i > 0 ? facts.periods[i - 1] : null;
    const g = (item) => T.get(item, end), gp = (item) => (prev ? T.get(item, prev) : null);
    const rev = g('revenue'), ni = g('net_income'), oi = g('operating_income'), ocf = g('ocf'), capex = g('capex');
    const da = g('d_and_a'), tax = taxRate(T, end), debt = debtFact(T, end), cash = g('cash_sti');
    const long = rev?.flags.includes('long_year') || (prev && gp('revenue')?.flags.includes('long_year'));
    const grossProfit = g('gross_profit') ?? (rev && g('cost_of_revenue') ? derived('gross_profit', end, rev.value - g('cost_of_revenue').value) : null);
    const ebitda = oi && da ? derived('ebitda', end, oi.value + da.value) : null;
    const dOwc = prev && owc(T, end) && owc(T, prev) ? derived('change_in_owc', end, owc(T, end).value - owc(T, prev).value) : null;
    const ic = investedCapital(T, end), icPrev = prev ? investedCapital(T, prev) : null;
    const avgIc = ic && icPrev ? derived('average_invested_capital', end, (ic.value + icPrev.value) / 2) : ic;

    out.push(
      calc('revenue-growth', 'revenue', end, 'Revenue / Previous revenue − 1' + (long ? ' (annualized: 53-week year scaled to 364 days)' : ''),
        { revenue: annualized(rev), previous_revenue: prev ? annualized(gp('revenue')) : null }, (v) => v.revenue / v.previous_revenue - 1),
      calc('gross-margin', 'gross-margin', end, 'Gross profit / Revenue', { gross_profit: grossProfit, revenue: rev }, (v) => v.gross_profit / v.revenue),
      calc('operating-margin', 'operating-margin', end, 'Operating income / Revenue', { operating_income: oi, revenue: rev }, (v) => v.operating_income / v.revenue),
      calc('net-margin', 'net-margin', end, 'Net income / Revenue', { net_income: ni, revenue: rev }, (v) => v.net_income / v.revenue),
      calc('fcf', 'fcf', end, 'OCF − CapEx', { ocf, capex }, (v) => v.ocf - Math.abs(v.capex)),
      calc('fcf-margin', 'fcf-margin', end, '(OCF − CapEx) / Revenue', { ocf, capex, revenue: rev }, (v) => (v.ocf - Math.abs(v.capex)) / v.revenue),
      calc('fcff', 'fcff', end, 'OCF + Interest × (1 − Tax rate) − CapEx − SBC', { ocf, capex, interest_expense: g('interest_expense'), tax_rate: tax, sbc: g('sbc') },
        (v) => F.fcff(v.ocf, v.capex, v.interest_expense, v.tax_rate, v.sbc)),
      calc('fcfe', 'fcfe', end, 'Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)',
        { net_income: ni, d_and_a: da, capex, change_in_owc: dOwc, debt_issued: g('debt_issued'), debt_repaid: g('debt_repaid') },
        (v) => v.net_income + v.d_and_a - Math.abs(v.capex) - v.change_in_owc + v.debt_issued - v.debt_repaid),
      calc('owner-earnings', 'owner-earnings', end, `Net income + D&A − Maintenance CapEx (${A.maintenance_capex_ratio} × D&A) − ΔOperating working capital`,
        { net_income: ni, d_and_a: da, change_in_owc: dOwc }, (v) => v.net_income + v.d_and_a - A.maintenance_capex_ratio * v.d_and_a - v.change_in_owc),
      calc('earnings-quality', 'earnings-quality', end, 'OCF / Net income (only when net income > 0)', { ocf, net_income: ni },
        (v) => (v.net_income > 0 ? v.ocf / v.net_income : NaN)),
      calc('ebitda', 'ebitda', end, 'Operating income + D&A', { operating_income: oi, d_and_a: da }, (v) => v.operating_income + v.d_and_a),
      calc('nopat', 'nopat', end, 'Operating income × (1 − Tax rate)', { operating_income: oi, tax_rate: tax }, (v) => F.nopat(v.operating_income, v.tax_rate)),
      calc('invested-capital', 'invested-capital', end, 'Equity + Debt − Cash', { equity: g('equity'), debt, cash_sti: cash }, (v) => v.equity + v.debt - v.cash_sti),
      calc('roic', 'roic', end, 'NOPAT / Average invested capital (only when invested capital > 0)', { operating_income: oi, tax_rate: tax, average_invested_capital: avgIc },
        (v) => (v.average_invested_capital > 0 ? F.nopat(v.operating_income, v.tax_rate) / v.average_invested_capital : NaN)),
      calc('net-debt', 'net-debt', end, 'Debt − Cash', { debt, cash_sti: cash }, (v) => v.debt - v.cash_sti),
      calc('debt-ebitda', 'debt-ebitda', end, 'Debt / EBITDA (only when EBITDA > 0)', { debt, ebitda }, (v) => (v.ebitda > 0 ? v.debt / v.ebitda : NaN)),
      calc('interest-coverage', 'interest-coverage', end, 'Operating income / Interest expense (only when interest > 0)', { operating_income: oi, interest_expense: g('interest_expense') },
        (v) => (v.interest_expense > 0 ? v.operating_income / v.interest_expense : NaN)),
      calc('current-ratio', 'current-ratio', end, 'Current assets / Current liabilities', { current_assets: g('current_assets'), current_liabilities: g('current_liabilities') },
        (v) => v.current_assets / v.current_liabilities),
      calc('tangible-book-value', 'tangible-book-value', end, 'Equity − Preferred − Goodwill − Intangibles',
        { equity: g('equity'), preferred: g('preferred'), goodwill: g('goodwill'), intangibles: g('intangibles') }, (v) => v.equity - v.preferred - v.goodwill - v.intangibles),
      calc('ncav', 'ncav', end, 'Current assets − Total liabilities − Preferred', { current_assets: g('current_assets'), total_liabilities: g('total_liabilities'), preferred: g('preferred') },
        (v) => v.current_assets - v.total_liabilities - v.preferred),
      calc('dilution', 'dilution', end, 'Diluted shares / Previous diluted shares − 1', { diluted_avg_shares: g('diluted_avg_shares'), previous_shares: gp('diluted_avg_shares') },
        (v) => v.diluted_avg_shares / v.previous_shares - 1),
      calc('sbc-to-revenue', 'dilution', end, 'SBC / Revenue', { sbc: g('sbc'), revenue: rev }, (v) => v.sbc / v.revenue),
      calc('eps', 'eps', end, 'Reported diluted EPS', { eps_diluted: g('eps_diluted') }, (v) => v.eps_diluted),
      calc('debt-due-3y', 'refinancing-risk', end, 'Debt maturities in years 1 + 2 + 3', { maturity_y1: g('maturity_y1'), maturity_y2: g('maturity_y2'), maturity_y3: g('maturity_y3') },
        (v) => v.maturity_y1 + v.maturity_y2 + v.maturity_y3),
    );
  });
  return out;
}

export function multiYearMetrics(facts, T, A, perYear) {
  const ends = facts.periods, last = ends[ends.length - 1], out = [];
  if (!ends.length) return out;
  const year = (key, end) => perYear.find((m) => m.key === key && m.period_end === end);
  // 5-year CAGR and the longest available span (with 3 periods: only 2 years; with 10 periods: 5 and 9 years).
  const spans = [...new Set([5, ends.length - 1].filter((n) => n >= 1 && n < ends.length))];
  for (const n of spans) {
    const first = ends[ends.length - 1 - n];
    out.push(calc(`revenue-cagr-${n}`, 'revenue', last, `(Revenue / Revenue ${n} years earlier)^(1/${n}) − 1 (53-week years annualized)`,
      { revenue: annualized(T.get('revenue', last)), first_revenue: annualized(T.get('revenue', first)) },
      (v) => (v.first_revenue > 0 && v.revenue > 0 ? (v.revenue / v.first_revenue) ** (1 / n) - 1 : NaN)));
  }
  const first = ends[0], span = ends.length - 1;
  if (span >= 1) out.push(calc('diluted-shares-change', 'dilution', last, `Diluted shares / Diluted shares ${span} years earlier − 1`,
    { diluted_avg_shares: T.get('diluted_avg_shares', last), first_shares: T.get('diluted_avg_shares', first) }, (v) => v.diluted_avg_shares / v.first_shares - 1));
  const back = Math.min(5, span);
  if (back > 0) {
    const from = ends[ends.length - 1 - back], n1 = year('nopat', last), n0 = year('nopat', from), i1 = year('invested-capital', last), i0 = year('invested-capital', from);
    const val = (m) => (m && m.status === 'ok' ? { item: m.key, period_end: m.period_end, value: m.value } : null);
    out.push(calc(`incremental-roic-${back}`, 'incremental-roic', last, `ΔNOPAT / ΔInvested capital over ${back} years (only when ΔIC > 0)`,
      { nopat: val(n1), first_nopat: val(n0), invested_capital: val(i1), first_invested_capital: val(i0) },
      (v) => (v.invested_capital - v.first_invested_capital > 0 ? (v.nopat - v.first_nopat) / (v.invested_capital - v.first_invested_capital) : NaN)));
  }
  const roics = ends.slice(-A.lookback_years).map((e) => year('roic', e)).filter((m) => m && m.status === 'ok');
  out.push({ key: 'roic-years-above-wacc', card: 'roic', period_end: last, value: roics.filter((m) => m.value > A.wacc).length,
    status: !roics.length ? 'not_available' : roics.length < A.min_roic_years_above_wacc ? 'not_testable' : 'ok', years_available: roics.length,
    formula: `Count of years with ROIC > WACC (${A.wacc}) in the last ${A.lookback_years} years`,
    inputs: roics.map((m) => ({ name: 'roic', item: 'roic', period_end: m.period_end, value: m.value })) });
  const nis = ends.slice(-5).map((e) => T.get('net_income', e));
  out.push(calc('normalized-net-income', 'normalized-earnings', last, `Average net income of the last ${nis.length} years (mid-cycle proxy)`,
    Object.fromEntries(nis.map((f, i) => [`net_income_${i + 1}`, f])), (v) => Object.values(v).reduce((s, x) => s + x, 0) / nis.length));
  return out;
}
