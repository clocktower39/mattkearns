import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { facts } from "@/data/facts";

/*
  Click for a random Matt fact. Cycles without repeating the same fact twice
  in a row, and animates each new fact in. (No Math.random — deterministic.)
*/
export function RandomFactButton() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const roll = () => {
    setIndex((prev) => {
      if (facts.length < 2) return prev;
      let next = (prev + 1 + ((prev * 7 + 3) % (facts.length - 1))) % facts.length;
      if (next === prev) next = (prev + 1) % facts.length;
      return next;
    });
    setRevealed(true);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Button variant="grape" size="lg" onClick={roll} className="group">
        <Dices className="transition-transform group-hover:rotate-180" />
        Random Matt fact
        <Sparkles className="opacity-70" />
      </Button>

      <div className="min-h-[3.5rem] w-full">
        <AnimatePresence mode="wait">
          {revealed && (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.28 }}
              className="max-w-xl font-mono text-sm leading-relaxed text-fg-muted"
            >
              <span className="text-grape-soft">{"// "}</span>
              {facts[index]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
