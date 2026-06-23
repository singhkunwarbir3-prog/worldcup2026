import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Bar } from "@/components/Bar";
import { GROUPS } from "@/lib/wc-data";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams & Groups — World Cup Hub 2026" },
      { name: "description", content: "All 12 groups, live standings and team stats for the FIFA World Cup 2026." },
      { property: "og:title", content: "Teams & Groups — World Cup Hub 2026" },
      { property: "og:description", content: "All groups, standings and team stats." },
    ],
  }),
  component: TeamsPage,
});

const TEAM_DEEPDIVE = [
  { name: "Spain", flag: "🇪🇸", scored: 4, conceded: 0, possession: 64, sheets: 1, xg: 4.8 },
  { name: "France", flag: "🇫🇷", scored: 3, conceded: 1, possession: 58, sheets: 0, xg: 3.9 },
  { name: "Argentina", flag: "🇦🇷", scored: 3, conceded: 0, possession: 56, sheets: 1, xg: 3.2 },
  { name: "Brazil", flag: "🇧🇷", scored: 4, conceded: 1, possession: 62, sheets: 1, xg: 4.4 },
];

function TeamsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs uppercase tracking-widest text-gold">Team Stats</div>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">Groups & <span className="text-gradient-gold">Standings</span></h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Live tables for every group of the FIFA World Cup 2026.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Group</div>
                <span className="grid h-9 w-9 place-items-center rounded-lg gradient-gold text-sm font-black text-primary-foreground">{g.name}</span>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_repeat(4,minmax(0,auto))] items-center gap-x-3 gap-y-2 text-xs">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Team</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">P</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">GD</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PTS</span>
                <span className="hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:inline">W-D-L</span>
                {g.teams.map((t, i) => (
                  <Row key={t.name + i} t={t} qualified={i < 2} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-black md:text-3xl">Featured Team Deep-Dive</h2>
          <p className="mt-1 text-sm text-muted-foreground">Expected goals, possession and clean sheets for the favorites.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TEAM_DEEPDIVE.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.flag}</span>
                  <div className="text-lg font-bold">{t.name}</div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <StatRow label="Goals scored" value={t.scored} />
                  <StatRow label="Goals conceded" value={t.conceded} />
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground"><span>Possession</span><span className="font-bold text-foreground">{t.possession}%</span></div>
                    <div className="mt-1.5"><Bar value={t.possession} /></div>
                  </div>
                  <StatRow label="Clean sheets" value={t.sheets} />
                  <StatRow label="xG (Expected Goals)" value={t.xg.toFixed(1)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatRow({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex justify-between border-b border-border/60 pb-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold tabular-nums">{value}</span>
    </div>
  );
}

function Row({ t, qualified }: { t: { flag: string; name: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }; qualified: boolean }) {
  return (
    <>
      <div className="flex items-center gap-2 truncate">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${qualified ? "bg-gold" : "bg-muted-foreground/40"}`} />
        <span className="text-base">{t.flag}</span>
        <span className="truncate text-sm font-semibold">{t.name}</span>
      </div>
      <span className="text-center font-medium tabular-nums">{t.p}</span>
      <span className={`text-center font-medium tabular-nums ${t.gf - t.ga > 0 ? "text-gold" : t.gf - t.ga < 0 ? "text-destructive" : ""}`}>{t.gf - t.ga > 0 ? "+" : ""}{t.gf - t.ga}</span>
      <span className="text-center font-bold tabular-nums text-gold">{t.pts}</span>
      <span className="hidden text-center text-muted-foreground tabular-nums sm:inline">{t.w}-{t.d}-{t.l}</span>
    </>
  );
}