// sat validate analyses/<T>-<date>.json — checks an agent analysis against the schema, facts.json and metrics.json.
import { existsSync, readFileSync } from 'node:fs';
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

const SECTION_FILE = /^[a-z0-9_]+\.txt$/;
const QUOTE_MAX = 300; // a longer quote could contain almost any number
const norm = (t) => t.replace(/\s+/g, ' ').trim();
function quoteHasNumber(quote, value) {
  if (value == null) return false;
  const numbers = [...quote.replace(/,/g, '').matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
  return numbers.some((n) => [1, 1e3, 1e6, 1e9].some((s) => Math.abs(n * s - Math.abs(value)) <= 0.005 * Math.max(1, Math.abs(value))));
}

function textNumberWarnings(analysis, known) {
  const warnings = [];
  for (const [path, text] of strings(analysis, '', [])) {
    if (/(^|\.)(source|period_end|analysis_date|data_as_of|date|cik|ticker|quote|file)$/.test(path)) continue;
    for (const m of text.matchAll(/(\d+(?:\.\d+)?)%|\$(\d+(?:\.\d+)?)\s?([BMK])?/g)) {
      const x = m[1] != null ? Number(m[1]) / 100 : Number(m[2]) * ({ B: 1e9, M: 1e6, K: 1e3 }[m[3]] || 1);
      const tol = m[1] != null ? 0.0006 : 0.006 * Math.abs(x);
      if (!known.some((k) => Math.abs(k - x) <= tol)) warnings.push(`${path}: "${m[0]}" matches no fact or metric`);
    }
  }
  return warnings;
}

export function validateAnalysis(analysis, { facts, metrics, cards, policy = null, readSection = () => null }) {
  const errors = [], textFacts = [];
  if (!check(analysis)) return { errors: check.errors.map((e) => `schema ${e.instancePath || '/'} ${e.message} ${JSON.stringify(e.params)}`), warnings: [] };
  if (analysis.steps.map((s) => s.n).join(',') !== '0,1,2,3,4,5,6') errors.push('steps 0–6 must each appear once, in order');
  for (const s of analysis.steps) {
    if (s.score != null && (s.score < 1 || s.score > 5)) errors.push(`step ${s.n}: score must be 1–5 or null`);
    for (const c of s.cards) if (!cards.has(c)) errors.push(`step ${s.n}: unknown card "${c}"`);
    for (const f of s.facts) {
      if (f.file != null) {
        if (!SECTION_FILE.test(f.file)) { errors.push(`step ${s.n}: text fact file "${f.file}" must be a section file name`); continue; }
        const text = readSection(f.file);
        if (text == null) errors.push(`step ${s.n}: text fact file ${f.file} does not exist`);
        else if (f.quote && f.quote.length > QUOTE_MAX) errors.push(`step ${s.n}: text fact ${f.item}: quote is longer than ${QUOTE_MAX} characters`);
        else if (!f.quote || !norm(text).includes(norm(f.quote))) errors.push(`step ${s.n}: text fact ${f.item}: quote not found in ${f.file}`);
        else if (!quoteHasNumber(f.quote, f.value)) errors.push(`step ${s.n}: text fact ${f.item}: the quote does not contain the number ${f.value}`);
        else textFacts.push(f);
        continue;
      }
      const ref = [...facts.facts, ...(facts.interim?.facts || [])].find((x) => x.item === f.item && x.period_end === f.period_end);
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
  const ev = metrics.evidence;
  if (ev && (analysis.evidence.level !== ev.level || analysis.evidence.history_years !== ev.history_years))
    errors.push(`evidence must match metrics.json (${ev.history_years} years, ${ev.level})`);
  if (policy && ev && q != null) {
    const base = policy.required_margin_of_safety[String(q)];
    const expected = base == null ? null : base + ev.margin_add;
    if (!same(analysis.result.required_margin_of_safety, expected))
      errors.push(`result.required_margin_of_safety must be ${expected} (policy for score ${q} + evidence add-on ${ev.margin_add})`);
  }
  // The verdict numbers must come from metrics.json and follow the method in agent/analyst.md.
  const r = analysis.result;
  const mos = metrics.metrics.find((m) => m.key === 'margin-of-safety-base');
  const mosValue = mos && mos.status === 'ok' ? mos.value : null;
  if (!same(r.margin_of_safety, mosValue)) errors.push(`result.margin_of_safety must be ${mosValue} (margin-of-safety-base in metrics.json)`);
  const s2 = analysis.steps.find((s) => s.n === 2)?.score, s3 = analysis.steps.find((s) => s.n === 3)?.score;
  if (s2 != null && s3 != null && q !== Math.min(s2, s3)) errors.push(`result.quality_score must be ${Math.min(s2, s3)} (the lower of the step 2 and step 3 scores)`);
  if (r.status === 'meets_rules' && !(r.margin_of_safety != null && r.required_margin_of_safety != null && r.margin_of_safety >= r.required_margin_of_safety))
    errors.push('result.status "meets_rules" needs margin_of_safety ≥ required_margin_of_safety');
  const marketPrice = metrics.price?.value ?? null;
  if (!same(analysis.price.value, marketPrice)) errors.push(`price.value must be ${marketPrice} (the price in metrics.json)`);
  for (const name of ['base_revenue', 'base_fcf']) {
    const assumed = metrics.assumptions?.[name];
    if (assumed && !textFacts.some((f) => same(f.value, assumed.value))) errors.push(`assumption ${name} = ${assumed.value} must equal the value of a validated text fact`);
  }
  if (analysis.result.status === 'stopped' && analysis.result.stopped_at_step == null) errors.push('result.stopped_at_step is required when status is "stopped"');
  for (const [path, text] of strings(analysis, '', [])) {
    if (path.endsWith('.quote')) continue; // a filing may say "we sell"; only the agent's own words are checked
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
    policy: JSON.parse(readFileSync('agent/policy.json', 'utf8')),
    readSection: (name) => { const p = join(dir, 'sections', name); return SECTION_FILE.test(name) && existsSync(p) ? readFileSync(p, 'utf8') : null; },
  });
  for (const w of r.warnings) console.log('warning: ' + w);
  for (const e of r.errors) console.log('error: ' + e);
  console.log(r.errors.length ? `${r.errors.length} errors` : `valid (${r.warnings.length} warnings)`);
  return r.errors.length ? 1 : 0;
}
