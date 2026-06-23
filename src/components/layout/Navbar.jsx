import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { GithubGlyph } from "@/components/icons/Brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GITHUB = "https://github.com/clocktower39";

// In-page anchors (only meaningful on the home route).
const SECTIONS = [
  { href: "#projects", label: "Work" },
  { href: "#tech", label: "Tech" },
  { href: "#gaming", label: "Gaming" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // route links (always shown) + section links (home only)
  const routeLinks = [
    { to: "/about", label: "About" },
    { to: "/web_resume", label: "Résumé" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        {/* brand */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="font-mono text-green transition-transform group-hover:-translate-y-0.5">
            {"~/"}
          </span>
          <span>
            <span className="neon-green">Matt</span>
            <span className="text-fg"> Kearns</span>
          </span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {onHome &&
            SECTIONS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          {routeLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="neon" size="sm" className="ml-2">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              <GithubGlyph size={16} /> GitHub
            </a>
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-ink-900/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {onHome &&
              SECTIONS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            {routeLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="neon" size="sm" className="mt-2 w-full">
              <a href={GITHUB} target="_blank" rel="noreferrer">
                <GithubGlyph size={16} /> GitHub
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
