# Notes

Lasting rules, owner preferences and lessons (never task chatter), and how to test.

- The app's own notes are in `ot/NOTES.md`, `ot/DESIGN.md`, `ot/MODEL.md` and `ot/SCENARIOS.md`.
- Test: `node tools/check.mjs` (repo checks, Worker tests), `tools/test-ot.sh` (model tests, then the browser test
  against a local static server). In cloud sessions set `PLAYWRIGHT_PATH=/opt/node22/lib/node_modules/playwright/index.mjs`
  and `CHROMIUM_PATH=/opt/pw-browsers/chromium`; do not run `playwright install`.
- The browser test needs `tools/vendor/axe.min.js` (axe-core, accessibility checks); keep it.
- The Worker serves only `ot/` (`worker/routes.js`); markdown, tools and the Worker itself are never served
  (`.assetsignore`). Check a change locally with `npx wrangler@4 dev --local --port 8799` (kill it by PID).
- Service worker: none. If one is ever added, its VERSION must start with `ot-` (`tools/check.mjs` enforces it).
