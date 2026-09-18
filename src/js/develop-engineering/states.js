/**
 * Module: states.js
 * Pure logic module for Agent–Repository Gap states and claims validation.
 */

export const GAP_STATES = Object.freeze({
  CURRENT: {
    id: 'CURRENT',
    label: 'Current State (S_t)',
    authority: 'Repositório / Runtime (o que é observado agora)',
    allows: [
      'Afirmar o commit SHA, a árvore de arquivos, o lockfile e dependências instaladas no snapshot.',
      'Verificar o estado das alterações não commitadas e o build atual.'
    ],
    prohibits: [
      'Afirmar intenções humanas ou requisitos futuros.',
      'Garantir que a arquitetura ideal esteja sendo respeitada sem verificação externa.'
    ]
  },
  DESIRED: {
    id: 'DESIRED',
    label: 'Desired State (D)',
    authority: 'Especificação / Requisitos (o que deveria ser verdadeiro)',
    allows: [
      'Definir propriedades, contratos, critérios de aceitação e invariantes esperadas.',
      'Definir o comportamento e restrições autorizadas para a mudança.'
    ],
    prohibits: [
      'Garantir que o código atual reflete estes requisitos sem ter sido testado.',
      'Substituir a autoridade do que realmente foi observado no repositório.'
    ]
  },
  HISTORICAL: {
    id: 'HISTORICAL',
    label: 'Historical State',
    authority: 'Memória / Commits Anteriores / RAG (o que foi observado antes)',
    allows: [
      'Fornecer contexto histórico, evolução de decisões e padrões de código antigos.',
      'Orientar a recuperação de soluções semelhantes aplicadas anteriormente.'
    ],
    prohibits: [
      'Servir como autoridade para o commit corrente se o repositório avançou.',
      'Garantir que uma dependência histórica ainda existe no lockfile atual.'
    ]
  },
  POLICY: {
    id: 'POLICY',
    label: 'Policy State',
    authority: 'Governança / Action Gateway (o que é permitido fazer)',
    allows: [
      'Determinar o escopo autorizado de arquivos, diretórios e ferramentas.',
      'Bloquear execuções fora da allowlist antes da aplicação de efeitos.'
    ],
    prohibits: [
      'Validar se a mudança produz o comportamento funcional correto.',
      'Conceder autoridade irrestrita baseada apenas em confiança na intenção.'
    ]
  },
  EVIDENCE: {
    id: 'EVIDENCE',
    label: 'Evidence State',
    authority: 'Oráculos / Validação (o que foi demonstrado no envelope)',
    allows: [
      'Provar que uma propriedade específica passou sob um oracle, subject e configuração identificados.',
      'Registrar veredictos explícitos (PASS, FAIL, UNKNOWN, CONFLICT).'
    ],
    prohibits: [
      'Garantir a correção global do software além do escopo do oracle executado.',
      'Tratar skip, timeout ou ausência de teste como aprovação funcional.'
    ]
  }
});

/**
 * Given a selected state ID, returns its claims and limits, and how other states relate to it.
 * @param {string} stateId
 * @returns {object}
 */
export function getGapStateClaims(stateId) {
  if (!stateId || typeof stateId !== 'string') {
    throw new Error(`Invalid stateId: ${stateId}`);
  }
  const key = stateId.trim().toUpperCase();
  const state = GAP_STATES[key];
  if (!state) {
    throw new Error(`Unknown gap state: "${stateId}"`);
  }
  return { ...state };
}

/**
 * Calculates Agent-Repository Gap G_t given premise set and verified predicates count.
 * @param {number} premisesCount
 * @param {number} verifiedPredicatesCount
 * @returns {{ gapValue: number, isAligned: boolean }}
 */
export function calculateGap(premisesCount, verifiedPredicatesCount) {
  const p = Math.max(0, Number(premisesCount) || 0);
  const v = Math.max(0, Number(verifiedPredicatesCount) || 0);
  const gapValue = p - v;
  return {
    gapValue,
    isAligned: gapValue === 0
  };
}
