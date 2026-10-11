"""SEC EDGAR access through edgartools. Network code lives only here."""
from __future__ import annotations

import os
import sys
from collections.abc import Mapping

import pandas as pd

from .select import ANNUAL_FORMS, INTERIM_FORMS


def require_identity(env: Mapping[str, str] = os.environ) -> str:
    missing = [k for k in ("EDGAR_NAME", "EDGAR_EMAIL") if not env.get(k)]
    if missing:
        raise SystemExit(f"Set {' and '.join(missing)} in the environment. SEC requires a name and an "
                         "email address in each request (https://www.sec.gov/os/accessing-edgar-data).")
    return f"{env['EDGAR_NAME']} {env['EDGAR_EMAIL']}"


def _iso(value) -> str | None:
    return None if value is None or pd.isna(value) else str(value)[:10]


def records_from_dataframe(df: pd.DataFrame) -> list[dict]:
    keep = df[df["form_type"].isin(ANNUAL_FORMS | INTERIM_FORMS) & df["numeric_value"].notna()]
    return [{"concept": r.concept, "value": float(r.numeric_value), "unit": r.unit,
             "start": _iso(r.period_start), "end": _iso(r.period_end), "form": r.form_type,
             "accession": r.accession, "filed": _iso(r.filing_date)}
            for r in keep.itertuples(index=False)]


def records_from_company(company) -> list[dict]:
    """XBRL records, or [] when SEC has no company facts (for example a very recent IPO) or they cannot be parsed."""
    facts = company.get_facts()  # edgartools returns None in both cases
    if facts is None:
        print("warning: SEC returned no XBRL company facts for this company; only text sections are available",
              file=sys.stderr)
        return []
    return records_from_dataframe(facts.to_dataframe(include_metadata=True))


def fetch(ticker: str):
    """Return (company_info, records, edgar_company). Raises SystemExit for an unknown ticker."""
    import edgar  # imported here so tests do not need network setup

    edgar.set_identity(require_identity())
    # No edgar.use_local_storage(): in that mode get_facts() reads only a local bulk download and returns None.
    try:
        company = edgar.Company(ticker)
    except Exception as exc:  # edgartools raises for unknown tickers
        raise SystemExit(f"Ticker not found in SEC EDGAR: {ticker} ({exc})") from exc
    if getattr(company, "not_found", False):
        raise SystemExit(f"Ticker not found in SEC EDGAR: {ticker}")
    info = {"ticker": ticker.upper(), "name": company.name, "cik": str(company.cik).zfill(10),
            "sic": company.sic, "sic_description": getattr(company, "sic_description", None),
            "fiscal_year_end": getattr(company, "fiscal_year_end", None)}
    return info, records_from_company(company), company
