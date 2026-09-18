# Deterministic Grounding para Engenharia Agentic de Software

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/develop-engineering>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-09-18 · Atualizado: 2026-09-18.

## Em síntese

Um agente de desenvolvimento pode produzir código sintaticamente correto, passar em testes isolados e ainda violar a arquitetura, o escopo autorizado ou o estado real do repositório. **Deterministic Grounding** estabelece o ancoramento explícito de estado, limitação de autoridade por Action Gateway e validação com oráculos auditáveis.

- **Agent–Repository Gap (G_t)** — a diferença entre o que o agente acredita (A_t) e o que foi observado no repositório (S_t).
- **Snapshot Capsule** — envelope imutável que sela commit, árvore, lockfile e ambiente antes da ação.
- **Action Gateway** — barreira de 12 passos que impede execução fora do escopo (Diff Lens e allowlist).
- **Evidence Record** — registro com veredictos delimitados (PASS, FAIL, UNKNOWN, CONFLICT) e fronteiras de observação.

## O problema e o gap

Código correto em isolamento ainda pode ser uma mudança errada no repositório. O Agent-Repository Gap mede o desalinhamento entre o contexto do agente e o estado observável do sistema.

## A solução e os oráculos

Snapshot Capsule para ancorar o estado, Action Gateway para limitar autoridade, e oráculos auditáveis para gerar Evidence Records com veredictos explícitos.

## Perguntas frequentes

**O que é o Agent–Repository Gap?**

É a diferença entre as premissas que orientam a ação do agente no contexto A_t e os predicados verificáveis sobre o estado observável S_t no repositório.

**Por que um resultado de teste verde (PASS) não garante correção global?**

Porque um oracle testa apenas uma propriedade específica sob um envelope de execução restrito. Ele não observa colaterais fora do seu escopo, vazamentos de privacidade ou violações arquiteturais não mapeadas no teste.

**O que é a Snapshot Capsule?**

É o envelope imutável contendo commit SHA, branch, tree digest, lockfile, toolchain, ambiente de execução e um digest único que garante que o contexto do agente corresponde exatamente ao estado do repositório.

**Qual a diferença entre Autonomia e Autoridade?**

Autonomia é a capacidade do modelo de planejar e encadear ações de forma flexível; Autoridade é a permissão efetiva para produzir efeitos no repositório, que deve ser restrita e mediada pelo Action Gateway.

## Glossário

- **Agent–Repository Gap** — Desalinhamento entre o contexto/memória do agente e o estado observável do repositório.
- **Snapshot Capsule** — Envelope de proveniência que sela a identidade do repositório antes de qualquer ação.
- **Action Gateway** — Componente que medeia propostas não confiáveis do agente e aplica allowlist, least privilege e policy-as-code.
- **Evidence Record** — Atestado imutável de validação contendo subject, oracle, validator, envelope e limitações explícitas.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
