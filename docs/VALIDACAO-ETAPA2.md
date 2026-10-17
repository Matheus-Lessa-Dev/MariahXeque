# Validação da etapa 2

Executada localmente em 17/10/2026, America/Sao_Paulo, sobre o build de produção. Catálogo e conteúdo da etapa 1.5 preservados. Esta entrega encerra a etapa 2; sem publicação ou avanço à etapa 3.

## Checks

| Verificação | Resultado |
| --- | --- |
| `npm run check` | TypeScript sem erros |
| `npm run lint` | Sem erros ou avisos |
| `npm run build` | Build concluído; página principal pré-renderizada |
| `npm run start -- --hostname 127.0.0.1 --port 3100` | Produção executada localmente |
| `QA_URL=http://127.0.0.1:3100 npm run qa` | Aprovado no Chrome 155 |
| Comparação SHA-256 com o início da etapa | `courses.ts`, `site.ts`, `package.json` e lockfile idênticos |

A porta 3000 estava indisponível (EACCES); a produção foi validada na 3100. No PowerShell, configure o endereço de QA com `$env:QA_URL='http://127.0.0.1:3100'` antes de `npm run qa`.

Não foi necessário gerar novamente os assets: os 18 WebP e os originais foram mantidos. Não houve instalação de bibliotecas. A validação anterior permanece em `docs/VALIDACAO-ETAPA15.md` e `.work/qa/`.

## Layout e regressões

Larguras: **320, 360, 390, 768, 1024 e 1440 px**.

- Sem rolagem horizontal, imagens quebradas, títulos transbordando ou âncoras inválidas.
- Um H1, Georgia nos títulos e Arial nos textos; identidade creme, preto quente e dourado mantida.
- Exatamente 11 cursos únicos, visíveis por padrão, com nomes e destinos oficiais comparados a expectativas independentes da configuração.
- Dez capas inteiras e alternativa tipográfica de Mikaela, sem mudança de descrição ou link.
- Club separado da compra; nenhum curso individual automaticamente incluído no combo.
- Sem frente de venda de peças físicas, preços históricos anunciados ou botões desabilitados.
- A oferta sem checkout continua levando ao catálogo; sem barra fixa inferior de compra.

## Interações

- Menu mobile anima abertura/fechamento, responde a Escape, devolve foco ao botão, fecha com clique fora ou ao navegar e reinicia ao passar para desktop. Menu fechado usa `inert`, e seus links não entram na ordem de Tab.
- Âncoras mantêm hash e navegação nativa, compensam o cabeçalho e transferem foco ao destino. Testados CTA do combo, CTA alternativo do catálogo, retorno pelo navegador e carregamento completo em link direto para `#mariah`.
- Cabeçalho adquire blur e fundo/borda após a rolagem; seção ativa recebe `aria-current="location"`.
- FAQ abre/fecha com Enter, retorna a altura automática após animar e resolve três cliques rápidos no último estado solicitado. Sem corte persistente de conteúdo.
- Lightbox abre como diálogo modal, mantém foco em seus controles, navega com setas e controle anterior com retorno circular, fecha com Escape e devolve foco à imagem de origem. Tab e Shift+Tab foram verificados nas extremidades do ciclo.
- Gesto horizontal testado com eventos de toque no navegador; contador e imagem atualizados. Scroll do corpo bloqueado e restaurado ao fechar.
- Parallax responde ao scroll no desktop e fica sem translate em touch/mobile; amplitude limitada a 12/9 px.
- Spotlight acompanha duas posições de mouse no painel, com pseudo-elemento visível e sem impedir ações.
- Mudança para `prefers-reduced-motion` remove animações em curso, smooth scroll, parallax, spotlight e transições. FAQ continua nativo e imediato.
- Carregamento de documento novo com JavaScript desabilitado: 11 cards visíveis, menu mobile no fluxo, cabeçalho sem encobrir conteúdo e FAQ operante por teclado.
- Falha simulada de `Element.animate` em documento novo: título visível e FAQ funcional, sem altura presa.
- Nenhuma exceção JavaScript não tratada durante os testes.

## Revisão visual e evidências

Revisadas as capturas de abertura desktop, menu mobile aberto, lightbox mobile, painel de oferta com spotlight e fallback sem JavaScript. Rostos, capas e imagens ampliadas preservam o quadro. O menu termina a transição com fundo opaco; o spotlight usa dourado de baixa intensidade.

Evidências da etapa atual: `.work/qa-stage2/report.json` (`stage: 2`), capturas desktop/tablet/mobile, páginas completas, seções, menu, lightbox, spotlight e fallback. A pasta anterior `.work/qa/` foi preservada.

QA foi realizado no Chrome 155 com emulação de viewport e toque. Não houve compra, login no Club, teste remoto da disponibilidade dos produtos, publicação ou benchmark em aparelhos físicos. As condições comerciais pendentes continuam em `PENDENCIAS.md`.

O servidor temporário de validação foi encerrado ao terminar. Para revisão: `npm run dev` (ou `npm run dev -- --port 3100` se necessário).
