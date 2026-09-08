/**
 * Gate da função de edge: cada caso aqui é uma URL que o Search Console viu
 * 404 ou uma que já respondia 200 e não pode regredir.
 *
 * A função roda no CloudFront (cloudfront-js-2.0) e não exporta nada — o teste
 * lê o arquivo e o avalia num escopo isolado, do mesmo jeito que o runtime faz.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const fonte = readFileSync(
  new URL('../infra/cloudfront-functions/viewer-request.js', import.meta.url),
  'utf8'
);
const contexto = vm.createContext({});
vm.runInContext(fonte, contexto);

const rota = (uri, accept) =>
  contexto.handler({
    request: { uri, headers: accept ? { accept: { value: accept } } : {} },
  }).uri;

const CASOS = [
  // [entrada, saída esperada, accept]
  ['/', '/index.html'],
  ['/devin', '/devin.html'],
  ['/devin.html', '/devin.html'],              // link .html existente não quebra
  ['/devin/', '/devin.html'],                  // barra final
  ['/catalogo', '/catalogo.html'],
  ['/service-operations-2-0', '/service-operations-2-0.html'],
  ['/lifeos/', '/lifeos.html'],
  ['/assets/devin-BRjrEIyn.js', '/assets/devin-BRjrEIyn.js'],
  ['/fotos/1982.jpeg', '/fotos/1982.jpeg'],
  ['/sitemap.xml', '/sitemap.xml'],
  ['/llms.txt', '/llms.txt'],
  ['/robots.txt', '/robots.txt'],
  // Nomes IANA sem extensão: sufixar .html quebraria a descoberta por agentes.
  ['/.well-known/api-catalog', '/.well-known/api-catalog'],
  ['/.well-known/openid-configuration', '/.well-known/openid-configuration'],
  ['/.well-known/agent-card.json', '/.well-known/agent-card.json'],
  // Negociação de conteúdo.
  ['/', '/index.md', 'text/markdown'],
  ['/devin', '/devin.md', 'text/markdown'],
  ['/devin.html', '/devin.md', 'text/markdown'],
  ['/', '/index.html', 'text/html,application/xhtml+xml,*/*;q=0.8'],
  ['/devin', '/devin.html', 'text/html,application/xhtml+xml,*/*;q=0.8'],
  ['/agent-ready', '/agent-ready.md', 'text/markdown'],
  ['/agent-ready', '/agent-ready.html', 'text/html,application/xhtml+xml,*/*;q=0.8'],
  ['/agent-ready', '/agent-ready.html'],
  // Sem .md publicado: cai no HTML em vez de 404.
  ['/catalogo', '/catalogo.html', 'text/markdown'],
];

for (const [entrada, esperado, accept] of CASOS) {
  test(`${entrada}${accept ? ` [${accept}]` : ''} → ${esperado}`, () => {
    assert.equal(rota(entrada, accept), esperado);
  });
}
