# Validação — etapa 4: navegação e fluidez

Executada em 17/10/2026, America/Sao_Paulo. Implementação e testes locais, sem deploy ou alteração da página original. Relatório anterior preservado em `docs/VALIDACAO-ETAPA3.md`.

## Checks executados

| Verificação | Resultado |
| --- | --- |
| `npm run check` | TypeScript sem erros |
| `npm run lint` | Sem erros ou avisos |
| `npm run build` | Build concluído, página principal pré-renderizada |
| `npm run qa`, produção em `127.0.0.1:3100` | Suíte completa aprovada em seis larguras |
| `npm run qa` com `QA_NAVIGATION_ONLY=1`, desenvolvimento em `127.0.0.1:3000` | Auditoria de navegação aprovada |
| SHA-256 de `site.ts`, `courses.ts`, `package.json` e lockfile | Idênticos ao início da etapa: conteúdo, links, condições e dependências preservados |

Assets não foram regenerados nesta etapa: imagens e dimensões foram preservadas. A suíte de produção conferiu novamente imagens, metadados e catálogo.

## Diagnóstico confirmado

A regra CSS de smooth scroll já existia. A amostra inicial em produção registrou deslocamentos suaves; não foi reproduzido um salto generalizado nesse ambiente.

No desenvolvimento pelo endereço 127.0.0.1, o Next bloqueava `/_next/hmr` por origem não autorizada, e a hidratação não completava: menu e efeitos não inicializavam. A configuração `allowedDevOrigins` foi ajustada para essa origem local específica. Após reiniciar automaticamente, HMR e handlers inicializaram, e a auditoria passou no mesmo endereço.

Também foram removidos foco duplicado entre Header/PageEffects e tratamento indevido de cliques modificados. O menu agora fica oculto e inert antes de iniciar a rolagem. Um único controlador usa foco sem scroll, histórico preservado e uma chamada nativa explícita. Inventário e decisões em `docs/NAVEGACAO.md`.

## Navegação realmente exercitada

- Inventário dos **14 links internos**, com IDs existentes e únicos: menu, CTAs, marcas, rodapé, pular para o conteúdo e voltar ao início.
- Clique real em todos os 14 links em **1440 e 390 px**, tanto em produção quanto no desenvolvimento: **28 trajetórias por ambiente**, incluindo subidas e descidas.
- Registro de posições intermediárias durante o movimento, um pedido nativo de scroll e uma aplicação de foco por clique; teste não se limita à propriedade CSS ou posição final.
- Compensação do cabeçalho, menu mobile oculto antes do primeiro deslocamento, navegação para seções distantes e foco no destino.
- Cliques sucessivos substituindo o destino; hash repetido sem duplicar histórico; voltar e avançar com restauração nativa e `scrollRestoration: auto`.
- Abertura completa por URL com hash em 390 e 1440 px; cabeçalho livre e destino correto.
- Ctrl/Cmd/Shift/Alt e os 14 links da Hotmart não interceptados pelo controlador. O teste observa o evento e impede a abertura externa posteriormente; não realiza login ou compra.
- Regra global `scroll-behavior: auto !important` injetada: chamada nativa explícita ainda registra trajetória suave.
- Movimento reduzido com chamada instantânea, sem animação de deslocamento.
- Roda do mouse, sequência curta de eventos semelhante a trackpad e gesto vertical touch: documento rola sem cancelamento de wheel/touchmove pelo aplicativo.

## Regressões e inspeção

Chrome 155 headless: **320, 360, 390, 768, 1024 e 1440 px**. Layout, 11 cursos e URLs exatas, ausência de rolagem horizontal, imagens quebradas, títulos transbordando, IDs duplicados e controles sem nome verificados pela suíte.

Menu: abrir/fechar, teclado, Escape, foco, inert e resize. FAQ: abertura/fechamento, reversão rápida e altura automática. Lightbox: setas, loop, Tab/Shift+Tab, Escape, retorno de foco e gesto horizontal touch. Cabeçalho/seção ativa, parallax limitado, spotlight e movimento reduzido aprovados. Conteúdo e FAQ também testados sem JavaScript e com falha simulada de Web Animations. Nenhuma exceção JavaScript não tratada registrada.

Capturas atuais do menu mobile e das URLs diretas em 390 e 1440 px foram inspecionadas. Foram conferidos visualmente fechamento do menu durante a navegação e posicionamento dos destinos. A revisão visual integral da etapa 3 está documentada no relatório arquivado; não se apresenta essa inspeção pontual como uma nova revisão visual de todas as seções.

## Observação local de desempenho

No trecho instrumentado de roda do mouse da execução final de produção: intervalo entre frames no percentil 95 de aproximadamente **17,9 ms**, máximo **19,5 ms**, **nenhuma long task registrada**, três layouts e aproximadamente 2,8 ms de tempo total de layout segundo o CDP. Métricas completas em `navigation-report.json`.

Esses números descrevem apenas a janela medida em Chrome headless local, com GPU desativada. Não são garantia de FPS, latência de entrada, Core Web Vitals em produção ou desempenho em aparelhos físicos. O tempo de observação do primeiro scroll no relatório inclui o intervalo de consulta do teste e não é tratado como latência de entrada. Sem validação em Safari ou trackpad físico.

## Evidências e limites

- Produção: `.work/qa-stage4/report.json` (`stage: 4`), `navigation-report.json` e screenshots no mesmo diretório.
- Desenvolvimento: `.work/qa-stage4-dev/navigation-report.json`.
- Diagnóstico inicial: `.work/stage4-diagnosis.json`; hashes preservados em `.work/stage4-baseline.json`.
- Scripts: `scripts/browser-qa.mjs` e `scripts/navigation-qa.mjs`. Instruções para repetir no README.

Condições comerciais, composição/checkout do combo, contato, documentos legais e domínio continuam com as pendências anteriores, descritas em `PENDENCIAS.md`. Nenhuma informação comercial, curso, link ou seção foi alterado. Nenhuma compra externa foi executada. Servidor temporário de produção encerrado após os testes; servidor de desenvolvimento existente preservado.
