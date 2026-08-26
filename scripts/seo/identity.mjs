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

// Instituição de origem, reutilizada em alumniOf e recognizedBy.
export const MACKENZIE = {
  '@type': 'EducationalOrganization',
  name: 'Universidade Presbiteriana Mackenzie',
  url: 'https://www.mackenzie.br',
};

// Person estendido, usado só na ProfilePage (/index), onde a pessoa é a
// entidade principal: publica a formação e o diploma digital verificável
// no e-Diploma (MEC), casando com o link exibido na seção "Formação".
export const PERSON_PROFILE = {
  ...PERSON,
  alumniOf: MACKENZIE,
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Pós-graduação em Ciência de Dados – Data Analytics / Big Data',
    credentialCategory: 'Postgraduate degree',
    educationalLevel: 'Postgraduate',
    identifier: 'EED4D2846DDD86592422CC674AB449',
    url: 'https://www.e-diploma.com.br/Verificar/Autenticidade.aspx?id=565267%7CEED4D2846DDD86592422CC674AB449%7C11489',
    recognizedBy: MACKENZIE,
  },
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE.origin}/#website`,
  url: `${SITE.origin}/`,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': PERSON['@id'] },
};
