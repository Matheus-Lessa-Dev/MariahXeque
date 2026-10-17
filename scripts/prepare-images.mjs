import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

// Somente conversão/otimização; fotografias originais preservadas em IMG.
const selections = [
  ["CB31E977-5BAC-443F-8A08-4396C45AD14E.png", "mariah-brincos", "Retrato com blusa verde e brincos dourados"],
  ["F7CAFAAF-0AD4-41C5-83A9-AC2BC6431D80.png", "mariah-colares", "Retrato sorrindo e segurando colares coloridos"],
  ["Brinco Íris.png", "brinco-iris", "Brincos vermelhos e mostarda em cartela"],
  ["Brincos.png", "brincos-artesanais", "Cartelas de brincos sobre bancada, com planta e bolsa ao fundo"],
  ["Brincos_.png", "brincos-flores", "Cartelas de brincos florais em rosa e marrom"],
  ["Colar pérolas.png", "colar-perolas", "Colar de pérolas claras com detalhes dourados"],
  ["Bracelete Ramona_.png", "braceletes", "Braceletes azul, bege e verde sobre bancada"],
  ["080240A6-EE59-4E6C-AF9A-BE2108E76797.png", "mariah-perfil", "Retrato de perfil com blusa branca e brinco longo"],
  ["90fd1edb-8864-4d84-a6b0-7e2a294472d3.jpg", "curso-glow", "Capa oficial Brinco Glow"],
  ["E149C443-1651-4AB2-9514-D9EB5FB4A93F.png", "curso-flowers", "Capa oficial Flowers"],
  ["d830ff5c-3582-4a88-a73d-dfde3e8deb67.jpg", "curso-colares", "Capa oficial Colares em Fios"],
  ["ca2972a3-64b1-4f82-94e4-0b1abec6d635.jpg", "curso-iris", "Capa oficial Brinco Íris"],
  ["9e960c77-1ba1-4768-a764-acb40990c20e.jpg", "curso-liz", "Capa oficial Brinco Liz"],
  ["2737ecf5-ad90-40ec-bd26-ea7771edac19.jpg", "curso-eloa-camelia", "Capa oficial Eloá e Camélia"],
  ["60c3931c-dd9e-47d3-8e04-88ced18e324b.jpg", "curso-elo-folha-esther", "Capa oficial Elo, Folha e Esther"],
  ["790acb95-692c-433a-9ec8-d3cbdfa3e2af.jpg", "curso-karol", "Capa oficial Brinco Karol"],
  ["592c4423-f435-46f4-aeea-9286562bc164.jpg", "curso-ariel", "Capa oficial Colar Ariel"],
  ["DB66020D-A60C-4A23-8E2E-C4B8D062C2DB.png", "curso-fios-em-festa", "Capa oficial Fios em Festa"],
];

await mkdir("public/images", { recursive: true });
const manifest = [];
for (const [original, name, description] of selections) {
  const source = `IMG/${original}`;
  const output = `public/images/${name}.webp`;
  const result = await sharp(source).rotate().resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(output);
  manifest.push({ original, output, description, width: result.width, height: result.height, bytes: result.size });
  console.log(`${name}: ${result.width}×${result.height}, ${Math.round(result.size / 1024)} KB`);
}
await writeFile("public/images/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
await import("./prepare-social-image.mjs");
