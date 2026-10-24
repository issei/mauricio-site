/**
 * Interação da página /entrevista-acessibilidade-streaming.
 *
 * Tudo fica no navegador: localStorage (se a pessoa deixar) e arquivos que ela
 * mesma baixa. Nenhuma requisição de rede sai deste módulo.
 *
 * Spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §5–§6.
 */
import {
  CHAVE, EIXOS, ORIGENS, CAMPOS_EPISODIO,
  estadoVazio, novoEpisodio, validarImportacao, decorrido, formatarDuracao,
  pausasCruzadas, doEixo, textoTopicos, paraMarkdown,
} from './modelo.js';

const form = document.getElementById('entrevista');
const anuncio = document.getElementById('anuncio');
const chkSalvar = document.getElementById('salvar-local');
const ultimoSalvamento = document.getElementById('ultimo-salvamento');

let estado = estadoVazio();
let proximoId = 1;

/* ── Anúncios ─────────────────────────────────────────────────────────────── */

/** Mensagem para leitor de tela. Limpa antes para repetir a mesma frase. */
function anunciar(msg) {
  anuncio.textContent = '';
  setTimeout(() => { anuncio.textContent = msg; }, 50);
}

/* ── Armazenamento (sempre em try/catch: janela privada pode recusar) ───── */

const PREF_SALVAR = `${CHAVE}:salvar`;

function lerArmazenado() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const r = validarImportacao(JSON.parse(bruto));
    return r.ok ? r.estado : null;
  } catch { return null; }
}

function gravar() {
  if (!chkSalvar.checked) return;
  try {
    estado.atualizadoEm = new Date().toISOString();
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    ultimoSalvamento.textContent = `Salvo neste navegador às ${hora}.`;
  } catch {
    ultimoSalvamento.textContent = 'Não foi possível salvar neste navegador. Exporte o registro para não perder as anotações.';
  }
}

let timerGravar;
const gravarDepois = () => { clearTimeout(timerGravar); timerGravar = setTimeout(gravar, 400); };
// Fechar ou recarregar a página antes dos 400 ms não pode perder a última anotação.
const gravarAgora = () => { if (timerGravar) { clearTimeout(timerGravar); timerGravar = null; gravar(); } };
addEventListener('pagehide', gravarAgora);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') gravarAgora(); });

function apagarArmazenado() {
  try { localStorage.removeItem(CHAVE); } catch { /* nada a apagar */ }
}

/* ── Campos fixos ↔ estado ────────────────────────────────────────────────── */

/** Controles fixos com nome: tudo no formulário que não está dentro de um episódio. */
const camposFixos = () =>
  [...form.elements].filter((el) => el.name && !el.closest('.et-lista-ep'));

function lerCamposFixos() {
  const campos = {};
  for (const el of camposFixos()) {
    if (el.type === 'radio') { if (el.checked) campos[el.name] = el.value; }
    else if (el.type === 'checkbox') campos[el.name] = el.checked;
    else if (el.type !== 'file') campos[el.name] = el.value;
  }
  return campos;
}

function aplicarCamposFixos(campos) {
  for (const el of camposFixos()) {
    const v = campos[el.name];
    if (el.type === 'radio') el.checked = v === el.value;
    else if (el.type === 'checkbox') el.checked = v === true;
    else if (el.type !== 'file') el.value = typeof v === 'string' ? v : '';
  }
}

/**
 * Rótulo visível e seção de cada campo fixo, lidos do próprio DOM,
 * para o relatório usar as mesmas palavras da tela.
 */
function rotulosDosCampos() {
  const out = {};
  for (const el of camposFixos()) {
    if (out[el.name]) continue;
    const secao = el.closest('section.et-eixo, .et-form > section')?.querySelector('h2, h3')?.textContent.trim() || 'Outros campos';
    let rotulo;
    if (el.type === 'radio') rotulo = el.closest('fieldset')?.querySelector('legend')?.textContent.trim();
    else rotulo = form.querySelector(`label[for="${el.id}"]`)?.textContent.trim() || el.closest('label')?.textContent.trim();
    out[el.name] = { rotulo: rotulo || el.name, secao };
  }
  return out;
}

/* ── Episódios ────────────────────────────────────────────────────────────── */

const listaDoEixo = (eixo) => form.querySelector(`.et-episodios[data-eixo="${eixo}"]`);

function criarCampoTexto(ep, campo) {
  const div = document.createElement('div');
  div.className = 'et-campo';
  const id = `ep-${ep.id}-${campo.id}`;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = campo.rotulo;
  const input = document.createElement(campo.longo ? 'textarea' : 'input');
  if (campo.longo) input.rows = 3; else input.type = 'text';
  input.id = id;
  input.value = ep[campo.id];
  input.dataset.campo = campo.id;
  if (campo.id === 'tempo') {
    const ajuda = document.createElement('p');
    ajuda.className = 'et-ajuda';
    ajuda.id = `${id}-ajuda`;
    ajuda.textContent = 'Exemplo: 00:23:15.';
    input.setAttribute('aria-describedby', ajuda.id);
    div.append(label, ajuda, input);
  } else div.append(label, input);
  return div;
}

function criarGrupo(legendaTexto, filhos) {
  const fs = document.createElement('fieldset');
  fs.className = 'et-ep-grupo';
  const lg = document.createElement('legend');
  lg.textContent = legendaTexto;
  fs.append(lg, ...filhos);
  return fs;
}

function criarOrigem(ep) {
  const fs = document.createElement('fieldset');
  fs.className = 'et-opcoes et-ep-grupo';
  const lg = document.createElement('legend');
  lg.textContent = 'Origem do impedimento';
  const ajuda = document.createElement('p');
  ajuda.className = 'et-ajuda';
  ajuda.id = `ep-${ep.id}-origem-ajuda`;
  ajuda.textContent = 'Se o relato não permitir distinguir, marque Indefinido e use as perguntas de aprofundamento, sem sugerir a causa.';
  fs.setAttribute('aria-describedby', ajuda.id);
  fs.append(lg, ajuda);
  for (const o of ORIGENS) {
    const label = document.createElement('label');
    const r = document.createElement('input');
    r.type = 'radio';
    r.name = `ep-${ep.id}-origem`;
    r.value = o.valor;
    r.checked = ep.origem === o.valor;
    r.dataset.campo = 'origem';
    label.append(r, ` ${o.rotulo}`);
    fs.append(label);
  }
  return fs;
}

function criarEpisodio(ep) {
  const li = document.createElement('li');
  li.dataset.id = ep.id;
  const fs = document.createElement('fieldset');
  const lg = document.createElement('legend');
  fs.append(lg);

  const porGrupo = (g) => CAMPOS_EPISODIO.filter((c) => c.grupo === g).map((c) => criarCampoTexto(ep, c));
  fs.append(
    ...porGrupo('contexto'),
    criarOrigem(ep),
    criarGrupo('Relato direto', porGrupo('relato')),
    criarGrupo('Interpretações', porGrupo('interpretacao')),
    criarGrupo('Lacunas', porGrupo('lacunas')),
  );

  const remover = document.createElement('button');
  remover.type = 'button';
  remover.className = 'et-btn et-btn-perigo';
  remover.dataset.remover = ep.id;
  fs.append(remover);
  li.append(fs);
  return li;
}

/** Numera legendas e botões de um eixo de novo (após inclusão ou remoção). */
function renumerar(eixo) {
  const caixa = listaDoEixo(eixo);
  const itens = [...caixa.querySelectorAll('.et-lista-ep > li')];
  itens.forEach((li, i) => {
    const nome = `Eixo ${eixo}, episódio ${i + 1}`;
    li.querySelector('legend').textContent = nome;
    li.querySelector('[data-remover]').textContent = `Remover ${nome.charAt(0).toLowerCase()}${nome.slice(1)}`;
  });
  caixa.querySelector('.et-vazio').hidden = itens.length > 0;
}

function renderizarEpisodios() {
  for (const { id: eixo } of EIXOS) {
    const ol = listaDoEixo(eixo).querySelector('.et-lista-ep');
    ol.replaceChildren(...doEixo(estado, eixo).map(criarEpisodio));
    renumerar(eixo);
  }
}

function adicionarEpisodio(eixo) {
  const ep = novoEpisodio(eixo, proximoId++);
  estado.episodios.push(ep);
  const li = criarEpisodio(ep);
  listaDoEixo(eixo).querySelector('.et-lista-ep').append(li);
  renumerar(eixo);
  li.querySelector('input, textarea').focus();
  anunciar(`${li.querySelector('legend').textContent} adicionado.`);
  gravarDepois();
}

function removerEpisodio(id) {
  const ep = estado.episodios.find((e) => e.id === id);
  if (!ep) return;
  const li = form.querySelector(`.et-lista-ep > li[data-id="${id}"]`);
  const nome = li.querySelector('legend').textContent;
  confirmar(`Remover ${nome.charAt(0).toLowerCase()}${nome.slice(1)}? As anotações dele serão apagadas.`, 'Remover', () => {
    const caixa = listaDoEixo(ep.eixo);
    estado.episodios = estado.episodios.filter((e) => e.id !== id);
    li.remove();
    renumerar(ep.eixo);
    caixa.querySelector('[data-adicionar]').focus();
    anunciar(`${nome} removido.`);
    gravarDepois();
  });
}

/* ── Diálogo de confirmação (A11Y-DECISIONS: <dialog> + showModal, foco no título) ── */

const dlg = document.getElementById('confirmar');
let aoConfirmar = null;
let gatilho = null;

function confirmar(texto, rotuloSim, acao) {
  gatilho = document.activeElement;
  aoConfirmar = acao;
  document.getElementById('confirmar-texto').textContent = texto;
  document.getElementById('confirmar-sim').textContent = rotuloSim;
  dlg.showModal();
  document.getElementById('confirmar-titulo').focus();
}

dlg.addEventListener('close', () => {
  const acao = dlg.returnValue === 'sim' ? aoConfirmar : null;
  dlg.returnValue = '';
  aoConfirmar = null;
  if (acao) acao();
  else if (gatilho?.isConnected) gatilho.focus();
});
document.getElementById('confirmar-sim').addEventListener('click', () => dlg.close('sim'));
document.getElementById('confirmar-nao').addEventListener('click', () => dlg.close('nao'));
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close('nao'); });

/* ── Cronômetro ───────────────────────────────────────────────────────────── */

const elTempo = document.getElementById('tempo-decorrido');
const btnIniciar = document.getElementById('cron-iniciar');
const btnPausar = document.getElementById('cron-pausar');
const btnZerar = document.getElementById('cron-zerar');
let tique = null;
let ultimoMs = 0;

function atualizarCronometro() {
  const ms = decorrido(estado.cronometro);
  elTempo.textContent = formatarDuracao(ms);
  for (const min of pausasCruzadas(ultimoMs, ms)) {
    anunciar(`${min} minutos de entrevista: hora da pausa sugerida pelo roteiro. Ofereça uma pausa à pessoa.`);
  }
  ultimoMs = ms;
}

function sincronizarBotoesCronometro() {
  const rodando = Boolean(estado.cronometro.iniciadoEm);
  btnIniciar.disabled = rodando;
  btnPausar.disabled = !rodando;
  btnIniciar.textContent = estado.cronometro.acumuladoMs > 0 && !rodando ? 'Retomar' : 'Iniciar';
  clearInterval(tique);
  tique = rodando ? setInterval(atualizarCronometro, 1000) : null;
  atualizarCronometro();
}

btnIniciar.addEventListener('click', () => {
  estado.cronometro.iniciadoEm = Date.now();
  sincronizarBotoesCronometro();
  btnPausar.focus();
  anunciar('Cronômetro em andamento.');
  gravarDepois();
});
btnPausar.addEventListener('click', () => {
  estado.cronometro.acumuladoMs = decorrido(estado.cronometro);
  estado.cronometro.iniciadoEm = null;
  sincronizarBotoesCronometro();
  btnIniciar.focus();
  anunciar(`Cronômetro pausado em ${formatarDuracao(estado.cronometro.acumuladoMs)}.`);
  gravarDepois();
});
btnZerar.addEventListener('click', () => {
  estado.cronometro = { acumuladoMs: 0, iniciadoEm: null };
  ultimoMs = 0;
  sincronizarBotoesCronometro();
  anunciar('Cronômetro zerado.');
  gravarDepois();
});

/* ── Lista de tópicos ─────────────────────────────────────────────────────── */

const topicosNome = document.getElementById('topicos-nome');
const topicosTexto = document.getElementById('topicos-texto');
topicosNome.addEventListener('input', () => { topicosTexto.value = textoTopicos(topicosNome.value); });

document.getElementById('topicos-copiar').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(topicosTexto.value);
    anunciar('Texto copiado.');
  } catch {
    topicosTexto.focus();
    topicosTexto.select();
    anunciar('Não foi possível copiar sozinho. O texto está selecionado: copie com Ctrl+C ou Command+C.');
  }
});
document.getElementById('topicos-baixar').addEventListener('click', () => {
  baixar('topicos-da-entrevista.txt', topicosTexto.value, 'text/plain');
});

/* ── Exportar, importar e apagar ─────────────────────────────────────────── */

function baixar(nome, conteudo, tipo) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: `${tipo};charset=utf-8` }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  anunciar(`Arquivo ${nome} baixado.`);
}

const nomeBase = () => {
  const id = (estado.campos['ab-identificador'] || 'entrevista').normalize('NFD').replace(/[^\w-]+/g, '-').replace(/-+/g, '-').slice(0, 40);
  return `${id}-${new Date().toISOString().slice(0, 10)}`;
};

document.getElementById('exportar-md').addEventListener('click', () => {
  baixar(`${nomeBase()}.md`, paraMarkdown(estado, rotulosDosCampos()), 'text/markdown');
});
document.getElementById('exportar-json').addEventListener('click', () => {
  baixar(`${nomeBase()}.json`, JSON.stringify(estado, null, 2), 'application/json');
});

const inputImportar = document.getElementById('importar-arquivo');
const erroImportar = document.getElementById('importar-erro');

function mostrarErroImportacao(msg) {
  erroImportar.textContent = msg;
  erroImportar.hidden = false;
  inputImportar.setAttribute('aria-invalid', 'true');
  inputImportar.focus();
  anunciar(`Erro: ${msg}`);
}

inputImportar.addEventListener('change', async () => {
  const arquivo = inputImportar.files[0];
  if (!arquivo) return;
  erroImportar.hidden = true;
  inputImportar.removeAttribute('aria-invalid');
  let r;
  try { r = validarImportacao(JSON.parse(await arquivo.text())); }
  catch { r = { ok: false, erro: 'Não foi possível ler o arquivo. Escolha o arquivo .json exportado em “Guardar e exportar”.' }; }
  if (!r.ok) { mostrarErroImportacao(r.erro); return; }
  carregar(r.estado);
  inputImportar.value = '';
  gravar();
  anunciar(`Registro carregado do arquivo ${arquivo.name}.`);
});

document.getElementById('apagar').addEventListener('click', () => {
  confirmar('Apagar todas as anotações desta página e deste navegador? Não é possível desfazer.', 'Apagar', () => {
    apagarArmazenado();
    carregar(estadoVazio());
    ultimoSalvamento.textContent = 'Nada salvo ainda.';
    document.getElementById('t-inicio').setAttribute('tabindex', '-1');
    document.getElementById('t-inicio').focus();
    anunciar('Dados apagados.');
  });
});

/* ── Carga e eventos gerais ───────────────────────────────────────────────── */

function carregar(novo) {
  estado = novo;
  proximoId = estado.episodios.reduce((m, e) => Math.max(m, Number(e.id) || 0), 0) + 1;
  aplicarCamposFixos(estado.campos);
  renderizarEpisodios();
  ultimoMs = decorrido(estado.cronometro);
  sincronizarBotoesCronometro();
}

form.addEventListener('submit', (e) => e.preventDefault());

form.addEventListener('input', (e) => {
  const el = e.target;
  if (el === inputImportar || el === topicosNome || el === chkSalvar) return;
  const li = el.closest('.et-lista-ep > li');
  if (li) {
    const ep = estado.episodios.find((x) => x.id === li.dataset.id);
    if (ep && el.dataset.campo) ep[el.dataset.campo] = el.value;
  } else {
    estado.campos = lerCamposFixos();
  }
  gravarDepois();
});
form.addEventListener('click', (e) => {
  const add = e.target.closest('[data-adicionar]');
  if (add) { adicionarEpisodio(add.dataset.adicionar); return; }
  const rem = e.target.closest('[data-remover]');
  if (rem) removerEpisodio(rem.dataset.remover);
});

chkSalvar.addEventListener('change', () => {
  try { localStorage.setItem(PREF_SALVAR, chkSalvar.checked ? '1' : '0'); } catch { /* sem armazenamento */ }
  if (chkSalvar.checked) { gravar(); anunciar('Salvamento automático ligado.'); }
  else {
    apagarArmazenado();
    try { localStorage.setItem(PREF_SALVAR, '0'); } catch { /* sem armazenamento */ }
    ultimoSalvamento.textContent = 'Salvamento desligado. Nada fica gravado neste navegador.';
    anunciar('Salvamento automático desligado. O que estava gravado neste navegador foi apagado.');
  }
});

// Início
try { if (localStorage.getItem(PREF_SALVAR) === '0') chkSalvar.checked = false; } catch { /* sem armazenamento */ }
const salvo = chkSalvar.checked ? lerArmazenado() : null;
carregar(salvo || estadoVazio());
if (salvo?.atualizadoEm) {
  const quando = new Date(salvo.atualizadoEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  ultimoSalvamento.textContent = `Registro recuperado deste navegador, salvo em ${quando}.`;
}
if (!chkSalvar.checked) ultimoSalvamento.textContent = 'Salvamento desligado. Nada fica gravado neste navegador.';
