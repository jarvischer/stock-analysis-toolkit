import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { computeAll } from '../cli.mjs';
import { forecastScenario, priceForecast, validateForward } from '../forward.mjs';
import { makeFacts } from './helpers.mjs';
const policy = JSON.parse(readFileSync(new URL('../../../agent/policy.json', import.meta.url)));
const facts = () => ({ ...makeFacts({ revenue:[80,90,100],ocf:[20,25,30],capex:[3,4,5],sbc:[2,3,4],interest_expense:[1,1,1],net_income:[12,14,20],operating_income:[20,22,25],pretax_income:[19,21,24],income_tax:[4,4,-1],d_and_a:[5,5,5],depreciation:[2,2,2],equity:[50,60,70],long_term_debt:[10,10,10],cash_sti:[5,5,5],receivables:[10,11,12],inventory:[5,5,5],payables:[4,4,4],shares_outstanding:[10,10,10] }),history_years:3 });
const scenario = () => ({ id:'explicit-growth',style:'growth',reason:'Documented test assumptions',source:'test fixture',years:3,tax_rate:0.2,wacc:0.1,terminal_growth:0.02,terminal_roic:0.15,sbc_treatment:'expensed_in_margins',corporate_costs:[1,1,1],segments:[{name:'chips',base_revenue:{period_end:'2025-12-31',components:[{item:'revenue',value:100,sign:1,source:'10-K A'}]},base_working_capital_ratio:0.1,growth:[0.2,0.1,0.05],operating_margin:[0.25,0.25,0.25],depreciation_to_revenue:[0.02,0.02,0.02],capex_to_revenue:[0.04,0.04,0.04],working_capital_to_revenue:[0.1,0.1,0.1]}] });
const run = assumptions => computeAll(facts(),{policy,price:{value:50,date:'2026-10-09'},adjustments:{items:[],assumptions}});
const get = (out,key)=>out.metrics.find(m=>m.key===key && m.period_end==='2025-12-31');
test('explicit normalized tax preserves reported negative tax and conservative policy value',()=>{
  const before=run({}), after=run({normalization:{tax_rate:{value:0.21,reason:'Illustrative normalized estimate',source:'analyst'}}});
  assert.equal(get(after,'reported-tax-rate-annual').value,-1/24);
  assert.equal(get(after,'normalized-nopat-annual').value,25*0.79);
  assert.equal(get(after,'normalized-fcff-annual').value,25*0.79+5-5-1);
  assert.equal(get(before,'dcf-value-base').value,get(after,'dcf-value-base').value);
  assert.equal(get(before,'normalized-roic-annual').status,'not_available');
  assert.equal(get(after,'normalized-owner-earnings-annual').status,'not_available');
});
test('maintenance capex needs an explicit method and is separate from acquisition amortization',()=>{
  const out=run({normalization:{tax_rate:{value:.2,reason:'r',source:'s'},maintenance_capex:{method:'depreciation',reason:'physical assets estimate',source:'analyst'}}});
  assert.equal(get(out,'normalized-owner-earnings-annual').value,20-1-24*.2+5-2-1);
  assert.throws(()=>run({normalization:{tax_rate:{value:-.1,reason:'r',source:'s'}}}),/normalization.tax_rate/);
});
test('TTM ratios use matched trailing flows and preserve annual metrics',()=>{
  const f=facts();f.ttm={period_end:'2026-06-30',facts:[['revenue',130],['net_income',30],['ocf',40],['capex',6],['operating_income',35],['d_and_a',7],['income_tax',5],['pretax_income',34],['interest_expense',1],['sbc',5]].map(([item,value])=>({item,value,period_end:'2026-06-30',status:'constructed',source:{},flags:['ttm']}))};
  const out=computeAll(f,{policy,price:{value:50,date:'2026-10-09'}});
  assert.equal(out.metrics.find(m=>m.key==='ttm-fcf').value,34);
  assert.equal(out.metrics.find(m=>m.key==='ttm-ebitda').value,42);
  assert.equal(out.metrics.find(m=>m.key==='ttm-pe').value,500/30);
  assert.equal(get(out,'fcf').value,25);
  f.ttm.facts=f.ttm.facts.filter(x=>x.item!=='d_and_a');
  assert.equal(computeAll(f,{policy}).metrics.find(m=>m.key==='ttm-ebitda').status,'not_available');
});
test('segment forecast reconciles growth, costs, cash tax and reinvestment without double counting SBC',()=>{
  const s=scenario();validateForward([s]);const rows=forecastScenario(s);
  assert.equal(rows[0].revenue,120);assert.equal(rows[0].operating_income,29);
  assert.ok(Math.abs(rows[0].fcff-(29*.8+2.4-4.8-2))<1e-12);
  const p=priceForecast(rows,s,{shares:10,claims:10,cash:5});
  assert.ok(p.value_per_share>0);assert.equal(p.terminal_reinvestment_rate,.02/.15);
  assert.ok(priceForecast(rows,{...s,wacc:.12},{shares:10,claims:10,cash:5}).value_per_share<p.value_per_share);
  const out=run({forward_scenarios:[s]});
  assert.equal(out.valuation.forward.length,1);
  assert.equal(out.valuation.comparisons.find(s=>s.style==='quality').status,'not_configured');
  assert.equal(out.valuation.forward_sensitivity.length,27);
  assert.equal(out.valuation.cash_flow_bases[0].required_growth!==null,true);
});
test('rejects incomplete, mismatched or invalid forecast inputs',()=>{
  for(const change of [s=>s.segments[0].growth.pop(),s=>s.wacc=.01,s=>s.terminal_roic=.01,s=>s.sbc_treatment='ignore',s=>s.corporate_costs=[],s=>s.reason='',s=>s.segments[0].base_revenue.components[0].source='']){
    const s=scenario();change(s);assert.throws(()=>validateForward([s]),/forward_scenarios/);
  }
});
test('reported, adjusted and normalized outputs do not overwrite each other',()=>{
  const out=computeAll(facts(),{policy,adjustments:{items:[{item:'operating_income',period_end:'2025-12-31',delta:5,reason:'one-off',source:'note'}],assumptions:{normalization:{tax_rate:{value:.2,reason:'estimate',source:'analyst'}}}}});
  assert.equal(out.metric_sets.reported.find(m=>m.key==='nopat'&&m.period_end==='2025-12-31').value,25);
  assert.equal(out.metric_sets.adjusted.find(m=>m.key==='nopat'&&m.period_end==='2025-12-31').value,30);
  assert.equal(get(out,'normalized-nopat-annual').value,20);
});
test('a segment bridge can use the same item on different dates but rejects invalid dates and duplicate components',()=>{
 const s=scenario(), base=s.segments[0].base_revenue;
 base.components=[{item:'revenue',value:90,sign:1,source:'a',period_end:'2024-12-31'},{item:'revenue',value:20,sign:1,source:'b',period_end:'2025-09-30'},{item:'revenue',value:10,sign:-1,source:'c',period_end:'2024-09-30'}];
 validateForward([s]);assert.equal(forecastScenario(s)[0].revenue,120);
 base.components.push({...base.components[0]});assert.throws(()=>validateForward([s]),/unique/);
 base.components.pop();base.period_end='2025-02-30';assert.throws(()=>validateForward([s]),/dated/);
});
