/* Shared growth checklist; separate storage preserves the original analyst checklist. */
(function () {
  SAT.growthChecklist = function () {
    const groups = SAT.content.sections.find(s => s.id === 'growth-analysis').checklist;
    const state = SAT.store.get('growth-checklist', {});
    const node = SAT.el(`<section class="growth-checklist"><div class="card"><h3>Growth company checklist</h3><span data-growth-progress></span> <button class="btn ghost" data-growth-reset>Reset growth checklist</button></div><div class="ck-cols">${groups.map(g => `<section class="card ck-grp"><h4>${SAT.esc(g.title)}</h4>${g.items.map(i => `<div class="growth-item"><label><input type="checkbox" data-growth-key="${i.id}"><span>${SAT.esc(i.label)}</span></label>${SAT.link(i.concept, '↗')}</div>`).join('')}</section>`).join('')}</div></section>`);
    node.querySelectorAll('.growth-item > a').forEach(a => a.setAttribute('aria-label', SAT.C[a.hash.split('/')[1]].title));
    const inputs = [...node.querySelectorAll('[data-growth-key]')];
    const paint = () => {
      let count = 0;
      inputs.forEach(input => { input.checked = !!state[input.dataset.growthKey]; input.parentElement.classList.toggle('done', input.checked); if (input.checked) count++; });
      node.querySelector('[data-growth-progress]').textContent = `${count} / ${inputs.length}`;
      SAT.store.set('growth-checklist', state);
    };
    inputs.forEach(input => input.addEventListener('change', () => { state[input.dataset.growthKey] = input.checked; paint(); }));
    node.querySelector('[data-growth-reset]').addEventListener('click', () => {
      if (!confirm(SAT.t('Clear growth checklist ticks?'))) return;
      Object.keys(state).forEach(key => delete state[key]); paint();
    });
    paint(); return node;
  };
})();
