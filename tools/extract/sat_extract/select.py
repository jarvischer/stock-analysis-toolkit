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
