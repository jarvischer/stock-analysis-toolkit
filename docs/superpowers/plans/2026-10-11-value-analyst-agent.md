# Value Analyst Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A local AI analyst that extracts SEC data, calculates the handbook's metrics with tested code, writes a value investing analysis with sources and decision drivers, and an app page that shows the analysis.

**Architecture:** Stage 1 (Python + edgartools) writes `data/<T>/facts.json` and 10-K sections. Stage 2 (Node.js + `src/finance/core.js`) writes `data/<T>/metrics.json`. Stage 3 is a skill (Claude Code and Codex) that follows `agent/analyst.md`, writes `analyses/<T>-<date>.json`, and checks it with `sat validate`. A new app page imports and shows the analysis.

**Tech Stack:** Python ≥3.11, `uv`, `edgartools==5.61.1`, `pytest`; Node.js ≥22 (`node:test`), `ajv@8.17.1`; existing static app (vanilla JS), Playwright.

**Spec:** `docs/superpowers/specs/2026-10-11-value-analyst-agent-design.md`

## Global Constraints

- Every number has a source, or the status `not_available` / `constructed` / an `estimate` label with a reason. A missing value is never silently zero; the only items treated as zero when missing are listed in `ZERO_IF_MISSING` (Task 4) and are marked `assumed_zero`.
- Stage 1 selects values by `period_end` and period length, never by the XBRL `fiscal_year` field.
- Tag choice is made for each period: the first tag in the mapping list that has a value for that period.
- No arithmetic in the agent. All arithmetic is in `tools/calc/` or `src/finance/core.js`.
- The agent never writes "buy" or "sell". Results are `meets_rules`, `does_not_meet_rules` or `stopped`.
- `EDGAR_NAME` and `EDGAR_EMAIL` come from the environment. They never appear in the repository, in fixtures or in logs.
- `data/` and `analyses/` are in `.gitignore`.
- SIC 6000–6799 → `model_fit: "not_suitable"`.
- Annual duration = 358–380 days inclusive; ≥368 days → flag `long_year`; growth uses value × 364 / period_days for such years.
- App: all analysis text is untrusted input; escape with `SAT.esc`; the analysis content container has `data-no-translate`; every new UI label has an English and a Hebrew key in `src/content/*/ui.json`.
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **A company changes its revenue tag between years** → the series has no gap and each year names its own tag. Pinned in Task 1 (`test_tag_chosen_per_period`).
2. **A debt tag is missing (Snowflake: convertible notes only)** → debt uses the convertible tag; with neither, debt-based metrics are `not_available`, not 0. Pinned in Task 4 (`debt falls back to convertible notes` / `missing debt is not zero`).
3. **Negative or zero denominators (loss year, negative invested capital change)** → status `not_meaningful`, never `Infinity` or a sign-flipped ratio. Pinned in Task 4 (`P/E and ratios with a loss are not meaningful`) and Task 5.
4. **A hostile or malformed analysis file is imported into the app** → no script runs, the text shows literally, a wrong file gives a clear message. Pinned in Task 10 (Playwright XSS and bad-file tests).
5. **No price is given, or assumptions give r ≤ terminal growth** → all non-valuation metrics still compute; valuation metrics are `not_available` / `not_meaningful`. Pinned in Task 5.

---

## File structure

| Path | Responsibility |
|---|---|
| `tools/extract/pyproject.toml` | uv project for stage 1 |
| `tools/extract/sat_extract/select.py` | Choose one annual value per period from raw records |
| `tools/extract/sat_extract/facts.py` | Build `facts.json` from records + mapping (missing, constructed, model fit) |
| `tools/extract/sat_extract/fetch.py` | edgartools → raw records; identity check |
| `tools/extract/sat_extract/sections.py` | 10-K sections and proxy pay text |
| `tools/extract/sat_extract/__main__.py` | CLI `python -m sat_extract` |
| `tools/extract/tests/` | pytest tests and the recorded COST fixture |
| `agent/mapping/line-items.json` | Standard items → XBRL tags |
| `tools/calc/facts-table.mjs` | Lookup of facts with adjustments and `ZERO_IF_MISSING` |
| `tools/calc/metrics.mjs` | Per-year and multi-year metrics |
| `tools/calc/valuation.mjs` | Price-based metrics, DCF scenarios, reverse DCF, margin of safety |
| `tools/calc/cli.mjs` | `sat calc` |
| `tools/calc/test/*.test.mjs` | node:test tests |
| `agent/policy.json` | User rules and valuation defaults |
| `agent/schema/analysis.schema.json` | Output format of the agent |
| `tools/agent/validate.mjs` | `sat validate` |
| `tools/agent/test/validate.test.mjs` | Validator tests |
| `agent/analyst.md` | System prompt |
| `.claude/skills/value-analyst/SKILL.md` | Skill (Claude Code); `.agents/skills/value-analyst` is a symlink for Codex |
| `scripts/sat.mjs` | `npm run sat -- <extract|calc|validate>` dispatcher |
| `src/components/analyses.js` | App page "Analyses" |
| `tests/analyses.spec.cjs`, `tests/fixtures/analysis-sample.json` | App tests |

---

### Task 1: Stage 1 project and annual value selection

**Files:**
- Create: `tools/extract/pyproject.toml`, `tools/extract/sat_extract/__init__.py`, `tools/extract/sat_extract/select.py`, `tools/extract/tests/test_select.py`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `annual_series(records: list[dict], tags: list[str], unit: str, kind: Literal["duration","instant"]) -> dict[str, dict]` keyed by `period_end` (ISO date). Each value: `{"value", "tag", "form", "accession", "filed", "period_start", "flags": list[str]}` plus `"period_days"` for durations, optional `"original_value"`, `"original_accession"`, `"conflict": {"tag","value"}`.
- Raw record format (used by all of stage 1): `{"concept": "us-gaap:X", "value": float, "unit": "USD", "start": "YYYY-MM-DD"|None, "end": "YYYY-MM-DD", "form": "10-K", "accession": "...", "filed": "YYYY-MM-DD"}`.

- [ ] **Step 1: Create the uv project and ignore rules**

`tools/extract/pyproject.toml`:
```toml
[project]
name = "sat-extract"
version = "0.1.0"
description = "Stage 1 of the value analyst agent: SEC EDGAR facts and 10-K sections"
requires-python = ">=3.11"
dependencies = ["edgartools==5.61.1"]

[dependency-groups]
dev = ["pytest>=8"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["sat_extract"]

[tool.pytest.ini_options]
testpaths = ["tests"]
markers = ["live: needs network access and EDGAR_NAME / EDGAR_EMAIL"]
addopts = "-m 'not live'"
```

`tools/extract/sat_extract/__init__.py`:
```python
"""Stage 1 of the value analyst agent."""
```

Append to `.gitignore`:
```
data/
analyses/
tools/extract/.venv/
__pycache__/
```

- [ ] **Step 2: Write the failing tests**

`tools/extract/tests/test_select.py`:
```python
from sat_extract.select import annual_series, period_days


def rec(concept, value, start, end, filed, form="10-K", acc=None, unit="USD"):
    return {"concept": concept, "value": value, "unit": unit, "start": start, "end": end,
            "form": form, "accession": acc or f"acc-{filed}", "filed": filed}


REV = ["us-gaap:Revenues", "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax"]


def test_period_days_is_inclusive():
    assert period_days("2025-09-01", "2026-08-30") == 364
    assert period_days("2022-08-29", "2023-09-03") == 371


def test_selects_by_period_not_filing_year():
    # One 10-K reports three years; each must land on its own period end.
    recs = [rec(REV[0], v, s, e, "2025-10-08") for v, s, e in [
        (242.29e9, "2022-08-29", "2023-09-03"), (254.453e9, "2023-09-04", "2024-09-01"),
        (275.235e9, "2024-09-02", "2025-08-31")]]
    out = annual_series(recs, REV, "USD", "duration")
    assert sorted(out) == ["2023-09-03", "2024-09-01", "2025-08-31"]
    assert out["2025-08-31"]["value"] == 275.235e9


def test_tag_chosen_per_period():
    recs = [rec(REV[0], 275.0, "2024-09-02", "2025-08-31", "2025-10-08"),
            rec(REV[1], 303.0, "2025-09-01", "2026-08-30", "2026-10-07")]
    out = annual_series(recs, REV, "USD", "duration")
    assert out["2025-08-31"]["tag"] == REV[0]
    assert out["2026-08-30"]["tag"] == REV[1]


def test_quarters_and_wrong_forms_are_ignored():
    recs = [rec(REV[0], 70.0, "2025-09-01", "2025-11-23", "2025-12-10", form="10-Q"),
            rec(REV[0], 70.0, "2025-09-01", "2025-11-23", "2026-10-07"),  # quarter inside a 10-K
            rec(REV[0], 1.0, "2025-09-01", "2026-08-30", "2026-10-07", unit="shares")]
    assert annual_series(recs, REV, "USD", "duration") == {}


def test_latest_filing_wins_and_restatement_is_recorded():
    recs = [rec(REV[0], 100.0, "2024-01-01", "2024-12-31", "2025-02-01", acc="A"),
            rec(REV[0], 98.0, "2024-01-01", "2024-12-31", "2026-02-01", acc="B")]
    v = annual_series(recs, REV, "USD", "duration")["2024-12-31"]
    assert v["value"] == 98.0 and v["accession"] == "B"
    assert "restated" in v["flags"] and v["original_value"] == 100.0 and v["original_accession"] == "A"


def test_long_year_flag():
    recs = [rec(REV[0], 242.29e9, "2022-08-29", "2023-09-03", "2023-10-11")]
    v = annual_series(recs, REV, "USD", "duration")["2023-09-03"]
    assert v["period_days"] == 371 and "long_year" in v["flags"]


def test_tag_conflict_is_recorded():
    recs = [rec(REV[0], 275.2, "2024-09-02", "2025-08-31", "2025-10-08"),
            rec(REV[1], 269.9, "2024-09-02", "2025-08-31", "2025-10-08")]
    v = annual_series(recs, REV, "USD", "duration")["2025-08-31"]
    assert v["tag"] == REV[0] and "tag_conflict" in v["flags"]
    assert v["conflict"] == {"tag": REV[1], "value": 269.9}


def test_instant_values():
    tags = ["us-gaap:AssetsCurrent"]
    recs = [rec(tags[0], 40.0, None, "2026-08-30", "2026-10-07"),
            rec(tags[0], 41.0, "2025-09-01", "2026-08-30", "2026-10-07")]  # wrong kind: ignored
    out = annual_series(recs, tags, "USD", "instant")
    assert out["2026-08-30"]["value"] == 40.0 and "period_days" not in out["2026-08-30"]
```

- [ ] **Step 3: Run the tests to make sure they fail**

Run: `uv run --project tools/extract pytest tools/extract/tests/test_select.py -q`
Expected: FAIL with `ModuleNotFoundError: No module named 'sat_extract.select'`

- [ ] **Step 4: Write the implementation**

`tools/extract/sat_extract/select.py`:
```python
"""Choose one annual value per period from raw XBRL records.

Rules (spec section 3): select by period, not by the XBRL fiscal_year field; choose the
tag for each period; the latest filing wins and a restatement is recorded; long
(53-week) years are flagged.
"""
from __future__ import annotations

from datetime import date
from typing import Literal

ANNUAL_FORMS = {"10-K", "10-K/A", "10-KT", "10-KT/A"}
MIN_DAYS, MAX_DAYS, LONG_YEAR_DAYS = 358, 380, 368
CONFLICT_TOLERANCE = 0.005


def period_days(start: str, end: str) -> int:
    return (date.fromisoformat(end) - date.fromisoformat(start)).days + 1


def _is_annual(rec: dict, kind: str) -> bool:
    if rec["form"] not in ANNUAL_FORMS:
        return False
    if kind == "instant":
        return rec["start"] is None
    if rec["start"] is None:
        return False
    return MIN_DAYS <= period_days(rec["start"], rec["end"]) <= MAX_DAYS


def annual_series(records: list[dict], tags: list[str], unit: str,
                  kind: Literal["duration", "instant"]) -> dict[str, dict]:
    by_end: dict[str, list[dict]] = {}
    for rec in records:
        if rec["concept"] in tags and rec["unit"] == unit and _is_annual(rec, kind):
            by_end.setdefault(rec["end"], []).append(rec)

    out: dict[str, dict] = {}
    for end, recs in by_end.items():
        for position, tag in enumerate(tags):
            hits = sorted((r for r in recs if r["concept"] == tag), key=lambda r: (r["filed"], r["accession"]))
            if not hits:
                continue
            latest, first = hits[-1], hits[0]
            chosen = {"value": latest["value"], "tag": tag, "form": latest["form"],
                      "accession": latest["accession"], "filed": latest["filed"],
                      "period_start": latest["start"], "flags": []}
            if kind == "duration":
                chosen["period_days"] = period_days(latest["start"], end)
                if chosen["period_days"] >= LONG_YEAR_DAYS:
                    chosen["flags"].append("long_year")
            if first["value"] != latest["value"]:
                chosen["flags"].append("restated")
                chosen["original_value"] = first["value"]
                chosen["original_accession"] = first["accession"]
            for other in tags[position + 1:]:
                others = [r for r in recs if r["concept"] == other]
                if not others:
                    continue
                other_value = max(others, key=lambda r: r["filed"])["value"]
                if abs(other_value - latest["value"]) > CONFLICT_TOLERANCE * max(abs(latest["value"]), 1.0):
                    chosen["flags"].append("tag_conflict")
                    chosen["conflict"] = {"tag": other, "value": other_value}
                break
            out[end] = chosen
            break
    return out
```

- [ ] **Step 5: Run the tests to make sure they pass**

Run: `uv run --project tools/extract pytest tools/extract/tests/test_select.py -q`
Expected: `8 passed`

- [ ] **Step 6: Commit**

```bash
git add .gitignore tools/extract/pyproject.toml tools/extract/uv.lock tools/extract/sat_extract tools/extract/tests
git commit -m "Add stage 1 project and annual XBRL value selection

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Line-item mapping and `facts.json` builder

**Files:**
- Create: `agent/mapping/line-items.json`, `tools/extract/sat_extract/facts.py`, `tools/extract/tests/test_facts.py`

**Interfaces:**
- Consumes: `annual_series` (Task 1).
- Produces: `build_facts(records: list[dict], mapping: dict, company: dict, years: int, extracted_at: str, edgartools_version: str) -> dict` with shape:
  ```
  {"schema_version": 1,
   "company": {"ticker","name","cik","sic","sic_description","fiscal_year_end","model_fit"},
   "extracted_at": str, "edgartools_version": str, "periods": [period_end, ...] (ascending),
   "facts": [ {"item","period_end","period_days"|None,"value"|None,"unit","status","source"|None,"flags":[...], ...} ]}
  ```
  `status` ∈ `reported | constructed | not_available`. `source` for reported: `{"tag","form","accession","filed"}`; for constructed: `{"parts":[{"tag","value","accession"}]}`; for not_available: `None` plus `"tried": [tags]`.

- [ ] **Step 1: Create the mapping file**

`agent/mapping/line-items.json`:
```json
{
  "version": 1,
  "period_items": ["revenue", "net_income"],
  "items": {
    "revenue": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:Revenues", "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax", "us-gaap:RevenueFromContractWithCustomerIncludingAssessedTax", "us-gaap:SalesRevenueNet", "us-gaap:SalesRevenueGoodsNet"]},
    "cost_of_revenue": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:CostOfRevenue", "us-gaap:CostOfGoodsAndServicesSold", "us-gaap:CostOfGoodsSold", "us-gaap:CostOfServices"]},
    "gross_profit": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:GrossProfit"]},
    "rd": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:ResearchAndDevelopmentExpense", "us-gaap:ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost"]},
    "sga": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:SellingGeneralAndAdministrativeExpense"]},
    "operating_income": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:OperatingIncomeLoss"]},
    "interest_expense": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:InterestExpense", "us-gaap:InterestExpenseNonoperating", "us-gaap:InterestExpenseDebt", "us-gaap:InterestAndDebtExpense"]},
    "pretax_income": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest", "us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments"]},
    "income_tax": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:IncomeTaxExpenseBenefit"]},
    "net_income": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:NetIncomeLoss", "us-gaap:ProfitLoss", "us-gaap:NetIncomeLossAvailableToCommonStockholdersBasic"]},
    "d_and_a": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:DepreciationDepletionAndAmortization", "us-gaap:DepreciationAmortizationAndAccretionNet", "us-gaap:DepreciationAndAmortization"],
                "construct": {"required": [["us-gaap:Depreciation"]], "optional": [["us-gaap:AmortizationOfIntangibleAssets"]]}},
    "eps_diluted": {"kind": "duration", "unit": "USD per share", "tags": ["us-gaap:EarningsPerShareDiluted"]},
    "ocf": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:NetCashProvidedByUsedInOperatingActivities", "us-gaap:NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"]},
    "capex": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:PaymentsToAcquirePropertyPlantAndEquipment", "us-gaap:PaymentsToAcquireProductiveAssets", "us-gaap:PaymentsForCapitalImprovements"]},
    "sbc": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:ShareBasedCompensation", "us-gaap:AllocatedShareBasedCompensationExpense"]},
    "acquisitions": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:PaymentsToAcquireBusinessesNetOfCashAcquired"]},
    "buybacks": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:PaymentsForRepurchaseOfCommonStock"]},
    "dividends": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:PaymentsOfDividends", "us-gaap:PaymentsOfDividendsCommonStock"]},
    "debt_issued": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:ProceedsFromIssuanceOfLongTermDebt", "us-gaap:ProceedsFromIssuanceOfDebt"]},
    "debt_repaid": {"kind": "duration", "unit": "USD", "tags": ["us-gaap:RepaymentsOfLongTermDebt", "us-gaap:RepaymentsOfDebt"]},
    "diluted_avg_shares": {"kind": "duration", "unit": "shares", "tags": ["us-gaap:WeightedAverageNumberOfDilutedSharesOutstanding"]},
    "cash_sti": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:CashCashEquivalentsAndShortTermInvestments"],
                 "construct": {"required": [["us-gaap:CashAndCashEquivalentsAtCarryingValue"]], "optional": [["us-gaap:ShortTermInvestments", "us-gaap:MarketableSecuritiesCurrent", "us-gaap:AvailableForSaleSecuritiesDebtSecuritiesCurrent"]]}},
    "receivables": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:AccountsReceivableNetCurrent", "us-gaap:ReceivablesNetCurrent"]},
    "inventory": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:InventoryNet"]},
    "current_assets": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:AssetsCurrent"]},
    "ppe": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:PropertyPlantAndEquipmentNet"]},
    "goodwill": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:Goodwill"]},
    "intangibles": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:IntangibleAssetsNetExcludingGoodwill", "us-gaap:FiniteLivedIntangibleAssetsNet"]},
    "total_assets": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:Assets"]},
    "payables": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:AccountsPayableCurrent"]},
    "current_liabilities": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LiabilitiesCurrent"]},
    "short_term_debt": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:DebtCurrent", "us-gaap:LongTermDebtCurrent", "us-gaap:ShortTermBorrowings"]},
    "long_term_debt": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtNoncurrent", "us-gaap:LongTermDebtAndCapitalLeaseObligations", "us-gaap:LongTermDebt"]},
    "convertible_debt": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:ConvertibleDebtNoncurrent", "us-gaap:ConvertibleNotesPayable"]},
    "lease_liabilities": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:OperatingLeaseLiability", "us-gaap:OperatingLeaseLiabilityNoncurrent"]},
    "total_liabilities": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:Liabilities"]},
    "equity": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:StockholdersEquity", "us-gaap:StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest"]},
    "minority_interest": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:MinorityInterest"]},
    "preferred": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:PreferredStockValue"]},
    "shares_outstanding": {"kind": "instant", "unit": "shares", "tags": ["us-gaap:CommonStockSharesOutstanding"]},
    "maturity_y1": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalInNextTwelveMonths"]},
    "maturity_y2": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalInYearTwo"]},
    "maturity_y3": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalInYearThree"]},
    "maturity_y4": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalInYearFour"]},
    "maturity_y5": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalInYearFive"]},
    "maturity_after_y5": {"kind": "instant", "unit": "USD", "tags": ["us-gaap:LongTermDebtMaturitiesRepaymentsOfPrincipalAfterYearFive"]}
  }
}
```

- [ ] **Step 2: Write the failing tests**

`tools/extract/tests/test_facts.py`:
```python
import json
from pathlib import Path

from sat_extract.facts import build_facts

MAPPING = json.loads((Path(__file__).resolve().parents[3] / "agent/mapping/line-items.json").read_text())
COMPANY = {"ticker": "TEST", "name": "Test Corp", "cik": "0000000001", "sic": 5331,
           "sic_description": "Retail", "fiscal_year_end": "1231"}


def rec(concept, value, end, start="auto", unit="USD", filed=None):
    if start == "auto":
        start = f"{int(end[:4])}-01-01"
    return {"concept": "us-gaap:" + concept, "value": value, "unit": unit, "start": start, "end": end,
            "form": "10-K", "accession": "0000000001-26-000001", "filed": filed or f"{int(end[:4]) + 1}-02-15"}


def build(records, years=10, company=COMPANY):
    return build_facts(records, MAPPING, company, years, "2026-10-11", "5.61.1")


def fact(out, item, end):
    return next(f for f in out["facts"] if f["item"] == item and f["period_end"] == end)


BASE = [rec("Revenues", 100.0, "2024-12-31"), rec("Revenues", 110.0, "2025-12-31"),
        rec("NetIncomeLoss", 10.0, "2024-12-31"), rec("NetIncomeLoss", 12.0, "2025-12-31")]


def test_periods_come_from_period_items_and_are_limited():
    out = build(BASE, years=1)
    assert out["periods"] == ["2025-12-31"]
    assert build(BASE)["periods"] == ["2024-12-31", "2025-12-31"]


def test_reported_fact_has_source():
    f = fact(build(BASE), "revenue", "2025-12-31")
    assert f["status"] == "reported" and f["value"] == 110.0 and f["unit"] == "USD"
    assert f["source"] == {"tag": "us-gaap:Revenues", "form": "10-K",
                           "accession": "0000000001-26-000001", "filed": "2026-02-15"}


def test_missing_item_is_not_available_never_zero():
    f = fact(build(BASE), "long_term_debt", "2025-12-31")
    assert f["status"] == "not_available" and f["value"] is None and f["source"] is None
    assert f["tried"] == MAPPING["items"]["long_term_debt"]["tags"]


def test_constructed_total_from_parts():
    recs = BASE + [rec("Depreciation", 7.0, "2025-12-31"), rec("AmortizationOfIntangibleAssets", 2.0, "2025-12-31")]
    f = fact(build(recs), "d_and_a", "2025-12-31")
    assert f["status"] == "constructed" and f["value"] == 9.0
    assert [p["tag"] for p in f["source"]["parts"]] == ["us-gaap:Depreciation", "us-gaap:AmortizationOfIntangibleAssets"]


def test_constructed_needs_required_parts():
    recs = BASE + [rec("AmortizationOfIntangibleAssets", 2.0, "2025-12-31")]
    assert fact(build(recs), "d_and_a", "2025-12-31")["status"] == "not_available"


def test_reported_total_beats_construction():
    recs = BASE + [rec("DepreciationDepletionAndAmortization", 9.5, "2025-12-31"), rec("Depreciation", 7.0, "2025-12-31")]
    f = fact(build(recs), "d_and_a", "2025-12-31")
    assert f["status"] == "reported" and f["value"] == 9.5


def test_instant_items_use_period_ends():
    recs = BASE + [rec("AssetsCurrent", 50.0, "2025-12-31", start=None)]
    assert fact(build(recs), "current_assets", "2025-12-31")["value"] == 50.0


def test_model_fit_from_sic():
    assert build(BASE)["company"]["model_fit"] == "suitable"
    bank = dict(COMPANY, sic=6021)
    assert build(BASE, company=bank)["company"]["model_fit"] == "not_suitable"


def test_header_fields():
    out = build(BASE)
    assert out["schema_version"] == 1 and out["extracted_at"] == "2026-10-11" and out["edgartools_version"] == "5.61.1"
```

- [ ] **Step 3: Run the tests to make sure they fail**

Run: `uv run --project tools/extract pytest tools/extract/tests/test_facts.py -q`
Expected: FAIL with `ModuleNotFoundError: No module named 'sat_extract.facts'`

- [ ] **Step 4: Write the implementation**

`tools/extract/sat_extract/facts.py`:
```python
"""Build facts.json: one value (or an explicit gap) for each mapped item and period."""
from __future__ import annotations

from .select import annual_series

FINANCIAL_SIC = range(6000, 6800)  # banks, insurers, REITs and other financial companies


def _periods(records: list[dict], mapping: dict, years: int) -> list[str]:
    ends: set[str] = set()
    for item in mapping["period_items"]:
        spec = mapping["items"][item]
        ends.update(annual_series(records, spec["tags"], spec["unit"], spec["kind"]))
    return sorted(ends)[-years:]


def _reported(item: str, end: str, unit: str, chosen: dict) -> dict:
    fact = {"item": item, "period_end": end, "period_days": chosen.get("period_days"),
            "value": chosen["value"], "unit": unit, "status": "reported",
            "source": {"tag": chosen["tag"], "form": chosen["form"],
                       "accession": chosen["accession"], "filed": chosen["filed"]},
            "flags": list(chosen["flags"])}
    for key in ("original_value", "original_accession", "conflict"):
        if key in chosen:
            fact[key] = chosen[key]
    return fact


def _constructed(item: str, end: str, spec: dict, records: list[dict]) -> dict | None:
    rule = spec.get("construct")
    if not rule:
        return None
    parts, total, period_days, flags = [], 0.0, None, ["constructed"]
    for group in rule["required"]:
        chosen = annual_series(records, group, spec["unit"], spec["kind"]).get(end)
        if chosen is None:
            return None
        parts.append(chosen)
    for group in rule.get("optional", []):
        chosen = annual_series(records, group, spec["unit"], spec["kind"]).get(end)
        if chosen is not None:
            parts.append(chosen)
    for chosen in parts:
        total += chosen["value"]
        period_days = period_days or chosen.get("period_days")
        flags.extend(f for f in chosen["flags"] if f not in flags)
    return {"item": item, "period_end": end, "period_days": period_days, "value": total,
            "unit": spec["unit"], "status": "constructed",
            "source": {"parts": [{"tag": c["tag"], "value": c["value"], "accession": c["accession"]} for c in parts]},
            "flags": flags}


def build_facts(records: list[dict], mapping: dict, company: dict, years: int,
                extracted_at: str, edgartools_version: str) -> dict:
    periods = _periods(records, mapping, years)
    facts = []
    for item, spec in mapping["items"].items():
        series = annual_series(records, spec["tags"], spec["unit"], spec["kind"])
        for end in periods:
            if end in series:
                facts.append(_reported(item, end, spec["unit"], series[end]))
                continue
            built = _constructed(item, end, spec, records)
            facts.append(built or {"item": item, "period_end": end, "period_days": None, "value": None,
                                   "unit": spec["unit"], "status": "not_available", "source": None,
                                   "flags": [], "tried": list(spec["tags"])})
    sic = int(company["sic"]) if company.get("sic") not in (None, "") else None
    return {"schema_version": 1,
            "company": {**company, "sic": sic,
                        "model_fit": "not_suitable" if sic in FINANCIAL_SIC else "suitable"},
            "extracted_at": extracted_at, "edgartools_version": edgartools_version,
            "periods": periods, "facts": facts}
```

- [ ] **Step 5: Run the tests to make sure they pass**

Run: `uv run --project tools/extract pytest tools/extract/tests -q`
Expected: `17 passed`

- [ ] **Step 6: Commit**

```bash
git add agent/mapping/line-items.json tools/extract/sat_extract/facts.py tools/extract/tests/test_facts.py
git commit -m "Build facts.json from XBRL records with explicit gaps and constructed totals

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: EDGAR fetch, sections and the extract CLI

**Files:**
- Create: `tools/extract/sat_extract/fetch.py`, `tools/extract/sat_extract/sections.py`, `tools/extract/sat_extract/__main__.py`, `tools/extract/tests/test_fetch.py`, `tools/extract/tests/test_live.py`

**Interfaces:**
- Consumes: `build_facts` (Task 2), mapping file.
- Produces:
  - `require_identity(env: Mapping[str,str]) -> str` (raises `SystemExit` with a message when a value is missing).
  - `records_from_dataframe(df: pandas.DataFrame) -> list[dict]` (raw record format of Task 1).
  - `python -m sat_extract TICKER [--out data] [--years 10] [--save-records]` writes `data/<TICKER>/facts.json`, `data/<TICKER>/sections/{item1,item1a,item7,item7a,item8,proxy_pay}.txt`, and with `--save-records` also `data/<TICKER>/records.json`.

- [ ] **Step 1: Write the failing tests**

`tools/extract/tests/test_fetch.py`:
```python
import datetime as dt

import pandas as pd
import pytest

from sat_extract.fetch import records_from_dataframe, require_identity


def test_identity_required():
    with pytest.raises(SystemExit) as err:
        require_identity({"EDGAR_NAME": "A"})
    assert "EDGAR_EMAIL" in str(err.value)
    assert require_identity({"EDGAR_NAME": "A B", "EDGAR_EMAIL": "a@b.c"}) == "A B a@b.c"


def test_records_from_dataframe():
    df = pd.DataFrame([
        {"concept": "us-gaap:Revenues", "numeric_value": 275235000000.0, "unit": "USD",
         "period_start": dt.date(2024, 9, 2), "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "0000909832-25-000101", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "us-gaap:AssetsCurrent", "numeric_value": 40.0, "unit": "USD",
         "period_start": pd.NaT, "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "x", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "dei:EntityRegistrantName", "numeric_value": None, "unit": None,
         "period_start": pd.NaT, "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "x", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "us-gaap:Revenues", "numeric_value": 70.0, "unit": "USD",
         "period_start": dt.date(2025, 9, 1), "period_end": dt.date(2025, 11, 23), "form_type": "10-Q",
         "accession": "q", "filing_date": dt.date(2025, 12, 10)},
    ])
    out = records_from_dataframe(df)
    assert out == [
        {"concept": "us-gaap:Revenues", "value": 275235000000.0, "unit": "USD", "start": "2024-09-02",
         "end": "2025-08-31", "form": "10-K", "accession": "0000909832-25-000101", "filed": "2025-10-08"},
        {"concept": "us-gaap:AssetsCurrent", "value": 40.0, "unit": "USD", "start": None,
         "end": "2025-08-31", "form": "10-K", "accession": "x", "filed": "2025-10-08"},
    ]
```

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `uv run --project tools/extract pytest tools/extract/tests/test_fetch.py -q`
Expected: FAIL with `ModuleNotFoundError: No module named 'sat_extract.fetch'`

- [ ] **Step 3: Write `fetch.py`**

`tools/extract/sat_extract/fetch.py`:
```python
"""SEC EDGAR access through edgartools. Network code lives only here."""
from __future__ import annotations

import os
from collections.abc import Mapping
from pathlib import Path

import pandas as pd

from .select import ANNUAL_FORMS


def require_identity(env: Mapping[str, str] = os.environ) -> str:
    missing = [k for k in ("EDGAR_NAME", "EDGAR_EMAIL") if not env.get(k)]
    if missing:
        raise SystemExit(f"Set {' and '.join(missing)} in the environment. SEC requires a name and an "
                         "email address in each request (https://www.sec.gov/os/accessing-edgar-data).")
    return f"{env['EDGAR_NAME']} {env['EDGAR_EMAIL']}"


def _iso(value) -> str | None:
    return None if value is None or pd.isna(value) else str(value)[:10]


def records_from_dataframe(df: pd.DataFrame) -> list[dict]:
    keep = df[df["form_type"].isin(ANNUAL_FORMS) & df["numeric_value"].notna()]
    return [{"concept": r.concept, "value": float(r.numeric_value), "unit": r.unit,
             "start": _iso(r.period_start), "end": _iso(r.period_end), "form": r.form_type,
             "accession": r.accession, "filed": _iso(r.filing_date)}
            for r in keep.itertuples(index=False)]


def fetch(ticker: str, cache_dir: Path):
    """Return (company_info, records, edgar_company). Raises SystemExit for an unknown ticker."""
    import edgar  # imported here so tests do not need network setup

    edgar.set_identity(require_identity())
    cache_dir.mkdir(parents=True, exist_ok=True)
    edgar.use_local_storage(str(cache_dir))
    try:
        company = edgar.Company(ticker)
    except Exception as exc:  # edgartools raises for unknown tickers
        raise SystemExit(f"Ticker not found in SEC EDGAR: {ticker} ({exc})") from exc
    if getattr(company, "not_found", False):
        raise SystemExit(f"Ticker not found in SEC EDGAR: {ticker}")
    info = {"ticker": ticker.upper(), "name": company.name, "cik": str(company.cik).zfill(10),
            "sic": company.sic, "sic_description": getattr(company, "sic_description", None),
            "fiscal_year_end": getattr(company, "fiscal_year_end", None)}
    df = company.get_facts().to_dataframe(include_metadata=True)
    return info, records_from_dataframe(df), company
```

- [ ] **Step 4: Write `sections.py` and `__main__.py`**

`tools/extract/sat_extract/sections.py`:
```python
"""10-K sections and the executive pay part of the proxy statement, as plain text."""
from __future__ import annotations

from pathlib import Path

TENK_ITEMS = {"item1": "Item 1", "item1a": "Item 1A", "item7": "Item 7", "item7a": "Item 7A", "item8": "Item 8"}
PAY_HEADING = "Compensation Discussion and Analysis"
PAY_MAX_CHARS = 60_000


def write_sections(company, out_dir: Path) -> list[str]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    filing = company.get_filings(form="10-K").latest()
    tenk = filing.obj()
    for key, item in TENK_ITEMS.items():
        text = tenk[item] or "not available"
        (out_dir / f"{key}.txt").write_text(
            f"# {filing.form} {filing.accession_no} filed {filing.filing_date} — {item}\n\n{text}\n")
        written.append(key)
    pay = "not available"
    proxy = company.get_filings(form="DEF 14A").latest()
    if proxy is not None:
        try:
            text = proxy.text() or ""
        except Exception as exc:  # a proxy that cannot be parsed must not stop the extraction
            text = ""
            pay = f"not available ({exc.__class__.__name__} while reading DEF 14A {proxy.accession_no})"
        first = text.find(PAY_HEADING)
        second = text.find(PAY_HEADING, first + 1) if first >= 0 else -1
        start = second if second >= 0 else first  # the first match is usually the table of contents
        if start >= 0:
            pay = f"# DEF 14A {proxy.accession_no} filed {proxy.filing_date}\n\n{text[start:start + PAY_MAX_CHARS]}"
    (out_dir / "proxy_pay.txt").write_text(pay + "\n")
    written.append("proxy_pay")
    return written
```

`tools/extract/sat_extract/__main__.py`:
```python
"""sat extract TICKER — writes data/<TICKER>/facts.json and data/<TICKER>/sections/*.txt."""
from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path

from .facts import build_facts

REPO = Path(__file__).resolve().parents[3]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="sat extract")
    parser.add_argument("ticker")
    parser.add_argument("--out", default="data")
    parser.add_argument("--years", type=int, default=10)
    parser.add_argument("--save-records", action="store_true", help="also write the raw records (for test fixtures)")
    args = parser.parse_args(argv)

    import edgar
    from .fetch import fetch
    from .sections import write_sections

    out = Path(args.out) / args.ticker.upper()
    company, records, handle = fetch(args.ticker, Path(args.out) / ".edgar-cache")
    mapping = json.loads((REPO / "agent/mapping/line-items.json").read_text())
    facts = build_facts(records, mapping, company, args.years, dt.date.today().isoformat(), edgar.__version__)
    out.mkdir(parents=True, exist_ok=True)
    (out / "facts.json").write_text(json.dumps(facts, indent=2) + "\n")
    if args.save_records:
        (out / "records.json").write_text(json.dumps(records) + "\n")
    sections = write_sections(handle, out / "sections")
    missing = sum(1 for f in facts["facts"] if f["status"] == "not_available")
    print(f"{company['name']} ({company['ticker']}), model fit: {facts['company']['model_fit']}")
    print(f"periods: {', '.join(facts['periods'])}")
    print(f"facts: {len(facts['facts'])} ({missing} not available) → {out / 'facts.json'}")
    print(f"sections: {', '.join(sections)} → {out / 'sections'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

`tools/extract/tests/test_live.py`:
```python
"""Live check against SEC EDGAR. Run with: uv run --project tools/extract pytest -m live"""
import json
import subprocess
import sys

import pytest


@pytest.mark.live
def test_cost_extract(tmp_path):
    subprocess.run([sys.executable, "-m", "sat_extract", "COST", "--out", str(tmp_path)], check=True)
    facts = json.loads((tmp_path / "COST" / "facts.json").read_text())
    get = {(f["item"], f["period_end"]): f for f in facts["facts"]}
    assert get[("revenue", "2025-08-31")]["value"] == 275235000000
    assert get[("capex", "2026-08-30")]["value"] == 6435000000
    assert facts["company"]["model_fit"] == "suitable"
    assert (tmp_path / "COST" / "sections" / "item1a.txt").stat().st_size > 10_000
```

- [ ] **Step 5: Run the offline tests**

Run: `uv run --project tools/extract pytest tools/extract/tests -q`
Expected: `19 passed, 1 deselected`

- [ ] **Step 6: Ask the user for the SEC identity, then run the live test**

Ask the user to run (in their own shell, so the values do not enter the transcript):
```
! export EDGAR_NAME="<name>" EDGAR_EMAIL="<email>"
```
Then run: `uv run --project tools/extract pytest tools/extract/tests -m live -q`
Expected: `1 passed`. If the user prefers not to set an identity now, skip this step and record that the live test was not run.

- [ ] **Step 7: Commit**

```bash
git add tools/extract/sat_extract tools/extract/tests
git commit -m "Add EDGAR fetch, 10-K sections and the extract CLI

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Stage 2 — fact lookup and per-year metrics

**Files:**
- Create: `tools/calc/facts-table.mjs`, `tools/calc/metrics.mjs`, `tools/calc/test/helpers.mjs`, `tools/calc/test/metrics.test.mjs`

**Interfaces:**
- Consumes: `facts.json` format (Task 2); `src/finance/core.js` (`SAT.fin.fcff(ocf, capex, interest, tax, sbc)`).
- Produces:
  - `ZERO_IF_MISSING: string[]`
  - `factTable(facts, adjustmentItems = []) → { get(item, end) → Fact|null }`, where `Fact = {item, period_end, value, tag, flags, period_days, assumed_zero?, adjusted?}`.
  - `calc(key, card, end, formula, named, fn) → Metric`, where `Metric = {key, card, period_end, value, status: 'ok'|'not_available'|'not_meaningful', formula, inputs: [{name,item,period_end,value,assumed_zero?,adjusted?}], missing?: string[]}`.
  - `yearMetrics(facts, T, assumptions) → Metric[]` and `multiYearMetrics(facts, T, assumptions, perYear) → Metric[]`; helper `debtFact(T, end)`, `taxRate(T, end)`, `annualized(f)`.

- [ ] **Step 1: Write the test helper**

`tools/calc/test/helpers.mjs`:
```js
// Build a small facts.json object for tests. rows: { item: [v2023, v2024, v2025], ... }
export const ENDS = ['2023-12-31', '2024-12-31', '2025-12-31'];
export function makeFacts(rows, { ends = ENDS, sic = 5331, tags = {}, flags = {}, days = {} } = {}) {
  const facts = [];
  for (const [item, values] of Object.entries(rows)) {
    values.forEach((value, i) => {
      const end = ends[i];
      facts.push(value == null
        ? { item, period_end: end, period_days: null, value: null, unit: 'USD', status: 'not_available', source: null, flags: [], tried: [] }
        : { item, period_end: end, period_days: days[end] ?? 365, value, unit: 'USD', status: 'reported',
            source: { tag: tags[item] ?? 'us-gaap:Test', form: '10-K', accession: 'A', filed: '2026-02-15' },
            flags: flags[item + '|' + end] ?? [] });
    });
  }
  return { schema_version: 1, company: { ticker: 'TEST', name: 'Test', cik: '0000000001', sic, model_fit: 'suitable' },
           extracted_at: '2026-10-11', edgartools_version: '5.61.1', periods: ends, facts };
}
export const pick = (metrics, key, end = ENDS[2]) => metrics.find((m) => m.key === key && m.period_end === end);
```

- [ ] **Step 2: Write the failing tests**

`tools/calc/test/metrics.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { factTable } from '../facts-table.mjs';
import { yearMetrics, multiYearMetrics, debtFact } from '../metrics.mjs';
import { makeFacts, pick, ENDS } from './helpers.mjs';

const A = { wacc: 0.09, maintenance_capex_ratio: 1.0, lookback_years: 10 };
const BASE = {
  revenue: [100, 110, 121], cost_of_revenue: [60, 66, 72], operating_income: [20, 22, 25], net_income: [14, 15, 18],
  pretax_income: [19, 21, 24], income_tax: [4.75, 5.25, 6], interest_expense: [1, 1, 1], d_and_a: [5, 5, 6],
  ocf: [22, 24, 27], capex: [6, 7, 8], sbc: [1, 1, 2], receivables: [10, 11, 12], inventory: [5, 5, 6], payables: [6, 6, 7],
  current_assets: [40, 42, 45], current_liabilities: [20, 21, 22], total_liabilities: [50, 52, 55], equity: [60, 65, 70],
  cash_sti: [15, 16, 20], long_term_debt: [30, 30, 28], short_term_debt: [2, 2, 2], goodwill: [5, 5, 5], intangibles: [1, 1, 1],
  diluted_avg_shares: [10, 10, 9.8], eps_diluted: [1.4, 1.5, 1.84], maturity_y1: [2, 2, 2], maturity_y2: [3, 3, 3], maturity_y3: [4, 4, 4],
};
const run = (rows = BASE, opts) => { const f = makeFacts(rows, opts); const T = factTable(f); const y = yearMetrics(f, T, A); return [...y, ...multiYearMetrics(f, T, A, y)]; };

test('margins and growth', () => {
  const m = run();
  assert.equal(pick(m, 'gross-margin').value, (121 - 72) / 121);
  assert.equal(pick(m, 'operating-margin').value, 25 / 121);
  assert.ok(Math.abs(pick(m, 'revenue-growth').value - 0.1) < 1e-12);
  assert.equal(pick(m, 'revenue-growth', ENDS[0]).status, 'not_available');
});

test('cash metrics follow the card formulas', () => {
  const m = run();
  assert.equal(pick(m, 'fcf').value, 27 - 8);
  // FCFF = OCF − CapEx + Interest × (1 − tax) − SBC, tax = 6/24 = 0.25
  assert.equal(pick(m, 'fcff').value, 27 - 8 + 1 * 0.75 - 2);
  // ΔOWC = (12+6−7) − (11+5−6) = 1; owner earnings = NI + D&A − maint (= D&A) − ΔOWC
  assert.equal(pick(m, 'owner-earnings').value, 18 + 6 - 6 - 1);
  assert.equal(pick(m, 'earnings-quality').value, 27 / 18);
});

test('balance sheet and per-share metrics', () => {
  const m = run();
  assert.equal(pick(m, 'net-debt').value, 30 - 20);
  assert.equal(pick(m, 'debt-ebitda').value, 30 / 31);
  assert.equal(pick(m, 'interest-coverage').value, 25);
  assert.equal(pick(m, 'tangible-book-value').value, 70 - 0 - 5 - 1);
  assert.equal(pick(m, 'ncav').value, 45 - 55 - 0);
  assert.ok(Math.abs(pick(m, 'dilution').value - (-0.02)) < 1e-12);
  assert.equal(pick(m, 'debt-due-3y').value, 9);
});

test('ROIC uses NOPAT over average invested capital', () => {
  const m = run();
  const ic = (eq, debt, cash) => eq + debt - cash;
  const avg = (ic(65, 32, 16) + ic(70, 30, 20)) / 2;
  assert.equal(pick(m, 'roic').value, (25 * 0.75) / avg);
});

test('preferred and goodwill are assumed zero and marked', () => {
  const m = run();
  const input = pick(m, 'tangible-book-value').inputs.find((i) => i.name === 'preferred');
  assert.equal(input.value, 0); assert.equal(input.assumed_zero, true);
});

test('debt falls back to convertible notes', () => {
  const rows = { ...BASE, long_term_debt: [null, null, null], convertible_debt: [10, 10, 10] };
  const f = makeFacts(rows); const T = factTable(f);
  assert.equal(debtFact(T, ENDS[2]).value, 12);
});

test('missing debt is not zero', () => {
  const rows = { ...BASE, long_term_debt: [null, null, null] };
  const m = run(rows);
  assert.equal(pick(m, 'net-debt').status, 'not_available');
  assert.deepEqual(pick(m, 'net-debt').missing, ['debt']);
});

test('LongTermDebt includes the current part, so the current part is not added again', () => {
  const f = makeFacts(BASE, { tags: { long_term_debt: 'us-gaap:LongTermDebt', short_term_debt: 'us-gaap:LongTermDebtCurrent' } });
  assert.equal(debtFact(factTable(f), ENDS[2]).value, 28);
});

test('P/E and ratios with a loss are not meaningful', () => {
  const rows = { ...BASE, net_income: [14, 15, -3], operating_income: [20, 22, 0] };
  const m = run(rows);
  assert.equal(pick(m, 'earnings-quality').status, 'not_meaningful');
  assert.equal(pick(m, 'interest-coverage').value, 0);
  assert.equal(pick(m, 'debt-ebitda').status, 'ok');
});

test('long years are annualized for growth', () => {
  const m = run(BASE, { days: { '2025-12-31': 371 }, flags: { 'revenue|2025-12-31': ['long_year'] } });
  assert.ok(Math.abs(pick(m, 'revenue-growth').value - (121 * 364 / 371 / 110 - 1)) < 1e-12);
  assert.match(pick(m, 'revenue-growth').formula, /annualized/);
});

test('multi-year metrics', () => {
  const m = run();
  assert.ok(Math.abs(pick(m, 'revenue-cagr-2').value - 0.1) < 1e-12);
  assert.equal(pick(m, 'roic-years-above-wacc').value, 3);
  assert.equal(pick(m, 'normalized-net-income').value, (14 + 15 + 18) / 3);
});

test('adjustments change the value and are marked', () => {
  const f = makeFacts(BASE);
  const T = factTable(f, [{ item: 'operating_income', period_end: ENDS[2], delta: 5, reason: 'r', source: 's' }]);
  const m = yearMetrics(f, T, A);
  assert.equal(pick(m, 'operating-margin').value, 30 / 121);
  assert.equal(pick(m, 'operating-margin').inputs.find((i) => i.name === 'operating_income').adjusted, true);
});
```

- [ ] **Step 3: Run the tests to make sure they fail**

Run: `node --test 'tools/calc/test/*.test.mjs'`
Expected: FAIL with `Cannot find module '…/tools/calc/facts-table.mjs'`

- [ ] **Step 4: Write `facts-table.mjs`**

`tools/calc/facts-table.mjs`:
```js
// Lookup of facts.json values with adjustments. Only the items below may be treated as zero when missing;
// each such input is marked assumed_zero so the analysis can say so.
export const ZERO_IF_MISSING = ['preferred', 'minority_interest', 'goodwill', 'intangibles', 'short_term_debt',
  'acquisitions', 'sbc', 'interest_expense', 'inventory', 'debt_issued', 'debt_repaid', 'dividends', 'buybacks'];

export function factTable(facts, adjustmentItems = []) {
  const table = new Map();
  for (const f of facts.facts) table.set(f.item + '|' + f.period_end, f);
  const adjustments = new Map(adjustmentItems.map((a) => [a.item + '|' + a.period_end, a]));
  return {
    get(item, end) {
      const f = table.get(item + '|' + end), a = adjustments.get(item + '|' + end);
      const delta = a ? a.delta : 0;
      if (!f || f.status === 'not_available') {
        if (!ZERO_IF_MISSING.includes(item)) return null;
        return { item, period_end: end, value: delta, tag: null, flags: [], period_days: null, assumed_zero: true, ...(a ? { adjusted: true } : {}) };
      }
      return { item, period_end: end, value: f.value + delta, tag: f.source?.tag ?? null, flags: f.flags || [],
               period_days: f.period_days ?? null, ...(a ? { adjusted: true } : {}) };
    },
  };
}
```

- [ ] **Step 5: Write `metrics.mjs`**

`tools/calc/metrics.mjs`:
```js
// Stage 2 metrics. Keys are metric names; `card` is the handbook concept ID.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const SAT = require('../../src/finance/core.js');
const F = SAT.fin;
const ok = (v) => typeof v === 'number' && Number.isFinite(v);

export function calc(key, card, end, formula, named, fn) {
  const entries = Object.entries(named);
  const missing = entries.filter(([, f]) => f == null).map(([name]) => name);
  const inputs = entries.filter(([, f]) => f != null).map(([name, f]) => ({
    name, item: f.item ?? name, period_end: f.period_end ?? end, value: f.value,
    ...(f.assumed_zero ? { assumed_zero: true } : {}), ...(f.adjusted ? { adjusted: true } : {}), ...(f.estimate ? { estimate: f.estimate } : {}),
  }));
  if (missing.length) return { key, card, period_end: end, value: null, status: 'not_available', formula, inputs, missing };
  const v = fn(Object.fromEntries(entries.map(([name, f]) => [name, f.value])));
  return { key, card, period_end: end, value: ok(v) ? v : null, status: ok(v) ? 'ok' : 'not_meaningful', formula, inputs };
}

const derived = (item, end, value) => (ok(value) ? { item, period_end: end, value } : null);

// Total debt. LongTermDebt (unlike LongTermDebtNoncurrent) already includes the current part.
// Convertible notes are used only when no long-term debt tag exists, to avoid counting them twice.
export function debtFact(T, end) {
  const lt = T.get('long_term_debt', end), conv = T.get('convertible_debt', end), st = T.get('short_term_debt', end);
  const long = lt ?? conv;
  if (!long) return null;
  const includesCurrent = lt?.tag === 'us-gaap:LongTermDebt';
  const short = includesCurrent ? (st.tag === 'us-gaap:ShortTermBorrowings' ? st.value : 0) : st.value;
  return { item: 'debt', period_end: end, value: long.value + short };
}

// Effective tax rate, limited to 0–35 %. Without data: 21 % (US federal rate), marked as an estimate.
export function taxRate(T, end) {
  const tax = T.get('income_tax', end), pre = T.get('pretax_income', end);
  if (tax && pre && pre.value > 0) return { item: 'tax_rate', period_end: end, value: Math.min(0.35, Math.max(0, tax.value / pre.value)) };
  return { item: 'tax_rate', period_end: end, value: 0.21, estimate: 'US federal rate; no usable effective rate' };
}

// 53-week years are scaled to 364 days for growth rates.
export const annualized = (f) => (f && f.flags.includes('long_year') && f.period_days ? { ...f, value: (f.value * 364) / f.period_days } : f);

function owc(T, end) {
  const r = T.get('receivables', end), i = T.get('inventory', end), p = T.get('payables', end);
  return r && i && p ? { item: 'operating_working_capital', period_end: end, value: r.value + i.value - p.value } : null;
}

function investedCapital(T, end) {
  const eq = T.get('equity', end), debt = debtFact(T, end), cash = T.get('cash_sti', end);
  return eq && debt && cash ? derived('invested_capital', end, eq.value + debt.value - cash.value) : null;
}

export function yearMetrics(facts, T, A) {
  const out = [];
  facts.periods.forEach((end, i) => {
    const prev = i > 0 ? facts.periods[i - 1] : null;
    const g = (item) => T.get(item, end), gp = (item) => (prev ? T.get(item, prev) : null);
    const rev = g('revenue'), ni = g('net_income'), oi = g('operating_income'), ocf = g('ocf'), capex = g('capex');
    const da = g('d_and_a'), tax = taxRate(T, end), debt = debtFact(T, end), cash = g('cash_sti');
    const long = rev?.flags.includes('long_year') || (prev && gp('revenue')?.flags.includes('long_year'));
    const grossProfit = g('gross_profit') ?? (rev && g('cost_of_revenue') ? derived('gross_profit', end, rev.value - g('cost_of_revenue').value) : null);
    const ebitda = oi && da ? derived('ebitda', end, oi.value + da.value) : null;
    const dOwc = prev && owc(T, end) && owc(T, prev) ? derived('change_in_owc', end, owc(T, end).value - owc(T, prev).value) : null;
    const ic = investedCapital(T, end), icPrev = prev ? investedCapital(T, prev) : null;
    const avgIc = ic && icPrev ? derived('average_invested_capital', end, (ic.value + icPrev.value) / 2) : ic;

    out.push(
      calc('revenue-growth', 'revenue', end, 'Revenue / Previous revenue − 1' + (long ? ' (annualized: 53-week year scaled to 364 days)' : ''),
        { revenue: annualized(rev), previous_revenue: prev ? annualized(gp('revenue')) : null }, (v) => v.revenue / v.previous_revenue - 1),
      calc('gross-margin', 'gross-margin', end, 'Gross profit / Revenue', { gross_profit: grossProfit, revenue: rev }, (v) => v.gross_profit / v.revenue),
      calc('operating-margin', 'operating-margin', end, 'Operating income / Revenue', { operating_income: oi, revenue: rev }, (v) => v.operating_income / v.revenue),
      calc('net-margin', 'net-margin', end, 'Net income / Revenue', { net_income: ni, revenue: rev }, (v) => v.net_income / v.revenue),
      calc('fcf', 'fcf', end, 'OCF − CapEx', { ocf, capex }, (v) => v.ocf - Math.abs(v.capex)),
      calc('fcf-margin', 'fcf-margin', end, '(OCF − CapEx) / Revenue', { ocf, capex, revenue: rev }, (v) => (v.ocf - Math.abs(v.capex)) / v.revenue),
      calc('fcff', 'fcff', end, 'OCF + Interest × (1 − Tax rate) − CapEx − SBC', { ocf, capex, interest_expense: g('interest_expense'), tax_rate: tax, sbc: g('sbc') },
        (v) => F.fcff(v.ocf, v.capex, v.interest_expense, v.tax_rate, v.sbc)),
      calc('fcfe', 'fcfe', end, 'Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)',
        { net_income: ni, d_and_a: da, capex, change_in_owc: dOwc, debt_issued: g('debt_issued'), debt_repaid: g('debt_repaid') },
        (v) => v.net_income + v.d_and_a - Math.abs(v.capex) - v.change_in_owc + v.debt_issued - v.debt_repaid),
      calc('owner-earnings', 'owner-earnings', end, `Net income + D&A − Maintenance CapEx (${A.maintenance_capex_ratio} × D&A) − ΔOperating working capital`,
        { net_income: ni, d_and_a: da, change_in_owc: dOwc }, (v) => v.net_income + v.d_and_a - A.maintenance_capex_ratio * v.d_and_a - v.change_in_owc),
      calc('earnings-quality', 'earnings-quality', end, 'OCF / Net income (only when net income > 0)', { ocf, net_income: ni },
        (v) => (v.net_income > 0 ? v.ocf / v.net_income : NaN)),
      calc('ebitda', 'ebitda', end, 'Operating income + D&A', { operating_income: oi, d_and_a: da }, (v) => v.operating_income + v.d_and_a),
      calc('nopat', 'nopat', end, 'Operating income × (1 − Tax rate)', { operating_income: oi, tax_rate: tax }, (v) => F.nopat(v.operating_income, v.tax_rate)),
      calc('invested-capital', 'invested-capital', end, 'Equity + Debt − Cash', { equity: g('equity'), debt, cash_sti: cash }, (v) => v.equity + v.debt - v.cash_sti),
      calc('roic', 'roic', end, 'NOPAT / Average invested capital (only when invested capital > 0)', { operating_income: oi, tax_rate: tax, average_invested_capital: avgIc },
        (v) => (v.average_invested_capital > 0 ? F.nopat(v.operating_income, v.tax_rate) / v.average_invested_capital : NaN)),
      calc('net-debt', 'net-debt', end, 'Debt − Cash', { debt, cash_sti: cash }, (v) => v.debt - v.cash_sti),
      calc('debt-ebitda', 'debt-ebitda', end, 'Debt / EBITDA (only when EBITDA > 0)', { debt, ebitda }, (v) => (v.ebitda > 0 ? v.debt / v.ebitda : NaN)),
      calc('interest-coverage', 'interest-coverage', end, 'Operating income / Interest expense (only when interest > 0)', { operating_income: oi, interest_expense: g('interest_expense') },
        (v) => (v.interest_expense > 0 ? v.operating_income / v.interest_expense : NaN)),
      calc('current-ratio', 'current-ratio', end, 'Current assets / Current liabilities', { current_assets: g('current_assets'), current_liabilities: g('current_liabilities') },
        (v) => v.current_assets / v.current_liabilities),
      calc('tangible-book-value', 'tangible-book-value', end, 'Equity − Preferred − Goodwill − Intangibles',
        { equity: g('equity'), preferred: g('preferred'), goodwill: g('goodwill'), intangibles: g('intangibles') }, (v) => v.equity - v.preferred - v.goodwill - v.intangibles),
      calc('ncav', 'ncav', end, 'Current assets − Total liabilities − Preferred', { current_assets: g('current_assets'), total_liabilities: g('total_liabilities'), preferred: g('preferred') },
        (v) => v.current_assets - v.total_liabilities - v.preferred),
      calc('dilution', 'dilution', end, 'Diluted shares / Previous diluted shares − 1', { diluted_avg_shares: g('diluted_avg_shares'), previous_shares: gp('diluted_avg_shares') },
        (v) => v.diluted_avg_shares / v.previous_shares - 1),
      calc('sbc-to-revenue', 'dilution', end, 'SBC / Revenue', { sbc: g('sbc'), revenue: rev }, (v) => v.sbc / v.revenue),
      calc('eps', 'eps', end, 'Reported diluted EPS', { eps_diluted: g('eps_diluted') }, (v) => v.eps_diluted),
      calc('debt-due-3y', 'refinancing-risk', end, 'Debt maturities in years 1 + 2 + 3', { maturity_y1: g('maturity_y1'), maturity_y2: g('maturity_y2'), maturity_y3: g('maturity_y3') },
        (v) => v.maturity_y1 + v.maturity_y2 + v.maturity_y3),
    );
  });
  return out;
}

export function multiYearMetrics(facts, T, A, perYear) {
  const ends = facts.periods, last = ends[ends.length - 1], out = [];
  const year = (key, end) => perYear.find((m) => m.key === key && m.period_end === end);
  // 5-year CAGR and the longest available span (with 3 periods: only 2 years; with 10 periods: 5 and 9 years).
  const spans = [...new Set([5, ends.length - 1].filter((n) => n >= 1 && n < ends.length))];
  for (const n of spans) {
    const first = ends[ends.length - 1 - n];
    out.push(calc(`revenue-cagr-${n}`, 'revenue', last, `(Revenue / Revenue ${n} years earlier)^(1/${n}) − 1 (53-week years annualized)`,
      { revenue: annualized(T.get('revenue', last)), first_revenue: annualized(T.get('revenue', first)) },
      (v) => (v.first_revenue > 0 && v.revenue > 0 ? (v.revenue / v.first_revenue) ** (1 / n) - 1 : NaN)));
  }
  const first = ends[0], span = ends.length - 1;
  out.push(calc('diluted-shares-change', 'dilution', last, `Diluted shares / Diluted shares ${span} years earlier − 1`,
    { diluted_avg_shares: T.get('diluted_avg_shares', last), first_shares: T.get('diluted_avg_shares', first) }, (v) => v.diluted_avg_shares / v.first_shares - 1));
  const back = Math.min(5, span);
  if (back > 0) {
    const from = ends[ends.length - 1 - back], n1 = year('nopat', last), n0 = year('nopat', from), i1 = year('invested-capital', last), i0 = year('invested-capital', from);
    const val = (m) => (m && m.status === 'ok' ? { item: m.key, period_end: m.period_end, value: m.value } : null);
    out.push(calc(`incremental-roic-${back}`, 'incremental-roic', last, `ΔNOPAT / ΔInvested capital over ${back} years (only when ΔIC > 0)`,
      { nopat: val(n1), first_nopat: val(n0), invested_capital: val(i1), first_invested_capital: val(i0) },
      (v) => (v.invested_capital - v.first_invested_capital > 0 ? (v.nopat - v.first_nopat) / (v.invested_capital - v.first_invested_capital) : NaN)));
  }
  const roics = ends.slice(-A.lookback_years).map((e) => year('roic', e)).filter((m) => m && m.status === 'ok');
  out.push({ key: 'roic-years-above-wacc', card: 'roic', period_end: last, value: roics.filter((m) => m.value > A.wacc).length,
    status: roics.length ? 'ok' : 'not_available', formula: `Count of years with ROIC > WACC (${A.wacc}) in the last ${A.lookback_years} years`,
    inputs: roics.map((m) => ({ name: 'roic', item: 'roic', period_end: m.period_end, value: m.value })) });
  const nis = ends.slice(-5).map((e) => T.get('net_income', e));
  out.push(calc('normalized-net-income', 'normalized-earnings', last, `Average net income of the last ${nis.length} years (mid-cycle proxy)`,
    Object.fromEntries(nis.map((f, i) => [`net_income_${i + 1}`, f])), (v) => Object.values(v).reduce((s, x) => s + x, 0) / nis.length));
  return out;
}
```

- [ ] **Step 6: Run the tests to make sure they pass**

Run: `node --test 'tools/calc/test/*.test.mjs'`
Expected: all tests pass (`# fail 0`).

- [ ] **Step 7: Commit**

```bash
git add tools/calc
git commit -m "Add stage 2 fact lookup and per-year metrics from the handbook formulas

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Valuation metrics

**Files:**
- Create: `tools/calc/valuation.mjs`, `tools/calc/test/valuation.test.mjs`

**Interfaces:**
- Consumes: `calc`, `debtFact` (Task 4); `SAT.fin.forecast`, `SAT.fin.dcfFlows`.
- Produces: `valuationMetrics(facts, T, A, perYear, multi, price) → Metric[]` where `price = {value:number, date:string} | null` and `A.dcf = {years, growth_cap, growth_delta:{bear,bull}, terminal_growth:{bear,base,bull}, base_growth?}`, `A.wacc`, `A.normal_pe`. Keys: `market-cap`, `enterprise-value`, `pe`, `ev-ebitda`, `fcf-yield`, `dcf-value-bear|base|bull`, `reverse-dcf-growth`, `earnings-value-per-share`, `tbv-per-share`, `ncav-per-share`, `margin-of-safety-base`, `margin-of-safety-bear`.

- [ ] **Step 1: Write the failing tests**

`tools/calc/test/valuation.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { factTable } from '../facts-table.mjs';
import { yearMetrics, multiYearMetrics } from '../metrics.mjs';
import { valuationMetrics } from '../valuation.mjs';
import { makeFacts, pick, ENDS } from './helpers.mjs';
const SAT = createRequire(import.meta.url)('../../../src/finance/core.js');

const A = { wacc: 0.09, normal_pe: 15, maintenance_capex_ratio: 1, lookback_years: 10,
  dcf: { years: 10, growth_cap: 0.10, growth_delta: { bear: -0.05, bull: 0.03 }, terminal_growth: { bear: 0.02, base: 0.025, bull: 0.03 } } };
const ROWS = {
  revenue: [100, 110, 121], operating_income: [20, 22, 25], net_income: [14, 15, 18], pretax_income: [19, 21, 24], income_tax: [4.75, 5.25, 6],
  interest_expense: [1, 1, 1], d_and_a: [5, 5, 6], ocf: [22, 24, 27], capex: [6, 7, 8], sbc: [1, 1, 2],
  current_assets: [40, 42, 45], total_liabilities: [50, 52, 55], equity: [60, 65, 70], cash_sti: [15, 16, 20],
  long_term_debt: [30, 30, 28], short_term_debt: [2, 2, 2], shares_outstanding: [10, 10, 10],
};
function run(price, a = A, rows = ROWS) {
  const f = makeFacts(rows), T = factTable(f), y = yearMetrics(f, T, a), m = multiYearMetrics(f, T, a, y);
  return valuationMetrics(f, T, a, y, m, price);
}
const P = { value: 50, date: '2026-10-10' };

test('price-based multiples', () => {
  const v = run(P);
  assert.equal(pick(v, 'market-cap').value, 500);
  assert.equal(pick(v, 'enterprise-value').value, 500 + 30 - 20);
  assert.equal(pick(v, 'pe').value, 500 / 18);
  assert.equal(pick(v, 'fcf-yield').value, 19 / 500);
});

test('DCF base case matches core.js with FCFF0 = 3-year average and capped growth', () => {
  const v = run(P);
  const fcff = [22 - 6 + 1 * 0.75 - 1, 24 - 7 + 1 * 0.75 - 1, 27 - 8 + 1 * 0.75 - 2];
  const fcff0 = fcff.reduce((s, x) => s + x, 0) / 3;
  const g = Math.min(0.10, 0.1); // revenue CAGR over 2 years = 10 %
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.forecast(fcff0, g, 10), r: 0.09, tg: 0.025, debt: 30, cash: 20, shares: 10, price: 50 });
  assert.ok(Math.abs(pick(v, 'dcf-value-base').value - d.fv) < 1e-9);
  assert.ok(pick(v, 'dcf-value-bear').value < pick(v, 'dcf-value-base').value);
  assert.ok(pick(v, 'dcf-value-bull').value > pick(v, 'dcf-value-base').value);
});

test('reverse DCF finds the growth that the price implies', () => {
  const v = run(P);
  const g = pick(v, 'reverse-dcf-growth').value;
  const fcff0 = pick(v, 'dcf-value-base').inputs.find((i) => i.name === 'fcff0').value;
  const d = SAT.fin.dcfFlows({ flows: SAT.fin.forecast(fcff0, g, 10), r: 0.09, tg: 0.025, debt: 30, cash: 20, shares: 10 });
  assert.ok(Math.abs(d.fv - 50) < 1e-4);
});

test('margin of safety uses the card formula', () => {
  const v = run(P), fv = pick(v, 'dcf-value-base').value;
  assert.ok(Math.abs(pick(v, 'margin-of-safety-base').value - (fv - 50) / fv) < 1e-12);
});

test('asset floors per share', () => {
  const v = run(P);
  assert.equal(pick(v, 'tbv-per-share').value, 7);
  assert.equal(pick(v, 'ncav-per-share').value, -1);
  assert.equal(pick(v, 'earnings-value-per-share').value, ((14 + 15 + 18) / 3) * 15 / 10);
});

test('no price: price metrics are not available, DCF value still works', () => {
  const v = run(null);
  assert.equal(pick(v, 'market-cap').status, 'not_available');
  assert.equal(pick(v, 'margin-of-safety-base').status, 'not_available');
  assert.equal(pick(v, 'dcf-value-base').status, 'ok');
});

test('discount rate not above terminal growth is not meaningful', () => {
  const v = run(P, { ...A, wacc: 0.02 });
  assert.equal(pick(v, 'dcf-value-base').status, 'not_meaningful');
});

test('negative FCFF0 is not meaningful', () => {
  const v = run(P, A, { ...ROWS, ocf: [1, 1, 1] });
  assert.equal(pick(v, 'dcf-value-base').status, 'not_meaningful');
  assert.equal(pick(v, 'reverse-dcf-growth').status, 'not_meaningful');
});
```

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `node --test tools/calc/test/valuation.test.mjs`
Expected: FAIL with `Cannot find module '…/tools/calc/valuation.mjs'`

- [ ] **Step 3: Write `valuation.mjs`**

`tools/calc/valuation.mjs`:
```js
// Price-based metrics, FCFF DCF scenarios, reverse DCF and margin of safety.
import { createRequire } from 'node:module';
import { calc, debtFact } from './metrics.mjs';
const SAT = createRequire(import.meta.url)('../../src/finance/core.js');
const F = SAT.fin;

const okMetric = (m) => (m && m.status === 'ok' ? { item: m.key, period_end: m.period_end, value: m.value } : null);

function dcfPerShare(fcff0, g, r, tg, years, claims, cash, shares) {
  const d = F.dcfFlows({ flows: F.forecast(fcff0, g, years), r, tg, debt: claims, cash, shares });
  return d.valid ? d.fv : NaN;
}

function impliedGrowth(target, fcff0, r, tg, years, claims, cash, shares) {
  if (!(fcff0 > 0)) return NaN;
  let lo = -0.5, hi = 0.5;
  const f = (g) => dcfPerShare(fcff0, g, r, tg, years, claims, cash, shares) - target;
  if (!(f(lo) < 0 && f(hi) > 0)) return NaN;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) hi = mid; else lo = mid; }
  return (lo + hi) / 2;
}

export function valuationMetrics(facts, T, A, perYear, multi, price) {
  const ends = facts.periods, last = ends[ends.length - 1], D = A.dcf;
  const year = (key, end = last) => perYear.find((m) => m.key === key && m.period_end === end);
  const px = price && Number.isFinite(price.value) ? { item: 'price', period_end: price.date, value: price.value } : null;
  const shares = T.get('shares_outstanding', last), debt = debtFact(T, last), cash = T.get('cash_sti', last);
  const minority = T.get('minority_interest', last), preferred = T.get('preferred', last);
  const claims = debt ? { item: 'debt_and_other_claims', period_end: last, value: debt.value + minority.value + preferred.value } : null;
  const mcap = px && shares ? { item: 'market_cap', period_end: last, value: px.value * shares.value } : null;
  const out = [];

  out.push(
    calc('market-cap', 'market-cap', last, 'Price × Shares outstanding', { price: px, shares_outstanding: shares }, (v) => v.price * v.shares_outstanding),
    calc('enterprise-value', 'enterprise-value', last, 'Market cap + Debt − Cash + Minority interest + Preferred',
      { market_cap: mcap, debt, cash_sti: cash, minority_interest: minority, preferred }, (v) => v.market_cap + v.debt - v.cash_sti + v.minority_interest + v.preferred),
    calc('pe', 'pe', last, 'Market cap / Net income (only when net income > 0)', { market_cap: mcap, net_income: T.get('net_income', last) },
      (v) => (v.net_income > 0 ? v.market_cap / v.net_income : NaN)),
    calc('ev-ebitda', 'ev-ebitda', last, 'EV / EBITDA (only when EBITDA > 0)', { market_cap: mcap, debt, cash_sti: cash, ebitda: okMetric(year('ebitda')) },
      (v) => (v.ebitda > 0 ? (v.market_cap + v.debt - v.cash_sti) / v.ebitda : NaN)),
    calc('fcf-yield', 'fcf-yield', last, 'FCF / Market cap', { fcf: okMetric(year('fcf')), market_cap: mcap }, (v) => v.fcf / v.market_cap),
  );

  const fcffs = ends.slice(-3).map((e) => okMetric(year('fcff', e)));
  const fcff0 = fcffs.every(Boolean) ? { item: 'fcff0', period_end: last, value: fcffs.reduce((s, f) => s + f.value, 0) / fcffs.length } : null;
  const cagr = multi.find((m) => m.key === 'revenue-cagr-5') ?? multi.find((m) => m.key.startsWith('revenue-cagr-'));
  const baseGrowth = D.base_growth != null
    ? { item: 'base_growth', period_end: last, value: D.base_growth, estimate: 'set in assumptions' }
    : cagr && cagr.status === 'ok' ? { item: 'base_growth', period_end: last, value: Math.min(cagr.value, D.growth_cap) } : null;
  const scenario = { bear: D.growth_delta.bear, base: 0, bull: D.growth_delta.bull };
  const fv = {};
  for (const name of ['bear', 'base', 'bull']) {
    const g = baseGrowth ? { item: 'growth', period_end: last, value: baseGrowth.value + scenario[name] } : null;
    const tg = D.terminal_growth[name];
    fv[name] = calc(`dcf-value-${name}`, 'fair-value-per-share', last,
      `FCFF DCF, ${D.years} years, FCFF0 = 3-year average FCFF, growth = base ${scenario[name] >= 0 ? '+' : '−'} ${Math.abs(scenario[name])}, WACC ${A.wacc}, terminal growth ${tg}`,
      { fcff0, growth: g, debt_and_other_claims: claims, cash_sti: cash, shares_outstanding: shares },
      (v) => (v.fcff0 > 0 ? dcfPerShare(v.fcff0, v.growth, A.wacc, tg, D.years, v.debt_and_other_claims, v.cash_sti, v.shares_outstanding) : NaN));
    out.push(fv[name]);
  }
  out.push(calc('reverse-dcf-growth', 'reverse-dcf', last, `Growth for ${D.years} years that makes the base DCF value equal the price`,
    { price: px, fcff0, debt_and_other_claims: claims, cash_sti: cash, shares_outstanding: shares },
    (v) => impliedGrowth(v.price, v.fcff0, A.wacc, D.terminal_growth.base, D.years, v.debt_and_other_claims, v.cash_sti, v.shares_outstanding)));

  const normal = multi.find((m) => m.key === 'normalized-net-income');
  out.push(
    calc('earnings-value-per-share', 'normalized-earnings', last, `Normalized net income × ${A.normal_pe} / Shares`,
      { normalized_net_income: okMetric(normal), shares_outstanding: shares }, (v) => (v.normalized_net_income * A.normal_pe) / v.shares_outstanding),
    calc('tbv-per-share', 'tangible-book-value', last, 'Tangible book value / Shares', { tangible_book_value: okMetric(year('tangible-book-value')), shares_outstanding: shares },
      (v) => v.tangible_book_value / v.shares_outstanding),
    calc('ncav-per-share', 'ncav', last, 'NCAV / Shares', { ncav: okMetric(year('ncav')), shares_outstanding: shares }, (v) => v.ncav / v.shares_outstanding),
  );
  for (const name of ['base', 'bear']) {
    out.push(calc(`margin-of-safety-${name}`, 'margin-of-safety', last, `(DCF value ${name} − Price) / DCF value ${name} (only when value > 0)`,
      { value: okMetric(fv[name]), price: px }, (v) => (v.value > 0 ? (v.value - v.price) / v.value : NaN)));
  }
  return out;
}
```

- [ ] **Step 4: Run the tests to make sure they pass**

Run: `node --test 'tools/calc/test/*.test.mjs'`
Expected: `# fail 0`

- [ ] **Step 5: Commit**

```bash
git add tools/calc/valuation.mjs tools/calc/test/valuation.test.mjs
git commit -m "Add valuation metrics: FCFF DCF scenarios, reverse DCF and margin of safety

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Policy file, `sat calc` CLI and default-versus-adjusted values

**Files:**
- Create: `agent/policy.json`, `tools/calc/cli.mjs`, `tools/calc/test/cli.test.mjs`

**Interfaces:**
- Consumes: Tasks 4–5.
- Produces:
  - `computeAll(facts, {policy, adjustments, price}) → metricsJson` with shape `{schema_version:1, company, periods, price, assumptions, adjustments, facts_extracted_at, metrics: Metric[]}`; each metric changed by adjustments has `default_value`.
  - `main(argv: string[]) → number` (exit code). `sat calc TICKER [--data data] [--price N --price-date YYYY-MM-DD] [--adjust file] [--policy agent/policy.json]`.

- [ ] **Step 1: Create the policy file**

`agent/policy.json`:
```json
{
  "required_margin_of_safety": { "5": 0.20, "4": 0.25, "3": 0.40, "2": null, "1": null },
  "max_debt_to_ebitda": 3.0,
  "min_interest_coverage": 5,
  "min_roic_years_above_wacc": 7,
  "lookback_years": 10,
  "valuation": {
    "wacc": 0.09,
    "normal_pe": 15,
    "maintenance_capex_ratio": 1.0,
    "dcf": {
      "years": 10,
      "growth_cap": 0.10,
      "growth_delta": { "bear": -0.05, "bull": 0.03 },
      "terminal_growth": { "bear": 0.02, "base": 0.025, "bull": 0.03 }
    }
  }
}
```

- [ ] **Step 2: Write the failing tests**

`tools/calc/test/cli.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { computeAll, main } from '../cli.mjs';
import { makeFacts, ENDS } from './helpers.mjs';

const policy = JSON.parse(readFileSync(new URL('../../../agent/policy.json', import.meta.url)));
const facts = makeFacts({ revenue: [100, 110, 121], operating_income: [20, 22, 25], net_income: [14, 15, 18] });

test('default value is kept when an adjustment changes a metric', () => {
  const out = computeAll(facts, { policy, price: null,
    adjustments: { items: [{ item: 'operating_income', period_end: ENDS[2], delta: 5, reason: 'one-time charge', source: '10-K note 9' }], assumptions: {} } });
  const m = out.metrics.find((x) => x.key === 'operating-margin' && x.period_end === ENDS[2]);
  assert.equal(m.value, 30 / 121); assert.equal(m.default_value, 25 / 121);
  assert.equal(out.adjustments.items.length, 1);
});

test('assumptions override policy valuation values', () => {
  const out = computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: { wacc: 0.1, dcf: { years: 5 } } } });
  assert.equal(out.assumptions.wacc, 0.1);
  assert.equal(out.assumptions.dcf.years, 5);
  assert.equal(out.assumptions.dcf.growth_cap, 0.10);
});

test('the result is the same each time', () => {
  const a = JSON.stringify(computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: {} } }));
  const b = JSON.stringify(computeAll(facts, { policy, price: null, adjustments: { items: [], assumptions: {} } }));
  assert.equal(a, b);
});

test('CLI writes metrics.json and rejects adjustments without a reason', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sat-calc-'));
  mkdirSync(join(dir, 'TEST'));
  writeFileSync(join(dir, 'TEST', 'facts.json'), JSON.stringify(facts));
  assert.equal(main(['TEST', '--data', dir, '--price', '50', '--price-date', '2026-10-10']), 0);
  const out = JSON.parse(readFileSync(join(dir, 'TEST', 'metrics.json')));
  assert.deepEqual(out.price, { value: 50, date: '2026-10-10' });
  writeFileSync(join(dir, 'adj.json'), JSON.stringify({ items: [{ item: 'net_income', period_end: ENDS[2], delta: 1 }] }));
  assert.equal(main(['TEST', '--data', dir, '--adjust', join(dir, 'adj.json')]), 1);
  assert.equal(main(['TEST', '--data', dir, '--price', '50']), 1); // price needs a date
});
```

- [ ] **Step 3: Run the tests to make sure they fail**

Run: `node --test tools/calc/test/cli.test.mjs`
Expected: FAIL with `Cannot find module '…/tools/calc/cli.mjs'`

- [ ] **Step 4: Write `cli.mjs`**

`tools/calc/cli.mjs`:
```js
// sat calc TICKER — reads data/<T>/facts.json, writes data/<T>/metrics.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { factTable } from './facts-table.mjs';
import { yearMetrics, multiYearMetrics } from './metrics.mjs';
import { valuationMetrics } from './valuation.mjs';

const merge = (base, over) => {
  const out = { ...base };
  for (const [k, v] of Object.entries(over || {})) out[k] = v && typeof v === 'object' && !Array.isArray(v) && base[k] ? merge(base[k], v) : v;
  return out;
};

function run(facts, A, items, price) {
  const T = factTable(facts, items);
  const y = yearMetrics(facts, T, A), m = multiYearMetrics(facts, T, A, y);
  return [...y, ...m, ...valuationMetrics(facts, T, A, y, m, price)];
}

export function computeAll(facts, { policy, adjustments = { items: [], assumptions: {} }, price = null }) {
  const A = merge({ ...policy.valuation, lookback_years: policy.lookback_years }, adjustments.assumptions);
  const items = adjustments.items || [];
  const metrics = run(facts, A, items, price);
  if (items.length) {
    const base = new Map(run(facts, A, [], price).map((m) => [m.key + '|' + m.period_end, m.value]));
    for (const m of metrics) { const d = base.get(m.key + '|' + m.period_end); if (d !== m.value) m.default_value = d ?? null; }
  }
  return { schema_version: 1, company: facts.company, periods: facts.periods, price, assumptions: A,
    adjustments: { items, assumptions: adjustments.assumptions || {} }, facts_extracted_at: facts.extracted_at, metrics };
}

export function main(argv) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: {
    data: { type: 'string', default: 'data' }, price: { type: 'string' }, 'price-date': { type: 'string' },
    adjust: { type: 'string' }, policy: { type: 'string', default: 'agent/policy.json' } } });
  const ticker = (positionals[0] || '').toUpperCase();
  if (!ticker) { console.error('Usage: sat calc TICKER [--price N --price-date YYYY-MM-DD] [--adjust file]'); return 1; }
  if (values.price && !/^\d{4}-\d{2}-\d{2}$/.test(values['price-date'] || '')) { console.error('--price needs --price-date YYYY-MM-DD'); return 1; }
  const price = values.price ? { value: Number(values.price), date: values['price-date'] } : null;
  if (price && !(price.value > 0)) { console.error('--price must be a positive number'); return 1; }
  const adjustments = values.adjust ? JSON.parse(readFileSync(values.adjust, 'utf8')) : { items: [], assumptions: {} };
  const bad = (adjustments.items || []).filter((a) => !a.reason || !a.source || !Number.isFinite(a.delta));
  if (bad.length) { console.error(`Each adjustment needs a numeric delta, a reason and a source: ${JSON.stringify(bad)}`); return 1; }
  const dir = join(values.data, ticker);
  const facts = JSON.parse(readFileSync(join(dir, 'facts.json'), 'utf8'));
  const policy = JSON.parse(readFileSync(values.policy, 'utf8'));
  const out = computeAll(facts, { policy, adjustments, price });
  writeFileSync(join(dir, 'metrics.json'), JSON.stringify(out, null, 2) + '\n');
  const count = (s) => out.metrics.filter((m) => m.status === s).length;
  console.log(`${out.metrics.length} metrics: ${count('ok')} ok, ${count('not_available')} not available, ${count('not_meaningful')} not meaningful → ${join(dir, 'metrics.json')}`);
  return 0;
}
```

- [ ] **Step 5: Run the tests to make sure they pass**

Run: `node --test 'tools/calc/test/*.test.mjs'`
Expected: `# fail 0`

- [ ] **Step 6: Commit**

```bash
git add agent/policy.json tools/calc/cli.mjs tools/calc/test/cli.test.mjs
git commit -m "Add policy file and the sat calc command

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Analysis schema and `sat validate`

**Files:**
- Create: `agent/schema/analysis.schema.json`, `tools/agent/validate.mjs`, `tools/agent/test/validate.test.mjs`, `tests/fixtures/analysis-sample.json`, `tests/fixtures/sample-facts.json`, `tests/fixtures/sample-metrics.json`
- Modify: `package.json` (add `ajv` dev dependency)

**Interfaces:**
- Consumes: `facts.json` and `metrics.json` formats.
- Produces: `validateAnalysis(analysis, {facts, metrics, cards: Set<string>}) → {errors: string[], warnings: string[]}`; `main(argv) → exit code` for `sat validate <file> [--data data]`.

- [ ] **Step 1: Install ajv**

Run: `npm install --save-dev --save-exact ajv@8.17.1`
Expected: `package.json` devDependencies contains `"ajv": "8.17.1"`.

- [ ] **Step 2: Create the schema**

`agent/schema/analysis.schema.json` (strict form: every object lists all its properties as required and forbids others, so `codex exec --output-schema` accepts it):
```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "ticker", "company", "cik", "analysis_date", "data_as_of", "price", "runner", "result", "steps", "adjustments"],
  "properties": {
    "schema_version": { "type": "integer", "enum": [1] },
    "ticker": { "type": "string" },
    "company": { "type": "string" },
    "cik": { "type": "string" },
    "analysis_date": { "type": "string" },
    "data_as_of": { "type": "string" },
    "price": {
      "type": "object", "additionalProperties": false, "required": ["value", "date"],
      "properties": { "value": { "type": ["number", "null"] }, "date": { "type": ["string", "null"] } }
    },
    "runner": { "type": "string", "enum": ["claude-code", "codex", "other"] },
    "result": {
      "type": "object", "additionalProperties": false,
      "required": ["status", "stopped_at_step", "quality_score", "required_margin_of_safety", "margin_of_safety", "summary"],
      "properties": {
        "status": { "type": "string", "enum": ["meets_rules", "does_not_meet_rules", "stopped"] },
        "stopped_at_step": { "type": ["integer", "null"] },
        "quality_score": { "type": ["integer", "null"] },
        "required_margin_of_safety": { "type": ["number", "null"] },
        "margin_of_safety": { "type": ["number", "null"] },
        "summary": { "type": "string" }
      }
    },
    "steps": { "type": "array", "items": { "$ref": "#/definitions/step" } },
    "adjustments": { "type": "array", "items": { "$ref": "#/definitions/adjustment" } }
  },
  "definitions": {
    "step": {
      "type": "object", "additionalProperties": false,
      "required": ["n", "title", "facts", "calculations", "score", "reason", "drivers", "open_questions", "cards"],
      "properties": {
        "n": { "type": "integer" },
        "title": { "type": "string" },
        "facts": { "type": "array", "items": { "$ref": "#/definitions/fact" } },
        "calculations": { "type": "array", "items": { "$ref": "#/definitions/calculation" } },
        "score": { "type": ["integer", "null"] },
        "reason": { "type": "string" },
        "drivers": { "type": "array", "items": { "$ref": "#/definitions/driver" } },
        "open_questions": { "type": "array", "items": { "type": "string" } },
        "cards": { "type": "array", "items": { "type": "string" } }
      }
    },
    "fact": {
      "type": "object", "additionalProperties": false, "required": ["item", "period_end", "value", "source"],
      "properties": { "item": { "type": "string" }, "period_end": { "type": "string" }, "value": { "type": ["number", "null"] }, "source": { "type": "string" } }
    },
    "calculation": {
      "type": "object", "additionalProperties": false, "required": ["metric", "period_end", "value", "explanation"],
      "properties": { "metric": { "type": "string" }, "period_end": { "type": "string" }, "value": { "type": ["number", "null"] }, "explanation": { "type": "string" } }
    },
    "driver": {
      "type": "object", "additionalProperties": false, "required": ["text", "reversing_change"],
      "properties": { "text": { "type": "string" }, "reversing_change": { "type": "string" } }
    },
    "adjustment": {
      "type": "object", "additionalProperties": false, "required": ["item", "period_end", "delta", "reason", "source"],
      "properties": { "item": { "type": "string" }, "period_end": { "type": "string" }, "delta": { "type": "number" }, "reason": { "type": "string" }, "source": { "type": "string" } }
    }
  }
}
```

- [ ] **Step 3: Create the fixtures**

`tests/fixtures/sample-facts.json`:
```json
{ "schema_version": 1,
  "company": { "ticker": "SMPL", "name": "Sample Corp", "cik": "0000000001", "sic": 5331, "sic_description": "Retail", "fiscal_year_end": "1231", "model_fit": "suitable" },
  "extracted_at": "2026-10-11", "edgartools_version": "5.61.1", "periods": ["2025-12-31"],
  "facts": [
    { "item": "revenue", "period_end": "2025-12-31", "period_days": 365, "value": 1000000000, "unit": "USD", "status": "reported",
      "source": { "tag": "us-gaap:Revenues", "form": "10-K", "accession": "0000000001-26-000001", "filed": "2026-02-15" }, "flags": [] }
  ] }
```

`tests/fixtures/sample-metrics.json`:
```json
{ "schema_version": 1, "company": { "ticker": "SMPL" }, "periods": ["2025-12-31"], "price": { "value": 50, "date": "2026-10-10" },
  "assumptions": {}, "adjustments": { "items": [], "assumptions": {} }, "facts_extracted_at": "2026-10-11",
  "metrics": [
    { "key": "operating-margin", "card": "operating-margin", "period_end": "2025-12-31", "value": 0.125, "status": "ok", "formula": "Operating income / Revenue", "inputs": [] },
    { "key": "margin-of-safety-base", "card": "margin-of-safety", "period_end": "2025-12-31", "value": 0.31, "status": "ok", "formula": "(DCF value base − Price) / DCF value base", "inputs": [] }
  ] }
```

`tests/fixtures/analysis-sample.json` (also used by the app test in Task 10; the summary contains an HTML string on purpose):
```json
{
  "schema_version": 1, "ticker": "SMPL", "company": "Sample Corp", "cik": "0000000001",
  "analysis_date": "2026-10-11", "data_as_of": "2026-02-15",
  "price": { "value": 50, "date": "2026-10-10" }, "runner": "claude-code",
  "result": { "status": "meets_rules", "stopped_at_step": null, "quality_score": 4, "required_margin_of_safety": 0.25, "margin_of_safety": 0.31,
              "summary": "Test summary <img src=x onerror=\"window.__xss=1\"> stays text." },
  "steps": [
    { "n": 0, "title": "Model fit", "facts": [{ "item": "revenue", "period_end": "2025-12-31", "value": 1000000000, "source": "10-K 0000000001-26-000001" }],
      "calculations": [], "score": null, "reason": "Retail company; the framework applies.", "drivers": [], "open_questions": [], "cards": [] },
    { "n": 1, "title": "Stop rules", "facts": [], "calculations": [], "score": 4, "reason": "No stop rule fails.", "drivers": [], "open_questions": [], "cards": ["interest-coverage"] },
    { "n": 2, "title": "Business quality", "facts": [],
      "calculations": [{ "metric": "operating-margin", "period_end": "2025-12-31", "value": 0.125, "explanation": "Stable margin." }],
      "score": 4, "reason": "Stable 12.5% operating margin.", "drivers": [{ "text": "Margin is stable", "reversing_change": "Margin falls below 8%" }],
      "open_questions": ["Is the margin cyclical?"], "cards": ["operating-margin"] },
    { "n": 3, "title": "Management", "facts": [], "calculations": [], "score": 3, "reason": "No data on buyback prices.", "drivers": [], "open_questions": [], "cards": ["capital-allocation"] },
    { "n": 4, "title": "Value", "facts": [], "calculations": [], "score": null, "reason": "See margin of safety.", "drivers": [], "open_questions": [], "cards": ["reverse-dcf"] },
    { "n": 5, "title": "Decision", "facts": [],
      "calculations": [{ "metric": "margin-of-safety-base", "period_end": "2025-12-31", "value": 0.31, "explanation": "Above the 25% requirement." }],
      "score": null, "reason": "Margin of safety 31% is above the required 25%.", "drivers": [{ "text": "Margin of safety", "reversing_change": "Price above $69" }],
      "open_questions": [], "cards": ["margin-of-safety"] },
    { "n": 6, "title": "Commitment", "facts": [], "calculations": [], "score": null, "reason": "Draft invalidation conditions below.", "drivers": [], "open_questions": ["Operating margin below 8% for two years?"], "cards": ["invalidation"] }
  ],
  "adjustments": []
}
```

- [ ] **Step 4: Write the failing tests**

`tools/agent/test/validate.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateAnalysis } from '../validate.mjs';

const load = (p) => JSON.parse(readFileSync(new URL('../../../' + p, import.meta.url)));
const ctx = () => ({ facts: load('tests/fixtures/sample-facts.json'), metrics: load('tests/fixtures/sample-metrics.json'),
  cards: new Set(Object.keys(load('src/content/en/concepts.json'))) });
const sample = () => load('tests/fixtures/analysis-sample.json');

test('the sample analysis is valid', () => {
  const r = validateAnalysis(sample(), ctx());
  assert.deepEqual(r.errors, []);
});

test('schema errors are reported', () => {
  const a = sample(); delete a.result.summary;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /summary/);
});

test('steps must be 0 to 6 in order, with scores 1 to 5', () => {
  const a = sample(); a.steps.pop(); a.steps[2].score = 7;
  const e = validateAnalysis(a, ctx()).errors.join('\n');
  assert.match(e, /steps 0–6/); assert.match(e, /score/);
});

test('a calculation that differs from metrics.json is an error', () => {
  const a = sample(); a.steps[2].calculations[0].value = 0.2;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /operating-margin/);
});

test('a fact that differs from facts.json is an error', () => {
  const a = sample(); a.steps[0].facts[0].value = 2;
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /revenue/);
});

test('unknown cards are errors', () => {
  const a = sample(); a.steps[1].cards.push('no-such-card');
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /no-such-card/);
});

test('buy and sell are not allowed, buybacks are', () => {
  const a = sample(); a.steps[3].reason = 'Buybacks were large. You should buy now.';
  const e = validateAnalysis(a, ctx()).errors;
  assert.equal(e.length, 1); assert.match(e[0], /buy/);
});

test('a stopped result needs the step number', () => {
  const a = sample(); a.result.status = 'stopped';
  assert.match(validateAnalysis(a, ctx()).errors.join('\n'), /stopped_at_step/);
});

test('numbers in text without a source are warnings', () => {
  const a = sample(); a.steps[2].reason = 'Margin of 47.0% is high.';
  const r = validateAnalysis(a, ctx());
  assert.deepEqual(r.errors, []); assert.match(r.warnings.join('\n'), /47\.0%/);
});
```

- [ ] **Step 5: Run the tests to make sure they fail**

Run: `node --test 'tools/agent/test/*.test.mjs'`
Expected: FAIL with `Cannot find module '…/tools/agent/validate.mjs'`

- [ ] **Step 6: Write `validate.mjs`**

`tools/agent/validate.mjs`:
```js
// sat validate analyses/<T>-<date>.json — checks an agent analysis against the schema, facts.json and metrics.json.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import Ajv from 'ajv';

const schema = JSON.parse(readFileSync(new URL('../../agent/schema/analysis.schema.json', import.meta.url)));
const check = new Ajv({ allErrors: true }).compile(schema);
const same = (a, b) => (a == null || b == null ? a === b : Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)));
const FORBIDDEN = /\b(buy|sell)\b(?![-\s]?backs?)/i;

function strings(value, path, out) {
  if (typeof value === 'string') out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) strings(v, path ? `${path}.${k}` : k, out);
  return out;
}

function knownNumbers(facts, metrics) {
  const out = [];
  for (const f of facts.facts) if (f.value != null) out.push(f.value);
  for (const m of metrics.metrics) if (m.value != null) out.push(m.value);
  return out;
}

function textNumberWarnings(analysis, known) {
  const warnings = [];
  for (const [path, text] of strings(analysis, '', [])) {
    if (/(^|\.)(source|period_end|analysis_date|data_as_of|date|cik|ticker)$/.test(path)) continue;
    for (const m of text.matchAll(/(\d+(?:\.\d+)?)%|\$(\d+(?:\.\d+)?)\s?([BMK])?/g)) {
      const x = m[1] != null ? Number(m[1]) / 100 : Number(m[2]) * ({ B: 1e9, M: 1e6, K: 1e3 }[m[3]] || 1);
      const tol = m[1] != null ? 0.0006 : 0.006 * Math.abs(x);
      if (!known.some((k) => Math.abs(k - x) <= tol)) warnings.push(`${path}: "${m[0]}" matches no fact or metric`);
    }
  }
  return warnings;
}

export function validateAnalysis(analysis, { facts, metrics, cards }) {
  const errors = [];
  if (!check(analysis)) return { errors: check.errors.map((e) => `schema ${e.instancePath || '/'} ${e.message} ${JSON.stringify(e.params)}`), warnings: [] };
  if (analysis.steps.map((s) => s.n).join(',') !== '0,1,2,3,4,5,6') errors.push('steps 0–6 must each appear once, in order');
  for (const s of analysis.steps) {
    if (s.score != null && (s.score < 1 || s.score > 5)) errors.push(`step ${s.n}: score must be 1–5 or null`);
    for (const c of s.cards) if (!cards.has(c)) errors.push(`step ${s.n}: unknown card "${c}"`);
    for (const f of s.facts) {
      const ref = facts.facts.find((x) => x.item === f.item && x.period_end === f.period_end);
      if (!ref) errors.push(`step ${s.n}: fact ${f.item} ${f.period_end} is not in facts.json`);
      else if (!same(f.value, ref.value)) errors.push(`step ${s.n}: fact ${f.item} ${f.period_end} = ${f.value}, facts.json has ${ref.value}`);
    }
    for (const c of s.calculations) {
      const ref = metrics.metrics.find((x) => x.key === c.metric && x.period_end === c.period_end);
      if (!ref) errors.push(`step ${s.n}: metric ${c.metric} ${c.period_end} is not in metrics.json`);
      else if (!same(c.value, ref.value)) errors.push(`step ${s.n}: metric ${c.metric} ${c.period_end} = ${c.value}, metrics.json has ${ref.value}`);
    }
  }
  const q = analysis.result.quality_score;
  if (q != null && (q < 1 || q > 5)) errors.push('result.quality_score must be 1–5 or null');
  if (analysis.result.status === 'stopped' && analysis.result.stopped_at_step == null) errors.push('result.stopped_at_step is required when status is "stopped"');
  for (const [path, text] of strings(analysis, '', [])) {
    const m = FORBIDDEN.exec(text);
    if (m) errors.push(`${path}: the word "${m[0]}" is not allowed; describe the result against the rules instead`);
  }
  return { errors, warnings: textNumberWarnings(analysis, knownNumbers(facts, metrics)) };
}

export function main(argv) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { data: { type: 'string', default: 'data' } } });
  if (!positionals[0]) { console.error('Usage: sat validate analyses/<TICKER>-<date>.json [--data data]'); return 1; }
  const analysis = JSON.parse(readFileSync(positionals[0], 'utf8'));
  const dir = join(values.data, String(analysis.ticker || '').toUpperCase());
  const r = validateAnalysis(analysis, {
    facts: JSON.parse(readFileSync(join(dir, 'facts.json'), 'utf8')),
    metrics: JSON.parse(readFileSync(join(dir, 'metrics.json'), 'utf8')),
    cards: new Set(Object.keys(JSON.parse(readFileSync('src/content/en/concepts.json', 'utf8')))),
  });
  for (const w of r.warnings) console.log('warning: ' + w);
  for (const e of r.errors) console.log('error: ' + e);
  console.log(r.errors.length ? `${r.errors.length} errors` : `valid (${r.warnings.length} warnings)`);
  return r.errors.length ? 1 : 0;
}
```

- [ ] **Step 7: Run the tests to make sure they pass**

Run: `node --test 'tools/agent/test/*.test.mjs'`
Expected: `# fail 0`

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json agent/schema tools/agent tests/fixtures
git commit -m "Add the analysis schema and the sat validate command

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: `sat` dispatcher, npm scripts and CI

**Files:**
- Create: `scripts/sat.mjs`
- Modify: `package.json` (scripts), `.github/workflows/pages.yml` (Python tests), `README.md` (new section)

**Interfaces:**
- Consumes: `tools/calc/cli.mjs` `main`, `tools/agent/validate.mjs` `main`, `python -m sat_extract`.
- Produces: `npm run sat -- extract|calc|validate …`; `npm test` also runs the node tests of `tools/`; `npm run test:extract` runs pytest.

- [ ] **Step 1: Write the dispatcher**

`scripts/sat.mjs`:
```js
// npm run sat -- <extract|calc|validate> … — one entry point for the value analyst tools.
import { spawnSync } from 'node:child_process';

const [command, ...rest] = process.argv.slice(2);
const usage = 'Usage: npm run sat -- extract TICKER | calc TICKER [--price N --price-date YYYY-MM-DD] [--adjust file] | validate FILE';

if (command === 'extract') {
  const r = spawnSync('uv', ['run', '--project', 'tools/extract', 'python', '-m', 'sat_extract', ...rest], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
} else if (command === 'calc') {
  process.exit((await import('../tools/calc/cli.mjs')).main(rest));
} else if (command === 'validate') {
  process.exit((await import('../tools/agent/validate.mjs')).main(rest));
} else {
  console.error(usage);
  process.exit(1);
}
```

- [ ] **Step 2: Update `package.json` scripts**

Replace the `"test"` script and add two scripts:
```json
"test": "node tests/finance.test.js && node scripts/validate.mjs && node --test 'tools/calc/test/*.test.mjs' 'tools/agent/test/*.test.mjs'",
"test:extract": "uv run --project tools/extract pytest tools/extract/tests -q",
"sat": "node scripts/sat.mjs",
```

- [ ] **Step 3: Run the scripts**

Run: `npm test && npm run test:extract && npm run sat -- calc`
Expected: tests pass; the last command prints the usage line for `sat calc` and exits with code 1.

- [ ] **Step 4: Add Python tests to CI**

In `.github/workflows/pages.yml`, after the `- run: npm test` line, add:
```yaml
      - uses: astral-sh/setup-uv@v6
      - run: npm run test:extract
```

- [ ] **Step 5: Add a README section**

Append to `README.md` before the line `Educational reference. Not investment advice.`:
````markdown
## Value analyst agent (local)

An AI analyst that reads SEC filings, calculates the handbook's metrics with tested code, and writes an analysis with sources and decision drivers. It never recommends to buy or sell. Design: `docs/superpowers/specs/2026-10-11-value-analyst-agent-design.md`.

Requirements: Node.js 22, [uv](https://docs.astral.sh/uv/), and SEC identity variables (SEC asks for a name and an email address in each request):

```sh
export EDGAR_NAME="Your Name" EDGAR_EMAIL="you@example.com"
npm run sat -- extract COST
npm run sat -- calc COST --price 912.40 --price-date 2026-10-10
```

Then, in Claude Code, ask: "Use the value-analyst skill for COST, price 912.40 on 2026-10-10". In Codex, the same skill is in `.agents/skills/`. Headless:

```sh
claude -p "Use the value-analyst skill for COST, price 912.40 on 2026-10-10" --allowedTools "Bash(npm run sat:*)" Read Write
codex exec "Use the value-analyst skill for COST, price 912.40 on 2026-10-10" --output-schema agent/schema/analysis.schema.json
```

The analysis is written to `analyses/` (not committed). Import it in the app on the **Analyses** page. `data/` is a local cache. Edit `agent/policy.json` to set your own rules.
````

- [ ] **Step 6: Commit**

```bash
git add scripts/sat.mjs package.json .github/workflows/pages.yml README.md
git commit -m "Add the sat command, tool tests in npm test and CI, and README usage

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: System prompt and skill

**Files:**
- Create: `agent/analyst.md`, `.claude/skills/value-analyst/SKILL.md`, symlink `.agents/skills/value-analyst` → `../../.claude/skills/value-analyst`, `tools/agent/test/skill.test.mjs`

**Interfaces:**
- Consumes: commands of Task 8; schema of Task 7; policy of Task 6; card IDs.
- Produces: a skill named `value-analyst` that both Claude Code and Codex discover.

- [ ] **Step 1: Write the failing test**

`tools/agent/test/skill.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, realpathSync } from 'node:fs';

const root = new URL('../../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');

test('skill has the frontmatter that Claude Code and Codex need', () => {
  const s = read('.claude/skills/value-analyst/SKILL.md');
  assert.match(s, /^---\nname: value-analyst\ndescription: .+\n---\n/);
  assert.match(s, /agent\/analyst\.md/);
});

test('Codex path points to the same skill', () => {
  assert.equal(realpathSync(new URL('.agents/skills/value-analyst', root)), realpathSync(new URL('.claude/skills/value-analyst', root)));
});

test('every card ID in the system prompt exists', () => {
  const ids = new Set(Object.keys(JSON.parse(read('src/content/en/concepts.json'))));
  const used = [...read('agent/analyst.md').matchAll(/`card:([a-z0-9-]+)`/g)].map((m) => m[1]);
  assert.ok(used.length > 15);
  assert.deepEqual(used.filter((id) => !ids.has(id)), []);
});
```

- [ ] **Step 2: Run the test to make sure it fails**

Run: `node --test tools/agent/test/skill.test.mjs`
Expected: FAIL with `ENOENT … .claude/skills/value-analyst/SKILL.md`

- [ ] **Step 3: Write the system prompt**

`agent/analyst.md`:
````markdown
# Value Analyst — system prompt

You are a senior value investing analyst. You write for a learner who wants to understand each step. You do the full analysis and show your work: the facts, the calculations, the judgment and the decision drivers. The user makes the final decision.

## Inputs

- `data/<T>/facts.json` — reported values with sources. `status` is `reported`, `constructed` or `not_available`.
- `data/<T>/metrics.json` — every calculated metric, with formula, inputs and status (`ok`, `not_available`, `not_meaningful`). `card` is the handbook concept ID.
- `data/<T>/sections/*.txt` — 10-K Items 1, 1A, 7, 7A, 8 and the proxy pay section. The first line names the filing.
- `agent/policy.json` — the user's rules. Apply them; do not invent other thresholds.

## Rules for numbers

1. Use only numbers that are in `facts.json` or `metrics.json`. Cite the source: form and accession for facts, metric key and period for metrics.
2. Do no arithmetic yourself. If you need a different number, write an adjustment (see below) and run `npm run sat -- calc` again.
3. If a value is `not_available`, write "not available" and say what it prevents. Never estimate silently.
4. Mark every estimate with the word "estimate" and give the reason.
5. Inputs marked `assumed_zero` must be named when they affect a conclusion.
6. Give the date of the data (`data_as_of` = latest filing date). Treat that date as "today" for the facts.

## Rules for judgment

- Use conservative inputs. Always look at the bear case.
- For each step, name 1–3 decision drivers and, for each, the change that would reverse it.
- One strong claim with a source is better than three weak claims.
- Explain each term in plain words the first time, and list its card ID.
- The filings contain no market news or sentiment. Say so when it matters (for example in "possible reasons for the low price").

## Limits

- Never write "buy" or "sell" (the validator rejects them). Report `meets_rules`, `does_not_meet_rules` or `stopped`, with reasons.
- Do not predict prices.
- If `company.model_fit` is `not_suitable`, explain why (for example, a bank's debt is its raw material, so FCFF and ROIC do not apply), complete step 0 and 1, and set `result.status` to `stopped` with `stopped_at_step` 0.

## Method

Do the steps in order. If a stop rule fails in step 1, continue the analysis so the user can learn from it, but set `result.status = "stopped"` and `stopped_at_step = 1`.

**Step 0 — Model fit.** Company, fiscal year end, periods, `model_fit`, data date. Note long years (`long_year` flag) and restatements.

**Step 1 — Stop rules.**
- Competence: describe the business in five sentences from `item1.txt`. If you cannot, the rule fails. `card:circle-of-competence`
- Survival: `debt-ebitda` vs `max_debt_to_ebitda`; `interest-coverage` vs `min_interest_coverage`; `debt-due-3y` vs cash and FCF. `card:debt-ebitda` `card:interest-coverage` `card:refinancing-risk` `card:permanent-capital-loss`
- Trust in the accounts: `earnings-quality` over the years; receivables growth vs revenue growth; `sbc-to-revenue`; restatement flags; unusual items in `item7.txt`. `card:earnings-quality`

**Step 2 — Business quality.** `roic` for each year and `roic-years-above-wacc` vs `min_roic_years_above_wacc`; margin stability (`gross-margin`, `operating-margin`); `owner-earnings`; `normalized-net-income`; `incremental-roic-*`; customer concentration and cyclicality from `item1a.txt`. Score 1–5. `card:roic` `card:wacc` `card:moat` `card:owner-earnings` `card:normalized-earnings` `card:incremental-roic` `card:customer-concentration` `card:cyclicality` `card:operating-margin`

**Step 3 — Management.** `diluted-shares-change` and `dilution`; buybacks and their size vs FCF; `sbc-to-revenue`; acquisitions and goodwill; pay metrics from `proxy_pay.txt`. Score 1–5. `card:capital-allocation` `card:dilution` `card:management-incentives`

**Step 4 — Value.** `reverse-dcf-growth` (what the price assumes) compared with history; `dcf-value-bear|base|bull`; `earnings-value-per-share`; `tbv-per-share` and `ncav-per-share` as a floor. State the assumptions from `metrics.json` → `assumptions`. `card:reverse-dcf` `card:fcff` `card:wacc` `card:cost-of-equity` `card:terminal-value` `card:tangible-book-value` `card:ncav`

**Step 5 — Decision.** Overall quality score = the lower of steps 2 and 3, rounded down. Required margin of safety = `policy.required_margin_of_safety[score]` (`null` = does not qualify at any price). Compare with `margin-of-safety-base`, and report `margin-of-safety-bear`. Value-trap test: is revenue or owner earnings falling for several years? List possible reasons for the low price from the filings, and say that market news is not in the data. `card:margin-of-safety` `card:value-trap`

**Step 6 — Commitment.** Draft 3–5 invalidation conditions with a metric and a threshold, a short pre-mortem ("three years later the investment lost money — why?"), and questions for the user. `card:thesis-def` `card:invalidation`

## Adjustments

When a reported value hides the normal picture (a one-time charge, a legal settlement, an acquisition), write `data/<T>/adjustments.json`:

```json
{ "items": [{ "item": "operating_income", "period_end": "2023-12-31", "delta": 1200000000,
              "reason": "Add back the legal settlement charge", "source": "10-K Item 8, Note 14" }],
  "assumptions": { "wacc": 0.095, "maintenance_capex_ratio": 0.8 } }
```

Run `npm run sat -- calc <T> --adjust data/<T>/adjustments.json` (with the same price arguments). `metrics.json` then has both `value` and `default_value`. Copy the items into the analysis `adjustments` array. Explain each adjustment in the step where it matters.

## Output

Write `analyses/<T>-<analysis_date>.json` that matches `agent/schema/analysis.schema.json`:
- `steps` has exactly seven entries, `n` = 0–6, in order.
- Each `facts` entry copies `item`, `period_end` and `value` from `facts.json`; `source` = "`<form> <accession>`".
- Each `calculations` entry copies `metric` (= metric key), `period_end` and `value` from `metrics.json`, plus a one-sentence `explanation`.
- `cards` lists handbook card IDs only.
- `result.summary`: 3–5 sentences: the result, the two most important drivers, and what would change it.

Then run `npm run sat -- validate analyses/<T>-<analysis_date>.json`. Fix every error. Report warnings to the user.

## Interactive checkpoints

When the user is present, stop after steps 1, 2 and 4. Show a short result for the step and ask whether to continue or to change an assumption.
````

- [ ] **Step 4: Write the skill**

`.claude/skills/value-analyst/SKILL.md`:
````markdown
---
name: value-analyst
description: Run a value investing analysis of a US company from its SEC filings, and show each step with sources and decision drivers. Use when the user asks to analyze, assess or value a US stock or ticker as a value investor. Do not use for trading, price prediction or non-US companies.
---

# Value analyst

Read `agent/analyst.md` completely before you start, and follow it. It is the method and the rules.

## Procedure

1. Get the ticker, the share price and the price date from the user's request. If the price or the date is missing and the user is present, ask for them. In headless mode without a price, continue without valuation metrics and say so in `result.summary`.
2. Make sure `EDGAR_NAME` and `EDGAR_EMAIL` are set: `node -e "process.exit(process.env.EDGAR_NAME && process.env.EDGAR_EMAIL ? 0 : 1)"`. If not, stop and tell the user to set them. Never set them yourself.
3. Run `npm run sat -- extract <T>`.
4. Run `npm run sat -- calc <T> --price <P> --price-date <YYYY-MM-DD>`.
5. Read `data/<T>/facts.json`, `data/<T>/metrics.json`, `agent/policy.json` and the files in `data/<T>/sections/` that each step needs.
6. Do steps 0–6 of `agent/analyst.md`. Make adjustments only through `data/<T>/adjustments.json` and `npm run sat -- calc … --adjust`.
7. Write `analyses/<T>-<today>.json`. Use `"runner": "claude-code"` in Claude Code and `"runner": "codex"` in Codex.
8. Run `npm run sat -- validate analyses/<T>-<today>.json`. If there are errors, fix them and run it again (at most two more times). If errors remain, report them.
9. Show the user: `result.status`, the quality score, the margin of safety against the requirement, the main drivers, the warnings, and this sentence: "Import the file on the Analyses page of the app to see every step."
````

- [ ] **Step 5: Create the Codex symlink**

Run:
```bash
mkdir -p .agents/skills && ln -s ../../.claude/skills/value-analyst .agents/skills/value-analyst
```

- [ ] **Step 6: Run the tests to make sure they pass**

Run: `node --test 'tools/agent/test/*.test.mjs'`
Expected: `# fail 0`

- [ ] **Step 7: Commit**

```bash
git add agent/analyst.md .claude/skills/value-analyst .agents/skills/value-analyst tools/agent/test/skill.test.mjs
git commit -m "Add the value analyst system prompt and skill for Claude Code and Codex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: App page "Analyses"

**Files:**
- Create: `src/components/analyses.js`, `tests/analyses.spec.cjs`
- Modify: `scripts/build.mjs` (file list), `src/content/en/ui.json`, `src/content/he/ui.json`

**Interfaces:**
- Consumes: analysis format (Task 7); `SAT.register`, `SAT.esc`, `SAT.fmt`, `SAT.store`, `SAT.toast`, `SAT.C`, `SAT.href` (existing app).
- Produces: page `#tool-analyses`; stored key `analysis:last`.

- [ ] **Step 1: Write the failing Playwright test**

`tests/analyses.spec.cjs`:
```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const sample = path.join(__dirname, 'fixtures', 'analysis-sample.json');

for (const lang of ['en', 'he']) test(`${lang}: import and show an analysis`, async ({ page }) => {
  await page.goto(`/?lang=${lang}#tool-analyses`);
  await expect(page.locator('[data-analysis-empty]')).toBeVisible();
  await page.locator('[data-analysis-file]').setInputFiles(sample);
  await expect(page.locator('[data-analysis-status]')).toHaveAttribute('data-status', 'meets_rules');
  await expect(page.locator('[data-step]')).toHaveCount(7);
  await expect(page.locator('[data-step="2"] [data-calc]')).toContainText('operating-margin');
  await expect(page.locator('[data-step="2"] a[href="#margins/operating-margin"]')).toHaveCount(1);
  await expect(page.locator('[data-step="0"] a[href*="sec.gov/Archives/edgar/data/1/000000000126000001"]')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('[data-step]')).toHaveCount(7);
});

test('analysis text is never run as HTML', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  await page.locator('[data-analysis-file]').setInputFiles(sample);
  await expect(page.locator('[data-analysis-summary]')).toContainText('<img src=x onerror="window.__xss=1">');
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  expect(await page.locator('#view img').count()).toBe(0);
});

test('a wrong file gives a clear message', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  await page.locator('[data-analysis-file]').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"a":1}') });
  await expect(page.locator('#toast')).toContainText('This file is not an analysis');
  await expect(page.locator('[data-analysis-empty]')).toBeVisible();
});
```

- [ ] **Step 2: Run the test to make sure it fails**

Run: `npm run build && CHROME_PATH=/usr/bin/google-chrome npx playwright test tests/analyses.spec.cjs`
Expected: FAIL — `[data-analysis-empty]` is not found (the page does not exist; the router shows the default page).

- [ ] **Step 3: Write the page**

`src/components/analyses.js`:
```js
/* Analyses: import and show an analysis file from the value analyst agent (see agent/analyst.md). */
(function () {
  'use strict';
  const E = SAT.esc, KEY = 'analysis:last';
  const STATUS = { meets_rules: 'Meets your rules', does_not_meet_rules: 'Does not meet your rules', stopped: 'Stopped' };
  const pct = (v) => (v == null ? '—' : SAT.fmt.pct(v));
  const num = (v) => (v == null ? '—' : Math.abs(v) >= 1000 ? SAT.fmt.money(v) : String(Math.round(v * 10000) / 10000));
  const isAnalysis = (a) => a && typeof a === 'object' && Array.isArray(a.steps) && a.result && typeof a.result.status === 'string';

  function secUrl(cik, source) {
    const m = /(\d{10}-\d{2}-\d{6})/.exec(source || '');
    return m && /^\d+$/.test(String(cik)) ? `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${m[1].replace(/-/g, '')}/` : null;
  }
  function card(id) {
    return SAT.C[id] ? `<a href="${SAT.href(id)}">${E(SAT.C[id].title)}</a>` : `<span>${E(id)}</span>`;
  }

  function step(a, s) {
    const facts = s.facts.map((f) => {
      const url = secUrl(a.cik, f.source);
      return `<li><code>${E(f.item)}</code> ${E(f.period_end)}: <b>${E(num(f.value))}</b> — ${url ? `<a href="${E(url)}" target="_blank" rel="noopener">${E(f.source)}</a>` : E(f.source)}</li>`;
    }).join('');
    const calcs = s.calculations.map((c) => `<li data-calc><code>${E(c.metric)}</code> ${E(c.period_end)}: <b>${E(num(c.value))}</b> — ${E(c.explanation)}</li>`).join('');
    const drivers = s.drivers.map((d) => `<li>${E(d.text)} <span class="muted">— <span data-label>Would change if</span>: ${E(d.reversing_change)}</span></li>`).join('');
    const block = (label, items) => (items ? `<h4>${label}</h4><ul>${items}</ul>` : '');
    return `<article class="card" data-step="${E(s.n)}">
      <header><h3><span data-label>Step</span> ${E(s.n)} — <span data-no-translate>${E(s.title)}</span></h3>${s.score != null ? `<span class="num"><span data-label>Score</span> ${E(s.score)}/5</span>` : ''}</header>
      <div data-no-translate><p>${E(s.reason)}</p></div>
      ${block('Decision drivers', drivers ? `<div data-no-translate>${drivers}</div>` : '')}
      ${block('Facts', facts)}
      ${block('Calculations', calcs ? `<div data-no-translate>${calcs}</div>` : '')}
      ${block('Open questions', s.open_questions.map((q) => `<li data-no-translate>${E(q)}</li>`).join(''))}
      ${s.cards.length ? `<p class="rel"><span data-label>Related cards</span>: ${s.cards.map(card).join(' · ')}</p>` : ''}
    </article>`;
  }

  function render(view, a) {
    const r = a.result;
    view.querySelector('[data-analysis-out]').innerHTML = `
      <section class="card verdict-card">
        <h3 data-no-translate>${E(a.company)} (${E(a.ticker)})</h3>
        <p data-analysis-status data-status="${E(r.status)}"><b>${E(STATUS[r.status] || r.status)}</b>${r.stopped_at_step != null ? ` — <span data-label>Step</span> ${E(r.stopped_at_step)}` : ''}</p>
        <div class="metrics">
          <div class="metric"><div class="ml">Quality score</div><div class="mv">${r.quality_score == null ? '—' : E(r.quality_score) + '/5'}</div></div>
          <div class="metric"><div class="ml">Margin of safety</div><div class="mv">${E(pct(r.margin_of_safety))}</div></div>
          <div class="metric"><div class="ml">Required margin of safety</div><div class="mv">${E(pct(r.required_margin_of_safety))}</div></div>
          <div class="metric"><div class="ml">Data as of</div><div class="mv" data-no-translate>${E(a.data_as_of)}</div></div>
        </div>
        <p data-analysis-summary data-no-translate>${E(r.summary)}</p>
      </section>
      ${a.steps.map((s) => step(a, s)).join('')}`;
    view.querySelector('[data-analysis-empty]').hidden = true;
  }

  SAT.register({
    id: 'tool-analyses', group: 'tools', title: 'Analyses',
    render(el) {
      el.innerHTML = `<div class="page-head"><div class="sec-num">Tool</div><h2>Analyses</h2>
        <p>Results of the value analyst agent. Each step shows its facts, calculations, sources and decision drivers. The agent never recommends to buy or sell.</p></div>
        <div class="btns"><button class="btn" data-analysis-pick>Import analysis</button><input type="file" accept="application/json" data-analysis-file hidden></div>
        <p class="muted" data-analysis-empty>No analysis loaded. Run the value analyst agent, then import its JSON file.</p>
        <div data-analysis-out></div>`;
      const input = el.querySelector('[data-analysis-file]');
      el.querySelector('[data-analysis-pick]').addEventListener('click', () => input.click());
      input.addEventListener('change', () => {
        const f = input.files[0]; if (!f) return;
        f.text().then((t) => {
          let a; try { a = JSON.parse(t); } catch (e) { a = null; }
          if (!isAnalysis(a)) { SAT.toast('This file is not an analysis'); return; }
          SAT.store.set(KEY, a); render(el, a); SAT.toast('Analysis imported');
        });
      });
      const saved = SAT.store.get(KEY, null);
      if (isAnalysis(saved)) render(el, saved);
    },
  });
})();
```

- [ ] **Step 4: Add the page to the build**

In `scripts/build.mjs`, in the `files` array, insert `'components/analyses'` after `'components/checklist'`:
```js
const files = ['finance/core','i18n','components/ui','components/handbook','finance/calculators','content/register','components/reference','learning/lessons','components/dcf','components/scenarios','components/sotp','components/analyzer','components/thesis','components/growth','components/checklist','components/analyses','components/roadmap','app'];
```

- [ ] **Step 5: Add the UI labels in both languages**

Add these keys to `src/content/en/ui.json` (value = key) and to `src/content/he/ui.json` (Hebrew value):

| Key | Hebrew |
|---|---|
| `Analyses` | `ניתוחים` |
| `Import analysis` | `ייבוא ניתוח` |
| `Results of the value analyst agent. Each step shows its facts, calculations, sources and decision drivers. The agent never recommends to buy or sell.` | `תוצאות סוכן ניתוח הערך. כל שלב מציג עובדות, חישובים, מקורות וגורמי החלטה. הסוכן אף פעם אינו ממליץ לקנות או למכור.` |
| `No analysis loaded. Run the value analyst agent, then import its JSON file.` | `לא נטען ניתוח. הריצו את סוכן ניתוח הערך ואז ייבאו את קובץ ה-JSON שלו.` |
| `Meets your rules` | `עומד בכללים שלכם` |
| `Does not meet your rules` | `אינו עומד בכללים שלכם` |
| `Stopped` | `נעצר` |
| `Step` | `שלב` |
| `Score` | `ציון` |
| `Quality score` | `ציון איכות` |
| `Margin of safety` | `מרווח ביטחון` |
| `Required margin of safety` | `מרווח ביטחון נדרש` |
| `Data as of` | `נתונים נכון ל-` |
| `Decision drivers` | `גורמי החלטה` |
| `Would change if` | `ישתנה אם` |
| `Facts` | `עובדות` |
| `Calculations` | `חישובים` |
| `Open questions` | `שאלות פתוחות` |
| `Related cards` | `כרטיסים קשורים` |
| `This file is not an analysis` | `הקובץ אינו ניתוח` |
| `Analysis imported` | `הניתוח יובא` |

Use this script so both files keep their format:
```bash
python3 - <<'EOF'
import json
he = {"Analyses":"ניתוחים","Import analysis":"ייבוא ניתוח",
"Results of the value analyst agent. Each step shows its facts, calculations, sources and decision drivers. The agent never recommends to buy or sell.":"תוצאות סוכן ניתוח הערך. כל שלב מציג עובדות, חישובים, מקורות וגורמי החלטה. הסוכן אף פעם אינו ממליץ לקנות או למכור.",
"No analysis loaded. Run the value analyst agent, then import its JSON file.":"לא נטען ניתוח. הריצו את סוכן ניתוח הערך ואז ייבאו את קובץ ה-JSON שלו.",
"Meets your rules":"עומד בכללים שלכם","Does not meet your rules":"אינו עומד בכללים שלכם","Stopped":"נעצר","Step":"שלב","Score":"ציון",
"Quality score":"ציון איכות","Margin of safety":"מרווח ביטחון","Required margin of safety":"מרווח ביטחון נדרש","Data as of":"נתונים נכון ל-",
"Decision drivers":"גורמי החלטה","Would change if":"ישתנה אם","Facts":"עובדות","Calculations":"חישובים","Open questions":"שאלות פתוחות",
"Related cards":"כרטיסים קשורים","This file is not an analysis":"הקובץ אינו ניתוח","Analysis imported":"הניתוח יובא"}
for lang in ["en","he"]:
    p=f"src/content/{lang}/ui.json"; d=json.load(open(p))
    for k,v in he.items(): d.setdefault(k, k if lang=="en" else v)
    open(p,"w").write(json.dumps(d,ensure_ascii=False,indent=2)+"\n")
EOF
```

- [ ] **Step 6: Run the tests to make sure they pass**

Run: `npm test && npm run build && CHROME_PATH=/usr/bin/google-chrome npx playwright test`
Expected: all tests pass, including `analyses.spec.cjs` (4 tests) and the existing translation test. If the translation test reports a new English string on the Hebrew page, add its Hebrew key (do not add it to the allowlist unless it is a formula, an abbreviation or a proper name).

- [ ] **Step 7: Commit**

```bash
git add src/components/analyses.js scripts/build.mjs src/content/en/ui.json src/content/he/ui.json tests/analyses.spec.cjs
git commit -m "Add the Analyses page that imports and shows agent analyses

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: End-to-end run on the test set

**Files:**
- Create: `tools/extract/tests/fixtures/cost-records.json` (trimmed real records), `tools/extract/tests/test_cost_fixture.py`
- Modify: `agent/mapping/line-items.json` (only if the run shows a missing tag)

**Interfaces:**
- Consumes: everything above. Requires `EDGAR_NAME` / `EDGAR_EMAIL` from the user (Task 3, Step 6).

- [ ] **Step 1: Extract the five test companies**

Run (one at a time):
```bash
for T in COST AAL INTC SNOW JPM; do npm run sat -- extract $T --save-records || break; done
```
Expected: five `data/<T>/facts.json` files. JPM prints `model fit: not_suitable`.

- [ ] **Step 2: Check 10 values for each company against the 10-K by hand**

For each company, open the latest 10-K on sec.gov and compare: revenue, operating income, net income, OCF, CapEx, SBC, cash, long-term debt, equity, diluted shares (latest year). Record each result in a table in the commit message of Step 5. If a value is wrong or `not_available` but present in the 10-K, find its tag in `data/<T>/records.json` and add the tag to the mapping list in the correct priority place. Then run Step 1 again for that company. Known check values: COST revenue FY2025 = 275,235,000,000; COST CapEx FY2026 = 6,435,000,000.

- [ ] **Step 3: Record the COST fixture and test it offline**

Trim the records to the mapped tags and save them:
```bash
node -e '
const m=require("./agent/mapping/line-items.json");const r=require("./data/COST/records.json");
const tags=new Set(Object.values(m.items).flatMap(i=>[...i.tags,...(i.construct?[...i.construct.required.flat(),...(i.construct.optional||[]).flat()]:[])]));
require("fs").writeFileSync("tools/extract/tests/fixtures/cost-records.json",JSON.stringify(r.filter(x=>tags.has(x.concept))));'
```

`tools/extract/tests/test_cost_fixture.py`:
```python
import json
from pathlib import Path

from sat_extract.facts import build_facts

HERE = Path(__file__).resolve().parent
MAPPING = json.loads((HERE.parents[2] / "agent/mapping/line-items.json").read_text())
RECORDS = json.loads((HERE / "fixtures/cost-records.json").read_text())
COMPANY = {"ticker": "COST", "name": "COSTCO WHOLESALE CORP /NEW", "cik": "0000909832", "sic": 5331,
           "sic_description": "Retail-Variety Stores", "fiscal_year_end": "0830"}
FACTS = build_facts(RECORDS, MAPPING, COMPANY, 10, "2026-10-11", "5.61.1")
GET = {(f["item"], f["period_end"]): f for f in FACTS["facts"]}


def test_known_values():
    assert GET[("revenue", "2025-08-31")]["value"] == 275235000000
    assert GET[("capex", "2026-08-30")]["value"] == 6435000000


def test_revenue_tag_changes_without_gaps():
    tags = {GET[("revenue", e)]["source"]["tag"] for e in FACTS["periods"]}
    assert len(tags) >= 2
    assert all(GET[("revenue", e)]["status"] == "reported" for e in FACTS["periods"])


def test_53_week_year_flagged():
    assert "long_year" in GET[("revenue", "2023-09-03")]["flags"]
```

Run: `npm run test:extract`
Expected: all pass.

- [ ] **Step 4: Run the agent on COST and on JPM**

Ask the user for the current COST price and date. Then, in Claude Code: "Use the value-analyst skill for COST, price <P> on <date>". Then the same for JPM. Expected: `npm run sat -- validate` reports `valid` for both; JPM has `result.status = "stopped"` and `stopped_at_step = 0`. Import both files on the Analyses page and review them with the user.

- [ ] **Step 5: Commit**

```bash
git add agent/mapping/line-items.json tools/extract/tests/fixtures/cost-records.json tools/extract/tests/test_cost_fixture.py
git commit -m "Verify extraction on the five-company test set and add the COST fixture

Hand checks (company | item | facts.json | 10-K | match), one line for each of the 50 values from Step 2.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Spec coverage check

| Spec section | Task |
|---|---|
| 2 Architecture, CLI, runners | 8, 9 |
| 3 Extract: rules 1–7, line items, facts format, sections | 1, 2, 3, 11 |
| 4 Calculate: metrics table, adjustments, missing inputs | 4, 5, 6 |
| 5 Interpret: system prompt, steps 0–6, policy, checkpoints | 6, 9 |
| 6 App page | 10 |
| 7 Error handling | 3 (identity, ticker), 2 (n/a, conflicts via Task 1), 1 (restated, long year), 2 (SIC), 7 (validation retries in skill), 9 |
| 8 Testing | 1–7, 10, 11 |
| 9 Prior art | design only |
| 11 Decisions (`analyses/` ignored) | 1 |
