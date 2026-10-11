import json
from pathlib import Path

import pytest

from sat_extract.facts import build_facts
from sat_extract.fetch import records_from_company
from sat_extract.sections import write_sections, write_short_history_sections

MAPPING = json.loads((Path(__file__).resolve().parents[3] / "agent/mapping/line-items.json").read_text())
COMPANY = {"ticker": "SPL", "name": "Split Corp", "cik": "0000000003", "sic": 3674,
           "sic_description": "Semiconductors", "fiscal_year_end": "1231"}


def r(concept, value, year, filed, unit="USD"):
    return {"concept": "us-gaap:" + concept, "value": value, "unit": unit, "start": f"{year}-01-01",
            "end": f"{year}-12-31", "form": "10-K", "accession": f"acc-{filed}", "filed": filed}


def split_records():
    # A 10-for-1 split in 2023: the 2024 10-K restates 2022, but 2021 exists only in pre-split filings.
    recs = [r("Revenues", 10.0, y, f"{y + 1}-02-15") for y in (2021, 2022, 2023)]
    recs += [r("WeightedAverageNumberOfDilutedSharesOutstanding", 100.0, 2021, "2022-02-15", "shares"),
             r("WeightedAverageNumberOfDilutedSharesOutstanding", 100.0, 2022, "2023-02-15", "shares"),
             r("WeightedAverageNumberOfDilutedSharesOutstanding", 1000.0, 2022, "2024-02-15", "shares"),
             r("WeightedAverageNumberOfDilutedSharesOutstanding", 1000.0, 2023, "2024-02-15", "shares"),
             r("EarningsPerShareDiluted", 5.0, 2021, "2022-02-15", "USD per share"),
             r("EarningsPerShareDiluted", 5.0, 2022, "2023-02-15", "USD per share"),
             r("EarningsPerShareDiluted", 0.5, 2022, "2024-02-15", "USD per share"),
             r("EarningsPerShareDiluted", 0.6, 2023, "2024-02-15", "USD per share")]
    return recs


def get(out, item, end):
    return next(f for f in out["facts"] if f["item"] == item and f["period_end"] == end)


def test_stock_split_is_adjusted_not_restated():
    out = build_facts(split_records(), MAPPING, COMPANY, 10, "2026-10-11", "5.61.1")
    old = get(out, "diluted_avg_shares", "2021-12-31")
    assert old["value"] == 1000.0 and "split_adjusted" in old["flags"] and old["original_value"] == 100.0
    restated = get(out, "diluted_avg_shares", "2022-12-31")
    assert restated["value"] == 1000.0 and "split_adjusted" in restated["flags"] and "restated" not in restated["flags"]
    assert get(out, "eps_diluted", "2021-12-31")["value"] == pytest.approx(0.5)
    assert "restated" not in get(out, "eps_diluted", "2022-12-31")["flags"]


def test_ordinary_restatement_is_not_a_split():
    recs = [r("Revenues", 10.0, y, f"{y + 1}-02-15") for y in (2021, 2022)]
    recs += [r("WeightedAverageNumberOfDilutedSharesOutstanding", 100.0, 2021, "2022-02-15", "shares"),
             r("WeightedAverageNumberOfDilutedSharesOutstanding", 98.0, 2021, "2023-02-15", "shares"),
             r("WeightedAverageNumberOfDilutedSharesOutstanding", 99.0, 2022, "2023-02-15", "shares")]
    f = get(build_facts(recs, MAPPING, COMPANY, 10, "2026-10-11", "5.61.1"), "diluted_avg_shares", "2021-12-31")
    assert f["value"] == 98.0 and "restated" in f["flags"] and "split_adjusted" not in f["flags"]


class FakeFiling:
    def __init__(self, form, fail=False):
        self.form, self.accession_no, self.filing_date, self.fail = form, "0000000003-26-000001", "2026-02-15", fail

    def obj(self):
        if self.fail:
            raise ValueError("cannot parse")
        return {"Item 1": "Business text"}

    def text(self):
        if self.fail:
            raise ValueError("cannot read")
        return "full text"


class FakeFilings(list):
    def latest(self):
        return self[0] if self else None


class FakeCompany:
    def __init__(self, filings, facts=None):
        self.filings, self.facts, self.calls = filings, facts, []

    def get_filings(self, form, amendments=True):
        self.calls.append((form, amendments))
        return FakeFilings([f for f in self.filings if f.form == form])

    def get_facts(self):
        return self.facts


def test_no_xbrl_facts_gives_no_records():
    assert records_from_company(FakeCompany([], facts=None)) == []


def test_sections_skip_amendments_and_survive_parse_errors(tmp_path):
    company = FakeCompany([FakeFiling("10-K", fail=True), FakeFiling("DEF 14A", fail=True),
                           FakeFiling("10-Q", fail=True), FakeFiling("424B4")])
    write_sections(company, tmp_path)
    write_short_history_sections(company, tmp_path)
    assert all(amend is False for _, amend in company.calls)
    assert "not available" in (tmp_path / "item1.txt").read_text()
    assert "not available" in (tmp_path / "latest_10q.txt").read_text()
    assert "full text" in (tmp_path / "prospectus.txt").read_text()


def test_missing_xbrl_facts_are_reported(capsys):
    records_from_company(FakeCompany([], facts=None))
    assert "no XBRL company facts" in capsys.readouterr().err
