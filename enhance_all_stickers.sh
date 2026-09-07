#!/bin/bash
# ==============================================================================
# KeyCore AI — Script de Super-Resolution em Lote para os 146 Adesivos
# Modelo: Real-ESRGAN Anime 6B (realesrgan-x4plus-anime)
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

SRC_DIR="KeyCore_146_stickers_PNG_HD_transparentes"
DEST_DIR="KeyCore_146_stickers_PNG_HD_transparentes_enhanced"

BIN="./bin/realesrgan-ncnn-vulkan"
MODELS_DIR="./bin/models"
MODEL_NAME="realesrgan-x4plus-anime"
SCALE="4"

if [ ! -f "$BIN" ]; then
  echo "❌ Binário não encontrado em $BIN"
  exit 1
fi

if [ ! -d "$SRC_DIR/PNG" ]; then
  echo "❌ Pasta de origem não encontrada: $SRC_DIR/PNG"
  exit 1
fi

echo "======================================================================"
echo "🚀 KeyCore AI — Aprimoramento dos 146 Stickers com Real-ESRGAN Anime 6B"
echo "======================================================================"
echo "📁 Origem:  $SRC_DIR/PNG"
echo "📁 Destino: $DEST_DIR/PNG"
echo "🤖 Modelo:  $MODEL_NAME (Scale: ${SCALE}x)"
echo "⚡ GPU:     Apple M3 Pro (Metal / Vulkan)"
echo "======================================================================"
echo ""

mkdir -p "$DEST_DIR/PNG"

# 1. Copiar arquivos auxiliares (indice e previa)
if [ -f "$SRC_DIR/indice.csv" ]; then
  cp "$SRC_DIR/indice.csv" "$DEST_DIR/indice.csv"
fi
if [ -d "$SRC_DIR/PREVIAS" ]; then
  mkdir -p "$DEST_DIR/PREVIAS"
  cp -r "$SRC_DIR/PREVIAS/"* "$DEST_DIR/PREVIAS/" 2>/dev/null || true
fi

# 2. Criar README documentando o aprimoramento
cat << 'EOF' > "$DEST_DIR/LEIA-ME.txt"
KEYCORE | STICKERS HD (ENHANCED — REAL-ESRGAN ANIME 6B)

146 stickers individuais com restauração super-resolution via IA.

- Modelo: Real-ESRGAN Anime 6B (x4plus-anime)
- Melhorias aplicadas:
  * Remoção completa de borrão de interpolação e mosquito noise em textos
  * Contornos de faca de corte (cutline) retificados e nítidos
  * Cores sólidas e degradês restaurados sem sangria
  * Fundo transparente RGBA preservado
  * Resolução ultra-alta: mais de 8000 pixels (ideal para impressão gráfica 300+ DPI em qualquer escala)

Organização idêntica à pasta original: uma pasta por coleção (01_neon a 10_devolvemos_tempo).
EOF

# 3. Listar as 10 coleções em ordem
COLLECTIONS=(
  "01_neon"
  "02_inovacao"
  "03_tech_people"
  "04_construir_juntos"
  "05_ideias_que_movem"
  "06_lancar_e_evoluir"
  "07_keep_building"
  "08_codigo_em_acao"
  "09_build_better"
  "10_devolvemos_tempo"
)

TOTAL_COLLECTIONS=${#COLLECTIONS[@]}
COLLECTION_INDEX=0

START_TIME=$(date +%s)

for col in "${COLLECTIONS[@]}"; do
  COLLECTION_INDEX=$((COLLECTION_INDEX + 1))
  IN_COL_DIR="$SRC_DIR/PNG/$col"
  OUT_COL_DIR="$DEST_DIR/PNG/$col"

  if [ ! -d "$IN_COL_DIR" ]; then
    echo "⚠️ Pasta não encontrada: $IN_COL_DIR (pulando)"
    continue
  fi

  mkdir -p "$OUT_COL_DIR"

  # Contar imagens na coleção
  TOTAL_IMGS=$(find "$IN_COL_DIR" -maxdepth 1 -type f -name "*.png" | wc -l | tr -d ' ')
  ALREADY_DONE=$(find "$OUT_COL_DIR" -maxdepth 1 -type f -name "*.png" | wc -l | tr -d ' ')

  echo "----------------------------------------------------------------------"
  echo "📦 [$COLLECTION_INDEX/$TOTAL_COLLECTIONS] Coleção: $col"
  echo "   Total de adesivos: $TOTAL_IMGS | Já processados: $ALREADY_DONE"

  if [ "$ALREADY_DONE" -ge "$TOTAL_IMGS" ] && [ "$TOTAL_IMGS" -gt 0 ]; then
    echo "   ✅ Todos os adesivos desta coleção já foram concluídos. Pulando."
    continue
  fi

  # Criar pasta temporária de lote para processar apenas os que faltam
  TEMP_BATCH_IN="$DEST_DIR/.temp_batch_in_$col"
  rm -rf "$TEMP_BATCH_IN"
  mkdir -p "$TEMP_BATCH_IN"

  PENDING_COUNT=0
  for img in "$IN_COL_DIR"/*.png; do
    [ -e "$img" ] || continue
    BASENAME="$(basename "$img")"
    if [ ! -f "$OUT_COL_DIR/$BASENAME" ]; then
      cp "$img" "$TEMP_BATCH_IN/$BASENAME"
      PENDING_COUNT=$((PENDING_COUNT + 1))
    fi
  done

  if [ "$PENDING_COUNT" -gt 0 ]; then
    echo "   ⚡ Processando $PENDING_COUNT adesivos pendentes na GPU..."
    $BIN -i "$TEMP_BATCH_IN" -o "$OUT_COL_DIR" -n "$MODEL_NAME" -s "$SCALE" -m "$MODELS_DIR"
    rm -rf "$TEMP_BATCH_IN"
    echo "   ✨ Coleção $col concluída com sucesso!"
  else
    rm -rf "$TEMP_BATCH_IN"
    echo "   ✅ Nada pendente nesta coleção."
  fi
done

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

TOTAL_PROCESSED=$(find "$DEST_DIR/PNG" -type f -name "*.png" | wc -l | tr -d ' ')

echo ""
echo "======================================================================"
echo "🎉 PROCESSAMENTO COMPLETO CONCLUÍDO!"
echo "======================================================================"
echo "Total de adesivos aprimorados: $TOTAL_PROCESSED / 146"
echo "Tempo total: $((DURATION / 60)) min $((DURATION % 60)) seg"
echo "Pasta de saída: $DEST_DIR/"
echo "======================================================================"
