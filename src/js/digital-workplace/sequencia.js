/**
 * V4 — percorre os passos da sequência ilustrativa (anterior/próximo/ver tudo).
 * Sem JS a <ol> inteira fica visível e os botões nascem `disabled`. Com JS, o passo atual
 * é descrito em texto num painel `aria-live="polite"`; ←/→ funcionam quando o grupo tem foco.
 */
export function montarSequencia(doc = document) {
  const raiz = doc.querySelector('[data-seq]');
  if (!raiz) return;
  const passos = [...raiz.querySelectorAll('[data-passo]')];
  const prev = raiz.querySelector('[data-seq-prev]');
  const next = raiz.querySelector('[data-seq-next]');
  const tudo = raiz.querySelector('[data-seq-tudo]');
  const painel = raiz.querySelector('[data-seq-painel]');
  if (!passos.length || !prev || !next || !tudo || !painel) return;

  let atual = -1; // -1 = "ver tudo"
  let primeira = true; // a região viva só fala depois de uma ação do usuário

  const render = () => {
    const foco = doc.activeElement; // lido antes de desabilitar botões: o navegador pode soltar o foco na hora
    const todos = atual < 0;
    passos.forEach((li, i) => {
      li.classList.toggle('is-oculto', !todos && i !== atual);
      li.classList.toggle('is-atual', !todos && i === atual);
    });
    tudo.setAttribute('aria-pressed', String(todos));
    prev.disabled = todos || atual === 0;
    next.disabled = !todos && atual === passos.length - 1;
    // Botão focado que acaba de ficar desabilitado (primeiro/último passo): o foco não pode cair no vazio.
    if ((foco === prev || foco === next) && foco.disabled) tudo.focus();
    if (primeira) { primeira = false; return; }
    painel.textContent = todos
      ? `Mostrando todos os ${passos.length} passos.`
      : `Passo ${atual + 1} de ${passos.length}: ${passos[atual].dataset.resumo ?? passos[atual].textContent.trim()}`;
  };

  const ir = (delta) => {
    atual = atual < 0 ? (delta > 0 ? 0 : passos.length - 1) : Math.min(passos.length - 1, Math.max(0, atual + delta));
    render();
  };

  tudo.disabled = false;
  next.disabled = false;
  prev.addEventListener('click', () => ir(-1));
  next.addEventListener('click', () => ir(1));
  tudo.addEventListener('click', () => {
    atual = -1;
    render();
  });
  raiz.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return; // não rouba Alt+← (voltar) do navegador
    if (e.key === 'ArrowRight' && !next.disabled) ir(1);
    else if (e.key === 'ArrowLeft' && !prev.disabled) ir(-1);
    else return;
    e.preventDefault();
  });
  render();
}
