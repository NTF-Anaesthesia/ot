# ot

The OT simulator: induce, maintain and wake a synthetic patient with a general anaesthetic, watch a vitals monitor
respond to what you do, and (later) manage crisis scenarios. For anaesthesia residents and new MOs. Teaching only:
it never gives advice for a real patient, and every patient is synthetic.

Live at https://ot.anantf.com (unlisted). Part of the NTF anaesthesia apps (https://anantf.com).

- `ot/`: the app (static site, ES modules, no build step) with its design notes, model spec and tests.
- `worker/`, `wrangler.jsonc`: the Cloudflare Worker `ot` that serves `ot/` at ot.anantf.com (no preview links).
- `tools/`: `check.mjs` (repo checks and Worker tests), `test-ot.sh` (model and browser tests), `proofread.mjs`,
  `stamp-versions.mjs`, `shots.mjs`.

Checks: `node tools/check.mjs` and `tools/test-ot.sh`.
