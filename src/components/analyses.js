/* Analyses: import and show an analysis file from the value analyst agent (see agent/analyst.md). */
(function () {
  'use strict';
  const E = SAT.esc, KEY = 'analysis:last';
  const STATUS = { meets_rules: 'Meets your rules', does_not_meet_rules: 'Does not meet your rules', stopped: 'Stopped' };
  const pct = (v) => (v == null ? '—' : SAT.fmt.pct(v));
  const num = (v) => (v == null ? '—' : Math.abs(v) >= 1000 ? SAT.fmt.money(v) : String(Math.round(v * 10000) / 10000));
  const isAnalysis = (a) => a && typeof a === 'object' && Array.isArray(a.steps) && a.result && typeof a.result.status === 'string';

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
      return `<li><code>${E(f.item)}</code> ${E(f.period_end)}: <b>${E(num(f.value))}</b> — ${url ? `<a href="${E(url)}" target="_blank" rel="noopener">${E(f.source)}</a>` : E(f.source)}</li>`;
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
        </div>
        <p data-analysis-summary data-no-translate>${E(r.summary)}</p>
      </section>
      ${a.steps.map((s) => step(a, s)).join('')}`;
    view.querySelector('[data-analysis-empty]').hidden = true;
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
          if (!isAnalysis(a)) { SAT.toast('This file is not an analysis'); return; }
          SAT.store.set(KEY, a); render(el, a); SAT.toast('Analysis imported');
        });
      });
      const saved = SAT.store.get(KEY, null);
      if (isAnalysis(saved)) render(el, saved);
    },
  });
})();
