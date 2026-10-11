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

test('operating report separates central estimate, policy screen and unavailable consensus',async()=>{
 const {renderOperatingReview}=await import('../operating-report.mjs');
 const s=renderOperatingReview({central_model:{central_scenario_id:'central',business_profile:'AI growth',investment_lens:'Quality',reason:'Evidence',status:'provisional_estimate',value_per_share:100,method:'Segment DCF',distinction:'Separate policy',evidence:[]},operating_expectations:{definition:'Conditional paths',period_note:'Rolling periods',cases:[],assumptions:{wacc:.09,tax_rate:.21,terminal_growth:.025,terminal_roic:.15}},business_review:null});
 assert.match(s,/What Must Be True/);assert.match(s,/provisional_estimate/);assert.match(s,/Policy decision/);assert.doesNotMatch(s,/undefined|NaN/);
});
