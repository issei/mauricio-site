/*
 * Transições entre páginas — script clássico injetado no <head> das páginas da família.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (RF-VT-05 a RF-VT-14) e
 * docs/specs/transicoes/SDD-transicoes-site.md (RF-VT-17 a RF-VT-23, família `site`).
 *
 * Clássico, não módulo: o ouvinte de `pagereveal` precisa existir antes do primeiro quadro.
 * O plugin troca o marcador abaixo pelas funções puras de familias.mjs (LISTA, VIDEO, normalizarUrl,
 * tipoDeTransicao). Os nomes `vt-capa` e `vt-titulo` só existem durante a transição e nunca em mais de
 * um elemento por página: um vídeo aparece várias vezes no índice, então o nome vai só para o que foi ativado.
 */
(function () {
  'use strict';
  if (!('onpagereveal' in window)) return; // RF-VT-14: sem suporte, nada é registrado.
  /*VT:FUNCOES*/

  var NOME_CAPA = 'vt-capa';
  var NOME_TITULO = 'vt-titulo';
  var CHAVE = 'vt-de'; // RF-VT-11: de onde a pessoa saiu, para quem não tem navigation.activation.
  var NOME_NOME = 'vt-nome'; // família site: nome e papel do hero, que existem iguais na home e na carreira.
  var NOME_PAPEL = 'vt-papel';
  var CARTAO = 'a.card-link, .hero a.botao-primario';
  var ativado = null; // o último link clicado (RF-VT-06); o clique por teclado (Enter) também gera `click`.
  var nomeados = [];

  function nomear(el, nome) {
    if (!el) return;
    el.style.viewTransitionName = nome;
    nomeados.push(el);
  }
  function limpar() {
    nomeados.forEach(function (el) { el.style.viewTransitionName = ''; });
    nomeados = [];
  }
  function visivel(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
  }
  function capaDoCartao(cartao) { return cartao.querySelector('.card-thumb, .hero-img'); }
  function tituloDoCartao(cartao) { return cartao.querySelector('h3, h2'); }
  // Família site (RF-VT-19): início e carreira trazem o mesmo bloco `.pf-hero`; o par existe nas duas pontas.
  function heroNomeavel() {
    var nome = document.querySelector('#pf-nome');
    var papel = document.querySelector('.pf-hero-title');
    return nome && papel && visivel(nome) && visivel(papel) ? [nome, papel] : null;
  }
  function nomearHero() {
    var hero = heroNomeavel();
    if (!hero) return;
    nomear(hero[0], NOME_NOME);
    nomear(hero[1], NOME_PAPEL);
  }
  function inicioECarreira(a, b) {
    var par = { '/': 1, '/index': 1, '/curriculo': 2 };
    return par[a] && par[b] && par[a] !== par[b];
  }
  function seguir(vt) {
    vt.ready.catch(function () {}); // transição pulada ou interrompida: a navegação segue sem ela (RF-VT-13).
    vt.finished.then(limpar, limpar);
  }
  function fundo(yt) {
    // RF-VT-12: enquanto a imagem grande carrega, o quadro novo mostra a miniatura que já está no cache.
    var id = yt.getAttribute('data-id');
    if (!id) return;
    yt.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/mqdefault.jpg)';
    yt.style.backgroundSize = 'cover';
    yt.style.backgroundPosition = 'center';
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    ativado = a || null;
  }, true);

  // Página que está saindo: dá os nomes antes de o navegador fotografar o último quadro.
  addEventListener('pageswap', function (e) {
    var vt = e.viewTransition;
    if (!vt) return;
    var de = normalizarUrl(location.href);
    try { sessionStorage.setItem(CHAVE, de); } catch (_) { /* privado ou bloqueado */ }
    var linkAtivado = ativado ? normalizarUrl(ativado.href) : null;
    var para = e.activation && e.activation.entry ? normalizarUrl(e.activation.entry.url) : linkAtivado;
    var tipo = tipoDeTransicao(de, para);
    if (tipo && vt.types) vt.types.add(tipo);
    var destino = e.activation && e.activation.entry ? e.activation.entry.url : ativado && ativado.href;
    var fragmento = '';
    try { fragmento = new URL(destino, location.href).hash; } catch (_) { /* sem destino legível */ }
    // Link com fragmento (#tema-x, #p-…): o navegador só rola até o alvo depois do primeiro quadro, então o alvo
    // nunca está na tela a tempo de ter par (SDD-transicoes-site, R9). Sem nome, só a direção.
    if (SITE.test(de) && SITE.test(para)) {
      if (!fragmento && inicioECarreira(de, para)) nomearHero(); // RF-VT-19
    } else if (tipo === 'retorno') {
      var yt = document.querySelector('.yt[data-id]');
      if (yt && visivel(yt)) { nomear(yt, NOME_CAPA); nomear(document.querySelector('h1'), NOME_TITULO); }
    } else if ((tipo === 'avanco' || tipo === 'lateral') && linkAtivado === para) {
      var cartao = ativado.closest('.card, .hero');
      var capa = cartao && capaDoCartao(cartao);
      if (capa && visivel(capa)) { nomear(capa, NOME_CAPA); nomear(tituloDoCartao(cartao), NOME_TITULO); }
    }
    seguir(vt);
  });

  // Página que está entrando: dá os nomes antes do primeiro quadro novo.
  addEventListener('pagereveal', function (e) {
    var vt = e.viewTransition;
    if (!vt) return;
    var para = normalizarUrl(location.href);
    var de = null;
    var ativacao = window.navigation && window.navigation.activation;
    if (ativacao && ativacao.from) de = normalizarUrl(ativacao.from.url);
    else { try { de = sessionStorage.getItem(CHAVE); } catch (_) { /* sem registro: só o esmaecimento */ } }
    var tipo = tipoDeTransicao(de, para);
    if (tipo && vt.types) vt.types.add(tipo);
    if (SITE.test(para) && SITE.test(de || '')) {
      if (!location.hash && inicioECarreira(de, para)) nomearHero();
    } else if (VIDEO.test(para)) {
      var yt = document.querySelector('.yt[data-id]');
      if (yt) {
        fundo(yt);
        // Com fragmento (#artigo) a capa pode estar fora da tela: sem par visual, só o conteúdo muda.
        if (!location.hash && visivel(yt)) { nomear(yt, NOME_CAPA); nomear(document.querySelector('h1'), NOME_TITULO); }
      }
    } else if (tipo === 'retorno') {
      var links = document.querySelectorAll(CARTAO);
      for (var i = 0; i < links.length; i++) {
        if (normalizarUrl(links[i].href) !== de) continue;
        var cartao = links[i].closest('.card, .hero');
        var capa = cartao && capaDoCartao(cartao);
        if (capa && visivel(capa)) { nomear(capa, NOME_CAPA); nomear(tituloDoCartao(cartao), NOME_TITULO); break; }
      }
    }
    seguir(vt);
  });

  // Página restaurada do histórico (bfcache): nenhum nome pode ter sobrado (RF-VT-13).
  addEventListener('pageshow', function (e) { if (e.persisted) limpar(); });
})();
