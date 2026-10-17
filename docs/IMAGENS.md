# Inventário e seleção visual — etapa 1.5

Os 40 JPG/PNG de `IMG/` foram examinados na prancha `.work/contact-sheet.jpg`, revista na etapa 1.5. Originais preservados. O pipeline gera oito fotografias e dez capas; a tabela abaixo deriva do manifesto produzido por `npm run assets`.

Na etapa 2, os assets e originais foram preservados. As quatro imagens da galeria agora abrem uma ampliação acessível com o quadro completo. Somente essas imagens recebem zoom de hover e indicador de ação. O parallax desloca os dois quadros fotográficos selecionados, sem alterar seus recortes; comportamento em `docs/INTERACOES.md`.

## Arquivos otimizados

| Original em IMG | WebP | Dimensões | Identificação |
| --- | --- | --- | --- |
| `CB31E977-5BAC-443F-8A08-4396C45AD14E.png` | `public/images/mariah-brincos.webp` | 1086 × 1448 | Retrato com blusa verde e brincos dourados |
| `F7CAFAAF-0AD4-41C5-83A9-AC2BC6431D80.png` | `public/images/mariah-colares.webp` | 1086 × 1448 | Retrato sorrindo e segurando colares coloridos |
| `Brinco Íris.png` | `public/images/brinco-iris.webp` | 1086 × 1448 | Brincos vermelhos e mostarda em cartela |
| `Brincos.png` | `public/images/brincos-artesanais.webp` | 1086 × 1448 | Cartelas de brincos sobre bancada, com planta e bolsa ao fundo |
| `Brincos_.png` | `public/images/brincos-flores.webp` | 1086 × 1448 | Cartelas de brincos florais em rosa e marrom |
| `Colar pérolas.png` | `public/images/colar-perolas.webp` | 1086 × 1448 | Colar de pérolas claras com detalhes dourados |
| `Bracelete Ramona_.png` | `public/images/braceletes.webp` | 1086 × 1448 | Braceletes azul, bege e verde sobre bancada |
| `080240A6-EE59-4E6C-AF9A-BE2108E76797.png` | `public/images/mariah-perfil.webp` | 1086 × 1448 | Retrato de perfil com blusa branca e brinco longo |
| `90fd1edb-8864-4d84-a6b0-7e2a294472d3.jpg` | `public/images/curso-glow.webp` | 1280 × 720 | Capa oficial Brinco Glow |
| `E149C443-1651-4AB2-9514-D9EB5FB4A93F.png` | `public/images/curso-flowers.webp` | 1440 × 810 | Capa oficial Flowers |
| `d830ff5c-3582-4a88-a73d-dfde3e8deb67.jpg` | `public/images/curso-colares.webp` | 1280 × 720 | Capa oficial Colares em Fios |
| `ca2972a3-64b1-4f82-94e4-0b1abec6d635.jpg` | `public/images/curso-iris.webp` | 1280 × 720 | Capa oficial Brinco Íris |
| `9e960c77-1ba1-4768-a764-acb40990c20e.jpg` | `public/images/curso-liz.webp` | 1280 × 720 | Capa oficial Brinco Liz |
| `2737ecf5-ad90-40ec-bd26-ea7771edac19.jpg` | `public/images/curso-eloa-camelia.webp` | 1280 × 720 | Capa oficial Eloá e Camélia |
| `60c3931c-dd9e-47d3-8e04-88ced18e324b.jpg` | `public/images/curso-elo-folha-esther.webp` | 1280 × 720 | Capa oficial Elo, Folha e Esther |
| `790acb95-692c-433a-9ec8-d3cbdfa3e2af.jpg` | `public/images/curso-karol.webp` | 1280 × 720 | Capa oficial Brinco Karol |
| `592c4423-f435-46f4-aeea-9286562bc164.jpg` | `public/images/curso-ariel.webp` | 1280 × 720 | Capa oficial Colar Ariel |
| `DB66020D-A60C-4A23-8E2E-C4B8D062C2DB.png` | `public/images/curso-fios-em-festa.webp` | 1440 × 810 | Capa oficial Fios em Festa |

## Uso e correspondências

- Retratos com blusa verde e laranja: abertura e professora, com proporções integrais.
- Brinco Íris: detalhe da abertura, galeria e apresentação do trabalho manual.
- Colar de pérolas: corresponde visualmente ao Colar Ariel.
- Bracelete Ramona: galeria, relacionado ao curso Fios em Festa.
- Flowers: a galeria agora usa a própria capa identificada. A fotografia `Brincos_.png` permanece como ilustração do trabalho artesanal na seção de processo, sem atribuição a um curso.
- `Brincos.png`: imagem editorial de criações no combo e oferta. Não define modelos incluídos.
- `mariah-perfil.webp`: arquivo da etapa 1 preservado no pipeline, atualmente sem uso na página.
- As dez capas são associadas aos cursos por nomes e conteúdo visíveis. Elas são exibidas inteiras no catálogo, com `object-fit: contain`, dimensões e tamanhos responsivos.
- Bolsa Mikaela: nenhuma foto local identificada com segurança. Composição tipográfica discreta com o nome do curso, sem inventar uma peça ou usar imagem de outra bolsa.

As fotografias demonstram o aprendizado e o trabalho artesanal. A galeria identifica apenas Íris, Ariel, Flowers e Ramona; não prova inclusão no Super Combo. Não há venda de peças físicas. As imagens da seção de processo mostram apresentação manual e ambiente do ateliê; não são descritas como fotos de confecção ou aulas em andamento.

Conversão com Sharp, orientação respeitada, largura máxima de 1440 px, sem ampliar originais, sem retoques ou geração de fotografias. `next/image` fornece tamanhos responsivos e carregamento adiado; apenas a imagem principal tem prioridade. O recorte da oferta mostra peças, sem rosto.

## Materiais preservados sem atribuição de produto adicional

Capas repetidas e de outros cursos não geram produtos novos. Retratos adicionais, colagem, `Curso1.jpg` e `Curso9.jpg` permanecem entre os originais. Nenhum depoimento foi identificado nos JPG/PNG examinados; nenhuma fala, avaliação ou contagem de alunas foi criada.

## Limitação de formato

`IMG_1540.HEIC`, `IMG_5561.HEIC` e `IMG_6663.HEIC` permanecem sem uso: os decodificadores disponíveis não têm suporte à compressão HEVC desses arquivos. Não foram atribuídos conteúdos a eles. Essa limitação não bloqueia os 11 cursos autorizados.

## Imagem social — etapa 3

`public/images/compartilhamento.jpg`: 1200 × 630, aproximadamente 87 KiB. Arte tipográfica em preto, creme e dourado, com o retrato real `CB31E977-5BAC-443F-8A08-4396C45AD14E.png` disposto inteiro à direita, sem retoque ou recorte do rosto. Gerada por `scripts/prepare-social-image.mjs`, executado ao final de `npm run assets`. Não substitui uma fotografia nem inventa uma marca gráfica.

A imagem social não é carregada no corpo da página. Está declarada no Open Graph e no Twitter. A base pública absoluta dessas URLs depende do domínio final; a versão local usa localhost e não emite canonical. O manifesto dos 18 WebP permanece em `public/images/manifest.json`.

A geração usa um cache de fontes local em `.work/font-cache`, sem gravar no perfil do usuário ou exigir instalação de fontes/dependências novas. A imagem raster final faz parte de `public/images/` e não depende desse cache para ser servida.
