#!/usr/bin/env python3
"""
KeyCore AI — Script de Aprimoramento dos 146 Stickers com Real-ESRGAN Anime 6B
Preserva a estrutura exata de diretórios e o canal alfa (transparência).
"""

import os
import sys
import time
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SRC_DIR = BASE_DIR / "KeyCore_146_stickers_PNG_HD_transparentes"
DEST_DIR = BASE_DIR / "KeyCore_146_stickers_PNG_HD_transparentes_enhanced"
BIN_PATH = BASE_DIR / "bin" / "realesrgan-ncnn-vulkan"
MODELS_DIR = BASE_DIR / "bin" / "models"
MODEL_NAME = "realesrgan-x4plus-anime"
SCALE = "4"

COLLECTIONS = [
    "01_neon",
    "02_inovacao",
    "03_tech_people",
    "04_construir_juntos",
    "05_ideias_que_movem",
    "06_lancar_e_evoluir",
    "07_keep_building",
    "08_codigo_em_acao",
    "09_build_better",
    "10_devolvemos_tempo"
]

def main():
    if not BIN_PATH.is_file():
        print(f"❌ Binário não encontrado em {BIN_PATH}")
        sys.exit(1)

    src_png = SRC_DIR / "PNG"
    if not src_png.is_dir():
        print(f"❌ Pasta de origem não encontrada: {src_png}")
        sys.exit(1)

    dest_png = DEST_DIR / "PNG"
    dest_png.mkdir(parents=True, exist_ok=True)

    print("=" * 70)
    print("🚀 KeyCore AI — Processamento em Lote: 146 Stickers (Anime 6B)")
    print("=" * 70)
    print(f"📁 Origem:  {src_png}")
    print(f"📁 Destino: {dest_png}")
    print(f"🤖 Modelo:  {MODEL_NAME} ({SCALE}x)")
    print(f"⚡ Aceleração: Apple Silicon Metal / Vulkan GPU")
    print("=" * 70)
    print()

    # Copiar indice e criar documentacao
    idx_file = SRC_DIR / "indice.csv"
    if idx_file.is_file():
        import shutil
        shutil.copy(idx_file, DEST_DIR / "indice.csv")

    leia_me = DEST_DIR / "LEIA-ME.txt"
    leia_me.write_text(
        "KEYCORE | STICKERS HD (ENHANCED — REAL-ESRGAN ANIME 6B)\n\n"
        "146 stickers individuais com super-resolution 4x aplicada via IA.\n"
        "- Modelo: Real-ESRGAN Anime 6B (x4plus-anime)\n"
        "- Borrão de interpolação e mosquito noise em textos removidos.\n"
        "- Contornos de corte (cutline) e traços vetoriais perfeitamente nítidos.\n"
        "- Fundo transparente RGBA preservado.\n"
    )

    start_time = time.time()
    total_imgs = 0
    total_processed = 0

    for idx, col in enumerate(COLLECTIONS, 1):
        in_col = src_png / col
        out_col = dest_png / col

        if not in_col.is_dir():
            continue

        out_col.mkdir(parents=True, exist_ok=True)

        imgs = sorted(list(in_col.glob("*.png")))
        total_imgs += len(imgs)

        pending = [img for img in imgs if not (out_col / img.name).is_file()]
        done_count = len(imgs) - len(pending)

        print("-" * 70)
        print(f"📦 [{idx}/{len(COLLECTIONS)}] Coleção: {col}")
        print(f"   Total: {len(imgs)} | Prontos: {done_count} | Pendentes: {len(pending)}")

        if not pending:
            print("   ✅ Coleção já concluída!")
            total_processed += len(imgs)
            continue

        # Usar pasta temporaria de lote para processamento acelerado por pasta
        temp_batch = DEST_DIR / f".temp_batch_{col}"
        if temp_batch.exists():
            import shutil
            shutil.rmtree(temp_batch)
        temp_batch.mkdir(parents=True, exist_ok=True)

        for img in pending:
            import shutil
            shutil.copy(img, temp_batch / img.name)

        cmd = [
            str(BIN_PATH),
            "-i", str(temp_batch),
            "-o", str(out_col),
            "-n", MODEL_NAME,
            "-s", SCALE,
            "-m", str(MODELS_DIR)
        ]

        t0 = time.time()
        res = subprocess.run(cmd, capture_output=True, text=True)
        t_col = time.time() - t0

        # Limpar temporario
        if temp_batch.exists():
            import shutil
            shutil.rmtree(temp_batch)

        if res.returncode == 0:
            print(f"   ✨ {len(pending)} imagens concluídas em {t_col:.1f}s!")
            total_processed += len(imgs)
        else:
            print(f"   ❌ Erro ao processar coleção {col}: {res.stderr}")

    duration = time.time() - start_time
    print()
    print("=" * 70)
    print("🎉 PROCESSAMENTO COMPLETO FINALIZADO!")
    print(f"Total processado: {total_processed} / {total_imgs} adesivos")
    print(f"Tempo decorrido: {int(duration // 60)}m {int(duration % 60)}s")
    print(f"Diretório de saída: {DEST_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    main()
