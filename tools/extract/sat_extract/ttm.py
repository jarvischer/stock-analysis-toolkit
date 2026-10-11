"""Trailing flows = latest full year + current YTD - comparable prior YTD.

Only additive money flows are eligible. Never add EPS or weighted-average shares.
Each term retains its exact interval and filing provenance; missing terms stay missing.
"""
from datetime import date, timedelta
from .select import ANNUAL_FORMS, INTERIM_FORMS, period_days


def _next(day):
    return (date.fromisoformat(day) + timedelta(days=1)).isoformat()


def _pick(records, tags, start, end, unit):
    for tag in tags:
        hits = [r for r in records if r['concept'] == tag and r['start'] == start and r['end'] == end
                and r['unit'] == unit and r['form'] in ANNUAL_FORMS | INTERIM_FORMS]
        if hits:
            latest = max(hits, key=lambda r: (r['filed'], r['accession']))
            return {'value': latest['value'], 'period_start': start, 'period_end': end,
                    'source': {k: latest[k] for k in ('accession', 'filed', 'form')}, 'tag': tag,
                    'flags': ['restated'] if len({r['value'] for r in hits}) > 1 else []}
    return None


def _term(records, spec, start, end):
    direct = _pick(records, spec['tags'], start, end, spec['unit'])
    if direct:
        return direct
    rule = spec.get('construct')
    if not rule:
        return None
    parts = []
    for group in rule['required']:
        part = _pick(records, group, start, end, spec['unit'])
        if part is None:
            return None
        parts.append(part)
    # This path is used for additive duration values (D&A), not balance-sheet totals.
    return {'value': sum(p['value'] for p in parts), 'period_start': start, 'period_end': end,
            'source': {'parts': parts}, 'flags': ['constructed']}


def build_ttm(records, mapping, annual, last_end):
    if not last_end:
        return None
    revenue = next((f for f in annual if f['item'] == 'revenue' and f['period_end'] == last_end), None)
    if not revenue or not revenue.get('period_start'):
        return None
    fiscal_start = _next(last_end)
    tags = mapping['items']['revenue']['tags']
    candidates = [r for r in records if r['form'] in INTERIM_FORMS and r['concept'] in tags
                  and r['unit'] == 'USD' and r['start'] == fiscal_start
                  and r['end'] > last_end and 60 <= period_days(fiscal_start, r['end']) <= 310]
    if not candidates:
        return None
    current_end = max(r['end'] for r in candidates)
    days = period_days(fiscal_start, current_end)
    prior_start = revenue['period_start']
    prior_ends = {r['end'] for r in records if r['concept'] in tags and r['unit'] == 'USD'
                  and r['form'] in ANNUAL_FORMS | INTERIM_FORMS and r['start'] == prior_start
                  and r['end'] < last_end and abs(period_days(prior_start, r['end']) - days) <= 7}
    prior_end = min(prior_ends, key=lambda e: abs(period_days(prior_start, e) - days)) if prior_ends else None
    trailing_start = _next(prior_end) if prior_end else None
    if trailing_start and not 358 <= period_days(trailing_start, current_end) <= 380:
        prior_end = trailing_start = None
    out = []
    for item, spec in mapping['items'].items():
        if spec['kind'] != 'duration' or spec['unit'] != 'USD':
            continue
        terms = [_term(records, spec, prior_start, last_end),
                 _term(records, spec, fiscal_start, current_end),
                 _term(records, spec, prior_start, prior_end) if prior_end else None]
        missing = [name for name, term in zip(['annual', 'current_ytd', 'prior_ytd'], terms) if term is None]
        components = [{**t, 'sign': sign, 'role': role} for t, sign, role in zip(terms, [1, 1, -1], ['annual', 'current_ytd', 'prior_ytd']) if t]
        out.append({'item': item, 'period_start': trailing_start, 'period_end': current_end,
                    'period_days': period_days(trailing_start, current_end) if trailing_start else None,
                    'unit': 'USD', 'value': None if missing else terms[0]['value'] + terms[1]['value'] - terms[2]['value'],
                    'status': 'not_available' if missing else 'constructed', 'basis': 'ttm',
                    'source': {'formula': 'Annual + current YTD - prior YTD', 'parts': components},
                    'flags': ['ttm'] + (['long_year'] if trailing_start and period_days(trailing_start, current_end) >= 368 else []),
                    'missing': missing})
    return {'period_start': trailing_start, 'period_end': current_end, 'annual_end': last_end,
            'current_ytd_start': fiscal_start, 'prior_ytd_end': prior_end, 'facts': out}
