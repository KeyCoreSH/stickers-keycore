const fs = require('fs');
const path = require('path');

function generateReadme() {
  const base = path.resolve(__dirname, '..');
  const csvPath = path.join(base, 'KeyCore_146_stickers_PNG_HD_transparentes/indice.csv');
  const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');

  // Parse CSV
  // Header: id,colecao,titulo,largura_px,altura_px,arquivo
  const header = lines[0].split(',');
  const stickersByCollection = {};

  const collectionNames = {
    '01_neon': '01. Coleção Neon & Glow',
    '02_inovacao': '02. Coleção Inovação',
    '03_tech_people': '03. Coleção Tech & People',
    '04_construir_juntos': '04. Coleção Construir Juntos',
    '05_ideias_que_movem': '05. Coleção Ideias que Movem',
    '06_lancar_e_evoluir': '06. Coleção Lançar & Evoluir',
    '07_keep_building': '07. Coleção Keep Building',
    '08_codigo_em_acao': '08. Coleção Código em Ação',
    '09_build_better': '09. Coleção Build Better',
    '10_devolvemos_tempo': '10. Coleção Devolvemos Tempo'
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle quotes in CSV
    let inQuotes = false;
    let currentField = '';
    const fields = [];
    for (let c of line) {
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        fields.push(currentField);
        currentField = '';
      } else {
        currentField += c;
      }
    }
    fields.push(currentField);

    const [id, colecao, titulo, largura, altura, arquivo] = fields;
    if (!stickersByCollection[colecao]) {
      stickersByCollection[colecao] = [];
    }

    const larg = parseInt(largura, 10);
    const alt = parseInt(altura, 10);

    stickersByCollection[colecao].push({
      id,
      titulo,
      origW: larg,
      origH: alt,
      enhW: larg * 4,
      enhH: alt * 4,
      pngFile: `KeyCore_146_stickers_PNG_HD_transparentes_enhanced/PNG/${colecao}/${id}.png`,
      thumbFile: `thumbnails/${id}.png`
    });
  }

  let galleryMarkdown = '';

  for (const [colKey, colTitle] of Object.entries(collectionNames)) {
    const items = stickersByCollection[colKey] || [];
    galleryMarkdown += `\n### 📦 ${colTitle} (${items.length} Stickers)\n\n`;
    galleryMarkdown += `| ID | Preview | Título / Mensagem | Resolução Original | Resolução 4x (Ultra HD) | Download |\n`;
    galleryMarkdown += `| :---: | :---: | :--- | :---: | :---: | :---: |\n`;

    for (const item of items) {
      galleryMarkdown += `| **\`${item.id}\`** | [![${item.id}](${item.thumbFile})](${item.pngFile}) | **${item.titulo}** | \`${item.origW} × ${item.origH} px\` | **\`${item.enhW} × ${item.enhH} px\`** | [📥 Baixar HD](${item.pngFile}) |\n`;
    }
  }

  const readmeContent = `# 🚀 KeyCore Stickers HD — 146 Adesivos Transparentes em Ultra Resolução (8K / 300+ DPI)

<div align="center">

[![Stickers](https://img.shields.io/badge/Adesivos-146%20Artes%20Prontas-00e5ff?style=for-the-badge&logo=target&logoColor=black)](#-galeria-completa-dos-146-adesivos)
[![Upscale](https://img.shields.io/badge/Super--Resolution-4x%20Real--ESRGAN%20Anime%206B-10b981?style=for-the-badge&logo=nvidia&logoColor=white)](#-a-escolha-dos-modelos-de-ia)
[![Format](https://img.shields.io/badge/Formato-PNG%20RGBA%20Transparente-8b5cf6?style=for-the-badge&logo=adobeillustrator&logoColor=white)](#-especifica%C3%A7%C3%B5es-t%C3%A9cnicas-para-impress%C3%A3o)
[![License](https://img.shields.io/badge/Licen%C3%A7a-Public%20Repo%20%2F%20KeyCore-f59e0b?style=for-the-badge&logo=github&logoColor=black)](https://github.com/KeyCoreSH/stickers-keycore)

<p align="center">
  Coleção oficial completa de 146 stickers da <strong>KeyCore Tech Hub</strong>, restaurados com Super-Resolution para máxima nitidez em textos, logos e contornos de faca de corte (cutline).
</p>

[🎨 Acessar Galeria](#-galeria-completa-dos-146-adesivos) • [🧠 Escolha dos Modelos](#-a-escolha-dos-modelos-de-ia) • [⚡ Como Rodar Localmente](#-como-rodar-o-pipeline-localmente) • [🖨️ Dicas Gráficas](#-especifica%C3%A7%C3%B5es-t%C3%A9cnicas-para-impress%C3%A3o)

</div>

---

## 📖 A História do Projeto: Do Raster Borrado à Resolução 8K

O projeto começou com a criação de **10 cartelas conceituais de stickers** com a identidade visual da **KeyCore** (logos neon, mensagens sobre código, cultura ágil, pessoas e a filosofia *"Devolvemos Tempo"*).

### O Desafio
Ao extrair os 146 stickers individuais das cartelas raster, os arquivos PNG resultantes sofreram com:
1. **Borrão de Interpolação:** As letras e bordas dos ícones perderam definição, gerando transições acinzentadas e desfoque óptico (*anti-aliasing sprawl*).
2. **Mosquito Noise (Artefatos JPEG):** Ondas de ruído de compressão ao redor de tipografias e traços de alto contraste.
3. **Faca de Recorte Comprometida:** Para plotters de recorte de adesivos (die-cut / kiss-cut), um contorno borrado gera cortes denteados e sobras brancas desiguais.

### A Solução
Criamos este pipeline especializado de **Super-Resolution com Inteligência Artificial** para de-blurizar e restaurar todas as 146 imagens para mais de **8000 pixels**, transformando artes raster comprimidas em arquivos de precisão gráfica equivalentes a vetores limpos a **300+ DPI**.

---

## 🧠 A Escolha dos Modelos de IA

Avaliamos os principais modelos abertos de super-resolution da atualidade para entender qual realmente resolve o problema de **adesivos com texto**:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                   COMPARAÇÃO DE MODELOS PARA ADESIVOS                  │
├──────────────────────────┬───────────────────────┬─────────────────────┤
│ Modelo                   │ Comportamento Texto   │ Veredito            │
├──────────────────────────┼───────────────────────┼─────────────────────┤
│ 🥇 Real-ESRGAN Anime 6B  │ Borda sólida vetorial │ Vencedor Absoluto   │
│ 🥈 HAT / SwinIR Real-SR  │ Alta precisão linear  │ Ótimo p/ Geometria  │
│ 🥉 Real-ESRGAN General   │ Bom, mas mantém halo  │ Útil p/ Fotos       │
│ ❌ SUPIR / Diffusion     │ Alucina letras falsas │ Reprovado p/ Texto  │
│ ❌ GFPGAN / CodeFormer   │ Só restaura rostos    │ Inútil em Adesivos  │
│ ❌ Bicúbico / Lanczos    │ Apenas estica borrão  │ Sem efeito          │
└──────────────────────────┴───────────────────────┴─────────────────────┘
\`\`\`

### Por que o Real-ESRGAN Anime 6B foi o Escolhido?
1. **Prior Indutivo 2D:** Treinado especificamente em traços de mangá, anime e ilustrações digitais. Sua função de perda penaliza fortemente ruídos ao redor de linhas de alto contraste.
2. **Fidelidade Tipográfica:** Não inventa caracteres e converte bordas borradas de letras em transições limpas de 1 pixel.
3. **Preservação de Transparência RGBA:** Mantém o canal alfa intacto sem manchar o contorno externo.
4. **Performance:** Roda em **~0.4s a 1s** por imagem na GPU Apple Silicon (Metal/Vulkan) ou CUDA.

> 💡 **Por que Difusão (SUPIR / StableSR) é péssima para texto?**  
> Modelos de difusão reconstroem imagens adicionando e removendo ruído guiados por prompts. Em tipografia, eles tentam "adivinhar" o que está escrito e acabam **inventando letras ilegíveis, distorcendo fontes registradas e deformando marcas**.

---

## 🔬 Resultados Visuais da POC (Antes vs Depois)

Testamos o modelo em casos reais do pack KeyCore:

| Caso de Teste | Original com Borrão | Real-ESRGAN Anime 6B (Restaurado) |
| :--- | :--- | :--- |
| **Logo Oficial (\`KC01-01\`)** | Halos roxos em volta de "Tech Hub", corte serrilhado | Traço azul-marinho sólido, contorno de vinil retificado |
| **Micro-Texto (\`KC08-10\`)** | Letras de \`@keycoretechhub\` e checkboxes com perda de contraste | Micro-tipografia perfeitamente legível |
| **Tipografia Grande (\`KC10-02\`)** | Transição azul-branco do "TEMPO" com névoa cinzenta | Cor sólida e contraste nítido de 1 pixel |

> 🖥️ **Visualizador Interativo:** Para arrastar o slider antes/depois no navegador, abra [\`index.html\`](index.html).

---

## 🖨️ Especificações Técnicas para Impressão

Todos os arquivos da pasta [\`KeyCore_146_stickers_PNG_HD_transparentes_enhanced/PNG/\`](KeyCore_146_stickers_PNG_HD_transparentes_enhanced/PNG) estão prontos para produção industrial:

* **Resolução:** Mais de **8.000 pixels** no maior lado (ex: 9280 × 3184 px, 10288 × 3200 px).
* **Densidade de Impressão:** **300 DPI a 600 DPI** para adesivos de 5 cm até 70 cm de largura.
* **Espaço de Cor:** RGBA com fundo externo 100% transparente.
* **Bordas Brancas:** Mantidas intencionalmente como margem de segurança para lâminas de recorte (*kiss-cut* ou *die-cut*).

---

## ⚡ Como Rodar o Pipeline Localmente

### Pré-requisitos
* macOS (com Apple Silicon M1/M2/M3/M4) ou Linux com GPU.
* Binário do Real-ESRGAN NCNN Vulkan pré-instalado na pasta \`bin/\`.

### 1. Aprimorar todos os 146 stickers (ou retomar lote)
\`\`\`bash
cd adesivos
./enhance_all_stickers.sh
\`\`\`
*(Ou execute a versão Python: \`python3 enhance_all_stickers.py\`)*

### 2. Testar um adesivo avulso
\`\`\`bash
./run_poc.sh samples/meu_adesivo.png
\`\`\`

---

## 🖼️ Galeria Completa dos 146 Adesivos

> Clique na miniatura ou no botão **Baixar HD** para abrir o arquivo PNG em resolução total (8K transparente).

${galleryMarkdown}

---

## 📦 Estrutura do Repositório

\`\`\`
.
├── README.md                                          # Documentação completa e galeria
├── index.html                                         # App interativo com split-slider antes/depois
├── enhance_all_stickers.sh                            # Script shell de lote com GPU
├── enhance_all_stickers.py                            # Script python alternativo
├── run_poc.sh                                         # Runner 1-clique para teste individual
├── bin/                                               # Binário standalone Real-ESRGAN e modelos
├── thumbnails/                                        # Miniaturas leves para a galeria do README
├── KeyCore_146_stickers_PNG_HD_transparentes/         # Imagens originais (raster de origem)
└── KeyCore_146_stickers_PNG_HD_transparentes_enhanced/# Imagens restauradas em 8K / 300+ DPI
    ├── indice.csv
    ├── LEIA-ME.txt
    └── PNG/
        ├── 01_neon/ (14 PNGs)
        ├── 02_inovacao/ (15 PNGs)
        ├── 03_tech_people/ (14 PNGs)
        ├── 04_construir_juntos/ (15 PNGs)
        ├── 05_ideias_que_movem/ (12 PNGs)
        ├── 06_lancar_e_evoluir/ (13 PNGs)
        ├── 07_keep_building/ (16 PNGs)
        ├── 08_codigo_em_acao/ (14 PNGs)
        ├── 09_build_better/ (13 PNGs)
        └── 10_devolvemos_tempo/ (20 PNGs)
\`\`\`

---

## 🌐 Repositório Remoto

* **GitHub:** [https://github.com/KeyCoreSH/stickers-keycore](https://github.com/KeyCoreSH/stickers-keycore)
* **Organização:** [KeyCoreSH](https://github.com/KeyCoreSH)

Feito com 💙 pelo time de engenharia e design da **KeyCore Tech Hub**.
`;

  fs.writeFileSync(path.join(base, 'README.md'), readmeContent, 'utf8');
  console.log('README.md generated successfully with all 146 stickers!');
}

generateReadme();
