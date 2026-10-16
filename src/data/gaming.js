/*
  Steam / gaming data — real stats from the public Steam profile
  (steamid 76561198099664952). Hours are real playtime, rounded.
  Poster art reuses the covers already in /public/img/posters/games.

  Live numbers come from src/data/steam-stats.json, refreshed by
  `yarn steam:stats` (scripts/fetch-steam-stats.mjs) and baked in at build.
  Every live value falls back to the hand-typed one below if the JSON is
  missing a field. favoriteGames is curated by hand and never touched.
*/

import steamStats from "./steam-stats.json";

const stat = (label) => steamStats.cornerStats?.find((c) => c.label === label);
// "534h" → 534
const hoursIn = (s) => (s ? Number(String(s).replace(/[^\d.]/g, "")) : null);

const MOST_PLAYED_TITLE = "Halo: The Master Chief Collection";
const mostPlayedStat = stat("Most played");
// Only trust the live hours while Halo is still the most played — the card's
// poster and copy are about Halo.
const haloHours =
  mostPlayedStat?.value === MOST_PLAYED_TITLE ? Math.round(hoursIn(mostPlayedStat.detail)) : 532;

export const steamProfile = {
  username: "Nude Pineapple",
  url: "https://steamcommunity.com/id/NudePineapple/",
  friendCode: "139399224",
  status: "online", // "in-game" | "online" | "away" | "offline"
  level: steamStats.profile?.level ?? 15,
  gamesOwned: steamStats.profile?.gamesOwned ?? 255,
  // "6.4 months in-game" → "6.4 months"
  totalPlaytime: stat("Lifetime playtime")?.detail?.replace(/ in-game$/, "") ?? "6¼ months",
  tagline: `${haloHours} hours in Halo and the backlog still wins.`,
  avatar: "/img/steam-avatar.jpg",
};

// Headline card — most hours on record.
export const mostPlayed = {
  title: MOST_PLAYED_TITLE,
  blurb: `${haloHours} hours of “just one more match.” Finish the fight, then start it again.`,
  hours: `${haloHours} hrs`,
  accent: "tangerine",
  poster: "/img/posters/games/haloMCC_600x900.jpg",
};

// Curated favorites. `hours` is real Steam playtime where it exists;
// `platform` covers games that don't live on Steam.
export const favoriteGames = [
  {
    title: "Fallout 4",
    blurb:
      "432 hours in the wasteland and the main quest is still “later.” Settlements need me.",
    hours: "400+ hrs",
    accent: "leaf",
    poster: "/img/posters/games/fallout4_600x900.jpg",
  },
  {
    title: "Forza Horizon 5",
    blurb: "Mexico's prettiest roads, driven backwards into a cactus.",
    hours: "200+ hrs",
    accent: "green",
    poster: "/img/posters/games/forza_horizon_5.png",
  },
  {
    title: "The Witcher 3: Wild Hunt",
    blurb: "Came for the main quest, stayed years for a card game.",
    hours: "175+ hrs",
    accent: "grape",
    poster: "/img/posters/games/witcher3.png",
  },
  {
    title: "ANIMAL WELL",
    blurb:
      "A tiny luminous metroidvania that lives rent-free in my head. No HUD, all vibes.",
    hours: "20+ hrs",
    accent: "cyan",
    poster: "/img/posters/games/animal_well_600x900.jpg",
  },
  {
    title: "Metroid Dread",
    blurb:
      "EMMI nightmares and the best metroidvania movement ever made. Samus supremacy.",
    platform: "Switch",
    accent: "grape",
    poster: "/img/posters/games/metroid_dread.png",
  },
  {
    title: "Super Smash Bros. Ultimate",
    blurb:
      "Couch-multiplayer chaos with every fighter under the sun. Just one more stock.",
    platform: "Switch",
    accent: "tangerine",
    poster: "/img/posters/games/super_smash_bros_ultimate.png",
  },
];

// Recently played — the whole live list, most recent first (VR tools and
// video players are already filtered out by the fetch script); the card
// scrolls. Falls back to the hand-typed list below.
const liveRecent = (steamStats.recentlyPlayed ?? []).map((g) => ({
  title: g.name,
  hours: `${Math.round(g.hoursOnRecord ?? 0).toLocaleString("en-US")}h`,
  url: g.url,
  icon: g.icon,
}));

const fallbackRecent = [
  {
    title: "MECCHA CHAMELEON",
    hours: "4h",
    url: "https://steamcommunity.com/app/4704690",
    icon: "/img/games/meccha-chameleon.jpg",
  },
  {
    title: "Sons Of The Forest",
    hours: "26h",
    url: "https://steamcommunity.com/app/1326470",
    icon: "/img/games/sons-of-the-forest.jpg",
  },
  {
    title: "HITMAN World of Assassination",
    hours: "13h",
    url: "https://steamcommunity.com/app/1659040",
    icon: "/img/games/hitman-woa.jpg",
  },
  {
    title: "Halo: The Master Chief Collection",
    hours: "532h",
    url: "https://steamcommunity.com/app/976730",
    icon: "/img/games/halo-mcc.jpg",
  },
  {
    title: "Batman: Arkham City",
    hours: "9h",
    url: "https://steamcommunity.com/app/200260",
    icon: "/img/games/batman-arkham-city.jpg",
  },
];

export const recentlyPlayed = liveRecent.length ? liveRecent : fallbackRecent;
