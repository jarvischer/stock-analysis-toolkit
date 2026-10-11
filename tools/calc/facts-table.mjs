// Lookup of facts.json values with adjustments. Only the items below may be treated as zero when missing;
// each such input is marked assumed_zero so the analysis can say so.
export const ZERO_IF_MISSING = ['preferred', 'minority_interest', 'goodwill', 'intangibles', 'short_term_debt',
  'acquisitions', 'sbc', 'interest_expense', 'inventory', 'debt_issued', 'debt_repaid', 'dividends', 'buybacks'];

export function factTable(facts, adjustmentItems = []) {
  const table = new Map();
  for (const f of [...facts.facts, ...(facts.interim?.facts || [])]) table.set(f.item + '|' + f.period_end, f);
  const adjustments = new Map(adjustmentItems.map((a) => [a.item + '|' + a.period_end, a]));
  return {
    get(item, end) {
      const f = table.get(item + '|' + end), a = adjustments.get(item + '|' + end);
      const delta = a ? a.delta : 0;
      if (!f || f.status === 'not_available') {
        if (!ZERO_IF_MISSING.includes(item)) return null;
        return { item, period_end: end, value: delta, tag: null, flags: [], period_days: null, assumed_zero: true, ...(a ? { adjusted: true } : {}) };
      }
      return { item, period_end: end, value: f.value + delta, tag: f.source?.tag ?? null, flags: f.flags || [],
               period_days: f.period_days ?? null, ...(a ? { adjusted: true } : {}) };
    },
  };
}
