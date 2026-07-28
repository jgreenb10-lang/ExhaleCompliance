import React, { useState } from "react";
import { RefreshCw, Filter } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, ScheduleRow, EmptyState, DomainHeader } from "../../components/ui";
import { CalendarClock } from "lucide-react";
import { contractStatus, scheduleForSites, groupByDomain } from "../../lib/schedule";
import { money, fmtDate } from "../../lib/format";
import { CONTRACT_STATUS_LABELS } from "../../data/status";

const STATUS_TONE = { active: "good", renewing: "warn", expired: "bad" };

export function ContractsView({ contracts, sites, renewContract }) {
  const arr = contracts.reduce((sum, c) => sum + c.annualValue, 0);
  return (
    <div>
      <TopBar title="Contracts" subtitle={`${contracts.length} agreements · ${money(arr)} ARR`} />
      <Card className="p-0 overflow-hidden">
        {contracts.map((c) => {
          const site = sites.find((s) => s.id === c.siteId);
          const status = contractStatus(c);
          return (
            <div key={c.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{site?.name}</div>
                <div className="text-xs mt-0.5" style={{ color: C.subtle }}>
                  {c.termYears} yr term · started {c.startedOn} · renews {fmtDateFull(c.renewsOn)}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium" style={{ color: C.ink }}>{money(c.annualValue)}/yr</span>
                <Pill tone={STATUS_TONE[status]}>{CONTRACT_STATUS_LABELS[status]}</Pill>
                {(status === "renewing" || status === "expired") && (
                  <button onClick={() => renewContract(c)} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md"
                    style={{ border: `1px solid ${C.line}`, color: C.brand }}>
                    <RefreshCw size={12} /> Renew
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {contracts.length === 0 && <EmptyState title="No contracts yet" hint="Convert a signed lead to create one." />}
      </Card>
    </div>
  );
}

function fmtDateFull(d) {
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ScheduleView({ sites, setActive, setSelectedSite, clientMode }) {
  const [filter, setFilter] = useState("all");
  const items = scheduleForSites(sites).filter((i) => filter === "all" || i.status === filter);
  const grouped = groupByDomain(items);

  const goToSite = clientMode ? undefined : (siteId) => { setSelectedSite(siteId); setActive("siteDetail"); };

  return (
    <div>
      <TopBar title="Schedule" subtitle={clientMode ? "Your upcoming compliance checks, grouped by domain." : "Every recurring check across the portfolio, grouped by compliance domain."} />

      <div className="flex items-center gap-2 mb-4">
        <Filter size={14} style={{ color: C.faint }} />
        {["all", "overdue", "dueSoon", "ok"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
            style={{
              background: filter === f ? C.brand : "transparent",
              color: filter === f ? "#fff" : C.subtle,
              border: `1px solid ${filter === f ? C.brand : C.line}`,
            }}>
            {f === "dueSoon" ? "Due soon" : f === "ok" ? "On track" : f}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        {grouped.map(({ domain, items: domainItems }) => (
          <div key={domain.key}>
            <DomainHeader domain={domain} />
            {domainItems.map((item) => (
              <ScheduleRow key={`${item.siteId}-${item.checkKey}`} item={item} onClick={goToSite ? () => goToSite(item.siteId) : undefined} />
            ))}
          </div>
        ))}
        {items.length === 0 && <EmptyState Icon={CalendarClock} title="Nothing here" hint="No checks match this filter." />}
      </Card>
    </div>
  );
}
