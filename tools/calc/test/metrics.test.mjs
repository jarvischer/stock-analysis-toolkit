import test from 'node:test';
import assert from 'node:assert/strict';
import { factTable } from '../facts-table.mjs';
import { yearMetrics, multiYearMetrics, debtFact } from '../metrics.mjs';
import { makeFacts, pick, ENDS } from './helpers.mjs';

const A = { wacc: 0.09, maintenance_capex_ratio: 1.0, lookback_years: 10 };
const BASE = {
  revenue: [100, 110, 121], cost_of_revenue: [60, 66, 72], operating_income: [20, 22, 25], net_income: [14, 15, 18],
  pretax_income: [19, 21, 24], income_tax: [4.75, 5.25, 6], interest_expense: [1, 1, 1], d_and_a: [5, 5, 6],
  ocf: [22, 24, 27], capex: [6, 7, 8], sbc: [1, 1, 2], receivables: [10, 11, 12], inventory: [5, 5, 6], payables: [6, 6, 7],
  current_assets: [40, 42, 45], current_liabilities: [20, 21, 22], total_liabilities: [50, 52, 55], equity: [60, 65, 70],
  cash_sti: [15, 16, 20], long_term_debt: [30, 30, 28], short_term_debt: [2, 2, 2], goodwill: [5, 5, 5], intangibles: [1, 1, 1],
  diluted_avg_shares: [10, 10, 9.8], eps_diluted: [1.4, 1.5, 1.84], maturity_y1: [2, 2, 2], maturity_y2: [3, 3, 3], maturity_y3: [4, 4, 4],
};
const run = (rows = BASE, opts) => { const f = makeFacts(rows, opts); const T = factTable(f); const y = yearMetrics(f, T, A); return [...y, ...multiYearMetrics(f, T, A, y)]; };

test('margins and growth', () => {
  const m = run();
  assert.equal(pick(m, 'gross-margin').value, (121 - 72) / 121);
  assert.equal(pick(m, 'operating-margin').value, 25 / 121);
  assert.ok(Math.abs(pick(m, 'revenue-growth').value - 0.1) < 1e-12);
  assert.equal(pick(m, 'revenue-growth', ENDS[0]).status, 'not_available');
});

test('cash metrics follow the card formulas', () => {
  const m = run();
  assert.equal(pick(m, 'fcf').value, 27 - 8);
  // FCFF = OCF − CapEx + Interest × (1 − tax) − SBC, tax = 6/24 = 0.25
  assert.equal(pick(m, 'fcff').value, 27 - 8 + 1 * 0.75 - 2);
  // ΔOWC = (12+6−7) − (11+5−6) = 1; owner earnings = NI + D&A − maint (= D&A) − ΔOWC
  assert.equal(pick(m, 'owner-earnings').value, 18 + 6 - 6 - 1);
  assert.equal(pick(m, 'earnings-quality').value, 27 / 18);
});

test('balance sheet and per-share metrics', () => {
  const m = run();
  assert.equal(pick(m, 'net-debt').value, 30 - 20);
  assert.equal(pick(m, 'debt-ebitda').value, 30 / 31);
  assert.equal(pick(m, 'interest-coverage').value, 25);
  assert.equal(pick(m, 'tangible-book-value').value, 70 - 0 - 5 - 1);
  assert.equal(pick(m, 'ncav').value, 45 - 55 - 0);
  assert.ok(Math.abs(pick(m, 'dilution').value - (-0.02)) < 1e-12);
  assert.equal(pick(m, 'debt-due-3y').value, 9);
});

test('ROIC uses NOPAT over average invested capital', () => {
  const m = run();
  const ic = (eq, debt, cash) => eq + debt - cash;
  const avg = (ic(65, 32, 16) + ic(70, 30, 20)) / 2;
  assert.equal(pick(m, 'roic').value, (25 * 0.75) / avg);
});

test('preferred and goodwill are assumed zero and marked', () => {
  const m = run();
  const input = pick(m, 'tangible-book-value').inputs.find((i) => i.name === 'preferred');
  assert.equal(input.value, 0); assert.equal(input.assumed_zero, true);
});

test('debt falls back to convertible notes', () => {
  const rows = { ...BASE, long_term_debt: [null, null, null], convertible_debt: [10, 10, 10] };
  const f = makeFacts(rows); const T = factTable(f);
  assert.equal(debtFact(T, ENDS[2]).value, 12);
});

test('missing debt is not zero', () => {
  const rows = { ...BASE, long_term_debt: [null, null, null] };
  const m = run(rows);
  assert.equal(pick(m, 'net-debt').status, 'not_available');
  assert.deepEqual(pick(m, 'net-debt').missing, ['debt']);
});

test('LongTermDebt includes the current part, so the current part is not added again', () => {
  const f = makeFacts(BASE, { tags: { long_term_debt: 'us-gaap:LongTermDebt', short_term_debt: 'us-gaap:LongTermDebtCurrent' } });
  assert.equal(debtFact(factTable(f), ENDS[2]).value, 28);
});

test('P/E and ratios with a loss are not meaningful', () => {
  const rows = { ...BASE, net_income: [14, 15, -3], operating_income: [20, 22, 0] };
  const m = run(rows);
  assert.equal(pick(m, 'earnings-quality').status, 'not_meaningful');
  assert.equal(pick(m, 'interest-coverage').value, 0);
  assert.equal(pick(m, 'debt-ebitda').status, 'ok');
});

test('long years are annualized for growth', () => {
  const m = run(BASE, { days: { '2025-12-31': 371 }, flags: { 'revenue|2025-12-31': ['long_year'] } });
  assert.ok(Math.abs(pick(m, 'revenue-growth').value - (121 * 364 / 371 / 110 - 1)) < 1e-12);
  assert.match(pick(m, 'revenue-growth').formula, /annualized/);
});

test('multi-year metrics', () => {
  const m = run();
  assert.ok(Math.abs(pick(m, 'revenue-cagr-2').value - 0.1) < 1e-12);
  assert.equal(pick(m, 'roic-years-above-wacc').value, 3);
  assert.equal(pick(m, 'normalized-net-income').value, (14 + 15 + 18) / 3);
});

test('adjustments change the value and are marked', () => {
  const f = makeFacts(BASE);
  const T = factTable(f, [{ item: 'operating_income', period_end: ENDS[2], delta: 5, reason: 'r', source: 's' }]);
  const m = yearMetrics(f, T, A);
  assert.equal(pick(m, 'operating-margin').value, 30 / 121);
  assert.equal(pick(m, 'operating-margin').inputs.find((i) => i.name === 'operating_income').adjusted, true);
});
