/* Handbook engine: concept library, standard concept card, section pages, search index, favorites.
   Content lives in js/content/*.js — each file calls SAT.section({...}) and SAT.concepts(sectionId, [...]).
   Adding a concept = adding one object to a content file. */
(function () {
  'use strict';
  const esc = SAT.esc;
  SAT.SECTIONS = [];
  SAT.C = {};          // id → concept
  SAT.GLOSSARY = [];   // extra glossary aliases { term, id, def? }

  SAT.STMT = {
    is: ['Income Statement', 's-is'], bs: ['Balance Sheet', 's-bs'], cf: ['Cash Flow Statement', 's-cf'],
    calc: ['Calculated (you compute it)', 's-calc'], mkt: ['Market data + filings', 's-mkt'],
    qual: ['10-K narrative / qualitative', 's-qual'], model: ['Your valuation model', 's-model'],
  };
  const BETTER = {
    higher: ['↑ Higher is usually better', 'hl-up'], lower: ['↓ Lower is usually better', 'hl-down'],
    context: ['↕ Depends on context', 'hl-ctx'], na: ['— Not a “higher/lower” metric', 'hl-na'],
  };

  /* section: { id, num, title, intro, he, top (html rendered above cards), bottom } */
  SAT.section = function (s) {
    SAT.SECTIONS.push(s);
    s.concepts = s.concepts || [];
    SAT.register({ id: s.id, group: 'handbook', title: s.title, num: s.num, render: (el) => renderSection(el, s) });
  };
  SAT.concepts = function (sectionId, list) {
    const s = SAT.SECTIONS.find((x) => x.id === sectionId);
    list.forEach((c) => { c.section = sectionId; SAT.C[c.id] = c; s.concepts.push(c.id); });
  };
  SAT.link = (id, text) => {
    const c = SAT.C[id];
    return c ? `<a class="xref" href="#${c.section}/${id}" title="${esc(c.short || '')}">${text || esc(c.title)}</a>` : (text || id);
  };
  SAT.href = (id) => { const c = SAT.C[id]; return c ? `#${c.section}/${id}` : '#'; };

  /* ---------- Favorites ---------- */
  SAT.favs = () => SAT.store.get('favs', []);
  SAT.toggleFav = (id) => {
    const f = SAT.favs(); const i = f.indexOf(id);
    if (i >= 0) f.splice(i, 1); else f.push(id);
    SAT.store.set('favs', f);
    document.querySelectorAll(`[data-fav="${id}"]`).forEach((b) => b.setAttribute('aria-pressed', String(i < 0)));
    SAT.toast(i < 0 ? 'Added to Favorites' : 'Removed from Favorites');
  };
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-fav]'); if (b) { e.preventDefault(); SAT.toggleFav(b.dataset.fav); } });

  /* ---------- Standard concept card ----------
     Fields: id, title, abbr (full name), aka [], short, what, he, formula, example [[k,v,'res']],
     interp, better: [dir, text], compare [], watch, stmt key, where, body, q {tells, hl, compare, fool},
     calc (SAT.calc cfg), related [ids], key (important metric) */
  SAT.card = function (c) {
    const fav = SAT.favs().includes(c.id);
    const st = SAT.STMT[c.stmt] || null;
    const row = (label, html, cls) => (html ? `<div class="cr ${cls || ''}"><div class="cl">${label}</div><div class="cv">${html}</div></div>` : '');
    const better = c.better ? `<span class="hl ${BETTER[c.better[0]][1]}">${BETTER[c.better[0]][0]}</span>${c.better[1] ? ' ' + c.better[1] : ''}` : '';
    const ex = c.example ? `<table class="exm">${c.example.map((r) => `<tr class="${r[2] || ''}"><td>${r[0]}</td><td dir="auto">${r[1]}</td></tr>`).join('')}</table>` : '';
    const node = SAT.el(`<article class="cc${c.key ? ' key' : ''}" id="k-${c.id}">
      <header class="cc-h">
        <div><h3>${c.title}${SAT.lang === 'he' ? ` <small data-no-translate dir="ltr">${esc(window.SAT_CATALOGS.en.concepts[c.id].title)}</small>` : ''}${c.abbr ? ` <small data-no-translate dir="ltr">${c.abbr}</small>` : ''}</h3>
        ${c.aka ? `<div class="aka">Also called: ${c.aka.join(' · ')}</div>` : ''}</div>
        <div class="cc-tools">${st ? `<a class="sbadge ${st[1]}" href="#statements" title="Where it comes from">${st[0]}</a>` : ''}
          <button class="star" data-fav="${c.id}" aria-pressed="${fav}" title="Bookmark" aria-label="Bookmark ${esc(c.title)}">★</button></div>
      </header>
      ${row('What is it?', c.what)}
      ${c.he ? row('', SAT.he(c.he), 'he-row') : ''}
      ${row('Formula', c.formula ? `<div class="fx">${c.formula}</div>` : '')}
      ${row('Example', ex)}
      ${row('Interpretation', c.interp)}
      ${row('Generally', better)}
      ${row('Compare against', c.compare && c.compare.length ? `<ul class="cmp">${c.compare.map((x) => `<li>${x}</li>`).join('')}</ul>` : '')}
      ${row('Watch out', c.watch, 'watch')}
      ${row('Financial statement', st ? `<b>${st[0]}</b>${c.where ? ' — ' + c.where : ''}` : c.where)}
      ${c.body ? `<div class="cc-body">${c.body}</div>` : ''}
      ${c.q ? `<details class="hi" data-learn><summary>How do I interpret this?</summary><div class="hi-g">
        <div><b>What does this tell me?</b>${c.q.tells}</div><div><b>Higher or lower?</b>${c.q.hl}</div>
        <div><b>What should I compare it with?</b>${c.q.compare}</div><div><b>What could fool me?</b>${c.q.fool}</div></div></details>` : ''}
      ${c.calc ? '<details class="try"><summary>Try it — quick calculator</summary><div class="try-slot"></div></details>' : ''}
      ${c.related ? `<div class="rel">Related: ${c.related.filter((r) => SAT.C[r] || true).map((r) => SAT.link(r)).join(' · ')}</div>` : ''}
    </article>`);
    if (c.calc) node.querySelector('.try-slot').appendChild(SAT.calc(c.calc));
    for (const id of c.calculators || []) {
      const cfg = SAT.calculators[id];
      const detail = SAT.el(`<details class="try" data-calculator="${id}"><summary>${SAT.esc(SAT.t(cfg.title))}</summary></details>`);
      detail.appendChild(SAT.calc(cfg));
      node.querySelector('.rel').before(detail);
    }
    if (SAT.exercise && SAT.EXERCISES[c.id]) {
      const practice = SAT.exercise(c.id, 'concept:' + c.id);
      const example = Array.from(node.querySelectorAll('.cr')).find((r) => r.querySelector('.cl').textContent === 'Example');
      if (example) {
        const reveal = SAT.el('<details class="try"><summary>Reveal the worked example</summary></details>');
        example.replaceWith(reveal);
        reveal.appendChild(example);
        reveal.before(practice);
      } else node.querySelector('.cc-h').after(practice);
    }
    if (document.body.classList.contains('learning')) node.querySelectorAll('details[data-learn]').forEach((d) => { d.open = true; });
    return node;
  };

  function renderSection(el, s) {
    el.innerHTML = `<div class="page-head"><div class="sec-num">${s.num ? 'Section ' + s.num : ''}</div><h2>${s.title}</h2>${s.intro ? `<p>${s.intro}</p>` : ''}${SAT.he(s.he)}</div>
      ${s.concepts.length > 2 ? `<nav class="toc">${s.concepts.map((id) => `<a href="#${s.id}/${id}">${esc(SAT.C[id].short_title || SAT.C[id].title)}</a>`).join('')}</nav>` : ''}
      ${s.top || ''}`;
    s.concepts.forEach((id) => el.appendChild(SAT.card(SAT.C[id])));
    if (s.bottom) el.appendChild(SAT.el(`<div>${s.bottom}</div>`));
    if (s.after) s.after(el);
  }

  /* ---------- Search ---------- */
  SAT.searchIndex = function () {
    const items = [];
    Object.values(SAT.C).forEach((c) => items.push({
      id: c.id, title: c.title, sub: c.abbr || '', hay: [c.title, window.SAT_CATALOGS.en.concepts[c.id].title, window.SAT_CATALOGS.he.concepts[c.id].title, c.abbr, (c.aka || []).join(' '), (c.tags || []).join(' ')].join(' ').toLowerCase(),
      formula: c.formula ? c.formula.replace(/<[^>]+>/g, '').split('\n')[0] : '', section: (SAT.SECTIONS.find((s) => s.id === c.section) || {}).title, href: SAT.href(c.id),
    }));
    SAT.GLOSSARY.forEach((g) => { if (SAT.C[g.id]) items.push({ id: g.id, title: g.term, sub: '→ ' + SAT.C[g.id].title, hay: g.term.toLowerCase(), formula: '', section: 'Glossary', href: SAT.href(g.id) }); });
    SAT.modules.filter((m) => !m.planned).forEach((m) => items.push({ id: m.id, title: m.title, sub: 'Page', hay: m.title.toLowerCase(), formula: '', section: 'Navigation', href: '#' + m.id }));
    return items;
  };
  SAT.search = function (q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const idx = SAT._idx || (SAT._idx = SAT.searchIndex());
    const words = q.split(/\s+/);
    const scored = [];
    idx.forEach((it) => {
      const t = it.title.toLowerCase(), s = (it.sub || '').toLowerCase();
      if (!words.every((w) => it.hay.includes(w))) return;
      let score = 1;
      if (t === q || s === q) score = 100;
      else if (t.startsWith(q) || s.startsWith(q)) score = 60;
      else if (new RegExp('\\b' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(it.hay)) score = 30;
      if (it.section === 'Navigation') score -= 5;
      if (it.section === 'Glossary') score -= 2;
      scored.push([score, it]);
    });
    const seen = new Set();
    return scored.sort((a, b) => b[0] - a[0]).map((x) => x[1]).filter((it) => { const k = it.href; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 12);
  };
})();
