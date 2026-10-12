# RKLB: valuation comparison

Price: $68.21 on 2026-10-09.

These are conditional model estimates, not price targets. The conservative policy verdict is separate from the forward scenarios. Missing models are not assigned an invented value.

## Investment Snapshot

| Item | Assessment |
| --- | --- |
| Business classification | Not classified |
| Current price | $68.21; 2026-10-09 |
| Central valuation | Not available |
| Reasonable valuation range | Not available |
| Valuation confidence | Low |
| Slowdown / Bear | Not available |
| Upside | Not available |
| Scenario-weighted expected value | Not assigned — insufficient evidence |
| Current price / central value | Not available |
| Current price / expected value | Not available |
| Required Margin of Safety | Not available |
| Business quality score | Not supplied; see policy analysis |
| Primary valuation driver | Not documented |
| Most sensitive variables | Not assessed |
| Primary risk | Not documented |
| Primary thesis-break condition | Not documented |

### Four separate questions

| Question | Interpretation |
| --- | --- |
| Business Quality | Is this a good business? Assess durability, returns on capital and stewardship; quality does not set its price. |
| Intrinsic Value | What are future cash flows reasonably worth? Use explicit operating assumptions and the confidence range. |
| Market Expectations | What must the company achieve to justify today's price? Read the conditional What Must Be True operating paths and compare their plausibility with sourced evidence. |
| Investment Decision | Consider quality, valuation, uncertainty, returns, required Margin of Safety and thesis risks together. The historical policy screen is one constraint; its failure alone is not a universal judgment about attractiveness. |

Expected value here is a probability-weighted present valuation, not an annualized or realized investment return. Estimating investor returns additionally requires a holding period, distributions, exit valuation and a consistent future share count.

## Valuation confidence and uncertainty

No documented confidence assessment; absence of evidence is not high confidence.

| Evidence factor | Risk | Reason | Source |
| --- | --- | --- | --- |

### Central valuation sensitivity

One assumption changes at a time; rankings depend on these stated perturbations, not a universal measure of importance.

| Variable | Shift (percentage points) | Lower input value/share | Higher input value/share |
| --- | --- | --- | --- |

## Scenario probabilities and expected value

Probabilities not assigned.

Probabilities cannot be responsibly assigned from available evidence.

| Scenario | Value/share | Probability | Contribution |
| --- | --- | --- | --- |



| Combination | Scenario probabilities | Weighted valuation |
| --- | --- | --- |

## Per-share economics

Historical flows use matching split-adjusted weighted-average diluted shares, not point-in-time shares outstanding. Observed diluted share changes include repurchases, issuance and dilution-accounting effects; they do not identify gross issuance separately.

Forecast share paths are explicit analyst diagnostics; they do not reprice the existing enterprise DCF. Its current-share denominator and expensed SBC remain unchanged. Forecast EPS is an adjusted operating proxy when scenario margins exclude acquisition amortization. Missing bridge inputs make FCF/EPS unavailable.

### Reported historical periods

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2020-12-31 | $0.47 | $-0.7 | $-0.76 | $-0.73 | $0.06 | 75,414,888 | Not available | 12.00% | Not available | Not available |
| 2021-12-31 | $0.3 | $-0.46 | $-0.62 | $-0.56 | $0.16 | 209,895,135 | 178.32% | 52.31% | Not available | 178.32% |
| 2022-12-31 | $0.45 | $-0.32 | $-0.44 | $-0.29 | $0.12 | 466,214,095 | 122.12% | 26.37% | Not available | 122.12% |
| 2023-12-31 | $0.51 | $-0.32 | $-0.4 | $-0.38 | $0.11 | 481,768,060 | 3.34% | 21.86% | Not available | 3.34% |
| 2024-12-31 | $0.88 | $-0.23 | $-0.31 | $-0.38 | $0.11 | 495,929,861 | 2.94% | 13.02% | Not available | 2.94% |
| 2025-12-31 | $1.13 | $-0.61 | $-0.7 | $-0.37 | $0.13 | 530,664,781 | 7.00% | 11.81% | Not available | 7.00% |

| Measure | Years | Company CAGR | Per-share CAGR | Difference (pp) | Interpretation |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 41.82% | 35.83% | 5.99 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| fcf | 3 | Not available | Not available | Not available | Insufficient comparable positive endpoints. |
| revenue | 5 | 76.47% | 19.46% | 57.02 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| fcf | 5 | Not available | Not available | Not available | Insufficient comparable positive endpoints. |

All formulas, dated source inputs and reported/estimated bases are retained in per-share-economics.json and per-share-metrics.csv. Repurchase spending does not prove dilution was offset.

## Models side by side

| Model | Style | Status | Value/share | Price/value | Value gap / price | Margin of safety |
| --- | --- | --- | --- | --- | --- | --- |
| Conservative policy model | value | not_meaningful | Not available | — | Not available | Not available |
| growth | growth | not_configured | Not available | — | Not available | Not available |
| garp | garp | not_configured | Not available | — | Not available | Not available |
| quality | quality | not_configured | Not available | — | Not available | Not available |

Value gap uses price as the denominator; margin of safety uses model value. Neither percentage predicts an investment return.

## Cash-flow bases and conditional reverse DCF

| Starting point | Basis/date | FCFF | Required annual growth |
| --- | --- | --- | --- |
| Historical three-year FCFF average (policy) | historical_average; 2025-12-31 | -$239,095,510.00 | Not available |
| Latest annual FCFF | reported; 2025-12-31 | -$371,978,690.00 | Not available |
| ttm-fcff | reported; 2026-06-30 | Not available | Not available |
| normalized-fcff-annual | normalized; 2025-12-31 | Not available | Not available |
| normalized-fcff-ttm | normalized; 2026-06-30 | Not available | Not available |

Required growth depends on the selected cash-flow base, WACC, terminal growth, capital claims and forecast horizon. It is not a direct measure of what the market expects. Year-one forward FCFF is a forecast, not a historical starting point.

- **Historical three-year FCFF average (policy):** Legacy cash-flow FCFF averaged over available last three annual periods; not tax-normalized
- **Latest annual FCFF:** OCF + after-tax interest - CapEx - SBC (legacy cash-flow definition); uses documented adjustments when configured
- **ttm-fcff:** TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized
- **normalized-fcff-annual:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **normalized-fcff-ttm:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income

## Reported, TTM and normalized metrics

| Metric | Date | Basis | Value | Status |
| --- | --- | --- | --- | --- |
| reported-tax-rate-annual | 2025-12-31 | reported | Not available | not_meaningful |
| normalized-tax-rate-annual | 2025-12-31 | normalized | Not available | not_available |
| normalized-nopat-annual | 2025-12-31 | normalized | Not available | not_available |
| normalized-roic-annual | 2025-12-31 | normalized | Not available | not_available |
| normalized-fcff-annual | 2025-12-31 | normalized | Not available | not_available |
| normalized-owner-earnings-annual | 2025-12-31 | normalized | Not available | not_available |
| reported-tax-rate-ttm | 2026-06-30 | reported | Not available | not_meaningful |
| ttm-revenue | 2026-06-30 | reported | $769,146,000.00 | ok |
| ttm-net-income | 2026-06-30 | reported | -$165,459,000.00 | ok |
| ttm-fcf | 2026-06-30 | reported | -$371,139,000.00 | ok |
| ttm-fcff | 2026-06-30 | reported | Not available | not_available |
| ttm-ebitda | 2026-06-30 | reported | -$161,091,000.00 | ok |
| ttm-pe | 2026-06-30 | reported | Not available | not_meaningful |
| ttm-fcf-margin | 2026-06-30 | reported | -48.25% | ok |
| ttm-fcf-yield | 2026-06-30 | reported | -0.91% | ok |
| ttm-ev-ebitda | 2026-06-30 | reported | Not available | not_meaningful |
| normalized-tax-rate-ttm | 2026-06-30 | normalized | Not available | not_available |
| normalized-nopat-ttm | 2026-06-30 | normalized | Not available | not_available |
| normalized-roic-ttm | 2026-06-30 | normalized | Not available | not_available |
| normalized-fcff-ttm | 2026-06-30 | normalized | Not available | not_available |
| normalized-owner-earnings-ttm | 2026-06-30 | normalized | Not available | not_available |

Normalized metrics use reported inputs and explicit normalization estimates. They do not overwrite reported or manually adjusted metrics. The legacy owner-earnings calculation still uses its policy proxy; the normalized version requires an explicit maintenance-capital method.

### Normalization assumptions

```json
null
```

## Sensitivity analysis

Historical sensitivity varies constant FCFF growth. Forward sensitivity shifts every segment annual revenue growth by -2, 0 or +2 percentage points while recalculating reinvestment.

<details><summary>Historical and normalized cash-flow sensitivity</summary>

| Basis | WACC | FCFF growth | Terminal growth | Value/share |
| --- | --- | --- | --- | --- |
| historical-average | 7% | 5% | 2% | Not available |
| historical-average | 7% | 5% | 2.5% | Not available |
| historical-average | 7% | 5% | 3% | Not available |
| historical-average | 7% | 10% | 2% | Not available |
| historical-average | 7% | 10% | 2.5% | Not available |
| historical-average | 7% | 10% | 3% | Not available |
| historical-average | 7% | 15% | 2% | Not available |
| historical-average | 7% | 15% | 2.5% | Not available |
| historical-average | 7% | 15% | 3% | Not available |
| historical-average | 9% | 5% | 2% | Not available |
| historical-average | 9% | 5% | 2.5% | Not available |
| historical-average | 9% | 5% | 3% | Not available |
| historical-average | 9% | 10% | 2% | Not available |
| historical-average | 9% | 10% | 2.5% | Not available |
| historical-average | 9% | 10% | 3% | Not available |
| historical-average | 9% | 15% | 2% | Not available |
| historical-average | 9% | 15% | 2.5% | Not available |
| historical-average | 9% | 15% | 3% | Not available |
| historical-average | 11% | 5% | 2% | Not available |
| historical-average | 11% | 5% | 2.5% | Not available |
| historical-average | 11% | 5% | 3% | Not available |
| historical-average | 11% | 10% | 2% | Not available |
| historical-average | 11% | 10% | 2.5% | Not available |
| historical-average | 11% | 10% | 3% | Not available |
| historical-average | 11% | 15% | 2% | Not available |
| historical-average | 11% | 15% | 2.5% | Not available |
| historical-average | 11% | 15% | 3% | Not available |
| latest-annual | 7% | 5% | 2% | Not available |
| latest-annual | 7% | 5% | 2.5% | Not available |
| latest-annual | 7% | 5% | 3% | Not available |
| latest-annual | 7% | 10% | 2% | Not available |
| latest-annual | 7% | 10% | 2.5% | Not available |
| latest-annual | 7% | 10% | 3% | Not available |
| latest-annual | 7% | 15% | 2% | Not available |
| latest-annual | 7% | 15% | 2.5% | Not available |
| latest-annual | 7% | 15% | 3% | Not available |
| latest-annual | 9% | 5% | 2% | Not available |
| latest-annual | 9% | 5% | 2.5% | Not available |
| latest-annual | 9% | 5% | 3% | Not available |
| latest-annual | 9% | 10% | 2% | Not available |
| latest-annual | 9% | 10% | 2.5% | Not available |
| latest-annual | 9% | 10% | 3% | Not available |
| latest-annual | 9% | 15% | 2% | Not available |
| latest-annual | 9% | 15% | 2.5% | Not available |
| latest-annual | 9% | 15% | 3% | Not available |
| latest-annual | 11% | 5% | 2% | Not available |
| latest-annual | 11% | 5% | 2.5% | Not available |
| latest-annual | 11% | 5% | 3% | Not available |
| latest-annual | 11% | 10% | 2% | Not available |
| latest-annual | 11% | 10% | 2.5% | Not available |
| latest-annual | 11% | 10% | 3% | Not available |
| latest-annual | 11% | 15% | 2% | Not available |
| latest-annual | 11% | 15% | 2.5% | Not available |
| latest-annual | 11% | 15% | 3% | Not available |
| ttm-fcff | 7% | 5% | 2% | Not available |
| ttm-fcff | 7% | 5% | 2.5% | Not available |
| ttm-fcff | 7% | 5% | 3% | Not available |
| ttm-fcff | 7% | 10% | 2% | Not available |
| ttm-fcff | 7% | 10% | 2.5% | Not available |
| ttm-fcff | 7% | 10% | 3% | Not available |
| ttm-fcff | 7% | 15% | 2% | Not available |
| ttm-fcff | 7% | 15% | 2.5% | Not available |
| ttm-fcff | 7% | 15% | 3% | Not available |
| ttm-fcff | 9% | 5% | 2% | Not available |
| ttm-fcff | 9% | 5% | 2.5% | Not available |
| ttm-fcff | 9% | 5% | 3% | Not available |
| ttm-fcff | 9% | 10% | 2% | Not available |
| ttm-fcff | 9% | 10% | 2.5% | Not available |
| ttm-fcff | 9% | 10% | 3% | Not available |
| ttm-fcff | 9% | 15% | 2% | Not available |
| ttm-fcff | 9% | 15% | 2.5% | Not available |
| ttm-fcff | 9% | 15% | 3% | Not available |
| ttm-fcff | 11% | 5% | 2% | Not available |
| ttm-fcff | 11% | 5% | 2.5% | Not available |
| ttm-fcff | 11% | 5% | 3% | Not available |
| ttm-fcff | 11% | 10% | 2% | Not available |
| ttm-fcff | 11% | 10% | 2.5% | Not available |
| ttm-fcff | 11% | 10% | 3% | Not available |
| ttm-fcff | 11% | 15% | 2% | Not available |
| ttm-fcff | 11% | 15% | 2.5% | Not available |
| ttm-fcff | 11% | 15% | 3% | Not available |
| normalized-fcff-annual | 7% | 5% | 2% | Not available |
| normalized-fcff-annual | 7% | 5% | 2.5% | Not available |
| normalized-fcff-annual | 7% | 5% | 3% | Not available |
| normalized-fcff-annual | 7% | 10% | 2% | Not available |
| normalized-fcff-annual | 7% | 10% | 2.5% | Not available |
| normalized-fcff-annual | 7% | 10% | 3% | Not available |
| normalized-fcff-annual | 7% | 15% | 2% | Not available |
| normalized-fcff-annual | 7% | 15% | 2.5% | Not available |
| normalized-fcff-annual | 7% | 15% | 3% | Not available |
| normalized-fcff-annual | 9% | 5% | 2% | Not available |
| normalized-fcff-annual | 9% | 5% | 2.5% | Not available |
| normalized-fcff-annual | 9% | 5% | 3% | Not available |
| normalized-fcff-annual | 9% | 10% | 2% | Not available |
| normalized-fcff-annual | 9% | 10% | 2.5% | Not available |
| normalized-fcff-annual | 9% | 10% | 3% | Not available |
| normalized-fcff-annual | 9% | 15% | 2% | Not available |
| normalized-fcff-annual | 9% | 15% | 2.5% | Not available |
| normalized-fcff-annual | 9% | 15% | 3% | Not available |
| normalized-fcff-annual | 11% | 5% | 2% | Not available |
| normalized-fcff-annual | 11% | 5% | 2.5% | Not available |
| normalized-fcff-annual | 11% | 5% | 3% | Not available |
| normalized-fcff-annual | 11% | 10% | 2% | Not available |
| normalized-fcff-annual | 11% | 10% | 2.5% | Not available |
| normalized-fcff-annual | 11% | 10% | 3% | Not available |
| normalized-fcff-annual | 11% | 15% | 2% | Not available |
| normalized-fcff-annual | 11% | 15% | 2.5% | Not available |
| normalized-fcff-annual | 11% | 15% | 3% | Not available |
| normalized-fcff-ttm | 7% | 5% | 2% | Not available |
| normalized-fcff-ttm | 7% | 5% | 2.5% | Not available |
| normalized-fcff-ttm | 7% | 5% | 3% | Not available |
| normalized-fcff-ttm | 7% | 10% | 2% | Not available |
| normalized-fcff-ttm | 7% | 10% | 2.5% | Not available |
| normalized-fcff-ttm | 7% | 10% | 3% | Not available |
| normalized-fcff-ttm | 7% | 15% | 2% | Not available |
| normalized-fcff-ttm | 7% | 15% | 2.5% | Not available |
| normalized-fcff-ttm | 7% | 15% | 3% | Not available |
| normalized-fcff-ttm | 9% | 5% | 2% | Not available |
| normalized-fcff-ttm | 9% | 5% | 2.5% | Not available |
| normalized-fcff-ttm | 9% | 5% | 3% | Not available |
| normalized-fcff-ttm | 9% | 10% | 2% | Not available |
| normalized-fcff-ttm | 9% | 10% | 2.5% | Not available |
| normalized-fcff-ttm | 9% | 10% | 3% | Not available |
| normalized-fcff-ttm | 9% | 15% | 2% | Not available |
| normalized-fcff-ttm | 9% | 15% | 2.5% | Not available |
| normalized-fcff-ttm | 9% | 15% | 3% | Not available |
| normalized-fcff-ttm | 11% | 5% | 2% | Not available |
| normalized-fcff-ttm | 11% | 5% | 2.5% | Not available |
| normalized-fcff-ttm | 11% | 5% | 3% | Not available |
| normalized-fcff-ttm | 11% | 10% | 2% | Not available |
| normalized-fcff-ttm | 11% | 10% | 2.5% | Not available |
| normalized-fcff-ttm | 11% | 10% | 3% | Not available |
| normalized-fcff-ttm | 11% | 15% | 2% | Not available |
| normalized-fcff-ttm | 11% | 15% | 2.5% | Not available |
| normalized-fcff-ttm | 11% | 15% | 3% | Not available |

</details>

<details><summary>Forward operating-model sensitivity</summary>

| Scenario | WACC | Revenue growth shift | Terminal growth | Value/share |
| --- | --- | --- | --- | --- |

</details>

## Limits

- Investment styles label documented scenarios; they do not change the conservative policy verdict.
- Forward margins must include stock compensation and all unallocated corporate costs.
- Normalization is an estimate and remains separate from reported and adjusted metrics.
- Missing D&A is not treated as zero. Missing TTM comparison periods prevent a trailing value.
- A forecast requires segment bases that reconcile to consolidated revenue. Segment names must not overlap (for example, AI cannot be added to semiconductor revenue that already includes AI).
- Forecast losses do not create an assumed tax refund. Terminal growth requires continued reinvestment.

