// Additive uncertainty and subjective probability layer. Does not change any scenario DCF.
import {forecastScenario,priceForecast} from './forward.mjs';
const finite=Number.isFinite;
export const FACTORS=['forecast_visibility','revenue_concentration','cyclicality','margin_uncertainty','reinvestment_uncertainty','tax_uncertainty','customer_concentration','technological_disruption'];
const audit=(formula,inputs,period_end,basis='model_assumption')=>({formula,inputs,period_end,basis});
export function scenarioDistribution(config,scenarios,price,end) {
 const rows=scenarios.map(s=>({id:s.id,value_per_share:s.value_per_share,status:s.status}));
 const evaluate=(weights,reason)=>{
  if(!weights||Object.keys(weights).length!==rows.length||Object.keys(weights).some(k=>!rows.some(s=>s.id===k))||rows.some(s=>!finite(weights[s.id])||weights[s.id]<0||weights[s.id]>1))throw new Error('scenario probabilities must name each selected scenario exactly once with weights in [0,1]');
  const sum=Object.values(weights).reduce((a,b)=>a+b,0);if(Math.abs(sum-1)>1e-9)throw new Error('scenario probabilities must total 100%');
  const available=rows.every(s=>s.status==='ok'&&finite(s.value_per_share));
  const contributions=rows.map(s=>({...s,probability:weights[s.id],contribution:available?s.value_per_share*weights[s.id]:null,...audit('Scenario value per share × subjective probability',{scenario_value:s.value_per_share,probability:weights[s.id]},end)}));
  const value=available?contributions.reduce((a,s)=>a+s.contribution,0):null;
  return {reason,status:available?'ok':'not_available',value,contributions,price_to_expected_value:value>0&&price>0?price/value:null,gap_to_price:finite(value)&&price>0?value/price-1:null,...audit('Σ(scenario value per share × probability); price/value and value/price - 1 are valuation comparisons, not expected returns',{weights,scenario_values:rows,price},end)};
 };
 const assigned=config?.assigned;
 if(assigned&&(!assigned.reason?.trim()||!assigned.source?.trim()||!assigned.as_of?.trim()))throw new Error('assigned scenario probabilities require reason, source and as_of date');
 const sensitivity=config?.sensitivity||[{reason:'Downside-heavy illustrative sensitivity, not assigned beliefs',weights:Object.fromEntries(rows.map((s,i)=>[s.id,[.5,.35,.15][i]]))},{reason:'Central-heavy illustrative sensitivity, not assigned beliefs',weights:Object.fromEntries(rows.map((s,i)=>[s.id,[.25,.5,.25][i]]))},{reason:'Upside-heavy illustrative sensitivity, not assigned beliefs',weights:Object.fromEntries(rows.map((s,i)=>[s.id,[.15,.35,.5][i]]))}];
 if(!Array.isArray(sensitivity)||sensitivity.length>12)throw new Error('probability sensitivity requires at most 12 combinations');
 return {label:'Analyst-assigned subjective probabilities — not market-implied probabilities.',status:assigned?'assigned':'not_assigned',reason:assigned?.reason||config?.reason||'Probabilities cannot be responsibly assigned from the available evidence.',assignment:assigned||null,expected:assigned?evaluate(assigned.weights,assigned.reason):null,
  sensitivity_label:'Hypothetical probability combinations for sensitivity only; not assigned probabilities or measured likelihoods.',sensitivity:sensitivity.map(s=>{if(!s.reason?.trim())throw new Error('probability sensitivity needs an explanatory reason');return evaluate(s.weights,s.reason);})};
}
export function assessValuation(A,v) {
 const cfg=A.valuation_assessment;
 if(!cfg)return {status:'not_configured',confidence:'Low',reason:'No documented confidence assessment; absence of evidence is not high confidence.',range:null,sensitivity:[],probabilities:{status:'not_assigned',expected:null,sensitivity:[]}};
 const ids=cfg.scenario_ids;
 if(!Array.isArray(ids)||ids.length!==3||new Set(ids).size!==3||ids[1]!==v.central_model.central_scenario_id||!cfg.range_reason?.trim())throw new Error('valuation_assessment requires three distinct bear/central/upside scenario_ids including the selected central model and a range_reason');
 const scenarios=ids.map(id=>{const s=v.forward.find(s=>s.id===id);if(!s)throw new Error('valuation_assessment references an unknown scenario');return s;});
 const central=scenarios.find(s=>s.id===v.central_model.central_scenario_id),end=central.assumptions.segments[0].base_revenue.period_end;
 const available=scenarios.every(s=>s.status==='ok'&&finite(s.value_per_share));
 const lo=available?Math.min(...scenarios.map(s=>s.value_per_share)):null,hi=available?Math.max(...scenarios.map(s=>s.value_per_share)):null;
 const width=available&&central.value_per_share>0?(hi-lo)/central.value_per_share:null;
 const ratio=available&&lo>0?hi/lo:null;
 const wide=width!=null&&(width>1||(ratio!=null&&ratio>2));
 const factors=FACTORS.map(key=>{
  const f=cfg.factors?.[key];if(!f)return {key,risk:'unknown',reason:'No documented evidence supplied',source:null};
  if(!['low','medium','high','unknown'].includes(f.risk)||!f.reason?.trim()||!f.source?.trim())throw new Error('confidence factors require risk, reason and source');return {key,...f};
 });
 const terminal=central.valuation?.terminal_value_share;
 factors.push({key:'terminal_value_dependence',risk:terminal==null?'unknown':terminal>.75?'high':terminal>.5?'medium':'low',reason:'PV terminal value / enterprise value; above 75% is high, above 50% medium (framework judgment thresholds)',source:`valuation.forward.${central.id}.valuation`,thresholds:{high:.75,medium:.5},value:terminal,...audit('PV terminal value / enterprise value',{pv_terminal_value:central.valuation?.pv_terminal_value??null,enterprise_value:central.valuation?.enterprise_value??null},end,'calculated')});
 factors.push({key:'scenario_dispersion',risk:!available?'unknown':wide?'high':'low',reason:wide?'Scenario values are widely dispersed: valuation uncertainty is high.':'High dispersion means range width / central value > 100% or upside/downside > 2; framework thresholds, not statistical confidence.',source:'selected scenario DCFs',value:width,...audit('(maximum scenario value - minimum scenario value) / central value; positive maximum/minimum ratio',{minimum:lo,maximum:hi,central:central.value_per_share,ratio},end,'calculated')});
 const confidence=factors.some(f=>['high','unknown'].includes(f.risk))?'Low':factors.filter(f=>f.risk==='medium').length>=2?'Medium':'High';
 const base=central.assumptions;
 const probes=[['wacc',.01],['terminal_growth',.005],['terminal_roic',.03],['tax_rate',.05],['revenue_growth',.02],['operating_margin',.02],['capex_to_revenue',.01]];
 const sensitivity=probes.map(([variable,step])=>{
  const values=[-step,step].map(delta=>{
   const s=structuredClone(base);
   if(['revenue_growth','operating_margin','capex_to_revenue'].includes(variable))s.segments=s.segments.map(seg=>({...seg,[variable==='revenue_growth'?'growth':variable]:seg[variable==='revenue_growth'?'growth':variable].map(x=>x+delta)}));else s[variable]+=delta;
   const invalid=s.tax_rate<0||s.tax_rate>=1||s.segments.some(seg=>seg.capex_to_revenue.some(x=>x<0)||seg.operating_margin.some(x=>x < -1||x>1)||seg.growth.some(x=>x<=-1));
   const result=invalid?null:priceForecast(forecastScenario(s),s,v.capital);
   return {delta,value_per_share:result?.value_per_share??null,status:result?'ok':'not_available'};
  });
  return {variable,step,values,span:values.every(x=>finite(x.value_per_share))?Math.abs(values[1].value_per_share-values[0].value_per_share):null,...audit('Reprice unchanged central operating DCF with one assumption shifted in every forecast year; span = absolute difference between two values',{central_scenario:central.id,central_assumptions:base,variable,step,capital:v.capital},end,'sensitivity_estimate')};
 }).sort((a,b)=>(b.span??-1)-(a.span??-1));
 return {status:available?'ok':'not_available',central_value:central.value_per_share,confidence,confidence_method:'Conservative evidence rubric: any high or unknown risk => Low; at least two medium risks => Medium; otherwise High. This is an analyst evidence assessment, not a statistical probability.',factors,primary_uncertainties:factors.filter(f=>f.risk!=='low'),wide_dispersion:wide,
  range:available?{low:lo,high:hi,reason:cfg.range_reason,definition:'Scenario-supported working valuation range, not a statistical confidence interval or exhaustive bound.',...audit('Minimum and maximum of the three explicitly selected operating scenarios',{scenarios:scenarios.map(s=>({id:s.id,value:s.value_per_share}))},end,'scenario_estimate')}:null,
  display_values:{central:finite(central.value_per_share)?Math.round(central.value_per_share/5)*5:null,low:finite(lo)?Math.round(lo/5)*5:null,high:finite(hi)?Math.round(hi/5)*5:null,...audit('Round exact scenario-derived USD/share values to nearest $5 for conclusions',{central:central.value_per_share,low:lo,high:hi},end,'presentation_only')},sensitivity,scenarios:scenarios.map(s=>({id:s.id,value:s.value_per_share,status:s.status})),probabilities:scenarioDistribution(cfg.probabilities,scenarios,v.price?.value,end),snapshot_context:cfg.snapshot_context||null};
}
