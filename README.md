# Stock Analysis Toolkit · מדריך לניתוח מניות

A bilingual English/Hebrew stock-analysis handbook with concept cards, four guided learning paths, a company case, statement tracing, and valuation tools.

**Live:** [English](https://jarvischer.github.io/stock-analysis-toolkit/?lang=en) · [עברית](https://jarvischer.github.io/stock-analysis-toolkit/?lang=he)

## Quick start

### Requirements

- Node.js 22 or newer
- [uv](https://docs.astral.sh/uv/) (only for the value analyst agent)
- Google Chrome (only for the browser tests)

### Start the app

```sh
npm ci           # one time: install dependencies
npm run dev      # build and serve at http://127.0.0.1:4173
```

After you edit a file in `src/`, run `npm run build` and refresh the page.

### Run the tests

```sh
npm test                                    # finance, catalogs, agent tools
npm run test:extract                        # SEC extraction (offline)
npm run build
CHROME_PATH=/usr/bin/google-chrome npm run test:browser
```

### Analyze a company with the agent

1. One time: put your SEC identity in a file outside the repository. SEC requires a name and an email address in each request.
   ```sh
   mkdir -p ~/.config/sat
   printf 'EDGAR_NAME="Your name"\nEDGAR_EMAIL="you@example.com"\n' > ~/.config/sat/edgar.env
   chmod 600 ~/.config/sat/edgar.env
   ```
2. In each new terminal, load the identity:
   ```sh
   set -a; . ~/.config/sat/edgar.env; set +a
   ```
3. Start Claude Code in the repository and ask:
   > Use the value-analyst skill for COST, price 946.92 on 2026-10-09

   The skill gets the data, calculates the metrics, writes `analyses/COST-<date>.json` and validates it. In Codex, ask the same thing.
4. Open the app, go to **Tools → Analyses**, and import the file.

To run the steps yourself:

```sh
npm run sat -- extract COST                                  # SEC data → data/COST/
npm run sat -- calc COST --price 946.92 --price-date 2026-10-09
npm run sat -- validate analyses/COST-2026-10-11.json
```

Set your own rules (required margin of safety, debt limits, WACC) in `agent/policy.json`.

## Local development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. After editing source files, run `npm run build` again and refresh. `npm run preview` serves an existing build. This is a static application; no server, API key, or production framework dependency is required.

## Project structure

```text
src/
  index.html             Application shell
  app.js                 Navigation, search, import/export
  i18n.js                Language selection and shared UI localization
  components/            Cards, reference pages, calculators and worksheets
  content/
    en/                  English catalogs
    he/                  Hebrew catalogs with the same IDs
    register.js          Connects localized content to shared calculators
  finance/               Shared math, storage, and calculator definitions
  learning/              Exercise validation, lesson navigation, case behavior
  styles/                Themes, responsive layout, and RTL rules
  fonts/                 Self-hosted Inter, JetBrains Mono and Heebo (Hebrew) with their OFL licenses
scripts/                 Validation, deterministic static build, preview server
tests/                  Financial and browser regression checks
```

Each language has five JSON catalogs:

- `concepts.json`: explanations, examples, interpretation, pitfalls, and related IDs.
- `sections.json`: section titles, introductions, and supporting diagrams.
- `lessons.json`: exercise questions, hints, answers, learning paths, and case chapters.
- `learn.json`: reusable metric explanations for the tools.
- `ui.json`: shared labels and messages. Keys use normalized English text; `{name}` placeholders preserve dynamic values.

The Hebrew explanations are written for Hebrew readers. English financial names, abbreviations, and conventional formulas remain visible where useful. The renderer translates shared UI text and attributes, including dynamically rendered feedback. It excludes user-authored notes, field values, and formula blocks. Mark additional user-authored output with `data-user-content`.

## Adding or editing a concept

1. Edit the entry with the same stable ID in both `content/en/concepts.json` and `content/he/concepts.json`.
2. Set its `section` to an existing section ID. Add the section to both section catalogs if needed.
3. Keep numeric calculator logic in `finance/calculators.js`. Do not put executable code in translation files.
4. For exercises, add the same ID and answer to both lesson catalogs, then include that ID in a learning path.
5. Add new shared UI messages in both UI catalogs. Keep placeholder names identical.
6. Run the checks below before publishing.

Stable IDs automatically connect concepts to search, the glossary, Quick Reference, favorites, and learning progress. Add selected formulas to the curated formula sheet in `components/reference.js`.

## Validation and tests

```sh
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

To use an installed Chrome instead: `CHROME_PATH=/usr/bin/google-chrome npm run test:browser`.

Validation checks required Hebrew explanations, matching catalog IDs, section membership, related links, and exercise-answer consistency. Browser tests cover every page in both languages, bilingual search, the existing learning interactions, language switching, saved data, RTL numbers, and mobile navigation. A browser test fails when a Hebrew page shows English UI text. Formulas, abbreviations, and proper names that stay in English are listed in `tests/he-english-allowlist.json`. `scripts/browser-audit.mjs` is an optional local translation/visual audit using installed Chrome; it writes reports and screenshots to `/tmp`.

## Build and deployment

`npm run build` validates the catalogs and assembles `dist/` with content-hashed CSS and one content-hashed JavaScript bundle for each language. A small script in `index.html` loads the bundle for the active language. Each bundle also contains the concept titles of the other language for bilingual search. Relative asset URLs work at the repository’s existing GitHub Pages path. Source code and tests are not published.

GitHub Actions runs validation, finance tests, the build, and browser tests for pull requests and pushes. Successful pushes to `main` publish the tested `dist/` artifact. GitHub Pages must use **GitHub Actions** as its publishing source. See [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Language and saved data

Use the English / עברית switch or `?lang=en` / `?lang=he`. The language preference persists in the browser. Hash routes and all existing `sat:` storage keys are retained. Favorites, notes, calculator inputs, and lesson completion are shared across languages and included in Export / Import. Changing language does not translate or overwrite your notes. Data remains on the same origin and site address as before.

## Value analyst agent (local)

An AI analyst that reads SEC filings, calculates the handbook's metrics with tested code, and writes an analysis with sources and decision drivers. It never recommends to buy or sell. Design: `docs/superpowers/specs/2026-10-11-value-analyst-agent-design.md`.

Requirements: Node.js 22, [uv](https://docs.astral.sh/uv/), and SEC identity variables (SEC asks for a name and an email address in each request):

```sh
set -a; . ~/.config/sat/edgar.env; set +a   # see Quick start
npm run sat -- extract COST
npm run sat -- calc COST --price 912.40 --price-date 2026-10-10
```

Then, in Claude Code, ask: "Use the value-analyst skill for COST, price 912.40 on 2026-10-10". In Codex, the same skill is in `.agents/skills/`. Headless:

```sh
claude -p "Use the value-analyst skill for COST, price 912.40 on 2026-10-10" --allowedTools "Bash(npm run sat:*)" Read Write
codex exec "Use the value-analyst skill for COST, price 912.40 on 2026-10-10" --output-schema agent/schema/analysis.schema.json
```

The analysis is written to `analyses/` (not committed). Import it in the app on the **Analyses** page. `data/` is a local cache. Edit `agent/policy.json` to set your own rules.

Educational reference. Not investment advice.
