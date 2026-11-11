#!/usr/bin/env node
/*
 * Continuação "Se este tema interessa a você" (F5c) — nas páginas do YAML que ainda não têm a
 * continuação escrita pelo autor (EDITORIAL-NEXT, scripts/editorial/editorial.data.mjs).
 *   <!-- CONTINUACAO:START --> … <!-- CONTINUACAO:END -->
 *
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 5, F5c, RF-F5-06 a RF-F5-10).
 *
 * A regra é mecânica e não inventa texto na voz do autor: duas páginas do YAML que dividem
 * um tema com esta, ordenadas por (1) mais temas em comum, (2) mesmo tema principal, (3) ordem do
 * YAML; se faltar, completa com páginas da mesma natureza (SDD Parte 8, RF-F8-07: nenhum motivo
 * cita pilar). O motivo é o fato: "Também em <tema>" ou "Também de natureza <natureza>". Página
 * sem tema fica de fora. Para trocar por texto próprio, o autor escreve a
 * entrada `next` em editorial.data.mjs; a página sai deste gerador (o marcador é retirado).
 *
 * Estilo inline e sem hexadecimal: herda a cor e a fonte da página (vale em apresentacao.html,
 * onde hexadecimal é proibido, e nas páginas que não carregam aeo.css).
 *
 * Uso: node scripts/gen-continuacao.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';

import { loadEcossistema, ROOT, cardTitle, NATUREZAS } from './catalogo/dados.mjs';
import { EDITORIAL } from './editorial/editorial.data.mjs';

export const MARCAS = ['<!-- CONTINUACAO:START -->', '<!-- CONTINUACAO:END -->'];
/** Páginas imersivas: a continuação ficaria dentro do jogo ou da cena. Ver RF-F5-08. */
export const FORA = new Set(['life', 'life3d']);
const QUANTAS = 2;

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const nomesDosTemas = () => parseYaml(readFileSync(join(ROOT, 'content/temas.yml'), 'utf8'));

/** Páginas do F5c: nós do YAML sem continuação do autor e fora das imersivas. */
export function paginasF5c(eco = loadEcossistema().eco) {
  return Object.keys(eco.nodes).filter((s) => !EDITORIAL[s]?.next?.length && !FORA.has(s) && eco.nodes[s].temas?.length);
}

/** As QUANTAS sugestões de uma página: [{ slug, comuns: [tema] }]. */
export function sugestoes(slug, eco = loadEcossistema().eco) {
  const base = eco.nodes[slug];
  const ordem = Object.keys(eco.nodes);
  return ordem
    .filter((s) => s !== slug)
    .map((s) => ({ slug: s, comuns: (eco.nodes[s].temas ?? []).filter((t) => base.temas?.includes(t)) }))
    .filter((c) => c.comuns.length)
    .sort((a, b) => b.comuns.length - a.comuns.length
      || (eco.nodes[b.slug].temas[0] === base.temas[0]) - (eco.nodes[a.slug].temas[0] === base.temas[0])
      || ordem.indexOf(a.slug) - ordem.indexOf(b.slug))
    .slice(0, QUANTAS);
}

/** Completa com páginas da mesma natureza quando o tema não rende QUANTAS (RF-F5-07, RF-F8-07). */
export function escolhas(slug, eco = loadEcossistema().eco) {
  const porTema = sugestoes(slug, eco);
  const base = eco.nodes[slug];
  const usados = new Set([slug, ...porTema.map((c) => c.slug)]);
  const porNatureza = Object.keys(eco.nodes)
    .filter((s) => !usados.has(s) && !FORA.has(s) && eco.nodes[s].catalogo !== false && eco.nodes[s].natureza === base.natureza)
    .map((s) => ({ slug: s, comuns: [], natureza: base.natureza }));
  return [...porTema, ...porNatureza].slice(0, QUANTAS);
}

const joinPt = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}`);

export function bloco(slug, eco = loadEcossistema().eco, temas = nomesDosTemas()) {
  const itens = escolhas(slug, eco);
  if (!itens.length) throw new Error(`${slug}: nenhuma página divide tema ou natureza com esta`);
  const li = itens.map(({ slug: s, comuns, natureza }) => {
    const n = eco.nodes[s];
    const motivo = comuns.length
      ? `Também em ${joinPt(comuns.map((t) => temas[t]?.nome ?? t))}.`
      : `Também de natureza ${NATUREZAS[natureza]}.`;
    return `<li><a href="./${esc(n.file)}" style="color:inherit;text-decoration:underline;text-underline-offset:2px">${esc(cardTitle(n))}</a> <span style="display:block;font-size:.88rem">${esc(motivo)}</span></li>`;
  }).join('');
  return `<nav class="cont" aria-labelledby="cont-label" style="max-width:72rem;margin:3rem auto;padding:0 1.25rem;text-align:left">`
    + `<p id="cont-label" style="margin:0 0 .5rem;font-size:.8125rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase">Se este tema interessa a você</p>`
    + `<ul style="margin:0;padding-left:1.1rem;display:grid;gap:.45rem;line-height:1.6">${li}</ul></nav>`;
}

/** Preenche o bloco. Devolve null se os marcadores faltarem. */
export function preencher(html, slug, eco, temas) {
  const [ini, fim] = MARCAS;
  const a = html.indexOf(ini);
  const b = html.indexOf(fim);
  if (a === -1 || b === -1 || b < a) return null;
  return html.slice(0, a + ini.length) + bloco(slug, eco, temas) + html.slice(b);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const check = process.argv.includes('--check');
  const { eco } = loadEcossistema();
  const temas = nomesDosTemas();
  const velhas = [];
  let erro = false;
  for (const slug of paginasF5c(eco)) {
    const rel = eco.nodes[slug].file;
    const html = readFileSync(join(ROOT, 'src', rel), 'utf8');
    const novo = preencher(html, slug, eco, temas);
    if (novo === null) { console.error(`✗ [continuacao] src/${rel}: marcadores CONTINUACAO ausentes`); erro = true; continue; }
    if (novo === html) continue;
    if (check) velhas.push(slug);
    else { writeFileSync(join(ROOT, 'src', rel), novo); console.log(`✓ [continuacao] src/${rel}`); }
  }
  if (erro) process.exit(1);
  if (velhas.length) { console.error(`✗ [continuacao] fora de sincronia: ${velhas.join(', ')}. Rode: node scripts/gen-continuacao.mjs`); process.exit(1); }
  console.log(`✓ [continuacao] ${paginasF5c(eco).length} página(s) em dia`);
}
