// Abas (WAI-ARIA Tabs Pattern) para os Estudos de Caso (Seção 03).
// Troca de painel sem layout shift: os dois painéis já existem no DOM,
// apenas o [hidden] alterna.

export function initTabs(root = document) {
  const tablists = Array.from(root.querySelectorAll('[role="tablist"]'));

  tablists.forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach((t) => {
        const isSelected = t === tab;
        t.setAttribute('aria-selected', String(isSelected));
        t.tabIndex = isSelected ? 0 : -1;
        const panel = root.querySelector(`#${CSS.escape(t.getAttribute('aria-controls'))}`);
        if (panel) panel.hidden = !isSelected;
      });
      tab.focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          select(tabs[(i + 1) % tabs.length]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          select(tabs[(i - 1 + tabs.length) % tabs.length]);
        } else if (e.key === 'Home') {
          e.preventDefault();
          select(tabs[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          select(tabs[tabs.length - 1]);
        }
      });
    });
  });
}
