/* =====================================================
   ATMOSPHERIC ENGINE — 08_spec_background.md
   Motor de estados semânticos + capability detection
   ===================================================== */

// Mapeamento data-section → estado atmosférico semântico
const SECTION_STATE_MAP = {
  'hero':         'hero',
  'pergunta':     'tension',
  'apresentacao': 'authority',
  'proposito':    'vision',
  'fundamentos':  'proof',
  'calculadora':  'proof',
  'pausa':        'vision',
  'cozinheiro':   'proof',
  'transicao':    'content',
  'comunicacao':  'content',
  'anatomia':     'content',
  'contexto':     'content',
  'arsenais':     'content',
  'hands-on':     'content',
  'mentoria':     'content',
  'integracao':   'content',
  'fluxo':        'content',
  'reflexao':     'vision',
  'identidade':   'content',
  'lideranca':    'content',
  'amplificacao': 'content',
  'cultura':      'content',
  'gestao':       'content',
  'fechamento':   'conversion',
  'encerramento': 'close',
};

// Detecta nível de enhancement baseado em device e preferências
const detectCapability = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return 'STATIC';

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const concurrency = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 2;

  if (isMobile && memory < 4) return 'MINIMAL';
  if (isMobile) return 'REDUCED';
  if (concurrency < 4) return 'REDUCED';
  return 'FULL';
};

// Aplica delay aleatório nas camadas para evitar loop perceptível
// Números primos como períodos garantem que os ciclos nunca se alinhem
const applyDrift = () => {
  const l1 = document.getElementById('atm-l1');
  const l2 = document.getElementById('atm-l2');
  const l3 = document.getElementById('atm-l3');
  if (l1) l1.style.animationDelay = `-${Math.random() * 20000}ms`;
  if (l2) l2.style.animationDelay = `-${Math.random() * 31000}ms`;
  if (l3) l3.style.animationDelay = `-${Math.random() * 47000}ms`;

  // Drift das camadas aurora (períodos primos distintos dos ciclos base)
  const aa = document.getElementById('atm-aurora-a');
  const ab = document.getElementById('atm-aurora-b');
  const ac = document.getElementById('atm-aurora-c');
  if (aa) aa.style.animationDelay = `-${Math.random() * 29000}ms`;
  if (ab) ab.style.animationDelay = `-${Math.random() * 41000}ms`;
  if (ac) ac.style.animationDelay = `-${Math.random() * 53000}ms`;
};

// Motor de transição de estado semântico
const ATM_STATE_CLASSES = [
  'atm-state--tension',
  'atm-state--authority',
  'atm-state--proof',
  'atm-state--vision',
  'atm-state--content',
  'atm-state--conversion',
  'atm-state--close',
];

let currentState = null;

const applyState = (state) => {
  if (state === currentState) return;

  const html = document.documentElement;
  html.classList.remove(...ATM_STATE_CLASSES);

  // 'hero' é o estado default — sem classe adicional
  if (state !== 'hero') {
    html.classList.add(`atm-state--${state}`);
  }

  currentState = state;
};

// IntersectionObserver com debounce para prevenir flicker em scroll rápido
// Rastreia visibility ratio de todas as seções; aplica estado da seção dominante
// após 120ms de estabilidade (absorve passagens rápidas por múltiplas seções)
const initSemanticEngine = () => {
  const sectionVisibility = new Map();
  let pendingUpdate = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const key = entry.target.dataset.section;
      if (!key) return;

      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        sectionVisibility.set(key, entry.intersectionRatio);
      } else {
        sectionVisibility.delete(key);
      }
    });

    // Debounce: cancela update pendente e agenda novo após 120ms
    // Garante que só a seção dominante ao final do scroll é aplicada
    clearTimeout(pendingUpdate);
    pendingUpdate = setTimeout(() => {
      let maxRatio = 0;
      let dominantSection = null;

      for (const [section, ratio] of sectionVisibility) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          dominantSection = section;
        }
      }

      if (dominantSection) {
        const newState = SECTION_STATE_MAP[dominantSection] ?? 'content';
        applyState(newState);
      }
    }, 120);

  }, {
    // Múltiplos thresholds para rastrear visibility com granularidade
    // evita transições em cruzamentos superficiais de borda de seção
    threshold: [0, 0.1, 0.25, 0.35, 0.5, 0.75],
  });

  document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
};

// Monitoramento de bateria — degrada para STATIC em bateria crítica
const initBatteryMonitor = () => {
  if (!('getBattery' in navigator)) return;

  navigator.getBattery().then((battery) => {
    const check = () => {
      if (battery.level < 0.2 && !battery.charging) {
        document.documentElement.classList.add('atm--static');
      }
    };
    check();
    battery.addEventListener('levelchange', check);
    battery.addEventListener('chargingchange', check);
  });
};

export const initAtmospheric = () => {
  // 1. Detectar Safari iOS — desabilitar mix-blend-mode problemático em scroll
  const isSafariIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isSafariIOS) document.documentElement.classList.add('atm--no-blend');

  // 2. Detectar capability e aplicar nível de enhancement
  const level = detectCapability();
  const levelClass = {
    FULL:    null,           // nenhuma classe = enhancement completo
    REDUCED: 'atm--reduced',
    MINIMAL: 'atm--minimal',
    STATIC:  'atm--static',
  }[level];

  if (levelClass) document.documentElement.classList.add(levelClass);

  // 3. Aplicar drift anti-loop (só se animações forem ativas)
  if (level === 'FULL' || level === 'REDUCED') {
    applyDrift();
  }

  // 4. Iniciar motor semântico (IntersectionObserver com debounce)
  initSemanticEngine();

  // 5. Monitorar bateria
  initBatteryMonitor();
};
