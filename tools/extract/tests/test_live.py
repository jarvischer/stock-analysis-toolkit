"""Live check against SEC EDGAR. Run with: uv run --project tools/extract pytest -m live"""
import json
import subprocess
import sys

import pytest


@pytest.mark.live
def test_cost_extract(tmp_path):
    subprocess.run([sys.executable, "-m", "sat_extract", "COST", "--out", str(tmp_path)], check=True)
    facts = json.loads((tmp_path / "COST" / "facts.json").read_text())
    get = {(f["item"], f["period_end"]): f for f in facts["facts"]}
    assert get[("revenue", "2025-08-31")]["value"] == 275235000000
    assert get[("capex", "2026-08-30")]["value"] == 6435000000
    assert facts["company"]["model_fit"] == "suitable"
    assert (tmp_path / "COST" / "sections" / "item1a.txt").stat().st_size > 10_000


@pytest.mark.live
def test_spcx_short_history(tmp_path):
    subprocess.run([sys.executable, "-m", "sat_extract", "SPCX", "--out", str(tmp_path)], check=True)
    facts = json.loads((tmp_path / "SPCX" / "facts.json").read_text())
    assert facts["history_years"] < 3
    assert facts["interim"]["period_end"] >= "2026-06-30"
    assert (tmp_path / "SPCX" / "sections" / "prospectus.txt").stat().st_size > 100_000
