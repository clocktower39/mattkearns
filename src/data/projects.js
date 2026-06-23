/*
  Project cards — highlights, not a formal portfolio.
  Each card has: what it is + why it's cool.
  `status`: "live" | "building" | "experiment" | "ongoing"
  `logo` (optional) renders a real brand mark; otherwise `emoji` is shown.
*/

export const projects = [
  {
    title: "Firebelly Fitness",
    logo: "/img/projects/logos/firebelly.png",
    emoji: "🔥",
    accent: "tangerine",
    status: "live",
    what: "A trainer/client fitness platform for tracking workouts, programs, and progress.",
    why: "Real users, real reps. A full-stack build where the gym and the codebase both get heavier over time.",
    tags: ["React", "Node", "MongoDB"],
    link: "https://app.firebellyfitness.com/",
  },
  {
    title: "Dauntless Athletics",
    logo: "/img/projects/logos/dauntless.png",
    emoji: "🤸",
    accent: "cyan",
    status: "live",
    what: "Web presence + admin tooling for a competitive cheer & tumbling gym.",
    why: "Coaching meets code — a WordPress site rebuilt in React/TS with a Postgres-backed admin dashboard.",
    tags: ["React", "TypeScript", "Postgres"],
    link: "https://www.dauntlessathletics.com/",
  },
  {
    title: "Lil Miss Soy Sauce",
    logo: "/img/projects/logos/lilmisssoysauce.svg",
    emoji: "🥢",
    accent: "grape",
    status: "live",
    what: "A personal brand & highlight site for a rising cheer and tumbling athlete.",
    why: "Built for the world I coach in — clean, fast, and full of personality bigger than the athlete is tall.",
    tags: ["React", "Vite", "web"],
    link: "https://lilmisssoysauce.com/",
  },
  {
    title: "The Homelab",
    emoji: "🖥️",
    accent: "leaf",
    status: "ongoing",
    what: "A rack of Docker, Linux, Home Assistant, media servers & self-hosted everything.",
    why: "My personal cloud I can `ssh` into and break at 2am. Privacy, control, and an excuse to buy more drives.",
    tags: ["Docker", "Linux", "self-hosted"],
    link: null,
  },
  {
    title: "Agent Workflows",
    emoji: "🤖",
    accent: "grape",
    status: "building",
    what: "Custom harnesses, worktrees & automations driving Claude Code / Codex.",
    why: "Teaching agents to do the repetitive parts — interns that never sleep and occasionally hallucinate.",
    tags: ["Claude Code", "Codex", "harnesses"],
    link: null,
  },
  {
    title: "Random Experiments",
    emoji: "🧪",
    accent: "green",
    status: "experiment",
    what: "Self-driving-car sims, real-time photo apps, a Raspberry Pi TV controller, and weekend 'what if I built X' projects.",
    why: "The graveyard and the garden of side projects. Some die, some ship, all teach something.",
    tags: ["tinkering", "side quests"],
    link: "https://github.com/clocktower39",
  },
];
