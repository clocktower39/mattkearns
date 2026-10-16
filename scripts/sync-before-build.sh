#!/usr/bin/env bash
# Bring the checkout up to date before a deploy builds it:
#
#   1. refuse to run on uncommitted changes to tracked files — a deploy should
#      ship what is on GitHub, not whatever happens to be lying in this tree
#   2. git pull --ff-only — stops rather than guessing if histories diverged
#   3. refresh src/data/steam-stats.json from the Steam Web API
#   4. if the stats really changed (not just the fetch timestamp), commit and
#      push them, so the tree stays clean and GitHub matches what is live
#
# Steps 3–4 never fail the deploy: if Steam is down the build uses the last
# committed numbers, and a failed push just leaves the commit local.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# The panel starts deploys with `runuser`, which can leave HOME pointing at
# root's — git and ssh need the deploying user's own config and keys.
export HOME="$(getent passwd "$(id -un)" | cut -d: -f6)"

STATS="src/data/steam-stats.json"

echo "• Checking the working tree…"
if ! git diff --quiet HEAD --; then
  echo "✗ Uncommitted changes to tracked files — commit or stash them first:" >&2
  git status --short --untracked-files=no >&2
  exit 1
fi

echo "• Pulling from GitHub (fast-forward only)…"
git pull --ff-only --quiet
echo "  now at $(git log -1 --format='%h %s')"

echo "• Refreshing Steam stats…"
if node scripts/fetch-steam-stats.mjs >/tmp/steam-stats-$$.log 2>&1; then
  sed -n '1,2p' /tmp/steam-stats-$$.log | sed 's/^/  /'
else
  echo "  ⚠ Steam fetch failed — building with the last committed stats:" >&2
  tail -3 /tmp/steam-stats-$$.log | sed 's/^/    /' >&2
  git checkout -- "$STATS" 2>/dev/null || true
fi
rm -f /tmp/steam-stats-$$.log

# Only the timestamp moved? Put the file back rather than commit noise.
if git diff --quiet -- "$STATS"; then
  echo "  stats unchanged"
elif node -e '
  const fs = require("fs"), { execSync } = require("child_process");
  const strip = (o) => { delete o.generatedAt; return JSON.stringify(o); };
  const now = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  const was = JSON.parse(execSync("git show HEAD:" + process.argv[1], { encoding: "utf8" }));
  process.exit(strip(now) === strip(was) ? 0 : 1);
' "$STATS"; then
  git checkout -- "$STATS"
  echo "  stats unchanged (only the fetch time moved)"
else
  git add "$STATS"
  git commit --quiet -m "Refresh Steam stats" -m "Automatic, from scripts/sync-before-build.sh at deploy time."
  echo "  committed $(git log -1 --format=%h)"
  if git push --quiet 2>/dev/null; then
    echo "  pushed to GitHub"
  else
    echo "  ⚠ push failed — the commit is local; push it by hand" >&2
  fi
fi
