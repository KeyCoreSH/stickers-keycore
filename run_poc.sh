#!/bin/bash
set -e

# ==============================================================================
# KeyCore AI — Super-Resolution POC Pipeline para Adesivos e Textos
# ==============================================================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

INPUT_IMAGE="${1:-samples/sticker_blurry_input.png}"

if [ ! -f "$INPUT_IMAGE" ]; then
  echo "❌ Imagem não encontrada: $INPUT_IMAGE"
  echo "Uso: ./run_poc.sh [caminho_da_imagem]"
  exit 1
fi

echo "🚀 Iniciando POC Super-Resolution..."
echo "📁 Input: $INPUT_IMAGE"

mkdir -p outputs outputs/crops

# 1. Real-ESRGAN Anime 6B (Top recomendado para Stickers / Traço / Texto)
echo "⚡ Executando [1/3] Real-ESRGAN Anime 6B..."
./bin/realesrgan-ncnn-vulkan -i "$INPUT_IMAGE" -o outputs/output_realesrgan_anime6b.png -n realesrgan-x4plus-anime -s 4 -m bin/models

# 2. Real-ESRGAN General 4x (Para fotos / texturas)
echo "⚡ Executando [2/3] Real-ESRGAN General 4x..."
./bin/realesrgan-ncnn-vulkan -i "$INPUT_IMAGE" -o outputs/output_realesrgan_general.png -n realesrgan-x4plus -s 4 -m bin/models

# 3. Real-ESRGAN AnimeVideo V3
echo "⚡ Executando [3/3] Real-ESRGAN AnimeVideo V3..."
./bin/realesrgan-ncnn-vulkan -i "$INPUT_IMAGE" -o outputs/output_realesr_animevideov3.png -n realesr-animevideov3 -s 4 -m bin/models

# 4. Gerar composites comparativos com sharp
echo "🎨 Gerando faixas comparativas..."
node scripts/generate_composites.js

echo "✅ POC concluída com sucesso!"
echo "👉 Abra adesivos/index.html no navegador para inspecionar no slider interativo:"
echo "   open index.html"
