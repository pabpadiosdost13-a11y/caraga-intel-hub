import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge, GlassCard, PageHeader, Stat } from "@/components/ui-bits";
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
import { knowledgeProducts, outputDeliverables } from "@/lib/mock-data";
import { ClipboardCheck, FileUp, Flag, TimerReset } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Output & Deliverable Tracker - Caraga R&D Intel Hub" },
      {
        name: "description",
        content:
          "Monitoring dashboard for DOST Caraga project outputs, deliverables, supporting documents, timelines, and accomplishment status.",
      },
    ],
  }),
  component: Page,
});

const timeline = [
  { month: "Jan", planned: 18, actual: 15 },
  { month: "Feb", planned: 24, actual: 22 },
  { month: "Mar", planned: 31, actual: 26 },
  { month: "Apr", planned: 37, actual: 34 },
  { month: "May", planned: 44, actual: 39 },
  { month: "Jun", planned: 52, actual: 46 },
];

function Page() {
  const planned = outputDeliverables.reduce((sum, item) => sum + item.planned, 0);
  const actual = outputDeliverables.reduce((sum, item) => sum + item.actual, 0);
  const completion = Math.round((actual / planned) * 100);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Project Commitments Monitoring"
        title="Output & Deliverable Tracker"
        description="Monitor whether funded projects are delivering publications, patents, prototypes, technologies, systems, policy recommendations, and knowledge products on schedule."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-3 py-2 text-sm font-medium text-primary-foreground glow">
            <FileUp className="h-4 w-4" /> Upload evidence
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Planned Outputs" value={String(planned)} delta={8} icon={<Flag className="h-4 w-4" />} />
        <Stat label="Actual Outputs" value={String(actual)} delta={12} icon={<ClipboardCheck className="h-4 w-4" />} />
        <Stat label="Completion" value={`${completion}%`} delta={5} hint="portfolio-wide" />
        <Stat label="Pending Submissions" value="27" delta={-3} hint="for validation" icon={<TimerReset className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <GlassCard className="p-5 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Planned vs Actual Outputs</div>
              <div className="text-xs text-muted-foreground">Trackable research outputs by deliverable type</div>
            </div>
            <Badge tone="info">{completion}% complete</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={outputDeliverables}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="type" stroke="oklch(0.78 0.02 250)" fontSize={10} interval={0} />
                <YAxis stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 255 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Bar dataKey="planned" fill="oklch(0.58 0.18 255)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="oklch(0.86 0.18 86)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">Knowledge Products</div>
          <div className="space-y-3">
            {knowledgeProducts.map((item, i) => (
              <div key={item}>
                <div className="flex items-center justify-between text-sm">
                  <span>{item}</span>
                  <Badge tone={i % 2 ? "warning" : "success"}>{[86, 72, 64, 91, 78][i]}%</Badge>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted/40">
                  <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${[86, 72, 64, 91, 78][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-3 text-sm font-medium">Deliverable Timeline</div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <YAxis stroke="oklch(0.78 0.02 250)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 255 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="planned" stroke="oklch(0.58 0.18 255)" strokeWidth={3} />
                <Line type="monotone" dataKey="actual" stroke="oklch(0.86 0.18 86)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-3 text-sm font-medium">Submission Monitoring</div>
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Deliverable</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Completion</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {outputDeliverables.map((item) => {
                const pct = Math.round((item.actual / item.planned) * 100);
                return (
                  <tr key={item.type} className="hover:bg-background/35">
                    <td className="px-4 py-3 font-medium">{item.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.due}</td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted/40">
                        <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={pct > 75 ? "success" : "warning"}>{item.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </AppShell>
  );
}
