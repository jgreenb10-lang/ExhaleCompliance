import React from "react";
import {
  Building2, DollarSign, AlertTriangle, Receipt, CheckCircle2, FileText,
  CalendarClock, Wrench, Handshake, ArrowRight,
} from "lucide-react";
import { C } from "../../theme";
import { TopBar, Stat, Card } from "../../components/ui";
import { money } from "../../lib/format";
import { overdueCount, dueSoonCount } from "../../lib/schedule";
import { STAGE_LABELS } from "../../data/status";

const ACTIVITY_ICON = { passed: CheckCircle2, report: FileText, scheduled: CalendarClock, vendor: Wrench, signed: Handshake };

export default function EmployeeDashboard({ sites, quotes, leads, activity, contracts, setActive, setSelectedSite, openQuote }) {
  const arr = contracts.reduce((sum, c) => sum + c.annualValue, 0);
  const overdue = overdueCount(sites);
  const dueSoon = dueSoonCount(sites);
  const openQuotes = quotes.filter((q) => q.status !== "contracted");
  const openMargin = openQuotes.reduce((sum, q) => sum + (q.clientPrice - q.vendorCost), 0);
  const activeLeads = leads.filter((l) => l.stage !== "signed" || !l.converted);

  return (
    <div>
      <TopBar title="Dashboard" subtitle="What's happening across the portfolio." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Stat label="Active sites" value={sites.length} icon={Building2} tone="brand" sub={`${sites.length} under contract`} />
        <Stat label="Annual recurring revenue" value={money(arr)} icon={DollarSign} tone="good" sub={`${contracts.length} agreements`} />
        <Stat label="Overdue checks" value={overdue} icon={AlertTriangle} tone={overdue ? "bad" : "good"} sub={`${dueSoon} due within 30 days`} />
        <Stat label="Open quote margin" value={money(openMargin)} icon={Receipt} tone="info" sub={`${openQuotes.length} open quotes`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <span className="text-sm font-medium" style={{ color: C.ink }}>Recent activity</span>
          </div>
          <div>
            {activity.length === 0 && <div className="px-5 py-8 text-sm text-center" style={{ color: C.faint }}>No activity yet.</div>}
            {activity.map((a) => {
              const Icon = ACTIVITY_ICON[a.type] || FileText;
              return (
                <div key={a.id} className="flex items-start gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
                  <span className="grid place-items-center w-8 h-8 rounded-lg shrink-0 mt-0.5" style={{ background: C.brandSoft, color: C.brand }}>
                    <Icon size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium" style={{ color: C.ink }}>{a.title}</div>
                    <div className="text-xs truncate" style={{ color: C.subtle }}>{a.detail}</div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: C.faint }}>{a.date}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              <span className="text-sm font-medium" style={{ color: C.ink }}>Leads in motion</span>
              <button onClick={() => setActive("leads")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {activeLeads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{l.name}</div>
                  <div className="text-xs" style={{ color: C.subtle }}>{STAGE_LABELS[l.stage]}</div>
                </div>
                <div className="text-sm font-medium shrink-0" style={{ color: C.ink }}>{money(l.value)}</div>
              </div>
            ))}
            {activeLeads.length === 0 && <div className="px-5 py-6 text-sm text-center" style={{ color: C.faint }}>No open leads.</div>}
          </Card>

          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              <span className="text-sm font-medium" style={{ color: C.ink }}>Needs pricing</span>
              <button onClick={() => setActive("quotes")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {quotes.filter((q) => q.status === "needs_quote").slice(0, 5).map((q) => {
              const site = sites.find((s) => s.id === q.siteId);
              return (
                <div key={q.id} className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-black/[0.02]" style={{ borderBottom: `1px solid ${C.line}` }}
                  onClick={() => openQuote(q)}>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
                    <div className="text-xs truncate" style={{ color: C.subtle }}>{site?.name}</div>
                  </div>
                  <div className="text-sm font-medium shrink-0" style={{ color: C.ink }}>{money(q.clientPrice)}</div>
                </div>
              );
            })}
            {quotes.filter((q) => q.status === "needs_quote").length === 0 && (
              <div className="px-5 py-6 text-sm text-center" style={{ color: C.faint }}>Nothing to price.</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
