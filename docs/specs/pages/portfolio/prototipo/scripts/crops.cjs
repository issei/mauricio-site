// Gera recortes 16:10 de detalhes reais das páginas do site (servidor em SITE).
const path=require('path');
const R=path.resolve(__dirname,'../../../../../../')+'/';
const s=require(R+'node_modules/sharp'),{chromium}=require(R+'node_modules/playwright');
const SITE=process.env.SITE||'http://127.0.0.1:5184',O=process.argv[2]||path.resolve(__dirname,'../home-proto')+'/';
const JOBS=[ // [arquivo, página, seletor, largura do recorte (px css), deslocamento vertical do centro]
 ['acessibilidade','acessibilidade','dl.ac-status',600,-30,'esq'],
 ['case-agents','case-agents','.ca-score',600,-30,'esq'],
 ['agent-ready','agent-ready','.ar-score',600,-30,'esq'],
 ['boutique','boutique-empresarial-showcase','h2:has-text("Fundação Metodológica")',1240,330],
 ['estudo','curiosidade-e-investigacao','header.ci-hero',760,0],
 ['videos','videos','main h1',640,40,'esq','section.hero{visibility:hidden!important}'],
];
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:'dark',reducedMotion:'reduce'});
await c.route(/googletagmanager|google-analytics/,r=>r.abort());
for(const [n,u,sel,w,dy,al,css=''] of JOBS){const p=await c.newPage();await p.goto(SITE+'/'+u+'.html',{waitUntil:'load'});await p.waitForTimeout(1200);
 await p.addStyleTag({content:'.sh,header.sh,[class*=cookie],[id*=cookie],[class*=consent],[id*=consent],[id^=cc-]{display:none!important}*{animation:none!important;transition:none!important}'+css});
 const e=p.locator(sel).first();await e.scrollIntoViewIfNeeded();await p.waitForTimeout(300);
 const bb=await e.boundingBox();const h=Math.round(w/1.6),cx=bb.x+bb.width/2,cy=bb.y+bb.height/2+dy;
 await p.evaluate(y=>window.scrollBy(0,y),cy-450);await p.waitForTimeout(300);const bb2=await e.boundingBox();const cy2=bb2.y+bb2.height/2+dy;
 const clip={x:Math.max(0,Math.round(al==='esq'?bb.x-32:cx-w/2)),y:Math.max(0,Math.round(cy2-h/2)),width:w,height:h};
 const buf=await p.screenshot({clip});await s(buf).resize(960,600).webp({quality:82}).toFile(O+n+'.webp');console.log(n,JSON.stringify(clip));await p.close()}
await b.close()})();
