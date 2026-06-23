import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

// status → badge variant (mattkearns palette)
const STATUS_VARIANT = {
  live: "leaf",
  building: "green",
  experiment: "grape",
  ongoing: "tangerine",
};

// accent → left edge bar
const ACCENT_BAR = {
  green: "bg-green",
  grape: "bg-grape",
  leaf: "bg-leaf",
  tangerine: "bg-tangerine",
  cyan: "bg-cyan",
};

function ProjectCard({ project, index }) {
  const bar = ACCENT_BAR[project.accent] ?? ACCENT_BAR.green;
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
    >
      <Wrapper
        {...wrapperProps}
        className="glass-card lift group relative block h-full overflow-hidden p-6"
      >
        {/* accent edge */}
        <span
          className={`absolute inset-y-0 left-0 w-1 ${bar} opacity-70 transition-all group-hover:w-1.5`}
          aria-hidden="true"
        />

        <div className="flex items-start justify-between gap-3">
          {project.logo ? (
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 p-1.5">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <span className="text-3xl">{project.emoji}</span>
          )}
          <Badge variant={STATUS_VARIANT[project.status] ?? "default"}>
            {project.status}
          </Badge>
        </div>

        <h3 className="mt-4 flex items-center gap-1.5 font-display text-xl font-semibold">
          {project.title}
          {project.link && (
            <ArrowUpRight
              size={18}
              className="text-fg-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </h3>

        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-leaf">
              what it is
            </dt>
            <dd className="mt-0.5 text-fg-muted">{project.what}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-grape-soft">
              why it's cool
            </dt>
            <dd className="mt-0.5 text-fg-muted">{project.why}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </Wrapper>
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
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
