import { motion } from "motion/react";
import {
  Activity,
  Bot,
  Code2,
  Cpu,
  Dumbbell,
  Gamepad2,
  Globe,
  Server,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { hobbies } from "@/data/hobbies";

// Map icon names (from data) to components, so data stays plain.
const ICONS = { Activity, Bot, Code2, Cpu, Dumbbell, Gamepad2, Globe, Server };

// Accent → color classes for the icon chip + hover glow.
const ACCENT = {
  green: {
    chip: "bg-green/15 text-green",
    glow: "hover:shadow-glow hover:border-green/40",
  },
  grape: {
    chip: "bg-grape/15 text-grape-soft",
    glow: "hover:shadow-glow-grape hover:border-grape/40",
  },
  leaf: {
    chip: "bg-leaf/15 text-leaf",
    glow: "hover:shadow-glow-leaf hover:border-leaf/40",
  },
  tangerine: {
    chip: "bg-tangerine/15 text-tangerine",
    glow: "hover:border-tangerine/40 hover:shadow-[0_8px_30px_-8px_rgba(255,138,61,0.5)]",
  },
  cyan: {
    chip: "bg-cyan/15 text-cyan",
    glow: "hover:border-cyan/40 hover:shadow-[0_8px_30px_-8px_rgba(56,225,255,0.5)]",
  },
};

export default function Hobbies() {
  return (
    <Section
      id="hobbies"
      kicker="loadout"
      title="Stuff I'm Into"
      intro="A scattered, slightly chaotic skill tree. Some of it pays the bills, some of it just makes me happy."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby, i) => {
          const Icon = ICONS[hobby.icon] ?? Code2;
          const accent = ACCENT[hobby.accent] ?? ACCENT.green;
          return (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className={`glass-card lift group flex flex-col p-5 transition-colors ${accent.glow}`}
            >
              <div
                className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${accent.chip} transition-transform group-hover:-rotate-6 group-hover:scale-110`}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold">{hobby.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                {hobby.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {hobby.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
