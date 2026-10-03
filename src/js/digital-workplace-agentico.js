/**
 * Entrada da página "Digital Workplace Agêntico".
 *
 * Cada visualização é um módulo carregado por import dinâmico (literal, para o Vite gerar um
 * chunk por visualização) e isolado: a falha de uma — seletor que mudou, API ausente, rede —
 * não derruba as outras nem o conteúdo, que já está inteiro no HTML.
 */
const modulos = [
  ['maturidade', () => import('./digital-workplace/maturidade.js').then((m) => m.montarMaturidade)],
  ['sequencia', () => import('./digital-workplace/sequencia.js').then((m) => m.montarSequencia)],
  ['roadmap', () => import('./digital-workplace/roadmap.js').then((m) => m.montarRoadmap)],
  ['prontidao', () => import('./digital-workplace/prontidao-view.js').then((m) => m.montarProntidao)],
];

for (const [nome, carregar] of modulos) {
  carregar()
    .then((montar) => montar(document))
    .catch((erro) => console.warn(`[digital-workplace] enriquecimento "${nome}" indisponível:`, erro));
}
