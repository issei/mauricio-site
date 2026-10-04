import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('D:/projetos/mauricio-site/package.json');
export const pw = require('@playwright/test');
export const AxeBuilder = require('@axe-core/playwright').default || require('@axe-core/playwright').AxeBuilder;
export const BASE = 'http://localhost:4399';
export const OUT = path.dirname(new URL(import.meta.url).pathname.replace(/^\//,''));
const root = 'D:/projetos/mauricio-site/src';
const EX = /(^|[.-])(bkp|backup|template)$/i;
export const pages = [
  ...fs.readdirSync(root).filter(f=>f.endsWith('.html')).filter(f=>!EX.test(f.replace('.html',''))).map(f=>({id:f.replace('.html',''), lang:'pt', url:`/${f}`})),
  ...fs.readdirSync(root+'/en').filter(f=>f.endsWith('.html')).filter(f=>!EX.test(f.replace('.html',''))).map(f=>({id:'en/'+f.replace('.html',''), lang:'en', url:`/en/${f}`})),
];
export const EXC = new Set(['diagnostic','test-github','admin','admin-editor','mapmind','vsl','exemplopdi']);
export const isExc = p => EXC.has(p.id.replace(/^en\//,''));
export const BLOCK = /googletagmanager|google-analytics|clarity\.ms|doubleclick/;
export async function newCtx(browser, opts={}) {
  const ctx = await browser.newContext({ viewport:{width:1280,height:800}, ...opts });
  await ctx.route(u=>BLOCK.test(u.toString()), r=>r.abort());
  return ctx;
}
export async function pool(items, n, fn) {
  const res = new Array(items.length); let i = 0;
  await Promise.all(Array.from({length:n}, async()=>{ while(i<items.length){ const k=i++; try{ res[k]=await fn(items[k],k);}catch(e){res[k]={error:String(e)}} } }));
  return res;
}
export const write = (name, obj) => fs.writeFileSync(path.join(OUT,name), typeof obj==='string'?obj:JSON.stringify(obj,null,1));
