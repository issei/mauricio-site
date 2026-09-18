import test from 'node:test';
import assert from 'node:assert/strict';
import { EPISTEMIC_STATES, resolveEpistemicBadge, validateEpistemicBadge } from '../src/js/develop-engineering/epistemic.js';

test('Epistemic Badges - pure logic suite', async (t) => {
  await t.test('covers all 6 defined epistemic states', () => {
    const keys = Object.keys(EPISTEMIC_STATES);
    assert.deepEqual(keys.sort(), ['DOCUMENTED', 'ESTABLISHED', 'HYPOTHESIS', 'INFERENCE', 'PROPOSED', 'UNKNOWN'].sort());
  });

  await t.test('resolves each state correctly with label, text, icon, and colorVar', () => {
    for (const key of Object.keys(EPISTEMIC_STATES)) {
      const resolved = resolveEpistemicBadge(key);
      assert.equal(resolved.label, key);
      assert.ok(typeof resolved.text === 'string' && resolved.text.length > 0);
      assert.ok(typeof resolved.icon === 'string' && resolved.icon.length > 0);
      assert.ok(resolved.colorVar.startsWith('--dg-'));
      assert.ok(validateEpistemicBadge(resolved));
    }
  });

  await t.test('handles case-insensitive lookup and whitespace trimming', () => {
    const resolved = resolveEpistemicBadge('  hypothesis  ');
    assert.equal(resolved.label, 'HYPOTHESIS');
    assert.equal(resolved.text, 'Hipótese');
  });

  await t.test('throws error for invalid or unknown labels', () => {
    assert.throws(() => resolveEpistemicBadge('INVALID_STATE'), /Unknown epistemic state label/);
    assert.throws(() => resolveEpistemicBadge(null), /Invalid epistemic label/);
    assert.throws(() => resolveEpistemicBadge(''), /Invalid epistemic label/);
  });

  await t.test('validates badge completeness', () => {
    assert.equal(validateEpistemicBadge({ text: 'Valid', icon: '✓', colorVar: '--dg-blue' }), true);
    assert.equal(validateEpistemicBadge({ text: '', icon: '✓', colorVar: '--dg-blue' }), false);
    assert.equal(validateEpistemicBadge({ text: 'Valid', icon: '', colorVar: '--dg-blue' }), false);
    assert.equal(validateEpistemicBadge({ text: 'Valid', icon: '✓', colorVar: '#00ff00' }), false); // Must use --dg-*
  });
});
