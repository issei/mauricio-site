#!/usr/bin/env node
/*
 * Catálogo gerado — escreve, a partir de specs/ecosystem.nav.yaml:
 *   1. src/catalogo.html, entre <!-- CATALOGO:START --> e <!-- CATALOGO:END -->
 *      (trilha dos pilares, cartões dos 4 pilares e a seção "Trajetória e vídeos");
 *   2. src/js/eco-nav.data.js (dados do menu <eco-nav>);
 *   3. public/catalogo.md (gêmeo Markdown, via buildMd de scripts/seo/lib.mjs).
 *
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 1, RF-F1-12 a RF-F1-18).
 * O que fica fora dos marcadores (head, hero, "Comece por aqui", rodapé) continua
 * escrito à mão (RF-F1-13). Os marcadores nunca são consumidos.
 *
 * Uso: node scripts/gen-catalogo.mjs [--check]
 *   --check  não grava; sai ≠ 0 se algum arquivo divergir da fonte.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  loadEcossistema, validar, ROOT, NATUREZAS, cardTitle, cardTag, hrefOf,
} from './catalogo/dados.mjs';
import { PAGES } from './seo/pages.mjs';
import { buildMd } from './seo/lib.mjs';

const START = '<!-- CATALOGO:START -->';
const END = '<!-- CATALOGO:END -->';
const CATALOGO = join(ROOT, 'src/catalogo.html');
const ECO_DATA = join(ROOT, 'src/js/eco-nav.data.js');
const MD = join(ROOT, 'public/catalogo.md');

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const I = (n) => ' '.repeat(n);
const num = (p) => String(p.order).padStart(2, '0');

/** Linha "Natureza: X · Temas: a, b" do cartão (D5, D7). */
function meta(n, temas) {
  const partes = [`Natureza: ${NATUREZAS[n.natureza]}`];
  if (n.temas?.length) partes.push(`Temas: ${n.temas.map((t) => temas[t].nome).join(', ')}`);
  return partes.join(' · ');
}

/** Um cartão. Mesmo markup do catálogo escrito à mão (RF-F1-14), mais a linha de meta. */
function cartao({ href, tag, titulo, descricao, selo, metaTexto, chamada }) {
  const L = [];
  L.push(`${I(24)}<a href="${esc(href)}" class="card-glass p-6 rounded-2xl flex flex-col h-full">`);
  L.push(`${I(28)}<span class="category-tag">${esc(tag)}</span>`);
  L.push(`${I(28)}<h3 class="text-xl font-bold text-white mb-3">${esc(titulo)}</h3>`);
  L.push(`${I(28)}<p class="text-gray-400 text-sm leading-relaxed flex-grow">${esc(descricao)}</p>`);
  if (selo) {
    const icone = selo.direcao === 'sobe' ? 'fa-arrow-turn-up' : 'fa-arrow-turn-down';
    L.push(`${I(28)}<span class="crosslink"><i class="fa-solid ${icone}" aria-hidden="true"></i> ${esc(selo.texto)}</span>`);
  }
  if (metaTexto) L.push(`${I(28)}<p class="card-meta text-gray-400 text-xs mt-4">${esc(metaTexto)}</p>`);
  L.push(`${I(28)}<span class="text-blue-400 text-xs font-semibold mt-4">${esc(chamada || 'Acessar conteúdo →')}</span>`);
  L.push(`${I(24)}</a>`);
  return L.join('\n');
}

const cartaoNo = (eco, temas, n) => cartao({
  href: hrefOf(eco, n.file),
  tag: cardTag(n),
  titulo: cardTitle(n),
  descricao: n.descricao,
  selo: n.selo,
  metaTexto: meta(n, temas),
  chamada: n.chamada,
});

function secao({ id, eyebrow, titulo, numero, resumo, cartoes }) {
  const L = [];
  L.push(`${I(16)}<section id="${id}" class="anchor-target" aria-labelledby="${id}-title">`);
  L.push(`${I(20)}<header class="mb-10">`);
  L.push(`${I(24)}<div class="pillar-head">`);
  if (numero) L.push(`${I(28)}<span class="pillar-num gradient-text" aria-hidden="true">${numero}</span>`);
  L.push(`${I(28)}<div>`);
  L.push(`${I(32)}<p class="pillar-eyebrow">${esc(eyebrow)}</p>`);
  L.push(`${I(32)}<h2 id="${id}-title" class="text-3xl font-bold text-white section-title">${esc(titulo)}</h2>`);
  L.push(`${I(28)}</div>`);
  L.push(`${I(24)}</div>`);
  L.push(`${I(24)}<p class="pillar-summary mt-5">${esc(resumo)}</p>`);
  L.push(`${I(20)}</header>`);
  L.push(`${I(20)}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
  L.push(...cartoes);
  L.push(`${I(20)}</div>`);
  L.push(`${I(16)}</section>`);
  return L.join('\n');
}

const conector = (texto) => [
  `${I(16)}<div class="eco-connector" aria-hidden="true">`,
  `${I(20)}<span class="line"></span>`,
  `${I(20)}<span>${esc(texto)}</span>`,
  `${I(20)}<i class="fa-solid fa-chevron-down" style="color: var(--eco-accent-soft);"></i>`,
  `${I(16)}</div>`,
].join('\n');

/** O bloco entre os marcadores do catálogo (sem os marcadores). */
export function renderCatalogo({ eco, temas }) {
  const L = [];
  L.push(`${I(12)}<!-- Gerado por scripts/gen-catalogo.mjs a partir de specs/ecosystem.nav.yaml. Não edite à mão. -->`);
  L.push(`${I(12)}<nav aria-label="Jornada do ecossistema em quatro pilares" class="mb-24">`);
  L.push(`${I(16)}<ol class="journey">`);
  for (const p of eco.pillars) {
    L.push(`${I(20)}<li>`);
    L.push(`${I(24)}<a href="#${p.id}" class="journey-step">`);
    L.push(`${I(28)}<span class="journey-badge" aria-hidden="true">${num(p)}</span>`);
    L.push(`${I(28)}<span class="journey-eyebrow">${esc(p.subtitle)}</span>`);
    L.push(`${I(28)}<span class="journey-label">${esc(p.label)}</span>`);
    L.push(`${I(24)}</a>`);
    L.push(`${I(20)}</li>`);
  }
  L.push(`${I(16)}</ol>`);
  L.push(`${I(12)}</nav>`);
  L.push('');
  L.push(`${I(12)}<div class="space-y-10">`);
  for (const p of eco.pillars) {
    L.push('');
    if (p.conector) { L.push(conector(p.conector)); L.push(''); }
    L.push(`${I(16)}<!-- ${p.id.toUpperCase()} · ${esc(p.label)} -->`);
    L.push(secao({
      id: p.id, eyebrow: p.subtitle, titulo: p.label, numero: num(p), resumo: p.resumo,
      cartoes: p.nodes.filter((s) => eco.nodes[s].catalogo !== false).map((s) => cartaoNo(eco, temas, eco.nodes[s])),
    }));
  }
  // RF-F1-15: trajetória e vídeos, depois dos pilares (corrige DV-2).
  const ent = Object.fromEntries(eco.entradas.map((e) => [e.id, e]));
  const entradaCartao = (e) => cartao({
    href: hrefOf(eco, e.file), tag: e.label, titulo: e.titulo, descricao: e.descricao, chamada: e.chamada,
  });
  L.push('');
  L.push(`${I(16)}<!-- Trajetória e vídeos -->`);
  L.push(secao({
    id: 'trajetoria', eyebrow: 'Quem escreve', titulo: 'Trajetória e vídeos',
    resumo: 'A trajetória profissional, as narrativas pessoais e os vídeos do canal.',
    cartoes: [
      entradaCartao(ent.curriculo),
      ...eco.trajetoria.map((s) => cartaoNo(eco, temas, eco.nodes[s])),
      entradaCartao(ent.videos),
    ],
  }));
  L.push('');
  L.push(`${I(12)}</div>`);
  return `\n${L.join('\n')}\n${I(12)}`;
}

/** src/js/eco-nav.data.js — dados do <eco-nav> (RF-F1-18). */
export function renderEcoNavData({ eco }) {
  const pilares = eco.pillars.map((p) => ({
    id: p.id, n: num(p), label: p.label, subtitle: p.subtitle, summary: p.summary,
    nodes: p.nodes.filter((s) => eco.nodes[s].catalogo !== false),
  }));
  const nodes = {};
  for (const p of pilares) {
    for (const s of p.nodes) {
      const n = eco.nodes[s];
      nodes[s] = { file: n.file, title: n.label || n.title, blurb: n.blurb };
    }
  }
  const data = {
    version: eco.meta.version,
    base: eco.meta.canonical_base,
    pillars: pilares,
    nodes,
    crosslinks: eco.crosslinks.map((c) => ({ from: c.from, to: c.to, rationale: c.rationale })),
  };
  return [
    '/*',
    ' * GERADO por scripts/gen-catalogo.mjs a partir de specs/ecosystem.nav.yaml.',
    ' * Não edite à mão: edite o YAML e rode `node scripts/gen-catalogo.mjs`.',
    ' * Lido por src/js/eco-nav.js. Spec: SDD-F1-F1b.md, RF-F1-18.',
    ' */',
    `export const DATA = ${JSON.stringify(data, null, 2)};`,
    '',
  ].join('\n');
}

/** public/catalogo.md — buildMd sobre a entrada de pages.mjs, cujas seções vêm do YAML. */
export function renderMd() {
  return buildMd(PAGES.find((p) => p.slug === 'catalogo'));
}

/** Conteúdo entre os marcadores, ou null se faltar algum. */
export function extrair(html) {
  const a = html.indexOf(START);
  const b = html.indexOf(END);
  if (a === -1 || b === -1 || b < a) return null;
  return html.slice(a + START.length, b);
}

function main() {
  const check = process.argv.includes('--check');
  const dados = loadEcossistema();
  const erros = validar(dados);
  if (erros.length) {
    console.error(`✗ [catalogo] specs/ecosystem.nav.yaml inválido:\n  ${erros.join('\n  ')}`);
    process.exit(1);
  }

  const html = readFileSync(CATALOGO, 'utf8');
  const atual = extrair(html);
  if (atual === null) {
    console.error(`✗ [catalogo] marcadores ${START} / ${END} ausentes em src/catalogo.html`);
    process.exit(1);
  }
  const alvos = [
    [CATALOGO, html, html.replace(START + atual + END, START + renderCatalogo(dados) + END)],
    [ECO_DATA, (() => { try { return readFileSync(ECO_DATA, 'utf8'); } catch { return ''; } })(), renderEcoNavData(dados)],
    [MD, (() => { try { return readFileSync(MD, 'utf8'); } catch { return ''; } })(), renderMd()],
  ];
  const divergentes = alvos.filter(([, antes, depois]) => antes !== depois);
  if (check) {
    if (divergentes.length) {
      console.error(`✗ [catalogo] fora de sincronia com o YAML: ${divergentes.map(([f]) => f.slice(ROOT.length + 1)).join(', ')}` +
        '\n  rode: node scripts/gen-catalogo.mjs');
      process.exit(1);
    }
    console.log('✓ [catalogo] catálogo, eco-nav.data.js e catalogo.md em dia');
    return;
  }
  for (const [f, , depois] of divergentes) writeFileSync(f, depois, 'utf8');
  console.log(`✓ [catalogo] ${divergentes.length} arquivo(s) atualizado(s)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
