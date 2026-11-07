---
id: Qk8zM-SpbUY
slug: padrao-saga-e-transactional-outbox-em-microsservicos
status: ficha
temas: []
youtube:
  titulo: Padrão Saga e Transactional Outbox em Microsserviços
  publicado_em: 2026-09-11
  duracao: PT7M41S
  descricao: |-
    Garantir a **consistência de dados** entre múltiplos bancos de dados independentes é um dos maiores desafios em arquiteturas de microsserviços, onde transações ACID tradicionais de banco único não podem ser aplicadas diretamente.

    Neste vídeo explicativo, exploramos em detalhes como resolver o perigoso problema do **Dual Write** combinando dois dos padrões de arquitetura mais fundamentais do desenvolvimento de software moderno: o **Saga Pattern** e o **Transactional Outbox Pattern**.

    ---

    ### 🎯 **O que você vai aprender neste vídeo:**

    * **O Problema do Dual Write:** Por que tentar salvar no banco de dados e publicar uma mensagem no message broker (como Apache Kafka) na mesma operação de código falha em produção e gera inconsistências silenciosas.
    * **Transactional Outbox Pattern:** Como gravar o evento de domínio em uma tabela de `outbox` na mesma transação local do banco de dados para garantir atomicidade.
    * **Change Data Capture (CDC) e Relay:** Como utilizar **Debezium** e **Kafka** (ou rotinas de *polling*) para ler a tabela de outbox e publicar mensagens com garantia de entrega de pelo menos uma vez (*at-least-once delivery*).
    * **Saga Pattern e Consistência Eventual:** Como coordenar fluxos de negócios distribuídos através de uma sequência de transações locais para atingir a consistência eventual em substituição ao *Two-Phase Commit* (2PC).
    * **Transações Compensatórias:** Como desfazer semanticamente os passos já executados caso ocorra alguma falha no meio do fluxo.
    * **Orquestração vs. Coreografia:** A diferença entre coordenar a Saga através de uma **máquina de estados centralizada (Orquestrador)** ou por **reações descentralizadas a eventos (Coreografia)**.
    * **Classificação de Passos e Idempotência:** A importância de categorizar passos em **Compensáveis**, **Pivô** e **Repetíveis**, e por que garantir **Idempotência** nos consumidores é indispensável.

    ---

    ### ⏱️ **Capítulos / Minutagem do Vídeo:**

    * `00:00` - Introdução: O desafio da consistência em microsserviços
    * `01:30` - O Problema do Dual Write e falhas em produção
    * `04:15` - O que é o Transactional Outbox Pattern?
    * `07:40` - Captura de eventos com CDC (Debezium) e Kafka
    * `11:10` - Introdução ao Saga Pattern e substituição do 2PC
    * `14:35` - Como funcionam as Transações Compensatórias
    * `18:00` - Saga Coreografada vs. Saga Orquestrada
    * `22:15` - Passos Pivô, Idempotência e Boas Práticas
    * `25:00` - Conclusão e Resumo

    ---

    ### 🏷️ **Hashtags:**
    #Microsservicos #SagaPattern #TransactionalOutbox #SoftwareArchitecture #Kafka #Debezium #SpringBoot #DotNet #DistributedSystems #CleanArchitecture
  miniatura: https://i.ytimg.com/vi/Qk8zM-SpbUY/maxresdefault.jpg
  visualizacoes: 93
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---
