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
