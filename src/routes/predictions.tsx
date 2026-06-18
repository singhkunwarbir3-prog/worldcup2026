import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Bar } from "@/components/Bar";
import { PREDICTIONS, MATCHES, POLLS } from "@/lib/wc-data";
import { Brain, TrendingUp, Vote } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "AI Predictions & Polls — World Cup Hub 2026" },
      { name: "description", content: "AI-powered World Cup 2026 win probabilities, match predictor, and fan polls." },
      { property: "og:title", content: "AI Predictions — World Cup Hub 2026" },
      { property: "og:description", content: "Who's going to win? AI says…" },
    ],
  }),
  component: PredictionsPage,
});

function PredictionsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><Brain className="h-4 w-4" /> AI Prediction Center</div>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">Who Lifts the <span className="text-gradient-gold">Trophy?</span></h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Win percentages from large simulation models. Numbers refresh as matches are played.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-gold/30 bg-card p-6 card-glow">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><TrendingUp className="h-4 w-4 text-gold" /> Chance to Win the World Cup</div>
            <div className="mt-5 space-y-4">
              {PREDICTIONS.map((p, i) => (
                <div key={p.team}>
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-xs font-bold text-muted-foreground">{i + 1}</span>
                    <span className="text-2xl">{p.flag}</span>
                    <span className="flex-1 font-semibold">{p.team}</span>
                    <span className="font-bold tabular-nums text-gold">{p.chance}%</span>
                  </div>
                  <div className="mt-2 pl-10"><Bar value={p.chance * 5} /></div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">Source: aggregated simulation models. Probabilities update after every fixture.</p>
          </div>

          <div>
            <h2 className="text-xl font-black">Match Predictor</h2>
            <p className="mt-1 text-sm text-muted-foreground">AI win probability for every upcoming game.</p>
            <div className="mt-4 space-y-3">
              {MATCHES.map((m) => (
                <div key={m.home + m.away} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="rounded bg-secondary px-2 py-0.5">{m.stage}</span>
                    <span>{m.date} · {m.time}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm font-bold">
                    <span className="flex items-center gap-1.5"><span className="text-xl">{m.hf}</span>{m.home}</span>
                    <span className="flex items-center gap-1.5">{m.away}<span className="text-xl">{m.af}</span></span>
                  </div>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="gradient-gold" style={{ width: `${m.hw}%` }} />
                    <div className="bg-muted-foreground/40" style={{ width: `${m.d}%` }} />
                    <div className="bg-destructive/70" style={{ width: `${m.aw}%` }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px]">
                    <span className="font-bold text-gold">{m.hw}%</span>
                    <span className="text-muted-foreground">Draw {m.d}%</span>
                    <span className="font-bold text-destructive">{m.aw}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><Vote className="h-4 w-4" /> Fan Polls</div>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">Your turn to predict.</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {POLLS.map((p) => <Poll key={p.q} q={p.q} opts={p.opts} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Poll({ q, opts }: { q: string; opts: { label: string; v: number }[] }) {
  const [voted, setVoted] = useState<string | null>(null);
  const total = opts.reduce((a, b) => a + b.v, 0);
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-sm font-bold leading-snug">{q}</div>
      <div className="mt-4 space-y-2.5">
        {opts.map((o) => {
          const pct = Math.round((o.v / total) * 100);
          const isVote = voted === o.label;
          return (
            <button
              key={o.label}
              onClick={() => setVoted(o.label)}
              className={`group block w-full rounded-lg border px-3 py-2 text-left text-xs transition ${isVote ? "border-gold bg-gold/10" : "border-border bg-secondary/40 hover:border-gold/40"}`}
            >
              <div className="flex justify-between font-semibold">
                <span>{o.label}</span>
                {voted && <span className={isVote ? "text-gold" : "text-muted-foreground"}>{pct}%</span>}
              </div>
              {voted && (
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background/60">
                  <div className={`h-full ${isVote ? "gradient-gold" : "bg-muted-foreground/40"}`} style={{ width: `${pct}%` }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-[11px] text-muted-foreground">{voted ? "Thanks for voting!" : `${total.toLocaleString()} votes`}</div>
    </div>
  );
}