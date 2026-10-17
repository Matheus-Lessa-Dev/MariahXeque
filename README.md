# Mariah Xeque — entrega final

Site em Next.js, React, TypeScript e Tailwind CSS. Etapas 1, 1.5, 2, 3 e 4 concluídas localmente, com 11 cursos individuais, Super Combo e interações acessíveis. Sem deploy ou alteração da página original.

## Executar

Requer Node.js 20.9+ e npm. Com as dependências instaladas:

```powershell
npm run dev
```

Abra http://localhost:3000. Se a porta estiver indisponível, use `npm run dev -- --port 3100` e http://localhost:3100.

Em outra máquina, execute `npm ci` antes. Neste ambiente, há cache para `npm ci --offline --cache .work/npm-cache`.

Para produção local: `npm run build` e `npm run start` (ou `npm run start -- --hostname 127.0.0.1 --port 3100`).

## Editar

| Conteúdo | Arquivo / configuração |
| --- | --- |
| Textos, navegação, biografia, FAQ e galeria | `src/config/site.ts` |
| 11 cursos: nomes, descrições, categorias, capas e links | `src/config/courses.ts` |
| Cursos efetivamente incluídos no Super Combo | `site.combo.confirmedCourses`, independente do catálogo |
| Imagens | Originais em `IMG/`; seleção em `scripts/prepare-images.mjs`; executar `npm run assets` |
| Imagem de compartilhamento | `scripts/prepare-social-image.mjs`; gerada junto com os assets |
| Preço atual, parcelas, juros, garantia e condições | `site.offer`; histórico antigo fica em `site.historicalOffer` e não é exibido |
| Compra do Super Combo | `site.offer.checkoutUrl`; até confirmar, o CTA leva ao catálogo |
| Contato e Instagram | `site.contact`; aparecem somente quando preenchidos |
| Encomendas | Frente removida do escopo; não há canal ou seção de venda de peças físicas |
| Termos, privacidade e crédito | `site.legal` |
| SEO e domínio final | `site.seo`: título, `siteUrl`, imagem social e `indexable` |
| Layout e efeitos | `src/app/page.tsx`, `src/app/globals.css`, `src/components/` |

`null` significa informação ausente. Não preencher com exemplos. Perguntas sem resposta ficam ocultas; depoimentos exigem autorização. Os links individuais abrem a apresentação oficial na Hotmart; o Club serve apenas ao acesso das alunas.

## Antes de publicar

Faltam composição e checkout específico do combo, condições comerciais atuais, prazo de acesso/suporte, contato e documentos legais. Lista completa em `PENDENCIAS.md`. Não usar os preços históricos como oferta atual.

O domínio final ainda não foi confirmado. `site.seo.siteUrl` permanece nulo, sem canonical ou `og:url`. A base dos metadados sociais usa `http://localhost:3000` apenas para revisão local: preencha a URL final confirmada e gere novo build antes de compartilhar/publicar. `site.seo.indexable` continua `false` (`noindex, nofollow`); altere somente na publicação autorizada.

## Verificar

```powershell
npm run assets
npm run check
npm run lint
npm run build
```

Com a aplicação em execução, rode `npm run qa`. Para a porta 3100 no PowerShell:

```powershell
$env:QA_URL='http://127.0.0.1:3100'
npm run qa
```

QA usa Chrome/Edge instalado, testa seis larguras e grava relatório/capturas em `.work/qa-stage4/`. Para capturar cada seção em 360, 390, 768 e 1440 px, acrescente `$env:QA_VISUAL_REVIEW='1'` antes do comando. `QA_BROWSER_PATH` e `QA_EVIDENCE_DIR` permitem outro executável ou diretório.

Resultados em `docs/VALIDACAO.md`; cobertura do TXT em `docs/ENTREGA.md`; fontes e imagens em `docs/FONTES.md` e `docs/IMAGENS.md`; comportamento dos efeitos em `docs/INTERACOES.md`; estado final em `PROGRESSO.md`.

A etapa 4 unificou foco/hash/scroll em `src/components/page-effects.tsx`, com seleção de links em `src/lib/internal-navigation.ts`. Inventário, diagnóstico e limites em `docs/NAVEGACAO.md`. `next.config.ts` permite também a origem local 127.0.0.1 no desenvolvimento, evitando bloqueio de HMR ao usar esse endereço.

Para executar somente a auditoria de navegação, configure `$env:QA_NAVIGATION_ONLY='1'` antes de `npm run qa`; para voltar à suíte completa, use `$env:QA_NAVIGATION_ONLY=$null`. Ela registra as trajetórias reais em desktop/mobile, cliques modificados e externos, histórico, movimento reduzido, wheel e toque em `navigation-report.json`. As evidências do desenvolvimento ficam em `.work/qa-stage4-dev/`; a pasta de saída pode ser escolhida com `QA_EVIDENCE_DIR`.
