import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, realpathSync } from 'node:fs';

const root = new URL('../../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');

test('skill has the frontmatter that Claude Code and Codex need', () => {
  const s = read('.claude/skills/value-analyst/SKILL.md');
  assert.match(s, /^---\nname: value-analyst\ndescription: .+\n---\n/);
  assert.match(s, /agent\/analyst\.md/);
});

test('Codex path points to the same skill', () => {
  assert.equal(realpathSync(new URL('.agents/skills/value-analyst', root)), realpathSync(new URL('.claude/skills/value-analyst', root)));
});

test('every card ID in the system prompt exists', () => {
  const ids = new Set(Object.keys(JSON.parse(read('src/content/en/concepts.json'))));
  const used = [...read('agent/analyst.md').matchAll(/`card:([a-z0-9-]+)`/g)].map((m) => m[1]);
  assert.ok(used.length > 15);
  assert.deepEqual(used.filter((id) => !ids.has(id)), []);
});
