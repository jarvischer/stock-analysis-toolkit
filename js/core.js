/* Stock Analysis Toolkit — core: storage, parsing, formatting, finance math,
   module registry and reusable UI builders. Works in browser and in node (for tests). */
(function (root) {
  'use strict';
  const SAT = (root.SAT = root.SAT || {});
  SAT.modules = SAT.modules || [];

  /* ---------------- Registry ----------------
     A module is { id, group, title, short?, render(el), planned? }.
     Adding a new topic = one new file in js/modules that calls SAT.register(). */
  SAT.groups = [
    { id: 'handbook', title: 'Handbook' },
    { id: 'ref', title: 'Quick access' },
    { id: 'tools', title: 'Tools (calculators)' },
    { id: 'roadmap', title: 'Coming later' },
  ];
  SAT.register = function (m) { SAT.modules.push(m); };

  /* ---------------- Storage (never throws) ---------------- */
  const P = 'sat:';
  SAT.store = {
    get(k, d) {
      try { const v = root.localStorage.getItem(P + k); return v == null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set(k, v) { try { root.localStorage.setItem(P + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    dump() {
      const out = {};
      try {
        for (let i = 0; i < root.localStorage.length; i++) {
          const k = root.localStorage.key(i);
          if (k.startsWith(P)) out[k.slice(P.length)] = JSON.parse(root.localStorage.getItem(k));
        }
      } catch (e) { /* ignore */ }
      return out;
    },
    load(obj) { Object.keys(obj || {}).forEach((k) => SAT.store.set(k, obj[k])); },
    clear() {
      try {
        Object.keys(SAT.store.dump()).forEach((k) => root.localStorage.removeItem(P + k));
      } catch (e) { /* ignore */ }
    },
  };

  /* ---------------- Parsing: accepts 10B, 500M, 2.5k, $1,200, (300), 25% ---------------- */
  SAT.parse = function (s) {
    if (typeof s === 'number') return s;
    if (s == null) return NaN;
    let t = String(s).trim().replace(/[$,\s]/g, '').replace(/^\((.*)\)$/, '-$1').replace(/^−/, '-');
    if (t === '') return NaN;
    const m = t.match(/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([kmbt%]?)$/i);
    if (!m) return NaN;
    const mult = { '': 1, k: 1e3, m: 1e6, b: 1e9, t: 1e12, '%': 1 }[m[2].toLowerCase()];
    return parseFloat(m[1]) * mult;
  };

  /* ---------------- Formatting ---------------- */
  const ok = (v) => typeof v === 'number' && isFinite(v);
  const MINUS = '−';
  function scaled(v) {
    const a = Math.abs(v);
    if (a >= 1e12) return [a / 1e12, 'T'];
    if (a >= 1e9) return [a / 1e9, 'B'];
    if (a >= 1e6) return [a / 1e6, 'M'];
    if (a >= 1e3) return [a / 1e3, 'K'];
    return [a, ''];
  }
  SAT.fmt = {
    money(v) {
      if (!ok(v)) return '—';
      const [x, u] = scaled(v);
      const dp = u ? (x >= 100 ? 1 : 2) : (x >= 100 ? 0 : 2);
      return (v < 0 ? MINUS : '') + '$' + x.toFixed(dp) + u;
    },
    num(v) {
      if (!ok(v)) return '—';
      const [x, u] = scaled(v);
      return (v < 0 ? MINUS : '') + x.toFixed(u ? 2 : 0) + u;
    },
    price(v) {
      if (!ok(v)) return '—';
      return (v < 0 ? MINUS : '') + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    pct(r, dp) {
      if (!ok(r)) return '—';
      const s = (Math.abs(r) * 100).toFixed(dp == null ? 1 : dp);
      return (r < 0 ? MINUS : '') + s + '%';
    },
    spct(r, dp) { // signed percent, for upside/downside
      if (!ok(r)) return '—';
      return (r > 0 ? '+' : '') + SAT.fmt.pct(r, dp);
    },
    x(v) { return ok(v) ? (v < 0 ? MINUS : '') + Math.abs(v).toFixed(1) + 'x' : '—'; },
    ratio(v) { return ok(v) ? v.toFixed(2) : '—'; },
    as(kind, v) { return (SAT.fmt[kind] || SAT.fmt.num)(v); },
  };

  /* ---------------- Finance math (pure) ---------------- */
  const div = (a, b) => (ok(a) && ok(b) && b !== 0 ? a / b : NaN);
  SAT.div = div;
  SAT.fin = {
    growth: (cur, prev) => div(cur - prev, Math.abs(prev)),
    margin: (x, rev) => div(x, rev),
    grossProfit: (rev, cogs) => rev - cogs,
    opIncome: (gp, opex) => gp - opex,
    fcf: (ocf, capex) => ocf - Math.abs(capex), // CapEx entered as positive or negative
    netCash: (cash, debt) => cash - debt,
    nopat: (ebit, tax) => ebit * (1 - tax),
    roic: (nopat, ic) => div(nopat, ic),
    marketCap: (price, shares) => price * shares,
    ev: (mcap, debt, cash) => mcap + debt - cash,
    pv: (cf, r, t) => cf / Math.pow(1 + r, t),

    /* Core DCF from an explicit list of forecast FCFs (years 1..N).
       Terminal value = FCF_N × (1+g) / (r − g), discounted N years.
       Invalid when r ≤ g (Gordon growth breaks) → valid:false and NaNs. */
    dcfFlows({ flows, r, tg, debt = 0, cash = 0, shares, price }) {
      const N = flows.length;
      const rows = flows.map((f, i) => {
        const t = i + 1, df = 1 / Math.pow(1 + r, t);
        return { t, fcf: f, df, pv: f * df };
      });
      const pvF = rows.reduce((s, x) => s + x.pv, 0);
      const valid = N > 0 && ok(r) && ok(tg) && r > tg && r > -1;
      const nextFcf = N ? flows[N - 1] * (1 + tg) : NaN;
      const tv = valid ? nextFcf / (r - tg) : NaN;
      const pvTv = valid ? tv / Math.pow(1 + r, N) : NaN;
      const ev = valid ? pvF + pvTv : NaN;
      const eq = ev - (debt || 0) + (cash || 0);
      const fv = div(eq, shares);
      const up = ok(price) && price > 0 ? fv / price - 1 : NaN;
      return { rows, pvF, nextFcf, tv, pvTv, ev, eq, fv, up, valid, tvShare: div(pvTv, ev) };
    },
    /* Constant-growth forecast: FCF_t = FCF_0 × (1+g)^t */
    forecast(fcf0, g, years) {
      const out = [];
      for (let t = 1; t <= years; t++) out.push(fcf0 * Math.pow(1 + g, t));
      return out;
    },
    dcf(o) {
      const years = Math.max(1, Math.min(30, Math.round(o.years || 5)));
      return SAT.fin.dcfFlows(Object.assign({}, o, { flows: SAT.fin.forecast(o.fcf0, o.g, years) }));
    },
    /* Revenue-driven forecast used by Bear/Base/Bull: revenue grows at g,
       FCF margin ramps linearly from m0 (today) to m1 (final year). */
    revenueFlows(rev0, g, m0, m1, years) {
      const out = [];
      for (let t = 1; t <= years; t++) {
        const m = m0 + (m1 - m0) * (t / years);
        out.push(rev0 * Math.pow(1 + g, t) * m);
      }
      return out;
    },
  };

  /* Everything below is browser-only UI. */
  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = SAT; return; }

  /* ---------------- DOM helpers ---------------- */
  SAT.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  SAT.el = function (html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.children.length === 1 ? t.content.firstElementChild : t.content;
  };
  SAT.tip = (text) => (text ? `<span class="tip" tabindex="0" role="note" aria-label="${SAT.esc(text)}" data-tip="${SAT.esc(text)}">i</span>` : '');
  SAT.he = (text) => (text ? `<p class="he" lang="he" dir="rtl">${text}</p>` : '');
  SAT.goto = (id) => { location.hash = '#' + id; };

  /* Learning-mode box: what / compare / misleading */
  SAT.learnBox = function (key) {
    const L = (SAT.LEARN || {})[key];
    if (!L) return '';
    return `<div class="learn">
      <div><b>What does this tell me?</b> ${L.what}</div>
      <div><b>What should I compare it against?</b> ${L.compare}</div>
      <div><b>What could make it misleading?</b> ${L.misleading}</div>
    </div>`;
  };

  /* ---------------- Fields & forms ----------------
     field spec: { k, label, u: '$'|'#'|'%'|'x'|'yrs'|'text'|'area', kind: 'actual'|'assume', tip, ph }
     Stored as raw strings so "10B" stays "10B"; parsed on compute. */
  const UNIT_HINT = { '$': 'USD · 10B / 500M', '#': 'count · 2.5B', '%': '%', 'x': 'x', 'yrs': 'years', 'text': '', 'area': '' };
  SAT.field = function (f) {
    const kind = f.kind || 'actual';
    const lab = `<span class="fl">${SAT.esc(f.label)}${SAT.tip(f.tip)}</span>`;
    if (f.u === 'area') {
      return `<label class="fld wide k-note">${lab}<textarea data-k="${f.k}" data-u="area" rows="${f.rows || 2}" placeholder="${SAT.esc(f.ph || '')}"></textarea></label>`;
    }
    const suffix = f.u === '%' ? '<i class="sfx">%</i>' : f.u === 'x' ? '<i class="sfx">x</i>' : '';
    const prefix = f.u === '$' ? '<i class="pfx">$</i>' : '';
    return `<label class="fld k-${kind}${f.u === 'text' ? ' k-note' : ''}">${lab}
      <span class="inp">${prefix}<input data-k="${f.k}" data-u="${f.u || '$'}" inputmode="${f.u === 'text' ? 'text' : 'decimal'}" placeholder="${SAT.esc(f.ph || UNIT_HINT[f.u || '$'] || '')}" autocomplete="off" spellcheck="false">${suffix}</span></label>`;
  };

  /* Bind every [data-k] inside root to store[key]. onChange receives parsed values. */
  SAT.form = function (root, key, defaults, onChange) {
    const saved = SAT.store.get(key, {});
    const inputs = Array.from(root.querySelectorAll('[data-k]'));
    const raw = Object.assign({}, defaults, saved);
    inputs.forEach((i) => { if (raw[i.dataset.k] != null) i.value = raw[i.dataset.k]; });
    const values = () => {
      const v = {}, r = {};
      inputs.forEach((i) => {
        const u = i.dataset.u;
        r[i.dataset.k] = i.value;
        if (u === 'text' || u === 'area') v[i.dataset.k] = i.value;
        else {
          let n = SAT.parse(i.value);
          if (u === '%') n = n / 100;
          v[i.dataset.k] = n;
          i.classList.toggle('bad', i.value.trim() !== '' && !ok(n));
        }
      });
      return { v, r };
    };
    const run = () => { const { v, r } = values(); SAT.store.set(key, Object.assign(SAT.store.get(key, {}), r)); if (onChange) onChange(v); };
    inputs.forEach((i) => i.addEventListener('input', run));
    run();
    return {
      values: () => values().v,
      set(obj) { inputs.forEach((i) => { if (obj[i.dataset.k] != null) i.value = obj[i.dataset.k]; }); run(); },
      reset() { inputs.forEach((i) => { i.value = defaults[i.dataset.k] != null ? defaults[i.dataset.k] : ''; }); run(); },
      run,
    };
  };

  /* ---------------- Metric card ----------------
     kind: 'calc' | 'est' ; tone: optional 'pos'|'neg' */
  SAT.metric = function ({ id, label, tip, formula, kind = 'calc', learn }) {
    return `<div class="metric m-${kind}" data-m="${id}">
      <div class="ml">${SAT.esc(label)}${SAT.tip(tip)}</div>
      <div class="mv" data-v>—</div>
      ${formula ? `<div class="mf formula-only">${formula}</div>` : ''}
      ${learn ? SAT.learnBox(learn) : ''}
    </div>`;
  };
  SAT.setMetric = function (root, id, text, tone) {
    const m = root.querySelector(`[data-m="${id}"]`);
    if (!m) return;
    m.querySelector('[data-v]').textContent = text;
    m.classList.remove('pos', 'neg');
    if (tone) m.classList.add(tone);
  };
  SAT.tone = (v, goodIfPositive = true) => (!ok(v) || v === 0 ? '' : (v > 0) === goodIfPositive ? 'pos' : 'neg');

  /* ---------------- Mini calculator ----------------
     { id, fields:[field], outputs:[{id,label,f(v),fmt,kind,tone?}], defaults } */
  SAT.calc = function (cfg) {
    const node = SAT.el(`<div class="calc">
      <div class="calc-h">Calculator</div>
      <div class="calc-body">
        <div class="fields">${cfg.fields.map(SAT.field).join('')}</div>
        <div class="outs">${cfg.outputs.map((o) => SAT.metric({ id: o.id, label: o.label, kind: o.kind || 'calc', formula: o.formula, tip: o.tip })).join('')}</div>
      </div></div>`);
    SAT.form(node, 'calc:' + cfg.id, cfg.defaults || {}, (v) => {
      cfg.outputs.forEach((o) => {
        const val = o.f(v);
        const text = typeof val === 'string' ? val : SAT.fmt.as(o.fmt || 'money', val);
        SAT.setMetric(node, o.id, text, o.tone ? o.tone(val, v) : '');
      });
    });
    return node;
  };

  /* ---------------- Concept card ----------------
     { id, title, abbr, def, he, formula, example:[[k,v]...], interp, warn, good, learn, calc, body } */
  SAT.concept = function (c) {
    const ex = c.example
      ? `<div class="ex"><div class="ex-h">Example</div><table>${c.example.map((r) => `<tr class="${r[2] || ''}"><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>`
      : '';
    const node = SAT.el(`<section class="card concept" id="c-${c.id}">
      <header><h3>${c.title}${c.abbr ? ` <small>${c.abbr}</small>` : ''}</h3>${c.num ? `<span class="num">§${c.num}</span>` : ''}</header>
      ${c.def ? `<p class="def">${c.def}</p>` : ''}
      ${SAT.he(c.he)}
      ${c.formula ? `<div class="formula">${c.formula}</div>` : ''}
      <div class="concept-grid">${ex}${c.interp ? `<div class="interp">${c.interp}</div>` : ''}</div>
      ${c.body || ''}
      ${c.good ? `<div class="callout good">${c.good}</div>` : ''}
      ${c.warn ? `<div class="callout warn">${c.warn}</div>` : ''}
      ${c.learn ? SAT.learnBox(c.learn) : ''}
      <div class="calc-slot"></div>
    </section>`);
    if (c.calc) node.querySelector('.calc-slot').appendChild(SAT.calc(c.calc));
    return node;
  };

  /* Page header for a module */
  SAT.pageHead = (title, sub) => `<div class="page-head"><div class="sec-num">Tool</div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>
    <div class="legend"><span><i class="l-actual"></i>Actual data</span><span><i class="l-assume"></i>Assumption</span><span><i class="l-calc"></i>Calculated</span><span><i class="l-est"></i>Estimated value</span><span class="muted">Inputs accept 10B · 500M · 25K. Saved in this browser.</span></div>`;

  /* Simple "on this page" jump list */
  SAT.toc = (items) => `<nav class="toc">${items.map(([id, t]) => `<a href="javascript:void 0" data-jump="c-${id}">${t}</a>`).join('')}</nav>`;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-jump]');
    if (a) { e.preventDefault(); const t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    const g = e.target.closest('[data-goto]');
    if (g) { e.preventDefault(); SAT.goto(g.dataset.goto); }
  });

  /* Dynamic list editor (used by SOTP + invalidation). Rows stored as arrays of objects. */
  SAT.toast = function (msg) {
    let t = document.getElementById('toast');
    if (!t) { t = SAT.el('<div id="toast" role="status"></div>'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1800);
  };
})(typeof window !== 'undefined' ? window : globalThis);
