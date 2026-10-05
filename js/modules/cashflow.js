/* §12–16 Profit vs Cash, Cash Flow Statement, CapEx, FCF, FCF Margin */
(function () {
  'use strict';
  const F = SAT.fin;

  SAT.register({
    id: 'cashflow', group: 'quality', title: 'Cash Flow & FCF',
    render(el) {
      el.innerHTML = SAT.pageHead('Cash Flow', 'Profit is an opinion, cash is a fact. (§12–16)') +
        SAT.toc([['pvc', 'Profit ≠ Cash'], ['cfs', 'Cash Flow Statement'], ['capex', 'CapEx'], ['fcf', 'Free Cash Flow'], ['fcfm', 'FCF Margin']]);

      el.appendChild(SAT.concept({
        id: 'pvc', num: 12, title: 'PROFIT ≠ CASH FLOW',
        def: 'Net income follows <b>accrual accounting</b>: revenue is recorded when earned and costs when incurred — not when cash moves. So a profitable company can run out of cash, and a loss-making one can generate cash.',
        he: 'רווח חשבונאי אינו מזומן. חברה יכולה להיות רווחית ולפשוט רגל מחוסר מזומנים.',
        body: `<div class="tbl-wrap"><table class="t"><thead><tr><th>Item</th><th style="text-align:left">Why profit and cash differ</th><th>Effect on cash vs profit</th></tr></thead><tbody>
          <tr><td class="lbl"><b>Accounts Receivable</b></td><td class="lbl" style="white-space:normal;text-align:left">Sale recorded, customer hasn’t paid yet.</td><td class="lbl">Cash &lt; Profit</td></tr>
          <tr><td class="lbl"><b>Depreciation</b></td><td class="lbl" style="white-space:normal;text-align:left">Non-cash expense spreading an old purchase over years. Cash left when the asset was bought.</td><td class="lbl">Cash &gt; Profit (now)</td></tr>
          <tr><td class="lbl"><b>Stock-based compensation</b></td><td class="lbl" style="white-space:normal;text-align:left">Employees paid in shares — expense with no cash out, but it dilutes owners. A real cost.</td><td class="lbl">Cash &gt; Profit</td></tr>
          <tr><td class="lbl"><b>Working capital</b></td><td class="lbl" style="white-space:normal;text-align:left">Building inventory or paying suppliers faster consumes cash; customer prepayments (deferred revenue) bring cash in early.</td><td class="lbl">Either way</td></tr>
          <tr><td class="lbl"><b>Capital expenditures</b></td><td class="lbl" style="white-space:normal;text-align:left">Buying equipment/buildings is cash out today, but only hits profit gradually via depreciation.</td><td class="lbl">Cash &lt; Profit</td></tr>
        </tbody></table></div>`,
        warn: '<b>Watch for:</b> net income consistently far above operating cash flow (receivables piling up, aggressive revenue recognition), or “FCF” that looks great only because SBC is ignored.',
      }));
      el.querySelector('#c-pvc').classList.add('invalid');

      el.appendChild(SAT.concept({
        id: 'cfs', num: 13, title: 'Cash Flow Statement',
        def: 'Reconciles net income to the actual change in cash, split into three sections.',
        he: 'דוח תזרים מזומנים: שוטף, השקעה, מימון.',
        body: `<div class="grid3">
          <div class="card"><h4>Operating Cash Flow (CFO)</h4><p class="muted">Cash generated from normal business operations. Starts from net income, adds back non-cash items (D&amp;A, SBC), adjusts for working-capital changes.</p></div>
          <div class="card"><h4>Investing Cash Flow (CFI)</h4><p class="muted">Investments in assets: CapEx (equipment, buildings, data centres), acquisitions, purchases/sales of securities. Usually negative for a growing company.</p></div>
          <div class="card"><h4>Financing Cash Flow (CFF)</h4><p class="muted">Raising debt · debt repayment · share issuance · buybacks · dividends. Shows how the company funds itself and returns cash to owners.</p></div>
        </div>`,
      }));

      el.appendChild(SAT.concept({
        id: 'capex', num: 14, title: 'Capital Expenditures', abbr: 'CapEx',
        def: 'Cash spent on long-lived physical (and some intangible) assets — factories, equipment, servers, buildings. Appears in Investing Cash Flow.',
        he: 'השקעות הוניות — כסף שהולך לנכסים ארוכי טווח.',
        body: `<div class="grid2">
          <div class="card"><h4>Maintenance CapEx</h4><p class="muted">Spending required just to keep the existing business running at its current size — replacing worn-out equipment. Roughly ≈ depreciation for a mature business.</p></div>
          <div class="card"><h4>Growth CapEx</h4><p class="muted">Spending to expand capacity and grow future revenue — new factories, data centres, stores.</p></div>
        </div>
        <p><b>Why the distinction matters:</b> FCF = OCF − <i>total</i> CapEx. If most CapEx is growth CapEx, today’s FCF understates the business’s true “owner earnings”. Analysts sometimes estimate <b>FCF before growth CapEx</b> to see steady-state cash generation.</p>`,
        good: '<b>High CapEx is not automatically bad.</b> A company may be investing aggressively in future growth. The key question: <b>what return will that capital earn?</b> (see ROIC)',
      }));

      el.appendChild(SAT.concept({
        id: 'fcf', num: 15, title: 'Free Cash Flow', abbr: 'FCF',
        def: 'Cash generated by the business after the investment needed to maintain and grow it — the cash available to owners.',
        he: 'תזרים מזומנים חופשי = מזומן מפעילות פחות השקעות הוניות.',
        formula: 'FCF = Operating Cash Flow − CapEx',
        example: [['Operating Cash Flow', '$3.0B'], ['CapEx', '$1.0B'], ['FCF', '$2.0B', 'res']],
        interp: 'FCF can fund dividends, buybacks, debt repayment, acquisitions — or sit as cash. <b>FCF must be understood in the context of growth investment.</b>',
        learn: 'fcf',
        calc: {
          id: 'fcf', defaults: { ocf: '3B', capex: '1B' },
          fields: [{ k: 'ocf', label: 'Operating Cash Flow' }, { k: 'capex', label: 'CapEx', tip: 'Enter as positive or negative — treated as an outflow either way' }],
          outputs: [{ id: 'fcf', label: 'Free Cash Flow', f: (v) => F.fcf(v.ocf, v.capex), tone: (x) => SAT.tone(x), formula: 'OCF − |CapEx|' },
            { id: 'ci', label: 'CapEx / OCF', fmt: 'pct', f: (v) => SAT.div(Math.abs(v.capex), v.ocf) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'fcfm', num: 16, title: 'FCF Margin',
        def: 'Free cash flow generated per dollar of revenue.',
        formula: 'FCF Margin = Free Cash Flow / Revenue',
        example: [['Revenue', '$10B'], ['FCF', '$1.5B'], ['FCF Margin', '15%', 'res']],
        interp: 'Tells an investor how efficiently sales convert into <b>real, spendable cash</b>. 15% means $15 of free cash for every $100 of sales. Compare to operating margin: FCF margin well below op. margin → heavy CapEx or working capital; well above → strong cash conversion (e.g. upfront subscription payments).',
        learn: 'fcfMargin',
        calc: {
          id: 'fcfm', defaults: { fcf: '1.5B', rev: '10B' },
          fields: [{ k: 'fcf', label: 'Free Cash Flow' }, { k: 'rev', label: 'Revenue' }],
          outputs: [{ id: 'm', label: 'FCF Margin', fmt: 'pct', f: (v) => F.margin(v.fcf, v.rev), tone: (x) => SAT.tone(x) }],
        },
      }));
    },
  });
})();
