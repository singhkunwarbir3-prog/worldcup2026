import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ALL_MATCHES, getMatchStatus, getLiveMinute, getExpectedFinish, formatMatchDate, formatMatchTime } from "@/lib/wc-data";
import type { Match } from "@/lib/wc-data";
import { Calendar, CheckCircle2, Radio, Clock, MapPin } from "lucide-react";

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
  { round: "Round of 16", games: ["1A vs 2B", "1C vs 2D", "1E vs 2F", "1G vs 2H", "1B vs 2A", "1D vs 2C", "1F vs 2E", "1H vs 2G"] },
  { round: "Quarterfinals", games: ["TBD vs TBD", "TBD vs TBD", "TBD vs TBD", "TBD vs TBD"] },
  { round: "Semifinals", games: ["TBD vs TBD", "TBD vs TBD"] },
  { round: "Final", games: ["TBD vs TBD"] },
];

function FixturesPage() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 30000); // update every 30s
    return () => clearInterval(i);
  }, []);

  // Split matches by real-time status
  const live: Match[] = [];
  const upcoming: Match[] = [];
  const finished: Match[] = [];
  for (const m of ALL_MATCHES) {
    const s = getMatchStatus(m);
    if (s === "live") live.push(m);
    else if (s === "upcoming") upcoming.push(m);
    else finished.push(m);
  }
  // Show most recent finished first
  finished.reverse();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs uppercase tracking-widest text-gold">Fixtures & Results</div>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">The Road to the <span className="text-gradient-gold">Final</span></h1>

        {/* ── LIVE NOW ── */}
        {live.length > 0 && (
          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              Live Now
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {live.map((m) => <LiveCard key={m.id} m={m} />)}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* ── UPCOMING ── */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black"><Calendar className="h-5 w-5 text-gold" /> Upcoming Fixtures</h2>
            <div className="mt-4 space-y-3">
              {upcoming.slice(0, 10).map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="rounded bg-secondary px-2 py-0.5 text-foreground">Group {m.group}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {formatMatchDate(m.kickoff)} · {formatMatchTime(m.kickoff)}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="flex items-center justify-end gap-2 text-sm font-bold">{m.home}<span className="text-2xl">{m.hf}</span></div>
                    <span className="text-xs text-muted-foreground">VS</span>
                    <div className="flex items-center gap-2 text-sm font-bold"><span className="text-2xl">{m.af}</span>{m.away}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />{m.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black"><CheckCircle2 className="h-5 w-5 text-gold" /> Latest Results</h2>
            <div className="mt-4 space-y-3">
              {finished.slice(0, 10).map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="rounded bg-secondary px-2 py-0.5 text-foreground">Group {m.group}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{formatMatchDate(m.kickoff)}</span>
                      <span className="font-bold text-gold">FT</span>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="flex items-center justify-end gap-2 text-sm font-bold">{m.home}<span className="text-2xl">{m.hf}</span></div>
                    <span className="rounded-md bg-secondary px-3 py-1 text-base font-black tabular-nums">{m.hs} – {m.as}</span>
                    <div className="flex items-center gap-2 text-sm font-bold"><span className="text-2xl">{m.af}</span>{m.away}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />{m.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── KNOCKOUT BRACKET ── */}
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

/** Live match card with ticking minute and expected finish */
function LiveCard({ m }: { m: Match }) {
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
      {/* Pulsing live indicator background */}
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
          <div className="flex flex-col items-center">
            <span className="rounded-lg bg-secondary px-4 py-2 text-xl font-black tabular-nums">{m.hs} – {m.as}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{m.af}</span>
            <span className="text-sm font-bold">{m.away}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{m.venue}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Expected finish: {expectedFinish}</span>
        </div>
      </div>
    </div>
  );
}