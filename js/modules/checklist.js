/* §48 Reusable stock analysis checklist (saved, with per-group progress). */
(function () {
  'use strict';
  const GROUPS = [
    ['Business', 'business', ['Understand how the company makes money', 'Identify business segments', 'Identify customers', 'Identify competitors', 'Identify moat', 'Identify growth drivers']],
    ['Financials', 'income', ['Revenue growth', 'Gross Margin', 'Operating Margin', 'Net Margin', 'Operating Cash Flow', 'Free Cash Flow', 'FCF Margin']],
    ['Balance Sheet', 'balance', ['Cash', 'Debt', 'Net Cash / Net Debt', 'Current Ratio', 'Debt / EBITDA']],
    ['Capital Efficiency', 'efficiency', ['NOPAT', 'Invested Capital', 'ROIC', 'Compare ROIC vs WACC']],
    ['Valuation', 'valuation', ['Market Cap', 'Enterprise Value', 'P/E', 'EV/EBITDA', 'Price/FCF', 'FCF Yield']],
    ['Intrinsic Value', 'dcf', ['Forecast revenue', 'Forecast margins', 'Forecast FCF', 'DCF', 'Terminal Value', 'Sensitivity Analysis', 'Bear/Base/Bull scenarios']],
    ['Thesis', 'thesis', ['Why might the market be wrong?', 'Catalysts', 'Risks', 'What would prove me wrong?']],
  ];
  SAT.CHECKLIST = GROUPS;

  SAT.register({
    id: 'tool-checklist', group: 'tools', title: 'Analysis Checklist',
    render(el) {
      el.innerHTML = SAT.pageHead('Stock Analysis Checklist', 'Reusable — tick items as you go; reset for the next company. (§48)');
      const st = SAT.store.get('checklist', {});
      const node = SAT.el(`<div>
        <section class="card"><div style="display:flex;gap:12px;align-items:end;flex-wrap:wrap">
          <label class="fld k-note" style="min-width:200px"><span class="fl">Company being analysed</span><input data-co value="${SAT.esc(st._co || '')}" placeholder="Ticker or name"></label>
          <div style="flex:1;min-width:200px"><div class="fl" data-tot></div><div class="prog" style="margin-top:6px"><div data-totbar></div></div></div>
          <button class="btn ghost" data-reset>Reset checklist</button>
        </div></section>
        <div class="ck-cols">${GROUPS.map(([g, link, items], gi) => `<section class="card ck-grp" data-g="${gi}">
          <h4><a href="#${link}" style="color:inherit;text-decoration:none">${g.toUpperCase()}</a><em data-c></em></h4>
          <div class="prog" style="margin-bottom:6px"><div data-bar></div></div>
          ${items.map((it, ii) => `<label><input type="checkbox" data-ck="${gi}.${ii}"><span>${it}</span></label>`).join('')}
        </section>`).join('')}</div></div>`);
      el.appendChild(node);
      const paint = () => {
        let done = 0, all = 0;
        GROUPS.forEach((g, gi) => {
          const sec = node.querySelector(`[data-g="${gi}"]`);
          const n = g[2].filter((_, ii) => st[gi + '.' + ii]).length;
          done += n; all += g[2].length;
          sec.querySelector('[data-c]').textContent = `${n}/${g[2].length}`;
          sec.querySelector('[data-bar]').style.width = (n / g[2].length) * 100 + '%';
        });
        node.querySelector('[data-tot]').textContent = `Progress: ${done} of ${all} (${Math.round((done / all) * 100)}%)`;
        node.querySelector('[data-totbar]').style.width = (done / all) * 100 + '%';
        node.querySelectorAll('[data-ck]').forEach((c) => c.parentElement.classList.toggle('done', c.checked));
        SAT.store.set('checklist', st);
      };
      node.querySelectorAll('[data-ck]').forEach((c) => {
        c.checked = !!st[c.dataset.ck];
        c.addEventListener('change', () => { st[c.dataset.ck] = c.checked; paint(); });
      });
      node.querySelector('[data-co]').addEventListener('input', (e) => { st._co = e.target.value; paint(); });
      node.querySelector('[data-reset]').addEventListener('click', () => {
        if (!confirm('Clear all ticks for a new company?')) return;
        Object.keys(st).forEach((k) => delete st[k]);
        node.querySelectorAll('[data-ck]').forEach((c) => { c.checked = false; });
        node.querySelector('[data-co]').value = '';
        paint();
      });
      paint();
    },
  });
})();
