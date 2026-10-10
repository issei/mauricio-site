# Vibe Spec-ing: Especificação Conversacional como Ponte entre Descoberta e Engenharia

## Tese central

Não começamos sabendo exatamente o que construir. Descobrimos o que precisa ser construído enquanto esclarecemos a intenção, testamos hipóteses e aprendemos. A especificação conversacional torna explícito o entendimento compartilhado; a engenharia o transforma em critérios verificáveis, artefatos com papéis distintos e uma solução que permanece compreensível, modificável e operável ao longo do tempo. O termo *Vibe Spec-ing* nomeia esse enquadramento em desenvolvimento — não uma metodologia já validada.

---

## 1. A frase que parece suficiente

Uma product owner chega com uma formulação que parece clara:

> “Precisamos reduzir o número de tickets de suporte sobre cancelamento de assinatura.”

A dor é reconhecível. O time entende o sintoma. Ninguém consegue ainda dizer, com precisão, o que deve ser construído.

A intenção existe. A clareza não.

Essa situação é comum. Em desenvolvimento assistido por agentes de IA, ela se torna ainda mais frequente: um prompt inicial gera código funcional, mas a decisão de produto permanece implícita, distribuída entre conversas, logs e implementações acidentais. O risco não é apenas entregar a coisa errada. É entregar algo que ninguém consegue explicar, auditar ou evoluir seis meses depois.

---

## 2. Quando a clareza se dissolve

Nas primeiras conversas surgem hipóteses conflitantes.

- Alguns defendem cancelamento imediato.
- Outros querem um período de graça.
- O time de finanças lembra que existem regras fiscais diferentes por país.
- O suporte relata casos de fraude e de usuários que cancelam por engano.
- O jurídico menciona obrigações de retenção de dados.

A intenção inicial — “reduzir tickets” — revela-se insuficiente. Ela descreve um resultado desejado, não o problema, nem o escopo, nem as restrições, nem os critérios de sucesso.

Aqui emerge a primeira distinção importante: **reduzir incerteza sobre o entendimento compartilhado não é o mesmo que validar uma hipótese de negócio**.

Uma conversa bem conduzida pode esclarecer o que cada stakeholder entende por “cancelamento bem-sucedido”. Isso diminui ambiguidade. Não prova, porém, que a solução adotada realmente reduzirá os tickets, nem que os trade-offs escolhidos são aceitáveis do ponto de vista de risco, receita ou conformidade. Hipóteses de negócio exigem evidências (dados de uso, experimentação, medição). Requisitos exigem critérios verificáveis. Confundir os dois é uma fonte clássica de falsa confiança.

---

## 3. Investigar em vez de especificar cedo

Em vez de pedir à IA “escreva a especificação do cancelamento”, a equipe usa a conversa como instrumento de investigação.

Perguntas simples expõem lacunas:

- O que conta como cancelamento bem-sucedido?
- Quem pode solicitar o cancelamento?
- O que acontece com o acesso imediatamente após o pedido?
- Existe reembolso proporcional? Em quais condições?
- Há casos em que o cancelamento deve ser bloqueado?
- Quais dados precisam ser retidos e por quanto tempo?
- O que fica explicitamente fora de escopo nesta primeira entrega?

Cada resposta gera novas perguntas. A intenção vaga começa a se transformar em um mapa de decisões ainda abertas, pressupostos e conflitos.

Essa fase corresponde ao que a Engenharia de Requisitos clássica chama de elicitação e análise. A literatura mostra que stakeholders omitem tópicos espontaneamente e que ambiguidades frequentemente revelam conhecimento tácito [1][2]. Um modelo de linguagem pode ajudar a manter o fio da conversa, sugerir cenários esquecidos e reformular trechos ambíguos. Ele não substitui a responsabilidade de quem tem autoridade sobre o produto.

O termo *Vibe Spec-ing*, tal como usado aqui, designa exatamente esse uso disciplinado da conversa com IA: um workflow em que o diálogo serve para elicitar, registrar e revisar intenção, escopo e restrições, antes, durante ou depois da implementação. Trata-se de uma definição operacional provisória, não de um método consolidado em normas ou literatura primária [3].

---

## 4. Exemplos mínimos que corrigem o entendimento

A equipe não tenta resolver tudo de uma vez. Produz um primeiro exemplo mínimo:

> Usuário ativo no plano mensal, sem pendências financeiras, solicita cancelamento pelo aplicativo → deve perder o acesso ao final do ciclo atual e receber confirmação por e-mail.

O exemplo é deliberadamente estreito. Ele serve apenas para testar se o entendimento básico está compartilhado.

Quando o suporte aponta que muitos tickets vêm de usuários que cancelam e depois pedem reativação, o exemplo é ampliado. Quando o jurídico exige retenção mínima de dados, outra restrição entra. Quando finanças esclarece regras de reembolso por país, novos casos de fronteira aparecem.

Essa dinâmica de microvalidação lembra os *baby steps* do desenvolvimento incremental e práticas como Example Mapping [4]. Ela não deve ser confundida com validação formal de requisitos nem com prova de que a solução de negócio está correta. Trata-se apenas de corrigir o entendimento compartilhado antes que decisões equivocadas se acumulem.

A especificação, nesse ponto, deixa de ser um documento gerado de uma vez. Ela se torna um artefato evolutivo: nasce da investigação, amadurece com os exemplos e as restrições descobertas, e continua sendo atualizada sempre que uma nova evidência aparece.

---

## 5. A especificação como artefato evolutivo com papéis distintos

Com critérios mais estáveis, a equipe formaliza o que foi aprendido. A especificação passa a registrar:

- objetivo e métricas de sucesso (ainda hipotéticas);
- escopo e fora de escopo;
- regras e exceções;
- restrições legais, fiscais e de segurança;
- exemplos concretos e casos de fronteira;
- decisões rejeitadas e seu rationale;
- perguntas ainda abertas;
- critérios de aceitação verificáveis.

Aqui é essencial evitar a ilusão de uma fonte única de verdade genérica. Intenção, especificação, testes e código desempenham papéis diferentes:

| Artefato              | Papel principal                                      | O que não garante                          |
|-----------------------|------------------------------------------------------|--------------------------------------------|
| Intenção / rationale  | Porquê, trade-offs e decisões rejeitadas             | Correção da hipótese de negócio            |
| Especificação         | Escopo, restrições e critérios de aceitação          | Que a implementação está correta           |
| Testes                | Verificação de comportamentos sob oráculos definidos | Completude do domínio ou adequação de negócio |
| Código                | Realização da solução em um momento específico       | Que a intenção original foi preservada     |

Quando esses artefatos divergem — e eles divergirão — a equipe precisa de uma política explícita:

- Qual artefato é autoritativo para cada tipo de decisão?
- Quem adjudica o conflito?
- Como a mudança é registrada e comunicada?

Sem essa política, a conversa inicial se torna documento morto ou o código se transforma na única memória do sistema. A literatura de rastreabilidade e de Spec-Driven Development já identifica esse problema de *drift* [5][6]. A especificação conversacional não o resolve automaticamente; apenas torna mais visível a necessidade de governá-lo.

---

## 6. Construir com proporção, feedback e política de divergência

Com critérios e papéis mais claros, o planejamento pode ser proporcional à complexidade real.

Nem tudo exige arquitetura elaborada. Algumas regras cabem em testes de aceitação e em um serviço pequeno. Outras exigem integração com o sistema de billing, tratamento de inconsistências e observabilidade. A especificação agora carrega não só o “o que”, mas também o “por quê” e o “fora de escopo” — informações que normalmente se perdem entre reuniões e prompts.

A implementação segue em incrementos. Cada comportamento coberto por um critério ganha testes. Práticas como Test-Driven Development oferecem feedback local e proteção de regressão sobre o que foi codificado como oráculo [7]. A especificação conversacional, quando bem governada, fornece o contexto que o TDD sozinho não descobre: por que aquela regra existe, para quem, com quais restrições e sob quais condições de aceitação.

Quando um teste falha ou um caso real revela uma omissão, a especificação é revisitada. O código não é tratado como fonte única de verdade; a intenção registrada e validada também não é congelada. Os artefatos evoluem juntos, sob a política de divergência previamente definida.

---

## 7. Sustentabilidade observável

O sucesso não se resume a gerar código que passa nos testes de hoje.

Uma solução sustentável precisa tornar observáveis pelo menos quatro capacidades:

1. **Rastreabilidade** entre requisito, critério, teste e implementação.
2. **Facilidade de mudança** quando regras fiscais, canais ou políticas de negócio se alteram.
3. **Observabilidade operacional** — métricas, logs e alertas que permitam detectar desvios em produção.
4. **Explicabilidade** — a capacidade de, meses depois, reconstruir por que determinada decisão foi tomada, quais alternativas foram rejeitadas e sob qual evidência.

Essas propriedades não surgem automaticamente de uma conversa fluente com um modelo de linguagem. Elas dependem de disciplina de registro, versionamento, proveniência (modelo, prompt, decisão humana) e revisão. A ISO/IEC/IEEE 29148 e o SWEBOK já estabelecem muitos desses requisitos para a Engenharia de Requisitos [8][9]. O enquadramento conversacional apenas tenta reduzir a fricção de capturá-los e mantê-los quando parte significativa da implementação é assistida por agentes.

---

## 8. O que a conversa com IA torna explícito — e o que ela não resolve

A conversa estruturada com IA pode:

- acelerar a exploração de cenários e a detecção de ambiguidades;
- manter memória de decisões e perguntas abertas ao longo de múltiplas sessões;
- transformar linguagem natural em candidatos a critérios, exemplos e restrições;
- facilitar a atualização da especificação quando novas evidências aparecem.

Ela não resolve:

- a validação de hipóteses de negócio (que exige evidências externas);
- a adjudicação de conflitos entre stakeholders;
- a garantia de completude, correção ou verificabilidade dos requisitos;
- a eliminação de *drift* entre intenção, especificação, testes e código;
- a responsabilidade final sobre risco, conformidade e valor de produto.

Estudos recentes sobre o uso de LLMs em Engenharia de Requisitos mostram capacidade parcial em tarefas controladas de elicitação e geração de SRS, com falhas recorrentes em terminologia de domínio, restrições não funcionais e segurança [10][11][12]. Não há, até o momento, evidência controlada de que um workflow completo de especificação conversacional reduza defeitos, retrabalho ou custo total de ciclo de vida em comparação com práticas humanas ou híbridas alinhadas à 29148.

Por isso o termo *Vibe Spec-ing* deve ser tratado como enquadramento em desenvolvimento. Sua contribuição mais defensável é a conexão explícita entre três dimensões já conhecidas:

1. descoberta da intenção;
2. formalização conversacional assistida por IA;
3. engenharia evolutiva com artefatos de papéis distintos e sustentabilidade observável.

Não se trata de inventar um novo processo cognitivo nem de substituir a Engenharia de Requisitos. Trata-se de tornar mais explícito e governável o caminho que equipes já precisam percorrer quando a intenção inicial é incompleta e parte da construção é mediada por agentes.

---

## 9. Conclusão

O exemplo do cancelamento de assinatura é apenas uma ilustração plausível. Ele não constitui evidência de eficácia do processo. Serve para tornar visível uma progressão recorrente:

- uma intenção que parece suficiente;
- a descoberta de sua insuficiência;
- a redução de incerteza sobre o entendimento compartilhado;
- a formalização gradual de critérios verificáveis;
- a construção incremental sob política explícita de divergência;
- a preservação da capacidade de compreender, modificar e operar o sistema ao longo do tempo.

A especificação conversacional não elimina a necessidade de pensamento crítico, validação empírica nem engenharia. Ela pode, quando disciplinada, reduzir a perda de contexto entre a conversa inicial e o software que permanece em produção. Seu valor real só poderá ser estabelecido por estudos que comparem o workflow completo com baselines humanas ou híbridas e meçam resultados de ciclo de vida — completude, correção, rastreabilidade, drift, retrabalho, defeitos e custo total.

Até lá, a postura mais rigorosa é também a mais útil: usar a conversa com IA para tornar explícito o que se está decidindo, manter artefatos com papéis claros, validar com evidências e critérios verificáveis, e tratar a sustentabilidade do sistema como propriedade observável, não como efeito colateral da fluência do texto gerado.

---

## Referências

[1] Ferrari, A., Spoletini, P. & Gnesi, S. Ambiguity and tacit knowledge in requirements elicitation interviews. *Requirements Engineering* (2016). https://doi.org/10.1007/s00766-016-0249-3

[2] Burnay, C., Jureta, I. J. & Faulkner, S. What Stakeholders Will or Won’t Say: A Theoretical and Empirical Study of Topic Importance in Requirements Engineering Elicitation Interviews. *Information Systems* (2014). https://doi.org/10.1016/j.is.2014.05.006

[3] Análises e relatos informais que utilizam variações do termo (vibe specs, vibe-speccing, vibe-spec). O termo não possui definição normativa em ISO/IEEE, SWEBOK ou literatura primária consolidada.

[4] Cucumber. Example Mapping. https://cucumber.io/docs/bdd/example-mapping/

[5] Gotel, O. & Finkelstein, A. An Analysis of the Requirements Traceability Problem.  
Ramesh, B. & Jarke, M. Toward Reference Models for Requirements Traceability. *IEEE Transactions on Software Engineering* (2001).

[6] Fowler, M. / Thoughtworks. Understanding Spec-Driven Development; Spec-driven development: Unpacking one of 2025’s key new engineering practices.  
GitHub Spec Kit; Kiro documentation.

[7] Beck, K. *Test-Driven Development: By Example*.  
Rafique, Y. & Mišić, V. B. The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis. *IEEE Transactions on Software Engineering* (2013).  
Tosun, A. et al. An industry experiment on the effects of test-driven development on external quality and productivity. *Empirical Software Engineering* (2017).  
Nagappan, N. et al. Realizing Quality Improvement Through Test-Driven Development: Results and Experiences of Four Industrial Teams.

[8] ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering. https://standards.ieee.org/standard/29148-2018.html

[9] Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0/4.0a. https://ieeecs-media.computer.org/media/education/swebok/swebok-v4.pdf

[10] Ronanki, K. et al. Investigating ChatGPT’s Potential to Assist in Requirements Elicitation Processes. *SEAA* (2023).

[11] Krishna, R. et al. Using LLMs in Software Requirements Specifications: An Empirical Evaluation. *RE* (2024).

[12] Bashir, S. et al. Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study.  
Zadenoori et al. Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review (preprint).

[13] NIST AI 600-1 — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile.

[14] NASA. Appendix C: How to Write a Good Requirement. https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/
