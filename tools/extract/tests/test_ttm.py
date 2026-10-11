import json
from pathlib import Path
import pytest
from sat_extract.facts import build_facts
MAPPING=json.loads((Path(__file__).resolve().parents[3]/'agent/mapping/line-items.json').read_text())
COMPANY={'ticker':'TEST','name':'Test','cik':'1','sic':3674}

def record(tag,value,start,end,form='10-Q',filed='2026-08-10'):
    return {'concept':'us-gaap:'+tag,'value':value,'start':start,'end':end,'form':form,'filed':filed,'accession':filed,'unit':'USD'}

def rows(tag='Revenues'):
    return [record(tag,100,'2025-01-01','2025-12-31','10-K','2026-02-10'),
            record(tag,60,'2025-01-01','2025-06-30'),record(tag,90,'2026-01-01','2026-06-30')]

def build(r):return build_facts(r,MAPPING,COMPANY,10,'2026-10-11','test')

def test_ttm_reconciles_matched_ytd_with_sources_and_ignores_quarter_only():
    r=rows()+rows('NetCashProvidedByUsedInOperatingActivities')+[record('Revenues',45,'2026-04-01','2026-06-30')]
    t=build(r)['ttm']; rev=next(x for x in t['facts'] if x['item']=='revenue')
    assert t['period_start']=='2025-07-01'
    assert rev['value']==130
    assert [x['sign'] for x in rev['source']['parts']]==[1,1,-1]
    assert rev['source']['parts'][1]['period_start']=='2026-01-01'
    assert not any(x['item'] in ['eps_diluted','diluted_avg_shares'] for x in t['facts'])

def test_missing_prior_ytd_never_becomes_zero():
    t=build([rows()[0],rows()[2]])['ttm'];rev=next(x for x in t['facts'] if x['item']=='revenue')
    assert rev['status']=='not_available' and rev['value'] is None
    assert 'prior_ytd' in rev['missing']

def test_ttm_requires_same_fiscal_start_and_latest_amendment_wins():
    r=rows()+[record('Revenues',95,'2026-01-01','2026-06-30','10-Q/A','2026-09-01'),record('Revenues',999,'2026-02-01','2026-06-30')]
    rev=next(x for x in build(r)['ttm']['facts'] if x['item']=='revenue')
    assert rev['value']==135
    assert 'restated' in rev['source']['parts'][1]['flags']

def test_depreciation_only_is_not_total_da():
    r=rows()+[record('Depreciation',5,'2025-01-01','2025-12-31','10-K')]
    out=build(r)
    assert next(x for x in out['facts'] if x['item']=='d_and_a')['value'] is None
    assert next(x for x in out['facts'] if x['item']=='depreciation')['value']==5

def test_complete_da_is_reconciled_for_each_term():
    r=rows()+rows('Depreciation')+rows('AmortizationOfIntangibleAssets')
    da=next(x for x in build(r)['ttm']['facts'] if x['item']=='d_and_a')
    assert da['value']==260 and len(da['source']['parts'])==3
