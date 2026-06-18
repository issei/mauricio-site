/*
 * Quiz de verificação (WU-11 + T2) — bootstrap de DOM.
 * Dados e feedback em eai-quiz-data.js. Feedback que ENSINA: errada explica o erro,
 * certa nomeia o princípio e linka para o capítulo/card correspondente.
 */
import { feedbackFor, scoreMessage, QUIZ } from './eai-quiz-data.js';

function initQuiz() {
  const root = document.querySelector('[data-eai-quiz]');
  if (!root) return;
  const scoreEl = root.querySelector('[data-quiz-score]');
  const summaryEl = root.querySelector('[data-quiz-summary]');
  const total = QUIZ.length;
  const solved = new Set();
  let score = 0;

  const renderScore = () => {
    if (scoreEl) scoreEl.textContent = String(score);
    if (summaryEl) summaryEl.textContent = score > 0 ? scoreMessage(score, total) : '';
  };

  root.querySelectorAll('[data-quiz-q]').forEach((q) => {
    const id = q.getAttribute('data-qid');
    const fb = q.querySelector('[data-quiz-fb]');
    const buttons = Array.from(q.querySelectorAll('.eai-quiz__opts button'));

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const result = feedbackFor(id, index);
        if (!result) return;

        buttons.forEach((b) => b.classList.remove('is-correct', 'is-wrong'));
        btn.classList.add(result.correct ? 'is-correct' : 'is-wrong');

        if (fb) {
          fb.setAttribute('data-state', result.correct ? 'correct' : 'wrong');
          const link = result.correct
            ? ` <a class="eai-quiz__fb-link" href="${result.principleAnchor}">${result.principle} →</a>`
            : ` <a class="eai-quiz__fb-link" href="${result.chapter}">Revisar o capítulo →</a>`;
          fb.innerHTML = `<span class="eai-quiz__fb-text">${result.text}</span>${link}`;
        }

        if (result.correct && !solved.has(id)) {
          solved.add(id);
          score += 1;
          renderScore();
        }
      });
    });
  });

  renderScore();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuiz);
} else {
  initQuiz();
}
