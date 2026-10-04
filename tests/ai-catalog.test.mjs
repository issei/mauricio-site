// ARD (agenticresourcediscovery.org): schema do manifesto público. Já quebrou uma
// vez sem detecção (entry com 1 representativeQuery — mínimo exigido é 2).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('../public/.well-known/ai-catalog.json', import.meta.url), 'utf8'));

test('todo entry tem identifier no formato urn:air:...', () => {
  for (const e of catalog.entries) {
    assert.match(e.identifier, /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/, e.displayName);
  }
});

test('todo entry tem 2 a 5 representativeQueries', () => {
  for (const e of catalog.entries) {
    const n = e.representativeQueries?.length ?? 0;
    assert.ok(n >= 2 && n <= 5, `${e.displayName}: ${n} queries (esperado 2-5)`);
  }
});

test('todo entry expõe exatamente url ou data, não os dois', () => {
  for (const e of catalog.entries) {
    assert.notEqual(Boolean(e.url), Boolean(e.data), e.displayName);
  }
});
