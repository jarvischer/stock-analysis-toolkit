import test from 'node:test';
import assert from 'node:assert/strict';
import {scenarioDistribution,assessValuation} from '../valuation-assessment.mjs';
import {perShareEconomics} from '../per-share.mjs';
const scenarios=[100,200,400].map((n,i)=>({id:['bear','central','upside'][i],value_per_share:n,status:'ok'}));
const weights={bear:.25,central:.5,upside:.25};
test('subjective probability contributions reconcile; no silent assigned probabilities',()=>{
 assert.equal(scenarioDistribution({},scenarios,300,'2025').expected,null);
 const cfg={assigned:{weights,reason:'documented judgment',source:'analyst',as_of:'2026-10-11'}};
 const p=scenarioDistribution(cfg,scenarios,300,'2025');assert.equal(p.expected.value,225);assert.equal(p.expected.contributions.reduce((a,b)=>a+b.contribution,0),225);
 assert.throws(()=>scenarioDistribution({assigned:{...cfg.assigned,weights:{...weights,bear:.3}}},scenarios),/100%/);
 assert.throws(()=>scenarioDistribution({assigned:{...cfg.assigned,weights:{...weights,bear:-.25,upside:.75}}},scenarios),/\[0,1\]/);
 assert.throws(()=>scenarioDistribution({assigned:{weights}},scenarios),/reason/);
 assert.equal(scenarioDistribution(cfg,[{...scenarios[0],status:'not_available',value_per_share:null},...scenarios.slice(1)],300).expected.value,null);
 assert.equal(assessValuation({},{}).confidence,'Low');
});
const facts={periods:Array.from({length:6},(_,i)=>`${2020+i}-12-31`),facts:[]};
for(const [i,end] of facts.periods.entries())for(const [item,value] of Object.entries({revenue:100*1.2**i,diluted_avg_shares:10*1.1**i,sbc:10,buybacks:100,eps_diluted:2,ocf:30,capex:5}))facts.facts.push({item,value,period_end:end,status:'reported',source:{form:'10-K'},flags:[]});
const metrics=facts.periods.flatMap((end,i)=>['fcf','fcff'].map(key=>({key,period_end:end,value:25*1.2**i,status:'ok',inputs:[{source:'filing',value:25}]})));
test('per-share growth uses observed diluted shares despite repurchase cash; missing stays missing',()=>{
 const p=perShareEconomics(facts,{},metrics,[]);
 assert.equal(p.historical[0].metrics.find(m=>m.key==='revenue_per_share').value,10);
 const g=p.growth.find(g=>g.key==='revenue'&&g.years===5);
 assert.ok(Math.abs(g.company.value-.2)<1e-12);assert.ok(Math.abs(g.per_share.value-(1.2/1.1-1))<1e-12);assert.equal(g.material,true);
 assert.ok(p.historical.at(-1).metrics.find(m=>m.key==='net_dilution').value>0);
 const missing=structuredClone(facts);missing.facts=missing.facts.filter(f=>f.item!=='diluted_avg_shares');
 assert.equal(perShareEconomics(missing,{},metrics,[]).growth[0].per_share.value,null);
});
test('forecast revenue/share works without inventing an FCF or EPS bridge',()=>{
 const forward=[{id:'central',assumptions:{segments:[{base_revenue:{period_end:'2025-12-31'}}]},rows:[{year:1,revenue:120,fcff:25,nopat:30}]}];
 const A={per_share_forecasts:{central:{reason:'illustrative',source:'analyst',base_shares:{value:10,source:'filing',period_end:'2025-12-31'},net_share_growth:[.1]}}};
 const rows=perShareEconomics(facts,A,metrics,forward).forecasts[0].rows[0].metrics;
 assert.equal(rows.find(m=>m.key==='revenue_per_share').value,120/11);
 assert.equal(rows.find(m=>m.key==='fcf_per_share').value,null);assert.equal(rows.find(m=>m.key==='eps').value,null);
 A.per_share_forecasts.central.net_share_growth=[-1];assert.throws(()=>perShareEconomics(facts,A,metrics,forward),/Invalid/);
});
test('wide scenario range forces low confidence; sensitivities preserve the central DCF',async()=>{
 const {forecastScenario,priceForecast}=await import('../forward.mjs');
 const s={years:10,wacc:.09,tax_rate:.21,terminal_growth:.025,terminal_roic:.15,corporate_costs:Array(10).fill(0),segments:[{base_revenue:{period_end:'2025-12-31',components:[{item:'revenue',value:100,sign:1,source:'fixture'}]},base_working_capital_ratio:.1,growth:Array(10).fill(.2),operating_margin:Array(10).fill(.4),depreciation_to_revenue:Array(10).fill(.01),capex_to_revenue:Array(10).fill(.02),working_capital_to_revenue:Array(10).fill(.1)}]};
 const capital={shares:10,cash:5,claims:10};
 const valuation=priceForecast(forecastScenario(s),s,capital);
 const v={central_model:{central_scenario_id:'central'},forward:scenarios.map(x=>({...x,assumptions:s,valuation})),capital,price:{value:300}};
 const A={valuation_assessment:{scenario_ids:['bear','central','upside'],range_reason:'Operating range'}};
 const before=JSON.stringify(v);const out=assessValuation(A,v);
 assert.equal(out.confidence,'Low');assert.equal(out.wide_dispersion,true);assert.deepEqual([out.range.low,out.range.high],[100,400]);
 const w=out.sensitivity.find(x=>x.variable==='wacc');assert.ok(w.values[0].value_per_share>w.values[1].value_per_share);
 assert.equal(JSON.stringify(v),before);
});
