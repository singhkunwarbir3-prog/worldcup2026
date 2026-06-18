import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trophy, Flame, Newspaper, TrendingUp, ArrowRight, Radio, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Bar } from "@/components/Bar";
import { PREDICTIONS, PLAYERS, NEWS, ALL_MATCHES, getMatchStatus, getLiveMinute, getExpectedFinish, formatMatchDate, formatMatchTime } from "@/lib/wc-data";
import type { Match } from "@/lib/wc-data";
import heroImg from "@/assets/hero-trophy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Cup Hub 2026 — Stats, Predictions & Live Standings" },
      { name: "description", content: "Every Match. Every Stat. Every Prediction. AI-powered World Cup 2026 hub with player stats, team data, predictions, and group standings." },
      { property: "og:title", content: "World Cup Hub 2026" },
      { property: "og:description", content: "Every Match. Every Stat. Every Prediction." },
    ],
  }),
  component: Index,
});

function Countdown() {
  const target = new Date("2026-07-19T20:00:00Z").getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const items = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map((it) => (
        <div key={it.l} className="rounded-xl border border-gold/30 bg-background/50 px-2 py-3 text-center backdrop-blur card-glow sm:px-4 sm:py-4">
          <div className="text-2xl font-bold tabular-nums text-gradient-gold sm:text-4xl">{String(it.v).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">{it.l}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: { to: string; label: string } }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {cta && (
        <Link to={cta.to} className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Index() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(i);
  }, []);

  const top = PREDICTIONS[0];
  const scorers = [...PLAYERS].sort((a, b) => b.goals - a.goals).slice(0, 5);

  // Split matches
  const live: Match[] = [];
  const upcoming: Match[] = [];
  const finished: Match[] = [];
  for (const m of ALL_MATCHES) {
    const s = getMatchStatus(m);
    if (s === "live") live.push(m);
    else if (s === "upcoming") upcoming.push(m);
    else finished.push(m);
  }
  finished.reverse();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="World Cup trophy" width={1920} height={1080} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <Flame className="h-3 w-3" /> FIFA WORLD CUP · USA · CANADA · MEXICO
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Every Match.<br />Every Stat. <span className="text-gradient-gold">Every Prediction.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Live standings, player stats, AI-powered win percentages, and the road to the final — all in one place.
          </p>
          <div className="mt-8 max-w-md">
            <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">Countdown to the Final</div>
            <Countdown />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/predictions" className="inline-flex items-center gap-2 rounded-lg gradient-gold px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110">
              See Predictions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/teams" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-gold/40">
              View Groups
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE MATCH CENTER ── */}
      {live.length > 0 && (
        <section className="mx-auto -mt-8 max-w-7xl px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <h2 className="text-xl font-black">Live Match Center</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {live.map((m) => <HomeLiveCard key={m.id} m={m} />)}
          </div>
        </section>
      )}

      <section className={`mx-auto ${live.length > 0 ? "mt-8" : "-mt-10"} max-w-7xl px-4`}>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gold/30 bg-card p-6 card-glow">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
              <Trophy className="h-4 w-4" /> Current Favorite
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-5xl">{top.flag}</span>
              <div>
                <div className="text-2xl font-bold">{top.team}</div>
                <div className="text-sm text-muted-foreground">{top.chance}% chance to lift the trophy</div>
              </div>
            </div>
            <div className="mt-4"><Bar value={top.chance * 5} /></div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-gold" /> AI Top 4
            </div>
            <div className="mt-3 space-y-2.5">
              {PREDICTIONS.slice(0, 4).map((p) => (
                <div key={p.team} className="flex items-center gap-3">
                  <span className="text-lg">{p.flag}</span>
                  <span className="flex-1 text-sm font-medium">{p.team}</span>
                  <span className="text-sm font-bold text-gold">{p.chance}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Flame className="h-4 w-4 text-gold" /> Top Scorers
            </div>
            <div className="mt-3 space-y-2.5">
              {scorers.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                  <span className="text-lg">{p.flag}</span>
                  <span className="flex-1 truncate text-sm font-medium">{p.name}</span>
                  <span className="rounded-md bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">{p.goals} G</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MATCH PREDICTOR (upcoming only) ── */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHead title="Match Predictor" subtitle="AI win probabilities for upcoming fixtures" cta={{ to: "/fixtures", label: "All fixtures" }} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {upcoming.slice(0, 4).map((m) => (
            <div key={m.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="rounded-md bg-secondary px-2 py-0.5">Group {m.group}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatMatchDate(m.kickoff)} · {formatMatchTime(m.kickoff)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-bold"><span className="text-2xl">{m.hf}</span>{m.home}</div>
                <span className="text-xs text-muted-foreground">vs</span>
                <div className="flex items-center gap-2 text-base font-bold">{m.away}<span className="text-2xl">{m.af}</span></div>
              </div>
              {m.hw != null && (
                <>
                  <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="gradient-gold" style={{ width: `${m.hw}%` }} />
                    <div className="bg-muted-foreground/40" style={{ width: `${m.d}%` }} />
                    <div className="bg-destructive/70" style={{ width: `${m.aw}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold text-gold">{m.hw}% Win</span>
                    <span>{m.d}% Draw</span>
                    <span className="font-semibold text-destructive">{m.aw}% Win</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST RESULTS + NEWS ── */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHead title="Latest Results" subtitle="Most recent match scores" cta={{ to: "/fixtures", label: "All results" }} />
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {finished.slice(0, 6).map((r) => (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Group {r.group} · {formatMatchDate(r.kickoff)}</span>
                    <span className="font-bold text-gold">FT</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="flex items-center justify-end gap-3">
                      <span className="text-right text-sm font-semibold">{r.home}</span>
                      <span className="text-xl">{r.hf}</span>
                    </div>
                    <div className="rounded-md bg-secondary px-3 py-1 text-sm font-bold tabular-nums">
                      {r.hs} <span className="text-muted-foreground">–</span> {r.as}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{r.af}</span>
                      <span className="text-sm font-semibold">{r.away}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead title="Latest News" />
            <div className="mt-4 space-y-3">
              {NEWS.map((n) => (
                <div key={n.title} className="rounded-xl border border-border bg-card p-4 transition hover:border-gold/40">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                    <span className="rounded bg-gold/15 px-1.5 py-0.5 font-bold text-gold">{n.tag}</span>
                    <span className="text-muted-foreground">{n.time}</span>
                  </div>
                  <div className="mt-2 flex gap-2 text-sm font-semibold leading-snug">
                    <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    {n.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-r from-background to-secondary/40 p-10 text-center card-glow">
          <Trophy className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-3 text-3xl font-black md:text-4xl">The Road to the Final</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            48 nations. 12 groups. One trophy. Follow every stat and prediction as it happens.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/teams" className="rounded-lg gradient-gold px-5 py-2.5 text-sm font-bold text-primary-foreground">Explore Groups</Link>
            <Link to="/players" className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold">Player Stats</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/** Live match card for the homepage */
function HomeLiveCard({ m }: { m: Match }) {
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const minute = getLiveMinute(m.kickoff);
  const half = minute <= 45 ? "1st Half" : minute <= 90 ? "2nd Half" : "Added Time";
  const expectedFinish = getExpectedFinish(m.kickoff);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-500/40 bg-card p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">Live · {half}</span>
          </div>
          <span className="rounded-md bg-red-500/15 px-2 py-0.5 text-sm font-black tabular-nums text-red-400">{minute}'</span>
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Group {m.group}</div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-bold">{m.home}</span>
            <span className="text-3xl">{m.hf}</span>
          </div>
          <span className="rounded-lg bg-secondary px-4 py-2 text-xl font-black tabular-nums">{m.hs} – {m.as}</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{m.af}</span>
            <span className="text-sm font-bold">{m.away}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{m.venue}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Ends ~{expectedFinish}</span>
        </div>
      </div>
    </div>
  );
}