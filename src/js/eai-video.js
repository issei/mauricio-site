/*
 * engenharia-agentes-ia — vídeo-âncora do Hero (facade click-to-play)
 *
 * Objetivos:
 *  - LCP: o iframe do YouTube NÃO é carregado no load; só nasce ao ativar o botão.
 *  - Movimento: respeita prefers-reduced-motion. Se o usuário reduziu movimento,
 *    o player NÃO recebe autoplay — ele aparece focado e parado, o usuário decide
 *    quando dar play (operação 100% por teclado).
 *  - Privacidade: youtube-nocookie.
 * Tudo guardado: nunca lança erro na carga.
 */
const prefersReduced =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mount(root) {
  const frame = root.querySelector('[data-eai-video-frame]');
  const trigger = root.querySelector('[data-eai-video-trigger]');
  const id = root.getAttribute('data-eai-video-id');
  if (!frame || !trigger || !id) return;

  let loaded = false;
  trigger.addEventListener('click', () => {
    if (loaded) return;
    loaded = true;

    const autoplay = prefersReduced ? '0' : '1';
    const params = new URLSearchParams({
      autoplay,
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });

    const iframe = document.createElement('iframe');
    iframe.className = 'eai-video__iframe';
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
    iframe.title = trigger.getAttribute('aria-label') || 'Vídeo explicativo';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('loading', 'lazy');

    frame.replaceChildren(iframe);
    // Leva o foco do teclado para dentro do player recém-criado.
    iframe.focus({ preventScroll: true });
  });
}

function init() {
  document.querySelectorAll('[data-eai-video]').forEach(mount);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
