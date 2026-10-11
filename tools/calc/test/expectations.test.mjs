import test from 'node:test';
import assert from 'node:assert/strict';
import { solveOperatingGrowth, operatingExpectations, selectCentralModel } from '../expectations.mjs';
import { forecastScenario, priceForecast } from '../forward.mjs';
const s={id:'central',style:'growth',years:10,wacc:.09,tax_rate:.21,terminal_growth:.025,terminal_roic:.15,corporate_costs:Array(10).fill(0),segments:[{name:'business',base_revenue:{period_end:'2026-08-02',components:[{item:'revenue',value:100,sign:1,source:'fixture'}]},base_working_capital_ratio:.1,growth:Array(10).fill(.213),operating_margin:Array(10).fill(.45),depreciation_to_revenue:Array(10).fill(.01),capex_to_revenue:Array(10).fill(.02),working_capital_to_revenue:Array(10).fill(.1)}]};
const capital={shares:10,claims:15,cash:5};
test('inverse operating model recovers a known growth rate and reprices the complete DCF',()=>{
 const p=priceForecast(forecastScenario(s),s,capital).value_per_share;
 const answer=solveOperatingGrowth(s,capital,p,.45);
 assert.equal(answer.status,'ok');assert.ok(Math.abs(answer.growth-.213)<1e-10);assert.ok(Math.abs(answer.pricing_error)<1e-8);
 assert.ok(answer.rows[0].reinvestment>0);
 const grid={...s,segments:s.segments.map(x=>({...x,growth:Array(10).fill(.20)}))};
 assert.equal(solveOperatingGrowth(grid,capital,priceForecast(forecastScenario(grid),grid,capital).value_per_share,.45).status,'ok');
});
test('2030 and 2035 use distinct in-horizon rows, not two terminal valuations',()=>{
 const price={value:100};const comparison={capital,forward:[{id:s.id,status:'ok',assumptions:s}]};
 const out=operatingExpectations({operating_expectations:{scenario_id:'central',margins:[.35,.45,.55],target_years:[2030,2035]}},comparison,price);
 assert.equal(out.cases[0].milestones[0].period_end,'2030-08-02');assert.equal(out.cases[0].milestones[1].revenue,out.cases[0].rows[8].revenue);
 for(const c of out.cases)assert.ok(Math.abs(c.valuation.value_per_share-price.value)<1e-8);
 assert.ok(out.cases[0].required_revenue_cagr>out.cases[2].required_revenue_cagr);
 assert.throws(()=>operatingExpectations({operating_expectations:{scenario_id:'central',margins:[.4],target_years:[2040]}},comparison,price),/inside/);
});
test('central selection requires evidence and cannot be inferred from the highest price or style',()=>{
 assert.equal(selectCentralModel({},{}).status,'not_classified');
 assert.throws(()=>selectCentralModel({investment_classification:{}},{forward:[]}),/requires/);
 const config={business_profile:'two businesses',investment_lens:'growth',reason:'economic mix',central_scenario_id:'central',evidence:[{source:'filing',finding:'different margins'}]};
 const out=selectCentralModel({investment_classification:config},{forward:[{id:'higher',value_per_share:200,status:'ok'},{id:'central',value_per_share:100,status:'ok'}]});
 assert.equal(out.value_per_share,100);
});
test('missing capital and unsolvable nonnegative-growth cases do not produce fabricated results',()=>{
 assert.equal(solveOperatingGrowth(s,null,100,.4).status,'not_available');
 assert.equal(solveOperatingGrowth(s,capital,1e-9,.4).status,'no_solution_in_range');
});
