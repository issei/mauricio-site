// Sondas da auditoria v2 (2026-10-05) — critérios que o REPORT.md lista como "não medidos".
// Uso: node probe.mjs http://localhost:4399 > probe.json
import { createRequire } from 'node:module';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
const ROOT = process.cwd(); // rode da raiz do repositório
const require = createRequire(ROOT + '/package.json');
const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const BASE = process.argv[2] || 'http://localhost:4399';
const EXCL = /(^|[.-])(bkp|backup|template)$/i;
const list = (dir, p) => readdirSync(`${ROOT}/src/${dir}`).filter((f) => f.endsWith('.html') && !EXCL.test(f.replace('.html', '')) && existsSync(`${ROOT}/dist/${dir}/${f}`)).map((f) => p + f);
const only = process.argv[3]?.split(',');
const pages = [...list('', ''), ...list('en', 'en/')].filter((p) => !only || only.includes(p));

const SPACING = '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';

async function ctxFor(browser, opts) {
  const ctx = await browser.newContext(opts);
  await ctx.route(/^https?:\/\/(([^/]*\.)?(googletagmanager|google-analytics|doubleclick)\.(com|net)|connect\.facebook\.net)\//, (r) => r.abort());
  return ctx;
}
async function open(ctx, url) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(1500);
  return page;
}

const clippedFn = () => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('[aria-hidden="true"]')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const ox = cs.overflowX, oy = cs.overflowY;
    const hid = (v) => v === 'hidden' || v === 'clip';
    if (!hid(ox) && !hid(oy)) continue;
    if (el.clientWidth <= 2 || el.clientHeight <= 2) continue; // sr-only
    if (!(el.innerText || '').trim()) continue;
    const v = (hid(oy) && el.scrollHeight > el.clientHeight + 2) || (hid(ox) && el.scrollWidth > el.clientWidth + 2);
    if (v) {
      el.dataset.probeClip ??= String(out.length);
      out.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : ''));
    }
  }
  return out;
};

async function measure(browser, file) {
  const url = `${BASE}/${file}`;
  const r = { page: file };

  // 1) Desktop, SEM reduce (SC 2.2.2): animações infinitas, rAF, autoplay, controle de pausa; + axe best-practice; + mídia; + hover-only
  const ctx = await ctxFor(browser, { viewport: { width: 1280, height: 800 } });
  await ctx.addInitScript(() => {
    window.__raf = 0; const o = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => o((t) => { window.__raf++; cb(t); });
  });
  try {
    const page = await open(ctx, url);
    r.title = await page.title();
    const r0 = await page.evaluate(() => window.__raf); await page.waitForTimeout(1000);
    r.rafPerSec = (await page.evaluate(() => window.__raf)) - r0;
    Object.assign(r, await page.evaluate(() => {
      const anims = document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().iterations === Infinity);
      const sel = (el) => !el ? '?' : el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList?.length ? '.' + [...el.classList].slice(0, 2).join('.') : '');
      const names = {}; for (const a of anims) { const k = (a.animationName || a.id || 'waapi') + ' @ ' + sel(a.effect?.target); names[k] = (names[k] || 0) + 1; }
      const ctl = [...document.querySelectorAll('button,[role=button],input[type=checkbox]')].filter((b) => /paus|parar|stop|anima|movimento|motion/i.test((b.getAttribute('aria-label') || '') + ' ' + b.textContent)).length;
      const media = {
        video: [...document.querySelectorAll('video')].map((v) => ({ src: (v.currentSrc || v.getAttribute('src') || '').split('/').pop(), autoplay: v.autoplay, muted: v.muted, loop: v.loop, controls: v.controls, tracks: [...v.querySelectorAll('track')].map((t) => t.kind) })),
        audio: [...document.querySelectorAll('audio')].map((a) => ({ src: (a.currentSrc || a.getAttribute('src') || '').split('/').pop(), autoplay: a.autoplay, controls: a.controls })),
        iframes: [...document.querySelectorAll('iframe')].map((f) => ({ host: (() => { try { return new URL(f.src, location.href).host; } catch { return f.src; } })(), title: f.getAttribute('title') || '' })),
        ytFacade: document.querySelectorAll('[data-eai-video],.eai-video,[data-youtube-id],[data-yt]').length,
        notebooklm: document.querySelectorAll('a[href*="notebooklm"]').length,
        canvas: document.querySelectorAll('canvas').length,
      };
      // Conteúdo revelado só por :hover (sem :focus/:focus-within equivalente) — candidatos a SC 1.4.13 / 2.1.1
      const hoverOnly = new Set();
      const walk = (rules) => { for (const ru of rules) {
        if (ru.cssRules && !ru.selectorText) { try { walk(ru.cssRules); } catch {} continue; }
        const s = ru.selectorText || ''; if (!/:hover/.test(s)) continue;
        const st = ru.style; if (!st) continue;
        const reveals = (st.display && st.display !== 'none') || st.visibility === 'visible' || (st.opacity && +st.opacity > 0.5 && /\s/.test(s.split(':hover')[1] || '')) ;
        if (!reveals) continue;
        const after = (s.split(':hover')[1] || '').trim(); if (!after) continue; // muda o próprio elemento, não revela outro
        if (/:focus/.test(s)) continue;
        hoverOnly.add(s.slice(0, 120));
      } };
      for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch {} }
      // orientação travada por CSS (SC 1.3.4)
      const orient = [];
      const walkO = (rules) => { for (const ru of rules) { if (ru.media && /orientation/.test(ru.media.mediaText)) orient.push(ru.media.mediaText); if (ru.cssRules && !ru.selectorText) { try { walkO(ru.cssRules); } catch {} } } };
      for (const sh of document.styleSheets) { try { walkO(sh.cssRules); } catch {} }
      // cabeçalhos: saltos de nível (SC 1.3.1 boa prática / 2.4.6)
      const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => h.offsetParent !== null || getComputedStyle(h).position === 'fixed');
      let skips = 0; let prev = 0; const skipList = [];
      for (const h of hs) { const l = +h.tagName[1]; if (prev && l > prev + 1) { skips++; if (skipList.length < 3) skipList.push(`h${prev}→h${l} "${h.textContent.trim().slice(0, 40)}"`); } prev = l; }
      return { infiniteAnims: anims.length, animSample: Object.entries(names).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, n]) => `${k} ×${n}`), pauseControls: ctl, media, hoverOnly: [...hoverOnly].slice(0, 6), hoverOnlyCount: hoverOnly.size, orientationMQ: [...new Set(orient)], headingSkips: skips, headingSkipSample: skipList };
    }));
    const bp = await new AxeBuilder({ page }).withTags(['best-practice']).exclude('iframe').analyze();
    r.axeBestPractice = Object.fromEntries(bp.violations.map((v) => [v.id, v.nodes.length]));
    // 3) espaçamento de texto (SC 1.4.12): recorte NOVO após o CSS do critério
    const before = new Set(await page.evaluate(clippedFn));
    await page.addStyleTag({ content: SPACING }); await page.waitForTimeout(400);
    const after = await page.evaluate(clippedFn);
    r.textSpacingNewClip = after.filter((s) => !before.has(s));
    r.textSpacingHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  } catch (e) { r.error = String(e).slice(0, 200); } finally { await ctx.close(); }

  // 2) larguras intermediárias / zoom 200% de 1280 (= 640 CSS px) / paisagem de celular
  r.overflow = {};
  for (const [w, h] of [[640, 400], [768, 1024], [1024, 768], [812, 375]]) {
    const c = await ctxFor(browser, { viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    try {
      const p = await open(c, url);
      const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (o > 1) r.overflow[`${w}x${h}`] = o;
    } catch (e) { r.overflow[`${w}x${h}`] = 'erro'; } finally { await c.close(); }
  }
  return r;
}

const browser = await chromium.launch();
const out = []; const q = [...pages];
await Promise.all(Array.from({ length: 4 }, async () => { for (let f = q.shift(); f; f = q.shift()) { out.push(await measure(browser, f)); process.stderr.write(`· ${f}\n`); } }));
await browser.close();
out.sort((a, b) => a.page.localeCompare(b.page));
writeFileSync(new URL('./probe.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('ok', out.length);
