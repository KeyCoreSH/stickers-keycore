const sharp = require('../../backend-keycore/node_modules/sharp');
const path = require('path');

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function createSideBySide(title, subtitle, items, outputPath, itemWidth = 460, itemHeight = 240) {
  const headerHeight = 70;
  const totalWidth = itemWidth * items.length + (items.length + 1) * 16;
  const totalHeight = itemHeight + headerHeight + 50;

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);

  const svgHeader = `
    <svg width="${totalWidth}" height="${totalHeight}">
      <rect width="100%" height="100%" fill="#090d16" rx="16"/>
      <text x="24" y="38" fill="#f8fafc" font-size="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold">${safeTitle}</text>
      <text x="24" y="58" fill="#94a3b8" font-size="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${safeSubtitle}</text>
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
      .flatten({ background: '#020617' })
      .resize(itemWidth, itemHeight, { fit: 'contain', background: '#020617' })
      .toBuffer();

    const badgeColor = item.recommended ? '#10b981' : (item.isInput ? '#ef4444' : '#3b82f6');
    const tagText = escapeXml(item.recommended ? 'RECOMENDADO (TOP)' : item.tag);
    const safeLabel = escapeXml(item.label);

    const cardSvg = `
      <svg width="${itemWidth}" height="32">
        <rect width="${itemWidth}" height="32" fill="${badgeColor}" rx="6"/>
        <text x="12" y="21" fill="#ffffff" font-size="13" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold">${safeLabel}</text>
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
      background: { r: 9, g: 13, b: 22, alpha: 1 }
    }
  })
    .composite(compositeOperations)
    .png()
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

async function main() {
  const base = path.resolve(__dirname, '..');
  const crops = path.join(base, 'outputs/real_stickers/crops');

  // 1. KC01-01 "KeyCore Tech Hub"
  await createSideBySide(
    'Adesivo 1: KC01-01 — Logo & Marca "KeyCore Tech Hub"',
    'Zoom na tipografia do logo e eliminação do serrilhado no corte branco',
    [
      { label: 'Original do Pack (Raster com Borrão)', tag: 'ORIGINAL', isInput: true, file: path.join(crops, 'KC01-01_orig_crop.png') },
      { label: 'Real-ESRGAN General 4x', tag: 'IA GERAL', file: path.join(crops, 'KC01-01_general.png') },
      { label: 'Real-ESRGAN Anime 6B 4x', tag: 'TOP ADESIVOS', recommended: true, file: path.join(crops, 'KC01-01_anime6b.png') }
    ],
    path.join(base, 'outputs/real_stickers/comparativo_KC01-01.png'),
    440,
    220
  );

  // 2. KC08-10 "Plan, Build, Test, Deploy"
  await createSideBySide(
    'Adesivo 2: KC08-10 — Checklist & Micro-Texto "@keycoretechhub"',
    'Avaliação de fontes pequenas sans-serif, caixas de checklist e arroba',
    [
      { label: 'Original do Pack (Raster com Borrão)', tag: 'ORIGINAL', isInput: true, file: path.join(crops, 'KC08-10_orig_crop.png') },
      { label: 'Real-ESRGAN General 4x', tag: 'IA GERAL', file: path.join(crops, 'KC08-10_general.png') },
      { label: 'Real-ESRGAN Anime 6B 4x', tag: 'TOP ADESIVOS', recommended: true, file: path.join(crops, 'KC08-10_anime6b.png') }
    ],
    path.join(base, 'outputs/real_stickers/comparativo_KC08-10.png'),
    440,
    300
  );

  // 3. KC10-02 "Devolvemos Tempo"
  await createSideBySide(
    'Adesivo 3: KC10-02 — Tipografia de Impacto "DEVOLVEMOS TEMPO"',
    'Contraste de fontes pesadas, cores saturadas e sublinhado em degradê',
    [
      { label: 'Original do Pack (Raster com Borrão)', tag: 'ORIGINAL', isInput: true, file: path.join(crops, 'KC10-02_orig_crop.png') },
      { label: 'Real-ESRGAN General 4x', tag: 'IA GERAL', file: path.join(crops, 'KC10-02_general.png') },
      { label: 'Real-ESRGAN Anime 6B 4x', tag: 'TOP ADESIVOS', recommended: true, file: path.join(crops, 'KC10-02_anime6b.png') }
    ],
    path.join(base, 'outputs/real_stickers/comparativo_KC10-02.png'),
    440,
    220
  );

  console.log('All 3 real sticker composites generated successfully!');
}

main().catch(console.error);
