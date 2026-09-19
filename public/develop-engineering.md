# Deterministic Grounding para Engenharia Agentic de Software

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/develop-engineering>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-09-18 · Atualizado: 2026-09-18.

## Em síntese

Um agente de desenvolvimento pode produzir código sintaticamente correto, passar em testes isolados e ainda violar a arquitetura, o escopo autorizado ou o estado real do repositório. **Deterministic Grounding** é o nome provisório que este artigo propõe (não é terminologia padronizada) para uma prática em três partes: ancorar o estado de forma explícita, limitar a autoridade por meio de um Action Gateway e validar com oráculos auditáveis.

- **Agent–Repository Gap** — a diferença entre o que o agente acredita saber do repositório e o que realmente está lá agora.
- **Snapshot Capsule** (proposta) — envelope imutável que sela commit, árvore, lockfile e ambiente antes da ação.
- **Action Gateway** (proposta) — componente que medeia as ações do agente por allowlist, Diff Lens e policy-as-code e pode bloquear as que saem do escopo definido; sua cobertura e eficácia precisam ser demonstradas.
- **Evidence Record** — registro com veredictos delimitados (PASS, FAIL, UNKNOWN, CONFLICT) e fronteiras de observação.

## O problema e o gap

Código correto em isolamento ainda pode ser uma mudança errada no repositório. O Agent-Repository Gap mede o desalinhamento entre o contexto do agente e o estado observável do sistema.

## A solução e os oráculos

Snapshot Capsule para ancorar o estado, Action Gateway para limitar autoridade, e oráculos auditáveis para gerar Evidence Records com veredictos explícitos.

## Limitações

Snapshot Capsule, Action Gateway (12 passos e Diff Lens) e Evidence Record são propostas deste artigo, ainda sem medição de eficácia. "Deterministic Grounding" é um nome provisório, não terminologia padronizada. Um Action Gateway só bloqueia o que suas regras e permissões cobrem, e o digest de uma cápsula só prova a identidade dos artefatos incluídos. O artigo ainda não cita fontes primárias.

## Perguntas frequentes

**O que é o Agent–Repository Gap?**

É a diferença entre o que o agente acredita saber do repositório (memória, contexto recuperado, plano) e o que pode ser verificado nele agora (commit atual, dependências, regras vigentes). Quanto maior a diferença, maior o risco de uma mudança que parece certa e não é.

**Por que um resultado de teste verde (PASS) não garante correção global?**

Porque um oráculo (uma verificação automática) testa apenas uma propriedade específica sob um envelope de execução restrito. Ele não observa colaterais fora do seu escopo, vazamentos de privacidade ou violações arquiteturais não mapeadas no teste.

**O que é a Snapshot Capsule?**

É o envelope imutável proposto neste artigo, contendo commit SHA, branch, tree digest, lockfile, toolchain, ambiente de execução e um digest único. O digest permite verificar a identidade do conjunto de artefatos incluídos na cápsula. Isso não prova que o envelope contém toda a realidade relevante, nem que a interpretação do agente esteja correta.

**Qual a diferença entre Autonomia e Autoridade?**

Autonomia é a capacidade do modelo de planejar e encadear ações de forma flexível; Autoridade é a permissão efetiva para produzir efeitos no repositório, que deve ser restrita e mediada pelo Action Gateway.

**O que acontece quando as fontes de verdade discordam?**

O modelo não resolve o conflito em silêncio. O sistema registra o veredito CONFLICT, preserva a proveniência de cada fonte, verifica escopo e frescor de cada uma e envia para revisão humana os conflitos de intenção, de segurança ou de alto impacto.

**O que significa "determinístico" neste artigo?**

Significa que a mesma entrada, com a mesma versão do validador, a mesma configuração, as mesmas dependências e o mesmo ambiente controlado, produz o mesmo resultado de verificação. Isso vale para a parte verificável do processo; o processo inteiro ainda combina fatos observados, inferências aproximadas, decisões probabilísticas do modelo e estados desconhecidos.

## Glossário

- **Agent–Repository Gap** — Desalinhamento entre o contexto/memória do agente e o estado observável do repositório.
- **Snapshot Capsule** — Envelope de proveniência que sela a identidade do repositório antes de qualquer ação.
- **Action Gateway** — Componente que medeia propostas não confiáveis do agente e aplica allowlist, least privilege e policy-as-code.
- **Evidence Record** — Atestado imutável de validação contendo propriedade verificada, tipo e versão do oráculo, escopo, ambiente, resultado, proveniência e limitações explícitas.
- **Determinismo (operacional)** — Mesma entrada, mesma versão do validador, mesma configuração, mesmas dependências e mesmo ambiente controlado produzem o mesmo resultado de verificação.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
