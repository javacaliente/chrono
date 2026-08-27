const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const bundlePath = path.resolve(__dirname, "../dist/apps-script/Chrono.gs");
const source = fs.readFileSync(bundlePath, "utf8");
const context = vm.createContext({ console, Date, Intl });

vm.runInContext(source, context, { filename: bundlePath });

assert.equal(typeof context.ChronoNode, "object");
assert.equal(typeof context.ChronoNode.parse, "function");
assert.equal(typeof context.ChronoNode.parseDate, "function");

const reference = new Date(2012, 7, 25, 12, 0, 0);
const parsedDate = context.ChronoNode.parseDate("next Friday at 4pm", reference, { forwardDate: true });

assert.ok(parsedDate instanceof Date);
assert.equal(parsedDate.getFullYear(), 2012);
assert.equal(parsedDate.getMonth(), 7);
assert.equal(parsedDate.getDate(), 31);
assert.equal(parsedDate.getHours(), 16);

console.log("Apps Script bundle smoke test passed");
