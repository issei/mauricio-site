// SC 2.5.3 (rótulo no nome, nível A) — controle por voz: quem diz o texto VISÍVEL de um botão/link precisa
// acionar o controle, então o nome acessível tem de CONTER o texto visível. O axe deixa a regra
// `label-content-name-mismatch` desligada; este teste a aplica a todas as páginas (PT e EN), inclusive
// ao shadow DOM do <eco-nav>. O espelho EN traduz rótulo e texto visível em separado: nome e texto
// podem sair com palavras em ordem diferente, por isso links com texto visível não usam `aria-label`
// com a mesma frase (ver `.pf-sr` em gen-portfolio.mjs).
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { testDoGate } from '../_helpers/gate.js';

const paginas = [
  ...readdirSync('src').filter((f) => f.endsWith('.html')),
  ...readdirSync('src/en').filter((f) => f.endsWith('.html')).map((f) => `en/${f}`),
];

// Varredura estática do DOM: um navegador basta. No escopo do arquivo, o skip não abre página nos outros.
test.skip(({ browserName }) => browserName !== 'chromium', 'varredura estática do DOM: um navegador basta');

// Um teste por página: antes era um teste único de ~93 s, o mais longo da suíte, que nenhum worker dividia.
for (const p of paginas) {
  testDoGate(test, p)(`${p}: nenhum botão/link com aria-label diverge do texto visível (2.5.3)`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' })));
    const falhas = [];
    await page.goto(`/${p}`, { waitUntil: 'load' }).catch(() => {});
    await page.waitForTimeout(250);
    const varre = () => {
      const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
      const visivel = (n) => n.nodeType === 3 ? n.textContent
        : n.nodeType === 1 && !n.matches('[aria-hidden="true"]') && getComputedStyle(n).display !== 'none' ? [...n.childNodes].map(visivel).join('') : '';
      const res = [];
      const walk = (root) => {
        for (const el of root.querySelectorAll('*')) {
          if (el.shadowRoot) walk(el.shadowRoot);
          const label = el.getAttribute('aria-label');
          if (!label) continue;
          const role = el.getAttribute('role') || ({ A: 'link', BUTTON: 'button', SUMMARY: 'button' }[el.tagName] ?? '');
          if (!['link', 'button', 'tab', 'menuitem', 'checkbox', 'radio', 'switch'].includes(role)) continue;
          const v = [...el.childNodes].map(visivel).join('');
          if (norm(v) && !norm(label).includes(norm(v))) res.push(`"${v.trim().replace(/\s+/g, ' ').slice(0, 50)}" ≠ "${label.slice(0, 60)}"`);
        }
      };
      walk(document);
      return res;
    };
    // Algumas páginas navegam (hash, redirecionamento) logo depois do load; sob carga, o evaluate caía
    // nessa janela ("Execution context was destroyed"). Espera a página assentar e mede de novo.
    let ruins;
    for (let tentativa = 1; ; tentativa++) {
      try { ruins = await page.evaluate(varre); break; } catch (e) {
        if (tentativa >= 3 || !/context was destroyed|navigat/i.test(e.message)) throw e;
        await page.waitForLoadState('load');
      }
    }
    for (const r of ruins) falhas.push(`${p}: ${r}`);
    expect(falhas, `rótulo fora do nome acessível:\n${falhas.join('\n')}`).toEqual([]);
  });
}
