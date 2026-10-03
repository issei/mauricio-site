import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compare, prune } from '../scripts/a11y-ratchet.mjs';

test('igual ao baseline: sem regressão nem melhoria', () => {
  const r = compare({ 'a.html': { 'axe:label': 2 } }, { 'a.html': { 'axe:label': 2 } });
  assert.deepEqual(r, { regressions: [], improvements: [] });
});

test('mais violações que o baseline é regressão', () => {
  const r = compare({ 'a.html': { 'axe:label': 2 } }, { 'a.html': { 'axe:label': 3 } });
  assert.equal(r.regressions.length, 1);
  assert.match(r.regressions[0], /a\.html axe:label: 2 → 3/);
});

test('menos violações que o baseline exige regravar (a dívida só desce)', () => {
  const r = compare({ 'a.html': { 'axe:label': 2 } }, { 'a.html': { 'axe:label': 0 } });
  assert.equal(r.improvements.length, 1);
  assert.equal(r.regressions.length, 0);
});

test('página nova sem baseline: qualquer violação é regressão', () => {
  const r = compare({}, { 'nova.html': { 'static:no-main': 1 } });
  assert.equal(r.regressions.length, 1);
});

test('página nova limpa não gera nada', () => {
  assert.deepEqual(compare({}, { 'nova.html': {} }), { regressions: [], improvements: [] });
});

test('regra nova numa página existente é regressão', () => {
  const r = compare({ 'a.html': { 'axe:label': 1 } }, { 'a.html': { 'axe:label': 1, 'axe:button-name': 1 } });
  assert.equal(r.regressions.length, 1);
});

test('prune remove zeros e páginas vazias', () => {
  assert.deepEqual(prune({ 'a.html': { x: 0, y: 2 }, 'b.html': { x: 0 } }), { 'a.html': { y: 2 } });
});
