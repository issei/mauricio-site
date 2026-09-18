import test from 'node:test';
import assert from 'node:assert/strict';
import { VERDICTS, filterVerdicts } from '../src/js/develop-engineering/verdicts.js';

test('Verdicts & Oracle Filtering - pure logic suite', async (t) => {
  await t.test('defines all 4 primary verdicts', () => {
    const keys = Object.keys(VERDICTS);
    assert.deepEqual(keys.sort(), ['CONFLICT', 'FAIL', 'PASS', 'UNKNOWN'].sort());
  });

  await t.test('filters items correctly and reports hidden count', () => {
    const mockOracles = [
      { id: 'O1', verdict: 'PASS' },
      { id: 'O2', verdict: 'PASS' },
      { id: 'O3', verdict: 'FAIL' },
      { id: 'O4', verdict: 'UNKNOWN' },
      { id: 'O5', verdict: 'CONFLICT' }
    ];

    const resultAll = filterVerdicts(mockOracles, 'ALL');
    assert.equal(resultAll.visibleItems.length, 5);
    assert.equal(resultAll.hiddenCount, 0);

    const resultPass = filterVerdicts(mockOracles, 'PASS');
    assert.equal(resultPass.visibleItems.length, 2);
    assert.equal(resultPass.hiddenCount, 3);

    const resultUnknown = filterVerdicts(mockOracles, 'UNKNOWN');
    assert.equal(resultUnknown.visibleItems.length, 1);
    assert.equal(resultUnknown.hiddenCount, 4);
  });

  await t.test('never omits the hidden count when filtering', () => {
    const mockItems = [{ id: '1', verdict: 'FAIL' }];
    const result = filterVerdicts(mockItems, 'PASS');
    assert.equal(result.visibleItems.length, 0);
    assert.equal(result.hiddenCount, 1);
    assert.equal(result.totalCount, 1);
  });
});
