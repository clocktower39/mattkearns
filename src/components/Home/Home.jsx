import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown, FileText, Rocket } from "lucide-react";

import Logos from "./Logos";
import Projects from "./Projects";
import Gaming from "@/components/sections/Gaming";
import Hobbies from "@/components/sections/Hobbies";
import Obsessions from "@/components/sections/Obsessions";
import headshot from "../../img/avatar2.jpg";
import TerminalController from "../TerminalController";
import Footer from "../Footer";
import ParticleBackground from "../ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubGlyph } from "@/components/icons/Brand";

const GITHUB = "https://github.com/clocktower39";

function Hero() {
  return (
    <section
      id="top"
      className="grid-bg relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* soft floating glow blobs layered over the particle field */}
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-grape/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-green/12 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <Badge variant="leaf">
              <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-leaf" />
              available for work
            </Badge>
            <Badge variant="green">full-stack developer</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
          >
            <span className="text-gradient">Matt</span>{" "}
            <span className="neon-green">Kearns</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-fg-muted"
          >
            I build, break, and rebuild things — web apps, automation, and
            self-hosted systems. I care about{" "}
            <span className="font-semibold text-fg">why something exists</span>{" "}
            and whether it actually does what it's supposed to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="neon" size="lg">
              <a href="#projects">
                <Rocket /> View work
              </a>
            </Button>
            <Button asChild variant="grape" size="lg">
              <a href={GITHUB} target="_blank" rel="noreferrer">
                <GithubGlyph size={16} /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/web_resume">
                <FileText /> Résumé
              </Link>
            </Button>
          </motion.div>

          <p className="mt-6 font-mono text-xs text-fg-faint">
            psst — there's a real shell below. try{" "}
            <span className="text-leaf">help</span>.
          </p>
        </div>

        {/* right: headshot in a glowing glass frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="animate-float-slow relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-green/20 blur-2xl"
            />
            <div className="glass-card relative overflow-hidden rounded-[2rem] p-2 shadow-glow">
              <img
                src={headshot}
                alt="Matt Kearns"
                className="h-64 w-64 rounded-[1.6rem] object-cover sm:h-80 sm:w-80"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <a
        href="#terminal"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-fg-faint transition-colors hover:text-fg sm:flex"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs">scroll</span>
        <ArrowDown size={16} className="animate-float" />
      </a>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <ParticleBackground>
        <Hero />
      </ParticleBackground>

      {/* interactive terminal */}
      <Section
        id="terminal"
        kicker="./matt --interactive"
        title="Poke Around in the Shell"
        intro="A real little shell over a virtual filesystem. Try help, ls, cd, cat — it's the fastest tour of who I am."
      >
        <TerminalController />
      </Section>

      <Projects />
      <Logos />
      <Obsessions />
      <Hobbies />
      <Gaming />
      <Footer />
    </div>
  );
}
