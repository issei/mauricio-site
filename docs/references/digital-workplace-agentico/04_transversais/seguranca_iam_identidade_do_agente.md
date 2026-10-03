---
titulo: Segurança, IAM e Zero Trust para agentes — identidade delegada, autorização de ferramentas, consentimento e trilha de auditoria
modulo: Transversal — Security & Governance
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [seguranca, iam, zero-trust, oauth, token-exchange, rfc8693, delegacao, rbac, abac, rebac, policy-enforcement, auditoria, prompt-injection, mcp]
---

# Segurança, IAM e Zero Trust para agentes: identidade delegada, autorização de ferramentas e trilha de auditoria

Este arquivo trata a segurança como preocupação transversal da evolução para um Digital Workplace agêntico. Ele responde às seis perguntas fundamentais (quem autorizou o agente, em nome de quem ele age, quais permissões tem, quais dados pode consultar, quais ações pode executar e como provar o que aconteceu) com padrões e especificações publicados. **[INFERÊNCIA]** Políticas de privacidade de grandes organizações costumam mencionar biometria e geolocalização para autenticação em sistemas eletrônicos, o que indica autenticação forte, mas raramente detalham protocolos.

## 1. Que problema existe

Em um portal tradicional, há duas identidades: o usuário e o sistema. Com um agente, há pelo menos quatro: o **usuário** (sujeito), o **agente** (ator), o **runtime/serviço** onde o agente roda (identidade de carga de trabalho) e cada **recurso** acessado. Se essas identidades se misturam, a organização perde a capacidade de aplicar menor privilégio e de atribuir responsabilidade.

### Os dois atalhos perigosos

| Atalho | Por que é tentador | Por que é perigoso |
| --- | --- | --- |
| **Conta de serviço com acesso amplo** | simples; funciona com legados | toda ação parece feita "pelo sistema"; o agente pode acessar dados de qualquer colaborador; viola menor privilégio |
| **Repassar o token do usuário** | o SoR já entende o token | o SoR não distingue o usuário do agente; o token pode ter audiência errada; o MCP proíbe explicitamente o token passthrough |

## 2. As seis perguntas e suas respostas arquiteturais

### 2.1 Quem autorizou o agente?

- **Nível organizacional:** o agente e cada ferramenta passam por aprovação (fórum de ferramentas e permissões), com registro de quem aprovou, para qual caso de uso e com qual classificação de risco.
- **Nível do usuário:** o colaborador autentica e, para ações específicas, **consente** ou **confirma**. Para ações de alto impacto, a confirmação é registrada como evento (interrupção AG-UI com resposta).

### 2.2 Em nome de quem o agente está agindo?

**Delegação, nunca impersonação.** A RFC 8693 define: na impersonação, A "é indistinguível de B"; na delegação, A "mantém sua própria identidade" e fica explícito que A age representando B. A claim `act` identifica o ator, e o consumidor do token deve considerar as claims de topo e o ator atual ao aplicar a política. **[FATO]** ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html))

Exemplo de token delegado (conteúdo ilustrativo):

```json
{
  "iss": "https://idp.exemplo.corp",
  "sub": "colaborador:123456",
  "aud": "https://bff-agente.exemplo.corp",
  "scope": "beneficios.dependentes.read",
  "act": { "sub": "agente:assistente-pessoas:v3" },
  "exp": 1791000000
}
```

### 2.3 Quais permissões ele possui?

**A interseção** entre:

1. o que o **usuário** pode fazer;
2. o que o **agente** está autorizado a fazer (catálogo de ferramentas aprovado);
3. o que a **tarefa atual** exige (escopo mínimo, elevação incremental).

**[RECOMENDAÇÃO]** O agente nunca tem mais permissão do que o usuário, e geralmente tem menos. As boas práticas do MCP recomendam um modelo progressivo de escopos mínimos, com elevação via desafios `WWW-Authenticate` quando uma operação privilegiada é tentada, e alertam contra escopos curinga e omnibus. **[FATO]** ([MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices))

### 2.4 Quais dados ele pode consultar?

- **Conhecimento:** só o que o usuário pode ver, filtrado no índice (permission-aware retrieval).
- **Dados transacionais:** só por ferramentas que resolvem o "de quem" pela identidade do token, e não por parâmetros vindos do texto ("meu saldo" vira `sub` do token, não um ID informado pelo modelo).
- **Dados sensíveis (LGPD):** ferramentas classificadas; acesso registrado; minimização no retorno.

### 2.5 Quais ações pode executar?

| Classe de ação | Exemplo | Regra sugerida **[RECOMENDAÇÃO]** |
| --- | --- | --- |
| Leitura de dados próprios | saldo de horas | permitido com token delegado |
| Escrita reversível | rascunho de solicitação | permitido; notificar |
| Escrita com efeito | submeter férias, incluir dependente | confirmação explícita (interrupção) |
| Escrita com efeito financeiro, legal ou de acesso | alterar conta bancária, conceder acesso | confirmação + reautenticação forte; possivelmente aprovação de terceiro |
| Ações em nome de outra pessoa | gestor aprovando | só com papel verificado e política específica |
| Ações proibidas ao canal agente | desligamento, alteração salarial | não expostas como ferramenta |

### 2.6 Como provar posteriormente o que aconteceu?

Ver a seção 6 (trilha de auditoria).

## 3. Modelos de autorização

| Modelo | Como decide | Bom para | Limite |
| --- | --- | --- | --- |
| **RBAC** | papéis | permissões estáveis por função | explosão de papéis; contexto pobre |
| **ABAC** | atributos de sujeito, recurso, ação e ambiente | regras contextuais (vínculo, região, horário, classificação) | políticas complexas de auditar |
| **ReBAC** | relações (é gestor de, é dono de) | "gestor pode ver férias da equipe" | exige grafo de relações consistente; o paper do [Zanzibar](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/) é a referência |
| **Policy-as-code** | políticas declarativas avaliadas por um motor ([OPA](https://www.openpolicyagent.org/docs/latest/), [Cedar](https://www.cedarpolicy.com/)) | consistência entre camadas, testes de política | exige governança das políticas |

**[INFERÊNCIA]** Agentes empurram a autorização de RBAC puro para combinações com ABAC e ReBAC, porque a decisão passa a depender do **ator** (qual agente), da **ação** (classe de risco) e do **contexto** (houve confirmação? qual o canal?).

### Pontos de aplicação (PEP) e decisão (PDP)

```text
Experience ──► Agente ──► Ferramenta ──► Gateway ──► BFF ──► API de domínio ──► SoR
                 │            │            │          │            │
                PEP          PEP          PEP        PEP          PEP (último e obrigatório)
                 └────────────┴────────────┴──────────┴────────────┴──► PDP (motor de políticas)
```

**[RECOMENDAÇÃO]** O PEP **obrigatório** é o mais próximo do dado (API de domínio ou SoR). Os PEPs anteriores reduzem a superfície, mas nunca substituem o último. A OWASP recomenda "aplicar a autorização nos sistemas downstream, em vez de depender da decisão do LLM". **[FATO]** ([OWASP LLM06:2025](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/))

## 4. Zero Trust aplicado a agentes

| Princípio ([NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)) | Aplicação |
| --- | --- |
| Todo acesso é verificado por requisição | cada tool call com token próprio, audiência e escopo |
| Nenhuma confiança por localização | o runtime do agente "dentro da rede" não ganha acesso |
| Menor privilégio dinâmico | escopo por tarefa; tokens curtos |
| Identidade de carga de trabalho | o runtime tem identidade própria verificável (ex.: [SPIFFE](https://spiffe.io/docs/latest/spiffe-about/overview/)) |
| Monitoramento contínuo | traces de agente no SIEM; detecção de padrões anômalos de ferramentas |

## 5. Ameaças específicas de agentes

| Ameaça | Descrição | Mitigações |
| --- | --- | --- |
| Injeção de prompt direta | o usuário tenta fazer o agente ignorar regras | guardrails; a autorização não depende do prompt |
| Injeção indireta | documento indexado ou resposta de ferramenta contém instruções | tratar conteúdo como dado; limitar ferramentas disponíveis; separar canais de instrução e de dados |
| Excesso de agência | funcionalidade, permissão ou autonomia demais (OWASP LLM06) | catálogo mínimo; escopos; HITL |
| Confused deputy | o agente usa sua autoridade para fazer o que o usuário não poderia | delegação com interseção de permissões |
| Token passthrough | servidor repassa token sem validar audiência | proibido pelo MCP; token exchange |
| Exfiltração por saída | o agente inclui dados sensíveis na resposta ou em URL | mascaramento; allowlist de domínios; sem renderização de links arbitrários |
| SSRF via descoberta | metadados OAuth apontando para endereços internos | validação de URLs; bloqueio de faixas privadas; proxy de egresso (MCP Security Best Practices) |
| Segredos no contexto | chaves em prompts ou logs | cofre de segredos; tokens fora do contexto do modelo |

## 6. Trilha de auditoria: como provar o que aconteceu

**[RECOMENDAÇÃO]** Um **registro de execução** por tarefa do agente, imutável e correlacionado com os logs dos SoRs:

| Campo | Exemplo |
| --- | --- |
| ID de correlação (trace) | `4bf92f35…` |
| Sujeito | colaborador 123456 |
| Ator | agente `assistente-pessoas` v3 |
| Canal | app mobile |
| Instruções e modelo | prompt de sistema v17; modelo e versão |
| Intenção interpretada | inclusão de dependente |
| Fontes consultadas | NORM-BEN-0031 v5, seção 4.2 |
| Ferramentas chamadas | nome, argumentos (com dados pessoais mascarados), resultado resumido, latência |
| Decisões de política | permitido/negado, regra, PDP |
| Interrupções | motivo, resposta do usuário, horário |
| Efeitos | protocolo 2026-000123 no SoR de benefícios |

Esse registro atende ao Security (forense), ao Compliance (revisão de decisões, art. 20 da LGPD) e ao SRE (diagnóstico). A propagação de `traceparent` entre agente e ferramentas está documentada para o MCP na revisão 2026-07-28. **[FATO]** ([MCP changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog))

## 7. Consentimento

- **Consentimento de uso de dados pessoais** segue a base legal adequada da LGPD; em relações de trabalho, o consentimento nem sempre é a base mais apropriada, e a análise cabe ao jurídico. **[INFERÊNCIA]**
- **Consentimento operacional** (confirmação de ação) é diferente de consentimento legal e deve ser tratado como controle de autorização, registrado na trilha.
- **Memória de longo prazo** do agente exige transparência e opção de apagar.

## 8. Dependências, riscos e maturidade

- **Dependências:** IdP com suporte a OAuth 2.x e token exchange (gap G22); motor de políticas; catálogo de ferramentas com classificação de risco; SIEM.
- **Riscos:** legados que só aceitam credencial de usuário ou de serviço genérica; políticas espalhadas sem testes.
- **Maturidade:** OAuth, token exchange e Zero Trust são padrões **maduros**; sua aplicação a identidades de agentes é **emergente**, sem um padrão único consolidado para "identidade de agente" além da delegação. **[INFERÊNCIA]**

## Fontes

- RFC 8693, OAuth 2.0 Token Exchange: https://www.rfc-editor.org/rfc/rfc8693.html
- MCP Authorization (2025-06-18): https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- MCP Security Best Practices: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- OWASP, LLM06:2025 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- NIST SP 800-207, Zero Trust Architecture: https://csrc.nist.gov/pubs/sp/800/207/final
- Google, Zanzibar: https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/
- Open Policy Agent: https://www.openpolicyagent.org/docs/latest/
- Cedar: https://www.cedarpolicy.com/
- SPIFFE: https://spiffe.io/docs/latest/spiffe-about/overview/
