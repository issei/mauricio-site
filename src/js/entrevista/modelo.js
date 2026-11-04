/**
 * Modelo puro da página /entrevista-acessibilidade-streaming.
 *
 * Sem DOM e sem armazenamento: só o formato dos dados, a validação da
 * importação e o texto que a página exporta. Por isso roda no navegador
 * e no `node:test` (tests/entrevista.model.test.mjs).
 *
 * Spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §5.
 */

/** Versão do formato salvo e exportado. Muda só quando o formato quebra. */
export const VERSAO = 1;

/**
 * Questionário que a página mostra. Muda quando muda o texto ou a lista de
 * perguntas, sem mudar o formato (VERSAO). Quem analisa as respostas usa este
 * id para saber qual pergunta a pessoa leu. Vai em todo arquivo .json baixado.
 */
export const INSTRUMENTO = 'entrevista-streaming@1';

/** Chave do localStorage. O sufixo acompanha a VERSAO. */
export const CHAVE = 'entrevista-streaming:v1';

/**
 * Partes que aceitam situações detalhadas: os Eixos A a E do roteiro.
 * `secao` é o id da <section> da parte; `numero` é o número visível ("Parte 2").
 */
export const PARTES = [
  { id: 'A', secao: 'escolha', numero: 2, eixo: 'Descoberta e escolha de conteúdo' },
  { id: 'B', secao: 'comecar', numero: 3, eixo: 'Início e configuração da reprodução' },
  { id: 'C', secao: 'controle', numero: 4, eixo: 'Navegação e controle durante o uso' },
  { id: 'D', secao: 'continuidade', numero: 5, eixo: 'Continuidade entre dispositivos e sessões' },
  { id: 'E', secao: 'contornos', numero: 6, eixo: 'Situações de frustração, abandono ou soluções improvisadas' },
];

/**
 * Campos de uma situação, na ordem de leitura do formulário.
 * Vêm de "Como registrar os relatos" (seção 6 do roteiro), escritos para a
 * própria pessoa. Não há campo de causa: o roteiro proíbe sugerir a causa.
 */
export const CAMPOS_SITUACAO = [
  { id: 'aparelho', rotulo: 'Em qual aparelho foi?' },
  { id: 'servico', rotulo: 'Em qual serviço? (só se quiser citar)' },
  { id: 'recurso', rotulo: 'Qual recurso ou ajuste estava envolvido?' },
  { id: 'controle', rotulo: 'Como você controlava o aparelho? (por exemplo: controle remoto, toque, teclado, voz, leitor de tela)' },
  { id: 'quando', rotulo: 'Quando foi, mais ou menos?' },
  { id: 'versao', rotulo: 'Versão do aplicativo ou do aparelho (se souber)' },
  { id: 'objetivo', rotulo: 'O que você queria fazer?', longo: true },
  { id: 'passos', rotulo: 'O que você fez, passo a passo?', longo: true },
  { id: 'resultado', rotulo: 'O que aconteceu? O que apareceu na tela, foi falado ou mudou?', longo: true },
  { id: 'desfecho', rotulo: 'Como terminou? Você conseguiu, desistiu ou deu outro jeito?', longo: true },
  { id: 'porque', rotulo: 'Na sua opinião, por que isso aconteceu? (opcional)', longo: true },
];

/** Estado vazio. Toda leitura parte daqui, então campo novo nunca chega `undefined`. */
export function estadoVazio() {
  return { versao: VERSAO, instrumento: INSTRUMENTO, atualizadoEm: null, campos: {}, situacoes: [] };
}

/** Situação nova da parte pedida, com todos os campos vazios. */
export function novaSituacao(parte, id) {
  if (!PARTES.some((p) => p.id === parte)) throw new Error(`parte desconhecida: ${parte}`);
  const s = { id: String(id), parte };
  for (const c of CAMPOS_SITUACAO) s[c.id] = '';
  return s;
}

const ehObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const texto = (v) => (typeof v === 'string' ? v : '');

/**
 * Lê um objeto vindo do localStorage ou de um arquivo importado.
 * Devolve `{ ok: true, estado }` ou `{ ok: false, erro }` com uma frase que diz a saída.
 * Campos desconhecidos são descartados; nada de fora vira HTML.
 */
export function validarImportacao(bruto) {
  if (!ehObjeto(bruto)) {
    return { ok: false, erro: 'Este arquivo não foi baixado por esta página. Escolha o arquivo .json baixado em “Continuar em outro aparelho”.' };
  }
  if (bruto.versao !== VERSAO) {
    return { ok: false, erro: `O arquivo é da versão ${String(bruto.versao)} e esta página lê a versão ${VERSAO}. Baixe o arquivo de novo pela página atual.` };
  }
  const estado = estadoVazio();
  estado.atualizadoEm = texto(bruto.atualizadoEm) || null;

  if (ehObjeto(bruto.campos)) {
    for (const [k, v] of Object.entries(bruto.campos)) {
      if (/^[a-z0-9-]{1,64}$/.test(k) && typeof v === 'string') estado.campos[k] = v;
    }
  }

  if (Array.isArray(bruto.situacoes)) {
    for (const b of bruto.situacoes) {
      if (!ehObjeto(b) || !PARTES.some((p) => p.id === b.parte)) continue;
      const s = novaSituacao(b.parte, texto(b.id) || String(estado.situacoes.length + 1));
      for (const c of CAMPOS_SITUACAO) s[c.id] = texto(b[c.id]);
      estado.situacoes.push(s);
    }
  }
  return { ok: true, estado };
}

/** Situações de uma parte, na ordem de criação. */
export const daParte = (estado, parte) => estado.situacoes.filter((s) => s.parte === parte);

/** Nome visível de uma situação: "Parte 3, situação 2". */
export function nomeSituacao(parte, n) {
  const p = PARTES.find((x) => x.id === parte);
  return `Parte ${p.numero}, situação ${n}`;
}

/**
 * Respostas em texto simples, para ler, enviar ou colar numa mensagem.
 * Sem símbolos de Markdown: abre em qualquer aparelho e o leitor de tela lê sem ruído.
 *
 * `perguntas` é a lista dos campos na ordem da página, lida do próprio
 * formulário: `[{ nome, pergunta, secao, titulo }]`. Assim o arquivo usa as
 * mesmas palavras da tela. Pergunta sem resposta não entra.
 */
export function paraTexto(estado, perguntas = [], agora = new Date()) {
  const quem = (estado.campos['antes-nome'] || '').trim() || 'não informado';
  const linhas = [
    'Entrevista por escrito: acessibilidade em serviços de streaming de vídeo',
    `Respostas de: ${quem}`,
    `Arquivo gerado em: ${agora.toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}`,
    '',
  ];

  const secoes = [];
  for (const p of perguntas) {
    let s = secoes.find((x) => x.secao === p.secao);
    if (!s) { s = { secao: p.secao, titulo: p.titulo, itens: [] }; secoes.push(s); }
    const v = (estado.campos[p.nome] || '').trim();
    if (v) s.itens.push('', `Pergunta: ${p.pergunta}`, `Resposta: ${v}`);
  }
  // Uma parte com situações e sem perguntas respondidas ainda precisa aparecer.
  for (const parte of PARTES) {
    if (daParte(estado, parte.id).length && !secoes.some((x) => x.secao === parte.secao)) {
      secoes.push({ secao: parte.secao, titulo: `Parte ${parte.numero}`, itens: [] });
    }
  }

  let algo = false;
  for (const s of secoes) {
    const parte = PARTES.find((p) => p.secao === s.secao);
    const situacoes = parte ? daParte(estado, parte.id) : [];
    const blocos = situacoes.map((sit, i) => {
      const campos = CAMPOS_SITUACAO.filter((c) => sit[c.id].trim()).map((c) => `${c.rotulo} ${sit[c.id].trim()}`);
      return campos.length ? ['', nomeSituacao(parte.id, i + 1), ...campos] : [];
    }).flat();
    if (!s.itens.length && !blocos.length) continue;
    algo = true;
    linhas.push(s.titulo, ...s.itens, ...blocos, '', '');
  }
  if (!algo) linhas.push('Nenhuma pergunta respondida.');
  return linhas.join('\n').replace(/\n{3,}$/, '\n');
}
