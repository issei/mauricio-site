// Chegada em cada destino da home (fundo, fonte do h1, cabeçalho, LCP, CLS, detalhe do cartão na primeira dobra).
// Uso, na raiz do repositório, com o site em 5184: node docs/specs/pages/portfolio/prototipo/scripts/destinos7.cjs  (saída em tmp/destinos/)
// Avalia cada destino da home: chegada (fundo, cabeçalho, h1), carga, transição injetada e o detalhe do cartão.
const s=require('sharp'),{chromium}=require('playwright'),fs=require('fs');
const SITE='http://127.0.0.1:5184',O='tmp/destinos/';
const D=[['Conheça minha história','/curriculo.html',null],['Explore minhas ideias','/catalogo.html',null],['Vídeos do canal','/videos.html',null],
 ['Recente: artigo','/a-quem-a-empresa-delega.html',null],['Recente: ensaio','/curiosidade-e-investigacao.html',null],['Recente: vídeo','/videos/domine-a-ia-com-google-antigravity-da-codificacao-a.html',null],
 ['Projeto: Acessibilidade','/acessibilidade.html','dl.ac-status'],['Projeto: Case Agents','/case-agents.html','.ca-score'],['Projeto: Agent Ready','/agent-ready.html','.ar-score'],['Projeto: Boutique','/boutique-empresarial-showcase.html','h2:has-text("Fundação Metodológica")'],
 ['Conheça meus projetos','/catalogo.html#projetos',null]];
(async()=>{const b=await chromium.launch();const linhas=[];
for(const [w,h] of [[1440,900],[390,844]]){const sh=[];
 for(const [rot,u,det] of D){const c=await b.newContext({viewport:{width:w,height:h},colorScheme:'dark'});await c.route(/googletagmanager|google-analytics/,r=>r.abort());const p=await c.newPage();
  await p.addInitScript(()=>{window.__lcp=0;window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true})});
  await p.goto(SITE+u,{waitUntil:'load'});await p.waitForTimeout(1200);
  const r=await p.evaluate(async det=>{const cs=getComputedStyle(document.body),hd=document.querySelector('header.sh');const h1=document.querySelector('h1');
   const ancora=location.hash?!!document.getElementById(location.hash.slice(1)):null;
   let detalhe=null;if(det){const e=det.includes(':has-text')?[...document.querySelectorAll('h2')].find(x=>/Fundação Metodológica/.test(x.textContent)):document.querySelector(det);if(e){const q=e.getBoundingClientRect();detalhe=Math.round(q.top)+'px'}}
   return{fundo:cs.backgroundColor,html:getComputedStyle(document.documentElement).backgroundColor,cabecalho:!!hd,vt:!!document.querySelector('style#vt'),regraVT:[...document.styleSheets].some(sh=>{try{return [...sh.cssRules].some(r=>r.cssText.includes('@view-transition')||(r.cssRules&&[...r.cssRules].some(x=>x.cssText.includes('@view-transition'))))}catch(e){return false}}),
    h1:h1?h1.textContent.replace(/\s+/g,' ').trim().slice(0,70):null,fonte:getComputedStyle(h1||document.body).fontFamily.split(',')[0],ancora,detalhe,lcp:Math.round(window.__lcp),cls:+window.__cls.toFixed(3),voltar:!!document.querySelector('header.sh a[href="/"], header.sh a[href="/index.html"]')}},det);
  linhas.push(`${w} | ${rot} | ${u} | ${JSON.stringify(r)}`);sh.push(await s(await p.screenshot()).resize(w>800?360:150).png().toBuffer());await c.close()}
 const W=w>800?360:150,H=Math.round(W*h/w);await s({create:{width:W*6,height:H*2,channels:3,background:'#555'}}).composite(sh.map((i,k)=>({input:i,left:k%6*W,top:(k/6|0)*H}))).png().toFile(O+`chegada-${w}.png`)}
fs.writeFileSync(O+'aval.txt',linhas.join('\n'));console.log(linhas.join('\n'));await b.close()})();
