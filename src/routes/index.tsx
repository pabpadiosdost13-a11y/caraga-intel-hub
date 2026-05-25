import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Banknote,
  FlaskConical,
  Users,
  Award,
  Sparkles,
  Activity,
  MapPin,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Stat, Badge } from "@/components/ui-bits";
import {
  aiInsights,
  activity,
  fundingTrend,
  kpis,
  provinceImpact,
  sectorDist,
  formatPHP,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRCIT — Caraga Research Collaboration & Impact Tracker" },
      {
        name: "description",
        content:
          "DOST Caraga's flagship innovation intelligence platform: research repository, impact analytics, AI collaboration matcher, and tech transfer pipeline.",
      },
    ],
  }),
  component: Page,
});

const COLORS = [
  "oklch(0.78 0.16 200)",
  "oklch(0.65 0.2 290)",
  "oklch(0.72 0.17 155)",
  "oklch(0.8 0.15 80)",
  "oklch(0.7 0.18 340)",
  "oklch(0.7 0.14 230)",
  "oklch(0.75 0.18 30)",
];

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Regional Innovation Command Center"
        title={
          <>
            <span className="text-gradient">Caraga Research</span> Intelligence
          </>
            as unknown as string
        }
        description="A live view of DOST-funded research, real-world impact, and collaboration across the Caraga region."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card/60 px-3 py-2 text-sm hover:bg-card">
              Export brief
            </button>
            <button className="rounded-lg bg-gradient-primary px-3 py-2 text-sm font-medium text-primary-foreground glow">
              + New research
            </button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat
          label="Total Funded Research"
          value={String(kpis.totalResearch)}
          delta={12}
          hint="vs last year"
          icon={<FlaskConical className="h-4 w-4" />}
        />
        <Stat
          label="Total Funding"
          value={formatPHP(kpis.totalFunding)}
          delta={18}
          hint="YoY"
          icon={<Banknote className="h-4 w-4" />}
        />
        <Stat
          label="LGU Adoption"
          value={`${kpis.lguAdoption}`}
          delta={9}
          hint="LGUs piloting tech"
          icon={<Users className="h-4 w-4" />}
        />
        <Stat
          label="Impact Score"
          value={`${kpis.impactScore}/100`}
          delta={4}
          hint="composite index"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Funding & Projects Trend</div>
              <div className="text-xs text-muted-foreground">
                ₱ Millions vs project count
              </div>
            </div>
            <Badge tone="info">2020 — 2025</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={fundingTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.2 290)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.65 0.2 290)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="year" stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="funding"
                  stroke="oklch(0.78 0.16 200)"
                  fill="url(#g1)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="oklch(0.65 0.2 290)"
                  fill="url(#g2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Sector Distribution</div>
            <Badge tone="accent">Live</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sectorDist}
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sectorDist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-muted-foreground">
            {sectorDist.slice(0, 6).map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Province impact bars */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Province-level Impact</div>
              <div className="text-xs text-muted-foreground">
                Research count & adoption rate
              </div>
            </div>
            <Badge tone="success">+12% MoM</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={provinceImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="province" stroke="oklch(0.7 0.025 240)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="research" fill="oklch(0.78 0.16 200)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="adoption" fill="oklch(0.65 0.2 290)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* AI Insights */}
        <GlassCard className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">AI Insights</div>
            <Badge tone="accent">Co-pilot</Badge>
          </div>
          <ul className="space-y-3">
            {aiInsights.map((i) => (
              <li key={i.title} className="rounded-xl border border-border bg-background/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{i.title}</div>
                  <Badge tone="info">{i.tag}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{i.detail}</p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Map + Activity */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="relative overflow-hidden p-0 lg:col-span-2">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="relative p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div className="text-sm font-medium">Caraga Innovation Map</div>
              </div>
              <Badge tone="info">Interactive</Badge>
            </div>
            <div className="relative h-72 rounded-xl border border-border bg-background/30">
              {/* stylized "map" pins */}
              {[
                { x: "20%", y: "70%", label: "Agusan del Norte", n: 14 },
                { x: "30%", y: "55%", label: "Agusan del Sur", n: 18 },
                { x: "55%", y: "30%", label: "Surigao del Norte", n: 22 },
                { x: "60%", y: "60%", label: "Surigao del Sur", n: 17 },
                { x: "80%", y: "25%", label: "Dinagat Islands", n: 9 },
              ].map((p) => (
                <div
                  key={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: p.x, top: p.y }}
                >
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/80 px-2 py-0.5 text-[10px] backdrop-blur">
                      {p.label} · {p.n}
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Heatmap of active research</span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-success" /> +6 new this week
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Live activity</div>
          </div>
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-3 w-full rounded-lg border border-border py-2 text-xs text-muted-foreground hover:bg-muted/40">
            View all activity
          </button>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Emerging Research Topics</div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "climate-resilient aquaculture",
              "smart cacao IoT",
              "rural telehealth",
              "drone agronomy",
              "geo-hazard ML",
              "blue carbon",
              "AI tutors",
              "blockchain traceability",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/60 hover:text-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-sm font-medium">Publications</div>
          <div className="mt-2 text-3xl font-semibold">{kpis.publications}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {kpis.citations.toLocaleString()} total citations · {kpis.patents} patents
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted/40">
            <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-sm font-medium">Commercialization Funnel</div>
          <div className="mt-3 space-y-1.5 text-xs">
            {[
              ["Research", 100],
              ["Prototype", 66],
              ["Pilot", 41],
              ["Adoption", 26],
              ["Commercialized", 14],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div className="flex justify-between">
                  <span>{k}</span>
                  <span className="text-muted-foreground">{v}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/40">
                  <div
                    className="h-full rounded-full bg-gradient-aurora"
                    style={{ width: `${v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
