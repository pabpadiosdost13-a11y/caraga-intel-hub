import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Badge } from "@/components/ui-bits";
import { impactIndex } from "@/lib/mock-data";
import { Trophy, ArrowUpRight, ArrowDownRight, Minus, Sparkles } from "lucide-react";

export const Route = createFileRoute("/impact-index")({
  head: () => ({
    meta: [
      { title: "Caraga Research Impact Index — CRCIT" },
      {
        name: "description",
        content:
          "Flagship ranking of provinces, institutions, sectors, and SDG contributions in Caraga research.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Flagship Ranking"
        title={
          <>
            <span className="text-gradient">Caraga Research Impact Index</span>
          </>
        }
        description="A composite ranking of provinces, institutions, sectors, and SDG contributions."
      />

      {/* Podium */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {impactIndex.slice(0, 3).map((r, i) => (
          <GlassCard
            key={r.name}
            className={`relative overflow-hidden p-5 ${
              i === 0 ? "ring-1 ring-primary/40 glow" : ""
            }`}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-aurora opacity-20 blur-2xl" />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Rank #{r.rank} · {r.type}
                </div>
                <div className="mt-1 text-xl font-semibold">{r.name}</div>
              </div>
              <Trophy
                className={`h-6 w-6 ${
                  i === 0
                    ? "text-warning"
                    : i === 1
                      ? "text-muted-foreground"
                      : "text-accent"
                }`}
              />
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="text-4xl font-semibold text-gradient">{r.score}</div>
              <div className="mb-1 text-xs text-muted-foreground">/ 100</div>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-success">
              <ArrowUpRight className="h-3 w-3" /> +{r.delta} pts this quarter
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="overflow-hidden p-0 lg:col-span-2">
          <div className="border-b border-border px-5 py-3 text-sm font-medium">
            Full leaderboard
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {impactIndex.map((r) => {
                const Trend =
                  r.delta > 0 ? ArrowUpRight : r.delta < 0 ? ArrowDownRight : Minus;
                const tone =
                  r.delta > 0 ? "text-success" : r.delta < 0 ? "text-destructive" : "text-muted-foreground";
                return (
                  <tr key={r.name} className="hover:bg-background/40">
                    <td className="px-4 py-3 font-medium">#{r.rank}</td>
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">
                      <Badge tone={r.type === "Institution" ? "info" : r.type === "Province" ? "accent" : "success"}>
                        {r.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/40">
                          <div
                            className="h-full rounded-full bg-gradient-primary"
                            style={{ width: `${r.score}%` }}
                          />
                        </div>
                        <span className="text-xs">{r.score}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${tone}`}>
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Trend className="h-3.5 w-3.5" /> {Math.abs(r.delta)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">AI Insights</div>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-border bg-background/40 p-3">
              <Badge tone="success">Momentum</Badge>
              <div className="mt-1 font-medium">Agriculture & Aquaculture +6</div>
              <p className="text-xs text-muted-foreground">
                Biggest quarter-over-quarter score jump driven by cacao IoT pilots.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-3">
              <Badge tone="warning">Watch</Badge>
              <div className="mt-1 font-medium">Agusan del Sur −1</div>
              <p className="text-xs text-muted-foreground">
                Slight dip due to 3 completed projects without follow-on funding.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-3">
              <Badge tone="info">Opportunity</Badge>
              <div className="mt-1 font-medium">SDG 14 underrepresented</div>
              <p className="text-xs text-muted-foreground">
                Marine-focused research could lift Surigao provinces by an estimated +4 pts.
              </p>
            </li>
          </ul>
        </GlassCard>
      </div>
    </AppShell>
  );
}
