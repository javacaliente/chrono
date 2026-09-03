# Google Apps Script build (print shop job desk)

This `grokbot/apps-script-build` branch packages English Chrono 2.10.1 for
Michael Martin's print shop job desk. Do **not** open pull requests against
`wanasit/chrono`.

The source stays in TypeScript. Generated files under `dist/apps-script/`
should not be edited by hand and should not be committed.

## Build and verify

```bash
npm install
npm run build:apps-script
npm run test:apps-script
```

The build produces:

```text
dist/apps-script/Chrono.gs
dist/apps-script/Chrono.html
dist/apps-script/appsscript.json
```

`Chrono.gs` has no `import`, `export`, or `require` statements. Its public
API is the global `chrono` object (`chrono.parse`, `chrono.parseDate`).

`Chrono.html` is the same JavaScript wrapped in `<script>` tags for
HtmlService.

The Apps Script manifest uses V8 and `America/Los_Angeles` (PT).

## Use in the job desk (HtmlService)

Copy `Chrono.html` into the print shop job desk and include it from
HtmlService. Parse job-copy dates in Pacific Time:

```javascript
const results = chrono.parse("Need these by September 11.", {
  instant: new Date(),
  timezone: "PT",
});
```

Do **not** clasp-push this folder onto the live Print shop job desk project.
Copy `Chrono.html` into the desk instead.

See [GROKBOT.md](../GROKBOT.md) for branch intent and the same warnings.
