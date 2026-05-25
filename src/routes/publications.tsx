import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Stat, Badge } from "@/components/ui-bits";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { kpis, researchers } from "@/lib/mock-data";
import { BookOpen, Quote, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Citations — CRCIT" },
      {
        name: "description",
        content:
          "Aggregated publication and citation analytics for DOST-funded research in Caraga.",
      },
    ],
  }),
  component: Page,
});

const timeline = [
  { y: "2020", pubs: 18, cites: 120 },
  { y: "2021", pubs: 24, cites: 220 },
  { y: "2022", pubs: 31, cites: 380 },
  { y: "2023", pubs: 36, cites: 540 },
  { y: "2024", pubs: 41, cites: 720 },
  { y: "2025", pubs: 34, cites: 437 },
];

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Bibliometrics"
        title="Publication & Citation Tracker"
        description="Real-time aggregation across Scholar, DOI registries, and institutional repositories."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Publications" value={String(kpis.publications)} delta={14} icon={<BookOpen className="h-4 w-4" />} />
        <Stat label="Citations" value={kpis.citations.toLocaleString()} delta={22} icon={<Quote className="h-4 w-4" />} />
        <Stat label="Median h-index" value="13" delta={4} hint="top researchers" />
        <Stat label="DOIs Registered" value="159" delta={7} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Publication & Citation Timeline</div>
            <Badge tone="info">6 years</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={timeline}>
                <defs>
                  <linearGradient id="p1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="p2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.2 290)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.65 0.2 290)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="y" stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.025 240)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.035 250 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Area type="monotone" dataKey="pubs" stroke="oklch(0.78 0.16 200)" fill="url(#p1)" strokeWidth={2} />
                <Area type="monotone" dataKey="cites" stroke="oklch(0.65 0.2 290)" fill="url(#p2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">Top Researchers</div>
          <ul className="space-y-3">
            {researchers
              .slice()
              .sort((a, b) => b.hIndex - a.hIndex)
              .slice(0, 5)
              .map((r, i) => (
                <li key={r.id} className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.institution}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-semibold">h={r.hIndex}</div>
                    <div className="text-muted-foreground">{r.publications} pubs</div>
                  </div>
                </li>
              ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-4 overflow-hidden p-0">
        <div className="border-b border-border px-5 py-3 text-sm font-medium">
          Recent publications
        </div>
        <ul className="divide-y divide-border">
          {[
            ["AI-Driven Flood Prediction for Agusan River Basin", "Bautista, Lim — IEEE T-GRS, 2024", 47],
            ["Seaweed-Based Biodegradable Packaging from Surigao Waters", "Cariño et al — Carbohydrate Polymers, 2024", 31],
            ["Smart Cacao Fermentation IoT", "Mercado, Tan — Sensors, 2023", 26],
            ["Mangrove Carbon Sequestration in Dinagat", "Villanueva — Ecological Indicators, 2023", 22],
            ["Telemedicine Network for Remote Caraga Barangays", "Cariño — BMC Public Health, 2024", 18],
          ].map(([t, m, c]) => (
            <li key={t as string} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-background/30">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{t as string}</div>
                <div className="truncate text-xs text-muted-foreground">{m as string}</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Badge tone="info">{c as number} cites</Badge>
                <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  DOI <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </AppShell>
  );
}
