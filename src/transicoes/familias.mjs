/**
 * Famílias de páginas com transição entre documentos.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (§4, §7; RF-VT-01, RF-VT-10).
 *
 * Uma família é um conjunto de páginas em que as duas pontas de uma navegação existem na própria
 * família. Fora dela, nada é injetado e a navegação é a de sempre. Nova família = nova entrada aqui.
 *
 * `LISTA`, `VIDEO`, `normalizarUrl` e `tipoDeTransicao` são lidos pelo plugin no build, que os copia
 * (`toString()`) para dentro do script inline: a regra existe num lugar só e é testada em Node.
 * Por isso essas funções não podem usar nada de fora de si além de `LISTA` e `VIDEO`.
 */

/** Páginas que listam vídeos: o índice e os assuntos. */
export const LISTA = /^\/(videos|temas\/[a-z0-9-]+)$/;
/** Páginas de um vídeo (ficha ou artigo). */
export const VIDEO = /^\/videos\/[a-z0-9-]+$/;

export const FAMILIAS = [{ nome: 'videos', rotas: [LISTA, VIDEO] }];

/** '/videos/x.html#a?b' ou URL absoluta → '/videos/x' (sem origem, .html, barra final, query e fragmento). */
export function normalizarUrl(url) {
  var caminho;
  try {
    caminho = new URL(url, 'https://x.invalid').pathname;
  } catch (e) {
    return '';
  }
  caminho = caminho.replace(/\.html$/, '');
  return caminho.length > 1 ? caminho.replace(/\/$/, '') : caminho;
}

/** Tipo da transição a partir das duas rotas já normalizadas; null quando não há direção (RF-VT-10). */
export function tipoDeTransicao(de, para) {
  if (!de || !para) return null;
  if (LISTA.test(de) && VIDEO.test(para)) return 'avanco';
  if (VIDEO.test(de) && LISTA.test(para)) return 'retorno';
  if (VIDEO.test(de) && VIDEO.test(para)) return 'lateral';
  return null;
}

/** Família da rota, ou null. */
export function familiaDe(url) {
  const rota = normalizarUrl(url);
  return FAMILIAS.find((f) => f.rotas.some((re) => re.test(rota))) ?? null;
}
