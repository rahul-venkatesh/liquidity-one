# L1 — goose with the Liquidity One branding layer

L1 is **upstream [goose](https://github.com/block/goose), unmodified, plus a thin
branding layer applied at build time**. Nothing in this repository is a fork:
`vendor/goose` is a disposable checkout of an upstream release tag, and every
L1-specific thing lives in four small places:

| Where | What |
|---|---|
| `brand.json` | Product name, URL scheme, bundle id, company, update repo, identity line |
| `overlay/` | Files copied over the upstream tree: icons, the Liquidity logo components, brand CSS/tokens, the catalogue branding script |
| `patches/required/` | Five small hook patches (load the English catalogue, run the brand step, merge brand tokens, import brand CSS, set the identity prompt). The build fails if one stops applying. |
| `patches/optional/` | Cosmetic patches (watermark, hub lockup, navigation treatment, alert colours). Skipped with a warning if upstream moves. |
| `scripts/lib/brand-substitute.js` | Declarative string substitutions (product name, `goose://` → `l1://`, updater repo). A required pattern that no longer matches fails the run. |

The backend (the `goose` binary) is **the exact binary inside the official Goose
desktop release** (Goose.zip) for the same tag, so L1 and Goose.app are
byte-identical under the hood.
The product identity ("You are L1, built on goose") is appended to the system
prompt at session start through goose's own ACP API, so no Rust is rebuilt.
`l1 engine source` builds the engine with cargo instead if you ever need to.

## Updating to a new goose release

```sh
./scripts/l1 update            # latest release: sync → apply → engine → build → verify → install
./scripts/l1 update v1.53.0    # a specific tag
./scripts/l1 status            # what is checked out, what upstream has, what is installed
```

`update` is idempotent. If upstream changed something the branding relies on,
the run stops at the exact rule or patch that no longer applies, naming it; fix
that one thing and re-run. Everything else is derived.

## Individual steps

```sh
./scripts/l1 sync [TAG]     # check out upstream at TAG (default: latest vX.Y.Z)
./scripts/l1 apply          # pristine reset, then overlay + substitutions + patches
./scripts/l1 engine         # official release binary (or: engine source)
./scripts/l1 build          # typecheck, then electron-forge package → out/L1-darwin-arm64/L1.app
./scripts/l1 verify         # name, bundle id, scheme, versions, signature, catalogue
./scripts/l1 install        # replace /Applications/L1.app (previous build backed up to cache/backups)
./scripts/l1 open
```

## Rules of the road

- Never edit `vendor/goose` by hand; `l1 apply` resets it. Put changes in
  `overlay/`, a patch, or a substitution rule.
- Keep patches small and about branding. Behaviour changes belong upstream.
- To refresh a patch after upstream moves: `l1 apply`, edit the file in
  `vendor/goose`, `git -C vendor/goose add -A` *before* editing is not needed if
  you only touch that file; then `git -C vendor/goose diff -- <file> > patches/.../NNNN-name.patch`.
  (The patch must be generated against the post-substitution state, which is
  what `l1 apply` leaves you with.)
- The build is ad-hoc signed. Add Developer ID signing and notarisation before
  distributing outside the team.
- Deep links use `l1://` so L1 and Goose.app can coexist on one machine; this
  also means goose's web "install extension" buttons (which emit `goose://`) do
  not target L1. Change `scheme` in `brand.json` if that trade-off is wrong.

## Requirements

macOS, Xcode command line tools, git, curl, a system `node` (any recent version;
the build itself uses the node/pnpm pinned by upstream through hermit in
`vendor/goose/bin`). Building the engine from source additionally needs the
Rust toolchain, which hermit provides too.

## Releases and the in-app updater

L1's Settings → Update button reads GitHub releases from the repo named in
`brand.json` (`updates.owner/repo`). `l1 publish` zips the current build and
creates (or refreshes) a release tagged with the goose version, with the
`latest-mac.yml` electron-updater wants. `.github/workflows/release.yml` runs
every six hours on GitHub's macOS runners and publishes a new release whenever
upstream goose has a newer tag, so nobody has to build locally for teammates to
get updates. The repo must stay public for the updater to read it without
credentials. Builds there are ad-hoc signed until Developer ID secrets are added.
