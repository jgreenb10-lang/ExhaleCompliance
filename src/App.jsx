/* Application shell: owns all state and routes between the three portals.
   Swap the useState seeds for API calls to move this onto a backend. */

import React, { useState } from "react";
import { Building2, Wrench } from "lucide-react";
import { C, FONT_IMPORT } from "./theme";
import { STAGE_ORDER } from "./data/status";
import { industryOf, checkOf } from "./data/catalog";
import { TODAY, contractStatus } from "./lib/schedule";
import { fmtDate, money } from "./lib/format";
import { quotesFromFindings } from "./lib/quotes";
import {
  initialSites, initialVendors, initialRecruits, initialQuotes,
  initialLeads, initialContracts, initialActivity, initialBids, CLIENT_ID,
} from "./data/seed";
import PortalPicker from "./components/PortalPicker";
import { Sidebar, MobileHeader, BottomNav } from "./components/Nav";
import { EmptyState } from "./components/ui";
import { QuotePanel, NewQuoteModal } from "./components/quotes";
import EmployeeDashboard from "./views/employee/Dashboard";
import { SitesList, SiteDetail, QuotesView } from "./views/employee/Sites";
import { LeadsBoard, NewLeadModal } from "./views/employee/Leads";
import { ContractsView, ScheduleView } from "./views/employee/Contracts";
import NetworkView from "./views/employee/Network";
import { VendorJobsView, VendorEarningsView } from "./views/vendor/VendorPortal";
import { MarketplaceView } from "./views/vendor/Marketplace";
import { ClientDashboard, ClientRequests, ClientDocuments } from "./views/client/ClientPortal";

export default function App() {
  const [role, setRole] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [sites, setSites] = useState(initialSites);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [leads, setLeads] = useState(initialLeads);
  const [vendors, setVendors] = useState(initialVendors);
  const [recruits, setRecruits] = useState(initialRecruits);
  const [activity, setActivity] = useState(initialActivity);
  const [contracts, setContracts] = useState(initialContracts);
  const [bids, setBids] = useState(initialBids);
  const VENDOR_IDENTITY_ID = 2; // Redline Fire & Safety
  const [selectedSiteId, setSelectedSite] = useState(null);
  const [openedQuote, setOpenedQuote] = useState(null);
  const [showNewQuoteFor, setShowNewQuoteFor] = useState(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [clientSiteId, setClientSiteId] = useState(null);

  if (!role) return <PortalPicker onEnter={(m) => { setRole(m); setActive(m === "vendor" ? "jobs" : "dashboard"); }} />;

  const logActivity = (type, title, detail) =>
    setActivity(a => [{ id: Date.now() + Math.random(), type, title, detail, date: fmtDate(TODAY) + ", 2026" }, ...a].slice(0, 12));

  const updateQuote = (updated) => {
    setQuotes(qs => qs.map(q => q.id === updated.id ? updated : q));
    setOpenedQuote(updated);
    const site = sites.find(s => s.id === updated.siteId);
    if (updated.status === "contracted") logActivity("signed", "Work contracted out", `${site?.name || "Site"} — ${updated.vendor || "vendor"}`);
    else if (updated.status === "requested") logActivity("scheduled", "Quote requested from vendor", `${site?.name || "Site"} — ${checkOf(updated.category).label}`);
  };
  const createQuote = (q) => {
    setQuotes(qs => [q, ...qs]);
    const site = sites.find(s => s.id === q.siteId);
    logActivity("report", "New quote request", `${site?.name || "Site"} — ${q.title}`);
  };
  const createLead = (l) => {
    setLeads(ls => [l, ...ls]);
    logActivity("report", "New lead added", `${l.name} — ${industryOf(l.industry).label}`);
  };
  const advanceLead = (lead) => {
    const idx = STAGE_ORDER.indexOf(lead.stage);
    if (idx < STAGE_ORDER.length - 1) {
      setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, stage: STAGE_ORDER[idx + 1] } : l));
    }
  };
  const convertLead = (lead) => {
    const ind = industryOf(lead.industry);
    const newSite = {
      id: Date.now(),
      name: lead.name,
      city: lead.city,
      industry: lead.industry,
      assets: Math.max(4, Math.round(lead.value / 500)),
      categories: Object.fromEntries(ind.checks.map(k => [k, 92])),
    };
    setSites(bs => [...bs, newSite]);
    setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, converted: true } : l));

    // findings captured during the free audit become the first quotes on the new site
    const findings = lead.findings || [];
    if (findings.length) {
      setQuotes(qs => [...quotesFromFindings(findings, newSite.id), ...qs]);
    }

    const term = lead.termYears || 3;
    const renews = new Date(TODAY);
    renews.setFullYear(renews.getFullYear() + term);
    setContracts(cs => [...cs, {
      id: Date.now(),
      siteId: newSite.id,
      termYears: term,
      startedOn: TODAY.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      renewsOn: renews,
      annualValue: lead.value,
      checks: ind.checks,
    }]);
    logActivity("signed", `Agreement signed · ${term} yr`, `${lead.name} — ${money(lead.value)}/yr`);
  };

  const addRecruit = (r) => setRecruits(rs => [r, ...rs]);

  /* --- field audit + proposal --- */
  const completeAudit = (lead, results, findings) => {
    setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, audit: results, findings, stage: "audit_complete" } : l));
    logActivity("report", "Free audit completed", `${lead.name} — ${findings.length} findings`);
    // If this prospect is already an active site, remediation goes straight onto the board.
    // Otherwise the findings ride along on the lead and become quotes at conversion.
    const site = sites.find(s => s.name === lead.name);
    if (site && findings.length) {
      setQuotes(qs => [...quotesFromFindings(findings, site.id), ...qs]);
    }
  };
  const sendProposal = (lead) => {
    setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, stage: "proposal_sent" } : l));
    logActivity("report", "Proposal sent", lead.name);
  };
  const signProposal = (lead, term) => {
    setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, stage: "signed", termYears: term } : l));
    logActivity("signed", `Signed on site · ${term} yr`, lead.name);
  };

  /* --- contracts --- */
  const renewContract = (contract) => {
    const next = new Date(contract.renewsOn);
    next.setFullYear(next.getFullYear() + contract.termYears);
    setContracts(cs => cs.map(c => c.id === contract.id ? { ...c, renewsOn: next } : c));
    const site = sites.find(s => s.id === contract.siteId);
    logActivity("signed", "Agreement renewed", `${site?.name || "Site"} — ${contract.termYears} yr`);
  };

  /* --- vendor portal --- */
  const respondToJob = (quoteId, vendorStatus) => {
    setQuotes(qs => qs.map(q => q.id === quoteId ? { ...q, vendorStatus } : q));
    const q = quotes.find(x => x.id === quoteId);
    logActivity("vendor", vendorStatus === "accepted" ? "Vendor accepted job" : "Vendor declined job", q?.title || "");
  };
  const completeJob = (quoteId) => {
    setQuotes(qs => qs.map(q => q.id === quoteId ? { ...q, vendorStatus: "completed" } : q));
    const q = quotes.find(x => x.id === quoteId);
    logActivity("passed", "Job completed", q?.title || "");
  };

  /* --- vendor marketplace: unassigned quotes post to every matching vendor,
     who bid instead of waiting to be manually assigned --- */
  const submitBid = (quoteId, vendorId, amount, note) => {
    const vendor = vendors.find(v => v.id === vendorId);
    const q = quotes.find(x => x.id === quoteId);
    setBids(bs => {
      const existing = bs.find(b => b.quoteId === quoteId && b.vendorId === vendorId);
      const entry = { id: existing?.id ?? Date.now(), quoteId, vendorId, vendorName: vendor?.name, amount, note, submittedAt: fmtDate(TODAY) };
      return existing ? bs.map(b => (b.quoteId === quoteId && b.vendorId === vendorId ? entry : b)) : [...bs, entry];
    });
    logActivity("vendor", "New bid submitted", `${vendor?.name} — ${q?.title || ""}`);
  };
  const awardBid = (bid) => {
    setQuotes(qs => qs.map(q => q.id === bid.quoteId
      ? { ...q, vendorId: bid.vendorId, vendor: bid.vendorName, vendorCost: bid.amount, vendorStatus: "accepted" }
      : q));
    setBids(bs => bs.filter(b => b.quoteId !== bid.quoteId));
    const q = quotes.find(x => x.id === bid.quoteId);
    logActivity("vendor", "Bid awarded", `${bid.vendorName} — ${q?.title || ""}`);
  };

  const setRecruitStatus = (id, status) => setRecruits(rs => rs.map(r => {
    if (r.id !== id) return r;
    if (status === "invited") logActivity("vendor", "Invite email sent", r.company);
    if (status === "accepted") logActivity("vendor", "Vendor accepted invite", r.company);
    return { ...r, status, invitedAt: status === "invited" ? (r.invitedAt || fmtDate(TODAY)) : r.invitedAt };
  }));
  const activateVendor = (recruit, rate, capacity) => {
    const newVendor = { id: Date.now(), name: recruit.company, checks: recruit.checks, rate, capacity, type: "subcontractor", rating: 5.0 };
    setVendors(vs => [...vs, newVendor]);
    setRecruits(rs => rs.map(r => r.id === recruit.id ? { ...r, status: "active" } : r));
    logActivity("vendor", "Vendor activated", `${recruit.company} — $${rate}/check`);
  };

  const clientSites = sites.filter(b => b.clientId === CLIENT_ID);
  const clientSite = clientSites.find(b => b.id === clientSiteId) || clientSites[0];
  const selectedSite = sites.find(b => b.id === selectedSiteId);
  const logout = () => { setRole(null); setSelectedSite(null); setActive("dashboard"); };

  let content;
  if (role === "employee") {
    if (active === "dashboard") content = <EmployeeDashboard sites={sites} quotes={quotes} leads={leads} activity={activity} contracts={contracts} setActive={setActive} setSelectedSite={setSelectedSite} openQuote={setOpenedQuote} />;
    else if (active === "sites") content = <SitesList sites={sites} setActive={setActive} setSelectedSite={setSelectedSite} quotes={quotes} />;
    else if (active === "schedule") content = <ScheduleView sites={sites} setActive={setActive} setSelectedSite={setSelectedSite} />;
    else if (active === "siteDetail") content = selectedSite
      ? <SiteDetail site={selectedSite} quotes={quotes} setActive={setActive} openQuote={setOpenedQuote} setShowNewQuote={setShowNewQuoteFor} />
      : <EmptyState Icon={Building2} title="Site not found" hint="Head back to Sites to pick a location." />;
    else if (active === "leads") content = <LeadsBoard leads={leads} setShowNewLead={setShowNewLead} advanceLead={advanceLead} convertLead={convertLead} completeAudit={completeAudit} sendProposal={sendProposal} signProposal={signProposal} />;
    else if (active === "contracts") content = <ContractsView contracts={contracts} sites={sites} renewContract={renewContract} />;
    else if (active === "quotes") content = <QuotesView sites={sites} quotes={quotes} openQuote={setOpenedQuote} setShowNewQuote={setShowNewQuoteFor} />;
    else if (active === "network") content = <NetworkView vendors={vendors} quotes={quotes} recruits={recruits} addRecruit={addRecruit} setRecruitStatus={setRecruitStatus} activateVendor={activateVendor} />;
  } else if (role === "vendor") {
    const me = vendors.find(v => v.id === VENDOR_IDENTITY_ID) || vendors[0];
    if (!me) content = <EmptyState Icon={Wrench} title="Vendor account not found" hint="Contact Exhale to get your account linked." />;
    else if (active === "earnings") content = <VendorEarningsView vendor={me} quotes={quotes} sites={sites} />;
    else if (active === "marketplace") content = <MarketplaceView vendor={me} quotes={quotes} sites={sites} bids={bids} onBid={submitBid} />;
    else content = <VendorJobsView vendor={me} quotes={quotes} sites={sites} onRespond={respondToJob} onComplete={completeJob} />;
  } else if (!clientSite) {
    content = <EmptyState Icon={Building2} title="No location linked" hint="Contact your account manager to get your location connected." />;
  } else {
    if (active === "dashboard") content = <ClientDashboard site={clientSite} sites={clientSites} activeSiteId={clientSite.id} onSwitchSite={setClientSiteId} quotes={quotes} setShowNewQuote={setShowNewQuoteFor} setActive={setActive} />;
    else if (active === "schedule") content = <ScheduleView sites={[clientSite]} clientMode setActive={setActive} setSelectedSite={setSelectedSite} />;
    else if (active === "requests") content = <ClientRequests site={clientSite} quotes={quotes} setShowNewQuote={setShowNewQuoteFor} />;
    else if (active === "documents") content = <ClientDocuments site={clientSite} />;
  }

  if (!content) content = <EmptyState title="Nothing here" hint="Pick a section from the navigation to get started." />;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: C.paper }}>
      <style>{FONT_IMPORT}</style>
      <Sidebar active={active} setActive={setActive} role={role} onLogout={logout}
        vendorName={(vendors.find(v => v.id === VENDOR_IDENTITY_ID) || vendors[0])?.name} />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <MobileHeader onLogout={logout} />
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 md:px-9 md:py-8 pb-24 md:pb-8"
          style={{ background: `radial-gradient(1200px 500px at 100% 0%, ${C.brand}0D, transparent 60%), ${C.paper}` }}>
          {content}
        </div>
        <BottomNav active={active} setActive={setActive} role={role} />
      </div>

      {openedQuote && (
        <QuotePanel
          quote={openedQuote}
          site={sites.find(b => b.id === openedQuote.siteId)}
          vendors={vendors}
          bids={bids.filter(b => b.quoteId === openedQuote.id)}
          onClose={() => setOpenedQuote(null)}
          onUpdate={updateQuote}
          onAwardBid={awardBid}
        />
      )}
      {showNewQuoteFor && (
        <NewQuoteModal sites={sites} defaultSiteId={showNewQuoteFor} source={role} onClose={() => setShowNewQuoteFor(null)} onCreate={createQuote} />
      )}
      {showNewLead && (
        <NewLeadModal onClose={() => setShowNewLead(false)} onCreate={createLead} />
      )}
    </div>
  );
}
