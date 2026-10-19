# Substituição visual — 19/10/2026

Registro histórico da substituição visual. A entrega atual, que inclui as alterações posteriores da cliente, está em `docs/ALTERACOES-CLIENTE-1910.md`.

Referência principal: `mariah-independente.html`, lido integralmente antes das alterações. HTML, CSS e interações convertidos em componentes React, sem iframe ou injeção do documento. O arquivo fonte foi excluído após a conversão, como solicitado.

## Composição implementada

- Abertura preta, Georgia, título dourado, retrato e moldura deslocada. A fotografia é exatamente o arquivo local `4F39092C-2A30-4B3B-A355-3181AD3B7F03.png`, otimizado como `mariah-abertura.webp`.
- Catálogo creme com título e carrossel: três cards no desktop, dois no tablet, faixa com próximo card visível no celular. Os 11 cursos aparecem uma única vez, com suas descrições e destinos individuais.
- Seção preta do Super Combo, título central e carrossel visual. Como a composição não está confirmada, os cards são uma galeria de aprendizado explicitamente identificada, sem declarar cursos incluídos.
- Cinco benefícios com ícones, numeração e linhas da referência. Descrições legíveis também sem hover.
- Biografia creme, título deslocado, retrato, moldura dourada e etiqueta. Textos reais cadastrados, sem criar contagem de alunas ou testemunhos.
- Oferta final mantendo painel de duas colunas e rodapé da referência. Preços históricos e falso checkout removidos; o CTA informa o destino real: explorar cursos individuais.
- Encomendas personalizadas restaurada a pedido do usuário: composição de duas colunas, texto original, CTA para o catálogo, cards fotográficos, setas, numeração e progresso.

Após a correção do usuário, “Vamos esclarecer”, o cabeçalho e os controles extras de celular foram removidos por não fazerem parte da referência. Os títulos da apresentação, benefícios e oferta e a ordem das seções foram restaurados. A seção de encomendas reaproveita somente fotografias identificadas, ligadas aos cursos correspondentes na Hotmart, sem criar preços ou canais ausentes. Duplicações e produtos provisórios foram descartados. Os componentes antigos sem uso foram removidos. A folha global antiga foi integralmente substituída, sem o reset Tailwind anterior.

## Dados e imagens

Preservados Glow, Flowers, Colares em Fios, Íris, Liz, Eloá e Camélia, Elo/Folha/Esther, Karol, Ariel, Bolsa Mikaela e Fios em Festa. Nomes, descrições e as 11 URLs são iguais ao cadastro anterior. O acesso das alunas continua em `https://hotmart.com/pt-br/club/mariah-xeque`.

Oito capas quadradas locais foram otimizadas com sufixo `-quadrado.webp` para preencher melhor as molduras, preservando as versões anteriores e evitando cache de imagens antigas. Flowers e Fios em Festa usam suas capas originais inteiras, sem cortar textos. Bolsa Mikaela mantém apresentação tipográfica por falta de fotografia identificada.

| Capa | Original em IMG |
| --- | --- |
| Glow | `6AB40B02-F7BE-41D4-A615-C137FFB371A4.png` |
| Colares em Fios | `1A4B1F41-5D28-4EC6-960D-6D1CB0F680A8.png` |
| Íris | `105DF775-8201-47E1-B2F1-6E3C36A836AF.png` |
| Liz | `C1980850-AF19-491C-B41E-5FA94C99248B.png` |
| Eloá e Camélia | `2AF7F4F7-218A-4D0E-B4A4-3C957B140845.png` |
| Elo/Folha/Esther | `5DDB0749-F5A0-4756-A5A6-A19AFA07B915.png` |
| Karol | `84ED9D5F-9C3E-489A-833B-EA92D5D225BA.png` |
| Ariel | `56E55BEB-533E-4259-9A22-71B3E538447C.png` |

Galeria: Íris, Ariel, capa Flowers e Ramona (Fios em Festa), nas correspondências previamente identificadas. Nenhuma fotografia foi criada ou atribuída a outro curso. Originais, imagem social e configurações comerciais preservados.

## Interações

Carrosséis com setas, progresso, teclado, arraste com mouse e scroll nativo por toque. Arraste suprime clique acidental. No celular, cursos e combo seguem o gesto de deslizar da referência, enquanto encomendas preserva as setas no cabeçalho de seu catálogo. Galeria modal com setas, swipe, Escape e retorno de foco.

Um único controlador de âncoras reaproveita a checagem compartilhada de cliques elegíveis, preserva o estado do histórico, define foco sem scroll e faz uma solicitação de scroll nativo. A margem atual é 16 px, pois não há cabeçalho fixo na referência. A medição continua preparada para compensar um cabeçalho, se houver. Eventos e observadores são limpos no desmonte. Efeitos respeitam movimento reduzido e conteúdo permanece visível sem JavaScript.

## Validação local

TypeScript, ESLint e build de produção aprovados. Chrome local em 360, 390, 768, 1024, 1440 e 1920 px. Capturas das seções e último curso em `.work/qa-reference/`; relatório em `.work/qa-reference/report.json`.

Conferidos: overflow horizontal; 11 cursos e destinos únicos; imagens locais disponíveis; alvos de âncoras; ausência de placeholders; setas, teclado, arraste e toque; modal e foco; carrossel de encomendas; ausência do FAQ extra; âncoras, histórico e hash direto; movimento reduzido; conteúdo sem JavaScript. As páginas externas não foram compradas, alteradas ou autenticadas; a auditoria confere os destinos cadastrados na interface.

## Pendências

Composição e checkout do Super Combo; preço, parcelas e condições atuais; prazo de acesso, suporte, garantia e reembolso; contato e Instagram oficiais; termos e privacidade; domínio e autorização de indexação; fotografia da Bolsa Mikaela. Lista detalhada em `PENDENCIAS.md`.

Entrega exclusivamente local, sem deploy ou modificação do site original.
