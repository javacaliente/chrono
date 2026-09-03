# grokbot/apps-script-build

This branch is for Michael Martin's print shop job desk. It is **not** an
upstream Chrono contribution. Do **not** open a pull request against
`wanasit/chrono`.

## What this branch is for

Package **English Chrono 2.10.1** as a Google Apps Script / HtmlService
bundle for the job desk:

- Global name is `chrono` (not `ChronoNode`)
- Timezone is Pacific Time (`America/Los_Angeles` / PT)
- Copy `dist/apps-script/Chrono.html` into the desk HtmlService project
- Do **not** clasp-push this folder onto the live Print shop job desk project

`dist/` is generated. Edit sources under `apps-script/`, then rebuild.

## Build

```bash
npm install
npm run build:apps-script
npm run test:apps-script
```

`npm run test:apps-script` builds first, then runs the smoke test.

Outputs (gitignored; do not commit):

- `dist/apps-script/Chrono.gs` — IIFE bundle, global `chrono`
- `dist/apps-script/Chrono.html` — the same JS wrapped in `<script>` tags
- `dist/apps-script/appsscript.json` — V8, `America/Los_Angeles`
