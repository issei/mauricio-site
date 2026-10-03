/**
 * V2 — selecionar um degrau destaca a coluna correspondente da matriz.
 * Sem JS a escada é uma <ol> e a matriz é uma tabela inteira; os botões nascem `disabled`.
 * O destaque nunca é só cor: a coluna ganha o rótulo "estágio selecionado".
 */
export function montarMaturidade(doc = document) {
  const botoes = [...doc.querySelectorAll('[data-estagio-btn]')];
  const tabela = doc.querySelector('#matriz');
  if (!botoes.length || !tabela) return;

  const limpar = () => {
    for (const el of tabela.querySelectorAll('.is-sel')) el.classList.remove('is-sel');
    for (const el of tabela.querySelectorAll('.dw-sel-rotulo')) el.remove();
    for (const li of doc.querySelectorAll('.dw-degrau')) li.classList.remove('is-sel');
  };

  const selecionar = (btn) => {
    const e = btn.dataset.estagioBtn;
    const ativar = btn.getAttribute('aria-pressed') !== 'true';
    for (const b of botoes) b.setAttribute('aria-pressed', 'false');
    limpar();
    if (!ativar) return;
    btn.setAttribute('aria-pressed', 'true');
    btn.closest('.dw-degrau')?.classList.add('is-sel');
    for (const el of tabela.querySelectorAll(`[data-e="${e}"]`)) el.classList.add('is-sel');
    const th = tabela.querySelector(`thead [data-e="${e}"]`);
    if (th) {
      const r = doc.createElement('span');
      r.className = 'dw-sel-rotulo';
      r.textContent = 'estágio selecionado';
      th.append(r);
    }
  };

  for (const b of botoes) {
    b.disabled = false;
    b.addEventListener('click', () => selecionar(b));
  }
}
