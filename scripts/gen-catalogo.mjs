#!/usr/bin/env node
/*
 * Catálogo gerado — escreve, a partir de specs/ecosystem.nav.yaml:
 *   1. src/catalogo.html, entre <!-- CATALOGO:START --> e <!-- CATALOGO:END -->
 *      (índice dos 10 temas, uma seção por tema e a seção "Carreira e vídeos");
 *   2. public/catalogo.md (gêmeo Markdown, via buildMd de scripts/seo/lib.mjs).
 *
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 1, RF-F1-12 a RF-F1-18; Parte 8,
 * RF-F8-03 a RF-F8-05: os temas no lugar dos pilares).
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
  loadEcossistema, validar, ROOT, NATUREZAS, cardTitle, hrefOf, temasDoSite,
} from './catalogo/dados.mjs';
import { PAGES } from './seo/pages.mjs';
import { buildMd } from './seo/lib.mjs';

const START = '<!-- CATALOGO:START -->';
const END = '<!-- CATALOGO:END -->';
const CATALOGO = join(ROOT, 'src/catalogo.html');
const MD = join(ROOT, 'public/catalogo.md');

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const I = (n) => ' '.repeat(n);

/**
 * Linha "Natureza: X · Também em: a, b" do cartão (D5, D7). O cartão já está na seção do seu
 * tema principal; a linha cita só os outros temas.
 */
function meta(n, temas, temaDaSecao) {
  const partes = [`Natureza: ${NATUREZAS[n.natureza]}`];
  const outros = (n.temas ?? []).filter((t) => t !== temaDaSecao);
  if (outros.length) partes.push(`Também em: ${outros.map((t) => temas[t].nome).join(', ')}`);
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

const cartaoNo = (eco, temas, n, temaDaSecao) => cartao({
  href: hrefOf(eco, n.file),
  tag: n.kind,
  titulo: cardTitle(n),
  descricao: n.descricao,
  selo: n.selo,
  metaTexto: meta(n, temas, temaDaSecao),
  chamada: n.chamada,
});

function secao({ id, eyebrow, titulo, resumo, cartoes, depois = [] }) {
  const L = [];
  L.push(`${I(16)}<section id="${id}" class="anchor-target" aria-labelledby="${id}-title">`);
  L.push(`${I(20)}<header class="mb-10">`);
  L.push(`${I(24)}<div class="pillar-head">`);
  L.push(`${I(28)}<div>`);
  L.push(`${I(32)}<p class="pillar-eyebrow">${esc(eyebrow)}</p>`);
  L.push(`${I(32)}<h2 id="${id}-title" class="text-3xl font-bold text-white section-title">${esc(titulo)}</h2>`);
  L.push(`${I(28)}</div>`);
  L.push(`${I(24)}</div>`);
  L.push(`${I(24)}<p class="pillar-summary mt-5">${esc(resumo)}</p>`);
  L.push(`${I(20)}</header>`);
  if (cartoes.length) {
    L.push(`${I(20)}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
    L.push(...cartoes);
    L.push(`${I(20)}</div>`);
  }
  L.push(...depois);
  L.push(`${I(16)}</section>`);
  return L.join('\n');
}

const LINK = 'text-blue-400 underline underline-offset-2';
const plural = (n) => `${n} ${n === 1 ? 'conteúdo' : 'conteúdos'}`;

/** O bloco entre os marcadores do catálogo (sem os marcadores). */
export function renderCatalogo({ eco, temas }) {
  const L = [];
  L.push(`${I(12)}<!-- Gerado por scripts/gen-catalogo.mjs a partir de specs/ecosystem.nav.yaml. Não edite à mão. -->`);
  const grupos = temasDoSite({ eco, temas });
  // RF-F8-05: índice dos temas no lugar da trilha dos pilares.
  L.push(`${I(12)}<nav aria-label="Temas" class="mb-20">`);
  L.push(`${I(16)}<ul class="flex flex-wrap justify-center gap-3">`);
  for (const t of grupos) {
    L.push(`${I(20)}<li><a href="#tema-${t.id}" class="inline-flex items-center min-h-[44px] px-4 rounded-full border border-white/15 text-gray-200 hover:border-blue-400 hover:text-white">${esc(t.nome)} <span class="ml-2 text-gray-400 text-sm">${t.total}</span></a></li>`);
  }
  L.push(`${I(16)}</ul>`);
  L.push(`${I(12)}</nav>`);
  L.push('');
  L.push(`${I(12)}<div class="space-y-10">`);
  for (const t of grupos) {
    const depois = [];
    if (t.secundarios.length) {
      const links = t.secundarios.map((s) => `<a href="${esc(hrefOf(eco, eco.nodes[s].file))}" class="${LINK}">${esc(cardTitle(eco.nodes[s]))}</a>`);
      depois.push(`${I(20)}<p class="text-gray-300 text-sm leading-relaxed mt-6">Também tratam deste tema: ${links.join(', ')}.</p>`);
    }
    depois.push(`${I(20)}<p class="text-sm mt-4"><a href="/temas/${t.id}" class="${LINK}">Artigos e vídeos sobre ${esc(t.nome.toLowerCase())} →</a></p>`);
    L.push('');
    L.push(`${I(16)}<!-- Tema: ${esc(t.nome)} -->`);
    L.push(secao({
      id: `tema-${t.id}`, eyebrow: plural(t.total), titulo: t.nome, resumo: t.resumo,
      cartoes: t.principais.map((s) => cartaoNo(eco, temas, eco.nodes[s], t.id)),
      depois,
    }));
  }
  // RF-F1-15: carreira e vídeos, depois dos temas (corrige DV-2).
  const ent = Object.fromEntries(eco.entradas.map((e) => [e.id, e]));
  const entradaCartao = (e) => cartao({
    href: hrefOf(eco, e.file), tag: e.label, titulo: e.titulo, descricao: e.descricao, chamada: e.chamada,
  });
  L.push('');
  L.push(`${I(16)}<!-- Carreira e vídeos -->`);
  L.push(secao({
    id: 'trajetoria', eyebrow: 'Quem escreve', titulo: 'Carreira e vídeos',
    resumo: 'A carreira profissional, as narrativas pessoais e os vídeos do canal.',
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
    [MD, (() => { try { return readFileSync(MD, 'utf8'); } catch { return ''; } })(), renderMd()],
  ];
  const divergentes = alvos.filter(([, antes, depois]) => antes !== depois);
  if (check) {
    if (divergentes.length) {
      console.error(`✗ [catalogo] fora de sincronia com o YAML: ${divergentes.map(([f]) => f.slice(ROOT.length + 1)).join(', ')}` +
        '\n  rode: node scripts/gen-catalogo.mjs');
      process.exit(1);
    }
    console.log('✓ [catalogo] catálogo e catalogo.md em dia');
    return;
  }
  for (const [f, , depois] of divergentes) writeFileSync(f, depois, 'utf8');
  console.log(`✓ [catalogo] ${divergentes.length} arquivo(s) atualizado(s)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
