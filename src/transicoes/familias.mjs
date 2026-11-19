/**
 * Famílias de páginas com transição entre documentos.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (§4, §7; RF-VT-01).
 *
 * Uma família é um conjunto de páginas em que as duas pontas de uma navegação existem na própria
 * família. Fora dela, nada é injetado e a navegação é a de sempre. Nova família = nova entrada aqui.
 * Funções puras: lidas pelo plugin no build e testadas sem navegador.
 */

export const FAMILIAS = [
  {
    nome: 'videos',
    /** Rotas públicas (sem .html): índice, assuntos e fichas/artigos de vídeo, só em PT. */
    rotas: [/^\/videos$/, /^\/videos\/[a-z0-9-]+$/, /^\/temas\/[a-z0-9-]+$/],
  },
];

/** '/videos/x.html#a?b' ou URL absoluta → '/videos/x' (sem origem, .html, barra final, query e fragmento). */
export function normalizarUrl(url) {
  let caminho;
  try {
    caminho = new URL(url, 'https://x.invalid').pathname;
  } catch {
    return '';
  }
  caminho = caminho.replace(/\.html$/, '');
  return caminho.length > 1 ? caminho.replace(/\/$/, '') : caminho;
}

/** Família da rota, ou null. */
export function familiaDe(url) {
  const rota = normalizarUrl(url);
  return FAMILIAS.find((f) => f.rotas.some((re) => re.test(rota))) ?? null;
}
