/* §25–28 NOPAT, Invested Capital, ROIC, WACC */
(function () {
  'use strict';
  const F = SAT.fin;

  SAT.register({
    id: 'efficiency', group: 'quality', title: 'Capital Efficiency (ROIC)',
    render(el) {
      el.innerHTML = SAT.pageHead('Capital Efficiency', 'Great businesses earn high returns on the capital they use — above the cost of that capital. (§25–28)') +
        SAT.toc([['nopat', 'NOPAT'], ['ic', 'Invested Capital'], ['roic', 'ROIC'], ['wacc', 'WACC']]);

      el.appendChild(SAT.concept({
        id: 'nopat', num: 25, title: 'NOPAT', abbr: 'Net Operating Profit After Tax',
        def: 'Operating profit after tax, as if the company had no debt. Isolates the profit of the <b>operations</b> from how they are financed.',
        he: 'רווח תפעולי אחרי מס — בלי השפעת המימון (ריבית).',
        formula: 'NOPAT = Operating Income × (1 − Tax Rate)',
        example: [['Operating Income', '$4B'], ['Tax Rate', '25%'], ['NOPAT', '$3B', 'res']],
        learn: 'nopat',
        calc: {
          id: 'nopat', defaults: { oi: '4B', t: '25' },
          fields: [{ k: 'oi', label: 'Operating Income' }, { k: 't', label: 'Tax Rate', u: '%', kind: 'assume' }],
          outputs: [{ id: 'n', label: 'NOPAT', f: (v) => F.nopat(v.oi, v.t), formula: 'EBIT × (1 − t)' }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'ic', num: 26, title: 'Invested Capital',
        def: 'The total capital that has been put into the business to operate it — by shareholders and lenders. It represents <b>the capital required to run the business</b>: factories, equipment, inventory, receivables, acquired businesses.',
        he: 'הון מושקע = כמה כסף היה צריך להכניס לעסק כדי שיפעל.',
        formula: 'Simplified (financing view):\nInvested Capital = Shareholders’ Equity + Total Debt − Cash\n\nOperating view (equivalent idea):\nInvested Capital = Net PP&E + Net Working Capital (+ Goodwill & Intangibles)',
        interp: 'For beginners, the <b>financing view</b> is easiest: all the money owners and lenders have put in, minus the cash that isn’t being used in operations.',
        learn: 'investedCapital',
        calc: {
          id: 'ic', defaults: { eq: '12B', d: '5B', c: '2B' },
          fields: [{ k: 'eq', label: 'Shareholders’ Equity' }, { k: 'd', label: 'Total Debt' }, { k: 'c', label: 'Cash' }],
          outputs: [{ id: 'ic', label: 'Invested Capital', f: (v) => v.eq + v.d - v.c, formula: 'Equity + Debt − Cash' }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'roic', num: 27, title: 'ROIC', abbr: 'Return on Invested Capital',
        def: 'ROIC measures how efficiently the business converts invested capital into operating profits.',
        he: 'תשואה על ההון המושקע — כמה רווח תפעולי (אחרי מס) מייצר כל דולר שהושקע.',
        formula: 'ROIC = NOPAT / Invested Capital',
        example: [['NOPAT', '$3B'], ['Invested Capital', '$15B'], ['ROIC', '20%', 'res']],
        interp: 'Every $100 of capital in the business produces <b>$20 of after-tax operating profit</b> per year. Sustained ROIC &gt; 15% usually signals a moat.',
        learn: 'roic',
        calc: {
          id: 'roic', defaults: { oi: '4B', t: '25', ic: '15B', wacc: '9' },
          fields: [{ k: 'oi', label: 'Operating Income' }, { k: 't', label: 'Tax Rate', u: '%', kind: 'assume' }, { k: 'ic', label: 'Invested Capital' }, { k: 'wacc', label: 'WACC', u: '%', kind: 'assume' }],
          outputs: [
            { id: 'n', label: 'NOPAT', f: (v) => F.nopat(v.oi, v.t) },
            { id: 'r', label: 'ROIC', fmt: 'pct', f: (v) => F.roic(F.nopat(v.oi, v.t), v.ic) },
            { id: 's', label: 'Spread (ROIC − WACC)', fmt: 'spct', f: (v) => F.roic(F.nopat(v.oi, v.t), v.ic) - v.wacc, tone: (x) => SAT.tone(x) },
          ],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'wacc', num: 28, title: 'WACC', abbr: 'Weighted Average Cost of Capital',
        def: '<b>Concept first:</b> investors who provide capital (shareholders and lenders) expect a return for the risk they take. WACC is the blended <b>minimum return</b> the business must earn on its capital to satisfy them. It is the company’s hurdle rate — and the usual discount rate in a DCF.',
        he: 'WACC = התשואה המינימלית שהמשקיעים והמלווים דורשים. אם ROIC גבוה ממנה — נוצר ערך.',
        formula: 'Value Creation Spread = ROIC − WACC\n\n(Full formula, later: WACC = E/(D+E) × Cost of Equity + D/(D+E) × Cost of Debt × (1 − t))',
        body: `<div class="grid2">
          <div class="callout good"><b>ROIC &gt; WACC</b> → usually <b>value creation</b>. Each dollar reinvested earns more than it costs — growth makes the company more valuable.</div>
          <div class="callout bad"><b>ROIC &lt; WACC</b> → can indicate <b>value destruction</b>. Growth actually <i>destroys</i> value: the company would be worth more by returning the money.</div>
        </div>
        <p class="muted">Typical WACC: large, stable companies 7–9%; mid-size 9–11%; small / risky / unprofitable 11–15%+.</p>`,
        warn: '<b>Growth ≠ Value Creation.</b> Growth only creates value when the new capital earns more than WACC. High ROIC is most meaningful when ROIC &gt; WACC — and sustainable.',
        learn: 'wacc',
        calc: {
          id: 'spread', defaults: { roic: '20', wacc: '9' },
          fields: [{ k: 'roic', label: 'ROIC', u: '%' }, { k: 'wacc', label: 'WACC', u: '%', kind: 'assume' }],
          outputs: [{ id: 's', label: 'Value Creation Spread', fmt: 'spct', f: (v) => v.roic - v.wacc, tone: (x) => SAT.tone(x) },
            { id: 'v', label: 'Verdict', f: (v) => (v.roic - v.wacc > 0 ? 'Creating value' : v.roic - v.wacc < 0 ? 'Destroying value' : '—'), tone: (x) => (x === 'Creating value' ? 'pos' : x === 'Destroying value' ? 'neg' : '') }],
        },
      }));
    },
  });
})();
