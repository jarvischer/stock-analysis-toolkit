/* §29–36 Market Cap, EPS, P/E, EV, EV/EBITDA, P/FCF, FCF Yield, Growth vs Valuation */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt;

  function growthVsValue() {
    const node = SAT.el(`<section class="card concept" id="c-gvv">
      <header><h3>Growth vs Valuation</h3><span class="num">§36</span></header>
      <p class="def">One of the central problems of stock valuation: <b>cheap today</b> or <b>bigger tomorrow</b>?</p>
      ${SAT.he('זול היום מול צומח מחר — זו אחת הבעיות המרכזיות בהערכת שווי.')}
      <div class="vs">
        <div class="card a"><h4>Company A — “cheap, slow”</h4><div class="fields">
          ${SAT.field({ k: 'ya', label: 'FCF Yield today', u: '%' })}${SAT.field({ k: 'ga', label: 'FCF Growth / yr', u: '%', kind: 'assume' })}</div></div>
        <div class="card b"><h4>Company B — “expensive, fast”</h4><div class="fields">
          ${SAT.field({ k: 'yb', label: 'FCF Yield today', u: '%' })}${SAT.field({ k: 'gb', label: 'FCF Growth / yr', u: '%', kind: 'assume' })}</div></div>
      </div>
      <div class="fields" style="margin-top:10px;max-width:200px">${SAT.field({ k: 'n', label: 'Years to compare', u: 'yrs', kind: 'assume' })}</div>
      <p class="muted" style="margin-top:10px">Imagine buying $100 of each stock today at a constant price. Annual FCF per $100 invested (the “yield on cost”):</p>
      <div class="tbl-wrap"><table class="t" data-t></table></div>
      <p data-cross style="margin-top:8px"></p>
      <div class="interp" style="margin-top:8px"><b>A</b> generates more cash relative to its price <b>today</b>. <b>B</b> generates less today but may become much larger <b>if growth continues</b>. The right answer depends on how confident you are in B’s growth and how durable A’s cash flows are. A DCF puts both on the same footing.</div>
    </section>`);
    const table = node.querySelector('[data-t]'), cross = node.querySelector('[data-cross]');
    SAT.form(node, 'calc:gvv', { ya: '10', ga: '3', yb: '4', gb: '25', n: '10' }, (v) => {
      const N = Math.max(1, Math.min(30, Math.round(v.n || 10)));
      const yrs = [0, 1, 2, 3, 5, 7, 10, 15, 20, 30].filter((y) => y <= N);
      if (!yrs.includes(N)) yrs.push(N);
      let cumA = 0, cumB = 0, crossYr = null;
      const cum = {};
      for (let t = 1; t <= N; t++) {
        const a = 100 * v.ya * Math.pow(1 + v.ga, t), b = 100 * v.yb * Math.pow(1 + v.gb, t);
        cumA += a; cumB += b; cum[t] = [cumA, cumB];
        if (crossYr == null && b > a) crossYr = t;
      }
      table.innerHTML = `<thead><tr><th>Year</th>${yrs.map((y) => `<th>${y}</th>`).join('')}</tr></thead><tbody>
        <tr><td class="lbl">A: FCF per $100</td>${yrs.map((y) => `<td>${f.price(100 * v.ya * Math.pow(1 + v.ga, y))}</td>`).join('')}</tr>
        <tr><td class="lbl">B: FCF per $100</td>${yrs.map((y) => `<td>${f.price(100 * v.yb * Math.pow(1 + v.gb, y))}</td>`).join('')}</tr>
        <tr class="tot"><td class="lbl">A: cumulative</td>${yrs.map((y) => `<td>${y ? f.price(cum[y][0]) : '—'}</td>`).join('')}</tr>
        <tr class="tot"><td class="lbl">B: cumulative</td>${yrs.map((y) => `<td>${y ? f.price(cum[y][1]) : '—'}</td>`).join('')}</tr></tbody>`;
      cross.innerHTML = crossYr ? `B’s annual FCF overtakes A’s in <b>year ${crossYr}</b> — if B’s growth actually lasts that long.` : `Within ${N} years, B’s annual FCF never catches up with A’s.`;
    });
    return node;
  }

  SAT.register({
    id: 'valuation', group: 'value', title: 'Valuation Multiples',
    render(el) {
      el.innerHTML = SAT.pageHead('Valuation Multiples', 'Quick ways to compare price against what the business produces. (§29–36)') +
        SAT.toc([['mcap', 'Market Cap'], ['eps', 'EPS'], ['pe', 'P/E'], ['ev', 'Enterprise Value'], ['evebitda', 'EV/EBITDA'], ['pfcf', 'Price/FCF'], ['fy', 'FCF Yield'], ['gvv', 'Growth vs Valuation']]);

      el.appendChild(SAT.concept({
        id: 'mcap', num: 29, title: 'Market Capitalization',
        def: 'The total market value of a company’s equity.',
        he: 'שווי שוק = מחיר מניה × מספר מניות.',
        formula: 'Market Cap = Share Price × Shares Outstanding',
        warn: '<b>Share price alone does NOT tell us whether a company is expensive.</b> A $500 stock can be cheaper than a $10 stock: a $500 stock with 100M shares = $50B market cap; a $10 stock with 10B shares = $100B. What matters is the price relative to the business’s earnings, cash flow and value.',
        learn: 'marketCap',
        calc: {
          id: 'mcap', defaults: { p: '150', s: '2.5B' },
          fields: [{ k: 'p', label: 'Share Price' }, { k: 's', label: 'Shares Outstanding', u: '#' }],
          outputs: [{ id: 'm', label: 'Market Cap', kind: 'calc', f: (v) => F.marketCap(v.p, v.s) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'eps', num: 30, title: 'EPS', abbr: 'Earnings Per Share',
        formula: 'EPS = Net Income / Shares Outstanding',
        body: '<p><b>Basic EPS</b> uses shares currently outstanding. <b>Diluted EPS</b> also counts shares that could be created from options, RSUs and convertible bonds — more conservative and the one to use for valuation.</p>',
        learn: 'eps',
        calc: {
          id: 'eps', defaults: { ni: '5B', s: '2.5B' },
          fields: [{ k: 'ni', label: 'Net Income' }, { k: 's', label: 'Diluted Shares', u: '#' }],
          outputs: [{ id: 'e', label: 'EPS', fmt: 'price', f: (v) => SAT.div(v.ni, v.s) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'pe', num: 31, title: 'P/E Ratio', abbr: 'Price / Earnings',
        formula: 'P/E = Share Price / EPS\n    = Market Cap / Net Income',
        example: [['Market Cap', '$20B'], ['Net Income', '$1B'], ['P/E', '20x', 'res']],
        interp: 'Investors are paying <b>$20 for every $1</b> of current annual earnings. Inverse: earnings yield = 1/20 = 5%.',
        warn: '<b>Low P/E ≠ automatically cheap.</b> (declining business, peak-cycle earnings, one-off gains)<br><b>High P/E ≠ automatically expensive.</b> (fast growth, temporarily depressed earnings, heavy reinvestment)<br>Growth and business quality matter.',
        learn: 'pe',
        calc: {
          id: 'pe', defaults: { m: '20B', ni: '1B' },
          fields: [{ k: 'm', label: 'Market Cap' }, { k: 'ni', label: 'Net Income' }],
          outputs: [{ id: 'pe', label: 'P/E', fmt: 'x', f: (v) => SAT.div(v.m, v.ni) }, { id: 'ey', label: 'Earnings Yield', fmt: 'pct', f: (v) => SAT.div(v.ni, v.m) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'ev', num: 32, title: 'Enterprise Value', abbr: 'EV',
        formula: 'Enterprise Value = Market Cap + Debt − Cash',
        he: 'שווי פירמה: כמה עולה לקנות את כל העסק — כולל החוב, ובניכוי המזומן שבקופה.',
        interp: '<b>Market Cap</b> measures the value of the <b>equity</b>. <b>Enterprise Value</b> approximates the value of the <b>operating business</b> after accounting for debt and cash. Intuition: if you buy the whole company, you also take on its debt (adds to the price) but you get its cash (reduces the price).',
        learn: 'ev',
        calc: {
          id: 'ev', defaults: { m: '20B', d: '5B', c: '3B' },
          fields: [{ k: 'm', label: 'Market Cap' }, { k: 'd', label: 'Total Debt' }, { k: 'c', label: 'Cash' }],
          outputs: [{ id: 'ev', label: 'Enterprise Value', f: (v) => F.ev(v.m, v.d, v.c) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'evebitda', num: 33, title: 'EV / EBITDA',
        formula: 'EV / EBITDA = Enterprise Value / EBITDA',
        example: [['EV', '$20B'], ['EBITDA', '$2B'], ['EV / EBITDA', '10x', 'res']],
        interp: '<b>Useful</b> for comparing companies with different debt levels and tax rates (capital-structure neutral), for M&amp;A and LBO analysis, and for businesses with heavy D&amp;A from acquisitions.',
        warn: '<b>EBITDA ignores capital expenditures.</b> Two companies at 10x EV/EBITDA can be very different if one must spend 50% of EBITDA on CapEx. Cross-check with EV/EBIT or Price/FCF.',
        learn: 'evEbitda',
        calc: {
          id: 'evebitda', defaults: { ev: '20B', e: '2B' },
          fields: [{ k: 'ev', label: 'Enterprise Value' }, { k: 'e', label: 'EBITDA' }],
          outputs: [{ id: 'm', label: 'EV / EBITDA', fmt: 'x', f: (v) => SAT.div(v.ev, v.e) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'pfcf', num: 34, title: 'Price / FCF',
        formula: 'Price / FCF = Market Cap / Free Cash Flow',
        interp: 'Price/FCF and FCF Yield are <b>inverses</b>: P/FCF of 25x ⇔ FCF Yield of 1/25 = 4%. P/FCF of 10x ⇔ 10% yield. Yield is often easier to compare against bond rates.',
        learn: 'pfcf',
        calc: {
          id: 'pfcf', defaults: { m: '10B', fcf: '1B' },
          fields: [{ k: 'm', label: 'Market Cap' }, { k: 'fcf', label: 'Free Cash Flow' }],
          outputs: [{ id: 'p', label: 'Price / FCF', fmt: 'x', f: (v) => SAT.div(v.m, v.fcf) }, { id: 'y', label: 'FCF Yield', fmt: 'pct', f: (v) => SAT.div(v.fcf, v.m) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'fy', num: 35, title: 'FCF Yield',
        formula: 'FCF Yield = Free Cash Flow / Market Cap',
        example: [['Market Cap', '$10B'], ['FCF', '$1B'], ['FCF Yield', '10%', 'res']],
        interp: 'For every <b>$100 of market value</b>, the company currently generates approximately <b>$10 of annual FCF</b>.',
        good: '<b>Higher FCF Yield may indicate a cheaper valuation</b> — but growth must also be considered. Rough rule: expected return ≈ FCF yield + long-term FCF growth (if the multiple stays constant).',
        learn: 'fcfYield',
        calc: {
          id: 'fy', defaults: { fcf: '1B', m: '10B' },
          fields: [{ k: 'fcf', label: 'Free Cash Flow' }, { k: 'm', label: 'Market Cap' }],
          outputs: [{ id: 'y', label: 'FCF Yield', fmt: 'pct', f: (v) => SAT.div(v.fcf, v.m) }, { id: 'per', label: 'FCF per $100', fmt: 'price', f: (v) => 100 * SAT.div(v.fcf, v.m) }],
        },
      }));

      el.appendChild(growthVsValue());
    },
  });
})();
