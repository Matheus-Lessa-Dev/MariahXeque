import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Cache local ao projeto, inclusive em ambientes sem acesso ao perfil do usuário.
const fontCache = path.resolve(".work/font-cache");
await mkdir(fontCache, { recursive: true });
const fontDirs = process.platform === "win32" ? [path.join(process.env.WINDIR || "C:/Windows", "Fonts")]
  : process.platform === "darwin" ? ["/System/Library/Fonts", "/Library/Fonts"] : ["/usr/share/fonts", "/usr/local/share/fonts"];
const xml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const fontConfig = path.join(fontCache, "fonts.conf");
await writeFile(fontConfig, `<fontconfig>${fontDirs.map(dir => `<dir>${xml(dir)}</dir>`).join("")}<cachedir>${xml(fontCache)}</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = fontConfig;
process.env.FONTCONFIG_PATH = fontCache;

// No Windows, a DLL de fontes lê o ambiente ao iniciar o processo.
// Renderizar num processo com esse ambiente evita caches fora do projeto.
if (process.env.MARIAH_SOCIAL_RENDER !== "1") {
  const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    env: { ...process.env, MARIAH_SOCIAL_RENDER: "1" }, stdio: "inherit", windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Falha ao gerar imagem social: ${result.status}`);
} else {
const { default: sharp } = await import("sharp");

// Layout gráfico determinístico com a fotografia real, inteira e sem retoques.
// Não há rosto gerado, domínio presumido ou condições comerciais na arte.
const layout = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0c0c0b"/>
  <path d="M58 119h584M58 548h584" stroke="#655234"/>
  <text x="58" y="91" fill="#eee7dd" font-family="Georgia, serif" font-size="44">Mariah Xeque</text>
  <text x="58" y="168" fill="#c6a05a" font-family="Arial, sans-serif" font-size="15" letter-spacing="3">CURSOS DE CROCHÊ E SUPER COMBO</text>
  <g font-family="Georgia, serif" font-size="57" fill="#eee7dd">
    <text x="58" y="265">Crochê, criatividade</text>
    <text x="58" y="335">e o prazer de</text>
    <text x="58" y="405" fill="#c6a05a" font-style="italic">criar à mão.</text>
  </g>
  <text x="58" y="496" fill="#aaa39a" font-family="Arial, sans-serif" font-size="23">Aprenda com Mariah Xeque, no seu ritmo.</text>
  <text x="58" y="590" fill="#c6a05a" font-family="Arial, sans-serif" font-size="18" letter-spacing="1">BRINCOS · COLARES · ACESSÓRIOS</text>
</svg>`);
const portrait = await sharp("IMG/CB31E977-5BAC-443F-8A08-4396C45AD14E.png")
  .rotate().resize(426, 568, { fit: "inside", withoutEnlargement: true }).toBuffer();
await mkdir("public/images", { recursive: true });
await sharp(layout).composite([{ input: portrait, left: 734, top: 31 }])
  .jpeg({ quality: 88, mozjpeg: true }).toFile("public/images/compartilhamento.jpg");
console.log("compartilhamento.jpg: 1200×630, fotografia real sem recorte");
}
