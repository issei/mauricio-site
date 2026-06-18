/*
 * Quiz de verificação (WU-11) — feedback imediato, determinístico e acessível.
 * Conta acertos únicos por questão; permite tentar de novo até acertar.
 */
const OK = 'Correto! ';
const NO = 'Quase — tente de novo. ';

function initQuiz() {
  const root = document.querySelector('[data-eai-quiz]');
  if (!root) return;
  const scoreEl = root.querySelector('[data-quiz-score]');
  const solved = new WeakSet();
  let score = 0;

  root.querySelectorAll('[data-quiz-q]').forEach((q) => {
    const fb = q.querySelector('[data-quiz-fb]');
    q.querySelectorAll('.eai-quiz__opts button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const correct = btn.getAttribute('data-correct') === 'true';
        // limpa marcações anteriores desta questão
        q.querySelectorAll('.eai-quiz__opts button').forEach((b) =>
          b.classList.remove('is-correct', 'is-wrong')
        );
        if (correct) {
          btn.classList.add('is-correct');
          if (fb) fb.textContent = OK + 'É exatamente isso.';
          if (!solved.has(q)) {
            solved.add(q);
            score += 1;
            if (scoreEl) scoreEl.textContent = String(score);
          }
        } else {
          btn.classList.add('is-wrong');
          if (fb) fb.textContent = NO + 'Reveja o princípio correspondente.';
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuiz);
} else {
  initQuiz();
}
