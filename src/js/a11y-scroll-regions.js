/**
 * Regiões roláveis alcançáveis por teclado (WCAG 2.1.1; axe `scrollable-region-focusable`).
 *
 * Um <pre> ou uma tabela larga dentro de `overflow-x:auto` só rola com o mouse, a menos que o
 * contêiner receba foco. Aqui o foco (tabindex=0) e o nome (role=region + aria-label) entram
 * SÓ quando o conteúdo de fato rola — a 1280px a maioria dos blocos cabe e não ganha parada
 * de Tab; a 320px, ganha.
 */
const CANDIDATES = 'pre, .overflow-x-auto, [style*="overflow-x"]';
const LABEL = document.documentElement.lang?.startsWith('en') ? 'Scrollable content' : 'Conteúdo rolável';
const MARK = 'data-a11y-scroll';

function sync(el) {
    const scrolls = el.scrollWidth > el.clientWidth + 1;
    if (scrolls && !el.hasAttribute(MARK) && el.tabIndex < 0) {
        el.setAttribute(MARK, '');
        el.tabIndex = 0;
        if (!el.hasAttribute('role')) el.setAttribute('role', 'region');
        if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) el.setAttribute('aria-label', LABEL);
    } else if (!scrolls && el.hasAttribute(MARK)) {
        // voltou a caber (ex.: girou o aparelho): devolve o elemento ao estado original
        el.removeAttribute(MARK);
        el.removeAttribute('tabindex');
        if (el.getAttribute('aria-label') === LABEL) { el.removeAttribute('aria-label'); el.removeAttribute('role'); }
    }
}

function init() {
    const all = () => document.querySelectorAll(CANDIDATES);
    // O ResizeObserver só vê mudança de CAIXA; a largura do conteúdo muda também quando a fonte carrega.
    const watch = new ResizeObserver((entries) => entries.forEach(({ target }) => sync(target)));
    all().forEach((el) => watch.observe(el));
    const recheck = () => all().forEach(sync);
    document.fonts?.ready.then(recheck);
    window.addEventListener('load', recheck);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

export {};
