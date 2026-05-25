import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Stat, Badge } from "@/components/ui-bits";
import {
  fundingTrend,
  kpis,
  provinceImpact,
  sdgImpact,
  trlPipeline,
  formatPHP,
} from "@/lib/mock-data";
import { Banknote, FlaskConical, Award, Rocket, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact Dashboard — CRCIT" },
      {
        name: "description",
        content:
          "Real-world research impact analytics: ROI, SDG alignment, commercialization funnel, and province-level outcomes.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Analytics"
        title="Research Impact Dashboard"
        description="Measurable outcomes of DOST-funded research across Caraga — from peso to community."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Impact / Peso" value="₱4.20" delta={11} hint="community ROI" icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Commercialized" value={`${kpis.commercialized}`} delta={20} hint="technologies" icon={<Rocket className="h-4 w-4" />} />
        <Stat label="Patents Filed" value={`${kpis.patents}`} delta={9} hint="this year" icon={<Award className="h-4 w-4" />} />
        <Stat label="Active Projects" value={`${kpis.activeProjects}`} delta={6} hint="ongoing" icon={<FlaskConical className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Funding ROI Curve</div>
              <div className="text-xs text-muted-foreground">
                Investment vs estimated community impact
              </div>
            </div>
            <Badge tone="success">{formatPHP(kpis.totalFunding)} total</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={fundingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="year" stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="funding"
                  stroke="oklch(0.78 0.16 200)"
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.78 0.16 200)", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="oklch(0.65 0.2 290)"
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.65 0.2 290)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">SDG Alignment Radar</div>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={sdgImpact}>
                <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
                <PolarAngleAxis dataKey="sdg" tick={{ fontSize: 10, fill: "oklch(0.7 0.025 240)" }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: "oklch(0.7 0.025 240)" }} />
                <Radar dataKey="score" stroke="oklch(0.78 0.16 200)" fill="oklch(0.78 0.16 200)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Province-level Outcomes</div>
            <Badge tone="info">5 provinces</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={provinceImpact} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis type="number" stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <YAxis type="category" dataKey="province" stroke="oklch(0.7 0.025 240)" fontSize={11} width={70} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="adoption" fill="oklch(0.72 0.17 155)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Banknote className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Commercialization Funnel</div>
          </div>
          <div className="space-y-3">
            {trlPipeline.map((s, i) => {
              const pct = Math.round((s.count / trlPipeline[0].count) * 100);
              return (
                <div key={s.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{s.stage}</span>
                    <span className="text-muted-foreground">
                      {s.count} · {pct}%
                    </span>
                  </div>
                  <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted/40">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, oklch(0.78 0.16 200), oklch(${0.7 - i * 0.05} 0.2 ${290 + i * 10}))`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg border border-border p-2">
              <div className="text-lg font-semibold text-primary">{kpis.lguAdoption}</div>
              <div className="text-muted-foreground">LGUs adopting</div>
            </div>
            <div className="rounded-lg border border-border p-2">
              <div className="text-lg font-semibold text-accent">{kpis.msmeUtilization}</div>
              <div className="text-muted-foreground">MSMEs using</div>
            </div>
            <div className="rounded-lg border border-border p-2">
              <div className="text-lg font-semibold text-success">{kpis.commercialized}</div>
              <div className="text-muted-foreground">Commercialized</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
