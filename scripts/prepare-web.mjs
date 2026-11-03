// Gera www/vendor com tudo que antes vinha da internet (CDN): Tailwind, Lucide, Firebase e fonte.
import { execSync } from "node:child_process";
import { mkdirSync, copyFileSync, existsSync } from "node:fs";

const run = (c) => { console.log("> " + c); execSync(c, { stdio: "inherit" }); };
mkdirSync("www/vendor/fonts", { recursive: true });

run("npx tailwindcss -c tailwind.config.js -i src/tailwind.css -o www/vendor/tailwind.css --minify");
run("npx esbuild src/firebase.js --bundle --format=esm --minify --outfile=www/vendor/firebase.js");
copyFileSync("node_modules/lucide/dist/umd/lucide.min.js", "www/vendor/lucide.min.js");

for (const w of [400, 500, 600, 700, 800]) {
  const f = `plus-jakarta-sans-latin-${w}-normal.woff2`;
  const src = `node_modules/@fontsource/plus-jakarta-sans/files/${f}`;
  if (!existsSync(src)) throw new Error("Fonte não encontrada: " + src);
  copyFileSync(src, `www/vendor/fonts/${f}`);
}
console.log("OK: www/vendor pronto.");
