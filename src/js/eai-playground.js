/*
 * Playground (WU-12 + T5) — bootstrap de DOM.
 * Regras puras em eai-playground-rules.js. Feedback estruturado: última ação +
 * avisos por regra + veredito qualitativo (sem pontuação numérica — ver PROGRESS D4).
 */
import { evaluate, insightFor } from './eai-playground-rules.js';

function initPlayground() {
  const root = document.querySelector('[data-eai-pg]');
  if (!root) return;
  const canvas = root.querySelector('[data-pg-canvas]');
  const empty = root.querySelector('[data-pg-empty]');
  const lastAction = root.querySelector('[data-pg-last-action]');
  const warnings = root.querySelector('[data-pg-warnings]');
  const verdict = root.querySelector('[data-pg-verdict]');
  const selected = new Set();

  const renderCanvas = () => {
    canvas.querySelectorAll('.eai-chip').forEach((c) => c.remove());
    if (empty) empty.style.display = selected.size ? 'none' : '';
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
    if (verdict) {
      verdict.textContent = res.label;
      verdict.setAttribute('data-sev', res.sev);
    }
    if (warnings) {
      warnings.innerHTML = '';
      res.verdicts.forEach(({ sev, message }) => {
        const li = document.createElement('li');
        li.className = 'eai-pg__item';
        li.setAttribute('data-sev', sev);
        li.textContent = message;
        warnings.appendChild(li);
      });
    }
  };

  const renderLastAction = (comp, isAdd) => {
    if (!lastAction) return;
    const text = insightFor(comp, isAdd);
    if (!text) { lastAction.textContent = ''; lastAction.removeAttribute('data-act'); return; }
    lastAction.setAttribute('data-act', isAdd ? 'add' : 'remove');
    lastAction.innerHTML = `<span class="eai-pg__act-tag">${isAdd ? '+ ' + comp : '− ' + comp}</span> ${text}`;
  };

  const sync = (changed, isAdd) => {
    root.querySelectorAll('.eai-pg__palette button').forEach((b) => {
      const on = selected.has(b.getAttribute('data-comp'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderCanvas();
    renderFeedback();
    if (changed) renderLastAction(changed, isAdd);
  };

  const toggle = (comp) => {
    const isAdd = !selected.has(comp);
    if (isAdd) selected.add(comp); else selected.delete(comp);
    sync(comp, isAdd);
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
