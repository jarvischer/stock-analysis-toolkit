/* Locale selection and translation of shared UI text. Content uses stable IDs. */
(function () {
  const supported = ['en', 'he'];
  const query = new URL(location.href).searchParams.get('lang');
  SAT.lang = supported.includes(query) ? query : SAT.store.get('language', 'en');
  if (!supported.includes(SAT.lang)) SAT.lang = 'en';
  SAT.store.set('language', SAT.lang);
  SAT.content = window.SAT_CATALOGS[SAT.lang];
  SAT.LEARN = SAT.content.learn;
  document.documentElement.lang = SAT.lang;
  document.documentElement.dir = SAT.lang === 'he' ? 'rtl' : 'ltr';
  const normalized = s => s.replace(/\s+/g, ' ').trim();
  const patterns = Object.entries(SAT.content.ui).filter(([key]) => key.includes('{')).sort((a,b) => b[0].length - a[0].length).map(([key, value]) => {
    const names = [];
    const escaped = key.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{(\w+)\}/g, (_, name) => { names.push(name); return '(.+?)'; });
    return { re: new RegExp('^' + escaped + '$'), names, value };
  });
  SAT.t = function (value) {
    if (SAT.lang !== 'he' || typeof value !== 'string') return value;
    const key = normalized(value), translated = SAT.content.ui[key];
    if (translated != null) return value.replace(value.trim(), translated);
    for (const pattern of patterns) {
      const match = key.match(pattern.re);
      if (match) return pattern.value.replace(/\{(\w+)\}/g, (_, name) => match[pattern.names.indexOf(name) + 1]);
    }
    return value;
  };
  SAT.localize = function (root) {
    if (SAT.lang !== 'he') return;
    // Never translate user-authored notes, field values, code, or English term labels.
    const excluded = 'script,style,textarea,.case-note,[data-user-content],[data-no-translate],.formula,.fx,code,.mf';
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const texts = [];
    if (root.nodeType === Node.TEXT_NODE) texts.push(root);
    else while (walker.nextNode()) texts.push(walker.currentNode);
    for (const node of texts) {
      if (!node.parentElement || node.parentElement.closest(excluded)) continue;
      const next = SAT.t(node.nodeValue); if (next !== node.nodeValue) node.nodeValue = next;
    }
    if (root.querySelectorAll) {
      for (const el of [root, ...root.querySelectorAll('[title],[placeholder],[aria-label],[data-tip]')]) {
        if (!el.hasAttribute || el.closest('[data-no-translate]')) continue;
        for (const attr of ['title','placeholder','aria-label','data-tip']) {
          if (el.hasAttribute(attr)) el.setAttribute(attr, SAT.t(el.getAttribute(attr)));
        }
      }
    }
  };
  SAT.startLocalization = function () {
    SAT.localize(document.body);
    const observer = new MutationObserver(records => {
      for (const r of records) {
        if (r.type === 'characterData') SAT.localize(r.target);
        for (const n of r.addedNodes) SAT.localize(n);
      }
    });
    observer.observe(document.body, {childList:true, subtree:true, characterData:true});
    document.getElementById('bLanguage').textContent = SAT.lang === 'he' ? 'English' : 'עברית';
    document.getElementById('bLanguage').setAttribute('aria-label', SAT.lang === 'he' ? 'Switch to English' : 'מעבר לעברית');
    document.getElementById('bLanguage').addEventListener('click', () => {
      const lang = SAT.lang === 'he' ? 'en' : 'he'; SAT.store.set('language', lang);
      const url = new URL(location.href); url.searchParams.set('lang',lang); location.assign(url.href);
    });
  };
})();
