# Especificação Conversacional Estruturada | Maurício Issei

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/especificacao-conversacional>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-10-10 · Atualizado: 2026-10-10.

## Em síntese

É uma **proposta de workflow** em que a IA ajuda a elicitar e registrar requisitos — perguntando, comparando interpretações e sugerindo exemplos — enquanto **pessoas com autoridade decidem**. Cada afirmação tem origem e status, e as divergências entre documentação, testes e código seguem uma política explícita. A eficácia do workflow completo ainda não foi avaliada.

- **A IA propõe, pessoas decidem** — a matriz de autoridade separa quem decide de quem assiste; o modelo não tem autoridade substantiva por padrão.
- **Cinco práticas** — registrar a origem, separar fato de hipótese, manter pendências visíveis, usar exemplos e contraexemplos, e revisar na proporção do risco.
- **Divergência governada** — documentação, testes e código vão divergir; a política define quem resolve, como, e onde a decisão fica registrada.
- **Complementa o TDD, não o substitui** — a especificação decide o que verificar; o TDD verifica. O oráculo (resultado esperado) vem de pessoas.

## Postura: proposta, não método validado

O workflow completo ainda não foi comparado a uma linha de base, e não foi localizado estudo controlado ou longitudinal dele. Os componentes têm evidência parcial, em tarefas isoladas. Normas e guias (ISO/IEC/IEEE 29148, SWEBOK, NIST AI RMF e AI 600-1) são fundamento do desenho, não validação: a proposta é compatível com as atividades que a 29148 e o SWEBOK descrevem e é inspirada na função Govern do NIST, sem reivindicar conformidade.

## As cinco práticas do protocolo

1) Registrar a origem de cada afirmação (entrevista, documento, inspeção de código, observação operacional, inferência ou decisão formal). 2) Separar fatos, hipóteses e propostas. 3) Manter as pendências visíveis, com responsável. 4) Usar exemplos e contraexemplos; o modelo sugere casos, não os promove a regra aprovada. 5) Revisão proporcional ao risco.

## Política de divergência

Não há fonte universal de verdade. Quando dois artefatos entram em conflito: identificar os artefatos e o comportamento divergente; classificar a causa provável (informação incompleta, defeito, mudança de regra, obsolescência ou erro de implementação); identificar quem tem autoridade; registrar a decisão, a justificativa, o impacto e os artefatos afetados; atualizar e verificar de novo. O objetivo não é impedir toda divergência, mas torná-la detectável, explicável e tratável.

## Kit de artefatos

Matriz de autoridade, modelo de registro de afirmação, registro de divergência com estados e roteamento, checklist de drift e protocolo de avaliação resumido, em Markdown: https://mauricio.issei.com.br/downloads/kit-especificacao-conversacional.md

## Perguntas frequentes

**O que é Especificação Conversacional Estruturada?**

É um workflow humano–IA, governado por artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a intenção de um sistema como requisitos e critérios verificáveis, mantendo explícitas as fontes, as incertezas, as decisões e a forma de verificação. É uma proposta em avaliação, não um método validado nem uma norma.

**Qual a diferença para Vibe Spec-ing e para Spec-Driven Development?**

Vibe Spec-ing foi o nome anterior deste enquadramento; mudou porque "vibe" sugere o contrário do que a proposta exige (registro, autoridade e verificação). Spec-Driven Development é um rótulo ainda instável para práticas em que a especificação vem antes do código (spec-first, spec-anchored, spec-as-source). A Especificação Conversacional Estruturada é um workflow específico dentro desse espaço, com autoridade humana e política de divergência explícitas.

**A IA pode aprovar requisitos ou regras de negócio?**

Não, por padrão. O modelo pode perguntar, resumir, propor cenários, apontar contradições e preparar mudanças, mas não recebe autoridade para decidir valor, risco, conformidade, aceitação ou verdade de domínio. A matriz de autoridade atribui cada decisão a pessoas designadas; ela é uma política de governança proposta, a ajustar a cada organização.

**Isso substitui o TDD ou os testes de aceitação?**

Não. Atuam em níveis diferentes: a especificação define qual problema, para quem e com quais critérios; o TDD verifica o próximo incremento de código. O TDD torna o feedback barato, mas não torna o oráculo correto. Quando o mesmo modelo escreve a especificação e os testes, um teste verde pode apenas confirmar o erro do próprio modelo, por isso o resultado esperado é definido ou validado por pessoas.

**Serve para sistemas legados?**

A proposta foi pensada para esse caso: testes de caracterização registram o que o legado faz hoje, e a decisão de preservar, corrigir, substituir ou descontinuar cada regra cabe a quem tem autoridade de negócio. O risco declarado é a pós-racionalização: dar coerência ao que foi acidental ao reconstruir a intenção a partir do código.

**Há evidência de que funciona?**

Para componentes isolados, parcial: estudos mostram capacidade parcial de LLMs em elicitação, especificação e detecção de ambiguidade, em tarefas controladas. Para o workflow completo, não foi localizado estudo controlado ou longitudinal frente a uma linha de base alinhada à ISO/IEC/IEEE 29148 e ao SWEBOK. A página traz um protocolo de avaliação para testar no próprio contexto.

## Glossário

- **Especificação Conversacional Estruturada** — Workflow humano–IA, governado por artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a intenção de um sistema.
- **Oráculo de teste** — Fonte do resultado esperado com que um teste compara o comportamento observado.
- **Teste de caracterização** — Teste que registra o que um sistema existente faz hoje, inclusive defeitos e regras obsoletas, sem julgar se está certo.
- **Divergência (drift)** — Situação em que artefatos que deveriam dizer a mesma coisa (especificação, testes, código, produção) passam a dizer coisas diferentes.
- **Matriz de autoridade** — Política de governança proposta que separa quem decide cada tipo de decisão do que a IA pode fazer em cada uma.
- **Proveniência** — Registro de origem de uma afirmação ou decisão: fonte, autor, data e justificativa.
- **Spec-first** — Modo em que a especificação é elaborada antes do código; o risco é congelar cedo uma interpretação do modelo.
- **Spec-retrospectiva** — Modo em que a intenção é reconstruída a partir de código, logs e incidentes; o risco é dar coerência ao que foi acidental.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
