/**
 * Esquema do specs/ecosystem.nav.yaml 2.0.0 — invariantes INV-1 a INV-7.
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 1, §3.2 e §5).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { loadEcossistema, validar, ROOT } from '../scripts/catalogo/dados.mjs';
import { EDITORIAL } from '../scripts/editorial/editorial.data.mjs';
import { PAGES } from '../scripts/seo/pages.mjs';

const dados = loadEcossistema();
const { eco } = dados;

test('versão 2.0.0 e esquema válido (INV-1, 2, 4, 5, 6)', () => {
  assert.equal(eco.meta.version, '2.0.0');
  assert.deepEqual(validar(dados), []);
});

test('INV-3 · todo file corresponde a um arquivo real em src/', () => {
  const files = [...Object.values(eco.nodes).map((n) => n.file), ...eco.entradas.map((e) => e.file)];
  const faltando = files.filter((f) => !existsSync(join(ROOT, 'src', f.replace(/^\//, ''))));
  assert.deepEqual(faltando, []);
});

test('INV-7 · toda página do SSOT de SEO é um nó ou uma entrada', () => {
  const conhecidos = new Set([...Object.keys(eco.nodes), ...eco.entradas.map((e) => e.id)]);
  const fora = PAGES.map((p) => p.slug).filter((s) => !conhecidos.has(s));
  assert.deepEqual(fora, []);
});

test('Q5 · o lifeos fica fora do YAML por ora', () => {
  assert.equal(eco.nodes.lifeos, undefined);
});

test('o pilar p5 saiu e as páginas mudaram de pilar (D4, RF-F1-07)', () => {
  assert.equal(eco.nodes.socialselling.pillar, 'p3');
  assert.equal(eco.nodes['boutique-empresarial-showcase'].pillar, 'p2');
  assert.equal(eco.nodes.index, undefined, 'index vai para entradas');
  assert.equal(eco.nodes.videos, undefined, 'videos vai para entradas');
  assert.deepEqual(eco.trajetoria, ['life', 'life3d', 'terminal-evolutivo']);
});

test('RF-F1-11 · o formato da camada editorial é igual ao do YAML', () => {
  const divergentes = Object.entries(EDITORIAL)
    .filter(([s, e]) => e.kind && eco.nodes[s] && e.kind !== eco.nodes[s].kind)
    .map(([s, e]) => `${s}: editorial ${e.kind} × YAML ${eco.nodes[s].kind}`);
  assert.deepEqual(divergentes, []);
});

test('rótulos das entradas (D6, Q9)', () => {
  assert.deepEqual(eco.entradas.map((e) => e.label), ['Início', 'Trajetória', 'Produção', 'Vídeos']);
  assert.deepEqual(eco.entradas.map((e) => e.label_en), ['Home', 'Career', 'Work', 'Videos']);
});
