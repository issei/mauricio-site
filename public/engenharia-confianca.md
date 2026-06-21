# A Engenharia da Confiança — Da Intenção à Execução Agêntica

> Versão Markdown, otimizada para leitura por IAs (GEO/AEO), da página
> <https://mauricio.issei.com.br/engenharia-confianca>.
> Autor: **Maurício Yokoyama Issei** · Idioma: pt-BR · Publicado: 2026-06-19 · Atualizado: 2026-06-21 ·
> Licença de citação: fair use educacional, com atribuição.

## Em síntese (resposta direta)

A **Engenharia da Confiança** é a implementação prática do **Intentional Systems Model (ISM) v1.0** —
um modelo de referência que trata cada saída de IA como um artefato governado por arquitetura, não pela
esperança de que o prompt acerte. É uma jornada de quatro módulos que leva da *IA-como-mágica* à
*IA-como-engenharia*.

**Tese central:** a capacidade vem do modelo; a confiança vem da engenharia — e um sistema de IA
confiável tem muito pouca IA no caminho crítico.

Os quatro módulos:

1. **M0 · Despertar** — reconhecer o *Crash Silencioso*: a falha de IA que não dá erro de código, mas perde valor de negócio.
2. **M1 · Mapear** — congelar a verdade do sistema (As-Is) num *Inventário de Comportamentos* auditável.
3. **M2 · Arquitetar** — *determinístico-primeiro*, contratos rígidos, o *Limiar de 98% de Certeza* e o *MCP* como fronteira de segurança.
4. **M3 · Orquestrar** — escalar a intenção com *Spec-Driven Development* e a renderização governada (*A2UI*), tornando-se um Orquestrador Cognitivo.

Alinhado ao **NIST AI Risk Management Framework** e à **ISO/IEC 42001:2023**; espelha modelos de
maturidade como **CMMI** e **Microsoft AI Adoption Maturity Model**.

---

## M0 · O Despertar da Liderança — O Crash Silencioso

A IA não falha como o software clássico: não há *stack trace*, não há exceção — há uma regra de negócio
perdida, um número inventado com confiança, uma decisão errada tomada como se fosse certa. A falha é de
**intenção**, não de código.

A IA é um **amplificador**: entregue a ela clareza organizacional e ela escala a clareza; entregue
confusão e ela escala a confusão — mais rápido e com aparência de competência. O perigo não é o erro
barulhento; é o **Crash Silencioso**: o código compila, a demo encanta, o resultado parece impecável — e
mesmo assim está logicamente errado. LLMs são extraordinários em produzir o que *parece* perfeito:
chamamos isso de **alucinação sintática**.

Antes de acelerar, é preciso uma **Matriz de Evidências**: separar fato observado, inferência e suposição.

**Caso real — Zillow Offers (prejuízo de mais de US$ 500 milhões):** uma rede neural (*Neural Zestimate*)
precificava imóveis em massa. Após a virada macroeconômica pós-pandemia, o modelo seguiu sugerindo preços
inflacionados com altíssima confiança, sem estourar nenhum alerta (*concept drift*). Faltou *Fail-Closed*
e observabilidade ligada aos KPIs de negócio. Monitorar o desvio populacional (**PSI**) e degradar para
*fallback* seguro teria interrompido a aquisição de imóveis supervalorizados.

**KPIs do M0:** *Crash Silencioso Index (CSI)* — execuções com `200 OK` técnico mas impacto nocivo ao
negócio ÷ total (meta < 5%); *Cobertura da Matriz de Evidências* (meta > 80%).

**Dimensão humana:** o ISM ancora-se na **Segurança Psicológica** (Amy Edmondson) e no combate à
**Normalização do Desvio** (Diane Vaughan) — sem clima seguro para relatar anomalias, a pequena deriva
vira desastre (ex.: Target Canada).

---

## M1 · Mapeando a Verdade — Revelar o Implícito

Antes de modernizar (To-Be), congela-se uma fotografia de alta fidelidade do que o sistema *realmente*
faz hoje (As-Is). O conhecimento crítico costuma viver escondido — em Apex, em Flows fragmentados e na
cabeça de poucos especialistas. Modernizar sem mapear é apagar regras vitais sem saber.

A descoberta recomendada é **guiada por jornadas críticas e risco** (top-down com deep dive): parte-se de
uma jornada de negócio (ex.: *Lead-to-Cash*), segue-se o *call stack* e mapeia-se todo componente que ela
toca — isolando o código morto. A IA cruza uma **Matriz de Evidências** multifacetada: estrutural
(metadados, Apex, Flows), de estado (Custom Metadata/Settings), operacional (Event Monitoring, Debug Logs)
e humana (commits, tickets, entrevistas).

O ativo final é um **Inventário de Comportamentos**: regras core, efeitos colaterais e workarounds
históricos, cada um classificado pela confiança da evidência.

**Encadeamento (M1 → M2):** este inventário é a matéria-prima dos contratos. Cada regra core vira uma
cláusula nos *schemas* de validação do Módulo 2.

---

## M2 · Arquitetando a Confiança — A confiança vem da engenharia

Um sistema de IA confiável tem muito pouca IA no caminho crítico. A confiança nasce de **arquitetura
disciplinada**, não de um prompt mais inteligente. Quatro princípios:

1. **Determinístico-primeiro** — resolver com regras e dados tudo o que for possível; gastar IA apenas no *resíduo interpretativo*. Mesma entrada → mesma saída.
2. **Cérebro × Vitrine** — o motor cognitivo (pesado, sensível, com acesso a dados) é um sistema; a interface exposta é outro. Comunicam-se por um contrato estreito. A vitrine nunca toca o banco; o cérebro nunca confia cegamente no que vem de fora.
3. **Contratos rígidos** — a saída do LLM é input não confiável até ser validada por um schema estrito que rejeita campos inesperados. É um firewall entre a probabilidade do modelo e o determinismo do sistema. Sobre essa base: isolamento epistêmico (evidência ≠ inferência ≠ julgamento), **Mundo Aberto** (ausência de dado é incerteza, nunca "falso"), **ledgers de quota** (FinOps) e governança *fail-closed*.
4. **MCP (Model Context Protocol)** — a fronteira de segurança e interoperabilidade: o protocolo padronizado pelo qual o agente ganha "mãos e olhos" de forma controlada, declarando quais ferramentas pode usar.

### Conceito-chave — O Limiar de 98% de Certeza

Contrato rígido, Mundo Aberto e fail-closed convergem num único critério operacional: o **Limiar de 98%
de Certeza**. Toda inferência do LLM carrega um grau de confiança; a arquitetura define um piso explícito.
Qualquer saída cuja confiança fique **abaixo de 98% é interceptada antes de virar fato**: o schema a
rejeita (contrato rígido), o sistema a trata como ausência de evidência (Mundo Aberto) e para num ponto
seguro (fail-closed). O que se devolve nunca é um palpite silencioso, e sim um **fallback estruturado** —
revisão humana, resposta "incerto" explícita ou rota determinística alternativa. É assim que o Crash
Silencioso se torna impossível por construção.

**Encadeamento (M1 → M2 → M3):** os schemas derivam do Inventário de Comportamentos (M1) e, com suas pré
e pós-condições, passam a ser a **assinatura das ferramentas (tools)** que o Orquestrador Cognitivo do
M3 consome via MCP. A regra auditada vira contrato; o contrato vira tool.

**Pipeline determinístico:** Entrada → validação determinística (regras + dados) → poda precoce (filtro
barato primeiro) → resíduo interpretativo → LLM (chamado dentro da etapa) → contrato rígido (schema +
confiança ≥ 98%?) → válido: saída confiável / inválido ou < 98%: fallback estruturado. Um ledger de quota
governa o custo. O LLM nunca decide qual é a próxima etapa.

---

## M3 · A Nova Maestria — De Executor a Orquestrador Cognitivo

A maestria não está em digitar código mais rápido — está em dirigir a inteligência da máquina com
intenção clara. Como um chef executivo que não cozinha cada prato mas garante que cada prato saia certo, o
profissional sobe da execução para o **julgamento**.

O método central é o **Spec-Driven Development (SDD)**: a especificação é a fonte da verdade. Em vez de
pedir "faça X" e torcer, escreve-se o *o quê* e o *porquê*, e a IA implementa *contra* a spec, com testes
(**BDD**) como alvo. O contexto sai da cabeça e entra no repositório.

Fluxo prático (validado no caso Devin + Salesforce): **Spec** → **Retrieve** (descoberta autônoma de
contexto) → **Refatorar** (edição guiada pela spec) → **Validar** (Apex Tests que provam a intenção).

**Arsenal de inteligência organizacional:** *Skills* (procedimentos reutilizáveis), *Playbooks* (receitas
de processo) e *Knowledge* (arquitetura, convenções, lições e *gotchas*). Versionar esse estado cognitivo
no Git permite reverter não só o código, mas o raciocínio que o produziu.

### Conceito-chave — A2UI (Agent-to-User Interface)

O MCP evolui da consulta para a renderização. Numa arquitetura **A2UI**, o Orquestrador Cognitivo usa o
MCP para **emitir intenção de interface**: o Cérebro decide *o quê* apresentar (dados estruturados sob
contrato) e a Vitrine determinística decide *como* renderizar. A interface deixa de ser texto livre
imprevisível e passa a ser um output governado pelos mesmos schemas — testável, auditável e reproduzível.

---

## Modelo de Maturidade — da Mágica ao Governado

Cinco estágios (espelham CMMI e o Microsoft AI Adoption Maturity Model):

1. **Mágica** — "Funcionou na demo."
2. **Consciência** — reconhece o Crash Silencioso.
3. **Mapeado** — o implícito virou explícito.
4. **Arquitetado** — contratos, determinismo, MCP.
5. **Governado** — a spec é a fonte da verdade.

---

## Perguntas frequentes (FAQ)

**O que é a Engenharia da Confiança (ISM v1.0)?** A implementação prática do Intentional Systems Model
v1.0, que trata cada saída de IA como artefato governado por arquitetura. Quatro módulos: Despertar (M0),
Mapear (M1), Arquitetar (M2), Orquestrar (M3). A capacidade vem do modelo; a confiança vem da engenharia.

**O que é o Crash Silencioso?** Uma falha de IA sem erro de código: a demo encanta, mas o resultado está
logicamente errado ou fere uma regra não documentada. É falha de intenção, não de código (ex.: Zillow,
US$ 500M+).

**Por que IA confiável tem pouca IA no caminho crítico?** Porque regras e dados resolvem o determinístico
e a IA atua só no resíduo interpretativo. Menor superfície probabilística = mais auditável e reproduzível.

**O que é o Limiar de 98% de Certeza?** O piso de confiança abaixo do qual toda inferência do LLM é
interceptada e degradada para um fallback estruturado (revisão humana, "incerto" ou rota determinística),
em vez de virar fato. Unifica contrato rígido, Mundo Aberto e fail-closed.

**O que é determinístico-primeiro?** Resolver com regras e dados tudo o que for possível e reservar a IA
para o resíduo interpretativo. Mesma entrada → mesma saída; não-determinismo isolado e testável.

**O que é o MCP e o A2UI?** O MCP é a fronteira controlada pela qual o agente ganha "mãos e olhos" e
declara quais ferramentas pode usar. O A2UI é sua evolução: o agente emite intenção de interface — o
Cérebro decide o quê, a Vitrine determinística decide como renderizar.

**O que é SDD?** Spec-Driven Development: a especificação é a fonte da verdade; a IA implementa contra a
spec com testes (BDD) como alvo. Intenção versionada escala; prompt efêmero se perde.

**Quais são os quatro módulos?** Despertar (M0), Mapear (M1), Arquitetar (M2), Orquestrar (M3).

**Como o ISM se relaciona com NIST AI RMF e ISO/IEC 42001?** Alinha-se ao NIST AI RMF (Map, Measure,
Manage, Govern) e à ISO/IEC 42001:2023; espelha CMMI e o Microsoft AI Adoption Maturity Model.

**Como descobrir o nível de maturidade do meu time?** Use a régua de cinco estágios (Mágica → Governado),
a autoavaliação guiada de 5 perguntas e o checklist de prontidão organizacional na seção Maturidade.

---

## Glossário (21 termos)

- **Crash Silencioso** — Falha de IA sem erro de código, mas com perda de valor de negócio.
- **Resíduo Interpretativo** — A única fração da tarefa em que a IA é realmente necessária, depois que regras e dados resolveram o resto.
- **Vazamento de Modo** — Quando um protótipo descartável vira produção sem o devido upgrade de rigor.
- **Sistema Intencional** — Sistema em que o comportamento é governado pela arquitetura, não pela probabilidade.
- **Alucinação sintática** — Código que parece perfeito mas está logicamente errado.
- **Matriz de Evidências** — Pool multifacetado (estrutural, estado, operacional, humano) que evita falsos-positivos na descoberta.
- **Inventário de Comportamentos** — Ativo holístico do As-Is: regras core, efeitos colaterais e workarounds, classificados por confiança.
- **Determinístico-primeiro** — Resolver com regras e dados; gastar IA apenas no resíduo interpretativo.
- **Cérebro × Vitrine** — Separação física entre motor cognitivo (sensível) e interface (exposta), ligados por contrato estreito.
- **Contrato rígido (schema)** — Esquema estrito que rejeita campos inesperados e inferências abaixo do Limiar de 98%.
- **Open-World / Mundo Aberto** — Ausência de dado é incerteza explícita, nunca "falso".
- **Ledger de quota** — Estado de domínio persistente que governa gasto/créditos e recusa a despesa antes do provedor (FinOps).
- **Poda precoce** — Colocar o filtro mais barato e discriminante o mais cedo possível no pipeline.
- **BDD** — Cenários Dado/Quando/Então com fixtures gravadas; testa o sistema ao redor do modelo.
- **Fail-closed** — Se não foi possível concluir, não se marca como concluído; registra-se o bloqueio e para-se num ponto seguro.
- **MCP (Model Context Protocol)** — Protocolo padronizado que dá ao agente "mãos e olhos" controlados (fronteira de segurança).
- **SDD (Spec-Driven Development)** — A especificação como fonte da verdade; a IA implementa contra a spec.
- **Orquestrador Cognitivo** — Quem dirige a inteligência da máquina com intenção, consumindo tools tipadas derivadas dos schemas.
- **ISM (Intentional Systems Model) v1.0** — Modelo de referência que trata cada output de IA como artefato governado por arquitetura.
- **Limiar de 98% de Certeza** — Piso de confiança abaixo do qual toda inferência é interceptada e degradada para fallback estruturado.
- **A2UI (Agent-to-User Interface)** — Arquitetura em que o orquestrador usa o MCP para emitir intenção de interface.

---

## Referências e base bibliográfica

- Sculley, D. et al. (2015). *Hidden Technical Debt in Machine Learning Systems.* NeurIPS.
- Gal, Y. & Ghahramani, Z. (2016). *Dropout as a Bayesian Approximation.* arXiv:1506.02142.
- Geifman, Y. & El-Yaniv, R. (2017). *Selective Classification for Deep Neural Networks.*
- Guo, C. et al. (2017). *On Calibration of Modern Neural Networks.* arXiv:1706.04599.
- Dekker, S. (2011). *Drift into Failure.*
- Vaughan, D. (1996). *The Challenger Launch Decision* — Normalização do Desvio.
- Edmondson, A. (2018). *The Fearless Organization* — Segurança Psicológica.
- NIST (2023). *AI Risk Management Framework.*
- ISO/IEC 42001:2023 — Sistema de Gestão de Inteligência Artificial.
- CMMI — Capability Maturity Model Integration.
- Microsoft — AI / Agentic Adoption Maturity Model.
- Anthropic (2024). *Model Context Protocol (MCP).* <https://modelcontextprotocol.io>

### Guias-fonte (Markdown)

- Engenharia Reversa Assistida por IA — `/referencias/guia-engenharia-reversa.md` (sustenta M1)
- Engenharia de Agentes de IA — `/referencias/guia-engenharia-agentes-ia.md` (sustenta M2)
- Agent-Driven Development & Vibe Coding — `/referencias/guia-agent-driven-development.md` (sustenta M0/M3)

---

*Conteúdo original sob a metodologia ISM v1.0 (Intentional Systems Model). © 2026 Maurício Yokoyama
Issei. Materiais externos referenciados pertencem aos respectivos autores, citados para fins educacionais
e de rastreabilidade.*
