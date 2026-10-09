import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const catalogs = {};
for (const lang of ['en','he']) {
  const c = catalogs[lang] = {};
  for (const name of ['concepts','sections','lessons','learn','ui']) c[name] = JSON.parse(await readFile(`src/content/${lang}/${name}.json`,'utf8'));
  const sections = new Set(c.sections.map(s=>s.id));
  for (const [id,concept] of Object.entries(c.concepts)) {
    assert.equal(concept.id,id); assert(sections.has(concept.section),`${lang}: missing section ${id}`);
    for (const k of ['title','short','what']) assert(concept[k],`${lang}: missing ${id}.${k}`);
    for(const related of concept.related || []) assert(c.concepts[related],`${lang}: broken concept link ${id} → ${related}`);
    if (lang === 'he') for(const k of ['title','what','interp','watch']) if (concept[k]) assert(/[א-ת]/.test(concept[k]),`Hebrew missing in ${id}.${k}`);
  }
  for (const path of c.lessons.paths) for (const id of path.lessons) {assert(c.concepts[id]); assert(c.lessons.exercises[id]);}
  for (const [id,q] of Object.entries(c.lessons.exercises)) {assert(Number.isFinite(q.answer)); if(q.choices) assert(q.choices[q.answer]);}
}
for(const type of ['concepts','learn','ui']) assert.deepEqual(Object.keys(catalogs.en[type]).sort(),Object.keys(catalogs.he[type]).sort(),`${type}: locale keys differ`);
for(const [id,q] of Object.entries(catalogs.en.lessons.exercises)) assert.equal(q.answer,catalogs.he.lessons.exercises[id].answer,`${id}: localized answer differs`);
assert.deepEqual(catalogs.en.lessons.paths.map(p=>p.lessons),catalogs.he.lessons.paths.map(p=>p.lessons));
for(const [key,value] of Object.entries(catalogs.he.ui)) {
  assert.equal(key,key.replace(/\s+/g,' ').trim(),`UI key must be normalized: ${key}`);
  const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort();
  assert.deepEqual(placeholders(value),placeholders(key),`UI placeholders differ: ${key}`);
}
assert.deepEqual(catalogs.en.sections.map(s=>s.id),catalogs.he.sections.map(s=>s.id),'Section IDs differ');
for(const [id,q] of Object.entries(catalogs.he.lessons.exercises)) {
  for(const field of ['question','hint','explanation']) assert(/[א-ת]/.test(q[field]),`Missing Hebrew exercise ${id}.${field}`);
  if(q.choices) for(const choice of q.choices) assert(/[א-ת]/.test(choice),`Missing Hebrew choice ${id}`);
}
console.log(`Validated ${Object.keys(catalogs.en.concepts).length} concepts and ${catalogs.en.lessons.paths.length} learning paths in both languages.`);
for (const lang of ['en','he']) {
  const groups = catalogs[lang].sections.find(s => s.id === 'growth-analysis').checklist;
  const items = groups.flatMap(g => g.items);
  assert.equal(items.length,20);
  assert.equal(new Set(items.map(i => i.id)).size,20);
  for (const item of items) assert(catalogs[lang].concepts[item.concept],`Missing checklist target: ${item.concept}`);
}
assert.deepEqual(catalogs.en.sections.find(s=>s.id==='growth-analysis').checklist.map(g=>g.items.map(i=>[i.id,i.concept])),catalogs.he.sections.find(s=>s.id==='growth-analysis').checklist.map(g=>g.items.map(i=>[i.id,i.concept])));
