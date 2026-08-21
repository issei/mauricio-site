/**
 * Enriquecimentos de leitura: barra de progresso, marco ativo na navegação,
 * revelação de blocos e desenho dos traços de gráfico ao entrar na viewport.
 *
 * Todos são opcionais por construção: se este módulo não rodar, a página
 * continua completa — o CSS só esconde `.fp-reveal` quando a classe `js` está
 * no elemento raiz, aplicada aqui.
 */

const semMovimento = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function barraDeLeitura(alvo = document.querySelector('[data-readbar]')) {
  if (!alvo) return false;
  const atualizar = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const razao = total > 0 ? window.scrollY / total : 0;
    alvo.style.width = `${Math.min(100, Math.max(0, razao * 100)).toFixed(2)}%`;
  };
  window.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);
  atualizar();
  return true;
}

export function marcoAtivo() {
  const links = [...document.querySelectorAll('[data-navlink]')];
  const secoes = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!secoes.length || !('IntersectionObserver' in window)) return false;

  const obs = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      for (const a of links) {
        a.setAttribute('aria-current', a.getAttribute('href') === `#${e.target.id}` ? 'true' : 'false');
      }
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  for (const s of secoes) obs.observe(s);
  return true;
}

export function revelar() {
  const blocos = [...document.querySelectorAll('.fp-reveal')];
  const tracos = [...document.querySelectorAll('[data-draw]')];
  if (!blocos.length && !tracos.length) return false;

  document.documentElement.classList.add('js');

  // Quem já está na viewport nasce revelado, no mesmo quadro: evita o piscar
  // de um bloco que aparece escondido e só depois é revelado pelo observador.
  const jaVisivel = (el) => el.getBoundingClientRect().top < window.innerHeight;
  for (const b of blocos) if (jaVisivel(b)) b.classList.add('is-in');

  const desenhar = (t) => {
    if (typeof t.getTotalLength === 'function') {
      const comprimento = Math.ceil(t.getTotalLength());
      t.style.setProperty('--fp-len', String(comprimento));
    }
    t.classList.add('is-drawn');
  };

  if (semMovimento() || !('IntersectionObserver' in window)) {
    for (const b of blocos) b.classList.add('is-in');
    for (const t of tracos) t.classList.add('is-drawn');
    return true;
  }

  const obs = new IntersectionObserver((entradas, o) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      if (e.target.classList.contains('fp-reveal')) e.target.classList.add('is-in');
      if (e.target.hasAttribute('data-draw')) desenhar(e.target);
      o.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });

  for (const el of [...blocos, ...tracos]) obs.observe(el);
  return true;
}
