// Widget de Autodiagnóstico (Seção 04). Stepper client-side puro, sem backend.
// Renderiza as perguntas de diagnostic-data.js, calcula os índices e monta o
// card de resultado dinâmico.
import { QUESTIONS, ANTIDOTES } from './diagnostic-data.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function buildStepMarkup(q, index) {
  const options = q.options
    .map(
      (opt) => `
      <label class="art-option">
        <input type="radio" name="${q.id}" value="${opt.value}" data-weight="${opt.weight}" required />
        <span>
          <span class="block text-sm text-art-text">${esc(opt.label)}</span>
          <span class="block text-xs text-art-muted art-mono mt-1">${esc(opt.tag)}</span>
        </span>
      </label>`
    )
    .join('');

  return `
    <fieldset class="art-step" data-step="${index}" ${index === 0 ? '' : 'hidden'}>
      <legend class="text-lg font-semibold text-art-text mb-4">
        <span class="art-mono text-art-cyan text-sm block mb-1">Pergunta ${index + 1} de ${QUESTIONS.length}</span>
        ${esc(q.text)}
      </legend>
      <div class="space-y-3">${options}</div>
    </fieldset>`;
}

function classify(pct) {
  if (pct >= 66) return { level: 'alto', color: '--color-art-rose' };
  if (pct >= 33) return { level: 'moderado', color: '--color-art-cyan' };
  return { level: 'baixo', color: '--color-art-cyan' };
}

function extrativismoGrau(weight) {
  if (weight === 2) return 'Crítico';
  if (weight === 1) return 'Moderado';
  return 'Nulo';
}

function computeScores(answers) {
  const w = (id) => answers[id] ?? 0;
  const invisibilidadePct = Math.round(((w('q1') + w('q3')) / 4) * 100);
  const autoexploracaoPct = Math.round(((w('q4') + w('q2')) / 4) * 100);
  const overallPct = Math.round(((w('q1') + w('q2') + w('q3') + w('q4')) / 8) * 100);
  return {
    invisibilidadePct,
    autoexploracaoPct,
    extrativismoGrau: extrativismoGrau(w('q2')),
    overallPct,
  };
}

function theoryFor(overallPct) {
  if (overallPct >= 66) {
    return {
      titulo: 'ALTO RISCO DE EXTRATIVISMO DE LIDERANÇA',
      corpo:
        'Você está vivendo o <strong>"Otimismo Cruel"</strong> (Lauren Berlant). Sua lealdade e mentoria estão sustentando a equipe sem contrapartida de poder real ou promoção — o objeto que prometia reconhecimento virou o obstáculo ao seu próprio florescimento.',
    };
  }
  if (overallPct >= 33) {
    return {
      titulo: 'RISCO MODERADO — SINAIS DA SOCIEDADE DO DESEMPENHO',
      corpo:
        'Você transita entre reconhecimento real e <strong>autoexploração</strong> (Byung-Chul Han): parte do seu esforço já é valorizado, mas em momentos de pressão você ainda se torna "seu próprio vigilante e carrasco" diante de falhas estruturais da organização.',
    };
  }
  return {
    titulo: 'BAIXO RISCO — TRAJETÓRIA DE MATURIDADE TÉCNICA',
    corpo:
      'Seus sinais indicam <strong>reconhecimento institucional</strong> (Axel Honneth) e separação saudável entre identidade pessoal e cargo. Continue auditando isso periodicamente: contextos organizacionais mudam mais rápido do que carreiras.',
  };
}

export function initDiagnostic(root) {
  if (!root) return;

  const stepsEl = root.querySelector('#diagnostic-steps');
  const form = root.querySelector('#diagnostic-form');
  const nextBtn = root.querySelector('#diagnostic-next');
  const backBtn = root.querySelector('#diagnostic-back');
  const stepLabel = root.querySelector('#diagnostic-step-label');
  const stepPct = root.querySelector('#diagnostic-step-pct');
  const progressFill = root.querySelector('#diagnostic-progress-fill');
  const resultEl = root.querySelector('#diagnostic-result');

  if (!stepsEl || !form) return;

  stepsEl.innerHTML = QUESTIONS.map(buildStepMarkup).join('');

  let current = 0;
  const answers = {};

  function currentFieldset() {
    return stepsEl.querySelector(`.art-step[data-step="${current}"]`);
  }

  function isAnswered() {
    const fs = currentFieldset();
    return !!fs?.querySelector('input:checked');
  }

  function updateUI() {
    stepsEl.querySelectorAll('.art-step').forEach((fs) => {
      fs.hidden = Number(fs.dataset.step) !== current;
    });
    const pct = Math.round(((current + 1) / QUESTIONS.length) * 100);
    stepLabel.textContent = `Passo ${current + 1} de ${QUESTIONS.length}`;
    stepPct.textContent = `${pct}%`;
    progressFill.style.width = `${pct}%`;
    backBtn.disabled = current === 0;
    nextBtn.textContent = current === QUESTIONS.length - 1 ? 'Ver meu diagnóstico' : 'Próxima pergunta →';
    nextBtn.disabled = !isAnswered();
  }

  stepsEl.addEventListener('change', (e) => {
    const input = e.target.closest('input[type="radio"]');
    if (!input) return;
    answers[input.name] = Number(input.dataset.weight);
    nextBtn.disabled = false;
  });

  backBtn.addEventListener('click', () => {
    if (current === 0) return;
    current -= 1;
    updateUI();
  });

  nextBtn.addEventListener('click', () => {
    if (!isAnswered()) return;
    if (current < QUESTIONS.length - 1) {
      current += 1;
      updateUI();
      return;
    }
    finish();
  });

  function finish() {
    const scores = computeScores(answers);
    const theory = theoryFor(scores.overallPct);
    renderResult(scores, theory);
    form.hidden = true;
    resultEl.hidden = false;
    resultEl.setAttribute('tabindex', '-1');
    resultEl.focus({ preventScroll: false });
  }

  function renderResult(scores, theory) {
    resultEl.innerHTML = `
      <div class="art-card p-6 md:p-8">
        <p class="art-mono text-xs uppercase tracking-widest text-art-rose mb-2">Seu diagnóstico</p>
        <h3 class="text-xl md:text-2xl font-bold text-art-text mb-6">${esc(theory.titulo)}</h3>

        <div class="space-y-4 mb-6">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-art-muted">Nível de Invisibilidade Técnica</span>
              <span class="art-mono text-art-text" data-testid="invisibilidade-pct">${scores.invisibilidadePct}%</span>
            </div>
            <div class="art-metric-bar"><div class="art-metric-bar__fill art-metric-bar__fill--cyan" style="width:${scores.invisibilidadePct}%"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-art-muted">Nível de Autoexploração Punitiva</span>
              <span class="art-mono text-art-text" data-testid="autoexploracao-pct">${scores.autoexploracaoPct}%</span>
            </div>
            <div class="art-metric-bar"><div class="art-metric-bar__fill art-metric-bar__fill--rose" style="width:${scores.autoexploracaoPct}%"></div></div>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-art-muted">Grau de Extrativismo de Liderança</span>
            <span class="art-mono text-art-text px-2 py-1 rounded border border-art-border" data-testid="extrativismo-grau">${esc(scores.extrativismoGrau)}</span>
          </div>
        </div>

        <p class="text-sm text-art-muted leading-relaxed mb-6">${theory.corpo}</p>

        <div class="border-t border-art-border pt-5">
          <p class="text-xs uppercase tracking-widest text-art-cyan art-mono mb-1">Caminhos de emancipação</p>
          <p class="text-xs text-art-muted mb-3">
            O diagnóstico não termina na estrutura: começa no que você controla a partir de segunda-feira.
          </p>
          <ol class="space-y-2 text-sm text-art-text list-decimal list-inside">
            ${ANTIDOTES.map((a) => `<li>${esc(a)}</li>`).join('')}
          </ol>
        </div>

        <div class="flex flex-wrap gap-3 mt-6">
          <a href="#antidoto" class="art-cta-gradient text-[#041018] font-semibold py-2.5 px-5 rounded-lg text-sm">Ver o framework de métricas reais →</a>
          <button type="button" id="diagnostic-restart" class="border border-art-border text-art-muted hover:text-art-text py-2.5 px-5 rounded-lg text-sm">↻ Refazer diagnóstico</button>
        </div>
      </div>`;

    resultEl.querySelector('#diagnostic-restart')?.addEventListener('click', reset);
  }

  function reset() {
    Object.keys(answers).forEach((k) => delete answers[k]);
    stepsEl.querySelectorAll('input[type="radio"]').forEach((i) => { i.checked = false; });
    current = 0;
    form.hidden = false;
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    updateUI();
  }

  form.addEventListener('submit', (e) => e.preventDefault());
  updateUI();

  // Ganchos de teste (padrão da casa, ver operacao-capital-cognitivo/main.js).
  window.__DEBUG_artificeScores = () => computeScores(answers);
}
