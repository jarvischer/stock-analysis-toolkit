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
