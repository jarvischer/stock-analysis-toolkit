import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { factTable } from '../facts-table.mjs';
import { yearMetrics, multiYearMetrics } from '../metrics.mjs';
import { valuationMetrics } from '../valuation.mjs';
import { makeFacts, pick, ENDS } from './helpers.mjs';
const SAT = createRequire(import.meta.url)('../../../src/finance/core.js');

const A = { wacc: 0.09, normal_pe: 15, maintenance_capex_ratio: 1, lookback_years: 10,
  dcf: { years: 10, growth_cap: 0.10, growth_delta: { bear: -0.05, bull: 0.03 }, terminal_growth: { bear: 0.02, base: 0.025, bull: 0.03 } } };
const ROWS = {
  revenue: [100, 110, 121], operating_income: [20, 22, 25], net_income: [14, 15, 18], pretax_income: [19, 21, 24], income_tax: [4.75, 5.25, 6],
  interest_expense: [1, 1, 1], d_and_a: [5, 5, 6], ocf: [22, 24, 27], capex: [6, 7, 8], sbc: [1, 1, 2],
  current_assets: [40, 42, 45], total_liabilities: [50, 52, 55], equity: [60, 65, 70], cash_sti: [15, 16, 20],
  long_term_debt: [30, 30, 28], short_term_debt: [2, 2, 2], shares_outstanding: [10, 10, 10],
};
function run(price, a = A, rows = ROWS) {
  const f = makeFacts(rows), T = factTable(f), y = yearMetrics(f, T, a), m = multiYearMetrics(f, T, a, y);
  return valuationMetrics(f, T, a, y, m, price);
}
const P = { value: 50, date: '2026-10-10' };

test('price-based multiples', () => {
  const v = run(P);
  assert.equal(pick(v, 'market-cap').value, 500);
  assert.equal(pick(v, 'enterprise-value').value, 500 + 30 - 20);
  assert.equal(pick(v, 'pe').value, 500 / 18);
  assert.equal(pick(v, 'fcf-yield').value, 19 / 500);
});

test('DCF base case matches core.js with FCFF0 = 3-year average and capped growth', () => {
  const v = run(P);
  const fcff = [22 - 6 + 1 * 0.75 - 1, 24 - 7 + 1 * 0.75 - 1, 27 - 8 + 1 * 0.75 - 2];
  const fcff0 = fcff.reduce((s, x) => s + x, 0) / 3;
  const g = Math.min(0.10, 0.1); // revenue CAGR over 2 years = 10 %
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.forecast(fcff0, g, 10), r: 0.09, tg: 0.025, debt: 30, cash: 20, shares: 10, price: 50 });
  assert.ok(Math.abs(pick(v, 'dcf-value-base').value - d.fv) < 1e-9);
  assert.ok(pick(v, 'dcf-value-bear').value < pick(v, 'dcf-value-base').value);
  assert.ok(pick(v, 'dcf-value-bull').value > pick(v, 'dcf-value-base').value);
});

test('reverse DCF finds the growth that the price implies', () => {
  const v = run(P);
  const g = pick(v, 'reverse-dcf-growth').value;
  const fcff0 = pick(v, 'dcf-value-base').inputs.find((i) => i.name === 'fcff0').value;
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.forecast(fcff0, g, 10), r: 0.09, tg: 0.025, debt: 30, cash: 20, shares: 10 });
  assert.ok(Math.abs(d.fv - 50) < 1e-4);
});

test('margin of safety uses the card formula', () => {
  const v = run(P), fv = pick(v, 'dcf-value-base').value;
  assert.ok(Math.abs(pick(v, 'margin-of-safety-base').value - (fv - 50) / fv) < 1e-12);
});

test('asset floors per share', () => {
  const v = run(P);
  assert.equal(pick(v, 'tbv-per-share').value, 7);
  assert.equal(pick(v, 'ncav-per-share').value, -1);
  assert.equal(pick(v, 'earnings-value-per-share').value, ((14 + 15 + 18) / 3) * 15 / 10);
});

test('no price: price metrics are not available, DCF value still works', () => {
  const v = run(null);
  assert.equal(pick(v, 'market-cap').status, 'not_available');
  assert.equal(pick(v, 'margin-of-safety-base').status, 'not_available');
  assert.equal(pick(v, 'dcf-value-base').status, 'ok');
});

test('discount rate not above terminal growth is not meaningful', () => {
  const v = run(P, { ...A, wacc: 0.02 });
  assert.equal(pick(v, 'dcf-value-base').status, 'not_meaningful');
});

test('negative FCFF0 is not meaningful', () => {
  const v = run(P, A, { ...ROWS, ocf: [1, 1, 1] });
  assert.equal(pick(v, 'dcf-value-base').status, 'not_meaningful');
  assert.equal(pick(v, 'reverse-dcf-growth').status, 'not_meaningful');
});
