import { assessValuation } from './valuation-assessment.mjs';
import { perShareEconomics } from './per-share.mjs';
import { operatingExpectations, selectCentralModel } from './expectations.mjs';
import { businessReview } from './business-review.mjs';
import { createRequire } from 'node:module';
import { validateForward, baseRevenue, forecastScenario, priceForecast } from './forward.mjs';
const F = createRequire(import.meta.url)('../../src/finance/core.js').fin;
const finite = Number.isFinite;
const metric = (rows, key) => rows.find(m => m.key === key);
const good = m => m?.status === 'ok' && finite(m.value) ? m.value : null;
const result = (value, price) => ({ value_per_share: value, margin_of_safety: value > 0 && price > 0 ? (value - price) / value : null,
  price_to_value: value > 0 && price > 0 ? price / value : null, gap_to_price: price > 0 && finite(value) ? value / price - 1 : null });

export function constantValue(start, growth, wacc, tg, years, capital) {
  if (!(start > 0) || !capital) return null;
  const d = F.dcfFlows({ flows: F.forecast(start, growth, years), r: wacc, tg, debt: capital.claims, cash: capital.cash, shares: capital.shares });
  return d.valid && finite(d.fv) ? d.fv : null;
}
export function requiredGrowth(start, price, wacc, tg, years, capital) {
  if (!(start > 0 && price > 0) || !capital) return null;
  let lo = -0.5, hi = 1.5;
  const at = g => constantValue(start, g, wacc, tg, years, capital);
  const a = at(lo), b = at(hi);
  if (!finite(a) || !finite(b) || !(a <= price && b >= price)) return null;
  for (let n = 0; n < 120; n++) { const mid = (lo + hi) / 2; if (at(mid) > price) hi = mid; else lo = mid; }
  return (lo + hi) / 2;
}

export function valuationComparison(facts, A, metrics, price) {
  const scenarios = A.forward_scenarios || []; validateForward(scenarios);
  const last = facts.periods.at(-1), dcf = metric(metrics, 'dcf-value-base');
  const inp = name => dcf?.inputs.find(i => i.name === name);
  const capValues = ['shares_outstanding', 'debt_and_other_claims', 'cash_sti'].map(n => inp(n)?.value);
  const capital = capValues.every(finite) && capValues[0] > 0 ? { shares: capValues[0], claims: capValues[1], cash: capValues[2],
    shares_date: inp('shares_outstanding').period_end, balance_sheet_date: inp('cash_sti').period_end } : null;
  const px = price?.value, D = A.dcf;
  const growth = inp('growth')?.value ?? D.base_growth ?? null;
  const bases = [
    { id: 'historical-average', label: 'Historical three-year FCFF average (policy)', value: inp('fcff0')?.value ?? null, period_end: last, basis: 'historical_average', definition: 'Legacy cash-flow FCFF averaged over available last three annual periods; not tax-normalized' },
    { id: 'latest-annual', label: 'Latest annual FCFF', value: good(metric(metrics.filter(m => m.period_end === last), 'fcff')), period_end: last, basis: metric(metrics.filter(m => m.period_end === last), 'fcff')?.basis ?? 'reported', definition: 'OCF + after-tax interest - CapEx - SBC (legacy cash-flow definition); uses documented adjustments when configured' },
    ...['ttm-fcff', 'normalized-fcff-annual', 'normalized-fcff-ttm'].map(key => ({ id: key, label: key, value: good(metric(metrics, key)), period_end: metric(metrics, key)?.period_end ?? null,
      basis: key.startsWith('normalized') ? 'normalized' : 'reported', definition: metric(metrics, key)?.formula ?? 'Unavailable: missing matched trailing periods or explicit normalization assumptions' })),
  ];
  const unsuitable = facts.company.model_fit === 'not_suitable';
  for (const b of bases) {
    b.required_growth = unsuitable ? null : requiredGrowth(b.value, px, A.wacc, D.terminal_growth.base, D.years, capital);
    b.status = finite(b.value) ? 'ok' : 'not_available';
    b.reverse_dcf_note = 'Conditional on this starting cash flow, discount rate, terminal growth, forecast horizon and capital claims; not a direct observation of market expectations.';
  }
  const comparisons = [{ id: 'policy', style: 'value', status: unsuitable ? 'not_suitable' : dcf?.status ?? 'not_available',
    label: 'Conservative policy model', starting_basis: 'historical-average', ...result(good(dcf), px), assumptions: { wacc: A.wacc, years: D.years, growth, terminal_growth: D.terminal_growth.base } }];
  const forward = [], extraMetrics = [];
  for (const s of scenarios) {
    const baseDate = s.segments[0].base_revenue.period_end;
    const consolidated = [...facts.facts, ...(facts.ttm?.facts || [])].find(f => f.item === 'revenue' && f.period_end === baseDate && finite(f.value))?.value ?? s.consolidated_revenue?.value;
    const total = s.segments.reduce((sum, seg) => sum + baseRevenue(seg), 0);
    if (!finite(consolidated) || Math.abs(total - consolidated) > 1e-9 * Math.max(1, Math.abs(consolidated)))
      throw new Error(`forward_scenarios: ${s.id} segment bases must reconcile to sourced consolidated revenue`);
    const rows = unsuitable ? null : forecastScenario(s), valuation = rows ? priceForecast(rows, s, capital) : null;
    const entry = { id: s.id, style: s.style, status: unsuitable ? 'not_suitable' : valuation ? 'ok' : 'not_available', label: s.id,
      starting_basis: 'explicit_segment_forecast', ...result(valuation?.value_per_share ?? null, px), assumptions: s };
    comparisons.push(entry);
    forward.push({ ...entry, rows: rows || [], valuation, explanation: 'FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.' });
    bases.push({ id: `forward-${s.id}`, label: `Year-one FCFF: ${s.id}`, basis: 'forward', value: rows?.[0]?.fcff ?? null, period_end: s.segments[0].base_revenue.period_end,
      status: rows ? 'ok' : 'not_available', required_growth: null, definition: 'Explicit year-one segment forecast, not a historical starting cash flow' });
    extraMetrics.push({ key: `forward-${s.id}-value`, card: 'fair-value-per-share', period_end: s.segments[0].base_revenue.period_end,
      value: valuation?.value_per_share ?? null, status: entry.status, basis: 'forward', formula: 'PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares', inputs: [], estimate: s.reason, source: s.source });
  }
  for (const style of ['growth', 'garp', 'quality']) if (!scenarios.some(s => s.style === style)) comparisons.push({ id: style, style, status: 'not_configured', label: style,
    value_per_share: null, margin_of_safety: null, price_to_value: null, gap_to_price: null, reason: 'Requires sourced segment bases and explicit growth, operating margin, tax and reinvestment assumptions; no style premium is generated automatically.' });
  const grid = A.sensitivity ?? { wacc: [A.wacc - 0.02, A.wacc, A.wacc + 0.02], growth: finite(growth) ? [growth - 0.05, growth, growth + 0.05] : [0.05, 0.10, 0.15], terminal_growth: [0.02, 0.025, 0.03] };
  for (const key of ['wacc', 'growth', 'terminal_growth']) {
    if (!Array.isArray(grid[key]) || !grid[key].length || grid[key].length > 5 || grid[key].some(v => !finite(v) || (key === 'growth' ? v <= -1 || v > 5 : v < 0 || v > 1))) throw new Error(`sensitivity.${key} must contain 1–5 finite rates in range`);
  }
  const sensitivity = [];
  for (const b of bases.filter(b => b.basis !== 'forward')) for (const wacc of grid.wacc) for (const g of grid.growth) for (const tg of grid.terminal_growth) {
    const value = unsuitable ? null : constantValue(b.value, g, wacc, tg, D.years, capital);
    sensitivity.push({ basis: b.id, wacc, growth: g, terminal_growth: tg, value_per_share: value, status: value == null ? 'not_available' : 'ok' });
  }
  const forwardSensitivity = [];
  for (const s of scenarios) for (const wacc of grid.wacc) for (const growth_delta of [-0.02, 0, 0.02]) for (const terminal_growth of grid.terminal_growth) {
    const valuation = unsuitable ? null : priceForecast(forecastScenario(s, growth_delta), { ...s, wacc, terminal_growth }, capital);
    forwardSensitivity.push({ scenario: s.id, wacc, growth_delta, terminal_growth, value_per_share: valuation?.value_per_share ?? null, status: valuation ? 'ok' : 'not_available' });
  }
  const comparison = { version: 1, price, capital, profile: {
    model_fit: facts.company.model_fit, evidence_years: facts.periods.length, ttm_available: !!facts.ttm,
    revenue_growth_above_policy_cap: good(metric(metrics, 'revenue-cagr-5')) > D.growth_cap,
    unusual_latest_tax_rate: (() => { const v = good(metric(metrics, 'reported-tax-rate-annual')); return v != null && (v <= 0 || v > 0.35); })(),
    limitations: ['Investment styles label documented scenarios; they do not change the conservative policy verdict.', 'Forward margins must include stock compensation and all unallocated corporate costs.', 'Normalization is an estimate and remains separate from reported and adjusted metrics.'] },
    normalization: A.normalization ?? null, cash_flow_bases: bases, comparisons, forward, sensitivity, forward_sensitivity: forwardSensitivity,
    sensitivity_note: 'Historical sensitivity varies constant FCFF growth. Forward sensitivity shifts every segment annual revenue growth by -2, 0 or +2 percentage points while recalculating reinvestment.' };
  comparison.central_model = selectCentralModel(A, comparison);
  comparison.operating_expectations = operatingExpectations(A, comparison, price);
  comparison.business_review = businessReview(facts, A, metrics);
  comparison.assessment = assessValuation(A, comparison);
  comparison.per_share_economics = perShareEconomics(facts, A, metrics, forward);
  return { extraMetrics, comparison };
}
