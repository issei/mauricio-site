// Accordion dos 5 Paradoxos (Seção 02). Expansão via CSS grid-template-rows;
// este módulo só alterna aria-expanded / data-open.

export function initParadoxes(root = document) {
  const triggers = Array.from(root.querySelectorAll('.paradox__trigger'));
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = panelId ? root.querySelector(`#${CSS.escape(panelId)}`) : null;
    if (!panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.dataset.open = String(!isOpen);
    });
  });
}
