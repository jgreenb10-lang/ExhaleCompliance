import React from "react";
import { Check, X, CheckCircle2, Wallet, Briefcase, MapPin, User, Phone } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, Stat, EmptyState } from "../../components/ui";
import { money, fmtDate } from "../../lib/format";

function jobsForVendor(vendor, quotes) {
  return quotes.filter((q) => q.vendorId === vendor.id || q.vendor === vendor.name);
}

export function VendorJobsView({ vendor, quotes, sites, onRespond, onComplete }) {
  const jobs = jobsForVendor(vendor, quotes);
  const offered = jobs.filter((q) => q.vendorStatus === "offered");
  const accepted = jobs.filter((q) => q.vendorStatus === "accepted");
  const other = jobs.filter((q) => !["offered", "accepted"].includes(q.vendorStatus));

  const JobRow = ({ q, actions }) => {
    const site = sites.find((s) => s.id === q.siteId);
    const contact = site?.contact;
    return (
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
            <div className="text-xs mt-0.5" style={{ color: C.subtle }}>{site?.name} · due {fmtDate(q.dueDate)}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium" style={{ color: C.ink }}>{money(q.vendorCost)}</span>
            {actions}
          </div>
        </div>
        {(site?.address || contact) && (
          <div className="flex flex-col gap-1 mt-2 rounded-lg px-3 py-2" style={{ background: C.paper }}>
            {site?.address && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: C.subtle }}>
                <MapPin size={12} style={{ color: C.faint }} className="shrink-0" />
                <span className="truncate">{site.address}</span>
              </div>
            )}
            {contact && (
              <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: C.subtle }}>
                <span className="flex items-center gap-1.5">
                  <User size={12} style={{ color: C.faint }} className="shrink-0" />
                  {contact.name}{contact.role ? ` · ${contact.role}` : ""}
                </span>
                {contact.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} style={{ color: C.faint }} className="shrink-0" />
                    {contact.phone}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <TopBar title="Jobs" subtitle={`Work offered and in progress for ${vendor.name}.`} />

      {offered.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-medium uppercase tracking-wide mb-2 px-1" style={{ color: C.faint }}>New offers</div>
          <Card className="p-0 overflow-hidden">
            {offered.map((q) => (
              <JobRow key={q.id} q={q} actions={
                <div className="flex gap-1.5">
                  <button onClick={() => onRespond(q.id, "declined")} className="grid place-items-center w-8 h-8 rounded-lg" style={{ border: `1px solid ${C.line}`, color: C.bad }}><X size={15} /></button>
                  <button onClick={() => onRespond(q.id, "accepted")} className="grid place-items-center w-8 h-8 rounded-lg text-white" style={{ background: C.brand }}><Check size={15} /></button>
                </div>
              } />
            ))}
          </Card>
        </div>
      )}

      {accepted.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-medium uppercase tracking-wide mb-2 px-1" style={{ color: C.faint }}>Accepted — in progress</div>
          <Card className="p-0 overflow-hidden">
            {accepted.map((q) => (
              <JobRow key={q.id} q={q} actions={
                <button onClick={() => onComplete(q.id)} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md text-white" style={{ background: C.good }}>
                  <CheckCircle2 size={13} /> Mark complete
                </button>
              } />
            ))}
          </Card>
        </div>
      )}

      <div>
        <div className="text-xs font-medium uppercase tracking-wide mb-2 px-1" style={{ color: C.faint }}>History</div>
        <Card className="p-0 overflow-hidden">
          {other.map((q) => (
            <JobRow key={q.id} q={q} actions={
              <Pill tone={q.vendorStatus === "completed" ? "good" : q.vendorStatus === "declined" ? "bad" : "brand"}>{q.vendorStatus}</Pill>
            } />
          ))}
          {other.length === 0 && <EmptyState Icon={Briefcase} title="No history yet" hint="Completed and declined jobs will show up here." />}
        </Card>
      </div>
    </div>
  );
}

export function VendorEarningsView({ vendor, quotes, sites }) {
  const jobs = jobsForVendor(vendor, quotes);
  const completed = jobs.filter((q) => q.vendorStatus === "completed");
  const pending = jobs.filter((q) => q.vendorStatus === "accepted");
  const totalEarned = completed.reduce((sum, q) => sum + q.vendorCost, 0);
  const totalPending = pending.reduce((sum, q) => sum + q.vendorCost, 0);

  return (
    <div>
      <TopBar title="Earnings" subtitle={`Payout history for ${vendor.name}.`} />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Stat label="Total earned" value={money(totalEarned)} icon={Wallet} tone="good" sub={`${completed.length} completed jobs`} />
        <Stat label="In progress" value={money(totalPending)} icon={Briefcase} tone="info" sub={`${pending.length} accepted jobs`} />
      </div>
      <Card className="p-0 overflow-hidden">
        {completed.map((q) => {
          const site = sites.find((s) => s.id === q.siteId);
          return (
            <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
                <div className="text-xs mt-0.5" style={{ color: C.subtle }}>{site?.name}</div>
              </div>
              <span className="text-sm font-medium shrink-0" style={{ color: C.good }}>+{money(q.vendorCost)}</span>
            </div>
          );
        })}
        {completed.length === 0 && <EmptyState Icon={Wallet} title="No earnings yet" hint="Completed jobs will appear here with payout amounts." />}
      </Card>
    </div>
  );
}
