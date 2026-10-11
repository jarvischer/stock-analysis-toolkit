const finite=Number.isFinite;
const money=n=>finite(n)?'$'+n.toLocaleString('en-US',{maximumFractionDigits:2}):'Not available';
const rounded=n=>finite(n)?'about $'+(Math.round(n/5)*5).toLocaleString('en-US'):'Not available';
const pct=n=>finite(n)?(100*n).toFixed(2)+'%':'Not available';
const esc=x=>String(x??'').replaceAll('|','\\|').replaceAll('\n',' ');
const table=(h,r)=>['| '+h.join(' | ')+' |','| '+h.map(()=>'---').join(' | ')+' |',...r.map(x=>'| '+x.map(esc).join(' | ')+' |')].join('\n')+'\n\n';
export function renderAssessment(v,result={}) {
 const a=v.assessment,c=v.central_model,p=a?.probabilities,ctx=a?.snapshot_context||{};
 if(!a)return '';
 const scenario=v.forward?.find(s=>s.id===c?.central_scenario_id);
 let text='## Investment Snapshot\n\n'+table(['Item','Assessment'],[
 ['Business classification',c?.business_profile||'Not classified'],['Current price',money(v.price?.value)+'; '+(v.price?.date||'date unavailable')],['Central valuation',rounded(a.central_value)],['Reasonable valuation range',a.range?rounded(a.range.low)+' to '+rounded(a.range.high)+' — scenario-supported, not statistical':'Not available'],['Valuation confidence',a.confidence],['Slowdown / Bear',rounded(a.scenarios?.[0]?.value)],['Upside',rounded(a.scenarios?.[2]?.value)],['Scenario-weighted expected value',p?.expected?rounded(p.expected.value):'Not assigned — insufficient evidence'],['Current price / central value',finite(scenario?.price_to_value)?scenario.price_to_value.toFixed(2)+'×; central value gap / price '+pct(scenario.gap_to_price):'Not available'],['Current price / expected value',finite(p?.expected?.price_to_expected_value)?p.expected.price_to_expected_value.toFixed(2)+'×':'Not available'],['Required Margin of Safety',pct(result.required_margin_of_safety)],['Business quality score',finite(result.quality_score)?result.quality_score+'/5':'Not supplied; see policy analysis'],['Primary valuation driver',ctx.driver||'Not documented'],['Most sensitive variables',(a.sensitivity||[]).slice(0,3).map(s=>s.variable).join(', ')||'Not assessed'],['Primary risk',ctx.risk||'Not documented'],['Primary thesis-break condition',ctx.thesis_break||'Not documented']]);
 text+='### Four separate questions\n\n'+table(['Question','Interpretation'],[['Business Quality','Is this a good business? Assess durability, returns on capital and stewardship; quality does not set its price.'],['Intrinsic Value','What are future cash flows reasonably worth? Use explicit operating assumptions and the confidence range.'],['Market Expectations',"What must the company achieve to justify today's price? Read the conditional What Must Be True operating paths and compare their plausibility with sourced evidence."],['Investment Decision','Consider quality, valuation, uncertainty, returns, required Margin of Safety and thesis risks together. The historical policy screen is one constraint; its failure alone is not a universal judgment about attractiveness.']]);
 text+='Expected value here is a probability-weighted present valuation, not an annualized or realized investment return. Estimating investor returns additionally requires a holding period, distributions, exit valuation and a consistent future share count.\n\n';
 text+='## Valuation confidence and uncertainty\n\n'+(a.confidence_method||a.reason)+'\n\n'+(a.wide_dispersion?'**Scenario values are widely dispersed; valuation uncertainty is high.**\n\n':'');
 if(a.range)text+=a.range.reason+' '+a.range.definition+'\n\n';
 text+=table(['Evidence factor','Risk','Reason','Source'],(a.factors||[]).map(f=>[f.key,f.risk,f.reason,f.source]));
 text+='### Central valuation sensitivity\n\nOne assumption changes at a time; rankings depend on these stated perturbations, not a universal measure of importance.\n\n'+table(['Variable','Shift (percentage points)','Lower input value/share','Higher input value/share'],(a.sensitivity||[]).map(s=>[s.variable,'±'+(s.step*100).toFixed(1),money(s.values[0].value_per_share),money(s.values[1].value_per_share)]));
 text+='## Scenario probabilities and expected value\n\n'+(p?.label||'Probabilities not assigned.')+'\n\n'+(p?.reason||'Probabilities cannot be responsibly assigned from available evidence.')+'\n\n';
 text+=table(['Scenario','Value/share','Probability','Contribution'],(a.scenarios||[]).map(s=>{const r=p?.expected?.contributions.find(r=>r.id===s.id);return[s.id,money(s.value),r?pct(r.probability):'Not assigned',r?money(r.contribution):'Not assigned'];}));
 if(p?.expected)text+='Expected value = Σ(scenario value × subjective probability) = '+money(p.expected.value)+'.\n\n';
 text+=(p?.sensitivity_label||'')+'\n\n'+table(['Combination','Scenario probabilities','Weighted valuation'],(p?.sensitivity||[]).map(s=>[s.reason,s.contributions.map(r=>r.id+': '+pct(r.probability)).join('; '),money(s.value)]));
 const ps=v.per_share_economics;
 if(ps){
 text+='## Per-share economics\n\n'+ps.definition+'\n\n'+ps.forecast_note+'\n\n';
 const rows=periods=>periods.map(r=>{const get=k=>r.metrics.find(m=>m.key===k)?.value;return[r.period_end,...['revenue_per_share','fcf_per_share','fcff_per_share','eps','sbc_per_share'].map(k=>money(get(k))),finite(get('diluted_shares'))?get('diluted_shares').toLocaleString('en-US',{maximumFractionDigits:0}):'Not available',pct(get('share_count_growth')??get('net_share_growth')),pct(get('sbc_to_revenue')),money(get('repurchases')),pct(get('net_dilution'))];});
 const headers=['Period end','Revenue/share','FCF/share','FCFF/share','EPS','SBC/share','Diluted average shares','Share growth','SBC/revenue','Repurchases USD','Net dilution'];
 text+='### Reported historical periods\n\n'+table(headers,rows(ps.historical));
 text+=table(['Measure','Years','Company CAGR','Per-share CAGR','Difference (pp)','Interpretation'],ps.growth.map(g=>[g.key,g.years,pct(g.company.value),pct(g.per_share.value),finite(g.difference.value)?(100*g.difference.value).toFixed(2):'Not available',g.interpretation]));
 for(const f of ps.forecasts){text+='### Per-share forecast: '+f.id+'\n\n'+(f.reason||f.assumptions.reason)+'\n\n';if(f.rows.length)text+='EPS below is an adjusted model proxy, not GAAP guidance.\n\n'+table(headers,rows(f.rows));if(f.growth)text+=table(['Forecast measure','Years','Start','End','Company CAGR','Per-share CAGR'],f.growth.map(g=>[g.key,g.years,g.start,g.end,pct(g.company.value),pct(g.per_share.value)]));}
 text+='All formulas, dated source inputs and reported/estimated bases are retained in per-share-economics.json and per-share-metrics.csv. Repurchase spending does not prove dilution was offset.\n\n';
 }
 return text;
}
