import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  GithubGlyph,
  LinkedinGlyph,
  InstagramGlyph,
} from "@/components/icons/Brand";

const EMAIL = "matt.kearns39@gmail.com";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/clocktower39",
    Icon: GithubGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matthew-kearns-6b8865117/",
    Icon: LinkedinGlyph,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kearns39/",
    Icon: InstagramGlyph,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-8 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass-card overflow-hidden p-8 sm:p-12"
      >
        <p className="mb-3 font-mono text-sm text-leaf">
          <span className="text-fg-faint">{"$ "}</span>echo "let's build something"
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Got a problem worth <span className="neon-green">solving</span>?
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
          Open to interesting work, collaborations, and the occasional rabbit hole.
          The fastest way to reach me is email.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild variant="neon" size="lg">
            <a href={`mailto:${EMAIL}`}>
              <Mail /> Say hi
            </a>
          </Button>
          {SOCIALS.map(({ label, href, Icon }) => (
            <Button key={label} asChild variant="outline" size="icon" aria-label={label}>
              <a href={href} target="_blank" rel="noreferrer">
                <Icon size={18} />
              </a>
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 font-mono text-xs text-fg-faint sm:flex-row">
        <span>© {year} mattkearns.dev</span>
        <span>built with react + vite, a little too much coffee</span>
      </div>
    </footer>
  );
}
