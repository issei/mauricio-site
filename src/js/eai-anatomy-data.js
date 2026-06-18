/*
 * Dados da Anatomia do repositório (T6) — LÓGICA PURA, sem DOM.
 * Árvore do "projeto-to-be": cada nó tem name, type, (icon), desc e opcional children.
 */

export const REPO_TREE = {
  name: 'projeto-to-be/',
  type: 'root',
  desc: 'A estrutura de um repositório agent-driven: contexto e gates primeiro, código depois. Cada pasta tem um papel na confiabilidade do sistema.',
  children: [
    {
      name: '.ai/',
      type: 'dir',
      icon: '🧠',
      desc: 'Estado cognitivo do agente. Tudo aqui entra no Git — assim um rollback restaura código e raciocínio ao mesmo tempo.',
      children: [
        { name: 'PROGRESS.md', type: 'file', icon: '📋', desc: 'Onde o trabalho parou, quais tarefas foram concluídas, qual é o próximo passo. O agente lê isso ao iniciar uma sessão — sem ele, recomeça do zero.' },
        { name: 'skills/', type: 'dir', icon: '⚡', desc: 'Capacidades específicas do agente para este projeto: como rodar o quality gate, como criar um ADR, como escrever um cenário BDD.' },
        { name: 'settings.json', type: 'file', icon: '⚙️', desc: 'Permissões e limites do agente: quais comandos pode executar, quais diretórios pode modificar, qual é o teto de iterações por sessão.' },
      ],
    },
    {
      name: 'docs/',
      type: 'dir',
      icon: '📚',
      desc: 'A biblioteca de contexto. O agente consulta aqui para entender o projeto antes de implementar qualquer coisa.',
      children: [
        { name: 'decisions/', type: 'dir', icon: '📖', desc: 'ADRs (Architecture Decision Records): a memória imutável do projeto. Por que usamos esta linguagem? Por que este banco? As respostas estão aqui — e o agente não desfaz decisões deliberadas.' },
        { name: 'specs/', type: 'dir', icon: '📐', desc: 'SDDs (Software Design Documents): o que o sistema é, o que ele faz e — tão importante — o que está fora de escopo. O agente consulta antes de implementar para não "inventar" funcionalidades.' },
        { name: 'governance/', type: 'dir', icon: '🏛️', desc: 'DoR e DoD: as barreiras de qualidade. Uma tarefa só entra em execução quando passa pela DoR. Só sai quando passa pela DoD. O agente não adivinha — encontra a resposta aqui.' },
      ],
    },
    {
      name: 'tests/',
      type: 'dir',
      icon: '🧪',
      desc: 'A defesa número 1 contra alucinações. O agente implementa até todos os cenários passarem — e nada entra na base principal sem passar por aqui.',
      children: [
        { name: 'features/', type: 'dir', icon: '📝', desc: 'Cenários BDD em Gherkin: Dado / Quando / Então. São a especificação executável — o que o sistema deve fazer, escrito antes do código.' },
        { name: 'steps/', type: 'dir', icon: '🔗', desc: 'Ligação entre o Gherkin e o código de verificação. Cada frase do cenário mapeia para uma função de teste.' },
        { name: 'fixtures/', type: 'dir', icon: '📦', desc: 'Respostas de serviços externos gravadas uma vez e reutilizadas. Os testes rodam sem rede, de forma rápida e determinística — zero custo de API.' },
      ],
    },
    {
      name: 'scripts/',
      type: 'dir',
      icon: '⚙️',
      desc: 'Os portões automáticos de qualidade. O que importa precisa estar num gate — não depender de alguém lembrar de fazer.',
      children: [
        { name: 'quality-gate.sh', type: 'file', icon: '🚦', desc: 'Um comando só: roda linter, verificação de tipos e todos os testes. O agente roda isso antes de qualquer commit. Se falhar, para — não avança com suposições.' },
        { name: 'bootstrap.sh', type: 'file', icon: '🚀', desc: 'Monta o ambiente do zero num novo computador. O agente usa para verificar que o ambiente está correto antes de executar.' },
      ],
    },
    {
      name: '.github/',
      type: 'dir',
      icon: '🔄',
      desc: 'Automação no servidor: os mesmos testes do quality-gate rodam a cada pull request. Nada entra na base principal sem passar por aqui — nem código do agente, nem código do humano.',
      children: [
        { name: 'workflows/', type: 'dir', icon: '⚡', desc: 'CI/CD: os fluxos que rodam a cada mudança. Inclui limite de iterações e orçamento — autonomia sem teto de custo é risco financeiro, não funcionalidade.' },
      ],
    },
  ],
};

/** Percorre a árvore (pré-ordem) chamando fn(node, depth, parent). */
export function walk(node, fn, depth = 0, parent = null) {
  fn(node, depth, parent);
  if (node.children) for (const c of node.children) walk(c, fn, depth + 1, node);
}

/** Lista achatada de todos os nós (inclui a raiz). */
export function flatten(root = REPO_TREE) {
  const out = [];
  walk(root, (n) => out.push(n));
  return out;
}
