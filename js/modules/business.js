/* §2 Business Analysis — qualitative notes, moat, growth drivers, risks (all saved). */
(function () {
  'use strict';
  const MODEL = [
    ['sells', 'What does the company sell?'],
    ['customers', 'Who are the customers?'],
    ['money', 'How does the company make money? (pricing model, recurring vs one-off)'],
    ['segments', 'What are the major business segments?'],
    ['sources', 'What are the major revenue sources? (by product / geography / customer)'],
  ];
  const DRIVERS = ['Market expansion', 'Price increases', 'Customer growth', 'New products', 'Geographic expansion', 'Acquisitions'];
  const MOATS = [
    ['Network effects', 'Each new user makes the product more valuable to others (marketplaces, payments, social).'],
    ['Switching costs', 'Painful, risky or expensive for customers to leave (ERP, banking core, embedded workflows).'],
    ['Economies of scale', 'Unit costs fall with size; competitors can’t match price profitably.'],
    ['Brand', 'Customers pay more or choose by default because of trust/status.'],
    ['Intellectual property', 'Patents, trade secrets, proprietary technology.'],
    ['Cost advantage', 'Structurally lower costs: process, location, unique resources.'],
    ['Distribution advantage', 'Owns the channel or shelf space; reaches customers cheaper.'],
    ['Vertical integration', 'Controls key parts of the value chain → cost, quality, speed.'],
    ['Regulation / licenses', 'Legal barriers to entry (utilities, exchanges, defence, pharma).'],
    ['Data advantage', 'Proprietary data that improves the product and compounds with usage.'],
  ];
  const RISKS = ['Competition', 'Technology disruption', 'Regulation', 'Debt', 'Customer concentration', 'Margin compression', 'Dilution', 'Cyclicality', 'Execution risk'];
  const KEY = 'business';

  SAT.register({
    id: 'business', group: 'quality', title: 'Business Analysis',
    render(el) {
      el.innerHTML = SAT.pageHead('Business Analysis', 'Understand the business before the numbers. Your notes are saved automatically.') + `
      <section class="card" style="margin-bottom:14px"><div class="fields" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
        ${SAT.field({ k: 'company', label: 'Company', u: 'text', ph: 'e.g. Microsoft' })}
        ${SAT.field({ k: 'ticker', label: 'Ticker', u: 'text', ph: 'MSFT' })}
      </div></section>
      <div class="grid2">
        <section class="card"><header><h3>Business Model</h3><span class="num">§2</span></header>
          <div class="fields">${MODEL.map(([k, l]) => SAT.field({ k, label: l, u: 'area' })).join('')}</div>
        </section>
        <section class="card"><header><h3>Growth Drivers</h3></header>
          <p class="muted">What can increase revenue? Tick the relevant ones and write how.</p>
          <div class="chips">${DRIVERS.map((d, i) => `<label class="chip"><input type="checkbox" data-ck="drv${i}">${d}</label>`).join('')}</div>
          <div class="fields" style="margin-top:10px">${SAT.field({ k: 'growthNotes', label: 'How exactly will revenue grow? Which driver matters most?', u: 'area', rows: 4 })}</div>
          ${SAT.he('צמיחה = יותר לקוחות × יותר מכירות ללקוח × מחיר גבוה יותר.')}
        </section>
      </div>
      <section class="card" style="margin-top:14px"><header><h3>Competitive Advantage / Moat</h3></header>
        <p class="def">An <b>economic moat</b> is a durable structural advantage that protects a company’s profits and returns on capital from competitors over many years.</p>
        ${SAT.he('חפיר כלכלי = יתרון מבני שמקשה על מתחרים לגזול רווחים לאורך זמן.')}
        <div class="callout warn"><b>“No competition” is NOT itself a moat.</b> The important question is: <b>WHY is competition difficult?</b> If high profits exist without a reason competitors can’t copy, competitors will come.</div>
        <div class="tbl-wrap" style="margin-top:10px"><table class="t"><thead><tr><th>Source</th><th style="text-align:left">Meaning</th><th>Present?</th></tr></thead><tbody>
          ${MOATS.map(([m, d], i) => `<tr><td class="lbl"><b>${m}</b></td><td class="lbl" style="white-space:normal;text-align:left">${d}</td><td><input type="checkbox" data-ck="moat${i}" aria-label="${m}"></td></tr>`).join('')}
        </tbody></table></div>
        <div class="fields" style="margin-top:10px">
          <label class="fld"><span class="fl">Moat strength</span><select data-sel="moatStrength"><option>Not assessed</option><option>None</option><option>Narrow</option><option>Wide</option></select></label>
          ${SAT.field({ k: 'moatWhy', label: 'WHY is competition difficult? Evidence (ROIC history, pricing power, retention…)', u: 'area', rows: 3 })}
        </div>
      </section>
      <section class="card"><header><h3>Risks</h3></header>
        <p class="muted">Rate each risk and note the specific concern.</p>
        ${RISKS.map((r, i) => `<div class="risk-row"><b>${r}</b><select data-sel="rlvl${i}"><option>—</option><option>Low</option><option>Medium</option><option>High</option></select><span class="k-note"><input data-k="risk${i}" data-u="text" placeholder="Specific concern…"></span></div>`).join('')}
      </section>`;

      SAT.form(el, KEY, {});
      // checkboxes & selects share one saved object
      const extra = SAT.store.get(KEY + ':x', {});
      el.querySelectorAll('[data-ck]').forEach((c) => {
        c.checked = !!extra[c.dataset.ck];
        c.addEventListener('change', () => { extra[c.dataset.ck] = c.checked; SAT.store.set(KEY + ':x', extra); });
      });
      el.querySelectorAll('[data-sel]').forEach((s) => {
        if (extra[s.dataset.sel]) s.value = extra[s.dataset.sel];
        const paint = () => { s.className = 'lvl-' + s.value; };
        paint();
        s.addEventListener('change', () => { extra[s.dataset.sel] = s.value; SAT.store.set(KEY + ':x', extra); paint(); });
      });
    },
  });
})();
