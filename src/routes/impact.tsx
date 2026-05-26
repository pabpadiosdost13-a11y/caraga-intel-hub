import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Badge, GlassCard, PageHeader } from "@/components/ui-bits";
import {
  adoptionTimeline,
  beneficiaryMetrics,
  formatPHP,
  impactPerPeso,
  kpis,
  lifecycle,
  provinceImpact,
  researches,
  sectorImpact,
} from "@/lib/mock-data";
import {
  Award,
  Banknote,
  BookOpenCheck,
  Building2,
  Download,
  FileCheck2,
  FlaskConical,
  GitBranch,
  Globe2,
  Rocket,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Regional STI Impact Intelligence Center - Caraga R&D Intel Hub" },
      {
        name: "description",
        content:
          "Interactive regional science, technology, and innovation impact monitoring dashboard for DOST Caraga-funded research.",
      },
    ],
  }),
  component: Page,
});

type DrillMetric =
  | "funded"
  | "active"
  | "ongoing"
  | "completed"
  | "patents"
  | "commercialized"
  | "policies"
  | "adoption"
  | "publications"
  | "citations";

type DrillRow = Record<string, string | number>;

const metricConfig: Record<
  DrillMetric,
  {
    title: string;
    description: string;
    columns: { key: string; label: string }[];
    rows: DrillRow[];
  }
> = {
  funded: {
    title: "Total Funded Projects",
    description: "Complete portfolio of DOST-funded R&D projects in Caraga.",
    columns: [
      { key: "title", label: "Project Title" },
      { key: "sector", label: "Sector" },
      { key: "institution", label: "Institution" },
      { key: "status", label: "Status" },
      { key: "budget", label: "Budget" },
      { key: "duration", label: "Duration" },
      { key: "province", label: "Province" },
    ],
    rows: researches.map((r) => ({
      title: r.title,
      sector: r.sector,
      institution: r.institution,
      status: r.status,
      budget: formatPHP(r.funding),
      duration: r.duration,
      province: r.province,
    })),
  },
  active: {
    title: "Active Projects",
    description: "Ongoing projects with progress, target completion, and assigned researchers.",
    columns: [
      { key: "title", label: "Project Title" },
      { key: "progress", label: "Progress" },
      { key: "completion", label: "Expected Completion" },
      { key: "researchers", label: "Assigned Researchers" },
      { key: "status", label: "Status" },
      { key: "province", label: "Province" },
    ],
    rows: researches
      .filter((r) => r.status === "Active")
      .map((r, i) => ({
        title: r.title,
        progress: `${58 + i * 8}%`,
        completion: r.expectedCompletionDate,
        researchers: r.authors.join(", "),
        status: r.status,
        province: r.province,
      })),
  },
  ongoing: {
    title: "Pilot and Ongoing Projects",
    description: "Projects currently moving through validation and pilot implementation.",
    columns: [
      { key: "title", label: "Project Title" },
      { key: "sector", label: "Sector" },
      { key: "progress", label: "Progress" },
      { key: "completion", label: "Expected Completion" },
      { key: "status", label: "Status" },
    ],
    rows: researches
      .filter((r) => r.status === "Pilot")
      .map((r, i) => ({
        title: r.title,
        sector: r.sector,
        progress: `${45 + i * 10}%`,
        completion: r.expectedCompletionDate,
        status: r.status,
      })),
  },
  completed: {
    title: "Completed Projects",
    description: "Closed studies with actual completion records and final project status.",
    columns: [
      { key: "title", label: "Project Title" },
      { key: "institution", label: "Institution" },
      { key: "completed", label: "Actual Completion" },
      { key: "outputs", label: "Validated Outputs" },
      { key: "province", label: "Province" },
    ],
    rows: researches
      .filter((r) => r.status === "Completed")
      .map((r, i) => ({
        title: r.title,
        institution: r.institution,
        completed: r.actualCompletionDate ?? "For validation",
        outputs: 3 + i,
        province: r.province,
      })),
  },
  patents: {
    title: "Patents Filed",
    description: "Patent and utility model filings connected to funded R&D outputs.",
    columns: [
      { key: "title", label: "Patent / IP Title" },
      { key: "type", label: "Patent Type" },
      { key: "status", label: "Status" },
      { key: "institution", label: "Institution" },
      { key: "stage", label: "Commercialization Stage" },
    ],
    rows: researches.slice(0, 12).map((r, i) => ({
      title: `${r.title} IP Package`,
      type: i % 3 === 0 ? "Patent" : i % 3 === 1 ? "Utility Model" : "Industrial Design",
      status: ["Filed", "Under Examination", "For Filing", "Granted"][i % 4],
      institution: r.institution,
      stage: ["Prototype", "Pilot Testing", "Validation", "Licensing"][i % 4],
    })),
  },
  commercialized: {
    title: "Technologies Commercialized",
    description: "Technologies deployed with adopters, partners, and utilization status.",
    columns: [
      { key: "technology", label: "Technology" },
      { key: "adopters", label: "Adopters" },
      { key: "partners", label: "Partners" },
      { key: "areas", label: "Deployment Areas" },
      { key: "status", label: "Utilization Status" },
    ],
    rows: researches
      .filter((r) => r.status === "Adopted")
      .concat(researches.slice(0, 6))
      .slice(0, 11)
      .map((r, i) => ({
        technology: r.title,
        adopters: `${24 + i * 9} adopters`,
        partners: r.collaborators.slice(1).join(", "),
        areas: `${r.municipality}, ${r.province}`,
        status: ["Deployed", "Scaling", "Licensed", "In utilization"][i % 4],
      })),
  },
  policies: {
    title: "Policies Influenced",
    description: "Policy recommendations and LGU or regional planning references generated from research.",
    columns: [
      { key: "policy", label: "Policy Recommendation" },
      { key: "linked", label: "Linked Project" },
      { key: "office", label: "Adopting Office" },
      { key: "status", label: "Status" },
    ],
    rows: researches.slice(0, 10).map((r, i) => ({
      policy: `${r.sector} evidence brief ${2024 + (i % 3)}`,
      linked: r.title,
      office: ["LGU Butuan", "Provincial Agriculture Office", "Caraga RDC", "DOST Caraga"][i % 4],
      status: ["Endorsed", "For review", "Adopted", "Presented"][i % 4],
    })),
  },
  adoption: {
    title: "Community Adoption",
    description: "Project sites and community utilization records by province.",
    columns: [
      { key: "project", label: "Project" },
      { key: "beneficiaries", label: "Beneficiaries" },
      { key: "barangays", label: "Barangays" },
      { key: "province", label: "Province" },
      { key: "status", label: "Status" },
    ],
    rows: researches
      .filter((r) => r.status === "Adopted")
      .map((r) => ({
        project: r.title,
        beneficiaries: r.beneficiaries,
        barangays: r.barangays,
        province: r.province,
        status: "Adopted",
      })),
  },
  publications: {
    title: "Publications",
    description: "Published knowledge outputs, linked research projects, and downloadable files.",
    columns: [
      { key: "title", label: "Publication Title" },
      { key: "authors", label: "Authors" },
      { key: "year", label: "Year" },
      { key: "project", label: "Linked Project" },
      { key: "file", label: "Files" },
    ],
    rows: researches.slice(0, 14).map((r, i) => ({
      title: `${r.title}: Regional Implementation Study`,
      authors: r.authors.join(", "),
      year: 2020 + (i % 6),
      project: r.projectCode,
      file: "PDF report",
    })),
  },
  citations: {
    title: "Citation Count",
    description: "Knowledge uptake indicators across indexed outputs.",
    columns: [
      { key: "title", label: "Publication" },
      { key: "project", label: "Linked Project" },
      { key: "citations", label: "Citations" },
      { key: "sector", label: "Sector" },
    ],
    rows: researches
      .slice()
      .sort((a, b) => b.citations - a.citations)
      .map((r) => ({
        title: `${r.title}: Evidence and Outcomes`,
        project: r.projectCode,
        citations: r.citations,
        sector: r.sector,
      })),
  },
};

const metricCards: {
  key: DrillMetric;
  label: string;
  value: string;
  delta: number;
  hint: string;
  icon: JSX.Element;
}[] = [
  { key: "funded", label: "Total Funded Projects", value: `${kpis.totalResearch}`, delta: 8, hint: formatPHP(kpis.totalFunding), icon: <Banknote className="h-4 w-4" /> },
  { key: "active", label: "Active Projects", value: `${kpis.activeProjects}`, delta: 6, hint: "currently funded", icon: <FlaskConical className="h-4 w-4" /> },
  { key: "ongoing", label: "Ongoing Projects", value: `${kpis.ongoingProjects}`, delta: 4, hint: "in pilot cycle", icon: <GitBranch className="h-4 w-4" /> },
  { key: "completed", label: "Completed Projects", value: `${kpis.completed}`, delta: 10, hint: "closed studies", icon: <FileCheck2 className="h-4 w-4" /> },
  { key: "patents", label: "Patents Filed", value: `${kpis.patents}`, delta: 9, hint: "IP outputs", icon: <Award className="h-4 w-4" /> },
  { key: "commercialized", label: "Commercialized Tech", value: `${kpis.commercialized}`, delta: 20, hint: "market-ready", icon: <Rocket className="h-4 w-4" /> },
  { key: "policies", label: "Policies Influenced", value: `${kpis.policiesInfluenced}`, delta: 7, hint: "LGU/regional", icon: <Building2 className="h-4 w-4" /> },
  { key: "adoption", label: "Community Adoption", value: `${kpis.communityAdoption}`, delta: 12, hint: "project sites", icon: <Users className="h-4 w-4" /> },
  { key: "publications", label: "Publications", value: `${kpis.publications}`, delta: 5, hint: "research outputs", icon: <BookOpenCheck className="h-4 w-4" /> },
  { key: "citations", label: "Citation Count", value: `${kpis.citations.toLocaleString()}`, delta: 14, hint: "knowledge uptake", icon: <Globe2 className="h-4 w-4" /> },
];

function Page() {
  const [activeMetric, setActiveMetric] = useState<DrillMetric | null>(null);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Regional STI Impact Monitoring"
        title="Impact Intelligence Dashboard"
        description="A clean and interactive Regional STI Impact Monitoring and Intelligence Dashboard for decision-making, monitoring efficiency, and evidence-based reporting across Caraga."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        {metricCards.map((metric) => (
          <MetricCard key={metric.key} {...metric} onClick={() => setActiveMetric(metric.key)} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {beneficiaryMetrics.map((metric) => (
          <GlassCard key={metric.label} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{metric.label}</div>
            <div className="mt-2 text-3xl font-semibold text-gradient">{metric.value.toLocaleString()}</div>
            <div className="mt-1 text-xs text-muted-foreground">validated beneficiary records</div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Socioeconomic Impact Trend</div>
              <div className="text-xs text-muted-foreground">
                Jobs, productivity, income, cost reduction, and adoption signals over time
              </div>
            </div>
            <Badge tone="warning">PHP 4.80 / PHP 1</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={impactPerPeso}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="year" stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 255 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" name="Impact / Peso" stroke="oklch(0.86 0.18 86)" strokeWidth={3} dot={{ fill: "oklch(0.86 0.18 86)", r: 4 }} />
                <Line type="monotone" dataKey="reach" name="Community Reach" stroke="oklch(0.62 0.22 28)" strokeWidth={3} dot={{ fill: "oklch(0.62 0.22 28)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Expandable Milestone Tracking</div>
          </div>
          <div className="space-y-3">
            {lifecycle.map((s) => {
              const pct = Math.round((s.count / lifecycle[0].count) * 100);
              return (
                <details key={s.stage} className="rounded-lg border border-border bg-background/35 p-3">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-center justify-between text-sm">
                      <span>{s.stage}</span>
                      <span className="text-muted-foreground">{s.count} outputs</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted/40">
                      <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </summary>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Includes validated accomplishments, evidence files, and implementation notes for this stage.
                  </p>
                </details>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Sector-Based Impact Analytics</div>
            <Badge tone="info">adoption intensity</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={sectorImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="sector" stroke="oklch(0.78 0.02 250)" fontSize={10} interval={0} />
                <YAxis stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 255 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Bar dataKey="projects" fill="oklch(0.86 0.18 86)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="adoption" fill="oklch(0.62 0.22 28)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="conversion" fill="oklch(0.58 0.18 255)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Technology Adoption Timeline</div>
            <Badge tone="success">implementation trend</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={adoptionTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="quarter" stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 255 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="prototype" stroke="oklch(0.86 0.18 86)" strokeWidth={3} />
                <Line type="monotone" dataKey="pilot" stroke="oklch(0.58 0.18 255)" strokeWidth={3} />
                <Line type="monotone" dataKey="adopted" stroke="oklch(0.62 0.22 28)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Province-Based Community Reach</div>
            <Badge tone="accent">5 provinces</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {provinceImpact.map((p) => (
              <div key={p.province} className="min-h-36 rounded-lg border border-border bg-background/35 p-3">
                <div className="text-xs font-medium">{p.province}</div>
                <div className="mt-3 h-20 rounded-md border border-border" style={{ background: `linear-gradient(180deg, oklch(0.86 0.18 86 / ${p.adoption / 120}), oklch(0.62 0.22 28 / ${p.adoption / 140}), oklch(0.58 0.18 255 / .22))` }} />
                <div className="mt-2 text-lg font-semibold">{p.adoption}%</div>
                <div className="text-[11px] text-muted-foreground">{p.research} projects</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Implementation Status Summary</div>
            <Badge tone="info">monitoring table</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Milestone</th>
                  <th className="px-3 py-2">Records</th>
                  <th className="px-3 py-2">Completion</th>
                  <th className="px-3 py-2">Monitoring Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lifecycle.map((item) => {
                  const pct = Math.round((item.count / lifecycle[0].count) * 100);
                  return (
                    <tr key={item.stage} className="hover:bg-background/35">
                      <td className="px-3 py-3 font-medium">{item.stage}</td>
                      <td className="px-3 py-3 text-muted-foreground">{item.count}</td>
                      <td className="px-3 py-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted/40">
                          <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">Evidence files and field updates available</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {activeMetric && (
        <DrillDownModal metric={metricConfig[activeMetric]} onClose={() => setActiveMetric(null)} />
      )}
    </AppShell>
  );
}

function MetricCard({
  label,
  value,
  delta,
  hint,
  icon,
  onClick,
}: {
  label: string;
  value: string;
  delta: number;
  hint: string;
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl text-left glass p-5 shadow-elegant transition-all hover:border-primary/60 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary/20 text-primary">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-success">+{delta}%</span>
        <span className="text-muted-foreground">{hint}</span>
      </div>
      <div className="mt-3 text-xs text-primary">View detailed records</div>
    </button>
  );
}

function DrillDownModal({
  metric,
  onClose,
}: {
  metric: (typeof metricConfig)[DrillMetric];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState(metric.columns[0].key);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const statusOptions = useMemo(() => {
    const values = metric.rows
      .map((row) => row.status)
      .filter((value): value is string => typeof value === "string");
    return Array.from(new Set(values));
  }, [metric.rows]);

  const rows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return metric.rows
      .filter((row) => {
        const matchesQuery =
          normalizedQuery === "" ||
          Object.values(row).some((value) => String(value).toLowerCase().includes(normalizedQuery));
        const matchesStatus = status === "all" || row.status === status;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? "")));
  }, [metric.rows, query, sortKey, status]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <div className="text-xl font-semibold">{metric.title}</div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{metric.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border p-2 hover:bg-muted/40"
            aria-label="Close metric details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-3 border-b border-border p-4 lg:grid-cols-[1fr_180px_180px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search records..."
              className="w-full rounded-lg border border-border bg-background/40 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary/60"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value)}
            className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary/60"
          >
            {metric.columns.map((column) => (
              <option key={column.key} value={column.key}>
                Sort by {column.label}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm hover:bg-muted/40">
            <Download className="h-4 w-4" /> Report
          </button>
        </div>

        <div className="max-h-[48vh] overflow-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="sticky top-0 border-b border-border bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {metric.columns.map((column) => (
                  <th key={column.key} className="px-4 py-3">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleRows.map((row, index) => (
                <tr key={`${row[metric.columns[0].key]}-${index}`} className="hover:bg-background/35">
                  {metric.columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-top">
                      {column.key === "status" ? (
                        <Badge tone={statusTone(String(row[column.key]))}>{row[column.key]}</Badge>
                      ) : column.key === "progress" ? (
                        <div className="min-w-28">
                          <div className="text-xs">{row[column.key]}</div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted/40">
                            <div className="h-full rounded-full bg-gradient-primary" style={{ width: String(row[column.key]) }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{row[column.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {visibleRows.length} of {rows.length} records
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <span>Page {page} of {pageCount}</span>
            <button
              type="button"
              disabled={page === pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusTone(status: string) {
  if (["Active", "Filed", "Deployed", "Adopted", "Granted", "Licensed"].includes(status)) {
    return "success";
  }
  if (["Pilot", "For Filing", "For review", "Under Examination"].includes(status)) {
    return "warning";
  }
  return "info";
}
