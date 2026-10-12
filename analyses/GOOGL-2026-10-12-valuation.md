# GOOGL: valuation comparison

Price: $351.66 on 2026-10-09.

Price source: [Yahoo Finance](https://finance.yahoo.com/quote/GOOGL/history/), cross-checked against [Stock Analysis](https://stockanalysis.com/stocks/googl/history/). This is the regular-session close; [price audit](GOOGL-2026-10-12-data/price-source.json).

These are conditional model estimates, not price targets. The conservative policy verdict is separate from the forward scenarios. Missing models are not assigned an invented value.

## Investment Snapshot

| Item | Assessment |
| --- | --- |
| Business classification | Advertising-led digital platform with rapidly growing Cloud and capital-intensive AI infrastructure |
| Current price | $351.66; 2026-10-09 |
| Central valuation | about $195 |
| Reasonable valuation range | about $85 to about $295 — scenario-supported, not statistical |
| Valuation confidence | Low |
| Slowdown / Bear | about $85 |
| Upside | about $295 |
| Scenario-weighted expected value | Not assigned — insufficient evidence |
| Current price / central value | 1.81×; central value gap / price -44.86% |
| Current price / expected value | Not available |
| Required Margin of Safety | 40.00% |
| Business quality score | 3/5 |
| Primary valuation driver | Cloud and Services revenue growth after AI capital investment and shared research costs. |
| Most sensitive variables | wacc, revenue_growth, tax_rate |
| Primary risk | AI infrastructure commitments outpace sustainable cash generation; competition and regulation impair Search economics. |
| Primary thesis-break condition | Analyst monitoring thresholds: reassess if Cloud annual growth stays below 20% for two reporting periods, consolidated operating margin falls below 25%, or FCF is nonpositive for a full year. |

### Four separate questions

| Question | Interpretation |
| --- | --- |
| Business Quality | Is this a good business? Assess durability, returns on capital and stewardship; quality does not set its price. |
| Intrinsic Value | What are future cash flows reasonably worth? Use explicit operating assumptions and the confidence range. |
| Market Expectations | What must the company achieve to justify today's price? Read the conditional What Must Be True operating paths and compare their plausibility with sourced evidence. |
| Investment Decision | Consider quality, valuation, uncertainty, returns, required Margin of Safety and thesis risks together. The historical policy screen is one constraint; its failure alone is not a universal judgment about attractiveness. |

Expected value here is a probability-weighted present valuation, not an annualized or realized investment return. Estimating investor returns additionally requires a holding period, distributions, exit valuation and a consistent future share count.

## Valuation confidence and uncertainty

Conservative evidence rubric: any high or unknown risk => Low; at least two medium risks => Medium; otherwise High. This is an analyst evidence assessment, not a statistical probability.

**Scenario values are widely dispersed; valuation uncertainty is high.**

Estimate: range of explicit operating scenarios, not a statistical interval. Excludes unquantified tail risks and any separate option value for Other Bets. Scenario-supported working valuation range, not a statistical confidence interval or exhaustive bound.

| Evidence factor | Risk | Reason | Source |
| --- | --- | --- | --- |
| forecast_visibility | high | Near-term Cloud demand does not establish a decade of AI returns. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| revenue_concentration | high | Services remains the principal business and depends heavily on advertising and Search. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| cyclicality | medium | Advertising demand and enterprise spending are economically sensitive. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| margin_uncertainty | high | AI inference costs, competition and depreciation can alter monetization margins. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| reinvestment_uncertainty | high | Large committed infrastructure spending and undisclosed segment asset allocation weaken visibility into cash conversion. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| tax_uncertainty | medium | Investment gains distort reported effective taxes; normalized operating taxes are estimates. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| customer_concentration | unknown | No comparable quantified customer-concentration series was established; advertiser diversity does not eliminate distribution dependence. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| technological_disruption | high | AI answer products and competing platforms can alter search traffic and monetization. | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm |
| terminal_value_dependence | high | PV terminal value / enterprise value; above 75% is high, above 50% medium (framework judgment thresholds) | valuation.forward.operating-central.valuation |
| scenario_dispersion | high | Scenario values are widely dispersed: valuation uncertainty is high. | selected scenario DCFs |

### Central valuation sensitivity

One assumption changes at a time; rankings depend on these stated perturbations, not a universal measure of importance.

| Variable | Shift (percentage points) | Lower input value/share | Higher input value/share |
| --- | --- | --- | --- |
| wacc | ±1.0 | $240.21 | $160.53 |
| revenue_growth | ±2.0 | $160.2 | $233.19 |
| tax_rate | ±5.0 | $210.39 | $177.41 |
| operating_margin | ±2.0 | $177.92 | $209.88 |
| terminal_growth | ±0.5 | $188.21 | $200.48 |
| terminal_roic | ±3.0 | $186.6 | $198.77 |
| capex_to_revenue | ±1.0 | Not available | $189.43 |

## Scenario probabilities and expected value

Analyst-assigned subjective probabilities — not market-implied probabilities.

Probabilities cannot be responsibly assigned from the reviewed evidence. Alternative operating paths are explicit estimates; no defensible relative likelihoods or comparable long-range consensus were established.

| Scenario | Value/share | Probability | Contribution |
| --- | --- | --- | --- |
| ai-slowdown | $83.94 | Not assigned | Not assigned |
| operating-central | $193.9 | Not assigned | Not assigned |
| ai-execution-upside | $297.35 | Not assigned | Not assigned |

Hypothetical probability combinations for sensitivity only; not assigned probabilities or measured likelihoods.

| Combination | Scenario probabilities | Weighted valuation |
| --- | --- | --- |
| Downside-heavy illustrative sensitivity, not assigned beliefs | ai-slowdown: 50.00%; operating-central: 35.00%; ai-execution-upside: 15.00% | $154.44 |
| Central-heavy illustrative sensitivity, not assigned beliefs | ai-slowdown: 25.00%; operating-central: 50.00%; ai-execution-upside: 25.00% | $192.27 |
| Upside-heavy illustrative sensitivity, not assigned beliefs | ai-slowdown: 15.00%; operating-central: 35.00%; ai-execution-upside: 50.00% | $229.13 |

## Per-share economics

Historical flows use matching split-adjusted weighted-average diluted shares, not point-in-time shares outstanding. Observed diluted share changes include repurchases, issuance and dilution-accounting effects; they do not identify gross issuance separately.

Forecast share paths are explicit analyst diagnostics; they do not reprice the existing enterprise DCF. Its current-share denominator and expensed SBC remain unchanged. Forecast EPS is an adjusted operating proxy when scenario margins exclude acquisition amortization. Missing bridge inputs make FCF/EPS unavailable.

### Reported historical periods

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2016-12-31 | Not available | Not available | Not available | $1.39 | Not available | Not available | Not available | 7.43% | $3,693,000,000 | Not available |
| 2017-12-31 | Not available | Not available | Not available | $0.9 | Not available | Not available | Not available | 6.93% | $4,846,000,000 | Not available |
| 2018-12-31 | Not available | Not available | Not available | $2.19 | Not available | Not available | Not available | 6.84% | $9,075,000,000 | Not available |
| 2019-12-31 | Not available | Not available | Not available | $2.46 | Not available | Not available | Not available | 6.67% | $18,396,000,000 | Not available |
| 2020-12-31 | Not available | Not available | Not available | $2.93 | Not available | Not available | Not available | 7.12% | $31,149,000,000 | Not available |
| 2021-12-31 | Not available | Not available | Not available | $5.61 | Not available | Not available | Not available | 5.97% | $50,274,000,000 | Not available |
| 2022-12-31 | $21.49 | $4.56 | $3.11 | $4.56 | $1.47 | 13,159,000,000 | Not available | 6.85% | $59,296,000,000 | Not available |
| 2023-12-31 | $24.16 | $5.46 | $3.72 | $5.8 | $1.77 | 12,722,000,000 | -3.32% | 7.31% | $61,504,000,000 | -3.32% |
| 2024-12-31 | $28.12 | $5.85 | $4.03 | $8.04 | $1.83 | 12,447,000,000 | -2.16% | 6.51% | $62,222,000,000 | -2.16% |
| 2025-12-31 | $32.94 | $5.99 | $4 | $10.81 | $2.04 | 12,230,000,000 | -1.74% | 6.19% | $45,709,000,000 | -1.74% |

| Measure | Years | Company CAGR | Per-share CAGR | Difference (pp) | Interpretation |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 12.51% | 15.29% | -2.78 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| fcf | 3 | 6.88% | 9.52% | -2.64 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| revenue | 5 | 17.15% | Not available | Not available | Insufficient comparable positive endpoints. |
| fcf | 5 | 11.33% | Not available | Not available | Insufficient comparable positive endpoints. |

### Per-share forecast: ai-slowdown

Estimate: 1% annual net dilution and SBC at 6% of revenue, with no assumed repurchases. These are illustrative diagnostics, not issuance guidance or a model of preferred conversion. Current common shares proxy the starting diluted average count. No reliable future interest/nonoperating bridge is provided, so forecast FCF/share and EPS remain unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-06-30 | $40.07 | Not available | $-4.51 | Not available | $2.4 | 12,352,300,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2028-06-30 | $42.87 | Not available | $-3.48 | Not available | $2.57 | 12,475,823,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2029-06-30 | $45.2 | Not available | $-1.79 | Not available | $2.71 | 12,600,581,230 | 1.00% | 6.00% | $0 | 1.00% |
| 2030-06-30 | $47.42 | Not available | $0.22 | Not available | $2.84 | 12,726,587,042 | 1.00% | 6.00% | $0 | 1.00% |
| 2031-06-30 | $49.21 | Not available | $2.15 | Not available | $2.95 | 12,853,852,913 | 1.00% | 6.00% | $0 | 1.00% |
| 2032-06-30 | $50.84 | Not available | $3.58 | Not available | $3.05 | 12,982,391,442 | 1.00% | 6.00% | $0 | 1.00% |
| 2033-06-30 | $52.42 | Not available | $4.73 | Not available | $3.15 | 13,112,215,356 | 1.00% | 6.00% | $0 | 1.00% |
| 2034-06-30 | $53.91 | Not available | $5.98 | Not available | $3.23 | 13,243,337,510 | 1.00% | 6.00% | $0 | 1.00% |
| 2035-06-30 | $55.29 | Not available | $6.97 | Not available | $3.32 | 13,375,770,885 | 1.00% | 6.00% | $0 | 1.00% |
| 2036-06-30 | $56.55 | Not available | $7.43 | Not available | $3.39 | 13,509,528,594 | 1.00% | 6.00% | $0 | 1.00% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-06-30 | 2030-06-30 | 6.83% | 5.78% |
| fcf | 3 | 2027-06-30 | 2030-06-30 | Not available | Not available |
| revenue | 5 | 2027-06-30 | 2032-06-30 | 5.93% | 4.88% |
| fcf | 5 | 2027-06-30 | 2032-06-30 | Not available | Not available |

### Per-share forecast: operating-central

Estimate: 1% annual net dilution and SBC at 6% of revenue, with no assumed repurchases. These are illustrative diagnostics, not issuance guidance or a model of preferred conversion. Current common shares proxy the starting diluted average count. No reliable future interest/nonoperating bridge is provided, so forecast FCF/share and EPS remain unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-06-30 | $42.81 | Not available | $-3.29 | Not available | $2.57 | 12,352,300,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2028-06-30 | $49.42 | Not available | $-2.46 | Not available | $2.97 | 12,475,823,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2029-06-30 | $56.04 | Not available | $-0.39 | Not available | $3.36 | 12,600,581,230 | 1.00% | 6.00% | $0 | 1.00% |
| 2030-06-30 | $62.76 | Not available | $2.55 | Not available | $3.77 | 12,726,587,042 | 1.00% | 6.00% | $0 | 1.00% |
| 2031-06-30 | $69.16 | Not available | $6 | Not available | $4.15 | 12,853,852,913 | 1.00% | 6.00% | $0 | 1.00% |
| 2032-06-30 | $74.79 | Not available | $8.87 | Not available | $4.49 | 12,982,391,442 | 1.00% | 6.00% | $0 | 1.00% |
| 2033-06-30 | $79.7 | Not available | $11.54 | Not available | $4.78 | 13,112,215,356 | 1.00% | 6.00% | $0 | 1.00% |
| 2034-06-30 | $84.4 | Not available | $14.45 | Not available | $5.06 | 13,243,337,510 | 1.00% | 6.00% | $0 | 1.00% |
| 2035-06-30 | $88.26 | Not available | $16.83 | Not available | $5.3 | 13,375,770,885 | 1.00% | 6.00% | $0 | 1.00% |
| 2036-06-30 | $91.96 | Not available | $18.33 | Not available | $5.52 | 13,509,528,594 | 1.00% | 6.00% | $0 | 1.00% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-06-30 | 2030-06-30 | 14.74% | 13.60% |
| fcf | 3 | 2027-06-30 | 2030-06-30 | Not available | Not available |
| revenue | 5 | 2027-06-30 | 2032-06-30 | 12.92% | 11.80% |
| fcf | 5 | 2027-06-30 | 2032-06-30 | Not available | Not available |

### Per-share forecast: ai-execution-upside

Estimate: 1% annual net dilution and SBC at 6% of revenue, with no assumed repurchases. These are illustrative diagnostics, not issuance guidance or a model of preferred conversion. Current common shares proxy the starting diluted average count. No reliable future interest/nonoperating bridge is provided, so forecast FCF/share and EPS remain unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-06-30 | $44.64 | Not available | $-2.58 | Not available | $2.68 | 12,352,300,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2028-06-30 | $53.74 | Not available | $-1.68 | Not available | $3.22 | 12,475,823,000 | 1.00% | 6.00% | $0 | 1.00% |
| 2029-06-30 | $63.47 | Not available | $0.67 | Not available | $3.81 | 12,600,581,230 | 1.00% | 6.00% | $0 | 1.00% |
| 2030-06-30 | $73.35 | Not available | $4.49 | Not available | $4.4 | 12,726,587,042 | 1.00% | 6.00% | $0 | 1.00% |
| 2031-06-30 | $83.51 | Not available | $9.25 | Not available | $5.01 | 12,853,852,913 | 1.00% | 6.00% | $0 | 1.00% |
| 2032-06-30 | $93.33 | Not available | $13.45 | Not available | $5.6 | 12,982,391,442 | 1.00% | 6.00% | $0 | 1.00% |
| 2033-06-30 | $102.07 | Not available | $17.76 | Not available | $6.12 | 13,112,215,356 | 1.00% | 6.00% | $0 | 1.00% |
| 2034-06-30 | $109.86 | Not available | $22.44 | Not available | $6.59 | 13,243,337,510 | 1.00% | 6.00% | $0 | 1.00% |
| 2035-06-30 | $116.73 | Not available | $26.32 | Not available | $7 | 13,375,770,885 | 1.00% | 6.00% | $0 | 1.00% |
| 2036-06-30 | $122.4 | Not available | $28.98 | Not available | $7.34 | 13,509,528,594 | 1.00% | 6.00% | $0 | 1.00% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-06-30 | 2030-06-30 | 19.18% | 18.00% |
| fcf | 3 | 2027-06-30 | 2030-06-30 | Not available | Not available |
| revenue | 5 | 2027-06-30 | 2032-06-30 | 17.05% | 15.89% |
| fcf | 5 | 2027-06-30 | 2032-06-30 | Not available | Not available |

All formulas, dated source inputs and reported/estimated bases are retained in per-share-economics.json and per-share-metrics.csv. Repurchase spending does not prove dilution was offset.

## Business classification and central valuation

Advertising-led digital platform with rapidly growing Cloud and capital-intensive AI infrastructure. Quality-growth business assessed with GARP valuation discipline.

Estimate selected for distinct Services and Cloud economics, large AI reinvestment and central research costs. A style label does not set value. Forecasts remain provisional because future capital intensity, monetization and dilution are uncertain.

**Central conditional estimate: about $195; confidence Low** (provisional_estimate). Method: Explicit segment FCFF DCF. Business profile determines model suitability. Investment lens does not set growth or margins. Valuation is conditional on the explicit operating forecast; the policy result is a separate investment screen. GARP is a price discipline, not an intrinsic company category.

- Services and Cloud have separately reported revenue and operating results; shared AI costs sit outside segments. [Source](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm)
- Recent common and mandatory-convertible preferred issuance changes shareholder economics despite historical repurchases. [Source](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm)

## What Must Be True?

For each assumed segment operating margin, solve a common constant revenue growth rate that reprices the entire DCF to the supplied price. This consolidated hurdle holds the starting segment revenue mix fixed; it is not the AI-led central forecast. Capital intensity, working capital, corporate costs, discount rate and terminal reinvestment are held to the referenced model. Each row is a different conditional path; revenue, margin and FCFF cannot be solved independently from one price.

Milestones are rolling twelve-month periods ending on the base month/day, not fiscal-year forecasts. The terminal value starts only after the full forecast horizon; 2030 is not treated as a separate exit. All monetary amounts below are full-company USD billions; margins include SBC. Shares and net financial claims are held fixed. This is a conditional expectations test, not a prediction.

| Assumed margin | Required annual revenue growth | Milestone period | Required revenue | Operating margin | Required FCFF |
| --- | --- | --- | --- | --- | --- |
| 30.00% | 20.73% | 2030-06-30 | $947.25B | 25.60% | $16.06B |
| 30.00% | 20.73% | 2035-06-30 | $2429.62B | 27.81% | $342.07B |
| 40.00% | 16.27% | 2030-06-30 | $814.98B | 34.89% | $76.83B |
| 40.00% | 16.27% | 2035-06-30 | $1732.11B | 36.93% | $375.50B |
| 50.00% | 12.92% | 2030-06-30 | $724.89B | 44.25% | $124.28B |
| 50.00% | 12.92% | 2035-06-30 | $1330.77B | 46.00% | $388.14B |

WACC 9.00%, tax estimate 21.00%, terminal growth 2.50%, terminal ROIC 15.00%. The solver recomputes investment needs as revenue grows. Higher reinvestment, dilution, or lower terminal returns would change these requirements.

## Models side by side

| Model | Style | Status | Value/share | Price/value | Value gap / price | Margin of safety |
| --- | --- | --- | --- | --- | --- | --- |
| Conservative policy model | value | ok | $121.09 | 2.90× | -65.56% | -190.4% |
| ai-slowdown | growth | ok | $83.94 | 4.19× | -76.13% | -318.92% |
| operating-central | growth | ok | $193.90 | 1.81× | -44.86% | -81.36% |
| ai-execution-upside | growth | ok | $297.35 | 1.18× | -15.44% | -18.27% |
| garp | garp | not_configured | Not available | — | Not available | Not available |
| quality | quality | not_configured | Not available | — | Not available | Not available |

Value gap uses price as the denominator; margin of safety uses model value. Neither percentage predicts an investment return.

## Cash-flow bases and conditional reverse DCF

| Starting point | Basis/date | FCFF | Required annual growth |
| --- | --- | --- | --- |
| Historical three-year FCFF average (policy) | historical_average; 2025-12-31 | $48,809,526,596.76 | 25.1% |
| Latest annual FCFF | adjusted; 2025-12-31 | $48,925,476,042.97 | 25.07% |
| ttm-fcff | reported; 2026-06-30 | $26,963,643,257.40 | 33.42% |
| normalized-fcff-annual | normalized; 2025-12-31 | Not available | Not available |
| normalized-fcff-ttm | normalized; 2026-06-30 | Not available | Not available |
| Year-one FCFF: ai-slowdown | forward; 2026-06-30 | -$55,693,252,918.00 | Not available |
| Year-one FCFF: operating-central | forward; 2026-06-30 | -$40,643,577,698.00 | Not available |
| Year-one FCFF: ai-execution-upside | forward; 2026-06-30 | -$31,860,814,580.00 | Not available |

Required growth depends on the selected cash-flow base, WACC, terminal growth, capital claims and forecast horizon. It is not a direct measure of what the market expects. Year-one forward FCFF is a forecast, not a historical starting point.

- **Historical three-year FCFF average (policy):** Legacy cash-flow FCFF averaged over available last three annual periods; not tax-normalized
- **Latest annual FCFF:** OCF + after-tax interest - CapEx - SBC (legacy cash-flow definition); uses documented adjustments when configured
- **ttm-fcff:** TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized
- **normalized-fcff-annual:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **normalized-fcff-ttm:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **Year-one FCFF: ai-slowdown:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: operating-central:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: ai-execution-upside:** Explicit year-one segment forecast, not a historical starting cash flow

## Reported, TTM and normalized metrics

| Metric | Date | Basis | Value | Status |
| --- | --- | --- | --- | --- |
| reported-tax-rate-annual | 2025-12-31 | reported | 16.78% | ok |
| normalized-tax-rate-annual | 2025-12-31 | normalized | 21% | ok |
| normalized-nopat-annual | 2025-12-31 | normalized | $101,940,810,000.00 | ok |
| normalized-roic-annual | 2025-12-31 | normalized | 35.26% | ok |
| normalized-fcff-annual | 2025-12-31 | normalized | Not available | not_available |
| normalized-owner-earnings-annual | 2025-12-31 | normalized | Not available | not_available |
| reported-tax-rate-ttm | 2026-06-30 | reported | 18.4% | ok |
| ttm-revenue | 2026-06-30 | reported | $445,866,000,000.00 | ok |
| ttm-net-income | 2026-06-30 | reported | $244,205,000,000.00 | ok |
| ttm-fcf | 2026-06-30 | reported | $53,273,000,000.00 | ok |
| ttm-fcff | 2026-06-30 | reported | $26,963,643,257.40 | ok |
| ttm-ebitda | 2026-06-30 | reported | Not available | not_available |
| ttm-pe | 2026-06-30 | reported | 17.61 | ok |
| ttm-fcf-margin | 2026-06-30 | reported | 11.95% | ok |
| ttm-fcf-yield | 2026-06-30 | reported | 1.24% | ok |
| ttm-ev-ebitda | 2026-06-30 | reported | Not available | not_available |
| normalized-tax-rate-ttm | 2026-06-30 | normalized | 21% | ok |
| normalized-nopat-ttm | 2026-06-30 | normalized | $116,626,120,000.00 | ok |
| normalized-roic-ttm | 2026-06-30 | normalized | 29.51% | ok |
| normalized-fcff-ttm | 2026-06-30 | normalized | Not available | not_available |
| normalized-owner-earnings-ttm | 2026-06-30 | normalized | Not available | not_available |

Normalized metrics use reported inputs and explicit normalization estimates. They do not overwrite reported or manually adjusted metrics. The legacy owner-earnings calculation still uses its policy proxy; the normalized version requires an explicit maintenance-capital method.

### Normalization assumptions

```json
{
  "tax_rate": {
    "value": 0.21,
    "reason": "Estimate of normalized cash taxes for operating valuation. Removes dependence on volatile investment gains; not management tax guidance.",
    "source": "Analyst assumption dated 2026-10-12"
  },
  "maintenance_capex": {
    "method": "depreciation",
    "reason": "Estimate using physical depreciation as a maintenance proxy. Does not establish the replacement cost of AI infrastructure; acquisition amortization is excluded.",
    "source": "Analyst assumption anchored to SEC physical depreciation"
  }
}
```

## Forward scenario: ai-slowdown (growth)

**Reason:** Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.

**Source / assumption basis:** SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $494,905,370,000.00 | $122,773,230,800.00 | $25,782,378,468.00 | $32,810,746,650.00 | $178,918,522,500.00 | $6,576,329,400.00 | -$55,693,252,918.00 |
| 2 | $534,785,953,500.00 | $132,695,721,090.00 | $27,866,101,428.90 | $36,721,581,232.50 | $179,615,913,855.00 | $5,383,787,220.00 | -$43,448,500,181.40 |
| 3 | $569,509,235,790.00 | $140,955,319,233.60 | $29,600,617,039.06 | $40,188,306,061.80 | $169,331,700,408.00 | $4,704,005,044.80 | -$22,492,697,196.46 |
| 4 | $603,442,602,359.10 | $148,981,529,962.94 | $31,286,121,292.22 | $43,466,777,080.27 | $153,810,872,141.47 | $4,565,242,442.59 | $2,786,071,166.93 |
| 5 | $632,490,831,557.82 | $155,346,685,862.63 | $32,622,804,031.15 | $46,408,300,393.16 | $137,539,363,210.27 | $3,945,205,023.70 | $27,647,613,990.67 |
| 6 | $660,072,600,902.35 | $161,276,293,367.71 | $33,868,021,607.22 | $49,087,172,262.47 | $126,367,912,245.80 | $3,712,664,031.45 | $46,414,867,745.72 |
| 7 | $687,316,763,203.77 | $167,048,396,358.57 | $35,080,163,235.30 | $51,671,429,579.25 | $117,966,193,889.32 | $3,649,063,243.77 | $62,024,405,569.42 |
| 8 | $713,916,140,042.27 | $172,581,800,762.23 | $36,242,178,160.07 | $54,113,665,291.11 | $107,761,816,053.40 | $3,538,985,816.68 | $79,152,486,023.19 |
| 9 | $739,570,590,529.21 | $177,796,829,585.18 | $37,337,334,212.89 | $56,367,487,512.49 | $100,254,730,276.38 | $3,383,474,829.33 | $93,188,777,779.08 |
| 10 | $764,000,079,925.81 | $182,618,577,283.02 | $38,349,901,229.43 | $58,389,478,575.75 | $99,158,388,354.88 | $3,185,533,249.46 | $100,314,233,024.99 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 88.75%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "ai-slowdown",
  "style": "growth",
  "years": 10,
  "wacc": 0.09,
  "tax_rate": 0.21,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "source": "SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.",
  "reason": "Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.",
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    36000000000,
    37800000000,
    39690000000,
    41674500000.00001,
    43758225000.00001,
    45946136250.000015,
    48243443062.500015,
    50655615215.625015,
    53188395976.406265,
    55847815775.226585
  ],
  "segments": [
    {
      "name": "Google Services",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_services_revenue",
            "value": 342721000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 184177000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 159807000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.12,
      "growth": [
        0.07,
        0.05,
        0.04,
        0.04,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03
      ],
      "operating_margin": [
        0.34,
        0.34,
        0.34,
        0.34,
        0.34,
        0.34,
        0.34,
        0.34,
        0.34,
        0.34
      ],
      "depreciation_to_revenue": [
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045
      ],
      "capex_to_revenue": [
        0.25,
        0.23,
        0.2,
        0.17,
        0.15,
        0.13,
        0.12,
        0.11,
        0.1,
        0.1
      ],
      "working_capital_to_revenue": [
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12
      ]
    },
    {
      "name": "Google Cloud",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_cloud_revenue",
            "value": 58705000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 44796000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 25884000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.15,
      "growth": [
        0.3,
        0.2,
        0.15,
        0.12,
        0.1,
        0.08,
        0.07,
        0.06,
        0.05,
        0.04
      ],
      "operating_margin": [
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25
      ],
      "depreciation_to_revenue": [
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ],
      "capex_to_revenue": [
        0.8,
        0.7,
        0.6,
        0.5,
        0.4,
        0.35,
        0.3,
        0.25,
        0.22,
        0.2
      ],
      "working_capital_to_revenue": [
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ]
    },
    {
      "name": "Other Bets and revenue hedging",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "other_bets_revenue",
            "value": 1537000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 793000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 823000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 127000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 74000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_gain",
            "value": 148000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0,
      "growth": [
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
      ],
      "operating_margin": [
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
      "depreciation_to_revenue": [
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
      "capex_to_revenue": [
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
      "working_capital_to_revenue": [
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
      ]
    }
  ]
}
```

</details>

## Forward scenario: operating-central (growth)

**Reason:** Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.

**Source / assumption basis:** SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $528,783,320,000.00 | $165,094,273,800.00 | $34,669,797,498.00 | $35,965,211,400.00 | $195,925,880,000.00 | $11,107,385,400.00 | -$40,643,577,698.00 |
| 2 | $616,528,507,000.00 | $195,628,378,680.00 | $41,081,959,522.80 | $44,800,880,040.00 | $218,115,895,760.00 | $11,919,233,040.00 | -$30,687,829,602.80 |
| 3 | $706,194,101,830.00 | $226,727,116,711.20 | $47,612,694,509.35 | $53,967,323,793.60 | $225,728,478,416.00 | $12,219,172,509.60 | -$4,865,904,930.15 |
| 4 | $798,671,463,783.90 | $258,663,703,443.10 | $54,319,377,723.05 | $63,688,017,152.09 | $222,941,308,407.89 | $12,678,448,330.97 | $32,412,586,133.28 |
| 5 | $888,983,156,749.02 | $289,655,147,252.86 | $60,827,580,923.10 | $73,311,104,596.48 | $212,586,187,154.95 | $12,418,165,893.39 | $77,134,317,877.91 |
| 6 | $970,913,112,163.47 | $317,484,049,210.53 | $66,671,650,334.21 | $82,000,632,674.77 | $206,430,895,178.51 | $11,253,014,312.94 | $115,129,122,059.65 |
| 7 | $1,045,045,017,779.14 | $342,313,439,173.69 | $71,885,822,226.47 | $89,938,601,809.64 | $198,898,271,480.37 | $10,202,381,975.47 | $151,265,565,301.01 |
| 8 | $1,117,766,268,674.10 | $366,593,261,134.47 | $76,984,584,838.24 | $97,505,881,901.02 | $185,810,611,298.20 | $9,944,913,574.02 | $191,359,033,325.03 |
| 9 | $1,180,506,748,360.39 | $387,054,887,429.54 | $81,281,526,360.20 | $104,108,025,177.85 | $176,232,243,845.74 | $8,599,355,402.25 | $225,049,786,999.21 |
| 10 | $1,242,335,285,879.82 | $407,111,805,088.46 | $85,493,479,068.58 | $110,460,891,665.61 | $176,083,650,685.45 | $8,429,967,098.19 | $247,565,599,901.85 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 79.45%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "operating-central",
  "style": "growth",
  "years": 10,
  "wacc": 0.09,
  "tax_rate": 0.21,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "source": "SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.",
  "reason": "Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.",
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    36000000000,
    37800000000,
    39690000000,
    41674500000.00001,
    43758225000.00001,
    45946136250.000015,
    48243443062.500015,
    50655615215.625015,
    53188395976.406265,
    55847815775.226585
  ],
  "segments": [
    {
      "name": "Google Services",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_services_revenue",
            "value": 342721000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 184177000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 159807000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.12,
      "growth": [
        0.12,
        0.1,
        0.09,
        0.08,
        0.07,
        0.06,
        0.05,
        0.05,
        0.04,
        0.04
      ],
      "operating_margin": [
        0.39,
        0.39,
        0.39,
        0.39,
        0.39,
        0.39,
        0.39,
        0.39,
        0.39,
        0.39
      ],
      "depreciation_to_revenue": [
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045
      ],
      "capex_to_revenue": [
        0.25,
        0.23,
        0.2,
        0.17,
        0.15,
        0.13,
        0.12,
        0.11,
        0.1,
        0.1
      ],
      "working_capital_to_revenue": [
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12
      ]
    },
    {
      "name": "Google Cloud",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_cloud_revenue",
            "value": 58705000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 44796000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 25884000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.15,
      "growth": [
        0.5,
        0.4,
        0.3,
        0.25,
        0.2,
        0.15,
        0.12,
        0.1,
        0.08,
        0.07
      ],
      "operating_margin": [
        0.35,
        0.35,
        0.35,
        0.35,
        0.35,
        0.35,
        0.35,
        0.35,
        0.35,
        0.35
      ],
      "depreciation_to_revenue": [
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ],
      "capex_to_revenue": [
        0.8,
        0.7,
        0.6,
        0.5,
        0.4,
        0.35,
        0.3,
        0.25,
        0.22,
        0.2
      ],
      "working_capital_to_revenue": [
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ]
    },
    {
      "name": "Other Bets and revenue hedging",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "other_bets_revenue",
            "value": 1537000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 793000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 823000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 127000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 74000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_gain",
            "value": 148000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0,
      "growth": [
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
      ],
      "operating_margin": [
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
      "depreciation_to_revenue": [
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
      "capex_to_revenue": [
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
      "working_capital_to_revenue": [
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
      ]
    }
  ]
}
```

</details>

## Forward scenario: ai-execution-upside (growth)

**Reason:** Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.

**Source / assumption basis:** SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $551,438,600,000.00 | $192,532,173,000.00 | $40,431,756,330.00 | $38,207,166,750.00 | $207,993,102,500.00 | $14,175,295,500.00 | -$31,860,814,580.00 |
| 2 | $670,413,524,500.00 | $239,395,426,890.00 | $50,273,039,646.90 | $50,281,875,202.50 | $244,189,446,035.00 | $16,190,716,290.00 | -$20,975,899,879.40 |
| 3 | $799,792,012,245.00 | $290,280,764,547.90 | $60,958,960,555.06 | $64,169,321,737.27 | $267,267,458,499.00 | $17,822,983,259.40 | $8,400,683,971.72 |
| 4 | $933,492,767,982.00 | $342,808,773,402.69 | $71,989,842,414.56 | $78,654,541,061.00 | $273,830,992,241.57 | $18,456,533,654.94 | $57,185,946,152.62 |
| 5 | $1,073,390,939,090.88 | $397,704,592,704.93 | $83,517,964,468.04 | $94,124,468,392.49 | $270,045,005,912.48 | $19,401,528,519.39 | $118,864,562,197.52 |
| 6 | $1,211,661,742,671.67 | $451,811,253,461.33 | $94,880,363,226.88 | $109,521,005,835.14 | $272,690,794,794.58 | $19,205,822,149.15 | $174,555,279,125.86 |
| 7 | $1,338,402,121,223.65 | $501,139,001,200.62 | $105,239,190,252.13 | $123,480,740,220.60 | $268,971,527,475.36 | $17,559,508,433.10 | $232,849,515,260.63 |
| 8 | $1,454,876,222,141.92 | $546,164,282,850.38 | $114,694,499,398.58 | $136,317,524,814.00 | $254,414,966,188.90 | $16,138,291,648.52 | $297,234,050,428.38 |
| 9 | $1,561,393,883,258.92 | $586,982,036,996.86 | $123,266,227,769.34 | $148,199,478,556.19 | $245,122,708,544.62 | $14,798,284,974.21 | $351,994,294,264.88 |
| 10 | $1,653,588,590,978.73 | $621,817,829,720.46 | $130,581,744,241.30 | $158,585,605,899.74 | $245,416,900,723.61 | $12,835,845,578.46 | $391,568,945,076.83 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 77.64%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "ai-execution-upside",
  "style": "growth",
  "years": 10,
  "wacc": 0.09,
  "tax_rate": 0.21,
  "terminal_growth": 0.025,
  "terminal_roic": 0.15,
  "source": "SEC 10-K 0001652044-26-000018 and 10-Q 0001652044-26-000071; growth, margins, investment and tax paths are analyst estimates dated 2026-10-12, not guidance or consensus.",
  "reason": "Estimate: explicit Services and Cloud growth with fading infrastructure investment. Segment margins include SBC and depreciation. Other Bets operating losses and unallocated AI/corporate expense are combined in a separately modeled cost path, starting at $36B and increasing by 5% annually. Residual revenue has zero operating margin before those costs. Depreciation and investment allocations are illustrative because segment asset data is not disclosed. The same capex ratios across cases isolate demand and margin risk; lower demand does not immediately remove capital commitments.",
  "sbc_treatment": "expensed_in_margins",
  "corporate_costs": [
    36000000000,
    37800000000,
    39690000000,
    41674500000.00001,
    43758225000.00001,
    45946136250.000015,
    48243443062.500015,
    50655615215.625015,
    53188395976.406265,
    55847815775.226585
  ],
  "segments": [
    {
      "name": "Google Services",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_services_revenue",
            "value": 342721000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 184177000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_services_revenue",
            "value": 159807000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.12,
      "growth": [
        0.15,
        0.13,
        0.11,
        0.1,
        0.09,
        0.08,
        0.07,
        0.06,
        0.05,
        0.04
      ],
      "operating_margin": [
        0.42,
        0.42,
        0.42,
        0.42,
        0.42,
        0.42,
        0.42,
        0.42,
        0.42,
        0.42
      ],
      "depreciation_to_revenue": [
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045,
        0.045
      ],
      "capex_to_revenue": [
        0.25,
        0.23,
        0.2,
        0.17,
        0.15,
        0.13,
        0.12,
        0.11,
        0.1,
        0.1
      ],
      "working_capital_to_revenue": [
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12,
        0.12
      ]
    },
    {
      "name": "Google Cloud",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "google_cloud_revenue",
            "value": 58705000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 44796000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "google_cloud_revenue",
            "value": 25884000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.15,
      "growth": [
        0.65,
        0.5,
        0.4,
        0.3,
        0.25,
        0.2,
        0.15,
        0.12,
        0.1,
        0.08
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
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ],
      "capex_to_revenue": [
        0.8,
        0.7,
        0.6,
        0.5,
        0.4,
        0.35,
        0.3,
        0.25,
        0.22,
        0.2
      ],
      "working_capital_to_revenue": [
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15
      ]
    },
    {
      "name": "Other Bets and revenue hedging",
      "base_revenue": {
        "period_end": "2026-06-30",
        "components": [
          {
            "item": "other_bets_revenue",
            "value": 1537000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 793000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": 1
          },
          {
            "item": "other_bets_revenue",
            "value": 823000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 127000000,
            "period_end": "2025-12-31",
            "source": "10-K 0001652044-26-000018",
            "sign": -1
          },
          {
            "item": "revenue_hedging_loss",
            "value": 74000000,
            "period_end": "2026-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          },
          {
            "item": "revenue_hedging_gain",
            "value": 148000000,
            "period_end": "2025-06-30",
            "source": "10-Q 0001652044-26-000071",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0,
      "growth": [
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
      ],
      "operating_margin": [
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
      "depreciation_to_revenue": [
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
      "capex_to_revenue": [
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
      "working_capital_to_revenue": [
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
      ]
    }
  ]
}
```

</details>

## Sensitivity analysis

Historical sensitivity varies constant FCFF growth. Forward sensitivity shifts every segment annual revenue growth by -2, 0 or +2 percentage points while recalculating reinvestment.

<details><summary>Historical and normalized cash-flow sensitivity</summary>

| Basis | WACC | FCFF growth | Terminal growth | Value/share |
| --- | --- | --- | --- | --- |
| historical-average | 7% | 5% | 2% | $113.61 |
| historical-average | 7% | 5% | 2.5% | $121.46 |
| historical-average | 7% | 5% | 3% | $131.29 |
| historical-average | 7% | 10% | 2% | $164.12 |
| historical-average | 7% | 10% | 2.5% | $176.64 |
| historical-average | 7% | 10% | 3% | $192.28 |
| historical-average | 7% | 15% | 2% | $238.21 |
| historical-average | 7% | 15% | 2.5% | $257.73 |
| historical-average | 7% | 15% | 3% | $282.12 |
| historical-average | 9% | 5% | 2% | $82.86 |
| historical-average | 9% | 5% | 2.5% | $86.14 |
| historical-average | 9% | 5% | 3% | $89.98 |
| historical-average | 9% | 10% | 2% | $115.86 |
| historical-average | 9% | 10% | 2.5% | $121.09 |
| historical-average | 9% | 10% | 3% | $127.21 |
| historical-average | 9% | 15% | 2% | $163.77 |
| historical-average | 9% | 15% | 2.5% | $171.94 |
| historical-average | 9% | 15% | 3% | $181.47 |
| historical-average | 11% | 5% | 2% | $65.89 |
| historical-average | 11% | 5% | 2.5% | $67.55 |
| historical-average | 11% | 5% | 3% | $69.42 |
| historical-average | 11% | 10% | 2% | $89.46 |
| historical-average | 11% | 10% | 2.5% | $92.11 |
| historical-average | 11% | 10% | 3% | $95.08 |
| historical-average | 11% | 15% | 2% | $123.35 |
| historical-average | 11% | 15% | 2.5% | $127.47 |
| historical-average | 11% | 15% | 3% | $132.11 |
| latest-annual | 7% | 5% | 2% | $113.85 |
| latest-annual | 7% | 5% | 2.5% | $121.73 |
| latest-annual | 7% | 5% | 3% | $131.57 |
| latest-annual | 7% | 10% | 2% | $164.49 |
| latest-annual | 7% | 10% | 2.5% | $177.03 |
| latest-annual | 7% | 10% | 3% | $192.71 |
| latest-annual | 7% | 15% | 2% | $238.76 |
| latest-annual | 7% | 15% | 2.5% | $258.32 |
| latest-annual | 7% | 15% | 3% | $282.77 |
| latest-annual | 9% | 5% | 2% | $83.03 |
| latest-annual | 9% | 5% | 2.5% | $86.33 |
| latest-annual | 9% | 5% | 3% | $90.17 |
| latest-annual | 9% | 10% | 2% | $116.11 |
| latest-annual | 9% | 10% | 2.5% | $121.36 |
| latest-annual | 9% | 10% | 3% | $127.48 |
| latest-annual | 9% | 15% | 2% | $164.13 |
| latest-annual | 9% | 15% | 2.5% | $172.32 |
| latest-annual | 9% | 15% | 3% | $181.87 |
| latest-annual | 11% | 5% | 2% | $66.02 |
| latest-annual | 11% | 5% | 2.5% | $67.68 |
| latest-annual | 11% | 5% | 3% | $69.56 |
| latest-annual | 11% | 10% | 2% | $89.65 |
| latest-annual | 11% | 10% | 2.5% | $92.30 |
| latest-annual | 11% | 10% | 3% | $95.29 |
| latest-annual | 11% | 15% | 2% | $123.62 |
| latest-annual | 11% | 15% | 2.5% | $127.75 |
| latest-annual | 11% | 15% | 3% | $132.40 |
| ttm-fcff | 7% | 5% | 2% | $67.31 |
| ttm-fcff | 7% | 5% | 2.5% | $71.65 |
| ttm-fcff | 7% | 5% | 3% | $77.07 |
| ttm-fcff | 7% | 10% | 2% | $95.21 |
| ttm-fcff | 7% | 10% | 2.5% | $102.13 |
| ttm-fcff | 7% | 10% | 3% | $110.77 |
| ttm-fcff | 7% | 15% | 2% | $136.14 |
| ttm-fcff | 7% | 15% | 2.5% | $146.92 |
| ttm-fcff | 7% | 15% | 3% | $160.40 |
| ttm-fcff | 9% | 5% | 2% | $50.32 |
| ttm-fcff | 9% | 5% | 2.5% | $52.14 |
| ttm-fcff | 9% | 5% | 3% | $54.26 |
| ttm-fcff | 9% | 10% | 2% | $68.55 |
| ttm-fcff | 9% | 10% | 2.5% | $71.44 |
| ttm-fcff | 9% | 10% | 3% | $74.82 |
| ttm-fcff | 9% | 15% | 2% | $95.02 |
| ttm-fcff | 9% | 15% | 2.5% | $99.53 |
| ttm-fcff | 9% | 15% | 3% | $104.80 |
| ttm-fcff | 11% | 5% | 2% | $40.95 |
| ttm-fcff | 11% | 5% | 2.5% | $41.86 |
| ttm-fcff | 11% | 5% | 3% | $42.90 |
| ttm-fcff | 11% | 10% | 2% | $53.97 |
| ttm-fcff | 11% | 10% | 2.5% | $55.43 |
| ttm-fcff | 11% | 10% | 3% | $57.08 |
| ttm-fcff | 11% | 15% | 2% | $72.69 |
| ttm-fcff | 11% | 15% | 2.5% | $74.97 |
| ttm-fcff | 11% | 15% | 3% | $77.53 |
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
| ai-slowdown | 7% | -2% | 2% | $99.04 |
| ai-slowdown | 7% | -2% | 2.5% | $105.07 |
| ai-slowdown | 7% | -2% | 3% | $112.57 |
| ai-slowdown | 7% | 0% | 2% | $126.88 |
| ai-slowdown | 7% | 0% | 2.5% | $134.68 |
| ai-slowdown | 7% | 0% | 3% | $144.39 |
| ai-slowdown | 7% | 2% | 2% | $159.70 |
| ai-slowdown | 7% | 2% | 2.5% | $169.61 |
| ai-slowdown | 7% | 2% | 3% | $181.94 |
| ai-slowdown | 9% | -2% | 2% | $63.90 |
| ai-slowdown | 9% | -2% | 2.5% | $65.87 |
| ai-slowdown | 9% | -2% | 3% | $68.15 |
| ai-slowdown | 9% | 0% | 2% | $81.39 |
| ai-slowdown | 9% | 0% | 2.5% | $83.94 |
| ai-slowdown | 9% | 0% | 3% | $86.89 |
| ai-slowdown | 9% | 2% | 2% | $101.98 |
| ai-slowdown | 9% | 2% | 2.5% | $105.22 |
| ai-slowdown | 9% | 2% | 3% | $108.97 |
| ai-slowdown | 11% | -2% | 2% | $45.27 |
| ai-slowdown | 11% | -2% | 2.5% | $46.00 |
| ai-slowdown | 11% | -2% | 3% | $46.80 |
| ai-slowdown | 11% | 0% | 2% | $57.28 |
| ai-slowdown | 11% | 0% | 2.5% | $58.22 |
| ai-slowdown | 11% | 0% | 3% | $59.26 |
| ai-slowdown | 11% | 2% | 2% | $71.38 |
| ai-slowdown | 11% | 2% | 2.5% | $72.57 |
| ai-slowdown | 11% | 2% | 3% | $73.90 |
| operating-central | 7% | -2% | 2% | $239.10 |
| operating-central | 7% | -2% | 2.5% | $253.23 |
| operating-central | 7% | -2% | 3% | $270.80 |
| operating-central | 7% | 0% | 2% | $290.79 |
| operating-central | 7% | 0% | 2.5% | $308.19 |
| operating-central | 7% | 0% | 3% | $329.83 |
| operating-central | 7% | 2% | 2% | $351.18 |
| operating-central | 7% | 2% | 2.5% | $372.42 |
| operating-central | 7% | 2% | 3% | $398.83 |
| operating-central | 9% | -2% | 2% | $155.58 |
| operating-central | 9% | -2% | 2.5% | $160.20 |
| operating-central | 9% | -2% | 3% | $165.54 |
| operating-central | 9% | 0% | 2% | $188.21 |
| operating-central | 9% | 0% | 2.5% | $193.90 |
| operating-central | 9% | 0% | 3% | $200.48 |
| operating-central | 9% | 2% | 2% | $226.24 |
| operating-central | 9% | 2% | 2.5% | $233.19 |
| operating-central | 9% | 2% | 3% | $241.22 |
| operating-central | 11% | -2% | 2% | $110.89 |
| operating-central | 11% | -2% | 2.5% | $112.60 |
| operating-central | 11% | -2% | 3% | $114.49 |
| operating-central | 11% | 0% | 2% | $133.40 |
| operating-central | 11% | 0% | 2.5% | $135.50 |
| operating-central | 11% | 0% | 3% | $137.83 |
| operating-central | 11% | 2% | 2% | $159.57 |
| operating-central | 11% | 2% | 2.5% | $162.14 |
| operating-central | 11% | 2% | 3% | $164.98 |
| ai-execution-upside | 7% | -2% | 2% | $372.44 |
| ai-execution-upside | 7% | -2% | 2.5% | $394.39 |
| ai-execution-upside | 7% | -2% | 3% | $421.69 |
| ai-execution-upside | 7% | 0% | 2% | $445.73 |
| ai-execution-upside | 7% | 0% | 2.5% | $472.31 |
| ai-execution-upside | 7% | 0% | 3% | $505.35 |
| ai-execution-upside | 7% | 2% | 2% | $530.89 |
| ai-execution-upside | 7% | 2% | 2.5% | $562.87 |
| ai-execution-upside | 7% | 2% | 3% | $602.64 |
| ai-execution-upside | 9% | -2% | 2% | $242.35 |
| ai-execution-upside | 9% | -2% | 2.5% | $249.54 |
| ai-execution-upside | 9% | -2% | 3% | $257.84 |
| ai-execution-upside | 9% | 0% | 2% | $288.65 |
| ai-execution-upside | 9% | 0% | 2.5% | $297.35 |
| ai-execution-upside | 9% | 0% | 3% | $307.40 |
| ai-execution-upside | 9% | 2% | 2% | $342.33 |
| ai-execution-upside | 9% | 2% | 2.5% | $352.79 |
| ai-execution-upside | 9% | 2% | 3% | $364.88 |
| ai-execution-upside | 11% | -2% | 2% | $172.63 |
| ai-execution-upside | 11% | -2% | 2.5% | $175.28 |
| ai-execution-upside | 11% | -2% | 3% | $178.21 |
| ai-execution-upside | 11% | 0% | 2% | $204.59 |
| ai-execution-upside | 11% | 0% | 2.5% | $207.80 |
| ai-execution-upside | 11% | 0% | 3% | $211.35 |
| ai-execution-upside | 11% | 2% | 2% | $241.57 |
| ai-execution-upside | 11% | 2% | 2.5% | $245.43 |
| ai-execution-upside | 11% | 2% | 3% | $249.70 |

</details>

## Limits

- Investment styles label documented scenarios; they do not change the conservative policy verdict.
- Forward margins must include stock compensation and all unallocated corporate costs.
- Normalization is an estimate and remains separate from reported and adjusted metrics.
- Missing D&A is not treated as zero. Missing TTM comparison periods prevent a trailing value.
- A forecast requires segment bases that reconcile to consolidated revenue. Segment names must not overlap (for example, AI cannot be added to semiconductor revenue that already includes AI).
- Forecast losses do not create an assumed tax refund. Terminal growth requires continued reinvestment.
