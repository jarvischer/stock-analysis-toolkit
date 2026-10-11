import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateAnalysis } from '../validate.mjs';

const load = (p) => JSON.parse(readFileSync(new URL('../../../' + p, import.meta.url)));
const sectionText = readFileSync(new URL('../../../tests/fixtures/sections/prospectus.txt', import.meta.url), 'utf8');
const ctx = () => ({ facts: load('tests/fixtures/sample-facts.json'), metrics: load('tests/fixtures/sample-metrics.json'),
  cards: new Set(Object.keys(load('src/content/en/concepts.json'))), policy: load('agent/policy.json'),
  readSection: (name) => (name === 'prospectus.txt' ? sectionText : null) });
const textFact = (over = {}) => ({ item: 'revenue', period_end: '2025-12-31', value: 18674000000, source: '424B4 0001628280-26-042639',
  quote: 'Total revenues ..............................................................................                            $18,674', file: 'prospectus.txt', ...over });
const sample = () => load('tests/fixtures/analysis-sample.json');

test('the sample analysis is valid', () => {
  const r = validateAnalysis(sample(), ctx());
  assert.deepEqual(r.errors, []);
});

test('schema errors are reported', () => {
  const a = sample(); delete a.result.summary;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /summary/);
});

test('steps must be 0 to 6 in order, with scores 1 to 5', () => {
  const a = sample(); a.steps.pop(); a.steps[2].score = 7;
  const e = validateAnalysis(a, ctx()).errors.join('\n');
  assert.match(e, /steps 0–6/); assert.match(e, /score/);
});

test('a calculation that differs from metrics.json is an error', () => {
  const a = sample(); a.steps[2].calculations[0].value = 0.2;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /operating-margin/);
});

test('a fact that differs from facts.json is an error', () => {
  const a = sample(); a.steps[0].facts[0].value = 2;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /revenue/);
});

test('unknown cards are errors', () => {
  const a = sample(); a.steps[1].cards.push('no-such-card');
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /no-such-card/);
});

test('buy and sell are not allowed, buybacks are', () => {
  const a = sample(); a.steps[3].reason = 'Buybacks were large. You should buy now.';
  const e = validateAnalysis(a, ctx()).errors;
  assert.equal(e.length, 1); assert.match(e[0], /buy/);
});

test('a stopped result needs the step number', () => {
  const a = sample(); a.result.status = 'stopped';
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /stopped_at_step/);
});

test('numbers in text without a source are warnings', () => {
  const a = sample(); a.steps[2].reason = 'Margin of 47.0% is high.';
  const r = validateAnalysis(a, ctx());
  assert.deepEqual(r.errors, []); assert.match(r.warnings.join('\n'), /47\.0%/);
});

test('a text fact is valid when the quote is in the file and contains the number', () => {
  const a = sample(); a.steps[0].facts.push(textFact());
  assert.deepEqual(validateAnalysis(a, ctx()).errors, []);
});

test('a text fact with a wrong number, a missing quote or a bad file name is an error', () => {
  for (const [over, re] of [[{ value: 19e9 }, /number/], [{ quote: 'Total revenues were $25,000' }, /quote/], [{ file: '../facts.json' }, /file/]]) {
    const a = sample(); a.steps[0].facts.push(textFact(over));
    assert.match(validateAnalysis(a, ctx()).errors.join('\n'), re);
  }
});

test('evidence must match metrics.json', () => {
  const a = sample(); a.evidence.level = 'low';
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /evidence/);
});

test('required margin of safety = policy for the score + evidence add-on', () => {
  const a = sample(); a.result.required_margin_of_safety = 0.2;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /required_margin_of_safety/);
});
