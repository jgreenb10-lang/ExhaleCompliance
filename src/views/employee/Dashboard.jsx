import React from "react";
import {
  Building2, DollarSign, AlertTriangle, Receipt, CheckCircle2, FileText,
  CalendarClock, Wrench, Handshake, ArrowRight, Users, Share2, RefreshCw, ShieldCheck,
} from "lucide-react";
import { C } from "../../theme";
import { TopBar, Stat, Card, Pill, StatusBanner } from "../../components/ui";
import { money, fmtDateLong } from "../../lib/format";
import { overdueCount, dueSoonCount, contractStatus, scheduleForSites } from "../../lib/schedule";
import { STAGE_LABELS } from "../../data/status";

const ACTIVITY_ICON = { passed: CheckCircle2, report: FileText, scheduled: CalendarClock, vendor: Wrench, signed: Handshake };

const QUICK_LINKS = [
  { key: "leads", label: "Leads", icon: Users },
  { key: "schedule", label: "Schedule", icon: CalendarClock },
  { key: "quotes", label: "Quotes", icon: Receipt },
  { key: "network", label: "Network", icon: Share2 },
];

function SectionCard({ title, action, children, empty }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        <span className="text-sm font-medium" style={{ color: C.ink }}>{title}</span>
        {action}
      </div>
      {children}
      {empty}
    </Card>
  );
}

export default function EmployeeDashboard({ sites, quotes, leads, activity, contracts, setActive, setSelectedSite, openQuote }) {
  const arr = contracts.reduce((sum, c) => sum + c.annualValue, 0);
  const overdue = overdueCount(sites);
  const dueSoon = dueSoonCount(sites);
  const openQuotes = quotes.filter((q) => q.status !== "contracted");
  const openMargin = openQuotes.reduce((sum, q) => sum + (q.clientPrice - q.vendorCost), 0);
  const activeLeads = leads.filter((l) => l.stage !== "signed" || !l.converted);
  const needsPricing = quotes.filter((q) => q.status === "needs_quote");
  const renewingSoon = contracts.filter((c) => contractStatus(c) === "renewing");
  const worstOverdue = scheduleForSites(sites).filter((s) => s.status === "overdue").slice(0, 5);

  const goToSite = (siteId) => { setSelectedSite(siteId); setActive("siteDetail"); };

  const bannerTone = overdue > 0 ? "bad" : dueSoon > 10 ? "warn" : "good";
  const bannerIcon = overdue > 0 ? AlertTriangle : ShieldCheck;
  const bannerText = overdue > 0
    ? `${overdue} check${overdue === 1 ? "" : "s"} across the portfolio ${overdue === 1 ? "is" : "are"} overdue and need scheduling.`
    : dueSoon > 0
      ? `Portfolio is on track. ${dueSoon} check${dueSoon === 1 ? "" : "s"} due in the next 30 days.`
      : "Portfolio is fully on track — nothing overdue or due soon.";

  return (
    <div>
      <TopBar
        title="Dashboard"
        subtitle={fmtDateLong(new Date())}
        actions={
          <div className="hidden sm:flex items-center gap-1">
            {QUICK_LINKS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-black/[0.03]"
                style={{ color: C.subtle }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        }
      />

      <StatusBanner tone={bannerTone} icon={bannerIcon}>{bannerText}</StatusBanner>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Stat label="Active sites" value={sites.length} icon={Building2} tone="brand" sub={`${sites.length} under contract`} onClick={() => setActive("sites")} />
        <Stat label="Annual recurring revenue" value={money(arr)} icon={DollarSign} tone="good" sub={`${contracts.length} agreements`} onClick={() => setActive("contracts")} />
        <Stat label="Overdue checks" value={overdue} icon={AlertTriangle} tone={overdue ? "bad" : "good"} sub={`${dueSoon} due within 30 days`} onClick={() => setActive("schedule")} />
        <Stat label="Open quote margin" value={money(openMargin)} icon={Receipt} tone="info" sub={`${openQuotes.length} open quotes`} onClick={() => setActive("quotes")} />
      </div>

      {worstOverdue.length > 0 && (
        <Card className="p-0 overflow-hidden mb-6">
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <AlertTriangle size={16} style={{ color: C.bad }} />
            <span className="text-sm font-medium" style={{ color: C.ink }}>Most overdue</span>
          </div>
          {worstOverdue.map((item) => (
            <div key={`${item.siteId}-${item.checkKey}`} className="flex items-center justify-between gap-3 px-5 py-3 cursor-pointer hover:bg-black/[0.02]"
              style={{ borderBottom: `1px solid ${C.line}` }} onClick={() => goToSite(item.siteId)}>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{item.check.label}</div>
                <div className="text-xs truncate" style={{ color: C.subtle }}>{item.siteName}</div>
              </div>
              <Pill tone="bad">{Math.abs(item.daysUntilDue)}d overdue</Pill>
            </div>
          ))}
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        <SectionCard title="Recent activity">
          <div>
            {activity.length === 0 && <div className="px-5 py-8 text-sm text-center" style={{ color: C.faint }}>No activity yet.</div>}
            {activity.slice(0, 6).map((a) => {
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
        </SectionCard>

        <div className="flex flex-col gap-4 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:items-start">
          <SectionCard title="Leads in motion" action={
            <button onClick={() => setActive("leads")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
              View all <ArrowRight size={13} />
            </button>
          }>
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
          </SectionCard>

          <SectionCard title="Needs pricing" action={
            <button onClick={() => setActive("quotes")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
              View all <ArrowRight size={13} />
            </button>
          }>
            {needsPricing.slice(0, 5).map((q) => {
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
            {needsPricing.length === 0 && <div className="px-5 py-6 text-sm text-center" style={{ color: C.faint }}>Nothing to price.</div>}
          </SectionCard>

          <SectionCard title="Renewals due soon" action={
            <button onClick={() => setActive("contracts")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
              View all <ArrowRight size={13} />
            </button>
          }>
            {renewingSoon.slice(0, 5).map((c) => {
              const site = sites.find((s) => s.id === c.siteId);
              return (
                <div key={c.id} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
                  <div className="min-w-0 flex items-center gap-2">
                    <RefreshCw size={13} style={{ color: C.warn }} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{site?.name}</div>
                      <div className="text-xs" style={{ color: C.subtle }}>renews {fmtDateLong(c.renewsOn)}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium shrink-0" style={{ color: C.ink }}>{money(c.annualValue)}/yr</div>
                </div>
              );
            })}
            {renewingSoon.length === 0 && <div className="px-5 py-6 text-sm text-center" style={{ color: C.faint }}>Nothing renewing in the next 90 days.</div>}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
