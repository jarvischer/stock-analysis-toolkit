/* §50 Interactive Company Analyzer — one page: enter a company's numbers, get every metric + DCF. */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt, L = SAT.LEARN, d = SAT.div;
  const KEY = 'analyzer';
  const EXAMPLE = {
    company: 'ExampleCo (illustrative)', ticker: 'EXMP', price: '120', shares: '1B',
    rev: '20B', prevRev: '17B', cogs: '8B', opex: '7B', oi: '5B', ni: '3.8B',
    ocf: '5.5B', capex: '1.5B', cash: '6B', debt: '4B', ca: '14B', cl: '7B', ebitda: '6.2B',
    tax: '21', ic: '18B', g: '12', r: '9', tg: '3', years: '5',
  };
  const INPUTS = [
    ['Company', [['company', 'Company Name', 'text'], ['ticker', 'Ticker', 'text'], ['price', 'Share Price', '$'], ['shares', 'Shares Outstanding (diluted)', '#']]],
    ['Income statement (actual)', [['rev', 'Revenue', '$'], ['prevRev', 'Previous Year Revenue', '$'], ['cogs', 'Cost of Revenue', '$'], ['opex', 'Operating Expenses', '$'], ['oi', 'Operating Income', '$'], ['ni', 'Net Income', '$'], ['ebitda', 'EBITDA', '$']]],
    ['Cash flow & balance sheet (actual)', [['ocf', 'Operating Cash Flow', '$'], ['capex', 'CapEx', '$'], ['cash', 'Cash', '$'], ['debt', 'Debt', '$'], ['ca', 'Current Assets', '$'], ['cl', 'Current Liabilities', '$'], ['ic', 'Invested Capital', '$']]],
    ['Assumptions', [['tax', 'Tax Rate', '%'], ['g', 'Expected FCF Growth', '%'], ['r', 'Discount Rate (WACC)', '%'], ['tg', 'Terminal Growth', '%'], ['years', 'Forecast Years', 'yrs']]],
  ];

  SAT.analyze = function (v) {
    const m = {};
    m.mcap = F.marketCap(v.price, v.shares);
    m.growth = F.growth(v.rev, v.prevRev);
    m.gp = v.rev - v.cogs;
    m.gm = d(m.gp, v.rev);
    m.oiCheck = m.gp - v.opex;
    m.om = d(v.oi, v.rev);
    m.nm = d(v.ni, v.rev);
    m.fcf = F.fcf(v.ocf, v.capex);
    m.fcfm = d(m.fcf, v.rev);
    m.netCash = v.cash - v.debt;
    m.cr = d(v.ca, v.cl);
    m.de = d(v.debt, v.ebitda);
    m.nopat = F.nopat(v.oi, v.tax);
    m.roic = d(m.nopat, v.ic);
    m.spread = m.roic - v.r;
    m.eps = d(v.ni, v.shares);
    m.pe = v.ni > 0 ? d(m.mcap, v.ni) : NaN;
    m.ev = F.ev(m.mcap, v.debt || 0, v.cash || 0);
    m.evEbitda = v.ebitda > 0 ? d(m.ev, v.ebitda) : NaN;
    m.pfcf = m.fcf > 0 ? d(m.mcap, m.fcf) : NaN;
    m.fcfYield = d(m.fcf, m.mcap);
    m.dcf = F.dcf({ fcf0: m.fcf, g: v.g, years: v.years || 5, r: v.r, tg: v.tg, debt: v.debt || 0, cash: v.cash || 0, shares: v.shares, price: v.price });
    return m;
  };
  SAT.analyzeStored = function () {
    const raw = Object.assign({}, EXAMPLE, SAT.store.get(KEY, {}));
    const v = {};
    INPUTS.forEach(([, fs]) => fs.forEach(([k, , u]) => {
      if (u === 'text') v[k] = raw[k]; else { let n = SAT.parse(raw[k]); if (u === '%') n /= 100; v[k] = n; }
    }));
    return { v, m: SAT.analyze(v) };
  };

  // [id, label, learnKey, formula, kind, fmt, tone]
  const OUT = [
    ['Size & growth', [
      ['mcap', 'Market Cap', 'marketCap', 'Price × Shares'], ['growth', 'Revenue Growth', 'growth', '(Rev − Prev) / Prev', 'calc', 'pct', 1],
    ]],
    ['Profitability', [
      ['gp', 'Gross Profit', 'grossProfit', 'Revenue − Cost of Revenue'], ['gm', 'Gross Margin', 'grossMargin', 'Gross Profit / Revenue', 'calc', 'pct'],
      ['om', 'Operating Margin', 'opMargin', 'Operating Income / Revenue', 'calc', 'pct', 1], ['nm', 'Net Margin', 'netMargin', 'Net Income / Revenue', 'calc', 'pct', 1],
    ]],
    ['Cash flow', [
      ['fcf', 'Free Cash Flow', 'fcf', 'OCF − CapEx', 'calc', 'money', 1], ['fcfm', 'FCF Margin', 'fcfMargin', 'FCF / Revenue', 'calc', 'pct', 1],
    ]],
    ['Balance sheet', [
      ['netCash', 'Net Cash / (Net Debt)', 'netCash', 'Cash − Debt', 'calc', 'money', 1], ['cr', 'Current Ratio', 'currentRatio', 'Current Assets / Current Liabilities', 'calc', 'ratio'],
      ['de', 'Debt / EBITDA', 'debtEbitda', 'Debt / EBITDA', 'calc', 'x'],
    ]],
    ['Capital efficiency', [
      ['nopat', 'NOPAT', 'nopat', 'Operating Income × (1 − Tax)'], ['roic', 'ROIC', 'roic', 'NOPAT / Invested Capital', 'calc', 'pct'],
      ['spread', 'ROIC − WACC', 'wacc', 'ROIC − Discount rate', 'calc', 'spct', 1],
    ]],
    ['Valuation multiples', [
      ['pe', 'P/E', 'pe', 'Market Cap / Net Income', 'calc', 'x'], ['ev', 'Enterprise Value', 'ev', 'Market Cap + Debt − Cash'],
      ['evEbitda', 'EV / EBITDA', 'evEbitda', 'EV / EBITDA', 'calc', 'x'], ['pfcf', 'Price / FCF', 'pfcf', 'Market Cap / FCF', 'calc', 'x'],
      ['fcfYield', 'FCF Yield', 'fcfYield', 'FCF / Market Cap', 'calc', 'pct'],
    ]],
    ['Intrinsic value (DCF estimate)', [
      ['dcfEv', 'DCF Enterprise Value', 'dcf', 'PV(FCF) + PV(TV)', 'est'], ['dcfEq', 'DCF Equity Value', 'dcf', 'EV − Debt + Cash', 'est'],
      ['fv', 'Fair Value / Share', 'dcf', 'Equity / Shares', 'est', 'price'], ['up', 'Upside / Downside', 'upside', 'Fair value / Price − 1', 'est', 'spct', 1],
    ]],
  ];

  SAT.register({
    id: 'analyzer', group: 'tools', title: 'Analyze a Company',
    render(el) {
      el.innerHTML = SAT.pageHead('Analyze a Company', 'Enter the latest annual (or trailing-twelve-month) figures from the 10-K / 10-Q. Every metric and a DCF update instantly. Hover ⓘ for definitions; turn on Learning Mode for interpretation. (§50)');
      const node = SAT.el(`<div class="grid2 az-grid" style="grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:start">
        <section class="card" style="position:sticky;top:60px">
          ${INPUTS.map(([g, fs]) => `<div class="az-sec">${g}</div><div class="fields" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${fs.map(([k, l, u]) => SAT.field({ k, label: l, u, kind: g === 'Assumptions' ? 'assume' : 'actual', tip: k === 'capex' ? 'Positive or negative — treated as an outflow' : k === 'ic' ? 'Simplified: Equity + Debt − Cash' : '' })).join('')}</div>`).join('')}
          <div class="btns"><button class="btn ghost" data-ex>Load example</button><button class="btn ghost" data-clear>Clear</button><button class="btn ghost" data-send>Send to DCF →</button></div>
        </section>
        <div>
          <div class="verdict" data-verdict></div>
          <div class="callout warn" data-warn hidden></div>
          <section class="card" style="margin-top:12px">${OUT.map(([g, ms]) => `<div class="az-sec">${g}</div><div class="metrics">${ms.map(([id, label, lk, fx, kind]) =>
            SAT.metric({ id, label, tip: (L[lk] || {}).tip, formula: fx, kind: kind || 'calc', learn: lk })).join('')}</div>`).join('')}</section>
          <section class="card"><header><h3>Remember</h3></header><div class="princ">${(SAT.PRINCIPLES || []).slice(0, 8).map((p) => `<div>${p}</div>`).join('')}</div></section>
        </div></div>`);
      el.appendChild(node);
      const verdict = node.querySelector('[data-verdict]'), warn = node.querySelector('[data-warn]');
      const form = SAT.form(node.querySelector('section'), KEY, EXAMPLE, (v) => {
        const m = SAT.analyze(v);
        const vals = Object.assign({}, m, { dcfEv: m.dcf.ev, dcfEq: m.dcf.eq, fv: m.dcf.fv, up: m.dcf.up });
        OUT.forEach(([, ms]) => ms.forEach(([id, , , , , fmt, toned]) => SAT.setMetric(node, id, f.as(fmt || 'money', vals[id]), toned ? SAT.tone(vals[id]) : '')));
        const name = [v.company, v.ticker && `(${v.ticker})`].filter(Boolean).join(' ') || 'This company';
        verdict.innerHTML = isFinite(m.dcf.fv)
          ? `<div><div class="ml">DCF fair value / share</div><div class="big">${f.price(m.dcf.fv)}</div></div>
             <div><div class="ml">Price</div><div class="mv">${f.price(v.price)}</div></div>
             <div><div class="ml">Upside / Downside</div><div class="mv" style="color:var(--${m.dcf.up >= 0 ? 'pos' : 'neg'})">${f.spct(m.dcf.up)}</div></div>
             <div class="muted" style="flex-basis:100%">${SAT.esc(name)}: base-case DCF with FCF growing ${f.pct(v.g)} for ${Math.round(v.years || 5)} years, r = ${f.pct(v.r)}, g = ${f.pct(v.tg)}. Terminal value is ${f.pct(m.dcf.tvShare, 0)} of EV. <a href="#sensitivity" data-send2>See the range →</a></div>`
          : `<div class="muted">Enter FCF inputs, shares, and a discount rate greater than terminal growth to see a DCF value.</div>`;
        const w = [];
        if (isFinite(m.oiCheck) && isFinite(v.oi) && Math.abs(m.oiCheck - v.oi) > Math.abs(v.oi) * 0.02)
          w.push(`Gross Profit − OpEx = ${f.money(m.oiCheck)} but Operating Income entered is ${f.money(v.oi)}. Check whether OpEx includes Cost of Revenue (don’t subtract it twice) or other operating items.`);
        if (m.fcf <= 0) w.push('FCF is zero or negative — a DCF on current FCF is not meaningful. Use a revenue/margin forecast (Bear/Base/Bull) instead.');
        if (v.r <= v.tg) w.push('Discount rate must be greater than terminal growth.');
        if (m.dcf.valid && m.dcf.tvShare > 0.8) w.push(`${f.pct(m.dcf.tvShare, 0)} of the DCF value comes from the terminal value — highly assumption-sensitive.`);
        warn.hidden = !w.length; warn.innerHTML = w.map((x) => '• ' + x).join('<br>');
      });
      node.querySelector('[data-ex]').addEventListener('click', () => form.set(EXAMPLE));
      node.querySelector('[data-clear]').addEventListener('click', () => { const z = {}; Object.keys(EXAMPLE).forEach((k) => { z[k] = ''; }); form.set(z); });
      const send = () => {
        const { v, m } = SAT.analyzeStored();
        const raw = Object.assign({}, EXAMPLE, SAT.store.get(KEY, {}));
        SAT.store.set(SAT.DCF_KEY, Object.assign(SAT.store.get(SAT.DCF_KEY, {}), {
          name: [v.company, v.ticker].filter(Boolean).join(' · '), fcf0: isFinite(m.fcf) ? String(Math.round(m.fcf)) : '',
          g: raw.g, years: raw.years, r: raw.r, tg: raw.tg, debt: raw.debt, cash: raw.cash, shares: raw.shares, price: raw.price,
        }));
      };
      node.querySelector('[data-send]').addEventListener('click', () => { send(); SAT.goto('dcf'); });
      verdict.addEventListener('click', (e) => { if (e.target.closest('[data-send2]')) send(); });
    },
  });
})();
