/*
 * Cinco Pilares — LÓGICA PURA, sem DOM (segue o padrão de eai-sim-model.js).
 * Fonte da verdade do Calibrador de Autonomia (Pilar 1) e do modelo de
 * maturidade em 4 estágios (Pilar 4). Espelhado em tests/fixtures/pilares-model.json.
 *
 * Base conceitual: docs/specs/.../cinco-pilares-engenharia-agentica.md (seções 1 e 4).
 */

/** Quadrantes da matriz custo-do-erro × reversibilidade (Pilar 1). */
export const QUADRANTS = {
  exploracao: {
    label: 'Exploração / Baixo risco',
    ceremony: 'Cerimônia mínima',
    recommendation:
      'Vibe coding, agentes livres e prompts abertos têm vantagem real aqui — a cerimônia arquitetural seria puro atrito. Mantenha o artefato descartável e com fronteira de descarte explícita.',
  },
  'reversivel-caro': {
    label: 'Caro, porém reversível',
    ceremony: 'Cerimônia média',
    recommendation:
      'O erro custa, mas um git reset ainda salva. Adicione contratos de saída e testes de regressão; o DAG completo é opcional enquanto a reversão for barata.',
  },
  'irreversivel-barato': {
    label: 'Barato, porém irreversível',
    ceremony: 'Cerimônia média-alta',
    recommendation:
      'O erro é pequeno, mas não dá para desfazer. Exija idempotência, confirmação explícita e trilha de auditoria antes de qualquer efeito colateral permanente.',
  },
  'missao-critica': {
    label: 'Missão crítica',
    ceremony: 'Cerimônia máxima',
    recommendation:
      'DAG determinístico, contratos rígidos, ledgers, revisão humana e capacidade de reversão deixam de ser opcionais. A autonomia do modelo é mínima no caminho crítico.',
  },
};

/** Limiar (0–100) que separa "baixo" de "alto" em cada eixo. */
export const AXIS_THRESHOLD = 50;

function clamp100(n) {
  return Math.max(0, Math.min(100, Number(n) || 0));
}

/**
 * Calibrador de Autonomia (Pilar 1) — função pura.
 * @param {{cost:number, reversibility:number, dependedInProd?:boolean}} inputs
 *   cost          0 (cosmético) → 100 (catastrófico)
 *   reversibility 0 (instantânea) → 100 (irreversível)
 *   dependedInProd alguém já depende deste artefato como se fosse produção?
 * @returns {{quadrant, label, ceremony, recommendation, modeLeak, cost, reversibility}}
 */
export function classifyAutonomy({ cost, reversibility, dependedInProd = false } = {}) {
  const c = clamp100(cost);
  const r = clamp100(reversibility);
  const highCost = c >= AXIS_THRESHOLD;
  const highIrrev = r >= AXIS_THRESHOLD;

  let quadrant;
  if (!highCost && !highIrrev) quadrant = 'exploracao';
  else if (highCost && !highIrrev) quadrant = 'reversivel-caro';
  else if (!highCost && highIrrev) quadrant = 'irreversivel-barato';
  else quadrant = 'missao-critica';

  const meta = QUADRANTS[quadrant];
  // Vazamento de modo: configuração de exploração (leve) que já é dependida como produção.
  const modeLeak = !!dependedInProd && quadrant === 'exploracao';

  return {
    quadrant,
    label: meta.label,
    ceremony: meta.ceremony,
    recommendation: meta.recommendation,
    modeLeak,
    cost: c,
    reversibility: r,
  };
}

/** Texto do alerta de vazamento de modo (Pilar 1 + regra de transição do Pilar 5). */
export const MODE_LEAK_TEXT =
  'Vazamento de modo detectado: você configurou cerimônia de exploração, mas marcou que alguém já depende disto como produção. A promoção obriga o upgrade de garantias — contratos, cobertura de testes e idempotência. A leveza só é legítima enquanto o artefato permanece no polo de origem.';

/**
 * Modelo de maturidade — 4 estágios (Pilar 4). A garantia migra do modelo
 * para a arquitetura. Cada estágio: o que já existe, o que falta, próximo passo.
 */
export const MATURITY = [
  {
    id: 0,
    name: 'Mágica de Prompt',
    tagline: 'A garantia mora no prompt',
    has: 'Um prompt único decide tudo; a saída é o token mais provável dado o contexto. Funciona na demo.',
    missing:
      'Não há fronteira entre raciocínio e efeito. Nenhuma validação de saída, e o comportamento é irreprodutível.',
    next: 'Introduza validação de saída e parsing estruturado: rejeite tudo que não casar com um schema.',
  },
  {
    id: 1,
    name: 'Restringido',
    tagline: 'A saída inválida é barrada',
    has: 'Validação de saída, parsing estruturado e contratos de schema. Saídas malformadas são recusadas na fronteira.',
    missing:
      'O modelo ainda decide todo o fluxo; a topologia não é fixa nem auditável de ponta a ponta.',
    next: 'Transforme o fluxo num DAG determinístico — o LLM é chamado em nós específicos, com entrada e saída contratadas.',
  },
  {
    id: 2,
    name: 'Orquestrado',
    tagline: 'O fluxo vira um DAG fixo',
    has: 'Fluxo é um DAG determinístico; o LLM é invocado em nós contratados. A topologia é fixa e auditável.',
    missing:
      'Faltam rastreabilidade fim a fim, autorização nas fronteiras e capacidade de reversão.',
    next: 'Acrescente Ledgers (auditoria), autorização nas fronteiras (MCP), separação Cérebro/Vitrine e reversão.',
  },
  {
    id: 3,
    name: 'Governado',
    tagline: 'A garantia mora na arquitetura',
    has: 'Ledgers, autorização nas fronteiras (MCP), separação Cérebro/Vitrine e reversão. A intenção é imposta, registrada e verificável.',
    missing:
      'Nada estrutural — o desafio agora é manter a disciplina e calibrar o rigor ao risco real de cada tarefa.',
    next: 'Use o Espectro de Autonomia (Pilar 1) para evitar sobre-engenharia: nem toda tarefa exige o Estágio 3.',
  },
];

/** Retorna o estágio de maturidade pelo id (0–3) ou null. */
export function maturityStage(id) {
  return MATURITY.find((s) => s.id === Number(id)) || null;
}
