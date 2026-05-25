import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Badge } from "@/components/ui-bits";
import { researchers } from "@/lib/mock-data";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { Sparkles, Users, GitMerge } from "lucide-react";

export const Route = createFileRoute("/collaboration")({
  head: () => ({
    meta: [
      { title: "AI Collaboration Matcher — CRCIT" },
      {
        name: "description",
        content:
          "Semantic AI matcher connecting researchers, LGUs, MSMEs, and industries across Caraga.",
      },
    ],
  }),
  component: Page,
});

function ExpertiseRadar({ data }: { data: { skill: string; v: number }[] }) {
  return (
    <ResponsiveContainer>
      <RadarChart data={data}>
        <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "oklch(0.7 0.025 240)" }} />
        <PolarRadiusAxis tick={{ fontSize: 9, fill: "oklch(0.7 0.025 240)" }} />
        <Radar dataKey="v" stroke="oklch(0.65 0.2 290)" fill="oklch(0.65 0.2 290)" fillOpacity={0.35} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="AI-Powered"
        title="Collaboration Matcher"
        description="Semantic similarity + interest graphs match the right researchers, LGUs, and industry partners."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">People you should collaborate with</div>
            <Badge tone="accent">AI suggested</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {researchers.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-border bg-background/40 p-4 transition-all hover:border-primary/60"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-aurora" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.name}</div>
                      <Badge tone="success">{r.score}% match</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{r.institution}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.expertise.map((e) => (
                    <Badge key={e} tone="info">
                      {e}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>h-index {r.hIndex} · {r.publications} pubs</span>
                  <button className="rounded-md border border-border px-2 py-1 hover:bg-muted/40">
                    Invite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Expertise Radar</div>
          </div>
          <div className="h-56">
            <ExpertiseRadar
              data={[
                { skill: "AI/ML", v: 85 },
                { skill: "Hydrology", v: 72 },
                { skill: "IoT", v: 64 },
                { skill: "Policy", v: 48 },
                { skill: "Field Ops", v: 70 },
                { skill: "Data Sci", v: 88 },
              ]}
            />
          </div>
          <div className="mt-2 rounded-lg border border-border bg-background/40 p-3 text-xs">
            <div className="flex items-center gap-2">
              <GitMerge className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">Co-author network</span>
            </div>
            <p className="mt-1 text-muted-foreground">
              92 researchers · 318 connections · 7 emerging clusters
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Network preview */}
      <GlassCard className="relative mt-4 h-72 overflow-hidden p-0">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <svg className="absolute inset-0 h-full w-full">
          {[
            ["20%", "30%", "50%", "50%"],
            ["50%", "50%", "80%", "30%"],
            ["50%", "50%", "30%", "75%"],
            ["50%", "50%", "75%", "75%"],
            ["20%", "30%", "30%", "75%"],
            ["80%", "30%", "75%", "75%"],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="oklch(0.78 0.16 200 / 0.45)"
              strokeWidth={1}
            />
          ))}
        </svg>
        {[
          { x: "20%", y: "30%", label: "CSU" },
          { x: "80%", y: "30%", label: "SSCT" },
          { x: "50%", y: "50%", label: "DOST RO" },
          { x: "30%", y: "75%", label: "FSUU" },
          { x: "75%", y: "75%", label: "Industry" },
        ].map((n) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: n.x, top: n.y }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card/80 text-[10px] backdrop-blur animate-float">
              {n.label}
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-3 rounded-md border border-border bg-card/80 px-2 py-1 text-[11px] text-muted-foreground backdrop-blur">
          Collaboration graph · live
        </div>
      </GlassCard>
    </AppShell>
  );
}
