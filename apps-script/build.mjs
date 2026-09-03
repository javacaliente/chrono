import { build } from "esbuild";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputDirectory = new URL("../dist/apps-script/", import.meta.url);

await mkdir(outputDirectory, { recursive: true });

const gsOutfile = fileURLToPath(new URL("./Chrono.gs", outputDirectory));
const htmlOutfile = fileURLToPath(new URL("./Chrono.html", outputDirectory));

await build({
  entryPoints: [fileURLToPath(new URL("./entry.ts", import.meta.url))],
  outfile: gsOutfile,
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "chrono",
  target: "es2019",
  sourcemap: false,
  legalComments: "inline",
  banner: {
    js: "/*! chrono-node 2.10.1 | MIT License | Google Apps Script bundle */",
  },
});

const js = await readFile(gsOutfile, "utf8");
const openTag = "<" + "script>";
const closeTag = "</" + "script>";
await writeFile(htmlOutfile, openTag + "\n" + js + "\n" + closeTag + "\n");

await copyFile(new URL("./appsscript.json", import.meta.url), new URL("./appsscript.json", outputDirectory));

console.log("Built dist/apps-script/Chrono.gs and dist/apps-script/Chrono.html");
