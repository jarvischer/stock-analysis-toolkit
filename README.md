# Stock Analysis Reference & Valuation Toolkit

An interactive reference and dashboard for learning to analyse public companies the way an equity research analyst does. It covers concepts, formulas, calculators, a DCF with a sensitivity grid, Bear/Base/Bull scenarios, Sum-of-the-Parts, a thesis template with invalidation rules, a checklist, and a one-page company analyzer.

**Live:** https://jarvischer.github.io/stock-analysis-toolkit/

## Features
- **Learning Mode** toggle. Every major metric gets three prompts: *What does this tell me? / What should I compare it against? / What could make it misleading?*
- **Formulas** toggle. Shows the formula under each calculated metric.
- Colour coding for **actual data**, **assumptions**, **calculated metrics** and **estimated valuation**.
- Inputs accept `10B`, `500M`, `25K`, `$1,200` and `(300)`.
- All inputs are saved in your browser (localStorage). Use **Export / Import** to back them up or move them to another device.
- One DCF engine (`SAT.fin.dcf`) drives the DCF page, the sensitivity grid, the scenarios and the analyzer, so all four always agree.

## Structure
```
index.html          shell + script tags
css/styles.css      design tokens (light/dark), layout
js/core.js          storage, parsing, formatting, finance math, UI builders, module registry
js/learn.js         Learning Mode content + tooltips per metric
js/modules/*.js     one file per page; each calls SAT.register({...})
js/app.js           nav built from the registry, hash routing, toggles
tests/finance.test.js   node tests for the math (node tests/finance.test.js)
```

## Adding a new topic (e.g. PEG, ROE, SaaS metrics)
1. Create `js/modules/<topic>.js`:
   ```js
   SAT.register({ id: 'peg', group: 'value', title: 'PEG Ratio', render(el) {
     el.innerHTML = SAT.pageHead('PEG Ratio', '...');
     el.appendChild(SAT.concept({ id: 'peg', title: 'PEG', formula: 'PEG = P/E / EPS growth (%)',
       calc: { id: 'peg', fields: [{k:'pe',label:'P/E',u:'x'},{k:'g',label:'EPS growth',u:'%'}],
               outputs: [{ id:'p', label:'PEG', fmt:'ratio', f: v => v.pe / (v.g*100) }] } }));
   }});
   ```
2. Add `<script src="js/modules/<topic>.js"></script>` to `index.html`.
3. Optionally add a `SAT.LEARN` entry in `js/learn.js` and remove its placeholder from `roadmap.js`.

There is no build step. It's plain HTML, CSS and JS, and it runs from GitHub Pages or straight from disk.

*Educational tool. Not investment advice.*
