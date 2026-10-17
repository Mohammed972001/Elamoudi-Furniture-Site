// Patches @opennextjs/aws so prerendered pages with non-ASCII slugs are found.
//
// For routes with `dynamicParams = false` OpenNext checks the request path against the
// prerender manifest. The request path is percent-encoded (/blog/%D8%A7...) while the
// manifest keys are decoded (/blog/ا...), so every Arabic blog post answered 404.
// Runs on postinstall; fails loudly if the upstream code changed so the patch is revisited.
import { readFileSync, writeFileSync } from "node:fs";

const file = "node_modules/@opennextjs/aws/dist/core/routing/matcher.js";
const original = "const isPregenerated = Object.keys(routes).includes(localizedPath);";
const patched =
  "const isPregenerated = Object.keys(routes).includes(localizedPath) || " +
  "Object.keys(routes).includes((() => { try { return decodeURIComponent(localizedPath); } catch { return localizedPath; } })());";

const source = readFileSync(file, "utf8");
if (source.includes(patched)) process.exit(0);
if (!source.includes(original)) {
  console.error(`patch-opennext: expected code not found in ${file}; review the patch for this OpenNext version.`);
  process.exit(1);
}
writeFileSync(file, source.replace(original, patched));
console.log("patch-opennext: decoded-path check applied");
