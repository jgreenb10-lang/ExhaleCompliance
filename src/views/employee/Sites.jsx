import React, { useState } from "react";
import { ArrowLeft, Plus, Search, MapPin } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, scoreTone, ScheduleRow, PrimaryButton, EmptyState, IndustryBadge, DomainHeader } from "../../components/ui";
import { industryOf } from "../../data/catalog";
import { overallScore, scheduleForSite, groupByDomain } from "../../lib/schedule";
import { money, margin } from "../../lib/format";
import { QUOTE_STATUS_LABELS } from "../../data/status";
import { Building2 } from "lucide-react";

function SiteCard({ s, quotes, onOpen }) {
  const score = overallScore(s);
  const openQuotes = quotes.filter((qq) => qq.siteId === s.id && qq.status !== "contracted").length;
  return (
    <Card className="p-4" onClick={onOpen}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-medium" style={{ color: C.ink }}>{s.name}</div>
          <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: C.subtle }}>
            <MapPin size={12} /> {s.city}
          </div>
        </div>
        <Pill tone={scoreTone(score)}>{score}</Pill>
      </div>
      <div className="flex items-center justify-between text-xs mt-3" style={{ color: C.faint }}>
        <span>{s.assets} assets</span>
        {openQuotes > 0 && <Pill tone="warn">{openQuotes} open</Pill>}
      </div>
    </Card>
  );
}

export function SitesList({ sites, setActive, setSelectedSite, quotes }) {
  const [q, setQ] = useState("");
  const [view, setView] = useState("industry");
  const filtered = sites.filter((s) => `${s.name} ${s.city}`.toLowerCase().includes(q.toLowerCase()));
  const openSite = (id) => { setSelectedSite(id); setActive("siteDetail"); };

  const groups = {};
  filtered.forEach((s) => (groups[s.industry] ||= []).push(s));
  const byIndustry = Object.keys(groups)
    .map((key) => ({ industry: industryOf(key), sites: groups[key] }))
    .sort((a, b) => a.industry.label.localeCompare(b.industry.label));

  return (
    <div>
      <TopBar title="Sites" subtitle={`${sites.length} active locations under contract.`} />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sites..."
            className="w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
            style={{ background: C.surface, border: `1px solid ${C.line}`, color: C.ink }}
          />
        </div>
        <div className="flex gap-1">
          {[{ key: "industry", label: "By industry" }, { key: "all", label: "All sites" }].map((v) => (
            <button key={v.key} onClick={() => setView(v.key)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: view === v.key ? C.brand : "transparent",
                color: view === v.key ? "#fff" : C.subtle,
                border: `1px solid ${view === v.key ? C.brand : C.line}`,
              }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <EmptyState Icon={Building2} title="No sites found" hint="Try a different search term." />}

      {filtered.length > 0 && view === "all" && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => <SiteCard key={s.id} s={s} quotes={quotes} onOpen={() => openSite(s.id)} />)}
        </div>
      )}

      {filtered.length > 0 && view === "industry" && (
        <div className="flex flex-col gap-8">
          {byIndustry.map(({ industry, sites: group }) => (
            <div key={industry.key}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-semibold" style={{ color: C.ink }}>{industry.label}</span>
                <Pill tone="brand">{group.length}</Pill>
              </div>
              <p className="text-xs mb-3" style={{ color: C.faint }}>Regulated by {industry.regulators}</p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {group.map((s) => <SiteCard key={s.id} s={s} quotes={quotes} onOpen={() => openSite(s.id)} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteDetail({ site, quotes, setActive, openQuote, setShowNewQuote }) {
  const score = overallScore(site);
  const schedule = scheduleForSite(site);
  const grouped = groupByDomain(schedule);
  const siteQuotes = quotes.filter((q) => q.siteId === site.id);

  return (
    <div>
      <button onClick={() => setActive("sites")} className="inline-flex items-center gap-1.5 text-sm font-medium mb-4" style={{ color: C.subtle }}>
        <ArrowLeft size={15} /> Sites
      </button>
      <TopBar
        title={site.name}
        subtitle={`${site.city} · ${site.assets} tracked assets`}
        actions={<PrimaryButton onClick={() => setShowNewQuote(site.id)}><Plus size={15} /> New quote</PrimaryButton>}
      />

      <div className="mb-6">
        <IndustryBadge industry={industryOf(site.industry)} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: C.faint }}>Compliance score</div>
          <div className="font-display text-2xl" style={{ color: C.ink, fontWeight: 600 }}>{score}<span className="text-sm" style={{ color: C.faint }}>/100</span></div>
        </Card>
        <Card className="p-4">
          <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: C.faint }}>Tracked checks</div>
          <div className="font-display text-2xl" style={{ color: C.ink, fontWeight: 600 }}>{schedule.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: C.faint }}>Open quotes</div>
          <div className="font-display text-2xl" style={{ color: C.ink, fontWeight: 600 }}>{siteQuotes.filter((q) => q.status !== "contracted").length}</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 text-sm font-medium" style={{ borderBottom: `1px solid ${C.line}`, color: C.ink }}>Check schedule by compliance domain</div>
          <div>
            {grouped.map(({ domain, items }) => (
              <div key={domain.key}>
                <DomainHeader domain={domain} />
                {items.map((item) => <ScheduleRow key={item.checkKey} item={item} />)}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 text-sm font-medium" style={{ borderBottom: `1px solid ${C.line}`, color: C.ink }}>Quotes</div>
          <div>
            {siteQuotes.map((q) => (
              <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-3 cursor-pointer hover:bg-black/[0.02]"
                style={{ borderBottom: `1px solid ${C.line}` }} onClick={() => openQuote(q)}>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
                  <div className="text-xs" style={{ color: C.subtle }}>{money(margin(q))} margin</div>
                </div>
                <Pill tone="brand">{QUOTE_STATUS_LABELS[q.status]}</Pill>
              </div>
            ))}
            {siteQuotes.length === 0 && <div className="px-5 py-6 text-sm text-center" style={{ color: C.faint }}>No quotes yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function QuotesView({ sites, quotes, openQuote, setShowNewQuote }) {
  const total = quotes.reduce((sum, q) => sum + margin(q), 0);
  return (
    <div>
      <TopBar
        title="Quotes"
        subtitle={`${quotes.length} quotes · ${money(total)} total margin`}
        actions={<PrimaryButton onClick={() => setShowNewQuote(sites[0]?.id)}><Plus size={15} /> New quote</PrimaryButton>}
      />
      <Card className="p-0 overflow-hidden">
        {quotes.map((q) => {
          const site = sites.find((s) => s.id === q.siteId);
          return (
            <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-3 cursor-pointer hover:bg-black/[0.02]"
              style={{ borderBottom: `1px solid ${C.line}` }} onClick={() => openQuote(q)}>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
                <div className="text-xs truncate" style={{ color: C.subtle }}>{site?.name}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium" style={{ color: C.ink }}>{money(margin(q))}</span>
                <Pill tone="brand">{QUOTE_STATUS_LABELS[q.status]}</Pill>
              </div>
            </div>
          );
        })}
        {quotes.length === 0 && <EmptyState title="No quotes yet" hint="New quotes will show up here." />}
      </Card>
    </div>
  );
}
