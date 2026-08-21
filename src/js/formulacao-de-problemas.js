/**
 * Entrada da página "Formulação de Problemas como Engenharia Interrompida".
 *
 * Cada enriquecimento é isolado em try/catch: a falha de um módulo (um seletor
 * que mudou, uma API ausente no navegador) não pode derrubar os outros nem o
 * conteúdo — que já está inteiro no HTML.
 */
import { montarSolo } from './formulacao/solo.js';
import { montarParada } from './formulacao/parada-view.js';
import { barraDeLeitura, marcoAtivo, revelar } from './formulacao/realce.js';

const tentar = (nome, fn) => {
  try {
    fn();
  } catch (erro) {
    console.warn(`[formulacao] enriquecimento "${nome}" indisponível:`, erro);
  }
};

tentar('revelacao', revelar);
tentar('barra-de-leitura', barraDeLeitura);
tentar('marco-ativo', marcoAtivo);

tentar('incertezas', () => {
  const raiz = document.querySelector('[data-solo="incertezas"]');
  montarSolo(raiz, {
    destaque(id) {
      for (const v of document.querySelectorAll('[data-radar-vertice]')) {
        v.classList.toggle('is-ativo', v.dataset.radarVertice === id);
      }
    },
  });
});

tentar('estados', () => montarSolo(document.querySelector('[data-solo="estados"]')));
tentar('parada', () => montarParada(document));
