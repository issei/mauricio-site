/**
 * Gate da função de edge: cada caso aqui é uma URL que o Search Console ou o
 * scanner de agent readiness viu falhar, ou uma que já respondia 200 e não
 * pode regredir. Spec: docs/specs/AGENT_READINESS_POR_PAGINA.md.
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

const executa = (uri, accept) =>
  contexto.handler({
    request: { uri, headers: accept ? { accept: { value: accept } } : {} },
  });
const rota = (uri, accept) => executa(uri, accept).uri;

const MD = 'text/markdown';
const NAVEGADOR = 'text/html,application/xhtml+xml,*/*;q=0.8';

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
  // `/en` é diretório: o sitemap o oferece e ele respondia 404 (`/en.html`).
  ['/en', '/en/index.html'],
  ['/en/', '/en/index.html'],
  ['/en/devin', '/en/devin.html'],
  // Nomes IANA sem extensão: sufixar .html ou .md quebraria a descoberta.
  ['/.well-known/api-catalog', '/.well-known/api-catalog'],
  ['/.well-known/api-catalog', '/.well-known/api-catalog', MD],
  ['/.well-known/openid-configuration', '/.well-known/openid-configuration'],
  ['/.well-known/agent-card.json', '/.well-known/agent-card.json'],
  ['/.well-known/oauth-protected-resource', '/.well-known/oauth-protected-resource'],
  // Negociação de conteúdo — por regra, inclusive páginas novas e todo o /en/.
  ['/', '/index.md', MD],
  ['/index.html', '/index.md', MD],
  ['/devin', '/devin.md', MD],
  ['/devin.html', '/devin.md', MD],
  ['/devin/', '/devin.md', MD],
  ['/agent-ready', '/agent-ready.md', MD],
  ['/case-agents.html', '/case-agents.md', MD],
  ['/curiosidade-e-investigacao', '/curiosidade-e-investigacao.md', MD],
  ['/catalogo', '/catalogo.md', MD],
  ['/career-highlights-star', '/career-highlights-star.md', MD],
  ['/en', '/en/index.md', MD],
  ['/en/devin', '/en/devin.md', MD],
  ['/en/devin.html', '/en/devin.md', MD],
  ['/llms', '/llms.txt', MD],
  ['/llms-full', '/llms-full.txt', MD],
  ['/assets/devin-BRjrEIyn.js', '/assets/devin-BRjrEIyn.js', MD],
  // Navegador continua recebendo HTML.
  ['/', '/index.html', NAVEGADOR],
  ['/devin', '/devin.html', NAVEGADOR],
  ['/en/devin', '/en/devin.html', NAVEGADOR],
  ['/case-agents', '/case-agents.html', NAVEGADOR],
];

for (const [entrada, esperado, accept] of CASOS) {
  test(`${entrada}${accept ? ` [${accept}]` : ''} → ${esperado}`, () => {
    assert.equal(rota(entrada, accept), esperado);
  });
}

// ── PRM por caminho (RFC 9728 §3.1) ─────────────────────────────────────────
// O body sintetizado tem que ser o PRM da raiz com `resource` trocado: se
// alguém mudar o arquivo e esquecer a function, este teste acusa.
const prmRaiz = JSON.parse(
  readFileSync(new URL('../public/.well-known/oauth-protected-resource', import.meta.url), 'utf8')
);

for (const caminho of ['/curiosidade-e-investigacao.html', '/devin', '/en', '/en/devin']) {
  test(`PRM por caminho: ${caminho}`, () => {
    const r = executa(`/.well-known/oauth-protected-resource${caminho}`);
    assert.equal(r.statusCode, 200);
    assert.match(r.headers['content-type'].value, /^application\/json/);
    assert.equal(r.body.encoding, 'text');
    assert.deepEqual(JSON.parse(r.body.data), {
      ...prmRaiz,
      resource: `https://mauricio.issei.com.br${caminho}`,
    });
  });
}

// Fora da forma de página: não sintetiza — segue para o S3 (404).
for (const lixo of ['/../x', '/<script>', '/%3Cscript%3E', '/a/b/c', '/Devin', '/x.js']) {
  test(`PRM por caminho rejeita ${lixo}`, () => {
    const uri = `/.well-known/oauth-protected-resource${lixo}`;
    const r = executa(uri);
    assert.equal(r.statusCode, undefined);
    assert.equal(r.uri, uri);
  });
}
