import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { RandomFactButton } from "@/components/widgets/RandomFactButton";
import { obsessions } from "@/data/obsessions";

function ObsessionRow({ item, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-4"
    >
      <span className="text-2xl">{item.emoji}</span>
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-fg">{item.label}</span>
          <span className="font-mono text-xs text-fg-faint">{item.meter}%</span>
        </div>
        {/* obsession meter */}
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${item.meter}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 + index * 0.05, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-grape via-green to-tangerine"
          />
        </div>
      </div>
    </motion.li>
  );
}

export default function Obsessions() {
  return (
    <Section
      id="obsessions"
      kicker="cat ~/.current_obsessions"
      title="Currently Obsessed With"
      intro="The hyperfixation leaderboard. Updates whenever a new rabbit hole appears (so, weekly)."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-6 sm:p-8">
          <ul className="space-y-5">
            {obsessions.map((item, i) => (
              <ObsessionRow key={item.label} item={item} index={i} />
            ))}
          </ul>
        </div>

        {/* random fact widget */}
        <div className="glass-card flex flex-col gap-4 p-6 sm:p-8">
          <div>
            <p className="font-mono text-sm text-leaf">
              <span className="text-fg-faint">{"// "}</span>need a useless detail?
            </p>
            <p className="mt-1 text-sm text-fg-muted">
              Press the button. Each tap dispenses one (1) certified Matt fact.
            </p>
          </div>
          <RandomFactButton />
        </div>
      </div>
    </Section>
  );
}
