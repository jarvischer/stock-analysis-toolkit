const money = n => Number.isFinite(n) ? '$' + (n / 1e9).toFixed(2) + 'B' : 'Not available';
const pct = n => Number.isFinite(n) ? (n * 100).toFixed(2) + '%' : 'Not available';
const price = n => Number.isFinite(n) ? '$' + n.toFixed(2) : 'Not available';
const esc = x => String(x ?? '').replace(/\|/g,'\\|').replace(/\n/g,' ');
const table = (h,r) => ['| '+h.join(' | ')+' |','| '+h.map(()=>'---').join(' | ')+' |',...r.map(r=>'| '+r.map(esc).join(' | ')+' |')].join('\n')+'\n\n';
export function renderOperatingReview(v) {
  const c=v.central_model,w=v.operating_expectations,b=v.business_review;
  if(!c?.central_scenario_id) return '';
  let out='## Business classification and central valuation\n\n'+c.business_profile+'. '+c.investment_lens+'.\n\n'+c.reason+'\n\n**Central conditional estimate: '+(Number.isFinite(c.value_per_share)?'about $'+Math.round(c.value_per_share/5)*5:'Not available')+'; confidence '+(v.assessment?.confidence||'not assessed')+'** ('+c.status+'). Method: '+c.method+'. '+c.distinction+'\n\n';
  for(const e of c.evidence)out+='- '+e.finding+' [Source]('+e.source+')\n';
  out+='\n## What Must Be True?\n\n'+w.definition+'\n\n'+w.period_note+' All monetary amounts below are full-company USD billions; margins include SBC. Shares and net financial claims are held fixed. This is a conditional expectations test, not a prediction.\n\n';
  out+=table(['Assumed margin','Required annual revenue growth','Milestone period','Required revenue','Operating margin','Required FCFF'],w.cases.flatMap(c=>c.milestones.map(r=>[pct(c.assumed_segment_operating_margin),pct(c.required_revenue_cagr),r.period_end,money(r.revenue),pct(r.operating_margin),money(r.fcff)])));
  out+='WACC '+pct(w.assumptions.wacc)+', tax estimate '+pct(w.assumptions.tax_rate)+', terminal growth '+pct(w.assumptions.terminal_growth)+', terminal ROIC '+pct(w.assumptions.terminal_roic)+'. The solver recomputes investment needs as revenue grows. Higher reinvestment, dilution, or lower terminal returns would change these requirements.\n\n';
  if(!b)return out;
  const ev=id=>b.evidence.find(e=>e.id===id),value=id=>ev(id)?.value,link=id=>'[Source]('+ev(id)?.source+')';
  const calc=id=>b.calculations.find(x=>x.key===id)?.value;
  out+='## AI economics and execution risk\n\nQ3 AI revenue was '+money(value('ai_q3_2026'))+', '+pct(calc('ai-quarter-revenue-share'))+' of same-quarter consolidated revenue, growing '+pct(value('ai_q3_growth'))+' year over year. Management’s next-quarter AI guidance is '+money(value('ai_q4_guidance'))+'. These are supplemental AI measures, not a separate audited segment. '+link('ai_q3_2026')+'\n\n';
  out+='Four reported quarters sum to '+money(calc('ai-ttm-revenue'))+' of TTM AI revenue; the inputs are rounded management figures. AI is subtracted from total semiconductors to avoid double counting. The forecast separates AI, non-AI chips and infrastructure software.\n\n';
  const models=v.forward.filter(s=>['operating-central','ai-slowdown','ai-execution-upside'].includes(s.id));
  out+=table(['Operating case','Value/share','Period','AI revenue','Total revenue','FCFF'],models.flatMap(s=>[0,1,3,8].filter(i=>s.rows[i]).map(i=>{const r=s.rows[i];return[s.id,price(s.value_per_share),`${Number(w.base_date.slice(0,4))+r.year}${w.base_date.slice(4)}`,money(r.segments[0].revenue),money(r.revenue),money(r.fcff)];})));
  out+='The slowdown case combines weaker AI demand with margin compression. That loss of operating value is not captured by simply labeling Broadcom a growth company. Models retain the same WACC and terminal assumptions so the differences can be traced to operations.\n\n';
  out+='The latest quarter has '+pct(value('top_five_q3'))+' of total revenue tied to five end customers; one distributor accounts for '+pct(value('distributor_q3'))+'. These are different exposures and cannot be added. The exact AI-only customer distribution is not disclosed in the reviewed evidence. '+link('top_five_q3')+'\n\n';
  out+='## Compare required outcomes with external evidence\n\n';
  out+=table(['Evidence','Available benchmark','Implication and limit'],[
    ['Management guidance',money(value('ai_q4_guidance'))+' AI and '+money(value('total_q4_guidance'))+' total revenue for FY2026 Q4; '+pct(value('non_gaap_q4_margin_guidance'))+' non-GAAP operating margin', 'Supports rapid near-term growth. Non-GAAP margin is not our margin after SBC; quarterly guidance is not a decade forecast. '+link('ai_q4_guidance')],
    ['Analyst outlook',money(value('analyst_ai_2027'))+' AI in FY2027 and '+money(value('analyst_ai_2028'))+' in FY2028 discussed by Morningstar','The central AI case is below this aggressive ramp. One provider, not consensus; fiscal periods differ from our rolling periods. '+link('analyst_ai_2027')],
    ['Historical pace','Five-year consolidated revenue CAGR '+pct(calc('historical-revenue-cagr-5'))+'; reported AI quarterly growth '+pct(value('ai_q3_growth')),'Consolidated history includes acquisitions. The required operating-path CAGR can be compared numerically, but a quarterly AI surge cannot establish sustained organic growth through 2035.'],
    ['Potential market','AMD estimates more than '+money(value('market_2030'))+' of data-center silicon demand by 2030','A competitor’s broad market estimate, not Broadcom’s serviceable market. Total company revenue includes software and must not be divided by this figure as market share. No independently supported 2035 market estimate is supplied. '+link('market_2030')],
    ['Competition and constraints',b.competition,'Execution needs both customer spending and delivery capacity. Customer internal design, GPU ecosystems, alternative ASIC partners and systems passthrough can reduce margins.']]);
  out+=b.analyst_coverage+' '+b.management_coverage+' Consequently, no invented 2030/2035 consensus gap is displayed. The full required-outcome table is available for replacement with dated comparable estimates when obtained.\n\n';
  out+='## Does capital allocation create value?\n\n'+b.capital_allocation_conclusion+'\n\n';
  out+=table(['Measure','Calculated result','Interpretation'],[
    ['Dividends / annual FCF',pct(calc('dividends-to-fcf')),'Income distributions use cash that could otherwise fund debt reduction or reinvestment.'],
    ['Repurchases / annual FCF',pct(calc('repurchases-to-fcf')),'Spending on shares is not proof of value creation; compare execution price with value and net share-count change.'],
    ['Total distributions / annual FCF',pct(calc('distributions-to-fcf')),'Coverage is positive; it does not establish that the allocation was optimal.'],
    ['FCF after dividends and repurchases',money(calc('fcf-after-distributions')),'Before acquisitions and debt repayments; not unrestricted excess cash.'],
    ['VMware cash + stock consideration',money(calc('vmware-cash-and-stock-consideration')),'Stock is a real shareholder cost. This is not enterprise purchase price; assumed notes and acquired cash must be reconciled separately. '+link('vmware_cash')]]);
  out+='**Acquisition returns:** '+b.acquisition_return.reason+' Software cash generation and consolidated normalized ROIC provide supportive evidence, while customer retention, integration costs and the price paid remain essential. Goodwill records purchase accounting; it is neither an independent economic asset valuation nor proof that management destroyed value.\n\n**Dilution:** the fiscal-year increase in diluted shares despite repurchases weakens the capital-return claim. SBC expense and repurchase cash are different measurements; compare net shares and per-share cash growth, not their dollar difference alone.\n\n**Judgment:** capital allocation is mixed, with demonstrated cash generation but incomplete acquisition-specific return evidence. A positive deal IRR or a precise repurchase return is not claimed.\n\n';
  out+='## Research inputs and audit trail\n\n'+table(['Input','Value (raw units)','Type','As of','Meaning','Source'],b.evidence.map(e=>[e.id,e.value,e.kind,e.as_of,e.note,'[Source]('+e.source+')']));
  out+=table(['Calculation','Value (raw units)','Formula','Inputs'],b.calculations.map(c=>[c.key,c.value,c.formula,JSON.stringify(c.inputs)]));
  return out;
}
