/**
 * V7 — filtros por trilha esmaecem as demais linhas (`aria-pressed`).
 * Esmaecer nunca remove do DOM nem da árvore de acessibilidade. Sem JS a tabela é completa.
 */
export function montarRoadmap(doc = document) {
  const botoes = [...doc.querySelectorAll('[data-trilha-btn]')];
  const linhas = [...doc.querySelectorAll('#roadmap-grade tbody tr[data-trilha]')];
  if (!botoes.length || !linhas.length) return;

  const aplicar = (ativas) => {
    for (const l of linhas) {
      const ativa = ativas.has(l.dataset.trilha);
      l.classList.toggle('is-esmaecida', ativas.size > 0 && !ativa);
      l.classList.toggle('is-ativa', ativa);
    }
    for (const b of botoes) b.setAttribute('aria-pressed', String(ativas.has(b.dataset.trilhaBtn)));
  };

  const ativas = new Set();
  for (const b of botoes) {
    b.disabled = false;
    b.addEventListener('click', () => {
      const t = b.dataset.trilhaBtn;
      if (ativas.has(t)) ativas.delete(t);
      else ativas.add(t);
      aplicar(ativas);
    });
  }
  const limpar = doc.querySelector('[data-trilha-limpar]');
  if (limpar) {
    limpar.disabled = false;
    limpar.addEventListener('click', () => {
      ativas.clear();
      aplicar(ativas);
    });
  }
}
