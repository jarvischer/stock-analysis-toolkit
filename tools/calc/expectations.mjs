// Price-implied operating outcomes: a family of conditional solutions, not a forecast.
import { forecastScenario, priceForecast, baseRevenue } from './forward.mjs';
const finite = Number.isFinite;
export function solveOperatingGrowth(scenario, capital, price, margin) {
  if (!(price > 0) || !capital || !finite(margin) || margin <= 0 || margin >= 1) return { status: 'not_available' };
  const at = growth => {
    const assumptions = { ...scenario, segments: scenario.segments.map(s => ({ ...s, growth: Array(scenario.years).fill(growth), operating_margin: Array(scenario.years).fill(margin) })) };
    const rows = forecastScenario(assumptions), valuation = priceForecast(rows, assumptions, capital);
    return { assumptions, rows, valuation };
  };
  // Search only the nonnegative-growth interval; reinvestment can make value non-monotonic.
  // Scan for all sign changes and report ambiguity instead of silently choosing a root.
  const brackets = []; let left = 0, prior = at(left).valuation?.value_per_share;
  for (let k = 1; k <= 200; k++) {
    const right = k / 100, next = at(right).valuation?.value_per_share;
    if (finite(prior) && prior === price) brackets.push([left, left]);
    else if (finite(prior) && finite(next) && (prior - price) * (next - price) < 0) brackets.push([left, right]);
    left = right; prior = next;
  }
  if (prior === price) brackets.push([2, 2]);
  if (!brackets.length) return { status: 'no_solution_in_range', growth_bounds: [0, 2] };
  if (brackets.length > 1) return { status: 'multiple_solutions', brackets };
  let [lo, hi] = brackets[0];
  for (let n = 0; n < 100; n++) {
    const mid = (lo + hi) / 2;
    if ((at(lo).valuation.value_per_share - price) * (at(mid).valuation.value_per_share - price) <= 0) hi = mid; else lo = mid;
  }
  const growth = (lo + hi) / 2, out = at(growth);
  return { status: 'ok', growth, ...out, pricing_error: out.valuation.value_per_share - price };
}
export function operatingExpectations(A, comparison, price) {
  const config = A.operating_expectations;
  if (!config) return { status: 'not_configured', cases: [] };
  const central = comparison.forward.find(s => s.id === config.scenario_id);
  if (!central) throw new Error('operating_expectations.scenario_id must name a forward model');
  if (!Array.isArray(config.margins) || !config.margins.length || config.margins.length > 7 || config.margins.some(m => !finite(m) || m <= 0 || m >= 1)) throw new Error('operating_expectations.margins requires 1–7 margins in (0,1)');
  if (!Array.isArray(config.target_years) || !config.target_years.length || config.target_years.length > 10 || config.target_years.some(y => !Number.isInteger(y))) throw new Error('operating_expectations.target_years must contain 1–10 calendar years');
  const s = central.assumptions, baseDate = s.segments[0].base_revenue.period_end, baseYear = Number(baseDate.slice(0, 4));
  if (config.target_years.some(y => y <= baseYear || y > baseYear + s.years)) throw new Error('operating_expectations target years must fall inside the forecast horizon');
  const baseRevenueTotal = s.segments.reduce((n, seg) => n + baseRevenue(seg), 0);
  const cases = config.margins.map(margin => {
    const solution = central.status === 'not_suitable' ? { status: 'not_suitable' } : solveOperatingGrowth(s, comparison.capital, price?.value, margin);
    return { assumed_segment_operating_margin: margin, status: solution.status, required_revenue_cagr: solution.growth ?? null,
      pricing_error: solution.pricing_error ?? null, valuation: solution.valuation ?? null,
      milestones: config.target_years.map(year => {
        const row = solution.rows?.[year - baseYear - 1];
        return { year, period_end: `${year}${baseDate.slice(4)}`, revenue: row?.revenue ?? null, operating_margin: row?.revenue > 0 ? row.operating_income / row.revenue : null, fcff: row?.fcff ?? null,
          operating_income: row?.operating_income ?? null, reinvestment: row?.reinvestment ?? null, segments: row?.segments ?? [] };
      }), rows: solution.rows || [] };
  });
  return { status: 'configured', scenario_id: s.id, base_date: baseDate, base_revenue: baseRevenueTotal, capital: comparison.capital,
    assumptions: { wacc: s.wacc, tax_rate: s.tax_rate, terminal_growth: s.terminal_growth, terminal_roic: s.terminal_roic, years: s.years, price, margins: config.margins },
    definition: 'For each assumed segment operating margin, solve a common constant revenue growth rate that reprices the entire DCF to the supplied price. This consolidated hurdle holds the starting segment revenue mix fixed; it is not the AI-led central forecast. Capital intensity, working capital, corporate costs, discount rate and terminal reinvestment are held to the referenced model. Each row is a different conditional path; revenue, margin and FCFF cannot be solved independently from one price.',
    period_note: 'Milestones are rolling twelve-month periods ending on the base month/day, not fiscal-year forecasts. The terminal value starts only after the full forecast horizon; 2030 is not treated as a separate exit.', cases };
}

export function selectCentralModel(A, comparison) {
  const c = A.investment_classification;
  if (!c) return { status: 'not_classified', value_per_share: null, reason: 'Business classification and an explicit model selection are required; style labels alone do not select a valuation.' };
  if (!c.business_profile?.trim() || !c.investment_lens?.trim() || !c.reason?.trim() || !Array.isArray(c.evidence) || !c.evidence.length || c.evidence.some(e => !e.source?.trim() || !e.finding?.trim())) throw new Error('investment_classification requires business profile, lens, reason and sourced evidence');
  const selected = comparison.forward.find(s => s.id === c.central_scenario_id);
  if (!selected) throw new Error('investment_classification.central_scenario_id must name a forward model');
  return { status: selected.status === 'ok' ? 'provisional_estimate' : selected.status, ...c, value_per_share: selected.value_per_share, method: 'Explicit segment FCFF DCF',
    distinction: 'Business profile determines model suitability. Investment lens does not set growth or margins. Valuation is conditional on the explicit operating forecast; the policy result is a separate investment screen. GARP is a price discipline, not an intrinsic company category.' };
}
