// Run: node tests/finance.test.js — checks the worked examples from the spec.
const SAT = require('../js/core.js');
const F = SAT.fin, f = SAT.fmt;
let fail = 0;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
function eq(name, got, want) { const okv = typeof want === 'string' ? got === want : near(got, want); if (!okv) fail++; console.log((okv ? 'ok  ' : 'FAIL') + '  ' + name + ' → ' + got + (okv ? '' : '  (want ' + want + ')')); }

eq('parse 10B', SAT.parse('10B'), 1e10);
eq('parse $1,200M', SAT.parse('$1,200M'), 1.2e9);
eq('parse (300)', SAT.parse('(300)'), -300);
eq('revenue growth', F.growth(12e9, 10e9), 0.2);
eq('gross margin 70%', F.margin(F.grossProfit(10e9, 3e9), 10e9), 0.7);
eq('net margin 5%', F.margin(500e6, 10e9), 0.05);
eq('FCF margin 15%', F.margin(1.5e9, 10e9), 0.15);
eq('FCF neg capex sign', F.fcf(5e9, -2e9), 3e9);
eq('current ratio', 12e9 / 6e9, 2);
eq('debt/ebitda', 10e9 / 5e9, 2);
eq('NOPAT', F.nopat(4e9, 0.25), 3e9);
eq('ROIC', F.roic(3e9, 15e9), 0.2);
eq('P/E', 20e9 / 1e9, 20);
eq('EV/EBITDA', 20e9 / 2e9, 10);
eq('FCF yield', 1e9 / 10e9, 0.1);
eq('net cash', F.netCash(5e9, 8e9), -3e9);
eq('PV $100 @10%', F.pv(100, 0.1, 1), 90.9090909);
eq('fmt PV', f.price(F.pv(100, 0.1, 1)), '$90.91');
const fc = F.forecast(1e9, 0.2, 3);
eq('Y1', fc[0], 1.2e9); eq('Y2', fc[1], 1.44e9); eq('Y3', fc[2], 1.728e9);
eq('fmt 1.728B', f.money(fc[2]), '$1.73B');
// DCF hand check: 1 yr, FCF0=100, g=0, r=10%, tg=0 → PV(F1)=90.909, TV=100/0.1=1000, PV=909.09, EV=1000
const d1 = F.dcf({ fcf0: 100, g: 0, years: 1, r: 0.1, tg: 0, debt: 0, cash: 0, shares: 10, price: 50 });
eq('DCF EV perpetuity = FCF/r', d1.ev, 1000);
eq('DCF FV/share', d1.fv, 100);
eq('DCF upside', d1.up, 1);
const d2 = F.dcf({ fcf0: 1e9, g: 0.1, years: 5, r: 0.1, tg: 0.03, debt: 2e9, cash: 1e9, shares: 1e8, price: 100 });
eq('equity = EV - debt + cash', d2.eq, d2.ev - 1e9);
const bad = F.dcf({ fcf0: 1e9, g: 0.1, years: 5, r: 0.03, tg: 0.03, shares: 1e8 });
eq('r<=tg invalid', bad.valid ? 1 : 0, 0);
eq('r<=tg fv NaN', isNaN(bad.fv) ? 1 : 0, 1);
// Sensitivity monotonicity
const base = { fcf0: 1e9, g: 0.15, years: 5, debt: 0, cash: 0, shares: 1e9 };
const fv = (r, tg) => F.dcf(Object.assign({ r, tg }, base)).fv;
eq('r up → value down', fv(0.11, 0.03) < fv(0.10, 0.03) ? 1 : 0, 1);
eq('tg up → value up', fv(0.10, 0.035) > fv(0.10, 0.03) ? 1 : 0, 1);
// Revenue flows with constant margin == FCF forecast
const rf = F.revenueFlows(10e9, 0.1, 0.15, 0.15, 3);
eq('revenue flows', rf[2], 10e9 * 1.331 * 0.15);
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
