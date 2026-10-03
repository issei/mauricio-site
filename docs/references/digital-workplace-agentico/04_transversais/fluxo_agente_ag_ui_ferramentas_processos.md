---
titulo: Arquitetura agêntica ponta a ponta — Agente → AG-UI → Ferramentas → APIs → Processos → Sistemas, com identidade e auditoria
modulo: Transversal — Integração AG-UI com os demais pilares
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [ag-ui, fluxo-ponta-a-ponta, tool-calls, mcp, bff, workflow, interrupts, human-in-the-loop, identidade-delegada, auditoria, sequencia]
---

# Arquitetura agêntica ponta a ponta: Agente → AG-UI → Ferramentas → APIs → Processos → Sistemas

Este arquivo percorre, passo a passo, uma solicitação real de colaborador atravessando todas as camadas da arquitetura de referência. O objetivo é mostrar **como o AG-UI se conecta aos demais pilares** (Generative UI, ferramentas, MCP, BFF, workflow, IAM, observabilidade) e onde ficam os controles. O cenário é ilustrativo e **não descreve um portal específico**; os eventos AG-UI citados seguem a especificação 1.0.

## 1. Cenário

> Uma colaboradora escreve no app: **"Minha filha nasceu ontem. Preciso incluir ela no plano de saúde."**

Esse pedido é um bom teste porque envolve: intenção com carga emocional, dado pessoal sensível (saúde, dependente menor), regra de elegibilidade com prazo, coleta de documento, ação com efeito, processo assíncrono com possível análise humana, e uma jornada maior (licença, folha) que pode ser sugerida.

## 2. Visão em sequência

```text
Colaboradora   Experience     AG-UI      Agente     EXP     Knowledge   Ferramentas/MCP   BFF/APIs   Workflow   SoR
     │  pedido     │            │           │         │          │              │              │          │        │
     │────────────►│ RunAgentInput ────────►│         │          │              │              │          │        │
     │             │◄── RUN_STARTED ────────│         │          │              │              │          │        │
     │             │◄── ACTIVITY (entendendo)│        │          │              │              │          │        │
     │             │            │           │──► jornada "nascimento" ─────►│   │              │          │        │
     │             │            │           │──► política de dependentes ──────►│              │          │        │
     │             │            │           │──► consultar_elegibilidade ────────────────────►│─────────►│        │
     │             │◄── TOOL_CALL render_dependent_form (props) │         │              │              │          │
     │             │◄── STATE_DELTA (rascunho)                  │         │              │              │          │
     │ edita/anexa │──────── estado + anexo ───►│               │         │              │              │          │
     │             │◄── RUN_FINISHED (interrupção: confirmar) ──│         │              │              │          │
     │ confirma    │──── nova run com resume ──►│               │         │              │              │          │
     │             │            │           │──► iniciar_inclusao (idempotente) ─────────►│──► start ─►│──────►│
     │             │◄── TEXT_MESSAGE (protocolo, prazo, próximos passos)          │              │          │        │
     │             │◄── RUN_FINISHED (sucesso)                  │         │              │              │          │
     │   ...dias depois...                       evento "inclusao.aprovada" ◄──────────────────────────│        │
     │◄── notificação (EXP)                                      │         │              │              │          │
```

## 3. Passo a passo com controles

### Passo 1: entrada e identidade

- A experiência envia `RunAgentInput` com a mensagem, o estado atual e as **ferramentas de frontend** disponíveis no contexto (incluindo `render_dependent_form`). O AG-UI prevê ferramentas "definidas no frontend e passadas ao agente durante a execução". **[FATO]** ([AG-UI Tools](https://docs.ag-ui.com/concepts/tools.md))
- A requisição carrega o token da colaboradora. O runtime do agente **não usa esse token para chamar sistemas**; ele o troca por tokens delegados, com audiência específica, a cada ferramenta (ver Passo 5).
- O runtime cria um **trace** com ID de correlação, que vai acompanhar todas as chamadas.

### Passo 2: transparência inicial

- O agente emite `RUN_STARTED` e uma atividade (`ACTIVITY_SNAPSHOT`) como "Entendendo sua solicitação". As atividades são "progresso estruturado renderizado fora da transcrição". **[FATO]** ([Event Streams](https://docs.ag-ui.com/spec/1.0/events/index.md))
- **Controle de UX:** o usuário vê que algo está acontecendo; o leitor de tela recebe um anúncio moderado.

### Passo 3: contexto da EXP e do conhecimento

- O agente consulta a **EXP**: existe uma jornada "nascimento de filho" com serviços relacionados (inclusão no plano, licença, salário-família ou equivalente, atualização cadastral).
- O agente consulta o **Knowledge**: política de inclusão de dependentes, **filtrada por permissão e aplicabilidade** (vínculo, empresa). Recebe trechos com ID, versão e vigência.
- **Controle de conhecimento:** só conteúdo vigente e permitido entra no contexto.

### Passo 4: verificação de elegibilidade (regra no domínio)

- O agente chama a ferramenta `consultar_elegibilidade_dependente`. A ferramenta chama o **BFF**, que chama a **API de benefícios**.
- A **regra** (parentesco, prazo de inclusão sem carência, plano atual) é avaliada pelo domínio. O agente recebe: `elegivel: true`, `prazo_sem_carencia_ate: 2026-11-02`, `documentos_exigidos: [certidao_nascimento]`.
- **Controle de processo:** o agente **não** decide elegibilidade.

### Passo 5: identidade delegada na ferramenta

- Para chamar o BFF, o runtime obtém um token por **token exchange** com **sujeito = colaboradora** e **ator = agente**, escopo `beneficios:dependentes:read`, audiência `bff-agente`. A RFC 8693 define essa semântica de delegação, com a claim `act` identificando o ator. **[FATO]** ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html))
- Se a ferramenta for exposta por um servidor MCP, ele valida a audiência do token e **não repassa** o token recebido ao BFF; obtém outro. **[FATO]** ([MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))
- **Controle de segurança:** o SoR registra "consultado pela colaboradora X, via agente Y".

### Passo 6: interface adequada à tarefa (Generative UI governada)

- O agente emite uma tool call de frontend `render_dependent_form` com props: nome do plano atual, campos a preencher, documento exigido, prazo destacado.
- O frontend **valida as props contra o schema** do Component Registry e renderiza o componente aprovado. Ver `03_pilares/generative_ui_design_system_e_component_registry.md`.
- O agente emite `STATE_DELTA` (JSON Patch) com o rascunho da solicitação. Se um patch falhar, o cliente rejeita o patch inteiro e o produtor deve ressincronizar com snapshot. **[FATO]** ([Snapshots and Deltas](https://docs.ag-ui.com/spec/1.0/basic/patterns/snapshots.md))

### Passo 7: coleta de dados e documento

- A colaboradora preenche o nome da filha e anexa a certidão. O componente atualiza o estado compartilhado.
- O anexo vai para um **repositório de documentos** (ECM/CSP) por upload direto, com classificação "dado pessoal sensível"; o agente recebe apenas uma referência.
- **Controle de LGPD:** o documento não trafega pelo contexto do modelo além do necessário; se houver extração automática de dados da certidão, ela ocorre em serviço próprio, com finalidade registrada. **[RECOMENDAÇÃO]**

### Passo 8: confirmação via interrupção formal

- O agente prepara o resumo e encerra a execução com `RUN_FINISHED` contendo uma **interrupção**: `reason: "confirmacao_acao"`, `message` legível, `toolCallId` da ação proposta e `responseSchema` (ex.: `{confirmado: boolean}`).
- Pela especificação, "uma execução interrompida é uma execução encerrada"; a resposta vem em nova execução, e o produtor não deve executar a ação se a interrupção não for coberta. **[FATO]** ([Interrupts and Resume](https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md))
- **Controle de autonomia:** ação com efeito sobre dado sensível exige confirmação explícita.

### Passo 9: execução idempotente e início do processo

- A nova execução traz o `resume` com `confirmado: true`.
- O agente chama `iniciar_inclusao_dependente` com **chave de idempotência** (ID da execução original + ID da tool call). Token delegado com escopo de escrita.
- O BFF chama a API de benefícios, que **inicia um workflow** durável: validação documental (automática e, se necessário, humana), envio à operadora, atualização cadastral.
- **Controle de integração:** repetição da chamada não duplica a inclusão; o estado do processo vive no workflow engine.

### Passo 10: resposta honesta e jornada

- O agente responde com protocolo, prazo e próximos passos, sem afirmar que a inclusão está concluída.
- Sugere, como **opção**, os outros serviços da jornada (licença, atualização cadastral), sem executá-los.
- `RUN_FINISHED` com sucesso. O trace registra: fontes usadas (com versão), ferramentas chamadas, tokens delegados (sem segredos), decisão da usuária, IDs de protocolo.

### Passo 11: exceção humana

- Se a certidão for ilegível, o workflow cria uma **tarefa humana** para o time de benefícios, com SLA. A colaboradora é notificada com o motivo e o que fazer.
- O atendente vê o contexto estruturado (intenção, dados, documento, histórico), não a transcrição bruta.

### Passo 12: conclusão assíncrona

- Dias depois, o workflow publica `inclusao_dependente.aprovada`. A EXP gera a notificação. Se a colaboradora abrir uma conversa, o agente consulta o estado e responde com base no SoR.

## 4. Mapa de controles por camada

| Camada | Controle aplicado neste fluxo |
| --- | --- |
| Experience | componentes do registro, validação de props, confirmação, acessibilidade |
| AG-UI | interrupção formal, atomicidade de deltas, ordem dos eventos |
| Agente | catálogo de ferramentas filtrado, limites de passos e custo, grounding |
| EXP | jornada e serviços permitidos para o perfil |
| Knowledge | filtro de permissão e vigência no índice |
| Ferramentas/MCP | audiência do token, sem passthrough, schema |
| BFF/APIs | autorização com sujeito e ator, idempotência, regra no domínio |
| Workflow | estado durável, tarefas humanas, SLA, compensação |
| SoR | registro da transação com atribuição |
| Transversal | trace correlacionado, lineage, retenção, LGPD |

## 5. O que muda se...

| Variação | Impacto |
| --- | --- |
| A colaboradora está no Teams | o mesmo agente e estado; o componente renderiza como card; anexo pode exigir link para o app |
| O SoR de benefícios está fora do ar | circuit breaker aberto; o agente explica, salva o rascunho e oferece lembrete ou chamado |
| A política mudou ontem | o índice reflete a nova versão via evento de ciclo de vida; respostas citam a versão nova |
| A colaboradora pergunta pela filha de outra pessoa | a ferramenta resolve "dependente" pela identidade da solicitante; não aceita IDs arbitrários do texto |
| Um documento indexado contém instrução maliciosa | conteúdo recuperado é tratado como dado; guardrails e ausência de ferramentas perigosas limitam o impacto |

## Fontes

- AG-UI, Tools: https://docs.ag-ui.com/concepts/tools.md
- AG-UI, Event Streams: https://docs.ag-ui.com/spec/1.0/events/index.md
- AG-UI, Snapshots and Deltas: https://docs.ag-ui.com/spec/1.0/basic/patterns/snapshots.md
- AG-UI, Interrupts and Resume: https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md
- RFC 8693, OAuth 2.0 Token Exchange: https://www.rfc-editor.org/rfc/rfc8693.html
- MCP Authorization: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- Temporal (workflows duráveis): https://docs.temporal.io/
