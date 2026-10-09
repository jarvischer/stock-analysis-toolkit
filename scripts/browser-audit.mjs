import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',args:['--no-sandbox']});
const page = await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173/?lang=he');
const routes = await page.evaluate(()=>SAT.modules.filter(m=>!m.planned).map(m=>m.id));
const texts=new Set();
for(const route of routes){
  await page.goto('http://127.0.0.1:4173/?lang=he#'+route);
  await page.waitForTimeout(50);
  const found=await page.evaluate(()=>{
    const out=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {const n=walker.currentNode;const t=n.nodeValue.replace(/\s+/g,' ').trim();if(/[A-Za-z]{2}/.test(t)&&!/[א-ת]/.test(t)&&!n.parentElement.closest('script,style,textarea,.case-note,[data-no-translate],.formula,.fx,code,.mf'))out.push(t);}
    for(const n of document.querySelectorAll('[title],[placeholder],[aria-label],[data-tip]'))for(const a of ['title','placeholder','aria-label','data-tip']){const t=n.getAttribute(a)||'';if(/[A-Za-z]{2}/.test(t)&&!/[א-ת]/.test(t))out.push(t);}
    return out;
  });found.forEach(t=>texts.add(t));
}
await writeFile('/tmp/stock-untranslated.json',JSON.stringify([...texts].sort(),null,2));
await page.goto('http://127.0.0.1:4173/?lang=he#learning');await page.screenshot({path:'/tmp/stock-he-desktop.png',fullPage:true});
await page.setViewportSize({width:375,height:812});
await page.goto('http://127.0.0.1:4173/?lang=he#learn-owner');
await page.screenshot({path:'/tmp/stock-he-mobile.png',fullPage:true});
console.log(JSON.stringify({routes:routes.length,untranslated:texts.size,errors}));
await browser.close();
