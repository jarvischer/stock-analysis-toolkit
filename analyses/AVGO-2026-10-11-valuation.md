# AVGO: valuation comparison

[Full investment report](AVGO-2026-10-11.md) · [All data and cards](AVGO-2026-10-11-v4-data/README.md) · [Excel workbook](../output/spreadsheet/AVGO-2026-10-11-v4.xlsx)

Price: $361.54 on 2026-10-09.

These are conditional model estimates, not price targets. The conservative policy verdict is separate from the forward scenarios. Missing models are not assigned an invented value.

## Investment Snapshot

| Item | Assessment |
| --- | --- |
| Business classification | AI-led semiconductor growth with a recurring infrastructure-software cash-flow business |
| Current price | $361.54; 2026-10-09 |
| Central valuation | about $320 |
| Reasonable valuation range | about $125 to about $540 — scenario-supported, not statistical |
| Valuation confidence | Low |
| Slowdown / Bear | about $125 |
| Upside | about $540 |
| Scenario-weighted expected value | Not assigned — insufficient evidence |
| Current price / central value | 1.13×; central value gap / price -11.84% |
| Current price / expected value | Not available |
| Required Margin of Safety | 40.00% |
| Business quality score | 3/5 |
| Primary valuation driver | AI revenue growth translated into after-SBC margins and FCFF. |
| Most sensitive variables | wacc, revenue_growth, tax_rate |
| Primary risk | Customer concentration and AI execution or margin shortfalls. |
| Primary thesis-break condition | Reassess the central thesis if annual AI revenue growth falls below 20% during the first two forecast years, or consolidated after-SBC operating margin falls below 35%. Analyst monitoring thresholds, not management guidance. |

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

The slowdown and execution-upside operating paths bound a working range for the explicitly modeled AI outcomes. They are not exhaustive tail outcomes. Scenario-supported working valuation range, not a statistical confidence interval or exhaustive bound.

| Evidence factor | Risk | Reason | Source |
| --- | --- | --- | --- |
| forecast_visibility | high | Quarterly guidance supports near-term growth, but does not establish a ten-year path. | https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial |
| revenue_concentration | high | AI is a large and fast-changing portion of consolidated revenue; mix and economics can change quickly. | https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial |
| cyclicality | high | Hyperscaler spending and semiconductor demand can slow; slowdown scenario reduces growth and margins. | https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial |
| margin_uncertainty | high | Non-GAAP guidance is not the model margin after SBC. Future systems mix and customer bargaining can compress margins. | https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial |
| reinvestment_uncertainty | high | Working-capital and capital-intensity paths are analyst assumptions, with limited visibility into future systems delivery. | assumptions.forward_scenarios.operating-central |
| tax_uncertainty | medium | 21% is an explicit normalized estimate; historical tax benefits do not establish a sustainable rate. | assumptions.normalization |
| customer_concentration | high | Five end customers represent 55% of latest-quarter revenue; distributor exposure overlaps and must not be added. | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/ |
| technological_disruption | high | Customer internal design and alternative accelerator ecosystems threaten both volume and margins. | https://ir.amd.com/financial-information/sec-filings/content/0001193125-26-129106/0001193125-26-129106.pdf |
| terminal_value_dependence | medium | PV terminal value / enterprise value; above 75% is high, above 50% medium (framework judgment thresholds) | valuation.forward.operating-central.valuation |
| scenario_dispersion | high | Scenario values are widely dispersed: valuation uncertainty is high. | selected scenario DCFs |

### Central valuation sensitivity

One assumption changes at a time; rankings depend on these stated perturbations, not a universal measure of importance.

| Variable | Shift (percentage points) | Lower input value/share | Higher input value/share |
| --- | --- | --- | --- |
| wacc | ±1.0 | $382.95 | $271.71 |
| revenue_growth | ±2.0 | $278.2 | $365.18 |
| tax_rate | ±5.0 | $340.33 | $297.13 |
| operating_margin | ±2.0 | $302.04 | $335.43 |
| terminal_growth | ±0.5 | $311.26 | $327.36 |
| terminal_roic | ±3.0 | $309.15 | $325.12 |
| capex_to_revenue | ±1.0 | $323.36 | $314.1 |

## Scenario probabilities and expected value

Analyst-assigned subjective probabilities — not market-implied probabilities.

Probabilities cannot be responsibly assigned: the evidence supports possible operating paths but does not establish defensible relative likelihoods over ten years.

| Scenario | Value/share | Probability | Contribution |
| --- | --- | --- | --- |
| ai-slowdown | $125.83 | Not assigned | Not assigned |
| operating-central | $318.73 | Not assigned | Not assigned |
| ai-execution-upside | $541.44 | Not assigned | Not assigned |

Hypothetical probability combinations for sensitivity only; not assigned probabilities or measured likelihoods.

| Combination | Scenario probabilities | Weighted valuation |
| --- | --- | --- |
| Slowdown-heavy (illustrative only) | ai-slowdown: 50.00%; operating-central: 35.00%; ai-execution-upside: 15.00% | $255.69 |
| Central-heavy (illustrative only) | ai-slowdown: 25.00%; operating-central: 50.00%; ai-execution-upside: 25.00% | $326.18 |
| Upside-heavy (illustrative only) | ai-slowdown: 15.00%; operating-central: 35.00%; ai-execution-upside: 50.00% | $401.15 |

## Per-share economics

Historical flows use matching split-adjusted weighted-average diluted shares, not point-in-time shares outstanding. Observed diluted share changes include repurchases, issuance and dilution-accounting effects; they do not identify gross issuance separately.

Forecast share paths are explicit analyst diagnostics; they do not reprice the existing enterprise DCF. Its current-share denominator and expensed SBC remain unchanged. Forecast EPS is an adjusted operating proxy when scenario margins exclude acquisition amortization. Missing bridge inputs make FCF/EPS unavailable.

### Reported historical periods

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2016-10-30 | $3.46 | $0.7 | $0.65 | $-0.49 | $0.18 | 3,830,000,000 | Not available | 5.13% | $0 | Not available |
| 2017-10-29 | $4.19 | $1.3 | $1.19 | $0.4 | $0.22 | 4,210,000,000 | 9.92% | 5.22% | $0 | 9.92% |
| 2018-11-04 | $4.84 | $1.91 | $1.77 | $2.84 | $0.28 | 4,310,000,000 | 2.38% | 5.89% | $7,258,000,000 | 2.38% |
| 2019-11-03 | $5.39 | $2.21 | $2.03 | $0.64 | $0.52 | 4,190,000,000 | -2.78% | 9.67% | $5,435,000,000 | -2.78% |
| 2020-11-01 | $5.67 | $2.75 | $2.71 | $0.63 | $0.47 | 4,210,000,000 | 0.48% | 8.27% | $0 | 0.48% |
| 2021-10-31 | $6.4 | $3.11 | $3.15 | $1.5 | $0.4 | 4,290,000,000 | 1.90% | 6.21% | $0 | 1.90% |
| 2022-10-30 | $7.85 | $3.85 | $3.87 | $2.65 | $0.36 | 4,232,000,000 | -1.35% | 4.62% | $7,000,000,000 | -1.35% |
| 2023-10-29 | $8.38 | $4.13 | $3.97 | $3.3 | $0.51 | 4,272,000,000 | 0.95% | 6.06% | $5,824,000,000 | 0.95% |
| 2024-11-03 | $10.79 | $4.06 | $3.4 | $1.23 | $1.2 | 4,778,000,000 | 11.84% | 11.13% | $7,176,000,000 | 11.84% |
| 2025-11-02 | $13.16 | $5.55 | $4.65 | $4.77 | $1.56 | 4,853,000,000 | 1.57% | 11.85% | $2,450,000,000 | 1.57% |

| Measure | Years | Company CAGR | Per-share CAGR | Difference (pp) | Interpretation |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 24.38% | 18.83% | 5.55 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| fcf | 3 | 18.17% | 12.89% | 5.27 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| revenue | 5 | 21.74% | 18.33% | 3.41 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |
| fcf | 5 | 18.34% | 15.02% | 3.32 | Material growth gap (at least 2 percentage points): the observed diluted share-count change altered shareholder growth. Acquisitions, SBC and other issuance may all contribute. |

### Per-share forecast: illustrative-growth

No sourced diluted-share forecast. Per-share forecasts cannot be responsibly filled with a silent constant-share assumption.

### Per-share forecast: illustrative-garp

No sourced diluted-share forecast. Per-share forecasts cannot be responsibly filled with a silent constant-share assumption.

### Per-share forecast: illustrative-quality

No sourced diluted-share forecast. Per-share forecasts cannot be responsibly filled with a silent constant-share assumption.

### Per-share forecast: operating-central

Illustrative shareholder diagnostic: last annual diluted average shares are used as a starting proxy, not observed TTM diluted shares. Assume 1.5% annual net dilution, 8% SBC/revenue and $2.45B annual repurchases. These are not guidance. No FCF or EPS bridge is supplied because a reliable future interest/nonoperating bridge is unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-08-02 | $31.83 | Not available | $7.79 | Not available | $2.55 | 4,925,795,000 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2028-08-02 | $44.85 | Not available | $11.85 | Not available | $3.59 | 4,999,681,925 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2029-08-02 | $56.57 | Not available | $15.66 | Not available | $4.53 | 5,074,677,154 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2030-08-02 | $65.26 | Not available | $18.87 | Not available | $5.22 | 5,150,797,311 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2031-08-02 | $72.78 | Not available | $21.38 | Not available | $5.82 | 5,228,059,271 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2032-08-02 | $78.19 | Not available | $23.41 | Not available | $6.26 | 5,306,480,160 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2033-08-02 | $82.66 | Not available | $24.94 | Not available | $6.61 | 5,386,077,362 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2034-08-02 | $85.94 | Not available | $26.14 | Not available | $6.88 | 5,466,868,523 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2035-08-02 | $88.65 | Not available | $27.07 | Not available | $7.09 | 5,548,871,551 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2036-08-02 | $90.7 | Not available | $27.82 | Not available | $7.26 | 5,632,104,624 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-08-02 | 2030-08-02 | 28.95% | 27.05% |
| fcf | 3 | 2027-08-02 | 2030-08-02 | Not available | Not available |
| revenue | 5 | 2027-08-02 | 2032-08-02 | 21.49% | 19.69% |
| fcf | 5 | 2027-08-02 | 2032-08-02 | Not available | Not available |

### Per-share forecast: ai-slowdown

Illustrative shareholder diagnostic: last annual diluted average shares are used as a starting proxy, not observed TTM diluted shares. Assume 1.5% annual net dilution, 8% SBC/revenue and $2.45B annual repurchases. These are not guidance. No FCF or EPS bridge is supplied because a reliable future interest/nonoperating bridge is unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-08-02 | $25.8 | Not available | $6.05 | Not available | $2.06 | 4,925,795,000 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2028-08-02 | $30.01 | Not available | $7.71 | Not available | $2.4 | 4,999,681,925 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2029-08-02 | $32.13 | Not available | $8.65 | Not available | $2.57 | 5,074,677,154 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2030-08-02 | $33.32 | Not available | $9.15 | Not available | $2.67 | 5,150,797,311 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2031-08-02 | $34.26 | Not available | $9.47 | Not available | $2.74 | 5,228,059,271 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2032-08-02 | $34.94 | Not available | $9.72 | Not available | $2.79 | 5,306,480,160 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2033-08-02 | $35.54 | Not available | $9.9 | Not available | $2.84 | 5,386,077,362 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2034-08-02 | $36.06 | Not available | $10.05 | Not available | $2.89 | 5,466,868,523 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2035-08-02 | $36.6 | Not available | $10.2 | Not available | $2.93 | 5,548,871,551 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2036-08-02 | $37.14 | Not available | $10.35 | Not available | $2.97 | 5,632,104,624 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-08-02 | 2030-08-02 | 10.53% | 8.89% |
| fcf | 3 | 2027-08-02 | 2030-08-02 | Not available | Not available |
| revenue | 5 | 2027-08-02 | 2032-08-02 | 7.84% | 6.25% |
| fcf | 5 | 2027-08-02 | 2032-08-02 | Not available | Not available |

### Per-share forecast: ai-execution-upside

Illustrative shareholder diagnostic: last annual diluted average shares are used as a starting proxy, not observed TTM diluted shares. Assume 1.5% annual net dilution, 8% SBC/revenue and $2.45B annual repurchases. These are not guidance. No FCF or EPS bridge is supplied because a reliable future interest/nonoperating bridge is unavailable.

EPS below is an adjusted model proxy, not GAAP guidance.

| Period end | Revenue/share | FCF/share | FCFF/share | EPS | SBC/share | Diluted average shares | Share growth | SBC/revenue | Repurchases USD | Net dilution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2027-08-02 | $34.41 | Not available | $8.87 | Not available | $2.75 | 4,925,795,000 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2028-08-02 | $58.42 | Not available | $15.52 | Not available | $4.67 | 4,999,681,925 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2029-08-02 | $76.95 | Not available | $22.71 | Not available | $6.16 | 5,074,677,154 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2030-08-02 | $92.59 | Not available | $28.47 | Not available | $7.41 | 5,150,797,311 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2031-08-02 | $107.72 | Not available | $33.64 | Not available | $8.62 | 5,228,059,271 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2032-08-02 | $120.75 | Not available | $38.38 | Not available | $9.66 | 5,306,480,160 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2033-08-02 | $130.08 | Not available | $42.16 | Not available | $10.41 | 5,386,077,362 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2034-08-02 | $137.77 | Not available | $45.02 | Not available | $11.02 | 5,466,868,523 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2035-08-02 | $143.49 | Not available | $47.29 | Not available | $11.48 | 5,548,871,551 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |
| 2036-08-02 | $146.89 | Not available | $48.84 | Not available | $11.75 | 5,632,104,624 | 1.50% | 8.00% | $2,450,000,000 | 1.50% |

| Forecast measure | Years | Start | End | Company CAGR | Per-share CAGR |
| --- | --- | --- | --- | --- | --- |
| revenue | 3 | 2027-08-02 | 2030-08-02 | 41.18% | 39.09% |
| fcf | 3 | 2027-08-02 | 2030-08-02 | Not available | Not available |
| revenue | 5 | 2027-08-02 | 2032-08-02 | 30.47% | 28.54% |
| fcf | 5 | 2027-08-02 | 2032-08-02 | Not available | Not available |

All formulas, dated source inputs and reported/estimated bases are retained in per-share-economics.json and per-share-metrics.csv. Repurchase spending does not prove dilution was offset.

## Business classification and central valuation

AI-led semiconductor growth with a recurring infrastructure-software cash-flow business. Quality-growth analysis with GARP price discipline; quality constrained by customer concentration and acquisition accounting.

An explicit AI/non-AI/software FCFF model represents the changing mix better than the historical-average policy screen. Selection follows business economics, not whichever style label gives the highest value. Central assumptions remain provisional because long-run AI margins and cash taxes are not independently established.

**Central conditional estimate: about $320; confidence Low** (provisional_estimate). Method: Explicit segment FCFF DCF. Business profile determines model suitability. Investment lens does not set growth or margins. Valuation is conditional on the explicit operating forecast; the policy result is a separate investment screen. GARP is a price discipline, not an intrinsic company category.

- AI growth and near-term guidance require a distinct AI operating forecast. [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)
- Software profitability and rising end-customer concentration require separate treatment of margins and execution risk. [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/)

## What Must Be True?

For each assumed segment operating margin, solve a common constant revenue growth rate that reprices the entire DCF to the supplied price. This consolidated hurdle holds the starting segment revenue mix fixed; it is not the AI-led central forecast. Capital intensity, working capital, corporate costs, discount rate and terminal reinvestment are held to the referenced model. Each row is a different conditional path; revenue, margin and FCFF cannot be solved independently from one price.

Milestones are rolling twelve-month periods ending on the base month/day, not fiscal-year forecasts. The terminal value starts only after the full forecast horizon; 2030 is not treated as a separate exit. All monetary amounts below are full-company USD billions; margins include SBC. Shares and net financial claims are held fixed. This is a conditional expectations test, not a prediction.

| Assumed margin | Required annual revenue growth | Milestone period | Required revenue | Operating margin | Required FCFF |
| --- | --- | --- | --- | --- | --- |
| 35.00% | 24.97% | 2030-08-02 | $217.31B | 35.00% | $52.34B |
| 35.00% | 24.97% | 2035-08-02 | $662.27B | 35.00% | $159.51B |
| 45.00% | 21.34% | 2030-08-02 | $193.18B | 45.00% | $62.42B |
| 45.00% | 21.34% | 2035-08-02 | $508.20B | 45.00% | $164.21B |
| 55.00% | 18.50% | 2030-08-02 | $175.71B | 55.00% | $71.13B |
| 55.00% | 18.50% | 2035-08-02 | $410.59B | 55.00% | $166.21B |

WACC 9.00%, tax estimate 21.00%, terminal growth 2.50%, terminal ROIC 15.00%. The solver recomputes investment needs as revenue grows. Higher reinvestment, dilution, or lower terminal returns would change these requirements.

## AI economics and execution risk

Q3 AI revenue was $16.70B, 56.44% of same-quarter consolidated revenue, growing 221.00% year over year. Management’s next-quarter AI guidance is $21.70B. These are supplemental AI measures, not a separate audited segment. [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)

Four reported quarters sum to $42.40B of TTM AI revenue; the inputs are rounded management figures. AI is subtracted from total semiconductors to avoid double counting. The forecast separates AI, non-AI chips and infrastructure software.

| Operating case | Value/share | Period | AI revenue | Total revenue | FCFF |
| --- | --- | --- | --- | --- | --- |
| operating-central | $318.73 | 2027-08-02 | $106.00B | $156.78B | $38.35B |
| operating-central | $318.73 | 2028-08-02 | $169.60B | $224.22B | $59.26B |
| operating-central | $318.73 | 2030-08-02 | $274.75B | $336.16B | $97.18B |
| operating-central | $318.73 | 2035-08-02 | $417.78B | $491.88B | $150.22B |
| ai-slowdown | $125.83 | 2027-08-02 | $76.32B | $127.10B | $29.79B |
| ai-slowdown | $125.83 | 2028-08-02 | $95.40B | $150.02B | $38.54B |
| ai-slowdown | $125.83 | 2030-08-02 | $110.19B | $171.60B | $47.15B |
| ai-slowdown | $125.83 | 2035-08-02 | $128.98B | $203.07B | $56.60B |
| ai-execution-upside | $541.44 | 2027-08-02 | $118.72B | $169.50B | $43.71B |
| ai-execution-upside | $541.44 | 2028-08-02 | $237.44B | $292.06B | $77.60B |
| ai-execution-upside | $541.44 | 2030-08-02 | $415.52B | $476.93B | $146.67B |
| ai-execution-upside | $541.44 | 2035-08-02 | $722.09B | $796.19B | $262.38B |

The slowdown case combines weaker AI demand with margin compression. That loss of operating value is not captured by simply labeling Broadcom a growth company. Models retain the same WACC and terminal assumptions so the differences can be traced to operations.

The latest quarter has 55.00% of total revenue tied to five end customers; one distributor accounts for 50.00%. These are different exposures and cannot be added. The exact AI-only customer distribution is not disclosed in the reviewed evidence. [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/)

## Compare required outcomes with external evidence

| Evidence | Available benchmark | Implication and limit |
| --- | --- | --- |
| Management guidance | $21.70B AI and $34.80B total revenue for FY2026 Q4; 66.00% non-GAAP operating margin | Supports rapid near-term growth. Non-GAAP margin is not our margin after SBC; quarterly guidance is not a decade forecast. [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| Analyst outlook | $120.00B AI in FY2027 and $240.00B in FY2028 discussed by Morningstar | The central AI case is below this aggressive ramp. One provider, not consensus; fiscal periods differ from our rolling periods. [Source](https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650) |
| Historical pace | Five-year consolidated revenue CAGR 21.74%; reported AI quarterly growth 221.00% | Consolidated history includes acquisitions. The required operating-path CAGR can be compared numerically, but a quarterly AI surge cannot establish sustained organic growth through 2035. |
| Potential market | AMD estimates more than $1000.00B of data-center silicon demand by 2030 | A competitor’s broad market estimate, not Broadcom’s serviceable market. Total company revenue includes software and must not be divided by this figure as market share. No independently supported 2035 market estimate is supplied. [Source](https://ir.amd.com/financial-information/sec-filings/content/0001193125-26-129106/0001193125-26-129106.pdf) |
| Competition and constraints | Custom silicon competes with general-purpose GPU ecosystems, rival ASIC design partners and customers internalizing more design work. Power, advanced packaging, customer financing and AI monetization constrain delivery. Market size does not establish achievable share or profit. | Execution needs both customer spending and delivery capacity. Customer internal design, GPU ecosystems, alternative ASIC partners and systems passthrough can reduce margins. |

One identifiable research provider, not a consensus dataset. No verified like-for-like 2030/2035 revenue, margin and FCFF analyst consensus was obtained. Verified release guidance covers the next quarter. Longer-term AI ambitions discussed by analysts are labeled secondary reports; no verified management 2030/2035 operating forecast is claimed. Consequently, no invented 2030/2035 consensus gap is displayed. The full required-outcome table is available for replacement with dated comparable estimates when obtained.

## Does capital allocation create value?

Mixed evidence: dividends and repurchases fit within annual FCF, but diluted shares still increased. VMware added a profitable software platform, while the cash-and-stock cost and debt exposure make standalone acquisition returns essential. Consolidated returns do not establish a deal IRR.

| Measure | Calculated result | Interpretation |
| --- | --- | --- |
| Dividends / annual FCF | 41.40% | Income distributions use cash that could otherwise fund debt reduction or reinvestment. |
| Repurchases / annual FCF | 9.10% | Spending on shares is not proof of value creation; compare execution price with value and net share-count change. |
| Total distributions / annual FCF | 50.50% | Coverage is positive; it does not establish that the allocation was optimal. |
| FCF after dividends and repurchases | $13.32B | Before acquisitions and debt repayments; not unrestricted excess cash. |
| VMware cash + stock consideration | $84.19B | Stock is a real shareholder cost. This is not enterprise purchase price; assumed notes and acquired cash must be reconciled separately. [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/) |

**Acquisition returns:** Consolidated incremental ROIC and software segment earnings do not isolate VMware standalone cash flows, integration costs, incremental capital or the counterfactual. No acquisition IRR is inferred from goodwill or segment growth. Software cash generation and consolidated normalized ROIC provide supportive evidence, while customer retention, integration costs and the price paid remain essential. Goodwill records purchase accounting; it is neither an independent economic asset valuation nor proof that management destroyed value.

**Dilution:** the fiscal-year increase in diluted shares despite repurchases weakens the capital-return claim. SBC expense and repurchase cash are different measurements; compare net shares and per-share cash growth, not their dollar difference alone.

**Judgment:** capital allocation is mixed, with demonstrated cash generation but incomplete acquisition-specific return evidence. A positive deal IRR or a precise repurchase return is not claimed.

## Research inputs and audit trail

| Input | Value (raw units) | Type | As of | Meaning | Source |
| --- | --- | --- | --- | --- | --- |
| ai_q4_2025 | 6500000000 | reported | 2025-12-11 | Management supplemental AI revenue, rounded; not a separate audited reporting segment. | [Source](https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/) |
| ai_q1_2026 | 8400000000 | reported | 2026-03-04 | Management supplemental AI revenue, rounded; not a separate audited reporting segment. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial) |
| ai_q2_2026 | 10800000000 | reported | 2026-06-03 | Management supplemental AI revenue, rounded; not a separate audited reporting segment. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial) |
| ai_q3_2026 | 16700000000 | reported | 2026-09-02 | Management supplemental AI revenue, rounded; not a separate audited reporting segment. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| total_q3_2026 | 29591000000 | reported | 2026-09-02 | Consolidated quarter revenue in full USD. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| ai_q3_growth | 2.21 | reported | 2026-09-02 | Year-over-year AI quarterly revenue growth, not a sustainable long-run CAGR. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| ai_q4_guidance | 21700000000 | management_guidance | 2026-09-02 | FY2026 Q4 AI revenue guidance; not 2030 guidance. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| total_q4_guidance | 34800000000 | management_guidance | 2026-09-02 | FY2026 Q4 consolidated revenue guidance. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| non_gaap_q4_margin_guidance | 0.66 | management_guidance | 2026-09-02 | Non-GAAP operating margin; not interchangeable with our margin including SBC. | [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) |
| analyst_ai_2027 | 120000000000 | analyst_estimate | 2026-09-29 | Single research provider discussion of FY2027 AI outlook; not consensus or independently verified management guidance. | [Source](https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650) |
| analyst_ai_2028 | 240000000000 | analyst_estimate | 2026-09-29 | Morningstar discussion of FY2028 AI outlook; analyst-reported management ambition, not independently verified here. | [Source](https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650) |
| analyst_anthropic_2027 | 60000000000 | analyst_estimate | 2026-09-29 | Customer revenue embedded in Morningstar model; uncertain future contribution, not booked revenue. | [Source](https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650) |
| market_2030 | 1000000000000 | market_estimate | 2026-10-11 | AMD estimates more than this amount for the broad data-center silicon market in 2030. This floor is not Broadcom-specific serviceable demand; networking/system scopes overlap imperfectly. As-of is the retrieval date for the annual-report letter, not an asserted publication date. | [Source](https://ir.amd.com/financial-information/sec-filings/content/0001193125-26-129106/0001193125-26-129106.pdf) |
| top_five_q3 | 0.55 | reported | 2026-09-10 | Approximate share of all-company quarterly revenue from top five end customers, not AI-only concentration. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/) |
| distributor_q3 | 0.5 | reported | 2026-09-10 | One distributor share of all-company quarterly revenue; channel exposure differs from end-customer concentration. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/) |
| top_five_ytd | 0.5 | reported | 2026-09-10 | Approximate top-five end-customer share of nine-month consolidated revenue. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/) |
| vmware_cash | 30788000000 | reported | 2025-12-18 | Cash consideration reported for the acquisition; not cash net of acquired balances. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/) |
| vmware_stock_fair_value | 53398000000 | reported | 2025-12-18 | Fair value of acquisition shares issued; economically material consideration. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/) |
| vmware_shares | 544000000 | reported | 2025-12-18 | Split-adjusted shares issued in the acquisition. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/) |
| vmware_assumed_notes | 8250000000 | reported | 2025-12-18 | Assumed notes; do not confuse cash plus stock with enterprise acquisition cost. | [Source](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/) |

| Calculation | Value (raw units) | Formula | Inputs |
| --- | --- | --- | --- |
| ai-quarter-revenue-share | 0.5643607853739313 | AI quarterly revenue / same-quarter consolidated revenue | {"ai":16700000000,"total":29591000000} |
| ai-ttm-revenue | 42400000000 | Sum of four successive AI quarterly revenues (management supplemental measure) | {"ai_q4_2025":6500000000,"ai_q1_2026":8400000000,"ai_q2_2026":10800000000,"ai_q3_2026":16700000000} |
| historical-revenue-cagr-5 | 0.21743712435641926 | Copy of calculated five-year consolidated revenue CAGR; includes acquisitions | {"cagr":0.21743712435641926} |
| dividends-to-fcf | 0.4139852864680092 | Reported cash dividends / annual FCF | {"dividends":11142000000,"fcf":26914000000} |
| repurchases-to-fcf | 0.09103069034703129 | Reported repurchases / annual FCF | {"repurchases":2450000000,"fcf":26914000000} |
| distributions-to-fcf | 0.5050159768150405 | (Dividends + repurchases) / annual FCF | {"dividends":11142000000,"repurchases":2450000000,"fcf":26914000000} |
| fcf-after-distributions | 13322000000 | FCF - dividends - repurchases; before debt repayments and acquisitions | {"dividends":11142000000,"repurchases":2450000000,"fcf":26914000000} |
| vmware-cash-and-stock-consideration | 84186000000 | Cash paid + fair value of shares issued; excludes assumed debt and acquired cash | {"cash":30788000000,"stock":53398000000} |

## Models side by side

| Model | Style | Status | Value/share | Price/value | Value gap / price | Margin of safety |
| --- | --- | --- | --- | --- | --- | --- |
| Conservative policy model | value | ok | $100.83 | 3.59× | -72.11% | -258.57% |
| illustrative-growth | growth | ok | $173.97 | 2.08× | -51.88% | -107.82% |
| illustrative-garp | garp | ok | $138.64 | 2.61× | -61.65% | -160.78% |
| illustrative-quality | quality | ok | $117.60 | 3.07× | -67.47% | -207.43% |
| operating-central | growth | ok | $318.73 | 1.13× | -11.84% | -13.43% |
| ai-slowdown | growth | ok | $125.83 | 2.87× | -65.19% | -187.31% |
| ai-execution-upside | growth | ok | $541.44 | 0.67× | 49.76% | 33.23% |

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
| Year-one FCFF: operating-central | forward; 2026-08-02 | $38,353,438,525.00 | Not available |
| Year-one FCFF: ai-slowdown | forward; 2026-08-02 | $29,790,334,525.00 | Not available |
| Year-one FCFF: ai-execution-upside | forward; 2026-08-02 | $43,707,710,525.00 | Not available |

Required growth depends on the selected cash-flow base, WACC, terminal growth, capital claims and forecast horizon. It is not a direct measure of what the market expects. Year-one forward FCFF is a forecast, not a historical starting point.

- **Historical three-year FCFF average (policy):** Legacy cash-flow FCFF averaged over available last three annual periods; not tax-normalized
- **Latest annual FCFF:** OCF + after-tax interest - CapEx - SBC (legacy cash-flow definition); uses documented adjustments when configured
- **ttm-fcff:** TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized
- **normalized-fcff-annual:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **normalized-fcff-ttm:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income
- **Year-one FCFF: illustrative-growth:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: illustrative-garp:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: illustrative-quality:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: operating-central:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: ai-slowdown:** Explicit year-one segment forecast, not a historical starting cash flow
- **Year-one FCFF: ai-execution-upside:** Explicit year-one segment forecast, not a historical starting cash flow

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

## Forward scenario: operating-central (growth)

**Reason:** Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance.

**Source / assumption basis:** https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $156,775,330,000.00 | $65,155,757,500.00 | $13,682,709,075.00 | $2,019,337,150.00 | $3,420,944,050.00 | $11,718,003,000.00 | $38,353,438,525.00 |
| 2 | $224,224,639,500.00 | $92,441,455,025.00 | $19,412,705,555.25 | $2,997,847,512.50 | $5,057,332,867.50 | $11,708,895,070.00 | $59,260,369,044.75 |
| 3 | $287,050,989,085.00 | $117,837,303,875.75 | $24,745,833,813.91 | $3,911,000,989.88 | $6,584,128,957.53 | $10,928,599,962.10 | $79,489,742,132.09 |
| 4 | $336,164,774,143.15 | $137,731,230,684.82 | $28,923,558,443.81 | $4,620,074,296.50 | $7,770,523,380.11 | $8,481,246,210.24 | $97,175,976,947.16 |
| 5 | $380,487,149,314.39 | $155,684,859,578.84 | $32,693,820,511.56 | $5,259,566,085.13 | $8,840,567,000.98 | $7,648,557,624.62 | $111,761,480,526.82 |
| 6 | $414,914,782,102.99 | $169,650,160,920.79 | $35,626,533,793.37 | $5,753,593,519.23 | $9,667,677,234.10 | $5,905,942,151.47 | $124,203,601,261.09 |
| 7 | $445,210,417,778.40 | $181,925,955,454.57 | $38,204,450,645.46 | $6,189,222,925.87 | $10,396,860,433.25 | $5,208,747,751.17 | $134,305,119,550.56 |
| 8 | $469,827,715,783.75 | $191,888,128,307.01 | $40,296,506,944.47 | $6,543,814,395.72 | $10,990,290,883.04 | $4,240,429,638.05 | $142,904,715,237.17 |
| 9 | $491,880,310,324.14 | $200,827,877,382.97 | $42,173,854,250.42 | $6,859,495,273.60 | $11,518,943,686.21 | $3,773,062,494.27 | $150,221,512,225.67 |
| 10 | $510,814,545,243.98 | $208,523,843,948.51 | $43,790,007,229.19 | $7,127,947,515.96 | $11,968,957,637.05 | $3,205,865,626.88 | $156,686,960,971.35 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 58.73%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "operating-central",
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
      "name": "AI semiconductors (custom accelerators and networking)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": 1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": 1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        1.5,
        0.6,
        0.35,
        0.2,
        0.15,
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
      "name": "Non-AI semiconductors",
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
          },
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": -1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03
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
        0.1,
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
  "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11",
  "reason": "Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance."
}
```

</details>

## Forward scenario: ai-slowdown (growth)

**Reason:** Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance.

**Source / assumption basis:** https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $127,095,330,000.00 | $47,178,157,500.00 | $9,907,413,075.00 | $1,574,137,150.00 | $2,678,944,050.00 | $6,375,603,000.00 | $29,790,334,525.00 |
| 2 | $150,024,639,500.00 | $55,129,455,025.00 | $11,577,185,555.25 | $1,884,847,512.50 | $3,202,332,867.50 | $3,695,295,070.00 | $38,539,489,044.75 |
| 3 | $163,030,989,085.00 | $59,834,103,875.75 | $12,565,161,813.91 | $2,050,700,989.88 | $3,483,628,957.53 | $1,960,999,962.10 | $43,875,014,132.09 |
| 4 | $171,599,774,143.15 | $63,090,270,684.82 | $13,248,956,843.81 | $2,151,599,296.50 | $3,656,398,380.11 | $1,183,146,210.24 | $47,153,368,547.16 |
| 5 | $179,116,829,314.39 | $65,969,173,178.84 | $13,853,526,367.56 | $2,239,011,285.13 | $3,806,309,000.98 | $1,023,600,024.62 | $49,524,749,070.82 |
| 6 | $185,385,816,502.99 | $68,395,989,528.79 | $14,363,157,801.05 | $2,310,659,035.23 | $3,929,453,094.10 | $837,385,943.47 | $51,576,651,725.41 |
| 7 | $191,417,519,210.40 | $70,682,933,320.81 | $14,843,415,997.37 | $2,382,329,447.35 | $4,052,037,969.05 | $841,239,816.93 | $53,328,568,984.81 |
| 8 | $197,160,044,786.71 | $72,803,421,320.44 | $15,288,718,477.29 | $2,453,799,330.77 | $4,173,599,108.12 | $842,970,600.82 | $54,951,932,464.97 |
| 9 | $203,074,846,130.31 | $74,987,523,960.05 | $15,747,380,031.61 | $2,527,413,310.69 | $4,298,807,081.36 | $868,259,718.85 | $56,600,490,438.92 |
| 10 | $209,167,091,514.22 | $77,237,149,678.85 | $16,219,801,432.56 | $2,603,235,710.01 | $4,427,771,293.80 | $894,307,510.41 | $58,298,505,152.09 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 53.24%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "ai-slowdown",
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
      "name": "AI semiconductors (custom accelerators and networking)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": 1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": 1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.8,
        0.25,
        0.1,
        0.05,
        0.04,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03
      ],
      "operating_margin": [
        0.32,
        0.32,
        0.32,
        0.32,
        0.32,
        0.32,
        0.32,
        0.32,
        0.32,
        0.32
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
      "name": "Non-AI semiconductors",
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
          },
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": -1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03
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
        0.1,
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
  "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11",
  "reason": "Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance."
}
```

</details>

## Forward scenario: ai-execution-upside (growth)

**Reason:** Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance.

**Source / assumption basis:** https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11

FCFF = EBIT - cash-tax estimate + depreciation - CapEx - change in operating working capital. SBC stays expensed in operating margins; no second deduction. Terminal reinvestment = next-year NOPAT × terminal growth / terminal ROIC.

| Year | Revenue | Operating profit | Tax estimate | D&A | CapEx | Δ working capital | FCFF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $169,495,330,000.00 | $74,992,557,500.00 | $15,748,437,075.00 | $2,210,137,150.00 | $3,738,944,050.00 | $14,007,603,000.00 | $43,707,710,525.00 |
| 2 | $292,064,639,500.00 | $129,075,055,025.00 | $27,105,761,555.25 | $4,015,447,512.50 | $6,753,332,867.50 | $21,630,495,070.00 | $77,600,913,044.75 |
| 3 | $390,506,989,085.00 | $172,516,343,875.75 | $36,228,432,213.91 | $5,462,840,989.88 | $9,170,528,957.53 | $17,339,479,962.10 | $115,240,743,732.09 |
| 4 | $476,932,774,143.15 | $210,659,230,684.82 | $44,238,438,443.81 | $6,731,594,296.50 | $11,289,723,380.11 | $15,197,406,210.24 | $146,665,256,947.16 |
| 5 | $563,146,349,314.39 | $248,693,499,578.84 | $52,225,634,911.56 | $7,999,454,085.13 | $13,407,047,000.98 | $15,188,973,624.62 | $175,871,298,126.82 |
| 6 | $640,771,102,102.99 | $282,929,392,920.79 | $59,415,172,513.37 | $9,141,438,319.23 | $15,314,085,234.10 | $13,681,423,751.47 | $203,660,149,741.09 |
| 7 | $700,603,595,378.40 | $309,313,600,894.57 | $64,955,856,187.86 | $10,020,120,589.87 | $16,781,689,873.25 | $10,525,382,119.17 | $227,070,793,304.16 |
| 8 | $753,159,671,239.75 | $332,469,714,841.41 | $69,818,640,116.70 | $10,793,793,727.56 | $18,073,589,769.44 | $9,269,409,652.13 | $246,101,869,030.71 |
| 9 | $796,191,064,640.94 | $351,435,911,722.81 | $73,801,541,461.79 | $11,424,156,588.35 | $19,126,712,544.13 | $7,549,246,289.21 | $262,382,568,016.03 |
| 10 | $827,297,729,733.45 | $365,156,199,661.94 | $76,682,801,929.01 | $11,875,195,283.30 | $19,881,037,249.28 | $5,396,903,057.96 | $275,070,652,708.99 |

Terminal reinvestment rate: 16.67%. Terminal value share of enterprise value: 61.12%.

<details><summary>All scenario assumptions and source components</summary>

```json
{
  "id": "ai-execution-upside",
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
      "name": "AI semiconductors (custom accelerators and networking)",
      "base_revenue": {
        "period_end": "2026-08-02",
        "components": [
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": 1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": 1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": 1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        1.8,
        1,
        0.4,
        0.25,
        0.2,
        0.15,
        0.1,
        0.08,
        0.06,
        0.04
      ],
      "operating_margin": [
        0.44,
        0.44,
        0.44,
        0.44,
        0.44,
        0.44,
        0.44,
        0.44,
        0.44,
        0.44
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
      "name": "Non-AI semiconductors",
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
          },
          {
            "item": "ai_q4_2025",
            "value": 6500000000,
            "period_end": "2025-11-02",
            "source": "https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/",
            "sign": -1
          },
          {
            "item": "ai_q1_2026",
            "value": 8400000000,
            "period_end": "2026-02-01",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q2_2026",
            "value": 10800000000,
            "period_end": "2026-05-03",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
            "sign": -1
          },
          {
            "item": "ai_q3_2026",
            "value": 16700000000,
            "period_end": "2026-08-02",
            "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
            "sign": -1
          }
        ]
      },
      "base_working_capital_ratio": 0.18,
      "growth": [
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03,
        0.03
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
        0.1,
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
  "source": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; https://global.morningstar.com/en-gb/stocks/why-broadcom-stock-is-worth-usd-650 ; analyst estimates dated 2026-10-11",
  "reason": "Analyst estimate: explicit AI adoption path with growth fading, non-AI semiconductors growing modestly and software compounding. Central AI growth is below the aggressive analyst-reported 2027/2028 outlook, reflecting delivery and concentration risk. Downside slows AI and compresses its margin; upside tests execution nearer that outlook. Margins include SBC and all allocated corporate costs, exclude acquisition amortization and include physical depreciation. No style premium or probability weighting. These are rolling TTM forecasts, not exact fiscal-year guidance."
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
| operating-central | 7% | -2% | 2% | $392.44 |
| operating-central | 7% | -2% | 2.5% | $411.72 |
| operating-central | 7% | -2% | 3% | $435.69 |
| operating-central | 7% | 0% | 2% | $452.98 |
| operating-central | 7% | 0% | 2.5% | $475.81 |
| operating-central | 7% | 0% | 3% | $504.21 |
| operating-central | 7% | 2% | 2% | $522.62 |
| operating-central | 7% | 2% | 2.5% | $549.58 |
| operating-central | 7% | 2% | 3% | $583.11 |
| operating-central | 9% | -2% | 2% | $271.89 |
| operating-central | 9% | -2% | 2.5% | $278.20 |
| operating-central | 9% | -2% | 3% | $285.49 |
| operating-central | 9% | 0% | 2% | $311.26 |
| operating-central | 9% | 0% | 2.5% | $318.73 |
| operating-central | 9% | 0% | 3% | $327.36 |
| operating-central | 9% | 2% | 2% | $356.36 |
| operating-central | 9% | 2% | 2.5% | $365.18 |
| operating-central | 9% | 2% | 3% | $375.38 |
| operating-central | 11% | -2% | 2% | $205.08 |
| operating-central | 11% | -2% | 2.5% | $207.41 |
| operating-central | 11% | -2% | 3% | $209.98 |
| operating-central | 11% | 0% | 2% | $233.06 |
| operating-central | 11% | 0% | 2.5% | $235.81 |
| operating-central | 11% | 0% | 3% | $238.86 |
| operating-central | 11% | 2% | 2% | $264.98 |
| operating-central | 11% | 2% | 2.5% | $268.23 |
| operating-central | 11% | 2% | 3% | $271.83 |
| ai-slowdown | 7% | -2% | 2% | $150.97 |
| ai-slowdown | 7% | -2% | 2.5% | $157.99 |
| ai-slowdown | 7% | -2% | 3% | $166.72 |
| ai-slowdown | 7% | 0% | 2% | $176.29 |
| ai-slowdown | 7% | 0% | 2.5% | $184.75 |
| ai-slowdown | 7% | 0% | 3% | $195.26 |
| ai-slowdown | 7% | 2% | 2% | $205.76 |
| ai-slowdown | 7% | 2% | 2.5% | $215.92 |
| ai-slowdown | 7% | 2% | 3% | $228.55 |
| ai-slowdown | 9% | -2% | 2% | $106.40 |
| ai-slowdown | 9% | -2% | 2.5% | $108.70 |
| ai-slowdown | 9% | -2% | 3% | $111.35 |
| ai-slowdown | 9% | 0% | 2% | $123.07 |
| ai-slowdown | 9% | 0% | 2.5% | $125.83 |
| ai-slowdown | 9% | 0% | 3% | $129.03 |
| ai-slowdown | 9% | 2% | 2% | $142.37 |
| ai-slowdown | 9% | 2% | 2.5% | $145.69 |
| ai-slowdown | 9% | 2% | 3% | $149.53 |
| ai-slowdown | 11% | -2% | 2% | $81.45 |
| ai-slowdown | 11% | -2% | 2.5% | $82.29 |
| ai-slowdown | 11% | -2% | 3% | $83.23 |
| ai-slowdown | 11% | 0% | 2% | $93.44 |
| ai-slowdown | 11% | 0% | 2.5% | $94.46 |
| ai-slowdown | 11% | 0% | 3% | $95.59 |
| ai-slowdown | 11% | 2% | 2% | $107.26 |
| ai-slowdown | 11% | 2% | 2.5% | $108.48 |
| ai-slowdown | 11% | 2% | 3% | $109.84 |
| ai-execution-upside | 7% | -2% | 2% | $675.17 |
| ai-execution-upside | 7% | -2% | 2.5% | $709.21 |
| ai-execution-upside | 7% | -2% | 3% | $751.55 |
| ai-execution-upside | 7% | 0% | 2% | $775.12 |
| ai-execution-upside | 7% | 0% | 2.5% | $815.10 |
| ai-execution-upside | 7% | 0% | 3% | $864.82 |
| ai-execution-upside | 7% | 2% | 2% | $889.37 |
| ai-execution-upside | 7% | 2% | 2.5% | $936.20 |
| ai-execution-upside | 7% | 2% | 3% | $994.45 |
| ai-execution-upside | 9% | -2% | 2% | $463.70 |
| ai-execution-upside | 9% | -2% | 2.5% | $474.84 |
| ai-execution-upside | 9% | -2% | 3% | $487.71 |
| ai-execution-upside | 9% | 0% | 2% | $528.35 |
| ai-execution-upside | 9% | 0% | 2.5% | $541.44 |
| ai-execution-upside | 9% | 0% | 3% | $556.56 |
| ai-execution-upside | 9% | 2% | 2% | $601.99 |
| ai-execution-upside | 9% | 2% | 2.5% | $617.32 |
| ai-execution-upside | 9% | 2% | 3% | $635.03 |
| ai-execution-upside | 11% | -2% | 2% | $346.98 |
| ai-execution-upside | 11% | -2% | 2.5% | $351.09 |
| ai-execution-upside | 11% | -2% | 3% | $355.64 |
| ai-execution-upside | 11% | 0% | 2% | $392.69 |
| ai-execution-upside | 11% | 0% | 2.5% | $397.52 |
| ai-execution-upside | 11% | 0% | 3% | $402.86 |
| ai-execution-upside | 11% | 2% | 2% | $444.56 |
| ai-execution-upside | 11% | 2% | 2.5% | $450.21 |
| ai-execution-upside | 11% | 2% | 3% | $456.47 |

</details>

## Limits

- Investment styles label documented scenarios; they do not change the conservative policy verdict.
- Forward margins must include stock compensation and all unallocated corporate costs.
- Normalization is an estimate and remains separate from reported and adjusted metrics.
- Missing D&A is not treated as zero. Missing TTM comparison periods prevent a trailing value.
- A forecast requires segment bases that reconcile to consolidated revenue. Segment names must not overlap (for example, AI cannot be added to semiconductor revenue that already includes AI).
- Forecast losses do not create an assumed tax refund. Terminal growth requires continued reinvestment.
