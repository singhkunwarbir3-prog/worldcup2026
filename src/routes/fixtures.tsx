import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MATCHES, RESULTS } from "@/lib/wc-data";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures & Results — World Cup Hub 2026" },
      { name: "description", content: "Live scores, group stage fixtures and the knockout bracket for the FIFA World Cup 2026." },
      { property: "og:title", content: "Fixtures & Results — World Cup Hub 2026" },
      { property: "og:description", content: "Every fixture, every result, every round." },
    ],
  }),
  component: FixturesPage,
});

const BRACKET = [
  { round: "Round of 16", games: ["Spain vs Senegal", "France vs Denmark", "Brazil vs Belgium", "Argentina vs Italy", "England vs Mexico", "Portugal vs Canada", "Germany vs Netherlands", "USA vs Colombia"] },
  { round: "Quarterfinals", games: ["TBD vs TBD", "TBD vs TBD", "TBD vs TBD", "TBD vs TBD"] },
  { round: "Semifinals", games: ["TBD vs TBD", "TBD vs TBD"] },
  { round: "Final", games: ["TBD vs TBD"] },
];

function FixturesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs uppercase tracking-widest text-gold">Fixtures & Results</div>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">The Road to the <span className="text-gradient-gold">Final</span></h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black"><Calendar className="h-5 w-5 text-gold" /> Upcoming Fixtures</h2>
            <div className="mt-4 space-y-3">
              {MATCHES.map((m) => (
                <div key={m.home + m.away} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="rounded bg-secondary px-2 py-0.5 text-foreground">{m.stage}</span>
                    <span>{m.date} · {m.time}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="flex items-center justify-end gap-2 text-sm font-bold">{m.home}<span className="text-2xl">{m.hf}</span></div>
                    <span className="text-xs text-muted-foreground">VS</span>
                    <div className="flex items-center gap-2 text-sm font-bold"><span className="text-2xl">{m.af}</span>{m.away}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-black"><CheckCircle2 className="h-5 w-5 text-gold" /> Latest Results</h2>
            <div className="mt-4 space-y-3">
              {RESULTS.map((r) => (
                <div key={r.home + r.away} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="rounded bg-secondary px-2 py-0.5 text-foreground">{r.stage}</span>
                    <span className="font-bold text-gold">FT</span>
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="flex items-center justify-end gap-2 text-sm font-bold">{r.home}<span className="text-2xl">{r.hf}</span></div>
                    <span className="rounded-md bg-secondary px-3 py-1 text-base font-black tabular-nums">{r.hs} – {r.as}</span>
                    <div className="flex items-center gap-2 text-sm font-bold"><span className="text-2xl">{r.af}</span>{r.away}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-black md:text-3xl">Knockout Bracket</h2>
          <p className="mt-1 text-sm text-muted-foreground">Projected path to the final based on group leaders.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BRACKET.map((col) => (
              <div key={col.round}>
                <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gold">{col.round}</div>
                <div className="space-y-2">
                  {col.games.map((g, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card px-3 py-3 text-xs font-semibold">
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}