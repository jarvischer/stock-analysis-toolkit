import { renderAssessment } from './assessment-report.mjs';
// Readable valuation output generated from metrics.json; no new finance arithmetic here.
import { exportExpectations } from './export-expectations.mjs';
import { renderOperatingReview } from './operating-report.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { parseArgs } from 'node:util';
const money = n => Number.isFinite(n) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n) : 'Not available';
const pct = n => Number.isFinite(n) ? new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(n) : 'Not available';
const esc = v => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const table = (headers, rows) => ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...rows.map(row => '| ' + row.map(esc).join(' | ') + ' |')].join('\n') + '\n\n';
export function renderComparison(metrics, analysis = {}) {
  const v = metrics.valuation;
  if (!v) throw new Error('Run sat calc first to produce a valuation comparison');
  let text = `# ${metrics.company.ticker}: valuation comparison\n\nPrice: ${money(metrics.price?.value)} on ${metrics.price?.date ?? 'not supplied'}.\n\nThese are conditional model estimates, not price targets. The conservative policy verdict is separate from the forward scenarios. Missing models are not assigned an invented value.\n\n`;
  text += renderAssessment(v, analysis.result);
  text += renderOperatingReview(v);
  text += '## Models side by side\n\n' + table(['Model', 'Style', 'Status', 'Value/share', 'Price/value', 'Value gap / price', 'Margin of safety'], v.comparisons.map(c => [c.label, c.style, c.status, money(c.value_per_share), Number.isFinite(c.price_to_value) ? c.price_to_value.toFixed(2) + '×' : '—', pct(c.gap_to_price), pct(c.margin_of_safety)]));
  text += 'Value gap uses price as the denominator; margin of safety uses model value. Neither percentage predicts an investment return.\n\n';
  text += '## Cash-flow bases and conditional reverse DCF\n\n' + table(['Starting point', 'Basis/date', 'FCFF', 'Required annual growth'], v.cash_flow_bases.map(b => [b.label, `${b.basis}; ${b.period_end ?? '—'}`, money(b.value), pct(b.required_growth)]));
  text += 'Required growth depends on the selected cash-flow base, WACC, terminal growth, capital claims and forecast horizon. It is not a direct measure of what the market expects. Year-one forward FCFF is a forecast, not a historical starting point.\n\n';
  for (const b of v.cash_flow_bases) text += `- **${b.label}:** ${b.definition}\n`;
  text += '\n## Reported, TTM and normalized metrics\n\n';
  const rows = metrics.metrics.filter(m => m.key.startsWith('ttm-') || m.key.startsWith('normalized-') && !['normalized-net-income'].includes(m.key) || m.key.startsWith('reported-tax-rate-'));
  text += table(['Metric', 'Date', 'Basis', 'Value', 'Status'], rows.map(m => [m.key, m.period_end, m.basis, /tax-rate|roic|margin|yield/.test(m.key) ? pct(m.value) : m.key.endsWith('-pe') || m.key.endsWith('-ev-ebitda') ? m.value?.toFixed(2) ?? 'Not available' : money(m.value), m.status]));
  text += 'Normalized metrics use reported inputs and explicit normalization estimates. They do not overwrite reported or manually adjusted metrics. The legacy owner-earnings calculation still uses its policy proxy; the normalized version requires an explicit maintenance-capital method.\n\n';
  text += '### Normalization assumptions\n\n```json\n' + JSON.stringify(v.normalization, null, 2) + '\n```\n\n';
  for (const s of v.forward) {
    text += `## Forward scenario: ${s.id} (${s.style})\n\n**Reason:** ${s.assumptions.reason}\n\n**Source / assumption basis:** ${s.assumptions.source}\n\n${s.explanation}\n\n`;
    text += table(['Year', 'Revenue', 'Operating profit', 'Tax estimate', 'D&A', 'CapEx', 'Δ working capital', 'FCFF'], s.rows.map(r => [r.year, money(r.revenue), money(r.operating_income), money(r.taxes), money(r.depreciation), money(r.capex), money(r.change_in_working_capital), money(r.fcff)]));
    text += `Terminal reinvestment rate: ${pct(s.valuation?.terminal_reinvestment_rate)}. Terminal value share of enterprise value: ${pct(s.valuation?.terminal_value_share)}.\n\n`;
    text += '<details><summary>All scenario assumptions and source components</summary>\n\n```json\n' + JSON.stringify(s.assumptions, null, 2) + '\n```\n\n</details>\n\n';
  }
  text += '## Sensitivity analysis\n\n' + v.sensitivity_note + '\n\n';
  text += '<details><summary>Historical and normalized cash-flow sensitivity</summary>\n\n' + table(['Basis', 'WACC', 'FCFF growth', 'Terminal growth', 'Value/share'], v.sensitivity.map(s => [s.basis, pct(s.wacc), pct(s.growth), pct(s.terminal_growth), money(s.value_per_share)])) + '</details>\n\n';
  text += '<details><summary>Forward operating-model sensitivity</summary>\n\n' + table(['Scenario', 'WACC', 'Revenue growth shift', 'Terminal growth', 'Value/share'], v.forward_sensitivity.map(s => [s.scenario, pct(s.wacc), pct(s.growth_delta), pct(s.terminal_growth), money(s.value_per_share)])) + '</details>\n\n';
  text += '## Limits\n\n' + v.profile.limitations.map(s => '- ' + s).join('\n') + '\n- Missing D&A is not treated as zero. Missing TTM comparison periods prevent a trailing value.\n- A forecast requires segment bases that reconcile to consolidated revenue. Segment names must not overlap (for example, AI cannot be added to semiconductor revenue that already includes AI).\n- Forecast losses do not create an assumed tax refund. Terminal growth requires continued reinvestment.\n\n';
  return text;
}
export function main(argv) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { data: { type: 'string', default: 'data' }, out: { type: 'string' }, 'export-dir': { type: 'string' }, analysis: { type: 'string' } } });
  if (!positionals[0]) { console.error('Usage: sat compare TICKER [--data data] [--out report.md]'); return 1; }
  const ticker = positionals[0].toUpperCase(), metrics = JSON.parse(readFileSync(join(values.data, ticker, 'metrics.json')));
  const path = values.out || join('analyses', `${ticker}-valuation.md`); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, renderComparison(metrics, values.analysis ? JSON.parse(readFileSync(values.analysis)) : {}));
  if (values['export-dir']) exportExpectations(metrics, values['export-dir']);
  console.log(`Valuation comparison → ${path}`); return 0;
}
