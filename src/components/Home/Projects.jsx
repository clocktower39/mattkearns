import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GithubGlyph } from "@/components/icons/Brand";
import { projects } from "../../states";

// Cycle accent colors across the grid so each card has its own identity.
const ACCENTS = [
  { bar: "bg-green", glow: "group-hover:shadow-glow" },
  { bar: "bg-grape", glow: "group-hover:shadow-glow-grape" },
  { bar: "bg-leaf", glow: "group-hover:shadow-glow-leaf" },
  { bar: "bg-cyan", glow: "group-hover:shadow-glow" },
];

function RepoLink({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="chip transition-colors hover:border-white/30 hover:text-fg"
    >
      <GithubGlyph size={12} />
      {children}
    </a>
  );
}

function ProjectCard({ project, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const hasLink = Boolean(project.link);

  const open = () => {
    if (hasLink) window.open(project.link, "_blank", "noopener");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
    >
      <div
        onClick={open}
        className={`glass-card lift group relative flex h-full flex-col overflow-hidden ${accent.glow} ${
          hasLink ? "cursor-pointer" : ""
        }`}
      >
        {/* accent edge */}
        <span
          className={`absolute inset-y-0 left-0 z-10 w-1 ${accent.bar} opacity-70 transition-all group-hover:w-1.5`}
          aria-hidden="true"
        />

        {/* media / placeholder */}
        <div className="relative h-40 overflow-hidden border-b border-white/10 bg-ink-800">
          {project.img ? (
            <img
              src={project.img}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid-bg flex h-full w-full items-center justify-center">
              <span className="font-mono text-3xl text-fg-faint">
                {project.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold">
            {project.name}
            {hasLink && (
              <ArrowUpRight
                size={17}
                className="text-fg-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            )}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
            {project.desc}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="chip border-green/40 bg-green/12 text-green transition-colors hover:bg-green/20"
              >
                <ExternalLink size={12} /> live
              </a>
            )}
            <RepoLink href={project.github?.client}>client</RepoLink>
            <RepoLink href={project.github?.server}>server</RepoLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      kicker="git log --oneline"
      title="Things I've Built"
      intro="Not a formal portfolio — just apps and experiments I made because they were useful, fun, or I couldn't stop thinking about them."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
