# 🚀 Bem-vindo à Era do Agentic DevOps no Salesforce

> **Pare de digitar boilerplate. Comece a orquestrar soluções de negócios.**
> Você não é mais apenas um codificador. Você agora é um **Agentic Technical Lead**. Sua principal arma não é a velocidade de digitação, mas sim a clareza da sua intenção (Spec) e a sua disciplina com a governança.

Este guia define como times de desenvolvimento Salesforce (Apex, LWC, Admins) devem operar utilizando o **Modelo Federado**, o **Spec-Driven Development (SDD)**, agentes autônomos (**Devin**) e o **Flosum CLI**.

---

## ⚔️ O Problema vs. A Solução

Em orgs complexas com múltiplos times (QA, PreProd, Prod), o modelo tradicional falha:
* **Modelo Tradicional:** Monorepos gigantes gigantes, conflitos massivos, deploys quebrando o trabalho de outros times, rastreabilidade nula e dependência de automações frágeis.
* **A Solução Agentic Federada:** Repositórios isolados por time. O Devin atua confinado. O Flosum garante a integração contínua livre de colisões. O humano atua como orquestrador e aprovador.

---

## 🏛️ A Tríade da Arquitetura Federada

Para sobreviver neste modelo, entenda a separação de papéis:

1.  🐙 **GitHub (A Intenção Efêmera):** Armazena intenção, documentação, *Knowledge Base* e Specs. **Atenção:** Um `git push` não muda a Org. O GitHub é efêmero para a Salesforce; o código só existe oficialmente para a empresa quando entra no Flosum.
2.  🤖 **Devin (O Executor):** Lê o GitHub, entende o contexto em milissegundos, escreve o código, roda os testes locais e prepara o pacote. Ele é o músculo, mas precisa de limites claros.
3.  ☁️ **Salesforce (O Runtime):** A Org de Sandbox onde a validação ocorre.
4.  🔄 **Flosum CLI (A "Source of Truth"):** É a **verdadeira** fonte da verdade. Resolve conflitos e promove o código para os ambientes compartilhados.

---

## 📝 Spec-Driven Development (SDD)

O coração do desenvolvimento com Agentes de IA. Uma spec mal escrita não gera apenas código ruim — ela gera **desperdício financeiro imediato (ACU Burn Rate)** devido a loops infinitos de correções.

Abaixo está o template oficial de como orientar o Devin. A regra de ouro é o **Limites (Out-of-Scope)**: o que ele *não* deve fazer é tão importante quanto o que ele *deve* fazer.

### Template de Spec Realista (Exemplo: Criação de Campo + Trigger)

```markdown
# Spec: Validação de Desconto em Oportunidades VIP

## 1. Contexto
Precisamos impedir que usuários apliquem mais de 20% de desconto em Oportunidades marcadas como "VIP", a menos que tenham permissão especial.

## 2. Requisitos Funcionais
- Criar campo customizado `Is_VIP__c` (Checkbox, default false) em Opportunity.
- Criar Trigger/Handler em Opportunity (antes de update).
- Se `Is_VIP__c` == true e o desconto for > 20%, lançar erro amigável, exceto se o usuário tiver o Custom Permission `Bypass_VIP_Discount`.

## 3. Regras Técnicas
- Seguir o padrão Trigger Actions Framework existente em `/assets`.
- Cobertura de teste mínima exigida: 90%.
- Sem hardcode de IDs.

## 4. Limites e Out-of-Scope 🚨 [CRÍTICO]
- NÃO modifique as classes utilitárias globais (ex: `StringUtil.cls`).
- NÃO altere Triggers de outros domínios ou objetos além de Opportunity.

## 5. Critérios de Aceite
- Campo criado.
- Lógica implementada e modularizada em uma classe Handler separada.
- Classe de teste aprovada passando localmente no SF CLI.

## 6. Guardrails de Segurança
- Validate CRUD/FLS antes da manipulação de dados na Trigger.
- Use `WITH SECURITY_ENFORCED` nas queries SOQL.
```

---

## 🎛️ Orquestrando o Devin (Web e CLI)

* **Boas Práticas:** Comece sempre pela Spec. Utilize os playbooks existentes. Mande o Devin validar tudo localmente com scripts de lint *antes* de subir para a org.
* **Anti-patterns:** Prompts vagos ("crie uma LWC de mapa"), pedir mudanças em toda a org, permitir que o Devin faça suposições ("guesswork") sobre a arquitetura.

### 💰 Otimização de Custos (ACUs)
Cada passo em falso custa dinheiro. 
1. Evite loops infinitos fornecendo os logs de erro completos na Spec.
2. Quebre tarefas colossais em specs menores.
3. Reaproveite o `/knowledge-base` para que o Devin não tenha que "reaprender" o framework da empresa a cada ticket.

---

## 🛤️ O Fluxo de Trabalho (Step-by-Step)

O fluxo obedece uma fronteira de segurança clara entre a máquina local e a Org.

1.  **Criação:** Desenvolvedor cria a Spec (`specs/`).
2.  **Setup:** Executar `/scripts/01_setup_env.sh` (Autenticação e preparação).
3.  **Devin Local:** Devin via CLI lê a Spec, escreve o código, realiza testes e prepara o `package.xml`.
4.  **A Fronteira de Segurança (Human-in-the-loop):** O humano revisa o código gerado.
5.  **Promoção:** O humano dispara o deploy via **Flosum CLI** (`package-deploy.xml`).
6.  **Limpeza de Ambiente:** Limpar a sessão do Devin CLI local para que o "lixo" de contexto não contamine a próxima tarefa.

---

## 📂 O Repositório de Referência (Acelerador de Contexto)

Os times **devem** clonar/forkar o repositório de referência:
👉 `https://github.com/issei/sf-repo`

Este repositório é o seu "cérebro externo". Ao adotá-lo, você ganha a estrutura exata que o Devin precisa para ser performático:

```text
├── /knowledge-base  → A "memória" do Devin. Arquivos lidos em milissegundos para entender a Org.
├── /playbooks       → SOPs (Procedimentos Operacionais Padrão) com execução determinística.
├── /scripts         → Ferramentas locais (Bash/Node) para setup e manipulação offline.
├── /specs           → Diretório de entrada de demandas (seus templates SDD).
└── .agents/skills   → Componentes e habilidades modulares pré-configuradas para a IA.
```

---

## 🛡️ Governança e Checklist do Desenvolvedor

No modelo federado, o **Metadata Trampling** (pisar no código dos outros) é fatal. 
Estratégia de Sobrevivência: **Naming Conventions por Domínio**. Todo o código do Time A deve começar com um prefixo específico (ex: `TA_`) ou viver em um namespace lógico documentado.

### ✅ Checklist Interativo
- [ ] O login na Org foi feito exclusivamente via `sf org login web`?
- [ ] A Spec define claramente os limites (Out-of-Scope) para não quebrar metadados alheios?
- [ ] O Devin foi impedido de fazer deltas e `destructiveChanges` não autorizados?
- [ ] O `package.xml` gerado pelo Devin foi revisado?
- [ ] A promoção cruzada está sendo disparada via Flosum CLI?
- [ ] O ambiente local foi limpo após o deploy bem-sucedido?

---

## 🚨 Restrições Críticas de Operação

As seguintes regras são inegociáveis e auditadas:

1.  **🚫 SEM JWT AUTH:** Para garantir rastreabilidade humana rigorosa, a autenticação é estritamente via Web Login Salesforce (`sf org login web`). Nada de chaves guardadas localmente.
2.  **🚫 DEVIN NÃO FAZ DEPLOY:** O Devin **NUNCA** "fala" com o Flosum. O Devin restringe-se a construir o manifesto (`package.xml`) e testar o delta. O **humano** aperta o botão no Flosum CLI.
3.  **🚫 SEM FULL SNAPSHOTS:** Não baixe a org inteira. O fluxo é construído operando apenas sobre deltas metadados manipulados pela sua Spec.
4.  **🚫 SEM SCRIPTS PYTHON LEGADOS:** O fluxo oficial roda através do `@flosum/cli` nativo e do `sf cli`.

---

## 🔗 Links Oficiais

* [Devin CLI](https://cli.devin.ai/docs)
* [Devin Blueprints Docs](https://docs.devin.ai/onboard-devin/environment/blueprints)
* [Flosum CLI Docs](https://docs.flosum.com/devops/code/devops-cli/overview-of-flosum-cli-node.js-package)
* [Salesforce CLI](https://github.com/salesforcecli/cli)
* [Web Login SFDX](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm)

---

### 🙏 Agradecimentos Especiais
Um agradecimento especial a **Jesse** e **Kylmer**, pelas infindáveis sessões de experimentação, testes e debates arquiteturais que ajudaram a pavimentar e amadurecer os conceitos e restrições desta arquitetura Agentic. Sem eles, a governança ágil no modelo federado não passaria de teoria.