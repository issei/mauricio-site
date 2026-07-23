/**
 * SSOT do conteúdo bi-persona da página v3.0.
 * ---------------------------------------------------------------------------
 * Cada par é a MESMA verdade em dois vocabulários — não duas afirmações
 * diferentes. É isso que faz a dissolução em 160ms parecer transmutação e não
 * uma piscada desconexa (spec §2.B.2).
 *
 * INV-AP-01 — todo par deve satisfazer, e é verificado em node:test:
 *   1. mesmo número de sentenças;
 *   2. diferença de no máximo 2 palavras;
 *   3. mesma pontuação final;
 *   4. os MESMOS numerais, como multiconjunto.
 *
 * A regra 4 é a mais importante: se a métrica muda entre as visões, não é a
 * mesma verdade contada de dois jeitos — é outra afirmação, e a transição vira
 * mentira visual.
 *
 * Módulo puro: sem DOM, sem imports. Consumido pelo HTML (que já traz ambas as
 * versões renderizadas) e pelos testes.
 */

/** @typedef {{id:string, zone:string, layer:1|2|3, exec:string, eng:string}} Pair */

/** @type {Pair[]} */
export const PERSPECTIVE_CONTENT = [
  // ── Hero ────────────────────────────────────────────────────────────────
  {
    id: 'hero-lede',
    zone: 'hero',
    layer: 1,
    exec: 'Governança, engenharia de sistemas e agentes inteligentes desenhados para transformar risco técnico em vantagem competitiva mensurável.',
    eng: 'Contratos, topologia de agentes e esteiras determinísticas construídos para transformar saída probabilística em comportamento verificável em produção.',
  },

  // ── Dimensões do Seletor (tabela comparativa da spec §2.B) ──────────────
  {
    id: 'dim-foco',
    zone: 'seletor',
    layer: 1,
    exec: 'Risco, governança, custo total de propriedade e escalabilidade.',
    eng: 'Ontologias, GraphRAG, spec-driven development e DevOps Salesforce.',
  },
  {
    id: 'dim-linguagem',
    zone: 'seletor',
    layer: 1,
    exec: 'Curvas de eficiência e mapas de maturidade.',
    eng: 'Diagramas de componentes e topologia de agentes.',
  },
  {
    id: 'dim-metrica',
    zone: 'seletor',
    layer: 1,
    exec: 'Retorno sobre investimento e conformidade regulatória.',
    eng: 'Cobertura de especificação, latência e estabilidade.',
  },

  // ── Zona 1 · GraphRAG & Ontologias ──────────────────────────────────────
  {
    id: 'graphrag-superficie',
    zone: 'graphrag',
    layer: 1,
    exec: 'Sua IA responde com a memória da empresa, não com o que ela imagina.',
    eng: 'O agente recupera do grafo de conhecimento, não do que o modelo memorizou.',
  },
  {
    id: 'graphrag-mecanismo',
    zone: 'graphrag',
    layer: 2,
    exec: 'Cada resposta aponta para a fonte que a originou, com trilha de auditoria.',
    eng: 'Cada resposta carrega os nós percorridos no grafo, com trilha de proveniência.',
  },
  {
    id: 'graphrag-reflexao',
    zone: 'graphrag',
    layer: 3,
    exec: 'Sua organização sabe explicar, para um auditor ou regulador, por que uma resposta de IA foi gerada?',
    eng: 'Seu pipeline registra, para cada resposta de agente, a proveniência de todos os nós consultados?',
  },

  // ── Zona 2 · Spec-Driven Development ────────────────────────────────────
  {
    id: 'sdd-superficie',
    zone: 'sdd',
    layer: 1,
    exec: 'A especificação vira contrato: o que foi aprovado é exatamente o que entra em produção.',
    eng: 'A spec vira alvo executável: o que foi versionado é exatamente o que o agente implementa.',
  },
  {
    id: 'sdd-mecanismo',
    zone: 'sdd',
    layer: 2,
    exec: 'O que muda no negócio muda antes no documento, depois no sistema.',
    eng: 'O que muda no comportamento muda antes na spec, depois no código.',
  },
  {
    id: 'sdd-reflexao',
    zone: 'sdd',
    layer: 3,
    exec: 'Quanto do que sua área aprovou em reunião chegou ao código sem perder intenção?',
    eng: 'Quanto do que sua spec definiu chegou ao merge sem perder critério de aceite?',
  },

  // ── Zona 3 · Salesforce DevOps & Governança ─────────────────────────────
  {
    id: 'devops-superficie',
    zone: 'devops',
    layer: 1,
    exec: 'Cada mudança no Salesforce chega à produção por um caminho previsível e reversível.',
    eng: 'Cada commit no Salesforce chega à produção por uma esteira validada e reversível.',
  },
  {
    id: 'devops-mecanismo',
    zone: 'devops',
    layer: 2,
    exec: 'Nenhuma entrega passa sem checagem de qualidade e registro de aprovação.',
    eng: 'Nenhum merge passa sem cobertura de teste e política de branch aplicada.',
  },
  {
    id: 'devops-reflexao',
    zone: 'devops',
    layer: 3,
    exec: 'Se o próximo deploy falhar hoje, sua operação sabe em quanto tempo volta ao normal?',
    eng: 'Se o próximo deploy falhar hoje, sua esteira sabe em qual commit reverter sozinha?',
  },

  // ── Prova de Governança ─────────────────────────────────────────────────
  {
    id: 'gov-determinismo',
    zone: 'governanca',
    layer: 1,
    exec: 'Determinismo antes de inteligência: o modelo entra somente onde regras não bastam.',
    eng: 'Determinístico-primeiro: o modelo atua somente no resíduo que regras não resolvem.',
  },
];

/** Índice por id, para consulta direta. */
export const BY_ID = Object.fromEntries(PERSPECTIVE_CONTENT.map((p) => [p.id, p]));

/** As duas personas. A ordem importa: a primeira é o estado inicial (spec §2.B.3). */
export const PERSONAS = /** @type {const} */ (['exec', 'eng']);
