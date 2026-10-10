# Vibe Spec-ing: Especificação Conversacional como Ponte entre Descoberta e Engenharia

**Nota epistemológica.** Este texto apresenta um *enquadramento em desenvolvimento* e uma proposta de pesquisa. Não demonstra que Vibe Spec-ing seja um método validado, nem que reduza defeitos, retrabalho, custo ou risco. O exemplo de cancelamento de assinatura é um *cenário sintético* usado apenas para ilustrar a progressão conceitual. As referências autorais internas são evidência do que seus autores afirmam; não constituem validação independente.

## Tese central

Não começamos sabendo exatamente o que construir. Descobrimos o que precisa ser construído enquanto esclarecemos a intenção, testamos hipóteses e aprendemos. A especificação conversacional torna explícito o entendimento compartilhado; a engenharia o transforma em critérios verificáveis, artefatos com papéis distintos e uma solução que permanece compreensível, modificável e operável ao longo do tempo. O termo *Vibe Spec-ing* nomeia esse enquadramento provisório — não uma metodologia já validada.

---

## 1. A frase que parece suficiente

Uma product owner formula um pedido reconhecível:

> “Precisamos reduzir o número de tickets de suporte sobre cancelamento de assinatura.”

A dor é plausível. O time entende o sintoma. Ninguém consegue ainda dizer, com precisão, o que deve ser construído.

A intenção existe. A clareza não.

Essa situação é plausível em desenvolvimento assistido por agentes de IA: um prompt inicial pode gerar código funcional, enquanto a decisão de produto permanece implícita, distribuída entre conversas, logs e implementações acidentais. O risco não é apenas entregar a coisa errada. É entregar algo que ninguém consegue explicar, auditar ou evoluir meses depois.

---

## 2. Sintoma, necessidade, objetivo, requisito e solução

A frase inicial colapsa níveis que a Engenharia de Requisitos separa com cuidado [9][11–13].

| Nível | Exemplo no cenário | O que é | O que não é |
|---|---|---|---|
| **Sintoma / observação** | “Há muitos tickets de cancelamento” | Fato relatado (ainda não verificado) | Problema, requisito ou solução |
| **Necessidade / problema** | Usuários não conseguem encerrar a relação de forma previsível e justa | Condição a tratar | Design ou implementação |
| **Objetivo / outcome** | Reduzir tickets relacionados a cancelamento em X% em Y meses | Hipótese de resultado mensurável | Garantia de que a solução escolhida o produzirá |
| **Requisito** | O sistema deve permitir que um assinante ativo solicite cancelamento e perca o acesso ao final do ciclo vigente | Capacidade ou restrição verificável | Prova de valor de negócio |
| **Solução / design** | Botão no app + serviço de billing + e-mail de confirmação | Escolha de realização | A única forma possível de atender a necessidade |

Tratar “reduzir tickets” como requisito é um erro de categoria. É uma hipótese de outcome. Validá-la exige evidência externa (telemetria, experimento, série temporal), não apenas concordância na conversa.

---

## 3. Entendimento compartilhado versus validação de negócio

Aqui está a distinção central do enquadramento.

Uma conversa bem conduzida pode reduzir incerteza sobre o *entendimento compartilhado*: o que cada stakeholder quer dizer com “cancelamento bem-sucedido”, quais regras se aplicam, o que fica fora de escopo. Isso é elicitação e análise [9][14][15].

Isso **não** valida a hipótese de negócio. Não prova que a solução adotada reduzirá tickets, preservará receita ou atenderá obrigações regulatórias. Hipóteses de negócio exigem evidências externas. Requisitos exigem critérios verificáveis. Confundir os dois níveis é fonte clássica de falsa confiança [24][25].

No cenário sintético:

- Stakeholder confirma: “usuário mensal sem pendência perde acesso no fim do ciclo” → microvalidação de *entendimento*.
- Produto ainda precisa medir se essa regra, implementada, realmente reduz tickets de suporte → validação de *negócio*, externa à sessão de especificação.

---

## 4. Investigar antes de especificar

Em vez de pedir à IA “escreva a especificação do cancelamento”, a equipe usa a conversa como instrumento de investigação.

Perguntas típicas do cenário:

- O que conta como cancelamento bem-sucedido?
- Quem pode solicitar?
- O que acontece com o acesso imediatamente após o pedido?
- Existe reembolso proporcional? Em quais condições e jurisdições?
- Há casos em que o cancelamento deve ser bloqueado (fraude, pendência, período mínimo)?
- Quais dados precisam ser retidos e por quanto tempo?
- O que fica explicitamente fora de escopo nesta primeira entrega?

A literatura de elicitação mostra que stakeholders omitem tópicos espontaneamente e que ambiguidades frequentemente revelam conhecimento tácito [14][15]. Requisitos também evoluem durante a elicitação; parte do conteúdo posterior não era rastreável às ideias iniciais [16].

Um modelo de linguagem pode ajudar a manter o fio da conversa, sugerir candidatos a cenários e reformular trechos ambíguos. Ele não substitui a responsabilidade de quem tem autoridade sobre o produto, nem garante que os cenários sugeridos sejam os corretos ou completos.

---

## 5. Exemplos mínimos e microvalidação de entendimento

A equipe produz um primeiro exemplo deliberadamente estreito:

> Usuário ativo no plano mensal, sem pendências financeiras, solicita cancelamento pelo aplicativo → perde o acesso ao final do ciclo atual e recebe confirmação por e-mail.

O exemplo testa apenas se o entendimento básico está compartilhado. Quando o suporte aponta reativações frequentes, o exemplo é ampliado. Quando restrições legais ou antifraude entram na conversa, novos casos de fronteira aparecem.

Essa dinâmica corresponde a práticas como Example Mapping [18]: história, regras, exemplos, perguntas e fora de escopo. Ela corrige o *entendimento*. Não prova valor de negócio nem completude do domínio.

Duas microvalidações distintas devem permanecer separadas:

1. **Microvalidação de entendimento** — stakeholders concordam sobre o significado da regra e dos exemplos.
2. **Microvalidação de negócio / viabilidade** — evidência externa (dados, experimento, análise de risco) indica se a regra deve ser adotada, modificada ou abandonada.

---

## 6. Definição operacional provisória

**Vibe Spec-ing** é um *workflow humano–LLM, governado por artefatos e autoridade humana*, para elicitar, externalizar, testar e evoluir intenção de produto/sistema em requisitos e critérios verificáveis, mantendo explícitos contexto, escopo, fora de escopo, pressupostos, alternativas, decisões, perguntas abertas, proveniência e relações com design, tarefas, código, testes, implantação e observação.

O LLM pode perguntar, resumir, propor cenários, detectar conflitos aparentes, recuperar contexto e preparar mudanças. **Não recebe, por padrão, autoridade para decidir valor, risco, conformidade, aceitação ou verdade de domínio.**

### O que Vibe Spec-ing não é

1. Um método validado ou uma norma de Engenharia de Requisitos.
2. Substituto de ER, ISO/IEC/IEEE 29148, análise de domínio, segurança, arquitetura ou governança.
3. Validação de hipótese de negócio por aprovação conversacional.
4. Garantia de completude, correção, ausência de alucinação ou eliminação de drift.
5. SDD automaticamente entendido como “a spec é a fonte única da verdade”.
6. TDD, BDD ou Example Mapping com novo nome.
7. Autorização para o agente decidir produto, risco ou trade-offs.
8. Prova de produtividade, redução de defeitos, custo ou valor.

### Spec-first e spec-retrospectivo

| Modo | Finalidade | Risco epistemológico principal |
|---|---|---|
| **Spec-first** | Reduzir incerteza e alinhar intenção *antes* da implementação | Ancoragem precoce: a spec pode congelar uma interpretação ou invenção do modelo |
| **Spec-retrospectivo** | Reconstruir intenção, decisões e lacunas *após* código, logs ou incidentes | Pós-racionalização: o resumo pode tornar coerente o que foi acidental |

Os modos podem compor um ciclo, mas devem ser avaliados separadamente.

---

## 7. Modelo cíclico

O processo é um ciclo reversível, não um funil linear. Qualquer etapa pode retornar à anterior quando surge evidência conflitante, omissão, incidente ou mudança de autoridade.

```text
1. Intenção
   (sintoma → necessidade → objetivo hipotético)
        │
        ▼
2. Investigação
   (atores, fluxos, regras, exceções, NFRs, conflitos)
        │
        ▼
3. Pressupostos
   (fato / hipótese / desconhecido; o que falsificaria)
        │
        ▼
4. Exemplos e microvalidações
   (entendimento compartilhado ≠ validação de negócio)
        │
        ▼
5. Critérios verificáveis
   (requisitos com owner, oráculo e método)
        │
        ▼
6. Planejamento proporcional ao risco
        │
        ▼
7. Implementação e testes
        │
        ▼
8. Observação em produção
        │
        ▼
9. Revisão e reconsolidação ─────── (retorno a qualquer etapa)
```

Avanço só ocorre quando a condição de avanço da etapa é satisfeita e a autoridade competente registra a decisão. Retorno é o comportamento esperado, não falha.

---

## 8. Papéis distintos dos artefatos e política de divergência

Não existe fonte única universal de verdade. Intenção, especificação, testes, código e produção desempenham papéis diferentes.

| Artefato | Autoridade principal | O que decide | O que não garante |
|---|---|---|---|
| Intenção / rationale | Produto e stakeholders de valor | Porquê, trade-offs, alternativas rejeitadas, risco aceito | Correção da hipótese de negócio |
| Especificação / requisito | Engenharia de requisitos + owner de domínio/produto | Escopo, restrições, capacidades e critérios verificáveis | Que o código esteja conforme sem verificação |
| Design / ADR | Engenharia / arquitetura | Como realizar, dentro dos limites aprovados | Que a necessidade esteja correta |
| Teste / oráculo | QA + domínio quando necessário | O que será verificado e como | Completude do domínio ou valor |
| Código / deploy | Engenharia / ops sob gates | Realização atual | Preservação automática da intenção |
| Produção / telemetria | Operação + produto + risco | O que ocorreu | Explicação causal sem análise |
| LLM / agente | Nenhuma autoridade substantiva por padrão | Propor, recuperar, transformar dentro do escopo | Aprovar valor, risco, compliance ou verdade |

### Política de divergência (mínima)

1. Cada conflito recebe estado explícito: `não conhecido`, `ambíguo`, `spec desatualizada`, `teste sem requisito`, `código fora da spec`, `produção divergente`, `risco aceito`, `bloqueado` ou `resolvido`.
2. Conflito de valor/escopo → owner de produto.  
   Conflito de domínio/regulação → especialista autorizado.  
   Conflito de implementação → engenharia.  
   Conflito de oráculo → engenharia + domínio.  
   Conflito de segurança → função independente de risco.
3. Toda decisão registra solicitante, data, evidência, alternativas, impacto, autoridade, artefatos afetados e verificação posterior.
4. O agente nunca harmoniza silenciosamente versões conflitantes. Se não puder provar a relação, registra `não conhecido` ou propõe link com status `inferido`.

### Proveniência mínima

Cada artefato relevante deve carregar: origem, transcrição/resumo/prompt (quando usados), modelo e configuração, transformação (quem produziu/revisou), decisão humana, aprovação e links tipados (`satisfaz`, `depende-de`, `evolui-de`, `justifica`, `verifica`, `implementa`, `contradiz`).

W3C PROV-DM oferece um modelo para entidades, atividades e agentes [31], mas não captura automaticamente fatos nem garante verdade.

---

## 9. Sustentabilidade observável

Sucesso não se resume a código que passa nos testes de hoje. Uma solução sustentável precisa tornar observáveis pelo menos quatro capacidades:

1. **Rastreabilidade** entre requisito, critério, teste e implementação [26][27][28].
2. **Facilidade de mudança** quando regras, canais ou políticas se alteram.
3. **Observabilidade operacional** — métricas, logs e alertas que permitam detectar desvios.
4. **Explicabilidade** — capacidade de reconstruir, meses depois, por que determinada decisão foi tomada e quais alternativas foram rejeitadas.

Essas propriedades não surgem automaticamente de texto fluente. Dependem de disciplina de registro, versionamento, proveniência e revisão.

---

## 10. Relação com ER, BDD, SDD e TDD

| Abordagem | Unidade principal | O que oferece | O que não garante | Relação com Vibe Spec-ing |
|---|---|---|---|---|
| **ER / 29148 / SWEBOK** | Necessidades, requisitos, validação e gestão | Processo, atributos, rastreabilidade e mudança | Não prova que LLM ou este workflow funciona | Baseline disciplinar; Vibe Spec-ing é orquestração possível *dentro* dela |
| **BDD / SBE / Example Mapping** | Conversa, regras, exemplos e aceitação | Ponte legível entre intenção e comportamento selecionado | Completude, valor de negócio ou oráculos corretos | Técnicas utilizáveis no estágio de exemplos |
| **SDD** | Spec antes/ao redor da geração | Organiza spec, plano, tarefas e código | Rótulo semanticamente instável; não elimina drift | Vibe Spec-ing pode alimentar SDD, declarando se a spec é first, anchored ou source [33] |
| **TDD** | Comportamento codificado e teste executável | Feedback local e regressão sobre o oráculo escolhido | Não descobre intenção, valor ou requisitos ausentes | Camada posterior/adjacente; não concorrente |

O termo só agrega valor se especificar entradas, estados, gates, tipos de artefato, autoridade, proveniência, política de divergência, métricas e limites. “Conversa com IA que gera uma spec” não é contribuição suficiente.

---

## 11. O que a literatura permite dizer (e o que não permite)

**Componentes com evidência parcial ou relacionada:**

- Ambiguidade e conhecimento tácito em entrevistas [14][15].
- Evolução de requisitos durante a elicitação [16].
- Capacidade parcial de LLMs em tarefas controladas de elicitação e geração de SRS, com falhas em domínio, interfaces e restrições [20][21][22].
- Rastreabilidade associada, em alguns contextos, a menor taxa de defeitos (associação, não causalidade universal) [28].
- TDD: efeito médio pequeno em qualidade e pouco efeito discernível em produtividade; resultados dependem de tarefa e complexidade [34][35].
- Produtividade de assistentes de código: resultados divergentes entre experimentos [38][39][40].

**O que ainda não existe:**

- Estudo controlado ou longitudinal do *workflow completo* de Vibe Spec-ing frente a baseline humana/híbrida alinhada à 29148, medindo completude, correção, drift, retrabalho, defeitos, custo total e outcomes de produto.

Portanto, qualquer alegação de eficácia do workflow completo permanece hipótese.

---

## 12. Protocolo de avaliação (sem pressupor resultado)

Hipóteses pré-registráveis (exemplos):

- **H1** — Qualidade de especificação: aumento de recall de necessidades, restrições e exceções sem perda de precisão, contra baseline equivalente.
- **H2** — Ambiguidade e adjudicação: redução de ambiguidade residual ou do tempo até decisão autorizada (com possível aumento de ancoragem ou custo de revisão).
- **H3** — Rastreabilidade: melhoria de cobertura e/ou precisão de links pré e pós-especificação.
- **H4** — Implementação: critérios do workflow melhoram detecção de defeitos por testes ocultos, não apenas green tests escolhidos pelo agente.
- **H5–H8** — Manutenção, operação, negócio e risco de uso: direção do efeito *não* é pressuposta; deve ser medida.

**Baseline obrigatória:** processo humano/híbrido alinhado a 29148/SWEBOK, com o mesmo contexto, stakeholders e exigência de revisão.

**Métricas mínimas:** recall ponderado por risco contra gold set independente, precisão de afirmações, ambiguidade residual, cobertura e validade semântica de links, defeitos em testes ocultos, tempo e custo de mudança, overreliance e custo total (inferência + revisão + retrabalho + operação).

**Critério de interpretação em níveis:**

1. Capacidade do agente sob configuração fixa.
2. Qualidade do artefato contra fontes e oráculos independentes.
3. Resultado da tarefa (custo, defeitos, revisão).
4. Resultado operacional (releases, incidentes, manutenção).
5. Resultado de negócio sob desenho causal ou quase-causal.

Passar de um nível para o seguinte exige nova evidência. Não é permitido usar o nível inferior como prova do superior.

---

## 13. Conclusão calibrada

O cenário de cancelamento de assinatura é uma sequência ilustrativa proposta, não um caso validado. Ele torna visível uma progressão recorrente em muitas iniciativas:

- uma intenção que parece suficiente;
- a descoberta de sua insuficiência;
- a redução de incerteza sobre o entendimento compartilhado;
- a formalização gradual de critérios verificáveis;
- a construção incremental sob política explícita de divergência;
- a preservação da capacidade de compreender, modificar e operar o sistema ao longo do tempo.

A especificação conversacional não elimina a necessidade de pensamento crítico, validação empírica nem engenharia. Ela pode, quando disciplinada por artefatos, autoridade e proveniência, reduzir a perda de contexto entre a conversa inicial e o software que permanece em produção.

Sua eficácia em completude, correção, drift, retrabalho, defeitos, custo total e valor de negócio permanece em aberto. Até que avaliações pré-registradas com baseline profissional, gold set independente e follow-up longitudinal sejam publicadas, a formulação correta é:

> **Vibe Spec-ing é uma hipótese de workflow humano–LLM para tornar decisões, incertezas e links mais explícitos e governáveis. Sua utilidade prática e seu efeito sobre o ciclo de vida do software ainda precisam ser demonstrados.**

---

## Referências

[1] Issei, M. Y. Formulação de Problemas — Engenharia Interrompida. https://mauricio.issei.com.br/formulacao-de-problemas.html (página autoral).

[2] Issei, M. Y. Vibe Coding com Devin — De Executor a Orquestrador Cognitivo. https://mauricio.issei.com.br/devin.html (página autoral).

[3] Issei, M. Y. Arquitetura de IA auditável. https://mauricio.issei.com.br/apresentacao (página autoral).

[4] Issei, M. Y. A Engenharia da Confiança — Da Intenção à Execução Agêntica. https://mauricio.issei.com.br/engenharia-confianca.html (página autoral).

[5] Issei, M. Y. Case Agents. https://github.com/issei/case-agents (repositório autoral; benchmark de MVP).

[7] Rittel, H. W. J. & Webber, M. M. Dilemmas in a General Theory of Planning. *Policy Sciences*, 1973. https://doi.org/10.1007/BF01405730

[8] Heath, A. et al. Calculating Expected Value of Sample Information Adjusting for Imperfect Implementation. 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9189720/

[9] ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering. https://standards.ieee.org/standard/29148-2018.html

[10] Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0/4.0a. https://ieeecs-media.computer.org/media/education/swebok/swebok-v4.pdf

[11] NASA Systems Engineering Handbook — Stakeholder Expectations Definition. https://www.nasa.gov/reference/4-1-stakeholder-expectations-definition/

[12] NASA Systems Engineering Handbook — Technical Requirements Definition. https://www.nasa.gov/reference/4-2-technical-requirements-definition/

[13] NASA. Appendix C: How to Write a Good Requirement. https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/

[14] Ferrari, A., Spoletini, P. & Gnesi, S. Ambiguity and tacit knowledge in requirements elicitation interviews. *Requirements Engineering*, 2016. https://doi.org/10.1007/s00766-016-0249-3

[15] Burnay, C., Jureta, I. J. & Faulkner, S. What Stakeholders Will or Won’t Say. *Information Systems*, 2014. https://doi.org/10.1016/j.is.2014.05.006

[16] Ferrari, A., Spoletini, P. & Debnath, S. How do requirements evolve during elicitation? *Requirements Engineering*, 2022. https://doi.org/10.1007/s00766-022-00383-7

[17] Rueda, S., Panach, J. I. & Distante, D. Requirements elicitation methods based on interviews in comparison. *Information and Software Technology*, 2020. https://doi.org/10.1016/j.infsof.2020.106361

[18] Cucumber. Example Mapping. https://cucumber.io/docs/bdd/example-mapping/

[19] Montgomery, L. et al. Empirical Research on Requirements Quality: A Systematic Mapping Study. 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9110500/

[20] Ronanki, K., Berger, C. & Horkoff, J. Investigating ChatGPT’s Potential to Assist in Requirements Elicitation Processes. 2023. https://arxiv.org/abs/2307.07381

[21] Krishna, R. et al. Using LLMs in Software Requirements Specifications: An Empirical Evaluation. 2024. https://arxiv.org/abs/2404.17842

[22] Bashir, S. et al. Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study. 2025. https://www.ipr.mdu.se/pdf_publications/7221.pdf

[23] Zadenoori, M. et al. Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review. 2025. https://arxiv.org/abs/2509.11446 (preprint).

[24] NIST. Artificial Intelligence Risk Management Framework (AI RMF 1.0). 2023. https://doi.org/10.6028/NIST.AI.100-1

[25] NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile. 2024. https://doi.org/10.6028/NIST.AI.600-1

[26] Gotel, O. & Finkelstein, A. An Analysis of the Requirements Traceability Problem. 1994. https://doi.org/10.1109/ICRE.1994.292398

[27] Ramesh, B. & Jarke, M. Toward Reference Models for Requirements Traceability. *IEEE TSE*, 2001. https://doi.org/10.1109/32.895989

[28] Rempel, P. & Mäder, P. Preventing Defects: The Impact of Requirements Traceability Completeness on Software Quality. *IEEE TSE*, 2017. https://doi.org/10.1109/TSE.2016.2622264

[29] Fucci, D., Alégroth, E. & Axelsson, T. When Traceability Goes Awry: An Industrial Experience Report. *Journal of Systems and Software*, 2022. https://doi.org/10.1016/j.jss.2022.111389

[30] Mucha, J., Kaufmann, A. & Riehle, D. A Systematic Literature Review of Pre-Requirements Specification Traceability. *Requirements Engineering*, 2024. https://doi.org/10.1007/s00766-023-00412-z

[31] Moreau, L., Missier, P. et al. PROV-DM: The PROV Data Model. W3C Recommendation, 2013. https://www.w3.org/TR/prov-dm/

[32] Jayatilleke, S. & Lai, R. A Systematic Review of Requirements Change Management. *Information and Software Technology*, 2018. https://doi.org/10.1016/j.infsof.2017.09.004

[33] Böckeler, B. / Thoughtworks. Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl. 2025. https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html

[34] Rafique, Y. & Mišić, V. B. The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis. *IEEE TSE*, 2013. https://doi.org/10.1109/TSE.2012.28

[35] Tosun, A. et al. An industry experiment on the effects of test-driven development on external quality and productivity. *Empirical Software Engineering*, 2017. https://doi.org/10.1007/s10664-016-9490-0

[36] Liu, J. et al. Is Your Code Generated by ChatGPT Really Correct? (EvalPlus). 2023. https://arxiv.org/abs/2305.01210

[37] DORA. Software delivery performance metrics. https://dora.dev/guides/dora-metrics/

[38] Peng, S. et al. The Impact of AI on Developer Productivity: Evidence from GitHub Copilot. 2023. https://arxiv.org/abs/2302.06590

[39] Cui, Z. et al. The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers. 2025.

[40] Becker, J. et al. Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. 2025. https://arxiv.org/abs/2507.09089

[42] Model Context Protocol Specification, 2025-06-18. https://modelcontextprotocol.io/specification/2025-06-18

[43] Zillow Group, Inc. Form 10-K for fiscal year 2021. SEC. https://www.sec.gov/Archives/edgar/data/1617640/000161764022000013/z-20211231.htm

[44] ISO/IEC/IEEE 15939:2017 — Systems and software engineering — Measurement process.

[45] ISO/IEC 25010:2023 — Systems and software Quality Requirements and Evaluation — Product quality model.

[48] GitHub. Spec-driven development with AI: Get started with a new open-source toolkit. https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
