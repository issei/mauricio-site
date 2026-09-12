#!/usr/bin/env node
/*
 * Toda URL que o sitemap oferece tem um gêmeo Markdown publicado.
 * Spec: docs/specs/AGENT_READINESS_POR_PAGINA.md (D6).
 *
 * A function de edge reescreve `Accept: text/markdown` para `<caminho>.md` por
 * REGRA, sem conferir se o arquivo existe — um .md ausente vira 404 para o
 * agente. Esta etapa, depois do build, é o que torna a regra segura.
 *
 * Lê dist/ (o que de fato vai para o S3), não src/: o sitemap gerado é a fonte
 * da verdade do que é oferecido.
 *
 * Uso: node scripts/check-md-twins.mjs   (depois de `vite build`)
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const caminhos = [...readFileSync(join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(/\/$/, '').replace(/\.html$/, ''));

// Mesma regra de `baseDaPagina` em infra/cloudfront-functions/viewer-request.js.
const gemeo = (p) => (p === '' ? '/index' : p === '/en' ? '/en/index' : p) + '.md';
const faltando = caminhos.map(gemeo).filter((md) => !existsSync(join(DIST, md)));

if (faltando.length) {
  console.error(`✗ ${faltando.length} página(s) do sitemap sem gêmeo .md em dist/:\n  ${faltando.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${caminhos.length} páginas do sitemap com gêmeo .md`);
