import React from "react";
import { ArrowRight, Plus, FileText, CalendarClock, MessageSquarePlus, Download, Clock, MapPin } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, Stat, PrimaryButton, ScoreRing, ScheduleRow, EmptyState, IndustryBadge } from "../../components/ui";
import { overallScore, scheduleForSite } from "../../lib/schedule";
import { money, margin, fmtDate } from "../../lib/format";
import { QUOTE_STATUS_LABELS } from "../../data/status";
import { industryOf } from "../../data/catalog";

function SiteSwitcher({ sites, activeSiteId, onSwitchSite }) {
  if (!sites || sites.length < 2) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {sites.map((s) => {
        const isActive = s.id === activeSiteId;
        return (
          <button
            key={s.id}
            onClick={() => onSwitchSite(s.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{
              background: isActive ? C.brand : C.surface,
              color: isActive ? "#fff" : C.ink,
              border: `1px solid ${isActive ? C.brand : C.line}`,
            }}
          >
            <MapPin size={13} /> {s.name}
          </button>
        );
      })}
    </div>
  );
}

export function ClientDashboard({ site, sites, activeSiteId, onSwitchSite, quotes, setShowNewQuote, setActive }) {
  const score = overallScore(site);
  const schedule = scheduleForSite(site);
  const overdue = schedule.filter((s) => s.status === "overdue");
  const upcoming = schedule.filter((s) => s.status !== "ok").slice(0, 4);
  const openRequests = quotes.filter((q) => q.siteId === site.id && q.status !== "contracted");

  const statusTone = overdue.length > 0 ? "bad" : upcoming.length > 0 ? "warn" : "good";
  const statusColor = statusTone === "bad" ? C.bad : statusTone === "warn" ? C.warn : C.good;
  const statusText = overdue.length > 0
    ? `${overdue.length} check${overdue.length === 1 ? " is" : "s are"} overdue — action recommended.`
    : upcoming.length > 0
      ? `In good standing. ${upcoming.length} check${upcoming.length === 1 ? "" : "s"} due soon.`
      : "In good standing. Nothing due or overdue.";

  return (
    <div>
      <TopBar
        title={site.name}
        subtitle={site.city}
        actions={<PrimaryButton onClick={() => setShowNewQuote(site.id)}><Plus size={15} /> Request service</PrimaryButton>}
      />

      <SiteSwitcher sites={sites} activeSiteId={activeSiteId} onSwitchSite={onSwitchSite} />

      <div className="mb-6">
        <IndustryBadge industry={industryOf(site.industry)} />
      </div>

      <Card className="p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ScoreRing value={score} label="Compliance" tone={statusTone} />
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="text-base font-medium mb-3" style={{ color: statusColor }}>{statusText}</div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Needs attention" value={upcoming.length} icon={CalendarClock} tone={upcoming.length ? "warn" : "good"} sub="Due or overdue" onClick={() => setActive("schedule")} />
              <Stat label="Open requests" value={openRequests.length} icon={FileText} tone="info" sub="In progress" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
          <span className="text-sm font-medium" style={{ color: C.ink }}>What's coming up</span>
          <button onClick={() => setActive("schedule")} className="text-xs font-medium inline-flex items-center gap-1" style={{ color: C.brand }}>
            Full schedule <ArrowRight size={13} />
          </button>
        </div>
        {upcoming.map((item) => <ScheduleRow key={item.checkKey} item={item} />)}
        {upcoming.length === 0 && <div className="px-5 py-8 text-sm text-center" style={{ color: C.faint }}>Everything is on track.</div>}
      </Card>
    </div>
  );
}

export function ClientRequests({ site, quotes, setShowNewQuote }) {
  const requests = quotes.filter((q) => q.siteId === site.id);
  return (
    <div>
      <TopBar title="Requests" subtitle="Service requests and their status."
        actions={<PrimaryButton onClick={() => setShowNewQuote(site.id)}><MessageSquarePlus size={15} /> New request</PrimaryButton>} />
      <Card className="p-0 overflow-hidden">
        {requests.map((q) => (
          <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
              <div className="text-xs mt-0.5 truncate" style={{ color: C.subtle }}>{q.description}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-medium" style={{ color: C.ink }}>{money(q.clientPrice)}</span>
              <Pill tone="brand">{QUOTE_STATUS_LABELS[q.status]}</Pill>
            </div>
          </div>
        ))}
        {requests.length === 0 && <EmptyState Icon={FileText} title="No requests yet" hint="Requests you submit will show up here." />}
      </Card>
    </div>
  );
}

const DOCS = [
  { name: "Certificate of Insurance", updated: "Jan 3, 2026" },
  { name: "Signed Service Agreement", updated: "Jun 1, 2024" },
  { name: "Most Recent Inspection Reports", updated: "Jun 12, 2026" },
  { name: "Compliance Summary", updated: "May 4, 2026" },
  { name: "Site Photo Documentation", updated: "Feb 20, 2026" },
];

export function ClientDocuments({ site }) {
  return (
    <div>
      <TopBar title="Documents" subtitle={site ? `Certificates and inspection records for ${site.name}.` : "Certificates and inspection records on file."} />
      <Card className="p-0 overflow-hidden">
        {DOCS.map((d) => (
          <div key={d.name} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid place-items-center w-9 h-9 rounded-lg shrink-0" style={{ background: C.brandSoft, color: C.brand }}>
                <FileText size={16} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{d.name}</div>
                <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: C.faint }}>
                  <Clock size={11} /> Updated {d.updated}
                </div>
              </div>
            </div>
            <button className="grid place-items-center w-8 h-8 rounded-lg shrink-0" style={{ color: C.faint, border: `1px solid ${C.line}` }} disabled title="Placeholder — no file storage yet">
              <Download size={14} />
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
