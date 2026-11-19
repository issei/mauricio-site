---
id: Qk8zM-SpbUY
slug: padrao-saga-e-transactional-outbox-em-microsservicos
status: publicado
temas:
  - especificacao-e-desenvolvimento
  - cloud-e-confiabilidade
resumo: O vídeo explica dois padrões para manter os dados consistentes entre microsserviços. O padrão Saga quebra uma operação em transações locais, com compensação em caso de falha. O Transactional Outbox resolve o problema da escrita dupla. Juntos, dão consistência eventual confiável.
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
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

## O desafio dos microsserviços

Na arquitetura de microsserviços, cada serviço é dono do próprio banco de dados [00:20]. Isso dá independência às equipes e ajuda a escalar, mas levanta uma questão: como manter a integridade dos dados quando uma operação de negócio passa por vários serviços [00:20]?

Nas aplicações monolíticas, tudo ficava numa única transação, com garantias ACID [01:02]. Num sistema distribuído, esticar uma transação ACID pela rede, entre bancos diferentes, gera bloqueios e gargalos [01:23]. É preciso outra abordagem [01:43].

## O problema da escrita dupla

A escrita dupla acontece quando a aplicação precisa escrever em dois sistemas separados, como gravar um pedido no banco local e depois publicar um evento no message broker [01:43]. Se o banco confirma a gravação e a publicação do evento falha por um problema de rede, surge um pedido fantasma: ele existe no banco, mas os outros serviços nunca ficam sabendo dele [02:04].

## O padrão Saga

A saga não tenta fazer uma transação global [02:27]. Ela quebra a operação numa sequência de transações locais, menores e independentes [02:27]. Cada microsserviço faz o seu trabalho no próprio banco e publica um evento ou uma mensagem para disparar o próximo passo [02:48]. O sistema busca a consistência eventual: os dados ficam consistentes no fim, mesmo que não no mesmo instante [02:48].

Quando algo falha no meio do caminho, entram as transações compensatórias [03:09]. Num e-commerce, por exemplo [03:09]:

1. O primeiro passo reserva o estoque do produto [03:09].
2. O segundo passo, o pagamento, falha [03:09].
3. A saga percebe a falha e dispara uma operação de desfazer, que libera o estoque reservado [03:30].

Assim, o sistema não trava o banco à espera do pagamento: ele falha de forma controlada e desfaz o que já tinha feito [03:30].

## Coreografia ou orquestração

Há duas formas de implementar uma saga [03:51]:

- Na coreografia, os serviços reagem aos eventos uns dos outros, sem um centro. Não há gargalo central, mas o fluxo pode ficar confuso quando é complexo, com risco de dependências cíclicas [03:51].
- Na orquestração, um coordenador central diz quem faz o quê e quando. Isso dá visibilidade do processo de ponta a ponta, mas cria um ponto central de falha [04:13].

A escolha depende da complexidade do negócio [04:35].

## O Transactional Outbox

As sagas dependem de mensagens confiáveis, e é aí que entra o Transactional Outbox [04:35]. O padrão usa o próprio banco relacional como buffer [04:56]. Numa única transação atômica, o serviço grava os dados de negócio na tabela principal e o evento numa tabela de outbox [04:56]. Ou as duas escritas acontecem, ou nenhuma acontece, e a lacuna da escrita dupla desaparece [05:17].

Depois, um processo independente, o message relay, lê a tabela de outbox e entrega a mensagem ao broker, como o Kafka [05:39]. O relay pode ser um worker que consulta a tabela de tempos em tempos (polling) ou uma ferramenta de captura de dados de alteração (CDC), como o Debezium [05:39]. Ele garante a entrega pelo menos uma vez [06:00].

## Saga e Outbox juntos

Os dois padrões não concorrem: eles se completam [06:00]. A saga é o controlador de tráfego, que decide o que acontece, em que ordem e como compensar uma falha [06:20]. O Outbox é a tubulação durável, que garante que as ordens da saga chegam ao destino, mesmo com falhas de rede [06:20].

## Reflexão final

Confiar em várias escritas sem coordenação é contar com a sorte [07:02]. Implementados corretamente, os padrões Saga e Outbox dão uma garantia de consistência eventual [07:02].

## Perguntas frequentes

### O que é o problema da escrita dupla?

É quando a aplicação grava em dois sistemas separados, como o banco e o broker, e uma das escritas falha. O resultado pode ser um pedido que os outros serviços nunca veem [02:04].

### O que é uma transação compensatória?

É a operação que desfaz um passo anterior da saga quando um passo seguinte falha, como liberar o estoque quando o pagamento falha [03:30].

### Quando usar coreografia e quando usar orquestração?

Depende da complexidade do negócio. A coreografia evita um centro, mas fica confusa em fluxos complexos. A orquestração dá visibilidade, mas cria um ponto central de falha [04:35].
