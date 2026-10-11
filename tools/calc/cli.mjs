// sat calc TICKER — reads data/<T>/facts.json, writes data/<T>/metrics.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { factTable } from './facts-table.mjs';
import { yearMetrics, multiYearMetrics } from './metrics.mjs';
import { valuationMetrics } from './valuation.mjs';

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
  if (items.length) {
    const base = new Map(run(facts, A, [], price).map((m) => [m.key + '|' + m.period_end, m.value]));
    for (const m of metrics) { const d = base.get(m.key + '|' + m.period_end); if (d !== m.value) m.default_value = d ?? null; }
  }
  return { schema_version: 1, company: facts.company, periods: facts.periods, price, assumptions: A,
    evidence: { history_years: years, level, margin_add: E.margin_add[level] },
    adjustments: { items, assumptions: adjustments.assumptions || {} }, facts_extracted_at: facts.extracted_at, metrics };
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
  const policy = JSON.parse(readFileSync(values.policy, 'utf8'));
  const out = computeAll(facts, { policy, adjustments, price });
  writeFileSync(join(dir, 'metrics.json'), JSON.stringify(out, null, 2) + '\n');
  const count = (s) => out.metrics.filter((m) => m.status === s).length;
  console.log(`${out.metrics.length} metrics: ${count('ok')} ok, ${count('not_available')} not available, ${count('not_meaningful')} not meaningful → ${join(dir, 'metrics.json')}`);
  return 0;
}
