import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
  shadcn Button, restyled for the mattkearns.dev theme.
  Signature `neon` (green fill) plus `grape` / `leaf` accent outlines.
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] cursor-pointer",
  {
    variants: {
      variant: {
        neon: "bg-green text-[#06140a] shadow-glow hover:bg-green-soft hover:shadow-[0_10px_40px_-6px_rgba(115,217,13,0.55)]",
        grape:
          "bg-grape/15 text-grape-soft border border-grape/40 hover:bg-grape/25 hover:shadow-glow-grape",
        leaf: "bg-leaf/12 text-leaf border border-leaf/40 hover:bg-leaf/22 hover:shadow-glow-leaf",
        outline:
          "border border-white/15 bg-white/5 text-fg hover:bg-white/10 hover:border-white/25",
        ghost: "text-fg-muted hover:text-fg hover:bg-white/5",
        link: "text-green underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3.5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "neon", size: "default" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
