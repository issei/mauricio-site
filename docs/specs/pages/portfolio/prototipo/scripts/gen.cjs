// Gera nova-home.template.html (revisão 7). Copia o cabeçalho do site de src/index.html.
const path=require('path'),fs=require('fs');
const R=path.resolve(__dirname,'../../../../../../src')+'/',OUT=path.resolve(__dirname,'../nova-home.template.html');
const ix=fs.readFileSync(R+'index.html','utf8');
const cut=(a)=>ix.match(new RegExp('<!-- '+a+':START[\\s\\S]*?'+a+':END -->'))[0];
// translate="no" só no nome próprio, nunca no cabeçalho inteiro.
const header=cut('SITE-HEADER').replace('<header class="sh" translate="no"','<header class="sh"').replace('class="sh-marca"','class="sh-marca" translate="no"');
const img=(n,alt,w,h,extra='loading="lazy"')=>`<img src="./home-proto/${n}.webp" alt="${alt}" width="${w}" height="${h}" decoding="async" ${extra}>`;
const leg=(dims,narr,cls='')=>`<div class="hm-leg hm-tl${cls}"><p class="hm-dims">${dims}</p><p class="hm-narr">${narr}</p></div>`;
const cena=(n,m,legs)=>`<li class="hm-cena" data-cena="${n}"><figure>${m}<figcaption>${legs}</figcaption></figure></li>`;

// Cena 02: a pergunta, as partes, as fontes e a síntese.
const partes=[['Quem vai operar?','Runbook · Plantão'],['O que pode falhar?','Incidentes · Logs'],['Como saber se funciona?','Aceite · Métricas']];
const c02=`<div class="hm-m1 hm-tl"><div class="hm-q"><p class="hm-q__pergunta hm-tl"><span class="hm-q__digita hm-tl">Como tirar do time o trabalho manual?</span></p><ul class="hm-q__partes hm-tl" aria-label="A pergunta em partes">${partes.map(([p,f],k)=>`<li class="hm-q__parte hm-tl" style="--k:${k}"><span class="hm-q__p">${p}</span><span class="hm-q__fontes hm-tl">${f}</span></li>`).join('')}</ul><p class="hm-q__sintese hm-tl"><span>Só automatizo o que alguém consegue operar, ver falhar e medir.</span><span class="hm-traco hm-tl" aria-hidden="true"></span></p></div></div>`;
// Cena 03: o diagrama real e a saída real do gate (scripts/quality-gate.mjs; etapas que passaram).
const etapas=['build','espelhos /en/ em dia','artefatos gerados em dia','coerência global do site','orçamento de performance'];
const c03=`<div class="hm-m1 hm-tl"><div class="hm-img hm-img--a">${img('diagrama','Diagrama da arquitetura de descoberta em cinco camadas, da página Agent Ready',1600,1067,'loading="lazy" class="hm-tl"')}</div><div class="hm-gate hm-tl" role="group" aria-label="Saída do quality gate deste site"><p class="hm-gate__cmd">$ npm run gate</p><ul>${etapas.map((e,k)=>`<li class="hm-tl" style="--k:${k}"><span aria-hidden="true">✓</span> ${e}</li>`).join('')}</ul></div></div>`;
// Cena 04: estados de um incidente, sem horário nem número.
const c04=`<div class="hm-m1 hm-m1--noite hm-tl"><ol class="hm-inc" aria-label="Estados de um incidente">${['Incidente aberto','Serviço estabilizado','Causa raiz encontrada'].map((t,k)=>`<li class="hm-tl" style="--k:${k}">${t}</li>`).join('')}</ol></div>`;
// Cena 05: a estrutura real do estudo publicado (títulos exatos dos dez princípios).
const principios=['O LLM é um componente, não o piloto','Determinismo é invariante testável','Separe o Cérebro da Vitrine','Determinístico-primeiro','Contratos rígidos em toda fronteira','Isole as camadas epistêmicas','Abrace o Mundo Aberto','Governe o orçamento com ledgers','Governança fail-closed','Explique, não exponha o número'];
const c05=`<div class="hm-m1 hm-tl"><div class="hm-estudo hm-tl"><p class="hm-estudo__tit">Engenharia de Agentes de IA</p><p class="hm-estudo__url">/engenharia-agentes-ia.html</p><ol class="hm-estudo__lista" aria-label="Os dez princípios do estudo">${principios.map(t=>`<li>${t}</li>`).join('')}</ol></div></div>`;

const proj=[
 ['acessibilidade','Acessibilidade','acessibilidade','Uma catraca no gate impede que a dívida de acessibilidade detectável volte a subir.','validar · sustentar','Placar da página Acessibilidade: 207 ocorrências na primeira medição e 0 no gate automatizado'],
 ['case-agents','Case Agents','case-agents','Uma barreira de quatro camadas antes da execução, porque a tool errada não é uma aproximação aceitável.','investigar · projetar','Métricas do benchmark do Case Agents: 0 execuções incorretas em 20 queries'],
 ['agent-ready','Agent Ready','agent-ready','Descoberta, formatos e contratos publicados para que agentes consigam usar este domínio.','construir · ensinar','Placar do IsItAgentReady: 16 checks aprovados e 0 reprovados'],
 ['boutique','Boutique Empresarial','boutique-empresarial-showcase','Site estático, especificação antes do código e um pipeline agêntico com gate determinístico.','projetar · orquestrar','Os 4 pilares da engenharia do projeto Boutique Empresarial'],
];
const marcos=[['1997','Curso técnico em processamento de dados'],['2003–2012','9 anos como Analista de Desenvolvimento na Sysgen'],['2012–2017','6 anos em Sustentação e Inovação na Indra'],['2018–hoje','8 anos em Sustentação e como Tech Lead na Rede'],['2024–hoje','Arquitetura, IA aplicada, engenharia de agentes e ensino']];

fs.writeFileSync(OUT,`<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Protótipo local — O pensamento em prática | Maurício Yokoyama Issei</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Shippori+Mincho:wght@500&display=swap" fetchpriority="high">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Shippori+Mincho:wght@500&display=swap">
${cut('SITE-HEADER-CSS')}
<link rel="stylesheet" href="./home.css"></head><body>
${header}
<nav class="hm-menu" aria-label="Sessões"><ul><li><a href="#apresentacao" class="mn1" aria-label="Apresentação"><span class="hm-menu__l" aria-hidden="true">Apresentação</span><span class="hm-menu__c" aria-hidden="true">Início</span></a></li><li><a href="#historia" class="mn2" aria-label="Minha história"><span class="hm-menu__l" aria-hidden="true">Minha história</span><span class="hm-menu__c" aria-hidden="true">História</span></a></li><li><a href="#ideias" class="mn3" aria-label="Minhas ideias"><span class="hm-menu__l" aria-hidden="true">Minhas ideias</span><span class="hm-menu__c" aria-hidden="true">Ideias</span></a></li><li><a href="#projetos" class="mn4" aria-label="Meus projetos"><span class="hm-menu__l" aria-hidden="true">Meus projetos</span><span class="hm-menu__c" aria-hidden="true">Projetos</span></a></li></ul></nav>
<main id="conteudo" class="hm">
<section class="hm-s hm-s01" id="apresentacao" aria-labelledby="hm-nome"><div class="palco">
<div class="hm-noite hm-tl" aria-hidden="true"></div><span class="hm-fio hm-tl" aria-hidden="true"></span>
<div class="hm-intro hm-tl"><span class="hm-fio01 hm-tl" aria-hidden="true"></span><div class="hm-intro__bloco"><p class="hm-num" aria-hidden="true">01</p><div class="hm-intro__nome hm-tl"><h1 id="hm-nome">Maurício Yokoyama Issei</h1></div>
<div class="hm-intro__resto hm-tl"><p class="hm-mensagem">Da incerteza à especificação.<br>Da especificação à produção.</p><p class="hm-sub">Engenharia de software, arquitetura em produção e agentes de IA.</p>
<p class="hm-contexto">Há mais de vinte anos levo o que foi desenhado até a produção e cuido para que continue rodando.</p>
<nav class="hm-caminhos" aria-label="Caminhos principais"><a href="#historia">Minha história</a><a href="#ideias">Minhas ideias</a><a href="#projetos">Meus projetos</a></nav></div></div>
<div class="m1 retrato hm-tl">${img('retrato','Retrato de Maurício Yokoyama Issei, de óculos e blazer azul, sorrindo',1200,1500,'fetchpriority="high"')}</div></div>
<ol class="hm-cenas" aria-label="Como trabalho">
${cena('02',c02,leg('Escutar · Investigar · Estudar','Quase tudo começa com uma pergunta. Antes de responder, desmonto a pergunta e estudo cada parte.',' hm-leg--a')+leg('Sintetizar · Aprender','Depois fecho as fontes e explico do zero. É aí que separo o que entendi do que só li.',' hm-leg--b'))}
${cena('03',c03,leg('Projetar · Construir · Validar','Desenho para que outra pessoa consiga operar. Construo em passos pequenos, e o teste diz se está certo.'))}
${cena('04',c04,`<div class="hm-leg hm-tl"><p class="hm-dims">Sustentar · Orquestrar · Evoluir</p><p class="hm-narr">Na crise, o tempo conta. Com o time, primeiro estabilizo; depois investigo a causa raiz.</p><span class="hm-kintsugi hm-tl" aria-hidden="true"></span><p class="hm-narr hm-narr--2 hm-tl">A causa vira a próxima pergunta.</p></div>`)}
${cena('05',c05,leg('Integrar · Ensinar · Compartilhar','O que consigo explicar, publico. Ensinar consolida o que aprendi.'))}
</ol></div></section>
<section class="hm-s hm-s02" aria-labelledby="t2"><span class="hm-ancora" id="historia"></span><div class="palco"><div class="hm-duas">
<div class="m1 retrato">${img('retrato','Maurício Yokoyama Issei sorrindo, em retrato',1200,1500)}</div>
<div class="hm-texto"><p class="hm-num" aria-hidden="true">02</p><h2 id="t2">Minha história</h2>
<p class="hm-marco">Comecei escrevendo código. Com o tempo, passei a responder também por times, contratos e sistemas em produção.</p>
<ul class="marcos">${marcos.map(([a,b],i)=>`<li class="hm-marco${i===4?' hm-marco--atual':''}" style="--i:${i+1}"><b>${a}:</b><span>${b}</span></li>`).join('')}</ul>
<p><a class="hm-cta" href="/curriculo.html">Conheça minha história →</a></p></div></div></div></section>
<section class="hm-s hm-s03" aria-labelledby="t3"><span class="hm-ancora" id="ideias"></span><div class="palco"><div class="hm-duas">
<div class="hm-texto"><p class="hm-num" aria-hidden="true">03</p><h2 id="t3">Minhas ideias</h2>
<p class="hm-frase">As ferramentas mudaram; as perguntas, não.</p>
<p>Hoje estudo agentes de IA perguntando o mesmo de sempre: quem vai operar, o que pode falhar, como saber se funciona. Escrevo e gravo o que ainda estou tentando entender.</p>
<ul class="recentes" aria-label="Recentes"><li><a href="/a-quem-a-empresa-delega.html">A quem a empresa delega quando delega à IA?</a><span class="hm-dims">Artigo</span></li><li><a href="/curiosidade-e-investigacao.html">Curiosidade e investigação</a><span class="hm-dims">Ensaio</span></li><li><a href="/videos/domine-a-ia-com-google-antigravity-da-codificacao-a.html">Domine a IA com Google Antigravity</a><span class="hm-dims">Vídeo</span></li></ul>
<p class="ctas"><a class="hm-cta" href="/catalogo.html">Explore minhas ideias →</a><a href="/videos.html">Vídeos do canal →</a></p></div>
<div class="mesa"><div class="foto m1">${img('estados','Figura 3 de Formulação de problemas: os estados do conhecimento',960,768)}</div><div class="foto m1">${img('estudo','Título do ensaio: Quando a curiosidade deixa de ser conteúdo e vira investigação',960,600)}</div><div class="foto m1">${img('videos','Título da página de vídeos: Assista, leia e confira as fontes',960,600)}</div></div></div></div></section>
<section class="hm-s hm-s04" aria-labelledby="t4"><span class="hm-ancora" id="projetos"></span><div class="palco"><div class="hm-texto">
<p class="hm-num" aria-hidden="true">04</p><h2 id="t4">Meus projetos</h2>
<p>Da concepção à operação. Projetos que saíram do papel e que alguém usa. Em cada um, conto o problema e as decisões que tomei.</p>
<ul class="projetos">${proj.map(([f,t,u,tese,d,alt],i)=>`<li style="--i:${i}"><div class="foto m1">${img(f,alt,960,600)}</div><a href="/${u}.html">${t}</a><p class="hm-tese">${tese}</p><p class="hm-dims">${d}</p></li>`).join('')}</ul>
<p><a class="hm-cta hm-fim" href="/catalogo.html#projetos">Conheça meus projetos →</a></p></div></div></section>
</main>
<footer class="hm hm-rodape" id="contact"><h2>Contato</h2><p class="hm-convite">Se você tem um problema parecido com algum destes, me escreva.</p><ul><li><a href="mailto:mauricio@issei.com.br">mauricio@issei.com.br</a></li><li><a href="https://www.linkedin.com/in/mauricioissei/">LinkedIn</a></li><li><a href="https://github.com/issei">GitHub</a></li><li><a href="https://www.youtube.com/@MauricioIssei">YouTube</a></li></ul></footer>
</body></html>`);
console.log('gerado:',OUT);
