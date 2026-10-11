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
