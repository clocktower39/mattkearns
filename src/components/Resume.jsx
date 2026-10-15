import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  UserRound,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "@/components/icons/Brand";
import { cn } from "@/lib/utils";
import img from "../img/avatar.jpg";

const THEME_OPTIONS = ["system", "light", "dark"];

const SKILLS = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "TanStack Query",
      "Zod",
      "Storybook",
      "Redux",
      "MUI",
    ],
  },
  {
    label: "Backend & Data",
    items: [
      "FastAPI",
      "Pydantic",
      "Temporal",
      "Node.js / Express",
      "PostgreSQL",
      "Convex",
      "Neo4j",
      "MongoDB",
      "OpenFGA",
      "REST APIs",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "Azure (AKS, ACR, Key Vault)",
      "Kubernetes",
      "Helm",
      "Flux GitOps",
      "Docker",
      "GitHub Actions",
      "Signed images (cosign)",
      "NGINX",
      "Cloudflare",
    ],
  },
  {
    label: "Observability",
    items: ["Prometheus", "Grafana", "Loki", "Tempo"],
  },
  {
    label: "Testing",
    items: ["Vitest", "Playwright (visual regression)", "pytest"],
  },
  {
    label: "AI & Agents",
    items: [
      "LLM agent workflows",
      "Human-in-the-loop approvals",
      "Generative image pipelines",
      "Vision-language models",
      "CLIP embeddings & vector search",
      "Gemini",
      "Replicate",
      "Hugging Face",
      "LiteLLM",
      "Claude Code",
      "OpenAI Codex",
      "AI code review in CI",
      "Agent evals",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Forward Deployed Engineer (Contract)",
    org: "Zeroth Technology · Pyrana",
    dates: "Jun 2026 – Present",
    blurb:
      "Pyrana is an enterprise agentic application platform where people and AI agents share the same pages, data, and audit record. Each client app is a versioned configuration on shared layers for orchestration, approval policies, durable workflows, and context, running in a dedicated private environment.",
    bullets: [
      "Build client-facing agentic apps end to end: Next.js pages and server-side API routes in TypeScript, agent and workflow configuration, and Python backend extensions that run as durable services next to the platform.",
      "Build review-and-approve experiences where agents propose work and people decide: review queues, action cards with evidence attached, and scheduled Temporal workflows that fan out to agents and publish results back into the app.",
      "Build data-heavy dashboards and reporting pages with Gantt timelines, risk ranking, period-over-period trend indicators, AI-written summaries, and print-ready layouts.",
      "Build integrations that write safely to external systems of record, with idempotent outbound actions, sync-state reconciliation, and a confirmation step before anything that could duplicate work.",
      "Build grounded LLM agents with guardrails that tie every answer to source data and keep restricted information out of external responses.",
      "Prototyped generative-AI and computer-vision features for client solutions: consistent image generation across design variations, vision-language models that read images and documents, embedding-based similarity search, and automated quality checks on model output.",
      "Contribute to shared platform packages used across client apps, including the app shell, navigation, per-client theming, and UI components, backed by component tests, Storybook, and Playwright visual-regression baselines.",
      "Run releases for client environments: cut versioned, signed release candidates, promote them from QA to production with GitOps on Kubernetes, check database migrations before rollout, and help diagnose production issues across the UI, workflow engine, and database.",
      "Improve team practices with AI tooling and security work: AI code review on every pull request, shared Claude Code skills with routing evals, synthetic test data in place of client data, secret redaction in agent error reports, and dependency cooldown windows in pnpm and uv.",
    ],
  },
  {
    role: "Full-Stack Web Developer",
    org: "Independent / Freelance",
    dates: "2018 – Present",
    bullets: [
      "Firebelly Fitness (2021 – present): built and run a live trainer/client coaching platform covering programming, workout logging with personal-record detection, training-load analytics, scheduling, and invoicing with a hard guard against double billing (React, Node.js, Express, MongoDB, Socket.IO).",
      "Dauntless Athletics (2024 – present): replaced a gym's WordPress site with React and TypeScript, and built a PostgreSQL-backed operations dashboard for rosters, attendance, seasons, signed waivers, household billing, and accounts receivable.",
      "Own each client's full lifecycle: requirements, design, JWT auth with role-based access, hosting on Oracle Cloud and AWS Lightsail behind NGINX and Cloudflare, and ongoing support.",
    ],
  },
  {
    role: "Operations Support Lead",
    org: "McKesson Specialty Health · Scottsdale, AZ",
    dates: "Dec 2017 – Aug 2024",
    bullets: [
      "Grew from contractor (Dec 2017, through a staffing agency) to direct hire as a REMS Service Representative (Jul 2018), then promoted to Operations Support Lead (Mar 2019).",
      "Automated recurring reports and manual operations workflows with scripts, SharePoint, and browser automation, replacing repetitive hand-done steps.",
      "Acted as the operations team's liaison to IT, diagnosing customer-facing issues and supporting production triage.",
      "Led team meetings and training, and rewrote SOPs and work instructions.",
      "Supervised and trained seasonal staff as Operations Supervisor (seasonal, Sep 2021 – Feb 2022), running QA checks and coaching on accuracy to meet service-level goals.",
      "Analyzed program data and built reports that informed performance improvements.",
    ],
  },
];

function SectionHeading({ icon: Icon, children, hideIcon }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 border-b border-[#263544]/15 pb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#263544] dark:border-white/10 dark:text-green">
      {!hideIcon && <Icon size={15} />}
      {children}
    </h2>
  );
}

function ContactItem({ icon: Icon, href, children }) {
  const content = (
    <>
      <Icon size={14} className="shrink-0 opacity-80" />
      {children}
    </>
  );
  const cls = "inline-flex items-center gap-1.5";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cn(cls, "hover:text-white")}>
      {content}
    </a>
  ) : (
    <span className={cls}>{content}</span>
  );
}

export default function Resume() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [hidePicture, setHidePicture] = useState(false);
  const [hideSectionIcons, setHideSectionIcons] = useState(false);
  const [pendingPrint, setPendingPrint] = useState(false);

  // Theme: "system" follows the OS, "light"/"dark" override it. Persisted.
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "system";
    return window.localStorage.getItem("resumeTheme") || "system";
  });
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("resumeTheme", theme);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, [theme]);

  const isDark = theme === "dark" || (theme === "system" && systemDark);

  // Close the options dialog before printing so it doesn't appear in the PDF.
  useEffect(() => {
    if (!optionsOpen && pendingPrint) {
      const timeoutId = window.setTimeout(() => {
        window.print();
        setPendingPrint(false);
      }, 150);
      return () => window.clearTimeout(timeoutId);
    }
  }, [optionsOpen, pendingPrint]);

  return (
    <div
      className={cn(
        "min-h-screen bg-[#e9eef2] py-0 font-body dark:bg-ink-950 sm:py-8 print:bg-white print:py-0",
        isDark && "dark"
      )}
    >
      <div className="resume-doc mx-auto max-w-4xl overflow-hidden bg-white text-[#111] shadow-xl [print-color-adjust:exact] [-webkit-print-color-adjust:exact] dark:border dark:border-white/10 dark:bg-ink-900 dark:text-fg sm:rounded-xl print:shadow-none">
        {/* header */}
        <header className="resume-header relative bg-[#263544] px-6 pb-6 pt-12 text-white dark:border-b dark:border-green/20 dark:bg-ink-800 sm:px-8 sm:pt-7 print:pt-6">
          <Link
            to="/"
            aria-label="Back to home"
            className="absolute left-3 top-3 inline-flex items-center justify-center rounded-lg border border-white/60 p-1.5 transition-colors hover:border-white hover:bg-white/10 print:hidden"
          >
            <ArrowLeft size={18} />
          </Link>

          <div
            className={cn(
              "flex flex-col items-center gap-5 sm:flex-row",
              hidePicture && "sm:justify-center"
            )}
          >
            {!hidePicture && (
              <img
                src={img}
                alt="Matt Kearns"
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-white/30 dark:ring-green/50 print:hidden"
              />
            )}
            <div className={cn("text-center", !hidePicture && "sm:text-left print:text-left")}>
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Matt Kearns
              </h1>
              <p className="text-lg text-white/90">
                Full-Stack Software Engineer · Agentic AI
              </p>
              <div
                className={cn(
                  "mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-white/75",
                  !hidePicture && "sm:justify-start print:justify-start"
                )}
              >
                <ContactItem icon={MapPin}>Gilbert, AZ · Remote / Hybrid / Onsite</ContactItem>
                <ContactItem icon={Mail} href="mailto:matt.kearns39@gmail.com">
                  matt.kearns39@gmail.com
                </ContactItem>
                <ContactItem icon={GithubGlyph} href="https://www.github.com/clocktower39">
                  github.com/clocktower39
                </ContactItem>
                <ContactItem
                  icon={LinkedinGlyph}
                  href="https://www.linkedin.com/in/matthew-kearns-6b8865117/"
                >
                  linkedin.com/in/matthew-kearns-6b8865117
                </ContactItem>
                <ContactItem icon={Globe} href="https://mattkearns.dev">
                  mattkearns.dev
                </ContactItem>
              </div>
            </div>
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={() => setOptionsOpen(true)}
              className="rounded-md border border-white/35 px-3 py-1.5 text-sm transition-colors hover:border-white hover:bg-white/10"
            >
              Options
            </button>
            <button
              type="button"
              aria-label="Print to PDF"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-lg border border-white/60 p-1.5 transition-colors hover:border-white hover:bg-white/10"
            >
              <Printer size={18} />
            </button>
          </div>
        </header>

        {/* body */}
        <div className="resume-body grid md:grid-cols-[15rem_1fr]">
          {/* sidebar */}
          <aside className="resume-side bg-[#F3F5F7] p-6 sm:px-8 md:px-6 print:px-8 print:pb-0 text-[#1D1D1D] dark:bg-ink-800 dark:text-fg">
            <h2 className="mb-3 border-b border-[#263544]/15 pb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#263544] dark:border-white/10 dark:text-green">
              Skills
            </h2>
            <div className="space-y-4 print:space-y-1">
              {SKILLS.map((group) => (
                <div key={group.label} className="resume-block print:flex print:gap-2">
                  <h3 className="mb-1 text-sm font-semibold text-[#111] dark:text-fg print:mb-0 print:w-32 print:shrink-0">
                    {group.label}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#444] dark:text-fg-muted">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* main */}
          <main className="resume-main space-y-7 bg-white p-6 text-[#111] dark:bg-ink-900 dark:text-fg sm:p-8">
            <section>
              <SectionHeading icon={UserRound} hideIcon={hideSectionIcons}>
                Summary
              </SectionHeading>
              <p className="text-sm leading-relaxed text-[#222] dark:text-fg-muted">
                Full-stack software engineer building production web applications since
                2018, now focused on enterprise agentic AI. At Zeroth Technology, works with
                clients and the platform team to build apps on Pyrana end to end: React, TypeScript, and
                Next.js interfaces, Python and Temporal backend workflows, and releases
                to Kubernetes. Years of building and running apps for small-business
                clients mean comfort owning a product alone, from requirements and
                design through hosting and support. Learned to code by hand years before
                AI tools and still enjoys the craft: readable code, sound data models,
                and careful debugging. Uses AI coding agents as one tool among many,
                not a replacement for engineering judgment.
              </p>
            </section>

            <section>
              <SectionHeading icon={Briefcase} hideIcon={hideSectionIcons}>
                Professional Experience
              </SectionHeading>
              <div className="space-y-6">
                {EXPERIENCE.map((job) => (
                  <div key={job.role + job.org} className="resume-block">
                    <div className="flex flex-col justify-between gap-x-4 sm:flex-row sm:items-baseline">
                      <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                        {job.role}
                      </h3>
                      <p className="shrink-0 text-sm tabular-nums text-[#555] dark:text-fg-faint">
                        {job.dates}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-[#263544] dark:text-green">
                      {job.org}
                    </p>
                    {job.blurb && (
                      <p className="mt-1.5 text-sm italic leading-relaxed text-[#555] dark:text-fg-faint">
                        {job.blurb}
                      </p>
                    )}
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#222] marker:text-[#263544]/60 dark:text-fg-muted dark:marker:text-green/60">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading icon={GraduationCap} hideIcon={hideSectionIcons}>
                Education
              </SectionHeading>
              <div className="resume-block text-sm text-[#222] dark:text-fg-muted">
                <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                  Self-Taught Software Engineer
                </h3>
                <p className="mt-1 leading-relaxed">
                  Self-directed study in web architecture, system design, and
                  infrastructure since 2018, applied through production work for real
                  clients.
                </p>
                <p className="mt-1.5 leading-relaxed">
                  <span className="font-medium text-[#111] dark:text-fg">
                    LinkedIn Learning:
                  </span>{" "}
                  115 courses completed (200+ hours), including the App Development
                  with the MERN Stack learning path (29 hours). Selected courses:
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 leading-relaxed marker:text-[#263544]/60 dark:marker:text-green/60">
                  <li>
                    <span className="font-medium text-[#111] dark:text-fg">
                      Architecture &amp; quality:
                    </span>{" "}
                    Software Architecture: From Developer to Architect · React: Design
                    Patterns · Node.js: Testing and Code Quality
                  </li>
                  <li>
                    <span className="font-medium text-[#111] dark:text-fg">
                      Security:
                    </span>{" "}
                    Node.js: Securing RESTful APIs · React: Securing Applications ·
                    Penetration Testing Essential Training
                  </li>
                  <li>
                    <span className="font-medium text-[#111] dark:text-fg">
                      Cloud &amp; DevOps:
                    </span>{" "}
                    AWS Essential Training for Developers · Learning Docker · DevOps
                    Foundations
                  </li>
                  <li>
                    <span className="font-medium text-[#111] dark:text-fg">
                      Languages:
                    </span>{" "}
                    Learning TypeScript · Learning Python · JavaScript: Async ·
                    JavaScript: Closures
                  </li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* options modal */}
      {optionsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden"
          onClick={() => setOptionsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-[#F6F8FA] p-5 text-[#111] shadow-2xl dark:bg-ink-800 dark:text-fg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-lg font-semibold">Resume Display Options</h2>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium">Theme</p>
              <div className="flex gap-2">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTheme(opt)}
                    className={cn(
                      "flex-1 rounded-md border px-3 py-1.5 text-sm capitalize transition-colors",
                      theme === opt
                        ? "border-[#263544] bg-[#263544] text-white dark:border-green dark:bg-green dark:text-[#06140a]"
                        : "border-black/15 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <label className="mb-3 flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={hidePicture}
                onChange={(e) => setHidePicture(e.target.checked)}
                className="h-4 w-4 accent-[#263544] dark:accent-green"
              />
              Hide profile picture (always left out of the PDF)
            </label>
            <label className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={hideSectionIcons}
                onChange={(e) => setHideSectionIcons(e.target.checked)}
                className="h-4 w-4 accent-[#263544] dark:accent-green"
              />
              Hide section header icons
            </label>
            <p className="mt-3 text-sm text-[#4B5563] dark:text-fg-faint">
              These settings affect the page view and the PDF if you print from here.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOptionsOpen(false)}
                className="rounded-md px-4 py-2 text-sm font-medium text-[#263544] hover:bg-black/5 dark:text-fg dark:hover:bg-white/5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setOptionsOpen(false);
                  setPendingPrint(true);
                }}
                className="rounded-md bg-[#263544] px-4 py-2 text-sm font-medium text-white hover:bg-[#31455a] dark:bg-green dark:text-[#06140a] dark:hover:bg-green-soft"
              >
                Print PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
