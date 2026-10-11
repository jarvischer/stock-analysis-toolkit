import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { computeAll, main } from '../cli.mjs';
import { makeFacts, ENDS } from './helpers.mjs';

const policy = JSON.parse(readFileSync(new URL('../../../agent/policy.json', import.meta.url)));
const facts = makeFacts({ revenue: [100, 110, 121], operating_income: [20, 22, 25], net_income: [14, 15, 18] });

test('default value is kept when an adjustment changes a metric', () => {
  const out = computeAll(facts, { policy, price: null,
    adjustments: { items: [{ item: 'operating_income', period_end: ENDS[2], delta: 5, reason: 'one-time charge', source: '10-K note 9' }], assumptions: {} } });
  const m = out.metrics.find((x) => x.key === 'operating-margin' && x.period_end === ENDS[2]);
  assert.equal(m.value, 30 / 121); assert.equal(m.default_value, 25 / 121);
  assert.equal(out.adjustments.items.length, 1);
});

test('assumptions override policy valuation values', () => {
  const out = computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: { wacc: 0.1, dcf: { years: 5 } } } });
  assert.equal(out.assumptions.wacc, 0.1);
  assert.equal(out.assumptions.dcf.years, 5);
  assert.equal(out.assumptions.dcf.growth_cap, 0.10);
});

test('the result is the same each time', () => {
  const a = JSON.stringify(computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: {} } }));
  const b = JSON.stringify(computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: {} } }));
  assert.equal(a, b);
});

test('CLI writes metrics.json and rejects adjustments without a reason', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sat-calc-'));
  mkdirSync(join(dir, 'TEST'));
  writeFileSync(join(dir, 'TEST', 'facts.json'), JSON.stringify(facts));
  assert.equal(main(['TEST', '--data', dir, '--price', '50', '--price-date', '2026-10-10']), 0);
  const out = JSON.parse(readFileSync(join(dir, 'TEST', 'metrics.json')));
  assert.deepEqual(out.price, { value: 50, date: '2026-10-10' });
  writeFileSync(join(dir, 'adj.json'), JSON.stringify({ items: [{ item: 'net_income', period_end: ENDS[2], delta: 1 }] }));
  assert.equal(main(['TEST', '--data', dir, '--adjust', join(dir, 'adj.json')]), 1);
  assert.equal(main(['TEST', '--data', dir, '--price', '50']), 1); // price needs a date
});
