# Stock Analysis Toolkit · מדריך לניתוח מניות

A bilingual English/Hebrew stock-analysis handbook with 94 concepts, four guided learning paths, a company case, statement tracing, and valuation tools.

**Live:** [English](https://jarvischer.github.io/stock-analysis-toolkit/?lang=en) · [עברית](https://jarvischer.github.io/stock-analysis-toolkit/?lang=he)

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

Validation checks required Hebrew explanations, matching catalog IDs, section membership, related links, and exercise-answer consistency. Browser tests cover every page in both languages, bilingual search, the existing learning interactions, language switching, saved data, RTL numbers, and mobile navigation. `scripts/browser-audit.mjs` is an optional local translation/visual audit using installed Chrome; it writes reports and screenshots to `/tmp`.

## Build and deployment

`npm run build` validates the catalogs and assembles `dist/` with content-hashed JavaScript and CSS. Relative asset URLs work at the repository’s existing GitHub Pages path. Source code and tests are not published.

GitHub Actions runs validation, finance tests, the build, and browser tests for pull requests and pushes. Successful pushes to `main` publish the tested `dist/` artifact. GitHub Pages must use **GitHub Actions** as its publishing source. See [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Language and saved data

Use the English / עברית switch or `?lang=en` / `?lang=he`. The language preference persists in the browser. Hash routes and all existing `sat:` storage keys are retained. Favorites, notes, calculator inputs, and lesson completion are shared across languages and included in Export / Import. Changing language does not translate or overwrite your notes. Data remains on the same origin and site address as before.

Educational reference. Not investment advice.
