/* §44 Bear / Base / Bull — revenue-driven DCF per scenario (growth, FCF margin ramp, r, g). */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt;
  const CASES = [
    { id: 'bear', name: 'Bear Case', he: 'תרחיש פסימי', desc: 'Lower growth · lower margins · higher discount rate · conservative terminal assumptions', d: { g: '5', m: '8', r: '11', tg: '2', w: '25' } },
    { id: 'base', name: 'Base Case', he: 'תרחיש בסיס', desc: 'Most reasonable assumptions', d: { g: '12', m: '15', r: '10', tg: '3', w: '50' } },
    { id: 'bull', name: 'Bull Case', he: 'תרחיש אופטימי', desc: 'Higher growth · higher margins · operating leverage', d: { g: '20', m: '22', r: '9', tg: '3.5', w: '25' } },
  ];
  const SHARED = { rev: '10B', m0: '10', years: '5', debt: '2B', cash: '1B', shares: '500M', price: '40' };

  SAT.register({
    id: 'tool-scenarios', group: 'tools', title: 'Bear / Base / Bull',
    render(el) {
      el.innerHTML = SAT.pageHead('Bear / Base / Bull Scenarios', 'Value the company under three sets of assumptions. Revenue grows at the scenario rate; FCF margin moves linearly from today’s level to the scenario’s target by the final forecast year. (§44)');
      const shared = SAT.el(`<section class="card"><header><h3>Shared inputs</h3></header>
        <div class="fields">
          ${SAT.field({ k: 'rev', label: 'Current Revenue (LTM)' })}
          ${SAT.field({ k: 'm0', label: 'Current FCF Margin', u: '%', tip: 'FCF / Revenue today' })}
          ${SAT.field({ k: 'debt', label: 'Total Debt' })}
          ${SAT.field({ k: 'cash', label: 'Cash' })}
          ${SAT.field({ k: 'shares', label: 'Diluted Shares', u: '#' })}
          ${SAT.field({ k: 'price', label: 'Current Share Price' })}
          ${SAT.field({ k: 'years', label: 'Forecast Period', u: 'yrs', kind: 'assume' })}
        </div></section>`);
      el.appendChild(shared);
      const wrap = SAT.el(`<div class="scen">${CASES.map((c) => `<section class="card ${c.id}" data-case="${c.id}">
        <header><h3>${c.name}</h3><span class="muted" lang="he" dir="rtl">${c.he}</span></header>
        <p class="muted">${c.desc}</p>
        <div class="fields">
          ${SAT.field({ k: 'g', label: 'Revenue growth / yr', u: '%', kind: 'assume' })}
          ${SAT.field({ k: 'm', label: 'Target FCF margin', u: '%', kind: 'assume' })}
          ${SAT.field({ k: 'r', label: 'Discount rate', u: '%', kind: 'assume' })}
          ${SAT.field({ k: 'tg', label: 'Terminal growth', u: '%', kind: 'assume' })}
          ${SAT.field({ k: 'w', label: 'Probability', u: '%', kind: 'assume', tip: 'Optional weight for a probability-weighted value' })}
        </div>
        <div class="metrics" style="margin-top:10px;grid-template-columns:1fr 1fr">
          ${SAT.metric({ id: 'ev', label: 'Enterprise Value', kind: 'est' })}
          ${SAT.metric({ id: 'eq', label: 'Equity Value', kind: 'est' })}
          ${SAT.metric({ id: 'fv', label: 'Fair Value / Share', kind: 'est' })}
          ${SAT.metric({ id: 'up', label: 'Upside / Downside', kind: 'est' })}
        </div>
        <p class="muted" data-rev style="margin:8px 0 0"></p>
      </section>`).join('')}</div>`);
      el.appendChild(wrap);
      const summary = SAT.el(`<section class="card" style="margin-top:14px"><header><h3>Valuation range</h3></header>
        <div class="range" data-range></div>
        <div class="metrics" style="margin-top:14px">
          ${SAT.metric({ id: 'pw', label: 'Probability-weighted value', kind: 'est', formula: 'Σ weight × fair value' })}
          ${SAT.metric({ id: 'pwu', label: 'Weighted upside', kind: 'est' })}
          ${SAT.metric({ id: 'rr', label: 'Upside : Downside', kind: 'calc', tip: '(Bull − Price) / (Price − Bear)' })}
        </div>
        <div class="callout warn" data-wsum hidden></div>
        <div class="callout good">A good setup often has <b>limited downside in the bear case</b> and meaningful upside in base/bull — an asymmetric payoff. A great company can be a bad investment at the wrong price.</div>
      </section>`);
      el.appendChild(summary);

      let sv = null; const cv = {};
      const draw = () => {
        if (!sv || CASES.some((c) => !cv[c.id])) return;
        const res = {};
        CASES.forEach((c) => {
          const v = cv[c.id], card = wrap.querySelector(`[data-case="${c.id}"]`);
          const years = Math.max(1, Math.min(30, Math.round(sv.years || 5)));
          const flows = F.revenueFlows(sv.rev, v.g, sv.m0, v.m, years);
          const d = F.dcfFlows({ flows, r: v.r, tg: v.tg, debt: sv.debt || 0, cash: sv.cash || 0, shares: sv.shares, price: sv.price });
          res[c.id] = d;
          SAT.setMetric(card, 'ev', f.money(d.ev)); SAT.setMetric(card, 'eq', f.money(d.eq));
          SAT.setMetric(card, 'fv', f.price(d.fv)); SAT.setMetric(card, 'up', f.spct(d.up), SAT.tone(d.up));
          card.querySelector('[data-rev]').textContent = d.valid
            ? `Year ${years}: revenue ${f.money(sv.rev * Math.pow(1 + v.g, years))}, FCF ${f.money(flows[years - 1])}`
            : 'Discount rate must exceed terminal growth.';
        });
        // range bar
        const pts = [['Bear', res.bear.fv], ['Base', res.base.fv], ['Bull', res.bull.fv], ['Price', sv.price]].filter((p) => isFinite(p[1]));
        const lo = Math.min(...pts.map((p) => p[1])), hi = Math.max(...pts.map((p) => p[1]));
        const pad = (hi - lo) * 0.08 || 1, a = lo - pad, b = hi + pad;
        summary.querySelector('[data-range]').innerHTML = '<div class="line"></div>' + pts.map(([n, x]) =>
          `<div class="pt ${n === 'Price' ? 'price' : ''}" style="left:${((x - a) / (b - a)) * 100}%"><span>${n} ${f.price(x)}</span></div>`).join('');
        // weighted
        const ws = CASES.map((c) => cv[c.id].w || 0), wsum = ws.reduce((s, x) => s + x, 0);
        const pw = wsum > 0 ? CASES.reduce((s, c, i) => s + ws[i] * res[c.id].fv, 0) / wsum : NaN;
        SAT.setMetric(summary, 'pw', f.price(pw));
        const pwu = sv.price > 0 ? pw / sv.price - 1 : NaN;
        SAT.setMetric(summary, 'pwu', f.spct(pwu), SAT.tone(pwu));
        const up = res.bull.fv - sv.price, dn = sv.price - res.bear.fv;
        SAT.setMetric(summary, 'rr', dn > 0 && up > 0 ? (up / dn).toFixed(1) + ' : 1' : dn <= 0 ? 'No downside in bear' : 'No upside in bull');
        const wn = summary.querySelector('[data-wsum]');
        wn.hidden = Math.abs(wsum - 1) < 1e-6 || wsum === 0;
        wn.innerHTML = `Probabilities sum to ${f.pct(wsum, 0)} — they are normalised to 100% for the weighted value.`;
      };
      SAT.form(shared, 'scen:shared', SHARED, (v) => { sv = v; draw(); });
      CASES.forEach((c) => SAT.form(wrap.querySelector(`[data-case="${c.id}"]`), 'scen:' + c.id, c.d, (v) => { cv[c.id] = v; draw(); }));
    },
  });
})();
