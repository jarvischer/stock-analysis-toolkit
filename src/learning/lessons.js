/* Guided lessons, reusable exercises, statement tracing, and a fictional case. */
(function () {
  'use strict';
  const E = SAT.esc;
  SAT.EXERCISES = SAT.content.lessons.exercises;
  function records() { const v = SAT.store.get('learning-results', {}); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
  SAT.exercise = function (id, key, onPass) {
    const q = SAT.EXERCISES[id];
    const node = SAT.el(`<form class="practice"><h4>Check your understanding</h4><p>${E(q.question)}</p>
      ${q.choices ? `<fieldset><legend>Choose an answer</legend>${q.choices.map((c, i) => `<label class="answer-choice"><input type="radio" name="answer" value="${i}"> ${E(c)}</label>`).join('')}</fieldset>` : `<label class="answer-label">Your answer (${E(q.unit)}) <input name="answer" inputmode="decimal" autocomplete="off" placeholder="Enter a number"></label>`}
      <div class="btns"><button class="btn" type="submit">Check answer</button><button class="btn ghost" type="button" data-hint>Show hint</button></div>
      <p data-hint-text hidden>${E(q.hint)}</p><p class="exercise-feedback" role="status" aria-live="polite"></p></form>`);
    const feedback = node.querySelector('.exercise-feedback');
    if (records()[key]?.passed) feedback.textContent = 'Previously completed. Try again to check your understanding.';
    node.querySelector('[data-hint]').addEventListener('click', (e) => {
      const p = node.querySelector('[data-hint-text]'); p.hidden = !p.hidden;
      e.target.textContent = p.hidden ? 'Show hint' : 'Hide hint';
    });
    node.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = q.choices ? node.querySelector('input:checked')?.value : node.elements.answer.value.trim();
      const value = raw == null || raw === '' ? NaN : SAT.parse(raw);
      if (!Number.isFinite(value)) { feedback.textContent = 'Enter a number or choose an answer before checking.'; return; }
      const passed = Math.abs(value - q.answer) < 0.01;
      feedback.textContent = passed ? 'Correct. ' + q.explanation : 'Not quite. ' + q.hint + ' Try again.';
      feedback.classList.toggle('correct', passed);
      const saved = records(); saved[key] = { passed: passed || !!saved[key]?.passed }; SAT.store.set('learning-results', saved);
      if (passed && onPass) onPass();
    });
    return node;
  };
  const paths = SAT.content.lessons.paths;
  const lessonKey = (path, id) => path.id + ':' + id;
  SAT.register({ id: 'learning', group: 'learning', title: 'Learning paths', render(el) {
    el.innerHTML = `<div class="page-head"><div class="sec-num">Start here</div><h2>Learn stock analysis by doing</h2><p>Four guided paths. Read an explanation, solve a problem, and apply the idea. Start with financial statements if you are new.</p></div><div class="learning-grid">${paths.map((p, i) => {
      const done = p.lessons.filter((id) => records()[lessonKey(p, id)]?.passed).length;
      return `<article class="card"><div class="sec-num">Path ${i + 1} · About ${p.lessons.length === 5 ? 15 : 10} minutes</div><h3>${p.title}</h3><p>${p.summary}</p><p>${done} of ${p.lessons.length} exercises completed</p><a class="btn" href="#${p.id}">${done ? 'Continue or review' : 'Start path'}</a></article>`;
    }).join('')}</div><div class="card"><h3>Put the ideas together</h3><p>Trace figures in the Statement Map, then analyze Cedar Works, a fictional manufacturer.</p><div class="btns"><a class="btn ghost" href="#statements">Explore statements</a><a class="btn ghost" href="#company-case">Analyze Cedar Works</a></div></div>`;
  } });
  paths.forEach((path) => SAT.register({ id: path.id, group: 'learning', title: path.title, render(el) {
    let step = path.lessons.findIndex((id) => !records()[lessonKey(path, id)]?.passed); if (step < 0) step = 0;
    function draw() {
      const id = path.lessons[step], c = SAT.C[id];
      el.innerHTML = `<div class="page-head"><a href="#learning">← All learning paths</a><h2>${path.title}</h2><p>${path.summary}</p></div><nav class="lesson-steps" aria-label="Lessons">${path.lessons.map((lid, i) => `<button class="chip${i === step ? ' on' : ''}" data-step="${i}" aria-current="${i === step ? 'step' : 'false'}">${i + 1}. ${E(SAT.C[lid].title)}${records()[lessonKey(path, lid)]?.passed ? ' ✓' : ''}</button>`).join('')}</nav><article class="card lesson-content" tabindex="-1"><div class="sec-num">Lesson ${step + 1} of ${path.lessons.length}</div><h3>${E(c.title)}</h3><p>${c.what}</p><div class="fx">${c.formula || c.short}</div><p>${c.interp}</p><div data-exercise></div><p>${SAT.link(id, 'Open the full reference card')}</p><div class="btns"><button class="btn ghost" data-back ${step === 0 ? 'disabled' : ''}>Previous lesson</button><button class="btn" data-next ${records()[lessonKey(path, id)]?.passed ? '' : 'disabled'}>${step === path.lessons.length - 1 ? 'Finish path' : 'Next lesson'}</button></div><p class="muted">Answer correctly to continue. You can review any lesson using the buttons above.</p></article>`;
      el.querySelector('[data-exercise]').appendChild(SAT.exercise(id, lessonKey(path, id), () => {
        el.querySelector('[data-next]').disabled = false;
        const tab = el.querySelector(`[data-step="${step}"]`); if (!tab.textContent.endsWith('✓')) tab.textContent += ' ✓';
      }));
      const change = (n) => { step = n; draw(); el.querySelector('.lesson-content').focus(); };
      el.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => change(+b.dataset.step)));
      el.querySelector('[data-back]').addEventListener('click', () => change(step - 1));
      el.querySelector('[data-next]').addEventListener('click', () => { if (step < path.lessons.length - 1) change(step + 1); else location.hash = '#learning'; });
    }
    draw();
  } }));

  const sources = SAT.content.lessons.sources;
  const traces = SAT.content.lessons.traces;
  SAT.statementLab = function () {
    const node = SAT.el(`<section class="card statement-lab"><div class="sec-num">Interactive statement lab · Fictional figures</div><h3>Where does the number come from?</h3><p>Choose a metric to trace its source figures. Then practice finding them yourself. All amounts are in $m.</p><div class="lesson-steps">${traces.map((t, i) => `<button class="chip" data-trace="${i}" aria-pressed="false">${t.title}</button>`).join('')}</div><fieldset><legend>Sample statement figures</legend>${sources.map(([id, label, amount, statement]) => `<label class="source-row" data-source="${id}"><input type="checkbox" value="${id}"><span><b>${label}</b><small>${statement}</small></span><strong>$${amount}m</strong><span class="source-marker"></span></label>`).join('')}</fieldset><div class="trace-result" role="status"></div><div class="btns"><button class="btn ghost" data-practice>Practice finding the figures</button><button class="btn" data-check hidden>Check selected figures</button></div><p class="source-feedback" role="status"></p></section>`);
    let active = 0;
    const result = node.querySelector('.trace-result'), feedback = node.querySelector('.source-feedback');
    function show() {
      const t = traces[active];
      node.querySelectorAll('[data-trace]').forEach((b) => { b.setAttribute('aria-pressed', String(+b.dataset.trace === active)); b.classList.toggle('on', +b.dataset.trace === active); });
      node.querySelectorAll('[data-source]').forEach((r) => {
        const used = t.inputs.includes(r.dataset.source); r.classList.toggle('source-active', used);
        r.querySelector('input').checked = used; r.querySelector('input').disabled = true;
        r.querySelector('.source-marker').textContent = used ? 'Source' : '';
      });
      result.innerHTML = `<h4>${t.title}</h4><div class="fx">${t.formula}</div><p>${t.why} ${SAT.link(t.id, 'Read the concept')}</p>`;
      node.querySelector('[data-check]').hidden = true; feedback.textContent = '';
    }
    node.querySelectorAll('[data-trace]').forEach((b) => b.addEventListener('click', () => { active = +b.dataset.trace; show(); }));
    node.querySelector('[data-practice]').addEventListener('click', () => {
      node.querySelectorAll('[data-source]').forEach((r) => { r.classList.remove('source-active'); r.querySelector('input').disabled = false; r.querySelector('input').checked = false; r.querySelector('.source-marker').textContent = ''; });
      result.textContent = 'Select the source figures needed to calculate ' + traces[active].title.toLowerCase() + '.';
      feedback.textContent = ''; node.querySelector('[data-check]').hidden = false; node.querySelector('input').focus();
    });
    node.querySelector('[data-check]').addEventListener('click', () => {
      const chosen = [...node.querySelectorAll('input:checked')].map((i) => i.value), t = traces[active];
      const correct = chosen.length === t.inputs.length && t.inputs.every((id) => chosen.includes(id));
      feedback.textContent = correct ? 'Correct. ' + t.formula + '. ' + t.why : 'Not quite. Select all required figures and no extras. ' + t.why;
    });
    show(); return node;
  };

  const chapters = SAT.content.lessons.chapters;
  SAT.register({ id: 'company-case', group: 'learning', title: 'Company case: Cedar Works', render(el) {
    let step = 0;
    function draw() {
      const ch = chapters[step], key = 'case:' + step;
      el.innerHTML = `<div class="page-head"><div class="sec-num">Guided company case · About 15 minutes</div><h2>Meet Cedar Works</h2><p>A fictional manufacturer of office furniture. All figures are illustrative; annual figures cover the same year unless stated otherwise.</p></div><article class="card lesson-content" tabindex="-1"><div class="sec-num">Chapter ${step + 1} of 3</div><h3>${ch.title}</h3><table class="exm"><caption>Company information revealed so far</caption>${chapters.slice(0, step + 1).flatMap((c) => c.data).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table><div data-exercise></div><label class="answer-label">${ch.prompt}<textarea rows="3" data-reflection placeholder="Write your reasoning before revealing the discussion."></textarea></label><details class="case-discussion"><summary>Compare with suggested reasoning</summary><p>${ch.model}</p></details><div class="btns"><button class="btn ghost" data-back ${step === 0 ? 'disabled' : ''}>Previous chapter</button><button class="btn" data-next ${records()[key]?.passed ? '' : 'disabled'}>${step === 2 ? 'Complete case' : 'Reveal next chapter'}</button></div><p class="muted">Complete the calculation to continue. Your written reasoning is saved for you; it is not automatically graded.</p></article>`;
      el.querySelector('[data-exercise]').appendChild(SAT.exercise(ch.id, key, () => { el.querySelector('[data-next]').disabled = false; }));
      const notes = el.querySelector('[data-reflection]'); notes.value = SAT.store.get('case-note:' + step, '');
      notes.addEventListener('input', () => SAT.store.set('case-note:' + step, notes.value));
      el.querySelector('[data-back]').addEventListener('click', () => { step--; draw(); el.querySelector('.lesson-content').focus(); });
      el.querySelector('[data-next]').addEventListener('click', () => {
        if (step < 2) { step++; draw(); el.querySelector('.lesson-content').focus(); }
        else {
          el.innerHTML = `<div class="page-head" tabindex="-1"><h2>Case complete</h2><p>You connected profitability, cash generation, and valuation. Review your reasoning below.</p></div>${chapters.map((c, i) => `<article class="card"><h3>${c.title}</h3><p class="case-note">${E(SAT.store.get('case-note:' + i, '') || 'No reflection saved.')}</p><p>${c.model}</p></article>`).join('')}<div class="btns"><a class="btn" href="#learning">Continue learning</a><button class="btn ghost" data-restart>Review case again</button></div>`;
          el.querySelector('[data-restart]').addEventListener('click', () => { step = 0; draw(); }); el.querySelector('.page-head').focus();
        }
      });
    }
    draw();
  } });
})();
