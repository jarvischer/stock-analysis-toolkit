const { test, expect } = require('@playwright/test');
for (const lang of ['en','he']) test(`${lang}: cost of equity and WACC calculators`, async ({page}) => {
  await page.goto(`/?lang=${lang}#efficiency/cost-of-equity`);
  await page.locator('#k-cost-of-equity details.try summary').first().click();
  await expect(page.locator('#k-cost-of-equity [data-m=k] [data-v]')).toHaveText('10.0%');
  await page.fill('#k-cost-of-equity [data-k=b]', '0.8');
  await expect(page.locator('#k-cost-of-equity [data-m=k] [data-v]')).toHaveText('8.0%');
  await page.goto(`/?lang=${lang}#efficiency/wacc`);
  await page.locator('#k-wacc details.try summary').first().click();
  await expect(page.locator('#k-wacc [data-m=w] [data-v]')).toHaveText('7.5%');
  await expect(page.locator('#k-wacc [data-m=we] [data-v]')).toHaveText('60.0%');
  await page.fill('#k-wacc [data-k=d]', '0');
  await expect(page.locator('#k-wacc [data-m=w] [data-v]')).toHaveText('10.0%');
  await page.fill('#k-wacc [data-k=e]', '0');
  await expect(page.locator('#k-wacc [data-m=w] [data-v]')).toHaveText('—');
});
