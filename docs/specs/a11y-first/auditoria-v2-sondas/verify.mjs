// Confirmações pontuais da auditoria v2.
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const { chromium } = require('@playwright/test');
const S = 'test-results/'; // capturas (fora do git)
const B = 'http://localhost:4399';
const b = await chromium.launch();

// 1) devin #calculadora sob espaçamento 1.4.12: o que sai da caixa?
{
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  await p.goto(`${B}/devin.html`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.addStyleTag({ content: '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' });
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const s = document.querySelector('#calculadora'); s.scrollIntoView();
    const box = s.getBoundingClientRect();
    const out = [...s.querySelectorAll('*')].filter((e) => e.children.length === 0 && (e.innerText || '').trim()).filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > box.bottom + 1 || r.right > box.right + 1; }).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 2).join('.')}: "${e.innerText.trim().slice(0, 50)}"`);
    return { sh: s.scrollHeight, ch: s.clientHeight, sw: s.scrollWidth, cw: s.clientWidth, cutTexts: out.slice(0, 6), n: out.length };
  });
  console.log('devin #calculadora (1.4.12):', JSON.stringify(r));
  await p.locator('#calculadora').screenshot({ path: S + 'devin-calc-spacing.png' }).catch(() => {});
  await p.close();
}
// 2) artifice a 768: quem estoura?
for (const [page, w, h] of [['artifice.html', 768, 1024], ['socialselling.html', 768, 1024], ['salesforce-agentic-quickstart.html', 640, 400]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await p.goto(`${B}/${page}`, { waitUntil: 'load' }); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > vw + 1 && r.width > 0; })
      .filter((e) => !e.parentElement || e.parentElement.getBoundingClientRect().right <= vw + 1)
      .slice(0, 4).map((e) => `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}.${[...e.classList].slice(0, 3).join('.')} right=${Math.round(e.getBoundingClientRect().right)}`);
  });
  console.log(`${page} @${w}: estoura →`, r);
  await p.close();
}
// 3) en/socialselling: headings vazios
{
  const p = await b.newPage();
  await p.goto(`${B}/en/socialselling.html`, { waitUntil: 'load' }); await p.waitForTimeout(800);
  console.log('en/socialselling headings vazios:', await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => !h.textContent.trim()).map((h) => h.outerHTML.slice(0, 160))));
  await p.goto(`${B}/socialselling.html`, { waitUntil: 'load' });
  console.log('PT socialselling headings vazios:', await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => !h.textContent.trim()).length));
  await p.goto(`${B}/devin.html`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  console.log('devin empty heading / th / aria-allowed-role amostra:', await p.evaluate(() => ({
    h: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => !h.textContent.trim()).map((h) => h.outerHTML.slice(0, 140)),
    th: [...document.querySelectorAll('th')].filter((t) => !t.textContent.trim()).map((t) => t.outerHTML.slice(0, 100)),
  })));
  await p.close();
}
await b.close();
