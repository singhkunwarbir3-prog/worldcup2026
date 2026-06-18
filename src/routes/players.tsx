import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Bar } from "@/components/Bar";
import { PLAYERS } from "@/lib/wc-data";
import { Trophy, Target, Zap, Shield, Award } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/players")({
  head: () => ({
    meta: [
      { title: "Player Stats — World Cup Hub 2026" },
      { name: "description", content: "Goals, assists, pass accuracy, minutes — full World Cup 2026 player stats and Golden Boot tracker." },
      { property: "og:title", content: "Player Stats — World Cup Hub 2026" },
      { property: "og:description", content: "Track every goal, assist and stat in real time." },
    ],
  }),
  component: PlayersPage,
});

const TABS = ["Top Scorers", "Top Assists", "Best Pass %"] as const;

function PlayersPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Top Scorers");
  const sorted = [...PLAYERS].sort((a, b) =>
    tab === "Top Scorers" ? b.goals - a.goals : tab === "Top Assists" ? b.assists - a.assists : b.pass - a.pass
  );
  const featured = PLAYERS.slice(0, 4);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs uppercase tracking-widest text-gold">Player Stats Center</div>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">Every Player. <span className="text-gradient-gold">Every Number.</span></h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Goals, assists, minutes, shots, pass accuracy and discipline — all in one place.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-5 transition hover:border-gold/40">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{p.flag}</span>
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">Featured</span>
              </div>
              <div className="mt-3 text-lg font-bold leading-tight">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.country}</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Stat icon={<Target className="h-3.5 w-3.5" />} label="Goals" value={p.goals} />
                <Stat icon={<Zap className="h-3.5 w-3.5" />} label="Assists" value={p.assists} />
                <Stat icon={<Trophy className="h-3.5 w-3.5" />} label="Matches" value={p.matches} />
                <Stat icon={<Shield className="h-3.5 w-3.5" />} label="Pass %" value={`${p.pass}%`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><Award className="h-4 w-4" /> Golden Boot Tracker</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${tab === t ? "gradient-gold text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{t}</button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="hidden grid-cols-[40px_2fr_1fr_repeat(5,minmax(0,1fr))] gap-2 border-b border-border bg-secondary/40 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground md:grid">
              <span>#</span><span>Player</span><span>Country</span>
              <span className="text-right">G</span><span className="text-right">A</span><span className="text-right">Mins</span><span className="text-right">Shots</span><span className="text-right">Pass %</span>
            </div>
            {sorted.map((p, i) => (
              <div key={p.name} className="grid grid-cols-2 items-center gap-2 border-b border-border/60 px-5 py-4 last:border-0 md:grid-cols-[40px_2fr_1fr_repeat(5,minmax(0,1fr))]">
                <span className="hidden text-sm font-bold text-muted-foreground md:block">{i + 1}</span>
                <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                  <span className="text-2xl">{p.flag}</span>
                  <div>
                    <div className="text-sm font-bold leading-tight">{p.name}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{p.country}</div>
                  </div>
                </div>
                <span className="hidden text-xs text-muted-foreground md:block">{p.country}</span>
                <Cell label="G" value={p.goals} highlight />
                <Cell label="A" value={p.assists} />
                <Cell label="Min" value={p.minutes} />
                <Cell label="Shots" value={p.shots} />
                <div className="text-right">
                  <div className="mb-1 text-xs text-muted-foreground md:hidden">Pass %</div>
                  <div className="flex items-center justify-end gap-2">
                    <div className="hidden w-20 md:block"><Bar value={p.pass} /></div>
                    <span className="text-sm font-bold tabular-nums">{p.pass}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-lg bg-secondary/50 p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">{icon}{label}</div>
      <div className="mt-0.5 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}

function Cell({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="text-right">
      <div className="mb-1 text-xs text-muted-foreground md:hidden">{label}</div>
      <span className={`text-sm font-bold tabular-nums ${highlight ? "text-gold" : ""}`}>{value}</span>
    </div>
  );
}