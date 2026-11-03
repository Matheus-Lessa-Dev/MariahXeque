import { courses } from "./courses";

/**
 * Fonte única de conteúdo. null = informação ainda não confirmada.
 * Super Combo transcrito da referência solicitada em 03/11/2026.
 * Condições não informadas na referência seguem pendentes.
 */
export type Course = { title: string; description: string; image?: string };
export type Testimonial = { quote: string; author: string; authorized: boolean };
export type FaqItem = { question: string; answer: string | null };

export const site = {
  brand: "Mariah Xeque",
  product: "Super Combo de Crochê",
  seo: {
    title: "Cursos de Crochê e Super Combo | Mariah Xeque",
    siteUrl: null as string | null, // Preencher somente com a URL final confirmada.
    indexable: false, // Versão local de revisão; liberar só na publicação autorizada.
    shareImage: "/images/compartilhamento.jpg",
    shareImageAlt: "Mariah Xeque com brincos de crochê e apresentação dos cursos e do Super Combo",
  },
  catalog: courses,
  links: {
    studentAccess: "https://hotmart.com/pt-br/club/mariah-xeque",
    creatorProfile: "https://hotmart.com/pt-br/marketplace/especialista/maria-antonia-de-oliveira-xeque/AME5EIOLVA",
    youtube: "https://www.youtube.com/@mariahxeque" as string | null,
  },
  // Registro da referência antiga, nunca utilizado como oferta vigente na interface.
  historicalOffer: {
    source: "Contexto.txt / página antiga",
    current: false,
    referencePrice: 750,
    cashPrice: 649.90,
    installmentCount: 12,
    installmentAmount: 67.21,
    installmentTotal: 806.52,
  },
  description: "Aprenda a criar brincos, colares e acessórios de crochê com Mariah Xeque. Técnica, criatividade e acabamento em cada detalhe.",
  navigation: [
    { label: "O combo", href: "#combo" },
    { label: "Cursos", href: "#cursos" },
    { label: "Mariah", href: "#mariah" },
    { label: "Dúvidas", href: "#duvidas" },
  ],
  hero: {
    eyebrow: "MARIAH XEQUE ATELIÊ",
    title: "Transforme fios em",
    highlight: "peças que encantam.",
    description: "Aprenda a criar joias e acessórios em crochê, desenvolva sua criatividade e descubra novas possibilidades para o seu trabalho artesanal.",
    cta: "Conheça os cursos",
    secondaryCta: "Explorar os cursos",
    caption: "O cuidado está em cada ponto.",
    note: "Crochê, criatividade e o prazer de fazer à mão.",
  },
  introduction: {
    eyebrow: "O valor de criar",
    title: "Mais do que fios.\nUm pouco de você em cada peça.",
    description: "Uma combinação de cores, uma textura, um acabamento. O crochê transforma pequenos detalhes em acessórios cheios de personalidade. E abre espaço para você experimentar, se expressar e descobrir novas possibilidades.",
  },
  combo: {
    eyebrow: "Seu próximo capítulo no crochê",
    title: "Super Combo de Crochê",
    description: "Tudo o que você precisa para explorar novas técnicas e criar joias e acessórios artesanais em crochê.",
    topics: [
      { number: "01", title: "Aprendizado passo a passo", description: "Aulas com técnicas do básico ao avançado para acompanhar cada etapa da criação." },
      { number: "02", title: "Modelos para explorar", description: "Modelos exclusivos selecionados e atualizações futuras para ampliar suas possibilidades no crochê." },
      { number: "03", title: "Materiais e acabamento", description: "Orientação de materiais e atenção aos detalhes para construir peças com cuidado." },
    ],
    imageCaption: "O feito à mão tem uma beleza própria.",
    // Textos e composição da referência fornecida e solicitada em 03/11/2026.
    confirmedCourses: [
      { title: "Fios em Festa", description: "Brincos com flores" },
      { title: "Imperatriz", description: "Bracelete e brinco" },
      { title: "Ponto de Luz", description: "Brincos com pedraria" },
      { title: "Colares em Fios", description: "Colares artesanais" },
      { title: "Trio de Flores", description: "3 modelos de brincos" },
      { title: "Fio Metalizado", description: "5 modelos de brincos" },
      { title: "Brincos Clássicos", description: "Modelos atemporais" },
      { title: "Bolsas em Crochê", description: "Modelos exclusivos" },
      { title: "Braceletes em Fios", description: "Modelos sofisticados" },
      { title: "Técnicas Especiais", description: "Acabamentos e detalhes" },
      { title: "Acessórios Modernos", description: "Peças versáteis" },
      { title: "Combinações Criativas", description: "Mix de técnicas" },
    ] satisfies Course[],
    earringModelCount: 21,
    necklaceModelCount: 5,
    lessonCount: null as number | null,
    modelCount: null as number | null,
    materials: null as string[] | null,
    prerequisites: null as string | null,
    updates: "O Super Combo inclui atualizações futuras. A programação de novos conteúdos ainda não foi informada." as string | null,
  },
  gallery: {
    eyebrow: "Um olhar de perto",
    title: "Detalhes que\nfazem a diferença.",
    description: "Veja de perto peças e modelos relacionados aos cursos individuais. Cores, texturas e acabamento para inspirar seu aprendizado.",
    note: "Referências de aprendizado: Brinco Íris, Colar Ariel, modelos de Flowers e Bracelete Ramona, de Fios em Festa. A presença na galeria não indica inclusão no Super Combo.",
    items: [
      { image: "/images/brinco-iris.webp", alt: "Mão segurando uma cartela com brincos Íris de crochê em círculos sobrepostos, em vermelho e mostarda", label: "Brinco Íris", category: "Brincos", width: 1086, height: 1448 },
      { image: "/images/colar-perolas.webp", alt: "Colar Ariel com pérolas claras e detalhes dourados sobre tecido texturizado", label: "Colar Ariel", category: "Colares", width: 1086, height: 1448 },
      { image: "/images/curso-flowers.webp", alt: "Capa Flowers com Mariah e os modelos florais do curso", label: "Modelos de Flowers", category: "Brincos", width: 1440, height: 810 },
      { image: "/images/braceletes.webp", alt: "Braceletes Ramona de crochê em azul, bege e verde sobre uma bancada clara", label: "Bracelete Ramona", category: "Fios em Festa", width: 1086, height: 1448 },
    ],
  },
  process: {
    eyebrow: "Entre o fio e a peça pronta",
    title: "Cada detalhe começa\ncom as mãos.",
    description: "O artesanal convida a olhar de perto: a escolha das cores, a construção das formas, o cuidado na apresentação. Cada peça carrega um processo, e aprender também é descobrir prazer nesse caminho.",
    caption: "Criações e apresentação das peças no ateliê de Mariah.",
    aside: "Criar é dar forma\na uma possibilidade.",
  },
  teacher: {
    eyebrow: "Quem ensina",
    title: "Muito prazer,\nMariah Xeque.",
    description: "Mariah Xeque é artesã especializada em joias de crochê. Começou com poucos materiais e transformou sua paixão em um negócio, desenvolvendo peças de acabamento delicado e estrutura firme.",
    secondParagraph: "Hoje, compartilha o que aprendeu de forma simples e prática para você criar para si, presentear ou produzir para vender. Cada aula é um convite a descobrir suas possibilidades com os fios.",
    linkLabel: "Conheça os cursos de Mariah",
  },
  audience: {
    eyebrow: "Encontre o seu motivo para criar",
    title: "Um espaço para\na sua criatividade.",
    items: [
      { title: "Explorar uma nova habilidade", description: "Para quem se interessa pelo crochê e quer conhecer a criação de acessórios. Consulte os pré-requisitos de cada curso antes de escolher." },
      { title: "Cuidar de cada detalhe", description: "Para quem já cria e tem interesse em aprimorar a técnica, as combinações e o acabamento das peças." },
      { title: "Criar novas possibilidades", description: "Para quem deseja fazer peças para si, presentear ou explorar a possibilidade de vender seu trabalho artesanal." },
    ],
  },
  learning: {
    title: "O Super Combo, no seu ritmo.",
    platform: "Hotmart" as string | null,
    format: "Método passo a passo, para acompanhar as aulas no seu próprio ritmo." as string | null,
    release: "O acesso é liberado após a confirmação da compra." as string | null,
    consultation: "Conteúdo disponível para consulta durante o período de acesso da sua oferta.",
    access: null as string | null,
    devices: null as string | null,
    support: null as string | null,
  },
  testimonials: [] as Testimonial[],
  offer: {
    eyebrow: "Dê forma ao que você imagina",
    title: "Seu próximo projeto\ncomeça com um ponto.",
    description: "Explore o Super Combo e encontre também cursos individuais para o seu próximo projeto. Escolha o aprendizado que combina com o seu momento.",
    // Valores transcritos da referência solicitada pelo usuário em 03/11/2026.
    price: "R$ 649,90" as string | null,
    installments: "12x de R$ 67,21" as string | null,
    installmentCount: 12,
    installmentAmount: "R$ 67,21",
    interest: null as string | null,
    paymentMethods: null as string | null,
    checkoutUrl: "https://pay.hotmart.com/B99761164L?sck=HOTMART_MEM_CA&off=wdj5gmv7&bid=1793705416381" as string | null,
    guarantee: null as string | null,
    refund: null as string | null,
    promotion: null as { text: string; endsAt: string } | null,
    cta: "Quero meu Super Combo",
    fallbackCta: "Explorar cursos individuais",
    unavailableMessage: "A compra do Super Combo ainda não está disponível nesta página. Conheça os cursos individuais pelo catálogo.",
    footnote: "Feito à mão. Aprendido ponto a ponto.",
  },
  faq: {
    eyebrow: "Vamos esclarecer",
    title: "Antes do\nprimeiro ponto.",
    description: "Sobre os cursos, o Super Combo e o seu aprendizado.",
    items: [
      { question: "Qual é a proposta do Super Combo de Crochê?", answer: "A proposta é ensinar a criar brincos, colares e acessórios de crochê, desenvolvendo técnica, criatividade e acabamento, além de explorar possibilidades de comercialização das peças." },
      { question: "Os cursos do catálogo fazem parte do Super Combo?", answer: "O catálogo apresenta ofertas individuais. Consulte a lista de 12 cursos na seção Super Combo para conhecer a composição desta oferta." },
      { question: "O que as imagens da galeria mostram?", answer: "A galeria mostra referências de peças relacionadas aos cursos identificados nas legendas. Elas ajudam a visualizar o aprendizado e não definem a composição do Super Combo." },
      { question: "Posso criar peças para vender?", answer: "A comercialização é uma das possibilidades para quem desenvolve o trabalho artesanal. As vendas e os resultados dependem de fatores como prática, dedicação, divulgação e mercado; não há promessa de renda ou de vendas garantidas." },
      { question: "Preciso saber crochê?", answer: "Há cursos que ensinam desde o começo, como Brinco Glow, Íris, Eloá e Camélia e Karol. Consulte a apresentação do curso escolhido na Hotmart para conhecer a proposta e os pré-requisitos específicos." },
      { question: "Quais materiais preciso?", answer: null },
      { question: "O que está incluído no combo?", answer: null },
      { question: "Como acesso as aulas?", answer: "Se você já é aluna, use o link ‘Já sou aluna — acessar meus cursos’ no menu ou no rodapé para entrar no Club de Mariah Xeque na Hotmart. No Super Combo, o acesso ocorre após a confirmação da compra; as aulas seguem um método passo a passo e podem ser acompanhadas no seu ritmo." },
      { question: "Posso assistir pelo celular?", answer: null },
      { question: "Por quanto tempo tenho acesso?", answer: null },
      { question: "Como funciona o suporte?", answer: null },
      { question: "Como funciona o pagamento?", answer: null },
      { question: "Como funciona o reembolso?", answer: null },
    ] satisfies FaqItem[],
  },
  contact: {
    url: "https://wa.me/554584156998" as string | null,
    phone: "+55 45 8415-6998",
    email: null as string | null,
    instagram: "https://www.instagram.com/mariahxeque/" as string | null,
    unavailableMessage: "O contato de atendimento está indisponível nesta página no momento.",
  },
  legal: {
    termsUrl: null as string | null,
    privacyUrl: null as string | null,
    credit: "Desenvolvido por NextWave",
    creditUrl: null as string | null,
    copyright: "Mariah Xeque. Todos os direitos reservados.",
  },
};
