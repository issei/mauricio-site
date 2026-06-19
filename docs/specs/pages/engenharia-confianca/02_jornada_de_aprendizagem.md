# 02 — Jornada de Aprendizagem (os quatro módulos)

> Documento central. Detalha os **quatro módulos sequenciais** especificados em
> [`site.md`](../../../references/site.md) §1. Cada módulo segue a mesma estrutura:
> **Conceito central · Narrativa · Prática educativa · Referências cruzadas · CTA de reflexão
> (Modelo de Maturidade)**.
> O conteúdo reaproveita os três pilares-fonte; as **pontes de transição** são o que se escreve do zero.

---

## Estrutura comum de cada módulo (gabarito)

```
┌─ Recap em uma frase (de onde viemos) ──────────────────────────┐
│  Conceito central (a tese do módulo, em destaque)               │
│  Narrativa (3–5 parágrafos, tom provocativo + técnico)          │
│  Elemento visual (analogia + diagrama Mermaid — ver 04)         │
│  Prática educativa (o que o leitor faz/observa)                 │
│  Bloco "Benefício para o Negócio" (ponte para o executivo)      │
│  Faixa de referência cruzada (conceito → arquivo do repo)       │
│  ► "Explore o pilar completo" (link para a página-fonte)        │
│  CTA de reflexão (pergunta de maturidade)                       │
└────────────────────────────────────────────────────────────────┘
```

---

## Módulo 0 — O Despertar da Liderança

> **Pilar-fonte:** vídeo "Por que sua IA falha?" + ponte para os três pilares.
> **Move o leitor:** maturidade **nível 1 (Mágica) → 2 (Consciência)**.

### Conceito central

> **O Crash Silencioso: a falha que não acende nenhuma luz vermelha.** A IA não falha como o software
> clássico. Não há *stack trace*, não há exceção — há uma regra de negócio perdida, um número inventado
> com confiança, uma decisão errada tomada como se fosse certa. A falha é de **intenção**, não de código.

### Narrativa

A IA é um amplificador. Entregue a ela uma organização com clareza e ela escala a clareza; entregue
uma organização com confusão e ela escala a confusão — só que mais rápido e com aparência de
competência. É por isso que a mesma ferramenta produz milagre numa equipe e desastre em outra.

O perigo não é o erro barulhento; é o **Crash Silencioso**. O código compila, a demo encanta, o
resultado parece impecável — e mesmo assim está logicamente errado ou fere uma regra que ninguém
documentou. LLMs são extraordinários em produzir o que *parece* perfeito: sintaxe limpa, nomes bem
escolhidos, estrutura convincente. Essa é exatamente a armadilha — a aparência de correção sem a
substância. Chamamos isso de **alucinação sintática**, e a confiança que o código bonito inspira é o
que o torna traiçoeiro.

Construir IA sobre uma organização que não sabe o que sabe é construir sobre solo movediço. Antes de
acelerar, é preciso uma **Matriz de Evidências**: saber o que é fato observado, o que é inferência e
o que é só suposição. Sem isso, a velocidade da IA só nos leva ao precipício mais depressa.

Este é o despertar da liderança: parar de perguntar "a IA funciona?" e começar a perguntar "a IA está
fazendo a coisa certa, pela razão certa, de forma que eu consiga auditar?". A jornada que se segue —
mapear a verdade, arquitetar a confiança, orquestrar a intenção — é a resposta de engenharia a essa
pergunta de liderança.

### Elemento visual

- **Diagrama Mermaid:** "Falha clássica × Crash Silencioso" — dois caminhos, um termina em 🔴 erro
  visível, o outro em ✅ verde-enganoso com valor perdido. (Spec em [04](04_visualizacoes_e_diagramas_mermaid.md) §1.)
- **Analogia do amplificador:** mesmo sinal, dois ganhos — clareza × ruído.

### Prática educativa

O leitor é convidado a **classificar três cenários** (apresentados como cards) em "falha visível" vs.
"Crash Silencioso", reforçando que a ausência de erro não é ausência de falha.

### Benefício para o Negócio

> A pior categoria de falha de IA não é a que derruba o sistema — é a decisão de negócio errada tomada
> com falsa confiança. Reconhecer o Crash Silencioso é o primeiro passo para torná-lo impossível por
> arquitetura, não por sorte.

### Referências cruzadas

| Conceito | Fonte |
| :-- | :-- |
| Alucinação sintática | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §1 |
| Matriz de Evidências | [`propostav2.md`](../../../references/propostav2.md) §3 |
| Decisão com falsa confiança | [`guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md) §3 |

### CTA de reflexão

> **"Aponte um Crash Silencioso que você já viveu: que valor se perdeu sem que nenhum alerta vermelho
> aparecesse?"** — Se você reconhece um, saiu da Mágica e entrou na Consciência. *(Maturidade 1 → 2)*

---

## Módulo 1 — Mapeando a Verdade

> **Pilar-fonte:** Engenharia Reversa Assistida por IA → [`/proposta-engenharia-reversa`](../../../../src/proposta-engenharia-reversa.html).
> **Move o leitor:** maturidade **nível 2 (Consciência) → 3 (Mapeado)**.

### Conceito central

> **Revelar o Implícito para torná-lo Explícito.** Antes de modernizar (To-Be), é preciso congelar uma
> fotografia de alta fidelidade do que o sistema *realmente* faz hoje (As-Is). O conhecimento crítico
> de negócio costuma viver escondido — em milhares de linhas de Apex, em Flows fragmentados e na cabeça
> de poucos especialistas. Modernizar sem mapear é apagar regras vitais sem saber.

### Narrativa

Todo sistema legado sofre do "conhecimento tribal": regras que sustentam o negócio mas que ninguém
escreveu. O objetivo da Engenharia Reversa Assistida por IA **não** é gerar documentação viva eterna —
é **congelar o As-Is** com fidelidade suficiente para que arquitetos decidam, de forma auditável, o
que preservar, redesenhar ou descontinuar.

A estratégia que define sucesso ou fracasso é a de descoberta. Ler tudo por tipo de artefato gera
dicionários isolados sem contexto; mapear por domínio gera sobreposição. A abordagem recomendada é
**guiada por jornadas críticas e risco** (top-down com deep dive): parte-se de uma jornada de negócio
(ex.: *Lead-to-Cash*), segue-se a trilha de execução (*call stack*) e mapeia-se todo componente que
ela toca — isolando rapidamente o código morto, que não pertence a jornada nenhuma.

Para não cair em falsos-positivos, a IA cruza uma **Matriz de Evidências** multifacetada: insumos
estruturais (metadados, Apex, Flows), de estado (Custom Metadata, Custom Settings), operacionais
(Event Monitoring, Debug Logs — que revelam o "código zumbi" nunca executado) e humanos (commits,
tickets, entrevistas — que dão o *porquê* da regra existir). O ativo final não é um catálogo de
IFs/ELSEs, mas um **Inventário de Comportamentos**: regras core, efeitos colaterais e workarounds
históricos, cada um classificado pela confiança da evidência.

### Elemento visual

- **Diagrama Mermaid:** descoberta guiada por jornada — gatilho → call stack → componentes mapeados,
  com código morto destacado fora da trilha. (Spec em [04](04_visualizacoes_e_diagramas_mermaid.md) §2.)
- **Régua de confiança da evidência:** "Sólido & Comprovado" · "Ainda é Hipótese" · "Decisão em Aberto"
  (reaproveita os rótulos da própria página-fonte).

### Prática educativa — governança Fail-Closed e validação humana

O ponto-chave educativo: o inventário **não** é aceito porque a IA o produziu. Cada comportamento
descoberto passa por **validação humana via PR Review** e por uma postura **Fail-Closed** — quando a
evidência é insuficiente, o item é marcado como *hipótese* ou *decisão em aberto*, **nunca** promovido
a verdade. Um "não confirmado" honesto vale mais que um "confirmado" inventado.

### Benefício para o Negócio

> Mapear a verdade antes de migrar evita o pior risco de toda modernização: descobrir, em produção,
> que uma regra silenciosa que valia milhões foi apagada. O Inventário de Comportamentos transforma
> conhecimento tribal em ativo auditável.

### Referências cruzadas

| Conceito | Fonte |
| :-- | :-- |
| As-Is / To-Be / congelar a fotografia | [`propostav2.md`](../../../references/propostav2.md) §1 |
| Descoberta por jornadas críticas | [`propostav2.md`](../../../references/propostav2.md) §2 |
| Matriz de Evidências | [`propostav2.md`](../../../references/propostav2.md) §3 |
| Inventário de Comportamentos | [`propostav2.md`](../../../references/propostav2.md) §4 |
| Fail-closed / validação por PR | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2 (DoD) |

### ► Explore o pilar completo

→ [`/proposta-engenharia-reversa`](../../../../src/proposta-engenharia-reversa.html)

### CTA de reflexão

> **"Quanto da lógica crítica do seu sistema vive apenas na cabeça de poucas pessoas?"** — Se você já
> tem um inventário explícito e auditável, está no nível Mapeado. *(Maturidade 2 → 3)*

---

## Módulo 2 — Arquitetando a Confiança

> **Pilar-fonte:** Engenharia de Agentes de IA → [`/engenharia-agentes-ia`](../../../../src/engenharia-agentes-ia.html).
> **Move o leitor:** maturidade **nível 3 (Mapeado) → 4 (Arquitetado)**.

### Conceito central

> **A capacidade vem do modelo; a confiança vem da engenharia.** Um sistema de IA confiável tem muito
> pouca IA no caminho crítico. A confiança não nasce de um prompt mais inteligente — nasce de
> arquitetura mais disciplinada.

### Narrativa

Depois de mapear a verdade, é hora de construir sobre ela com rigor. O primeiro princípio invariante é
**determinístico-primeiro**: resolva com regras e dados tudo o que for possível, e gaste IA apenas no
**resíduo interpretativo** — a fração da tarefa que só o modelo resolve. Mesma entrada deve produzir
mesma saída; o não-determinismo é isolado e testável.

O segundo princípio é a separação **Cérebro × Vitrine**. O motor cognitivo (pesado, sensível, com
acesso a dados) é um sistema; a interface exposta é outro. Eles se comunicam por um **contrato estreito**.
A vitrine nunca toca o banco diretamente; o cérebro nunca confia cegamente no que vem de fora.

O terceiro são os **contratos rígidos em toda fronteira**: a saída do LLM é input não confiável até ser
validada por um schema estrito que rejeita campos inesperados. É um "firewall" entre a probabilidade do
modelo e o determinismo do sistema. Sobre essa base assentam o isolamento das camadas epistêmicas
(evidência ≠ inferência ≠ julgamento), o Mundo Aberto (ausência de dado é incerteza explícita, nunca
"falso"), os ledgers de quota (FinOps) e a governança fail-closed.

Por fim, o **MCP (Model Context Protocol)** é a fronteira de segurança e interoperabilidade: o protocolo
padronizado pelo qual o agente ganha "mãos e olhos" de forma controlada, declarando explicitamente
quais ferramentas pode usar — o que também é uma fronteira de segurança.

### Elemento visual

- **Diagrama Mermaid — Pipeline determinístico (DAG):** etapas fixas com o LLM chamado *dentro* de uma
  etapa, nunca decidindo a próxima. (Spec em [04](04_visualizacoes_e_diagramas_mermaid.md) §3 — este é
  *o* diagrama-chave pedido por `site.md`.)
- **Diagrama Mermaid — Cérebro × Vitrine:** dois subsistemas ligados por um contrato HTTP estreito.
- **Analogia do Freio de F1:** restrições (contratos, determinismo) não freiam a inovação — são o que
  permite correr rápido com segurança. (Ver [04](04_visualizacoes_e_diagramas_mermaid.md) §6.)

### Prática educativa

O leitor percorre os princípios como **decisões arquiteturais**, não como slogans: para cada um,
"o que aconteceria se eu *não* fizesse isso?". Ex.: sem contrato rígido, um campo inventado pelo
modelo chega ao cliente; sem ledger, a conta de API estoura sem aviso.

### Benefício para o Negócio

> Estas práticas atacam o maior bloqueador de adoção corporativa de IA: a desconfiança.
> Determinístico-primeiro corta custo e erro na mesma jogada; contratos impedem dados inventados de
> chegar ao cliente; abraçar a incerteza evita a decisão errada com falsa confiança. O resultado é um
> sistema em que executivos e auditores se sentem seguros para confiar.

### Referências cruzadas

| Conceito | Fonte |
| :-- | :-- |
| Os 10 princípios | [`guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md) (síntese) |
| Determinístico-primeiro / resíduo interpretativo | idem §2 |
| Cérebro × Vitrine | idem §2 |
| Contratos rígidos | idem §2 |
| Ledgers / FinOps | idem §4 |
| MCP como fronteira | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2 |
| ADR (registrar a decisão) | [`docs/decisions/`](../../../decisions/) |

### ► Explore o pilar completo

→ [`/engenharia-agentes-ia`](../../../../src/engenharia-agentes-ia.html)

### CTA de reflexão

> **"Onde, no seu sistema, a saída de um LLM toca dados ou o cliente sem passar por um contrato?"** —
> Se toda fronteira tem um contrato e o LLM nunca pilota o fluxo, você está Arquitetado. *(Maturidade 3 → 4)*

---

## Módulo 3 — A Nova Maestria

> **Pilar-fonte:** Vibe Coding com Devin → [`/devin`](../../../../src/devin.html).
> **Move o leitor:** maturidade **nível 4 (Arquitetado) → 5 (Governado / Intencional)**.

### Conceito central

> **De Executor a Orquestrador Cognitivo.** A maestria não está em digitar código mais rápido — está em
> dirigir a inteligência da máquina com intenção clara. Como um chef executivo que não cozinha cada
> prato, mas garante que cada prato saia certo, o profissional sobe da execução para o **julgamento**.

### Narrativa

O Vibe Coding maduro não é "caos de prompts": é **intenção estruturada e persistente**. O humano
fornece clareza, contexto, exemplos e iteração; a máquina materializa. Quando essa intenção vive num
prompt efêmero, ela se perde. Quando vive numa **especificação versionada**, ela escala.

É por isso que o método central é o **Spec-Driven Development (SDD)**: a especificação é a **fonte da
verdade**. Em vez de pedir "faça X" e torcer, escreve-se o *o quê* e o *porquê* — e a IA implementa
*contra* essa spec, com os testes (BDD) como alvo objetivo. O contexto sai da cabeça e entra no
repositório, onde a máquina consegue ler e seguir.

O fluxo prático, validado no estudo de caso Devin + Salesforce, tem quatro passos: **Spec** (definição
SDD do comportamento desejado) → **Retrieve** (descoberta autônoma do contexto relevante) → **Refatorar**
(edição guiada pela spec) → **Validar** (Apex Tests automáticos que provam que a intenção foi cumprida).
Note como isso fecha o ciclo da jornada: a spec é o As-Is/To-Be do Módulo 1 tornado executável, sob os
contratos do Módulo 2.

Por fim, o **arsenal de inteligência organizacional**, que cresce com o tempo: **Skills**
(procedimentos reutilizáveis — refatoração sem risco, testes exaustivos, documentação), **Playbooks**
(receitas de processo — code review iterativo, onboarding, migração de framework) e **Knowledge**
(o ativo que acumula — arquitetura e padrões, convenções, lições aprendidas e *gotchas*). Versionar
esse estado cognitivo no Git é o que permite reverter não só o código, mas o raciocínio que o produziu.

### Elemento visual

- **Diagrama Mermaid — fluxo SDD:** `Spec → Retrieve → Refatorar → Validar`, com loop de feedback.
  (Spec em [04](04_visualizacoes_e_diagramas_mermaid.md) §4.)
- **Analogia do Chef de Cozinha:** o cliente (intenção) → a IA (ferramenta/cozinheiro) → você (chef
  executivo, julgamento). (Ver [04](04_visualizacoes_e_diagramas_mermaid.md) §6.)

### Prática educativa — o arsenal

O leitor mapeia uma tarefa real do próprio dia a dia para o arsenal: qual Skill a executa, qual Playbook
a enquadra, qual Knowledge ela alimenta — internalizando que cada execução deveria deixar a organização
mais inteligente.

### Benefício para o Negócio

> SDD e o arsenal transformam a IA de fonte de surpresas em colaborador previsível. A intencionalidade
> deixa de depender do talento individual de quem escreve o prompt e passa a ser um ativo da
> organização — versionado, audível e reutilizável. É a economia de escala da inteligência.

### Referências cruzadas

| Conceito | Fonte |
| :-- | :-- |
| Orquestrador Cognitivo / Chef | [`src/devin.html`](../../../../src/devin.html) (seções "Pensamento" / "Chef Executivo") |
| Spec-Driven Development | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2, [`docs/specs/PAGE_SPEC_TEMPLATE.md`](../../PAGE_SPEC_TEMPLATE.md) |
| Spec → Retrieve → Refatorar → Validar | [`src/devin.html`](../../../../src/devin.html) (estudo de caso Salesforce) |
| Skills / Playbooks / Knowledge | [`src/devin.html`](../../../../src/devin.html) + [`.agents/skills/`](../../../../.agents/skills/) |
| Versionar o estado cognitivo | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §3 |
| DoR / DoD | [`docs/governance/dor-dod-eai.md`](../../../governance/dor-dod-eai.md) |

### ► Explore o pilar completo

→ [`/devin`](../../../../src/devin.html)

### CTA de reflexão

> **"Sua intenção vive num prompt que você joga fora, ou numa especificação que sua organização
> versiona e reusa?"** — Se a spec é sua fonte da verdade e o conhecimento acumula, você é
> Governado. *(Maturidade 4 → 5)*

---

## Fecho da jornada — Modelo de Maturidade

Após o Módulo 3, a régua de maturidade (1→5, ver 00 §3.1) é reapresentada como **síntese interativa**:
o leitor marca onde está e recebe o próximo passo concreto, fechando o ciclo "da Mágica ao Governado".

> **Frase de fecho (editorial):** *"Você não escreve apenas código para a máquina executar. Você
> escreve o contexto que ensina a máquina a executar com a sua intenção. Faça esse contexto bem — e a
> confiança escala junto."*

---

### Referências cruzadas

- Visualizações e diagramas Mermaid de cada módulo → [04](04_visualizacoes_e_diagramas_mermaid.md)
- Componentes que renderizam o gabarito de módulo → [03](03_wireframes_e_catalogo_de_componentes.md)
- Glossário dos termos em destaque → [05](05_glossario_e_referencias_cruzadas.md)
