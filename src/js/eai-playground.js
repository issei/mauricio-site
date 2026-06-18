/*
 * Playground (WU-12) — doc 06 §2.
 * Monte uma arquitetura (clique p/ adicionar/remover) e receba avaliação por
 * REGRAS DETERMINÍSTICAS. Função pura evaluate(Set) — mesma arquitetura, mesmo veredito.
 * (Sem drag-and-drop nativo: clique é acessível e testável.)
 */
export function evaluate(set) {
  const has = (c) => set.has(c);
  const v = [];

  if (set.size === 0) {
    return { verdicts: [], label: 'Adicione componentes para avaliar.', sev: 'warn' };
  }

  if (!has('LLM')) v.push(['warn', 'Sem LLM: é um pipeline clássico — confiável, mas sem o resíduo interpretativo.']);
  if (has('LLM') && !has('Schema')) v.push(['bad', 'LLM sem Schema: saída não validada pode propagar alucinação (P5).']);
  if (has('Schema')) v.push(['good', 'Contratos validam as fronteiras (P5).']);
  if (has('LLM') && !has('Guardrails') && !has('Human Review')) v.push(['warn', 'Sem Guardrails nem Revisão Humana: risco de loops/ações indevidas.']);
  if (!has('BDD')) v.push(['warn', 'Ausência de BDD: comportamento não verificado.']);
  else v.push(['good', 'BDD dá um alvo executável e governança fail-closed (P9).']);
  if (has('LLM') && !has('Ledger')) v.push(['bad', 'LLM sem Ledger: sem teto de custo — risco de fatura inesperada (P8).']);
  if (has('Ledger')) v.push(['good', 'Ledger governa o orçamento de tokens (P8).']);
  if (!has('Observabilidade')) v.push(['warn', 'Sem Observabilidade: difícil auditar e detectar drift.']);
  else v.push(['good', 'Observabilidade aumenta a auditabilidade (P10).']);
  if (has('Cache')) v.push(['good', 'Cache/Corpus evita pagar duas vezes pelo mesmo trabalho.']);
  if (has('RAG') && !has('Schema')) v.push(['warn', 'RAG traz dado de mundo aberto: sanitize/valide antes do Cérebro.']);
  if (has('Human Review')) v.push(['good', 'Revisão humana cobre os casos de baixa confiança.']);

  const bad = v.filter((x) => x[0] === 'bad').length;
  const warn = v.filter((x) => x[0] === 'warn').length;

  let label, sev;
  if (bad > 0) { label = 'Arquitetura com riscos críticos.'; sev = 'bad'; }
  else if (warn > 1) { label = 'Arquitetura aceitável, com lacunas.'; sev = 'warn'; }
  else { label = 'Excelente governança.'; sev = 'good'; }
  return { verdicts: v, label, sev };
}

function initPlayground() {
  const root = document.querySelector('[data-eai-pg]');
  if (!root) return;
  const canvas = root.querySelector('[data-pg-canvas]');
  const empty = root.querySelector('[data-pg-empty]');
  const verdict = root.querySelector('[data-pg-verdict]');
  const list = root.querySelector('[data-pg-list]');
  const selected = new Set();

  const renderCanvas = () => {
    // remove chips antigos (mantém o parágrafo "empty")
    canvas.querySelectorAll('.eai-chip').forEach((c) => c.remove());
    empty.style.display = selected.size ? 'none' : '';
    selected.forEach((comp) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'eai-chip';
      chip.setAttribute('data-chip', comp);
      chip.innerHTML = `${comp} <span aria-hidden="true">×</span>`;
      chip.setAttribute('aria-label', `Remover ${comp}`);
      chip.addEventListener('click', () => toggle(comp));
      canvas.appendChild(chip);
    });
  };

  const renderFeedback = () => {
    const res = evaluate(selected);
    verdict.textContent = res.label;
    verdict.setAttribute('data-sev', res.sev);
    list.innerHTML = '';
    res.verdicts.forEach(([sev, text]) => {
      const li = document.createElement('li');
      li.className = 'eai-pg__item';
      li.setAttribute('data-sev', sev);
      li.textContent = text;
      list.appendChild(li);
    });
  };

  const sync = () => {
    root.querySelectorAll('.eai-pg__palette button').forEach((b) => {
      const on = selected.has(b.getAttribute('data-comp'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderCanvas();
    renderFeedback();
  };

  const toggle = (comp) => {
    if (selected.has(comp)) selected.delete(comp);
    else selected.add(comp);
    sync();
  };

  root.querySelectorAll('.eai-pg__palette button').forEach((b) => {
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => toggle(b.getAttribute('data-comp')));
  });
  sync();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayground);
} else {
  initPlayground();
}
