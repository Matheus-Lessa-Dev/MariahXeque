# Alterações da cliente — 19/10/2026

## Referências examinadas antes da edição

Todos os arquivos da pasta real `referencias/` foram abertos visualmente:

1. `Imagem do ChatGPT 19 de out. de 2026, 19_50_31.png`: captura da direção visual do Super Combo, com controles externos do aplicativo. Serve apenas à composição: fundo quente, detalhes dourados, benefícios, título e grade. As fotos ilustrativas, nomes e condições não são evidência de catálogo/composição.
2. `Imagem do ChatGPT 19 de out. de 2026, 19_50_43.png`: menu com quatro opções empilhadas, fundo escuro, linhas douradas, ícones e setas.

Não há outros arquivos nessa pasta, incluindo foto do Solare, nova abertura ou capas finais. Os arquivos de `IMG` foram revistos pela prancha e as capas selecionadas foram abertas individualmente. Nenhuma captura do site ou do aplicativo foi usada como capa, fundo ou fotografia de produto.

## Implementação

- Abertura com etiqueta, título, descrição e botão exatos do prompt; Georgia e Arial preservadas.
- Menu visual logo após a apresentação: duas colunas no desktop, opções empilhadas no celular. Cursos e encomendas têm toda a área clicável e scroll nativo suave. YouTube e Instagram foram confirmados posteriormente pelo usuário e estão ativos com os destinos exatos fornecidos: `https://www.youtube.com/@mariahxeque` e `https://www.instagram.com/mariahxeque/`.
- Introdução do catálogo atualizada; seis descrições explicitamente associadas copiadas sem reescrita. Duas frases adicionais têm associação segura pelas capas, nomes e número de modelos: Eloá/Camélia e Folha/Esther/Elo. Outras seis continuam pendentes.
- Carrossel geral preservado. Treze cursos, doze destinos reais únicos: onze antigos mais Entre Fios e Cristais; Blusa Atena sem destino inventado. Entre Fios e Cristais em primeiro, preservando exatamente o link fornecido pela cliente.
- Novos WebP a partir de capas locais oficiais: Entre Fios e Cristais, Blusa Atena e Fios em Festa. Ariel e Folha/Esther/Elo já utilizam as capas quadradas oficiais presentes em `IMG`. Todos os quadros completos permanecem legíveis com `object-fit: contain`.
- Super Combo construído com HTML/React e CSS: título central com itálico, descrição exata, decoração discreta em CSS, benefícios comprovados e grade com até quatro colunas. Nenhuma fotografia foi gerada. Grade com exemplos de oito cursos reais, identificada como demonstração de técnicas e não confirmação de inclusão. Usa as mesmas descrições do cadastro e permite ampliar as capas com teclado/modal.
- Encomendas separadas do aprendizado: etiqueta, título e descrição exatos; Conjunto Solare com `R$ 139,90 + frete`. Como a fotografia e o contato não estão disponíveis, o produto aparece como apresentação textual, sem atribuição incorreta de imagem ou CTA fictício. Dados preparados em `site.physicalProducts` e `site.contact`.
- Oferta comercial preservada com dados confirmados. Sem checkout específico, não há CTA ativo nem redirecionamento para outro produto. Club permanece apenas como acesso das alunas.
- Smooth scroll usa um único controlador e margem de 16 px, sem compensação de um cabeçalho inexistente. Eventos/observadores são limpos. Movimento reduzido e conteúdo sem JavaScript preservados.

## Verificação do link prioritário

Consulta de 19/10/2026: HEAD retornou 401; GET retornou 302 e, em seguida, 200. O destino foi `https://hotmart.com/pt-br/marketplace/produtos/curso-entre-fios-e-cristais/W107711262G`. O CTA conserva `https://go.hotmart.com/W107711262G`.

O perfil oficial consultado, `https://hotmart.com/pt-br/marketplace/especialista/maria-antonia-de-oliveira-xeque/AME5EIOLVA`, não fornece um destino seguro para Blusa Atena nem confirma as condições ilustradas do Combo. Não foram usados links de cursos homônimos de outros produtores. Os links sociais agora seguem os endereços explicitamente fornecidos pelo usuário.

## Validação e pendências

Checks de TypeScript, ESLint, build de produção e auditoria do navegador em seis larguras. Evidências em `.work/qa-cliente-1910/`, incluindo capturas das seções, verificação dos textos, destinos e separação entre curso, combo e peça física.

Pendências específicas e comerciais em `PENDENCIAS.md`. Nenhum deploy, compra, contato com terceiros ou alteração do site original.
