import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FavoritesList({ list }) {
  const [activeStep, setActiveStep] = useState(0);

  // Chunk the list into pages of `size` posters.
  const fixList = (arr, size = 4) => {
    if (arr.length <= size) return [arr];
    return [arr.slice(0, size)].concat(fixList(arr.slice(size), size));
  };

  const fixedList = fixList(list);
  const maxSteps = fixedList.length;

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, maxSteps - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {fixedList[activeStep].map((item) => (
          <div
            key={`${item.title}-${item.poster}`}
            className="lift overflow-hidden rounded-xl border border-white/8 bg-white/5"
          >
            <img
              src={item.poster}
              alt={item.title}
              title={item.title}
              loading="lazy"
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        ))}
      </div>

      {maxSteps > 1 && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-2 py-1.5">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg disabled:opacity-25 disabled:hover:text-fg-muted"
          >
            <ChevronLeft size={16} /> back
          </button>

          <div className="flex items-center gap-1.5">
            {fixedList.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  i === activeStep ? "bg-green" : "bg-white/25"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            className="flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg disabled:opacity-25 disabled:hover:text-fg-muted"
          >
            next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
