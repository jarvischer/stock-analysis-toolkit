import { readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import './validate.mjs';
const read = p => readFile(p, 'utf8');
const locales = {};
for (const lang of ['en', 'he']) {
  locales[lang] = {};
  for (const type of ['concepts', 'sections', 'learn', 'lessons', 'ui']) locales[lang][type] = JSON.parse(await read(`src/content/${lang}/${type}.json`));
}
const files = ['finance/core','i18n','components/ui','components/handbook','finance/calculators','content/register','components/reference','learning/lessons','components/dcf','components/scenarios','components/sotp','components/analyzer','components/thesis','components/checklist','components/roadmap','app'];
const js = 'window.SAT_CATALOGS = ' + JSON.stringify(locales).replace(/</g,'\\u003c') + ';\n' + (await Promise.all(files.map(f => read(`src/${f}.js`)))).join('\n');
const css = await read('src/styles/main.css');
const hash = text => createHash('sha256').update(text).digest('hex').slice(0,12);
const jsFile = `app.${hash(js)}.js`, cssFile = `app.${hash(css)}.css`;
await rm('dist', {recursive:true, force:true}); await mkdir('dist/assets',{recursive:true});
await writeFile('dist/assets/'+jsFile, js); await writeFile('dist/assets/'+cssFile,css);
await writeFile('dist/index.html',(await read('src/index.html')).replace('<!-- APP_SCRIPT -->',`<script src="assets/${jsFile}"></script>`).replace('<!-- APP_STYLE -->',`<link rel="stylesheet" href="assets/${cssFile}">`));
await writeFile('dist/.nojekyll','');
console.log(`Built dist: ${jsFile}, ${cssFile}`);
