const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const bundlePath = path.resolve(__dirname, "../dist/apps-script/Chrono.gs");
const htmlPath = path.resolve(__dirname, "../dist/apps-script/Chrono.html");
const source = fs.readFileSync(bundlePath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");

assert.doesNotMatch(source, /^\s*import\b/m);
assert.doesNotMatch(source, /^\s*export\b/m);
assert.doesNotMatch(source, /\brequire\s*\(/);

const trimmedHtml = html.trim();
const openTag = "<" + "script>";
const closeTag = "</" + "script>";
assert.ok(trimmedHtml.startsWith(openTag), "Chrono.html must start with a script tag");
assert.ok(trimmedHtml.endsWith(closeTag), "Chrono.html must end with a script tag");

const context = vm.createContext({ console, Date, Intl });

vm.runInContext(source, context, { filename: bundlePath });

assert.equal(typeof context.chrono, "object");
assert.equal(typeof context.chrono.parse, "function");
assert.equal(typeof context.chrono.parseDate, "function");

const reference = new Date(2012, 7, 25, 12, 0, 0);
const parsedDate = context.chrono.parseDate("next Friday at 4pm", reference, { forwardDate: true });

assert.ok(parsedDate instanceof Date);
assert.equal(parsedDate.getFullYear(), 2012);
assert.equal(parsedDate.getMonth(), 7);
assert.equal(parsedDate.getDate(), 31);
assert.equal(parsedDate.getHours(), 16);

const ptResults = context.chrono.parse("Need these by September 11.", {
  instant: new Date("2026-09-02T12:00:00-07:00"),
  timezone: "PT",
});

assert.ok(ptResults.length >= 1);
assert.equal(ptResults[0].start.get("year"), 2026);
assert.equal(ptResults[0].start.get("month"), 9);
assert.equal(ptResults[0].start.get("day"), 11);

console.log("Apps Script bundle smoke test passed");
