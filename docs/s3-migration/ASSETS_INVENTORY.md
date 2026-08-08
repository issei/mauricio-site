# Inventário de Assets > 3MB — Migração GitHub → S3

Gerado em: 2026-08-08
Bucket alvo: `s3://mauricio.issei.com.br` (mesmo bucket do site, deploy via `aws s3 sync dist/ s3://mauricio.issei.com.br --delete`)
Pasta protegida: `static/` (não existe hoje no bucket; não conflita com `assets/`, `fotos/`, `lifeos/`, `referencias/` — todas geradas pelo build)

## Decisão: Opção A (pasta segregada no mesmo bucket)

**Justificativa:**
- Já existe 1 único bucket servindo o site via CloudFront — usar bucket separado exigiria nova origin, novo behavior/path pattern, possível novo CORS. Complexidade sem benefício real.
- Custo: mesmo bucket = sem taxa extra de armazenamento cross-bucket, sem duplicar listagens.
- Mesmo domínio (`mauricio.issei.com.br/static/...`) = zero risco de CORS ao referenciar de `<img>`, `<source>`, `<a>`.
- Isolamento suficiente: basta `--exclude "static/*"` no `aws s3 sync --delete` do deploy.

**Trade-off aceito:** não há isolamento de política IAM/lifecycle entre site e assets estáticos (ambos no mesmo bucket). Se no futuro for necessário (ex: retenção diferente, bucket com versionamento só para assets), migrar para Opção B é direto — os arquivos já estarão sob um prefixo único (`static/`).

---

## Tabela de Migração

| # | Arquivo Original (git) | Tamanho | Novo Caminho S3 | Páginas que Referenciam | Ocorrências |
|---|---|--:|---|---|--:|
| 1 | `public/Do_caos_à_eficiência_preditiva_real.m4a` | 53,3M | `static/audio/do-caos-eficiencia-preditiva-real.m4a` | service-operations-2-0.html | 1 |
| 2 | `public/A_transição_para_orquestrador_de_agentes_IA.m4a` | 43,0M | `static/audio/transicao-orquestrador-agentes-ia.m4a` | salesforce-agentic-dev.html | 4 |
| 3 | `public/DeepDive-Organizacao.m4a` | 34,8M | `static/audio/deepdive-organizacao.m4a` | know.html | 1 |
| 4 | `public/Do_Caos_à_Resiliência_em_Incidentes_Críticos.m4a` | 30,8M | `static/audio/do-caos-resiliencia-incidentes-criticos.m4a` | sustentacao.html | 2 |
| 5 | `public/Consertar_o_Sistema_ou_Gerenciar_a_Crise.m4a` | 30,8M | `static/audio/consertar-sistema-gerenciar-crise.m4a` | sustentacao.html | 1 |
| 6 | `public/Eventos_Salesforce_ML_feedback_em_tempo_real.m4a` | 28,8M | `static/audio/eventos-salesforce-ml-feedback-tempo-real.m4a` | proposta.html | 1 |
| 7 | `public/Debate-Organizacao.m4a` | 28,5M | `static/audio/debate-organizacao.m4a` | know.html | 1 |
| 8 | `public/Critica-Organizacao.m4a` | 28,4M | `static/audio/critica-organizacao.m4a` | know.html | 1 |
| 9 | `public/Antigravity_IA_do_Google_Revolução_ou_Risco.m4a` | 25,8M | `static/audio/antigravity-ia-google-revolucao-risco.m4a` | ⚠️ **NENHUMA (órfão)** | 0 |
| 10 | `public/Engenharia_de_Confiabilidade_em_Produção.pdf` | 14,0M | `static/docs/engenharia-confiabilidade-producao.pdf` | sustentacao.html | 2 |
| 11 | `public/Confiabilidade_Móvel_Unificada.pdf` | 11,3M | `static/docs/confiabilidade-movel-unificada.pdf` | proposta-observabilidade-mobile.html | 2 |
| 12 | `public/fotos/infancia.png` | 9,6M | `static/images/infancia.png` | life.html, life3d.html, terminal-evolutivo.html | 3 |
| 13 | `public/Inteligência_de_Vendas_em_Tempo_Real.pdf` | 9,3M | `static/docs/inteligencia-vendas-tempo-real.pdf` | ⚠️ **NENHUMA (órfão)** | 0 |
| 14 | `src/infosust.png` | 6,5M | `static/images/infosust.png` | sustentacao.html | 2 |
| 15 | `public/arq-proposta.png` | 6,5M | `static/images/arq-proposta.png` | proposta.html | 1 |

**Total:** ~350MB removidos do versionamento (`.git` atual: 291MB → estimativa pós-`gc` bem menor, já que o histórico dos blobs grandes só desaparece de fato com reescrita de histórico — ver seção "Nota sobre .git" abaixo).

### ⚠️ Arquivos órfãos (não usados)
- `Antigravity_IA_do_Google_Revolução_ou_Risco.m4a` (25,8M) — nenhuma página referencia.
- `Inteligência_de_Vendas_em_Tempo_Real.pdf` (9,3M) — nenhuma página referencia (o match anterior era o `<title>` de proposta.html, não um link ao PDF).

Decisão pendente do usuário: migrar mesmo assim (por precaução, ~35M) ou descartar. O plano abaixo assume **migrar** (mais seguro, reversível) — descartar é 1 linha a menos no script de upload.

### Nota sobre `mainV8.pdf`
`public/mainV8.pdf` (496K) já é referenciado por URL absoluta (`https://mauricio.issei.com.br/mainV8.pdf`) em `proposta-observabilidade-mobile.html`, mas está **abaixo do limite de 3MB** — fica fora do escopo desta migração.

### Nota sobre `.git`
Remover os arquivos do commit atual (`git rm --cached`) para de fato parar de VERSIONAR novos changes, mas **não reduz o tamanho do `.git` retroativamente** — os blobs continuam no histórico. Redução real de tamanho do repositório exige reescrita de histórico (`git filter-repo` ou BFG Repo-Cleaner), que é uma operação destrutiva que reescreve todos os hashes de commit. Tratado como **fase opcional separada** no plano de rollback — não incluída no script principal por ser de maior risco (força rewrite de todo o histórico compartilhado).

---

## Estrutura Final no S3

```
s3://mauricio.issei.com.br/
├── static/                              ← NOVO, protegido do --delete
│   ├── audio/
│   │   ├── do-caos-eficiencia-preditiva-real.m4a
│   │   ├── transicao-orquestrador-agentes-ia.m4a
│   │   ├── deepdive-organizacao.m4a
│   │   ├── do-caos-resiliencia-incidentes-criticos.m4a
│   │   ├── consertar-sistema-gerenciar-crise.m4a
│   │   ├── eventos-salesforce-ml-feedback-tempo-real.m4a
│   │   ├── debate-organizacao.m4a
│   │   ├── critica-organizacao.m4a
│   │   └── antigravity-ia-google-revolucao-risco.m4a
│   ├── docs/
│   │   ├── engenharia-confiabilidade-producao.pdf
│   │   ├── confiabilidade-movel-unificada.pdf
│   │   └── inteligencia-vendas-tempo-real.pdf
│   └── images/
│       ├── infancia.png
│       ├── infosust.png
│       └── arq-proposta.png
├── assets/          (build Vite, sobrescrito a cada deploy)
├── fotos/           (public/fotos, sobrescrito — só ficam as fotos < 3MB)
├── lifeos/          (build, sobrescrito)
├── referencias/     (build/AEO, sobrescrito)
└── *.html, *.css... (build, sobrescrito)
```
