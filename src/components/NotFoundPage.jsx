import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="grid-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-leaf">
        <span className="text-fg-faint">{"$ "}</span>cd /that/page
      </p>
      <h1 className="mt-3 font-display text-7xl font-bold sm:text-9xl">
        <span className="neon-green">404</span>
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">
        No such file or directory. The page you're looking for doesn't exist —
        or it moved while you weren't looking.
      </p>
      <Button asChild variant="neon" size="lg" className="mt-8">
        <Link to="/">
          <Home size={16} /> Back home
        </Link>
      </Button>
    </div>
  );
}
