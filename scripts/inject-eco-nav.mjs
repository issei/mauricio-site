#!/usr/bin/env node
/*
 * Injeta (idempotente) a linha de carregamento do componente <eco-nav> antes de
 * </body> nas páginas-nó do ecossistema. Não toca no catalogo.html (o hub é o
 * próprio mapa). Re-rodável: pula arquivos que já contêm a referência.
 *
 * Uso: node scripts/inject-eco-nav.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEcossistema } from './catalogo/dados.mjs';

const SRC = resolve(import.meta.dirname, '..', 'src');
const TAG = '<script type="module" src="./js/eco-nav.js"></script>';
const MARKER = 'js/eco-nav.js';

// Lista vinda do YAML (SDD-F1-F1b §4, corrige DV-3): nós dos pilares e da trajetória,
// mais a home e o currículo. Sem catalogo.html (o hub é o próprio mapa). O <eco-nav>
// sai no lote L5 da F1b; até lá, este script só acrescenta, nunca remove.
const { eco } = loadEcossistema();
const PAGES = [
  ...eco.pillars.flatMap((p) => p.nodes).filter((s) => eco.nodes[s].catalogo !== false),
  ...eco.trajetoria, 'index', 'curriculo',
];

let injected = 0, skipped = 0;
for (const slug of PAGES) {
  const file = resolve(SRC, `${slug}.html`);
  let html;
  try { html = readFileSync(file, 'utf8'); }
  catch { console.warn(`⚠ ausente: ${slug}.html`); continue; }

  if (html.includes(MARKER)) { skipped++; continue; }

  const idx = html.toLowerCase().lastIndexOf('</body>');
  if (idx === -1) { console.warn(`⚠ sem </body>: ${slug}.html`); continue; }

  // preserva a indentação da linha do </body>
  const lineStart = html.lastIndexOf('\n', idx) + 1;
  const indent = html.slice(lineStart, idx).match(/^\s*/)[0];
  const insert = `${indent}${TAG}\n`;
  writeFileSync(file, html.slice(0, lineStart) + insert + html.slice(lineStart), 'utf8');
  injected++;
}

console.log(`eco-nav inject → injetados: ${injected} · já presentes: ${skipped} · total alvo: ${PAGES.length}`);
