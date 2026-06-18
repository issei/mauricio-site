/*
 * Painel de progresso da sessão (WU-14) — doc 08 (observabilidade da experiência).
 * Métricas 100% client-side, persistidas em localStorage. Nada é enviado a servidor.
 *  - capítulos abertos (ids únicos)
 *  - melhor score do quiz
 *  - componentes atualmente no playground (ao vivo)
 */
const KEY = 'eai-progress-v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const o = JSON.parse(raw);
      return { chapters: Array.isArray(o.chapters) ? o.chapters : [], quizBest: Number(o.quizBest) || 0 };
    }
  } catch { /* localStorage indisponível → estado em memória */ }
  return { chapters: [], quizBest: 0 };
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignora */ }
}

function initProgress() {
  const root = document.querySelector('[data-eai-prog]');
  if (!root) return;
  const elChap = root.querySelector('[data-prog-chapters]');
  const elQuiz = root.querySelector('[data-prog-quiz]');
  const elComps = root.querySelector('[data-prog-comps]');
  const resetBtn = root.querySelector('[data-prog-reset]');
  const state = load();

  const render = () => {
    if (elChap) elChap.textContent = String(state.chapters.length);
    if (elQuiz) elQuiz.textContent = String(state.quizBest);
  };

  // capítulos abertos
  document.querySelectorAll('.eai-chap').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open && d.id && !state.chapters.includes(d.id)) {
        state.chapters.push(d.id);
        save(state);
        render();
      }
    });
  });

  // melhor score do quiz (observa o contador)
  const scoreEl = document.querySelector('[data-quiz-score]');
  if (scoreEl && 'MutationObserver' in window) {
    const obs = new MutationObserver(() => {
      const n = Number(scoreEl.textContent) || 0;
      if (n > state.quizBest) { state.quizBest = n; save(state); render(); }
    });
    obs.observe(scoreEl, { childList: true, characterData: true, subtree: true });
  }

  // componentes no playground (ao vivo, não persistido)
  const canvas = document.querySelector('[data-pg-canvas]');
  if (canvas && elComps && 'MutationObserver' in window) {
    const upd = () => { elComps.textContent = String(canvas.querySelectorAll('.eai-chip').length); };
    new MutationObserver(upd).observe(canvas, { childList: true });
    upd();
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.chapters = [];
      state.quizBest = 0;
      save(state);
      render();
    });
  }

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgress);
} else {
  initProgress();
}
