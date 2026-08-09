// Hub Multimídia — Vídeo-Síntese (spec 01, WU-03).
// -----------------------------------------------------------------------------
// Os marcadores de tempo avançam o vídeo trocando o `src` do iframe com o
// parâmetro `start=` (+ autoplay, que aqui é legítimo porque parte de um clique
// do usuário). Preferimos isto à YouTube IFrame API: seek determinístico, sem
// carregar script de terceiro no caminho crítico e sem dependência nova.
//
// Privacidade: youtube-nocookie.com (sem cookie de rastreio antes do play).

const ORIGIN = 'https://www.youtube-nocookie.com';

/** Monta a URL de embed do vídeo, opcionalmente começando em `start` segundos. */
export function embedUrl(videoId, start = 0, autoplay = false) {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  if (start > 0) params.set('start', String(start));
  if (autoplay) params.set('autoplay', '1');
  return `${ORIGIN}/embed/${videoId}?${params.toString()}`;
}

/** "1:21" → 81 · "04:41" → 281 · "1:02:03" → 3723 */
export function parseTimecode(tc) {
  const parts = String(tc).split(':').map(Number);
  if (parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

export function initVideo(root = document) {
  const frame = root.querySelector('#video-frame');
  const buttons = Array.from(root.querySelectorAll('.video-chapter'));
  if (!frame || !buttons.length) return;

  const videoId = frame.dataset.videoId;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const start = parseTimecode(btn.dataset.time);
      frame.src = embedUrl(videoId, start, true);

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

      // O leitor de tela precisa saber que a ação surtiu efeito — o iframe
      // muda de conteúdo sem mover o foco.
      const status = root.querySelector('#video-status');
      if (status) status.textContent = `Reproduzindo a partir de ${btn.dataset.time} — ${btn.dataset.label}.`;
    });
  });
}
