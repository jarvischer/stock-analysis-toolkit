# AVGO — every calculated metric

[Data index](README.md) · [Exact values CSV](metrics.csv) · [All calculation inputs CSV](calculation-inputs.csv)

Amounts use full USD, not millions. Rates are displayed as percentages here; CSV rates are decimal fractions. Each input has its own date. Model period labels alone do not describe the dates of all valuation inputs.

## revenue-growth — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

**Missing:** previous_revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## gross-margin — 2016-10-30

**Result:** 44.86% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2016-10-30 | 5940000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## operating-margin — 2016-10-30

**Result:** -3.09% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2016-10-30 | -409000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## net-margin — 2016-10-30

**Result:** -13.13% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2016-10-30 | -1739000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcf — 2016-10-30

**Result:** $2,688,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2016-10-30 | 3411000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| capex | 2016-10-30 | 723000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcf-margin — 2016-10-30

**Result:** 20.30% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2016-10-30 | 3411000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| capex | 2016-10-30 | 723000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcff — 2016-10-30

**Result:** $2,471,150,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2016-10-30 | 3411000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| capex | 2016-10-30 | 723000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| interest_expense | 2016-10-30 | 585000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| tax_rate | 2016-10-30 | 0.21 | ratio (decimal) | US federal rate; no usable effective rate; Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2016-10-30 | 679000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcfe — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

**Missing:** change_in_owc

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2016-10-30 | -1739000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2016-10-30 | 3042000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| capex | 2016-10-30 | 723000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| debt_issued | 2016-10-30 | 19510000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| debt_repaid | 2016-10-30 | 11317000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## owner-earnings — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

**Missing:** change_in_owc

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2016-10-30 | -1739000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2016-10-30 | 3042000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## earnings-quality — 2016-10-30

**Result:** Not available · **Status:** not_meaningful · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2016-10-30 | 3411000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| net_income | 2016-10-30 | -1739000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## ebitda — 2016-10-30

**Result:** $2,633,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2016-10-30 | -409000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2016-10-30 | 3042000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## nopat — 2016-10-30

**Result:** $-323,110,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2016-10-30 | -409000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| tax_rate | 2016-10-30 | 0.21 | ratio (decimal) | US federal rate; no usable effective rate; Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

**Missing:** debt

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2016-10-30 | 21876000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| cash_sti | 2016-10-30 | 3097000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## roic — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

**Missing:** average_invested_capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2016-10-30 | -409000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| tax_rate | 2016-10-30 | 0.21 | ratio (decimal) | US federal rate; no usable effective rate; Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** net-debt

**Formula:** Debt − Cash

**Missing:** debt

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| cash_sti | 2016-10-30 | 3097000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## debt-ebitda — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

**Missing:** debt

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ebitda | 2016-10-30 | 2633000000 | USD | Derived: ebitda @ 2016-10-30; see Calculations and Calc inputs. |

## interest-coverage — 2016-10-30

**Result:** -0.70x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2016-10-30 | -409000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| interest_expense | 2016-10-30 | 585000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## current-ratio — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

**Missing:** current_assets, current_liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## tangible-book-value — 2016-10-30

**Result:** $-2,856,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2016-10-30 | 21876000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| preferred | 2016-10-30 | 0 | USD | Assumed zero; <br>Transformed calculation input: differs from the raw filing value; see formula and flags. |
| goodwill | 2016-10-30 | 24732000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| intangibles | 2016-10-30 | 0 | USD | Assumed zero; <br>Transformed calculation input: differs from the raw filing value; see formula and flags. |

## ncav — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

**Missing:** current_assets, total_liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| preferred | 2016-10-30 | 0 | USD | Assumed zero; <br>Transformed calculation input: differs from the raw filing value; see formula and flags. |

## dilution — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

**Missing:** previous_shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2016-10-30 | 3830000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## sbc-to-revenue — 2016-10-30

**Result:** 5.13% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2016-10-30 | 679000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## eps — 2016-10-30

**Result:** $-0.49 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2016-10-30 | -0.48600000000000004 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## debt-due-3y — 2016-10-30

**Result:** Not available · **Status:** not_available · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

**Missing:** maturity_y1, maturity_y2, maturity_y3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## revenue-growth — 2017-10-29

**Result:** 33.20% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| previous_revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## gross-margin — 2017-10-29

**Result:** 48.25% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2017-10-29 | 8509000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## operating-margin — 2017-10-29

**Result:** 13.44% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2017-10-29 | 2371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## net-margin — 2017-10-29

**Result:** 9.59% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2017-10-29 | 1692000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcf — 2017-10-29

**Result:** $5,482,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2017-10-29 | 6551000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2017-10-29 | 1069000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## fcf-margin — 2017-10-29

**Result:** 31.08% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2017-10-29 | 6551000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2017-10-29 | 1069000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcff — 2017-10-29

**Result:** $5,006,293,150.68 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2017-10-29 | 6551000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2017-10-29 | 1069000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| interest_expense | 2017-10-29 | 454000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| tax_rate | 2017-10-29 | 0.019178082191780823 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2017-10-29 | 921000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## fcfe — 2017-10-29

**Result:** Not available · **Status:** not_available · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

**Missing:** change_in_owc

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2017-10-29 | 1692000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2017-10-29 | 4737000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2017-10-29 | 1069000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| debt_issued | 2017-10-29 | 17426000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| debt_repaid | 2017-10-29 | 13668000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## owner-earnings — 2017-10-29

**Result:** Not available · **Status:** not_available · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

**Missing:** change_in_owc

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2017-10-29 | 1692000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2017-10-29 | 4737000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## earnings-quality — 2017-10-29

**Result:** 3.87x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2017-10-29 | 6551000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| net_income | 2017-10-29 | 1692000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## ebitda — 2017-10-29

**Result:** $7,108,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2017-10-29 | 2371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| d_and_a | 2017-10-29 | 4737000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## nopat — 2017-10-29

**Result:** $2,325,528,767.12 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2017-10-29 | 2371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| tax_rate | 2017-10-29 | 0.019178082191780823 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2017-10-29

**Result:** $26,629,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2017-10-29 | 20285000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| debt | 2017-10-29 | 17548000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2017-10-29 | 11204000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## roic — 2017-10-29

**Result:** 8.73% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2017-10-29 | 2371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| tax_rate | 2017-10-29 | 0.019178082191780823 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2017-10-29 | 26629000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2017-10-29

**Result:** $6,344,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2017-10-29 | 17548000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2017-10-29 | 11204000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## debt-ebitda — 2017-10-29

**Result:** 2.47x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2017-10-29 | 17548000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2017-10-29 | 7108000000 | USD | Derived: ebitda @ 2017-10-29; see Calculations and Calc inputs. |

## interest-coverage — 2017-10-29

**Result:** 5.22x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2017-10-29 | 2371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| interest_expense | 2017-10-29 | 454000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## current-ratio — 2017-10-29

**Result:** 6.26x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2017-10-29 | 15823000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| current_liabilities | 2017-10-29 | 2529000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## tangible-book-value — 2017-10-29

**Result:** $-15,253,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2017-10-29 | 20285000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| preferred | 2017-10-29 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| goodwill | 2017-10-29 | 24706000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| intangibles | 2017-10-29 | 10832000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## ncav — 2017-10-29

**Result:** $-15,409,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2017-10-29 | 15823000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| total_liabilities | 2017-10-29 | 31232000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| preferred | 2017-10-29 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## dilution — 2017-10-29

**Result:** 9.92% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2017-10-29 | 4210000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| previous_shares | 2016-10-30 | 3830000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## sbc-to-revenue — 2017-10-29

**Result:** 5.22% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2017-10-29 | 921000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## eps — 2017-10-29

**Result:** $0.40 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2017-10-29 | 0.40199999999999997 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## debt-due-3y — 2017-10-29

**Result:** Not available · **Status:** not_available · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

**Missing:** maturity_y1, maturity_y2, maturity_y3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## revenue-growth — 2018-11-04

**Result:** 15.98% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1 (annualized: 53-week year scaled to 364 days)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2018-11-04 | 20454641509.433964 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html<br>Transformed calculation input: differs from the raw filing value; see formula and flags. |
| previous_revenue | 2017-10-29 | 17636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## gross-margin — 2018-11-04

**Result:** 51.48% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2018-11-04 | 10733000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| revenue | 2018-11-04 | 20848000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## operating-margin — 2018-11-04

**Result:** 24.63% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2018-11-04 | 5135000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| revenue | 2018-11-04 | 20848000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## net-margin — 2018-11-04

**Result:** 58.80% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2018-11-04 | 12259000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| revenue | 2018-11-04 | 20848000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcf — 2018-11-04

**Result:** $8,245,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2018-11-04 | 8880000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| capex | 2018-11-04 | 635000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## fcf-margin — 2018-11-04

**Result:** 39.55% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2018-11-04 | 8880000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| capex | 2018-11-04 | 635000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| revenue | 2018-11-04 | 20848000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## fcff — 2018-11-04

**Result:** $7,646,000,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2018-11-04 | 8880000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| capex | 2018-11-04 | 635000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| interest_expense | 2018-11-04 | 628000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| tax_rate | 2018-11-04 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2018-11-04 | 1227000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## fcfe — 2018-11-04

**Result:** $13,884,000,000 · **Status:** ok · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2018-11-04 | 12259000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2018-11-04 | 4081000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2018-11-04 | 635000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| change_in_owc | 2018-11-04 | 848000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2018-11-04 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| debt_repaid | 2018-11-04 | 973000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## owner-earnings — 2018-11-04

**Result:** $11,411,000,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2018-11-04 | 12259000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| d_and_a | 2018-11-04 | 4081000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| change_in_owc | 2018-11-04 | 848000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2018-11-04

**Result:** 0.72x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2018-11-04 | 8880000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| net_income | 2018-11-04 | 12259000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## ebitda — 2018-11-04

**Result:** $9,216,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2018-11-04 | 5135000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| d_and_a | 2018-11-04 | 4081000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## nopat — 2018-11-04

**Result:** $5,135,000,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2018-11-04 | 5135000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| tax_rate | 2018-11-04 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2018-11-04

**Result:** $39,858,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2018-11-04 | 26657000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| debt | 2018-11-04 | 17493000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2018-11-04 | 4292000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## roic — 2018-11-04

**Result:** 15.45% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2018-11-04 | 5135000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| tax_rate | 2018-11-04 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2018-11-04 | 33243500000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2018-11-04

**Result:** $13,201,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2018-11-04 | 17493000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2018-11-04 | 4292000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## debt-ebitda — 2018-11-04

**Result:** 1.90x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2018-11-04 | 17493000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2018-11-04 | 9216000000 | USD | Derived: ebitda @ 2018-11-04; see Calculations and Calc inputs. |

## interest-coverage — 2018-11-04

**Result:** 8.18x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2018-11-04 | 5135000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| interest_expense | 2018-11-04 | 628000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## current-ratio — 2018-11-04

**Result:** 3.90x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2018-11-04 | 9107000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| current_liabilities | 2018-11-04 | 2338000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## tangible-book-value — 2018-11-04

**Result:** $-11,018,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2018-11-04 | 26657000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| preferred | 2018-11-04 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| goodwill | 2018-11-04 | 26913000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| intangibles | 2018-11-04 | 10762000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## ncav — 2018-11-04

**Result:** $-14,360,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2018-11-04 | 9107000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| total_liabilities | 2018-11-04 | 23467000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| preferred | 2018-11-04 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## dilution — 2018-11-04

**Result:** 2.38% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2018-11-04 | 4310000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| previous_shares | 2017-10-29 | 4210000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## sbc-to-revenue — 2018-11-04

**Result:** 5.89% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2018-11-04 | 1227000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| revenue | 2018-11-04 | 20848000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## eps — 2018-11-04

**Result:** $2.84 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2018-11-04 | 2.8440000000000003 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## debt-due-3y — 2018-11-04

**Result:** $3,537,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2018-11-04 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| maturity_y2 | 2018-11-04 | 2787000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |
| maturity_y3 | 2018-11-04 | 750000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## revenue-growth — 2019-11-03

**Result:** 10.47% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1 (annualized: 53-week year scaled to 364 days)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| previous_revenue | 2018-11-04 | 20454641509.433964 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html<br>Transformed calculation input: differs from the raw filing value; see formula and flags. |

## gross-margin — 2019-11-03

**Result:** 55.24% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2019-11-03 | 12483000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## operating-margin — 2019-11-03

**Result:** 15.24% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2019-11-03 | 3444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## net-margin — 2019-11-03

**Result:** 12.05% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2019-11-03 | 2724000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## fcf — 2019-11-03

**Result:** $9,265,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2019-11-03 | 9697000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| capex | 2019-11-03 | 432000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## fcf-margin — 2019-11-03

**Result:** 41.00% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2019-11-03 | 9697000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| capex | 2019-11-03 | 432000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## fcff — 2019-11-03

**Result:** $8,524,000,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2019-11-03 | 9697000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| capex | 2019-11-03 | 432000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| interest_expense | 2019-11-03 | 1444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| tax_rate | 2019-11-03 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2019-11-03 | 2185000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## fcfe — 2019-11-03

**Result:** $20,453,000,000 · **Status:** ok · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2019-11-03 | 2724000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| d_and_a | 2019-11-03 | 5808000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| capex | 2019-11-03 | 432000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| change_in_owc | 2019-11-03 | -360000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2019-11-03 | 28793000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| debt_repaid | 2019-11-03 | 16800000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## owner-earnings — 2019-11-03

**Result:** $3,084,000,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2019-11-03 | 2724000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| d_and_a | 2019-11-03 | 5808000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| change_in_owc | 2019-11-03 | -360000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2019-11-03

**Result:** 3.56x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2019-11-03 | 9697000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| net_income | 2019-11-03 | 2724000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## ebitda — 2019-11-03

**Result:** $9,252,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2019-11-03 | 3444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| d_and_a | 2019-11-03 | 5808000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## nopat — 2019-11-03

**Result:** $3,444,000,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2019-11-03 | 3444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| tax_rate | 2019-11-03 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2019-11-03

**Result:** $52,684,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2019-11-03 | 24941000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| debt | 2019-11-03 | 32798000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2019-11-03 | 5055000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## roic — 2019-11-03

**Result:** 7.44% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2019-11-03 | 3444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| tax_rate | 2019-11-03 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2019-11-03 | 46271000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2019-11-03

**Result:** $27,743,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2019-11-03 | 32798000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2019-11-03 | 5055000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## debt-ebitda — 2019-11-03

**Result:** 3.54x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2019-11-03 | 32798000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2019-11-03 | 9252000000 | USD | Derived: ebitda @ 2019-11-03; see Calculations and Calc inputs. |

## interest-coverage — 2019-11-03

**Result:** 2.39x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2019-11-03 | 3444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| interest_expense | 2019-11-03 | 1444000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## current-ratio — 2019-11-03

**Result:** 1.44x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2019-11-03 | 9917000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| current_liabilities | 2019-11-03 | 6899000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## tangible-book-value — 2019-11-03

**Result:** $-29,327,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2019-11-03 | 24941000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| preferred | 2019-11-03 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| goodwill | 2019-11-03 | 36714000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| intangibles | 2019-11-03 | 17554000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## ncav — 2019-11-03

**Result:** $-32,606,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2019-11-03 | 9917000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| total_liabilities | 2019-11-03 | 42523000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| preferred | 2019-11-03 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## dilution — 2019-11-03

**Result:** -2.78% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2019-11-03 | 4190000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| previous_shares | 2018-11-04 | 4310000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## sbc-to-revenue — 2019-11-03

**Result:** 9.67% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2019-11-03 | 2185000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## eps — 2019-11-03

**Result:** $0.64 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2019-11-03 | 0.643 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## debt-due-3y — 2019-11-03

**Result:** $12,796,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2019-11-03 | 4537000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| maturity_y2 | 2019-11-03 | 2750000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |
| maturity_y3 | 2019-11-03 | 5509000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016819000144/0001730168-19-000144-index.html |

## revenue-growth — 2020-11-01

**Result:** 5.71% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| previous_revenue | 2019-11-03 | 22597000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## gross-margin — 2020-11-01

**Result:** 56.58% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2020-11-01 | 13516000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## operating-margin — 2020-11-01

**Result:** 16.80% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2020-11-01 | 4014000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## net-margin — 2020-11-01

**Result:** 12.39% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2020-11-01 | 2960000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## fcf — 2020-11-01

**Result:** $11,598,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2020-11-01 | 12061000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| capex | 2020-11-01 | 463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## fcf-margin — 2020-11-01

**Result:** 48.55% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2020-11-01 | 12061000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| capex | 2020-11-01 | 463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## fcff — 2020-11-01

**Result:** $11,399,000,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2020-11-01 | 12061000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| capex | 2020-11-01 | 463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| interest_expense | 2020-11-01 | 1777000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| tax_rate | 2020-11-01 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2020-11-01 | 1976000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## fcfe — 2020-11-01

**Result:** Not available · **Status:** not_available · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2020-11-01 | 2960000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| capex | 2020-11-01 | 463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| change_in_owc | 2020-11-01 | -814000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2020-11-01 | 27802000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| debt_repaid | 2020-11-01 | 18814000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## owner-earnings — 2020-11-01

**Result:** Not available · **Status:** not_available · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2020-11-01 | 2960000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| change_in_owc | 2020-11-01 | -814000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2020-11-01

**Result:** 4.07x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2020-11-01 | 12061000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| net_income | 2020-11-01 | 2960000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## ebitda — 2020-11-01

**Result:** Not available · **Status:** not_available · **Card:** ebitda

**Formula:** Operating income + D&A

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2020-11-01 | 4014000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## nopat — 2020-11-01

**Result:** $4,014,000,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2020-11-01 | 4014000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| tax_rate | 2020-11-01 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2020-11-01

**Result:** $57,318,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2020-11-01 | 23874000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| debt | 2020-11-01 | 41062000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2020-11-01 | 7618000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## roic — 2020-11-01

**Result:** 7.30% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2020-11-01 | 4014000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| tax_rate | 2020-11-01 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2020-11-01 | 55001000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2020-11-01

**Result:** $33,444,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2020-11-01 | 41062000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2020-11-01 | 7618000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## debt-ebitda — 2020-11-01

**Result:** Not available · **Status:** not_available · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

**Missing:** ebitda

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2020-11-01 | 41062000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## interest-coverage — 2020-11-01

**Result:** 2.26x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2020-11-01 | 4014000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| interest_expense | 2020-11-01 | 1777000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## current-ratio — 2020-11-01

**Result:** 1.87x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2020-11-01 | 11895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| current_liabilities | 2020-11-01 | 6371000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## tangible-book-value — 2020-11-01

**Result:** $-36,355,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2020-11-01 | 23874000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| preferred | 2020-11-01 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| goodwill | 2020-11-01 | 43447000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| intangibles | 2020-11-01 | 16782000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## ncav — 2020-11-01

**Result:** $-40,137,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2020-11-01 | 11895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| total_liabilities | 2020-11-01 | 52032000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| preferred | 2020-11-01 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## dilution — 2020-11-01

**Result:** 0.48% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2020-11-01 | 4210000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| previous_shares | 2019-11-03 | 4190000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## sbc-to-revenue — 2020-11-01

**Result:** 8.27% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2020-11-01 | 1976000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## eps — 2020-11-01

**Result:** $0.63 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2020-11-01 | 0.633 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## debt-due-3y — 2020-11-01

**Result:** Not available · **Status:** not_available · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

**Missing:** maturity_y1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y2 | 2020-11-01 | 1827000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |
| maturity_y3 | 2020-11-01 | 3069000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016820000226/0001730168-20-000226-index.html |

## revenue-growth — 2021-10-31

**Result:** 14.91% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| previous_revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## gross-margin — 2021-10-31

**Result:** 61.36% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2021-10-31 | 16844000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## operating-margin — 2021-10-31

**Result:** 31.03% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2021-10-31 | 8519000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## net-margin — 2021-10-31

**Result:** 24.54% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2021-10-31 | 6736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## fcf — 2021-10-31

**Result:** $13,321,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2021-10-31 | 13764000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| capex | 2021-10-31 | 443000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## fcf-margin — 2021-10-31

**Result:** 48.53% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2021-10-31 | 13764000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| capex | 2021-10-31 | 443000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## fcff — 2021-10-31

**Result:** $13,493,919,438.29 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2021-10-31 | 13764000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| capex | 2021-10-31 | 443000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| interest_expense | 2021-10-31 | 1885000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| tax_rate | 2021-10-31 | 0.004286770140428677 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2021-10-31 | 1704000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## fcfe — 2021-10-31

**Result:** Not available · **Status:** not_available · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2021-10-31 | 6736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| capex | 2021-10-31 | 443000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| change_in_owc | 2021-10-31 | -182000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2021-10-31 | 9904000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| debt_repaid | 2021-10-31 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## owner-earnings — 2021-10-31

**Result:** Not available · **Status:** not_available · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2021-10-31 | 6736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| change_in_owc | 2021-10-31 | -182000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2021-10-31

**Result:** 2.04x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2021-10-31 | 13764000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| net_income | 2021-10-31 | 6736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## ebitda — 2021-10-31

**Result:** Not available · **Status:** not_available · **Card:** ebitda

**Formula:** Operating income + D&A

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2021-10-31 | 8519000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## nopat — 2021-10-31

**Result:** $8,482,481,005.17 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2021-10-31 | 8519000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| tax_rate | 2021-10-31 | 0.004286770140428677 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2021-10-31

**Result:** $52,503,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2021-10-31 | 24962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| debt | 2021-10-31 | 39704000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2021-10-31 | 12163000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## roic — 2021-10-31

**Result:** 15.45% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2021-10-31 | 8519000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| tax_rate | 2021-10-31 | 0.004286770140428677 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2021-10-31 | 54910500000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2021-10-31

**Result:** $27,541,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2021-10-31 | 39704000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2021-10-31 | 12163000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## debt-ebitda — 2021-10-31

**Result:** Not available · **Status:** not_available · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

**Missing:** ebitda

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2021-10-31 | 39704000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## interest-coverage — 2021-10-31

**Result:** 4.52x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2021-10-31 | 8519000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| interest_expense | 2021-10-31 | 1885000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## current-ratio — 2021-10-31

**Result:** 2.64x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2021-10-31 | 16586000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| current_liabilities | 2021-10-31 | 6281000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## tangible-book-value — 2021-10-31

**Result:** $-29,862,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2021-10-31 | 24962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| preferred | 2021-10-31 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| goodwill | 2021-10-31 | 43450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| intangibles | 2021-10-31 | 11374000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## ncav — 2021-10-31

**Result:** $-33,995,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2021-10-31 | 16586000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| total_liabilities | 2021-10-31 | 50581000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| preferred | 2021-10-31 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## dilution — 2021-10-31

**Result:** 1.90% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2021-10-31 | 4290000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| previous_shares | 2020-11-01 | 4210000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## sbc-to-revenue — 2021-10-31

**Result:** 6.21% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2021-10-31 | 1704000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## eps — 2021-10-31

**Result:** $1.50 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2021-10-31 | 1.5 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## debt-due-3y — 2021-10-31

**Result:** $2,230,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2021-10-31 | 264000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| maturity_y2 | 2021-10-31 | 403000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |
| maturity_y3 | 2021-10-31 | 1563000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016821000153/0001730168-21-000153-index.html |

## revenue-growth — 2022-10-30

**Result:** 20.96% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| previous_revenue | 2021-10-31 | 27450000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## gross-margin — 2022-10-30

**Result:** 66.55% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2022-10-30 | 22095000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## operating-margin — 2022-10-30

**Result:** 42.84% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2022-10-30 | 14225000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## net-margin — 2022-10-30

**Result:** 34.62% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2022-10-30 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## fcf — 2022-10-30

**Result:** $16,312,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2022-10-30 | 16736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| capex | 2022-10-30 | 424000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## fcf-margin — 2022-10-30

**Result:** 49.13% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2022-10-30 | 16736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| capex | 2022-10-30 | 424000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## fcff — 2022-10-30

**Result:** $16,384,823,950.46 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2022-10-30 | 16736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| capex | 2022-10-30 | 424000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| interest_expense | 2022-10-30 | 1737000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| tax_rate | 2022-10-30 | 0.07551873894161171 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2022-10-30 | 1533000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## fcfe — 2022-10-30

**Result:** Not available · **Status:** not_available · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2022-10-30 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| capex | 2022-10-30 | 424000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| change_in_owc | 2022-10-30 | 1603000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2022-10-30 | 1935000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| debt_repaid | 2022-10-30 | 2361000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## owner-earnings — 2022-10-30

**Result:** Not available · **Status:** not_available · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2022-10-30 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| change_in_owc | 2022-10-30 | 1603000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2022-10-30

**Result:** 1.46x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2022-10-30 | 16736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| net_income | 2022-10-30 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## ebitda — 2022-10-30

**Result:** Not available · **Status:** not_available · **Card:** ebitda

**Formula:** Operating income + D&A

**Missing:** d_and_a

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2022-10-30 | 14225000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## nopat — 2022-10-30

**Result:** $13,150,745,938.56 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2022-10-30 | 14225000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| tax_rate | 2022-10-30 | 0.07551873894161171 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2022-10-30

**Result:** $49,771,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2022-10-30 | 22709000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt | 2022-10-30 | 39478000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2022-10-30 | 12416000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## roic — 2022-10-30

**Result:** 25.72% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2022-10-30 | 14225000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| tax_rate | 2022-10-30 | 0.07551873894161171 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2022-10-30 | 51137000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2022-10-30

**Result:** $27,062,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2022-10-30 | 39478000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2022-10-30 | 12416000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## debt-ebitda — 2022-10-30

**Result:** Not available · **Status:** not_available · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

**Missing:** ebitda

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2022-10-30 | 39478000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## interest-coverage — 2022-10-30

**Result:** 8.19x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2022-10-30 | 14225000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| interest_expense | 2022-10-30 | 1737000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## current-ratio — 2022-10-30

**Result:** 2.62x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2022-10-30 | 18504000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| current_liabilities | 2022-10-30 | 7052000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## tangible-book-value — 2022-10-30

**Result:** $-28,016,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2022-10-30 | 22709000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2022-10-30 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| goodwill | 2022-10-30 | 43614000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| intangibles | 2022-10-30 | 7111000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## ncav — 2022-10-30

**Result:** $-32,036,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2022-10-30 | 18504000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| total_liabilities | 2022-10-30 | 50540000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| preferred | 2022-10-30 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## dilution — 2022-10-30

**Result:** -1.35% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2022-10-30 | 4232000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| previous_shares | 2021-10-31 | 4290000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## sbc-to-revenue — 2022-10-30

**Result:** 4.62% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2022-10-30 | 1533000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## eps — 2022-10-30

**Result:** $2.65 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2022-10-30 | 2.65 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## debt-due-3y — 2022-10-30

**Result:** $2,461,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2022-10-30 | 403000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| maturity_y2 | 2022-10-30 | 1563000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |
| maturity_y3 | 2022-10-30 | 495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## revenue-growth — 2023-10-29

**Result:** 7.88% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| previous_revenue | 2022-10-30 | 33203000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## gross-margin — 2023-10-29

**Result:** 68.93% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2023-10-29 | 24690000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## operating-margin — 2023-10-29

**Result:** 45.25% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2023-10-29 | 16207000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## net-margin — 2023-10-29

**Result:** 39.31% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2023-10-29 | 14082000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf — 2023-10-29

**Result:** $17,633,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2023-10-29 | 18085000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2023-10-29 | 452000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf-margin — 2023-10-29

**Result:** 49.23% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2023-10-29 | 18085000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2023-10-29 | 452000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcff — 2023-10-29

**Result:** $16,974,949,857.59 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2023-10-29 | 18085000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2023-10-29 | 452000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2023-10-29 | 1622000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| tax_rate | 2023-10-29 | 0.06723190037755845 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2023-10-29 | 2171000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcfe — 2023-10-29

**Result:** $17,019,000,000 · **Status:** ok · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2023-10-29 | 14082000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| d_and_a | 2023-10-29 | 3749000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2023-10-29 | 452000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2023-10-29 | -43000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2023-10-29 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt_repaid | 2023-10-29 | 403000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## owner-earnings — 2023-10-29

**Result:** $14,125,000,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2023-10-29 | 14082000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| d_and_a | 2023-10-29 | 3749000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2023-10-29 | -43000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2023-10-29

**Result:** 1.28x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2023-10-29 | 18085000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| net_income | 2023-10-29 | 14082000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## ebitda — 2023-10-29

**Result:** $19,956,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2023-10-29 | 16207000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| d_and_a | 2023-10-29 | 3749000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## nopat — 2023-10-29

**Result:** $15,117,372,590.58 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2023-10-29 | 16207000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2023-10-29 | 0.06723190037755845 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2023-10-29

**Result:** $48,983,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2023-10-29 | 23988000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt | 2023-10-29 | 39184000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2023-10-29 | 14189000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## roic — 2023-10-29

**Result:** 30.62% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2023-10-29 | 16207000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2023-10-29 | 0.06723190037755845 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2023-10-29 | 49377000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2023-10-29

**Result:** $24,995,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2023-10-29 | 39184000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2023-10-29 | 14189000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## debt-ebitda — 2023-10-29

**Result:** 1.96x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2023-10-29 | 39184000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2023-10-29 | 19956000000 | USD | Derived: ebitda @ 2023-10-29; see Calculations and Calc inputs. |

## interest-coverage — 2023-10-29

**Result:** 9.99x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2023-10-29 | 16207000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2023-10-29 | 1622000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## current-ratio — 2023-10-29

**Result:** 2.82x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2023-10-29 | 20847000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| current_liabilities | 2023-10-29 | 7405000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## tangible-book-value — 2023-10-29

**Result:** $-23,532,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2023-10-29 | 23988000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2023-10-29 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| goodwill | 2023-10-29 | 43653000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| intangibles | 2023-10-29 | 3867000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## ncav — 2023-10-29

**Result:** $-28,026,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2023-10-29 | 20847000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| total_liabilities | 2023-10-29 | 48873000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| preferred | 2023-10-29 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## dilution — 2023-10-29

**Result:** 0.95% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2023-10-29 | 4272000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| previous_shares | 2022-10-30 | 4232000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## sbc-to-revenue — 2023-10-29

**Result:** 6.06% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2023-10-29 | 2171000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## eps — 2023-10-29

**Result:** $3.30 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2023-10-29 | 3.3 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## debt-due-3y — 2023-10-29

**Result:** $3,710,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2023-10-29 | 1563000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| maturity_y2 | 2023-10-29 | 495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| maturity_y3 | 2023-10-29 | 1652000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |

## revenue-growth — 2024-11-03

**Result:** 41.27% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1 (annualized: 53-week year scaled to 364 days)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2024-11-03 | 50600905660.37736 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>Transformed calculation input: differs from the raw filing value; see formula and flags. |
| previous_revenue | 2023-10-29 | 35819000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## gross-margin — 2024-11-03

**Result:** 63.03% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2024-11-03 | 32509000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2024-11-03 | 51574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## operating-margin — 2024-11-03

**Result:** 26.10% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2024-11-03 | 13463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2024-11-03 | 51574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## net-margin — 2024-11-03

**Result:** 11.43% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2024-11-03 | 5895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| revenue | 2024-11-03 | 51574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf — 2024-11-03

**Result:** $19,414,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2024-11-03 | 19962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2024-11-03 | 548000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf-margin — 2024-11-03

**Result:** 37.64% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2024-11-03 | 19962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2024-11-03 | 548000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2024-11-03 | 51574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcff — 2024-11-03

**Result:** $16,242,450,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2024-11-03 | 19962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2024-11-03 | 548000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2024-11-03 | 3953000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| tax_rate | 2024-11-03 | 0.35 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2024-11-03 | 5741000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcfe — 2024-11-03

**Result:** $34,881,000,000 · **Status:** ok · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2024-11-03 | 5895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| d_and_a | 2024-11-03 | 9860000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2024-11-03 | 548000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2024-11-03 | 672000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2024-11-03 | 39954000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt_repaid | 2024-11-03 | 19608000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## owner-earnings — 2024-11-03

**Result:** $5,223,000,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2024-11-03 | 5895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| d_and_a | 2024-11-03 | 9860000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2024-11-03 | 672000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2024-11-03

**Result:** 3.39x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2024-11-03 | 19962000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| net_income | 2024-11-03 | 5895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## ebitda — 2024-11-03

**Result:** $23,323,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2024-11-03 | 13463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| d_and_a | 2024-11-03 | 9860000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## nopat — 2024-11-03

**Result:** $8,750,950,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2024-11-03 | 13463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2024-11-03 | 0.35 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2024-11-03

**Result:** $125,870,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2024-11-03 | 67678000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt | 2024-11-03 | 67540000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2024-11-03 | 9348000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## roic — 2024-11-03

**Result:** 10.01% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2024-11-03 | 13463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2024-11-03 | 0.35 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2024-11-03 | 87426500000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2024-11-03

**Result:** $58,192,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2024-11-03 | 67540000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2024-11-03 | 9348000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## debt-ebitda — 2024-11-03

**Result:** 2.90x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2024-11-03 | 67540000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2024-11-03 | 23323000000 | USD | Derived: ebitda @ 2024-11-03; see Calculations and Calc inputs. |

## interest-coverage — 2024-11-03

**Result:** 3.41x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2024-11-03 | 13463000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2024-11-03 | 3953000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## current-ratio — 2024-11-03

**Result:** 1.17x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2024-11-03 | 19595000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| current_liabilities | 2024-11-03 | 16697000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## tangible-book-value — 2024-11-03

**Result:** $-70,778,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2024-11-03 | 67678000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2024-11-03 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| goodwill | 2024-11-03 | 97873000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| intangibles | 2024-11-03 | 40583000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## ncav — 2024-11-03

**Result:** $-78,372,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2024-11-03 | 19595000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| total_liabilities | 2024-11-03 | 97967000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2024-11-03 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## dilution — 2024-11-03

**Result:** 11.84% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2024-11-03 | 4778000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| previous_shares | 2023-10-29 | 4272000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## sbc-to-revenue — 2024-11-03

**Result:** 11.13% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2024-11-03 | 5741000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2024-11-03 | 51574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## eps — 2024-11-03

**Result:** $1.23 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2024-11-03 | 1.23 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## debt-due-3y — 2024-11-03

**Result:** $16,129,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2024-11-03 | 1245000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| maturity_y2 | 2024-11-03 | 3152000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| maturity_y3 | 2024-11-03 | 11732000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |

## revenue-growth — 2025-11-02

**Result:** 26.26% · **Status:** ok · **Card:** revenue

**Formula:** Revenue / Previous revenue − 1 (annualized: 53-week year scaled to 364 days)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| previous_revenue | 2024-11-03 | 50600905660.37736 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>Transformed calculation input: differs from the raw filing value; see formula and flags. |

## gross-margin — 2025-11-02

**Result:** 67.77% · **Status:** ok · **Card:** gross-margin

**Formula:** Gross profit / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| gross_profit | 2025-11-02 | 43294000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## operating-margin — 2025-11-02

**Result:** 39.89% · **Status:** ok · **Card:** operating-margin

**Formula:** Operating income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## net-margin — 2025-11-02

**Result:** 36.20% · **Status:** ok · **Card:** net-margin

**Formula:** Net income / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf — 2025-11-02

**Result:** $26,914,000,000 · **Status:** ok · **Card:** fcf

**Formula:** OCF − CapEx

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2025-11-02 | 27537000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2025-11-02 | 623000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcf-margin — 2025-11-02

**Result:** 42.13% · **Status:** ok · **Card:** fcf-margin

**Formula:** (OCF − CapEx) / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2025-11-02 | 27537000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2025-11-02 | 623000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcff — 2025-11-02

**Result:** $22,556,000,000 · **Status:** ok · **Card:** fcff

**Formula:** OCF + Interest × (1 − Tax rate) − CapEx − SBC

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2025-11-02 | 27537000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2025-11-02 | 623000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2025-11-02 | 3210000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2025-11-02 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| sbc | 2025-11-02 | 7568000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## fcfe — 2025-11-02

**Result:** $24,986,000,000 · **Status:** ok · **Card:** fcfe

**Formula:** Net income + D&A − CapEx − ΔOperating working capital + (Debt issued − Debt repaid)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| d_and_a | 2025-11-02 | 8636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2025-11-02 | 623000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2025-11-02 | 3341000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_issued | 2025-11-02 | 15666000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt_repaid | 2025-11-02 | 18478000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## owner-earnings — 2025-11-02

**Result:** $19,785,000,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + D&A − Maintenance CapEx (1 × D&A) − ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| d_and_a | 2025-11-02 | 8636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2025-11-02 | 3341000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## earnings-quality — 2025-11-02

**Result:** 1.19x · **Status:** ok · **Card:** earnings-quality

**Formula:** OCF / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2025-11-02 | 27537000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## ebitda — 2025-11-02

**Result:** $34,120,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** Operating income + D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| d_and_a | 2025-11-02 | 8636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## nopat — 2025-11-02

**Result:** $25,484,000,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 − Tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2025-11-02 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |

## invested-capital — 2025-11-02

**Result:** $130,250,000,000 · **Status:** ok · **Card:** invested-capital

**Formula:** Equity + Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2025-11-02 | 81292000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| debt | 2025-11-02 | 65136000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2025-11-02 | 16178000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## roic — 2025-11-02

**Result:** 19.90% · **Status:** ok · **Card:** roic

**Formula:** NOPAT / Average invested capital (only when invested capital > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax_rate | 2025-11-02 | 0 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| average_invested_capital | 2025-11-02 | 128060000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## net-debt — 2025-11-02

**Result:** $48,958,000,000 · **Status:** ok · **Card:** net-debt

**Formula:** Debt − Cash

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2025-11-02 | 65136000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2025-11-02 | 16178000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## debt-ebitda — 2025-11-02

**Result:** 1.91x · **Status:** ok · **Card:** debt-ebitda

**Formula:** Debt / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| debt | 2025-11-02 | 65136000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| ebitda | 2025-11-02 | 34120000000 | USD | Derived: ebitda @ 2025-11-02; see Calculations and Calc inputs. |

## interest-coverage — 2025-11-02

**Result:** 7.94x · **Status:** ok · **Card:** interest-coverage

**Formula:** Operating income / Interest expense (only when interest > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| interest_expense | 2025-11-02 | 3210000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## current-ratio — 2025-11-02

**Result:** 1.71x · **Status:** ok · **Card:** current-ratio

**Formula:** Current assets / Current liabilities

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2025-11-02 | 31573000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| current_liabilities | 2025-11-02 | 18514000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## tangible-book-value — 2025-11-02

**Result:** $-48,782,000,000 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Equity − Preferred − Goodwill − Intangibles

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| equity | 2025-11-02 | 81292000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2025-11-02 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| goodwill | 2025-11-02 | 97801000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| intangibles | 2025-11-02 | 32273000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## ncav — 2025-11-02

**Result:** $-58,227,000,000 · **Status:** ok · **Card:** ncav

**Formula:** Current assets − Total liabilities − Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| current_assets | 2025-11-02 | 31573000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| total_liabilities | 2025-11-02 | 89800000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| preferred | 2025-11-02 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## dilution — 2025-11-02

**Result:** 1.57% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Previous diluted shares − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2025-11-02 | 4853000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| previous_shares | 2024-11-03 | 4778000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## sbc-to-revenue — 2025-11-02

**Result:** 11.85% · **Status:** ok · **Card:** dilution

**Formula:** SBC / Revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| sbc | 2025-11-02 | 7568000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## eps — 2025-11-02

**Result:** $4.77 · **Status:** ok · **Card:** eps

**Formula:** Reported diluted EPS

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| eps_diluted | 2025-11-02 | 4.77 | USD per share | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## debt-due-3y — 2025-11-02

**Result:** $12,772,000,000 · **Status:** ok · **Card:** refinancing-risk

**Formula:** Debt maturities in years 1 + 2 + 3

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| maturity_y1 | 2025-11-02 | 3152000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| maturity_y2 | 2025-11-02 | 2500000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| maturity_y3 | 2025-11-02 | 7120000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## revenue-cagr-5 — 2025-11-02

**Result:** 21.74% · **Status:** ok · **Card:** revenue

**Formula:** (Revenue / Revenue 5 years earlier)^(1/5) − 1 (53-week years annualized)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| first_revenue | 2020-11-01 | 23888000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016822000118/0001730168-22-000118-index.html |

## revenue-cagr-9 — 2025-11-02

**Result:** 19.11% · **Status:** ok · **Card:** revenue

**Formula:** (Revenue / Revenue 9 years earlier)^(1/9) − 1 (53-week years annualized)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| first_revenue | 2016-10-30 | 13240000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## diluted-shares-change — 2025-11-02

**Result:** 26.71% · **Status:** ok · **Card:** dilution

**Formula:** Diluted shares / Diluted shares 9 years earlier − 1

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| diluted_avg_shares | 2025-11-02 | 4853000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| first_shares | 2016-10-30 | 3830000000 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016818000084/0001730168-18-000084-index.html |

## incremental-roic-5 — 2025-11-02

**Result:** 29.44% · **Status:** ok · **Card:** incremental-roic

**Formula:** ΔNOPAT / ΔInvested capital over 5 years (only when ΔIC > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| nopat | 2025-11-02 | 25484000000 | USD | Derived: nopat @ 2025-11-02; see Calculations and Calc inputs. |
| first_nopat | 2020-11-01 | 4014000000 | USD | Derived: nopat @ 2020-11-01; see Calculations and Calc inputs. |
| invested_capital | 2025-11-02 | 130250000000 | USD | Derived: invested-capital @ 2025-11-02; see Calculations and Calc inputs. |
| first_invested_capital | 2020-11-01 | 57318000000 | USD | Derived: invested-capital @ 2020-11-01; see Calculations and Calc inputs. |

## roic-years-above-wacc — 2025-11-02

**Result:** 6 · **Status:** ok · **Card:** roic

**Formula:** Count of years with ROIC > WACC (0.09) in the last 10 years

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| roic | 2017-10-29 | 0.08733068335736556 | ratio (decimal) | Derived: roic @ 2017-10-29; see Calculations and Calc inputs. |
| roic | 2018-11-04 | 0.15446628664250153 | ratio (decimal) | Derived: roic @ 2018-11-04; see Calculations and Calc inputs. |
| roic | 2019-11-03 | 0.074431069136176 | ratio (decimal) | Derived: roic @ 2019-11-03; see Calculations and Calc inputs. |
| roic | 2020-11-01 | 0.0729804912637952 | ratio (decimal) | Derived: roic @ 2020-11-01; see Calculations and Calc inputs. |
| roic | 2021-10-31 | 0.15447830570061624 | ratio (decimal) | Derived: roic @ 2021-10-31; see Calculations and Calc inputs. |
| roic | 2022-10-30 | 0.25716694249869126 | ratio (decimal) | Derived: roic @ 2022-10-30; see Calculations and Calc inputs. |
| roic | 2023-10-29 | 0.3061622332377607 | ratio (decimal) | Derived: roic @ 2023-10-29; see Calculations and Calc inputs. |
| roic | 2024-11-03 | 0.10009493688984461 | ratio (decimal) | Derived: roic @ 2024-11-03; see Calculations and Calc inputs. |
| roic | 2025-11-02 | 0.1990004685303764 | ratio (decimal) | Derived: roic @ 2025-11-02; see Calculations and Calc inputs. |

## normalized-net-income — 2025-11-02

**Result:** $12,266,800,000 · **Status:** ok · **Card:** normalized-earnings

**Formula:** Average net income of the last 5 years (mid-cycle proxy)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income_1 | 2021-10-31 | 6736000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/0001730168-23-000096-index.html |
| net_income_2 | 2022-10-30 | 11495000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| net_income_3 | 2023-10-29 | 14082000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| net_income_4 | 2024-11-03 | 5895000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/0001730168-24-000139-index.html |
| net_income_5 | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## market-cap — 2025-11-02

**Result:** $1,725,858,141,392.10 · **Status:** ok · **Card:** market-cap

**Formula:** Price × Shares outstanding

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| price | 2026-10-09 | 361.54 | USD/share | User-supplied price, 2026-10-09 |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## enterprise-value — 2025-11-02

**Result:** $1,761,302,141,392.10 · **Status:** ok · **Card:** enterprise-value

**Formula:** Market cap + Debt − Cash + Minority interest + Preferred

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| market_cap | 2026-08-02 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| minority_interest | 2026-08-02 | 0 | USD | Assumed zero; <br>Transformed calculation input: differs from the raw filing value; see formula and flags. |
| preferred | 2026-08-02 | 0 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## pe — 2025-11-02

**Result:** 74.63x · **Status:** ok · **Card:** pe

**Formula:** Market cap / Net income (only when net income > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| market_cap | 2026-08-02 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## ev-ebitda — 2025-11-02

**Result:** 51.62x · **Status:** ok · **Card:** ev-ebitda

**Formula:** EV / EBITDA (only when EBITDA > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| market_cap | 2026-08-02 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| ebitda | 2025-11-02 | 34120000000 | USD | Derived: ebitda @ 2025-11-02; see Calculations and Calc inputs. |

## fcf-yield — 2025-11-02

**Result:** 1.56% · **Status:** ok · **Card:** fcf-yield

**Formula:** FCF / Market cap

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcf | 2025-11-02 | 26914000000 | USD | Derived: fcf @ 2025-11-02; see Calculations and Calc inputs. |
| market_cap | 2026-08-02 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## dcf-value-bear — 2025-11-02

**Result:** $63.51 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** FCFF DCF, 10 years, FCFF0 = 3-year average FCFF, growth = base − 0.05, WACC 0.09, terminal growth 0.02

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcff0 | 2025-11-02 | 18591133285.862534 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| growth | 2025-11-02 | 0.05 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| debt_and_other_claims | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## dcf-value-base — 2025-11-02

**Result:** $100.83 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** FCFF DCF, 10 years, FCFF0 = 3-year average FCFF, growth = base + 0, WACC 0.09, terminal growth 0.025

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcff0 | 2025-11-02 | 18591133285.862534 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| growth | 2025-11-02 | 0.1 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| debt_and_other_claims | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## dcf-value-bull — 2025-11-02

**Result:** $136.18 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** FCFF DCF, 10 years, FCFF0 = 3-year average FCFF, growth = base + 0.03, WACC 0.09, terminal growth 0.03

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcff0 | 2025-11-02 | 18591133285.862534 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| growth | 2025-11-02 | 0.13 | ratio (decimal) | Derived or model input; see parent calculation formula and model assumptions. |
| debt_and_other_claims | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## reverse-dcf-growth — 2025-11-02

**Result:** 26.50% · **Status:** ok · **Card:** reverse-dcf

**Formula:** Growth for 10 years that makes the base DCF value equal the price

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| price | 2026-10-09 | 361.54 | USD/share | User-supplied price, 2026-10-09 |
| fcff0 | 2025-11-02 | 18591133285.862534 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| debt_and_other_claims | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## reverse-dcf-revenue — 2025-11-02

**Result:** Not available · **Status:** not_available · **Card:** reverse-dcf

**Formula:** Year-10 revenue that makes a revenue DCF equal the price (FCF margin moves from current to target; WACC 0.09; terminal growth 0.025)

**Missing:** target_fcf_margin

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| price | 2026-10-09 | 361.54 | USD/share | User-supplied price, 2026-10-09 |
| base_revenue | 2025-11-02 | 63887000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| current_fcf_margin | 2025-11-02 | 0.4212750637844945 | USD | Derived: fcf-margin @ 2025-11-02; see Calculations and Calc inputs. |
| debt_and_other_claims | 2026-08-02 | 59419000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| cash_sti | 2026-08-02 | 23975000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## earnings-value-per-share — 2025-11-02

**Result:** $38.55 · **Status:** ok · **Card:** normalized-earnings

**Formula:** Normalized net income × 15 / Shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| normalized_net_income | 2025-11-02 | 12266800000 | USD | Derived: normalized-net-income @ 2025-11-02; see Calculations and Calc inputs. |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## tbv-per-share — 2025-11-02

**Result:** $-10.22 · **Status:** ok · **Card:** tangible-book-value

**Formula:** Tangible book value / Shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| tangible_book_value | 2025-11-02 | -48782000000 | USD | Derived: tangible-book-value @ 2025-11-02; see Calculations and Calc inputs. |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ncav-per-share — 2025-11-02

**Result:** $-12.20 · **Status:** ok · **Card:** ncav

**Formula:** NCAV / Shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ncav | 2025-11-02 | -58227000000 | USD | Derived: ncav @ 2025-11-02; see Calculations and Calc inputs. |
| shares_outstanding | 2026-08-28 | 4773629865 | shares | https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## margin-of-safety-base — 2025-11-02

**Result:** -258.57% · **Status:** ok · **Card:** margin-of-safety

**Formula:** (DCF value base − Price) / DCF value base (only when value > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| value | 2025-11-02 | 100.82750112825528 | USD | Derived: dcf-value-base @ 2025-11-02; see Calculations and Calc inputs. |
| price | 2026-10-09 | 361.54 | USD/share | User-supplied price, 2026-10-09 |

## margin-of-safety-bear — 2025-11-02

**Result:** -469.25% · **Status:** ok · **Card:** margin-of-safety

**Formula:** (DCF value bear − Price) / DCF value bear (only when value > 0)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| value | 2025-11-02 | 63.511949049484585 | USD | Derived: dcf-value-bear @ 2025-11-02; see Calculations and Calc inputs. |
| price | 2026-10-09 | 361.54 | USD/share | User-supplied price, 2026-10-09 |

## reported-tax-rate-annual — 2025-11-02

**Result:** -1.75% · **Status:** ok · **Card:** nopat

**Formula:** Income tax expense / Pretax income (unclipped; positive pretax income required)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| income_tax | 2025-11-02 | -397000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| pretax_income | 2025-11-02 | 22729000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |

## normalized-tax-rate-annual — 2025-11-02

**Result:** 21.00% · **Status:** ok · **Card:** nopat

**Formula:** Explicit normalized tax assumption; never replaces the reported tax rate

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| normalized_tax_rate | 2025-11-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |

## normalized-nopat-annual — 2025-11-02

**Result:** $20,132,360,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 - normalized tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax | 2025-11-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |

## normalized-roic-annual — 2025-11-02

**Result:** 15.72% · **Status:** ok · **Card:** roic

**Formula:** Operating income × (1 - normalized tax rate) / average invested capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax | 2025-11-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| average_invested_capital | 2025-11-02 | 128060000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## normalized-fcff-annual — 2025-11-02

**Result:** $24,804,360,000 · **Status:** ok · **Card:** fcff

**Formula:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2025-11-02 | 25484000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax | 2025-11-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| d_and_a | 2025-11-02 | 8636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| capex | 2025-11-02 | 623000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2025-11-02 | 3341000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## normalized-owner-earnings-annual — 2025-11-02

**Result:** $22,676,910,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + reported tax - pretax income × normalized tax + D&A - explicit maintenance CapEx - ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2025-11-02 | 23126000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| reported_tax | 2025-11-02 | -397000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| pretax_income | 2025-11-02 | 22729000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| tax | 2025-11-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| d_and_a | 2025-11-02 | 8636000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| maintenance_capex | 2025-11-02 | 574000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html |
| change_in_owc | 2025-11-02 | 3341000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## reported-tax-rate-ttm — 2026-08-02

**Result:** 5.45% · **Status:** ok · **Card:** nopat

**Formula:** Income tax expense / Pretax income (unclipped; positive pretax income required)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| income_tax | 2026-08-02 | 2204000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| pretax_income | 2026-08-02 | 40469000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-revenue — 2026-08-02

**Result:** $89,104,000,000 · **Status:** ok · **Card:** revenue

**Formula:** Annual revenue + current YTD - prior YTD

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| revenue | 2026-08-02 | 89104000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-net-income — 2026-08-02

**Result:** $38,265,000,000 · **Status:** ok · **Card:** net-income

**Formula:** Annual net income + current YTD - prior YTD

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2026-08-02 | 38265000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-fcf — 2026-08-02

**Result:** $39,403,000,000 · **Status:** ok · **Card:** fcf

**Formula:** TTM OCF - |TTM CapEx|

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2026-08-02 | 40653000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| capex | 2026-08-02 | 1250000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-fcff — 2026-08-02

**Result:** $33,867,298,154.14 · **Status:** ok · **Card:** fcff

**Formula:** TTM OCF + Interest × (1 - tax shield proxy) - |CapEx| - SBC; not tax-normalized

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ocf | 2026-08-02 | 40653000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| interest | 2026-08-02 | 3116000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| tax | 2026-08-02 | 0.05446143962045022 | ratio (decimal) | Legacy cash-flow tax shield proxy, clipped to 0–35%; not normalized cash taxes; Derived or model input; see parent calculation formula and model assumptions. |
| capex | 2026-08-02 | 1250000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| sbc | 2026-08-02 | 8482000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-ebitda — 2026-08-02

**Result:** $51,440,000,000 · **Status:** ok · **Card:** ebitda

**Formula:** TTM operating income + complete TTM D&A

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2026-08-02 | 42814000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| d_and_a | 2026-08-02 | 8626000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-pe — 2026-08-02

**Result:** 45.10x · **Status:** ok · **Card:** pe

**Formula:** Market cap / TTM net income (positive earnings required)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| market_cap | 2026-10-09 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |
| net_income | 2026-08-02 | 38265000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |

## ttm-fcf-margin — 2026-08-02

**Result:** 44.22% · **Status:** ok · **Card:** fcf-margin

**Formula:** TTM FCF / TTM revenue

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcf | 2026-08-02 | 39403000000 | USD | Derived: ttm-fcf @ 2026-08-02; see Calculations and Calc inputs. |
| revenue | 2026-08-02 | 89104000000 | USD | Derived: ttm-revenue @ 2026-08-02; see Calculations and Calc inputs. |

## ttm-fcf-yield — 2026-08-02

**Result:** 2.28% · **Status:** ok · **Card:** fcf-yield

**Formula:** TTM FCF / market cap

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| fcf | 2026-08-02 | 39403000000 | USD | Derived: ttm-fcf @ 2026-08-02; see Calculations and Calc inputs. |
| market_cap | 2026-10-09 | 1725858141392.1 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## ttm-ev-ebitda — 2026-08-02

**Result:** 34.24x · **Status:** ok · **Card:** ev-ebitda

**Formula:** Latest EV / complete TTM EBITDA

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| ev | 2025-11-02 | 1761302141392.1 | USD | Derived: enterprise-value @ 2025-11-02; see Calculations and Calc inputs. |
| ebitda | 2026-08-02 | 51440000000 | USD | Derived: ttm-ebitda @ 2026-08-02; see Calculations and Calc inputs. |

## normalized-tax-rate-ttm — 2026-08-02

**Result:** 21.00% · **Status:** ok · **Card:** nopat

**Formula:** Explicit normalized tax assumption; never replaces the reported tax rate

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| normalized_tax_rate | 2026-08-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |

## normalized-nopat-ttm — 2026-08-02

**Result:** $33,823,060,000 · **Status:** ok · **Card:** nopat

**Formula:** Operating income × (1 - normalized tax rate)

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2026-08-02 | 42814000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| tax | 2026-08-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |

## normalized-roic-ttm — 2026-08-02

**Result:** 25.83% · **Status:** ok · **Card:** roic

**Formula:** Operating income × (1 - normalized tax rate) / average invested capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2026-08-02 | 42814000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| tax | 2026-08-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| average_invested_capital | 2026-08-02 | 130961000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## normalized-fcff-ttm — 2026-08-02

**Result:** $34,211,060,000 · **Status:** ok · **Card:** fcff

**Formula:** Operating income × (1 - normalized tax rate) + D&A - |CapEx| - ΔOperating working capital; SBC remains expensed in operating income

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| operating_income | 2026-08-02 | 42814000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| tax | 2026-08-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| d_and_a | 2026-08-02 | 8626000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| capex | 2026-08-02 | 1250000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| change_in_owc | 2026-08-02 | 6988000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## normalized-owner-earnings-ttm — 2026-08-02

**Result:** $32,976,510,000 · **Status:** ok · **Card:** owner-earnings

**Formula:** Net income + reported tax - pretax income × normalized tax + D&A - explicit maintenance CapEx - ΔOperating working capital

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |
| net_income | 2026-08-02 | 38265000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| reported_tax | 2026-08-02 | 2204000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| pretax_income | 2026-08-02 | 40469000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| tax | 2026-08-02 | 0.21 | ratio (decimal) | Illustrative normalized cash-tax estimate for comparison; sustainable company tax rate is not established.; Analyst assumption, 2026-10-11 |
| d_and_a | 2026-08-02 | 8626000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| maintenance_capex | 2026-08-02 | 632000000 | USD | https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/0001730168-25-000121-index.html<br>https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/0001730168-26-000080-index.html |
| change_in_owc | 2026-08-02 | 6988000000 | USD | Derived or model input; see parent calculation formula and model assumptions. |

## forward-illustrative-growth-value — 2026-08-02

**Result:** $173.97 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## forward-illustrative-garp-value — 2026-08-02

**Result:** $138.64 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## forward-illustrative-quality-value — 2026-08-02

**Result:** $117.60 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## forward-operating-central-value — 2026-08-02

**Result:** $318.73 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## forward-ai-slowdown-value — 2026-08-02

**Result:** $125.83 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

## forward-ai-execution-upside-value — 2026-08-02

**Result:** $541.44 · **Status:** ok · **Card:** fair-value-per-share

**Formula:** PV(explicit annual FCFF) + PV(terminal FCFF / (WACC - terminal growth)) - claims + cash, divided by shares

| Input | Date | Exact value | Unit | Notes / source |
| --- | --- | --- | --- | --- |

