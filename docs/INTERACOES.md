# Interações — etapas 2 a 4

Implementadas no projeto existente, sem alterar o catálogo, os textos comerciais, os links da Hotmart ou os tokens de identidade. Nenhuma dependência foi adicionada: o projeto não tinha biblioteca de animação, e CSS, IntersectionObserver e Web Animations atendem aos efeitos solicitados.

## Rolagem e cabeçalho

- `scroll-behavior: smooth` mantém âncoras e histórico nativos. Não há interceptação de wheel/touch, biblioteca de scroll, duração artificial ou alteração de `history.scrollRestoration`.
- `scroll-margin-top` dos destinos recebe a altura real do cabeçalho mais 16 px. ResizeObserver atualiza essa compensação ao redimensionar. Há valores de fallback no CSS.
- Um único controlador delegado transfere foco com `preventScroll`, preserva o hash no histórico e faz uma chamada explícita ao scroll nativo. Voltar e links diretos continuam sob controle do navegador. Elegibilidade, inventário e diagnóstico em `docs/NAVEGACAO.md`.
- O cabeçalho sticky recebe fundo translúcido, borda dourada e blur de 8 px após 24 px; blur removido em touch/telas menores. A seção ativa recebe `aria-current="location"` quando tem correspondência no menu.
- Menu mobile usa fade e deslocamento de 8 px em 200 ms; fechado, fica `inert` e fora da navegação por teclado. Mantém Escape, retorno de foco, clique fora, fechamento após navegar e reset ao passar para desktop.
- Sem JavaScript, o menu mobile fica visível no fluxo e o cabeçalho deixa de ser sticky, evitando encobrir destinos.

## Entradas, parallax e spotlight

`src/components/page-effects.tsx` concentra o ciclo de vida dos efeitos globais. Um listener passivo de scroll compartilha um requestAnimationFrame entre cabeçalho, seção ativa e parallax. Os listeners, observers e frames são limpos ao desmontar.

As entradas usam opacity e translateY de 10 px, 420 ms e stagger de 35 ms, limitado a 70 ms. A opacidade inicial de 72% mantém a leitura durante a entrada. Executam uma vez por elemento observado. Nenhuma regra CSS esconde conteúdo aguardando JavaScript. Se Web Animations falhar, os elementos continuam no estado final visível. O foco cancela a entrada do elemento para evitar mover controles durante o uso por teclado.

O parallax aparece apenas no detalhe fotográfico da abertura e na foto sobreposta da seção de processo. Deslocamentos máximos: 12 e 9 px. Apenas desktop a partir de 960 px, com ponteiro preciso e hover. O quadro inteiro se desloca, preservando proporções e recortes. Não há loop contínuo: frames só são solicitados por eventos.

Spotlight nos três blocos de público e no painel da oferta: gradiente dourado com opacidade máxima de 10%, sem capturar cliques. Posição atualizada por variáveis CSS em requestAnimationFrame, sem estado React por movimento. O retângulo é lido ao entrar no bloco, e invalidado após rolagem/resize, não a cada movimento. Ativo somente com hover e ponteiro preciso; desativado em touch e movimento reduzido.

## Fotografias e lightbox

`src/components/gallery.tsx` mantém as quatro imagens, suas legendas e a nota sobre aprendizado. As imagens agora são links reais para o WebP; com JavaScript, abrem um `<dialog>` modal. Sem JavaScript ou sem suporte ao diálogo, o link abre a própria imagem.

- Indicador de ampliação sempre visível, incluindo touch; zoom de 2,5% e borda dourada apenas nos elementos que têm ação.
- Modal com título, descrição, imagem integral, contador anunciado, anterior/próxima e navegação circular.
- Setas do teclado, Tab/Shift+Tab contidos nos controles, Escape e clique fora fecham. O foco retorna ao link de origem, com rolagem preservada.
- Arraste horizontal de pelo menos 50 px troca a imagem; deslocamento predominantemente vertical não troca. Pan vertical e pinch zoom continuam disponíveis na área da imagem.
- Scroll do documento bloqueado durante a ampliação e restaurado ao fechar. O próprio diálogo pode rolar em telas baixas.
- As capas do catálogo continuam inteiras e com links de curso separados. Fotografias editoriais sem ação não recebem cursor de clique ou zoom de hover.

## FAQ e controles

O FAQ mantém `details/summary` nativos e suas respostas. Um listener delegado na lista anima abertura e fechamento em 240 ms. Alturas são medidas somente ao interagir; após terminar, `height` volta a auto e `overflow` é removido. Cliques rápidos revertem para o último estado solicitado. Redimensionar ou mudar a preferência de movimento finaliza o estado em curso, evitando cortes. Sem JavaScript, funciona como acordeão nativo.

Botões e links recebem transições de cor/borda, foco visível, resposta pressionada e deslocamento de seta de até 3 px. O alvo do clique permanece fixo. Nenhuma fotografia decorativa recebe aparência de botão.

## Preferências e limites

`prefers-reduced-motion` remove smooth scroll, entradas, parallax, spotlight e movimentos das setas/zoom. Mudanças dessa preferência também são atendidas durante a sessão. Conteúdo e navegação continuam disponíveis.

A barra inferior de compra mobile não foi adicionada porque `offer.checkoutUrl` permanece nulo. A ação da oferta continua levando ao catálogo. Não há chatbot, idiomas adicionais, integrações externas, partículas, efeitos 3D ou animações infinitas.

Evidências e escopo dos testes em `docs/VALIDACAO.md`. Os efeitos da etapa 2 foram revisados nas etapas 3 e 4. Ao navegar, o menu fica oculto e inert antes do primeiro deslocamento; leituras de geometria são agrupadas e imagens lazy não disparam medições globais. A entrega final e os testes atuais estão registrados em PROGRESSO.md e docs/VALIDACAO.md.


