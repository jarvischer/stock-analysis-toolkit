// sat calc TICKER — reads data/<T>/facts.json, writes data/<T>/metrics.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { factTable, ZERO_IF_MISSING } from './facts-table.mjs';
import { yearMetrics, multiYearMetrics } from './metrics.mjs';
import { valuationMetrics } from './valuation.mjs';
import { basisMetrics } from './metric-bases.mjs';
import { valuationComparison } from './valuation-comparison.mjs';

const merge = (base, over) => {
  const out = { ...base };
  for (const [k, v] of Object.entries(over || {})) out[k] = v && typeof v === 'object' && !Array.isArray(v) && base[k] ? merge(base[k], v) : v;
  return out;
};

function run(facts, A, items, price) {
  const T = factTable(facts, items);
  const y = yearMetrics(facts, T, A), m = multiYearMetrics(facts, T, A, y);
  return [...y, ...m, ...valuationMetrics(facts, T, A, y, m, price)];
}

export function computeAll(facts, { policy, adjustments = { items: [], assumptions: {} }, price = null }) {
  const A = merge({ ...policy.valuation, lookback_years: policy.lookback_years, min_roic_years_above_wacc: policy.min_roic_years_above_wacc }, adjustments.assumptions);
  const years = facts.history_years ?? facts.periods.length, E = policy.evidence;
  const level = years >= E.high_years ? 'high' : years >= E.medium_years ? 'medium' : 'low';
  const items = adjustments.items || [];
  const metrics = run(facts, A, items, price);
  const reported = items.length ? run(facts, A, [], price) : metrics.map(m => ({ ...m }));
  for (const m of metrics) m.basis = items.length ? 'adjusted' : 'reported';
  const bases = basisMetrics(facts, A, reported, metrics);
  const valuation = valuationComparison(facts, A, [...metrics, ...bases], price);
  if (items.length) {
    const base = new Map(run(facts, A, [], price).map((m) => [m.key + '|' + m.period_end, m.value]));
    for (const m of metrics) { const d = base.get(m.key + '|' + m.period_end); if (d !== m.value) m.default_value = d ?? null; }
  }
  return { schema_version: 1, company: facts.company, periods: facts.periods, price, assumptions: A,
    evidence: { history_years: years, level, margin_add: E.margin_add[level] },
    adjustments: { items, assumptions: adjustments.assumptions || {} }, facts_extracted_at: facts.extracted_at,
    metric_sets: { reported, adjusted: items.length ? metrics : [], normalized: bases.filter(m => m.basis === 'normalized'), ttm: bases.filter(m => m.period_basis === 'ttm' && m.basis !== 'normalized') },
    valuation: valuation.comparison, metrics: [...metrics, ...bases, ...valuation.extraMetrics] };
}

export function main(argv) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: {
    data: { type: 'string', default: 'data' }, price: { type: 'string' }, 'price-date': { type: 'string' },
    adjust: { type: 'string' }, policy: { type: 'string', default: 'agent/policy.json' } } });
  const ticker = (positionals[0] || '').toUpperCase();
  if (!ticker) { console.error('Usage: sat calc TICKER [--price N --price-date YYYY-MM-DD] [--adjust file]'); return 1; }
  if (values.price && !/^\d{4}-\d{2}-\d{2}$/.test(values['price-date'] || '')) { console.error('--price needs --price-date YYYY-MM-DD'); return 1; }
  const price = values.price ? { value: Number(values.price), date: values['price-date'] } : null;
  if (price && !(price.value > 0)) { console.error('--price must be a positive number'); return 1; }
  const adjustments = values.adjust ? JSON.parse(readFileSync(values.adjust, 'utf8')) : { items: [], assumptions: {} };
  const bad = (adjustments.items || []).filter((a) => !a.reason || !a.source || !Number.isFinite(a.delta));
  if (bad.length) { console.error(`Each adjustment needs a numeric delta, a reason and a source: ${JSON.stringify(bad)}`); return 1; }
  const dir = join(values.data, ticker);
  const facts = JSON.parse(readFileSync(join(dir, 'facts.json'), 'utf8'));
  // An adjustment must change a value that exists; otherwise it would be silently ignored.
  const all = [...facts.facts, ...(facts.interim?.facts || [])];
  const known = new Set(all.filter((f) => f.status !== 'not_available').map((f) => f.item + '|' + f.period_end));
  const periods = new Set([...facts.periods, ...(facts.interim ? [facts.interim.period_end] : [])]);
  const unknown = (adjustments.items || []).filter((a) => !known.has(a.item + '|' + a.period_end) && !(ZERO_IF_MISSING.includes(a.item) && periods.has(a.period_end)));
  if (unknown.length) { console.error(`These adjustments match no reported value (item or period_end is wrong, or the value is not available): ${JSON.stringify(unknown)}`); return 1; }
  const policy = JSON.parse(readFileSync(values.policy, 'utf8'));
  let out;
  try { out = computeAll(facts, { policy, adjustments, price }); }
  catch (e) { console.error(e.message); return 1; }
  writeFileSync(join(dir, 'metrics.json'), JSON.stringify(out, null, 2) + '\n');
  const count = (s) => out.metrics.filter((m) => m.status === s).length;
  console.log(`${out.metrics.length} metrics: ${count('ok')} ok, ${count('not_available')} not available, ${count('not_meaningful')} not meaningful → ${join(dir, 'metrics.json')}`);
  return 0;
}
