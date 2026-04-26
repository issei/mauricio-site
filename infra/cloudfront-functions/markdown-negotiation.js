/**
 * CloudFront Function: Markdown Content Negotiation
 *
 * Implements RFC 7231 §5.3.2 content negotiation so AI agents can request
 * Markdown representations of HTML pages by sending:
 *   Accept: text/markdown
 *
 * Strategy:
 *   1. Parse the Accept header and its q-values.
 *   2. If text/markdown is explicitly preferred over text/html, rewrite the
 *      request URI to the corresponding static .md file in S3.
 *   3. All other requests (browsers, crawlers) pass through unchanged.
 *
 * Runtime: cloudfront-js-2.0  ← required (supports ES2019+)
 * Event:   viewer-request
 *
 * IMPORTANT — Cache correctness:
 *   This function rewrites URIs at the edge. The response MUST carry:
 *     Vary: Accept
 *   Configure this via a CloudFront Response Headers Policy on the same
 *   behavior, otherwise the cache may serve Markdown to browsers.
 *
 * Manual setup: See infra/cloudfront-functions/markdown-negotiation.js
 * and the walkthrough in infra/scripts/apply-markdown-headers.sh.
 *
 * @param {object} event - CloudFront viewer-request event
 * @returns {object} Modified (or original) request object
 */
function handler(event) {
  var request = event.request;

  // ── 1. Read Accept header (CloudFront normalises header names to lowercase) ──
  var acceptHeader = (request.headers['accept'] || {}).value || '';

  // ── 2. Decide whether this client prefers text/markdown ───────────────────
  if (!prefersMarkdown(acceptHeader)) {
    return request; // Browser or non-markdown request — pass through unchanged
  }

  // ── 3. Normalise URI (strip trailing slash; keep root as '/') ─────────────
  var uri = request.uri;
  if (uri !== '/' && uri.endsWith('/')) {
    uri = uri.slice(0, -1);
  }

  // ── 4. Rewrite to the corresponding .md file ──────────────────────────────
  var mdUri = MARKDOWN_MAP[uri];
  if (mdUri) {
    request.uri = mdUri;
    // S3 must have Content-Type: text/markdown on this object.
    // Run infra/scripts/apply-markdown-headers.sh in AWS CloudShell if needed.
  }
  // No mapping found → pass through; S3 returns the original asset or 404.

  return request;
}

// ─────────────────────────────────────────────────────────────────────────────
// URI → Markdown file map
// Add entries here whenever a new .md page is added to public/.
// Keys are normalised URIs (no trailing slash). Values are S3 object paths.
// ─────────────────────────────────────────────────────────────────────────────
var MARKDOWN_MAP = {
  '/':                                     '/index.md',
  '/index.html':                           '/index.md',
  '/service-operations-2-0':               '/service-operations-2-0.md',
  '/service-operations-2-0.html':          '/service-operations-2-0.md',
  '/devops-salesforce':                    '/devops-salesforce.md',
  '/devops-salesforce.html':               '/devops-salesforce.md',
  '/proposta':                             '/proposta.md',
  '/proposta.html':                        '/proposta.md',
  '/proposta-observabilidade-mobile':      '/proposta-observabilidade-mobile.md',
  '/proposta-observabilidade-mobile.html': '/proposta-observabilidade-mobile.md',
  '/know':                                 '/know.md',
  '/know.html':                            '/know.md',
  '/life':                                 '/life.md',
  '/life.html':                            '/life.md',
  '/sustentacao':                          '/sustentacao.md',
  '/sustentacao.html':                     '/sustentacao.md',
  '/career-highlights-star':               '/career-highlights-star.md',
  '/career-highlights-star.md':            '/career-highlights-star.md',
  '/llms':                                 '/llms.txt',
  '/llms.txt':                             '/llms.txt',
  '/llms-full':                            '/llms-full.txt',
  '/llms-full.txt':                        '/llms-full.txt',
};

// ─────────────────────────────────────────────────────────────────────────────
// prefersMarkdown(acceptHeader)
//
// Parses the Accept header per RFC 7231 §5.3.2 and returns true only when:
//   - text/markdown is explicitly listed with q > 0, AND
//   - its q-value is >= the q-value of text/html (agent wins ties).
//
// This correctly excludes browsers, which send headers like:
//   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8
//
// Examples:
//   "text/markdown"                      → true  (agent, no html listed)
//   "text/markdown, text/html;q=0.5"    → true  (markdown preferred)
//   "text/html, text/markdown;q=0.5"    → false (html preferred)
//   "text/html,*\/*;q=0.8"              → false (browser default, no markdown)
//   "*\/*"                              → false (wildcard only, not explicit)
// ─────────────────────────────────────────────────────────────────────────────
function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;

  var markdownQ = -1; // -1 = not listed
  var htmlQ     = -1;

  acceptHeader.split(',').forEach(function (part) {
    var tokens = part.trim().split(';');
    var type   = tokens[0].trim().toLowerCase();
    var q      = 1.0; // default per RFC 7231 §5.3.1

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
      // Only track explicit text/html, not */* (wildcard is not a preference)
      if (q > htmlQ) htmlQ = q;
    }
  });

  // text/markdown must be explicitly present, have q > 0,
  // and not be outranked by text/html.
  return markdownQ > 0 && markdownQ >= htmlQ;
}
