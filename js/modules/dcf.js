/* §37–43 DCF calculator (forecast, discounting, terminal value, EV → equity → per share) and Sensitivity.
   DCF, Sensitivity and Scenarios share the 'dcf' store key so they always agree. */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt;
  SAT.DCF_KEY = 'dcf';
  SAT.DCF_DEFAULTS = { name: '', fcf0: '1B', g: '15', years: '5', r: '10', tg: '3', debt: '2B', cash: '1B', shares: '500M', price: '40' };

  SAT.dcfFields = function () {
    return `<div class="az-sec">Actual data</div><div class="fields">
      ${SAT.field({ k: 'fcf0', label: 'Current FCF (last 12 months)', tip: 'Operating Cash Flow − CapEx' })}
      ${SAT.field({ k: 'debt', label: 'Total Debt' })}
      ${SAT.field({ k: 'cash', label: 'Cash & Investments' })}
      ${SAT.field({ k: 'shares', label: 'Diluted Shares Outstanding', u: '#' })}
      ${SAT.field({ k: 'price', label: 'Current Share Price' })}
    </div>
    <div class="az-sec">Analyst assumptions</div><div class="fields">
      ${SAT.field({ k: 'g', label: 'FCF Growth Rate / yr', u: '%', kind: 'assume' })}
      ${SAT.field({ k: 'years', label: 'Forecast Period', u: 'yrs', kind: 'assume', tip: '1–30 years. 5–10 is typical.' })}
      ${SAT.field({ k: 'r', label: 'Discount Rate (r)', u: '%', kind: 'assume', tip: 'Usually WACC. Higher = riskier.' })}
      ${SAT.field({ k: 'tg', label: 'Terminal Growth (g)', u: '%', kind: 'assume', tip: 'Long-run growth forever. Keep ≤ long-run GDP (2–3%). Must be < r.' })}
    </div>`;
  };
  SAT.dcfInputs = (v) => ({ fcf0: v.fcf0, g: v.g, years: v.years, r: v.r, tg: v.tg, debt: v.debt || 0, cash: v.cash || 0, shares: v.shares, price: v.price });

  function results(id) {
    return `<div class="metrics" id="${id}">
      ${SAT.metric({ id: 'pvf', label: 'PV of forecast FCF', kind: 'calc', formula: 'Σ FCFₜ / (1+r)ᵗ' })}
      ${SAT.metric({ id: 'tv', label: 'Terminal Value (yr N)', kind: 'calc', formula: 'FCFₙ×(1+g) / (r−g)' })}
      ${SAT.metric({ id: 'pvtv', label: 'PV of Terminal Value', kind: 'calc', formula: 'TV / (1+r)ᴺ' })}
      ${SAT.metric({ id: 'ev', label: 'Enterprise Value', kind: 'est', tip: SAT.LEARN.dcf.tip, formula: 'PV(FCF) + PV(TV)' })}
      ${SAT.metric({ id: 'eq', label: 'Equity Value', kind: 'est', formula: 'EV − Debt + Cash' })}
      ${SAT.metric({ id: 'fv', label: 'Fair Value / Share', kind: 'est', formula: 'Equity / Diluted shares' })}
      ${SAT.metric({ id: 'px', label: 'Current Share Price', kind: 'calc' })}
      ${SAT.metric({ id: 'up', label: 'Upside / Downside', kind: 'est', tip: SAT.LEARN.upside.tip, formula: 'Fair value / Price − 1' })}
    </div>`;
  }
  SAT.paintDcf = function (root, d, price) {
    const S = (id, t, tone) => SAT.setMetric(root, id, t, tone);
    S('pvf', f.money(d.pvF)); S('tv', f.money(d.tv)); S('pvtv', f.money(d.pvTv) + (d.valid ? `  (${f.pct(d.tvShare, 0)} of EV)` : ''));
    S('ev', f.money(d.ev)); S('eq', f.money(d.eq)); S('fv', f.price(d.fv)); S('px', f.price(price)); S('up', f.spct(d.up), SAT.tone(d.up));
  };

  function renderDcf(el) {
    el.innerHTML = SAT.pageHead('Discounted Cash Flow (DCF)', 'Discounted Cash Flow estimates the present value of future Free Cash Flow. (§37–42)') +
      SAT.toc([['dcfcalc', 'Calculator'], ['dr', 'Discount Rate'], ['tvx', 'Terminal Value'], ['bridge', 'EV → Equity → Per Share']]);

    const main = SAT.el(`<section class="card concept" id="c-dcfcalc">
      <header><h3>DCF Calculator</h3><span class="num">§37–42</span></header>
      ${SAT.he('DCF: מעריכים את תזרימי המזומנים העתידיים ומהוונים אותם להיום. השווי = כמה שווים היום כל המזומנים שהעסק ייצר.')}
      <div class="formula">PV of FCF in year t = FCFₜ / (1 + r)ᵗ        r = discount rate, t = number of years</div>
      <div class="fields" style="max-width:340px">${SAT.field({ k: 'name', label: 'Company / ticker (optional)', u: 'text' })}</div>
      ${SAT.dcfFields()}
      <div class="btns"><button class="btn ghost" data-act="reset">Reset to example</button><a class="btn ghost" href="#sensitivity">Sensitivity table →</a><a class="btn ghost" href="#scenarios">Bear / Base / Bull →</a></div>
      <div class="callout bad" data-invalid hidden><b>Discount rate must be greater than terminal growth.</b> When r ≤ g the perpetuity formula divides by zero or a negative number — the value is undefined.</div>
      <h4>§38 FCF forecast</h4>
      <p class="muted">FCFₜ = FCF₀ × (1 + growth)ᵗ — each year’s cash flow, its discount factor 1/(1+r)ᵗ, and its present value.</p>
      <div class="tbl-wrap"><table class="t" data-fc></table></div>
      <h4>Results</h4>
      ${results('dcfRes')}
      <h4>What makes up the Enterprise Value?</h4>
      <div class="stackbar" data-bar></div>
      <div class="keyrow"><span><i style="background:var(--actual)"></i>PV of forecast FCF</span><span><i style="background:var(--est)"></i>PV of terminal value</span></div>
      <div class="callout warn" data-tvwarn hidden></div>
      ${SAT.learnBox('dcf')}
    </section>`);
    el.appendChild(main);
    const fc = main.querySelector('[data-fc]'), bar = main.querySelector('[data-bar]'), inv = main.querySelector('[data-invalid]'), tvw = main.querySelector('[data-tvwarn]');
    const form = SAT.form(main, SAT.DCF_KEY, SAT.DCF_DEFAULTS, (v) => {
      const d = F.dcf(SAT.dcfInputs(v));
      inv.hidden = d.valid || !(isFinite(v.r) && isFinite(v.tg));
      fc.innerHTML = `<thead><tr><th>Year</th>${d.rows.map((x) => `<th>${x.t}</th>`).join('')}<th>Terminal</th></tr></thead><tbody>
        <tr><td class="lbl">FCF</td>${d.rows.map((x) => `<td>${f.money(x.fcf)}</td>`).join('')}<td>${f.money(d.tv)}</td></tr>
        <tr><td class="lbl">Discount factor</td>${d.rows.map((x) => `<td>${x.df.toFixed(3)}</td>`).join('')}<td>${d.rows.length ? d.rows[d.rows.length - 1].df.toFixed(3) : '—'}</td></tr>
        <tr class="tot"><td class="lbl">Present value</td>${d.rows.map((x) => `<td>${f.money(x.pv)}</td>`).join('')}<td class="est">${f.money(d.pvTv)}</td></tr></tbody>`;
      SAT.paintDcf(main, d, v.price);
      const a = d.valid && d.ev > 0 ? Math.max(0, d.pvF / d.ev) : 0;
      bar.innerHTML = d.valid ? `<div style="width:${a * 100}%;background:var(--actual)" title="PV forecast"></div><div style="width:${(1 - a) * 100}%;background:var(--est)" title="PV terminal"></div>` : '';
      tvw.hidden = !(d.valid && d.tvShare > 0.75);
      tvw.innerHTML = `<b>${f.pct(d.tvShare, 0)} of the value comes from the terminal value</b> — i.e. from cash flows beyond year ${d.rows.length}. The result is very sensitive to r and g. Check the <a href="#sensitivity">sensitivity table</a>.`;
    });
    main.querySelector('[data-act="reset"]').addEventListener('click', () => form.reset());

    // §39 discount rate explainer
    el.appendChild(SAT.concept({
      id: 'dr', num: 39, title: 'Discount Rate',
      def: 'Money in the future is worth less than money today: today’s dollar can be invested to earn a return, the future is uncertain, and inflation erodes purchasing power. The discount rate converts future cash into today’s value — the higher the risk, the higher the rate.',
      he: 'דולר היום שווה יותר מדולר בעוד שנה. שיעור ההיוון מתרגם כסף עתידי לערך של היום.',
      formula: 'PV = Future Cash Flow / (1 + r)ᵗ',
      example: [['$100 received in 1 year', ''], ['Discount rate', '10%'], ['PV = 100 / 1.10', '$90.91', 'res']],
      calc: {
        id: 'pv', defaults: { cf: '100', r: '10', t: '1' },
        fields: [{ k: 'cf', label: 'Future cash flow' }, { k: 'r', label: 'Discount rate', u: '%', kind: 'assume' }, { k: 't', label: 'Years from now', u: 'yrs', kind: 'assume' }],
        outputs: [{ id: 'pv', label: 'Present value', fmt: 'price', f: (v) => F.pv(v.cf, v.r, v.t) }, { id: 'lost', label: 'Discount', fmt: 'pct', f: (v) => 1 - 1 / Math.pow(1 + v.r, v.t) }],
      },
    }));

    el.appendChild(SAT.concept({
      id: 'tvx', num: 40, title: 'Terminal Value', abbr: 'Perpetual Growth method',
      def: 'A company can’t realistically be forecast year-by-year forever. So we forecast explicitly for N years, then assume FCF grows at a modest constant rate <b>g</b> forever and capture all of that in one number — the terminal value.',
      he: 'ערך טרמינלי — ערך כל התזרימים אחרי תקופת התחזית, בהנחת צמיחה קבועה לנצח.',
      formula: 'Terminal Value = FCF_next_year / (r − g)        where FCF_next_year = FCFₙ × (1 + g)\nPV of Terminal Value = Terminal Value / (1 + r)ᴺ',
      warn: '<b>g must be lower than r</b>, and should not exceed long-run nominal GDP growth (~2–4%) — no company can outgrow the economy forever. The terminal value is often 60–80% of a DCF’s value, so small changes in r or g move the result a lot.',
    }));

    el.appendChild(SAT.concept({
      id: 'bridge', num: '41–42', title: 'From Enterprise Value to Fair Value per Share',
      formula: 'Enterprise Value = PV of Forecast FCF + PV of Terminal Value\nEquity Value     = Enterprise Value − Debt + Cash\nFair Value / Share = Equity Value / Diluted Shares Outstanding\nUpside / Downside  = Fair Value / Current Price − 1',
      interp: 'FCF in a DCF is cash available to <b>all</b> capital providers, so discounting it gives the value of the whole business (EV). Lenders are owed the debt; shareholders own the cash. What remains is the equity — divided by <b>diluted</b> shares.',
    }));
  }

  /* §43 Sensitivity: grid centred on the user's base r and g */
  function renderSens(el) {
    el.innerHTML = SAT.pageHead('Sensitivity Analysis', 'A DCF should produce a range of values, not a false sense of precision. (§43)');
    const card = SAT.el(`<section class="card">
      <header><h3>Fair Value per Share — Terminal Growth × Discount Rate</h3><span class="num">§43</span></header>
      <p class="muted">Inputs are shared with the <a href="#dcf">DCF calculator</a>. The grid is centred on your base case (outlined).</p>
      <details><summary class="muted" style="cursor:pointer">Edit DCF inputs</summary>${SAT.dcfFields()}</details>
      <div class="fields" data-steps style="margin-top:10px;max-width:420px">
        ${SAT.field({ k: 'rs', label: 'Discount-rate step', u: '%', kind: 'assume' })}
        ${SAT.field({ k: 'gs', label: 'Terminal-growth step', u: '%', kind: 'assume' })}
      </div>
      <div class="tbl-wrap" style="margin-top:12px"><table class="t sens" data-grid></table></div>
      <p class="muted" data-cap></p>
      <div class="grid2" style="margin-top:10px">
        <div class="interp"><b>Discount Rate ↑ → Valuation ↓</b><br><b>Discount Rate ↓ → Valuation ↑</b><br>Future cash is worth less when you demand a higher return.</div>
        <div class="interp"><b>Terminal Growth ↑ → Valuation ↑</b><br><b>Terminal Growth ↓ → Valuation ↓</b><br>Higher perpetual growth = more value beyond the forecast.</div>
      </div>
      ${SAT.he('ניתוח רגישות מראה כמה ההערכה תלויה בהנחות. תוצאה = טווח, לא מספר אחד.')}
      <div class="callout warn"><b>Reverse the question:</b> find the cell closest to today’s price. Those are the assumptions <b>already embedded in the current stock price</b>. Do you believe them?</div>
    </section>`);
    el.appendChild(card);
    const grid = card.querySelector('[data-grid]'), cap = card.querySelector('[data-cap]');
    // step fields live under their own key so DCF store stays clean
    const steps = { rs: 1, gs: 0.5 };
    let base = null;
    SAT.form(card.querySelector('[data-steps]'), 'sensSteps', { rs: '1', gs: '0.5' }, (v) => { steps.rs = v.rs; steps.gs = v.gs; draw(); });
    const dcfForm = SAT.form(card.querySelector('details'), SAT.DCF_KEY, SAT.DCF_DEFAULTS, (v) => { base = v; draw(); });
    function draw() {
      if (!base) return;
      const rs = isFinite(steps.rs) && steps.rs > 0 ? steps.rs : 0.01, gs = isFinite(steps.gs) && steps.gs > 0 ? steps.gs : 0.005;
      const rates = [-2, -1, 0, 1, 2].map((k) => base.r + k * rs);
      const gr = [-2, -1, 0, 1, 2].map((k) => base.tg + k * gs);
      const inp = SAT.dcfInputs(base);
      let closest = null;
      const cells = gr.map((g) => rates.map((r) => {
        const d = F.dcf(Object.assign({}, inp, { r, tg: g }));
        if (d.valid && isFinite(d.fv) && isFinite(base.price)) {
          const diff = Math.abs(d.fv - base.price);
          if (!closest || diff < closest.diff) closest = { diff, r, g };
        }
        return d;
      }));
      grid.innerHTML = `<thead><tr><th>g ↓ &nbsp; r →</th>${rates.map((r) => `<th>${f.pct(r)}</th>`).join('')}</tr></thead><tbody>` +
        gr.map((g, i) => `<tr><th>${f.pct(g)}</th>${rates.map((r, j) => {
          const d = cells[i][j];
          if (!d.valid || !isFinite(d.fv)) return '<td class="na">n/a</td>';
          const up = d.up, isBase = i === 2 && j === 2;
          const col = isFinite(up) ? (up >= 0 ? `color-mix(in srgb, var(--pos) ${Math.min(45, 8 + up * 60)}%, transparent)` : `color-mix(in srgb, var(--neg) ${Math.min(45, 8 - up * 60)}%, transparent)`) : 'transparent';
          return `<td class="${isBase ? 'base' : ''}" style="background:${col}" title="Upside ${f.spct(up)}">${f.price(d.fv)}</td>`;
        }).join('')}</tr>`).join('') + '</tbody>';
      const b = cells[2][2];
      cap.innerHTML = `Base case (r ${f.pct(base.r)}, g ${f.pct(base.tg)}): <b>${f.price(b.fv)}</b> vs price ${f.price(base.price)} (${f.spct(b.up)}). Green = above current price, red = below. ` +
        (closest ? `Closest to today’s price: r ≈ ${f.pct(closest.r)}, g ≈ ${f.pct(closest.g)}.` : '');
    }
    draw();
    void dcfForm;
  }

  SAT.register({ id: 'dcf', group: 'value', title: 'DCF Calculator', render: renderDcf });
  SAT.register({ id: 'sensitivity', group: 'decide', title: 'Sensitivity Analysis', render: renderSens });
})();
