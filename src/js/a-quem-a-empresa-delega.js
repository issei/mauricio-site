/**
 * Checklist "5 perguntas antes de ligar a IA".
 * Spec: docs/specs/pages/a-quem-a-empresa-delega/SPEC.md (RF-dl-02, RF-dl-03).
 *
 * Regra não compensatória: as respostas não viram nota. Basta um "Não" ou
 * "Não sei" para o resultado ser "Pare aqui". Nada é gravado nem enviado.
 */
const TOTAL = 5;

const raiz = document.querySelector('[data-checklist]');
if (raiz) {
  const progresso = raiz.querySelector('[data-progresso]');
  const resultado = raiz.querySelector('[data-resultado]');
  const modelos = {
    ok: raiz.querySelector('template[data-modelo="ok"]'),
    pare: raiz.querySelector('template[data-modelo="pare"]'),
  };

  const atualizar = () => {
    const marcadas = [...raiz.querySelectorAll('input[type="radio"]:checked')];
    progresso.textContent = `Você respondeu ${marcadas.length} de ${TOTAL}.`;
    resultado.replaceChildren();
    const temBloqueio = marcadas.some((r) => r.value !== 'sim');
    if (temBloqueio) {
      resultado.append(modelos.pare.content.cloneNode(true));
      return;
    }
    if (marcadas.length === TOTAL) resultado.append(modelos.ok.content.cloneNode(true));
  };

  raiz.addEventListener('change', atualizar);
  progresso.hidden = false;
  raiz.querySelectorAll('fieldset[hidden]').forEach((f) => { f.hidden = false; });
}
