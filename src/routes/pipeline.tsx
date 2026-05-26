import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Badge } from "@/components/ui-bits";
import { trlPipeline } from "@/lib/mock-data";
import { Rocket, FlaskConical, FlaskRound, ShieldCheck, Building2 } from "lucide-react";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Technology Readiness & Transfer Pipeline - Caraga R&D Intel Hub" },
      {
        name: "description",
        content:
          "Kanban-style pipeline from research to commercialization with TRL progression and IP status.",
      },
    ],
  }),
  component: Page,
});

const stages = [
  { key: "Research", icon: FlaskConical, tone: "info" as const },
  { key: "Prototype", icon: FlaskRound, tone: "info" as const },
  { key: "Pilot Testing", icon: ShieldCheck, tone: "warning" as const },
  { key: "Adoption", icon: Building2, tone: "success" as const },
  { key: "Commercialized", icon: Rocket, tone: "accent" as const },
];

const items: Record<string, { title: string; trl: number; partner: string; ip: string }[]> = {
  Research: [
    { title: "Wave energy feasibility — Dinagat", trl: 2, partner: "CSU", ip: "—" },
    { title: "Lumad crop resilience DB", trl: 3, partner: "FSUU", ip: "—" },
    { title: "Microalgae biofuel pilot", trl: 3, partner: "SSCT", ip: "Provisional" },
  ],
  Prototype: [
    { title: "AI flood prediction model", trl: 5, partner: "CSU + LGU Talacogon", ip: "Filed" },
    { title: "Smart aquaculture sensors", trl: 4, partner: "ADSSC", ip: "—" },
  ],
  "Pilot Testing": [
    { title: "Cacao IoT fermentation", trl: 6, partner: "Coop Surigao Sur", ip: "Filed" },
    { title: "Solar dryer for abaca", trl: 6, partner: "MSME Cluster", ip: "UM filed" },
  ],
  Adoption: [
    { title: "Telemedicine network", trl: 7, partner: "Dinagat PHO", ip: "Open" },
    { title: "Mobile dengue lab", trl: 8, partner: "SDN PHO", ip: "Open" },
  ],
  Commercialized: [
    { title: "Seaweed biopackaging startup", trl: 9, partner: "Spin-off · Surigao", ip: "Licensed" },
    { title: "Coir composite housing panels", trl: 9, partner: "MSME co-mfg", ip: "Licensed" },
  ],
};

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Technology Readiness and Transfer"
        title="Technology Readiness & Transfer Pipeline"
        description="From research to market — track TRL progression, IP, and deployment milestones."
      />

      {/* TRL progression bar */}
      <GlassCard className="mb-4 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium">TRL progression overview</div>
          <Badge tone="success">+3 this quarter</Badge>
        </div>
        <div className="flex items-center gap-1">
          {trlPipeline.map((s, i) => (
            <div key={s.stage} className="flex flex-1 items-center">
              <div className="flex-1 rounded-lg bg-gradient-primary/20 p-3 text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.stage}
                </div>
                <div className="mt-1 text-2xl font-semibold text-gradient">{s.count}</div>
              </div>
              {i < trlPipeline.length - 1 && (
                <div className="mx-1 h-0.5 w-3 bg-border md:w-6" />
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          ["Adopters", "312", "farmers, MSMEs, LGUs, and communities"],
          ["Deployment Sites", "84", "pilot and active implementation sites"],
          ["Commercial Partners", "19", "startup and industry transfer partners"],
        ].map(([label, value, hint]) => (
          <GlassCard key={label} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-gradient">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
          </GlassCard>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stages.map((s) => {
          const Icon = s.icon;
          return (
            <GlassCard key={s.key} className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 text-primary" /> {s.key}
                </div>
                <Badge tone={s.tone}>{items[s.key].length}</Badge>
              </div>
              <div className="space-y-2">
                {items[s.key].map((it) => (
                  <div
                    key={it.title}
                    className="rounded-lg border border-border bg-background/40 p-3 transition-all hover:border-primary/50"
                  >
                    <div className="text-sm font-medium">{it.title}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{it.partner}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <Badge tone="info">TRL {it.trl}</Badge>
                      <span className="text-muted-foreground">IP: {it.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AppShell>
  );
}
