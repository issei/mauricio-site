#!/usr/bin/env node
/*
 * Cabeçalho comum do site (F1b) — insere, em toda página que tem os marcadores:
 *   <!-- SITE-HEADER-CSS:START --> … <!-- SITE-HEADER-CSS:END -->  no <head> (CSS inline)
 *   <!-- SITE-HEADER:START --> … <!-- SITE-HEADER:END -->          no <body> (HTML + script)
 *
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 2, RF-F1b-01 a RF-F1b-17).
 * Padrão de acessibilidade: A11Y-DECISIONS.md ("Cabeçalho comum do site", "Menu do
 * cabeçalho no celular").
 *
 * Rótulos e destinos vêm da seção `entradas` de specs/ecosystem.nav.yaml. O gêmeo
 * /en/ recebe os rótulos em inglês (`label_en`) direto daqui, sem passar pelo Argos
 * (decisão Q9): o bloco leva translate="no", o tradutor o copia intacto e o
 * scripts/sync-i18n.mjs roda este gerador depois de traduzir.
 *
 * Os marcadores nunca são consumidos. Página sem marcadores é ignorada: a adoção é
 * por lotes (F1b.5), e o espelho /en/ ganha os marcadores ao ser retraduzido.
 *
 * Uso: node scripts/gen-cabecalho.mjs [--check]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadEcossistema, ROOT } from './catalogo/dados.mjs';

export const MARCAS = {
  css: ['<!-- SITE-HEADER-CSS:START -->', '<!-- SITE-HEADER-CSS:END -->'],
  html: ['<!-- SITE-HEADER:START -->', '<!-- SITE-HEADER:END -->'],
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** href absoluto de uma entrada: '/', '/curriculo.html'…; no /en/, '/en/…' (exceto vídeos, sem gêmeo). */
export function hrefEntrada(e, lang) {
  if (e.file.startsWith('/')) return e.file;
  const base = lang === 'en' ? '/en/' : '/';
  return e.file === 'index.html' ? base : `${base}${e.file}`;
}

/**
 * Área de uma página (RF-F1b-03): devolve { id, atual } onde id é a entrada marcada e
 * atual é 'page' (a própria entrada) ou 'true' (página da área), ou null.
 * `rel` é o caminho relativo a src/, sem o prefixo en/.
 */
export function areaDe(rel, eco) {
  const slug = rel.replace(/\.html$/, '');
  for (const e of eco.entradas) {
    if (!e.file.startsWith('/') && e.file === rel) return { id: e.id, atual: 'page' };
    if (e.file.startsWith('/') && e.file.slice(1) === rel) return { id: e.id, atual: 'page' };
  }
  // Assunto (temas/) é descoberta de conteúdo: lista artigos do site antes dos
  // vídeos e é alcançada pela home e pelo catálogo. Fica em Conteúdos; só a
  // página de um vídeo fica em Vídeos.
  if (rel.startsWith('temas/')) return { id: 'catalogo', atual: 'true' };
  if (rel.startsWith('videos/')) return { id: 'videos', atual: 'true' };
  if (eco.trajetoria.includes(slug)) return { id: 'curriculo', atual: 'true' };
  if (eco.nodes[slug]?.pillar) return { id: 'catalogo', atual: 'true' };
  return null;
}

// Seletores com .sh na frente: vencem regras de página como `.x-body a` (sublinhado, cor do link).
export const CSS = [
  ':root{--sh-altura:3.5rem}',
  'html{scroll-padding-top:calc(var(--sh-altura) + 1rem)}',
  '.sh{position:sticky;top:0;z-index:2147482000;height:var(--sh-altura);background:rgba(13,17,23,.94);',
  '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.08);',
  'font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.2}',
  '.sh .sh-in{position:relative;box-sizing:border-box;max-width:72rem;height:100%;margin:0 auto;padding:0 1rem;',
  'display:flex;align-items:center;justify-content:space-between;gap:1rem}',
  // área de toque de 44 px também na marca (a página apresentacao exige 44 px em todo alvo)
  '.sh .sh-marca{display:inline-flex;align-items:center;min-height:2.75rem;color:#fff;font-weight:700;font-size:1rem;letter-spacing:-.01em;text-decoration:none;white-space:nowrap}',
  '.sh .sh-marca:hover{color:#58a6ff;text-decoration:none}',
  '.sh .sh-lista{display:flex;gap:.25rem;list-style:none;margin:0;padding:0}',
  '.sh .sh-lista a{display:inline-flex;align-items:center;min-height:2.75rem;padding:0 .75rem;border-radius:8px;',
  'color:#c9d1d9;font-size:.9rem;font-weight:500;text-decoration:none;white-space:nowrap}',
  '.sh .sh-lista a:hover{color:#fff;background:rgba(255,255,255,.06);text-decoration:none}',
  '.sh .sh-lista a[aria-current]{color:#fff;box-shadow:inset 0 -2px 0 #58a6ff}',
  '.sh a:focus-visible,.sh .sh-botao:focus-visible{outline:2px solid #58a6ff;outline-offset:2px}',
  '.sh .sh-botao{display:none}',
  // Buscar (SDD-catalogo-videos-e-busca RF-BU-01): sem JS é link para /busca; com JS vira botão que abre o diálogo.
  '.sh .sh-nav{order:2;margin-left:auto}',
  '.sh .sh-busca{order:3;display:inline-flex;align-items:center;min-height:2.75rem;padding:0 .9rem;border:1px solid rgba(255,255,255,.35);border-radius:8px;',
  'background:transparent;color:#fff;font:inherit;font-size:.9rem;font-weight:600;text-decoration:none;cursor:pointer;white-space:nowrap}',
  '.sh .sh-busca:hover{border-color:#58a6ff;color:#fff;text-decoration:none}',
  '@media (max-width:639.98px){',
  '.sh .sh-marca{font-size:.9rem;white-space:normal;line-height:1.15;min-width:0}',
  '.sh .sh-in{gap:.5rem}',
  '.sh:not(.sh-js){height:auto;min-height:var(--sh-altura)}',
  '.sh:not(.sh-js) .sh-in{flex-wrap:wrap;gap:0 1rem;padding:.25rem 1rem}',
  '.sh .sh-busca{order:0;margin-left:auto;padding:0 .7rem;font-size:.85rem}',
  '.sh .sh-nav{order:0;margin-left:0}',
  '.sh.sh-js .sh-nav{margin-left:-1rem}',
  '.sh.sh-js .sh-botao{margin-left:0;display:inline-flex;align-items:center;min-height:2.75rem;padding:0 .9rem;border-radius:8px;',
  'border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;font:inherit;font-size:.9rem;',
  'font-weight:600;cursor:pointer}',
  '.sh.sh-js .sh-lista{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;',
  'padding:.5rem 1rem 1rem;background:#0d1117;border-bottom:1px solid rgba(255,255,255,.12)}',
  '.sh.sh-js.sh-aberto .sh-lista{display:flex}',
  '}',
].join('');

// Classic script (não module): roda assim que o cabeçalho é lido, sem esperar o resto.
export const JS = [
  '(function(){var h=document.querySelector(".sh");if(!h)return;',
  // Buscar: troca o link por botão e carrega /js/busca.js só no primeiro uso; "/" abre a busca fora de campos de texto.
  'var q=h.querySelector(".sh-busca");if(q){var qb=document.createElement("button");qb.type="button";qb.className="sh-busca";qb.textContent=q.textContent;qb.setAttribute("aria-haspopup","dialog");q.replaceWith(qb);',
  'qb.addEventListener("click",function(){import("/js/busca.js").then(function(m){m.abrir(qb);});});',
  'document.addEventListener("keydown",function(e){var t=e.target;if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey)return;',
  'if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;e.preventDefault();qb.click();});}',
  'var b=h.querySelector(".sh-botao"),l=h.querySelector(".sh-lista");if(!b||!l)return;',
  'h.classList.add("sh-js");',
  'function abre(v,foco){h.classList.toggle("sh-aberto",v);b.setAttribute("aria-expanded",v?"true":"false");if(!v&&foco)b.focus();}',
  'b.addEventListener("click",function(){abre(b.getAttribute("aria-expanded")!=="true");});',
  'h.addEventListener("keydown",function(e){if(e.key==="Escape"&&h.classList.contains("sh-aberto")){e.preventDefault();abre(false,true);}});',
  'h.addEventListener("focusout",function(e){if(!h.contains(e.relatedTarget))abre(false);});',
  'l.addEventListener("click",function(e){if(e.target.closest("a"))abre(false);});',
  '})();',
].join('');

/** O bloco do <body> (sem os marcadores). */
export function renderCabecalho(eco, lang, area) {
  const en = lang === 'en';
  const itens = eco.entradas.map((e) => {
    const cur = area && area.id === e.id ? ` aria-current="${area.atual}"` : '';
    return `<li><a href="${hrefEntrada(e, lang)}"${cur}>${esc(en ? e.label_en : e.label)}</a></li>`;
  });
  return [
    '',
    `<header class="sh" translate="no"><div class="sh-in">`,
    `<a class="sh-marca" href="${en ? '/en/' : '/'}">Maurício Yokoyama Issei</a>`,
    `<a class="sh-busca" href="/busca">${en ? 'Search' : 'Buscar'}</a>`,
    `<button class="sh-botao" type="button" aria-expanded="false" aria-controls="sh-lista">Menu</button>`,
    `<nav class="sh-nav" aria-label="${en ? 'Site navigation' : 'Navegação do site'}"><ul id="sh-lista" class="sh-lista">${itens.join('')}</ul></nav>`,
    `</div></header>`,
    `<script>${JS}</script>`,
    '',
  ].join('\n');
}

export const renderCss = () => `\n<style id="sh-css">${CSS}</style>\n`;

function trocar(html, [ini, fim], conteudo) {
  const a = html.indexOf(ini);
  const b = html.indexOf(fim);
  if (a === -1 || b === -1 || b < a) return null;
  return html.slice(0, a + ini.length) + conteudo + html.slice(b);
}

/** Aplica os dois blocos a um HTML. Devolve null se a página não tem os marcadores. */
export function aplicar(html, eco, rel) {
  if (!html.includes(MARCAS.html[0])) return null;
  const lang = rel.startsWith('en/') ? 'en' : 'pt';
  const area = areaDe(lang === 'en' ? rel.slice(3) : rel, eco);
  let out = trocar(html, MARCAS.html, renderCabecalho(eco, lang, area));
  if (out === null) throw new Error(`${rel}: marcadores SITE-HEADER incompletos`);
  if (out.includes(MARCAS.css[0])) {
    out = trocar(out, MARCAS.css, renderCss());
    if (out === null) throw new Error(`${rel}: marcadores SITE-HEADER-CSS incompletos`);
  } else {
    throw new Error(`${rel}: tem SITE-HEADER mas falta SITE-HEADER-CSS no <head>`);
  }
  return out;
}

function listarHtml(dir, out = []) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) listarHtml(p, out);
    else if (nome.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Arquivos com marcadores e o conteúdo esperado de cada um. */
export function planejar() {
  const { eco } = loadEcossistema();
  const src = join(ROOT, 'src');
  const plano = [];
  for (const f of listarHtml(src)) {
    const rel = relative(src, f).split(sep).join('/');
    const antes = readFileSync(f, 'utf8');
    const depois = aplicar(antes, eco, rel);
    if (depois !== null) plano.push({ f, rel, antes, depois });
  }
  return plano;
}

function main() {
  const check = process.argv.includes('--check');
  const plano = planejar();
  const divergentes = plano.filter((p) => p.antes !== p.depois);
  if (check) {
    if (divergentes.length) {
      console.error(`✗ [cabecalho] ${divergentes.length} página(s) fora de sincronia: ${divergentes.map((p) => p.rel).join(', ')}` +
        '\n  rode: node scripts/gen-cabecalho.mjs');
      process.exit(1);
    }
    console.log(`✓ [cabecalho] ${plano.length} página(s) em dia`);
    return;
  }
  for (const p of divergentes) writeFileSync(p.f, p.depois, 'utf8');
  console.log(`✓ [cabecalho] ${divergentes.length} de ${plano.length} página(s) atualizada(s)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
