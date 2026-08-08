#!/usr/bin/env bash
# Upload dos 15 assets > 3MB para s3://mauricio.issei.com.br/static/
#
# Pré-requisito: rodar a partir da raiz do repositório, com os arquivos
# originais ainda presentes localmente (antes ou depois do `git rm --cached`
# — a remoção do git não apaga o arquivo em disco).
#
# Uso:
#   bash docs/s3-migration/upload-static-assets.sh          # dry-run (mostra o que faria)
#   bash docs/s3-migration/upload-static-assets.sh --apply   # executa de verdade

set -euo pipefail

BUCKET="mauricio.issei.com.br"
DRY_RUN=true
[[ "${1:-}" == "--apply" ]] && DRY_RUN=false

# origem local | destino s3 (relativo a s3://$BUCKET/)
MAPPING=(
  "public/Do_caos_à_eficiência_preditiva_real.m4a|static/audio/do-caos-eficiencia-preditiva-real.m4a"
  "public/A_transição_para_orquestrador_de_agentes_IA.m4a|static/audio/transicao-orquestrador-agentes-ia.m4a"
  "public/DeepDive-Organizacao.m4a|static/audio/deepdive-organizacao.m4a"
  "public/Do_Caos_à_Resiliência_em_Incidentes_Críticos.m4a|static/audio/do-caos-resiliencia-incidentes-criticos.m4a"
  "public/Consertar_o_Sistema_ou_Gerenciar_a_Crise.m4a|static/audio/consertar-sistema-gerenciar-crise.m4a"
  "public/Eventos_Salesforce_ML_feedback_em_tempo_real.m4a|static/audio/eventos-salesforce-ml-feedback-tempo-real.m4a"
  "public/Debate-Organizacao.m4a|static/audio/debate-organizacao.m4a"
  "public/Critica-Organizacao.m4a|static/audio/critica-organizacao.m4a"
  "public/Antigravity_IA_do_Google_Revolução_ou_Risco.m4a|static/audio/antigravity-ia-google-revolucao-risco.m4a"
  "public/Engenharia_de_Confiabilidade_em_Produção.pdf|static/docs/engenharia-confiabilidade-producao.pdf"
  "public/Confiabilidade_Móvel_Unificada.pdf|static/docs/confiabilidade-movel-unificada.pdf"
  "public/fotos/infancia.png|static/images/infancia.png"
  "public/Inteligência_de_Vendas_em_Tempo_Real.pdf|static/docs/inteligencia-vendas-tempo-real.pdf"
  "src/infosust.png|static/images/infosust.png"
  "public/arq-proposta.png|static/images/arq-proposta.png"
)

echo "=== Upload de assets estáticos para s3://$BUCKET/static/ ==="
$DRY_RUN && echo "(DRY-RUN — nenhum upload real será feito. Use --apply para executar.)"
echo ""

MISSING=0
for entry in "${MAPPING[@]}"; do
  local_path="${entry%%|*}"
  s3_path="${entry##*|}"

  if [[ ! -f "$local_path" ]]; then
    echo "⚠️  AUSENTE localmente, pulando: $local_path"
    MISSING=$((MISSING + 1))
    continue
  fi

  if $DRY_RUN; then
    size=$(du -h "$local_path" | cut -f1)
    echo "[DRY-RUN] $local_path ($size) -> s3://$BUCKET/$s3_path"
  else
    echo "Enviando: $local_path -> s3://$BUCKET/$s3_path"
    aws s3 cp "$local_path" "s3://$BUCKET/$s3_path"
  fi
done

echo ""
if [[ $MISSING -gt 0 ]]; then
  echo "⚠️  $MISSING arquivo(s) não encontrados localmente — verifique antes de prosseguir."
fi

if $DRY_RUN; then
  echo "Revise a lista acima. Para enviar de verdade: bash $0 --apply"
else
  echo "=== Validação pós-upload ==="
  aws s3 ls "s3://$BUCKET/static/" --recursive --summarize | tail -5
fi
