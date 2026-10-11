// Explicit operating forecasts. Styles are labels for documented assumptions, never automatic growth premiums.
const finite = Number.isFinite;
const fail = message => { throw new Error(`forward_scenarios: ${message}`); };
const cited = a => a && typeof a.source === 'string' && a.source.trim() && typeof a.reason === 'string' && a.reason.trim();
const bounded = (v, lo, hi) => finite(v) && v >= lo && v <= hi;
const date = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v;
export const STYLES = ['value', 'growth', 'garp', 'quality'];

export function baseRevenue(segment) {
  const base = segment.base_revenue;
  if (!base || !date(base.period_end) || !Array.isArray(base.components) || !base.components.length) fail('each segment needs dated, sourced base_revenue components');
  const seen = new Set();
  const value = base.components.reduce((sum, c) => {
    const key = `${c.item}|${c.period_end ?? base.period_end}`;
    if (!c.item || !date(c.period_end ?? base.period_end) || !finite(c.value) || ![1, -1].includes(c.sign) || typeof c.source !== 'string' || !c.source.trim() || seen.has(key))
      fail('base revenue components need unique items, finite values, sign ±1 and source');
    seen.add(key); return sum + c.sign * c.value;
  }, 0);
  if (!(value > 0)) fail('segment base revenue must be positive');
  return value;
}

export function validateForward(scenarios = []) {
  if (!Array.isArray(scenarios) || scenarios.length > 12) fail('expected at most 12 explicit scenarios');
  const names = new Set();
  for (const s of scenarios) {
    if (!s || !/^[a-z][a-z0-9-]{0,39}$/.test(s.id || '') || names.has(s.id) || !STYLES.includes(s.style) || !cited(s)) fail('scenario needs a unique id, style, source and reason');
    names.add(s.id);
    if (!Number.isInteger(s.years) || s.years < 1 || s.years > 30) fail('forecast years must be 1–30');
    if (!bounded(s.tax_rate, 0, 0.99) || !bounded(s.wacc, 0.001, 1) || !bounded(s.terminal_growth, 0, 0.1) ||
      !bounded(s.terminal_roic, 0.001, 1) || s.wacc <= s.terminal_growth || s.terminal_roic <= s.terminal_growth) fail('require valid tax, WACC > terminal growth, and terminal ROIC > terminal growth');
    if (s.sbc_treatment !== 'expensed_in_margins') fail('SBC must already be expensed in operating margins/corporate costs; do not subtract it twice');
    if (!Array.isArray(s.corporate_costs) || s.corporate_costs.length !== s.years || s.corporate_costs.some(v => !finite(v) || v < 0)) fail('each year needs explicit nonnegative unallocated corporate costs (zero must be intentional)');
    if (!Array.isArray(s.segments) || !s.segments.length || s.segments.length > 12) fail('provide 1–12 non-overlapping segments');
    const segments = new Set(), dates = new Set();
    for (const seg of s.segments) {
      if (!seg.name || segments.has(seg.name)) fail('segment names must be distinct');
      segments.add(seg.name); baseRevenue(seg); dates.add(seg.base_revenue.period_end);
      if (!bounded(seg.base_working_capital_ratio, 0, 5)) fail('provide a base operating working capital ratio for every segment');
      for (const [key, lo, hi] of [['growth', -0.99, 5], ['operating_margin', -1, 1], ['depreciation_to_revenue', 0, 5], ['capex_to_revenue', 0, 5], ['working_capital_to_revenue', 0, 5]]) {
        if (!Array.isArray(seg[key]) || seg[key].length !== s.years || seg[key].some(v => !bounded(v, lo, hi))) fail(`${key} must have ${s.years} valid annual assumptions`);
      }
    }
    if (dates.size !== 1) fail('segment base dates must match');
  }
}

export function forecastScenario(s, growthDelta = 0) {
  const previous = s.segments.map(seg => ({ revenue: baseRevenue(seg), wc: baseRevenue(seg) * seg.base_working_capital_ratio }));
  const rows = [];
  for (let y = 0; y < s.years; y++) {
    const segments = s.segments.map((seg, i) => {
      const revenue = previous[i].revenue * (1 + seg.growth[y] + growthDelta);
      if (!(revenue >= 0)) return null;
      const working_capital = revenue * seg.working_capital_to_revenue[y], change_in_working_capital = working_capital - previous[i].wc;
      previous[i] = { revenue, wc: working_capital };
      return { name: seg.name, revenue, operating_income: revenue * seg.operating_margin[y], depreciation: revenue * seg.depreciation_to_revenue[y], capex: revenue * seg.capex_to_revenue[y], change_in_working_capital };
    });
    if (segments.some(v => v == null)) return null;
    const sum = key => segments.reduce((total, seg) => total + seg[key], 0);
    const operating_income = sum('operating_income') - s.corporate_costs[y];
    const taxes = Math.max(0, operating_income) * s.tax_rate; // no assumed tax refund on forecast losses
    const nopat = operating_income - taxes, depreciation = sum('depreciation'), capex = sum('capex'), change_in_working_capital = sum('change_in_working_capital');
    rows.push({ year: y + 1, segments, revenue: sum('revenue'), corporate_costs: s.corporate_costs[y], operating_income, taxes, nopat, depreciation, capex, change_in_working_capital,
      reinvestment: capex - depreciation + change_in_working_capital, fcff: nopat + depreciation - capex - change_in_working_capital });
  }
  return rows;
}

export function priceForecast(rows, s, capital) {
  if (!rows || !capital || !(capital.shares > 0) || s.wacc <= s.terminal_growth || s.terminal_roic <= s.terminal_growth) return null;
  const last = rows.at(-1), nextOperatingIncome = last.operating_income * (1 + s.terminal_growth);
  const nextNopat = nextOperatingIncome - Math.max(0, nextOperatingIncome) * s.tax_rate;
  if (!(nextNopat > 0)) return null;
  const terminal_reinvestment_rate = s.terminal_growth / s.terminal_roic;
  const terminal_fcff = nextNopat * (1 - terminal_reinvestment_rate);
  const terminal_value = terminal_fcff / (s.wacc - s.terminal_growth);
  const pv_terminal_value = terminal_value / (1 + s.wacc) ** rows.length;
  const pv_flows = rows.reduce((sum, row) => sum + row.fcff / (1 + s.wacc) ** row.year, 0);
  const enterprise_value = pv_flows + pv_terminal_value, equity_value = enterprise_value - capital.claims + capital.cash;
  const value_per_share = equity_value / capital.shares;
  if (![value_per_share, enterprise_value, terminal_value].every(finite)) return null;
  return { value_per_share, enterprise_value, equity_value, pv_flows, terminal_value, pv_terminal_value, terminal_fcff, terminal_reinvestment_rate,
    terminal_value_share: enterprise_value > 0 ? pv_terminal_value / enterprise_value : null };
}
