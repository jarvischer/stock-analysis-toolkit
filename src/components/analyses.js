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

  function valuation(v) {
    if (!v || !Array.isArray(v.comparisons) || !Array.isArray(v.cash_flow_bases)) return '';
    const money = n => Number.isFinite(n) ? SAT.fmt.price(n) : '—';
    const rows = v.comparisons.map(c => `<tr data-valuation-case><td data-no-translate>${E(c.style)} / ${E(c.label)}</td><td data-no-translate>${E(c.status)}</td><td>${E(money(c.value_per_share))}</td><td>${Number.isFinite(c.price_to_value) ? E(c.price_to_value.toFixed(2)) + '×' : '—'}</td><td>${E(pct(c.gap_to_price))}</td><td>${E(pct(c.margin_of_safety))}</td></tr>`).join('');
    const bases = v.cash_flow_bases.map(b => `<tr><td data-no-translate>${E(b.label)}</td><td data-no-translate>${E(b.period_end || '')}</td><td>${E(num(b.value))}</td><td>${E(pct(b.required_growth))}</td></tr>`).join('');
    const forecasts = (v.forward || []).map(s => `<details><summary data-no-translate>${E(s.label)}</summary><p data-no-translate>${E(s.assumptions?.reason || '')}</p><p data-no-translate>${E(s.assumptions?.source || '')}</p><p data-no-translate>${E(s.explanation)}</p><div class="table-wrap"><table class="t"><thead><tr><th>Year</th><th>Revenue</th><th>Operating income</th><th>Taxes</th><th>Reinvestment</th><th>FCFF</th></tr></thead><tbody>${(s.rows || []).map(r => `<tr><td>${E(r.year)}</td>${['revenue', 'operating_income', 'taxes', 'reinvestment', 'fcff'].map(k => `<td>${E(num(r[k]))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`).join('');
    const sensitivity = [...(v.sensitivity || []), ...(v.forward_sensitivity || [])].map(s => `<tr><td data-no-translate>${E(s.basis || s.scenario)}</td><td>${E(pct(s.wacc))}</td><td>${E(pct(s.growth ?? s.growth_delta))}</td><td>${E(pct(s.terminal_growth))}</td><td>${E(money(s.value_per_share))}</td></tr>`).join('');
    return `<section class="card" data-valuation-comparison><h3>Valuation comparison</h3><p>These estimates use different assumptions. The conservative policy verdict remains separate.</p>
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
