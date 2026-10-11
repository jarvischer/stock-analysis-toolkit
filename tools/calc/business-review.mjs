// Supplemental research inputs are explicitly sourced; estimates remain separate from SEC facts.
export function businessReview(facts, A, metrics) {
  const research = A.business_research;
  if (!research) return null;
  for (const e of research.evidence || []) {
    if (!e.id || !e.source || !e.as_of || !e.kind || !e.note || !Number.isFinite(e.value)) throw new Error('business_research evidence needs id, source, as_of, kind, note and finite value');
    if (!['reported','management_guidance','analyst_estimate','market_estimate','assumption'].includes(e.kind)) throw new Error('Unknown research evidence kind');
  }
  const byId = id => research.evidence.find(e => e.id === id);
  const last = facts.periods.at(-1);
  const metric = key => metrics.find(m => m.key === key && m.period_end === last && m.status === 'ok')?.value;
  const fact = item => facts.facts.find(f => f.item === item && f.period_end === last && Number.isFinite(f.value))?.value;
  const calculations = [];
  const calc = (key, formula, inputs, fn) => {
    const ok = Object.values(inputs).every(Number.isFinite), value = ok ? fn(inputs) : null;
    calculations.push({ key, formula, inputs, value: Number.isFinite(value) ? value : null, status: Number.isFinite(value) ? 'ok' : 'not_available' });
  };
  calc('ai-quarter-revenue-share','AI quarterly revenue / same-quarter consolidated revenue',{ai:byId('ai_q3_2026')?.value,total:byId('total_q3_2026')?.value},v=>v.total>0?v.ai/v.total:NaN);
  calc('ai-ttm-revenue','Sum of four successive AI quarterly revenues (management supplemental measure)',Object.fromEntries(['ai_q4_2025','ai_q1_2026','ai_q2_2026','ai_q3_2026'].map(id=>[id,byId(id)?.value])),v=>Object.values(v).reduce((a,b)=>a+b,0));
  calc('historical-revenue-cagr-5','Copy of calculated five-year consolidated revenue CAGR; includes acquisitions',{cagr:metric('revenue-cagr-5')},v=>v.cagr);
  calc('dividends-to-fcf','Reported cash dividends / annual FCF',{dividends:fact('dividends'),fcf:metric('fcf')},v=>v.fcf>0?v.dividends/v.fcf:NaN);
  calc('repurchases-to-fcf','Reported repurchases / annual FCF',{repurchases:fact('buybacks'),fcf:metric('fcf')},v=>v.fcf>0?v.repurchases/v.fcf:NaN);
  calc('distributions-to-fcf','(Dividends + repurchases) / annual FCF',{dividends:fact('dividends'),repurchases:fact('buybacks'),fcf:metric('fcf')},v=>v.fcf>0?(v.dividends+v.repurchases)/v.fcf:NaN);
  calc('fcf-after-distributions','FCF - dividends - repurchases; before debt repayments and acquisitions',{dividends:fact('dividends'),repurchases:fact('buybacks'),fcf:metric('fcf')},v=>v.fcf-v.dividends-v.repurchases);
  calc('vmware-cash-and-stock-consideration','Cash paid + fair value of shares issued; excludes assumed debt and acquired cash',{cash:byId('vmware_cash')?.value,stock:byId('vmware_stock_fair_value')?.value},v=>v.cash+v.stock);
  return { ...research, calculations, acquisition_return: { status:'not_identifiable', reason:'Consolidated incremental ROIC and software segment earnings do not isolate VMware standalone cash flows, integration costs, incremental capital or the counterfactual. No acquisition IRR is inferred from goodwill or segment growth.' } };
}
