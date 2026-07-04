import { copyFileSync, existsSync } from "node:fs";

const source = ".output/public/404/index.html";
const destination = ".output/public/404.html";

if (!existsSync(source)) {
  throw new Error(`Missing prerendered 404 page at ${source}`);
}

copyFileSync(source, destination);
console.log(`Created ${destination}`);
