// Build a small facts.json object for tests. rows: { item: [v2023, v2024, v2025], ... }
export const ENDS = ['2023-12-31', '2024-12-31', '2025-12-31'];
export function makeFacts(rows, { ends = ENDS, sic = 5331, tags = {}, flags = {}, days = {} } = {}) {
  const facts = [];
  for (const [item, values] of Object.entries(rows)) {
    values.forEach((value, i) => {
      const end = ends[i];
      facts.push(value == null
        ? { item, period_end: end, period_days: null, value: null, unit: 'USD', status: 'not_available', source: null, flags: [], tried: [] }
        : { item, period_end: end, period_days: days[end] ?? 365, value, unit: 'USD', status: 'reported',
            source: { tag: tags[item] ?? 'us-gaap:Test', form: '10-K', accession: 'A', filed: '2026-02-15' },
            flags: flags[item + '|' + end] ?? [] });
    });
  }
  return { schema_version: 1, company: { ticker: 'TEST', name: 'Test', cik: '0000000001', sic, model_fit: 'suitable' },
           extracted_at: '2026-10-11', edgartools_version: '5.61.1', periods: ends, facts };
}
export const pick = (metrics, key, end = ENDS[2]) => metrics.find((m) => m.key === key && m.period_end === end);
