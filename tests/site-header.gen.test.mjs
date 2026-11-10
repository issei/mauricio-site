/**
 * Cabeçalho comum (F1b) — gerador e marcadores.
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 2, RF-F1b-01 a RF-F1b-17, F1b.6).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { planejar, areaDe, renderCabecalho, hrefEntrada } from '../scripts/gen-cabecalho.mjs';
import { loadEcossistema, ROOT } from '../scripts/catalogo/dados.mjs';

const { eco } = loadEcossistema();

/** Lote L1 (F1b.5): entradas, legais e as páginas geradas de vídeos e temas. */
const L1 = ['index', 'curriculo', 'catalogo', 'videos', 'privacidade', 'termos', 'cookies', '404'];
/** Lote L2 (F1b.5): as 14 páginas com trilha própria (G-B). */
const L2 = ['acessibilidade', 'agent-ready', 'aprendizagem-autorregulada', 'aprendizagem-autorregulada-artigo', 'capacidade-antes-do-acesso', 'case-agents', 'curiosidade-e-investigacao', 'da-execucao-a-orquestracao', 'develop-engineering', 'digital-workplace-agentico', 'engenharia-agentes-ia', 'engenharia-confianca', 'especificacao-conversacional', 'formulacao-de-problemas'];

test('todo bloco gerado está em dia (gen-cabecalho --check)', () => {
  const fora = planejar().filter((p) => p.antes !== p.depois).map((p) => p.rel);
  assert.deepEqual(fora, []);
});

test('os lotes L1 e L2 têm os marcadores, inclusive temas e fichas de vídeo', () => {
  const comMarca = new Set(planejar().map((p) => p.rel));
  const temas = readdirSync(join(ROOT, 'src/temas')).map((f) => `temas/${f}`);
  const fichas = readdirSync(join(ROOT, 'src/videos')).map((f) => `videos/${f}`);
  const faltando = [...L1, ...L2].map((s) => `${s}.html`).concat(temas, fichas).filter((r) => !comMarca.has(r));
  assert.deepEqual(faltando, []);
});

test('RF-F1b-06 · um só <header> filho direto do <body> nas páginas do L1 e do L2', () => {
  for (const s of [...L1, ...L2]) {
    const html = readFileSync(join(ROOT, 'src', `${s}.html`), 'utf8');
    const corpo = html.slice(html.indexOf('<body'));
    // header de topo = não está dentro de article/section/main/aside/nav
    const semAninhados = corpo.replace(/<(article|section|main|aside|nav)\b[\s\S]*?<\/\1>/g, '');
    const headers = semAninhados.match(/<header\b/g) || [];
    assert.equal(headers.length, 1, `${s}: ${headers.length} <header> de topo`);
  }
});

test('RF-F1b-01/02 · rótulos e ordem vêm do YAML (PT e EN, Q9)', () => {
  const pt = renderCabecalho(eco, 'pt', null);
  const en = renderCabecalho(eco, 'en', null);
  const rot = (h) => [...h.matchAll(/<li><a [^>]*>([^<]+)<\/a><\/li>/g)].map((m) => m[1]);
  assert.deepEqual(rot(pt), ['Início', 'Trajetória', 'Produção', 'Vídeos']);
  assert.deepEqual(rot(en), ['Home', 'Career', 'Work', 'Videos']);
  assert.match(en, /aria-label="Site navigation"/);
  assert.equal(hrefEntrada(eco.entradas[1], 'en'), '/en/curriculo.html');
  assert.equal(hrefEntrada(eco.entradas[3], 'en'), '/videos.html', 'vídeos não têm gêmeo /en/');
});

test('RF-F1b-03 · área atual de cada tipo de página', () => {
  assert.deepEqual(areaDe('index.html', eco), { id: 'index', atual: 'page' });
  assert.deepEqual(areaDe('curriculo.html', eco), { id: 'curriculo', atual: 'page' });
  assert.deepEqual(areaDe('catalogo.html', eco), { id: 'catalogo', atual: 'page' });
  assert.deepEqual(areaDe('videos.html', eco), { id: 'videos', atual: 'page' });
  assert.deepEqual(areaDe('temas/engenharia-agentica.html', eco), { id: 'videos', atual: 'true' });
  assert.deepEqual(areaDe('life.html', eco), { id: 'curriculo', atual: 'true' });
  assert.deepEqual(areaDe('devin.html', eco), { id: 'catalogo', atual: 'true' });
  assert.equal(areaDe('privacidade.html', eco), null);
});

test('RF-F1b-17 · botão do celular: disclosure com aria-expanded e aria-controls', () => {
  const h = renderCabecalho(eco, 'pt', null);
  assert.match(h, /<button class="sh-botao" type="button" aria-expanded="false" aria-controls="sh-lista">Menu<\/button>/);
  assert.match(h, /<ul id="sh-lista"/);
  assert.doesNotMatch(h, /role="menu"/);
});
