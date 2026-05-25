import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Badge } from "@/components/ui-bits";
import {
  researches,
  provinces,
  sectors,
  formatPHP,
} from "@/lib/mock-data";
import { Filter, Download, MapPin, Search } from "lucide-react";

export const Route = createFileRoute("/repository")({
  head: () => ({
    meta: [
      { title: "Research Repository — CRCIT" },
      {
        name: "description",
        content:
          "Searchable, filterable repository of DOST-funded research in Caraga with AI summaries, TRL, and SDG alignment.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const [prov, setProv] = useState<string | "all">("all");
  const [sec, setSec] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      researches.filter(
        (r) =>
          (prov === "all" || r.province === prov) &&
          (sec === "all" || r.sector === sec) &&
          (q === "" ||
            r.title.toLowerCase().includes(q.toLowerCase()) ||
            r.keywords.join(" ").toLowerCase().includes(q.toLowerCase())),
      ),
    [q, prov, sec],
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Knowledge Base"
        title="Research Repository"
        description="All DOST-funded research in Caraga — searchable by sector, province, TRL, and SDG."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm hover:bg-card">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <GlassCard className="h-fit p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-primary" /> Filters
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <label className="text-xs text-muted-foreground">Search</label>
              <div className="relative mt-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Keyword…"
                  className="w-full rounded-md border border-border bg-background/40 py-2 pl-8 pr-2 text-sm outline-none focus:border-primary/60"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Province</label>
              <select
                value={prov}
                onChange={(e) => setProv(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background/40 px-2 py-2 text-sm outline-none focus:border-primary/60"
              >
                <option value="all">All provinces</option>
                {provinces.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Sector</label>
              <select
                value={sec}
                onChange={(e) => setSec(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background/40 px-2 py-2 text-sm outline-none focus:border-primary/60"
              >
                <option value="all">All sectors</option>
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">TRL range</label>
              <input type="range" min={1} max={9} className="mt-2 w-full accent-[oklch(0.78_0.16_200)]" />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>TRL 1</span><span>TRL 9</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} results</span>
            <span className="hidden sm:inline">Sorted by relevance</span>
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Institution</th>
                    <th className="px-4 py-3">Province</th>
                    <th className="px-4 py-3">TRL</th>
                    <th className="px-4 py-3">Funding</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.slice(0, 12).map((r) => (
                    <tr key={r.id} className="hover:bg-background/40">
                      <td className="max-w-md px-4 py-3">
                        <div className="font-medium">{r.title}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {r.authors.join(", ")} · {r.year}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.institution}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {r.province}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone="info">TRL {r.trl}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{formatPHP(r.funding)}</td>
                      <td className="px-4 py-3">
                        <Badge
                          tone={
                            r.status === "Active"
                              ? "info"
                              : r.status === "Completed"
                                ? "success"
                                : r.status === "Pilot"
                                  ? "warning"
                                  : "accent"
                          }
                        >
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Featured cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.slice(0, 4).map((r) => (
              <GlassCard key={r.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {r.sector}
                    </div>
                    <div className="mt-1 font-semibold">{r.title}</div>
                  </div>
                  <Badge tone="accent">{r.sdg.split("—")[0].trim()}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.aiSummary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <Badge tone="info">TRL {r.trl}</Badge>
                  <Badge>{r.province}</Badge>
                  <Badge tone="success">{formatPHP(r.funding)}</Badge>
                  <span className="ml-auto text-muted-foreground">{r.citations} cites</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
