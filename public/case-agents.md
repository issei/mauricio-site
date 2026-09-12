# Case Agents: a tool errada não é uma aproximação aceitável | Maurício Yokoyama Issei

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/case-agents>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-09-10 · Atualizado: 2026-09-11.

## Em síntese

O **case-agents** é a implementação e benchmark de um cérebro de roteamento para agente bancário: decide se uma query necessita de LLM, seleciona 2 ferramentas entre 285 registradas e **bloqueia a execução quando a decisão não é confiável o bastante**.

- **A capacidade é escolher a ferramenta certa; a confiança é saber quando não executar nenhuma.**
- **Governança do catálogo** — colapso de duplicatas semânticas em 14 capacidades canônicas elevou o Hit Rate@2 de 35% para 100%.
- **O Crash Silencioso contido** — a Guarda de Direção (leitura vs escrita) impediu que uma consulta de e-mail alterasse o cadastro do cliente.
- **Economia de custo real** — 77,8% de economia com 100% de sucesso nas execuções.

## O problema e o domínio

No domínio bancário, executar uma ferramenta errada na conta do cliente é inaceitável. O cérebro de roteamento precisa decidir com segurança e abster-se quando a confiança for insuficiente.

## A barreira e os resultados

Quatro camadas de segurança levaram as execuções incorretas de 7 para zero, mantendo 100% de acerto nas 20 queries transacionais e 77,8% de economia de custo no benchmark do MVP.

## Perguntas frequentes

**O que é o projeto Case Agents?**

É o desenvolvimento e avaliação do cérebro de roteamento e seleção de ferramentas de um agente de atendimento bancário digital. Ele classifica a mensagem em FAST_PATH ou AGENT, recupera as 2 ferramentas mais relevantes entre 285 e aplica uma barreira pré-execução de 4 camadas antes de chamar qualquer LLM.

**O que é o Crash Silencioso medido no projeto?**

Uma falha em que uma query de consulta ("Qual é o e-mail cadastrado na minha conta?") resolveu com alta confiança e margem folgada (0.47) para a ferramenta de alteração de cadastro (atualizar_email). A falha passou por 54 testes e 3 guardas tradicionais sem gerar exceção.

**Como a Guarda de Direção funciona?**

A Guarda de Direção (G4) analisa o verbo da query e compara com o modo de operação (read/write) declarado na ferramenta. Se a query for de leitura e a ferramenta for de escrita, o sistema descarta totalmente a ferramenta para evitar danos irreversíveis ao cadastro do cliente.

**Como alcançar 100% de sucesso com economia de custo?**

Declarando a governança do catálogo de ferramentas (colapso de duplicatas semânticas em capacidades canônicas) e aplicando a barreira pré-execução de 4 camadas (confiança do router, score mínimo, margem relativa e direção). A economia de custo líquida ficou em 77,8%.

**Qual é a estratégia de duas branches do projeto?**

O repositório mantém duas abordagens no Git: a branch feature/solucao-enxuta, focada em prototipagem rápida e validação de hipóteses com código enxuto, e a branch main (solucao-sdd-vibe), focada em robustez enterprise com Spec-Driven Development, 9 ADRs, taxonomia canônica, calibração Platt Scaling e blueprint de arquitetura produtiva.

**Como funciona a Arquitetura Produtiva de Alta Performance (ADR-009)?**

A arquitetura produtiva separa rigidamente o Cold Path (treinamento e calibração em Python 3.12 offline/CI) do Hot Path (Gateway de inferência OmniRoute em Rust/Go stateless online). Com motor embutido in-process, o hot path atinge latência p99 inferior a 1-3 ms, elimina pausas de Garbage Collection e executa os guard rails diretamente na memória RAM.

## Glossário

- **Barreira Pré-Execução** — Conjunto de 4 guardas determinísticas que autorizam ou desviam a execução de uma ferramenta antes de invocar o LLM.
- **Guarda de Direção** — Restrição semântica que impede ferramentas de escrita (alteração de estado) em requisições de leitura.
- **Colapso por Capacidade** — Agrupamento de variantes operacionais redundantes sob uma capacidade canônica única.
- **Desacoplamento Cold/Hot Path** — Padrão arquitetural que isola treinamento em Python offline do gateway compilado em Rust no caminho crítico de produção.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
