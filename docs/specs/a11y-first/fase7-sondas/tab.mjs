import { pw, BASE, newCtx, pool, write } from './lib.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const bt = process.argv[2] || 'chromium';
const P = ['index','catalogo','engenharia-agentes-ia','devin','artifice','operacao-capital-cognitivo','curriculo','life3d'];
const MAX = 250;
const browser = await pw[bt].launch();
async function raw(buf){ const {data,info}=await sharp(buf).raw().toBuffer({resolveWithObject:true}); return {data,info}; }
const desc = () => {
  const a=document.activeElement; if(!a) return null;
  const cs=getComputedStyle(a); const r=a.getBoundingClientRect();
  const path=(e)=>{const p=[];while(e&&e.nodeType===1&&p.length<4){let s=e.tagName.toLowerCase();if(e.id)s+='#'+e.id;else if(e.classList.length)s+='.'+[...e.classList].slice(0,2).join('.');p.unshift(s);e=e.parentElement;}return p.join('>')};
  // obscured test
  const pts=[[.5,.5],[.1,.1],[.9,.1],[.1,.9],[.9,.9]].map(([fx,fy])=>[r.left+r.width*fx,r.top+r.height*fy]).filter(([x,y])=>x>=0&&y>=0&&x<innerWidth&&y<innerHeight);
  let hidden=0, hider=null;
  for(const [x,y] of pts){const t=document.elementFromPoint(x,y); if(!t||!(t===a||a.contains(t)||t.contains(a))){hidden++; hider=hider||path(t);} }
  const ol=cs.outlineStyle+' '+cs.outlineWidth+' '+cs.outlineColor+' off'+cs.outlineOffset;
  return { tag:a.tagName, path:path(a), id:a.id, name:(a.getAttribute('aria-label')||a.textContent||a.value||a.title||'').trim().replace(/\s+/g,' ').slice(0,40), role:a.getAttribute('role'),
    rect:[r.left|0,r.top|0,r.width|0,r.height|0], n:pts.length, hidden, hider, outline:ol, shadow:cs.boxShadow==='none'?'':cs.boxShadow.slice(0,60), vis:cs.visibility, op:cs.opacity, tabindex:a.getAttribute('tabindex'),
    inViewport:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth, fixedAncestor:(()=>{let e=a;while(e&&e!==document.body){const p=getComputedStyle(e).position;if(p==='fixed'||p==='sticky')return true;e=e.parentElement}return false})() };
};
const res = await pool(P, 4, async (id) => {
  const ctx = await newCtx(browser); const page = await ctx.newPage();
  await page.goto(BASE+`/${id}.html`, {waitUntil:'load', timeout:45000}); await page.waitForTimeout(1800);
  const stops=[]; const seen=new Map(); let cycle=null; let iframeRun=0;
  for (let i=0;i<MAX;i++) {
    await page.keyboard.press('Tab'); await page.waitForTimeout(60);
    const d = await page.evaluate(desc);
    if(!d||d.tag==='BODY'||d.tag==='HTML'){ stops.push({i,tag:d?.tag||'null'}); cycle={at:i,kind:'body'}; break; }
    if(d.tag==='IFRAME'){ iframeRun++; if(iframeRun>1){ stops.push({i,tag:'IFRAME',note:'inside-frame',path:d.path}); if(iframeRun>40){cycle={at:i,kind:'iframe-run>40'};break;} continue; } } else iframeRun=0;
    const key=d.path+'|'+d.rect.join(',')+'|'+d.name;
    if(seen.has(key)){ cycle={at:i,kind:'wrap',firstAt:seen.get(key)}; stops.push({i,wrapTo:seen.get(key)}); break; }
    seen.set(key,i);
    // focus indicator via pixel diff
    const pad=8; const vp=page.viewportSize();
    const x=Math.max(0,d.rect[0]-pad), y=Math.max(0,d.rect[1]-pad); const w=Math.min(vp.width-x,d.rect[2]+2*pad), h=Math.min(vp.height-y,d.rect[3]+2*pad);
    let diff=null;
    if(d.inViewport && w>0 && h>0 && w*h<1500*900){
      try{
        const s1=await raw(await page.screenshot({clip:{x,y,width:w,height:h},animations:'disabled'}));
        await page.evaluate(()=>document.activeElement.blur());
        const s2=await raw(await page.screenshot({clip:{x,y,width:w,height:h},animations:'disabled'}));
        await page.evaluate((k)=>{ /* restore focus */ }, 0);
        let n=0; const a=s1.data,b=s2.data; for(let j=0;j<a.length;j+=s1.info.channels){ if(Math.abs(a[j]-b[j])+Math.abs(a[j+1]-b[j+1])+Math.abs(a[j+2]-b[j+2])>24) n++; }
        diff=n;
        // restore focus to same element: shift-tab then tab is unreliable; use stored index
        await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
        const again=await page.evaluate(()=>document.activeElement.tagName+'.'+(document.activeElement.id||''));
        d.refocusOk = again.startsWith(d.tag);
      }catch(e){ diff='err:'+String(e).slice(0,60); }
    }
    d.diff=diff; d.i=i; stops.push(d);
  }
  // modals/hidden-state snapshot at end
  const info = await page.evaluate(()=>({dialogsOpen:[...document.querySelectorAll('dialog[open],[role=dialog],[role=alertdialog]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'}).map(e=>e.tagName+'#'+e.id+'.'+[...e.classList].join('.')+' aria-label='+e.getAttribute('aria-label'))}));
  await ctx.close();
  return { id, bt, cycle, nstops:stops.length, info, stops };
});
write(`tab-${bt}.json`, res);
for(const r of res){ console.log(r.id, 'stops', r.nstops, 'end', JSON.stringify(r.cycle), 'dialogs-visible', JSON.stringify(r.info?.dialogsOpen)); }
await browser.close();
