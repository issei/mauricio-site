/**
 * Padrão "seletor + painéis" usado por V2 (rosácea das incertezas) e por V3
 * (estados do conhecimento).
 *
 * Sem JavaScript, os painéis ficam TODOS visíveis, empilhados na ordem do
 * artigo, e os chips são âncoras que saltam até eles — nada quebra e nada
 * depende de clique. Com JavaScript, o seletor entra em "modo solo": mostra um
 * painel por vez, marca o chip ativo com `aria-current` e move o foco para o
 * painel, que é anunciado por `aria-live="polite"`.
 *
 * Optou-se por âncoras em vez do padrão ARIA `tablist`: um chip que não faz
 * nada sem JS seria uma armadilha, e o salto por âncora já é a operação
 * correta na ausência do enriquecimento.
 */

/**
 * @param {Element} raiz elemento que contém `[data-solo-chip]` e `[data-solo-painel]`
 * @param {{destaque?: (id: string|null) => void}} [opcoes] callback para efeitos
 *        externos (por exemplo, realçar o vértice correspondente no SVG)
 */
export function montarSolo(raiz, opcoes = {}) {
  if (!raiz) return false;
  const chips = [...raiz.querySelectorAll('[data-solo-chip]')];
  const paineis = [...raiz.querySelectorAll('[data-solo-painel]')];
  if (!chips.length || !paineis.length) return false;

  const alvoDe = (chip) => (chip.getAttribute('href') || '').replace(/^#/, '');

  function selecionar(id, mover) {
    for (const painel of paineis) painel.hidden = painel.id !== id;
    for (const chip of chips) {
      const ativo = alvoDe(chip) === id;
      chip.setAttribute('aria-current', ativo ? 'true' : 'false');
      chip.setAttribute('aria-expanded', ativo ? 'true' : 'false');
    }
    opcoes.destaque?.(id);
    if (mover) {
      const painel = paineis.find((p) => p.id === id);
      painel?.focus({ preventScroll: true });
    }
  }

  for (const painel of paineis) {
    painel.setAttribute('role', 'region');
    painel.setAttribute('tabindex', '-1');
    painel.setAttribute('aria-live', 'polite');
  }

  chips.forEach((chip, i) => {
    chip.setAttribute('aria-expanded', 'false');
    chip.addEventListener('click', (ev) => {
      ev.preventDefault();
      selecionar(alvoDe(chip), true);
    });
    // Setas percorrem os chips sem sair do grupo: navegação de conjunto,
    // não de documento.
    chip.addEventListener('keydown', (ev) => {
      const passo = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1
        : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
      if (!passo) return;
      ev.preventDefault();
      const proximo = chips[(i + passo + chips.length) % chips.length];
      proximo.focus();
      selecionar(alvoDe(proximo), false);
    });
  });

  selecionar(alvoDe(chips[0]), false);
  return true;
}
