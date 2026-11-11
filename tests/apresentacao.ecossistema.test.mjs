/**
 * A página apresentacao no grafo do ecossistema (specs/ecosystem.nav.yaml).
 * O YAML gera o catálogo e o cabeçalho comum; o <eco-nav> saiu no lote L5 da F1b.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { loadEcossistema } from '../scripts/catalogo/dados.mjs';

const { eco } = loadEcossistema();

test('a página v3.0 está no grafo, no pilar do Método', () => {
  assert.equal(eco.nodes.apresentacao?.pillar, 'p2');
  assert.equal(eco.pillars.find((p) => p.id === 'p2').nodes[0], 'apresentacao');
  assert.equal(eco.nodes.apresentacao?.file, 'apresentacao.html');
});

test('a página está registrada no SSOT de SEO', async () => {
  const { PAGES } = await import('../scripts/seo/pages.mjs');
  const page = PAGES.find((p) => p.slug === 'apresentacao');
  assert.ok(page, 'apresentacao ausente de scripts/seo/pages.mjs');
  assert.ok(page.title.length >= 10 && page.title.length <= 60, 'título fora de 10–60 chars');
  assert.ok(
    page.description.length >= 50 && page.description.length <= 160,
    'description fora de 50–160 chars'
  );
  assert.ok(page.faq?.length >= 3, 'AEO sem FAQ suficiente');
});
