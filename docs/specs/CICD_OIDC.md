# CI/CD & OIDC Specification

Este documento detalha a configuração de Integração Contínua e Deploy Contínuo (CI/CD) utilizando **GitHub Actions** e autenticação segura via **OIDC (OpenID Connect)** com a AWS.

## Fluxo de Autenticação (OIDC)

O método tradicional de usar `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` está **obsoleto** neste projeto por motivos de segurança. Utilizamos OIDC para que o GitHub solicite um token temporário diretamente à AWS.

### Como Funciona
1.  O GitHub Actions inicia o job `deploy`.
2.  A action `aws-actions/configure-aws-credentials` solicita um token JWT ao provedor OIDC do GitHub.
3.  A AWS valida o token JWT e verifica se o repositório/branch corresponde à regra de confiança (Trust Policy) da role IAM.
4.  Se validado, a AWS retorna credenciais temporárias para o GitHub Runner assumir a role.

### Configuração Necessária

No arquivo `.github/workflows/deploy.yml`:

```yaml
permissions:
  id-token: write   # Permite solicitar o JWT ao GitHub
  contents: read    # Permite ler o código
```

E na step de configuração:

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
    aws-region: ${{ secrets.AWS_REGION }}
```

## Secrets do Repositório

As seguintes secrets devem estar configuradas no GitHub (Settings > Secrets and variables > Actions):

| Secret Name | Descrição | Exemplo |
| :--- | :--- | :--- |
| `AWS_ROLE_ARN` | ARN da Role IAM criada na AWS para confiar neste repo. | `arn:aws:iam::123456789012:role/GitHubDeployRole` |
| `AWS_REGION` | Região AWS onde o S3/CloudFront estão. | `us-east-1` |
| `S3_BUCKET_NAME` | Nome do bucket S3 de origem. | `boutiqueempresarial-site-origin` |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID da distribuição CloudFront. | `E1A2B3C4D5E6F` |

## Pipeline de Deploy (`deploy.yml`)

O pipeline é acionado a cada **push na branch main**.

1.  **Checkout**: Baixa o código.
2.  **Setup Node.js**: Prepara o ambiente Node (v20).
3.  **Install**: `npm install` (instala dependências, incluindo Vite e Tailwind).
4.  **Build**: `npm run build`. O Vite gera os arquivos estáticos na pasta `dist/`.
5.  **Auth AWS**: Assume a role via OIDC.
6.  **S3 Sync**:
    *   Comando: `aws s3 sync dist/ s3://... --delete`
    *   Sincroniza a pasta `dist` com o bucket.
    *   `--delete`: Remove arquivos no bucket que não existem mais no build (limpeza automática).
7.  **CloudFront Invalidation**:
    *   Comando: `aws cloudfront create-invalidation ...`
    *   Invalida o cache globalmente (`/*`) para garantir que os usuários vejam a versão nova imediatamente.

## Manutenção

### Se o deploy falhar na etapa de autenticação:
*   Verifique se o `AWS_ROLE_ARN` está correto.
*   Verifique na AWS IAM se a **Trust Relationship** da role permite a conta do GitHub e o repositório específico.

### Se o deploy falhar no build:
*   Execute `npm run build` localmente para depurar erros de código ou dependência.
