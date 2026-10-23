# Status

Times are SGT.

## Now

- Split out of the NTF anaesthesia site repo on 23 Oct 2026. Repo checks and the OT tests pass; the Worker is ready
  to deploy (cut-over moves ot.anantf.com to it).

## Waiting on the owner

- Connect Workers Builds for Worker `ot` to this repo, and clear the old redirect once ot.anantf.com is served from here.
- New scenarios (M4 onwards) stay paused until the owner says. App status and the build queue: `ot/STATUS.md`.

## Next

1. Cut-over: deploy the Worker, check https://ot.anantf.com/ against the old page.
2. Then `anantf.com/ot/` forwards here (stub pages in the site repo).

## Recently done

- 23 Oct 2026: app copied here from the site repo (no history), own Worker, checks and docs.

## Decisions (dated, one line each)

- 23 Oct 2026: `ot` gets its own repo and Worker (`ot`) at ot.anantf.com; the app's icons moved into `ot/icons/` so it serves from its own folder.
