// Identidade compartilhada para o sistema AEO/GEO (fonte única da verdade).
// Editar aqui propaga para TODAS as páginas via build-aeo.mjs.
export const SITE = {
  origin: 'https://mauricio.issei.com.br',
  name: 'Maurício Yokoyama Issei',
  locale: 'pt_BR',
  lang: 'pt-BR',
  ga4: 'G-GEKLHZYVYX',
  twitter: '@mauricioissei',
};

// Nó Person reutilizado como author/publisher em todas as páginas.
export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE.origin}/#author`,
  name: SITE.name,
  url: `${SITE.origin}/`,
  jobTitle: 'Tech Lead / Arquiteto de Soluções de IA',
  sameAs: [
    'https://www.linkedin.com/in/mauricioissei/',
    'https://github.com/issei',
    'https://www.youtube.com/@MauricioIssei',
  ],
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE.origin}/#website`,
  url: `${SITE.origin}/`,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': PERSON['@id'] },
};
