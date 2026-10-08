/* Reference views: Quick Reference, Formula Cheat Sheet, Glossary, Statement Map, Principles, Favorites. */
(function () {
  'use strict';
  const esc = SAT.esc, L = SAT.link, H = SAT.href;

  SAT.PRINCIPLES = [
    'Revenue ≠ Profit', 'Profit ≠ Cash Flow', 'EBITDA ≠ Cash Flow', 'Growth ≠ Value Creation', 'Gross Margin ≠ Operating Margin',
    'Market Cap ≠ Enterprise Value', 'Book Value ≠ Market Value', 'Share Price ≠ Valuation', 'High CapEx ≠ automatically bad',
    'Low P/E ≠ automatically cheap', 'High P/E ≠ automatically expensive', 'High Revenue Growth ≠ automatically a good investment',
    'ROIC should be compared with WACC', 'Always look at per-share economics', 'A great business can be a bad investment at the wrong price',
    'DCF is based on assumptions, not certainty', 'Valuation should be a range, not a single magical number',
  ];
  const PLINK = ['revenue', 'profit-vs-cash', 'ebitda', 'wacc', 'operating-margin', 'enterprise-value', 'book-value', 'market-cap', 'capex', 'pe', 'pe', 'growth-vs-valuation', 'roic', 'dilution', 'growth-vs-valuation', 'dcf-intro', 'sensitivity'];

  /* ---------- Quick Reference ---------- */
  SAT.register({
    id: 'quickref', group: 'ref', title: 'Quick Reference',
    render(el) {
      el.innerHTML = `<div class="page-head"><h2>Quick Reference</h2><p>“What was that formula again?” One line each. Click any entry for the full explanation.</p></div>
        <div class="filterbar"><input class="filter" data-f placeholder="Filter… (e.g. margin, cash, EV)" aria-label="Filter quick reference"></div>
        <div class="qr" data-list>${SAT.SECTIONS.map((s) => {
          const items = s.concepts.map((id) => SAT.C[id]).filter((c) => c.stmt !== 'qual' && (c.formula || c.short));
          if (!items.length) return '';
          return `<h4 class="qr-h" data-sec>${s.title}</h4>` + items.map((c) => `<a class="qr-i" href="${H(c.id)}" data-hay="${esc((c.title + ' ' + (c.abbr || '') + ' ' + (c.aka || []).join(' ') + ' ' + (c.tags || []).join(' ')).toLowerCase())}">
            <span class="qr-t">${c.title.toUpperCase()}${c.abbr && c.abbr.length < 12 ? ` <small>${c.abbr}</small>` : ''}</span>
            ${c.formula ? `<code>${c.formula.split('\n')[0].replace(/^[^=]+=\s*/, '')}</code>` : ''}
            <span class="qr-s">→ ${c.short}</span></a>`).join('');
        }).join('')}</div>`;
      filter(el, '.qr-i', '.qr-h');
    },
  });

  /* Generic filter: hides items not matching; hides group headers with no visible items. */
  function filter(el, itemSel, headSel) {
    const inp = el.querySelector('[data-f]');
    const run = () => {
      const q = inp.value.trim().toLowerCase();
      el.querySelectorAll(itemSel).forEach((i) => { i.hidden = q && !(i.dataset.hay || i.textContent.toLowerCase()).includes(q); });
      el.querySelectorAll(headSel).forEach((h) => {
        let n = h.nextElementSibling, any = false;
        while (n && !n.matches(headSel)) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        h.hidden = !any;
      });
    };
    inp.addEventListener('input', run);
    return run;
  }

  /* ---------- Formula Cheat Sheet ---------- */
  const SHEET = [
    ['Profitability', [['Revenue Growth', '(Current Revenue − Previous Revenue) / Previous Revenue', 'revenue'], ['Gross Profit', 'Revenue − Cost of Revenue', 'gross-profit'], ['Gross Margin', 'Gross Profit / Revenue', 'gross-margin'],
      ['Operating Income', 'Gross Profit − Operating Expenses', 'operating-income'], ['Operating Margin', 'Operating Income / Revenue', 'operating-margin'], ['Net Margin', 'Net Income / Revenue', 'net-margin']]],
    ['Cash Flow', [['FCF', 'Operating Cash Flow − CapEx', 'fcf'], ['FCF Margin', 'FCF / Revenue', 'fcf-margin']]],
    ['Balance Sheet', [['Net Cash', 'Cash − Debt', 'net-cash'], ['Net Debt', 'Debt − Cash', 'net-debt'], ['Current Ratio', 'Current Assets / Current Liabilities', 'current-ratio'], ['Debt / EBITDA', 'Debt / EBITDA', 'debt-ebitda']]],
    ['Capital Efficiency', [['NOPAT', 'Operating Income × (1 − Tax Rate)', 'nopat'], ['ROIC', 'NOPAT / Invested Capital', 'roic'], ['Value Creation Spread', 'ROIC − WACC', 'wacc']]],
    ['Per Share', [['EPS', 'Net Income / Shares Outstanding', 'eps']]],
    ['Valuation', [['Market Cap', 'Share Price × Shares Outstanding', 'market-cap'], ['P/E', 'Market Cap / Net Income', 'pe'], ['Enterprise Value', 'Market Cap + Debt − Cash', 'enterprise-value'],
      ['EV / EBITDA', 'Enterprise Value / EBITDA', 'ev-ebitda'], ['Price / FCF', 'Market Cap / FCF', 'price-fcf'], ['FCF Yield', 'FCF / Market Cap', 'fcf-yield']]],
    ['DCF', [['Present Value', 'Future Cash Flow / (1 + r)^t', 'present-value'], ['Terminal Value', 'FCF next year / (r − g)', 'terminal-value'], ['DCF Enterprise Value', 'PV of Forecast FCF + PV of Terminal Value', 'dcf-ev'],
      ['Equity Value', 'Enterprise Value − Debt + Cash', 'equity-value'], ['Fair Value Per Share', 'Equity Value / Diluted Shares Outstanding', 'fair-value-per-share']]],
  ];
  SAT.SHEET = SHEET;
  SAT.register({
    id: 'cheatsheet', group: 'handbook', num: 12, title: 'Formula Cheat Sheet',
    render(el) {
      el.innerHTML = `<div class="page-head"><div class="sec-num">Section 12</div><h2>Formula Cheat Sheet</h2><p>Every core formula on one page. Filter by name or group; click a formula for its full card.</p></div>
        <div class="filterbar"><input class="filter" data-f placeholder="Filter formulas…" aria-label="Filter formulas">
          <div class="chips">${['All', ...SHEET.map((g) => g[0])].map((g, i) => `<button class="chip${i ? '' : ' on'}" data-g="${g}">${g}</button>`).join('')}</div>
          <button class="iconbtn" onclick="window.print()">Print</button></div>
        <div class="sheet" data-list>${SHEET.map(([g, rows]) => `<section class="sheet-g" data-grp="${g}"><h4 class="sheet-h">${g}</h4>${rows.map(([n, fx, id]) =>
          `<a class="sheet-i" href="${H(id)}" data-hay="${esc((n + ' ' + fx + ' ' + g).toLowerCase())}"><b>${n}</b><code>= ${fx}</code></a>`).join('')}</section>`).join('')}</div>`;
      const inp = el.querySelector('[data-f]');
      let grp = 'All';
      const run = () => {
        const q = inp.value.trim().toLowerCase();
        el.querySelectorAll('.sheet-g').forEach((s) => {
          let any = false;
          s.querySelectorAll('.sheet-i').forEach((i) => { i.hidden = !!q && !i.dataset.hay.includes(q); if (!i.hidden) any = true; });
          s.hidden = !any || (grp !== 'All' && s.dataset.grp !== grp);
        });
      };
      inp.addEventListener('input', run);
      el.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { grp = b.dataset.g; el.querySelectorAll('[data-g]').forEach((x) => x.classList.toggle('on', x === b)); run(); }));
    },
  });

  /* ---------- Glossary ---------- */
  SAT.GLOSSARY.push(
    { term: 'Balance Sheet', href: '#balance', def: 'Snapshot of assets, liabilities and shareholders’ equity at a date. Assets = Liabilities + Equity.' },
    { term: 'Income Statement', href: '#income', def: 'Revenue down to net income over a period (P&L).' },
    { term: 'Cash Flow', id: 'cfs', def: 'Actual cash moving in and out; reported in the Cash Flow Statement.' },
    { term: 'EBIT', id: 'operating-income', def: 'Earnings Before Interest and Taxes; usually ≈ Operating Income.' },
    { term: 'Financing Cash Flow', id: 'cfs', def: 'Cash from/to lenders and shareholders: debt, share issuance, buybacks, dividends.' },
    { term: 'Investing Cash Flow', id: 'cfs', def: 'Cash spent on/received from long-term assets: CapEx, acquisitions, investments.' },
    { term: 'G&A', id: 'opex', def: 'General & Administrative expenses: executives, finance, legal, HR, offices.' },
    { term: 'R&D', id: 'opex', def: 'Research & Development expenses: building new products and technology.' },
    { term: 'S&M', id: 'opex', def: 'Sales & Marketing expenses: salespeople, advertising, customer acquisition.' },
    { term: 'Growth CapEx', id: 'capex', def: 'Capital spending to expand capacity and future revenue.' },
    { term: 'Maintenance CapEx', id: 'capex', def: 'Capital spending needed to keep the existing business running.' },
    { term: 'Revenue Growth', id: 'revenue', def: '(Current Revenue − Previous Revenue) / Previous Revenue.' },
    { term: 'Terminal Growth', id: 'terminal-value', def: 'The constant growth rate (g) assumed forever after the forecast period.' },
    { term: 'COGS', id: 'cogs', def: 'Cost of Goods Sold — direct costs of products sold.' },
    { term: 'FCF', id: 'fcf', def: 'Free Cash Flow = Operating Cash Flow − CapEx.' },
    { term: 'OCF', id: 'ocf', def: 'Operating Cash Flow — cash generated by normal operations.' },
    { term: 'Debt / EBITDA', id: 'debt-ebitda' }, { term: 'Shareholders’ Equity', id: 'equity' }, { term: 'Market Cap', id: 'market-cap' },
    { term: 'Price / FCF', id: 'price-fcf' }, { term: 'P/E', id: 'pe' }, { term: 'Net Margin', id: 'net-margin' }, { term: 'DCF', id: 'dcf-intro' },
  );
  SAT.register({
    id: 'glossary', group: 'handbook', num: 13, title: 'Glossary',
    render(el) {
      const map = new Map();
      Object.values(SAT.C).forEach((c) => map.set(c.title.toLowerCase(), { term: c.title, href: H(c.id), def: c.short, sub: c.abbr }));
      SAT.GLOSSARY.forEach((g) => {
        const k = g.term.toLowerCase(); if (map.has(k) && !g.def) return;
        map.set(k, { term: g.term, href: g.href || H(g.id), def: g.def || (SAT.C[g.id] || {}).short, sub: g.id && SAT.C[g.id] && SAT.C[g.id].title !== g.term ? 'see ' + SAT.C[g.id].title : '' });
      });
      const all = [...map.values()].sort((a, b) => a.term.replace(/[^a-z0-9]/gi, '').localeCompare(b.term.replace(/[^a-z0-9]/gi, ''), 'en', { sensitivity: 'base' }));
      const letter = (t) => { const ch = t.replace(/[^a-z0-9]/gi, '')[0].toUpperCase(); return /[0-9]/.test(ch) ? '#' : ch; };
      const letters = [...new Set(all.map((g) => letter(g.term)))];
      el.innerHTML = `<div class="page-head"><div class="sec-num">Section 13</div><h2>Glossary</h2><p>${all.length} terms, A–Z. Each links to its full explanation.</p></div>
        <div class="filterbar"><input class="filter" data-f placeholder="Filter terms…" aria-label="Filter glossary"><div class="az">${letters.map((l) => `<a href="javascript:void 0" data-jump="g-${l}">${l}</a>`).join('')}</div></div>
        <div class="gl">${letters.map((l) => `<h4 class="gl-h" id="g-${l}">${l}</h4>` + all.filter((g) => letter(g.term) === l).map((g) =>
          `<a class="gl-i" href="${g.href}" data-hay="${esc((g.term + ' ' + (g.sub || '')).toLowerCase())}"><b>${esc(g.term)}</b>${g.sub ? ` <small>${esc(g.sub)}</small>` : ''}<span>${g.def || ''}</span></a>`).join('')).join('')}</div>`;
      filter(el, '.gl-i', '.gl-h');
    },
  });

  /* ---------- Financial Statement Map ---------- */
  const MAP = [
    ['INCOME STATEMENT', 's-is', 'Reported in the 10-K / 10-Q', ['revenue', 'cogs', 'gross-profit', 'opex', 'operating-income', 'net-income', 'eps', 'shares-outstanding']],
    ['BALANCE SHEET', 's-bs', 'Reported — a snapshot at one date', ['cash', 'receivables', 'inventory', 'ppe', 'assets', 'payables', 'debt', 'liabilities', 'equity']],
    ['CASH FLOW STATEMENT', 's-cf', 'Reported', ['ocf', 'capex', 'cfs']],
    ['CALCULATED BY YOU', 's-calc', 'Not reported — you compute them', ['gross-margin', 'operating-margin', 'net-margin', 'fcf', 'fcf-margin', 'net-debt', 'current-ratio', 'ebitda', 'debt-ebitda', 'nopat', 'invested-capital', 'roic', 'market-cap', 'enterprise-value', 'pe', 'ev-ebitda', 'price-fcf', 'fcf-yield']],
    ['YOUR VALUATION MODEL', 's-model', 'Assumptions and estimates', ['wacc', 'discount-rate', 'terminal-value', 'dcf-ev', 'equity-value', 'fair-value-per-share']],
  ];
  SAT.register({
    id: 'statements', group: 'ref', title: 'Statement Map',
    render(el) {
      el.innerHTML = `<div class="page-head"><h2>Financial Statement Map</h2><p>Where each number comes from: which figures you <b>read directly from filings</b>, and which metrics you <b>calculate yourself</b>.</p>
        ${SAT.he('אילו מספרים מופיעים בדוחות, ואילו מחשבים בעצמנו.')}</div>
        <div class="smap">${MAP.map(([t, cls, sub, ids]) => `<section class="smap-c ${cls}"><h4>${t}</h4><p class="muted">${sub}</p><ul>${ids.filter((id) => SAT.C[id]).map((id) => `<li>${L(id)}${SAT.C[id].formula && cls === 's-calc' ? `<small>${SAT.C[id].formula.split('\n')[0].replace(/^[^=]+=\s*/, '= ')}</small>` : ''}</li>`).join('')}</ul></section>`).join('')}</div>
        <div class="callout good" style="margin-top:14px"><b>Where to find filings:</b> SEC EDGAR (10-K annual, 10-Q quarterly), the company’s investor-relations site, earnings releases. Use “Diluted shares” from the income statement and the latest share count from the cover page.</div>`;
      if (SAT.statementLab) el.querySelector('.page-head').after(SAT.statementLab());
    },
  });

  /* ---------- Principles ---------- */
  SAT.register({
    id: 'principles', group: 'ref', title: 'Important Principles',
    render(el) {
      el.innerHTML = `<div class="page-head"><h2>Important Principles</h2><p>Read these before every analysis.</p></div>
        <div class="plist">${SAT.PRINCIPLES.map((p, i) => `<a class="pr" href="${H(PLINK[i])}"><span>${String(i + 1).padStart(2, '0')}</span>${p}</a>`).join('')}</div>
        <div class="card banner" style="margin-top:14px"><div class="banner-t">ALWAYS ASK</div>
        <p class="ask">“What assumptions are already priced into the stock?”</p><p class="ask">“What would prove my thesis wrong?”</p></div>`;
    },
  });

  /* ---------- Favorites ---------- */
  SAT.register({
    id: 'favorites', group: 'ref', title: 'Favorites ★',
    render(el) {
      const ids = SAT.favs().filter((id) => SAT.C[id]);
      el.innerHTML = `<div class="page-head"><h2>Favorites</h2><p>${ids.length ? 'Your bookmarked concepts.' : 'Click the ★ on any concept card to bookmark it here.'}</p></div>`;
      ids.forEach((id) => el.appendChild(SAT.card(SAT.C[id])));
    },
  });
})();
