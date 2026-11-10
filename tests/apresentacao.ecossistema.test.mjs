/**
 * A página apresentacao no grafo do ecossistema.
 *
 * Até o YAML 1.13.0 havia duas cópias da SSOT (specs/ecosystem.nav.yaml e
 * src/js/eco-nav.js), e este teste conferia a sincronia entre elas. Desde a
 * 2.0.0 (SDD-F1-F1b, RF-F1-18) os dados do menu são GERADOS em
 * src/js/eco-nav.data.js por scripts/gen-catalogo.mjs, e a igualdade com o
 * YAML é conferida em tests/catalogo.gen.test.mjs. Aqui fica o que é desta página.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { loadEcossistema } from '../scripts/catalogo/dados.mjs';
import { DATA } from '../src/js/eco-nav.data.js';

const { eco } = loadEcossistema();

test('a página v3.0 está no grafo, no pilar do Método', () => {
  assert.equal(eco.nodes.apresentacao?.pillar, 'p2');
  assert.equal(eco.pillars.find((p) => p.id === 'p2').nodes[0], 'apresentacao');
  assert.equal(DATA.nodes.apresentacao?.file, 'apresentacao.html', 'nó ausente em eco-nav.data.js');
});

test('a versão dos dados do menu é a do YAML', () => {
  assert.equal(DATA.version, eco.meta.version);
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
