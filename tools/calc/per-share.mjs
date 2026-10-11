// Shareholder diagnostics. These do not change the existing enterprise DCF.
const finite=Number.isFinite;
const gap=(a,b)=>{const d=(Date.parse(b)-Date.parse(a))/864e5;return d>=350&&d<=380;};
function metric(key,period_end,formula,inputs,fn,basis='reported-derived') {
 const usable=Object.values(inputs).every(x=>x&&finite(x.value)&&(!x.status||['ok','reported','adjusted','estimated'].includes(x.status)));
 const n=usable?fn(Object.fromEntries(Object.entries(inputs).map(([k,x])=>[k,x.value]))):null;
 const unit=/per_share|^eps$/.test(key)?'USD/share':key==='diluted_shares'?'shares':/growth|dilution|cagr|to_revenue/.test(key)?'ratio':'USD';
 return {key,period_end,formula,inputs,basis,unit,value:finite(n)?n:null,status:finite(n)?'ok':'not_available'};
}
export function perShareEconomics(facts,A,metrics,forward) {
 const fact=(item,end)=>facts.facts.find(f=>f.item===item&&f.period_end===end&&finite(f.value));
 const derived=(key,end)=>metrics.find(m=>m.key===key&&m.period_end===end&&m.status==='ok');
 const historical=facts.periods.map((end,i)=>{
  const shares=fact('diluted_avg_shares',end),previous=i&&gap(facts.periods[i-1],end)?fact('diluted_avg_shares',facts.periods[i-1]):null;
  const rows=[];
  const add=(key,formula,inputs,fn,basis)=>rows.push(metric(key,end,formula,inputs,fn,basis));
  for(const [key,input] of [['revenue',fact('revenue',end)],['fcf',derived('fcf',end)],['fcff',derived('fcff',end)],['sbc',fact('sbc',end)]])
   add(key+'_per_share',`${key} / split-adjusted weighted-average diluted shares`,{numerator:input,shares},x=>x.shares>0?x.numerator/x.shares:NaN,input?.basis||'reported-derived');
  add('eps','Reported diluted EPS (reported earnings numerator)',{reported:fact('eps_diluted',end)},x=>x.reported,'reported');
  add('diluted_shares','Reported split-adjusted weighted-average diluted shares',{shares},x=>x.shares,'reported');
  add('share_count_growth','Current / prior annual weighted-average diluted shares - 1',{shares,previous},x=>x.previous>0?x.shares/x.previous-1:NaN);
  add('net_dilution','Observed share-count growth, including issuance and repurchases; not SBC dollars minus repurchase dollars',{shares,previous},x=>x.previous>0?x.shares/x.previous-1:NaN);
  add('sbc_to_revenue','SBC / revenue',{sbc:fact('sbc',end),revenue:fact('revenue',end)},x=>x.revenue>0?x.sbc/x.revenue:NaN);
  add('repurchases','Reported repurchase cash expenditure',{cash:fact('buybacks',end)},x=>x.cash,'reported');
  return {period_end:end,metrics:rows};
 });
 const growth=[];
 for(const years of [3,5])for(const key of ['revenue','fcf']) {
  const end=facts.periods.at(-1),start=facts.periods.at(-1-years);
  const dates=facts.periods.slice(-1-years);const valid=start&&dates.length===years+1&&dates.slice(1).every((d,i)=>gap(dates[i],d));
  const flow=d=>key==='revenue'?fact('revenue',d):derived('fcf',d);
  const normalized=d=>{const f=flow(d),rev=fact('revenue',d);return f?{...f,value:f.value*(rev?.flags?.includes('long_year')&&rev.period_days?364/rev.period_days:1),annualization_basis:rev}:null;};
  const inputs={start:valid?normalized(start):null,end:normalized(end),start_shares:valid?fact('diluted_avg_shares',start):null,end_shares:fact('diluted_avg_shares',end)};
  const company=metric(`${key}_cagr_${years}`,end,`(annualized ending ${key} / annualized starting ${key})^(1/${years}) - 1`,{start:inputs.start,end:inputs.end},x=>x.start>0&&x.end>0?(x.end/x.start)**(1/years)-1:NaN);
  const per_share=metric(`${key}_per_share_cagr_${years}`,end,`((annualized ending ${key}/ending shares)/(annualized starting ${key}/starting shares))^(1/${years})-1`,inputs,x=>Object.values(x).every(n=>n>0)?((x.end/x.end_shares)/(x.start/x.start_shares))**(1/years)-1:NaN);
  const difference=metric('company_minus_per_share_growth',end,'Company CAGR - per-share CAGR',{company,per_share},x=>x.company-x.per_share);
  growth.push({key,years,start,end,company,per_share,difference,material:difference.value!=null&&Math.abs(difference.value)>=.02,interpretation:difference.value==null?'Insufficient comparable positive endpoints.':Math.abs(difference.value)>=.02?'Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute.':'Company and per-share CAGR differ by less than the framework materiality threshold of 2 percentage points.'});
 }
 const forecasts=forward.map(s=>{
  const cfg=A.per_share_forecasts?.[s.id];
  if(!cfg)return {id:s.id,status:'not_configured',reason:'No sourced diluted-share forecast. Per-share forecasts cannot be responsibly filled with a silent constant-share assumption.',rows:[]};
  if(!cfg.reason?.trim()||!cfg.source?.trim()||!cfg.base_shares?.source||!cfg.base_shares?.period_end||!(cfg.base_shares.value>0))throw new Error('per_share_forecasts require reason, source and dated positive base_shares with source');
  for(const k of ['net_share_growth','sbc_to_revenue','repurchases','after_tax_interest','non_operating_after_tax_income','other_cash_adjustments'])if(cfg[k]!=null&&(!Array.isArray(cfg[k])||cfg[k].length!==s.rows.length||cfg[k].some(x=>!finite(x)||(k==='net_share_growth'&&x<=-1)||(['sbc_to_revenue','repurchases','after_tax_interest'].includes(k)&&x<0))))throw new Error(`Invalid per-share forecast path: ${k}`);
  let shares=cfg.base_shares.value;
  const rows=s.rows.map((r,i)=>{
   const end=String(Number(s.assumptions.segments[0].base_revenue.period_end.slice(0,4))+r.year)+s.assumptions.segments[0].base_revenue.period_end.slice(4);
   const assumption=k=>finite(cfg[k]?.[i])?{value:cfg[k][i],source:cfg.source,reason:cfg.reason,period_end:end,basis:'analyst_assumption'}:null;
   const input=k=>({value:r[k],source:`valuation.forward.${s.id}.rows[${i}]`,period_end:end,basis:'operating_model_estimate'});
   const m=(key,formula,inputs,fn)=>metric(key,end,formula,inputs,fn,'analyst_estimate');
   const sh=m('diluted_shares','Prior forecast diluted shares × (1 + net share growth)',{prior:{value:shares,source:i?`prior forecast row ${i}`:cfg.base_shares.source,period_end:i?String(Number(end.slice(0,4))-1)+end.slice(4):cfg.base_shares.period_end},growth:assumption('net_share_growth')},x=>x.prior*(1+x.growth));shares=sh.value;
   const sbc=m('sbc','Forecast revenue × SBC/revenue',{revenue:input('revenue'),rate:assumption('sbc_to_revenue')},x=>x.revenue*x.rate);
   const fcf=m('fcf','FCFF - after-tax interest + SBC + other cash adjustments (explicit OCF-style bridge)',{fcff:input('fcff'),interest:assumption('after_tax_interest'),sbc,other:assumption('other_cash_adjustments')},x=>x.fcff-x.interest+x.sbc+x.other);
   const income=m('income','NOPAT - after-tax interest + after-tax nonoperating income; adjusted proxy, not reported GAAP EPS',{nopat:input('nopat'),interest:assumption('after_tax_interest'),other:assumption('non_operating_after_tax_income')},x=>x.nopat-x.interest+x.other);
   const records=[sh,...[['revenue_per_share',input('revenue')],['fcff_per_share',input('fcff')],['fcf_per_share',fcf],['eps',income],['sbc_per_share',sbc]].map(([key,numerator])=>m(key,'Numerator / forecast weighted-average diluted shares',{numerator,shares:sh},x=>x.shares>0?x.numerator/x.shares:NaN)),...['sbc_to_revenue','repurchases','net_share_growth'].map(key=>m(key,'Explicit analyst forecast assumption',{assumption:assumption(key)},x=>x.assumption))];
   records.push({...records.find(x=>x.key==='net_share_growth'),key:'net_dilution',formula:'Forecast effective net diluted share-count growth; repurchases already reflected in the share path'});
   return {period_end:end,metrics:records};
  });
  const growth=[];
  for(const years of [3,5])for(const key of ['revenue','fcf']) {
   const first=rows[0],last=rows[years];
   const endpoint=r=>r?.metrics.find(m=>m.key===key+'_per_share');
   const start=endpoint(first),end=endpoint(last);
   const inputs={start,end};
   const per_share=mGrowth('per_share',inputs,x=>x.start>0&&x.end>0?(x.end/x.start)**(1/years)-1:NaN);
   const company=mGrowth('company',{start:start?.inputs.numerator,end:end?.inputs.numerator},x=>x.start>0&&x.end>0?(x.end/x.start)**(1/years)-1:NaN);
   function mGrowth(basis,inputs,fn){return metric(key+'_'+basis+'_cagr_'+years,last?.period_end||first?.period_end,`(Ending ${basis} ${key} / starting ${basis} ${key})^(1/${years}) - 1`,inputs,fn,'analyst_estimate');}
   growth.push({key,years,start:first?.period_end,end:last?.period_end||null,company,per_share,difference:metric('company_minus_per_share_growth',last?.period_end,'Company CAGR - per-share CAGR',{company,per_share},x=>x.company-x.per_share,'analyst_estimate')});
  }
  return {id:s.id,status:'estimated',assumptions:cfg,rows,growth};
 });
 return {definition:'Historical flows use matching split-adjusted weighted-average diluted shares, not point-in-time shares outstanding. Observed diluted share changes include repurchases, issuance and dilution-accounting effects; they do not identify gross issuance separately.',forecast_note:'Forecast share paths are explicit analyst diagnostics; they do not reprice the existing enterprise DCF. Its current-share denominator and expensed SBC remain unchanged. Forecast EPS is an adjusted operating proxy when scenario margins exclude acquisition amortization. Missing bridge inputs make FCF/EPS unavailable.',historical,growth,forecasts};
}
