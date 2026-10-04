// SC 2.5.3 (rótulo no nome, nível A) — controle por voz: quem diz o texto VISÍVEL de um botão/link precisa
// acionar o controle, então o nome acessível tem de CONTER o texto visível. O axe deixa a regra
// `label-content-name-mismatch` desligada; este teste a aplica a todas as páginas (PT e EN), inclusive
// ao shadow DOM do <eco-nav>. O espelho EN traduz rótulo e texto visível em separado: nome e texto
// podem sair com palavras em ordem diferente, por isso links com texto visível não usam `aria-label`
// com a mesma frase (ver `.pf-sr` em gen-portfolio.mjs).
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';

const paginas = [
  ...readdirSync('src').filter((f) => f.endsWith('.html')),
  ...readdirSync('src/en').filter((f) => f.endsWith('.html')).map((f) => `en/${f}`),
];

test('nenhum botão/link com aria-label diverge do texto visível (2.5.3)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'varredura estática do DOM: um navegador basta');
  test.setTimeout(240_000);
  await page.addInitScript(() => localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' })));
  const falhas = [];
  for (const p of paginas) {
    await page.goto(`/${p}`, { waitUntil: 'load' }).catch(() => {});
    await page.waitForTimeout(250);
    const ruins = await page.evaluate(() => {
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
    });
    for (const r of ruins) falhas.push(`${p}: ${r}`);
  }
  expect(falhas, `rótulo fora do nome acessível:\n${falhas.join('\n')}`).toEqual([]);
});
