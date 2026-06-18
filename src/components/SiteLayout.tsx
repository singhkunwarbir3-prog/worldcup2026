import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Trophy } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/players", label: "Players" },
  { to: "/teams", label: "Teams" },
  { to: "/predictions", label: "Predictions" },
  { to: "/fixtures", label: "Fixtures" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg gradient-gold text-primary-foreground">
              <Trophy className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide">WORLD CUP HUB</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold">2026</div>
            </div>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-secondary text-gold" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> LIVE
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${
                  active ? "bg-secondary text-gold" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-border/60 bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-gold" />
              <span className="font-semibold text-foreground">World Cup Hub 2026</span>
            </div>
            <p className="text-xs">Every Match. Every Stat. Every Prediction.</p>
            <p className="text-xs">© 2026 · Unofficial fan project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}