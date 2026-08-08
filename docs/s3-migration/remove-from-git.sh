#!/usr/bin/env bash
# Remove os 15 assets > 3MB do versionamento do Git (git rm --cached).
# Os arquivos permanecem em disco (não são apagados) — apenas saem do índice.
#
# PRÉ-REQUISITOS (o script valida antes de agir):
#   1. .gitignore já deve conter os 15 arquivos (evita re-adicionar por acidente)
#   2. Upload para S3 já deve ter sido feito e validado (bash upload-static-assets.sh --apply)
#   3. HTMLs já devem ter sido atualizados para apontar para static/... (feito nesta sessão)
#   4. Working tree sem mudanças não relacionadas pendentes (checagem manual recomendada)
#
# Uso:
#   bash docs/s3-migration/remove-from-git.sh          # dry-run
#   bash docs/s3-migration/remove-from-git.sh --apply   # executa `git rm --cached`
#
# Este script NÃO faz commit nem push. Revise `git status` / `git diff --staged`
# e comite manualmente.

set -euo pipefail

DRY_RUN=true
[[ "${1:-}" == "--apply" ]] && DRY_RUN=false

FILES=(
  "public/Do_caos_à_eficiência_preditiva_real.m4a"
  "public/A_transição_para_orquestrador_de_agentes_IA.m4a"
  "public/DeepDive-Organizacao.m4a"
  "public/Do_Caos_à_Resiliência_em_Incidentes_Críticos.m4a"
  "public/Consertar_o_Sistema_ou_Gerenciar_a_Crise.m4a"
  "public/Eventos_Salesforce_ML_feedback_em_tempo_real.m4a"
  "public/Debate-Organizacao.m4a"
  "public/Critica-Organizacao.m4a"
  "public/Antigravity_IA_do_Google_Revolução_ou_Risco.m4a"
  "public/Engenharia_de_Confiabilidade_em_Produção.pdf"
  "public/Confiabilidade_Móvel_Unificada.pdf"
  "public/fotos/infancia.png"
  "public/Inteligência_de_Vendas_em_Tempo_Real.pdf"
  "src/infosust.png"
  "public/arq-proposta.png"
)

echo "=== Pré-checagem: arquivos já acessíveis no S3? ==="
BUCKET="mauricio.issei.com.br"
FAIL=0
for f in "${FILES[@]}"; do
  case "$f" in
    public/Do_caos_à_eficiência_preditiva_real.m4a) s3key="static/audio/do-caos-eficiencia-preditiva-real.m4a" ;;
    public/A_transição_para_orquestrador_de_agentes_IA.m4a) s3key="static/audio/transicao-orquestrador-agentes-ia.m4a" ;;
    public/DeepDive-Organizacao.m4a) s3key="static/audio/deepdive-organizacao.m4a" ;;
    public/Do_Caos_à_Resiliência_em_Incidentes_Críticos.m4a) s3key="static/audio/do-caos-resiliencia-incidentes-criticos.m4a" ;;
    public/Consertar_o_Sistema_ou_Gerenciar_a_Crise.m4a) s3key="static/audio/consertar-sistema-gerenciar-crise.m4a" ;;
    public/Eventos_Salesforce_ML_feedback_em_tempo_real.m4a) s3key="static/audio/eventos-salesforce-ml-feedback-tempo-real.m4a" ;;
    public/Debate-Organizacao.m4a) s3key="static/audio/debate-organizacao.m4a" ;;
    public/Critica-Organizacao.m4a) s3key="static/audio/critica-organizacao.m4a" ;;
    public/Antigravity_IA_do_Google_Revolução_ou_Risco.m4a) s3key="static/audio/antigravity-ia-google-revolucao-risco.m4a" ;;
    public/Engenharia_de_Confiabilidade_em_Produção.pdf) s3key="static/docs/engenharia-confiabilidade-producao.pdf" ;;
    public/Confiabilidade_Móvel_Unificada.pdf) s3key="static/docs/confiabilidade-movel-unificada.pdf" ;;
    public/fotos/infancia.png) s3key="static/images/infancia.png" ;;
    public/Inteligência_de_Vendas_em_Tempo_Real.pdf) s3key="static/docs/inteligencia-vendas-tempo-real.pdf" ;;
    src/infosust.png) s3key="static/images/infosust.png" ;;
    public/arq-proposta.png) s3key="static/images/arq-proposta.png" ;;
  esac

  if aws s3api head-object --bucket "$BUCKET" --key "$s3key" >/dev/null 2>&1; then
    echo "✅ s3://$BUCKET/$s3key"
  else
    echo "❌ AUSENTE no S3: s3://$BUCKET/$s3key (origem: $f)"
    FAIL=$((FAIL + 1))
  fi
done

if [[ $FAIL -gt 0 ]]; then
  echo ""
  echo "⚠️  $FAIL arquivo(s) ainda não estão no S3. Rode upload-static-assets.sh --apply antes de continuar."
  exit 1
fi

echo ""
echo "=== Todos os arquivos confirmados no S3. Prosseguindo com git rm --cached ==="
echo ""

for f in "${FILES[@]}"; do
  if ! git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
    echo "ℹ️  Já não está versionado, pulando: $f"
    continue
  fi

  if $DRY_RUN; then
    echo "[DRY-RUN] git rm --cached \"$f\""
  else
    git rm --cached "$f"
  fi
done

echo ""
if $DRY_RUN; then
  echo "Revise a lista acima. Para executar de verdade: bash $0 --apply"
else
  echo "=== Próximos passos manuais ==="
  echo "1. git status                     # confirmar que só os 15 arquivos saíram do índice"
  echo "2. git diff --staged --stat        # revisar"
  echo "3. git commit -m 'chore: remove assets >3MB do versionamento, migrados para S3/static/'"
  echo "4. git push"
  echo "   (o arquivo continua em disco localmente e no .gitignore — não será re-adicionado)"
fi
