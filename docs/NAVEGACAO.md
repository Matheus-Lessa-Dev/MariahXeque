# Navegação e fluidez — etapa 4

## Diagnóstico

A declaração `scroll-behavior: smooth` já existia. No build de produção, o diagnóstico inicial registrou posições intermediárias em cliques para cima e para baixo, inclusive mobile. Portanto, não foi reproduzido um salto generalizado nesse ambiente; não atribuímos o problema a uma regra CSS inexistente.

No servidor de desenvolvimento em `http://127.0.0.1:3000`, houve um defeito reproduzível: o Next registrou `Blocked cross-origin request to Next.js dev resource /_next/hmr from "127.0.0.1"`. Os scripts retornavam HTTP 200, mas a hidratação não completava: o menu não tinha handlers React e PageEffects não inicializava. Após configurar `allowedDevOrigins: ["127.0.0.1"]`, o HMR conectou e as interações inicializaram. Essa opção permite apenas a origem local adicional, sem wildcard ou domínio público. Referência: [documentação oficial do Next](https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins).

Outros problemas comprováveis no código anterior: foco delegado em PageEffects e também no Header, fechamento mobile concorrendo com o deslocamento e handlers do Header que tratavam cliques modificados. Os testes antigos verificavam propriedade CSS e posição final, sem exigir uma trajetória suave; essa lacuna foi corrigida.

## Implementação

- `src/lib/internal-navigation.ts` decide quais ativações são elegíveis: clique principal sem modificadores, mesma origem/caminho/query, hash válido, destino existente, sem download ou outro target.
- `src/components/page-effects.tsx` mantém um único controlador delegado para todos os links internos. Cancela o comportamento padrão somente nesses casos, preserva o estado do Next ao inserir o hash no histórico e, no próximo frame, aplica foco com `preventScroll` antes de um único `scrollIntoView` nativo com `behavior: smooth`.
- Não há tween de scroll, biblioteca adicional, captura de wheel/touchmove, inércia artificial ou fila de animações. Um novo clique substitui o pedido nativo anterior; o frame ainda pendente é cancelado.
- Header só fecha o menu. Ao navegar, a camada absoluta fica oculta e inert antes do primeiro frame, sem esperar o fade ou alterar a altura do documento. O toggle normal mantém a transição de 200 ms.
- A compensação existe somente em `scroll-margin-top` dos destinos, baseada na altura real do cabeçalho + 16 px. `scroll-padding-top` duplicado foi removido. Sem JavaScript, o CSS continua atendendo aos hashes.
- `history.scrollRestoration` permanece `auto`. Voltar e avançar continuam com a restauração nativa; o controlador não inventa estados comerciais, rotas ou outra posição de histórico. URLs diretas usam o posicionamento nativo e as dimensões já reservadas das imagens.
- Movimento reduzido recebe `behavior: instant`, inclusive se alguma regra global tentar ativar animação. O teste também injeta `scroll-behavior: auto !important` e confirma que os cliques comuns seguem suaves pela chamada nativa explícita.
- `data-scroll-behavior="smooth"` no HTML declara a configuração ao Next, preservando o tratamento de transições do framework.

## Inventário dos 14 links internos

| Origem | Quantidade | Destino |
| --- | --- | --- |
| Pular para o conteúdo | 1 | `#conteudo` |
| Logo do cabeçalho | 1 | `#inicio` |
| Menu desktop/mobile | 4 | `#combo`, `#cursos`, `#mariah`, `#duvidas` |
| CTAs da primeira tela | 2 | `#combo`, `#cursos` |
| Continuação da abertura | 1 | `#combo` |
| Apresentação do combo | 1 | `#oferta` |
| Apresentação da professora | 1 | `#cursos` |
| Oferta sem checkout | 1 | `#cursos` |
| Marca no rodapé | 1 | `#inicio` |
| Voltar ao início | 1 | `#inicio` |

Todos os destinos existem, são únicos e recebem foco. Os 14 links da Hotmart (11 produtos, dois acessos ao Club e perfil) ficam fora desse controlador. Links de imagem da galeria continuam sob seu lightbox específico. Não há carrossel, CTA inferior de compra, chatbot ou nova seção.

## Ajustes de fluidez

- Leituras de geometria agrupadas antes das escritas; não há remoção de translate intercalada com getBoundingClientRect por fotografia.
- Cabeçalho e seção ativa só atualizam seus atributos ao mudar de estado. Parallax só escreve translate quando o valor mudou; amplitudes de 12/9 px continuam limitadas ao desktop com hover/ponteiro preciso.
- Imagens têm dimensões explícitas: o carregamento de cada imagem lazy deixou de disparar medição global. ResizeObserver do cabeçalho, resize e pageshow mantêm o cache atualizado.
- Blur do cabeçalho reduzido para 8 px, sem animar o filtro. Blur de cabeçalho/backdrop removido em touch e telas menores; fundo continua suficientemente opaco.
- Entradas passam de 480 ms/14 px para 420 ms/10 px, com stagger de 35 ms (máximo 70 ms). A opacidade inicial de 72% mantém conteúdo legível; elementos já vistos não repetem a entrada.
- Menu com altura disponível baseada no cabeçalho real e padding da área segura inferior. Não desloca o conteúdo ao fechar.
- FAQ mantém 240 ms, mede altura apenas na interação e restaura altura automática ao terminar. A animação de altura fica restrita ao acordeão, sem medições JS a cada frame. Foco, fechamento rápido e resize continuam atendidos.

## Verificação

`scripts/navigation-qa.mjs`, integrado a `npm run qa`, inventaria os links e registra suas trajetórias em 1440 e 390 px: posições intermediárias, foco aplicado uma vez, um único pedido nativo e menu oculto antes da primeira posição de scroll. Testa ainda hash repetido, cliques sucessivos, regra CSS auto injetada, Ctrl/Cmd/Shift/Alt, destinos externos, voltar/avançar, URLs diretas, movimento reduzido, wheel e gesto vertical touch.

O relatório contém observações locais de frames, long tasks e métricas de layout/script durante entradas reais de roda do mouse. O teste headless não é um benchmark em hardware físico, Safari ou rede móvel. Não compara FPS de produção nem testa compra/login externo. Resultados atuais em `docs/VALIDACAO.md`.
