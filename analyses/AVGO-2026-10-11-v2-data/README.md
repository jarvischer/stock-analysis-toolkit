# AVGO — data and calculations for your own analysis

[Read the full investment report](../AVGO-2026-10-11.md) · [Valuation comparison](../AVGO-2026-10-11-valuation.md) · [Download the Excel workbook](../../output/spreadsheet/AVGO-2026-10-11-v2.xlsx)

This is the complete reference pack behind the report: **285 calculated results, 577 annual/interim/TTM/cover-page records, 721 calculation inputs, 14 unique text facts, and all 109 handbook cards**.

Use the workbook's **My analysis** sheet to enter your own conclusion for each card. Use **Workbench** to change inputs and calculate FCF, FCFF, EV, market cap, ROIC, valuation multiples and a base DCF. The other sheets preserve the original calculation outputs and do not change when you edit Workbench. Its DCF forecast is fixed at ten years and leaves the valuation blank if you choose a different horizon.

## Updated valuation layer

Read [the comparison report](valuation.md). [Reusable assumptions](adjustments.json) reproduce the illustrative scenarios. Copy [model results](valuation-models.csv), [yearly forecasts](forward-forecasts.csv), [segment forecasts](forward-segments.csv), or [sensitivity results](sensitivity.csv). These are also separate workbook sheets. Forecasts are fixed snapshots; change assumptions in the JSON and rerun the calculator to recalculate them. Only Workbench contains live Excel formulas.

Normalized metrics use an explicit illustrative 21% tax rate; this is not a verified sustainable rate. The conservative policy result is preserved. Reported annual tax is negative and is shown unclipped separately from the legacy tax-shield proxy.

## Where to find everything

| Readable reference | What it contains | Copyable data |
| --- | --- | --- |
| [All calculations](calculations.md) | Every metric, result, formula, input, input date and source/derivation | [Metrics CSV](metrics.csv), [Inputs CSV](calculation-inputs.csv) |
| [All reported data](facts.md) | Ten annual periods, latest interim balance sheet, cover-page shares, units and flags | [Facts CSV](facts.csv) |
| [All handbook cards](cards.md) | English/Hebrew titles, formulas, interpretation, cautions and AVGO coverage | [Cards CSV](cards.csv) |
| [Filing text facts](text-facts.md) | Customer concentration, segment figures, pay evidence and exact quotes | [Text facts CSV](text-facts.csv) |
| [Policy](policy.json) | Required margins, stop rules and valuation assumptions | Also in workbook Assumptions |

## Key values to copy

| Measure | Value | Basis |
| --- | --- | --- |
| Free cash flow (FCF) | $26,914,000,000 | Fiscal 2025 |
| Free cash flow to the firm (FCFF) | $22,556,000,000 | Fiscal 2025 |
| EBITDA | $34,120,000,000 | Fiscal 2025 |
| Return on invested capital (ROIC) | 19.90% | Fiscal 2025 |
| FCF margin | 42.13% | Fiscal 2025 |
| Market capitalization | $1,725,858,141,392.10 | See dated calculation inputs |
| Enterprise value (EV) | $1,761,302,141,392.10 | See dated calculation inputs |
| Price / earnings (P/E) | 74.63x | See dated calculation inputs |
| FCF yield | 1.56% | See dated calculation inputs |
| Base DCF value per share | $100.83 | See dated calculation inputs |

## Read the units and dates first

- Monetary values use **full USD**, not millions. Share counts use full shares. CSV ratios are decimal fractions; for example, 0.421275 means about 42.13%.
- FCF is fiscal 2025 operating cash flow less capital expenditure. It differs from FCFF, which also includes financing/tax adjustments and deducts stock-based pay in this model.
- Market cap uses the supplied price from October 9, 2026 and shares dated August 28, 2026. EV uses debt and cash dated August 2, 2026. These dates are intentionally shown separately.
- The extracted latest annual period is November 2, 2025. Annual earnings multiples are not trailing-twelve-month multiples through the latest quarter.
- Missing data is not zero. Assumed-zero inputs are explicitly labeled. Conflicting tags, 53-week periods and restated/split-adjusted data retain their flags.
- The legacy tax-shield proxy remains clipped; separate unclipped reported and explicitly normalized tax metrics are included. Incomplete historical amortization remains unavailable.
- Some cards describe judgment, risk or valuation methods rather than one number. Cards without mapped evidence are marked for further research; handbook examples are not inserted as company figures.
- The three supplementary Workbench multiples (price/FCF, price/sales and EV/revenue) are Excel formulas, not additional outputs from the original calculator.
- Live Excel formulas calculate when the workbook opens in Excel or LibreOffice. Published values are supplied alongside the principal formulas for comparison.

## Preserved source snapshots

[Extracted facts](facts-source.json) · [Calculated metrics and assumptions](metrics-source.json) · [Analysis with citations](analysis-source.json) · [Full English handbook definitions](cards-source.json)

These snapshots preserve the inputs for this report even if a later extraction changes the local data cache.
