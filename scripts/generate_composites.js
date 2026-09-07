const sharp = require('../../backend-keycore/node_modules/sharp');
const path = require('path');
const fs = require('fs');

async function createComposite(title, items, outputPath) {
  const itemWidth = 380;
  const itemHeight = 160;
  const headerHeight = 70;
  const totalWidth = itemWidth * items.length + (items.length + 1) * 16;
  const totalHeight = itemHeight + headerHeight + 50;

  const svgHeader = `
    <svg width="${totalWidth}" height="${totalHeight}">
      <rect width="100%" height="100%" fill="#0f172a" rx="16"/>
      <text x="24" y="38" fill="#f8fafc" font-size="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold">${title}</text>
      <text x="24" y="58" fill="#94a3b8" font-size="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Comparativo Lado a Lado — Super-Resolution para Adesivos e Textos</text>
    </svg>
  `;

  const compositeOperations = [
    { input: Buffer.from(svgHeader), top: 0, left: 0 }
  ];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const left = 16 + i * (itemWidth + 16);
    const top = headerHeight + 10;

    const imgBuf = await sharp(item.file)
      .resize(itemWidth, itemHeight, { fit: 'contain', background: '#020617' })
      .toBuffer();

    const badgeColor = item.recommended ? '#10b981' : '#334155';
    const tagText = item.recommended ? 'RECOMENDADO' : item.tag;

    const cardSvg = `
      <svg width="${itemWidth}" height="32">
        <rect width="${itemWidth}" height="32" fill="${badgeColor}" rx="6"/>
        <text x="12" y="21" fill="#ffffff" font-size="13" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold">${item.label}</text>
        <text x="${itemWidth - 12}" y="21" fill="#ffffff" text-anchor="end" font-size="11" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold">${tagText}</text>
      </svg>
    `;

    compositeOperations.push({ input: imgBuf, top: top + 34, left: left });
    compositeOperations.push({ input: Buffer.from(cardSvg), top: top, left: left });
  }

  await sharp({
    create: {
      width: totalWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
    .composite(compositeOperations)
    .png()
    .toFile(outputPath);

  console.log(`Created composite: ${outputPath}`);
}

async function main() {
  const base = path.resolve(__dirname, '..');
  
  // 1. Top Text Comparison
  await createComposite(
    'Foco em Tipografia Principal ("KEYCORE TECH")',
    [
      { label: 'Original (Borrão / Degradado)', tag: 'INPUT', file: path.join(base, 'outputs/crops/crop_text_top_bicubic.png') },
      { label: 'Lanczos + Sharpen Tradicional', tag: 'SEM IA', file: path.join(base, 'outputs/crops/crop_text_top_lanczos.png') },
      { label: 'Real-ESRGAN General 4x', tag: 'IA GERAL', file: path.join(base, 'outputs/crops/crop_text_top_general.png') },
      { label: 'Real-ESRGAN Anime 6B 4x', tag: 'VETOR / STICKER', recommended: true, file: path.join(base, 'outputs/crops/crop_text_top_anime6b.png') }
    ],
    path.join(base, 'outputs/comparativo_texto_principal.png')
  );

  // 2. Micro Text Comparison
  await createComposite(
    'Foco em Micro-Texto ("PERFECT STICKER 300 DPI")',
    [
      { label: 'Original (Borrão / Degradado)', tag: 'INPUT', file: path.join(base, 'outputs/crops/crop_text_micro_bicubic.png') },
      { label: 'Lanczos + Sharpen Tradicional', tag: 'SEM IA', file: path.join(base, 'outputs/crops/crop_text_micro_lanczos.png') },
      { label: 'Real-ESRGAN General 4x', tag: 'IA GERAL', file: path.join(base, 'outputs/crops/crop_text_micro_general.png') },
      { label: 'Real-ESRGAN Anime 6B 4x', tag: 'VETOR / STICKER', recommended: true, file: path.join(base, 'outputs/crops/crop_text_micro_anime6b.png') }
    ],
    path.join(base, 'outputs/comparativo_micro_texto.png')
  );

  // 3. Mascot Comparison
  const itemWidthL = 280;
  const itemHeightL = 280;
  const headerHeightL = 70;
  const totalWidthL = itemWidthL * 4 + 5 * 16;
  const totalHeightL = itemHeightL + headerHeightL + 60;

  // Generate crops with sharp directly
  const ensureCrop = async (src, left, top, width, height, dest) => {
    await sharp(src).extract({ left, top, width, height }).toFile(dest);
  };

  await ensureCrop(path.join(base, 'outputs/output_bicubic_baseline.png'), 360, 340, 300, 300, path.join(base, 'outputs/crops/crop_lion_bicubic.png'));
  await ensureCrop(path.join(base, 'outputs/output_lanczos_sharpened.png'), 360, 340, 300, 300, path.join(base, 'outputs/crops/crop_lion_lanczos.png'));
  await ensureCrop(path.join(base, 'outputs/output_realesrgan_general.png'), 360, 340, 300, 300, path.join(base, 'outputs/crops/crop_lion_general.png'));
  await ensureCrop(path.join(base, 'outputs/output_realesrgan_anime6b.png'), 360, 340, 300, 300, path.join(base, 'outputs/crops/crop_lion_anime6b.png'));

  const lionItems = [
    { label: 'Original (Borrão)', tag: 'INPUT', file: path.join(base, 'outputs/crops/crop_lion_bicubic.png') },
    { label: 'Lanczos + Sharpen', tag: 'SEM IA', file: path.join(base, 'outputs/crops/crop_lion_lanczos.png') },
    { label: 'Real-ESRGAN General', tag: 'IA GERAL', file: path.join(base, 'outputs/crops/crop_lion_general.png') },
    { label: 'Real-ESRGAN Anime 6B', tag: 'VETOR / STICKER', recommended: true, file: path.join(base, 'outputs/crops/crop_lion_anime6b.png') }
  ];

  const svgHeaderL = `
    <svg width="${totalWidthL}" height="${totalHeightL}">
      <rect width="100%" height="100%" fill="#0f172a" rx="16"/>
      <text x="24" y="38" fill="#f8fafc" font-size="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold">Foco no Mascote e Traços Vetoriais</text>
      <text x="24" y="58" fill="#94a3b8" font-size="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Preservação de linhas limpas, ausência de ruído e cores sólidas</text>
    </svg>
  `;

  const compositeL = [{ input: Buffer.from(svgHeaderL), top: 0, left: 0 }];

  for (let i = 0; i < lionItems.length; i++) {
    const item = lionItems[i];
    const left = 16 + i * (itemWidthL + 16);
    const top = headerHeightL + 10;
    const imgBuf = await sharp(item.file).resize(itemWidthL, itemHeightL).toBuffer();
    const badgeColor = item.recommended ? '#10b981' : '#334155';
    const tagText = item.recommended ? 'RECOMENDADO' : item.tag;

    const cardSvg = `
      <svg width="${itemWidthL}" height="32">
        <rect width="${itemWidthL}" height="32" fill="${badgeColor}" rx="6"/>
        <text x="12" y="21" fill="#ffffff" font-size="13" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold">${item.label}</text>
        <text x="${itemWidthL - 12}" y="21" fill="#ffffff" text-anchor="end" font-size="11" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold">${tagText}</text>
      </svg>
    `;
    compositeL.push({ input: imgBuf, top: top + 34, left: left });
    compositeL.push({ input: Buffer.from(cardSvg), top: top, left: left });
  }

  await sharp({
    create: { width: totalWidthL, height: totalHeightL, channels: 4, background: { r: 15, g: 23, b: 42, alpha: 1 } }
  })
    .composite(compositeL)
    .png()
    .toFile(path.join(base, 'outputs/comparativo_mascote_tracos.png'));

  console.log('All composites generated successfully!');
}

main().catch(console.error);
