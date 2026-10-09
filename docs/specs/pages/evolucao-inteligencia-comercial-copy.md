# Copy — /proposta (fase 1)

> Texto final das 7 seções, a partir do §3 da [spec](evolucao-inteligencia-comercial.md).
> **Status:** aguardando revisão do dono. Nenhum HTML antes da aprovação.
> Legenda: `[H1]`/`[H2]` = heading; `[visual]` = nota para a implementação, não vai como texto.

---

## Head

- **Title / og:title:** Inteligência comercial orientada por contexto
- **Description / og:description:** Proposta de diagnóstico para conectar dados, regras de negócio e o fluxo comercial, com piloto mensurável antes de qualquer investimento maior.

**Header:** sem nome do autor (o domínio já identifica). O nome aparece só no footer.

---

## 1. Hero

Proposta de diagnóstico · Comercial e Tecnologia

**[H1]** O comercial gasta tempo demais reunindo contexto antes de agir

As informações sobre um prospect (a empresa que ainda não é cliente) e as regras que valem para
ele já existem, mas estão em lugares diferentes. A proposta é levá-las até o fluxo de trabalho do
comercial, sem duplicar regras e sem criar uma plataforma nova.

> **O pedido:** patrocinar um diagnóstico conjunto entre Comercial e Tecnologia, seguido de um
> piloto pequeno e mensurável. Nenhum investimento maior antes de o piloto mostrar resultado.

---

## 2. Onde o esforço acontece

**[H2]** O esforço não vem da falta de dados, e sim da distância entre eles

A plataforma comercial já cobre:

- base de prospects;
- filtros dinâmicos, bem avaliados por quem usa;
- priorização;
- roteiro de visitas e tarefas;
- regras de validação, elegibilidade, risco e produto.

O atrito aparece em três pontos.

`[visual]` Três cartões: dimensão → como aparece no dia a dia.

| Dimensão | Como aparece no dia a dia *(exemplo ilustrativo)* |
| :-- | :-- |
| **Dados dispersos** | Antes de contatar uma empresa, o comercial abre a base de prospects, depois o cadastro, depois o histórico de relacionamento, e monta à mão um resumo: quem é a empresa, se já foi cliente, o que já foi oferecido e por que não avançou. |
| **Regras difíceis de interpretar** | Para saber se pode oferecer um produto àquela empresa, ele precisa conferir critérios de elegibilidade, de risco e de documentação que estão em manuais ou com outra área. Às vezes a resposta só chega depois do contato, e a oferta precisa ser refeita. |
| **Informação fora do fluxo** | A tarefa do dia diz "contatar a empresa X", mas não mostra por que ela foi priorizada nem o que já se sabe sobre ela. Para descobrir, o comercial sai da tarefa, pesquisa em outro lugar e volta. |

O resultado é tempo de pesquisa e de preparação que poderia ir para a conversa com o cliente.

---

## 3. A proposta

**[H2]** A mudança é levar o contexto até o fluxo, não criar um sistema novo

`[visual]` Comparativo em três colunas.

| Hoje | Direção proposta | Efeito esperado *(a validar no piloto)* |
| :-- | :-- | :-- |
| O comercial busca a informação em várias fontes. | As informações relevantes chegam reunidas no ponto do fluxo onde são usadas. | Menos tempo e menos consultas para preparar a abordagem. |
| As regras são interpretadas caso a caso. | As regras são consultadas na fonte oficial e apresentadas de forma legível. | Menos divergência entre o que se oferece e o que é aceito. |
| Cada atividade recebe tudo ou nada. | Contexto mínimo: cada atividade recebe só o que precisa. | Leitura mais rápida, com menos ruído. |

`[visual]` Diagrama de conexão: **Prospect** + **Regras de negócio** + **Oportunidade** → **Abordagem preparada**.

As fontes oficiais continuam sendo a referência, e cada regra continua com quem é dono dela hoje.
A proposta conecta o que existe; não copia nem substitui.

---

## 4. Etapas

**[H2]** A evolução avança por etapas, e cada uma precisa provar valor antes da próxima

`[visual]` Trilha de 3 etapas com um "portão" entre elas.

**Etapa 1 — Integrar o contexto**
Reunir no fluxo de trabalho as informações do prospect e as regras que se aplicam a ele.
*Critério para avançar:* o piloto mostra redução no tempo para reunir o contexto.

**Etapa 2 — Apoiar a atuação**
Ajudar o comercial a priorizar e a preparar a abordagem. Para a equipe que visita clientes em campo,
montar o roteiro do dia equilibrando o potencial de cada empresa e o deslocamento entre elas é hoje
um trabalho manual. Hipótese a testar: priorizar também pelo esforço de atender, e não só pelo
potencial. Uma empresa de potencial menor, perto de outras visitas do dia, pode valer mais que uma
de potencial maior isolada no roteiro.
*Critério para avançar:* adoção pelo comercial e qualidade das informações confirmadas.

**Etapa 3 — Aprender com o resultado**
Aprender com o uso e com o resultado: o motivo de uma recusa, registrado pelo comercial, passa a ser
um dado. Esta etapa depende da qualidade dos dados das etapas anteriores.

As etapas não têm datas fixas. Cada uma só começa quando a anterior mostrar resultado.

---

## 5. Como provar valor

**[H2]** O valor se mede comparando o trabalho antes e durante o piloto

1. **Linha de base.** Medir como o trabalho acontece hoje, antes de qualquer mudança.
2. **Piloto delimitado.** Um fluxo, um grupo pequeno de usuários, um período definido.
3. **Comparação.** Os mesmos indicadores, antes e durante o piloto.

`[visual]` Tabela de indicadores, sem metas numéricas.

| Indicador | O que mede |
| :-- | :-- |
| **Tempo mediano para reunir o contexto de um prospect** *(primário)* | O tempo típico de pesquisa. A mediana (o valor do meio) não se distorce por casos extremos. |
| Consultas por caso | Quantas fontes o comercial abre para preparar uma abordagem. |
| Tempo de preparação | Quanto leva para a abordagem ou a proposta ficar pronta. |
| Completude do contexto | Em quantos casos o contexto necessário estava completo. |
| Adoção | Quantos usuários do piloto passam a usar no dia a dia. |

As metas são definidas no diagnóstico, a partir da linha de base. A conversão em vendas fica para
depois: ela depende de muitos fatores, e atribuir uma melhora ao piloto sem comparação controlada
seria presumir o resultado.

---

## 6. Princípios

**[H2]** Seis princípios limitam o risco

1. **Reutilizar antes de construir.** O que a plataforma comercial já faz bem continua como está.
2. **Não duplicar regras de negócio.** Uma regra copiada diverge da original com o tempo.
3. **A fonte oficial decide.** Em caso de diferença, vale o sistema de origem.
4. **Qualidade e acesso aos dados vêm antes.** São pré-condição, não uma etapa posterior.
5. **Validar antes de expandir.** Cada ampliação depende de resultado medido.
6. **IA só com justificativa demonstrada.** Inteligência artificial ou aprendizado de máquina entram
   quando resolvem um problema que uma regra simples não resolve.

---

## 7. Próximo passo

**[H2]** O próximo passo é um diagnóstico, não um projeto

**O que se pede:**

1. Patrocinar o diagnóstico, com Comercial, Tecnologia e os donos das regras de negócio.
2. Ceder um grupo pequeno de usuários e um fluxo real para observação.
3. Autorizar a definição do piloto a partir do que o diagnóstico encontrar.

**O que o diagnóstico entrega:**

- o mapa das fontes de dados e das regras, com seus donos;
- o fluxo prioritário a melhorar;
- o escopo do piloto;
- os critérios para decidir entre seguir, ajustar ou parar.

**O que o diagnóstico verifica:** se existe uma chave confiável para identificar o prospect entre
as fontes; se as regras podem ser consultadas por sistema; a atualidade e a qualidade dos dados; os
perfis de acesso; as integrações entre sistemas (APIs, os pontos por onde um sistema consulta outro) que já podem ser reaproveitadas; e se a plataforma comercial
consegue exibir esse contexto.

Se o diagnóstico mostrar que o ganho não compensa, essa também é uma resposta útil, obtida antes de
qualquer investimento maior.

`[visual]` Sem botão nem link de contato (D-1).

---

**Footer:** Maurício Yokoyama Issei · 2026

---

## Pontos para o dono revisar

1. ~~"Roteiro"~~ — mantido: a equipe de campo e a roteirização são dor real (dono, 2026-10-09).
2. ~~Etapa 2, esforço de atender~~ — mantido e explicitado com o roteiro de visitas.
3. ~~Exemplo hipotético da etapa 3~~ — removido.
4. ~~Pistas indiretas~~ — aprovado.
