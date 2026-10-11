/* Analyses: import and show an analysis file from the value analyst agent (see agent/analyst.md). */
(function () {
  'use strict';
  const E = SAT.esc, KEY = 'analysis:last';
  const STATUS = { meets_rules: 'Meets your rules', does_not_meet_rules: 'Does not meet your rules', stopped: 'Stopped' };
  const LEVEL = { high: 'High evidence', medium: 'Medium evidence', low: 'Low evidence' };
  const pct = (v) => (v == null ? '—' : SAT.fmt.pct(v));
  const num = (v) => (v == null ? '—' : Math.abs(v) >= 1000 ? SAT.fmt.money(v) : String(Math.round(v * 10000) / 10000));
  const isStep = (s) => s && typeof s === 'object' && ['facts', 'calculations', 'drivers', 'open_questions', 'cards'].every((k) => Array.isArray(s[k]));
  const objects = a => Array.isArray(a) && a.every(v => v && typeof v === 'object' && !Array.isArray(v));
  const isValuation = v => v == null || (typeof v === 'object' && objects(v.comparisons) && objects(v.cash_flow_bases) &&
    (v.operating_expectations == null || objects(v.operating_expectations.cases) && v.operating_expectations.cases.every(c => objects(c.milestones))) &&
    (v.assessment == null || typeof v.assessment === 'object' && ['factors','sensitivity','scenarios'].every(k=>v.assessment[k]==null||objects(v.assessment[k])) && (v.assessment.sensitivity||[]).every(s=>objects(s.values)&&s.values.length===2) && (v.assessment.probabilities==null || (v.assessment.probabilities.sensitivity==null||objects(v.assessment.probabilities.sensitivity)&&v.assessment.probabilities.sensitivity.every(s=>objects(s.contributions))) && (v.assessment.probabilities.expected==null||objects(v.assessment.probabilities.expected.contributions)))) &&
    (v.per_share_economics == null || objects(v.per_share_economics.historical)&&v.per_share_economics.historical.every(r=>objects(r.metrics))&&objects(v.per_share_economics.growth)&&objects(v.per_share_economics.forecasts)&&v.per_share_economics.forecasts.every(f=>objects(f.rows)&&f.rows.every(r=>objects(r.metrics)))) &&
    (v.business_review == null || objects(v.business_review.evidence) && (v.business_review.calculations == null || objects(v.business_review.calculations))) &&
    ['sensitivity', 'forward_sensitivity'].every(k => v[k] == null || objects(v[k])) &&
    (v.forward == null || objects(v.forward) && v.forward.every(s => objects(s.rows))));
  const isAnalysis = (a) => a && typeof a === 'object' && Array.isArray(a.steps) && a.steps.every(isStep) && a.result && typeof a.result.status === 'string' && isValuation(a.valuation);
  const forget = () => { try { localStorage.removeItem('sat:' + KEY); } catch (e) { /* storage unavailable */ } };

  function secUrl(cik, source) {
    const m = /(\d{10}-\d{2}-\d{6})/.exec(source || '');
    return m && /^\d+$/.test(String(cik)) ? `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${m[1].replace(/-/g, '')}/` : null;
  }
  function card(id) {
    return SAT.C[id] ? `<a href="${SAT.href(id)}">${E(SAT.C[id].title)}</a>` : `<span>${E(id)}</span>`;
  }

  function step(a, s) {
    const facts = s.facts.map((f) => {
      const url = secUrl(a.cik, f.source);
      const text = f.file ? ` <span class="muted">(from report text)</span><br><q data-no-translate>${E(f.quote)}</q>` : '';
      return `<li data-fact${f.file ? ' data-text-fact' : ''}><code>${E(f.item)}</code> ${E(f.period_end || '')}: <b>${E(num(f.value))}</b> — ${url ? `<a href="${E(url)}" target="_blank" rel="noopener">${E(f.source)}</a>` : E(f.source)}${text}</li>`;
    }).join('');
    const calcs = s.calculations.map((c) => `<li data-calc><code>${E(c.metric)}</code> ${E(c.period_end)}: <b>${E(num(c.value))}</b> — ${E(c.explanation)}</li>`).join('');
    const drivers = s.drivers.map((d) => `<li>${E(d.text)} <span class="muted">— <span data-label>Would change if</span>: ${E(d.reversing_change)}</span></li>`).join('');
    const block = (label, items) => (items ? `<h4>${label}</h4><ul>${items}</ul>` : '');
    return `<article class="card" data-step="${E(s.n)}">
      <header><h3><span data-label>Step</span> ${E(s.n)} — <span data-no-translate>${E(s.title)}</span></h3>${s.score != null ? `<span class="num"><span data-label>Score</span> ${E(s.score)}/5</span>` : ''}</header>
      <div data-no-translate><p>${E(s.reason)}</p></div>
      ${block('Decision drivers', drivers ? `<div data-no-translate>${drivers}</div>` : '')}
      ${block('Facts', facts)}
      ${block('Calculations', calcs ? `<div data-no-translate>${calcs}</div>` : '')}
      ${block('Open questions', s.open_questions.map((q) => `<li data-no-translate>${E(q)}</li>`).join(''))}
      ${s.cards.length ? `<p class="rel"><span data-label>Related cards</span>: ${s.cards.map(card).join(' · ')}</p>` : ''}
    </article>`;
  }

  function investmentSnapshot(v, result) {
    const a=v?.assessment, p=a?.probabilities, ps=v?.per_share_economics;
    if(!a)return '';
    const round=n=>Number.isFinite(n)?'about $'+(Math.round(n/5)*5).toLocaleString('en-US'):'Not available';
    const table=(headers,rows)=>`<div class="table-wrap"><table class="t"><thead><tr>${headers.map(x=>`<th>${E(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${E(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    const central=v.forward?.find(s=>s.id===v.central_model?.central_scenario_id);
    const context=a.snapshot_context||{};
    let out=`<section class="card" data-investment-snapshot data-no-translate><h3>Investment Snapshot</h3>`+table(['Item','Assessment'],[
      ['Business classification',v.central_model?.business_profile],['Current price',SAT.fmt.price(v.price?.value)+'; '+v.price?.date],['Central valuation',round(a.central_value)],['Reasonable valuation range',a.range?round(a.range.low)+' to '+round(a.range.high):'Not available'],['Valuation confidence',a.confidence],['Slowdown / Bear',round(a.scenarios?.[0]?.value)],['Upside',round(a.scenarios?.[2]?.value)],['Scenario-weighted expected value',p?.expected?round(p.expected.value):'Not assigned — insufficient evidence'],['Current price / central value',num(central?.price_to_value)+'×'],['Current price / expected value',p?.expected?num(p.expected.price_to_expected_value)+'×':'Not available'],['Required Margin of Safety',pct(result.required_margin_of_safety)],['Business quality score',num(result.quality_score)+'/5'],['Primary valuation driver',context.driver||'Not documented'],['Primary risk',context.risk||'Not documented'],['Primary thesis-break condition',context.thesis_break||'Not documented']]);
    out+='<h4>Four separate questions</h4><p><b>Business Quality:</b> Is this a good business? <b>Intrinsic Value:</b> What are its future cash flows reasonably worth? <b>Market Expectations:</b> What outcomes justify today’s price? <b>Investment Decision:</b> Is the investment attractive given quality, uncertainty, returns, Margin of Safety and risks?</p><p>Quality does not determine value. Failure of a conservative historical policy screen alone is not a universal investment conclusion. A weighted present valuation is not an expected annual investment return.</p>';
    out+=`<h4>Valuation confidence: ${E(a.confidence)}</h4><p>${E(a.confidence_method||a.reason)}</p><p>${E(a.range?.definition)}</p>${a.wide_dispersion?'<p><b>Scenario values are widely dispersed; valuation uncertainty is high.</b></p>':''}`;
    out+=table(['Factor','Risk','Evidence','Source'],(a.factors||[]).map(f=>[f.key,f.risk,f.reason,f.source]));
    out+=table(['Sensitivity variable','Input shift (pp)','Lower input value/share','Higher input value/share'],(a.sensitivity||[]).map(s=>[s.variable,'±'+s.step*100,num(s.values[0].value_per_share),num(s.values[1].value_per_share)]));
    out+=`<h4>Scenario probabilities and expected value</h4><p>${E(p?.label)}</p><p>${E(p?.reason)}</p>`;
    out+=table(['Scenario','Value/share','Probability','Contribution'],(a.scenarios||[]).map(s=>{const r=p?.expected?.contributions?.find(r=>r.id===s.id);return[s.id,num(s.value),r?pct(r.probability):'Not assigned',r?num(r.contribution):'Not assigned'];}));
    out+=`<p>${E(p?.sensitivity_label)}</p>`+table(['Illustrative combination','Weights','Weighted valuation'],(p?.sensitivity||[]).map(s=>[s.reason,s.contributions.map(c=>c.id+': '+pct(c.probability)).join('; '),num(s.value)]));
    if(ps){
      out+=`<h4>Per-share economics</h4><p>${E(ps.definition)}</p><p>${E(ps.forecast_note)}</p>`;
      const periods=(title,rows)=>`<details><summary>${E(title)}</summary>`+table(['Period','Metric','Value (USD/share, shares, USD or ratio)','Basis','Formula'],rows.flatMap(r=>r.metrics.map(m=>[r.period_end,m.key,m.value==null?'Not available':num(m.value),m.basis,m.formula])))+'</details>';
      out+=periods('Historical per-share economics',ps.historical||[]);
      out+=table(['Measure','Years','Company CAGR','Per-share CAGR','Interpretation'],(ps.growth||[]).map(g=>[g.key,g.years,pct(g.company.value),pct(g.per_share.value),g.interpretation]));
      for(const f of ps.forecasts||[])out+=`<p>${E(f.reason||f.assumptions?.reason)}</p>`+periods('Forecast: '+f.id,f.rows||[]);
    }
    out+=`<details><summary>Full formulas, periods, source inputs and assumptions</summary><pre>${E(JSON.stringify({assessment:a,per_share_economics:ps},null,2))}</pre></details></section>`;
    return out;
  }

  function operatingReview(v) {
    const c = v.central_model, w = v.operating_expectations, b = v.business_review;
    if (!c?.central_scenario_id) return '';
    const milestones = (w?.cases || []).flatMap(s => (s.milestones || []).map(r => `<tr><td>${E(pct(s.assumed_segment_operating_margin))}</td><td>${E(pct(s.required_revenue_cagr))}</td><td>${E(r.period_end)}</td><td>${E(num(r.revenue))}</td><td>${E(pct(r.operating_margin))}</td><td>${E(num(r.fcff))}</td></tr>`)).join('');
    const calculations = (b?.calculations || []).map(r => `<li><code>${E(r.key)}</code>: <b>${E(/-share|-to-fcf|-cagr-/.test(r.key) ? pct(r.value) : num(r.value))}</b> — ${E(r.formula)}</li>`).join('');
    const evidence = (b?.evidence || []).map(e => `<li><code>${E(e.id)}</code>: ${E(num(e.value))} — ${E(e.kind)}, ${E(e.as_of)}. ${E(e.note)} <small>${E(e.source)}</small></li>`).join('');
    return `<section data-operating-review data-no-translate><h3>Central valuation and business classification</h3><p>${E(c.business_profile)}</p><p>${E(c.investment_lens)}</p><p><b>about $${E(Math.round(c.value_per_share/5)*5)} /share — confidence ${E(v.assessment?.confidence||'not assessed')}</b></p><p>${E(c.reason)}</p><p>${E(c.distinction)}</p><h3>What Must Be True?</h3><p>${E(w?.definition)}</p><p>${E(w?.period_note)}</p><div class="table-wrap"><table class="t"><thead><tr><th>Assumed margin</th><th>Required revenue growth</th><th>Period end</th><th>Revenue</th><th>Operating margin</th><th>FCFF</th></tr></thead><tbody>${milestones}</tbody></table></div><h3>AI, capital allocation and external evidence</h3><ul>${calculations}</ul><p>${E(b?.capital_allocation_conclusion)}</p><p>${E(b?.acquisition_return?.reason)}</p><p>${E(b?.analyst_coverage)}</p><p>${E(b?.management_coverage)}</p><p>${E(b?.competition)}</p><details><summary>Research sources and assumptions</summary><ul>${evidence}</ul></details></section>`;
  }

  function valuation(v) {
    if (!v || !Array.isArray(v.comparisons) || !Array.isArray(v.cash_flow_bases)) return '';
    const money = n => Number.isFinite(n) ? SAT.fmt.price(n) : '—';
    const rows = v.comparisons.map(c => `<tr data-valuation-case><td data-no-translate>${E(c.style)} / ${E(c.label)}</td><td data-no-translate>${E(c.status)}</td><td>${E(money(c.value_per_share))}</td><td>${Number.isFinite(c.price_to_value) ? E(c.price_to_value.toFixed(2)) + '×' : '—'}</td><td>${E(pct(c.gap_to_price))}</td><td>${E(pct(c.margin_of_safety))}</td></tr>`).join('');
    const bases = v.cash_flow_bases.map(b => `<tr><td data-no-translate>${E(b.label)}</td><td data-no-translate>${E(b.period_end || '')}</td><td>${E(num(b.value))}</td><td>${E(pct(b.required_growth))}</td></tr>`).join('');
    const forecasts = (v.forward || []).map(s => `<details><summary data-no-translate>${E(s.label)}</summary><p data-no-translate>${E(s.assumptions?.reason || '')}</p><p data-no-translate>${E(s.assumptions?.source || '')}</p><p data-no-translate>${E(s.explanation)}</p><div class="table-wrap"><table class="t"><thead><tr><th>Year</th><th>Revenue</th><th>Operating income</th><th>Taxes</th><th>Reinvestment</th><th>FCFF</th></tr></thead><tbody>${(s.rows || []).map(r => `<tr><td>${E(r.year)}</td>${['revenue', 'operating_income', 'taxes', 'reinvestment', 'fcff'].map(k => `<td>${E(num(r[k]))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`).join('');
    const sensitivity = [...(v.sensitivity || []), ...(v.forward_sensitivity || [])].map(s => `<tr><td data-no-translate>${E(s.basis || s.scenario)}</td><td>${E(pct(s.wacc))}</td><td>${E(pct(s.growth ?? s.growth_delta))}</td><td>${E(pct(s.terminal_growth))}</td><td>${E(money(s.value_per_share))}</td></tr>`).join('');
    return `<section class="card" data-valuation-comparison>${operatingReview(v)}<h3>Valuation comparison</h3><p>These estimates use different assumptions. The conservative policy verdict remains separate.</p>
      <div class="table-wrap"><table class="t"><thead><tr><th>Model</th><th>Status</th><th>Value per share</th><th>Price / value</th><th>Value gap versus price</th><th>Margin of safety</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p>Value gap uses price as the denominator. Margin of safety uses estimated value. Neither is a predicted return.</p>
      <h4>Cash flow starting points</h4><div class="table-wrap"><table class="t"><thead><tr><th>Basis</th><th>Date</th><th>FCFF</th><th>Conditional required growth</th></tr></thead><tbody>${bases}</tbody></table></div>
      <p>Required growth depends on the starting cash flow and model assumptions; it is not an observed market forecast.</p>
      <h4>Explicit forward forecasts</h4>${forecasts}
      <details><summary>Sensitivity analysis</summary><p data-no-translate>${E(v.sensitivity_note)}</p><div class="table-wrap"><table class="t"><thead><tr><th>Basis</th><th>WACC</th><th>Growth or growth shift</th><th>Terminal growth</th><th>Value per share</th></tr></thead><tbody>${sensitivity}</tbody></table></div></details></section>`;
  }

  function render(view, a) {
    const r = a.result;
    view.querySelector('[data-analysis-out]').innerHTML = `
      <section class="card verdict-card">
        <h3 data-no-translate>${E(a.company)} (${E(a.ticker)})</h3>
        <p data-analysis-status data-status="${E(r.status)}"><b>${E(STATUS[r.status] || r.status)}</b>${r.stopped_at_step != null ? ` — <span data-label>Step</span> ${E(r.stopped_at_step)}` : ''}</p>
        <div class="metrics">
          <div class="metric"><div class="ml">Quality score</div><div class="mv">${r.quality_score == null ? '—' : E(r.quality_score) + '/5'}</div></div>
          <div class="metric"><div class="ml">Margin of safety</div><div class="mv">${E(pct(r.margin_of_safety))}</div></div>
          <div class="metric"><div class="ml">Required margin of safety</div><div class="mv">${E(pct(r.required_margin_of_safety))}</div></div>
          <div class="metric"><div class="ml">Data as of</div><div class="mv" data-no-translate>${E(a.data_as_of)}</div></div>
          <div class="metric"><div class="ml">Evidence level</div><div class="mv" data-evidence="${E(a.evidence?.level || '')}">${E(LEVEL[a.evidence?.level] || '—')}</div>
            <div class="muted">${E(a.evidence?.history_years ?? '—')} years of data</div></div>
        </div>
        <p data-analysis-summary data-no-translate>${E(r.summary)}</p>
      </section>
      ${investmentSnapshot(a.valuation, r)}
      ${valuation(a.valuation)}
      ${a.steps.map((s) => step(a, s)).join('')}`;
    view.querySelector('[data-analysis-empty]').hidden = true;
  }

  // Show an analysis; a file that still fails to render leaves the page usable.
  function show(el, a) {
    try { render(el, a); return true; } catch (e) {
      console.error(e);
      el.querySelector('[data-analysis-out]').innerHTML = '';
      el.querySelector('[data-analysis-empty]').hidden = false;
      return false;
    }
  }

  SAT.register({
    id: 'tool-analyses', group: 'tools', title: 'Analyses',
    render(el) {
      el.innerHTML = `<div class="page-head"><div class="sec-num">Tool</div><h2>Analyses</h2>
        <p>Results of the value analyst agent. Each step shows its facts, calculations, sources and decision drivers. The agent never recommends to buy or sell.</p></div>
        <div class="btns"><button class="btn" data-analysis-pick>Import analysis</button><input type="file" accept="application/json" data-analysis-file hidden></div>
        <p class="muted" data-analysis-empty>No analysis loaded. Run the value analyst agent, then import its JSON file.</p>
        <div data-analysis-out></div>`;
      const input = el.querySelector('[data-analysis-file]');
      el.querySelector('[data-analysis-pick]').addEventListener('click', () => input.click());
      input.addEventListener('change', () => {
        const f = input.files[0]; if (!f) return;
        f.text().then((t) => {
          let a; try { a = JSON.parse(t); } catch (e) { a = null; }
          if (!isAnalysis(a) || !show(el, a)) { SAT.toast('This file is not an analysis'); return; }
          SAT.store.set(KEY, a); SAT.toast('Analysis imported');
        });
      });
      const saved = SAT.store.get(KEY, null);
      if (saved != null && !(isAnalysis(saved) && show(el, saved))) forget();
    },
  });
})();
