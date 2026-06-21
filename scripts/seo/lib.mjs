// Construtores AEO/GEO: a partir de UM registro de página (pages.mjs) produzem
//  - buildHead(): bloco <head> (meta social/article + JSON-LD @graph + GA4 + aeo.css)
//  - buildBody(): seção visível "Em síntese" + FAQ (quando a página tem tldr/faq)
//  - buildMd():   companion Markdown limpo para ingestão por LLMs
// Tudo determinístico → reexecutável. JSON-LD via JSON.stringify (escapado).
import { SITE, PERSON, WEBSITE } from './identity.mjs';

const PAGE_SUBTYPES = new Set(['CollectionPage', 'AboutPage', 'ProfilePage', 'WebPage']);

export const pageUrl = (slug) => `${SITE.origin}/${slug}`;

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Mini-rich p/ texto visível: escapa tudo, depois habilita **negrito** e [texto](url).
function rich(s = '') {
  let h = esc(s);
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
    (_, t, u) => `<a href="${esc(u)}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return h;
}

// ----------------------------------------------------------------------------
// JSON-LD @graph
// ----------------------------------------------------------------------------
export function buildGraph(p) {
  const url = pageUrl(p.slug);
  const img = `${SITE.origin}/og-${p.slug}.png`;
  const isSubtype = PAGE_SUBTYPES.has(p.type);

  const webpage = {
    '@type': isSubtype ? ['WebPage', p.type] : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: p.title,
    isPartOf: { '@id': WEBSITE['@id'] },
    inLanguage: SITE.lang,
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    primaryImageOfPage: img,
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
  if (p.tldr) webpage.speakable = { '@type': 'SpeakableSpecification', cssSelector: ['.aeo-tldr'] };

  const graph = [WEBSITE, PERSON, webpage];

  // Nó de conteúdo (Article-like) só quando o tipo não é um subtipo de WebPage.
  if (!isSubtype) {
    const article = {
      '@type': p.type, // TechArticle | Article | ...
      '@id': `${url}#article`,
      isPartOf: { '@id': webpage['@id'] },
      mainEntityOfPage: { '@id': webpage['@id'] },
      headline: p.headline || p.title,
      description: p.description,
      author: { '@id': PERSON['@id'] },
      publisher: { '@id': PERSON['@id'] },
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      inLanguage: SITE.lang,
      image: img,
      isAccessibleForFree: true,
    };
    if (p.keywords?.length) article.keywords = p.keywords.join(', ');
    if (p.about?.length) article.about = p.about.map((a) => ({ '@type': 'Thing', name: a.name, ...(a.sameAs ? { sameAs: a.sameAs } : {}) }));
    if (p.mentions?.length) article.mentions = p.mentions.map((m) => ({ '@type': 'Thing', name: m }));
    if (p.teaches?.length) article.teaches = p.teaches;
    if (p.audience) article.audience = { '@type': 'Audience', audienceType: p.audience };
    if (p.citation?.length) article.citation = p.citation.map((c) => ({ '@type': 'CreativeWork', name: c.name, ...(c.url ? { url: c.url } : {}) }));
    webpage.mainEntity = { '@id': article['@id'] };
    graph.push(article);
  } else if (p.type === 'ProfilePage') {
    webpage.mainEntity = { '@id': PERSON['@id'] };
  } else if (p.itemList?.length) {
    webpage.mainEntity = { '@id': `${url}#itemlist` };
  } else {
    webpage.mainEntity = { '@id': webpage['@id'] };
  }

  // Breadcrumb: Início → Catálogo → página (sem 3º item p/ a própria home/catálogo).
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.origin}/` }];
  if (p.slug !== 'index' && p.slug !== 'catalogo') {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE.origin}/catalogo.html` });
    crumbs.push({ '@type': 'ListItem', position: 3, name: p.breadcrumbName || p.title });
  } else if (p.slug === 'catalogo') {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Catálogo' });
  }
  graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: crumbs });

  if (p.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  if (p.terms?.length) {
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': `${url}#glossario`,
      name: `Glossário — ${p.title}`,
      inLanguage: SITE.lang,
      hasDefinedTerm: p.terms.map((t) => ({
        '@type': 'DefinedTerm', '@id': `${url}#g-${t.slug}`, name: t.name, description: t.def,
      })),
    });
  }
  if (p.itemList?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#itemlist`,
      itemListElement: p.itemList.map((it, i) => ({
        '@type': 'ListItem', position: i + 1, name: it.name, url: it.url,
      })),
    });
  }
  if (p.video) {
    graph.push({
      '@type': 'VideoObject', '@id': `${url}#video`,
      name: p.video.name, description: p.video.description || p.description,
      thumbnailUrl: p.video.thumb, uploadDate: p.video.uploadDate || p.datePublished,
      embedUrl: p.video.embed, contentUrl: p.video.url, inLanguage: SITE.lang,
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

// ----------------------------------------------------------------------------
// <head> block
// ----------------------------------------------------------------------------
export function buildHead(p) {
  const url = pageUrl(p.slug);
  const img = `${SITE.origin}/og-${p.slug}.png`;
  const jsonld = JSON.stringify(buildGraph(p), null, 2);
  const L = [];
  L.push(`<!-- ${'='.repeat(60)} -->`);
  L.push(`<!-- AEO:START — bloco gerado por scripts/seo/build-aeo.mjs (NÃO editar à mão) -->`);
  // GA4
  L.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}"></script>`);
  L.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.ga4}');</script>`);
  // Identidade / indexação
  L.push(`<meta name="author" content="${esc(SITE.name)}" />`);
  L.push(`<meta name="theme-color" content="#0d1117" />`);
  if (p.keywords?.length) L.push(`<meta name="keywords" content="${esc(p.keywords.join(', '))}" />`);
  L.push(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
  L.push(`<link rel="canonical" href="${url}" />`);
  if (p.hasMd) L.push(`<link rel="alternate" type="text/markdown" href="${SITE.origin}/${p.slug}.md" title="${esc(p.title)} — Markdown para IA" />`);
  // Open Graph
  L.push(`<meta property="og:type" content="${p.ogType || 'article'}" />`);
  L.push(`<meta property="og:site_name" content="${esc(SITE.name)}" />`);
  L.push(`<meta property="og:locale" content="${SITE.locale}" />`);
  L.push(`<meta property="og:title" content="${esc(p.ogTitle || p.title)}" />`);
  L.push(`<meta property="og:description" content="${esc(p.ogDescription || p.description)}" />`);
  L.push(`<meta property="og:url" content="${url}" />`);
  L.push(`<meta property="og:image" content="${img}" />`);
  L.push(`<meta property="og:image:width" content="1200" />`);
  L.push(`<meta property="og:image:height" content="630" />`);
  L.push(`<meta property="og:image:alt" content="${esc(p.ogImageAlt || p.title)}" />`);
  if ((p.ogType || 'article') === 'article') {
    L.push(`<meta property="article:published_time" content="${p.datePublished}T08:00:00-03:00" />`);
    L.push(`<meta property="article:modified_time" content="${p.dateModified}T10:00:00-03:00" />`);
    L.push(`<meta property="article:author" content="${esc(SITE.name)}" />`);
    if (p.section) L.push(`<meta property="article:section" content="${esc(p.section)}" />`);
    for (const t of p.tags || []) L.push(`<meta property="article:tag" content="${esc(t)}" />`);
  }
  // Twitter
  L.push(`<meta name="twitter:card" content="summary_large_image" />`);
  L.push(`<meta name="twitter:title" content="${esc(p.twTitle || p.ogTitle || p.title)}" />`);
  L.push(`<meta name="twitter:description" content="${esc(p.twDescription || p.ogDescription || p.description)}" />`);
  L.push(`<meta name="twitter:image" content="${img}" />`);
  L.push(`<meta name="twitter:creator" content="${SITE.twitter}" />`);
  L.push(`<meta name="twitter:site" content="${SITE.twitter}" />`);
  // CSS dos blocos visíveis (quando houver)
  if (p.tldr || p.faq) L.push(`<link rel="stylesheet" href="/aeo.css" />`);
  // JSON-LD
  L.push(`<script type="application/ld+json">\n${jsonld}\n</script>`);
  L.push(`<!-- AEO:END -->`);
  return L.join('\n');
}

// ----------------------------------------------------------------------------
// Bloco visível (Em síntese + FAQ)
// ----------------------------------------------------------------------------
export function buildBody(p) {
  if (!p.tldr && !p.faq) return '';
  const out = [];
  out.push(`<!-- AEO-BODY:START — gerado por scripts/seo/build-aeo.mjs -->`);
  out.push(`<section class="aeo" aria-label="Resumo e perguntas frequentes">`);
  if (p.tldr) {
    const t = p.tldr;
    out.push(`  <div class="aeo-tldr">`);
    out.push(`    <p class="aeo-eyebrow">Em síntese</p>`);
    out.push(`    <h2 class="aeo-tldr__title">${rich(t.heading)}</h2>`);
    out.push(`    <p class="aeo-tldr__lede">${rich(t.lede)}</p>`);
    if (t.points?.length) {
      out.push(`    <ul class="aeo-tldr__points">`);
      for (const pt of t.points) out.push(`      <li>${rich(pt)}</li>`);
      out.push(`    </ul>`);
    }
    if (t.foot) out.push(`    <p class="aeo-tldr__foot">${rich(t.foot)}</p>`);
    out.push(`  </div>`);
  }
  if (p.faq?.length) {
    out.push(`  <div class="aeo-faq">`);
    out.push(`    <p class="aeo-eyebrow">Perguntas frequentes</p>`);
    out.push(`    <h2 class="aeo-faq__title">Perguntas frequentes</h2>`);
    p.faq.forEach((f, i) => {
      out.push(`    <details class="aeo-faq__item"${i === 0 ? ' open' : ''}>`);
      out.push(`      <summary class="aeo-faq__q">${esc(f.q)}</summary>`);
      out.push(`      <div class="aeo-faq__a"><p>${rich(f.a)}</p></div>`);
      out.push(`    </details>`);
    });
    out.push(`  </div>`);
  }
  out.push(`</section>`);
  out.push(`<!-- AEO-BODY:END -->`);
  return out.join('\n');
}

// ----------------------------------------------------------------------------
// Companion Markdown
// ----------------------------------------------------------------------------
export function buildMd(p) {
  const url = pageUrl(p.slug);
  const L = [];
  L.push(`# ${p.title}`);
  L.push('');
  L.push(`> Versão Markdown (GEO/AEO) de <${url}>. Autor: **${SITE.name}** · ${SITE.lang} · ` +
    `Publicado: ${p.datePublished} · Atualizado: ${p.dateModified}.`);
  L.push('');
  if (p.tldr) {
    L.push('## Em síntese');
    L.push('');
    L.push(p.tldr.lede);
    L.push('');
    for (const pt of p.tldr.points || []) L.push(`- ${pt}`);
    L.push('');
  }
  if (p.mdSections?.length) {
    for (const s of p.mdSections) {
      L.push(`## ${s.h}`);
      L.push('');
      L.push(s.body);
      L.push('');
    }
  }
  if (p.faq?.length) {
    L.push('## Perguntas frequentes');
    L.push('');
    for (const f of p.faq) { L.push(`**${f.q}**`); L.push(''); L.push(f.a); L.push(''); }
  }
  if (p.terms?.length) {
    L.push('## Glossário');
    L.push('');
    for (const t of p.terms) L.push(`- **${t.name}** — ${t.def}`);
    L.push('');
  }
  L.push(`*© 2026 ${SITE.name}. Conteúdo citável com atribuição (fair use educacional).*`);
  L.push('');
  return L.join('\n');
}
