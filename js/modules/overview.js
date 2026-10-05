/* §1 Stock Analysis Framework + Important Principles */
(function () {
  'use strict';
  const STEPS = [
    ['business', 'Business', 'What do they sell, to whom, and why do they win?', 'Q1'],
    ['income', 'Revenue & Growth', 'How big and how fast?', 'Q1'],
    ['income', 'Profitability', 'Gross, operating, net margins', 'Q1'],
    ['cashflow', 'Cash Flow', 'Does profit turn into cash?', 'Q1'],
    ['balance', 'Balance Sheet', 'Cash, debt, liquidity, leverage', 'Q1'],
    ['efficiency', 'Capital Efficiency', 'ROIC vs WACC', 'Q1'],
    ['valuation', 'Valuation', 'Market cap, EV, multiples', 'Q2'],
    ['dcf', 'DCF', 'Intrinsic value from future FCF', 'Q2'],
    ['sensitivity', 'Sensitivity Analysis', 'How fragile is the value?', 'Q3'],
    ['thesis', 'Investment Thesis', 'Why is the market wrong? What proves me wrong?', 'Q3'],
  ];
  SAT.PRINCIPLES = [
    'Revenue ≠ Profit', 'Profit ≠ Cash Flow', 'EBITDA ≠ Cash Flow', 'Growth ≠ Value Creation',
    'High ROIC matters most when ROIC > WACC', 'Low P/E does not automatically mean cheap',
    'High P/E does not automatically mean expensive', 'High CapEx is not automatically bad',
    'FCF must be read in the context of growth investment', 'A great company can be a bad investment at the wrong price',
    'Valuation is highly sensitive to assumptions', 'DCF should produce a range, not false precision',
  ];

  SAT.register({
    id: 'framework', group: 'start', title: 'Framework & Principles',
    render(el) {
      el.innerHTML = SAT.pageHead('Stock Analysis Framework',
        'A professional analysis moves from the business, to the numbers, to value, to a decision. Click any step to jump to it.') + `
      <div class="grid2">
        <section class="card">
          <header><h3>The process</h3><span class="num">§1</span></header>
          <div class="flow">${STEPS.map((s, i) => `${i ? '<div class="arrow">↓</div>' : ''}<a href="#${s[0]}"><span class="i">${s[3]}</span><span>${s[1]}<br><span class="q">${s[2]}</span></span><span class="q">→</span></a>`).join('')}</div>
        </section>
        <div class="stack">
          <section class="card">
            <header><h3>Three questions</h3></header>
            <p class="muted">Every step above exists to answer one of these.</p>
            <div class="qs">
              <div class="q-item"><span class="k">Q1</span><div><b>Is this a good business?</b><br><span class="muted">Moat, growth, margins, cash generation, balance sheet, ROIC vs WACC.</span></div></div>
              <div class="q-item"><span class="k">Q2</span><div><b>What is the business worth?</b><br><span class="muted">Multiples, DCF, Sum-of-the-parts, scenarios.</span></div></div>
              <div class="q-item"><span class="k">Q3</span><div><b>Is the current price attractive relative to that value?</b><br><span class="muted">Upside/downside, sensitivity, margin of safety, thesis &amp; invalidation.</span></div></div>
            </div>
            ${SAT.he('עסק טוב ≠ השקעה טובה. השאלה היא תמיד: מה המחיר ביחס לערך?')}
          </section>
          <section class="card">
            <header><h3>Always ask</h3></header>
            <div class="princ">
              <div class="q">“What assumptions are already embedded in the current stock price?”</div>
              <div class="q">“What would prove my investment thesis wrong?”</div>
            </div>
            <div class="btns"><a class="btn" href="#analyzer">Analyze a company →</a><a class="btn ghost" href="#checklist">Open checklist</a><a class="btn ghost" href="#cheatsheet">Formula cheat sheet</a></div>
          </section>
        </div>
      </div>
      <section class="card" style="margin-top:14px">
        <header><h3>Important principles</h3></header>
        <div class="princ">${SAT.PRINCIPLES.map((p) => `<div>${p}</div>`).join('')}</div>
      </section>`;
    },
  });
})();
