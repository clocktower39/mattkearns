#!/usr/bin/env node
/*
  fetch-steam-stats.mjs — pulls a fresh batch of "corner stats" for the site
  and writes them to src/data/steam-stats.json.

  Two modes, picked automatically:
    • Web API  — when STEAM_API_KEY is set (in .env or the environment).
                 Rich: games owned, Steam level, total library playtime,
                 badge XP, real ban status, recent 2-week activity.
    • Public XML — fallback with no key. Limited: identity, account age,
                 standing, and the recent "most played" feed only.

  Usage:
    node scripts/fetch-steam-stats.mjs            # or: yarn steam:stats
    node scripts/fetch-steam-stats.mjs --dry      # print, don't write
    STEAM_VANITY=SomeName node scripts/...        # override the vanity URL

  The key lives in .env.local (gitignored via *.local). NOT .env — this repo
  commits .env, so a key there would be pushed. Get one at
  https://steamcommunity.com/dev/apikey.

  Ported from the nude-pineapple site; src/data/gaming.js maps this JSON onto
  the Gaming Cave (profile numbers, most-played hours, recently played) and
  leaves the curated favorites alone.

  Surface the result by importing src/data/steam-stats.json and mapping over
  `cornerStats` (each is { label, value, detail?, icon? }).
*/

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "src/data/steam-stats.json");

// Load .env.local (Node 24+ has this built in). Silent if the file is absent.
try {
  process.loadEnvFile(resolve(ROOT, ".env.local"));
} catch {
  /* no .env.local — fine, we may still have env vars or fall back to XML */
}

const KEY = process.env.STEAM_API_KEY?.trim() || null;
const VANITY = process.env.STEAM_VANITY || "NudePineapple";
const PROFILE_URL = `https://steamcommunity.com/id/${VANITY}/`;
const DRY = process.argv.includes("--dry");

// SteamID64 → friend code (account id) is a fixed offset.
const STEAMID64_BASE = 76561197960265728n;
// Known fallback so the XML path & vanity failures still work.
const KNOWN_STEAMID64 = "76561198099664952";

const UA = "mattkearns-stats/1.1 (+personal site build script)";

// Steam counts VR runtimes, launchers and media players as "played", but they
// aren't games — keep them off the public recently-played list. Matched on
// the store name; add to this when something new slips through.
const HIDE_FROM_RECENT = /^(SteamVR|StartVR|VRCVideoCacher)$|VR Video Player|DeoVR/i;
const friendCodeOf = (id) => (id ? String(BigInt(id) - STEAMID64_BASE) : null);
const minsToHours = (m) => Math.round((m / 60) * 10) / 10;

// Compact last-played label, mirroring Steam's library "Last Played" column:
// this year → "Jul 17", older → "Mar 2024".
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function lastPlayedLabel(unixSecs, nowYear) {
  if (!unixSecs) return null;
  const d = new Date(unixSecs * 1000);
  const mo = MONTHS[d.getUTCMonth()];
  return d.getUTCFullYear() === nowYear ? `${mo} ${d.getUTCDate()}` : `${mo} ${d.getUTCFullYear()}`;
}

// ── shared helpers ─────────────────────────────────────────────────────────
async function getJSON(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.replace(KEY ?? "\0", "***")}`);
  return res.json();
}

// ── Web API mode ─────────────────────────────────────────────────────────
const PERSONA_STATE = ["offline", "online", "busy", "away", "snooze", "trade", "play"];

async function viaWebApi() {
  const api = (iface, method, v, params) => {
    const q = new URLSearchParams({ key: KEY, ...params });
    return getJSON(`https://api.steampowered.com/${iface}/${method}/${v}/?${q}`);
  };

  // Resolve the vanity URL → steamID64 (fall back to the known id).
  let steamid = KNOWN_STEAMID64;
  try {
    const r = await api("ISteamUser", "ResolveVanityURL", "v1", { vanityurl: VANITY });
    if (r?.response?.success === 1 && r.response.steamid) steamid = r.response.steamid;
  } catch {
    /* keep the known id */
  }

  // Fire the independent lookups together.
  const [summary, owned, level, badges, recent, bans] = await Promise.all([
    api("ISteamUser", "GetPlayerSummaries", "v2", { steamids: steamid }),
    api("IPlayerService", "GetOwnedGames", "v1", {
      steamid,
      include_appinfo: 1,
      include_played_free_games: 1,
    }),
    api("IPlayerService", "GetSteamLevel", "v1", { steamid }),
    api("IPlayerService", "GetBadges", "v1", { steamid }),
    api("IPlayerService", "GetRecentlyPlayedGames", "v1", { steamid }),
    api("ISteamUser", "GetPlayerBans", "v1", { steamids: steamid }),
  ]);

  const player = summary?.response?.players?.[0] ?? {};
  const games = owned?.response?.games ?? [];
  const gameCount = owned?.response?.game_count ?? games.length ?? null;
  const playerLevel = level?.response?.player_level ?? null;
  const xp = badges?.response?.player_xp ?? null;

  // Total library playtime and the single most-played title.
  const totalMins = games.reduce((s, g) => s + (g.playtime_forever || 0), 0);
  const totalHours = minsToHours(totalMins);
  const topGame = [...games].sort(
    (a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0)
  )[0];

  // Recent (last 2 weeks) activity.
  const recentGames = recent?.response?.games ?? [];
  const recent2wkMins = recentGames.reduce((s, g) => s + (g.playtime_2weeks || 0), 0);

  // Use the akamai community_assets host: the older media.steampowered.com
  // path 404s for some titles (e.g. GROUND BRANCH); this one serves them all.
  const iconUrl = (appid, hash) =>
    hash
      ? `https://shared.akamai.steamstatic.com/community_assets/images/apps/${appid}/${hash}.jpg`
      : null;

  const ban = bans?.response?.players?.[0] ?? {};
  const clean = !ban.VACBanned && (ban.EconomyBan === "none" || ban.EconomyBan == null);

  const nowYear = new Date().getUTCFullYear();
  const created = player.timecreated ? new Date(player.timecreated * 1000) : null;
  const joinYear = created ? created.getUTCFullYear() : null;
  const yearsOnSteam = created
    ? Math.floor((Date.now() - created.getTime()) / (365.25 * 24 * 3600 * 1000))
    : null;

  const cornerStats = [
    gameCount != null && { label: "Games owned", value: gameCount, icon: "🎮" },
    playerLevel != null && {
      label: "Steam level",
      value: playerLevel,
      detail: xp != null ? `${xp.toLocaleString()} XP` : null,
      icon: "⭐",
    },
    totalHours > 0 && {
      label: "Lifetime playtime",
      value: `${Math.round(totalHours).toLocaleString()}h`,
      detail: `${(totalHours / 730).toFixed(1)} months in-game`,
      icon: "⏳",
    },
    topGame && {
      label: "Most played",
      value: topGame.name,
      detail: `${Math.round(minsToHours(topGame.playtime_forever)).toLocaleString()}h`,
      icon: "🏆",
    },
    joinYear && {
      label: "On Steam since",
      value: String(joinYear),
      detail: yearsOnSteam != null ? `${yearsOnSteam} years in` : null,
      icon: "📅",
    },
    recent2wkMins > 0 && {
      label: "Last 2 weeks",
      value: `${minsToHours(recent2wkMins)}h`,
      detail: `across ${recentGames.length} games`,
      icon: "⏱",
    },
    {
      label: "Account standing",
      value: clean ? "Clean" : "Flagged",
      detail: clean ? "No VAC / trade bans" : `VAC:${ban.NumberOfVACBans} econ:${ban.EconomyBan}`,
      icon: clean ? "✅" : "⚠️",
    },
  ].filter(Boolean);

  // "Recently played", mirroring the Steam library's Last-Played sort.
  // Owned games carry a real rtime_last_played. Family-shared games only surface
  // via the 2-week feed and have NO timestamp, so we tag them and float them to
  // the top (they were, by definition, played within the last two weeks).
  const ownedIds = new Set(games.map((g) => g.appid));
  const nowSecs = Math.floor(Date.now() / 1000);

  const ownedPlayed = games
    .filter((g) => g.rtime_last_played)
    .map((g) => ({ g, sortKey: g.rtime_last_played, shared: false }));

  const sharedPlayed = recentGames
    .filter((g) => !ownedIds.has(g.appid))
    .sort((a, b) => (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0))
    .map((g) => ({ g, sortKey: nowSecs, shared: true }));

  const recentlyPlayed = [...sharedPlayed, ...ownedPlayed]
    .filter(({ g }) => !HIDE_FROM_RECENT.test(g.name ?? ""))
    // Every played game — the site's list scrolls, so there is no reason to cut.
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ g, shared }) => ({
      name: g.name,
      url: `https://steamcommunity.com/app/${g.appid}`,
      icon: iconUrl(g.appid, g.img_icon_url),
      hoursOnRecord: minsToHours(g.playtime_forever || 0),
      lastPlayed: g.rtime_last_played
        ? new Date(g.rtime_last_played * 1000).toISOString().slice(0, 10)
        : null,
      lastPlayedLabel: g.rtime_last_played
        ? lastPlayedLabel(g.rtime_last_played, nowYear)
        : "recent",
      shared,
    }));

  return {
    source: "Steam Web API (api.steampowered.com)",
    profile: {
      steamID64: steamid,
      username: player.personaname ?? null,
      realName: player.realname ?? null,
      customURL: VANITY,
      profileUrl: player.profileurl ?? PROFILE_URL,
      friendCode: friendCodeOf(steamid),
      avatar: player.avatarfull ?? null,
      onlineState: PERSONA_STATE[player.personastate] ?? "offline",
      currentGame: player.gameextrainfo ?? null,
      memberSince: created ? created.toISOString().slice(0, 10) : null,
      yearsOnSteam,
      level: playerLevel,
      gamesOwned: gameCount,
    },
    cornerStats,
    recentlyPlayed,
  };
}

// ── Public XML mode (no key) ─────────────────────────────────────────────
const stripCdata = (s) =>
  s == null ? null : s.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "").trim();

function xtag(xml, name) {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "i"));
  return m ? stripCdata(m[1]) : null;
}
function xblocks(xml, name) {
  const re = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}
const numOrNull = (v) => (v == null || v === "" ? null : Number(v));

async function viaXml() {
  const url = `${PROFILE_URL}?xml=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`Steam returned HTTP ${res.status} for ${url}`);
  const xml = await res.text();
  if (!xml.includes("<profile>"))
    throw new Error("Response wasn't profile XML (profile private or Steam served a login page).");

  const steamID64 = xtag(xml, "steamID64");
  const memberSince = xtag(xml, "memberSince");
  const joinYear = memberSince?.match(/\d{4}/)?.[0] ?? null;
  const joinDate = memberSince ? new Date(memberSince) : null;
  const yearsOnSteam =
    joinDate && !Number.isNaN(joinDate.valueOf())
      ? Math.floor((Date.now() - joinDate.getTime()) / (365.25 * 24 * 3600 * 1000))
      : null;

  const mostPlayed = xblocks(xml, "mostPlayedGame").map((b) => ({
    name: xtag(b, "gameName"),
    url: xtag(b, "gameLink"),
    icon: xtag(b, "gameIcon"),
    hours2wk: numOrNull(xtag(b, "hoursPlayed")),
    hoursOnRecord: numOrNull(xtag(b, "hoursOnRecord")),
  }));
  const recentHours = mostPlayed.reduce((s, g) => s + (g.hours2wk || 0), 0);
  const topGame = [...mostPlayed].sort((a, b) => (b.hoursOnRecord || 0) - (a.hoursOnRecord || 0))[0];
  const vacBanned = xtag(xml, "vacBanned") === "1";
  const tradeBan = xtag(xml, "tradeBanState") || "None";
  const clean = !vacBanned && tradeBan === "None";

  const cornerStats = [
    joinYear && {
      label: "On Steam since",
      value: joinYear,
      detail: yearsOnSteam != null ? `${yearsOnSteam} years in` : null,
      icon: "📅",
    },
    recentHours > 0 && {
      label: "Last 2 weeks",
      value: `${recentHours.toFixed(1)}h`,
      detail: `across ${mostPlayed.length} games`,
      icon: "⏱",
    },
    topGame && {
      label: "Most played (record)",
      value: topGame.name,
      detail: topGame.hoursOnRecord != null ? `${topGame.hoursOnRecord}h on record` : null,
      icon: "🏆",
    },
    {
      label: "Account standing",
      value: clean ? "Clean" : "Flagged",
      detail: clean ? "No VAC / trade bans" : `VAC:${vacBanned} trade:${tradeBan}`,
      icon: clean ? "✅" : "⚠️",
    },
    steamID64 && { label: "Friend code", value: friendCodeOf(steamID64), icon: "🤝" },
  ].filter(Boolean);

  return {
    source: `Public Steam community XML (${url})`,
    note: "No owned-games/level/lifetime playtime — that data needs a Steam Web API key.",
    profile: {
      steamID64,
      username: xtag(xml, "steamID"),
      realName: xtag(xml, "realname") || null,
      customURL: xtag(xml, "customURL"),
      profileUrl: PROFILE_URL,
      friendCode: friendCodeOf(steamID64),
      avatar: xtag(xml, "avatarFull"),
      onlineState: xtag(xml, "onlineState"),
      memberSince,
      yearsOnSteam,
    },
    cornerStats,
    // No key → no per-game last-played timestamps; the public XML only exposes
    // the recent "most played" feed, so that's the best we can order by.
    recentlyPlayed: mostPlayed,
  };
}

// ── main ─────────────────────────────────────────────────────────────────
async function main() {
  const mode = KEY ? "Web API" : "public XML (no key)";
  console.log(`→ Fetching Steam stats via ${mode} for /id/${VANITY}`);
  const result = KEY ? await viaWebApi() : await viaXml();

  const data = { generatedAt: new Date().toISOString(), ...result };

  if (DRY) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`✔ Wrote ${data.cornerStats.length} corner stats → ${OUT}`);
  for (const s of data.cornerStats) {
    console.log(`   ${s.icon ?? "·"} ${s.label}: ${s.value}${s.detail ? `  (${s.detail})` : ""}`);
  }
}

main().catch((err) => {
  console.error(`✘ ${err.message}`);
  process.exit(1);
});
