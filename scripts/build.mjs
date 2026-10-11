import { readFile, writeFile, mkdir, rm, copyFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import './validate.mjs';
const read = p => readFile(p, 'utf8');
const locales = {};
for (const lang of ['en', 'he']) {
  locales[lang] = {};
  for (const type of ['concepts', 'sections', 'learn', 'lessons', 'ui']) locales[lang][type] = JSON.parse(await read(`src/content/${lang}/${type}.json`));
}
const files = ['finance/core','i18n','components/ui','components/handbook','finance/calculators','content/register','components/reference','learning/lessons','components/dcf','components/scenarios','components/sotp','components/analyzer','components/thesis','components/growth','components/checklist','components/roadmap','app'];
const code = (await Promise.all(files.map(f => read(`src/${f}.js`)))).join('\n');
const hash = text => createHash('sha256').update(text).digest('hex').slice(0,12);
// One bundle per language: the full active catalogs plus only the other language's concept titles (used by search and Hebrew card subtitles).
const bundles = {};
for (const lang of Object.keys(locales)) {
  const catalogs = {};
  for (const [other, c] of Object.entries(locales)) catalogs[other] = other === lang ? c : {concepts: Object.fromEntries(Object.entries(c.concepts).map(([id, x]) => [id, {title: x.title}]))};
  const js = `window.SAT_BUNDLE_LANG = ${JSON.stringify(lang)};\nwindow.SAT_CATALOGS = ` + JSON.stringify(catalogs).replace(/</g,'\\u003c') + ';\n' + code;
  bundles[lang] = {file: `app.${lang}.${hash(js)}.js`, js};
}
const css = await read('src/styles/main.css');
const cssFile = `app.${hash(css)}.css`;
await rm('dist', {recursive:true, force:true}); await mkdir('dist/assets',{recursive:true});
for (const b of Object.values(bundles)) await writeFile('dist/assets/'+b.file, b.js);
await writeFile('dist/assets/'+cssFile,css);
// Same language rule as i18n.js: a valid ?lang= wins, then the saved language, then English.
const loader = `<script>(function(){var l=null;try{l=new URL(location.href).searchParams.get('lang');}catch(e){}if(l!=='en'&&l!=='he'){try{l=JSON.parse(localStorage.getItem('sat:language')||'"en"');}catch(e){l='en';}}var s=document.createElement('script');s.src=l==='he'?'assets/${bundles.he.file}':'assets/${bundles.en.file}';s.async=false;document.body.appendChild(s);})();</script>`;
await writeFile('dist/index.html',(await read('src/index.html')).replace('<!-- APP_SCRIPT -->',loader).replace('<!-- APP_STYLE -->',`<link rel="stylesheet" href="assets/${cssFile}">`));
await mkdir('dist/assets/fonts');
for (const f of await readdir('src/fonts')) await copyFile('src/fonts/'+f, 'dist/assets/fonts/'+f);
await writeFile('dist/.nojekyll','');
console.log(`Built dist: ${Object.values(bundles).map(b => b.file).join(', ')}, ${cssFile}`);
