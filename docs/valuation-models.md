# Valuation models and reusable outputs

The policy DCF remains the Value screen. A failed policy screen is not a universal intrinsic-value conclusion. Additional models never change the policy verdict or silently relax its growth cap.

## Run and read

```sh
npm run sat -- extract AVGO --save-records
npm run sat -- calc AVGO --price 361.54 --price-date 2026-10-09 --adjust data/AVGO/adjustments.json
npm run sat -- compare AVGO --out analyses/AVGO-valuation.md
npm run sat -- validate analyses/AVGO-2026-10-11-v2.json
```

`data/TICKER/metrics.json` contains every metric's value, status, formula and inputs, plus `metric_sets` and `valuation`. Copy `valuation` unchanged into an analysis JSON to display the comparison on Tools → Analyses. The Markdown comparison includes yearly forecasts, all assumptions, conditional reverse DCF and sensitivity tables. The AVGO v2 data directory provides a complete example, including CSV and Excel exports.

## Periods and accounting bases

- TTM = latest annual + current fiscal YTD − matching prior fiscal YTD. Match exact source intervals and comparable fiscal durations; never sum overlapping quarters. Every constructed fact stores its three source components. EPS and share counts are not additive. Valuation uses dated current shares and capital claims.
- Reported annual and TTM metrics retain reported accounting inputs. The unclipped effective tax rate is shown separately from the legacy cash-flow tax-shield proxy.
- Adjusted metrics apply documented item deltas. They do not overwrite `metric_sets.reported`.
- Normalized metrics require a sourced, explained tax assumption. Normalized FCFF = EBIT × (1 − tax) + complete D&A − CapEx − change in operating working capital. SBC remains an expense in EBIT, so there is no second subtraction. OWC is receivables + inventory − payables: this is a disclosed approximation, not every noncash operating balance.
- Normalized owner earnings require an explicit maintenance CapEx proxy: `depreciation`, `reported_capex`, or a dated `amount`. Physical depreciation is a proxy, not proof of replacement spending. Acquisition amortization does not automatically represent maintenance investment. These owner earnings retain the conventional noncash addbacks; evaluate SBC dilution separately.
- D&A construction requires both depreciation and amortization. Missing amortization is not assumed zero; affected EBITDA and valuations remain unavailable unless a complete reported aggregate exists.

Normalization example under `adjustments.assumptions`:

```json
{
  "normalization": {
    "tax_rate": {"value": 0.21, "reason": "Illustrative estimate, not the observed sustainable company rate", "source": "Analyst assumption"},
    "maintenance_capex": {"method": "depreciation", "reason": "Physical asset replacement proxy; excludes acquisition amortization", "source": "Analyst assumption"}
  }
}
```

## Explicit forward scenarios

`assumptions.forward_scenarios` is an array of at most 12 scenarios. Each needs:

- Unique `id`, `style` (`value`, `growth`, `garp`, `quality`), `reason`, `source`, `years` (1–30), `tax_rate`, `wacc`, `terminal_growth`, `terminal_roic`.
- `sbc_treatment: "expensed_in_margins"` and `corporate_costs` with one nonnegative amount for each forecast year. Zero is appropriate only when all corporate costs are allocated to segment margins.
- Non-overlapping `segments`, each with `name`, `base_revenue`, `base_working_capital_ratio`, and annual arrays for `growth`, `operating_margin`, `depreciation_to_revenue`, `capex_to_revenue`, `working_capital_to_revenue`.
- `base_revenue` has a consolidated `period_end` and signed `components`: `item`, `value`, `sign` (+1/−1), `source`, optional component `period_end`. This supports annual + current YTD − prior YTD segment bridges. Their sum must reconcile to consolidated revenue. Text-only companies can supply a dated, sourced `consolidated_revenue` checked against a revenue text fact.

The analysis validator checks every base component against a reported or validated text fact, including its date and source. Forecast estimates themselves are assumptions, not validated facts. Missing styles stay `not_configured`; styles never create an automatic valuation premium.

Annual FCFF = EBIT − tax estimate + depreciation − CapEx − ΔOWC. Forecast losses do not assume a tax refund. Margins and depreciation must use a consistent accounting basis: if margins exclude acquisition amortization, do not add that amortization back again.

Terminal FCFF = next-year NOPAT × (1 − terminal growth / terminal ROIC). Require WACC and terminal ROIC greater than terminal growth. EV is discounted annual FCFF plus discounted terminal value. Equity value subtracts debt and other claims and adds cash before division by dated shares.

## Interpretation

Historical sensitivity varies WACC, constant FCFF growth and terminal growth. Forward sensitivity varies WACC, all segment growth rates by ±2 percentage points, and terminal growth, recalculating operating cash flows and reinvestment. Default grids have three values per axis; explicit historical grids support 1–5.

Reverse DCF is conditional on its cash-flow base, discount rate, terminal growth, capital bridge and horizon. It is not an observation of market expectations. Forward year-one FCFF is displayed separately and is not treated as an already-earned starting cash flow.

Margin of safety = (value − price) / value. Value gap = (value − price) / price. Price/value is also shown. Negative values are not meaningful margin-of-safety denominators. None of these figures predicts a realized return.
