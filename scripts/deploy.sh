#!/usr/bin/env bash
# Build + deploy mattkearns.dev to production on this box.
#
# The site is a static Vite SPA -- there is no server component and no PM2
# process. Deploying is therefore just "build, then swap the files": nginx
# serves /var/www/mattkearns straight off disk.
#
# Repo and /var/www are the same machine, so this is a local rsync with no SSH
# or sudo (/var/www/mattkearns is owned by your user).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DEST="/var/www/mattkearns"

echo "▶ Deploying mattkearns.dev  →  $DEST"
echo "  source: $REPO_ROOT"

cd "$REPO_ROOT"

# Pull from GitHub and refresh the Steam numbers before anything is built.
"$SCRIPT_DIR/sync-before-build.sh"

echo "• Installing deps (yarn, frozen lockfile)…"
yarn install --frozen-lockfile

echo "• Building (tsc -b && vite build)…"
yarn build

[[ -f dist/index.html ]] || { echo "✗ build produced no dist/index.html" >&2; exit 1; }

# --delete is safe here precisely because DEST holds nothing but build output:
# no uploads, no runtime state, no .env. Anything in DEST that is not in dist/
# is a leftover from an older build and should go.
echo "• Syncing dist/ → $DEST"
rsync -a --delete dist/ "$DEST/"

# Record the deployed commit so the admin panel can compare live against repo.
# /var/www carries no .git, so without this production has no version info.
deploy-stamp "$REPO_ROOT" "$DEST" || true

echo "• Smoke test (through nginx, via loopback)…"
code="$(curl -s -o /dev/null -w '%{http_code}' --resolve mattkearns.dev:443:127.0.0.1 https://mattkearns.dev/ || echo 000)"
if [[ $code == 200 ]]; then
  echo "✓ mattkearns.dev deployed (http=$code)."
else
  echo "✗ deployed, but smoke test returned $code — check nginx." >&2
  exit 1
fi
