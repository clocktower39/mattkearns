import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Code,
  UserRound,
  Briefcase,
  Building2,
  GraduationCap,
} from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "@/components/icons/Brand";
import { cn } from "@/lib/utils";
import img from "../img/avatar.jpg";

const THEME_OPTIONS = ["system", "light", "dark"];

const CORE_SKILLS = [
  {
    label: "Frontend",
    items: "React, TypeScript, Next.js, Vite, Redux, Tailwind CSS, MUI, HTML, CSS",
  },
  {
    label: "Backend",
    items: "Node.js, Express, MongoDB, PostgreSQL, Mongoose, REST APIs, JWT, Socket.IO",
  },
  {
    label: "Infrastructure",
    items:
      "Docker, NGINX, Linux, AWS (Lightsail, S3, CloudFront), Cloudflare (DNS/SSL), Raspberry Pi",
  },
  {
    label: "Engineering",
    items:
      "Refactoring, performance optimization, debugging production issues, SEO/SSG/SSR, CI/CD, AI coding agents (Claude Code, Codex)",
  },
];

function SectionHeading({ icon: Icon, children, hideIcon }) {
  return (
    <h2 className="mb-1.5 flex items-center gap-2 text-2xl font-semibold text-[#111] dark:text-fg">
      {!hideIcon && (
        <Icon size={20} className="text-[#263544] dark:text-green" />
      )}
      {children}
    </h2>
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
      <div className="resume-doc mx-auto max-w-3xl overflow-hidden bg-white text-[#111] shadow-xl [print-color-adjust:exact] [-webkit-print-color-adjust:exact] dark:border dark:border-white/10 dark:bg-ink-900 dark:text-fg sm:rounded-xl print:shadow-none">
        {/* header */}
        <header className="resume-header relative bg-[#263544] px-6 py-5 text-white dark:border-b dark:border-green/20 dark:bg-ink-800">
          <Link
            to="/"
            aria-label="Back to home"
            className="absolute left-3 top-3 inline-flex items-center justify-center rounded-lg border border-white/60 p-1.5 transition-colors hover:border-white hover:bg-white/10 print:hidden"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            {!hidePicture && (
              <img
                src={img}
                alt="Matt Kearns"
                className="h-28 w-28 shrink-0 rounded-full object-cover dark:ring-2 dark:ring-green/50"
              />
            )}
            <div className={hidePicture ? "w-full text-center" : ""}>
              <h1 className="text-3xl font-bold leading-tight">Matt Kearns</h1>
              <p className="text-lg text-white/90">
                Senior Frontend / Full-Stack Engineer
              </p>
              <p className="mt-1 text-sm text-white/70">
                Gilbert, AZ • Open to Onsite / Hybrid / Remote
              </p>
              <p className="text-sm text-white/70">matt.kearns39@gmail.com</p>
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
        <div className="resume-body grid md:grid-cols-3">
          {/* sidebar */}
          <aside className="resume-side bg-[#F3F3F3] p-5 text-[#1D1D1D] dark:bg-ink-800 dark:text-fg md:col-span-1">
            <h2 className="mb-2 text-lg font-semibold">Core Skills</h2>
            <div className="space-y-3">
              {CORE_SKILLS.map((group) => (
                <div key={group.label}>
                  <h3 className="text-sm font-semibold dark:text-green">
                    {group.label}
                  </h3>
                  <p className="text-sm text-[#333] dark:text-fg-muted">
                    {group.items}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 print:hidden">
              <h2 className="mb-2 text-lg font-semibold">Social</h2>
              <div className="flex gap-2">
                <a
                  href="https://www.github.com/clocktower39"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[#263544] transition-colors hover:bg-black/5 dark:border-white/15 dark:text-green dark:hover:bg-white/5"
                >
                  <GithubGlyph size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/matthew-kearns-6b8865117/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[#263544] transition-colors hover:bg-black/5 dark:border-white/15 dark:text-green dark:hover:bg-white/5"
                >
                  <LinkedinGlyph size={18} />
                </a>
              </div>
            </div>
          </aside>

          {/* main */}
          <main className="resume-main space-y-6 bg-white p-5 text-[#111] dark:bg-ink-900 dark:text-fg md:col-span-2">
            <section>
              <SectionHeading icon={UserRound} hideIcon={hideSectionIcons}>
                Summary
              </SectionHeading>
              <p className="pl-6 text-sm leading-relaxed text-[#222] dark:text-fg-muted">
                Systems-focused software engineer building and refactoring production
                web applications since 2018. Strong in React/TypeScript frontends and
                full-stack JavaScript, with an emphasis on reliability, performance, and
                maintainability. Comfortable owning features end-to-end — from frontend
                architecture through backend APIs and infrastructure — and increasingly
                using AI coding agents to ship faster.
              </p>
            </section>

            <section>
              <SectionHeading icon={Code} hideIcon={hideSectionIcons}>
                Selected Projects
              </SectionHeading>
              <div className="space-y-4 pl-6 text-sm text-[#222] dark:text-fg-muted">
                <div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                    Firebelly Fitness (Trainer/Client Platform)
                  </h3>
                  <p className="text-[#555] dark:text-fg-faint">
                    React, Redux, shadcn/ui, Node.js, MongoDB, Socket.IO, JWT ·
                    Oracle Cloud VPS, Cloudflare
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      • Built a trainer/client platform with secure role-based access,
                      real-time updates, scheduling, and shared visibility across both
                      sides of the product.
                    </li>
                    <li>
                      • Added client dashboards, body metrics tracking, and group
                      workout workflows to support ongoing coaching and progress
                      tracking in one system.
                    </li>
                    <li>
                      • Implemented predictable state management to reduce
                      client/server desynchronization and keep real-time workout data
                      consistent.
                    </li>
                    <li>
                      • Deployed on an Oracle Cloud VPS behind Cloudflare (DNS, SSL,
                      CDN) and modernized the frontend with shadcn/ui components.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                    Dauntless Athletics (Site Migration + Infra)
                  </h3>
                  <p className="text-[#555] dark:text-fg-faint">
                    React, TypeScript, MUI, Postgres, AWS Lightsail, NGINX, Cloudflare
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      • Migrated a WordPress site to a custom React + TypeScript
                      frontend to improve maintainability and support custom
                      application workflows.
                    </li>
                    <li>
                      • Built an admin dashboard backed by Postgres to manage athletes,
                      schools, teams, employees, and surveys from a single internal
                      interface.
                    </li>
                    <li>
                      • Configured NGINX, SSL, and DNS routing for stable deployments
                      and stronger site performance.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                    Lil Miss Soy Sauce (Athlete Brand Site)
                  </h3>
                  <p className="text-[#555] dark:text-fg-faint">
                    React, Vite, responsive design
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      • Designed and built a fast, mobile-first personal brand and
                      highlight site for a competitive cheer &amp; tumbling athlete.
                    </li>
                    <li>
                      • Focused on clean performance, easy content updates, and a
                      playful identity that still loads quickly on any device.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading icon={Briefcase} hideIcon={hideSectionIcons}>
                Experience
              </SectionHeading>
              <div className="pl-6 text-sm text-[#222] dark:text-fg-muted">
                <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                  Senior Web Developer / Systems Engineer (Freelance / Independent)
                </h3>
                <p className="text-[#555] dark:text-fg-faint">2018 - Present</p>
                <ul className="mt-1 space-y-1.5 pl-3">
                  <li>
                    • Designed, built, and maintained production React and full-stack
                    applications for small businesses and real users.
                  </li>
                  <li>
                    • Owned end-to-end delivery: requirements → implementation →
                    deployment → monitoring and bug fixes.
                  </li>
                  <li>
                    • Built real-time workflows (messaging, presence, updates) using
                    Socket.IO with server-side authorization checks.
                  </li>
                  <li>
                    • Migrated WordPress sites to modern static/hybrid architectures
                    (Vite/SSG + CDN) to improve performance and SEO.
                  </li>
                  <li>
                    • Implemented authentication and role-based access control using
                    JWT and secure backend patterns.
                  </li>
                  <li>
                    • Diagnosed and resolved infrastructure issues involving NGINX,
                    SSL, DNS, and reverse proxies.
                  </li>
                  <li>
                    • Reduced recurring production issues via targeted refactors (state
                    ownership, data flow cleanup, and component reuse).
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <SectionHeading icon={Building2} hideIcon={hideSectionIcons}>
                Additional Experience
              </SectionHeading>
              <div className="space-y-3 pl-6 text-sm text-[#222] dark:text-fg-muted">
                <div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                    Operations Support Lead — McKesson Specialty Health (Scottsdale, AZ)
                  </h3>
                  <p className="text-[#555] dark:text-fg-faint">2019 - 2024</p>
                  <ul className="mt-1 space-y-1.5 pl-3">
                    <li>
                      • Automated reporting and operational workflows using SharePoint,
                      scripting, and browser automation/web scraping.
                    </li>
                    <li>
                      • Acted as operations liaison to IT to diagnose customer-facing
                      issues and support production triage.
                    </li>
                    <li>
                      • Led team meetings, training, and documentation improvements
                      (SOPs/work instructions).
                    </li>
                    <li>
                      • Performed data analysis and reporting to support program
                      performance improvements.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                    Seasonal Supervisor — McKesson Specialty Health (Scottsdale, AZ)
                  </h3>
                  <p className="text-[#555] dark:text-fg-faint">2021 - 2022</p>
                  <ul className="mt-1 space-y-1.5 pl-3">
                    <li>
                      • Supervised and trained team members; ran QA checks and coached
                      on accuracy and process improvements.
                    </li>
                    <li>
                      • Coordinated training sessions and improved team communication
                      to meet service-level goals.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading icon={GraduationCap} hideIcon={hideSectionIcons}>
                Education
              </SectionHeading>
              <div className="pl-6 text-sm text-[#222] dark:text-fg-muted">
                <h3 className="text-base font-semibold text-[#111] dark:text-fg">
                  Self-taught software engineer
                </h3>
                <ul className="mt-1 space-y-1 pl-3">
                  <li>
                    • Ongoing independent study in web architecture, system design, and
                    infrastructure.
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
              Hide profile picture
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
