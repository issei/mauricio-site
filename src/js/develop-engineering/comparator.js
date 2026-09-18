/**
 * Module: comparator.js
 * Pure logic module for baseline vs proposed comparison and ablactions.
 */

export const MISMATCH_CLASSES = Object.freeze({
  DEPENDENCY_HALLUCINATION: {
    id: 'DEPENDENCY_HALLUCINATION',
    label: 'Dependency Hallucination',
    description: 'Referência a pacote, módulo ou API inexistente.'
  },
  STALE_CONTEXT: {
    id: 'STALE_CONTEXT',
    label: 'Stale Context',
    description: 'Uso de contexto pertencente a commit, branch ou dependência anterior.'
  },
  SCOPE_VIOLATION: {
    id: 'SCOPE_VIOLATION',
    label: 'Scope Violation',
    description: 'Alteração fora do escopo permitido de arquivos ou diretórios.'
  },
  ARCHITECTURAL_VIOLATION: {
    id: 'ARCHITECTURAL_VIOLATION',
    label: 'Architectural Violation',
    description: 'Chamada ou acoplamento proibido pela arquitetura modelada.'
  },
  REPOSITORY_STATE_MISMATCH: {
    id: 'REPOSITORY_STATE_MISMATCH',
    label: 'Repository-State Mismatch',
    description: 'Premissa do agente divergente do snapshot observável.'
  }
});

/**
 * Calculates controlled vs unmitigated mismatch risk based on active mechanisms.
 * @param {object} mechanisms - { grounding: boolean, gateway: boolean, validation: boolean }
 * @returns {{ controlled: Array<string>, unmitigated: Array<string> }}
 */
export function evaluateComparatorAblation(mechanisms = {}) {
  const { grounding = false, gateway = false, validation = false } = mechanisms;

  const controlled = [];
  const unmitigated = [];

  // STALE_CONTEXT & REPOSITORY_STATE_MISMATCH require Grounding
  if (grounding) {
    controlled.push('STALE_CONTEXT', 'REPOSITORY_STATE_MISMATCH');
  } else {
    unmitigated.push('STALE_CONTEXT', 'REPOSITORY_STATE_MISMATCH');
  }

  // SCOPE_VIOLATION & DEPENDENCY_HALLUCINATION require Action Gateway
  if (gateway) {
    controlled.push('SCOPE_VIOLATION', 'DEPENDENCY_HALLUCINATION');
  } else {
    unmitigated.push('SCOPE_VIOLATION', 'DEPENDENCY_HALLUCINATION');
  }

  // ARCHITECTURAL_VIOLATION requires Validation & Oracles (and Grounding)
  if (validation && grounding) {
    controlled.push('ARCHITECTURAL_VIOLATION');
  } else {
    unmitigated.push('ARCHITECTURAL_VIOLATION');
  }

  return { controlled, unmitigated };
}
