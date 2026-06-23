import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional + Tailwind classes, de-duping conflicts. (shadcn convention) */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
