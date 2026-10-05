/* Planned modules. To build one: create js/modules/<topic>.js that calls SAT.register({id, group, title, render}),
   add its <script> tag in index.html, and remove the line below. */
(function () {
  'use strict';
  ['PEG', 'ROE / ROA', 'Working Capital', 'SBC & Dilution', 'Buybacks & Dividends', 'Cyclicals', 'Unit Economics',
    'SaaS metrics & Rule of 40', 'Cohort analysis', 'Comparable Companies', 'Forward multiples', 'Earnings quality',
    'Options', 'Risk-adjusted returns', 'Portfolio construction']
    .forEach((t) => SAT.register({ id: 'planned-' + t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), group: 'roadmap', title: t, planned: true, render() {} }));
})();
