/*
  Steam / gaming data — real stats from the public Steam profile
  (steamid 76561198099664952). Hours are real playtime, rounded.
  Poster art reuses the covers already in /public/img/posters/games.
*/

export const steamProfile = {
  username: "Nude Pineapple",
  url: "https://steamcommunity.com/id/NudePineapple/",
  friendCode: "139399224",
  status: "online", // "in-game" | "online" | "away" | "offline"
  level: 15,
  gamesOwned: 255,
  totalPlaytime: "6¼ months",
  tagline: "532 hours in Halo and the backlog still wins.",
  avatar: "/img/steam-avatar.jpg",
};

// Headline card — most hours on record.
export const mostPlayed = {
  title: "Halo: The Master Chief Collection",
  blurb:
    "532 hours of “just one more match.” Finish the fight, then start it again.",
  hours: "532 hrs",
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

// Recently played — title + on-record hours, links to the Steam app page.
export const recentlyPlayed = [
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
