# Valuation models and reusable outputs

The policy DCF remains the Value screen. A failed policy screen is not a universal intrinsic-value conclusion. Additional models never change the policy verdict or silently relax its growth cap.

## Run and read

```sh
npm run sat -- extract AVGO --save-records
npm run sat -- calc AVGO --price 361.54 --price-date 2026-10-09 --adjust data/AVGO/adjustments.json
npm run sat -- compare AVGO --out analyses/AVGO-valuation.md
npm run sat -- validate analyses/AVGO-2026-10-11-v4.json
```

`data/TICKER/metrics.json` contains every metric's value, status, formula and inputs, plus `metric_sets` and `valuation`. Copy `valuation` unchanged into an analysis JSON to display the comparison on Tools → Analyses. The Markdown comparison includes yearly forecasts, all assumptions, conditional reverse DCF and sensitivity tables. The AVGO v4 data directory provides a complete example, including CSV and Excel exports.

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

## Business classification, central model and operating expectations

Set `assumptions.investment_classification` with `business_profile`, `investment_lens`, `central_scenario_id`, `reason`, and an `evidence` array of `{source, finding}`. The referenced explicit segment forecast becomes a provisional central estimate; no style-to-value mapping or highest-value selection occurs. GARP is a price discipline, not a company accounting classification. Keep the original policy decision separate.

Set `operating_expectations: {scenario_id, margins: [0.35, 0.45, 0.55], target_years: [2030, 2035]}`. For each margin estimate, the solver finds a common annual segment revenue growth rate that reprices the full forward DCF to the supplied price. It holds tax, capital intensity, working capital, corporate costs, capital claims and terminal reinvestment to the selected model. Search bounds are 0–200% annual growth; no root or multiple roots are reported instead of an invented answer. Forecast years map to rolling periods from the dated base, not automatically to fiscal years. Milestones must lie inside the full forecast horizon. These are different conditional paths, not independently solved revenue, margin and FCFF targets.

`business_research` stores curated numerical evidence with source URL, as-of date, value, type (`reported`, `management_guidance`, `analyst_estimate`, `market_estimate`, `assumption`) and an explanatory note. Source verification is the analyst’s responsibility; arithmetic validation does not prove the source assertion. Supplemental AI base inputs additionally require checked text-fact excerpts in the analysis. Keep audited segments distinct from management’s supplemental AI measure; subtract AI from total semiconductors before adding non-AI business. Archive short source excerpts and links with the report.

Compare like periods, units and scopes. AI revenue is not consolidated revenue, adjusted margin is not margin including SBC, a single analyst is not consensus, and an industry TAM is not company serviceable revenue. Unavailable 2030/2035 forecasts remain unavailable. Capital-allocation analysis must distinguish payout coverage from value creation, dilution from repurchase dollars, and consolidated ROIC from deal-specific returns. Do not infer acquisition IRR from goodwill or segment revenue growth.

## Valuation confidence and shareholder economics (additive)

Existing DCFs, capital allocation, What Must Be True, policy screening and monitoring remain unchanged. Add `assumptions.valuation_assessment` with ordered `scenario_ids: [bear, central, upside]` (three distinct explicit operating scenarios, including the selected central model) and `range_reason`. The working range is their minimum/maximum, not a statistical confidence interval or exhaustive tail bound. The exact central calculation remains in JSON and calculation tables; use rounded estimates and the range in conclusions.

`factors` maps `forecast_visibility`, `revenue_concentration`, `cyclicality`, `margin_uncertainty`, `reinvestment_uncertainty`, `tax_uncertainty`, `customer_concentration` and `technological_disruption` to `{risk: "low|medium|high|unknown", reason, source}`. Missing evidence is unknown, never reassuring. Terminal dependence and dispersion are calculated. Any high/unknown factor yields Low confidence; at least two medium factors yield Medium; otherwise High. These conservative framework thresholds are judgments, not statistical probabilities. Dispersion is high if range width exceeds central value or a positive upside/downside ratio exceeds 2. Terminal dependence above 75% is high, above 50% medium. Sources, periods and formulas accompany derived assessments. One-at-a-time central sensitivities rank variables only relative to their stated perturbations.

Optional `probabilities.assigned` is `{weights: {scenario_id: fraction, ...}, reason, source, as_of}`. Every selected scenario must be present, each weight between zero and one, with total one. These are **analyst-assigned subjective probabilities — not market-implied probabilities**. Do not populate this object without defensible evidence. Set `probabilities.reason` explaining the limitation instead. Supply `probabilities.sensitivity: [{weights, reason}, ...]` for hypothetical downside-heavy, central-heavy and upside-heavy combinations, clearly labeled sensitivity rather than assigned beliefs. Expected value is sum(value × weight). It is a present valuation, not an expected annual investment return. Missing scenario values cannot silently contribute zero.

`snapshot_context` documents `driver`, `risk` and `thesis_break` (include measurable monitoring thresholds and their assumption basis). `sat compare TICKER --analysis analyses/file.json` uses the validated analysis result for the quality score and required Margin of Safety in the Investment Snapshot. Without that analysis, those fields explicitly remain unavailable.

`valuation.per_share_economics` retains historical formulas and full source inputs. Matching, split-adjusted annual weighted-average diluted shares are the flow denominator; point-in-time outstanding shares are not interchangeable. Net dilution is observed share-count growth, already including repurchases and issuance, not SBC expense minus repurchase spending. It can also reflect dilution-accounting effects. Three/five-year company and per-share CAGRs use matching positive endpoints, consecutive fiscal years, and consistent 53-week normalization. A 2 percentage-point growth gap triggers an explicit materiality explanation. Missing SBC, repurchases, shares or EPS are not assumed zero.

Optional `assumptions.per_share_forecasts[scenario_id]` requires `reason`, `source`, and `base_shares: {value, period_end, source}`. Each optional annual array must match scenario length: `net_share_growth`, `sbc_to_revenue`, `repurchases`, `after_tax_interest`, `non_operating_after_tax_income`, `other_cash_adjustments`. All are explicit analyst estimates, never implicit management guidance. Net share growth applies to effective weighted-average diluted shares and already includes repurchases; repurchase dollars alone cannot determine it. Forecast FCF bridge = FCFF − after-tax interest + SBC + other cash adjustments. Forecast income proxy = NOPAT − after-tax interest + after-tax nonoperating income. Missing bridge inputs leave FCF/share and EPS unavailable. When operating margins exclude acquisition amortization, forecast EPS is an adjusted proxy, not GAAP EPS. These diagnostics do not reprice the existing enterprise DCF or double-deduct SBC. Disclose differences between baseline share dates and operating periods.

`--export-dir` now includes confidence JSON, per-share JSON, per-share metric/growth CSVs and probability sensitivity CSV. Full inputs, formulas, dates and basis labels remain available for audit and independent analysis. Use the four separate report questions: Business Quality, Intrinsic Value, Market Expectations, Investment Decision. Business quality does not justify a price by itself; a failed conservative policy screen is not by itself a universal investment conclusion.
