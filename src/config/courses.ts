/** Catálogo individual autorizado; não representa a composição do Super Combo. */
export type CatalogCourse = {
  id: string;
  title: string;
  category: "Brincos" | "Colares" | "Bolsas" | "Conjuntos" | "Vestuário";
  description: string;
  image: string | null;
  url: string | null;
};

export const courses: CatalogCourse[] = [
  {
    id: "entre-fios-e-cristais", title: "Curso Entre Fios e Cristais", category: "Brincos",
    description: "Explore a criação de brincos em crochê com pedrarias.",
    image: "/images/curso-entre-fios-e-cristais.webp",
    // Redirecionamento GET conferido em 19/10/2026: produto W107711262G.
    url: "https://go.hotmart.com/W107711262G",
  },
  {
    id: "imperatriz", title: "Curso Coleção Imperatriz", category: "Conjuntos",
    description: "Aprenda a criar o bracelete e o brinco da Coleção Imperatriz.",
    image: "/images/curso-imperatriz.webp",
    url: null,
  },
  {
    id: "colares", title: "Curso Colares em Fios + Aula Bônus", category: "Colares",
    description: "Transforme fios em colares únicos, cheios de estilo e personalidade.",
    image: "/images/curso-colares-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-choker-magnolia-colar-mirabel-aula-bonus/L96369888U",
  },
  {
    id: "glow", title: "Curso Brinco Glow", category: "Brincos",
    description: "Descubra a técnica que transforma crochê e pedrarias em joias únicas.",
    image: "/images/curso-glow-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brinco-glow/P97490542S",
  },
  {
    id: "flowers", title: "Curso Flowers — Brinco Frida + 02 Modelos Bônus", category: "Brincos",
    description: "Aprenda a criar três modelos de brincos florais em crochê.",
    image: "/images/curso-flowers.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-flowers/W97757909K",
  },
  {
    id: "iris", title: "Curso — Brinco Íris", category: "Brincos",
    description: "Do primeiro ponto à finalização do Brinco Íris: aprenda também a engomar e aplicar spray para dar durabilidade à peça.",
    image: "/images/curso-iris-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brinco-iris/G96014337A",
  },
  {
    id: "liz", title: "Curso Brinco Liz + Aula Bônus Brinco Glória", category: "Brincos",
    description: "Acompanhe o passo a passo do Brinco Liz em dois tamanhos e aprenda o Brinco Glória em uma aula bônus.",
    image: "/images/curso-liz-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/introducao-explicacao-inicial/K96268866C",
  },
  {
    id: "eloa-camelia", title: "Curso Brincos Eloá e Camélia", category: "Brincos",
    description: "Aprenda a criar dois modelos de brincos em crochê com design moderno e detalhes sofisticados.",
    image: "/images/curso-eloa-camelia-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brincos-eloa-e-camelia/H98575184W",
  },
  {
    id: "elo-folha-esther", title: "Brinco Elo + Brinco Folha + Brinco Esther", category: "Brincos",
    description: "Aprenda a criar três modelos de brincos em crochê, combinando formas, texturas e cores.",
    image: "/images/curso-elo-folha-esther-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/brinco-elo-brinco-folhar-brinco-esther/W96740520L",
  },
  {
    id: "karol", title: "Brinco Karol — Em crochê", category: "Brincos",
    description: "Aprenda o Brinco Karol do zero e dê forma a uma peça de crochê com brilho e movimento.",
    image: "/images/curso-karol-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/brinco-karol-em-croche/T96146002R",
  },
  {
    id: "ariel", title: "Curso Colar em Pérolas — Ariel", category: "Colares",
    description: "Aprenda a criar um colar sofisticado com fios, pérolas e contas.",
    image: "/images/curso-ariel-quadrado.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-colar-em-perolas-ariel/R97990315H",
  },
  {
    id: "fios-em-festa", title: "Curso Fios em Festa", category: "Conjuntos",
    description: "Aprenda a criar brincos e braceletes em crochê com fios, texturas e cores marcantes.",
    image: "/images/curso-fios-em-festa-oficial.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/fios-em-festa/D99721009I",
  },
  {
    id: "blusa-atena", title: "Curso Blusa Atena", category: "Vestuário",
    description: "Do zero ao acabamento, uma Blusa cheia de charme e estilo!",
    image: "/images/curso-blusa-atena.webp",
    url: null,
  },
];
