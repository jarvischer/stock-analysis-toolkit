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
