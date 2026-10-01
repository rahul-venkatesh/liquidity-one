#!/usr/bin/env bash
# Post-forge packaging for L1 on macOS: forge has already produced the .app;
# this stamps the build manifest and ad-hoc signs the bundle so it launches on
# Apple Silicon. Replace the ad-hoc signature with a Developer ID signature and
# notarisation before distributing outside the team.
#
# Env (set by scripts/l1): L1_PRODUCT L1_APP L1_BUILD_JSON
set -euo pipefail
: "${L1_PRODUCT:?}" "${L1_APP:?}" "${L1_BUILD_JSON:?}"

[ -d "$L1_APP" ] || { echo "error: $L1_APP not found (forge package failed?)" >&2; exit 1; }

printf '%s\n' "$L1_BUILD_JSON" > "$L1_APP/Contents/Resources/l1-build.json"

# Forge leaves the bundle ad-hoc signed by electron-packager; re-sign after we
# added the manifest so the seal matches the contents.
codesign --force --deep --sign - "$L1_APP"
codesign --verify --verbose=1 "$L1_APP"
xattr -dr com.apple.quarantine "$L1_APP" 2>/dev/null || true
