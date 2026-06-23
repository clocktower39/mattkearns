import { motion } from "motion/react";
import { ExternalLink, Gamepad2, Trophy } from "lucide-react";
import { Section, Reveal } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SteamGlyph } from "@/components/icons/Brand";
import {
  steamProfile,
  mostPlayed,
  favoriteGames,
  recentlyPlayed,
} from "@/data/gaming";

// Accent → top-wash gradient + glow on hover.
const ACCENT = {
  green: { wash: "from-green/25", glow: "hover:shadow-glow" },
  grape: { wash: "from-grape/25", glow: "hover:shadow-glow-grape" },
  leaf: { wash: "from-leaf/25", glow: "hover:shadow-glow-leaf" },
  tangerine: { wash: "from-tangerine/25", glow: "hover:shadow-glow" },
  cyan: { wash: "from-cyan/25", glow: "hover:shadow-glow" },
};

function GameCard({ game, big = false }) {
  const accent = ACCENT[game.accent] ?? ACCENT.green;
  return (
    <div
      className={`glass-card lift group flex h-full overflow-hidden ${accent.glow}`}
    >
      {/* poster rail */}
      <div className={`relative shrink-0 ${big ? "w-28 sm:w-32" : "w-20"}`}>
        {game.poster ? (
          <img
            src={game.poster}
            alt={game.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-ink-800">
            <Gamepad2 className="text-fg-faint" size={big ? 28 : 22} />
          </div>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accent.wash} to-transparent opacity-70`}
          aria-hidden="true"
        />
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-4">
        <h4
          className={`font-display font-semibold leading-tight ${
            big ? "text-xl" : "text-base"
          }`}
        >
          {game.title}
        </h4>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-fg-muted">
          {game.blurb}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {game.hours && <span className="chip">⏱ {game.hours}</span>}
          {game.platform && <span className="chip">🎮 {game.platform}</span>}
        </div>
      </div>
    </div>
  );
}

export default function Gaming() {
  return (
    <Section
      id="gaming"
      kicker="press start"
      title="The Gaming Cave"
      intro="The off-hours half of the brain — part Steam profile, part launcher dashboard. The backlog is enormous and I regret nothing."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Steam profile card — launcher-style hero */}
        <Reveal>
          <div className="terminal-card relative h-full overflow-hidden border-green/25 p-0">
            {/* banner */}
            <div className="relative h-28 bg-gradient-to-br from-grape/40 via-ink-700 to-green/30">
              <div className="grid-bg absolute inset-0 opacity-40" />
            </div>

            <div className="px-5 pb-5">
              {/* identity */}
              <div className="relative z-10 -mt-10 mb-3 flex items-end justify-between gap-3">
                <div className="flex items-end gap-3">
                  {steamProfile.avatar ? (
                    <img
                      src={steamProfile.avatar}
                      alt={`${steamProfile.username} Steam avatar`}
                      loading="lazy"
                      className="h-20 w-20 rounded-xl border-2 border-green/60 bg-ink-900 object-cover shadow-glow"
                    />
                  ) : (
                    <div className="grid h-20 w-20 place-items-center rounded-xl border-2 border-green/60 bg-ink-900 shadow-glow">
                      <SteamGlyph size={34} className="text-green" />
                    </div>
                  )}
                  <div className="pb-1">
                    <p className="font-display text-lg font-semibold leading-tight">
                      {steamProfile.username}
                    </p>
                    <p className="font-mono text-xs text-fg-faint">
                      friend code: {steamProfile.friendCode}
                    </p>
                  </div>
                </div>
                <span className="chip border-leaf/40 bg-leaf/12 text-leaf">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-leaf" />
                  {steamProfile.status}
                </span>
              </div>

              <p className="mb-4 font-mono text-sm text-leaf">
                <span className="text-fg-faint">{"> "}</span>
                {steamProfile.tagline}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                <Badge variant="grape">
                  <Trophy size={12} /> Level {steamProfile.level}
                </Badge>
                <Badge variant="green">{steamProfile.gamesOwned} games</Badge>
                <Badge variant="leaf">{steamProfile.totalPlaytime} played</Badge>
              </div>

              <Button asChild variant="leaf" className="w-full">
                <a href={steamProfile.url} target="_blank" rel="noreferrer">
                  <SteamGlyph size={16} /> View full Steam profile
                  <ExternalLink size={14} />
                </a>
              </Button>

              {/* recently played */}
              <div className="mt-5">
                <p className="mb-2 font-mono text-xs text-fg-faint">
                  {"// recently played"}
                </p>
                <ul className="space-y-2">
                  {recentlyPlayed.map((g) => (
                    <li key={g.title}>
                      <a
                        href={g.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors hover:border-green/40 hover:bg-white/[0.06]"
                      >
                        {g.icon ? (
                          <img
                            src={g.icon}
                            alt=""
                            loading="lazy"
                            className="h-8 w-8 shrink-0 rounded-md object-cover ring-1 ring-white/10"
                          />
                        ) : (
                          <Gamepad2 size={16} className="shrink-0 text-fg-faint" />
                        )}
                        <span className="min-w-0 flex-1 truncate text-sm text-fg">
                          {g.title}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-fg-faint">
                          {g.hours}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* games grid */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.05}>
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10">
                <span className="chip border-tangerine/40 bg-tangerine/15 text-tangerine">
                  ★ most played
                </span>
              </div>
              <GameCard game={mostPlayed} big />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-2 font-mono text-xs text-fg-faint">
              {"// favorite games"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {favoriteGames.map((g) => (
                <motion.div
                  key={g.title}
                  className="h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <GameCard game={g} />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
