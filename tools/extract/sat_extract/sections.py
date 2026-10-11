"""10-K sections, the executive pay part of the proxy statement, and (for a short history)
the latest 10-Q and the prospectus, as plain text. The first line of each file names the filing."""
from __future__ import annotations

from pathlib import Path

TENK_ITEMS = {"item1": "Item 1", "item1a": "Item 1A", "item7": "Item 7", "item7a": "Item 7A", "item8": "Item 8"}
PAY_HEADING = "Compensation Discussion and Analysis"
PAY_MAX_CHARS = 60_000


def _latest(company, form: str):
    filings = company.get_filings(form=form)
    return filings.latest() if filings else None


def _header(filing) -> str:
    return f"# {filing.form} {filing.accession_no} filed {filing.filing_date}"


def write_sections(company, out_dir: Path) -> list[str]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    filing = _latest(company, "10-K")
    tenk = filing.obj() if filing is not None else None
    for key, item in TENK_ITEMS.items():
        if tenk is None:
            text = "# no 10-K filed\n\nnot available"
        else:
            text = f"{_header(filing)} — {item}\n\n{tenk[item] or 'not available'}"
        (out_dir / f"{key}.txt").write_text(text + "\n")
        written.append(key)
    pay = "not available"
    proxy = _latest(company, "DEF 14A")
    if proxy is not None:
        try:
            text = proxy.text() or ""
        except Exception as exc:  # a proxy that cannot be parsed must not stop the extraction
            text = ""
            pay = f"not available ({exc.__class__.__name__} while reading DEF 14A {proxy.accession_no})"
        first = text.find(PAY_HEADING)
        second = text.find(PAY_HEADING, first + 1) if first >= 0 else -1
        start = second if second >= 0 else first  # the first match is usually the table of contents
        if start >= 0:
            pay = f"{_header(proxy)}\n\n{text[start:start + PAY_MAX_CHARS]}"
    (out_dir / "proxy_pay.txt").write_text(pay + "\n")
    written.append("proxy_pay")
    return written


def write_short_history_sections(company, out_dir: Path) -> list[str]:
    """Latest 10-Q and prospectus (424B4, else S-1). The prospectus can be over 1.5 million characters;
    the agent searches it and does not read all of it."""
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    for key, forms in (("latest_10q", ["10-Q"]), ("prospectus", ["424B4", "S-1"])):
        filing = next((f for f in (_latest(company, form) for form in forms) if f is not None), None)
        if filing is None:
            continue
        (out_dir / f"{key}.txt").write_text(f"{_header(filing)}\n\n{filing.text()}\n")
        written.append(key)
    return written
