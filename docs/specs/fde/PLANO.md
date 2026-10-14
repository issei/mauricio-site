# Planejamento — Reposicionamento FDE do mauricio-site

> Base: "Especificação SDD — Reposicionamento para Forward-Deployed Engineer" v1.0 (13/10/2026).
> Data deste plano: 14/10/2026. Status: **aprovado pelo autor ("prosseguir com o plano", 14/10/2026)**.
> v1.1: §5.2 atualizada com a configuração local real (RTK, Caveman); WU-2 ajustada à restrição do Argos (SDD-FDE §0.3).
> Spec: [`SDD-FDE.md`](SDD-FDE.md). Decisões D1–D5 adotadas por padrão: SDD-FDE §0.2.
> Execução prevista: Claude Code na máquina local (`D:\projetos\mauricio-site`), com as ferramentas locais.

---

## 1. Resumo em cinco linhas

1. O trabalho é **mais editorial e factual do que de código**. O gargalo é a Fase 0 (evidências do autor), não a implementação.
2. Quase tudo que a spec pede já tem um mecanismo no repositório: `cv.json` → `gen-portfolio.mjs`, camada editorial (`editorial.data.mjs`), gêmeo `/en/` (Argos), gate por impacto. O plano **estende esses mecanismos** e cria só um gerador novo (cases).
3. As regras editoriais da spec (§2.3 e §7) viram **teste determinístico** (`tests/fde.claims.test.mjs`) antes de qualquer texto novo. É o mesmo princípio que o site defende: determinístico no caminho crítico.
4. A orquestração usa três camadas de modelo: o mais forte só decide e audita fatos; o intermediário escreve e implementa; o barato faz o mecânico. RTK e Caveman cortam tokens de saída de comando e de conversa, **nunca** do texto publicado.
5. São 12 unidades de trabalho (WU), um PR cada, quase todas em série, porque disputam os mesmos arquivos gerados.

---

## 2. O que já existe e como a spec se apoia nisso

| Requisito da spec | Mecanismo existente | O que muda |
|---|---|---|
| R-FDE-001 headline | `cv.json.Titulo` → `gen-portfolio.mjs` → `index.html`, `curriculo.html`, `curriculo.md`, JSON-LD `jobTitle` | Editar `Titulo` e regenerar. Conferir `llms.txt`, `llms-full.txt`, `cv-for-ai.md`, que não são gerados. |
| R-FDE-002/003 manifesto e provas | `ResumoHero` + quadro de resultados (`pf-board`) no gerador | Novo bloco "Provas" no gerador, com link de cada prova para o case. |
| R-FDE-004 taxonomia | `cv.json.Habilidades` / `Experiencia.Competencias` | Contextualizar rótulos; não apagar termos históricos. |
| R-FDE-005/006 cases STAR-FDE | `cv.json.Projetos` (19 projetos STAR) + `star.json` + `career-highlights-star.md` | **Novo**: `public/cases.json` + `scripts/gen-cases.mjs` → `src/cases.html` + `public/cases.md`. |
| R-FDE-007 template SDD | `src/devops-salesforce.html` (já passou pelo piloto PT-BR Controlado, PR #116) | Acrescentar o template YAML e os rótulos de evidência. |
| R-FDE-008 engenharia reversa | `src/proposta-engenharia-reversa.html` | Tabela entrada / saída / condição de conclusão por etapa. |
| R-FDE-009 rótulos de evidência | Camada editorial (`scripts/editorial/editorial.data.mjs`, PRs #93 e #94) | Novo campo `evidence` na camada, com taxonomia fechada de 4 valores. |
| R-FDE-010 metadados | `llms.txt`, `llms-full.txt`, `cv-for-ai.md`, gêmeos `.md`, `check-md-twins.mjs` | Teste de headline única em todas as superfícies. |
| Fase 1 navegação | `specs/ecosystem.nav.yaml` + `src/js/eco-nav.js` + `NAV` do gerador | Exige bump de versão e **aprovação humana** (ECOSYSTEM.md §Fronteiras). |
| PT/EN consistentes | `npm run i18n:sync` (Argos, local, custo zero) | Testar a headline no `/en/`. O Argos não aceita glossário (`knowledge/i18n-terminologia-argos.md`); correção sempre na fonte PT. |

### Divergências entre a spec e o repositório (corrigir na spec antes de codar)

- A spec fala em **18** projetos STAR; `cv.json` e `career-highlights-star.md` têm **19**.
- A prova "economia superior a 3 milhões" aparece no site como **"mais de 3MM"**, sem moeda. Não acrescentar "R$" sem fonte.
- O case "Economia na negociação do contrato Salesforce" corresponde ao projeto **"Revisão orçamentária e CINVEST do novo contrato Salesforce" (2020)**.
- `cv.json` é o fallback local do repositório `issei/curriculo`. Mudar `Titulo` ou `Projetos` aqui sem refletir lá cria duas versões do currículo. **Decisão do autor** (§9, D3).

---

## 3. Arquitetura da solução

### 3.1 Cases em arquivo próprio, não dentro do `cv.json`

`public/cases.json` segue o modelo da spec §6, com dois campos a mais:

```yaml
case:
  id: "case-agrupamento-comercial"
  projeto_ref: "Projeto de Agrupamento Comercial"   # chave em cv.json.Projetos[].Nome
  publicar: false                                   # só vira true com validação do autor
  revisado_em: "2026-10-xx"
  # ...demais campos da spec §6, incluindo nivel_evidencia e fonte
```

Motivos: o `cv.json` continua sendo o registro histórico (e o espelho de `issei/curriculo`); o case FDE é uma **leitura** desse registro com campos que o currículo não tem (nível de evidência, padrão reutilizável). `projeto_ref` permite ao teste garantir que todo case aponta para um projeto real.

### 3.2 Regras editoriais como teste (antes do texto)

`tests/fde.claims.test.mjs` (node:test, entra no gate) lê `cases.json`, as páginas alteradas e os ativos AEO, e falha quando:

| Regra | Origem na spec |
|---|---|
| `nivel_evidencia` fora de `confirmada \| parcial \| a_confirmar`; case `publicar:true` com `a_confirmar` | R-FDE-005, §11 |
| case publicado sem ao menos 1 item em `componentes_construidos` **e** 1 em `validacao` ou `impacto_mensurado` | R-FDE-005 |
| número em `impacto_mensurado` que não aparece literalmente no texto do `projeto_ref` | §6, §7 |
| frases proibidas: "apaixonado por tecnologia", "orientado a resultados", "zero quebra" | R-FDE-002, §2.3 |
| MCP, RAG, evals, guardrails fora de um bloco com rótulo de evidência (R-FDE-009) | §7 |
| headline divergente entre `index.html`, `curriculo.html`, `llms.txt`, `cv-for-ai.md`, JSON-LD e `/en/` | R-FDE-010 |
| case sem `fonte` ou sem `revisado_em` | §7 |

"Produção" usada só com evidência (§7) não é verificável por regex sem falso positivo. Fica com o auditor de evidências (§5), não com o teste.

### 3.3 Rótulos de evidência pela camada editorial

`editorial.data.mjs` ganha `evidence: 'comprovada' | 'aplicado' | 'recomendado' | 'proxima'` por página (e, quando preciso, por seção via `id`). O `gen-editorial.mjs` renderiza o selo junto do "Formato" e "Profundidade". Assim o rótulo não toca a prosa, que era a regra da camada editorial.

### 3.4 Confidencialidade

O repositório é público. As respostas da Fase 0 classificadas como **confidencial** ou **não publicável** ficam numa pasta fora do repositório (sugestão: `D:\projetos\fde-evidencias\`). No repositório entra só o que é público, com `fonte` apontando para material já publicado. O questionário em branco pode ficar em `docs/specs/fde/evidencias/`.

---

## 4. Como usar a skill PT-BR Controlado

Em 14/10 você escolheu **não** estender a revisão às páginas já existentes, e o plano respeita isso. A skill entra só no **texto novo ou reescrito** por este projeto:

| Onde | Modo | Perfil | Por quê |
|---|---|---|---|
| Cases STAR-FDE (texto de `cases.json`) | Redação | Técnico | Verbos de ação, números e ressalvas protegidos. |
| Manifesto e provas da home | Revisão | Híbrido | Texto curto e público; ambiguidade custa caro. |
| Template SDD e tabela de engenharia reversa | Redação | Técnico | São requisitos: o perfil Técnico cobra verificabilidade. |
| Rótulos e resumos da camada editorial | Revisão | Editorial | Intervenção mínima. |
| Páginas existentes fora do escopo | — | — | Não aplicar (decisão de 14/10). |

Regras de uso:

- Depois de cada redação: `python3 scripts/verificar.py original.md --comparar revisado.md` para garantir que nenhum número ou ressalva sumiu. Isso conversa com a regra §6 da spec ("impacto mensurado só com números publicados").
- O script continua **fora** do `npm run gate`, como recomendou o piloto (27 alertas, todos descartados na leitura).
- A ordem de revisão é: PT-BR Controlado (clareza) → `tone-reviewer` (tom) → auditor de evidências (fatos). A primeira não substitui as outras.
- O Argos retraduz a página inteira para `/en/`. Por isso cada PR toca poucas páginas.
- **Conferir no seu computador** se a skill aparece no Claude Code local (`/skills`). Ela está na sua conta do claude.ai; se o CLI não a enxergar, instale em `~/.claude/skills/ptbr-controlado/` (nível usuário, não no repositório).

---

## 5. Orquestração agêntica

### 5.1 Três camadas de modelo

| Camada | Modelo | Papel neste projeto | Quanto usar |
|---|---|---|---|
| Decisão e auditoria | Opus | Fechar a spec, modelo de dados, auditoria factual de cada case, revisão final de PR | Pouco e em pontos fixos |
| Execução | Sonnet | Orquestrador do dia a dia, gerador `gen-cases.mjs`, testes, redação dos cases com a skill | A maior parte |
| Mecânico | Haiku | Questionários por case, regenerar arquivos, gêmeos `.md`, checklist de SEO, triagem de saída de teste | Sempre que não houver julgamento |

Como configurar:

- **Sessão principal:** `/model opusplan` (Opus no modo de plano, Sonnet na execução). Cada WU começa em plan mode e executa em Sonnet.
- **Subagentes** em `.claude/agents/` com `model:` no frontmatter. Já existem e são reaproveitados: `tone-reviewer`, `a11y-design-reviewer`. Novos (curtos, um arquivo cada):

| Subagente | Modelo | Ferramentas | Entrada → saída |
|---|---|---|---|
| `fde-evidence-auditor` | opus | Read, Grep, Bash (só leitura) | case + fonte → veredito por afirmação: sustentada / parcial / sem fonte |
| `fde-case-writer` | sonnet | Read, Edit, Bash | questionário respondido → entrada em `cases.json` (com a skill PT-BR Controlado) |
| `fde-mechanic` | haiku | Read, Write, Edit, Bash | spec fechada → arquivos regenerados, gêmeos, checklist |

Os plugins já instalados no seu ambiente (`hzblj-skills` com `deep-reasoner` e `fast-worker`, `superpowers` com `writing-plans` e `subagent-driven-development`) cobrem o mesmo desenho. Use os subagentes FDE quando o contexto do domínio importar, e os genéricos para o resto.

### 5.2 Ferramentas locais de economia

| Ferramenta | Onde ganha | Regra |
|---|---|---|
| **RTK** | Leitura e busca: `rtk read`, `rtk grep`, `rtk ls`, `rtk git` (já liberados em `.claude/settings.local.json`) | Preferir esses quatro a `Read`/`cat` inteiro. Para depurar um teste vermelho, rodar sem RTK (saída completa). Conferir a economia (`rtk gain`) ao fim de cada WU. |
| **Caveman** (suíte local v1.1.4: proxy, shrink, cavemem, mcp, learn) | Diagnóstico e compressão de contexto de entrada | O último relatório `learn` (03/09/2026, 45 sessões) mediu: **81% dos turnos acima de 50% da janela**; saída de ferramenta = 239 mil tokens, com `Bash(cd …)` em 28% e leituras inteiras de `.mjs`/`.md` em 20%. Daí três regras: **uma WU por sessão** (`/clear` entre WUs, `/compact` antes de metade da janela); **leituras estreitas** (trecho, não arquivo); **sem `cd` encadeado**, caminhos absolutos. A base de uso do proxy está vazia desde 03/09: gerar um relatório `learn` novo no início (linha de base) e no fim de cada fase. Compressão vale para o contexto de entrada, **nunca** para o texto que vai ao site. |
| **Gate por impacto** (`scripts/gate/impacto.mjs`) | Playwright e axe só nas páginas tocadas | Gate seletivo durante a WU; suíte inteira só antes do PR. |
| **Argos** | Tradução `/en/` | Custo zero de token. Nunca traduzir com LLM; nunca editar `src/en/**` à mão. |
| **CodeGraph** | Perguntas sobre `.js`/`.mjs` (geradores, testes) | Não indexa HTML: para as páginas, Grep/Read. |
| **Arquivos como passagem de contexto** | Entre subagentes | O subagente recebe o caminho da spec da WU, não um resumo no prompt. Prefixo estável favorece cache. |

> **Conferido em 14/10/2026** (pasta do projeto e `~/.caveman` no computador do autor): RTK liberado no projeto para `read`, `grep`, `ls`, `git`; Caveman v1.1.4 instalado, com relatório `learn` de 03/09; Argos roda pelo venv local (`I18N_PYTHON` em `.claude/settings.local.json`). Não foi possível ver `~/.claude/` (pasta protegida), então hooks e plugins de usuário não foram conferidos.

### 5.3 Paralelismo: pouco, e de propósito

Quase toda WU regrava os mesmos arquivos gerados (`index.html`, `curriculo.html`, `i18n-manifest.json`, `src/en/**`). Rodar em paralelo gera conflito de merge em arquivo gerado, que custa mais do que economiza. Então:

- **Em paralelo** só o que é leitura: auditoria de evidências dos 8 cases (um subagente por case) e diagnóstico das páginas.
- **Em série** tudo que escreve, uma WU por branch e PR.
- Worktree (`superpowers:using-git-worktrees`) só se uma WU de método (WU-8, WU-9) correr enquanto se espera resposta da Fase 0. Essas não tocam `cv.json`.

### 5.4 Ciclo de cada WU

```text
1. Plan mode (Opus)      lê a spec da WU em docs/specs/fde/, escreve critérios de aceite
2. Teste primeiro (Sonnet)  amplia fde.claims.test.mjs ou o .spec.js da página; vê falhar
3. Implementa (Sonnet)   gerador/dados; texto via fde-case-writer + PT-BR Controlado
4. Mecânico (Haiku)      regenera, i18n:sync, i18n:check, gêmeos .md
5. Revisões paralelas    tone-reviewer · a11y-design-reviewer · fde-evidence-auditor
6. Gate                  seletivo → completo (npm run gate) com RTK
7. PR                    um por WU; registra o consumo da sessão no ledger
```

### 5.5 Medir o custo

`docs/specs/fde/LEDGER.md` com uma linha por WU: modelo da sessão, tokens ou custo (`/cost` ou `/usage`), economia do RTK (`rtk gain`), número de rodadas de gate. Depois de 3 WUs dá para ver onde o dinheiro vai e ajustar as camadas. É o mesmo "ledger de quota" que o site defende em engenharia-agentes-ia.

---

## 6. Unidades de trabalho

Legenda de dependência: **H** = precisa de você.

| WU | Entrega | Requisitos | Depende de | Modelo dominante |
|---|---|---|---|---|
| **0** | Ambiente: conferir RTK, Caveman, skill PT-BR Controlado no CLI, Argos; criar os 3 subagentes; `LEDGER.md` | — | — | Sonnet |
| **1** | Spec no repo: `docs/specs/fde/SDD-FDE.md` (spec v1.0 + correções da §2) + `ADR-fde-001` (cases.json) + questionários dos 8 cases | Fase 0 (preparação) | 0 | Opus decide, Haiku gera questionários |
| **2** | Guardrails: `tests/fde.claims.test.mjs` + schema de `cases.json` + teste da headline no `/en/`. Sem texto novo. | §2.3, §7 | 1 | Sonnet |
| **3** | Home: headline, manifesto, bloco de 4 provas; `llms.txt`, `llms-full.txt`, `cv-for-ai.md`, JSON-LD | R-001, 002, 003, 010 | 2 + **H** (D1, D3) | Sonnet + PT-BR Controlado |
| **4** | Infra de cases: `gen-cases.mjs` → `src/cases.html` + `public/cases.md` + `tests/cases.spec.js`; 8 cases com `publicar:false` | R-005, 006 | 2 | Sonnet; Haiku no gêmeo |
| **5** | Cases lote A (4 com mais evidência) publicados | R-005, 006 | 4 + **H** (respostas da Fase 0 e validação) | Sonnet escreve, Opus audita |
| **6** | Cases lote B (4 restantes) publicados; provas da home passam a apontar para os cases | R-003, 005 | 5 + **H** | idem |
| **7** | Taxonomia de competências no currículo | R-004 | 3 + **H** (D3) | Sonnet + PT-BR Controlado |
| **8** | DevOps Salesforce: template SDD + rótulos | R-007, 009 | 2 (pode correr em worktree) | Sonnet |
| **9** | Engenharia reversa: entrada / saída / conclusão por etapa | R-008 | 2 (pode correr em worktree) | Sonnet |
| **10** | Rótulos de evidência nas páginas de IA via camada editorial (engenharia-agentes-ia, case-agents, sustentacao, service-operations-2-0, digital-workplace-agentico) | R-009 | 2 | Sonnet; Opus classifica |
| **11** | Navegação orientada a problemas (Cases, Métodos, Experiência, Notas, Dados para agentes): `NAV` do gerador + `ecosystem.nav.yaml` + `eco-nav.js` com bump | Fase 1 | 6 + **H** (D2) | Sonnet |
| **12** | Validação final: teste de extração por agente (script lê `llms.txt` e gêmeos `.md` e confere headline e cases), checagem PT/EN, relatório da DoD | Fase 5, §11 | todas | Haiku roda, Opus avalia |

**Fora deste plano:** a Fase 4 da spec (cases de MCP, RAG, evals, guardrails). Ela só começa quando houver um case real com fluxo, contrato, falha, fallback e teste. O teste da WU-2 impede que entre antes.

### 6.1 Caminho crítico

```text
0 → 1 → 2 → 3 ──────────────→ 7
          └→ 4 → [H: Fase 0] → 5 → 6 → 11 → 12
          └→ 8, 9, 10  (enquanto espera a Fase 0)
```

A Fase 0 depende de você responder os questionários. As WUs 8, 9 e 10 preenchem esse tempo de espera sem depender das respostas.

---

## 7. Fase 0: o que vou pedir para cada case

Um arquivo por case, pré-preenchido com o que já está em `cv.json` e `star.json`. Você completa os campos vazios e marca cada resposta como **pública**, **confidencial** ou **não publicável**.

1. Papel exato (o que você decidiu, construiu ou liderou).
2. Componentes alterados: serviço, objeto Salesforce, API, fila, tabela, pipeline, dashboard.
3. Ambiente de implantação e forma de rollout (ondas, piloto, big bang).
4. Validação: homologação, testes, logs ou monitoramento usados.
5. Incidentes e causa-raiz relevantes.
6. Métrica antes/depois, período e como foi medida.
7. Ativo reutilizado depois (componente, padrão, jornada).

Os 8 cases (R-FDE-006): Agrupamento Comercial (2024) · Pipe Automática Comercial (2025) · Callback de status do credenciamento (2023) · Abertura de Conta PJ (2022) · Evolução do Credenciamento no Plano Padrão (2022) · Entrega na hora da máquina (2024) · Validação do domicílio bancário (2022) · Contrato Salesforce / CINVEST (2020).

---

## 8. Riscos

| Risco | Mitigação |
|---|---|
| Caveman contaminar texto publicado | Desligado no `fde-case-writer`; `tone-reviewer` e PT-BR Controlado na revisão |
| RTK esconder a linha que explica uma falha | Rodar sem RTK ao depurar |
| Argos traduzir "Forward-Deployed Engineer" de forma inconsistente | Teste de headline no `/en/` (WU-2); correção na fonte PT, nunca em `src/en/**` |
| `cv.json` divergir de `issei/curriculo` | Decisão D3 antes da WU-3 |
| Dado confidencial no repositório público | Respostas da Fase 0 fora do repo (§3.4) |
| Fase 0 atrasar tudo | WUs 8–10 independentes; cases ficam com `publicar:false` sem quebrar nada |
| Navegação nova quebrar o grafo do ecossistema | WU-11 só com aprovação e bump, conforme ECOSYSTEM.md |
| Diff grande no `/en/` em cada PR | Uma página por PR; o revisor olha o PT e confia no gate para o EN |

---

## 9. Decisões que preciso de você

| # | Pergunta | Minha recomendação |
|---|---|---|
| D1 | Headline exatamente como a spec ("Forward-Deployed Engineer \| Enterprise Systems & Applied AI \| Salesforce, AWS e Integrações de Produção") ou versão curta no hero e completa no `<title>`? | Curta no hero, completa no `<title>` e no JSON-LD |
| D2 | Aprovar a nova navegação (WU-11), que muda o `ecosystem.nav.yaml`? | Sim, depois dos cases publicados |
| D3 | Mudanças em `Titulo` e competências também vão para `issei/curriculo`? | Sim: lá primeiro, aqui o fallback |
| D4 | Cases em `public/cases.json` separado (§3.1)? | Sim |
| D5 | Onde guardar as respostas confidenciais da Fase 0? | Pasta fora do repo, no seu computador |

---

## 10. Próximo passo

WU-0 e WU-1 foram entregues juntas (spec, ADR, questionários, subagentes e ledger em `docs/specs/fde/` e `.claude/agents/`).

1. **Autor:** responder os questionários em `docs/specs/fde/evidencias/` (só o que for público; o resto numa cópia fora do repositório).
2. **Agente, em paralelo:** WU-2. Abrir o Claude Code em `D:\projetos\mauricio-site`, `/model opusplan`, e pedir:

> Execute a WU-2 de `docs/specs/fde/PLANO.md`: teste primeiro, sem texto novo no site. Registre o consumo no `LEDGER.md`.
