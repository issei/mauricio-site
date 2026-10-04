// Fase 6 — indicador de foco visível em CADA parada de Tab (WCAG 2.4.7).
// O axe não mede isto: o anel padrão do Chrome sai quase preto (rgb(16,16,16)) em página escura, e um
// <summary> dentro de contêiner overflow:hidden tem o anel recortado — nos dois casos `outline` existe
// no CSS e o usuário não vê nada. Aqui se compara o PIXEL do elemento focado com o mesmo elemento
// desfocado: se forem idênticos, não há indicador. Só chromium (custo: 2 capturas por parada).
import { test, expect } from '@playwright/test';

const PAGINAS = [
  'engenharia-agentes-ia',
  'formulacao-de-problemas',
  'engenharia-confianca',
  'develop-engineering',
  ['devin', 'estilo'], // rola com Lenis + GSAP reveal: duas capturas de pixel não são comparáveis; confere o estilo computado
  'artifice',
  'case-agents',
  'curiosidade-e-investigacao',
  'operacao-capital-cognitivo',
  'apresentacao',
  'index',
  'catalogo',
  'digital-workplace-agentico',
  'agent-ready',
  'capacidade-antes-do-acesso',
];
const MAX_PARADAS = 260;

for (const entrada of PAGINAS) {
  const [pagina, modo = 'pixel'] = Array.isArray(entrada) ? entrada : [entrada];
  test(`${pagina}: toda parada de Tab tem indicador de foco visível`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'comparação de pixel: só no chromium');
    test.setTimeout(240_000);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' })));
    await page.goto(`/${pagina}.html`);
    await page.waitForLoadState('load');
    await page.waitForTimeout(800);

    const semIndicador = [];
    const vistos = new Set();
    for (let i = 0; i < MAX_PARADAS; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        let a = document.activeElement;
        if (!a || a === document.body) return null;
        while (a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement; // <eco-nav>
        if (a.tagName === 'IFRAME') return { pular: true };
        a.scrollIntoView({ block: 'center' });
        const r = a.getBoundingClientRect();
        return {
          chave: `${a.tagName}#${a.id}.${String(a.className).slice(0, 30)}@${Math.round(r.left)},${Math.round(r.top + scrollY)}`,
          x: r.left, y: r.top, w: r.width, h: r.height,
          nome: (a.getAttribute('aria-label') || a.textContent || a.value || '').trim().replace(/\s+/g, ' ').slice(0, 40),
        };
      });
      if (!info) { if (i > 3) break; continue; }
      if (info.pular) continue;
      if (vistos.has(info.chave)) break;
      vistos.add(info.chave);

      if (modo === 'estilo') {
        await page.waitForTimeout(120); // transição do outline (0,01 ms sob movimento reduzido) precisa de um quadro
        const anel = await page.evaluate(() => {
          let a = document.activeElement;
          while (a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement;
          const cs = getComputedStyle(a);
          const cor = cs.outlineColor.match(/[\d.]+/g) || [];
          return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2 && !/rgb\(16, 16, 16\)/.test(cs.outlineColor) && (cor[3] === undefined || Number(cor[3]) > 0.5);
        });
        if (!anel) semIndicador.push(`${info.chave} "${info.nome}"`);
        continue;
      }

      const clip = { x: Math.max(0, info.x - 6), y: Math.max(0, info.y - 6), width: Math.min(1280, info.w + 12), height: Math.min(800, info.h + 12) };
      if (clip.width < 8 || clip.height < 8 || clip.y > 800) continue; // sr-only/skip link: aparece só no foco, comparação não se aplica
      await page.waitForTimeout(60);
      let focado, desfocado;
      try { focado = await page.screenshot({ clip }); } catch { continue; }
      await page.evaluate(() => { let a = document.activeElement; while (a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement; a.blur(); });
      await page.waitForTimeout(60);
      try { desfocado = await page.screenshot({ clip }); } catch { continue; }
      if (focado.equals(desfocado)) semIndicador.push(`${info.chave} "${info.nome}"`);
      // volta ao mesmo ponto da ordem de Tab
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
    }
    expect(vistos.size, 'a página deveria ter paradas de Tab').toBeGreaterThan(2);
    expect(semIndicador, `sem indicador de foco:\n${semIndicador.join('\n')}`).toEqual([]);
  });
}
