import test from 'node:test';
import assert from 'node:assert/strict';
import { GAP_STATES, getGapStateClaims, calculateGap } from '../src/js/develop-engineering/states.js';

test('Agent-Repository Gap States - pure logic suite', async (t) => {
  await t.test('defines all 5 fundamental states', () => {
    const keys = Object.keys(GAP_STATES);
    assert.deepEqual(keys.sort(), ['CURRENT', 'DESIRED', 'EVIDENCE', 'HISTORICAL', 'POLICY'].sort());
  });

  await t.test('retrieves claims and limits for each state', () => {
    for (const key of Object.keys(GAP_STATES)) {
      const claims = getGapStateClaims(key);
      assert.equal(claims.id, key);
      assert.ok(claims.allows.length > 0);
      assert.ok(claims.prohibits.length > 0);
      assert.ok(typeof claims.authority === 'string');
    }
  });

  await t.test('handles case-insensitive lookup', () => {
    const claims = getGapStateClaims('current');
    assert.equal(claims.id, 'CURRENT');
  });

  await t.test('throws error on invalid stateId', () => {
    assert.throws(() => getGapStateClaims('UNKNOWN_STATE'), /Unknown gap state/);
    assert.throws(() => getGapStateClaims(''), /Invalid stateId/);
  });

  await t.test('calculates G_t gap value accurately', () => {
    const aligned = calculateGap(10, 10);
    assert.equal(aligned.gapValue, 0);
    assert.equal(aligned.isAligned, true);

    const gap = calculateGap(10, 4);
    assert.equal(gap.gapValue, 6);
    assert.equal(gap.isAligned, false);
  });
});
