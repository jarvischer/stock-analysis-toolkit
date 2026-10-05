/* §49 Formula cheat sheet — one compact screen. */
(function () {
  'use strict';
  const SHEET = [
    ['Income statement', [
      ['Revenue Growth', '(Current Revenue − Previous Revenue) / Previous Revenue', 'income'],
      ['Gross Profit', 'Revenue − Cost of Revenue', 'income'],
      ['Gross Margin', 'Gross Profit / Revenue', 'income'],
      ['Operating Income', 'Gross Profit − Operating Expenses', 'income'],
      ['Operating Margin', 'Operating Income / Revenue', 'income'],
      ['Net Margin', 'Net Income / Revenue', 'income'],
    ]],
    ['Cash flow', [
      ['FCF', 'Operating Cash Flow − CapEx', 'cashflow'],
      ['FCF Margin', 'FCF / Revenue', 'cashflow'],
    ]],
    ['Balance sheet & leverage', [
      ['Net Cash', 'Cash − Debt', 'balance'],
      ['Current Ratio', 'Current Assets / Current Liabilities', 'balance'],
      ['Debt / EBITDA', 'Total Debt / EBITDA', 'balance'],
    ]],
    ['Capital efficiency', [
      ['NOPAT', 'Operating Income × (1 − Tax Rate)', 'efficiency'],
      ['ROIC', 'NOPAT / Invested Capital', 'efficiency'],
      ['Value Creation Spread', 'ROIC − WACC', 'efficiency'],
    ]],
    ['Valuation', [
      ['Market Cap', 'Share Price × Shares Outstanding', 'valuation'],
      ['EPS', 'Net Income / Shares Outstanding', 'valuation'],
      ['P/E', 'Market Cap / Net Income', 'valuation'],
      ['Enterprise Value', 'Market Cap + Debt − Cash', 'valuation'],
      ['EV / EBITDA', 'Enterprise Value / EBITDA', 'valuation'],
      ['Price / FCF', 'Market Cap / FCF', 'valuation'],
      ['FCF Yield', 'FCF / Market Cap', 'valuation'],
    ]],
    ['DCF', [
      ['PV', 'Future Cash Flow / (1 + Discount Rate)ᵗ', 'dcf'],
      ['Terminal Value', 'FCF_next_year / (Discount Rate − Terminal Growth)', 'dcf'],
      ['Enterprise Value (DCF)', 'PV of Forecast FCF + PV of Terminal Value', 'dcf'],
      ['Equity Value', 'Enterprise Value − Debt + Cash', 'dcf'],
      ['Fair Value Per Share', 'Equity Value / Diluted Shares Outstanding', 'dcf'],
      ['Upside / Downside', 'Fair Value / Current Price − 1', 'dcf'],
    ]],
  ];
  SAT.register({
    id: 'cheatsheet', group: 'tools', title: 'Formula Cheat Sheet',
    render(el) {
      el.innerHTML = SAT.pageHead('Formula Cheat Sheet', 'All major formulas on one screen. Click any formula to open its section. (§49)') +
        `<section class="card"><div class="cheat">${SHEET.map(([g, rows]) => `<h4>${g}</h4>` + rows.map(([n, fx, link]) =>
          `<div><a href="#${link}" style="text-decoration:none;color:inherit"><b>${n}</b><code>${n} = ${fx}</code></a></div>`).join('')).join('')}</div>
        <div class="btns"><button class="btn ghost" onclick="window.print()">Print</button></div></section>`;
    },
  });
})();
