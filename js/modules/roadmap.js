/* Planned modules (shown greyed out in the nav). To add one: put its concepts in a js/content file
   (SAT.section + SAT.concepts) and remove its name here. */
(function () {
  'use strict';
  ['ROE / ROA', 'PEG & Forward P/E', 'Forward EV/EBITDA', 'SBC & Buybacks', 'Dividend Yield & Payout', 'Unit Economics',
    'SaaS: ARR · NRR · CAC · LTV', 'Rule of 40', 'Comparable Companies', 'Cyclicals', 'Options', 'Portfolio Construction']
    .forEach((t) => SAT.register({ id: 'planned-' + t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), group: 'roadmap', title: t, planned: true, render() {} }));
})();
