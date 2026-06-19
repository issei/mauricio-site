/*
 * A Engenharia da Confiança — comportamento da página (Vanilla JS, ES6 modules).
 * Spec: docs/specs/pages/engenharia-confianca/ (docs 01–06).
 *
 * Princípio de design (00 §3.4): tudo é progressive enhancement — a narrativa
 * funciona sem JS. Aqui ligamos: barra de progresso de leitura, observador de
 * jornada (nav ativo + marcadores + selo de maturidade), glossário (sidebar/drawer
 * + termos inline), régua de maturidade interativa, práticas de M0/M2, Mermaid com
 * fallback textual e scroll-reveal — sempre respeitando prefers-reduced-motion.
 */

const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================ Barra de progresso de leitura ============================ */
function initReadbar() {
  const bar = document.querySelector('[data-ec-readbar]');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/* ============================ Jornada: nav ativo + marcadores + maturidade ============================ */
// Cada módulo move o leitor um degrau na maturidade (00 §3.1). Mapeamos a seção
// visível ao estágio que ela atinge.
const MATURITY = {
  '#modulo-0': { lvl: 2, name: 'Consciência' },
  '#modulo-1': { lvl: 3, name: 'Mapeado' },
  '#modulo-2': { lvl: 4, name: 'Arquitetado' },
  '#modulo-3': { lvl: 5, name: 'Governado' },
  '#maturidade': { lvl: 5, name: 'Governado' },
};
const MODULE_INDEX = { '#modulo-0': 0, '#modulo-1': 1, '#modulo-2': 2, '#modulo-3': 3 };

function initJourneyObserver() {
  const sections = Array.from(
    document.querySelectorAll('#modulo-0, #modulo-1, #modulo-2, #modulo-3, #maturidade')
  );
  if (!sections.length) return;

  const navLinks = Array.from(document.querySelectorAll('[data-ec-navlink]'));
  const steps = Array.from(document.querySelectorAll('[data-ec-journey] .ec-journey__step'));
  const matLvl = document.querySelector('[data-mat-lvl]');
  const matName = document.querySelector('[data-mat-name]');

  let currentId = null;

  const setActive = (id) => {
    if (id === currentId) return;
    currentId = id;

    // nav
    navLinks.forEach((a) => {
      const on = a.getAttribute('href') === id;
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });

    // marcadores de jornada (done para os anteriores, active para o atual)
    const activeIdx = id in MODULE_INDEX ? MODULE_INDEX[id] : 3;
    steps.forEach((s) => {
      const idx = Number(s.dataset.step);
      if (idx < activeIdx) s.dataset.state = 'done';
      else if (idx === activeIdx) s.dataset.state = 'active';
      else delete s.dataset.state;
    });

    // selo de maturidade
    const m = MATURITY[id];
    if (m && matLvl && matName) {
      matLvl.textContent = String(m.lvl);
      matName.textContent = m.name;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // escolhe a seção mais visível
      let best = null;
      entries.forEach((e) => {
        if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
      });
      if (best) setActive(`#${best.target.id}`);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5] }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ============================ Glossário: drawer + termos inline ============================ */
function initGlossary() {
  const aside = document.querySelector('[data-ec-gloss]');
  const drawer = document.querySelector('[data-ec-drawer]');
  const drawerPanel = document.querySelector('[data-ec-drawer-panel]');
  const fab = document.querySelector('[data-ec-gloss-open]');
  const desktopMq = window.matchMedia('(min-width: 1100px)');
  if (!aside) return;

  let lastFocus = null;

  const isDesktop = () => desktopMq.matches;

  const openDrawer = () => {
    if (!drawer || !drawerPanel) return;
    lastFocus = document.activeElement;
    // move o glossário para dentro do drawer (fonte única, sem duplicar IDs)
    drawerPanel.appendChild(aside);
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (fab) fab.setAttribute('aria-expanded', 'true');
    const closeBtn = drawer.querySelector('[data-ec-gloss-close]');
    if (closeBtn && closeBtn.focus) closeBtn.focus();
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (fab) fab.setAttribute('aria-expanded', 'false');
    // devolve o glossário para a sidebar (layout)
    const layout = document.querySelector('.ec-layout');
    const content = document.querySelector('.ec-content');
    if (layout && content) layout.insertBefore(aside, content);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  if (fab) fab.addEventListener('click', openDrawer);
  document.querySelectorAll('[data-ec-gloss-close]').forEach((el) => {
    el.addEventListener('click', closeDrawer);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  // destaca um verbete (flash) e rola até ele
  const flashEntry = (term) => {
    const entry = document.getElementById(`g-${term}`);
    if (!entry) return;
    entry.scrollIntoView({ block: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    entry.classList.remove('is-flash');
    // reflow para reiniciar a transição
    void entry.offsetWidth;
    entry.classList.add('is-flash');
    window.setTimeout(() => entry.classList.remove('is-flash'), 2200);
  };

  // termos inline: abrem o drawer (mobile) ou destacam na sidebar (desktop)
  document.querySelectorAll('.ec-term[data-term]').forEach((btn) => {
    btn.setAttribute('aria-describedby', `g-${btn.dataset.term}`);
    btn.addEventListener('click', () => {
      const term = btn.dataset.term;
      if (isDesktop()) {
        flashEntry(term);
      } else {
        openDrawer();
        // espera o drawer abrir antes de rolar até o verbete
        window.setTimeout(() => flashEntry(term), 120);
      }
    });
  });

  // se o usuário cruzar o breakpoint com o drawer aberto, normaliza
  desktopMq.addEventListener?.('change', () => {
    if (isDesktop() && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });
}

/* ============================ Régua de maturidade interativa ============================ */
const RULER = {
  1: {
    name: 'Mágica',
    symptom: '"Funcionou na demo." Confia no resultado bonito sem entender por quê.',
    next: 'Comece pelo Módulo 0: aprenda a reconhecer o Crash Silencioso. Aponte uma falha que aconteceu sem nenhum alerta vermelho.',
    href: '#modulo-0',
  },
  2: {
    name: 'Consciência',
    symptom: 'Reconhece o Crash Silencioso e o resíduo interpretativo; sabe o que não sabe.',
    next: 'Vá ao Módulo 1: congele o As-Is. Escolha uma jornada crítica de negócio e mapeie o que ela toca antes de mudar qualquer coisa.',
    href: '#modulo-1',
  },
  3: {
    name: 'Mapeado',
    symptom: 'Tornou o implícito explícito; tem um inventário auditável dos comportamentos do As-Is.',
    next: 'Avance ao Módulo 2: ponha contratos em toda fronteira e isole o LLM dentro de etapas determinísticas. Pergunte "e se eu não fizer isso?" para cada princípio.',
    href: '#modulo-2',
  },
  4: {
    name: 'Arquitetado',
    symptom: 'Comportamento governado por contratos, determinismo e fronteiras (MCP).',
    next: 'Suba ao Módulo 3: transforme prompts efêmeros em especificação versionada (SDD) e comece a acumular Skills, Playbooks e Knowledge.',
    href: '#modulo-3',
  },
  5: {
    name: 'Governado / Intencional',
    symptom: 'A especificação é a fonte da verdade; a inteligência organizacional acumula em Skills/Knowledge.',
    next: 'Você fechou o ciclo. Mantenha a spec como fonte da verdade: ao evoluir, atualize a especificação antes do código — e ensine o método ao time.',
    href: '#maturidade',
  },
};

function initRuler() {
  const root = document.querySelector('[data-ec-ruler]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll('[role="tab"][data-stage]'));
  const panel = root.querySelector('[data-ec-ruler-panel]');
  if (!panel) return;

  const select = (stage) => {
    const data = RULER[stage];
    if (!data) return;
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.stage === String(stage) ? 'true' : 'false'));
    panel.innerHTML = `
      <h3>Estágio ${stage} · ${data.name}</h3>
      <p class="ec-ruler__sym">${data.symptom}</p>
      <p class="ec-ruler__next"><strong>Próximo passo:</strong> ${data.next}</p>
      <p style="margin-top:0.6rem;"><a href="${data.href}" class="ec-reflect__jump">Ir para o passo →</a></p>
    `;
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(Number(tab.dataset.stage)));
    // navegação por teclado entre tabs (setas)
    tab.addEventListener('keydown', (e) => {
      let target = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = tabs[(i - 1 + tabs.length) % tabs.length];
      if (target) {
        e.preventDefault();
        target.focus();
        select(Number(target.dataset.stage));
      }
    });
  });
}

/* ============================ Prática M0: classificar cenários ============================ */
const SCENARIO_FB = {
  silencioso: {
    correct: 'Exato. Nenhum erro foi lançado, mas valor se perdeu — é um Crash Silencioso.',
    wrong: 'Repare: não houve exceção nem stack trace. A falha é de intenção, não de código — é um Crash Silencioso.',
  },
  visivel: {
    correct: 'Isso. O sistema gritou (exceção, deploy quebrado) — falha visível, barulhenta mas segura.',
    wrong: 'Aqui houve erro explícito (exceção/deploy quebrado). É uma falha visível, não silenciosa.',
  },
};

function initClassify() {
  const root = document.querySelector('[data-ec-classify]');
  if (!root) return;
  root.querySelectorAll('.ec-scenario').forEach((card) => {
    const answer = card.dataset.answer;
    const fb = card.querySelector('.ec-scenario__fb');
    card.querySelectorAll('.ec-scenario__btns button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pick = btn.dataset.pick;
        const correct = pick === answer;
        card.dataset.state = correct ? 'correct' : 'wrong';
        if (fb) fb.textContent = SCENARIO_FB[answer][correct ? 'correct' : 'wrong'];
      });
    });
  });
}

/* ============================ Mermaid (CDN) com fallback textual ============================ */
async function initMermaid() {
  const figures = Array.from(document.querySelectorAll('[data-ec-mermaid]'));
  if (!figures.length) return;

  const markFallback = () =>
    figures.forEach((fig) => {
      fig.dataset.fallback = 'true';
      const alt = fig.querySelector('.ec-mermaid__alt');
      if (alt) alt.setAttribute('open', '');
    });

  let mermaid;
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
    mermaid = mod.default;
  } catch {
    // offline / CDN bloqueado: o equivalente textual assume (00 §3.4, 04 §7).
    markFallback();
    return;
  }

  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        background: '#0d1117',
        primaryColor: '#161b22',
        primaryTextColor: '#e6edf3',
        primaryBorderColor: '#30363d',
        lineColor: '#8b949e',
        secondaryColor: '#1c2230',
        tertiaryColor: '#161b22',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      },
    });
  } catch {
    markFallback();
    return;
  }

  let idx = 0;
  for (const fig of figures) {
    const src = fig.querySelector('[data-ec-mermaid-src]');
    const graph = fig.querySelector('[data-ec-mermaid-graph]');
    if (!src || !graph) continue;
    const code = src.textContent.trim();
    try {
      const { svg } = await mermaid.render(`ec-mmd-${idx++}`, code);
      graph.innerHTML = svg;
    } catch {
      fig.dataset.fallback = 'true';
      const alt = fig.querySelector('.ec-mermaid__alt');
      if (alt) alt.setAttribute('open', '');
    }
  }
}

/* ============================ Scroll reveal ============================ */
function initReveal() {
  const items = Array.from(document.querySelectorAll('.ec-reveal'));
  if (!items.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          o.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );
  items.forEach((el) => obs.observe(el));
}

/* ============================ Boot ============================ */
function boot() {
  initReadbar();
  initJourneyObserver();
  initGlossary();
  initRuler();
  initClassify();
  initReveal();
  // Mermaid por último: render pesado, não bloqueia o restante.
  initMermaid();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
