import { build } from "esbuild";
import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputDirectory = new URL("../dist/apps-script/", import.meta.url);

await mkdir(outputDirectory, { recursive: true });

await build({
  entryPoints: [fileURLToPath(new URL("./entry.ts", import.meta.url))],
  outfile: fileURLToPath(new URL("./Chrono.gs", outputDirectory)),
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "ChronoNode",
  target: "es2019",
  sourcemap: false,
  legalComments: "inline",
  banner: {
    js: "/*! chrono-node 2.10.1 | MIT License | Google Apps Script bundle */",
  },
});

await copyFile(new URL("./appsscript.json", import.meta.url), new URL("./appsscript.json", outputDirectory));

console.log("Built dist/apps-script/Chrono.gs");
