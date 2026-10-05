/* App shell: nav from the registry, hash routing (#section or #section/concept), search, toggles, export/import. */
(function () {
  'use strict';
  const side = document.getElementById('side');
  const view = document.getElementById('view');
  const mods = SAT.modules;

  side.innerHTML = SAT.groups.map((g) => {
    const items = mods.filter((m) => m.group === g.id);
    if (!items.length) return '';
    const head = g.id === 'tools' || g.id === 'roadmap'
      ? `<button class="grp grp-t" data-collapse="${g.id}" aria-expanded="true">${g.title} <span>▾</span></button>`
      : `<div class="grp">${g.title}</div>`;
    return head + `<div class="grp-b" data-grp="${g.id}">` + items.map((m) => {
      if (m.planned) return `<a class="planned" aria-disabled="true" title="Planned">${SAT.esc(m.title)}</a>`;
      return `<a href="#${m.id}" data-id="${m.id}">${m.num != null ? `<span class="n">${m.num}</span>` : '<span class="n"></span>'}${SAT.esc(m.title)}</a>`;
    }).join('') + '</div>';
  }).join('');
  side.querySelectorAll('[data-collapse]').forEach((b) => {
    const key = 'nav:' + b.dataset.collapse, body = side.querySelector(`[data-grp="${b.dataset.collapse}"]`);
    const set = (open) => { body.hidden = !open; b.setAttribute('aria-expanded', String(open)); SAT.store.set(key, open); };
    set(SAT.store.get(key, false));
    b.addEventListener('click', () => set(body.hidden));
  });

  let current = null;
  function route() {
    const [id, sub] = (location.hash || '').slice(1).split('/');
    const m = mods.find((x) => x.id === id && !x.planned) || mods.find((x) => x.id === 'framework') || mods[0];
    side.querySelectorAll('a[data-id]').forEach((a) => a.classList.toggle('on', a.dataset.id === m.id));
    if (current !== m.id) {
      view.innerHTML = '';
      try { m.render(view); } catch (e) { view.innerHTML = `<div class="callout bad"><b>Error rendering ${SAT.esc(m.title)}:</b> ${SAT.esc(e.message)}</div>`; console.error(e); }
      current = m.id;
      document.title = m.title + ' · Stock Analysis Reference';
    }
    document.body.classList.remove('nav-open');
    const target = sub && document.getElementById('k-' + sub);
    if (target) {
      target.scrollIntoView({ block: 'start' });
      target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash');
    } else window.scrollTo(0, 0);
    SAT.store.set('lastPage', location.hash.slice(1) || m.id);
  }
  window.addEventListener('hashchange', route);
  if (!location.hash) { const last = SAT.store.get('lastPage', null); if (last) history.replaceState(null, '', '#' + last); }
  route();

  /* ---------- Search ---------- */
  const q = document.getElementById('q'), res = document.getElementById('qres');
  let hits = [], sel = 0;
  const paint = () => {
    res.hidden = !q.value.trim();
    res.innerHTML = hits.length ? hits.map((h, i) => `<a href="${h.href}" class="${i === sel ? 'sel' : ''}" data-i="${i}">
        <span class="r-t">${SAT.esc(h.title)}${h.sub ? ` <small>${SAT.esc(h.sub)}</small>` : ''}</span>
        ${h.formula ? `<code>${SAT.esc(h.formula)}</code>` : ''}<span class="r-s">${SAT.esc(h.section || '')}</span></a>`).join('')
      : '<div class="r-none">No matches. Try the <a href="#glossary">Glossary</a>.</div>';
  };
  const go = (h) => { if (!h) return; q.value = ''; res.hidden = true; q.blur(); if (location.hash === h.href) route(); else location.hash = h.href; };
  q.addEventListener('input', () => { hits = SAT.search(q.value); sel = 0; paint(); });
  q.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, hits.length - 1); paint(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); paint(); e.preventDefault(); }
    else if (e.key === 'Enter') { go(hits[sel]); e.preventDefault(); }
    else if (e.key === 'Escape') { q.value = ''; res.hidden = true; q.blur(); }
  });
  res.addEventListener('mousedown', (e) => { const a = e.target.closest('a[data-i]'); if (a) { e.preventDefault(); go(hits[+a.dataset.i]); } });
  q.addEventListener('blur', () => setTimeout(() => { res.hidden = true; }, 150));
  q.addEventListener('focus', () => { if (q.value.trim()) res.hidden = false; });
  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); q.select(); }
  });

  /* ---------- Toggles ---------- */
  const learnBtn = document.getElementById('tLearn');
  const setLearn = (on) => {
    document.body.classList.toggle('learning', on);
    learnBtn.setAttribute('aria-pressed', String(on));
    SAT.store.set('learning', on);
    document.querySelectorAll('details[data-learn]').forEach((d) => { d.open = on; });
  };
  setLearn(SAT.store.get('learning', false));
  learnBtn.addEventListener('click', () => setLearn(!document.body.classList.contains('learning')));

  document.getElementById('bTheme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    SAT.store.set('theme', next);
  });
  document.getElementById('menuBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  view.addEventListener('click', () => document.body.classList.remove('nav-open'));

  /* ---------- Export / import (favorites, notes, tool inputs) ---------- */
  document.getElementById('bExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(SAT.store.dump(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stock-reference-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  const fi = document.getElementById('fImport');
  document.getElementById('bImport').addEventListener('click', () => fi.click());
  fi.addEventListener('change', () => {
    const f = fi.files[0]; if (!f) return;
    f.text().then((t) => { SAT.store.load(JSON.parse(t)); SAT.toast('Imported — reloading'); setTimeout(() => location.reload(), 600); })
      .catch(() => SAT.toast('Could not read that file'));
  });
})();
