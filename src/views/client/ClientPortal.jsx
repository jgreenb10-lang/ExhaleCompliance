import React from "react";
import { ArrowRight, Plus, FileText, ShieldCheck, CalendarClock, MessageSquarePlus, Download, Clock } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, Stat, PrimaryButton, scoreTone, ScheduleRow, EmptyState } from "../../components/ui";
import { overallScore, scheduleForSite } from "../../lib/schedule";
import { money, margin, fmtDate } from "../../lib/format";
import { QUOTE_STATUS_LABELS } from "../../data/status";
import { industryOf } from "../../data/catalog";

export function ClientDashboard({ site, quotes, setShowNewQuote, setActive }) {
  const score = overallScore(site);
  const schedule = scheduleForSite(site);
  const upcoming = schedule.filter((s) => s.status !== "ok").slice(0, 5);
  const openRequests = quotes.filter((q) => q.siteId === site.id && q.status !== "contracted");

  return (
    <div>
      <TopBar
        title={site.name}
        subtitle={`${site.city} · ${industryOf(site.industry).label}`}
        actions={<PrimaryButton onClick={() => setShowNewQuote(site.id)}><Plus size={15} /> Request service</PrimaryButton>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Stat label="Compliance score" value={score} icon={ShieldCheck} tone={scoreTone(score)} sub="Across all tracked checks" />
        <Stat label="Needs attention" value={upcoming.length} icon={CalendarClock} tone={upcoming.length ? "warn" : "good"} sub="Checks due or overdue" />
        <Stat label="Open requests" value={openRequests.length} icon={FileText} tone="info" sub="In progress with Exhale" />
      </div>

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
  { name: "Fire Extinguisher Inspection Reports", updated: "Jun 12, 2026" },
  { name: "Ansul System Service Records", updated: "Feb 20, 2026" },
  { name: "Health Department Self-Audit", updated: "May 4, 2026" },
  { name: "Signed Service Agreement", updated: "Jun 1, 2024" },
];

export function ClientDocuments() {
  return (
    <div>
      <TopBar title="Documents" subtitle="Certificates and inspection records on file." />
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
