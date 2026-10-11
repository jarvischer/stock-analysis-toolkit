"""10-K sections and the executive pay part of the proxy statement, as plain text."""
from __future__ import annotations

from pathlib import Path

TENK_ITEMS = {"item1": "Item 1", "item1a": "Item 1A", "item7": "Item 7", "item7a": "Item 7A", "item8": "Item 8"}
PAY_HEADING = "Compensation Discussion and Analysis"
PAY_MAX_CHARS = 60_000


def write_sections(company, out_dir: Path) -> list[str]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    filing = company.get_filings(form="10-K").latest()
    tenk = filing.obj()
    for key, item in TENK_ITEMS.items():
        text = tenk[item] or "not available"
        (out_dir / f"{key}.txt").write_text(
            f"# {filing.form} {filing.accession_no} filed {filing.filing_date} — {item}\n\n{text}\n")
        written.append(key)
    pay = "not available"
    proxy = company.get_filings(form="DEF 14A").latest()
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
            pay = f"# DEF 14A {proxy.accession_no} filed {proxy.filing_date}\n\n{text[start:start + PAY_MAX_CHARS]}"
    (out_dir / "proxy_pay.txt").write_text(pay + "\n")
    written.append("proxy_pay")
    return written
