# Value Analyst Agent — Design

Date: 2026-10-11 · Status: draft for review

## 1. Purpose

Add an AI analyst to the stock analysis handbook. The analyst gets the facts from SEC filings, does a full value investing analysis, and shows each step and the decision drivers. The user learns from the worked analysis and makes the final decision.

### What the user said

- The agent is an addition. The handbook, cards and tools stay as they are.
- The agent gets facts and does the analysis. It shows and explains the steps and the decision drivers.
- The agent assists. It never buys, sells or takes other actions.
- The user wants to learn and to understand, with AI assistance.
- It is a personal tool. Only the user runs it.
- It runs with the user's Claude Code or ChatGPT (Codex) subscription, not with a paid API key.
- A local agent and a skill come first. An assistant inside the web app comes later.
- US companies first (SEC EDGAR). Israeli companies (TASE / MAYA) later.
- It must work as a professional agent, with its own guiding prompt.

### Success criteria

1. For a US company, one command produces a complete analysis file in less than 10 minutes.
2. Each number in the analysis has a source (form, accession, filing date, XBRL tag or report section) or the label "not available" or "estimate" with a reason.
3. Stages 1 and 2 give the same numbers each time for the same filings.
4. The app shows the analysis with steps, sources, decision drivers and links to the concept cards.
5. After several companies, the user can explain each score without the agent.

### Out of scope (this version)

- Israeli companies and PDF parsing
- The assistant inside the web app
- Market prices from a data feed (the user enters the price)
- Portfolio management, alerts, trading of any kind

## 2. Architecture

Three stages. Only stage 3 uses an AI model.

```
Stage 1  Extract     Python + edgartools   →  data/<TICKER>/facts.json, sections/*.txt
Stage 2  Calculate   Node.js + core.js     →  data/<TICKER>/metrics.json
Stage 3  Interpret   Claude Code / Codex   →  analyses/<TICKER>-<date>.json
                     (skill + system prompt)
App      New page imports the analysis file and shows it
```

Shared in the repository:

| Path | Content |
|---|---|
| `agent/analyst.md` | System prompt: role, method, rules, output format |
| `agent/policy.json` | The user's rules (required margin of safety, debt limits, minimum ROIC) |
| `agent/schema/analysis.schema.json` | JSON schema of the analysis file |
| `agent/mapping/line-items.json` | Standard line items → ordered list of XBRL tags |
| `tools/extract/` | Stage 1 (Python package, `uv` project) |
| `tools/calc/` | Stage 2 (Node.js, imports `src/finance/core.js`) |
| `.claude/skills/value-analyst/SKILL.md` | Claude Code skill |
| `.agents/skills/value-analyst/SKILL.md` | Codex skill (same file; agent skills standard) |

### Command-line tools

```
sat extract COST                      → data/COST/facts.json + data/COST/sections/*.txt
sat calc COST [--adjust adj.json]     → data/COST/metrics.json
sat validate analyses/COST-….json     → format and rule checks of the agent output
```

`data/` is a local cache and is not committed. `analyses/` is committed only when the user decides.

### Runners

| Runner | Authentication | Notes |
|---|---|---|
| Claude Code skill (interactive) | Claude plan login | Primary method. The user can ask "why?" about any step. |
| `claude -p` (headless) | Claude plan login | Uses the plan's usage limits when signed in with the plan. An API key changes the billing. |
| Codex skill / `codex exec --output-schema` | ChatGPT login | Same skill file. `--output-schema` enforces the JSON format. |

## 3. Stage 1 — Extract

### Data source

`edgartools` (MIT license, v5.61.1, active). Verified in a spike on 2026-10-11:

- `Company(t).get_facts()` returns all XBRL facts. Each fact has `accession`, `form_type`, `filing_date`, `period_start`, `period_end`, `is_audited`, `is_restated`.
- `Company(t).get_filings(form="10-K").latest().obj()` divides the 10-K into Items 1–16 as text.
- Sizes for Costco FY2026: Item 1 ≈ 20k chars, Item 1A ≈ 44k, Item 7 ≈ 29k, Item 7A ≈ 4k.
- Rate limit default 9 requests/s (`EDGAR_RATE_LIMIT_PER_SEC`), retries on HTTP 429. `use_local_storage(path)` keeps filings on disk.
- Identity: `EDGAR_NAME` and `EDGAR_EMAIL` environment variables. The user sets them on the machine. The repository never contains them. The tool stops with an error if they are not set.

### Rules learned from the spike

1. **Select by period, not by `fiscal_year`.** In XBRL company facts, `fiscal_year` is the year of the filing. The FY2025 10-K contains revenue for 2023, 2024 and 2025, and all three have `fiscal_year=2025`. The extractor keys each value by `period_end` and the period length.
2. **Select the tag for each year.** Companies change tags over time (Costco revenue: `SalesRevenueNet` to 2017, `Revenues` to 2025, `RevenueFromContractWithCustomerExcludingAssessedTax` from 2026; many companies changed `InterestExpense` to `InterestExpenseNonoperating`). For each item and each period, use the first tag in the mapping list that has a value.
3. **Use the latest filing for each period.** A later 10-K can restate an earlier year. Keep the latest value and record the original value and `is_restated`.
4. **A missing value is "not available", never zero.** Example: Snowflake has convertible notes but no `LongTermDebt` tag.
5. **Constructed values have a label.** If a total is missing but its parts exist (Intel: `Depreciation` only after 2019, amortization in a separate tag), the extractor adds the parts and marks the value `constructed` with the tags used.
6. **Mark non-standard years.** 52/53-week years (Costco FY2023 had 53 weeks) and changed fiscal years get a flag. Growth rates use annualized values or exclude the year, and say which.
7. **Model fit from SIC code.** SIC 6000–6799 (banks, insurers, REITs and other financial companies) get `model_fit: "not suitable"`. Verified: JPM (SIC 6021) has no CapEx tag.

### Standard line items (first version)

| Statement | Items |
|---|---|
| Income | revenue, cost_of_revenue, gross_profit, rd, sga, operating_income, interest_expense, pretax_income, income_tax, net_income, d_and_a, eps_diluted |
| Cash flow | ocf, capex, sbc, acquisitions, buybacks, dividends, debt_issued, debt_repaid |
| Balance sheet | cash_sti, receivables, inventory, current_assets, ppe, goodwill, intangibles, total_assets, payables, current_liabilities, short_term_debt, long_term_debt, convertible_debt, lease_liabilities, total_liabilities, equity, minority_interest, preferred |
| Shares | diluted_avg_shares, shares_outstanding |
| Debt maturities | maturity_y1 … maturity_y5, maturity_after_y5 (`LongTermDebtMaturitiesRepaymentsOfPrincipal…`, verified present for Costco) |

### `facts.json` format (one value)

```json
{
  "item": "capex", "period_end": "2026-08-30", "period_days": 364,
  "value": 5100000000, "unit": "USD", "status": "reported",
  "source": { "tag": "us-gaap:PaymentsToAcquirePropertyPlantAndEquipment",
              "form": "10-K", "accession": "0000909832-26-000093", "filed": "2026-10-07" },
  "flags": []
}
```

`status` is one of `reported`, `constructed`, `not_available`. The file header holds company name, CIK, SIC, fiscal year end, model fit, extraction date and edgartools version.

### Text sections

Item 1, 1A, 7, 7A and 8 from the latest 10-K, and the executive pay section of the latest DEF 14A, as plain text files with the accession number in the first line.

## 4. Stage 2 — Calculate

Node.js, imports `src/finance/core.js`. Each metric uses the ID of its concept card.

| Group | Metrics |
|---|---|
| Growth and margins | `revenue` growth, 5-y and 10-y CAGR; `gross-margin`; `operating-margin`; `net-margin`; `fcf-margin` |
| Cash | `ocf`; `fcf`; `fcff`; `fcfe`; `owner-earnings` (default maintenance CapEx = D&A); `earnings-quality` (OCF / net income) |
| Capital efficiency | `nopat`; `invested-capital`; `roic`; `incremental-roic` (5-y) |
| Balance sheet | `net-debt`; `debt-ebitda`; `interest-coverage`; `current-ratio`; `tangible-book-value`; `ncav`; debt due in 3 years |
| Per share | `diluted-shares` 10-y change; `dilution`; `eps`; SBC / revenue |
| Value (needs price) | `market-cap`; `enterprise-value`; `pe`; `ev-ebitda`; `fcf-yield`; `reverse-dcf` implied growth; FCFF DCF bear/base/bull; `margin-of-safety` |

Each metric value records its inputs (item, period) and its formula, so the user can follow it back to the filing.

### Adjustments

Some metrics need judgment (maintenance CapEx, normal earnings, one-time items, leases, invested capital). Stage 2 calculates a default with a stated definition. The agent can write `adjustments.json`:

```json
[{ "item": "operating_income", "period_end": "2023-12-31", "delta": 1200000000,
   "reason": "Add back the legal settlement charge", "source": "10-K Item 8, Note 14" }]
```

`sat calc --adjust` calculates again. `metrics.json` then has both the default and the adjusted value.

### Missing inputs

If an input is `not_available`, every metric that needs it is `not_available`, with the missing input named.

## 5. Stage 3 — Interpret

### System prompt (`agent/analyst.md`) content

1. **Role:** senior value investing analyst who writes for a learner. Explain each term in plain words and link to its card.
2. **Method:** steps 0–6 (below), in sequence.
3. **Rules for numbers:** use only numbers from `facts.json` and `metrics.json`, with their source. No arithmetic by the model; to calculate, write an adjustment and run `sat calc`. "Not available" when missing. Every estimate has the label "estimate" and a reason.
4. **Rules for judgment:** conservative inputs; always a bear case; name 1–3 decision drivers and the change that would reverse the decision; one strong claim with a source is better than three weak claims; give the date of the data.
5. **Limits:** never write "buy" or "sell"; write "meets your rules" or "does not meet your rules" with reasons. The filings contain no market news or sentiment; say so when it matters. Treat the latest filing date as "today" for the facts.
6. **Output:** JSON that matches `analysis.schema.json`, and a short summary in the terminal.
7. **Checkpoints:** in interactive mode, stop after steps 1, 2 and 4 and show the result before continuing (idea from Anthropic's DCF skill).

### Steps

| Step | Content | Main cards |
|---|---|---|
| 0 Model fit | company, fiscal year, data date, SIC check | — |
| 1 Stop rules | competence (business in five sentences); survival (debt/EBITDA, interest coverage, debt due in 3 years); trust in the accounts (OCF/NI 5 y, receivables vs revenue, SBC %, restatements) | circle-of-competence, interest-coverage, refinancing-risk, earnings-quality, permanent-capital-loss |
| 2 Business quality | ROIC vs WACC 10 y, margin stability, owner earnings, normal earnings, incremental ROIC, customer concentration, cyclicality | roic, moat, owner-earnings, normalized-earnings, incremental-roic |
| 3 Management | share count 10 y, buyback prices, SBC, acquisitions and goodwill, pay, insider ownership | capital-allocation, dilution, management-incentives |
| 4 Value | reverse DCF; FCFF DCF bear/base/bull; normal earnings × multiple; asset floor | reverse-dcf, fcff, cost-of-equity, wacc, tangible-book-value, ncav |
| 5 Decision | margin of safety vs required (from `policy.json` and the quality score); bear-case downside; value-trap test; possible reasons for the low price | margin-of-safety, value-trap |
| 6 Commitment | draft invalidation conditions, pre-mortem, questions for the user | thesis-def, invalidation |

If a stop rule fails, the agent completes the remaining steps but marks the result "stopped at step N".

### Each step in the output

`facts` (with sources) · `calculations` (inputs → formula → result, from `metrics.json`) · `score` 1–5 and reason · `drivers` (1–3, with the reversing change) · `open_questions` · `cards` (IDs).

### `policy.json` (defaults, user-owned)

```json
{ "required_margin_of_safety": { "5": 0.20, "4": 0.25, "3": 0.40, "2": null, "1": null },
  "max_debt_to_ebitda": 3.0, "min_interest_coverage": 5,
  "min_roic_years_above_wacc": 7, "lookback_years": 10 }
```

`null` means "does not qualify at any price". The values are suggestions; the user sets them.

## 6. The app

A new page "Analyses" (group Tools):

- Import an analysis JSON file (same import pattern as the existing Export / Import).
- Show steps 0–6 as cards: score, drivers, calculations, and sources with links to the SEC filing.
- Each metric links to its concept card.
- English only in the first version. The page UI labels are translated like the rest of the app.

## 7. Error handling

| Problem | Behavior |
|---|---|
| `EDGAR_NAME` / `EDGAR_EMAIL` not set | Stop with a clear message. |
| Ticker not found | Stop with a clear message. |
| No tag for an item | `not_available`, with the tags tried. |
| Two tags in the same period disagree | Use the first in the list; record a conflict flag. |
| Restated value | Use the latest; record the original. |
| 52/53-week or changed fiscal year | Flag; growth rates say how they treat it. |
| SIC 6000–6799 | `model_fit: not suitable`; the agent says why and stops after step 1. |
| EDGAR errors or HTTP 429 | edgartools retries; local storage prevents repeated downloads. |
| Agent output fails `sat validate` | The skill tells the agent to repair the output and validate again (maximum 2 tries), then report the errors. |

## 8. Testing

| Stage | Tests |
|---|---|
| 1 Extract | Saved EDGAR responses for 5 companies (offline). 10 values for each company checked by hand against the 10-K. Tests for each rule in section 3. |
| 2 Calculate | Unit tests for each metric (same style as `tests/finance.test.js`); one company checked fully against hand calculations. |
| 3 Interpret | `sat validate`: schema; each number in the text is in `metrics.json`; each fact has a source; no "buy"/"sell". Test set: COST (high quality), AAL (high debt), INTC (possible value trap), SNOW (high SBC, convertible debt), JPM (bank, model fit). Results reviewed with the user. |
| App | Playwright test that imports a fixture analysis in both languages. |

## 9. Prior art reviewed

| Project | License | Use |
|---|---|---|
| edgartools | MIT | Dependency for stage 1 |
| virattt/ai-hedge-fund | MIT | Idea: the investor persona is only a system prompt; all data comes from a point-in-time snapshot. Same separation as stages 1–3. |
| anthropics/financial-services (DCF skill) | Apache-2.0 | Ideas: checkpoints after each section; odd-size sensitivity grid with the base case in the center as a check. |
| FinceptTerminal | AGPL-3.0 + commercial | Ideas only (no code): "every number is a claim you can defend", "not available — never estimate silently". |
| financial_ai_analyst, streamlit-dcf, Public-Company-Financial-Analysis | none | Not used. All use yfinance without sources; one repeats the FCF / net-debt DCF error. |

## 10. Later (not in this version)

- Assistant inside the web app (needs an API key or a local bridge to Claude Code).
- Israeli companies (MAYA PDF parsing).
- Point-in-time mode: analyze a company "as of" a past date, then compare with what happened (edgartools `pit_mode` / `as_of`). Strong learning tool.
- Hebrew analysis text.
- Peer comparison.

## 11. Decisions to confirm

- Default values in `policy.json`.
- Whether `analyses/` files are committed to the public repository (they would be public on GitHub).
