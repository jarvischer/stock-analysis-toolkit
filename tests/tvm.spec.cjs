const {test,expect}=require('@playwright/test');
for(const lang of ['en','he']) {
 test(`${lang}: PV examples, DCF links and reference card`,async({page})=>{
  await page.goto('/?lang='+lang+'#dcf/present-value');
  const card=page.locator('#k-present-value');
  await card.locator('details.try').filter({has:page.locator('.calc')}).locator('summary').click();
  await card.locator('[data-k="cf"]').fill('100');
  await card.locator('[data-k="t"]').fill('10');
  await card.locator('[data-k="r"]').fill('10');
  await expect(card.locator('[data-m="p"] [data-v]')).toHaveText('$38.55');
  await card.locator('[data-k="r"]').fill('7');
  await expect(card.locator('[data-m="p"] [data-v]')).toHaveText('$50.83');
  await card.locator('[data-k="r"]').fill('12');
  await expect(card.locator('[data-m="p"] [data-v]')).toHaveText('$32.20');
  await expect(page.locator('.dcf-flow li')).toHaveCount(14);
  await expect(page.locator('.dcf-warnings aside')).toHaveCount(3);
  expect(await page.evaluate(()=>[...document.querySelectorAll('.dcf-flow a')].every(a=>SAT.C[a.hash.split('/')[1]]))).toBe(true);
  for(const [term,id] of [['Time Value of Money','time-value-money'],['Future Value','future-value'],['Required Return','required-return'],['Opportunity Cost of Capital','opportunity-cost'],['ROIC vs WACC','roic']]){
   expect(await page.evaluate(({term,id})=>SAT.search(term).some(r=>r.id===id),{term,id})).toBe(true);
  }
  await page.goto('/?lang='+lang+'#cheatsheet');
  await expect(page.locator('.compounding-reference')).toBeVisible();
  await expect(page.locator('.sheet-i[href="#dcf/future-value"]')).toHaveCount(1);
  await page.setViewportSize({width:390,height:844});
  for(const route of ['dcf','efficiency','cheatsheet']) {
   await page.goto('/?lang='+lang+'#'+route);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 });
}
