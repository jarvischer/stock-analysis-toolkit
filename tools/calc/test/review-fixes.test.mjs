import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { computeAll, main } from '../cli.mjs';
import { makeFacts } from './helpers.mjs';

const policy = JSON.parse(readFileSync(new URL('../../../agent/policy.json', import.meta.url)));
const none = { items: [], assumptions: {} };
const at = (out, key, end) => out.metrics.find((m) => m.key === key && (end === undefined || m.period_end === end));

test('ROIC is not meaningful when invested capital changes sign', () => {
  const facts = { ...makeFacts({ operating_income: [10, 10], pretax_income: [10, 10], income_tax: [2.5, 2.5],
    equity: [-120, 100], long_term_debt: [30, 30], cash_sti: [10, 10] }, { ends: ['2024-12-31', '2025-12-31'] }), history_years: 2, interim: null };
  assert.equal(at(computeAll(facts, { policy, adjustments: none, price: null }), 'roic', '2025-12-31').status, 'not_meaningful');
});

test('with no annual periods the ROIC rule metric exists and is not testable', () => {
  const facts = { ...makeFacts({}, { ends: [] }), history_years: 0, interim: null };
  const m = at(computeAll(facts, { policy, adjustments: none, price: null }), 'roic-years-above-wacc');
  assert.equal(m.status, 'not_testable'); assert.equal(m.years_available, 0);
});

test('year-over-year metrics are not meaningful across a changed fiscal year', () => {
  const ends = ['2019-12-31', '2020-09-30', '2021-09-30'];
  const facts = { ...makeFacts({ revenue: [100, 80, 110], diluted_avg_shares: [10, 10, 10] }, { ends }), history_years: 3, interim: null };
  const out = computeAll(facts, { policy, adjustments: none, price: null });
  assert.equal(at(out, 'revenue-growth', '2020-09-30').status, 'not_meaningful');
  assert.equal(at(out, 'dilution', '2020-09-30').status, 'not_meaningful');
  assert.equal(at(out, 'revenue-growth', '2021-09-30').status, 'ok');
  const days = (Date.parse('2021-09-30') - Date.parse('2019-12-31')) / 864e5;
  assert.ok(Math.abs(at(out, 'revenue-cagr-2').value - ((110 / 100) ** (365.25 / days) - 1)) < 1e-12);
});

test('the CLI rejects an adjustment for a missing item or an unknown period', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sat-adj-'));
  mkdirSync(join(dir, 'TEST'));
  writeFileSync(join(dir, 'TEST', 'facts.json'), JSON.stringify(makeFacts({ revenue: [100, 110, 121], long_term_debt: [null, null, null] })));
  const run = (item) => {
    writeFileSync(join(dir, 'adj.json'), JSON.stringify({ items: [{ item: item.item, period_end: item.end, delta: 1, reason: 'r', source: 's' }] }));
    return main(['TEST', '--data', dir, '--adjust', join(dir, 'adj.json')]);
  };
  assert.equal(run({ item: 'long_term_debt', end: '2025-12-31' }), 1);
  assert.equal(run({ item: 'revenue', end: '2025-06-30' }), 1);
  assert.equal(run({ item: 'revenue', end: '2025-12-31' }), 0);
  assert.equal(run({ item: 'sbc', end: '2025-12-31' }), 0); // ZERO_IF_MISSING items may be adjusted
});

test('per-share values use the newest share count, including the cover page', () => {
  const base = makeFacts({ revenue: [100], net_income: [10], shares_outstanding: [null], cash_sti: [5], long_term_debt: [0] }, { ends: ['2025-12-31'] });
  const cover = { value: 20, date: '2026-03-10', source: { tag: 'dei:EntityCommonStockSharesOutstanding', form: '10-K', accession: 'C', filed: '2026-03-20' }, flags: [] };
  const out = computeAll({ ...base, history_years: 1, interim: null, cover_shares: cover }, { policy, adjustments: none, price: { value: 10, date: '2026-10-09' } });
  const mcap = at(out, 'market-cap');
  assert.equal(mcap.value, 200);
  assert.equal(mcap.inputs.find((i) => i.name === 'shares_outstanding').item, 'cover_shares_outstanding');
});
