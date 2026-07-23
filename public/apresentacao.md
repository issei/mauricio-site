# Arquitetura de IA auditável

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/apresentacao>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-07-23 · Atualizado: 2026-07-23.

## Em síntese

Três sistemas — **memória institucional sem alucinação**, **especificação como contrato** e **esteira contínua de resiliência** — apresentados em duas leituras da mesma verdade: a executiva, medida em risco e retorno, e a de engenharia, medida em cobertura e latência.

- **GraphRAG e ontologias** — a resposta da IA vem da memória da empresa, com trilha de proveniência nó a nó.
- **Spec-Driven Development** — o que foi aprovado é exatamente o que entra em produção; a mudança volta à spec, nunca direto ao código.
- **DevOps Salesforce** — caminho único e vigiado de entrega, com rollback conhecido e exercitado.
- **Determinismo, auditabilidade, rastreabilidade e reversibilidade** — quatro princípios declarados de forma verificável, não decorativa.

## As três camadas

A página se organiza em profundidade crescente: Superfície (o que o negócio ganha, sem jargão não traduzido), Mecanismo (como as peças se conectam) e Núcleo (a densidade técnica, reservada a quem escolhe ativamente ir até lá). A densidade é sempre uma escolha do visitante, nunca uma imposição.

## Duas leituras da mesma verdade

Um seletor persistente alterna entre a perspectiva Executiva e a de Engenharia. Os pares de frase mantêm o mesmo número de sentenças, a mesma pontuação e as mesmas métricas, variando apenas o vocabulário — restrição que torna a transição uma transmutação e não uma troca de conteúdo.

## Perguntas frequentes

**O que torna uma arquitetura de IA auditável?**

A capacidade de reconstruir, para qualquer saída, a evidência que a sustentou: quais fontes foram consultadas, sob qual versão da especificação, com qual aprovação. Auditabilidade não é um relatório produzido depois — é o subproduto de um caminho único de decisão e entrega.

**O que é GraphRAG e por que reduz alucinação?**

É a recuperação de contexto a partir de um grafo de conhecimento com relações tipadas, em vez de apenas similaridade de texto. Como cada resposta carrega os nós percorridos, existe proveniência verificável; e como a ausência de dado é tratada como incerteza explícita (open-world), o sistema prefere não responder a inventar.

**O que é Spec-Driven Development na prática?**

A especificação é a fonte da verdade e o alvo executável: critérios de aceite viram testes, e qualquer mudança de comportamento passa primeiro pela spec. Um critério só vale se puder falhar — "melhorar a performance" não é critério, "p95 abaixo de 400 ms" é.

**Quais princípios de governança são declarados?**

Determinismo (mesma entrada, mesma saída, com o não-determinismo isolado e testável), auditabilidade (toda decisão guarda evidência reexecutável), rastreabilidade (do comportamento em produção até a linha da especificação que o exigiu) e reversibilidade (nenhuma mudança entra sem caminho de volta exercitado).

**Por que a página tem duas perspectivas?**

Porque a mesma arquitetura precisa ser defendida em dois vocabulários: risco, governança e retorno para a decisão executiva; ontologias, contratos e latência para a decisão de engenharia. Os pares de frase mantêm estrutura sintática e métricas idênticas — é a mesma verdade contada de dois jeitos, não duas afirmações diferentes.

## Glossário

- **Auditabilidade** — Toda decisão automatizada guarda a evidência que a sustentou, em formato reexecutável por terceiros.
- **Rastreabilidade** — Do comportamento em produção é possível chegar à linha da especificação que o exigiu e à aprovação que o liberou.
- **Reversibilidade** — Nenhuma mudança entra sem caminho de volta conhecido e exercitado. Rollback não testado não é rollback.
- **Proveniência** — Registro dos nós e fontes percorridos para produzir uma resposta, nó a nó.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
