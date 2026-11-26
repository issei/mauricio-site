// Navegação da home nova para cada destino, no site local (sem mudar arquivo nenhum).
// A home do protótipo é servida como "/" do site por interceptação; com VT=site recebe a mesma camada de
// transição (style#vt + script + speculationrules) que a home atual recebe do plugin src/transicoes.
// Uso: node nav7.cjs [site=http://127.0.0.1:5184] [vt=site|nenhuma]
const path=require('path'),fs=require('fs');
const R=path.resolve(__dirname,'../../../../../../')+'/',PROTO=path.resolve(__dirname,'..')+'/';
const s=require(R+'node_modules/sharp'),{chromium}=require(R+'node_modules/playwright');
// Atenção: com interceptação de rede o Chromium não usa o bfcache; a volta aqui é sempre uma recarga (ver bfcache7.cjs).
const SITE=process.argv[2]||'http://127.0.0.1:5185',VT=process.argv[3]||'site',DIRETO=process.argv[5]==='direto',RM=process.argv[4]==='reduzido',O=R+`tmp/capturas-rev7/navegacao-${VT}${RM?'-reduzido':''}/`;
const DEST=[['S02','Conheça minha história →'],['S03','Explore minhas ideias →'],['S03','Vídeos do canal →'],['S03','A quem a empresa delega quando delega à IA?'],['S03','Curiosidade e investigação'],['S03','Domine a IA com Google Antigravity'],
 ['S04','Acessibilidade'],['S04','Case Agents'],['S04','Agent Ready'],['S04','Boutique Empresarial'],['S04','Conheça meus projetos →'],['CAB','Carreira']];
const INIT=()=>{addEventListener('pagereveal',e=>{sessionStorage.setItem('vt:'+location.pathname,e.viewTransition?(e.viewTransition.types?[...e.viewTransition.types].join(',')||'sem-tipo':'sim'):'nenhuma')});
 addEventListener('pageshow',e=>{window.__bfcache=e.persisted});window.__cls=0;window.__lcp=0;
 try{new PerformanceObserver(l=>{for(const x of l.getEntries())if(!x.hadRecentInput)window.__cls+=x.value}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>{for(const x of l.getEntries())window.__lcp=x.startTime}).observe({type:'largest-contentful-paint',buffered:true})}catch(e){}};
(async()=>{fs.mkdirSync(O,{recursive:true});const b=await chromium.launch();const rel=[];
let home=fs.readFileSync(PROTO+'nova-home.template.html','utf8');
if(VT==='site'&&!DIRETO){const ix=await (await fetch(SITE+'/index.html')).text();const pega=re=>(ix.match(re)||[''])[0];
 const blocos=[pega(/<style id="vt">[\s\S]*?<\/style>/),pega(/<script type="speculationrules">[\s\S]*?<\/script>/),pega(/<script id="vt">[\s\S]*?<\/script>/)];
 rel.push('camada VT copiada da home atual: '+blocos.map(x=>x.length+' bytes').join(', '));home=home.replace('</head>',blocos.join('\n')+'\n</head>')}
for(const [n,w,h] of [['1440x900',1440,900],['390x844',390,844]]){
 for(const [sec,txt] of DEST){if(n==='390x844'&&sec==='CAB')continue;/* no celular o cabeçalho fica atrás do botão Menu */
  const c=await b.newContext({viewport:{width:w,height:h},colorScheme:'dark',reducedMotion:RM?'reduce':'no-preference'});
  if(!DIRETO)await c.route(u=>{const p=new URL(u).pathname;return p==='/'||p==='/index.html'||p==='/home.css'||p.startsWith('/home-proto/')},async r=>{const p=new URL(r.request().url()).pathname;
   if(p==='/'||p==='/index.html')return r.fulfill({body:home,contentType:'text/html; charset=utf-8'});return r.fulfill({path:PROTO+p.slice(1)})});
  await c.addInitScript(INIT);const p=await c.newPage();await p.goto(SITE+'/',{waitUntil:'networkidle'});await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
  // rola até o meio da sessão do link (onde ele está visível e clicável)
  const y=await p.evaluate(sec=>{if(sec==='CAB')return 0;const q={S02:'.hm-s02',S03:'.hm-s03',S04:'.hm-s04'}[sec],e=document.querySelector(q);return Math.round(e.getBoundingClientRect().top+scrollY+e.offsetHeight/2-innerHeight/2)},sec);
  await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(400);const antes=await p.screenshot();
  const sel=sec==='CAB'?p.locator('header.sh a',{hasText:txt}).first():p.locator(`.hm-${sec.toLowerCase()} a`,{hasText:txt}).first();
  let r={sec,txt};try{
   for(let i=0;i<10;i++){/* garante o link na tela (no celular a S03 sobe com a rolagem) */const q=await sel.boundingBox();if(q&&q.y>60&&q.y+q.height<h-10)break;await p.mouse.wheel(0,q&&q.y<60?-120:120);await p.waitForTimeout(250)}
   r.rolagemIda=await p.evaluate(()=>Math.round(scrollY));const antes2=await p.screenshot();
   const t0=Date.now();await Promise.all([p.waitForNavigation({waitUntil:'load'}),sel.click({timeout:5000})]);r.carga=Date.now()-t0;await p.waitForTimeout(1500);
   Object.assign(r,await p.evaluate(()=>{const fcp=performance.getEntriesByName('first-contentful-paint')[0];const h1=document.querySelector('h1');const hd=document.querySelector('header.sh');
    return{url:location.pathname+location.hash,fcp:fcp?Math.round(fcp.startTime):null,lcp:Math.round(window.__lcp),cls:+window.__cls.toFixed(3),vt:sessionStorage.getItem('vt:'+location.pathname),
     ancora:location.hash?!!document.getElementById(location.hash.slice(1)):null,fundo:getComputedStyle(document.body).backgroundColor,fonteH1:h1?getComputedStyle(h1).fontFamily.split(',')[0].replace(/"/g,''):null,
     cabecalhoAltura:hd?Math.round(hd.getBoundingClientRect().height):0,pular:!!document.querySelector('a[href="#conteudo"],a.a11y-skip')}}));
   fs.writeFileSync(O+`${n}-${r.url.replace(/[\/#.]/g,'_')}.png`,await p.screenshot());
   // teclado: o primeiro Tab
   await p.keyboard.press('Tab');r.primeiroTab=await p.evaluate(()=>{const e=document.activeElement;return (e.getAttribute('aria-label')||e.textContent||e.tagName).replace(/\s+/g,' ').trim().slice(0,30)});
   // volta
   await p.goBack({waitUntil:'load'});await p.waitForTimeout(1500);r.rolagemVolta=await p.evaluate(()=>Math.round(scrollY));r.bfcache=await p.evaluate(()=>window.__bfcache===true);r.naoRestaurou=await p.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];return n&&n.notRestoredReasons?JSON.stringify(n.notRestoredReasons.reasons||[]).slice(0,160):null});
   const depois=await p.screenshot();const a=await s(antes2).resize(240).greyscale().raw().toBuffer(),d=await s(depois).resize(240).greyscale().raw().toBuffer();let x=0;for(let i=0;i<a.length;i++)x+=Math.abs(a[i]-d[i]);r.difVolta=+(x/a.length).toFixed(2);
  }catch(e){r.erro=(''+e).split('\n')[0]}
  rel.push(n+' '+JSON.stringify(r));await c.close()}}
fs.writeFileSync(O+'relatorio.txt',rel.join('\n'));console.log(rel.join('\n'));await b.close()})();
