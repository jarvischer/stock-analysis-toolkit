"""Build facts.json: one value (or an explicit gap) for each mapped item and period."""
from __future__ import annotations

from .select import ANNUAL_FORMS, INTERIM_FORMS, annual_series

FINANCIAL_SIC = range(6000, 6800)  # banks, insurers, REITs and other financial companies


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
    for key in ("original_value", "original_accession", "conflict"):
        if key in chosen:
            fact[key] = chosen[key]
    return fact


def _constructed(item: str, end: str, spec: dict, records: list[dict], forms: set[str] = ANNUAL_FORMS) -> dict | None:
    rule = spec.get("construct")
    if not rule:
        return None
    parts, total, period_days, flags = [], 0.0, None, ["constructed"]
    for group in rule["required"]:
        chosen = annual_series(records, group, spec["unit"], spec["kind"], forms).get(end)
        if chosen is None:
            return None
        parts.append(chosen)
    for group in rule.get("optional", []):
        chosen = annual_series(records, group, spec["unit"], spec["kind"], forms).get(end)
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
    sic = int(company["sic"]) if company.get("sic") not in (None, "") else None
    return {"schema_version": 1,
            "company": {**company, "sic": sic,
                        "model_fit": "not_suitable" if sic in FINANCIAL_SIC else "suitable"},
            "extracted_at": extracted_at, "edgartools_version": edgartools_version,
            "periods": periods, "history_years": len(periods),
            "interim": _interim(records, mapping, periods[-1] if periods else None),
            "facts": facts}
