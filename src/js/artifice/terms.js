// Marginália / tooltip flutuante para termos acadêmicos (`.art-term`).
// CSS já cobre hover/focus; este módulo adiciona toggle por clique/toque e
// fechamento por Escape ou clique fora — necessário para dispositivos sem hover.

export function initTerms(root = document) {
  const terms = Array.from(root.querySelectorAll('.art-term'));
  if (!terms.length) return;

  function closeAll(except) {
    terms.forEach((t) => {
      if (t !== except) t.classList.remove('is-open');
    });
  }

  terms.forEach((term) => {
    term.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !term.classList.contains('is-open');
      closeAll(term);
      term.classList.toggle('is-open', willOpen);
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
