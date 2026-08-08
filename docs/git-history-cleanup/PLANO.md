# Plano: Redução do Tamanho do Repositório Remoto (GitHub)

Contexto: [`docs/s3-migration/`](../s3-migration/) já removeu os 15 arquivos >3MB do
**HEAD atual** de `main` (commit `58f5f16`) e os migrou para S3. Isso impede o
repositório de crescer daqui pra frente, mas **não reduziu o tamanho do repositório
remoto** — os blobs continuam alcançáveis através do histórico de commits antigos e de
outras branches. Este documento planeja a etapa que falta.

## ✅ Executado em 2026-08-08 — Resultado

| Métrica | Antes | Depois |
|---|---|---|
| `.git` (mirror remoto / clone local) | 282 MiB | 12 MiB |
| Commit HEAD de `main` | `58f5f16` | `4e593ec` (conteúdo idêntico, histórico reescrito) |
| Branches remotas | 20 (main + 19 órfãs) | 1 (só main) |
| PR aberto #3 | Conflitante, obsoleto | Fechado sem merge (mudanças já em main) |

**Desvio em relação ao plano original:** usei `bfg --strip-blobs-bigger-than 3M` em vez
de `--delete-files` por nome — mais robusto contra os nomes de arquivo com acentuação
UTF-8 que causavam mojibake em alguns terminais. Resultado equivalente: os mesmos 15
blobs removidos, confirmado por listagem exata pós-limpeza.

**Achado não previsto no plano original:** o clone de trabalho local
(`D:\projetos\mauricio-site`) tinha 17 branches locais órfãs e **3 git worktrees ativos**
em `.claude/worktrees/` (de sessões anteriores do Claude Code) apontando para commits
antigos — isso por si só impedia o `git gc` local de coletar os blobs mesmo depois do
remoto já estar limpo. Removidos com `git branch -D` e `git worktree remove` (um exigiu
`rm -rf` manual por lock de arquivo). Isso é um ponto de atenção para qualquer limpeza de
histórico futura: **branches/worktrees locais não aparecem em `git ls-remote` e são fáceis
de esquecer**.

**Pendência conhecida (Fase 6, não crítica):** a API do GitHub (`gh api repos/.../size`)
ainda reportava ~288 MiB logo após o push — esse número reflete o cache interno do
GitHub e as refs `refs/pull/N/head` de PRs antigos (mergeados/fechados), que o GitHub
gerencia internamente e não aceitam push externo. Tende a cair sozinho com o GC
periódico do servidor; se não cair em alguns dias, abrir ticket em
support.github.com pedindo para expirar objetos soltos.

---

## Diagnóstico

### Por que o remoto continua grande
O GitHub (como qualquer servidor Git) só libera um blob para garbage collection quando
**nenhum ref** (branch, tag, PR) o alcança mais, nem mesmo em commits antigos. `git rm`
seguido de commit normal só afeta o *estado atual* de um branch — os commits anteriores
continuam apontando para o blob antigo.

### Estado atual do repositório
```
.git local: 292 MiB (1823 objetos soltos)
```

**4 commits em `main`** tocam os 15 arquivos migrados:
| Commit | Data | Mensagem |
|---|---|---|
| `2875efa` | 2026-02-16 | Versão atualizada |
| `685f21e` | 2026-03-23 | adicionado audio |
| `141e703` | 2026-04-27 | feat: Salesforce Agentic DevOps training portal |
| `58f5f16` | 2026-08-08 | chore: migra assets >3MB para S3 (remoção) |

**19 branches remotas** além de `main`. Todas as 19 ainda referenciam os arquivos
grandes em seu histórico (herdado de `main` antigo):

| Categoria | Quantidade | Ação |
|---|---|---|
| Já mergeadas em `main` (órfãs pós-merge) | 18 | Seguras para deletar |
| Com PR aberto, não mergeada | 1 — `fix-salesforce-landing-page-6757543900270492221` (PR [#3](https://github.com/issei/mauricio-site/pull/3)) | Precisa decisão (ver abaixo) |

Nenhuma tag no repositório (não há esse vetor adicional de referência).

### Ferramentas disponíveis neste ambiente
- ✅ `java 24.0.1` → pode rodar **BFG Repo-Cleaner** (jar único, feito especificamente
  para remover arquivos grandes do histórico — mais simples que filter-repo para este
  caso pontual)
- ✅ `pip`/`python 3.11` → pode instalar **git-filter-repo** (`pip install git-filter-repo`),
  a ferramenta hoje recomendada oficialmente pelo Git para reescrita de histórico
- ❌ `git-filter-repo` não está instalado ainda

**Recomendação: BFG Repo-Cleaner.** Para o caso específico de "remover N arquivos
grandes por nome/tamanho de todo o histórico", o BFG é mais direto (um comando, feito
sob medida) do que `git filter-repo`, que é mais poderoso mas exige mais configuração
para o mesmo resultado. `git filter-repo` vale a pena se no futuro for preciso algo mais
sofisticado (reescrever autores, dividir repositório, etc.).

---

## ✅ Resolvido: PR #3 (`fix-salesforce-landing-page`)

Investigado via `git merge-tree` antes de decidir: o GitHub reportava
`mergeable: CONFLICTING`. Ao inspecionar o conflito, as 3 mudanças propostas pelo PR já
estavam incorporadas em `main` por commits posteriores — `v-for="i in 4"` já removido,
vídeo YouTube duplicado do CTA já removido (main hoje só tem 1 iframe), e os 17 SVGs que
o PR marcava com `aria-hidden` já têm o atributo em `main`. O "conflito" era só
diferença de formatação (indentação/quebra de linha), sem conteúdo novo a herdar.

**Ação tomada:** PR fechado sem merge (`gh pr close 3`), com comentário explicando o
motivo. A branch `fix-salesforce-landing-page-6757543900270492221` agora está órfã e
entra no lote de limpeza normal — **19 branches** (não mais 18) seguras para deletar na
Fase 2.

---

## Fases

### Fase 0 — Backup de segurança
```bash
# Clone espelho completo, fora da pasta do projeto, como rede de segurança
git clone --mirror https://github.com/issei/mauricio-site.git ../mauricio-site-backup-mirror.git
```
Guardar esse mirror até confirmar que tudo funcionou após a Fase 5. É a forma de
desfazer qualquer coisa (`git push --mirror` de volta) se algo sair errado.

### Fase 1 — Resolver PR #3
Executar a opção escolhida acima. **Bloqueante** para a Fase 3 ter efeito completo.

### Fase 2 — Deletar as 19 branches remotas já mergeadas/órfãs
```bash
for b in claude/adoring-gagarin-8a0131 claude/compassionate-sutherland-04af75 \
  claude/crazy-lichterman-0dc480 claude/ecstatic-cray-767f01 claude/pensive-beaver-caa7be \
  claude/serene-wing-a33ad9 claude/vigilant-colden-163c5c claude/vigilant-hamilton-accbdf \
  docs/spec-agentica-apresentacao feat/apresentacao-v3 \
  feat/catalogo-conteudos-16731888802732161056 feat/eai-hero-video \
  feat/operacao-capital-cognitivo-impl \
  feature/aeo-geo-jsonld-optimization-15706674873469130399 \
  feature/business-agility-section-5137754410202472481 \
  feature/catalog-page-7112029218799590513 feature/devopsSF \
  fix/remove-jira-references-5406081772640306038 \
  fix-salesforce-landing-page-6757543900270492221; do
  git push origin --delete "$b"
done
```
Isso por si só já remove 19 refs que ancoram os blobs grandes no servidor — parte do
ganho de espaço vem daqui, antes mesmo de reescrever nada.

**Ação visível/compartilhada — confirmar comigo antes de rodar.** Branches do Claude Code
(`claude/*`) normalmente são descartáveis após merge, mas vale uma checada rápida se
alguma ainda está em uso ativo por outra sessão.

### Fase 3 — Reescrever o histórico de `main` com BFG
```bash
# 1. Baixar o BFG (jar único, ~15MB)
curl -Lo bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. Clone espelho DEDICADO para a operação (nunca rodar direto no repo de trabalho)
git clone --mirror https://github.com/issei/mauricio-site.git mauricio-site-rewrite.git
cd mauricio-site-rewrite.git

# 3. Remover os arquivos por nome exato (lista em docs/s3-migration/ASSETS_INVENTORY.md)
java -jar ../bfg.jar --delete-files "Do_caos_à_eficiência_preditiva_real.m4a" .
java -jar ../bfg.jar --delete-files "A_transição_para_orquestrador_de_agentes_IA.m4a" .
java -jar ../bfg.jar --delete-files "DeepDive-Organizacao.m4a" .
java -jar ../bfg.jar --delete-files "Do_Caos_à_Resiliência_em_Incidentes_Críticos.m4a" .
java -jar ../bfg.jar --delete-files "Consertar_o_Sistema_ou_Gerenciar_a_Crise.m4a" .
java -jar ../bfg.jar --delete-files "Eventos_Salesforce_ML_feedback_em_tempo_real.m4a" .
java -jar ../bfg.jar --delete-files "Debate-Organizacao.m4a" .
java -jar ../bfg.jar --delete-files "Critica-Organizacao.m4a" .
java -jar ../bfg.jar --delete-files "Antigravity_IA_do_Google_Revolução_ou_Risco.m4a" .
java -jar ../bfg.jar --delete-files "Engenharia_de_Confiabilidade_em_Produção.pdf" .
java -jar ../bfg.jar --delete-files "Confiabilidade_Móvel_Unificada.pdf" .
java -jar ../bfg.jar --delete-files "infancia.png" .
java -jar ../bfg.jar --delete-files "Inteligência_de_Vendas_em_Tempo_Real.pdf" .
java -jar ../bfg.jar --delete-files "infosust.png" .
java -jar ../bfg.jar --delete-files "arq-proposta.png" .

# 4. Expirar reflog e coletar lixo de verdade (isso é o que realmente encolhe o repo)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```
Alternativa em um único passo, usando um arquivo de texto com os nomes (mais simples de
manter e auditar):
```bash
# docs/git-history-cleanup/arquivos-para-remover.txt já criado com os 15 nomes
java -jar ../bfg.jar --delete-files-file ../docs/git-history-cleanup/arquivos-para-remover.txt .
```

**Validação antes de prosseguir:**
```bash
du -sh .                              # tamanho do mirror pós-gc — deve cair bem abaixo de 292MiB
git log --all --oneline -- '*.m4a' '*.pdf' arq-proposta.png infosust.png infancia.png
# deve retornar vazio: nenhum commit em nenhum branch referencia mais os arquivos
```

### Fase 4 — Force-push do histórico reescrito
```bash
# ainda dentro de mauricio-site-rewrite.git
git push --force
```
Isso sobrescreve `main` (e qualquer branch remanescente) no GitHub com os hashes de
commit reescritos. **Ponto de não-retorno real** — a partir daqui, qualquer clone local
antigo (inclusive o seu clone de trabalho atual em `D:\projetos\mauricio-site`) tem
histórico divergente do remoto.

### Fase 5 — Sincronizar o clone de trabalho local
```bash
# no clone de trabalho normal (D:\projetos\mauricio-site)
git fetch origin
git reset --hard origin/main
git gc --prune=now --aggressive   # aplica a limpeza também no clone local
```

### Fase 6 — Limpeza do lado do GitHub (se necessário)
Mesmo após o force-push, o GitHub pode reter os objetos antigos "soltos" por um tempo
(cache interno, forks se existirem, período de retenção antes do GC automático do
servidor). Se `du -sh .git` local já caiu mas o tamanho do repositório reportado na
página do GitHub não acompanhar em alguns dias, abrir um ticket em
https://support.github.com/ pedindo para "expire dangling commits / run garbage
collection" no repositório — é um pedido comum e o suporte processa rapidamente.

---

## Riscos e quem precisa ser avisado

| Risco | Mitigação |
|---|---|
| Force-push é irreversível sem backup | Fase 0 cria o mirror de segurança primeiro |
| PR #3 fica com histórico incompatível se não resolvido antes | Fase 1 é bloqueante — decisão sua |
| Qualquer colaborador/fork com clone antigo diverge | Você é o único committer ativo identificado (`issei`) — baixo risco aqui, mas confirme se há outro clone (ex: outra máquina, CI cache) que precise re-sincronizar |
| GitHub Actions / webhooks podem falhar temporariamente durante o force-push | Baixo impacto — próximo push normal já corrige |
| Se algo der errado no BFG, corrompe o mirror | Fase 3 roda em clone **separado** (`mauricio-site-rewrite.git`), nunca no repo de trabalho — se falhar, descarta a pasta e recomeça do mirror de backup |

## Resultado esperado
- `.git` remoto: de ~292MiB para uma fração pequena (a estimar após o `gc --aggressive`
  real — a maior parte dos 292MiB são justamente os 15 blobs de ~350MB brutos, comprimidos)
- Histórico de `main` preservado (mesmas mensagens de commit, mesmo conteúdo de código),
  só os 15 blobs binários removidos de todos os commits que os continham
- 18 branches remotas obsoletas removidas
- PR #3 resolvido (mergeado, fechado, ou recriado — conforme sua escolha)
