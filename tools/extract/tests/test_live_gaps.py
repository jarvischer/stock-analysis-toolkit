"""Mapping gaps found in the live run (Task 14): AAL, INTC, SNOW."""
import json
from pathlib import Path

from sat_extract.facts import build_facts

MAPPING = json.loads((Path(__file__).resolve().parents[3] / "agent/mapping/line-items.json").read_text())
COMPANY = {"ticker": "GAP", "name": "Gap Test", "cik": "0000000004", "sic": 4512,
           "sic_description": "Air transport", "fiscal_year_end": "1231"}
END = "2025-12-31"


def r(concept, value, start=None, end=END, form="10-K", unit="USD", filed="2026-02-15", acc="0000000004-26-000001"):
    return {"concept": concept, "value": value, "unit": unit, "start": start, "end": end,
            "form": form, "accession": acc, "filed": filed}


BASE = [r("us-gaap:Revenues", 100.0, start="2025-01-01")]


def build(extra):
    return build_facts(BASE + extra, MAPPING, COMPANY, 10, "2026-10-11", "5.61.1")


def get(out, item):
    return next(f for f in out["facts"] if f["item"] == item and f["period_end"] == END)


def test_total_liabilities_from_liabilities_and_equity_minus_equity():
    out = build([r("us-gaap:LiabilitiesAndStockholdersEquity", 60.0), r("us-gaap:StockholdersEquity", -4.0)])
    f = get(out, "total_liabilities")
    assert f["status"] == "constructed" and f["value"] == 64.0
    assert [p["tag"] for p in f["source"]["parts"]] == ["us-gaap:LiabilitiesAndStockholdersEquity", "us-gaap:StockholdersEquity"]
    assert f["source"]["parts"][1]["sign"] == -1


def test_cash_from_the_cash_tag():
    f = get(build([r("us-gaap:Cash", 1.5)]), "cash_sti")
    assert f["status"] == "constructed" and f["value"] == 1.5


def test_cash_including_restricted_cash_is_the_last_choice_and_flagged():
    f = get(build([r("us-gaap:CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", 25.0)]), "cash_sti")
    assert f["value"] == 25.0 and "includes_restricted_cash" in f["flags"]


def test_cover_page_shares_are_kept_with_their_date():
    out = build([r("dei:EntityCommonStockSharesOutstanding", 340.0, end="2026-03-10", unit="shares", filed="2026-03-20"),
                 r("dei:EntityCommonStockSharesOutstanding", 345.0, end="2026-08-25", form="10-Q", unit="shares", filed="2026-08-30")])
    assert out["cover_shares"]["value"] == 345.0 and out["cover_shares"]["date"] == "2026-08-25"
    assert out["cover_shares"]["source"]["form"] == "10-Q"


def test_cover_page_shares_of_several_classes_are_added():
    out = build([r("dei:EntityCommonStockSharesOutstanding", 300.0, end="2026-03-10", unit="shares"),
                 r("dei:EntityCommonStockSharesOutstanding", 40.0, end="2026-03-10", unit="shares")])
    assert out["cover_shares"]["value"] == 340.0 and "summed_classes" in out["cover_shares"]["flags"]
