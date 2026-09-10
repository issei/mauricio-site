/**
 * CloudFront Function ÚNICA de viewer-request.
 *
 * Uma cache behavior aceita UMA associação por tipo de evento. Manter
 * `HandlerExtentionHTML.js` e `markdown-negotiation.js` como funções separadas
 * significava escolher uma e perder a outra — foi o que aconteceu: a
 * negociação de Markdown ficou ativa e as URLs sem `.html` passaram a devolver
 * 404 (21 páginas em "Não encontrado" no Search Console, exatamente as do
 * sitemap). As duas responsabilidades vivem aqui, nesta ordem.
 *
 * Runtime: cloudfront-js-2.0
 * Evento:  viewer-request
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

  // ── 2. Negociação de conteúdo: agente que pede Markdown ganha o .md ────────
  var accept = (request.headers['accept'] || {}).value || '';
  if (prefersMarkdown(accept)) {
    var mdUri = MARKDOWN_MAP[uri];
    if (mdUri) {
      request.uri = mdUri;
      return request;
    }
    // Sem mapeamento → cai no fluxo HTML abaixo em vez de 404.
  }

  // ── 3. Raiz → documento de índice ─────────────────────────────────────────
  if (uri === '/') {
    request.uri = '/index.html';
    return request;
  }

  // ── 4. Sufixa `.html` só quando o último segmento não tem extensão ─────────
  //
  // O teste antigo era `!uri.includes('.')`, que olhava a URI inteira: qualquer
  // ponto em qualquer lugar do caminho desligava a regra. O teste correto é o
  // último segmento — `/devin` recebe `.html`, `/assets/devin-BRjrEIyn.js` não.
  //
  // Exceção: `/.well-known/*` é um registro IANA de nomes SEM extensão
  // (api-catalog, openid-configuration, oauth-protected-resource...). Sufixar
  // `.html` ali quebraria a descoberta por agentes, que hoje responde 200.
  if (uri.indexOf('/.well-known/') === 0) {
    return request;
  }

  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  } else if (request.uri !== uri) {
    request.uri = uri; // preserva a normalização da barra final
  }

  return request;
}

// ─────────────────────────────────────────────────────────────────────────────
// URI → arquivo Markdown. Chaves normalizadas (sem barra final).
// Adicione uma entrada sempre que uma nova página ganhar `.md` em public/.
// ─────────────────────────────────────────────────────────────────────────────
var MARKDOWN_MAP = {
  '/':                                     '/index.md',
  '/index':                                '/index.md',
  '/index.html':                           '/index.md',
  '/agent-ready':                          '/agent-ready.md',
  '/agent-ready.html':                     '/agent-ready.md',
  '/apresentacao':                         '/apresentacao.md',
  '/apresentacao.html':                    '/apresentacao.md',
  '/artifice':                             '/artifice.md',
  '/artifice.html':                        '/artifice.md',
  '/capacidade-antes-do-acesso':           '/capacidade-antes-do-acesso.md',
  '/capacidade-antes-do-acesso.html':      '/capacidade-antes-do-acesso.md',
  '/case-agents':                          '/case-agents.md',
  '/case-agents.html':                     '/case-agents.md',
  '/devin':                                '/devin.md',
  '/devin.html':                           '/devin.md',
  '/devops-salesforce':                    '/devops-salesforce.md',
  '/devops-salesforce.html':               '/devops-salesforce.md',
  '/engenharia-agentes-ia':                '/engenharia-agentes-ia.md',
  '/engenharia-agentes-ia.html':           '/engenharia-agentes-ia.md',
  '/engenharia-confianca':                 '/engenharia-confianca.md',
  '/engenharia-confianca.html':            '/engenharia-confianca.md',
  '/formulacao-de-problemas':              '/formulacao-de-problemas.md',
  '/formulacao-de-problemas.html':         '/formulacao-de-problemas.md',
  '/knowledge-os-presentation':            '/knowledge-os-presentation.md',
  '/knowledge-os-presentation.html':       '/knowledge-os-presentation.md',
  '/proposta':                             '/proposta.md',
  '/proposta.html':                        '/proposta.md',
  '/proposta-engenharia-reversa':          '/proposta-engenharia-reversa.md',
  '/proposta-engenharia-reversa.html':     '/proposta-engenharia-reversa.md',
  '/proposta-observabilidade-mobile':      '/proposta-observabilidade-mobile.md',
  '/proposta-observabilidade-mobile.html': '/proposta-observabilidade-mobile.md',
  '/salesforce-agentic-dev':               '/salesforce-agentic-dev.md',
  '/salesforce-agentic-dev.html':          '/salesforce-agentic-dev.md',
  '/salesforce-agentic-quickstart':        '/salesforce-agentic-quickstart.md',
  '/salesforce-agentic-quickstart.html':   '/salesforce-agentic-quickstart.md',
  '/service-operations-2-0':               '/service-operations-2-0.md',
  '/service-operations-2-0.html':          '/service-operations-2-0.md',
  '/socialselling':                        '/socialselling.md',
  '/socialselling.html':                   '/socialselling.md',
  '/sustentacao':                          '/sustentacao.md',
  '/sustentacao.html':                     '/sustentacao.md',
  '/terminal-evolutivo':                   '/terminal-evolutivo.md',
  '/terminal-evolutivo.html':              '/terminal-evolutivo.md',
  '/career-highlights-star':               '/career-highlights-star.md',
  '/llms':                                 '/llms.txt',
  '/llms.txt':                             '/llms.txt',
  '/llms-full':                            '/llms-full.txt',
  '/llms-full.txt':                        '/llms-full.txt',
};

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
