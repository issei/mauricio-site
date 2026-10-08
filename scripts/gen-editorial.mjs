#!/usr/bin/env node
/*
 * Camada editorial — injeta a orientação de entrada e a continuação de leitura
 * nas páginas listadas em scripts/editorial/editorial.data.mjs.
 *
 * Spec: docs/specs/editorial/EDITORIAL-LAYER.md.
 *
 * Marcadores (o autor posiciona; o gerador só preenche entre eles):
 *   <!-- EDITORIAL:START --> … <!-- EDITORIAL:END -->            orientação
 *   <!-- EDITORIAL-NEXT:START --> … <!-- EDITORIAL-NEXT:END -->  continuação
 *
 * Os marcadores NUNCA são consumidos. O build-aeo.mjs aprendeu isso do jeito
 * difícil: um marcador que vira bloco some na regeneração seguinte e a posição
 * escolhida pelo autor se perde em silêncio.
 *
 * Tempo de leitura é CALCULADO, nunca digitado — mesma régua de 200 ppm de
 * scripts/gen-hub-data.mjs, contada só sobre a prosa de <main> (blocos <pre>,
 * <script>, <style>, <svg> e a própria camada ficam de fora: código não se lê
 * em palavras por minuto).
 *
 * Uso: node scripts/gen-editorial.mjs [slug ...] [--check]
 *   --check  não grava; sai ≠0 se algum bloco divergir da fonte.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EDITORIAL } from './editorial/editorial.data.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WPM = 200;

const args = process.argv.slice(2);
const check = args.includes('--check');
const only = args.filter((a) => !a.startsWith('--'));

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ── Medição ─────────────────────────────────────────────────────────────────

/** Remove as regiões geradas pela própria camada — o bloco não conta o bloco. */
export function stripEditorial(html) {
  return html
    .replace(/<!-- EDITORIAL:START[\s\S]*?<!-- EDITORIAL:END -->/g, '')
    .replace(/<!-- EDITORIAL-NEXT:START[\s\S]*?<!-- EDITORIAL-NEXT:END -->/g, '');
}

/** Palavras de prosa visível de um trecho de HTML. */
export function countWords(fragment) {
  const text = fragment
    .replace(/<(script|style|svg|pre|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ');
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

export const minutes = (words) => Math.max(1, Math.round(words / WPM));

/**
 * O elemento que carrega `id`, do `<tag` de abertura ao fechamento correspondente.
 * Conta a profundidade só da mesma tag — basta para <section>/<div>/<article>,
 * que é onde as páginas põem os ids de seção.
 */
export function elementById(html, id) {
  const at = html.search(new RegExp(`<([a-z][a-z0-9-]*)\\b[^>]*\\bid="${id}"`, 'i'));
  if (at === -1) return null;
  const tag = /^<([a-z][a-z0-9-]*)/i.exec(html.slice(at))[1].toLowerCase();
  const re = new RegExp(`<${tag}\\b|</${tag}>`, 'gi');
  re.lastIndex = at;
  let depth = 0;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(at, m.index + m[0].length);
  }
  return null;
}

/** Texto de <main> — o que o visitante lê, sem navegação nem rodapé global. */
function mainOf(html) {
  const m = /<main\b[\s\S]*<\/main>/i.exec(html);
  return m ? m[0] : html;
}

/** Tempo da ideia central, tempo completo e tempo do "Em síntese". */
export function measure(html, entry) {
  const clean = stripEditorial(html);
  const total = minutes(countWords(mainOf(clean)));
  const coreWords = (entry.core || []).reduce((sum, id) => {
    const el = elementById(clean, id);
    if (!el) throw new Error(`seção core "#${id}" não existe`);
    return sum + countWords(el);
  }, 0);
  const core = coreWords ? minutes(coreWords) : null;
  const tldr = /<div class="aeo-tldr"[\s\S]*?<\/div>/.exec(clean);
  return { total, core, summary: tldr ? minutes(countWords(tldr[0])) : null };
}

// ── Renderização ────────────────────────────────────────────────────────────

const link = ([href, label]) => `<a href="${esc(href)}">${esc(label)}</a>`;

/** Lista em prosa: "a, b e c". */
const joinPt = (items) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items.at(-1)}`;

export function renderIntro(slug, entry, m) {
  const time = m.core && m.core < m.total
    ? `~${m.core} min para a ideia central · ~${m.total} min completo`
    : `~${m.total} min`;

  const facts = [];
  if (entry.oneLiner) facts.push(['ed-fact ed-fact--wide', 'Em uma frase', esc(entry.oneLiner)]);
  if (entry.thesis) facts.push(['ed-fact ed-fact--wide', 'A tese', esc(entry.thesis)]);
  if (entry.audience) facts.push(['ed-fact ed-fact--wide', 'Para quem é', esc(entry.audience)]);
  facts.push(['ed-fact', 'Formato', esc(entry.kind)]);
  facts.push(['ed-fact', 'Profundidade', `${esc(entry.depth)} · ${time}`]);

  const out = [];
  out.push(`<!-- EDITORIAL:START — gerado por scripts/gen-editorial.mjs (NÃO editar à mão; fonte: scripts/editorial/editorial.data.mjs) -->`);
  out.push(`<div class="ed ed--${entry.placement}" data-editorial="${esc(slug)}">`);
  out.push(`  <dl class="ed-facts">`);
  for (const [cls, dt, dd] of facts) {
    out.push(`    <div class="${cls}"><dt>${dt}</dt><dd>${dd}</dd></div>`);
  }
  out.push(`  </dl>`);
  if (entry.routes?.length) {
    out.push(`  <nav class="ed-routes" aria-labelledby="ed-routes-label">`);
    out.push(`    <p class="ed-label" id="ed-routes-label">O que você vai encontrar</p>`);
    out.push(`    <ul>`);
    for (const r of entry.routes) {
      out.push(`      <li><span class="ed-mode">${esc(r.mode)}</span> ${joinPt(r.links.map(link))}: ${esc(r.note)}</li>`);
    }
    out.push(`    </ul>`);
    out.push(`  </nav>`);
  }
  if (entry.summary && m.summary) {
    out.push(`  <p class="ed-shortcut">Prefere o essencial antes? <a href="#em-sintese">Ler a síntese (~${m.summary} min)</a></p>`);
  }
  out.push(`</div>`);
  out.push(`<!-- EDITORIAL:END -->`);
  return out.join('\n');
}

export function renderNext(entry) {
  const out = [];
  out.push(`<!-- EDITORIAL-NEXT:START — gerado por scripts/gen-editorial.mjs (NÃO editar à mão) -->`);
  out.push(`<nav class="ed ed-next" aria-labelledby="ed-next-label">`);
  out.push(`  <p class="ed-label" id="ed-next-label">Se este tema interessa a você</p>`);
  out.push(`  <ul>`);
  for (const n of entry.next) {
    out.push(`    <li><a href="${esc(n.href)}">${esc(n.title)}</a> <span class="ed-why">${esc(n.why)}</span></li>`);
  }
  out.push(`  </ul>`);
  out.push(`</nav>`);
  out.push(`<!-- EDITORIAL-NEXT:END -->`);
  return out.join('\n');
}

/** Substitui o conteúdo entre os marcadores, preservando-os. */
function fill(html, name, block) {
  const re = new RegExp(`<!-- ${name}:START[\\s\\S]*?<!-- ${name}:END -->`);
  if (!re.test(html)) return null;
  return html.replace(re, () => block);
}

export function build(slug, html, entry = EDITORIAL[slug]) {
  const m = measure(html, entry);
  // Checkout no Windows com autocrlf traz CRLF: o bloco segue a quebra de linha
  // do arquivo, senão --check acusa divergência que é só de fim de linha.
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  const asFile = (block) => block.replace(/\n/g, eol);
  // Sem `kind` a entrada é só continuação (ex.: know): nada de orientação de entrada.
  let out = entry.kind ? fill(html, 'EDITORIAL', asFile(renderIntro(slug, entry, m))) : html;
  if (out === null) throw new Error(`${slug}: marcador <!-- EDITORIAL:START --> ausente`);
  if (entry.next?.length) {
    const withNext = fill(out, 'EDITORIAL-NEXT', asFile(renderNext(entry)));
    if (withNext === null) throw new Error(`${slug}: marcador <!-- EDITORIAL-NEXT:START --> ausente`);
    out = withNext;
  }
  return out;
}

// ── CLI ─────────────────────────────────────────────────────────────────────

// pathToFileURL: no Windows, `file://${argv[1]}` nunca bate com import.meta.url
// (barra invertida, sem a terceira barra) e o CLI — inclusive o --check do gate — não rodava.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const slugs = only.length ? only : Object.keys(EDITORIAL);
  const stale = [];
  for (const slug of slugs) {
    if (!EDITORIAL[slug]) { console.error(`✗ [editorial] ${slug} não está em editorial.data.mjs`); process.exit(1); }
    const file = join(ROOT, 'src', `${slug}.html`);
    if (!existsSync(file)) { console.error(`✗ [editorial] ${file} não existe`); process.exit(1); }
    const html = readFileSync(file, 'utf8');
    const next = build(slug, html);
    if (next === html) continue;
    if (check) stale.push(slug);
    else { writeFileSync(file, next); console.log(`✓ [editorial] src/${slug}.html`); }
  }
  if (check && stale.length) {
    console.error(`✗ [editorial] fora de dia: ${stale.join(', ')} — rode node scripts/gen-editorial.mjs`);
    process.exit(1);
  }
  console.log(`✓ [editorial] ${slugs.length} página(s) em dia`);
}
