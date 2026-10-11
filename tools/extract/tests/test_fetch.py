import datetime as dt

import pandas as pd
import pytest

from sat_extract.fetch import records_from_dataframe, require_identity


def test_identity_required():
    with pytest.raises(SystemExit) as err:
        require_identity({"EDGAR_NAME": "A"})
    assert "EDGAR_EMAIL" in str(err.value)
    assert require_identity({"EDGAR_NAME": "A B", "EDGAR_EMAIL": "a@b.c"}) == "A B a@b.c"


def test_records_from_dataframe():
    df = pd.DataFrame([
        {"concept": "us-gaap:Revenues", "numeric_value": 275235000000.0, "unit": "USD",
         "period_start": dt.date(2024, 9, 2), "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "0000909832-25-000101", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "us-gaap:AssetsCurrent", "numeric_value": 40.0, "unit": "USD",
         "period_start": pd.NaT, "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "x", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "dei:EntityRegistrantName", "numeric_value": None, "unit": None,
         "period_start": pd.NaT, "period_end": dt.date(2025, 8, 31), "form_type": "10-K",
         "accession": "x", "filing_date": dt.date(2025, 10, 8)},
        {"concept": "us-gaap:Revenues", "numeric_value": 70.0, "unit": "USD",
         "period_start": dt.date(2025, 9, 1), "period_end": dt.date(2025, 11, 23), "form_type": "10-Q",
         "accession": "q", "filing_date": dt.date(2025, 12, 10)},
    ])
    out = records_from_dataframe(df)
    assert out == [
        {"concept": "us-gaap:Revenues", "value": 275235000000.0, "unit": "USD", "start": "2024-09-02",
         "end": "2025-08-31", "form": "10-K", "accession": "0000909832-25-000101", "filed": "2025-10-08"},
        {"concept": "us-gaap:AssetsCurrent", "value": 40.0, "unit": "USD", "start": None,
         "end": "2025-08-31", "form": "10-K", "accession": "x", "filed": "2025-10-08"},
    ]
