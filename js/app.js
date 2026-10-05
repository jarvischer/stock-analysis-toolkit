/* App shell: builds nav from the registry, hash routing, global toggles, export/import. */
(function () {
  'use strict';
  const side = document.getElementById('side');
  const view = document.getElementById('view');
  const mods = SAT.modules;
  let n = 0;

  side.innerHTML = SAT.groups.map((g) => {
    const items = mods.filter((m) => m.group === g.id);
    if (!items.length) return '';
    return `<div class="grp">${g.title}</div>` + items.map((m) => {
      if (m.planned) return `<a class="planned" aria-disabled="true" title="Planned module">${SAT.esc(m.title)}</a>`;
      n++;
      return `<a href="#${m.id}" data-id="${m.id}"><span class="n">${String(n).padStart(2, '0')}</span>${SAT.esc(m.title)}</a>`;
    }).join('');
  }).join('');

  function route() {
    const id = (location.hash || '').slice(1).split('/')[0];
    const m = mods.find((x) => x.id === id && !x.planned) || mods[0];
    side.querySelectorAll('a[data-id]').forEach((a) => a.classList.toggle('on', a.dataset.id === m.id));
    view.innerHTML = '';
    try { m.render(view); } catch (e) { view.innerHTML = `<div class="callout bad"><b>Error rendering ${SAT.esc(m.title)}:</b> ${SAT.esc(e.message)}</div>`; console.error(e); }
    document.title = m.title + ' · Stock Analysis Toolkit';
    document.body.classList.remove('nav-open');
    window.scrollTo(0, 0);
    SAT.store.set('lastPage', m.id);
  }
  window.addEventListener('hashchange', route);
  if (!location.hash) { const last = SAT.store.get('lastPage', null); if (last) history.replaceState(null, '', '#' + last); }
  route();

  /* Toggles */
  function toggle(btn, cls, key) {
    const set = (on) => { document.body.classList.toggle(cls, on); btn.setAttribute('aria-pressed', String(on)); SAT.store.set(key, on); };
    set(SAT.store.get(key, false));
    btn.addEventListener('click', () => set(!document.body.classList.contains(cls)));
  }
  toggle(document.getElementById('tLearn'), 'learning', 'learning');
  toggle(document.getElementById('tForm'), 'formulas', 'formulas');

  document.getElementById('bTheme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    SAT.store.set('theme', next);
  });
  document.getElementById('menuBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  view.addEventListener('click', () => document.body.classList.remove('nav-open'));

  /* Export / import all saved data */
  document.getElementById('bExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(SAT.store.dump(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stock-toolkit-' + new Date().toISOString().slice(0, 10) + '.json';
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
