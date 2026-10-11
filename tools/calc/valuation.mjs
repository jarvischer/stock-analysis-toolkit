// Price-based metrics, FCFF DCF scenarios, reverse DCF and margin of safety.
import { createRequire } from 'node:module';
import { calc, debtFact } from './metrics.mjs';
const SAT = createRequire(import.meta.url)('../../src/finance/core.js');
const F = SAT.fin;

const okMetric = (m) => (m && m.status === 'ok' ? { item: m.key, period_end: m.period_end, value: m.value } : null);

function dcfPerShare(fcff0, g, r, tg, years, claims, cash, shares) {
  const d = F.dcfFlows({ flows: F.forecast(fcff0, g, years), r, tg, debt: claims, cash, shares });
  return d.valid ? d.fv : NaN;
}

function impliedGrowth(target, fcff0, r, tg, years, claims, cash, shares) {
  if (!(fcff0 > 0)) return NaN;
  let lo = -0.5, hi = 0.5;
  const f = (g) => dcfPerShare(fcff0, g, r, tg, years, claims, cash, shares) - target;
  if (!(f(lo) < 0 && f(hi) > 0)) return NaN;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) hi = mid; else lo = mid; }
  return (lo + hi) / 2;
}

function revenueDcfPerShare(rev0, g, m0, m1, r, tg, years, claims, cash, shares) {
  const d = F.dcfFlows({ flows: F.revenueFlows(rev0, g, m0, m1, years), r, tg, debt: claims, cash, shares });
  return d.valid ? d.fv : NaN;
}

// Growth that makes a revenue-driven DCF (FCF margin moving from m0 to m1) equal the price.
function impliedRevenueGrowth(target, rev0, m0, m1, r, tg, years, claims, cash, shares) {
  if (!(rev0 > 0 && m1 > 0)) return NaN;
  let lo = -0.5, hi = 2;
  const f = (g) => revenueDcfPerShare(rev0, g, m0, m1, r, tg, years, claims, cash, shares) - target;
  if (!(f(lo) < 0 && f(hi) > 0)) return NaN;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) hi = mid; else lo = mid; }
  return (lo + hi) / 2;
}

export function valuationMetrics(facts, T, A, perYear, multi, price) {
  const ends = facts.periods, lastAnnual = ends[ends.length - 1] ?? null, D = A.dcf;
  // Price-based metrics use the newest balance sheet: the 10-Q one if it is newer than the last annual period.
  const bs = facts.interim && (!lastAnnual || facts.interim.period_end > lastAnnual) ? facts.interim.period_end : lastAnnual;
  const last = lastAnnual ?? bs;
  const year = (key, end = lastAnnual) => perYear.find((m) => m.key === key && m.period_end === end);
  const px = price && Number.isFinite(price.value) ? { item: 'price', period_end: price.date, value: price.value } : null;
  // Shares: the newest count, from the balance sheet or the cover page (dated after the period end).
  const bsShares = T.get('shares_outstanding', bs), cs = facts.cover_shares;
  const coverShares = cs && Number.isFinite(cs.value) ? { item: 'cover_shares_outstanding', period_end: cs.date, value: cs.value } : null;
  const shares = coverShares && (!bsShares || !bs || cs.date > bs) ? coverShares : bsShares;
  const debt = debtFact(T, bs), cash = T.get('cash_sti', bs);
  const minority = T.get('minority_interest', bs), preferred = T.get('preferred', bs);
  const claims = debt ? { item: 'debt_and_other_claims', period_end: bs, value: debt.value + minority.value + preferred.value } : null;
  const mcap = px && shares ? { item: 'market_cap', period_end: bs, value: px.value * shares.value } : null;
  const out = [];

  out.push(
    calc('market-cap', 'market-cap', last, 'Price × Shares outstanding', { price: px, shares_outstanding: shares }, (v) => v.price * v.shares_outstanding),
    calc('enterprise-value', 'enterprise-value', last, 'Market cap + Debt − Cash + Minority interest + Preferred',
      { market_cap: mcap, debt, cash_sti: cash, minority_interest: minority, preferred }, (v) => v.market_cap + v.debt - v.cash_sti + v.minority_interest + v.preferred),
    calc('pe', 'pe', last, 'Market cap / Net income (only when net income > 0)', { market_cap: mcap, net_income: T.get('net_income', last) },
      (v) => (v.net_income > 0 ? v.market_cap / v.net_income : NaN)),
    calc('ev-ebitda', 'ev-ebitda', last, 'EV / EBITDA (only when EBITDA > 0)', { market_cap: mcap, debt, cash_sti: cash, ebitda: okMetric(year('ebitda')) },
      (v) => (v.ebitda > 0 ? (v.market_cap + v.debt - v.cash_sti) / v.ebitda : NaN)),
    calc('fcf-yield', 'fcf-yield', last, 'FCF / Market cap', { fcf: okMetric(year('fcf')), market_cap: mcap }, (v) => v.fcf / v.market_cap),
  );

  const fcffs = ends.slice(-3).map((e) => okMetric(year('fcff', e)));
  const fcff0 = fcffs.length && fcffs.every(Boolean) ? { item: 'fcff0', period_end: last, value: fcffs.reduce((s, f) => s + f.value, 0) / fcffs.length } : null;
  const cagr = multi.find((m) => m.key === 'revenue-cagr-5') ?? multi.find((m) => m.key.startsWith('revenue-cagr-'));
  const baseGrowth = D.base_growth != null
    ? { item: 'base_growth', period_end: last, value: D.base_growth, estimate: 'set in assumptions' }
    : cagr && cagr.status === 'ok' ? { item: 'base_growth', period_end: last, value: Math.min(cagr.value, D.growth_cap) } : null;
  const scenario = { bear: D.growth_delta.bear, base: 0, bull: D.growth_delta.bull };
  const fv = {};
  for (const name of ['bear', 'base', 'bull']) {
    const g = baseGrowth ? { item: 'growth', period_end: last, value: baseGrowth.value + scenario[name] } : null;
    const tg = D.terminal_growth[name];
    fv[name] = calc(`dcf-value-${name}`, 'fair-value-per-share', last,
      `FCFF DCF, ${D.years} years, FCFF0 = 3-year average FCFF, growth = base ${scenario[name] >= 0 ? '+' : '−'} ${Math.abs(scenario[name])}, WACC ${A.wacc}, terminal growth ${tg}`,
      { fcff0, growth: g, debt_and_other_claims: claims, cash_sti: cash, shares_outstanding: shares },
      (v) => (v.fcff0 > 0 ? dcfPerShare(v.fcff0, v.growth, A.wacc, tg, D.years, v.debt_and_other_claims, v.cash_sti, v.shares_outstanding) : NaN));
    out.push(fv[name]);
  }
  out.push(calc('reverse-dcf-growth', 'reverse-dcf', last, `Growth for ${D.years} years that makes the base DCF value equal the price`,
    { price: px, fcff0, debt_and_other_claims: claims, cash_sti: cash, shares_outstanding: shares },
    (v) => impliedGrowth(v.price, v.fcff0, A.wacc, D.terminal_growth.base, D.years, v.debt_and_other_claims, v.cash_sti, v.shares_outstanding)));

  const sourced = (name, a) => (a && Number.isFinite(a.value) ? { item: name, period_end: a.period_end ?? null, value: a.value, source: a.source } : null);
  const rev0 = (lastAnnual && T.get('revenue', lastAnnual)) || sourced('base_revenue', A.base_revenue);
  // Without annual data, stage 2 calculates the current FCF margin from two sourced text facts.
  const margin0 = okMetric(year('fcf-margin')) || (A.base_fcf && rev0 && Number.isFinite(A.base_fcf.value)
    ? { item: 'base_fcf_margin', period_end: A.base_fcf.period_end ?? null, value: A.base_fcf.value / rev0.value, source: A.base_fcf.source } : null);
  const target = Number.isFinite(A.target_fcf_margin) ? { item: 'target_fcf_margin', period_end: last, value: A.target_fcf_margin, estimate: 'analyst assumption' } : null;
  const growthFor = (v) => impliedRevenueGrowth(v.price, v.base_revenue, v.current_fcf_margin, v.target_fcf_margin, A.wacc, D.terminal_growth.base, D.years,
    v.debt_and_other_claims, v.cash_sti, v.shares_outstanding);
  const rr = calc('reverse-dcf-revenue', 'reverse-dcf', last,
    `Year-${D.years} revenue that makes a revenue DCF equal the price (FCF margin moves from current to target; WACC ${A.wacc}; terminal growth ${D.terminal_growth.base})`,
    { price: px, base_revenue: rev0, current_fcf_margin: margin0, target_fcf_margin: target, debt_and_other_claims: claims, cash_sti: cash, shares_outstanding: shares },
    (v) => v.base_revenue * (1 + growthFor(v)) ** D.years);
  if (rr.status === 'ok') rr.implied_growth = growthFor(Object.fromEntries(rr.inputs.map((i) => [i.name, i.value])));
  out.push(rr);

  const normal = multi.find((m) => m.key === 'normalized-net-income');
  out.push(
    calc('earnings-value-per-share', 'normalized-earnings', last, `Normalized net income × ${A.normal_pe} / Shares`,
      { normalized_net_income: okMetric(normal), shares_outstanding: shares }, (v) => (v.normalized_net_income * A.normal_pe) / v.shares_outstanding),
    calc('tbv-per-share', 'tangible-book-value', last, 'Tangible book value / Shares', { tangible_book_value: okMetric(year('tangible-book-value')), shares_outstanding: shares },
      (v) => v.tangible_book_value / v.shares_outstanding),
    calc('ncav-per-share', 'ncav', last, 'NCAV / Shares', { ncav: okMetric(year('ncav')), shares_outstanding: shares }, (v) => v.ncav / v.shares_outstanding),
  );
  for (const name of ['base', 'bear']) {
    out.push(calc(`margin-of-safety-${name}`, 'margin-of-safety', last, `(DCF value ${name} − Price) / DCF value ${name} (only when value > 0)`,
      { value: okMetric(fv[name]), price: px }, (v) => (v.value > 0 ? (v.value - v.price) / v.value : NaN)));
  }
  return out;
}
