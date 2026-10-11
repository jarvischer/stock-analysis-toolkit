import json
from pathlib import Path

from sat_extract.facts import build_facts
from sat_extract.select import INTERIM_FORMS, annual_series

MAPPING = json.loads((Path(__file__).resolve().parents[3] / "agent/mapping/line-items.json").read_text())
COMPANY = {"ticker": "YNG", "name": "Young Corp", "cik": "0000000002", "sic": 7370,
           "sic_description": "Services", "fiscal_year_end": "1231"}


def r(concept, value, end, start=None, form="10-K", filed="2026-08-04"):
    return {"concept": "us-gaap:" + concept, "value": value, "unit": "shares" if "Shares" in concept else "USD",
            "start": start, "end": end, "form": form, "accession": "0000000002-26-000001", "filed": filed}


def build(records):
    return build_facts(records, MAPPING, COMPANY, 10, "2026-10-11", "5.61.1")


def test_forms_parameter():
    recs = [r("Assets", 192.77e9, "2026-06-30", form="10-Q")]
    assert annual_series(recs, ["us-gaap:Assets"], "USD", "instant") == {}
    assert annual_series(recs, ["us-gaap:Assets"], "USD", "instant", INTERIM_FORMS)["2026-06-30"]["value"] == 192.77e9


def test_no_annual_periods_still_builds():
    recs = [r("CashAndCashEquivalentsAtCarryingValue", 93.522e9, "2026-06-30", form="10-Q"),
            r("CommonStockSharesOutstanding", 5.0e9, "2026-06-30", form="10-Q")]
    out = build(recs)
    assert out["periods"] == [] and out["history_years"] == 0 and out["facts"] == []
    interim = {f["item"]: f for f in out["interim"]["facts"]}
    assert out["interim"]["period_end"] == "2026-06-30"
    assert interim["cash_sti"]["status"] == "constructed" and interim["cash_sti"]["value"] == 93.522e9
    assert interim["shares_outstanding"]["value"] == 5.0e9
    assert interim["long_term_debt"]["status"] == "not_available"


def test_interim_only_when_newer_than_last_annual():
    annual = [r("Revenues", 100.0, "2025-12-31", start="2025-01-01", filed="2026-02-15"),
              r("Assets", 90.0, "2025-12-31", filed="2026-02-15")]
    older = annual + [r("Assets", 80.0, "2025-06-30", form="10-Q")]
    newer = annual + [r("Assets", 95.0, "2026-06-30", form="10-Q")]
    assert build(older)["interim"] is None
    assert build(newer)["interim"]["period_end"] == "2026-06-30"
    assert build(newer)["history_years"] == 1
