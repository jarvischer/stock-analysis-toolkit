# Stock Analysis Reference

A personal **stock analysis handbook, formula cheat sheet and financial glossary**. It's built so that, mid-analysis, you can search a metric and get the answer straight away.

**Live:** https://jarvischer.github.io/stock-analysis-toolkit/

## What's inside
- **Search** (press `/`): type ROIC, FCF, Gross Margin, EV, CapEx… and jump to the concept.
- **Handbook, 14 sections:** Framework · Business Analysis · Income Statement · Profitability & Margins · Cash Flow · Balance Sheet · Capital Efficiency · Per-Share Metrics · Valuation · DCF · Investment Thesis · Formula Cheat Sheet · Glossary · Value Investing.
- **Standard concept card**, the same for every concept: What is it? · Formula · Example · Interpretation · Generally (higher/lower) · Compare against · Watch out · Financial statement. Optional extras on a card are “How do I interpret this?”, cross-links, and a small “Try it” calculator.
- **Quick Reference:** one line per formula; click an entry to open the full card.
- **Statement Map:** shows which numbers come straight from filings and which ones you calculate yourself.
- **Important Principles** and **Favorites** (★ any card).
- **Learning Mode:** expands every “How do I interpret this?” section.
- **Learning paths:** four guided paths covering financial statements, business quality, valuation, and thinking like a business owner, with fourteen lessons, hints, answer feedback, and saved exercise completion.
- **Concept exercises:** fourteen core concept cards include practice questions before a collapsible worked example.
- **Interactive Statement Map:** trace gross margin, free cash flow, and net debt to sample statement figures, then select the required figures yourself.
- **Value Investing:** 20 concept cards with fictional examples, pitfalls, related concepts, and further reading. Includes owner earnings, maintenance CapEx, margin of safety, normalized earnings, capital allocation, value traps, risk, and asset-based valuation.
- **Company case:** analyze fictional manufacturer Cedar Works in three chapters. Calculate metrics, save your reasoning, and compare it with a suggested discussion.
- **Tools (secondary, collapsed in the nav):** DCF calculator, sensitivity table, Bear/Base/Bull, SOTP, company analyzer, thesis worksheet, checklist.

Favorites, notes and tool inputs are saved in your browser. Use Export / Import to back them up.
Lesson completion and case reflections also use browser storage and are included in Export / Import. Written reflections are not automatically graded.

## Adding a concept
Add an object to the right file in `js/content/`:
```js
{ id: 'roe', title: 'ROE', abbr: 'Return on Equity', short: 'Net Income / Equity.', stmt: 'calc',
  what: '…', formula: 'ROE = Net Income / Shareholders’ Equity',
  example: [['Net Income', '$2B'], ['Equity', '$10B'], ['ROE', '20%', 'res']],
  interp: '…', better: ['higher', '…'], compare: ['ROIC', 'Peers'], watch: '…',
  q: { tells: '…', hl: '…', compare: '…', fool: '…' }, related: ['roic', 'equity'] }
```
It then shows up automatically in the section page, search, Quick Reference and Glossary. To add a whole new section, call `SAT.section({...})` in a new `js/content/*.js` file and add a `<script>` tag for it in `index.html`.

There's no build step: it's plain HTML, CSS and JS. Run the math tests with `node tests/finance.test.js`.

For browser interaction checks, serve the repository locally and open `tests/learning.browser.html` in a dedicated test browser profile. The page reports pass/fail results for lessons, validation, saved completion, statement tracing, case progression, reflection escaping, and mobile overflow. It restores the original app storage after the checks.

*Educational reference. Not investment advice.*
