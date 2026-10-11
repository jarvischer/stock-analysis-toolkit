// The calculator sums reported classes; the analysis validator checks each text citation.
export function shareAssumption(a) {
  if (a == null) return null;
  const fail = () => { throw new Error('shares_outstanding assumption needs a date, source and distinct positive share components'); };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.period_end || '') ||
      !Number.isFinite(Date.parse(a.period_end)) || new Date(a.period_end).toISOString().slice(0, 10) !== a.period_end ||
      typeof a.source !== 'string' || !a.source.trim() ||
      !Array.isArray(a.components) || !a.components.length) fail();
  const names = new Set();
  for (const c of a.components) {
    if (!c || !/^(?:cover_)?shares_[a-z0-9_]+$/.test(c.item || '') || names.has(c.item) ||
        !Number.isSafeInteger(c.value) || c.value <= 0) fail();
    names.add(c.item);
  }
  const value = a.components.reduce((sum, c) => sum + c.value, 0);
  if (!Number.isSafeInteger(value) || (a.value != null && a.value !== value)) fail();
  return { item: 'assumed_shares_outstanding', period_end: a.period_end, value, source: a.source,
    estimate: 'sum of cited share counts; validate each component against a text fact' };
}
