import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Badge } from "@/components/ui-bits";
import { challenges } from "@/lib/mock-data";
import { ArrowUp, MessageSquare, Plus } from "lucide-react";

export const Route = createFileRoute("/problems")({
  head: () => ({
    meta: [
      { title: "Community Problem Board — CRCIT" },
      {
        name: "description",
        content:
          "Civic innovation portal where LGUs and communities post real-world challenges for Caraga researchers to solve.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Civic Innovation"
        title="Community Problem Board"
        description="LGUs and communities post real-world challenges. Researchers propose solutions."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-3 py-2 text-sm font-medium text-primary-foreground glow">
            <Plus className="h-4 w-4" /> Post a challenge
          </button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Open", challenges.filter((c) => c.status === "Open").length, "info"],
          ["In Review", challenges.filter((c) => c.status === "In Review").length, "warning"],
          ["Matched", challenges.filter((c) => c.status === "Matched").length, "success"],
          ["Total Proposals", challenges.reduce((a, b) => a + b.proposals, 0), "accent"],
        ].map(([l, v, t]) => (
          <GlassCard key={l as string} className="p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{l as string}</div>
            <div className="mt-1 flex items-end gap-2">
              <div className="text-2xl font-semibold">{v as number}</div>
              <Badge tone={t as "info"}>live</Badge>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {challenges.map((c) => (
          <GlassCard key={c.id} className="p-5 transition-all hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
              <button className="flex flex-col items-center rounded-lg border border-border bg-background/40 px-2.5 py-1.5 hover:border-primary/60">
                <ArrowUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{c.votes}</span>
              </button>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">{c.category}</Badge>
                  <Badge
                    tone={
                      c.urgency === "High"
                        ? "destructive"
                        : c.urgency === "Medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {c.urgency} urgency
                  </Badge>
                  <Badge
                    tone={
                      c.status === "Open"
                        ? "info"
                        : c.status === "Matched"
                          ? "success"
                          : "warning"
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
                <div className="mt-2 font-semibold">{c.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.lgu}</div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-3 w-3" /> {c.proposals} proposals
                  </span>
                  <button className="rounded-md border border-border px-2.5 py-1 hover:bg-muted/40">
                    Propose a solution
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
