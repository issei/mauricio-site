/**
 * CloudFront Function ÚNICA de viewer-request.
 *
 * Uma cache behavior aceita UMA associação por tipo de evento. Manter
 * `HandlerExtentionHTML.js` e `markdown-negotiation.js` como funções separadas
 * significava escolher uma e perder a outra — foi o que aconteceu: a
 * negociação de Markdown ficou ativa e as URLs sem `.html` passaram a devolver
 * 404 (21 páginas em "Não encontrado" no Search Console, exatamente as do
 * sitemap). As responsabilidades vivem aqui, nesta ordem.
 *
 * Runtime: cloudfront-js-2.0
 * Evento:  viewer-request
 * Deploy:  publicada pelo `.github/workflows/deploy.yml` a cada push na main.
 * Spec:    docs/specs/AGENT_READINESS_POR_PAGINA.md
 *
 * Cache: a behavior precisa de uma Response Headers Policy com `Vary: Accept`,
 * senão o cache serve Markdown para navegador.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // ── 1. Normaliza a barra final ('/devin/' → '/devin'; a raiz continua '/') ──
  if (uri !== '/' && uri.endsWith('/')) {
    uri = uri.slice(0, -1);
  }

  // ── 2. PRM por caminho (RFC 9728 §3.1) ─────────────────────────────────────
  //
  // O agente deriva `/.well-known/oauth-protected-resource<caminho>` da URL que
  // quer acessar. Não dá para servir por arquivo: `oauth-protected-resource` já
  // é o arquivo da raiz e não pode ser também diretório. Só caminhos com forma
  // de página são aceitos — a function não reflete string arbitrária.
  if (uri.indexOf(PRM_PATH + '/') === 0) {
    var recurso = uri.slice(PRM_PATH.length);
    return PAGINA.test(recurso) ? respostaPrm(recurso) : request;
  }

  // ── 3. `/.well-known/*`: nomes IANA sem extensão — sufixar `.html` ou `.md`
  //       quebraria a descoberta por agentes, que hoje responde 200. ─────────
  if (uri.indexOf('/.well-known/') === 0) {
    return request;
  }

  // ── 4. Negociação de conteúdo: agente que pede Markdown ganha o .md ────────
  //
  // Por REGRA, não por mapa: o mapa escrito à mão esquecia páginas novas e todo
  // o `/en/`. A regra não confere se o `.md` existe — quem garante é a etapa
  // `scripts/check-md-twins.mjs` do quality gate.
  var base = baseDaPagina(uri);
  var accept = (request.headers['accept'] || {}).value || '';
  if (prefersMarkdown(accept)) {
    var mdUri = CATALOGOS[uri] || (base && base + '.md');
    if (mdUri) {
      request.uri = mdUri;
      return request;
    }
  }

  // ── 5. Página → `.html`; o resto (assets, sitemap, llms.txt) passa intacto ──
  if (base) {
    request.uri = base + '.html';
  } else if (request.uri !== uri) {
    request.uri = uri; // preserva a normalização da barra final
  }

  return request;
}

// ─────────────────────────────────────────────────────────────────────────────
// baseDaPagina(uri) — caminho da página sem extensão, ou null se não é página.
// O teste é o ÚLTIMO segmento: `/devin` é página, `/assets/devin-BRjrEIyn.js`
// não. `/en` é diretório: o documento é `/en/index`.
// ─────────────────────────────────────────────────────────────────────────────
function baseDaPagina(uri) {
  if (uri === '/') return '/index';
  if (uri === '/en') return '/en/index';
  if (/\.html$/.test(uri)) return uri.slice(0, -5);
  var ultimo = uri.slice(uri.lastIndexOf('/') + 1);
  return ultimo.indexOf('.') === -1 ? uri : null;
}

// Catálogos para agentes que não seguem a regra `<caminho>.md`.
var CATALOGOS = {
  '/llms':      '/llms.txt',
  '/llms-full': '/llms-full.txt',
};

// ─────────────────────────────────────────────────────────────────────────────
// PRM (RFC 9728). Os campos abaixo espelham `public/.well-known/oauth-protected-resource`
// — o teste da function falha se divergirem. Só `resource` muda por caminho.
// ─────────────────────────────────────────────────────────────────────────────
var ORIGEM = 'https://mauricio.issei.com.br';
var PRM_PATH = '/.well-known/oauth-protected-resource';
var PAGINA = /^(\/en)?(\/[a-z0-9-]+(\.html)?)?$/;
var PRM = {
  authorization_servers: [ORIGEM],
  scopes_supported: ['cv:read', 'projects:read', 'profile'],
  bearer_methods_supported: ['header'],
  resource_documentation: ORIGEM + '/cv-for-ai.md',
  resource_policy_uri: ORIGEM + '/privacidade',
};

function respostaPrm(caminho) {
  var doc = { resource: ORIGEM + caminho };
  for (var campo in PRM) doc[campo] = PRM[campo];
  return {
    statusCode: 200,
    statusDescription: 'OK',
    headers: {
      'content-type': { value: 'application/json; charset=utf-8' },
      'cache-control': { value: 'public, max-age=3600' },
    },
    body: { encoding: 'text', data: JSON.stringify(doc) },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// prefersMarkdown(acceptHeader) — RFC 7231 §5.3.2.
// true só quando text/markdown está explícito, com q > 0 e não perde para
// text/html. Navegadores mandam `text/html,...,*​/*;q=0.8` → false.
// ─────────────────────────────────────────────────────────────────────────────
function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;

  var markdownQ = -1;
  var htmlQ     = -1;

  acceptHeader.split(',').forEach(function (part) {
    var tokens = part.trim().split(';');
    var type   = tokens[0].trim().toLowerCase();
    var q      = 1.0;

    for (var i = 1; i < tokens.length; i++) {
      var param = tokens[i].trim();
      if (param.indexOf('q=') === 0) {
        var parsed = parseFloat(param.slice(2));
        q = isNaN(parsed) ? 0 : parsed;
        break;
      }
    }

    if (type === 'text/markdown') {
      markdownQ = q;
    } else if (type === 'text/html') {
      if (q > htmlQ) htmlQ = q;
    }
  });

  return markdownQ > 0 && markdownQ >= htmlQ;
}
