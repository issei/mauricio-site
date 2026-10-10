# Vibe Coding com Devin — De Executor a Orquestrador Cognitivo

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/devin>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-05-19 · Atualizado: 2026-10-10.

## Em síntese

O **Vibe Coding** maduro não é caos de prompts: é **intenção estruturada e persistente**. O humano sobe de executor a **Orquestrador Cognitivo** — dirige a inteligência da máquina com intenção clara, como um chef executivo que responde por cada prato sem cozinhar todos.

- **Spec-Driven Development (SDD)** — a especificação versionada é a referência da intenção: a IA implementa contra ela, e divergências entre spec, testes e código são decididas por pessoas.
- **BDD como verificação** — cenários Dado/Quando/Então verificam os comportamentos escolhidos; não provam, sozinhos, que a intenção foi cumprida.
- **Arsenal Skills · Playbooks · Knowledge** — conhecimento organizacional que acumula e se reusa no Git.
- **A2UI** — o agente emite intenção de interface; a renderização é governada e determinística.

## O fluxo prático

No estudo de caso Devin + Salesforce, relatado pelo autor, o fluxo tem quatro passos: Spec (definição SDD do comportamento) → Retrieve (descoberta autônoma de contexto) → Refatorar (edição guiada pela spec) → Validar (Apex Tests que verificam os critérios de aceite). A spec registra o As-Is/To-Be, e os testes tornam parte dele verificável, sob os contratos da camada de arquitetura.

## Perguntas frequentes

**O que é Vibe Coding?**

Vibe Coding é desenvolver software dirigindo um agente de IA por intenção em vez de digitar cada linha. Na forma madura, a intenção é estruturada e persistente (uma especificação versionada), não um prompt efêmero — é o que separa o experimento do método.

**O que é Spec-Driven Development (SDD)?**

No SDD a especificação versionada é a referência da intenção: escreve-se o quê e o porquê, e a IA implementa contra a spec, com testes (BDD) para verificar. A spec não é infalível: quando spec, testes e código divergem, uma pessoa com autoridade decide o que corrigir. Quando a intenção vive num prompt descartável, ela se perde; numa spec versionada no repositório, pode ser revisada e auditada.

**O que é o Orquestrador Cognitivo?**

É o profissional que dirige a inteligência da máquina com intenção — define o quê e o porquê e julga o resultado — em vez de executar cada linha. Ele consome ferramentas tipadas derivadas de schemas e versiona não só o código, mas o raciocínio que o produziu.

**O que são Skills, Playbooks e Knowledge?**

É o arsenal de inteligência organizacional que cresce com o tempo: Skills são procedimentos reutilizáveis (refatorar sem risco, testar de forma exaustiva), Playbooks são receitas de processo (code review, onboarding, migração) e Knowledge é o ativo que acumula (arquitetura, convenções, lições e gotchas).

**O que é A2UI (Agent-to-User Interface)?**

É a evolução do MCP da consulta para a renderização: o agente usa o protocolo para emitir intenção de interface — o Cérebro decide o quê mostrar (dados sob contrato) e a Vitrine determinística decide como renderizar. A interface deixa de ser texto livre imprevisível e passa a ser output governado, testável e reproduzível.

## Glossário

- **Vibe Coding** — Desenvolver dirigindo um agente por intenção; na forma madura, intenção estruturada e persistente.
- **SDD (Spec-Driven Development)** — A especificação versionada como referência da intenção; a IA implementa contra ela e os testes verificam os comportamentos escolhidos.
- **BDD** — Cenários Dado/Quando/Então com fixtures gravadas; testa o sistema ao redor do modelo.
- **Orquestrador Cognitivo** — Quem dirige a inteligência da máquina com intenção, em vez de executar cada linha.
- **A2UI (Agent-to-User Interface)** — O agente emite intenção de interface; a Vitrine determinística decide como renderizar.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
