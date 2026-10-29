/**
 * Interação da página /entrevista-acessibilidade-streaming.
 *
 * Tudo fica no navegador: localStorage (se a pessoa deixar) e arquivos que ela
 * mesma baixa. Nenhuma requisição de rede sai deste módulo.
 *
 * Spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §4–§6.
 */
import {
  CHAVE, PARTES, CAMPOS_SITUACAO,
  estadoVazio, novaSituacao, validarImportacao, daParte, nomeSituacao, paraTexto,
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

// Salvar com sucesso não é anunciado (ruído a cada tecla); a falha é, uma vez, até voltar a salvar (WCAG 4.1.3).
let falhaAnunciada = false;

function gravar() {
  if (!chkSalvar.checked) return;
  try {
    estado.atualizadoEm = new Date().toISOString();
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    ultimoSalvamento.textContent = `Respostas salvas neste navegador às ${hora}.`;
    falhaAnunciada = false;
  } catch {
    const msg = 'Não foi possível salvar neste navegador. Baixe o arquivo de respostas para não perder o que escreveu.';
    ultimoSalvamento.textContent = msg;
    if (!falhaAnunciada) { falhaAnunciada = true; anunciar(msg); }
  }
}

let timerGravar;
const gravarDepois = () => { clearTimeout(timerGravar); timerGravar = setTimeout(gravar, 400); };
// Fechar ou recarregar a página antes dos 400 ms não pode perder a última resposta.
const gravarAgora = () => { if (timerGravar) { clearTimeout(timerGravar); timerGravar = null; gravar(); } };
addEventListener('pagehide', gravarAgora);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') gravarAgora(); });

function apagarArmazenado() {
  try { localStorage.removeItem(CHAVE); } catch { /* nada a apagar */ }
}

/* ── Campos fixos ↔ estado ────────────────────────────────────────────────── */

/** Controles fixos com nome: tudo no formulário que não está dentro de uma situação. */
const camposFixos = () =>
  [...form.elements].filter((el) => el.name && !el.closest('.et-lista-sit'));

function lerCamposFixos() {
  const campos = {};
  for (const el of camposFixos()) {
    if (el.type === 'radio') { if (el.checked) campos[el.name] = el.value; }
    else campos[el.name] = el.value;
  }
  return campos;
}

function aplicarCamposFixos(campos) {
  for (const el of camposFixos()) {
    const v = campos[el.name];
    if (el.type === 'radio') el.checked = v === el.value;
    else el.value = typeof v === 'string' ? v : '';
  }
  // Bloco extra com resposta salva não pode ficar escondido (spec D-10).
  for (const d of form.querySelectorAll('details')) {
    if ([...d.querySelectorAll('textarea')].some((t) => t.value.trim())) d.open = true;
  }
}

/**
 * Perguntas na ordem da página, com o texto visível de cada uma e o título
 * da parte, para o arquivo usar as mesmas palavras da tela.
 */
function perguntasDaPagina() {
  const out = [];
  for (const el of camposFixos()) {
    if (out.some((p) => p.nome === el.name)) continue;
    const secao = el.closest('.et-form > section');
    const pergunta = el.type === 'radio'
      ? el.closest('fieldset')?.querySelector('legend')?.textContent.trim()
      : form.querySelector(`label[for="${el.id}"]`)?.textContent.trim();
    out.push({
      nome: el.name,
      pergunta: pergunta || el.name,
      secao: secao?.id || '',
      titulo: secao?.querySelector('h2')?.textContent.trim() || '',
    });
  }
  return out;
}

/* ── Situações ────────────────────────────────────────────────────────────── */

const caixaDaParte = (parte) => form.querySelector(`.et-situacoes[data-parte="${parte}"]`);

function criarCampo(sit, campo) {
  const div = document.createElement('div');
  div.className = 'et-campo';
  const id = `sit-${sit.id}-${campo.id}`;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = campo.rotulo;
  const input = document.createElement(campo.longo ? 'textarea' : 'input');
  if (campo.longo) input.rows = 3; else input.type = 'text';
  input.id = id;
  input.value = sit[campo.id];
  input.dataset.campo = campo.id;
  div.append(label, input);
  return div;
}

function criarSituacao(sit) {
  const li = document.createElement('li');
  li.dataset.id = sit.id;
  const fs = document.createElement('fieldset');
  fs.append(document.createElement('legend'), ...CAMPOS_SITUACAO.map((c) => criarCampo(sit, c)));
  const remover = document.createElement('button');
  remover.type = 'button';
  remover.className = 'et-btn et-btn-perigo';
  remover.dataset.remover = sit.id;
  fs.append(remover);
  li.append(fs);
  return li;
}

/** Numera legendas e botões de uma parte de novo (após inclusão ou remoção). */
function renumerar(parte) {
  const caixa = caixaDaParte(parte);
  const itens = [...caixa.querySelectorAll('.et-lista-sit > li')];
  itens.forEach((li, i) => {
    const nome = nomeSituacao(parte, i + 1);
    li.querySelector('legend').textContent = nome;
    li.querySelector('[data-remover]').textContent = `Remover ${nome.charAt(0).toLowerCase()}${nome.slice(1)}`;
  });
  caixa.querySelector('.et-vazio').hidden = itens.length > 0;
}

function renderizarSituacoes() {
  for (const { id: parte } of PARTES) {
    caixaDaParte(parte).querySelector('.et-lista-sit').replaceChildren(...daParte(estado, parte).map(criarSituacao));
    renumerar(parte);
  }
}

function adicionarSituacao(parte) {
  const sit = novaSituacao(parte, proximoId++);
  estado.situacoes.push(sit);
  const li = criarSituacao(sit);
  caixaDaParte(parte).querySelector('.et-lista-sit').append(li);
  renumerar(parte);
  li.querySelector('input, textarea').focus();
  anunciar(`${li.querySelector('legend').textContent} adicionada.`);
  gravarDepois();
}

function removerSituacao(id) {
  const sit = estado.situacoes.find((s) => s.id === id);
  if (!sit) return;
  const li = form.querySelector(`.et-lista-sit > li[data-id="${id}"]`);
  const nome = li.querySelector('legend').textContent;
  confirmar(`Remover ${nome.charAt(0).toLowerCase()}${nome.slice(1)}? O que você escreveu nela será apagado.`, 'Remover', () => {
    const caixa = caixaDaParte(sit.parte);
    estado.situacoes = estado.situacoes.filter((s) => s.id !== id);
    li.remove();
    renumerar(sit.parte);
    caixa.querySelector('[data-adicionar]').focus();
    anunciar(`${nome} removida.`);
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

/* ── Enviar: baixar, copiar, continuar em outro aparelho, apagar ─────────── */

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
  const quem = (estado.campos['antes-nome'] || '').trim().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return `respostas-entrevista-${quem ? `${quem}-` : ''}${new Date().toISOString().slice(0, 10)}`;
};

const textoRespostas = () => paraTexto(estado, perguntasDaPagina());

document.getElementById('baixar-txt').addEventListener('click', () => {
  baixar(`${nomeBase()}.txt`, textoRespostas(), 'text/plain');
});
document.getElementById('baixar-json').addEventListener('click', () => {
  baixar(`${nomeBase()}-continuacao.json`, JSON.stringify(estado, null, 2), 'application/json');
});

// O resultado aparece em texto visível (quem enxerga também precisa saber) e é anunciado.
const resultadoCopiar = document.getElementById('copiar-resultado');

document.getElementById('copiar-respostas').addEventListener('click', async () => {
  let msg;
  try {
    await navigator.clipboard.writeText(textoRespostas());
    msg = 'Respostas copiadas. Cole o texto na mensagem.';
  } catch {
    msg = 'Não foi possível copiar. Baixe o arquivo de respostas e envie o arquivo.';
  }
  resultadoCopiar.textContent = msg;
  resultadoCopiar.hidden = false;
  anunciar(msg);
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
  catch { r = { ok: false, erro: 'Não foi possível ler o arquivo. Escolha o arquivo .json baixado em “Continuar em outro aparelho”.' }; }
  if (!r.ok) { mostrarErroImportacao(r.erro); return; }
  const abrir = () => {
    carregar(r.estado);
    inputImportar.value = '';
    gravar();
    inputImportar.focus();
    anunciar(`Respostas carregadas do arquivo ${arquivo.name}.`);
  };
  // Substituir respostas é irreversível: com algo escrito na página, pede confirmação (WCAG 3.3.4).
  if (!temRespostas()) { abrir(); return; }
  inputImportar.focus(); // ao cancelar, o foco volta ao campo do arquivo
  confirmar('Abrir o arquivo substitui as respostas que estão na página agora. Não é possível desfazer. Baixe o arquivo de continuação antes, se quiser guardar as atuais.', 'Substituir', abrir);
});

// Cancelado ou não, o campo volta vazio: escolher o mesmo arquivo de novo precisa disparar `change`.
dlg.addEventListener('close', () => { inputImportar.value = ''; });

/** Há alguma resposta na página (campo fixo ou situação)? */
const temRespostas = () =>
  Object.values(estado.campos).some((v) => typeof v === 'string' && v.trim())
  || estado.situacoes.some((sit) => CAMPOS_SITUACAO.some((c) => sit[c.id]?.trim()));

document.getElementById('apagar').addEventListener('click', () => {
  confirmar('Apagar todas as respostas desta página e deste navegador? Não é possível desfazer.', 'Apagar', () => {
    apagarArmazenado();
    carregar(estadoVazio());
    ultimoSalvamento.textContent = 'Nada salvo ainda.';
    const h1 = document.getElementById('t-inicio');
    h1.setAttribute('tabindex', '-1');
    h1.focus();
    anunciar('Respostas apagadas.');
  });
});

/* ── Carga e eventos gerais ───────────────────────────────────────────────── */

function carregar(novo) {
  estado = novo;
  proximoId = estado.situacoes.reduce((m, s) => Math.max(m, Number(s.id) || 0), 0) + 1;
  aplicarCamposFixos(estado.campos);
  renderizarSituacoes();
}

form.addEventListener('submit', (e) => e.preventDefault());

form.addEventListener('input', (e) => {
  const el = e.target;
  if (el === inputImportar || el === chkSalvar) return;
  const li = el.closest('.et-lista-sit > li');
  if (li) {
    const sit = estado.situacoes.find((x) => x.id === li.dataset.id);
    if (sit && el.dataset.campo) sit[el.dataset.campo] = el.value;
  } else {
    estado.campos = lerCamposFixos();
  }
  gravarDepois();
});
form.addEventListener('click', (e) => {
  const add = e.target.closest('[data-adicionar]');
  if (add) { adicionarSituacao(add.dataset.adicionar); return; }
  const rem = e.target.closest('[data-remover]');
  if (rem) removerSituacao(rem.dataset.remover);
});

chkSalvar.addEventListener('change', () => {
  try { localStorage.setItem(PREF_SALVAR, chkSalvar.checked ? '1' : '0'); } catch { /* sem armazenamento */ }
  if (chkSalvar.checked) { gravar(); anunciar('Salvamento automático ligado.'); }
  else {
    apagarArmazenado();
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
  ultimoSalvamento.textContent = `Respostas recuperadas deste navegador, salvas em ${quando}.`;
}
if (!chkSalvar.checked) ultimoSalvamento.textContent = 'Salvamento desligado. Nada fica gravado neste navegador.';
