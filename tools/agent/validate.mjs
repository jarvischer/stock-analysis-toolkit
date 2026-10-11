// sat validate analyses/<T>-<date>.json — checks an agent analysis against the schema, facts.json and metrics.json.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import Ajv from 'ajv';

const schema = JSON.parse(readFileSync(new URL('../../agent/schema/analysis.schema.json', import.meta.url)));
const check = new Ajv({ allErrors: true }).compile(schema);
const same = (a, b) => (a == null || b == null ? a === b : Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)));
const FORBIDDEN = /\b(buy|sell)\b(?![-\s]?backs?)/i;

function strings(value, path, out) {
  if (typeof value === 'string') out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) strings(v, path ? `${path}.${k}` : k, out);
  return out;
}

function knownNumbers(facts, metrics) {
  const out = [];
  for (const f of facts.facts) if (f.value != null) out.push(f.value);
  for (const m of metrics.metrics) if (m.value != null) out.push(m.value);
  return out;
}

function textNumberWarnings(analysis, known) {
  const warnings = [];
  for (const [path, text] of strings(analysis, '', [])) {
    if (/(^|\.)(source|period_end|analysis_date|data_as_of|date|cik|ticker)$/.test(path)) continue;
    for (const m of text.matchAll(/(\d+(?:\.\d+)?)%|\$(\d+(?:\.\d+)?)\s?([BMK])?/g)) {
      const x = m[1] != null ? Number(m[1]) / 100 : Number(m[2]) * ({ B: 1e9, M: 1e6, K: 1e3 }[m[3]] || 1);
      const tol = m[1] != null ? 0.0006 : 0.006 * Math.abs(x);
      if (!known.some((k) => Math.abs(k - x) <= tol)) warnings.push(`${path}: "${m[0]}" matches no fact or metric`);
    }
  }
  return warnings;
}

export function validateAnalysis(analysis, { facts, metrics, cards }) {
  const errors = [];
  if (!check(analysis)) return { errors: check.errors.map((e) => `schema ${e.instancePath || '/'} ${e.message} ${JSON.stringify(e.params)}`), warnings: [] };
  if (analysis.steps.map((s) => s.n).join(',') !== '0,1,2,3,4,5,6') errors.push('steps 0–6 must each appear once, in order');
  for (const s of analysis.steps) {
    if (s.score != null && (s.score < 1 || s.score > 5)) errors.push(`step ${s.n}: score must be 1–5 or null`);
    for (const c of s.cards) if (!cards.has(c)) errors.push(`step ${s.n}: unknown card "${c}"`);
    for (const f of s.facts) {
      const ref = facts.facts.find((x) => x.item === f.item && x.period_end === f.period_end);
      if (!ref) errors.push(`step ${s.n}: fact ${f.item} ${f.period_end} is not in facts.json`);
      else if (!same(f.value, ref.value)) errors.push(`step ${s.n}: fact ${f.item} ${f.period_end} = ${f.value}, facts.json has ${ref.value}`);
    }
    for (const c of s.calculations) {
      const ref = metrics.metrics.find((x) => x.key === c.metric && x.period_end === c.period_end);
      if (!ref) errors.push(`step ${s.n}: metric ${c.metric} ${c.period_end} is not in metrics.json`);
      else if (!same(c.value, ref.value)) errors.push(`step ${s.n}: metric ${c.metric} ${c.period_end} = ${c.value}, metrics.json has ${ref.value}`);
    }
  }
  const q = analysis.result.quality_score;
  if (q != null && (q < 1 || q > 5)) errors.push('result.quality_score must be 1–5 or null');
  if (analysis.result.status === 'stopped' && analysis.result.stopped_at_step == null) errors.push('result.stopped_at_step is required when status is "stopped"');
  for (const [path, text] of strings(analysis, '', [])) {
    const m = FORBIDDEN.exec(text);
    if (m) errors.push(`${path}: the word "${m[0]}" is not allowed; describe the result against the rules instead`);
  }
  return { errors, warnings: textNumberWarnings(analysis, knownNumbers(facts, metrics)) };
}

export function main(argv) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { data: { type: 'string', default: 'data' } } });
  if (!positionals[0]) { console.error('Usage: sat validate analyses/<TICKER>-<date>.json [--data data]'); return 1; }
  const analysis = JSON.parse(readFileSync(positionals[0], 'utf8'));
  const dir = join(values.data, String(analysis.ticker || '').toUpperCase());
  const r = validateAnalysis(analysis, {
    facts: JSON.parse(readFileSync(join(dir, 'facts.json'), 'utf8')),
    metrics: JSON.parse(readFileSync(join(dir, 'metrics.json'), 'utf8')),
    cards: new Set(Object.keys(JSON.parse(readFileSync('src/content/en/concepts.json', 'utf8')))),
  });
  for (const w of r.warnings) console.log('warning: ' + w);
  for (const e of r.errors) console.log('error: ' + e);
  console.log(r.errors.length ? `${r.errors.length} errors` : `valid (${r.warnings.length} warnings)`);
  return r.errors.length ? 1 : 0;
}
