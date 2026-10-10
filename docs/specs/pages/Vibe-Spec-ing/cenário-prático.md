# Cenário prático: Modernização de um sistema legado

## 1. A demanda inicial

Uma empresa possui um sistema de gestão comercial desenvolvido há mais de 15 anos. Ele controla propostas, condições comerciais, aprovações, contratos e integração com o faturamento.

O sistema continua operando, mas apresenta problemas:

- Alterações simples demoram semanas.
- Poucos profissionais compreendem todas as regras de negócio.
- Incidentes recorrentes exigem correções emergenciais.
- A documentação está desatualizada.
- Novas integrações dependem de adaptações arriscadas.

A diretoria solicita:

> “Precisamos modernizar esse sistema, migrando para uma arquitetura mais atual, sem interromper a operação e sem perder as regras de negócio existentes.”

## 2. A primeira interpretação

A equipe de tecnologia propõe reescrever o sistema utilizando uma arquitetura moderna, APIs e serviços independentes.

A proposta parece razoável, mas ainda existem questões fundamentais:

- Quais funcionalidades são realmente utilizadas?
- Quais regras de negócio continuam válidas?
- Existem comportamentos conhecidos apenas pelos usuários?
- Quais integrações dependem de particularidades do sistema atual?
- Quais inconsistências são defeitos e quais representam regras intencionais?
- Como comprovar que o sistema novo preserva os comportamentos necessários?

A demanda descreve uma direção tecnológica, mas não define completamente o problema nem os critérios de sucesso.

## 3. Investigando antes de especificar

A equipe inicia conversas com usuários, analistas de negócio, suporte e responsáveis pelas integrações.

Durante a investigação, identifica que propostas comerciais podem receber descontos excepcionais conforme o perfil do cliente, a região e o histórico de negociação.

Parte dessas regras não está documentada. Algumas existem apenas em rotinas antigas; outras são conhecidas pelos profissionais que operam o sistema.

A equipe também descobre que determinados erros recorrentes são contornados manualmente, enquanto outros representam falhas que precisam ser corrigidas.

O objetivo deixa de ser simplesmente reproduzir o sistema atual. É necessário distinguir o comportamento que precisa ser preservado daquele que deve ser corrigido ou descontinuado.

## 4. Transformando dúvidas em exemplos verificáveis

Em vez de documentar todas as funcionalidades antecipadamente, a equipe escolhe um fluxo comercial representativo: a aprovação de uma proposta com desconto excepcional.

O fluxo é detalhado por meio de exemplos:

- Uma proposta dentro do limite padrão pode ser aprovada automaticamente.
- Uma proposta acima do limite exige aprovação de um responsável autorizado.
- Uma proposta com dados incompletos não pode avançar.
- Uma alteração no valor após a aprovação pode exigir nova avaliação.

Ao validar esses exemplos com os responsáveis pelo negócio, a equipe identifica divergências entre a documentação, o comportamento observado no sistema e as expectativas atuais.

Cada divergência passa a ter uma classificação e uma decisão explícita: preservar, corrigir, substituir ou investigar.

## 5. Construindo uma especificação evolutiva

A equipe registra o entendimento consolidado em artefatos com responsabilidades distintas:

| Artefato                          | Responsabilidade                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Contexto e objetivos              | Explicar por que a modernização é necessária e quais resultados são esperados.    |
| Regras de negócio                 | Registrar as políticas e restrições aprovadas pelos responsáveis.                 |
| Exemplos e critérios de aceitação | Definir comportamentos esperados, incluindo exceções.                             |
| Testes de caracterização          | Capturar comportamentos relevantes do sistema existente.                          |
| Testes de regressão               | Verificar se as mudanças preservam os comportamentos que devem continuar válidos. |
| Contratos de integração           | Definir as interações que precisam permanecer compatíveis.                        |
| Registro de decisões              | Explicar as escolhas realizadas, suas justificativas e seus impactos.             |

Os artefatos evoluem à medida que novas regras são descobertas. Uma decisão ainda não validada permanece identificada como pendência, em vez de ser convertida silenciosamente em requisito.

## 6. Implementando de forma incremental

A equipe seleciona um fluxo de negócio e implementa sua nova versão sem substituir todo o sistema de uma vez.

O processo inclui:

1. Identificar e documentar os comportamentos relevantes do fluxo atual.
2. Validar as regras com os responsáveis pelo negócio.
3. Definir os critérios de aceitação e os testes.
4. Implementar o fluxo na nova arquitetura.
5. Comparar os resultados do sistema novo com os comportamentos esperados.
6. Investigar divergências e registrar as decisões.
7. Liberar a mudança gradualmente, com monitoramento e possibilidade de reversão.

Durante a comparação, um caso revela que o sistema antigo permite uma condição comercial que não consta da documentação. A equipe não reproduz nem elimina esse comportamento automaticamente: investiga sua origem, consulta o responsável pela política comercial e registra a decisão antes de concluir a implementação.

## 7. Avaliando a evolução

A modernização passa a ser acompanhada por indicadores técnicos e operacionais:

- Quantidade de regras de negócio críticas identificadas e validadas.
- Cobertura dos fluxos e das exceções relevantes por testes.
- Número e gravidade de divergências entre o comportamento esperado e o implementado.
- Tempo necessário para compreender e implementar uma mudança.
- Frequência de incidentes e necessidade de correções emergenciais.
- Capacidade de rastrear uma decisão de negócio até os critérios, testes e componentes afetados.

A equipe não considera a migração concluída apenas porque o código foi reescrito ou a nova arquitetura está implantada. A conclusão depende também da preservação ou revisão explícita das regras necessárias, da compatibilidade acordada e da capacidade de operar e evoluir a solução.

## 8. Resultado esperado

A empresa deixa de tratar a modernização como uma substituição tecnológica isolada e passa a conduzi-la como um processo contínuo de descoberta, decisão, especificação, implementação e validação.

A equipe não precisa compreender integralmente o sistema legado antes de começar. Precisa, porém, tornar explícitas as incertezas relevantes, validar os comportamentos críticos e registrar as decisões que orientam cada etapa.

A especificação funciona como uma representação evolutiva do entendimento compartilhado entre negócio e engenharia. Os testes fornecem evidências sobre comportamentos específicos, enquanto a observabilidade e o acompanhamento operacional permitem verificar se a solução continua atendendo às necessidades reais.

O objetivo não é reproduzir indiscriminadamente o passado, mas construir uma solução que preserve o que ainda é necessário, corrija o que foi identificado como inadequado e permaneça compreensível e modificável ao longo do tempo.