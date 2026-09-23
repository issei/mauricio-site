// Identidade compartilhada para o sistema AEO/GEO (fonte única da verdade).
// Editar aqui propaga para TODAS as páginas via build-aeo.mjs.
import { readFileSync } from 'node:fs';

// O currículo estruturado é a fonte de knowsAbout e das certificações do
// JSON-LD da home (SDD do portfólio §8): nada é digitado em dobro aqui.
const CV = JSON.parse(readFileSync(new URL('../../public/cv.json', import.meta.url), 'utf8'));

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
  jobTitle: CV.Titulo,
  email: `mailto:${CV.Contato.Email}`,
  sameAs: [...PERSON.sameAs, CV.Contato.instagram],
  worksFor: { '@type': 'Organization', name: CV.Experiencia[0].Empresa },
  // Espelho 1:1 de Habilidades (7 grupos), sem paráfrase.
  knowsAbout: Object.values(CV.Habilidades).flat(),
  alumniOf: [MACKENZIE, { '@type': 'EducationalOrganization', name: 'Colégio Guarani' }],
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

// "26 de setembro de 2024" → 2024-09-26 · "janeiro de 2022" → 2022-01 · "2018" → 2018.
// Texto fora desses formatos (ex.: intervalo "13/03/2018 a 10/12/2024") → sem data.
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
function isoDate(s = '') {
  const m = String(s).toLowerCase().match(/^(?:(\d{1,2}) de )?(?:([a-zç]+) de )?(\d{4})$/);
  if (!m) return null;
  const [, d, mes, y] = m;
  const mm = mes ? MESES.indexOf(mes) + 1 : 0;
  if (mes && !mm) return null;
  return [y, mm && String(mm).padStart(2, '0'), d && d.padStart(2, '0')].filter(Boolean).join('-');
}

// Todas as certificações de cv.json. `url` só quando há link de verificação —
// nunca um link fictício para as que não têm.
export const CERTIFICATIONS = {
  '@type': 'ItemList',
  '@id': `${SITE.origin}/#certifications`,
  name: `Certificações profissionais de ${SITE.name}`,
  numberOfItems: CV.Certificados.length,
  itemListElement: CV.Certificados.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'EducationalOccupationalCredential',
      name: c.Nome,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.Instituicao },
      ...(c.Verificacao ? { url: c.Verificacao } : {}),
      ...(isoDate(c.Data_Emissao || c.Ano) ? { dateCreated: isoDate(c.Data_Emissao || c.Ano) } : {}),
    },
  })),
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE.origin}/#website`,
  url: `${SITE.origin}/`,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': PERSON['@id'] },
};
