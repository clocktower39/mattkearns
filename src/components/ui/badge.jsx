import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/5 text-fg-muted",
        green: "border-green/40 bg-green/12 text-green",
        leaf: "border-leaf/40 bg-leaf/12 text-leaf",
        grape: "border-grape/40 bg-grape/12 text-grape-soft",
        tangerine: "border-tangerine/40 bg-tangerine/12 text-tangerine",
        cyan: "border-cyan/40 bg-cyan/12 text-cyan",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
