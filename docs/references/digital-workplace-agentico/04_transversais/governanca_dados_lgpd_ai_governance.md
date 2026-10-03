---
titulo: Governança de dados, LGPD e AI governance em plataformas orientadas a agentes — classificação, lineage, retenção e explicabilidade
modulo: Transversal — Security & Governance
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [governanca, lgpd, ai-governance, classificacao-de-dados, lineage, retencao, ilm, explicabilidade, nist-ai-rmf, iso-42001, decisao-automatizada]
---

# Governança de dados, LGPD e AI governance em plataformas orientadas a agentes

Este arquivo responde como manter governança quando conteúdo, respostas e até ações passam a ser produzidos ou orquestrados dinamicamente por agentes. Ele cobre classificação de dados, base legal, lineage de respostas, retenção e ILM de artefatos derivados, explicabilidade, qualidade de dados e frameworks de governança de IA. As afirmações sobre políticas de privacidade corporativas são generalizações rotuladas como inferência.

## 1. Que problema existe

A governança tradicional de conteúdo e dados assume **artefatos estáveis**: um documento é aprovado e publicado; um relatório é gerado por uma consulta conhecida; uma decisão é tomada por uma regra documentada. Um agente rompe essas premissas:

- cada resposta é **nova**, montada a partir de várias fontes;
- o **contexto** do modelo pode conter dados pessoais de várias origens;
- ações podem ser disparadas por uma interpretação probabilística;
- logs de conversa se tornam um **novo repositório** de dados pessoais.

## 2. Por que precisa ser resolvido

### Requisitos legais e institucionais

- A LGPD garante ao titular o direito de **revisão de decisões tomadas unicamente com base em tratamento automatizado** que afetem seus interesses (art. 20). **[FATO]** ([LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm))
- **[INFERÊNCIA]** Políticas de privacidade para colaboradores de grandes organizações reguladas costumam listar esse direito, declarar o tratamento de dados **sensíveis** (saúde, biometria, origem racial, filiação sindical), de dados de **dependentes** e de dados de **uso de sistemas**, e indicar um canal corporativo (portal ou assistente virtual) para exercer direitos.

**[INFERÊNCIA]** Qualquer evolução agêntica de um canal de RH de uma organização regulada opera, desde o primeiro dia, sobre dados sensíveis e dentro de um canal que já é o meio formal de exercício de direitos do titular.

## 3. Princípio central: governar entradas, regras e registros

Como não é possível pré-aprovar cada resposta, a governança se desloca:

| Antes (artefato estático) | Depois (comportamento dinâmico) |
| --- | --- |
| aprovar o documento | aprovar e versionar **fontes**, **instruções**, **ferramentas** e **modelos** |
| revisar o relatório | **avaliar** amostras de respostas continuamente |
| documentar a regra de decisão | manter a regra **no domínio** e registrar quando o agente a consultou |
| arquivar o documento | registrar o **lineage** de cada resposta e ação |

## 4. Classificação de dados aplicada a agentes

**[RECOMENDAÇÃO]** Cada fonte e cada ferramenta recebe classificação e regras de uso pelo agente:

| Classe | Exemplos | Pode entrar no contexto do modelo? | Pode aparecer na resposta? | Retenção em logs |
| --- | --- | --- | --- | --- |
| Pública/interna | políticas gerais, comunicados | sim | sim | padrão |
| Pessoal comum | cargo, área, saldo de férias | sim, do próprio titular | sim, ao próprio titular | curta |
| Pessoal sensível (art. 5º, II) | saúde, biometria, dependentes menores | só o mínimo necessário, com finalidade registrada | resumida, ao próprio titular | mínima ou mascarada |
| Confidencial de negócio | remuneração de terceiros, investigações | não, salvo ferramenta específica autorizada | não | conforme política |
| Segredos | credenciais, chaves | **nunca** | **nunca** | **nunca** |

### Onde o modelo roda

A classificação define também **onde** o processamento pode ocorrer (modelo gerenciado externo, nuvem privada, on-premises) e se dados podem ser usados para melhoria de modelos. Essa decisão é da governança, não do time técnico. **[RECOMENDAÇÃO]**

## 5. Lineage de respostas e ações

O lineage responde "de onde veio esta resposta?" e "por que esta ação aconteceu?".

```text
Resposta/ação
  ├─ Instruções de sistema (versão)
  ├─ Modelo (provedor, versão)
  ├─ Contexto do usuário (atributos usados, não valores sensíveis)
  ├─ Fontes recuperadas (ID, versão, seção, vigência)
  ├─ Ferramentas chamadas (nome, versão, resultado resumido)
  ├─ Decisões de política (regra, resultado)
  └─ Decisão humana (confirmou, editou, cancelou)
```

**[RECOMENDAÇÃO]** O lineage é parte do **registro de execução** descrito em `04_transversais/seguranca_iam_identidade_do_agente.md`. Um único artefato serve auditoria, compliance e operação.

## 6. Pergunta crítica: como auditar uma decisão ou ação realizada por um agente?

1. **Localizar** a execução pelo protocolo da transação no SoR (correlação com o trace).
2. **Reconstruir** o contexto: instruções, fontes e versões vigentes naquele momento.
3. **Verificar** a regra: a decisão de elegibilidade veio do domínio (consulta registrada) ou foi inferida pelo modelo? Se inferida, há um problema de arquitetura.
4. **Verificar** a autorização: sujeito, ator, escopo, decisão do PDP.
5. **Verificar** o consentimento operacional: houve confirmação explícita? Com qual resumo?
6. **Responder** ao titular: em caso de pedido de revisão (art. 20), um humano revisa com base nesse registro.

**Requisito derivado:** a reconstrução exige que **versões antigas** de instruções e de conteúdo continuem disponíveis pelo prazo de auditoria. **[INFERÊNCIA]**

## 7. Retenção e ILM de artefatos derivados

| Artefato | Risco | Regra sugerida **[RECOMENDAÇÃO]** |
| --- | --- | --- |
| Transcrições de conversa | repositório de dados sensíveis sem dono | retenção curta; mascaramento; dono definido; base legal |
| Registros de execução (auditoria) | necessários para provar decisões | retenção alinhada a obrigações regulatórias; dados pessoais mínimos |
| Embeddings e chunks | cópias derivadas de conteúdo | seguem o ciclo de vida do conteúdo de origem |
| Caches de respostas | respostas desatualizadas ou de outro usuário | escopo por usuário; expiração curta |
| Memória de longo prazo do agente | perfil implícito do colaborador | transparência, opção de apagar, finalidade explícita |
| Conjuntos de avaliação | podem conter perguntas reais com dados pessoais | anonimização antes do uso |

## 8. Explicabilidade

No contexto corporativo, explicabilidade **não** significa explicar os pesos do modelo. Significa conseguir dizer, ao colaborador e ao auditor:

- **quais fontes** sustentam a resposta (citações com versão);
- **quais regras** foram aplicadas e por quem (consulta ao domínio);
- **quais dados** do colaborador foram usados;
- **o que o agente fez** e com que autorização.

**[INFERÊNCIA]** Essa forma de explicabilidade só é possível se a regra estiver fora do modelo. Um agente que "decide" elegibilidade por raciocínio não consegue oferecer uma explicação auditável.

## 9. Qualidade de dados

A qualidade das respostas do agente é limitada pela qualidade dos dados de origem. Dimensões a monitorar:

| Dimensão | Exemplo de falha | Efeito no agente |
| --- | --- | --- |
| Atualidade | cadastro de gestor desatualizado | aprovação enviada à pessoa errada |
| Completude | política sem campo de vigência | versão revogada citada |
| Consistência | o mesmo benefício com valores diferentes em dois repositórios | resposta contraditória |
| Exatidão | permissão de conteúdo errada | vazamento |
| Unicidade | duplicatas | citações divergentes |

## 10. AI governance: frameworks de referência

| Framework | Natureza | Contribuição |
| --- | --- | --- |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | framework voluntário de gestão de riscos de IA, com funções Govern, Map, Measure e Manage | estrutura de riscos e responsabilidades |
| [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) | norma de sistema de gestão de IA | processo certificável de governança |
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | catálogo de riscos técnicos | controles de segurança de aplicações com LLM |

**[FATO]** sobre a existência e a natureza dos frameworks. **[RECOMENDAÇÃO]** Usar o NIST AI RMF como estrutura, a ISO 42001 se houver objetivo de certificação e a OWASP como checklist técnico.

### Inventário mínimo de IA

Cada caso de uso agêntico em produção tem registro com: finalidade, dono, dados usados e classificação, modelo e versão, ferramentas e classes de risco, nível de autonomia, resultados da avaliação, riscos residuais aceitos e quem aceitou.

## 11. Governança sem travar a entrega

O conflito **velocidade × compliance** é real. **[RECOMENDAÇÃO]**

- **Padrões verificáveis automaticamente:** classificação de ferramentas validada em CI; testes de vazamento de permissão; suíte de avaliação com limiares; política como código.
- **Aprovação por classe de risco:** ferramentas de leitura de baixo risco seguem um caminho rápido; ferramentas de escrita sensível exigem revisão completa.
- **Revisão após entrega com amostragem** para respostas de conhecimento; **revisão antes** para ações.

## 12. Dependências e riscos

- **Dependências:** política de classificação; catálogo de dados; jurídico e DPO envolvidos desde o desenho; registro de execução.
- **Riscos:** logs como passivo; uso secundário de dados sem base legal; respostas que equivalem a decisões automatizadas sem canal de revisão; governança só documental, sem controles técnicos.

## Fontes

- Lei nº 13.709/2018 (LGPD): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- ISO/IEC 42001:2023: https://www.iso.org/standard/81230.html
- OWASP Top 10 for LLM Applications: https://genai.owasp.org/llm-top-10/
