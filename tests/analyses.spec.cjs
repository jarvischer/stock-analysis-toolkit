const { test, expect } = require('@playwright/test');
const path = require('path');
const sample = path.join(__dirname, 'fixtures', 'analysis-sample.json');

for (const lang of ['en', 'he']) test(`${lang}: import and show an analysis`, async ({ page }) => {
  await page.goto(`/?lang=${lang}#tool-analyses`);
  await expect(page.locator('[data-analysis-empty]')).toBeVisible();
  await page.locator('[data-analysis-file]').setInputFiles(sample);
  await expect(page.locator('[data-analysis-status]')).toHaveAttribute('data-status', 'meets_rules');
  await expect(page.locator('[data-step]')).toHaveCount(7);
  await expect(page.locator('[data-evidence="high"]')).toHaveCount(1);
  await expect(page.locator('[data-step="2"] [data-calc]')).toContainText('operating-margin');
  await expect(page.locator('[data-step="2"] a[href="#margins/operating-margin"]')).toHaveCount(1);
  await expect(page.locator('[data-step="0"] a[href*="sec.gov/Archives/edgar/data/1/000000000126000001"]')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('[data-step]')).toHaveCount(7);
});

test('analysis text is never run as HTML', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  await page.locator('[data-analysis-file]').setInputFiles(sample);
  await expect(page.locator('[data-analysis-summary]')).toContainText('<img src=x onerror="window.__xss=1">');
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  expect(await page.locator('#view img').count()).toBe(0);
});

test('a wrong file gives a clear message', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  await page.locator('[data-analysis-file]').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"a":1}') });
  await expect(page.locator('#toast')).toContainText('This file is not an analysis');
  await expect(page.locator('[data-analysis-empty]')).toBeVisible();
});

test('a file with malformed steps is rejected and not stored', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  const bad = JSON.stringify({ steps: [{}], result: { status: 'meets_rules' } });
  await page.locator('[data-analysis-file]').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from(bad) });
  await expect(page.locator('#toast')).toContainText('This file is not an analysis');
  expect(await page.evaluate(() => localStorage.getItem('sat:analysis:last'))).toBeNull();
  await page.reload();
  await expect(page.locator('[data-analysis-pick]')).toBeVisible();
});

test('a damaged stored analysis is discarded and the page still works', async ({ page }) => {
  await page.goto('/?lang=en#tool-analyses');
  await page.evaluate(() => localStorage.setItem('sat:analysis:last', JSON.stringify({ steps: [{}], result: { status: 'x' } })));
  await page.reload();
  await expect(page.locator('#view')).not.toContainText('Error rendering');
  await expect(page.locator('[data-analysis-empty]')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sat:analysis:last'))).toBeNull();
});

test('valuation comparison renders safely and tables scroll on mobile', async ({page})=>{
 const a=require('./fixtures/analysis-sample.json');
 a.valuation={comparisons:[{style:'growth',label:'<img src=x onerror="window.__xss=1">',status:'ok',value_per_share:150,price_to_value:2,margin_of_safety:-1,gap_to_price:-.5}],cash_flow_bases:[{label:'TTM',period_end:'2026-06-30',value:1000000000,required_growth:.18}],forward:[],sensitivity:[],forward_sensitivity:[],sensitivity_note:'Conditional estimates'};
 await page.setViewportSize({width:390,height:844});await page.goto('/?lang=en#tool-analyses');
 await page.locator('[data-analysis-file]').setInputFiles({name:'comparison.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(a))});
 await expect(page.locator('[data-valuation-case]')).toContainText('150');
 await expect(page.locator('[data-valuation-comparison]')).toContainText('Cash flow starting points');
 expect(await page.evaluate(()=>window.__xss)).toBeUndefined();
 expect(await page.locator('[data-valuation-comparison] img').count()).toBe(0);
 const wrap=page.locator('[data-valuation-comparison] .table-wrap').first();
 expect(await wrap.evaluate(e=>getComputedStyle(e).overflowX)).toBe('auto');
});

test('malformed optional valuation is rejected before rendering', async ({page})=>{
 const a={...require('./fixtures/analysis-sample.json'),valuation:{comparisons:[],cash_flow_bases:[],forward:{}}};
 await page.goto('/?lang=en#tool-analyses');
 await page.locator('[data-analysis-file]').setInputFiles({name:'bad-valuation.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(a))});
 await expect(page.locator('#toast')).toContainText('This file is not an analysis');
 expect(await page.evaluate(()=>localStorage.getItem('sat:analysis:last'))).toBeNull();
});

test('operating expectations and central value remain separate from the policy verdict',async({page})=>{
 const a=JSON.parse(JSON.stringify(require('./fixtures/analysis-sample.json')));
 a.valuation={comparisons:[],cash_flow_bases:[],forward:[],sensitivity:[],forward_sensitivity:[],central_model:{central_scenario_id:'central',value_per_share:319,status:'provisional_estimate',business_profile:'AI and software',reason:'Explicit operations',distinction:'Policy screen remains separate'},operating_expectations:{cases:[{assumed_segment_operating_margin:.45,required_revenue_cagr:.21,milestones:[{period_end:'2030-08-02',revenue:193e9,operating_margin:.45,fcff:62e9}]}],definition:'Conditional path',period_note:'Rolling periods, not fiscal-year guidance'},business_review:{evidence:[],calculations:[],capital_allocation_conclusion:'Mixed evidence'}};
 await page.goto('/?lang=en#tool-analyses');
 await page.locator('[data-analysis-file]').setInputFiles({name:'expectations.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(a))});
 await expect(page.locator('[data-operating-review]')).toContainText('about $320');
 await expect(page.locator('[data-operating-review]')).toContainText('2030-08-02');
 await expect(page.locator('[data-operating-review]')).toContainText('What Must Be True?');
 await expect(page.locator('[data-analysis-status]')).toHaveAttribute('data-status','meets_rules');
});

test('investment snapshot shows uncertainty, unassigned probabilities and per-share data',async({page})=>{
 const fs=require('node:fs');
 const a=JSON.parse(fs.readFileSync('analyses/AVGO-2026-10-11-v4.json','utf8'));
 await page.setViewportSize({width:390,height:844});await page.goto('/?lang=en#tool-analyses');
 await page.locator('[data-analysis-file]').setInputFiles({name:'avgo.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(a))});
 const snapshot=page.locator('[data-investment-snapshot]');
 await expect(snapshot).toContainText('about $320');await expect(snapshot).toContainText('valuation uncertainty is high');
 await expect(snapshot).toContainText('Not assigned');await expect(snapshot).toContainText('Per-share economics');
 await expect(snapshot).toContainText('Company CAGR');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.reload();await expect(page.locator('[data-investment-snapshot]')).toContainText('about $320');
});
