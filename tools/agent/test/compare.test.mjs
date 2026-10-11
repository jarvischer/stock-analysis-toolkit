import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {computeAll} from '../../calc/cli.mjs';
import {renderComparison} from '../compare.mjs';
const load=p=>JSON.parse(readFileSync(new URL('../../../'+p,import.meta.url)));
test('readable report distinguishes missing styles, reverse assumptions and percentage denominators',()=>{
 const m=computeAll(load('tests/fixtures/sample-facts.json'),{policy:load('agent/policy.json'),price:{value:50,date:'2026-10-09'}});
 const text=renderComparison(m);
 assert.match(text,/not_configured/);assert.match(text,/margin of safety uses model value/);
 assert.match(text,/not a direct measure of what the market expects/);assert.match(text,/Not available/);
 assert.doesNotMatch(text,/NaN|undefined|Infinity/);
});
