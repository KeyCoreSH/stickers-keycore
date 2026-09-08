---
name: keycore-workshop-visual-system
description: >
  Especialista em criar, revisar e padronizar cards horizontais de workshops da
  KeyCore Tech Hub e KeyCore Academy. Use esta skill sempre que o pedido envolver
  capa, hero, banner, card ou identidade visual de workshop KeyCore.
version: 1.0
language: pt-BR
---

# KeyCore Workshop Visual System

## Missão

Criar uma família visual reconhecível para workshops da KeyCore. A peça deve comunicar
tecnologia aplicada, sofisticação, clareza, utilidade e resultado. Evite estética
genérica de "IA futurista".

Princípio central:

> Tecnologia aplicada ao mundo real. Menos hype, mais utilidade.

## Formato padrão

- Horizontal 16:9.
- Composição aproximada: 40% comunicação, 60% storytelling visual.
- Leitura prioritária da esquerda para a direita.
- Área esquerda: marca, categoria, título, promessa, benefícios e CTA.
- Área direita: ambiente fotográfico e objetos narrativos.
- Preserve margens de segurança para uso como hero/card web.

## Paleta

| Papel | HEX aproximado | Aplicação |
|---|---|---|
| Fundo principal | `#070B0E` | Background dominante |
| Grafite | `#11161B` | Mesa, superfícies e cards |
| Azul carvão | `#151C25` | UI, laptop e superfícies elevadas |
| Branco frio | `#F4F5F3` | Títulos e informação principal |
| Cinza claro | `#C4C6C7` | Subtítulos |
| Cinza médio | `#858B91` | Microcopy |
| Lime principal | `#CBFF2E` | Palavra-chave, CTA, checks |
| Lime intenso | `#BFFF18` | Microacentos e indicadores |
| Magenta KeyCore | `#F000D4` | Marca e ambientação mínima |
| Violeta KeyCore | `#7138FF` | Marca e luz secundária |
| Cyan KeyCore | `#00C8F4` | Marca e reflexos mínimos |

Proporção visual alvo:
- 75% preto/grafite.
- 15% branco/cinza.
- 7% lime.
- 3% cores institucionais KeyCore.

O lime é funcional. Ele significa ação, destaque, progresso ou resultado.
Magenta, violeta e cyan não devem dominar o card.

## Marca

- Sempre preservar a logomarca oficial KeyCore quando ela for fornecida.
- Não redesenhar, simplificar, recolorir ou reinterpretar o símbolo.
- Preferir a marca no canto superior esquerdo.
- Manter respiro ao redor.
- A marca não deve competir com o título.

## Tipografia

Estética: sans-serif geométrica/editorial moderna.

Preferências:
1. Manrope
2. Inter
3. Satoshi
4. Helvetica Now
5. Montserrat

Título:
- ExtraBold/800.
- Tracking aproximado de -3% a -5%.
- Alto contraste.

Subtítulo:
- Regular/400.
- Tracking próximo de -1%.

Microcopy:
- Medium/500.
- Uppercase.
- Tracking entre +15% e +30%.

## Fórmula do título

Usar duas camadas:

[CONTEXTO] em branco
[CONCEITO PRINCIPAL] em lime

Exemplos:
- `IA para` / `EMPREENDEDORES`
- `Prompts para` / `LIDERANÇAS`
- `IoT for` / `BABY`

A segunda linha é o ponto focal semântico e cromático.

## Hierarquia

Ordem de leitura obrigatória:

1. KeyCore
2. WORKSHOP
3. Título
4. Subtítulo/promessa
5. Quatro benefícios
6. CTA
7. Exploração dos objetos e UI
8. Footer/assinatura

Não permitir que elementos decorativos concorram com os seis primeiros níveis.

## Benefícios

Usar exatamente quatro quando o briefing permitir.

Formato:
- Ícone outline.
- Traço fino e consistente.
- Branco/cinza.
- Sem ilustrações volumétricas.
- Texto curto em uppercase.
- Separadores verticais discretos.

Cada benefício deve responder "o que eu ganho/aprendo?".

## CTA

Padrão:
`GARANTA SUA VAGA →`

- Fundo `#CBFF2E`.
- Texto quase preto.
- Peso 700/800.
- Formato pill.
- Sem glow exagerado.
- Deve ser o maior bloco lime do card.

## Storytelling por objetos

Objetos não são decoração. Cada prop deve carregar significado.

Padrão recomendado:
- Laptop: execução, dashboard, checklist ou sistema.
- Caneca: frase-manifesto do workshop.
- Notebook: método em três verbos.
- Livros: três conceitos da jornada.
- Props técnicos: materialidade específica do tema.
- Planta: humanidade e profundidade, quando fizer sentido.
- Celular/post-it/caneta: operação real, somente quando úteis.

Remover qualquer objeto que não ajude a contar a história.

## Laptop

A interface deve parecer plausível e operacional.

Evitar UI sci-fi.

Priorizar:
- dashboard;
- checklist;
- métricas;
- evolução;
- processos;
- decisões;
- indicadores concretos.

Para workshops de IA, converter tecnologia em métricas empresariais, como:
- tempo economizado;
- processos automatizados;
- custo operacional;
- resultado;
- evolução.

## Fotografia e iluminação

Visual premium, realista e didático.

- Ambiente escuro.
- Key light neutra ou levemente quente.
- Rim/background light azul ou violeta.
- Lime principalmente nos elementos funcionais.
- Profundidade de campo rasa no fundo.
- Primeiro plano nítido.
- Evitar excesso de glow.

A cena deve parecer um ambiente real de trabalho, laboratório ou workshop.

## O que evitar

Não usar, salvo pedido explícito:
- robôs humanoides;
- mascotes de IA;
- cérebro 3D genérico;
- hologramas;
- cidades cyberpunk;
- circuitos flutuantes;
- aperto de mão com robô;
- excesso de neon;
- gradientes dominantes;
- estética infantil;
- stock photo corporativo genérico;
- objetos sem função narrativa.

## Regra de consistência da série

Em um novo workshop:
- manter 60% a 70% do sistema;
- variar 30% a 40% do conteúdo.

Fixos:
- formato;
- estrutura;
- marca;
- fundo escuro;
- lime funcional;
- hierarquia;
- tipografia;
- quatro benefícios;
- CTA;
- linguagem fotográfica;
- objetos narrativos-base.

Variáveis:
- título;
- subtítulo;
- ícones;
- conteúdo do laptop;
- frase da caneca;
- verbos do notebook;
- livros;
- props específicos;
- footer.

## Briefing de entrada

Quando houver informação suficiente, não pedir confirmação. Estruturar internamente:

```yaml
workshop:
  titulo_linha_1: ""
  titulo_linha_2: ""
  subtitulo: ""

  beneficios:
    - icone: ""
      texto: ""
    - icone: ""
      texto: ""
    - icone: ""
      texto: ""
    - icone: ""
      texto: ""

  laptop:
    tipo: "dashboard|checklist|interface"
    itens: []

  caneca:
    frase: ""

  notebook:
    verbos: ["", "", ""]

  livros:
    lombadas: ["", "", ""]

  props: []

  footer: ""
  cta: "GARANTA SUA VAGA"
```

## Processo decisório

Antes de gerar, executar mentalmente:

1. Qual é a transformação prometida?
2. Qual palavra deve receber o lime?
3. Quais quatro benefícios traduzem o workshop?
4. O que o laptop prova visualmente?
5. Qual frase resume a filosofia na caneca?
6. Quais três verbos representam o método?
7. Quais três conceitos formam a jornada nos livros?
8. Quais props tornam o tema fisicamente reconhecível?
9. Há algum clichê tecnológico que possa ser removido?
10. A peça ainda parece KeyCore sem ler o logo?

## Quality Gate

Antes de considerar a peça pronta, verificar:

- [ ] Formato horizontal 16:9.
- [ ] Logo oficial preservado.
- [ ] Título legível em thumbnail.
- [ ] Uma única palavra/conceito principal em lime.
- [ ] Subtítulo curto e legível.
- [ ] Quatro benefícios consistentes.
- [ ] CTA é o maior bloco lime.
- [ ] Laptop comunica aplicação real.
- [ ] Caneca possui manifesto curto.
- [ ] Notebook possui método em três verbos.
- [ ] Livros possuem três conceitos.
- [ ] Props pertencem ao tema.
- [ ] Não há robô/cyberpunk/hype visual desnecessário.
- [ ] Background não compete com o texto.
- [ ] Cores KeyCore institucionais estão contidas.
- [ ] Footer discreto.
- [ ] Português está ortograficamente correto.
- [ ] Textos pequenos não foram inventados ou corrompidos.
- [ ] A imagem funciona como parte de uma coleção de workshops.

## Regra 80/20

Se houver pouco contexto, preserve cinco decisões:

1. Fundo quase preto e fotografia premium.
2. Branco informa. Lime destaca ação/conceito.
3. Logo KeyCore permanece original.
4. Tecnologia aparece aplicada ao mundo real.
5. Cada objeto deve justificar sua presença.

Fórmula:

`KEYCORE + AMBIENTE REAL + TECNOLOGIA APLICADA + LIME FUNCIONAL + TIPOGRAFIA EDITORIAL + OBJETOS NARRATIVOS + CTA`
