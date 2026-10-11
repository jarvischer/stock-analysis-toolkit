import {mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const csv = (headers,rows) => [headers,...rows].map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
export function exportExpectations(metrics,dir) {
 const v=metrics.valuation,w=v.operating_expectations,b=v.business_review;
 mkdirSync(dir,{recursive:true});
 writeFileSync(join(dir,'central-model.json'),JSON.stringify(v.central_model,null,2)+'\n');
 writeFileSync(join(dir,'operating-expectations.csv'),csv(['Assumed segment margin','Required revenue CAGR','Status','Period end','Revenue USD','Consolidated operating margin','Operating income USD','FCFF USD','Reinvestment USD','Pricing residual USD/share'],(w?.cases||[]).flatMap(c=>c.milestones.map(r=>[c.assumed_segment_operating_margin,c.required_revenue_cagr,c.status,r.period_end,r.revenue,r.operating_margin,r.operating_income,r.fcff,r.reinvestment,c.pricing_error]))));
 writeFileSync(join(dir,'operating-yearly.csv'),csv(['Assumed segment margin','Forecast year','Revenue USD','Operating income USD','Taxes USD','Depreciation USD','Capex USD','Change in OWC USD','FCFF USD'],(w?.cases||[]).flatMap(c=>c.rows.map(r=>[c.assumed_segment_operating_margin,r.year,r.revenue,r.operating_income,r.taxes,r.depreciation,r.capex,r.change_in_working_capital,r.fcff]))));
 writeFileSync(join(dir,'research-evidence.csv'),csv(['ID','Value raw units','Evidence type','As of','Interpretation','Source'],(b?.evidence||[]).map(e=>[e.id,e.value,e.kind,e.as_of,e.note,e.source])));
 writeFileSync(join(dir,'research-calculations.csv'),csv(['Key','Value raw units','Status','Formula','Inputs'],(b?.calculations||[]).map(c=>[c.key,c.value,c.status,c.formula,JSON.stringify(c.inputs)])));
}
