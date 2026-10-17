# Validação final — etapa 3 de 3

Executada em 17/10/2026, America/Sao_Paulo, sobre o build de produção local. Sem deploy, alteração da página original, compra, login ou envio de mensagens.

## Checks executados

| Verificação | Resultado |
| --- | --- |
| `npm run assets` | 18 WebP e imagem social JPG gerados; sem erros na execução final |
| `npm run check` | TypeScript sem erros |
| `npm run lint` | Sem erros ou avisos |
| `npm run build` | Build concluído, rota principal pré-renderizada |
| Produção em `127.0.0.1:3100` | Aplicação funcionando |
| `npm run qa` com `QA_VISUAL_REVIEW=1` | Chrome 155, seis larguras, testes e capturas por seção |
| SHA-256 do catálogo | Idêntico ao da etapa 1.5; 11 nomes, descrições e URLs preservados |

Usada a porta 3100, pois a porta 3000 estava indisponível no ambiente. Comandos para repetir estão no README. Os registros anteriores permanecem em `docs/VALIDACAO-ETAPA15.md`, `docs/VALIDACAO-ETAPA2.md`, `.work/qa/` e `.work/qa-stage2/`.

## Revisão visual executada

Larguras verificadas automaticamente: **320, 360, 390, 768, 1024 e 1440 px**. Páginas completas e capturas individuais de todas as seções foram produzidas em **360, 390, 768 e 1440 px** e inspecionadas, com conferência de detalhes em capturas de seções e controles.

Revistos abertura, introdução, combo, os 11 cursos, galeria, apresentação do trabalho manual, professora, público, funcionamento, oferta, FAQ e rodapé. Conferidos fundos claros/escuros, espaçamentos, alinhamento, largura de texto, legendas, rostos e proporções, além do menu, lightbox e spotlight.

Correções aplicadas: abertura mais explícita; bloco redundante de atualizações removido; funcionamento em duas colunas no tablet/desktop; legendas e rodapé ampliados; especificidade do destaque tipográfico da seção de processo corrigida; mensagem genérica de contato ausente ocultada; descrição alternativa do Brinco Íris corrigida.

Resultados: sem rolagem horizontal, imagens quebradas, títulos transbordando ou âncoras inválidas nas larguras testadas. Identidade Georgia + Arial, creme, preto quente e dourado preservada. Imagens do catálogo e rostos inteiros; apenas o detalhe de peças da oferta mantém o recorte editorial autorizado. Nenhum CTA inferior cobre o conteúdo: checkout do combo segue ausente e a barra de compra não é exibida.

## Conteúdo e funcionalidade

- Exatamente 11 produtos únicos, visíveis por padrão, com nomes e destinos oficiais exatos, sem carrossel.
- Catálogo independente da composição do combo; Club separado de compra.
- Preços antigos fora da interface, sem avaliações, renda garantida, urgência ou escassez inventadas.
- Frente de venda de peças físicas permanece removida. Dados ausentes ficam nulos/condicionais; não há botões sem destino ou ação.
- Menu abre/fecha, responde a Escape, devolve foco, fecha ao navegar ou clicar fora e reinicia no desktop. Links fechados ficam `inert`.
- Âncoras suaves com foco e compensação do cabeçalho; voltar pelo navegador e carregamento completo em link direto verificados.
- FAQ por Enter, abertura e fechamento animados, retorno à altura automática e reversão de cliques rápidos.
- Lightbox modal: setas, anterior/próxima com ciclo, Tab e Shift+Tab, Escape, botão Fechar, clique fora, foco restaurado e gesto horizontal touch.
- Cabeçalho/seção ativa, parallax limitado ao desktop e spotlight restrito a mouse/hover verificados.
- Preferência por movimento reduzido remove os movimentos e mantém FAQ/navegação.
- Documento carregado sem JavaScript: cards visíveis, menu mobile no fluxo e FAQ nativo funcionando.
- Falha simulada de `Element.animate`: conteúdo visível e FAQ sem altura presa.
- Nenhuma exceção JavaScript não tratada registrada.

## Acessibilidade, SEO e imagens

- Idioma `pt-BR`, um H1, sem saltos de nível nos títulos, IDs duplicados, controles sem nome ou imagens sem alternativa.
- Título e descrição configurados; Open Graph com locale `pt_BR`, Twitter com `summary_large_image`, imagem real 1200 × 630 e texto alternativo.
- Arquivo da imagem social servido com HTTP 200 e tipo de imagem. Tamanho final em `report.json` (aproximadamente 87 KiB).
- Canonical e `og:url` ausentes por falta de domínio confirmado. Base social local explicitada no README; `noindex, nofollow` mantido para revisão.
- Sem dados estruturados comerciais ou avaliações inventadas.
- Todas as imagens do conteúdo com dimensões explícitas e fontes responsivas. A foto principal tem preload e não é lazy; 20 imagens complementares usam lazy originalmente.
- Observador de layout registrou **CLS inicial 0** nesta execução local, antes das interações/redimensionamentos. O teste força posteriormente o carregamento de imagens para detectar falhas; não é uma medição de Core Web Vitals de produção ou em aparelho físico.
- Sem novas dependências, fontes remotas ou loops contínuos de animação. Imagem social fica fora do corpo da página.

## Evidências e limites

Relatório atual: `.work/qa-final/report.json` (`stage: 3`), com SEO, dimensões/lazy/preload, CLS e os seis viewports. Capturas completas, de cada seção nas quatro larguras representativas e das interações no mesmo diretório. Material anterior aos ajustes em `.work/review-before/`.

Teste feito em Chrome 155 com emulação de viewport/toque. Não houve validação em Safari ou aparelhos físicos, login, compra, contato ou teste de checkout do combo. A consulta remota reconheceu nove produtos; Flowers, Karol e Club não puderam ser lidos pela ferramenta. Isso não foi tratado como prova de link quebrado; destinos autorizados mantidos, com limitação documentada em `PENDENCIAS.md` e `docs/FONTES.md`.

Domínio final, composição/checkout e condições atuais do combo, atendimento e documentos legais continuam dependendo de informação da cliente. O projeto está entregue para execução local; a publicação não foi feita. O servidor temporário de QA foi encerrado ao finalizar.

