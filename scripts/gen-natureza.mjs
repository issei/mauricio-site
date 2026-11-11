#!/usr/bin/env node
/*
 * Natureza no topo da página (F4b) — preenche, nas páginas do YAML que não têm o quadro
 * editorial, o rótulo "Natureza: …" entre os marcadores:
 *   <!-- NATUREZA:START --> … <!-- NATUREZA:END -->
 *
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 4, F4b, RF-F4-05 a RF-F4-08).
 * As páginas com quadro editorial mostram a natureza no próprio quadro (F4a,
 * scripts/gen-editorial.mjs); elas não levam este marcador.
 *
 * O valor vem do nó em specs/ecosystem.nav.yaml; nunca é digitado na página. O autor
 * posiciona os marcadores (logo antes do <h1>); o gerador só preenche entre eles e nunca
 * os consome. O espelho /en/ recebe o texto traduzido pelo Argos, como o resto da página.
 *
 * Estilo inline e sem hexadecimal: o rótulo herda a cor do texto da página (contraste da
 * própria página) e vale também em apresentacao.html, onde hexadecimal é proibido.
 *
 * Uso: node scripts/gen-natureza.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadEcossistema, NATUREZAS, ROOT } from './catalogo/dados.mjs';
import { EDITORIAL } from './editorial/editorial.data.mjs';

export const MARCAS = ['<!-- NATUREZA:START -->', '<!-- NATUREZA:END -->'];

const ESTILO = 'margin:0 0 .75rem;font-size:.8125rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:inherit';

/** Páginas do F4b: nós do YAML sem quadro editorial (entrada sem `kind`). */
export function paginasF4b(eco = loadEcossistema().eco) {
  return Object.keys(eco.nodes).filter((slug) => !EDITORIAL[slug]?.kind);
}

export function rotulo(slug, eco = loadEcossistema().eco) {
  const n = eco.nodes[slug];
  const label = NATUREZAS[n?.natureza];
  if (!label) throw new Error(`${slug}: natureza inválida ou ausente no YAML: ${n?.natureza}`);
  return `<p class="nat-rotulo" style="${ESTILO}">Natureza: ${label}</p>`;
}

/** Preenche o bloco. Devolve null se os marcadores faltarem (RF-F4-07). */
export function preencher(html, slug, eco) {
  const [ini, fim] = MARCAS;
  const a = html.indexOf(ini);
  const b = html.indexOf(fim);
  if (a === -1 || b === -1 || b < a) return null;
  return html.slice(0, a + ini.length) + rotulo(slug, eco) + html.slice(b);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const check = process.argv.includes('--check');
  const { eco } = loadEcossistema();
  const velhas = [];
  let erro = false;
  for (const slug of paginasF4b(eco)) {
    const file = join(ROOT, 'src', eco.nodes[slug].file);
    const html = readFileSync(file, 'utf8');
    const novo = preencher(html, slug, eco);
    if (novo === null) { console.error(`✗ [natureza] src/${eco.nodes[slug].file}: marcadores NATUREZA ausentes`); erro = true; continue; }
    if (novo === html) continue;
    if (check) velhas.push(slug);
    else { writeFileSync(file, novo); console.log(`✓ [natureza] src/${eco.nodes[slug].file}`); }
  }
  if (erro) process.exit(1);
  if (velhas.length) { console.error(`✗ [natureza] fora de sincronia: ${velhas.join(', ')}. Rode: node scripts/gen-natureza.mjs`); process.exit(1); }
  console.log(`✓ [natureza] ${paginasF4b(eco).length} página(s) em dia`);
}
