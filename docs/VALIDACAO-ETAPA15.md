# Validação da etapa 1.5

Executada localmente em 17/10/2026, America/Sao_Paulo, com a versão de produção. Esta validação substitui as expectativas da etapa 1 para conteúdo e CTAs. Sem publicação ou alteração da página original. Efeitos da etapa 2 não implementados.

## Checks

| Check | Resultado |
| --- | --- |
| `npm run assets` | 18 WebP gerados: oito fotografias e dez capas; manifesto atualizado |
| `npm run check` | TypeScript sem erros |
| `npm run lint` | Sem erros nem avisos |
| `npm run build` | Build concluído, página principal pré-renderizada |
| `npm run start -- --hostname 127.0.0.1` | Produção executada localmente |
| `npm run qa` | Aprovado em Chrome 155 nas seis larguras |

## Navegador e conteúdo

Larguras: **320, 360, 390, 768, 1024 e 1440 px**.

- Sem rolagem horizontal, imagens quebradas, títulos transbordando ou âncoras sem destino.
- Um H1, Georgia nos títulos e Arial nos textos.
- Exatamente 11 cursos únicos, visíveis por padrão, com nomes e URLs oficiais comparados a expectativas independentes da configuração.
- Dez capas com proporção preservada, sem recortes, e composição tipográfica para Mikaela.
- Cada CTA identifica o curso e a Hotmart para tecnologias assistivas. Navegação com Tab entre links individuais verificada.
- Catálogo independente da composição do combo; nenhum curso do catálogo atribuído automaticamente à oferta.
- Club com texto de acesso das alunas no menu e no rodapé; separado da compra.
- Sem conteúdo de venda de peças físicas, canal específico dessa frente ou preços históricos na página.
- Sem ações desabilitadas: a oferta sem checkout apresenta contexto e um botão funcional para o catálogo.
- Menu abre/fecha, responde a Escape e clique fora, devolve foco, fecha após navegação e reinicia ao mudar para desktop.
- Foco acompanha a âncora selecionada no menu; cabeçalho respeita os destinos.
- FAQ abre e fecha com Enter. Movimento reduzido respeitado.
- Nenhuma exceção JavaScript registrada durante a execução.

As capturas de abertura desktop, catálogo mobile e página tablet completa foram examinadas visualmente. A composição mantém os rostos e as capas inteiras, o catálogo em três/duas/uma colunas e a identidade da etapa 1.

Evidências: `.work/qa/report.json`, `desktop.png`, `tablet.png`, `mobile.png`, versões completas e capturas por seção/menu no mesmo diretório. O relatório identifica `stage: 1.5`. Arquivos de trabalho ficam fora do código distribuído. Eventuais capturas antigas de seções removidas não representam a versão atual; consulte os arquivos produzidos pelo relatório da etapa 1.5.

## Limites

QA verifica os destinos configurados, sem realizar compras, login no Club ou testar disponibilidade remota dos produtos. As consultas públicas registradas são da execução anterior; contexto em `docs/FONTES.md`. O TXT original e os três HEIC foram preservados. Os HEIC continuam sem decodificação disponível.

Composição, destino de compra e condições atuais do Super Combo seguem pendentes em `PENDENCIAS.md`. O servidor de validação foi encerrado ao terminar; para revisar, execute `npm run dev`.
