# Progresso — Mariah Xeque

## Etapa 4 concluída em 17/10/2026 — navegação e fluidez

Implementação concluída diretamente no projeto. Identidade visual, cursos, textos, links Hotmart e condições comerciais preservados; sem encomendas, novas seções, dependências ou deploy.

- Diagnóstico: CSS smooth já existia e a amostra inicial de produção era suave. No desenvolvimento por 127.0.0.1, o bloqueio de HMR impedia a hidratação. `next.config.ts` agora permite essa origem local específica; após reiniciar, HMR, menu e efeitos inicializaram e passaram nos testes.
- Um controlador delegado centraliza elegibilidade, hash/histórico, foco com `preventScroll` e uma chamada nativa de scroll. Removidos foco duplicado e tratamento indevido de cliques modificados no Header. Links externos mantêm o comportamento normal.
- Compensação única por `scroll-margin-top`, calculada pela altura do cabeçalho + 16 px. Menu mobile fica oculto e inert antes da navegação, sem alterar a altura do documento. Movimento reduzido usa navegação instantânea; histórico e URLs diretas permanecem nativos.
- Leituras de layout agrupadas, atributos só escritos quando mudam, parallax limitado ao desktop e sem medições globais a cada imagem lazy. Blur reduzido/removido em touch; entradas de 420 ms/10 px com opacidade mínima de 72% e stagger curto. Menu com área segura e altura disponível.
- Passaram `npm run check`, `npm run lint` e `npm run build`. Suíte completa de produção aprovada em 320, 360, 390, 768, 1024 e 1440 px. Auditoria adicional aprovada no servidor de desenvolvimento em 127.0.0.1:3000.
- Todos os 14 links internos exercitados em desktop/mobile nos dois ambientes, com trajetórias intermediárias medidas. Histórico, URLs diretas, cliques sucessivos/modificados, Hotmart não interceptada, movimento reduzido, wheel e toque aprovados. Menu, FAQ, lightbox, teclado/foco/Escape e fallbacks sem JS/animação aprovados; sem exceções JS registradas.
- Inspeção de screenshots do menu mobile e destinos diretos em 390/1440 px, além do fechamento durante a rolagem. Observação local de frames/layout registrada com seus limites, sem promessa de desempenho em aparelhos físicos.
- SHA-256 de `site.ts`, `courses.ts`, `package.json` e lockfile idênticos ao início desta etapa.

Documentação atual: `docs/NAVEGACAO.md`, `docs/VALIDACAO.md`, `docs/INTERACOES.md` e `README.md`. Evidências: `.work/qa-stage4/` e `.work/qa-stage4-dev/`. Relatório anterior: `docs/VALIDACAO-ETAPA3.md`. Pendências comerciais e de publicação continuam abaixo e em `PENDENCIAS.md`.

O servidor temporário de produção foi encerrado após a validação. O servidor de desenvolvimento que já estava em execução foi preservado. Nenhuma publicação foi feita.

## Registro anterior — etapa 3

## Estado ao concluir a etapa 3 em 17/10/2026

**Etapa 3 de 3 concluída: revisão final e entrega local.** O projeto está funcionando, com build, checks, testes de navegador e inspeção visual executados. Não houve deploy ou alteração da página original.

## Escopo preservado

- Foco exclusivo em 11 cursos individuais e no Super Combo; sem encomendas ou venda de peças físicas.
- Catálogo autorizado independente da composição do combo, sem duplicações e com links oficiais individuais de apresentação na Hotmart.
- Georgia + Arial, preto quente, creme, dourado e fotografias reais.
- Conteúdo e condições comerciais ausentes não foram inventados. Preços históricos não são oferta vigente.
- O TXT original e os arquivos de IMG foram preservados. Instruções posteriores prevalecem nos pontos superados do TXT.

## Ajustes da etapa 3

- Abertura mais explícita sobre cursos de crochê, público iniciante/de aperfeiçoamento e próximos passos.
- Removido o bloco isolado que repetia o benefício de atualizações e expunha informação pendente de programação. O benefício e a configuração foram mantidos.
- Funcionamento do combo equilibrado em duas colunas no tablet/desktop e uma no celular.
- Aumentadas legendas pequenas, nota de galeria e rodapé. Corrigida a especificidade do destaque tipográfico na seção de processo.
- Removida a mensagem genérica de contato indisponível; contato sem URL/email permanece oculto. Perfil e Club continuam disponíveis.
- Texto alternativo de Íris corrigido para círculos sobrepostos, conforme a foto, sem franjas inexistentes.
- Arte social 1200 × 630 em `public/images/compartilhamento.jpg`, com tipografia da marca e fotografia real integral, sem retoques ou recorte do rosto.
- SEO: título e descrição, pt-BR, um H1 e títulos sem saltos, Open Graph e Twitter com imagem real e texto alternativo. Canonical e og:url só são emitidos quando `site.seo.siteUrl` for preenchido com a URL final confirmada.
- README reescrito com comandos curtos, mapa de edição e pendências; cobertura do TXT em `docs/ENTREGA.md`.

## Interações preservadas e verificadas

Rolagem suave nativa e compensação do cabeçalho; foco nos destinos; histórico e links diretos; cabeçalho com blur e seção ativa; menu mobile animado, inert, teclado, Escape e clique fora; entradas discretas; parallax em dois pontos, limitado ao desktop; spotlight dourado com ponteiro preciso; FAQ animado com reversão de cliques rápidos; lightbox com setas, Tab/Shift+Tab, Escape, botão Fechar, clique fora, retorno de foco e gesto touch.

Movimento reduzido remove os efeitos. Conteúdo e FAQ continuam disponíveis sem JavaScript e com falha simulada de Web Animations. Sem novas dependências, chatbot, idiomas extras ou integrações externas. Não há barra inferior de compra porque o checkout do combo não está confirmado.

## Validação final

Passaram `npm run assets`, `npm run check`, `npm run lint`, `npm run build` e `npm run qa` no build de produção, servido em `http://127.0.0.1:3100`. A porta 3000 estava indisponível neste ambiente; a alternativa foi documentada.

Chrome 155: **320, 360, 390, 768, 1024 e 1440 px**. Sem rolagem horizontal, imagens quebradas, títulos transbordando, âncoras inválidas, IDs duplicados, controles sem nome, imagens sem alt ou exceções JavaScript registradas.

Inspeção visual das páginas completas em **360, 390, 768 e 1440 px**, com capturas de todas as seções e conferência detalhada de catálogo, galeria, professora, oferta, FAQ, menu, lightbox e efeitos. Corrigidos os problemas encontrados diretamente no código.

Verificados: 11 produtos únicos e seus destinos exatos; catálogo separado do combo; Club separado de compra; teclado/foco; movimentos condicionais; SEO; dimensões, lazy loading e preload. Observação local de CLS inicial: 0, sem extrapolar isso para desempenho em produção ou aparelhos físicos.

Relatório atual: `.work/qa-final/report.json`, com `stage: 3`. Capturas por seção e páginas completas no mesmo diretório. Insumos visuais anteriores aos ajustes em `.work/review-before/`. Validação detalhada em `docs/VALIDACAO.md`; registros anteriores preservados em `docs/VALIDACAO-ETAPA15.md`, `docs/VALIDACAO-ETAPA2.md`, `.work/qa/` e `.work/qa-stage2/`.

`src/config/courses.ts` tem o mesmo SHA-256 do início da etapa 2, preservando todos os 11 nomes, descrições e URLs da etapa 1.5. Nenhuma dependência foi alterada.

## Pendências reais antes de publicação

- Composição específica do Super Combo (`combo.confirmedCourses` vazio) e URL oficial específica de compra (`offer.checkoutUrl` nulo).
- Preços atuais, parcelas/juros, condições de pagamento, quantidades de aulas/modelos, materiais e pré-requisitos exatos, prazo de acesso, dispositivos, suporte, garantia/reembolso e eventual promoção.
- Atendimento, termos/privacidade e depoimentos autorizados, se forem incluídos.
- Domínio/URL final: `site.seo.siteUrl` nulo, sem canonical. A base social atual usa localhost apenas para revisão. Preencher a URL final, ajustar `site.seo.indexable` quando a publicação for autorizada e gerar novo build. A revisão mantém noindex/nofollow.
- Imagem específica de Mikaela continua não identificada, com alternativa tipográfica autorizada implementada. Três HEIC sem decodificação, sem bloquear o catálogo.

Os valores históricos ficam apenas em `historicalOffer`: R$ 750; R$ 649,90; 12 × R$ 67,21, total R$ 806,52. O Club nunca é usado como compra do combo.

Na revisão final, a ferramenta de leitura identificou nove páginas de produto, algumas parciais/em cache. Flowers, Karol e Club não puderam ser lidos pela ferramenta. Os links autorizados foram mantidos, sem tratar essas falhas como prova de indisponibilidade. Não houve login ou compra. Detalhes em `docs/FONTES.md` e `PENDENCIAS.md`.

Colares em Fios mantém as seis variações autorizadas pelo usuário, apesar da captura antiga mencionar quatro. Não foram convertidas peças entregues em contagem de alunas ou vendas de cursos.

## Executar e editar

- Desenvolvimento: `npm run dev`; alternativa validada de porta: `npm run dev -- --port 3100`.
- Conteúdo geral, condições, checkout, contato, documentos e SEO: `src/config/site.ts`.
- Cursos e links: `src/config/courses.ts`.
- Imagens: `IMG/`, `scripts/prepare-images.mjs`, `scripts/prepare-social-image.mjs`, `public/images/`.
- Layout e efeitos: `src/app/` e `src/components/`.
- QA: `scripts/browser-qa.mjs`; `QA_VISUAL_REVIEW=1` acrescenta capturas de cada seção.
- Instruções de manutenção: `README.md`. Cobertura de requisitos: `docs/ENTREGA.md`.

O servidor temporário de validação foi encerrado ao concluir a entrega. As três etapas estão concluídas no escopo autorizado; publicação permanece fora desta entrega.


