/** Catálogo individual autorizado; não representa a composição do Super Combo. */
export type CatalogCourse = {
  id: string;
  title: string;
  category: "Brincos" | "Colares" | "Bolsas" | "Conjuntos";
  description: string;
  image: string | null;
  url: string;
};

export const courses: CatalogCourse[] = [
  {
    id: "glow", title: "Curso Brinco Glow", category: "Brincos",
    description: "Crie o Brinco Glow do zero, aprendendo a combinar materiais e a cuidar do acabamento e da durabilidade da peça.",
    image: "/images/curso-glow.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brinco-glow/P97490542S",
  },
  {
    id: "flowers", title: "Curso Flowers — Brinco Frida + 02 Modelos Bônus", category: "Brincos",
    description: "Aprenda os brincos florais Frida, Copacabana e Jasmine, com técnicas de acabamento para valorizar cada detalhe.",
    image: "/images/curso-flowers.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-flowers/W97757909K",
  },
  {
    id: "colares", title: "Curso Colares em Fios + Aula Bônus", category: "Colares",
    description: "Explore seis variações de colares a partir do mesmo ponto e descubra como criar resultados diferentes com os fios.",
    image: "/images/curso-colares.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-choker-magnolia-colar-mirabel-aula-bonus/L96369888U",
  },
  {
    id: "iris", title: "Curso — Brinco Íris", category: "Brincos",
    description: "Do primeiro ponto à finalização do Brinco Íris: aprenda também a engomar e aplicar spray para dar durabilidade à peça.",
    image: "/images/curso-iris.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brinco-iris/G96014337A",
  },
  {
    id: "liz", title: "Curso Brinco Liz + Aula Bônus Brinco Glória", category: "Brincos",
    description: "Acompanhe o passo a passo do Brinco Liz em dois tamanhos e aprenda o Brinco Glória em uma aula bônus.",
    image: "/images/curso-liz.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/introducao-explicacao-inicial/K96268866C",
  },
  {
    id: "eloa-camelia", title: "Curso Brincos Eloá e Camélia", category: "Brincos",
    description: "Aprenda dois modelos de brincos do zero, acompanhando a execução e os cuidados de acabamento de Eloá e Camélia.",
    image: "/images/curso-eloa-camelia.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-brincos-eloa-e-camelia/H98575184W",
  },
  {
    id: "elo-folha-esther", title: "Brinco Elo + Brinco Folha + Brinco Esther", category: "Brincos",
    description: "Crie três modelos e pratique técnicas de acabamento, incluindo a customização do Brinco Esther em argola.",
    image: "/images/curso-elo-folha-esther.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/brinco-elo-brinco-folhar-brinco-esther/W96740520L",
  },
  {
    id: "karol", title: "Brinco Karol — Em crochê", category: "Brincos",
    description: "Aprenda o Brinco Karol do zero e dê forma a uma peça de crochê com brilho e movimento.",
    image: "/images/curso-karol.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/brinco-karol-em-croche/T96146002R",
  },
  {
    id: "ariel", title: "Curso Colar em Pérolas — Ariel", category: "Colares",
    description: "Crie o Colar Ariel com um passo a passo completo, incluindo a apresentação dos materiais para a peça em pérolas.",
    image: "/images/curso-ariel.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/curso-colar-em-perolas-ariel/R97990315H",
  },
  {
    id: "mikaela", title: "Bolsa Mikaela — Parte 1 e 2", category: "Bolsas",
    description: "Aprenda uma bolsa de crochê moderno com fecho da vovó e fundo estruturado, em duas partes.",
    image: null,
    url: "https://hotmart.com/pt-br/marketplace/produtos/bolsa-mikaela-parte-1-e-2-mariah-xeque/P89558066M",
  },
  {
    id: "fios-em-festa", title: "Curso Fios em Festa", category: "Conjuntos",
    description: "Aprenda a criar os brincos Mariah e Filipa e o Bracelete Ramona, explorando acessórios para compor suas produções.",
    image: "/images/curso-fios-em-festa.webp",
    url: "https://hotmart.com/pt-br/marketplace/produtos/fios-em-festa/D99721009I",
  },
];
