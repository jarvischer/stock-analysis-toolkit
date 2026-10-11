"""sat extract TICKER — writes data/<TICKER>/facts.json and data/<TICKER>/sections/*.txt."""
from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path

from .facts import build_facts

REPO = Path(__file__).resolve().parents[3]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="sat extract")
    parser.add_argument("ticker")
    parser.add_argument("--out", default="data")
    parser.add_argument("--years", type=int, default=10)
    parser.add_argument("--save-records", action="store_true", help="also write the raw records (for test fixtures)")
    args = parser.parse_args(argv)

    import edgar
    from .fetch import fetch
    from .sections import write_sections, write_short_history_sections

    out = Path(args.out) / args.ticker.upper()
    company, records, handle = fetch(args.ticker)
    mapping = json.loads((REPO / "agent/mapping/line-items.json").read_text())
    facts = build_facts(records, mapping, company, args.years, dt.date.today().isoformat(), edgar.__version__)
    out.mkdir(parents=True, exist_ok=True)
    (out / "facts.json").write_text(json.dumps(facts, indent=2) + "\n")
    if args.save_records:
        (out / "records.json").write_text(json.dumps(records) + "\n")
    sections = write_sections(handle, out / "sections")
    sections += write_short_history_sections(handle, out / "sections", include_prospectus=facts["history_years"] < 3)
    missing = sum(1 for f in facts["facts"] if f["status"] == "not_available")
    print(f"{company['name']} ({company['ticker']}), model fit: {facts['company']['model_fit']}, "
          f"history: {facts['history_years']} years"
          + (f", interim balance sheet {facts['interim']['period_end']}" if facts["interim"] else ""))
    print(f"periods: {', '.join(facts['periods'])}")
    print(f"facts: {len(facts['facts'])} ({missing} not available) → {out / 'facts.json'}")
    print(f"sections: {', '.join(sections)} → {out / 'sections'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
