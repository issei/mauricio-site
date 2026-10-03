/**
 * V8 — liga o formulário ao modelo puro. Nada sai do navegador e nada é persistido.
 * O botão de resultado nasce `disabled` no HTML; sem JS, a instrução de cálculo manual basta.
 */
import { score, CRITERIOS, FAIXAS } from './prontidao-model.js';

const rotuloDe = Object.fromEntries(CRITERIOS.map((c) => [c.id, c.rotulo]));

export function montarProntidao(doc = document) {
  const form = doc.querySelector('#prontidao-form');
  const saida = doc.querySelector('#prontidao-resultado');
  if (!form || !saida) return;

  const respostas = () => {
    const out = {};
    for (const { id } of CRITERIOS) {
      const marcado = form.querySelector(`input[name="${id}"]:checked`);
      if (marcado) out[id] = Number(marcado.value);
    }
    return out;
  };

  const desenhar = () => {
    const r = respostas();
    const { total, faixa, lacunas } = score(r);
    saida.dataset.faixa = faixa;
    saida.querySelector('[data-total]').textContent = String(total);
    saida.querySelector('[data-faixa]').textContent = FAIXAS[faixa];
    const lista = saida.querySelector('[data-lacunas]');
    lista.replaceChildren(
      ...lacunas.map((id) => {
        const li = doc.createElement('li');
        li.textContent = rotuloDe[id] + (id in r ? '' : ' (sem resposta)');
        return li;
      }),
    );
    saida.querySelector('[data-lacunas-titulo]').hidden = lacunas.length === 0;
  };

  form.addEventListener('change', desenhar);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    desenhar();
  });
  const botao = form.querySelector('button[type="submit"]');
  if (botao) botao.disabled = false;
  // Sem desenhar() inicial: o HTML já traz o estado vazio, e a região viva só fala após uma ação do usuário.
}
