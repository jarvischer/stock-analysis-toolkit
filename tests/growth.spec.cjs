const {test,expect}=require('@playwright/test');
for(const lang of ['en','he']) {
  test(`${lang}: EV bridge handles cash, debt and invalid inputs`,async({page})=>{
    await page.goto('/?lang='+lang+'#valuation/enterprise-value');
    const calc=page.locator('[data-calculator="ev-from-shares"]');
    await calc.locator('summary').click();
    await expect(calc.locator('[data-m="m"] .mv')).toHaveText('$5.00B');
    await expect(calc.locator('[data-m="e"] .mv')).toHaveText('$4.00B');
    await calc.locator('[data-k="d"]').fill('3B');
    await expect(calc.locator('[data-m="e"] .mv')).toHaveText('$6.00B');
    await expect(calc.locator('[data-m="n"] .mv')).toContainText('1.00B');
    await calc.locator('[data-k="s"]').fill('0');
    await expect(calc.locator('[data-m="e"] .mv')).toHaveText('—');
    await calc.locator('[data-k="s"]').fill('100M');
    await page.reload();
    await calc.locator('summary').click();
    await expect(calc.locator('[data-k="d"]')).toHaveValue('3B');
  });
  test(`${lang}: growth links and saved checklist work on mobile`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto('/?lang='+lang+'#growth-analysis');
    await expect(page.locator('.growth-flow a')).toHaveCount(9);
    await expect(page.locator('[data-growth-key]')).toHaveCount(20);
    expect(await page.evaluate(()=>[...document.querySelectorAll('.growth-flow a')].every(a=>SAT.C[a.hash.split('/')[1]]))).toBe(true);
    await page.locator('[data-growth-key]').first().check();
    await expect(page.locator('[data-growth-progress]')).toHaveText('1 / 20');
    await page.goto('/?lang='+lang+'#tool-checklist');
    await expect(page.locator('[data-growth-key]').first()).toBeChecked();
    await page.locator('[data-ck]').first().check();
    page.on('dialog',d=>d.accept());
    await page.locator('[data-growth-reset]').click();
    await expect(page.locator('[data-growth-key]').first()).not.toBeChecked();
    await expect(page.locator('[data-ck]').first()).toBeChecked();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
}
