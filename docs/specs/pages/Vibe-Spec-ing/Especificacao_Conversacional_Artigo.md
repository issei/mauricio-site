# Especificação Conversacional Estruturada na Era dos Agentes de IA

## Engenharia da intenção sob governança humana

### Introdução — produzir código ficou mais fácil; preservar a intenção continua sendo um desafio

Agentes de IA podem interpretar instruções, consultar arquivos, propor alterações, gerar código e executar testes. Essa capacidade reduz o esforço de implementação, mas não garante que a solução corresponda ao problema que deveria resolver.

Em sistemas legados, parte do conhecimento de negócio está distribuída entre código, integrações, documentação desatualizada e experiência dos profissionais. A modernização exige descobrir quais comportamentos devem ser preservados, quais precisam ser corrigidos e quais perderam sua finalidade.

Com agentes capazes de executar sequências de tarefas, uma interpretação incompleta pode se propagar por vários artefatos antes de ser percebida. O problema não é apenas gerar código incorreto. É transformar uma interpretação ainda não validada em uma implementação aparentemente consistente.

A proposta deste artigo é explorar um workflow de **Especificação Conversacional Estruturada**: utilizar modelos de linguagem como apoio à elicitação, análise e formalização de requisitos, mantendo explícitas as fontes de informação, as incertezas, as decisões humanas e os critérios de verificação.

O termo designa aqui um enquadramento de trabalho proposto, não uma metodologia consolidada nem um processo cuja eficácia global já tenha sido demonstrada.

O exemplo é a modernização de um sistema de gestão comercial com mais de quinze anos. O sistema controla propostas, condições comerciais, aprovações, contratos e integrações com o faturamento. Alterações demoram semanas, incidentes exigem correções emergenciais e poucas pessoas conhecem todas as regras.

A diretoria apresenta a demanda:

> “Precisamos modernizar esse sistema, migrando para uma arquitetura mais atual, sem interromper a operação e sem perder as regras de negócio existentes.”

A frase expressa uma intenção legítima. Ainda não define, porém, o que precisa ser preservado, o que deve mudar nem como o sucesso será avaliado.

### 1. Descobrir o problema antes de comprometer a solução

A demanda reúne elementos diferentes:

- **Sintomas:** alterações demoradas, incidentes recorrentes e dependência de conhecimento especializado.
- **Necessidades a investigar:** reduzir o custo e o risco das mudanças e diminuir a dependência de conhecimento tácito.
- **Objetivos declarados:** modernizar sem interromper a operação nem perder regras necessárias.
- **Solução pressuposta:** adotar uma arquitetura mais atual.

Essas categorias não são equivalentes. A necessidade precisa ser investigada; a solução tecnológica precisa ser avaliada; e os resultados esperados precisam ser definidos de forma verificável.

A equipe começa conversando com usuários, analistas de negócio, suporte e responsáveis pelas integrações. Em paralelo, examina o código, os dados disponíveis, os incidentes e os contratos existentes.

O objetivo não é pedir ao modelo que escreva imediatamente uma especificação completa. É usá-lo para ampliar a investigação: sugerir perguntas, identificar contradições, organizar hipóteses e propor casos que possam revelar lacunas no entendimento.

A investigação descobre, por exemplo, que propostas comerciais podem receber descontos excepcionais conforme o perfil do cliente, a região e o histórico de negociação. Algumas regras estão no código; outras são conhecidas pelos operadores; e outras aparecem apenas em documentos antigos.

Surge uma distinção decisiva: **o comportamento atual do sistema não é necessariamente o comportamento desejado**.

Uma regra pode precisar ser preservada, corrigida, substituída ou descontinuada. A decisão depende de evidências e de autoridade de negócio, não apenas daquilo que o código executa hoje.

Essa abordagem é compatível com atividades tradicionais de elicitação, análise, validação e gestão de requisitos descritas na ISO/IEC/IEEE 29148 e no SWEBOK. A contribuição proposta não é substituir essas práticas, mas explorar como a IA pode apoiá-las.

### 2. Transformar incertezas em exemplos verificáveis

Em vez de tentar compreender todo o sistema antes de iniciar, a equipe escolhe um fluxo representativo: a aprovação de uma proposta com desconto excepcional.

A partir dele, constrói exemplos:

- Uma proposta dentro do limite de desconto pode ser aprovada automaticamente.
- Uma proposta acima do limite exige aprovação de uma pessoa autorizada e registro da justificativa.
- Uma proposta com dados obrigatórios incompletos não pode avançar.
- Uma alteração no valor após a aprovação pode exigir nova avaliação, conforme a regra aplicável.
- Uma condição comercial pode ser inválida quando determinados critérios de risco forem atendidos.

Esses exemplos são hipóteses de trabalho até serem confirmados pelos responsáveis pelo negócio. O modelo pode sugerir casos adicionais, mas não pode transformar suas próprias sugestões em regras aprovadas.

A validação revela divergências entre a documentação, o comportamento observado e as expectativas atuais.

Cada divergência é registrada com sua origem, seu impacto, a decisão pendente e o responsável por resolvê-la.

| Situação identificada | Tratamento proposto |
|---|---|
| Comportamento intencional e ainda válido | Preservar e documentar |
| Defeito conhecido | Corrigir com aprovação e testes |
| Regra obsoleta | Descontinuar mediante decisão explícita |
| Informação insuficiente | Investigar e manter a pendência visível |
| Dependência de integração | Definir compatibilidade e estratégia de transição |

O avanço não depende de eliminar toda a incerteza. Depende de identificar quais incertezas impedem uma decisão segura e quais podem ser aceitas temporariamente, com responsáveis e riscos registrados.

É importante distinguir dois resultados. A conversa pode esclarecer se os participantes compartilham o mesmo entendimento de uma regra. Isso é validação do entendimento. Não demonstra, por si só, que a modernização reduzirá incidentes ou tempo de mudança. Esses resultados exigem medição operacional.

### 3. Estabelecer um protocolo de elicitação assistida por IA

A contribuição do modelo só é útil quando suas saídas podem ser examinadas e contestadas.

O protocolo proposto tem cinco práticas:

1. **Registrar a origem das afirmações.** Diferenciar entrevista, documentação, inspeção de código, observação operacional, inferência e decisão formal.
2. **Separar fatos, hipóteses e propostas.** Uma resposta plausível do modelo não constitui evidência de que uma regra existe.
3. **Manter as pendências visíveis.** Toda incerteza relevante deve permanecer aberta até ser resolvida ou aceita explicitamente como risco.
4. **Usar exemplos e contraexemplos.** Regras críticas precisam ser examinadas em situações normais, limites e exceções pertinentes.
5. **Exigir revisão proporcional ao risco.** Decisões comerciais, regulatórias e de integração crítica precisam de validação por pessoas com autoridade e conhecimento adequados.

O protocolo não exige que toda frase seja submetida a um processo burocrático. Exige que a equipe consiga distinguir o que sabe, o que supõe e o que decidiu.

#### Matriz de autoridade

| Decisão | Autoridade primária | Contribuição possível da IA |
|---|---|---|
| Valor e prioridade de negócio | Produto e negócio | Comparar alternativas e impactos |
| Preservar ou alterar regras comerciais | Responsáveis pelo domínio | Identificar ambiguidades e casos-limite |
| Critérios de aceitação | Negócio e engenharia | Propor formulações e exemplos de teste |
| Arquitetura | Engenharia responsável | Sugerir alternativas e trade-offs |
| Compatibilidade de integrações | Engenharia e responsáveis pelas integrações | Mapear contratos e possíveis impactos |
| Aceitação de risco residual | Responsáveis formalmente designados | Identificar cenários e apoiar a análise |
| Redação e organização da especificação | Equipe responsável, com revisão | Estruturar e reformular conteúdo |

Essa matriz é uma política de governança proposta, não uma exigência universal de uma norma. Sua aplicação deve respeitar a estrutura de responsabilidade da organização.

Quando um agente também executa ferramentas, altera arquivos ou aciona pipelines, os controles precisam abranger permissões, escopo de execução, revisão de mudanças e condições de interrupção. Gerar uma sugestão e executar uma ação são níveis diferentes de autonomia.

### 4. Dar papéis distintos aos artefatos

Não existe um artefato que, isoladamente, garanta que a intenção original foi preservada.

A especificação pode estar incompleta. Os testes podem cobrir apenas parte das regras. O código pode executar uma interpretação equivocada. A observação em produção pode revelar situações não previstas.

A resposta prática é definir responsabilidades diferentes para cada artefato e estabelecer como as divergências serão resolvidas.

| Artefato | Responsabilidade | Limite |
|---|---|---|
| Contexto e objetivos | Registrar o problema e os resultados esperados | Não comprova que a solução alcançará os resultados |
| Regras de negócio | Registrar políticas aprovadas | Não garante a implementação correta |
| Exemplos e critérios de aceitação | Expressar comportamentos esperados | Não garantem a completude do domínio |
| Testes de caracterização | Registrar comportamentos observados no legado | Podem capturar defeitos e regras obsoletas |
| Testes de aceitação e regressão | Verificar comportamentos selecionados | Não comprovam todas as propriedades do sistema |
| Contratos de integração | Definir compatibilidade esperada | Não eliminam todos os riscos de evolução |
| Registros de decisão | Preservar justificativas e alternativas consideradas | Não garantem que uma decisão continuará adequada |
| Código | Implementar o comportamento em uma versão específica | Não comprova, por si só, aderência à intenção |

A rastreabilidade conecta decisões e regras relevantes aos critérios, testes e componentes afetados. Na direção inversa, uma falha de teste ou um comportamento observado pode conduzir à regra ou decisão que precisa ser revisada.

A profundidade dessa rastreabilidade deve ser proporcional à criticidade, ao custo de mudança e às exigências de auditoria.

#### Política de divergência

Quando dois artefatos entram em conflito, a equipe precisa de um procedimento explícito:

1. Identificar os artefatos e o comportamento divergente.
2. Classificar a causa provável: informação incompleta, defeito, mudança de regra, obsolescência ou erro de implementação.
3. Identificar quem tem autoridade para decidir.
4. Registrar a decisão, sua justificativa, seu impacto e os artefatos afetados.
5. Atualizar os registros pertinentes e executar novamente as verificações aplicáveis.

Por exemplo, se um teste de caracterização revela que o sistema legado permite um desconto que a política atual proíbe, o teste não deve obrigar a nova implementação a reproduzir o comportamento. Ele fornece evidência sobre o legado; a decisão de negócio define o comportamento desejado.

Da mesma forma, se o novo código não satisfaz um critério aprovado, a equipe deve investigar a divergência. A alteração do critério exige uma decisão explícita, não apenas a modificação do teste para fazê-lo passar.

O objetivo não é impedir toda divergência, mas torná-la detectável, explicável e tratável.

### 5. Conectar especificação, testes e implementação

A especificação conversacional estruturada e o Test-Driven Development atuam em níveis complementares.

A primeira apoia a descoberta e a formalização do comportamento esperado. O TDD orienta ciclos curtos de desenvolvimento guiados por testes. Os testes de aceitação verificam aspectos do comportamento acordado; os testes de caracterização ajudam a entender e acompanhar o comportamento existente.

No fluxo de aprovação de propostas, a sequência pode ser:

1. **Caracterizar o legado.** Registrar comportamentos relevantes do fluxo atual, sem pressupor que sejam corretos.
2. **Validar as regras.** Definir com os responsáveis quais comportamentos devem ser preservados, corrigidos ou removidos.
3. **Construir testes de aceitação.** Traduzir os critérios aprovados em verificações executáveis quando viável.
4. **Implementar incrementalmente.** Aplicar TDD nos níveis adequados e verificar os contratos entre componentes.
5. **Comparar os resultados.** Investigar diferenças entre o comportamento observado e o esperado.
6. **Liberar com controles operacionais.** Monitorar a mudança, definir critérios de interrupção e preservar uma estratégia de reversão apropriada.

A distinção essencial é que os testes verificam condições específicas. Não descobrem automaticamente a intenção de negócio nem garantem que todos os requisitos importantes tenham sido identificados.

A qualidade dos testes depende da qualidade dos critérios, da cobertura dos cenários relevantes e da independência entre a definição do comportamento esperado e sua implementação.

### 6. Avaliar a sustentabilidade da modernização

Uma modernização não está concluída apenas porque o código foi reescrito ou a nova arquitetura entrou em produção.

O processo precisa produzir evidências de que as regras críticas foram compreendidas, as decisões são recuperáveis e a solução pode continuar evoluindo.

Indicadores possíveis incluem:

- Proporção de regras críticas identificadas e validadas.
- Cobertura dos fluxos e das exceções prioritárias por verificações adequadas.
- Quantidade e gravidade de divergências encontradas durante a migração.
- Tempo e esforço necessários para implementar mudanças representativas.
- Incidentes, regressões e correções emergenciais após a liberação.
- Capacidade de rastrear uma alteração até as regras, decisões e testes afetados.
- Tempo necessário para reconstruir a justificativa de uma decisão antiga.

Esses indicadores precisam de definições operacionais, uma linha de base e um período de observação. A existência de mais documentos ou testes não prova, isoladamente, que a modernização se tornou mais sustentável.

Também é necessário distinguir indicadores de processo de resultados de negócio. A rastreabilidade pode facilitar a investigação de uma mudança; somente a avaliação do trabalho real permitirá verificar se ela reduziu o esforço ou o risco.

### Conclusão — tornar a intenção examinável

Na modernização de um sistema legado, o desafio não é simplesmente reproduzir o comportamento existente. É descobrir o que esse comportamento significa, decidir o que deve permanecer e verificar se a nova implementação corresponde às decisões tomadas.

Agentes de IA podem apoiar essa atividade ao formular perguntas, comparar interpretações, gerar exemplos, organizar evidências e auxiliar na produção de artefatos. Também podem propagar erros e suposições quando suas saídas são aceitas sem verificação.

A Especificação Conversacional Estruturada propõe um workflow para enfrentar esse problema:

- investigar a demanda antes de comprometer a solução;
- distinguir fatos, hipóteses, propostas e decisões;
- converter regras relevantes em exemplos e critérios verificáveis;
- atribuir papéis distintos aos artefatos;
- estabelecer autoridade e procedimentos para resolver divergências;
- verificar a implementação e acompanhar os resultados operacionais.

A proposta não substitui a engenharia de requisitos, os testes, a arquitetura ou a governança. Busca conectá-los em um fluxo no qual o entendimento possa evoluir sem perder sua origem e suas justificativas.

Sua eficácia global permanece uma hipótese. Para demonstrar que o workflow reduz retrabalho, incidentes ou tempo de mudança, será necessário avaliá-lo em contextos reais, com métricas definidas, comparação adequada e registro das limitações.

Na era dos agentes de IA, produzir uma implementação é apenas uma parte do trabalho. A outra é preservar a capacidade de explicar por que ela existe, quais decisões representa e como verificar se continua atendendo ao propósito definido.

---

### Referências essenciais

- **ISO/IEC/IEEE.** ISO/IEC/IEEE 29148:2018 — *Systems and software engineering — Life cycle processes — Requirements engineering*. Norma de referência para processos e artefatos de engenharia de requisitos.
- **IEEE Computer Society.** *Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0a*. Consultar especialmente a área de conhecimento de requisitos de software.
- **Autio, C. et al.** (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*. NIST AI 600-1. DOI: 10.6028/NIST.AI.600-1.
- **Hou, X. et al.** (2024). *Large Language Models for Software Engineering: A Systematic Literature Review*. ACM Transactions on Software Engineering and Methodology, 33(8), artigo 220. DOI: 10.1145/3695988.
- **Norheim, J. J. et al.** (2024). *Challenges in applying large language models to requirements engineering tasks*. Design Science, 10, e16.
- **Feathers, M. C.** (2004). *Working Effectively with Legacy Code*. Prentice Hall.
- **Beck, K.** (2002). *Test-Driven Development: By Example*. Addison-Wesley.