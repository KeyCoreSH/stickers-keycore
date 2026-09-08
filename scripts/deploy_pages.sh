#!/usr/bin/env bash
set -e

echo "==> Publicando Catálogo KeyCore Stickers no GitHub Pages (gh-pages)..."

# Criar índice temporário sem alterar working tree
export GIT_INDEX_FILE=.git/temp_pages_index
rm -f "$GIT_INDEX_FILE"

# Adicionar apenas ativos leves do site web (< 5MB)
git add -f index.html stickers_data.js stickers_data.json thumbnails outputs .nojekyll README.md

# Gravar árvore e criar commit
TREE_ID=$(git write-tree)
COMMIT_ID=$(echo "deploy: atualizar catalogo $(date '+%Y-%m-%d %H:%M')" | git commit-tree "$TREE_ID")
git update-ref refs/heads/gh-pages "$COMMIT_ID"
rm -f "$GIT_INDEX_FILE"

echo "==> Enviando branch gh-pages para o GitHub..."
git push origin gh-pages --force

echo "==> Solicitando build no GitHub Pages..."
gh api -X POST repos/KeyCoreSH/stickers-keycore/pages/builds || true

echo "==> Publicação concluída com sucesso!"
echo "    URL pública: https://keycoresh.github.io/stickers-keycore/"
