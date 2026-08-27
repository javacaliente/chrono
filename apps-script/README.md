# Google Apps Script build

This build packages Chrono's English locale as one Google Apps Script-compatible file. The source stays in TypeScript; `dist/apps-script/Chrono.gs` is generated and should not be edited by hand.

## Build and verify

```bash
npm install
npm run build:apps-script
npm run test:apps-script
```

The build produces:

```text
dist/apps-script/Chrono.gs
dist/apps-script/appsscript.json
```

`Chrono.gs` has no `import`, `export`, or `require` statements. Its public API is exposed through the global `ChronoNode` object.

## Use in Apps Script

Copy `Chrono.gs` into a V8 Apps Script project, then call it from another `.gs` file:

```javascript
function testChrono() {
  const reference = new Date();
  const date = ChronoNode.parseDate("next Friday at 4pm", reference, { forwardDate: true });

  Logger.log(date);
}
```

The included manifest uses UTC for deterministic behavior. Change `timeZone` in `apps-script/appsscript.json` before building if the Apps Script project should interpret local dates in another time zone.

## Deploy with clasp

After installing and authenticating `clasp`, create or clone an Apps Script project and configure its `rootDir` as `dist/apps-script`. Keep `.clasp.json` local because it contains the project-specific script ID.

```bash
npm run build:apps-script
clasp push
```

Only the English locale is bundled to keep the generated script small. Add other locale exports to `apps-script/entry.ts` if they are needed.
