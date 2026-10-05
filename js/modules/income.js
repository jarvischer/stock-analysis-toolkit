/* §3–11 Income Statement: waterfall, revenue, gross profit/margin, opex, operating income/margin, net income/margin */
(function () {
  'use strict';
  const F = SAT.fin, f = SAT.fmt, L = SAT.LEARN;
  const pctTone = (v) => SAT.tone(v);

  function waterfall() {
    const node = SAT.el(`<section class="card concept" id="c-is">
      <header><h3>Income Statement — the waterfall</h3><span class="num">§3</span></header>
      <p class="def">The income statement (P&amp;L) shows how <b>revenue</b> flows down to <b>net income</b> over a period (quarter / year). Edit the numbers to see the waterfall change.</p>
      ${SAT.he('דוח רווח והפסד: מההכנסות, מורידים עלויות שלב אחר שלב, עד הרווח הנקי.')}
      <div class="fields">
        ${SAT.field({ k: 'rev', label: 'Revenue', tip: 'Total sales' })}
        ${SAT.field({ k: 'cogs', label: 'Cost of Revenue', tip: 'Direct costs of producing what was sold' })}
        ${SAT.field({ k: 'opex', label: 'Operating Expenses', tip: 'R&D + S&M + G&A' })}
        ${SAT.field({ k: 'other', label: 'Interest / Other Expenses' })}
        ${SAT.field({ k: 'tax', label: 'Taxes' })}
      </div>
      <div class="wf" data-wf></div>
      <div class="tbl-wrap" style="margin-top:12px"><table class="t"><tbody>
        <tr><td class="lbl"><b>Revenue</b></td><td class="lbl" style="white-space:normal;text-align:left">Total sales of products and services.</td></tr>
        <tr><td class="lbl">− Cost of Revenue</td><td class="lbl" style="white-space:normal;text-align:left">Direct costs to deliver the product (materials, manufacturing, hosting, direct labour).</td></tr>
        <tr class="tot"><td class="lbl">= Gross Profit</td><td class="lbl" style="white-space:normal;text-align:left">What’s left to pay for everything else.</td></tr>
        <tr><td class="lbl">− Operating Expenses</td><td class="lbl" style="white-space:normal;text-align:left">R&amp;D, Sales &amp; Marketing, G&amp;A — the cost of running and growing the company.</td></tr>
        <tr class="tot"><td class="lbl">= Operating Income (EBIT)</td><td class="lbl" style="white-space:normal;text-align:left">Profit from the core business, before financing and taxes.</td></tr>
        <tr><td class="lbl">− Interest / Other</td><td class="lbl" style="white-space:normal;text-align:left">Interest on debt, investment gains/losses, one-offs.</td></tr>
        <tr><td class="lbl">− Taxes</td><td class="lbl" style="white-space:normal;text-align:left">Income tax expense.</td></tr>
        <tr class="tot"><td class="lbl">= Net Income</td><td class="lbl" style="white-space:normal;text-align:left">Accounting profit attributable to shareholders (“the bottom line”).</td></tr>
      </tbody></table></div>
    </section>`);
    const wf = node.querySelector('[data-wf]');
    SAT.form(node, 'calc:waterfall', { rev: '10B', cogs: '3B', opex: '4.5B', other: '0.3B', tax: '0.55B' }, (v) => {
      const gp = v.rev - v.cogs, oi = gp - v.opex, ni = oi - v.other - v.tax;
      const steps = [
        ['Revenue', v.rev, 'plus', 0, v.rev], ['− Cost of Revenue', -v.cogs, 'minus', gp, v.rev], ['= Gross Profit', gp, 'total', 0, gp, 1],
        ['− Operating Expenses', -v.opex, 'minus', oi, gp], ['= Operating Income', oi, 'total', 0, oi, 1],
        ['− Interest / Other', -v.other, 'minus', oi - v.other, oi], ['− Taxes', -v.tax, 'minus', ni, oi - v.other], ['= Net Income', ni, 'total', 0, ni, 1],
      ];
      const max = Math.max(v.rev, 1);
      wf.innerHTML = steps.map(([l, val, cls, a, b, sub]) => {
        const lo = Math.max(0, Math.min(a, b)), hi = Math.max(0, Math.max(a, b));
        const left = (lo / max) * 100, w = Math.max(0.5, ((hi - lo) / max) * 100);
        return `<div class="wf-row${sub ? ' sub' : ''}"><span class="lbl">${l}</span><span class="wf-track"><span class="wf-bar ${cls}" style="left:${left}%;width:${isFinite(w) ? w : 0}%"></span></span><span class="v">${f.money(val)}${sub ? ' <span class="muted">' + f.pct(val / v.rev, 0) + '</span>' : ''}</span></div>`;
      }).join('');
    });
    return node;
  }

  SAT.register({
    id: 'income', group: 'quality', title: 'Income Statement',
    render(el) {
      el.innerHTML = SAT.pageHead('Income Statement & Profitability', 'From revenue to net income — with margins at every level. (§3–11)') +
        SAT.toc([['is', 'Waterfall'], ['revenue', 'Revenue'], ['gp', 'Gross Profit'], ['gm', 'Gross Margin'], ['opex', 'OpEx'], ['oi', 'Operating Income'], ['om', 'Operating Margin'], ['ni', 'Net Income'], ['nm', 'Net Margin']]);
      el.appendChild(waterfall());

      el.appendChild(SAT.concept({
        id: 'revenue', num: 4, title: 'Revenue', abbr: '& Revenue Growth',
        def: 'Revenue is the total amount generated from selling products or services <b>before</b> expenses.',
        he: 'הכנסות = סך המכירות לפני הוצאות. "שורת הראש".',
        formula: 'Revenue Growth = (Current Revenue − Previous Revenue) / Previous Revenue',
        example: [['Previous revenue', '$10.0B'], ['Current revenue', '$12.0B'], ['Revenue growth', '20.0%', 'res']],
        interp: '<b>Revenue ≠ Profit.</b> A company can grow revenue fast and still lose money. Growth matters only if it eventually produces cash at a good return on capital.',
        learn: 'growth',
        calc: {
          id: 'revg', defaults: { prev: '10B', cur: '12B' },
          fields: [{ k: 'prev', label: 'Previous Revenue' }, { k: 'cur', label: 'Current Revenue' }],
          outputs: [{ id: 'g', label: 'Revenue Growth', fmt: 'pct', f: (v) => F.growth(v.cur, v.prev), tone: pctTone, formula: '(Cur − Prev) / Prev' },
            { id: 'd', label: 'Change ($)', f: (v) => v.cur - v.prev, tone: pctTone }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'gp', num: 5, title: 'Gross Profit',
        def: 'Profit after subtracting the <b>Cost of Revenue</b> (also called <b>COGS</b> — Cost of Goods Sold): the direct costs of producing what was sold — raw materials, manufacturing, direct labour, hosting/delivery for software, shipping.',
        he: 'רווח גולמי = הכנסות פחות העלות הישירה של המוצר שנמכר.',
        formula: 'Gross Profit = Revenue − Cost of Revenue',
        example: [['Revenue', '$10B'], ['Cost of Revenue', '$3B'], ['Gross Profit', '$7B', 'res']],
        interp: 'Gross profit pays for <b>everything else</b>: R&amp;D, sales, admin, interest, taxes and profit.',
        learn: 'grossProfit',
        calc: {
          id: 'gp', defaults: { rev: '10B', cogs: '3B' },
          fields: [{ k: 'rev', label: 'Revenue' }, { k: 'cogs', label: 'Cost of Revenue' }],
          outputs: [{ id: 'gp', label: 'Gross Profit', f: (v) => v.rev - v.cogs }, { id: 'gm', label: 'Gross Margin', fmt: 'pct', f: (v) => F.margin(v.rev - v.cogs, v.rev) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'gm', num: 6, title: 'Gross Margin',
        def: 'Gross Margin tells us how much money remains from <b>every dollar of revenue</b> after direct costs.',
        he: 'מתוך כל 100$ מכירות — כמה נשאר אחרי העלות הישירה?',
        formula: 'Gross Margin = Gross Profit / Revenue',
        example: [['Revenue', '$10B'], ['Cost of Revenue', '$3B'], ['Gross Profit', '$7B'], ['Gross Margin', '70%', 'res']],
        interp: '<b>70% Gross Margin</b> means: for every <b>$100</b> in sales, <b>$70</b> remains before operating expenses.<br><br>Typical ranges: software 70–85%, consumer brands 40–60%, retail 20–35%, airlines/autos 10–25%.',
        learn: 'grossMargin',
        calc: {
          id: 'gm', defaults: { gp: '7B', rev: '10B' },
          fields: [{ k: 'gp', label: 'Gross Profit' }, { k: 'rev', label: 'Revenue' }],
          outputs: [{ id: 'gm', label: 'Gross Margin', fmt: 'pct', f: (v) => F.margin(v.gp, v.rev) }, { id: 'per', label: 'Kept per $100 sales', fmt: 'price', f: (v) => 100 * F.margin(v.gp, v.rev) }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'opex', num: 7, title: 'Operating Expenses', abbr: 'OpEx',
        def: 'The costs of running and growing the company that are <b>not</b> directly tied to producing each unit sold.',
        he: 'הוצאות תפעול: מחקר ופיתוח, שיווק ומכירות, הנהלה וכלליות.',
        body: `<div class="tbl-wrap"><table class="t"><tbody>
          <tr><td class="lbl"><b>R&amp;D</b> — Research &amp; Development</td><td class="lbl" style="white-space:normal;text-align:left">Engineers, product development, new technology. Investment in future products.</td></tr>
          <tr><td class="lbl"><b>S&amp;M</b> — Sales &amp; Marketing</td><td class="lbl" style="white-space:normal;text-align:left">Salespeople, advertising, commissions, customer acquisition.</td></tr>
          <tr><td class="lbl"><b>G&amp;A</b> — General &amp; Administrative</td><td class="lbl" style="white-space:normal;text-align:left">Executives, finance, legal, HR, office overhead.</td></tr>
          <tr><td class="lbl">Other Operating Expenses</td><td class="lbl" style="white-space:normal;text-align:left">Amortisation of intangibles, restructuring, impairments, etc.</td></tr>
        </tbody></table></div>`,
        warn: '<b>Cost of Revenue has ALREADY been removed when calculating Gross Profit.</b> Do not subtract Cost of Revenue again when going from Gross Profit to Operating Income. (Some data providers show “Total operating expenses” that <i>includes</i> COGS — check before using.)',
      }));

      el.appendChild(SAT.concept({
        id: 'oi', num: 8, title: 'Operating Income', abbr: 'EBIT',
        def: 'Profit from the core business after all operating costs, before interest and taxes.',
        he: 'רווח תפעולי = רווח גולמי פחות הוצאות תפעול.',
        formula: 'Operating Income = Gross Profit − Operating Expenses',
        example: [['Gross Profit', '$7B'], ['Operating Expenses', '$4.5B'], ['Operating Income', '$2.5B', 'res']],
        calc: {
          id: 'oi', defaults: { gp: '7B', opex: '4.5B', rev: '10B' },
          fields: [{ k: 'gp', label: 'Gross Profit' }, { k: 'opex', label: 'Operating Expenses' }, { k: 'rev', label: 'Revenue (for margin)' }],
          outputs: [{ id: 'oi', label: 'Operating Income', f: (v) => v.gp - v.opex, tone: pctTone }, { id: 'om', label: 'Operating Margin', fmt: 'pct', f: (v) => F.margin(v.gp - v.opex, v.rev), tone: pctTone }],
        },
      }));

      el.appendChild(SAT.concept({
        id: 'om', num: 9, title: 'Operating Margin',
        def: 'The share of each revenue dollar that remains as operating profit.',
        he: 'שולי רווח תפעולי — כמה מכל דולר הכנסות נשאר אחרי כל הוצאות התפעול.',
        formula: 'Operating Margin = Operating Income / Revenue',
        example: [['Operating Income', '$2.5B'], ['Revenue', '$10B'], ['Operating Margin', '25%', 'res']],
        interp: '<b>High</b> operating margin can indicate pricing power, scale, efficient operations or a moat.<br><b>Low</b> can indicate competition, weak pricing, sub-scale operations — <i>or heavy investment in growth</i>.',
        good: '<b>High Gross Margin but low / negative Operating Margin</b> is common: a software company with 80% gross margin may still post −10% operating margin because it invests heavily in R&amp;D, sales and infrastructure. The question is whether that spending will produce <b>operating leverage</b> later (revenue growing faster than OpEx).',
        learn: 'opMargin',
      }));

      el.appendChild(SAT.concept({
        id: 'ni', num: 10, title: 'Net Income',
        def: 'The <b>accounting profit</b> remaining after operating expenses, interest, taxes, and other expenses — the “bottom line” attributable to shareholders.',
        he: 'רווח נקי = הרווח החשבונאי שנשאר לבעלי המניות אחרי הכל.',
        formula: 'Net Income = Operating Income − Interest − Other Expenses − Taxes',
        warn: 'Net income includes non-cash items and one-offs (gains on investments, impairments, tax benefits). It is <b>not</b> the cash the business generated — see <a href="#cashflow">Profit vs Cash</a>.',
      }));

      el.appendChild(SAT.concept({
        id: 'nm', num: 11, title: 'Net Profit Margin',
        def: 'Bottom-line profit per dollar of revenue.',
        formula: 'Net Margin = Net Income / Revenue',
        example: [['Revenue', '$10B'], ['Net Income', '$500M'], ['Net Margin', '5%', 'res']],
        interp: 'The company keeps <b>$5 of net profit for every $100</b> in revenue.',
        learn: 'netMargin',
        calc: {
          id: 'nm', defaults: { ni: '500M', rev: '10B' },
          fields: [{ k: 'ni', label: 'Net Income' }, { k: 'rev', label: 'Revenue' }],
          outputs: [{ id: 'nm', label: 'Net Margin', fmt: 'pct', f: (v) => F.margin(v.ni, v.rev), tone: pctTone }, { id: 'per', label: 'Net profit per $100', fmt: 'price', f: (v) => 100 * F.margin(v.ni, v.rev) }],
        },
      }));
    },
  });
})();
