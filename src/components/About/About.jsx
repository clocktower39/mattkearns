import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer";
import FavoritesList from "./FavoritesList";
import { Navbar } from "@/components/layout/Navbar";
import { books, movies, games, tvShows } from "../../states";

const CHIPS = ["Gilbert, AZ", "Identical Twin", "Coach", "Builder", "Always Learning"];

const OFF_THE_CLOCK = [
  "Coaching cheer and tumbling",
  "Lifting and staying active",
  "Gaming and media setups",
  "Hardware side projects",
];

const GRAVITATE = [
  "Systems that feel cohesive end to end",
  "Automation that removes repetitive work",
  "Tools that cross software and hardware",
  "Learning by building real things",
];

const FAVORITES = [
  { label: "Books", list: books },
  { label: "Movies", list: movies },
  { label: "Games", list: games },
  { label: "TV Shows", list: tvShows },
];

function SideCard({ title, items }) {
  return (
    <div className="glass-card h-full p-6">
      <h3 className="mb-3 font-display text-base font-semibold text-fg">{title}</h3>
      <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-fg-muted transition-colors hover:border-green/40 hover:text-fg"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        {/* hero panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass-card relative overflow-hidden p-8 sm:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-green/15 blur-3xl"
          />
          <p className="mb-3 font-mono text-sm text-leaf">
            <span className="text-fg-faint">{"// "}</span>beyond work
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Builder, coach, and{" "}
            <span className="neon-green">systems-minded</span> engineer.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            The same curiosity that pushed me into programming still shows up
            everywhere else: coaching, lifting, tinkering with hardware, and
            chasing ideas far enough to understand how they actually work.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((label) => (
              <span key={label} className="chip">
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* personal + technology */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="glass-card p-6 sm:p-8 lg:col-span-2">
            <h2 className="mb-4 font-display text-xl font-semibold text-green">
              Personal
            </h2>
            <p className="mb-4 leading-relaxed text-fg-muted">
              Grew up in a small town north of Chicago and later moved to Gilbert,
              Arizona, where I still live. I have an identical twin brother.
            </p>
            <p className="leading-relaxed text-fg-muted">
              I spend most of my time outside of work the same way I approach
              everything else: staying active, learning, and tinkering. That
              usually looks like coaching cheer and tumbling, lifting, gaming, or
              building things just because they seem interesting.
            </p>
          </div>
          <SideCard title="Off the clock" items={OFF_THE_CLOCK} />

          <div className="glass-card p-6 sm:p-8 lg:col-span-2">
            <h2 className="mb-4 font-display text-xl font-semibold text-green">
              Technology
            </h2>
            <div className="space-y-4 leading-relaxed text-fg-muted">
              <p>
                Interest in technology started early with modding video game saves
                using tools and a hex editor. That curiosity quickly turned into
                jailbreaking and rooting phones, which led to learning Unix and
                experimenting with different Linux distributions.
              </p>
              <p>
                Programming started with C++ in high school, but it did not really
                click until later. While working in call centers, repetitive tasks
                started to stand out as problems worth solving, which led to
                learning JavaScript and building small tools and browser extensions.
              </p>
              <p>
                From there, things expanded naturally. Web development became a way
                to build complete systems, not just interfaces, starting with PHP
                and later moving to Node.js to stay within a single language across
                the stack.
              </p>
              <p>
                That same curiosity extends beyond web development into Raspberry
                Pis, circuits, and building tools that interact with the physical
                world. Most of that is still done in Node.js, while I continue
                exploring Python and lower-level concepts over time.
              </p>
            </div>
          </div>
          <SideCard title="What I gravitate toward" items={GRAVITATE} />
        </div>

        {/* favorites */}
        <div className="mt-6 glass-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Favorite Books, Movies, and Games
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-fg-muted">
            A few things I keep coming back to. More personal than professional,
            but it gives a better read on the kind of worlds, systems, and stories
            I tend to like.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {FAVORITES.map(({ label, list }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/6 bg-ink-950/30 p-4"
              >
                <h3 className="mb-3 font-display text-base font-semibold text-green">
                  {label}
                </h3>
                <FavoritesList list={list} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
