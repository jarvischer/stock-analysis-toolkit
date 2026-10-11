"""Build facts.json: one value (or an explicit gap) for each mapped item and period."""
from __future__ import annotations

from .select import ANNUAL_FORMS, INTERIM_FORMS, annual_series

FINANCIAL_SIC = range(6000, 6800)  # banks, insurers, REITs and other financial companies
SPLIT_ITEMS = {"diluted_avg_shares": 1, "shares_outstanding": 1, "eps_diluted": -1}  # exponent of the share factor
SPLIT_TOLERANCE = 0.02


def _periods(records: list[dict], mapping: dict, years: int) -> list[str]:
    ends: set[str] = set()
    for item in mapping["period_items"]:
        spec = mapping["items"][item]
        ends.update(annual_series(records, spec["tags"], spec["unit"], spec["kind"]))
    return sorted(ends)[-years:]


def _missing(item: str, end: str, spec: dict) -> dict:
    return {"item": item, "period_end": end, "period_days": None, "value": None, "unit": spec["unit"],
            "status": "not_available", "source": None, "flags": [], "tried": list(spec["tags"])}


def _reported(item: str, end: str, unit: str, chosen: dict) -> dict:
    fact = {"item": item, "period_end": end, "period_days": chosen.get("period_days"),
            "value": chosen["value"], "unit": unit, "status": "reported",
            "source": {"tag": chosen["tag"], "form": chosen["form"],
                       "accession": chosen["accession"], "filed": chosen["filed"]},
            "flags": list(chosen["flags"])}
    for key in ("original_value", "original_accession", "previous_value", "conflict"):
        if key in chosen:
            fact[key] = chosen[key]
    return fact


def _constructed(item: str, end: str, spec: dict, records: list[dict], forms: set[str] = ANNUAL_FORMS) -> dict | None:
    rule = spec.get("construct")
    if not rule:
        return None
    parts, total, period_days, flags = [], 0.0, None, ["constructed"]
    for group, sign in [(g, 1) for g in rule["required"]] + [(g, -1) for g in rule.get("subtract", [])]:
        chosen = annual_series(records, group, spec["unit"], spec["kind"], forms).get(end)
        if chosen is None:
            return None
        parts.append({**chosen, "sign": sign})
    for group in rule.get("optional", []):
        chosen = annual_series(records, group, spec["unit"], spec["kind"], forms).get(end)
        if chosen is not None:
            parts.append({**chosen, "sign": 1})
    for chosen in parts:
        total += chosen["sign"] * chosen["value"]
        if chosen["tag"] in rule.get("flag_tags", {}):
            flags.append(rule["flag_tags"][chosen["tag"]])
        period_days = period_days or chosen.get("period_days")
        flags.extend(f for f in chosen["flags"] if f not in flags)
    return {"item": item, "period_end": end, "period_days": period_days, "value": total,
            "unit": spec["unit"], "status": "constructed",
            "source": {"parts": [{"tag": c["tag"], "value": c["value"], "sign": c["sign"], "accession": c["accession"]} for c in parts]},
            "flags": flags}


def _interim(records: list[dict], mapping: dict, last_period: str | None) -> dict | None:
    """The newest 10-Q balance sheet, if it is newer than the last annual period."""
    instants = {item: spec for item, spec in mapping["items"].items() if spec["kind"] == "instant"}
    series = {item: annual_series(records, spec["tags"], spec["unit"], "instant", INTERIM_FORMS)
              for item, spec in instants.items()}
    ends = sorted({end for values in series.values() for end in values})
    if not ends or (last_period is not None and ends[-1] <= last_period):
        return None
    end = ends[-1]
    facts = []
    for item, spec in instants.items():
        if end in series[item]:
            facts.append(_reported(item, end, spec["unit"], series[item][end]))
        else:
            facts.append(_constructed(item, end, spec, records, INTERIM_FORMS) or _missing(item, end, spec))
    return {"period_end": end, "form": "10-Q", "facts": facts}


def _split_factor(fact: dict) -> float | None:
    """Share factor (10 for a 10-for-1 split, 0.25 for a 1-for-4 reverse split) when a restatement
    changed a share count or EPS by a whole-number ratio."""
    if "restated" not in fact["flags"] or not fact.get("previous_value"):
        return None
    ratio = fact["value"] / fact["previous_value"]
    shares = ratio if SPLIT_ITEMS[fact["item"]] == 1 else 1 / ratio
    whole = shares if shares >= 1 else 1 / shares
    if whole < 1.5 or abs(whole - round(whole)) > SPLIT_TOLERANCE * whole:
        return None
    return float(round(whole)) if shares >= 1 else 1 / round(whole)


def _adjust_for_splits(facts: list[dict]) -> None:
    """A 10-K restates share counts for a split only in its own comparative years. Older years come from
    pre-split filings, so scale them, and mark split restatements as split_adjusted, not restated."""
    share_facts = [f for f in facts if f["item"] in SPLIT_ITEMS and f["status"] == "reported"]
    events: dict[str, float] = {}
    for f in share_facts:
        factor = _split_factor(f)
        if factor:
            events[f["source"]["filed"]] = factor
            f["flags"] = [x for x in f["flags"] if x != "restated"] + ["split_adjusted"]
    for filed, factor in sorted(events.items()):
        for f in share_facts:
            if f["source"]["filed"] < filed:
                f.setdefault("original_value", f["value"])
                f["value"] = f["value"] * factor ** SPLIT_ITEMS[f["item"]]
                if "split_adjusted" not in f["flags"]:
                    f["flags"].append("split_adjusted")


def _cover_shares(records: list[dict], tag: str | None) -> dict | None:
    """The newest cover-page share count (10-K or 10-Q). It is dated after the period end and is the most
    current count for per-share values. Several values for the same date and filing are share classes."""
    hits = [r for r in records if tag and r["concept"] == tag and r["unit"] == "shares" and r["form"] in ANNUAL_FORMS | INTERIM_FORMS]
    if not hits:
        return None
    newest = max(hits, key=lambda r: (r["end"], r["filed"]))
    same = [r for r in hits if r["end"] == newest["end"] and r["accession"] == newest["accession"]]
    values = {r["value"] for r in same}  # identical values are one fact listed twice
    return {"value": sum(values), "date": newest["end"],
            "source": {"tag": tag, "form": newest["form"], "accession": newest["accession"], "filed": newest["filed"]},
            "flags": ["summed_classes"] if len(values) > 1 else []}


def build_facts(records: list[dict], mapping: dict, company: dict, years: int,
                extracted_at: str, edgartools_version: str) -> dict:
    periods = _periods(records, mapping, years)
    facts = []
    for item, spec in mapping["items"].items():
        series = annual_series(records, spec["tags"], spec["unit"], spec["kind"])
        for end in periods:
            if end in series:
                facts.append(_reported(item, end, spec["unit"], series[end]))
            else:
                facts.append(_constructed(item, end, spec, records) or _missing(item, end, spec))
    _adjust_for_splits(facts)
    sic = int(company["sic"]) if company.get("sic") not in (None, "") else None
    return {"schema_version": 1,
            "company": {**company, "sic": sic,
                        "model_fit": "not_suitable" if sic in FINANCIAL_SIC else "suitable"},
            "extracted_at": extracted_at, "edgartools_version": edgartools_version,
            "periods": periods, "history_years": len(periods),
            "interim": _interim(records, mapping, periods[-1] if periods else None),
            "cover_shares": _cover_shares(records, mapping.get("cover_shares_tag")),
            "facts": facts}
