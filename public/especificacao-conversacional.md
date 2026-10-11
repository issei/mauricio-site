# Especificação Conversacional Estruturada | Maurício Issei

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/especificacao-conversacional>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-10-10 · Atualizado: 2026-10-10.

## Em síntese

A Especificação Conversacional Estruturada é uma **proposta de workflow** em que a IA ajuda a elicitar e registrar requisitos: faz perguntas, compara interpretações e sugere exemplos. Quem decide são **pessoas com autoridade**. Cada afirmação tem origem e status, e as divergências entre documentação, testes e código seguem uma política explícita. A eficácia do workflow completo ainda não foi avaliada.

- **A IA propõe; pessoas decidem** — a matriz de autoridade separa quem decide de quem apoia; o modelo não tem autoridade substantiva por padrão.
- **Cinco práticas** — registrar a origem, separar fato de hipótese, manter as pendências visíveis, usar exemplos e contraexemplos e revisar na proporção do risco.
- **Divergência governada** — documentação, testes e código tendem a divergir; a política define quem resolve, como e onde a decisão fica registrada.
- **Complementa o TDD, não o substitui** — a especificação decide o que verificar; o TDD verifica. O oráculo (o resultado esperado) vem de pessoas.

## Postura: proposta, não método validado

O workflow completo ainda não foi comparado a uma linha de base, e não foi localizado estudo controlado ou longitudinal sobre ele. Os componentes têm evidência parcial, em tarefas isoladas.

As normas e os guias (ISO/IEC/IEEE 29148, SWEBOK, NIST AI RMF e NIST AI 600-1) fundamentam o desenho, mas não o validam. A proposta é compatível com as atividades descritas na 29148 e no SWEBOK e se inspira na função Govern do NIST AI RMF, sem reivindicar conformidade.

## As cinco práticas do protocolo

1. **Registrar a origem de cada afirmação:** entrevista, documento, inspeção de código, observação operacional, inferência ou decisão formal.
2. **Separar fatos, hipóteses e propostas.**
3. **Manter as pendências visíveis**, cada uma com um responsável.
4. **Usar exemplos e contraexemplos.** O modelo sugere casos, mas não os promove a regra aprovada.
5. **Revisar na proporção do risco.**

## Política de divergência

Não há fonte universal de verdade. Quando dois artefatos entram em conflito:

1. Identificar os artefatos e o comportamento divergente.
2. Classificar a causa provável: informação incompleta, defeito, mudança de regra, obsolescência ou erro de implementação.
3. Identificar quem tem autoridade para decidir.
4. Registrar a decisão, a justificativa, o impacto e os artefatos afetados.
5. Atualizar os artefatos e verificar de novo.

O objetivo não é impedir toda divergência, mas torná-la detectável, explicável e tratável.

## Kit de artefatos

Matriz de autoridade, modelo de registro de afirmação, registro de divergência com estados e roteamento, checklist de drift e protocolo de avaliação resumido, em Markdown: https://mauricio.issei.com.br/downloads/kit-especificacao-conversacional.md

## Perguntas frequentes

**O que é Especificação Conversacional Estruturada?**

É um workflow humano–IA, governado por artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a intenção de um sistema como requisitos e critérios verificáveis. Fontes, incertezas, decisões e forma de verificação ficam explícitas. É uma proposta em avaliação, não um método validado nem uma norma.

**Qual é a diferença entre esta proposta, o Vibe Spec-ing e o Spec-Driven Development?**

Vibe Spec-ing foi o nome anterior deste enquadramento. Mudou porque "vibe" sugere o contrário do que a proposta exige: registro, autoridade e verificação. Spec-Driven Development é um rótulo ainda instável para práticas em que a especificação vem antes do código (spec-first, spec-anchored, spec-as-source). A Especificação Conversacional Estruturada é um workflow específico dentro desse espaço, com autoridade humana e política de divergência explícitas.

**A IA pode aprovar requisitos ou regras de negócio?**

Não, por padrão. O modelo pode perguntar, resumir, propor cenários, apontar contradições e preparar mudanças, mas não recebe autoridade para decidir valor, risco, conformidade, aceitação ou verdade de domínio. A matriz de autoridade atribui cada decisão a pessoas designadas. É uma política de governança proposta, a ser ajustada a cada organização.

**Isso substitui o TDD ou os testes de aceitação?**

Não. Eles atuam em níveis diferentes: a especificação define qual problema resolver, para quem e com quais critérios; o TDD verifica o próximo incremento de código. O TDD torna o feedback barato, mas não torna o oráculo correto. Quando o mesmo modelo escreve a especificação e os testes, um teste verde pode apenas confirmar o erro do próprio modelo. Por isso, o resultado esperado é definido ou validado por pessoas.

**Serve para sistemas legados?**

A proposta foi pensada para esse caso. Testes de caracterização registram o que o legado faz hoje, e a decisão de preservar, corrigir, substituir ou descontinuar cada regra cabe a quem tem autoridade de negócio. O risco declarado é a pós-racionalização: dar coerência ao que foi acidental ao reconstruir a intenção a partir do código.

**Há evidência de que funciona?**

Para componentes isolados, parcial: estudos mostram capacidade parcial de LLMs em elicitação, especificação e detecção de ambiguidade, em tarefas controladas. Para o workflow completo, não foi localizado estudo controlado ou longitudinal frente a uma linha de base alinhada à ISO/IEC/IEEE 29148 e ao SWEBOK. A página propõe um protocolo para avaliar o workflow no seu próprio contexto.

## Glossário

- **Especificação Conversacional Estruturada** — Workflow humano–IA, governado por artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a intenção de um sistema.
- **Oráculo de teste** — Fonte do resultado esperado com o qual um teste compara o comportamento observado.
- **Teste de caracterização** — Teste que registra o que um sistema existente faz hoje, inclusive defeitos e regras obsoletas, sem julgar se esse comportamento está correto.
- **Divergência (drift)** — Situação em que artefatos que deveriam dizer a mesma coisa (especificação, testes, código, produção) passam a dizer coisas diferentes.
- **Matriz de autoridade** — Política de governança proposta que define, para cada tipo de decisão, quem decide e o que a IA pode fazer.
- **Proveniência** — Registro da origem de uma afirmação ou decisão: fonte, autor, data e justificativa.
- **Spec-first** — Modo em que a especificação é elaborada antes do código. O risco é congelar cedo uma interpretação do modelo.
- **Spec-retrospectiva** — Modo em que a intenção é reconstruída a partir de código, logs e incidentes. O risco é dar coerência ao que foi acidental.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
