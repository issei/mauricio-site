/**
 * Índice de prontidão agêntica por jornada (V8) — modelo puro, sem DOM.
 * Fonte: roteiro_de_estudo_e_metricas.md §4.2 (10 critérios × 0/1/2; faixas 0–9, 10–15, 16–20).
 */

/** Critérios na ordem em que aparecem na página; `id` é o `name` dos rádios. */
export const CRITERIOS = [
  { id: 'intencao', rotulo: 'Intenção priorizada com linha de base' },
  { id: 'processo', rotulo: 'Processo explícito com dono' },
  { id: 'apis', rotulo: 'APIs com contrato' },
  { id: 'identidade', rotulo: 'Identidade delegada' },
  { id: 'conteudo', rotulo: 'Conteúdo governado' },
  { id: 'busca', rotulo: 'Busca com permissões' },
  { id: 'componentes', rotulo: 'Componentes no catálogo' },
  { id: 'avaliacao', rotulo: 'Conjunto de avaliação' },
  { id: 'observabilidade', rotulo: 'Observabilidade e auditoria' },
  { id: 'governanca', rotulo: 'Aprovação de governança' },
];

export const FAIXAS = {
  fundacoes: 'Trabalhar fundações: a jornada está pouco pronta para IA',
  rag: 'Pronta para RAG e ferramentas de leitura',
  acoes: 'Candidata a ações com confirmação, se identidade, conteúdo e governança não estiverem em 0',
};

const IDS = new Set(CRITERIOS.map((c) => c.id));

/**
 * @param {Record<string, 0|1|2>} answers critério → 0 ausente, 1 parcial, 2 completo.
 *   Critério ausente do objeto conta 0. Critério desconhecido ou valor fora de {0,1,2} lança erro.
 * @returns {{ total: number, faixa: 'fundacoes'|'rag'|'acoes', lacunas: string[] }}
 */
export function score(answers = {}) {
  if (answers === null || typeof answers !== 'object' || Array.isArray(answers)) {
    throw new TypeError('answers deve ser um objeto critério → 0|1|2');
  }
  for (const [id, v] of Object.entries(answers)) {
    if (!IDS.has(id)) throw new RangeError(`critério desconhecido: ${id}`);
    if (v !== 0 && v !== 1 && v !== 2) throw new RangeError(`valor inválido para ${id}: ${String(v)}`);
  }
  let total = 0;
  const lacunas = [];
  for (const { id } of CRITERIOS) {
    const v = answers[id] ?? 0;
    total += v;
    if (v === 0) lacunas.push(id);
  }
  const faixa = total >= 16 ? 'acoes' : total >= 10 ? 'rag' : 'fundacoes';
  return { total, faixa, lacunas };
}
