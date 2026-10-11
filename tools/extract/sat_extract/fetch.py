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
