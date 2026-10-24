/**
 * Modelo puro da página /entrevista-acessibilidade-streaming.
 *
 * Sem DOM e sem armazenamento: só o formato dos dados, a validação da
 * importação e os textos que a página exporta. Por isso roda no navegador
 * e no `node:test` (tests/entrevista.model.test.mjs).
 *
 * Spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §5.
 */

/** Versão do formato salvo e exportado. Muda só quando o formato quebra. */
export const VERSAO = 1;

/** Chave do localStorage. O sufixo acompanha a VERSAO. */
export const CHAVE = 'entrevista-streaming:v1';

/** Eixos do Bloco 3 do roteiro, na ordem em que aparecem. */
export const EIXOS = [
  { id: 'A', titulo: 'Descoberta e escolha de conteúdo' },
  { id: 'B', titulo: 'Início e configuração da reprodução' },
  { id: 'C', titulo: 'Navegação e controle durante o uso' },
  { id: 'D', titulo: 'Continuidade entre dispositivos e sessões' },
  { id: 'E', titulo: 'Situações de frustração, abandono ou soluções improvisadas' },
];

/**
 * Origem do impedimento (nota "Ao registrar", Eixos B e C).
 * A ordem é a do roteiro; nenhuma opção vem marcada.
 */
export const ORIGENS = [
  { valor: 'ausencia', rotulo: 'Ausência do recurso no conteúdo' },
  { valor: 'interacao', rotulo: 'Barreira de interação' },
  { valor: 'indefinido', rotulo: 'Indefinido' },
  { valor: 'sem-impedimento', rotulo: 'Não houve impedimento' },
];

/**
 * Campos de texto de um episódio, na ordem de leitura do formulário.
 * `grupo` separa relato direto, interpretações e lacunas (seção 6 do roteiro).
 */
export const CAMPOS_EPISODIO = [
  { id: 'aparelho', rotulo: 'Aparelho', grupo: 'contexto' },
  { id: 'servico', rotulo: 'Serviço (só se a pessoa quiser citar)', grupo: 'contexto' },
  { id: 'recurso', rotulo: 'Recurso envolvido', grupo: 'contexto' },
  { id: 'controle', rotulo: 'Forma de controle usada', grupo: 'contexto' },
  { id: 'quando', rotulo: 'Data aproximada do episódio', grupo: 'contexto' },
  { id: 'versao', rotulo: 'Versão do aparelho ou do aplicativo', grupo: 'contexto' },
  { id: 'sequencia', rotulo: 'Sequência de ações', grupo: 'relato', longo: true },
  { id: 'resultado', rotulo: 'Resultado percebido', grupo: 'relato', longo: true },
  { id: 'palavras', rotulo: 'Palavras exatas da pessoa', grupo: 'relato', longo: true },
  { id: 'tempo', rotulo: 'Marcação de tempo na gravação', grupo: 'relato' },
  { id: 'interpretacaoPessoa', rotulo: 'Interpretação da pessoa', grupo: 'interpretacao', longo: true },
  { id: 'interpretacaoEntrevistador', rotulo: 'Sua interpretação', grupo: 'interpretacao', longo: true },
  { id: 'lacunas', rotulo: 'O que não foi dito ou não pôde ser explorado', grupo: 'lacunas', longo: true },
];

/** Estado vazio. Toda leitura parte daqui, então campo novo nunca chega `undefined`. */
export function estadoVazio() {
  return {
    versao: VERSAO,
    atualizadoEm: null,
    campos: {},
    episodios: [],
    cronometro: { acumuladoMs: 0, iniciadoEm: null },
  };
}

/** Episódio novo do eixo pedido, com todos os campos vazios. */
export function novoEpisodio(eixo, id) {
  if (!EIXOS.some((e) => e.id === eixo)) throw new Error(`eixo desconhecido: ${eixo}`);
  const ep = { id: String(id), eixo, origem: '' };
  for (const c of CAMPOS_EPISODIO) ep[c.id] = '';
  return ep;
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
    return { ok: false, erro: 'O arquivo não é uma exportação desta página. Escolha o arquivo .json exportado em “Guardar e exportar”.' };
  }
  if (bruto.versao !== VERSAO) {
    return { ok: false, erro: `O arquivo é da versão ${String(bruto.versao)} e esta página lê a versão ${VERSAO}. Exporte de novo pela página atual.` };
  }
  const estado = estadoVazio();
  estado.atualizadoEm = texto(bruto.atualizadoEm) || null;

  if (ehObjeto(bruto.campos)) {
    for (const [k, v] of Object.entries(bruto.campos)) {
      if (!/^[a-z0-9-]{1,64}$/.test(k)) continue;
      if (typeof v === 'string' || typeof v === 'boolean') estado.campos[k] = v;
    }
  }

  if (Array.isArray(bruto.episodios)) {
    for (const b of bruto.episodios) {
      if (!ehObjeto(b) || !EIXOS.some((e) => e.id === b.eixo)) continue;
      const ep = novoEpisodio(b.eixo, texto(b.id) || String(estado.episodios.length + 1));
      ep.origem = ORIGENS.some((o) => o.valor === b.origem) ? b.origem : '';
      for (const c of CAMPOS_EPISODIO) ep[c.id] = texto(b[c.id]);
      estado.episodios.push(ep);
    }
  }

  if (ehObjeto(bruto.cronometro)) {
    const ms = Number(bruto.cronometro.acumuladoMs);
    estado.cronometro.acumuladoMs = Number.isFinite(ms) && ms >= 0 ? ms : 0;
    // Um cronômetro importado nunca volta rodando: quem importa decide quando retomar.
  }
  return { ok: true, estado };
}

/** Milissegundos decorridos, contando o trecho em andamento. */
export function decorrido(cronometro, agora = Date.now()) {
  const extra = cronometro.iniciadoEm ? Math.max(0, agora - cronometro.iniciadoEm) : 0;
  return cronometro.acumuladoMs + extra;
}

/** "1:05:09" ou "35:00". */
export function formatarDuracao(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

/** Pausas formais do roteiro, em minutos. */
export const PAUSAS_MIN = [35, 60];

/** Pausas formais cruzadas entre `antesMs` e `depoisMs`. */
export function pausasCruzadas(antesMs, depoisMs) {
  return PAUSAS_MIN.filter((min) => antesMs < min * 60000 && depoisMs >= min * 60000);
}

/** Episódios de um eixo, na ordem de criação. */
export const doEixo = (estado, eixo) => estado.episodios.filter((e) => e.eixo === eixo);

/**
 * Texto da lista simplificada de tópicos (Anexo do roteiro).
 * Texto simples: sem tabela, sem negrito, sem símbolos. Sem nome, mantém "[nome]".
 */
export function textoTopicos(nome = '') {
  const quem = nome.trim() || '[nome]';
  return [
    `Olá, ${quem}. Antes da nossa conversa, aqui vai uma ideia dos assuntos de que vamos falar. Você não precisa preparar nada nem responder por escrito. Se algum assunto não fizer sentido para você, podemos pular.`,
    '',
    'Vamos conversar sobre:',
    'Primeiro, como você assiste a filmes e séries: onde, quando, com quem e em quais aparelhos.',
    'Segundo, como você escolhe o que assistir.',
    'Terceiro, o que você faz para começar a assistir e deixar tudo do jeito que você precisa.',
    'Quarto, como você controla o que está passando enquanto assiste.',
    'Quinto, o que acontece quando você troca de aparelho ou volta a algo que deixou pela metade.',
    'Sexto, situações em que você desistiu, pediu ajuda ou encontrou um jeito próprio de resolver.',
    'Por fim, o que você gostaria de contar ou sugerir, e como prefere que suas palavras sejam usadas na reportagem.',
    '',
    'Se você tiver exemplos de situações recentes, eles ajudam bastante, mas não são obrigatórios. Se precisar de pausas, de mais tempo, de intérprete ou de outro formato para a conversa, é só me avisar.',
  ].join('\n');
}

/**
 * Relatório em Markdown para leitura humana.
 * `rotulos` mapeia o nome de cada campo fixo ao rótulo visível e à seção
 * (`{ nome: { rotulo, secao } }`), lidos do próprio formulário pela página.
 * Campo vazio não entra; assim o relatório mostra só o que foi registrado.
 */
export function paraMarkdown(estado, rotulos = {}, agora = new Date()) {
  const linhas = ['# Registro de entrevista: acessibilidade em streaming de vídeo', ''];
  linhas.push(`Exportado em ${agora.toLocaleString('pt-BR')}. Dados sensíveis: guarde em local seguro e com acesso restrito à equipe de apuração.`, '');
  linhas.push(`Duração registrada no cronômetro: ${formatarDuracao(decorrido(estado.cronometro, agora.getTime()))}.`, '');

  const porSecao = new Map();
  for (const [nome, valor] of Object.entries(estado.campos)) {
    if (valor === '' || valor === false) continue;
    const r = rotulos[nome] || { rotulo: nome, secao: 'Outros campos' };
    if (!porSecao.has(r.secao)) porSecao.set(r.secao, []);
    porSecao.get(r.secao).push(valor === true ? `- ${r.rotulo}: sim` : `- ${r.rotulo}: ${String(valor).replace(/\n+/g, ' / ')}`);
  }
  for (const [secao, itens] of porSecao) linhas.push(`## ${secao}`, '', ...itens, '');

  linhas.push('## Episódios', '');
  if (!estado.episodios.length) linhas.push('Nenhum episódio registrado.', '');
  for (const eixo of EIXOS) {
    doEixo(estado, eixo.id).forEach((ep, i) => {
      linhas.push(`### Eixo ${eixo.id}, episódio ${i + 1}`, '');
      const origem = ORIGENS.find((o) => o.valor === ep.origem);
      linhas.push(`- Origem do impedimento: ${origem ? origem.rotulo : 'não registrada'}`);
      for (const c of CAMPOS_EPISODIO) {
        if (ep[c.id]) linhas.push(`- ${c.rotulo}: ${ep[c.id].replace(/\n+/g, ' / ')}`);
      }
      linhas.push('');
    });
  }
  return linhas.join('\n');
}
