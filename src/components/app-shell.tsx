import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Users2,
  MessageSquareWarning,
  BookOpen,
  GitBranch,
  Trophy,
  Sparkles,
  Search,
  Bell,
  Command,
} from "lucide-react";
import { type ReactNode } from "react";

const nav = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/repository", label: "Research Repository", icon: Database },
  { to: "/impact", label: "Impact Dashboard", icon: BarChart3 },
  { to: "/collaboration", label: "AI Collaboration", icon: Users2 },
  { to: "/problems", label: "Community Problems", icon: MessageSquareWarning },
  { to: "/publications", label: "Publications", icon: BookOpen },
  { to: "/pipeline", label: "Tech Transfer", icon: GitBranch },
  { to: "/impact-index", label: "Impact Index", icon: Trophy },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">CRCIT</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              DOST Caraga
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {nav.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "bg-sidebar-accent text-foreground shadow-elegant"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? "text-primary" : "group-hover:text-primary",
                  ].join(" ")}
                />
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-3">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">AI Co-pilot</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
            Ask anything about Caraga research, gaps, and opportunities.
          </p>
          <button className="mt-2 w-full rounded-md bg-gradient-primary px-2 py-1.5 text-[11px] font-medium text-primary-foreground">
            Open Co-pilot
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border/60 glass-strong">
          <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search research, researchers, LGUs, technologies…"
                className="w-full max-w-xl rounded-lg border border-border bg-background/40 py-2 pl-9 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
              />
              <kbd className="absolute right-3 hidden items-center gap-1 rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:flex">
                <Command className="h-3 w-3" /> K
              </kbd>
            </div>
            <button className="rounded-lg border border-border p-2 hover:bg-muted/50">
              <Bell className="h-4 w-4" />
            </button>
            <div className="hidden items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 sm:flex">
              <div className="h-7 w-7 rounded-full bg-gradient-aurora" />
              <div className="leading-tight">
                <div className="text-xs font-medium">DOST Admin</div>
                <div className="text-[10px] text-muted-foreground">Caraga RO</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
