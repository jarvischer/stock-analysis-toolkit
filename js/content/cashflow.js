/* Section 4 — Cash Flow */
(function () {
  'use strict';
  const F = SAT.fin;
  SAT.section({
    id: 'cashflow', num: 5, title: 'Cash Flow',
    intro: 'Profit is an accounting opinion; cash is a fact. The cash flow statement shows where cash actually came from and went.',
    he: 'תזרים מזומנים — מאיפה הגיע המזומן ולאן הוא הלך בפועל.',
  });
  SAT.concepts('cashflow', [
    { id: 'profit-vs-cash', title: 'PROFIT ≠ CASH', short: 'Why net income and cash generated differ.', stmt: 'cf', key: 1, tags: ['accrual', 'depreciation', 'receivable', 'payable', 'sbc'],
      what: 'Net income follows <b>accrual accounting</b>: revenue is recorded when earned and costs when incurred — not when cash moves. So a <b>profitable company can have weak cash flow</b> (customers haven’t paid, inventory piling up, heavy CapEx), and a company can <b>temporarily generate cash despite weak earnings</b> (customers prepay, suppliers paid later, large non-cash charges).',
      he: 'רווח חשבונאי אינו מזומן. חברה רווחית יכולה להיתקע בלי מזומנים.',
      body: `<table class="t"><thead><tr><th>Item</th><th style="text-align:left">Beginner explanation</th><th>Cash vs profit</th></tr></thead><tbody>
        <tr><td class="lbl"><b>Depreciation</b></td><td class="lbl wrap">An old equipment purchase is expensed gradually over its life. The expense reduces profit, but no cash leaves today (it left when the asset was bought).</td><td class="lbl">Cash &gt; Profit</td></tr>
        <tr><td class="lbl"><b>Accounts Receivable</b></td><td class="lbl wrap">You sold on credit: revenue and profit are booked, but the customer hasn’t paid yet.</td><td class="lbl">Cash &lt; Profit</td></tr>
        <tr><td class="lbl"><b>Accounts Payable</b></td><td class="lbl wrap">You received goods but haven’t paid the supplier yet — the cost is booked, cash is still in the bank.</td><td class="lbl">Cash &gt; Profit</td></tr>
        <tr><td class="lbl"><b>Working Capital</b></td><td class="lbl wrap">The cash tied up in day-to-day operations (inventory + receivables − payables). When it grows, it absorbs cash.</td><td class="lbl">Either way</td></tr>
        <tr><td class="lbl"><b>Stock-Based Compensation</b></td><td class="lbl wrap">Employees paid in shares: an expense with no cash out — but it dilutes shareholders. It is a real cost.</td><td class="lbl">Cash &gt; Profit</td></tr>
        <tr><td class="lbl"><b>CapEx</b></td><td class="lbl wrap">Buying equipment is cash out today, but only reaches the income statement slowly as depreciation.</td><td class="lbl">Cash &lt; Profit</td></tr>
      </tbody></table>`,
      interp: 'Over many years, good businesses convert most of their net income into free cash flow. Persistent gaps need an explanation.',
      better: ['na'], compare: ['Net Income vs Operating Cash Flow over 3–5 years', 'FCF vs Net Income (“FCF conversion”)'],
      watch: 'Net income consistently above operating cash flow can signal aggressive accounting (receivables growing faster than sales). FCF that ignores SBC overstates owner cash.',
      where: 'Reconciliation at the top of the Cash Flow Statement.', related: ['working-capital', 'ocf', 'fcf'] },
    { id: 'working-capital', title: 'Working Capital', short: 'Current assets − current liabilities; cash tied up in daily operations.', stmt: 'bs', tags: ['nwc'],
      what: 'The money tied up in running the business day to day. Accounting definition: current assets − current liabilities. Operating version: receivables + inventory − payables.',
      formula: 'Working Capital = Current Assets − Current Liabilities',
      example: [['Receivables + Inventory', '$50'], ['Payables', '$30'], ['Operating working capital', '$20', 'res']],
      interp: 'An <b>increase</b> in working capital uses cash (reduces operating cash flow); a decrease releases cash.',
      better: ['context', 'Lower working-capital needs per $ of revenue = more cash-efficient growth.'], compare: ['Working capital as % of revenue over time', 'Peers'],
      watch: 'One-time working-capital releases can make a single year’s cash flow look unusually strong.',
      where: 'Balance Sheet (levels); Cash Flow Statement (changes).', related: ['profit-vs-cash', 'current-ratio'] },
    { id: 'cfs', title: 'Cash Flow Statement', short: 'Operating, Investing and Financing cash flows.', stmt: 'cf', tags: ['cash flow', 'investing', 'financing'],
      what: 'Shows the actual cash coming in and going out, split into three sections:',
      body: `<div class="three">
        <div><h5>Operating Cash Flow (OCF)</h5><p>Cash from normal business operations.</p><ul><li>Cash collected from customers</li><li>Paid to suppliers &amp; employees</li><li>Interest &amp; taxes paid</li></ul></div>
        <div><h5>Investing Cash Flow</h5><p>Spending on (or selling) long-term assets.</p><ul><li>CapEx: factories, servers, equipment</li><li>Acquisitions</li><li>Buying/selling investments</li></ul></div>
        <div><h5>Financing Cash Flow</h5><p>Cash to/from owners and lenders.</p><ul><li>Borrowing / repaying debt</li><li>Issuing shares</li><li>Buybacks</li><li>Dividends</li></ul></div></div>`,
      interp: 'A healthy mature company: strongly positive OCF, negative investing (reinvesting), negative financing (returning cash / repaying debt).',
      better: ['na'], compare: ['Each section over several years'],
      watch: 'Positive financing cash flow every year means the company depends on outside money.',
      where: 'Third main financial statement.', related: ['ocf', 'capex', 'fcf'] },
    { id: 'ocf', title: 'Operating Cash Flow', abbr: 'OCF', aka: ['Cash from Operations', 'CFO'], short: 'Cash generated by normal business operations.', stmt: 'cf', key: 1,
      what: 'The cash a company generates from its normal operations during a period. It starts from net income, adds back non-cash expenses (depreciation, SBC), and adjusts for working-capital changes.',
      formula: 'OCF ≈ Net Income + Depreciation & Amortization + SBC ± Change in Working Capital',
      example: [['Net Income', '$17'], ['+ D&A', '$6'], ['+ SBC', '$3'], ['− Increase in working capital', '$4'], ['OCF', '$22', 'res']],
      interp: 'Strong, growing OCF (above net income) suggests high-quality earnings and a business that funds itself.',
      better: ['higher'], compare: ['Net Income (OCF/NI > 1 is a good sign)', 'Previous years'],
      watch: 'OCF can be boosted temporarily by delaying supplier payments or selling receivables. SBC is added back even though it dilutes owners.',
      where: '“Net cash provided by operating activities” in the Cash Flow Statement.', related: ['fcf', 'net-income', 'profit-vs-cash'] },
    { id: 'capex', title: 'CapEx', abbr: 'Capital Expenditures', aka: ['Purchases of property and equipment', 'PP&E purchases'], short: 'Cash spent on long-term physical assets.', stmt: 'cf', key: 1, tags: ['maintenance capex', 'growth capex'],
      what: 'Cash spent buying or upgrading long-lived assets: <b>factories, servers, data centres, machinery, vehicles, infrastructure</b>.<br><b>Maintenance CapEx</b> — needed just to keep the existing business running (replacing worn-out assets).<br><b>Growth CapEx</b> — spending to expand capacity and future revenue.',
      he: 'השקעות הוניות: תחזוקה (לשמור על הקיים) מול צמיחה (להתרחב).',
      example: [['Total CapEx', '$10'], ['≈ Maintenance (≈ depreciation)', '$4'], ['Growth CapEx', '$6', 'res']],
      interp: 'If most CapEx is growth CapEx, current FCF understates the business’s steady-state cash generation.',
      better: ['context', 'High CapEx is NOT automatically bad — what matters is the return it earns.'], compare: ['CapEx / Revenue over time', 'Depreciation (rough maintenance proxy)', 'Peers'],
      watch: '<b>High CapEx is not automatically bad</b> — the company may be investing in future growth. But companies rarely disclose the maintenance/growth split; it is an estimate.',
      where: 'Investing section of the Cash Flow Statement (shown as a negative number).', related: ['fcf', 'roic', 'ebitda'] },
    { id: 'fcf', title: 'Free Cash Flow', abbr: 'FCF', short: 'Operating Cash Flow − CapEx: cash left after investment.', stmt: 'calc', key: 1,
      what: 'The cash generated after paying for the investment needed to maintain and grow the business — the cash truly available to owners.',
      he: 'תזרים מזומנים חופשי = מזומן מפעילות פחות השקעות הוניות.',
      formula: 'FCF = Operating Cash Flow − CapEx',
      example: [['Operating Cash Flow', '$22'], ['CapEx', '$10'], ['FCF', '$12', 'res']],
      interp: 'Investors care because FCF is what a company can use to: <b>reinvest</b>, <b>pay debt</b>, <b>buy back shares</b>, <b>pay dividends</b>, <b>acquire companies</b>, or <b>hold cash</b>. A business is ultimately worth the FCF it will generate (see DCF).',
      better: ['higher', 'Read it together with growth investment.'], compare: ['Net Income (FCF conversion)', 'Previous years', 'Market Cap (FCF yield)'],
      watch: 'FCF ignores stock-based compensation (a real cost). Cutting CapEx raises FCF short term but may hurt growth. FCF must be understood in the context of growth investment.',
      where: 'Calculated from the Cash Flow Statement.',
      q: { tells: 'Real cash the business produces for owners.', hl: 'Higher is generally better.', compare: 'Net income, history, market cap.', fool: 'SBC, working-capital swings, temporarily cut CapEx.' },
      calc: { id: 'h-fcf', defaults: { ocf: '22', capex: '10' }, fields: [{ k: 'ocf', label: 'Operating Cash Flow' }, { k: 'capex', label: 'CapEx' }], outputs: [{ id: 'f', label: 'FCF', f: (v) => F.fcf(v.ocf, v.capex), tone: (x) => SAT.tone(x) }] },
      related: ['fcf-margin', 'fcf-yield', 'dcf-intro'] },
    { id: 'fcf-margin', title: 'FCF Margin', short: 'FCF / Revenue — cash generated per $ of sales.', stmt: 'calc',
      what: 'Free cash flow as a percentage of revenue.',
      formula: 'FCF Margin = FCF / Revenue',
      example: [['Revenue', '$100'], ['FCF', '$12'], ['FCF Margin', '12%', 'res']],
      interp: 'For every $100 of sales, $12 becomes free cash. Compare with operating margin: much lower FCF margin → heavy CapEx or working capital; higher → strong cash conversion (e.g. customer prepayments).',
      better: ['higher'], compare: ['Operating margin', 'History', 'Peers'],
      watch: 'Lumpy CapEx or working capital can distort a single year — look at multi-year averages.',
      where: 'Calculated: Cash Flow Statement + Income Statement.', related: ['fcf', 'operating-margin'] },
  ]);
})();
