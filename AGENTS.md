# ot

Instructions for every AI assistant working here (Claude Code reads this through `CLAUDE.md`).
The OT simulator: a teaching simulator of an anaesthetic in the operating theatre for anaesthesia residents and new MOs,
live at https://ot.anantf.com. One static app in `ot/`, served by this repo's own Cloudflare Worker (`ot`). It was
split out of the NTF anaesthesia site repo on 23 Oct 2026; `anantf.com/ot/` forwards here. Dr Chew Shi Hao also works in this repo.

## Public here, private elsewhere

Anything merged here is public. Keep only code, docs, general rules and **made-up** sample data. Never commit
secrets, tokens, personal data, real names or patient details. Private notes belong in the owner's private notes
repo (`ot-private`, in the same organisation); never copy anything from there into this repo, a PR or an issue (neutral pointers like "ask the owner" are fine).

## Rules that bite

- All patients are synthetic; this is teaching software, never clinical advice. No real patient, case or hospital data.
- Read `ot/NOTES.md` (lasting decisions, how to test) and `ot/STATUS.md` before changing the app. The model in
  `ot/js/model/` is deterministic and pure (a test enforces it): the same seed and actions replay exactly.
- Relative paths only inside `ot/` (the app is served at the root of ot.anantf.com and at `/ot/`). Links to other
  NTF pages are absolute, e.g. https://anantf.com/bis/.
- New scenarios (M4 onwards) are paused until the owner says so.
- `tools/test-ot.sh` runs every model test and the browser test (axe accessibility check included).

## App defaults

- Installable web apps cancel the browser's automatic install prompt: add
  `<script>addEventListener('beforeinstallprompt', e => e.preventDefault());</script>` to the `<head>` of every page
  that links a manifest. Keep the manifest, icons and service worker: installable, never prompted. No install buttons.

## Checks before merging

```
node tools/check.mjs        # repo checks + Worker tests
node tools/proofread.mjs    # page and doc mistakes
```

## Working with the owner

- Instructions mostly come from a phone. Work through a request to the end; ask only when a decision is genuinely
  the owner's. When asked to plan, plan and wait.
- Keep each PR small and finished on its own. Start PR titles with the app: "<App>: …".
- Merge your own PRs once the checks pass, then report with the PR link (merge by the number the PR creation
  returned) and call `unsubscribe_pr_activity`: each PR event re-sends the whole context.
- Push once per finished step, not after every small commit (limited build minutes).
- Each app keeps `NOTES.md` (lasting decisions, how to test) and `STATUS.md` (now, waiting on the owner, next,
  dated decisions). Read them before starting; update them when a task finishes. Cheap end of session: `quick-save`.
- Plain words, short; explain technical terms briefly the first time.

## Token savers

- `.claude/settings.json` is only read when a session has exactly one repo attached. Sessions usually attach the
  owner's notes repo as well; then the environment's shared settings apply instead, so keep both in step.
- `.claude/settings.json` denies reading `__/` and `vendor/` folders. Add generated files and very large files to its
  `deny` list (edit their build scripts instead), and say so here. Ask the owner if one is really needed.
- Run only the touched app's tests while iterating and the full run once before merge. Screenshots only for visual
  changes (one, viewport-sized); debug logic with text.
