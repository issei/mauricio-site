# Plano de Rollback — Migração de Assets para S3

Cada fase tem um rollback independente. Não é necessário desfazer tudo se só uma etapa falhar.

## Fase 1 — Upload para S3 (`upload-static-assets.sh --apply`)

**Risco:** baixo. Só adiciona objetos em `static/`, não toca em nada existente.

**Rollback:** apagar os objetos enviados.
```bash
aws s3 rm s3://mauricio.issei.com.br/static/ --recursive
```

## Fase 2 — Atualização dos HTMLs (já aplicada nesta sessão)

**Risco:** baixo, reversível via git.

**Rollback:**
```bash
git diff src/*.html   # revisar o que mudou
git checkout -- src/proposta.html src/sustentacao.html src/proposta-observabilidade-mobile.html \
  src/salesforce-agentic-dev.html src/know.html src/service-operations-2-0.html \
  src/life.html src/life3d.html src/terminal-evolutivo.html
```
Isso volta as URLs para os arquivos antigos — funciona **apenas se os arquivos originais
ainda existirem no S3 na raiz** (ou seja, antes de rodar `aws s3 sync --delete` com o novo
`--exclude "static/*"`, que não apaga a raiz; o `--delete` só remove da raiz do bucket o que
não existir mais em `dist/` — como os HTMLs antigos apontavam pra raiz, isso é seguro até a
Fase 4).

## Fase 3 — `.gitignore` e `deploy.yml` (já aplicada nesta sessão)

**Risco:** baixo.

**Rollback:**
```bash
git checkout -- .gitignore .github/workflows/deploy.yml
```

## Fase 4 — Remoção do índice Git (`remove-from-git.sh --apply`)

**Risco:** médio. Depois do commit + push, os arquivos somem do repositório remoto
(mas continuam no histórico de commits antigos — ver "Nota sobre `.git`" no inventário).

**Rollback antes do commit:**
```bash
git reset HEAD <arquivo>   # desfaz o git rm --cached, arquivo volta ao índice
```

**Rollback depois do commit (mas antes do push):**
```bash
git reset --soft HEAD~1    # desfaz o commit, mantém mudanças staged
```

**Rollback depois do push:**
```bash
git revert <hash-do-commit>   # cria um commit novo que restaura os arquivos no índice
git push
```
Isso volta os arquivos para o repositório GitHub (o `.git` volta a crescer). Combine com
Fase 2/3 revertidas para o site voltar a servir os arquivos originais da raiz do bucket.

## Fase 5 — Primeiro deploy com `--exclude "static/*"`

**Risco:** este é o ponto real de não-retorno prático — depois do primeiro
`aws s3 sync dist/ s3://bucket --delete --exclude "static/*"`, os arquivos antigos na
**raiz** do bucket (`Do_caos_...m4a`, `infosust.png` etc.) são apagados pelo `--delete`,
porque não existem mais em `dist/` (foram removidos do `public/`/`src/` e do `.gitignore`)
e não estão sob `static/` (não estão excluídos).

**Validação obrigatória ANTES desse deploy:**
1. Confirmar que TODOS os 15 arquivos estão em `s3://mauricio.issei.com.br/static/` (script `remove-from-git.sh` já faz essa checagem via `head-object`)
2. Confirmar que TODOS os HTMLs apontam para `static/...` (não para a raiz)
3. Rodar `npm run build && npm run test` localmente antes do push para `main`

**Rollback pós-deploy (se algo quebrar):**
```bash
# Restaura os arquivos originais na raiz a partir da cópia em static/
aws s3 cp s3://mauricio.issei.com.br/static/audio/do-caos-eficiencia-preditiva-real.m4a \
          "s3://mauricio.issei.com.br/Do_caos_à_eficiência_preditiva_real.m4a"
# (repetir para os demais 14 arquivos, usando o mapeamento em ASSETS_INVENTORY.md)
```
Isso restaura o comportamento antigo enquanto se investiga o problema — não requer reverter
código, já que os HTMLs antigos apontavam para a raiz.

## Checklist de segurança antes de cada fase irreversível

- [ ] `git status` limpo (sem mudanças não commitadas de outra tarefa)
- [ ] Branch correta (`main` ou branch de feature, conforme o fluxo do time)
- [ ] `aws sts get-caller-identity` confirma a conta AWS correta (conferir o `Account` retornado contra o cadastrado no gerenciador de segredos da equipe — este repositório é público, o número não fica versionado)
- [ ] Backup mental: os arquivos originais continuam em disco local até você apagá-los manualmente — o `git rm --cached` NUNCA apaga do disco
