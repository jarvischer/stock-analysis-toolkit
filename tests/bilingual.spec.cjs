const { test, expect } = require('@playwright/test');
const learningChecks = require('./learning-assertions.cjs');
const en = require('../src/content/en/concepts.json');
const he = require('../src/content/he/concepts.json');

test('existing learning and calculator behavior survives the build', async ({page}) => {
  await page.goto('/?lang=en#learning');
  const lines = await page.evaluate(learningChecks);
  expect(lines.filter(s=>s.startsWith('FAIL'))).toEqual([]);
  expect(lines.at(-1)).toBe('ALL PASSED');
});

for(const lang of ['en','he']) test(`${lang}: every page renders, all concepts are searchable, lessons work`, async ({page}) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/?lang='+lang);
  const routes=await page.evaluate(()=>SAT.modules.filter(m=>!m.planned).map(m=>m.id));
  for(const route of routes){
    await page.goto('/?lang='+lang+'#'+route);
    await expect(page.locator('#view')).not.toContainText('Error rendering');
  }
  expect(await page.evaluate(()=>Object.values(SAT.C).every(c=>SAT.search(c.title).some(r=>r.href===SAT.href(c.id))))).toBe(true);
  for(const [term,id] of [['תזרים מזומנים חופשי','fcf'],['Free Cash Flow','fcf'],['מרווח ביטחון','margin-of-safety'],['ROIC','roic']]) {
    expect(await page.evaluate(({term,id})=>SAT.search(term).some(r=>r.id===id),{term,id})).toBe(true);
  }
  await page.goto('/?lang='+lang+'#learn-owner');
  await page.locator('.practice input[name=answer]').fill('42.9');
  await page.locator('.practice button[type=submit]').click();
  await expect(page.locator('[data-next]')).toBeDisabled();
  await expect(page.locator('.exercise-feedback')).toContainText(lang==='he'?'עדיין לא':'Not quite');
  await page.locator('.practice input[name=answer]').fill('30');
  await page.locator('.practice button[type=submit]').click();
  await expect(page.locator('.exercise-feedback')).toContainText(lang==='he'?'נכון':'Correct');
  await page.locator('[data-next]').click();
  await expect(page.locator('.lesson-content h3')).toHaveText(lang==='he'?'רווחי בעלים':'Owner Earnings');
  expect(errors).toEqual([]);
});

test('switching language preserves route, bookmarks, calculations, notes, and completion', async ({page}) => {
  await page.goto('/?lang=en#value-investing/margin-of-safety');
  await page.evaluate(()=>{
    SAT.store.set('favs',['margin-of-safety']);
    SAT.store.set('case-note:0','Revenue is my note. ההערה שלי');
    SAT.store.set('dcf',{fcf0:'2B',r:'11'});
    SAT.store.set('learning-results',{'learn-owner:margin-of-safety':{passed:true}});
  });
  await page.locator('#bLanguage').click();
  await expect(page.locator('html')).toHaveAttribute('lang','he');
  await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  expect(new URL(page.url()).hash).toBe('#value-investing/margin-of-safety');
  await expect(page.locator('[data-fav="margin-of-safety"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#k-margin-of-safety h3')).toContainText('Margin of Safety');
  expect(await page.evaluate(()=>SAT.store.get('dcf',{}))).toEqual({fcf0:'2B',r:'11'});
  await page.goto('/?lang=he#company-case');
  await expect(page.locator('[data-reflection]')).toHaveValue('Revenue is my note. ההערה שלי');
  await page.goto('/?lang=he#learn-owner');
  await expect(page.locator('.lesson-content h3')).toHaveText('רווחי בעלים');
  await page.goto('/#learning'); await expect(page.locator('html')).toHaveAttribute('lang','he');
  await page.locator('#bLanguage').click(); await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('html')).toHaveAttribute('dir','ltr');
  expect(await page.evaluate(()=>SAT.store.get('case-note:0'))).toBe('Revenue is my note. ההערה שלי');
});

test('Hebrew sources, dynamic feedback, glossary, and numeric direction', async ({page}) => {
  await page.goto('/?lang=he#statements');
  await page.locator('[data-practice]').click();await page.locator('[data-check]').click();
  await expect(page.locator('.source-feedback')).toContainText('עדיין לא');
  await page.locator('.source-row input[value=revenue]').check();await page.locator('.source-row input[value=cogs]').check();
  await page.locator('[data-check]').click();await expect(page.locator('.source-feedback')).toContainText('נכון');
  await page.goto('/?lang=he#glossary');
  await expect(page.locator('.gl-i').first()).toBeVisible();
  await page.locator('[data-f]').fill('תחזוקה');await expect(page.locator('.gl-i:visible').first()).toContainText('תחזוקה');
  await page.goto('/?lang=he#value-investing');
  expect(await page.locator('#k-margin-of-safety .fx').evaluate(n=>getComputedStyle(n).direction)).toBe('ltr');
  await page.locator('#q').fill('margin of safety');await expect(page.locator('#qres')).toContainText('מרווח ביטחון');
  await page.goto('/?lang=he#tool-dcf');
  await expect(page.locator('[data-k=fcf0]')).toBeVisible();
  expect(await page.locator('[data-k=fcf0]').evaluate(n=>getComputedStyle(n).direction)).toBe('ltr');
});

test('Hebrew mobile layout and menu', async ({page})=>{
  await page.setViewportSize({width:375,height:812});
  for(const route of ['learning','learn-owner','value-investing','glossary','statements','tool-dcf']){
    await page.goto('/?lang=he#'+route);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.locator('#menuBtn').click();
  await expect(page.locator('body')).toHaveClass(/nav-open/);
  await expect.poll(async () => { const box = await page.locator('#side').boundingBox(); return box.x + box.width; }).toBeLessThanOrEqual(376);
  expect((await page.locator('#side').boundingBox()).x).toBeGreaterThanOrEqual(0);
  await page.locator('#side a[href="#learning"]').click();
  await expect(page.locator('body')).not.toHaveClass(/nav-open/);
});
