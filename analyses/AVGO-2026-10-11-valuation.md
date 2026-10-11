# AVGO: valuation comparison

[All calculations and cards](AVGO-2026-10-11-v2-data/README.md) · [Excel workbook](../output/spreadsheet/AVGO-2026-10-11-v2.xlsx) · [Importable analysis JSON](AVGO-2026-10-11-v2.json)

Price: $361.54 on 2026-10-09.

These are conditional model estimates, not price targets. The conservative policy verdict is separate from the forward scenarios. Missing models are not assigned an invented value.

## Models side by side

| Model | Style | Status | Value/share | Price/value | Value gap / price | Margin of safety |
| --- | --- | --- | --- | --- | --- | --- |
| Conservative policy model | value | ok | $100.83 | 3.59× | -72.11% | -258.57% |
| illustrative-growth | growth | ok | $173.97 | 2.08× | -51.88% | -107.82% |
| illustrative-garp | garp | ok | $138.64 | 2.61× | -61.65% | -160.78% |
| illustrative-quality | quality | ok | $117.60 | 3.07× | -67.47% | -207.43% |

Value gap uses price as the denominator; margin of safety uses model value. Neither percentage predicts an investment return.

## Cash-flow bases and conditional reverse DCF

| Starting point | Basis/date | FCFF | Required annual growth |
| --- | --- | --- | --- |
| Historical three-year FCFF average (policy) | historical_average; 2025-11-02 | $18,591,133,285.86 | 26.5% |
| Latest annual FCFF | reported; 2025-11-02 | $22,556,000,000.00 | 23.84% |
| ttm-fcff | reported; 2026-08-02 | $33,867,298,154.14 | 18.33% |
| normalized-fcff-annual | normalized; 2025-11-02 | $24,804,360,000.00 | 22.54% |
| normalized-fcff-ttm | normalized; 2026-08-02 | $34,211,060,000.00 | 18.2% |
| Year-one FCFF: illustrative-growth | forward; 2026-08-02 | $33,215,158,200.00 | Not available |
| Year-one FCFF: illustrative-garp | forward; 2026-08-02 | $32,264,528,000.00 | Not available |
| Year-one FCFF: illustrative-quality | forward; 2026-08-02 | $31,688,338,300.00 | Not available |

Required growth depends on the selected cash-flow base, WACC, terminal growth, capital claims and forecast horizon. It is not a direct measure of what the market expects. Year-one forward FCFF is a forecast, not a historical starting point.

- **Historical three-year FCFF average (policy):** Legacy cash-flow FCFF averaged over available last three annual periods; not tax-normalized
- **Latest annual FCFF:** OCF + after-tax interest - CapEx - SBC (legacy cash-flow definition); uses documented adjustments when configured
- **ttm-fcff:** TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized
- **normalized-fcff-annual:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **normalized-fcff-ttm:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **Year-one FCFF: illustrative-growth:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: illustrative-garp:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: illustrative-quality:** Explicit year-one segment forecast, not a historical starting cash flow

## Reported, TTM and normalized metrics

| Metric | Date | Basis | Value | Status |
| --- | --- | --- | --- | --- |
| reported-tax-rate-annual | 2025-11-02 | reported | -1.75% | ok |
| normalized-tax-rate-annual | 2025-11-02 | normalized | 21% | ok |
| normalized-nopat-annual | 2025-11-02 | normalized | $20,132,360,000.00 | ok |
| normalized-roic-annual | 2025-11-02 | normalized | 15.72% | ok |
| normalized-fcff-annual | 2025-11-02 | normalized | $24,804,360,000.00 | ok |
| normalized-owner-earnings-annual | 2025-11-02 | normalized | $22,676,910,000.00 | ok |
| reported-tax-rate-ttm | 2026-08-02 | reported | 5.45% | ok |
| ttm-revenue | 2026-08-02 | reported | $89,104,000,000.00 | ok |
| ttm-net-income | 2026-08-02 | reported | $38,265,000,000.00 | ok |
| ttm-fcf | 2026-08-02 | reported | $39,403,000,000.00 | ok |
| ttm-fcff | 2026-08-02 | reported | $33,867,298,154.14 | ok |
| ttm-ebitda | 2026-08-02 | reported | $51,440,000,000.00 | ok |
| ttm-pe | 2026-08-02 | reported | 45.10 | ok |
| ttm-fcf-margin | 2026-08-02 | reported | 44.22% | ok |
| ttm-fcf-yield | 2026-08-02 | reported | 2.28% | ok |
| ttm-ev-ebitda | 2026-08-02 | reported | 34.24 | ok |
| normalized-tax-rate-ttm | 2026-08-02 | normalized | 21% | ok |
| normalized-nopat-ttm | 2026-08-02 | normalized | $33,823,060,000.00 | ok |
| normalized-roic-ttm | 2026-08-02 | normalized | 25.83% | ok |
| normalized-fcff-ttm | 2026-08-02 | normalized | $34,211,060,000.00 | ok |
| normalized-owner-earnings-ttm | 2026-08-02 | normalized | $32,976,510,000.00 | ok |

Normalized metrics use reported inputs and explicit normalization estimates. They do not overwrite reported or manually adjusted metrics. The legacy owner-earnings calculation still uses its policy proxy; the normalized version requires an explicit maintenance-capital method.

### Normalization assumptions

```json
{
  "tax_rate": {
    "value": 0.21,
    "reason": "Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.",
    "source": "Analyst assumption, 2026-10-11"
  },
  "maintenance_capex": {
    "method": "depreciation",
    "reason": "Physical depreciation used as an explicit maintenance proxy, excluding acquisition amortization; replacement spending is not independently verified.",
    "source": "Analyst proxy using reported physical depreciation"
  }
}
```

## Forward scenario: illustrative-growth (growth)

**Reason:** Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability.

**Source / assumption basis:** Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $110,494,780,000.00 | $47,520,840,000.00 | $9,979,376,400.00 | $1,325,128,900.00 | $2,263,930,300.00 | $3,387,504,000.00 | $33,215,158,200.00 |
| 2 | $133,466,375,800.00 | $57,075,000,400.00 | $11,985,750,084.00 | $1,633,150,629.00 | $2,783,391,883.00 | $3,659,708,540.00 | $40,279,300,522.00 |
| 3 | $156,471,200,880.00 | $66,645,775,440.00 | $13,995,612,842.40 | $1,941,338,504.40 | $3,303,185,758.80 | $3,661,370,004.00 | $47,626,945,339.20 |
| 4 | $177,507,503,959.20 | $75,425,453,229.60 | $15,839,345,178.22 | $2,220,367,394.80 | $3,774,319,852.09 | $3,311,831,028.96 | $54,720,324,565.13 |
| 5 | $197,039,423,775.94 | $83,592,017,287.97 | $17,554,323,630.47 | $2,477,966,578.88 | $4,209,548,427.76 | $3,055,810,595.84 | $61,250,301,212.78 |
| 6 | $215,310,491,820.25 | $91,234,781,850.13 | $19,159,304,188.53 | $2,718,598,865.10 | $4,616,174,527.20 | $2,854,153,700.22 | $67,323,748,299.28 |
| 7 | $231,513,214,141.47 | $98,022,505,885.93 | $20,584,726,236.05 | $2,930,976,189.19 | $4,975,247,319.13 | $2,517,864,378.30 | $72,875,644,141.64 |
| 8 | $244,862,284,967.02 | $103,632,995,227.62 | $21,762,928,997.80 | $3,104,126,150.42 | $5,268,344,938.05 | $2,050,713,433.69 | $77,655,134,008.50 |
| 9 | $256,536,591,091.29 | $108,530,240,926.96 | $22,791,350,594.66 | $3,256,488,417.32 | $5,526,074,103.72 | $1,805,594,877.85 | $81,663,709,768.06 |
| 10 | $266,206,494,285.90 | $112,575,670,339.52 | $23,640,890,771.30 | $3,383,790,151.77 | $5,741,201,463.37 | $1,509,873,999.90 | $85,067,494,256.72 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 57.01%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "illustrative-growth",
  "style": "growth",
  "years": 10,
  "tax_rate": 0.21,
  "wacc": 0.09,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "segments": [
    {
      "name": "Semiconductor solutions (including AI)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-11-02",
            "value": 36858000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2026-08-02",
            "value": 48363000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-08-03",
            "value": 25786000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.3,
        0.25,
        0.2,
        0.15,
        0.12,
        0.1,
        0.08,
        0.06,
        0.05,
        0.04
      ],
      "operating_margin": [
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4
      ],
      "depreciation_to_revenue": [
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015
      ],
      "capex_to_revenue": [
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025
      ],
      "working_capital_to_revenue": [
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18
      ]
    },
    {
      "name": "Infrastructure software (including VMware)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_software",
            "period_end": "2025-11-02",
            "value": 27029000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2026-08-02",
            "value": 22726000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2025-08-03",
            "value": 20086000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.05,
      "growth": [
        0.12,
        0.11,
        0.1,
        0.09,
        0.08,
        0.07,
        0.06,
        0.05,
        0.04,
        0.03
      ],
      "operating_margin": [
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5
      ],
      "depreciation_to_revenue": [
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005
      ],
      "capex_to_revenue": [
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01
      ],
      "working_capital_to_revenue": [
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05
      ]
    }
  ],
  "source": "Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts",
  "reason": "Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability."
}
```

</details>

## Forward scenario: illustrative-garp (garp)

**Reason:** Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability.

**Source / assumption basis:** Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $103,957,900,000.00 | $44,846,750,000.00 | $9,417,817,500.00 | $1,233,009,500.00 | $2,109,409,000.00 | $2,288,005,000.00 | $32,264,528,000.00 |
| 2 | $119,733,091,000.00 | $51,450,549,500.00 | $10,804,615,395.00 | $1,440,265,055.00 | $2,459,730,310.00 | $2,457,694,350.00 | $37,168,774,500.00 |
| 3 | $135,202,935,480.00 | $57,923,072,340.00 | $12,163,845,191.40 | $1,643,854,217.40 | $2,803,788,664.80 | $2,414,611,444.00 | $42,184,681,257.20 |
| 4 | $149,506,338,663.60 | $63,913,366,483.80 | $13,421,806,961.60 | $1,831,511,978.12 | $3,121,033,813.84 | $2,224,999,841.58 | $46,977,037,844.90 |
| 5 | $162,812,640,122.62 | $69,482,536,928.51 | $14,591,332,754.99 | $2,006,441,513.89 | $3,416,693,871.15 | $2,074,489,443.19 | $51,406,462,373.08 |
| 6 | $174,530,407,068.59 | $74,387,517,750.87 | $15,621,378,727.68 | $2,160,420,613.69 | $3,676,956,938.20 | $1,825,961,793.11 | $55,423,640,905.56 |
| 7 | $184,087,160,508.02 | $78,393,233,323.58 | $16,462,578,997.95 | $2,285,470,495.58 | $3,888,423,644.64 | $1,482,297,163.08 | $58,845,404,013.49 |
| 8 | $192,339,844,709.34 | $81,837,058,077.72 | $17,185,782,196.32 | $2,394,985,651.24 | $4,073,328,088.64 | $1,299,906,760.54 | $61,673,026,683.46 |
| 9 | $199,543,326,478.32 | $84,865,484,391.13 | $17,821,751,722.14 | $2,488,334,517.19 | $4,231,360,091.99 | $1,105,483,030.85 | $64,195,224,063.35 |
| 10 | $205,529,626,272.67 | $87,411,448,922.86 | $18,356,404,273.80 | $2,562,984,552.71 | $4,358,300,894.75 | $880,655,964.79 | $66,379,072,342.23 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 54.98%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "illustrative-garp",
  "style": "garp",
  "years": 10,
  "tax_rate": 0.21,
  "wacc": 0.09,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "segments": [
    {
      "name": "Semiconductor solutions (including AI)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-11-02",
            "value": 36858000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2026-08-02",
            "value": 48363000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-08-03",
            "value": 25786000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.2,
        0.18,
        0.15,
        0.12,
        0.1,
        0.08,
        0.06,
        0.05,
        0.04,
        0.03
      ],
      "operating_margin": [
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4
      ],
      "depreciation_to_revenue": [
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015
      ],
      "capex_to_revenue": [
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025
      ],
      "working_capital_to_revenue": [
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18
      ]
    },
    {
      "name": "Infrastructure software (including VMware)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_software",
            "period_end": "2025-11-02",
            "value": 27029000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2026-08-02",
            "value": 22726000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2025-08-03",
            "value": 20086000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.05,
      "growth": [
        0.1,
        0.09,
        0.08,
        0.07,
        0.06,
        0.05,
        0.04,
        0.03,
        0.03,
        0.03
      ],
      "operating_margin": [
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5
      ],
      "depreciation_to_revenue": [
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005
      ],
      "capex_to_revenue": [
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01
      ],
      "working_capital_to_revenue": [
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05
      ]
    }
  ],
  "source": "Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts",
  "reason": "Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability."
}
```

</details>

## Forward scenario: illustrative-quality (quality)

**Reason:** Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability.

**Source / assumption basis:** Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $100,392,770,000.00 | $43,361,360,000.00 | $9,105,885,600.00 | $1,185,466,350.00 | $2,029,181,450.00 | $1,723,421,000.00 | $31,688,338,300.00 |
| 2 | $111,521,278,900.00 | $48,037,061,200.00 | $10,087,782,852.00 | $1,329,964,219.50 | $2,273,749,526.50 | $1,711,544,670.00 | $35,293,948,371.00 |
| 3 | $122,074,344,759.00 | $52,464,000,522.00 | $11,017,440,109.62 | $1,467,688,909.54 | $2,506,719,226.21 | $1,632,124,982.70 | $38,775,405,113.01 |
| 4 | $131,607,330,739.95 | $56,458,908,045.30 | $11,856,370,689.51 | $1,592,512,386.17 | $2,717,786,906.10 | $1,479,710,406.38 | $41,997,552,429.48 |
| 5 | $140,609,526,899.42 | $60,212,425,539.06 | $12,644,609,363.20 | $1,712,281,425.56 | $2,919,945,955.59 | $1,421,964,569.74 | $44,938,187,076.09 |
| 6 | $148,252,375,557.52 | $63,428,309,593.47 | $13,319,945,014.63 | $1,811,049,696.32 | $3,087,205,483.37 | $1,169,344,789.94 | $47,662,864,001.86 |
| 7 | $154,839,522,461.31 | $66,186,989,136.10 | $13,899,267,718.58 | $1,897,474,821.76 | $3,233,311,038.80 | $1,024,719,427.23 | $49,927,165,773.25 |
| 8 | $160,607,985,344.60 | $68,621,909,693.97 | $14,410,601,035.73 | $1,971,248,224.56 | $3,358,392,300.20 | $872,527,293.08 | $51,951,637,289.51 |
| 9 | $165,426,224,904.94 | $70,680,566,984.79 | $14,842,919,066.81 | $2,030,385,671.29 | $3,459,144,069.20 | $696,513,214.17 | $53,712,376,305.90 |
| 10 | $170,389,011,652.09 | $72,800,983,994.33 | $15,288,206,638.81 | $2,091,297,241.43 | $3,562,918,391.28 | $717,408,610.60 | $55,323,747,595.08 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 53.49%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "illustrative-quality",
  "style": "quality",
  "years": 10,
  "tax_rate": 0.21,
  "wacc": 0.09,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "segments": [
    {
      "name": "Semiconductor solutions (including AI)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-11-02",
            "value": 36858000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2026-08-02",
            "value": 48363000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_semiconductor",
            "period_end": "2025-08-03",
            "value": 25786000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.15,
        0.13,
        0.11,
        0.09,
        0.08,
        0.06,
        0.05,
        0.04,
        0.03,
        0.03
      ],
      "operating_margin": [
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4,
        0.4
      ],
      "depreciation_to_revenue": [
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015,
        0.015
      ],
      "capex_to_revenue": [
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025,
        0.025
      ],
      "working_capital_to_revenue": [
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18,
        0.18
      ]
    },
    {
      "name": "Infrastructure software (including VMware)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "segment_revenue_software",
            "period_end": "2025-11-02",
            "value": 27029000000,
            "source": "10-K 0001730168-25-000121",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2026-08-02",
            "value": 22726000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": 1
          },
          {
            "item": "segment_revenue_software",
            "period_end": "2025-08-03",
            "value": 20086000000,
            "source": "10-Q 0001730168-26-000080",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.05,
      "growth": [
        0.08,
        0.07,
        0.06,
        0.05,
        0.04,
        0.04,
        0.03,
        0.03,
        0.03,
        0.03
      ],
      "operating_margin": [
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5
      ],
      "depreciation_to_revenue": [
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005,
        0.005
      ],
      "capex_to_revenue": [
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01,
        0.01
      ],
      "working_capital_to_revenue": [
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05,
        0.05
      ]
    }
  ],
  "source": "Analyst sensitivity assumptions, 2026-10-11; revenue bases from cited 10-K and 10-Q excerpts",
  "reason": "Illustrative scenario, not management guidance or a calibrated fair-value forecast. Revenue growth fades by segment. Operating margins include SBC and all allocated corporate costs, exclude acquisition amortization, and include the physical depreciation added back. Zero unallocated corporate costs is intentional. Tax, margins, capital intensity and working capital ratios are estimates; style labels do not imply suitability."
}
```

</details>

## Sensitivity analysis

Historical sensitivity varies constant FCFF growth. Forward sensitivity shifts every segment annual revenue growth by -2, 0 or +2 percentage points while recalculating reinvestment.

<details><summary>Historical and normalized cash-flow sensitivity</summary>

| Basis | WACC | FCFF growth | Terminal growth | Value/share |
| --- | --- | --- | --- | --- |
| historical-average | 7% | 5% | 2% | $93.52 |
| historical-average | 7% | 5% | 2.5% | $101.19 |
| historical-average | 7% | 5% | 3% | $110.77 |
| historical-average | 7% | 10% | 2% | $142.82 |
| historical-average | 7% | 10% | 2.5% | $155.03 |
| historical-average | 7% | 10% | 3% | $170.29 |
| historical-average | 7% | 15% | 2% | $215.12 |
| historical-average | 7% | 15% | 2.5% | $234.16 |
| historical-average | 7% | 15% | 3% | $257.97 |
| historical-average | 9% | 5% | 2% | $63.51 |
| historical-average | 9% | 5% | 2.5% | $66.72 |
| historical-average | 9% | 5% | 3% | $70.47 |
| historical-average | 9% | 10% | 2% | $95.72 |
| historical-average | 9% | 10% | 2.5% | $100.83 |
| historical-average | 9% | 10% | 3% | $106.79 |
| historical-average | 9% | 15% | 2% | $142.47 |
| historical-average | 9% | 15% | 2.5% | $150.44 |
| historical-average | 9% | 15% | 3% | $159.74 |
| historical-average | 11% | 5% | 2% | $46.95 |
| historical-average | 11% | 5% | 2.5% | $48.57 |
| historical-average | 11% | 5% | 3% | $50.40 |
| historical-average | 11% | 10% | 2% | $69.96 |
| historical-average | 11% | 10% | 2.5% | $72.54 |
| historical-average | 11% | 10% | 3% | $75.45 |
| historical-average | 11% | 15% | 2% | $103.02 |
| historical-average | 11% | 15% | 2.5% | $107.05 |
| historical-average | 11% | 15% | 3% | $111.58 |
| latest-annual | 7% | 5% | 2% | $115.05 |
| latest-annual | 7% | 5% | 2.5% | $124.35 |
| latest-annual | 7% | 5% | 3% | $135.98 |
| latest-annual | 7% | 10% | 2% | $174.86 |
| latest-annual | 7% | 10% | 2.5% | $189.67 |
| latest-annual | 7% | 10% | 3% | $208.19 |
| latest-annual | 7% | 15% | 2% | $262.58 |
| latest-annual | 7% | 15% | 2.5% | $285.68 |
| latest-annual | 7% | 15% | 3% | $314.57 |
| latest-annual | 9% | 5% | 2% | $78.64 |
| latest-annual | 9% | 5% | 2.5% | $82.53 |
| latest-annual | 9% | 5% | 3% | $87.08 |
| latest-annual | 9% | 10% | 2% | $117.71 |
| latest-annual | 9% | 10% | 2.5% | $123.91 |
| latest-annual | 9% | 10% | 3% | $131.15 |
| latest-annual | 9% | 15% | 2% | $174.44 |
| latest-annual | 9% | 15% | 2.5% | $184.11 |
| latest-annual | 9% | 15% | 3% | $195.39 |
| latest-annual | 11% | 5% | 2% | $58.55 |
| latest-annual | 11% | 5% | 2.5% | $60.52 |
| latest-annual | 11% | 5% | 3% | $62.73 |
| latest-annual | 11% | 10% | 2% | $86.47 |
| latest-annual | 11% | 10% | 2.5% | $89.60 |
| latest-annual | 11% | 10% | 3% | $93.12 |
| latest-annual | 11% | 15% | 2% | $126.58 |
| latest-annual | 11% | 15% | 2.5% | $131.46 |
| latest-annual | 11% | 15% | 3% | $136.96 |
| ttm-fcff | 7% | 5% | 2% | $176.47 |
| ttm-fcff | 7% | 5% | 2.5% | $190.44 |
| ttm-fcff | 7% | 5% | 3% | $207.90 |
| ttm-fcff | 7% | 10% | 2% | $266.27 |
| ttm-fcff | 7% | 10% | 2.5% | $288.51 |
| ttm-fcff | 7% | 10% | 3% | $316.31 |
| ttm-fcff | 7% | 15% | 2% | $397.98 |
| ttm-fcff | 7% | 15% | 2.5% | $432.67 |
| ttm-fcff | 7% | 15% | 3% | $476.04 |
| ttm-fcff | 9% | 5% | 2% | $121.80 |
| ttm-fcff | 9% | 5% | 2.5% | $127.65 |
| ttm-fcff | 9% | 5% | 3% | $134.47 |
| ttm-fcff | 9% | 10% | 2% | $180.47 |
| ttm-fcff | 9% | 10% | 2.5% | $189.78 |
| ttm-fcff | 9% | 10% | 3% | $200.64 |
| ttm-fcff | 9% | 15% | 2% | $265.63 |
| ttm-fcff | 9% | 15% | 2.5% | $280.16 |
| ttm-fcff | 9% | 15% | 3% | $297.10 |
| ttm-fcff | 11% | 5% | 2% | $91.63 |
| ttm-fcff | 11% | 5% | 2.5% | $94.59 |
| ttm-fcff | 11% | 5% | 3% | $97.91 |
| ttm-fcff | 11% | 10% | 2% | $133.55 |
| ttm-fcff | 11% | 10% | 2.5% | $138.25 |
| ttm-fcff | 11% | 10% | 3% | $143.54 |
| ttm-fcff | 11% | 15% | 2% | $193.78 |
| ttm-fcff | 11% | 15% | 2.5% | $201.11 |
| ttm-fcff | 11% | 15% | 3% | $209.36 |
| normalized-fcff-annual | 7% | 5% | 2% | $127.26 |
| normalized-fcff-annual | 7% | 5% | 2.5% | $137.49 |
| normalized-fcff-annual | 7% | 5% | 3% | $150.28 |
| normalized-fcff-annual | 7% | 10% | 2% | $193.03 |
| normalized-fcff-annual | 7% | 10% | 2.5% | $209.32 |
| normalized-fcff-annual | 7% | 10% | 3% | $229.68 |
| normalized-fcff-annual | 7% | 15% | 2% | $289.49 |
| normalized-fcff-annual | 7% | 15% | 2.5% | $314.90 |
| normalized-fcff-annual | 7% | 15% | 3% | $346.66 |
| normalized-fcff-annual | 9% | 5% | 2% | $87.22 |
| normalized-fcff-annual | 9% | 5% | 2.5% | $91.50 |
| normalized-fcff-annual | 9% | 5% | 3% | $96.50 |
| normalized-fcff-annual | 9% | 10% | 2% | $130.19 |
| normalized-fcff-annual | 9% | 10% | 2.5% | $137.01 |
| normalized-fcff-annual | 9% | 10% | 3% | $144.96 |
| normalized-fcff-annual | 9% | 15% | 2% | $192.56 |
| normalized-fcff-annual | 9% | 15% | 2.5% | $203.20 |
| normalized-fcff-annual | 9% | 15% | 3% | $215.61 |
| normalized-fcff-annual | 11% | 5% | 2% | $65.13 |
| normalized-fcff-annual | 11% | 5% | 2.5% | $67.29 |
| normalized-fcff-annual | 11% | 5% | 3% | $69.72 |
| normalized-fcff-annual | 11% | 10% | 2% | $95.82 |
| normalized-fcff-annual | 11% | 10% | 2.5% | $99.27 |
| normalized-fcff-annual | 11% | 10% | 3% | $103.14 |
| normalized-fcff-annual | 11% | 15% | 2% | $139.94 |
| normalized-fcff-annual | 11% | 15% | 2.5% | $145.31 |
| normalized-fcff-annual | 11% | 15% | 3% | $151.35 |
| normalized-fcff-ttm | 7% | 5% | 2% | $178.33 |
| normalized-fcff-ttm | 7% | 5% | 2.5% | $192.44 |
| normalized-fcff-ttm | 7% | 5% | 3% | $210.08 |
| normalized-fcff-ttm | 7% | 10% | 2% | $269.05 |
| normalized-fcff-ttm | 7% | 10% | 2.5% | $291.51 |
| normalized-fcff-ttm | 7% | 10% | 3% | $319.60 |
| normalized-fcff-ttm | 7% | 15% | 2% | $402.09 |
| normalized-fcff-ttm | 7% | 15% | 2.5% | $437.14 |
| normalized-fcff-ttm | 7% | 15% | 3% | $480.94 |
| normalized-fcff-ttm | 9% | 5% | 2% | $123.11 |
| normalized-fcff-ttm | 9% | 5% | 2.5% | $129.02 |
| normalized-fcff-ttm | 9% | 5% | 3% | $135.91 |
| normalized-fcff-ttm | 9% | 10% | 2% | $182.37 |
| normalized-fcff-ttm | 9% | 10% | 2.5% | $191.78 |
| normalized-fcff-ttm | 9% | 10% | 3% | $202.75 |
| normalized-fcff-ttm | 9% | 15% | 2% | $268.41 |
| normalized-fcff-ttm | 9% | 15% | 2.5% | $283.08 |
| normalized-fcff-ttm | 9% | 15% | 3% | $300.19 |
| normalized-fcff-ttm | 11% | 5% | 2% | $92.64 |
| normalized-fcff-ttm | 11% | 5% | 2.5% | $95.62 |
| normalized-fcff-ttm | 11% | 5% | 3% | $98.98 |
| normalized-fcff-ttm | 11% | 10% | 2% | $134.98 |
| normalized-fcff-ttm | 11% | 10% | 2.5% | $139.73 |
| normalized-fcff-ttm | 11% | 10% | 3% | $145.07 |
| normalized-fcff-ttm | 11% | 15% | 2% | $195.82 |
| normalized-fcff-ttm | 11% | 15% | 2.5% | $203.23 |
| normalized-fcff-ttm | 11% | 15% | 3% | $211.56 |

</details>

<details><summary>Forward operating-model sensitivity</summary>

| Scenario | WACC | Revenue growth shift | Terminal growth | Value/share |
| --- | --- | --- | --- | --- |
| illustrative-growth | 7% | -2% | 2% | $211.25 |
| illustrative-growth | 7% | -2% | 2.5% | $221.53 |
| illustrative-growth | 7% | -2% | 3% | $234.32 |
| illustrative-growth | 7% | 0% | 2% | $246.67 |
| illustrative-growth | 7% | 0% | 2.5% | $258.99 |
| illustrative-growth | 7% | 0% | 3% | $274.32 |
| illustrative-growth | 7% | 2% | 2% | $287.79 |
| illustrative-growth | 7% | 2% | 2.5% | $302.51 |
| illustrative-growth | 7% | 2% | 3% | $320.83 |
| illustrative-growth | 9% | -2% | 2% | $146.75 |
| illustrative-growth | 9% | -2% | 2.5% | $150.12 |
| illustrative-growth | 9% | -2% | 3% | $154.00 |
| illustrative-growth | 9% | 0% | 2% | $169.94 |
| illustrative-growth | 9% | 0% | 2.5% | $173.97 |
| illustrative-growth | 9% | 0% | 3% | $178.63 |
| illustrative-growth | 9% | 2% | 2% | $196.73 |
| illustrative-growth | 9% | 2% | 2.5% | $201.55 |
| illustrative-growth | 9% | 2% | 3% | $207.12 |
| illustrative-growth | 11% | -2% | 2% | $110.93 |
| illustrative-growth | 11% | -2% | 2.5% | $112.17 |
| illustrative-growth | 11% | -2% | 3% | $113.55 |
| illustrative-growth | 11% | 0% | 2% | $127.52 |
| illustrative-growth | 11% | 0% | 2.5% | $129.00 |
| illustrative-growth | 11% | 0% | 3% | $130.65 |
| illustrative-growth | 11% | 2% | 2% | $146.60 |
| illustrative-growth | 11% | 2% | 2.5% | $148.37 |
| illustrative-growth | 11% | 2% | 3% | $150.34 |
| illustrative-garp | 7% | -2% | 2% | $166.92 |
| illustrative-garp | 7% | -2% | 2.5% | $174.87 |
| illustrative-garp | 7% | -2% | 3% | $184.75 |
| illustrative-garp | 7% | 0% | 2% | $195.42 |
| illustrative-garp | 7% | 0% | 2.5% | $204.99 |
| illustrative-garp | 7% | 0% | 3% | $216.90 |
| illustrative-garp | 7% | 2% | 2% | $228.61 |
| illustrative-garp | 7% | 2% | 2.5% | $240.09 |
| illustrative-garp | 7% | 2% | 3% | $254.38 |
| illustrative-garp | 9% | -2% | 2% | $116.76 |
| illustrative-garp | 9% | -2% | 2.5% | $119.36 |
| illustrative-garp | 9% | -2% | 3% | $122.37 |
| illustrative-garp | 9% | 0% | 2% | $135.51 |
| illustrative-garp | 9% | 0% | 2.5% | $138.64 |
| illustrative-garp | 9% | 0% | 3% | $142.26 |
| illustrative-garp | 9% | 2% | 2% | $157.22 |
| illustrative-garp | 9% | 2% | 2.5% | $160.98 |
| illustrative-garp | 9% | 2% | 3% | $165.33 |
| illustrative-garp | 11% | -2% | 2% | $88.79 |
| illustrative-garp | 11% | -2% | 2.5% | $89.75 |
| illustrative-garp | 11% | -2% | 3% | $90.81 |
| illustrative-garp | 11% | 0% | 2% | $102.26 |
| illustrative-garp | 11% | 0% | 2.5% | $103.42 |
| illustrative-garp | 11% | 0% | 3% | $104.70 |
| illustrative-garp | 11% | 2% | 2% | $117.80 |
| illustrative-garp | 11% | 2% | 2.5% | $119.18 |
| illustrative-garp | 11% | 2% | 3% | $120.72 |
| illustrative-quality | 7% | -2% | 2% | $140.74 |
| illustrative-quality | 7% | -2% | 2.5% | $147.34 |
| illustrative-quality | 7% | -2% | 3% | $155.54 |
| illustrative-quality | 7% | 0% | 2% | $165.09 |
| illustrative-quality | 7% | 0% | 2.5% | $173.06 |
| illustrative-quality | 7% | 0% | 3% | $182.97 |
| illustrative-quality | 7% | 2% | 2% | $193.50 |
| illustrative-quality | 7% | 2% | 2.5% | $203.10 |
| illustrative-quality | 7% | 2% | 3% | $215.04 |
| illustrative-quality | 9% | -2% | 2% | $98.93 |
| illustrative-quality | 9% | -2% | 2.5% | $101.08 |
| illustrative-quality | 9% | -2% | 3% | $103.58 |
| illustrative-quality | 9% | 0% | 2% | $114.99 |
| illustrative-quality | 9% | 0% | 2.5% | $117.60 |
| illustrative-quality | 9% | 0% | 3% | $120.62 |
| illustrative-quality | 9% | 2% | 2% | $133.64 |
| illustrative-quality | 9% | 2% | 2.5% | $136.79 |
| illustrative-quality | 9% | 2% | 3% | $140.42 |
| illustrative-quality | 11% | -2% | 2% | $75.55 |
| illustrative-quality | 11% | -2% | 2.5% | $76.34 |
| illustrative-quality | 11% | -2% | 3% | $77.22 |
| illustrative-quality | 11% | 0% | 2% | $87.13 |
| illustrative-quality | 11% | 0% | 2.5% | $88.10 |
| illustrative-quality | 11% | 0% | 3% | $89.16 |
| illustrative-quality | 11% | 2% | 2% | $100.51 |
| illustrative-quality | 11% | 2% | 2.5% | $101.67 |
| illustrative-quality | 11% | 2% | 3% | $102.95 |

</details>

## Limits

- Investment styles label documented scenarios; they do not change the conservative policy verdict.
- Forward margins must include stock compensation and all unallocated corporate costs.
- Normalization is an estimate and remains separate from reported and adjusted metrics.
- Missing D&A is not treated as zero. Missing TTM comparison periods prevent a trailing value.
- A forecast requires segment bases that reconcile to consolidated revenue. Segment names must not overlap (for example, AI cannot be added to semiconductor revenue that already includes AI).
- Forecast losses do not create an assumed tax refund. Terminal growth requires continued reinvestment.

