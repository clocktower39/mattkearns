import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/*
  Reusable section wrapper: anchor id, a "// kicker" eyebrow, a big title,
  and a scroll-reveal for the heading block. Children render below.
*/
export function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className,
  titleAccent = "text-gradient",
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="mb-12 max-w-2xl"
      >
        {kicker && (
          <p className="mb-3 font-mono text-sm text-leaf">
            <span className="text-fg-faint">{"// "}</span>
            {kicker}
          </p>
        )}
        {title && (
          <h2 className={cn("text-3xl font-bold sm:text-4xl md:text-5xl", titleAccent)}>
            {title}
          </h2>
        )}
        {intro && (
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
            {intro}
          </p>
        )}
      </motion.div>

      {children}
    </section>
  );
}

/* Small helper to stagger-reveal a grid of items. */
export function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
