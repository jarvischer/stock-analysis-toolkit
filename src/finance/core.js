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
    { id: 'learning', title: 'Learn by doing' },
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

  if (typeof module !== 'undefined') module.exports = SAT;
})(typeof window !== 'undefined' ? window : globalThis);
