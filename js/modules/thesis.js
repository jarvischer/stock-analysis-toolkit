/* §46 Investment Thesis template + §47 Thesis Invalidation ("What would prove me wrong?") */
(function () {
  'use strict';
  const f = SAT.fmt;
  const T = (k, label, ph, rows) => SAT.field({ k, label, u: 'area', ph, rows: rows || 2 });
  const X = (k, label, ph) => SAT.field({ k, label, u: 'text', ph });

  SAT.register({
    id: 'thesis', group: 'decide', title: 'Investment Thesis',
    render(el) {
      el.innerHTML = SAT.pageHead('Investment Thesis', 'Write it down. A thesis you can’t write in a few sentences is not a thesis. (§46–47)') +
        SAT.toc([['inv', 'What would prove me wrong?'], ['tmpl', 'Thesis template']]);

      /* §47 first — deliberately prominent */
      const inv = SAT.el(`<section class="card invalid" id="c-inv">
        <header><h3>What would prove me wrong?</h3><span class="num">§47</span></header>
        <p><b>Decide now, before you own the stock,</b> which facts would mean your thesis is broken. Then, when the news arrives, you act on the rule you wrote — not on hope. This is your defence against <b>confirmation bias</b> (seeking only information that agrees with you).</p>
        ${SAT.he('מה יוכיח שטעיתי? כתוב את זה לפני הקנייה — כדי לא להתאהב בתזה.')}
        <div class="rowlist" data-list></div>
        <div class="btns"><button class="addbtn" data-add>+ Add condition</button><span class="muted" data-count style="align-self:center"></span></div>
        <div class="callout warn" data-hit hidden></div>
      </section>`);
      el.appendChild(inv);
      const DEF = [
        { text: 'Revenue growth falls below X% for two consecutive quarters', metric: 'Revenue growth', thr: '< 10%', st: 'ok' },
        { text: 'Operating margin falls below X%', metric: 'Operating margin', thr: '< 15%', st: 'ok' },
        { text: 'Major customer lost / competitor gains significant market share', metric: 'Customer / share data', thr: '', st: 'ok' },
      ];
      const SUGG = ['Revenue growth falls below X%', 'Margins fall below X%', 'Major customer lost', 'Competitor gains significant market share', 'Debt rises above X', 'Product launch fails', 'Regulatory change', 'Management changes capital-allocation policy', 'Dilution exceeds X% per year'];
      let rows = SAT.store.get('invalidation', null) || DEF.map((r) => Object.assign({}, r));
      const list = inv.querySelector('[data-list]');
      const save = () => SAT.store.set('invalidation', rows);
      const build = () => {
        list.innerHTML = rows.map((r, i) => `<div class="rowitem inv-row${r.st === 'hit' ? ' hit' : ''}" data-i="${i}">
          <span class="idx">${i + 1}</span>
          <label class="fld k-note"><span class="fl">Condition</span><input data-f="text" list="invSugg" value="${SAT.esc(r.text)}" placeholder="e.g. Revenue growth falls below 10%"></label>
          <label class="fld k-note"><span class="fl">Metric / threshold</span><input data-f="thr" value="${SAT.esc(r.thr)}" placeholder="< 10%"></label>
          <label class="fld"><span class="fl">Status</span><select data-f="st" class="status-${r.st}"><option value="ok"${r.st === 'ok' ? ' selected' : ''}>✓ Intact</option><option value="watch"${r.st === 'watch' ? ' selected' : ''}>! Watch</option><option value="hit"${r.st === 'hit' ? ' selected' : ''}>✕ Triggered</option></select></label>
          <button class="rm" data-rm ${rows.length <= 3 ? 'disabled title="Keep at least 3 conditions"' : 'title="Remove"'} aria-label="Remove condition">✕</button>
        </div>`).join('') + `<datalist id="invSugg">${SUGG.map((s) => `<option value="${s}">`).join('')}</datalist>`;
        inv.querySelector('[data-add]').disabled = rows.length >= 10;
        inv.querySelector('[data-count]').textContent = `${rows.length} / 10 conditions (minimum 3)`;
        const hits = rows.filter((r) => r.st === 'hit').length, watch = rows.filter((r) => r.st === 'watch').length;
        const h = inv.querySelector('[data-hit]');
        h.hidden = !hits && !watch;
        h.innerHTML = hits ? `<b>${hits} invalidation condition${hits > 1 ? 's' : ''} triggered.</b> Re-underwrite the thesis from scratch — would you buy this stock today at this price, knowing what you know now?` : `<b>${watch} condition${watch > 1 ? 's' : ''} on watch.</b> Set a date to re-check.`;
        save();
      };
      list.addEventListener('input', (e) => {
        const row = e.target.closest('[data-i]'); if (!row || !e.target.dataset.f) return;
        rows[+row.dataset.i][e.target.dataset.f] = e.target.value;
        if (e.target.dataset.f === 'st') build(); else save();
      });
      list.addEventListener('click', (e) => { const b = e.target.closest('[data-rm]'); if (b && rows.length > 3) { rows.splice(+b.closest('[data-i]').dataset.i, 1); build(); } });
      inv.querySelector('[data-add]').addEventListener('click', () => { if (rows.length < 10) { rows.push({ text: '', metric: '', thr: '', st: 'ok' }); build(); } });
      build();

      /* §46 template */
      const tm = SAT.el(`<section class="card" id="c-tmpl">
        <header><h3>Investment Thesis Template</h3><span class="num">§46</span></header>
        <div class="btns" style="margin-top:0"><button class="btn ghost" data-pull>Fill numbers from “Analyze a Company”</button><button class="btn ghost" data-print>Print / save PDF</button></div>
        <h4>Company</h4>
        <div class="fields">${X('company', 'Company')}${X('ticker', 'Ticker')}${X('price', 'Current Price')}${X('mcap', 'Market Cap')}${X('ev', 'Enterprise Value')}${X('date', 'Date written', new Date().toISOString().slice(0, 10))}</div>
        <h4>Thesis</h4>
        <div class="fields">${T('why', 'Why might the market be wrong? (What do I believe that the market doesn’t?)', 'In 2–4 sentences…', 4)}</div>
        <h4>Business Quality</h4>
        <div class="fields">${T('moat', 'Moat')}${T('drivers', 'Growth Drivers')}${T('margins', 'Margins')}${X('roic', 'ROIC (vs WACC)')}</div>
        <h4>Valuation</h4>
        <div class="fields">${X('pe', 'P/E')}${X('evebitda', 'EV/EBITDA')}${X('fcfy', 'FCF Yield')}${X('dcffv', 'DCF Fair Value')}</div>
        <div class="fields" style="margin-top:8px">${T('implied', 'What assumptions are already embedded in the current stock price?')}</div>
        <h4>Catalysts</h4>
        <div class="fields">${T('catalysts', 'What events could cause the market to recognise the thesis?', 'Earnings, product launch, margin inflection, spin-off, index inclusion…', 3)}</div>
        <h4>Risks</h4>
        <div class="fields">${T('risks', 'What could invalidate the thesis?', 'See the invalidation list above', 3)}</div>
        <h4>Scenarios</h4>
        <div class="grid3">
          <div class="fields">${T('bear', 'Bear Case', 'Assumptions → value', 3)}</div>
          <div class="fields">${T('base', 'Base Case', 'Assumptions → value', 3)}</div>
          <div class="fields">${T('bull', 'Bull Case', 'Assumptions → value', 3)}</div>
        </div>
        <div class="btns"><a class="btn ghost" href="#scenarios">Open scenario calculator →</a></div>
      </section>`);
      el.appendChild(tm);
      const form = SAT.form(tm, 'thesis', {});
      tm.querySelector('[data-print]').addEventListener('click', () => window.print());
      tm.querySelector('[data-pull]').addEventListener('click', () => {
        if (!SAT.analyzeStored) return;
        const a = SAT.analyzeStored(); const m = a.m, v = a.v;
        form.set({
          company: v.company || '', ticker: v.ticker || '', price: f.price(v.price), mcap: f.money(m.mcap), ev: f.money(m.ev),
          roic: f.pct(m.roic) + ' (WACC ' + f.pct(v.r) + ')', pe: f.x(m.pe), evebitda: f.x(m.evEbitda), fcfy: f.pct(m.fcfYield),
          dcffv: f.price(m.dcf.fv) + ' (' + f.spct(m.dcf.up) + ')', margins: `Gross ${f.pct(m.gm)} · Operating ${f.pct(m.om)} · Net ${f.pct(m.nm)} · FCF ${f.pct(m.fcfm)}`,
        });
        SAT.toast('Filled from Analyzer');
      });
    },
  });
})();
