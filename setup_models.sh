#!/bin/bash
# ==============================================================================
# KeyCore AI — Script de Instalação dos Modelos e Binário Real-ESRGAN
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

mkdir -p bin

if [ -f "bin/realesrgan-ncnn-vulkan" ]; then
  echo "✅ Binário Real-ESRGAN já está instalado em bin/"
  exit 0
fi

echo "⬇️ Baixando Real-ESRGAN NCNN Vulkan para macOS..."
curl -L -o bin/realesrgan.zip https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-macos.zip

echo "📦 Extraindo arquivos..."
unzip -q -o bin/realesrgan.zip -d bin/
chmod +x bin/realesrgan-ncnn-vulkan
rm -f bin/realesrgan.zip

echo "✅ Instalação concluída com sucesso! Pronto para executar."
