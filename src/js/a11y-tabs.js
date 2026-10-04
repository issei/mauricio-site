/**
 * Teclado e semântica do padrão Tabs (WAI-ARIA APG) para um `role="tablist"` que já tem `role="tab"`
 * e `aria-selected` mantidos pela própria página.
 *
 * Acrescenta o que faltava nos widgets do site:
 *   - tabindex móvel: só a aba selecionada entra na ordem de Tab; as outras se alcançam por seta;
 *   - ←/→ (e ↑/↓ em lista vertical), Home e End movem o foco E ativam a aba (ativação automática,
 *     pois trocar de aba só troca conteúdo — não há custo);
 *   - painel compartilhado: `aria-controls` nas abas + `role="tabpanel"` e `aria-labelledby` = aba atual.
 *
 * Quem seleciona continua sendo o código da página (`click` → `aria-selected`); um MutationObserver
 * acompanha o atributo, então nada aqui depende da ordem de inicialização.
 *
 * @param {HTMLElement} list  o elemento `role="tablist"`
 * @param {{panel?: HTMLElement, label?: string}} [opts]  `panel`: painel único que todas as abas controlam
 */
export function enhanceTablist(list, { panel, label } = {}) {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  if (tabs.length < 2) return;
  if (label && !list.hasAttribute('aria-label') && !list.hasAttribute('aria-labelledby')) list.setAttribute('aria-label', label);

  const base = list.id || `tl-${Math.random().toString(36).slice(2, 7)}`;
  tabs.forEach((tab, i) => { if (!tab.id) tab.id = `${base}-tab-${i}`; });

  if (panel) {
    if (!panel.id) panel.id = `${base}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.removeAttribute('aria-label'); // o nome vem da aba (aria-labelledby)
    if (!panel.hasAttribute('tabindex') && !panel.querySelector('a[href],button,input,select,textarea')) panel.tabIndex = 0;
    tabs.forEach((tab) => tab.setAttribute('aria-controls', panel.id));
  }

  const sync = () => {
    const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
    tabs.forEach((t) => { t.tabIndex = t === current ? 0 : -1; });
    if (panel) panel.setAttribute('aria-labelledby', current.id);
  };
  new MutationObserver(sync).observe(list, { attributes: true, attributeFilter: ['aria-selected'], subtree: true });

  const vertical = list.getAttribute('aria-orientation') === 'vertical';
  const [prev, next] = vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(/** @type {HTMLElement} */ (document.activeElement));
    if (i < 0 || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = { [prev]: i - 1, [next]: i + 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const tab = tabs[(target + tabs.length) % tabs.length];
    tab.focus();
    tab.click();
  });

  sync();
}
