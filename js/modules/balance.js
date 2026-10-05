/* §17–24 Balance Sheet, assets, liabilities, equity, net cash, current ratio, EBITDA, Debt/EBITDA */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt;
  const row = (a, b) => `<tr><td class="lbl"><b>${a}</b></td><td class="lbl" style="white-space:normal;text-align:left">${b}</td></tr>`;

  SAT.register({
    id: 'balance', group: 'quality', title: 'Balance Sheet & Leverage',
    render(el) {
      el.innerHTML = SAT.pageHead('Balance Sheet & Leverage', 'What the company owns, what it owes, and how much belongs to shareholders. (§17–24)') +
        SAT.toc([['bs', 'Balance Sheet'], ['assets', 'Assets'], ['liab', 'Liabilities'], ['equity', 'Equity'], ['netcash', 'Net Cash / Debt'], ['cr', 'Current Ratio'], ['ebitda', 'EBITDA'], ['de', 'Debt / EBITDA']]);

      el.appendChild(SAT.concept({
        id: 'bs', num: 17, title: 'Balance Sheet',
        def: 'A snapshot at a single date of what the company <b>owns</b> (assets), <b>owes</b> (liabilities), and what is left for <b>owners</b> (equity). It always balances:',
        he: 'מאזן: נכסים = התחייבויות + הון עצמי.',
        formula: 'Assets = Liabilities + Shareholders’ Equity',
        body: `<div class="grid3">
          <div class="card" style="border-top:3px solid var(--actual)"><h4>Assets</h4><p class="muted">Resources the company controls that will provide future benefit.</p></div>
          <div class="card" style="border-top:3px solid var(--neg)"><h4>Liabilities</h4><p class="muted">Obligations the company owes to others.</p></div>
          <div class="card" style="border-top:3px solid var(--calc)"><h4>Shareholders’ Equity</h4><p class="muted">The residual claim of owners = Assets − Liabilities.</p></div>
        </div>`,
      }));

      el.appendChild(SAT.concept({
        id: 'assets', num: 18, title: 'Assets',
        body: `<div class="grid2">
          <div><h4>Current Assets <span class="muted">(convertible to cash within ~1 year)</span></h4><div class="tbl-wrap"><table class="t"><tbody>
            ${row('Cash & equivalents', 'Cash, money-market funds, short-term securities.')}
            ${row('Accounts Receivable', 'Money customers owe for goods/services already delivered.')}
            ${row('Inventory', 'Raw materials, work-in-progress and finished goods not yet sold.')}
            ${row('Other current', 'Prepaid expenses, short-term investments.')}
          </tbody></table></div></div>
          <div><h4>Long-Term Assets</h4><div class="tbl-wrap"><table class="t"><tbody>
            ${row('Property, Plant & Equipment', 'Factories, buildings, machines, servers — net of depreciation.')}
            ${row('Goodwill & Intangibles', 'Premium paid in acquisitions; patents, brands, customer lists.')}
            ${row('Long-term investments', 'Stakes in other companies, long-dated securities.')}
            ${row('Other assets', 'Right-of-use (lease) assets, deferred tax assets, etc.')}
          </tbody></table></div></div>
        </div>`,
      }));

      el.appendChild(SAT.concept({
        id: 'liab', num: 19, title: 'Liabilities',
        body: `<div class="grid2">
          <div><h4>Current Liabilities <span class="muted">(due within ~1 year)</span></h4><div class="tbl-wrap"><table class="t"><tbody>
            ${row('Accounts Payable', 'Money owed to suppliers.')}
            ${row('Short-Term Debt', 'Borrowings and the current portion of long-term debt due within a year.')}
            ${row('Deferred revenue', 'Cash received for services not yet delivered (good for subscription businesses).')}
            ${row('Accrued expenses', 'Wages, taxes, interest incurred but not yet paid.')}
          </tbody></table></div></div>
          <div><h4>Long-Term Liabilities</h4><div class="tbl-wrap"><table class="t"><tbody>
            ${row('Long-Term Debt', 'Bonds and loans due after more than a year.')}
            ${row('Lease liabilities', 'Obligations under long-term leases.')}
            ${row('Other liabilities', 'Pensions, deferred taxes, legal provisions.')}
          </tbody></table></div></div>
        </div>`,
      }));

      el.appendChild(SAT.concept({
        id: 'equity', num: 20, title: 'Shareholders’ Equity', abbr: 'Book Value',
        def: '<b>Book Value</b> = the accounting value of equity on the balance sheet.',
        he: 'הון עצמי (ערך בספרים) ≠ שווי שוק.',
        formula: 'Shareholders’ Equity = Assets − Liabilities',
        warn: '<b>Book Value is NOT the same as Market Value.</b> Book value records historical costs; market value (market cap) reflects what investors expect the company to earn in the future. Asset-light businesses (software, brands) often trade far above book; buybacks can even make book value negative.',
        calc: {
          id: 'eq', defaults: { a: '50B', l: '30B' },
          fields: [{ k: 'a', label: 'Total Assets' }, { k: 'l', label: 'Total Liabilities' }],
          outputs: [{ id: 'e', label: 'Shareholders’ Equity', f: (v) => v.a - v.l, tone: (x) => SAT.tone(x) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'netcash', num: 21, title: 'Net Cash / Net Debt',
        formula: 'Net Cash = Cash − Debt\nIf debt exceeds cash: Net Debt = Debt − Cash',
        he: 'מזומן נטו: אם המזומן גדול מהחוב — יש "כרית ביטחון".',
        interp: '<b>Net cash</b> = financial flexibility (buybacks, M&amp;A, surviving downturns). <b>Net debt</b> must be serviced — compare to EBITDA and FCF.',
        learn: 'netCash',
        calc: {
          id: 'nc', defaults: { cash: '8B', debt: '5B' },
          fields: [{ k: 'cash', label: 'Cash & Investments' }, { k: 'debt', label: 'Total Debt' }],
          outputs: [{ id: 'n', label: 'Net Cash / (Net Debt)', f: (v) => v.cash - v.debt, tone: (x) => SAT.tone(x) },
            { id: 's', label: 'Position', fmt: 'text', f: (v) => (v.cash - v.debt >= 0 ? 'Net Cash' : 'Net Debt') }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'cr', num: 22, title: 'Current Ratio',
        def: 'Short-term liquidity: can the company pay its bills due within a year?',
        formula: 'Current Ratio = Current Assets / Current Liabilities',
        example: [['Current Assets', '$12B'], ['Current Liabilities', '$6B'], ['Current Ratio', '2.0', 'res']],
        interp: 'The company has <b>$2 of current assets for every $1</b> of current liabilities. Below 1.0 deserves a closer look (but is normal for some subscription businesses with large deferred revenue).',
        learn: 'currentRatio',
        calc: {
          id: 'cr', defaults: { ca: '12B', cl: '6B' },
          fields: [{ k: 'ca', label: 'Current Assets' }, { k: 'cl', label: 'Current Liabilities' }],
          outputs: [{ id: 'r', label: 'Current Ratio', fmt: 'ratio', f: (v) => SAT.div(v.ca, v.cl), tone: (x) => (x >= 1 ? 'pos' : 'neg') }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'ebitda', num: 23, title: 'EBITDA',
        def: '<b>E</b>arnings <b>B</b>efore <b>I</b>nterest, <b>T</b>axes, <b>D</b>epreciation and <b>A</b>mortization. Roughly: Operating Income + D&amp;A.',
        he: 'EBITDA — רווח לפני ריבית, מסים, פחת והפחתות. לא תזרים מזומנים!',
        formula: 'EBITDA ≈ Operating Income + Depreciation & Amortization',
        interp: '<b>Why investors use it:</b> compares operating performance across companies with different debt levels, tax situations and accounting for depreciation. Used in leverage (Debt/EBITDA) and valuation (EV/EBITDA).',
        warn: '<b>EBITDA is NOT cash flow.</b> It ignores CapEx, working capital, interest and taxes. EBITDA can make <b>capital-intensive businesses look better</b> than they really are — depreciation is a real economic cost because equipment must be replaced.',
        learn: 'ebitda',
        calc: {
          id: 'ebitda', defaults: { oi: '2.5B', da: '0.8B' },
          fields: [{ k: 'oi', label: 'Operating Income' }, { k: 'da', label: 'Depreciation & Amortization' }],
          outputs: [{ id: 'e', label: 'EBITDA', f: (v) => v.oi + v.da }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'de', num: 24, title: 'Debt / EBITDA',
        def: 'A rough measure of <b>leverage</b>: how many years of EBITDA would be needed to repay all debt.',
        formula: 'Debt / EBITDA = Total Debt / EBITDA',
        example: [['Debt', '$10B'], ['EBITDA', '$5B'], ['Debt / EBITDA', '2.0x', 'res']],
        interp: 'Rule of thumb: <b>&lt; 2x</b> conservative · <b>2–4x</b> moderate · <b>&gt; 4x</b> high for most industries. Also compute <b>Net Debt / EBITDA</b> (subtract cash).',
        learn: 'debtEbitda',
        calc: {
          id: 'de', defaults: { d: '10B', e: '5B', c: '1B' },
          fields: [{ k: 'd', label: 'Total Debt' }, { k: 'e', label: 'EBITDA' }, { k: 'c', label: 'Cash (for net)' }],
          outputs: [{ id: 'r', label: 'Debt / EBITDA', fmt: 'x', f: (v) => SAT.div(v.d, v.e), tone: (x) => (x > 4 ? 'neg' : x < 2 ? 'pos' : '') },
            { id: 'n', label: 'Net Debt / EBITDA', fmt: 'x', f: (v) => SAT.div(v.d - v.c, v.e) }],
        },
      }));
    },
  });
})();
