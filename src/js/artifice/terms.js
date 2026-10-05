// Marginália / tooltip flutuante para termos acadêmicos (`.art-term`).
// CSS já cobre hover/focus; este módulo adiciona toggle por clique/toque e
// fechamento por Escape ou clique fora — necessário para dispositivos sem hover.
// Esc também dispensa o tooltip aberto por hover/foco (SC 1.4.13): `data-dismissed` vale até o
// ponteiro ou o foco saírem do termo.

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
      term.removeAttribute('data-dismissed');
      const willOpen = !term.classList.contains('is-open');
      closeAll(term);
      term.classList.toggle('is-open', willOpen);
    });
    const undismiss = () => term.removeAttribute('data-dismissed');
    term.addEventListener('mouseleave', undismiss);
    term.addEventListener('blur', undismiss);
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeAll();
    terms.filter((t) => t.matches(':hover, :focus')).forEach((t) => t.setAttribute('data-dismissed', ''));
  });
}
