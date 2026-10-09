/* §45 Sum of the Parts — dynamic segments, each valued on its own basis and multiple. */
(function () {
  'use strict';
  const f = SAT.fmt, P = SAT.parse;
  const KEY = 'sotp';
  const BASIS = [['rev', 'EV / Revenue'], ['fwd', 'EV / Next-yr Revenue'], ['op', 'EV / Operating Profit'], ['manual', 'Manual value']];
  const DEFAULT = {
    rows: [
      { name: 'Launch services', rev: '4B', g: '15', op: '1B', basis: 'op', mult: '20', manual: '' },
      { name: 'Satellite internet', rev: '8B', g: '40', op: '1.5B', basis: 'fwd', mult: '10', manual: '' },
      { name: 'Early-stage ventures', rev: '0', g: '', op: '', basis: 'manual', mult: '', manual: '5B' },
    ],
    other: '2B', debt: '3B', cash: '1B', shares: '2B', price: '',
  };
  function segValue(r) {
    const rev = P(r.rev), g = P(r.g) / 100, op = P(r.op), m = P(r.mult);
    switch (r.basis) {
      case 'rev': return rev * m;
      case 'fwd': return rev * (1 + (isFinite(g) ? g : 0)) * m;
      case 'op': return op * m;
      default: return P(r.manual);
    }
  }

  SAT.register({
    id: 'tool-sotp', group: 'tools', title: 'Sum of the Parts',
    render(el) {
      el.innerHTML = SAT.pageHead('Sum of the Parts (SOTP)', 'For companies with very different businesses: value each segment with the method that fits it, then add them up. (§45)');
      const st = SAT.store.get(KEY, null) || JSON.parse(JSON.stringify(DEFAULT));
      const save = () => SAT.store.set(KEY, st);
      const node = SAT.el(`<div>
        <section class="card">
          <div class="formula">Total Company Value = Business A Value + Business B Value + Business C Value + … + Other Assets − Net Debt</div>
          ${SAT.he('סכום החלקים: מעריכים כל חטיבה בנפרד (לפי המכפיל המתאים לה) ומחברים.')}
          <p class="muted">Example use: a company like SpaceX — launch services might deserve an operating-profit multiple, a fast-growing satellite internet business a forward-revenue multiple, and early-stage projects a manual option-style value.</p>
          <div class="rowlist" data-rows></div>
          <div class="btns"><button class="addbtn" data-add>+ Add segment</button><button class="btn ghost" data-reset>Reset example</button></div>
        </section>
        <section class="card"><header><h3>Bridge to equity</h3></header>
          <div class="fields" data-bridge>
            <label class="fld k-actual"><span class="fl">Other Assets${SAT.tip('Investments, stakes in other companies, real estate not in segments')}</span><span class="inp"><i class="pfx">$</i><input data-b="other" inputmode="decimal"></span></label>
            <label class="fld k-actual"><span class="fl">Total Debt</span><span class="inp"><i class="pfx">$</i><input data-b="debt" inputmode="decimal"></span></label>
            <label class="fld k-actual"><span class="fl">Cash</span><span class="inp"><i class="pfx">$</i><input data-b="cash" inputmode="decimal"></span></label>
            <label class="fld k-actual"><span class="fl">Diluted Shares</span><span class="inp"><input data-b="shares" inputmode="decimal" placeholder="count · 2.5B"></span></label>
            <label class="fld k-actual"><span class="fl">Current Price (optional)</span><span class="inp"><i class="pfx">$</i><input data-b="price" inputmode="decimal"></span></label>
          </div>
          <div class="tbl-wrap" style="margin-top:12px"><table class="t" data-sum></table></div>
          <div class="metrics" style="margin-top:10px">
            ${SAT.metric({ id: 'tot', label: 'Total Equity Value', kind: 'est' })}
            ${SAT.metric({ id: 'ps', label: 'Value / Share', kind: 'est' })}
            ${SAT.metric({ id: 'up', label: 'Upside / Downside', kind: 'est' })}
          </div>
        </section></div>`);
      el.appendChild(node);
      const list = node.querySelector('[data-rows]'), sum = node.querySelector('[data-sum]');

      function rowHtml(r, i) {
        const inp = (k, ph, u) => `<label class="fld ${u === 'text' ? 'k-note' : k === 'g' || k === 'mult' ? 'k-assume' : 'k-actual'}"><span class="fl">${ph}</span><span class="inp">${u === '$' ? '<i class="pfx">$</i>' : ''}<input data-f="${k}" value="${SAT.esc(r[k])}" inputmode="${u === 'text' ? 'text' : 'decimal'}">${u === '%' ? '<i class="sfx">%</i>' : u === 'x' ? '<i class="sfx">x</i>' : ''}</span></label>`;
        return `<div class="rowitem sotp-row" data-i="${i}">
          ${inp('name', 'Segment', 'text')}${inp('rev', 'Revenue', '$')}${inp('g', 'Growth', '%')}${inp('op', 'Operating Profit', '$')}${inp('mult', 'Multiple', 'x')}
          <label class="fld"><span class="fl">Valuation basis</span><select data-f="basis">${BASIS.map(([v, l]) => `<option value="${v}"${r.basis === v ? ' selected' : ''}>${l}</option>`).join('')}</select></label>
          <div><div class="fl">Segment value</div><div class="val" data-val></div></div>
          <button class="rm" data-rm title="Remove segment" aria-label="Remove segment">✕</button>
          <label class="fld k-assume" data-man style="grid-column:1/-1;${r.basis === 'manual' ? '' : 'display:none'}"><span class="fl">Manual value (e.g. from a separate DCF, last funding round, or option value)</span><span class="inp"><i class="pfx">$</i><input data-f="manual" value="${SAT.esc(r.manual)}" inputmode="decimal"></span></label>
        </div>`;
      }
      function build() { list.innerHTML = st.rows.map(rowHtml).join(''); calc(); }
      function calc() {
        let segTot = 0;
        st.rows.forEach((r, i) => {
          const v = segValue(r); const row = list.querySelector(`[data-i="${i}"]`);
          if (row) row.querySelector('[data-val]').textContent = f.money(v);
          if (isFinite(v)) segTot += v;
        });
        const other = P(st.other) || 0, debt = P(st.debt) || 0, cash = P(st.cash) || 0, sh = P(st.shares), px = P(st.price);
        const eq = segTot + other - (debt - cash);
        sum.innerHTML = '<tbody>' + st.rows.map((r) => `<tr><td class="lbl" data-user-content>${SAT.esc(r.name || 'Segment')}</td><td class="muted lbl">${(BASIS.find((b) => b[0] === r.basis) || [, ''])[1]}${r.basis !== 'manual' && r.mult ? ' × ' + SAT.esc(r.mult) : ''}</td><td>${f.money(segValue(r))}</td></tr>`).join('') +
          `<tr class="tot"><td class="lbl">Sum of segments</td><td></td><td>${f.money(segTot)}</td></tr>
           <tr><td class="lbl">+ Other assets</td><td></td><td>${f.money(other)}</td></tr>
           <tr><td class="lbl">− Net debt (Debt − Cash)</td><td></td><td>${f.money(-(debt - cash))}</td></tr>
           <tr class="tot"><td class="lbl">= Total equity value</td><td></td><td class="est">${f.money(eq)}</td></tr></tbody>`;
        SAT.setMetric(node, 'tot', f.money(eq));
        const ps = SAT.div(eq, sh); SAT.setMetric(node, 'ps', f.price(ps));
        const up = px > 0 ? ps / px - 1 : NaN; SAT.setMetric(node, 'up', f.spct(up), SAT.tone(up));
        save();
      }
      list.addEventListener('input', (e) => {
        const row = e.target.closest('[data-i]'); if (!row) return;
        const r = st.rows[+row.dataset.i]; r[e.target.dataset.f] = e.target.value;
        if (e.target.dataset.f === 'basis') row.querySelector('[data-man]').style.display = r.basis === 'manual' ? '' : 'none';
        calc();
      });
      list.addEventListener('click', (e) => {
        const b = e.target.closest('[data-rm]'); if (!b) return;
        st.rows.splice(+b.closest('[data-i]').dataset.i, 1); build();
      });
      node.querySelector('[data-add]').addEventListener('click', () => { st.rows.push({ name: 'New segment', rev: '', g: '', op: '', basis: 'rev', mult: '', manual: '' }); build(); });
      node.querySelector('[data-reset]').addEventListener('click', () => { Object.assign(st, JSON.parse(JSON.stringify(DEFAULT))); syncBridge(); build(); });
      const bridge = node.querySelector('[data-bridge]');
      const syncBridge = () => bridge.querySelectorAll('[data-b]').forEach((i) => { i.value = st[i.dataset.b] || ''; });
      syncBridge();
      bridge.addEventListener('input', (e) => { if (e.target.dataset.b) { st[e.target.dataset.b] = e.target.value; calc(); } });
      build();
    },
  });
})();
