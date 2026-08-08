# Manutenção de `s3://mauricio.issei.com.br/static/`

Esta pasta guarda arquivos > 3MB (áudios, PDFs, imagens grandes) referenciados pelo site,
mas **não versionados no GitHub**. O deploy (`.github/workflows/deploy.yml`) roda
`aws s3 sync dist/ s3://mauricio.issei.com.br --delete --exclude "static/*"` — o
`--exclude` garante que esta pasta nunca é tocada pelo CI/CD. Toda manutenção é manual,
via AWS Console ou AWS CLI.

## Adicionar um novo arquivo

1. AWS Console → S3 → bucket `mauricio.issei.com.br` → pasta `static/` → subpasta por tipo
   (`audio/`, `docs/` ou `images/`) → **Upload**.
2. Nomeie o arquivo em minúsculas, sem espaços/acentos (slug), ex: `novo-relatorio.pdf`.
   Evita problemas de URL-encoding (o bucket já tem exemplos antigos com acentos que geram
   URLs feias tipo `%C3%A0` — não repita o padrão).
3. Copie a URL pública: `https://mauricio.issei.com.br/static/<tipo>/<nome-do-arquivo>`.
4. No repositório, edite o HTML da página relevante e use essa URL em `src`/`href`.
5. Commit apenas o HTML (o binário nunca entra no git). Deploy normal via push para `main`.

## Atualizar um arquivo existente

1. AWS Console → localizar o arquivo em `static/<tipo>/`.
2. Upload de um novo arquivo **com o mesmo nome** (sobrescreve).
3. Se o site usa CloudFront (confirmar com o time de infra), pode ser necessário invalidar
   o cache desse path específico:
   ```bash
   aws cloudfront create-invalidation --distribution-id <ID> --paths "/static/docs/nome-do-arquivo.pdf"
   ```
   (o deploy automático já invalida `/*` a cada push — mas uploads manuais em `static/`
   não passam pelo GitHub Actions, então o cache antigo pode persistir até expirar ou até
   uma invalidação manual.)

## Remover um arquivo

1. Primeiro, remova (ou atualize) todas as referências no HTML do repositório e faça deploy
   — evita quebrar um link ativo.
2. Só depois, delete o objeto no S3 via Console ou:
   ```bash
   aws s3 rm s3://mauricio.issei.com.br/static/<tipo>/<arquivo>
   ```

## Convenção de pastas

```
static/
├── audio/    → .m4a, .mp3
├── docs/     → .pdf
└── images/   → .png, .jpg grandes (ex: infográficos, diagramas de arquitetura)
```

## Por que isso existe

Arquivos de mídia grandes (podcasts em áudio, PDFs de propostas, infográficos) infláveis
o `.git` do projeto sem necessidade — eles não mudam com a mesma frequência que o código e
não se beneficiam de controle de versão linha-a-linha. Ver
[`ASSETS_INVENTORY.md`](ASSETS_INVENTORY.md) para o inventário completo e a decisão de
arquitetura (pasta segregada no mesmo bucket, não bucket separado).
