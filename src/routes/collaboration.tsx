import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge, GlassCard, PageHeader, Stat } from "@/components/ui-bits";
import { regionalIssues, researchers } from "@/lib/mock-data";
import { Building2, Mail, MapPin, Network, Phone, Search, Users } from "lucide-react";

export const Route = createFileRoute("/collaboration")({
  head: () => ({
    meta: [
      { title: "Research Collaboration Network - Caraga R&D Intel Hub" },
      {
        name: "description",
        content:
          "Searchable researcher repository and collaboration network for DOST Caraga-funded projects.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Researchers, Institutions, Industries, and LGUs"
        title="Research Collaboration Network"
        description="A searchable directory of researchers, institutions, project activity, publications, and collaboration interests connected to DOST-funded work in Caraga."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="Researchers"
          value={`${researchers.length * 18}`}
          delta={9}
          hint="indexed profiles"
          icon={<Users className="h-4 w-4" />}
        />
        <Stat
          label="Institutions"
          value="24"
          delta={6}
          hint="active partners"
          icon={<Building2 className="h-4 w-4" />}
        />
        <Stat
          label="Funded Projects"
          value="126"
          delta={11}
          hint="linked records"
          icon={<Network className="h-4 w-4" />}
        />
        <Stat
          label="Publications"
          value="184"
          delta={5}
          hint="repository outputs"
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">Collaboration Suggestions</div>
          <div className="space-y-3">
            {[
              "Hydrology + drone mapping teams for barangay flood resilience",
              "Food innovation researchers + MSME processors for shelf-life studies",
              "Marine science + LGU fisheries offices for coastal productivity pilots",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background/35 p-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">Community Problem Alignment</div>
          <div className="space-y-3">
            {regionalIssues.map((item) => (
              <div key={item.issue} className="rounded-lg border border-border bg-background/35 p-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{item.issue}</span>
                  <Badge tone="info">{item.aligned} aligned studies</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Future R&D gap: {item.gap}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-medium">Researcher Repository</div>
              <div className="text-xs text-muted-foreground">
                Search all researchers involved in DOST-funded projects
              </div>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full rounded-lg border border-border bg-background/40 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
                placeholder="Search name, province, field..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {researchers.map((r) => (
              <div
                key={r.id}
                className="rounded-lg border border-border bg-background/35 p-4 transition-all hover:border-primary/70"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-primary text-sm font-semibold text-primary-foreground">
                    {r.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.institution}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.expertise.map((e) => (
                        <Badge key={e} tone="info">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {r.province}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    {r.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    {r.contact}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-md border border-border bg-card/40 p-2">
                    <div className="text-base font-semibold text-primary">{r.fundedProjects}</div>
                    <div className="text-muted-foreground">Projects</div>
                  </div>
                  <div className="rounded-md border border-border bg-card/40 p-2">
                    <div className="text-base font-semibold text-warning">{r.publications}</div>
                    <div className="text-muted-foreground">Publications</div>
                  </div>
                  <div className="rounded-md border border-border bg-card/40 p-2">
                    <div className="text-base font-semibold text-destructive">{r.hIndex}</div>
                    <div className="text-muted-foreground">h-index</div>
                  </div>
                </div>

                <div className="mt-4 rounded-md border border-border bg-card/30 p-3 text-xs">
                  <div className="font-medium text-foreground">Ongoing Research</div>
                  <p className="mt-1 text-muted-foreground">{r.ongoingResearch}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.interests.map((interest) => (
                      <Badge key={interest} tone="accent">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="relative min-h-[580px] overflow-hidden p-5">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative z-10">
            <div className="mb-2 text-sm font-medium">Institutional Collaboration Graph</div>
            <div className="text-xs text-muted-foreground">
              Research teams, regional office coordination, LGUs, MSMEs, and technology adopters
            </div>
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 580">
            {[
              [210, 120, 100, 230],
              [210, 120, 320, 230],
              [100, 230, 200, 330],
              [320, 230, 200, 330],
              [200, 330, 90, 450],
              [200, 330, 330, 450],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={
                  ["oklch(0.86 0.18 86)", "oklch(0.62 0.22 28)", "oklch(0.58 0.18 255)"][i % 3]
                }
                strokeOpacity="0.55"
                strokeWidth="2"
              />
            ))}
          </svg>
          {[
            { x: "50%", y: "21%", label: "DOST Caraga" },
            { x: "24%", y: "40%", label: "CSU" },
            { x: "76%", y: "40%", label: "SSCT" },
            { x: "48%", y: "58%", label: "FSUU" },
            { x: "22%", y: "78%", label: "LGUs" },
            { x: "78%", y: "78%", label: "MSMEs" },
          ].map((n) => (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: n.x, top: n.y }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-lg border border-border bg-card/85 text-center text-[10px] font-medium shadow-elegant backdrop-blur">
                {n.label}
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </AppShell>
  );
}
