import test from 'node:test';
import assert from 'node:assert/strict';
import { MISMATCH_CLASSES, evaluateComparatorAblation } from '../src/js/develop-engineering/comparator.js';

test('Comparator & Ablation Logic - pure logic suite', async (t) => {
  await t.test('defines 5 mismatch classes', () => {
    const keys = Object.keys(MISMATCH_CLASSES);
    assert.equal(keys.length, 5);
    assert.ok(keys.includes('STALE_CONTEXT'));
    assert.ok(keys.includes('SCOPE_VIOLATION'));
  });

  await t.test('baseline without mechanisms leaves all risks unmitigated', () => {
    const res = evaluateComparatorAblation({ grounding: false, gateway: false, validation: false });
    assert.equal(res.controlled.length, 0);
    assert.equal(res.unmitigated.length, 5);
  });

  await t.test('full mechanisms control all 5 mismatch classes', () => {
    const res = evaluateComparatorAblation({ grounding: true, gateway: true, validation: true });
    assert.equal(res.controlled.length, 5);
    assert.equal(res.unmitigated.length, 0);
  });

  await t.test('ablating gateway leaves scope and dependency risks unmitigated', () => {
    const res = evaluateComparatorAblation({ grounding: true, gateway: false, validation: true });
    assert.ok(res.unmitigated.includes('SCOPE_VIOLATION'));
    assert.ok(res.unmitigated.includes('DEPENDENCY_HALLUCINATION'));
    assert.ok(res.controlled.includes('STALE_CONTEXT'));
  });
});
