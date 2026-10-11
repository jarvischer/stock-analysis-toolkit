---
name: value-analyst
description: Run a value investing analysis of a US company from its SEC filings, and show each step with sources and decision drivers. Use when the user asks to analyze, assess or value a US stock or ticker as a value investor. Do not use for trading, price prediction or non-US companies.
---

# Value analyst

Read `agent/analyst.md` completely before you start, and follow it. It is the method and the rules.

## Procedure

1. Get the ticker, the share price and the price date from the user's request. If the price or the date is missing and the user is present, ask for them. In headless mode without a price, continue without valuation metrics and say so in `result.summary`.
2. Make sure `EDGAR_NAME` and `EDGAR_EMAIL` are set: `node -e "process.exit(process.env.EDGAR_NAME && process.env.EDGAR_EMAIL ? 0 : 1)"`. If not, stop and tell the user to set them. Never set them yourself.
3. Run `npm run sat -- extract <T>`.
4. Run `npm run sat -- calc <T> --price <P> --price-date <YYYY-MM-DD>`.
5. Read `data/<T>/facts.json`, `data/<T>/metrics.json`, `agent/policy.json` and the files in `data/<T>/sections/` that each step needs.
6. Do steps 0–6 of `agent/analyst.md`. Make adjustments only through `data/<T>/adjustments.json` and `npm run sat -- calc … --adjust`.
7. Write `analyses/<T>-<today>.json`. Use `"runner": "claude-code"` in Claude Code and `"runner": "codex"` in Codex.
8. Run `npm run sat -- validate analyses/<T>-<today>.json`. If there are errors, fix them and run it again (at most two more times). If errors remain, report them.
9. Show the user: `result.status`, the quality score, the margin of safety against the requirement, the main drivers, the warnings, and this sentence: "Import the file on the Analyses page of the app to see every step."
