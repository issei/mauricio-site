/**
 * Module: states.js
 * Pure logic module for Agent–Repository Gap states and claims validation.
 */

export const GAP_STATES = Object.freeze({
  CURRENT: {
    id: 'CURRENT',
    label: 'Current State',
    authority: 'O repositório e o ambiente de execução, do jeito que estão agora',
    allows: [
      'Dizer qual é o commit atual, quais arquivos existem e quais dependências estão instaladas.',
      'Dizer quais arquivos mudaram desde o último commit.'
    ],
    prohibits: [
      'Dizer o que o time pretende fazer ou o que os requisitos vão exigir no futuro.',
      'Garantir que a arquitetura desejada está sendo seguida. Isso precisa de verificação à parte.'
    ]
  },
  DESIRED: {
    id: 'DESIRED',
    label: 'Desired State',
    authority: 'A especificação e os requisitos (o que deveria ser verdade)',
    allows: [
      'Definir o que a mudança precisa fazer: contratos, critérios de aceitação e regras que nunca podem ser quebradas.',
      'Definir os limites autorizados para a mudança.'
    ],
    prohibits: [
      'Afirmar que o código de hoje já cumpre esses requisitos sem que alguém tenha testado.',
      'Se sobrepor ao que foi realmente observado no repositório.'
    ]
  },
  HISTORICAL: {
    id: 'HISTORICAL',
    label: 'Historical State',
    authority: 'Memória, commits anteriores e contexto recuperado (o que já foi visto antes)',
    allows: [
      'Dar contexto: como decisões passadas foram tomadas e como problemas parecidos foram resolvidos.',
      'Ajudar a encontrar soluções semelhantes já aplicadas no projeto.'
    ],
    prohibits: [
      'Valer como verdade sobre o commit atual se o repositório já andou desde então.',
      'Garantir que uma dependência usada antes ainda está no projeto hoje.'
    ]
  },
  POLICY: {
    id: 'POLICY',
    label: 'Policy State',
    authority: 'As regras de governança e o Action Gateway (o que é permitido fazer)',
    allows: [
      'Definir quais arquivos, pastas e ferramentas o agente pode tocar.',
      'Bloquear qualquer ação fora da lista de permitidos antes de ela ter efeito.'
    ],
    prohibits: [
      'Dizer se a mudança funciona corretamente. Permissão não é validação.',
      'Dar autoridade irrestrita só porque a intenção parece boa.'
    ]
  },
  EVIDENCE: {
    id: 'EVIDENCE',
    label: 'Evidence State',
    authority: 'Testes e verificações (o que foi comprovado, e sob quais condições)',
    allows: [
      'Provar que uma propriedade específica passou, indicando qual verificação (oráculo) rodou, sobre o quê e com qual configuração.',
      'Registrar o resultado com um veredicto claro: PASS, FAIL, UNKNOWN ou CONFLICT.'
    ],
    prohibits: [
      'Garantir que o software inteiro está correto, além do que aquela verificação cobre.',
      'Tratar teste pulado, timeout ou ausência de teste como aprovação.'
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
