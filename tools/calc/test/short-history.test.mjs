import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { computeAll } from '../cli.mjs';
import { makeFacts } from './helpers.mjs';
const SAT = createRequire(import.meta.url)('../../../src/finance/core.js');

const policy = JSON.parse(readFileSync(new URL('../../../agent/policy.json', import.meta.url)));
const interim = (end, values) => ({ period_end: end, form: '10-Q', facts: Object.entries(values).map(([item, value]) => (
  { item, period_end: end, period_days: null, value, unit: 'USD', status: 'reported', source: { tag: 'us-gaap:T', form: '10-Q', accession: 'Q', filed: '2026-08-04' }, flags: [] })) });
const none = { items: [], assumptions: {} };
const get = (out, key) => out.metrics.find((m) => m.key === key);

test('no annual periods: no crash, low evidence, price metrics use the interim balance sheet', () => {
  const facts = { ...makeFacts({}, { ends: [] }), history_years: 0,
    interim: interim('2026-06-30', { shares_outstanding: 5e9, cash_sti: 93.5e9, long_term_debt: 20e9 }) };
  const out = computeAll(facts, { policy, adjustments: none, price: { value: 100, date: '2026-10-10' } });
  assert.deepEqual(out.evidence, { history_years: 0, level: 'low', margin_add: 0.20 });
  assert.equal(get(out, 'market-cap').value, 500e9);
  assert.equal(get(out, 'enterprise-value').value, 500e9 + 20e9 - 93.5e9);
  assert.equal(get(out, 'dcf-value-base').status, 'not_available');
});

test('one annual period: no crash; multi-year rules are not testable', () => {
  const facts = { ...makeFacts({ revenue: [100], operating_income: [20], net_income: [15], pretax_income: [20], income_tax: [5],
    equity: [60], long_term_debt: [10], cash_sti: [5] }, { ends: ['2025-12-31'] }), history_years: 1, interim: null };
  const out = computeAll(facts, { policy, adjustments: none, price: null });
  assert.equal(get(out, 'revenue-growth').status, 'not_available');
  const r = get(out, 'roic-years-above-wacc');
  assert.equal(r.status, 'not_testable'); assert.equal(r.years_available, 1);
  assert.equal(out.metrics.some((m) => m.key === 'diluted-shares-change'), false);
});

test('evidence levels follow the policy', () => {
  const level = (n) => computeAll({ ...makeFacts({ revenue: Array(n).fill(1) }, { ends: Array.from({ length: n }, (_, i) => `${2016 + i}-12-31`) }), history_years: n, interim: null },
    { policy, adjustments: none, price: null }).evidence.level;
  assert.equal(level(2), 'low'); assert.equal(level(3), 'medium'); assert.equal(level(5), 'high');
});

test('revenue reverse DCF gives the revenue that the price requires', () => {
  const facts = { ...makeFacts({ revenue: [80, 100], ocf: [-5, -2], capex: [3, 3], shares_outstanding: [10, 10], cash_sti: [50, 40], long_term_debt: [0, 0] },
    { ends: ['2024-12-31', '2025-12-31'] }), history_years: 2, interim: null };
  const out = computeAll(facts, { policy, price: { value: 100, date: '2026-10-10' }, adjustments: { items: [], assumptions: { target_fcf_margin: 0.2 } } });
  const m = get(out, 'reverse-dcf-revenue');
  assert.equal(m.status, 'ok');
  const g = m.implied_growth, m0 = (-2 - 3) / 100;
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.revenueFlows(100, g, m0, 0.2, 10), r: 0.09, tg: 0.025, debt: 0, cash: 40, shares: 10 });
  assert.ok(Math.abs(d.fv - 100) < 1e-4);
  assert.ok(Math.abs(m.value - 100 * (1 + g) ** 10) < 1e-6);
});

test('revenue reverse DCF without annual revenue uses a sourced base revenue assumption', () => {
  const facts = { ...makeFacts({}, { ends: [] }), history_years: 0, interim: interim('2026-06-30', { shares_outstanding: 10, cash_sti: 40, long_term_debt: 0 }) };
  const base = { value: 100, period_end: '2025-12-31', source: '424B4 0001628280-26-042639, "Total revenues"' };
  const out = computeAll(facts, { policy, price: { value: 100, date: '2026-10-10' },
    adjustments: { items: [], assumptions: { target_fcf_margin: 0.2, base_revenue: base, base_fcf: { value: -5, period_end: '2025-12-31', source: '424B4 0001628280-26-042639, "Free cash flow"' } } } });
  const m = get(out, 'reverse-dcf-revenue');
  assert.equal(m.status, 'ok');
  assert.equal(m.inputs.find((i) => i.name === 'base_revenue').source, base.source);
  assert.equal(m.inputs.find((i) => i.name === 'current_fcf_margin').value, -0.05);
});

test('revenue reverse DCF needs a target margin', () => {
  const facts = { ...makeFacts({ revenue: [100] }, { ends: ['2025-12-31'] }), history_years: 1, interim: null };
  const m = get(computeAll(facts, { policy, adjustments: none, price: { value: 100, date: '2026-10-10' } }), 'reverse-dcf-revenue');
  assert.equal(m.status, 'not_available'); assert.ok(m.missing.includes('target_fcf_margin'));
});

test('text share classes unlock market cap and revenue reverse DCF with source provenance', () => {
  const facts = { ...makeFacts({}, { ends: [] }), history_years: 0,
    interim: interim('2026-06-30', { cash_sti: 40, long_term_debt: 0 }) };
  const shares = { period_end: '2026-07-28', source: '10-Q Q',
    components: [{ item: 'cover_shares_class_a', value: 6 }, { item: 'cover_shares_class_b', value: 4 }] };
  const assumptions = { shares_outstanding: shares, target_fcf_margin: 0.2,
    base_revenue: { value: 100, period_end: '2025-12-31', source: '424B4 P' },
    base_fcf: { value: -5, period_end: '2025-12-31', source: '424B4 P' } };
  const run = (f = facts, s = shares) => computeAll(f, { policy, price: { value: 100, date: '2026-10-10' },
    adjustments: { items: [], assumptions: { ...assumptions, shares_outstanding: s } } });
  const out = run();
  assert.equal(get(out, 'market-cap').value, 1000);
  const input = get(out, 'market-cap').inputs.find((i) => i.name === 'shares_outstanding');
  assert.equal(input.source, '10-Q Q'); assert.equal(input.period_end, shares.period_end);
  assert.match(input.estimate, /cited share counts/);
  const m = get(out, 'reverse-dcf-revenue');
  assert.equal(m.status, 'ok');
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.revenueFlows(100, m.implied_growth, -0.05, 0.2, 10), r: 0.09, tg: 0.025, debt: 0, cash: 40, shares: 10 });
  assert.ok(Math.abs(d.fv - 100) < 1e-4);
  for (const date of ['2026-07-28', '2026-08-01']) {
    assert.equal(get(run({ ...facts, cover_shares: { value: 20, date } }), 'market-cap').value, 2000);
  }
  assert.equal(get(run({ ...facts, cover_shares: { value: 20, date: '2026-07-01' } }), 'market-cap').value, 1000);
  for (const over of [{ components: [] }, { source: '' }, { period_end: '2026-02-30' },
    { components: [shares.components[0], shares.components[0]] }, { value: 11 },
    ...[0, -1, 1.5, Infinity].map((value) => ({ components: [{ item: 'cover_shares_class_a', value }] }))]) {
    assert.throws(() => run(facts, { ...shares, ...over }), /shares_outstanding assumption/);
  }
});
