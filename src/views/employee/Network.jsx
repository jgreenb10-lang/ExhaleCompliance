import React, { useMemo, useState } from "react";
import { Mail, X, Star, UserPlus, Wrench } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, PrimaryButton, EmptyState } from "../../components/ui";
import { checkOf, INDUSTRIES } from "../../data/catalog";
import { RECRUIT_STATUS_LABELS } from "../../data/status";
import { inviteEmail } from "../../lib/email";
import { money } from "../../lib/format";

const inputStyle = { background: C.surface, border: `1px solid ${C.line}`, color: C.ink };
const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const TABS = [
  { key: "vendors", label: "Vendors" },
  { key: "recruiting", label: "Recruiting" },
  { key: "calculator", label: "Break-even" },
];

const RECRUIT_TONE = { not_contacted: "brand", invited: "info", accepted: "warn", active: "good", declined: "bad" };

function VendorsTab({ vendors, quotes }) {
  return (
    <Card className="p-0 overflow-hidden">
      {vendors.map((v) => {
        const jobs = quotes.filter((q) => q.vendor === v.name).length;
        return (
          <div key={v.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="min-w-0">
              <div className="text-sm font-medium flex items-center gap-2" style={{ color: C.ink }}>
                {v.name}
                <Pill tone={v.type === "in_house" ? "info" : "brand"}>{v.type === "in_house" ? "In-house" : "Subcontractor"}</Pill>
              </div>
              <div className="text-xs mt-1" style={{ color: C.subtle }}>{v.checks.map((k) => checkOf(k).label).join(", ")}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-medium" style={{ color: C.ink }}>${v.rate}/check</div>
              <div className="text-xs flex items-center justify-end gap-1 mt-0.5" style={{ color: C.faint }}>
                <Star size={11} fill={C.accent} stroke="none" /> {v.rating.toFixed(1)} · {v.capacity}/day · {jobs} jobs
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

function InviteModal({ recruit, onClose, onSend }) {
  const draft = inviteEmail(recruit);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl p-5 sm:p-6" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>Invite draft</div>
          <button onClick={onClose} style={{ color: C.faint }}><X size={18} /></button>
        </div>
        <div className="text-xs mb-1" style={{ color: C.faint }}>To</div>
        <div className="text-sm mb-3" style={{ color: C.ink }}>{draft.to}</div>
        <div className="text-xs mb-1" style={{ color: C.faint }}>Subject</div>
        <div className="text-sm mb-3" style={{ color: C.ink }}>{draft.subject}</div>
        <div className="text-xs mb-1" style={{ color: C.faint }}>Body</div>
        <pre className="text-sm whitespace-pre-wrap rounded-lg p-3 mb-4" style={{ background: C.surface, border: `1px solid ${C.line}`, color: C.ink, fontFamily: "inherit" }}>{draft.body}</pre>
        <PrimaryButton onClick={() => { onSend(); onClose(); }} className="justify-center w-full"><Mail size={15} /> Send invite</PrimaryButton>
      </div>
    </div>
  );
}

function ActivateModal({ recruit, onClose, onActivate }) {
  const [rate, setRate] = useState(60);
  const [capacity, setCapacity] = useState(6);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5 sm:p-6" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>Activate {recruit.company}</div>
          <button onClick={onClose} style={{ color: C.faint }}><X size={18} /></button>
        </div>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Rate per check</span>
          <input type="number" className={inputClass} style={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Capacity (checks/day)</span>
          <input type="number" className={inputClass} style={inputStyle} value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </label>
        <PrimaryButton onClick={() => { onActivate(recruit, Number(rate), Number(capacity)); onClose(); }} className="justify-center w-full">Activate vendor</PrimaryButton>
      </div>
    </div>
  );
}

function NewRecruitModal({ onClose, onCreate }) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    onCreate({ id: Date.now(), company, contact, email, phone: "", city, status: "not_contacted", checks: [], invitedAt: null, notes: "", vendorId: null });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5 sm:p-6" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>New recruit</div>
          <button onClick={onClose} style={{ color: C.faint }}><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <label className="block mb-3">
            <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Company</span>
            <input className={inputClass} style={inputStyle} value={company} onChange={(e) => setCompany(e.target.value)} required />
          </label>
          <label className="block mb-3">
            <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Contact</span>
            <input className={inputClass} style={inputStyle} value={contact} onChange={(e) => setContact(e.target.value)} />
          </label>
          <label className="block mb-3">
            <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Email</span>
            <input type="email" className={inputClass} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block mb-4">
            <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>City</span>
            <input className={inputClass} style={inputStyle} value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <PrimaryButton type="submit" className="justify-center w-full">Add recruit</PrimaryButton>
        </form>
      </div>
    </div>
  );
}

function RecruitingTab({ recruits, addRecruit, setRecruitStatus, activateVendor }) {
  const [inviting, setInviting] = useState(null);
  const [activating, setActivating] = useState(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <PrimaryButton onClick={() => setShowNew(true)}><UserPlus size={15} /> New recruit</PrimaryButton>
      </div>
      <Card className="p-0 overflow-hidden">
        {recruits.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="min-w-0">
              <div className="text-sm font-medium" style={{ color: C.ink }}>{r.company}</div>
              <div className="text-xs mt-0.5" style={{ color: C.subtle }}>{r.contact} · {r.city}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Pill tone={RECRUIT_TONE[r.status]}>{RECRUIT_STATUS_LABELS[r.status]}</Pill>
              {r.status === "not_contacted" && (
                <button onClick={() => setInviting(r)} className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ border: `1px solid ${C.line}`, color: C.brand }}>Invite</button>
              )}
              {r.status === "invited" && (
                <button onClick={() => setRecruitStatus(r.id, "accepted")} className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ border: `1px solid ${C.line}`, color: C.brand }}>Mark accepted</button>
              )}
              {r.status === "accepted" && (
                <button onClick={() => setActivating(r)} className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ border: `1px solid ${C.line}`, color: C.brand }}>Activate</button>
              )}
            </div>
          </div>
        ))}
        {recruits.length === 0 && <EmptyState Icon={Wrench} title="No recruits yet" hint="Add a prospective subcontractor to get started." />}
      </Card>

      {inviting && <InviteModal recruit={inviting} onClose={() => setInviting(null)} onSend={() => setRecruitStatus(inviting.id, "invited")} />}
      {activating && <ActivateModal recruit={activating} onClose={() => setActivating(null)} onActivate={activateVendor} />}
      {showNew && <NewRecruitModal onClose={() => setShowNew(false)} onCreate={addRecruit} />}
    </div>
  );
}

function BreakEvenCalc() {
  const [subRate, setSubRate] = useState(55);
  const [checksPerMonth, setChecksPerMonth] = useState(40);
  const [salary, setSalary] = useState(4800);
  const [dailyCapacity, setDailyCapacity] = useState(4);

  const monthlySubCost = subRate * checksPerMonth;
  const inHouseCapacityPerMonth = Math.max(1, dailyCapacity * 21);
  const techsNeeded = Math.max(1, Math.ceil(checksPerMonth / inHouseCapacityPerMonth));
  const monthlyInHouseCost = salary * techsNeeded;
  const breakEvenVolume = subRate > 0 ? Math.ceil(salary / subRate) : 0;
  const cheaper = monthlyInHouseCost <= monthlySubCost ? "in-house" : "subcontractor";

  const Field = ({ label, value, onChange }) => (
    <label className="block mb-3">
      <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>{label}</span>
      <input type="number" className={inputClass} style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-5">
        <div className="text-sm font-medium mb-4" style={{ color: C.ink }}>Assumptions</div>
        <Field label="Subcontractor rate ($/check)" value={subRate} onChange={setSubRate} />
        <Field label="Checks needed per month" value={checksPerMonth} onChange={setCheckPerMonthSafe} />
        <Field label="In-house tech salary + benefits ($/mo)" value={salary} onChange={setSalary} />
        <Field label="In-house checks/day capacity" value={dailyCapacity} onChange={setDailyCapacity} />
      </Card>
      <Card className="p-5">
        <div className="text-sm font-medium mb-4" style={{ color: C.ink }}>Result</div>
        <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
          <span className="text-sm" style={{ color: C.subtle }}>Subcontractor cost / mo</span>
          <span className="text-sm font-medium" style={{ color: C.ink }}>{money(monthlySubCost)}</span>
        </div>
        <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
          <span className="text-sm" style={{ color: C.subtle }}>In-house cost / mo ({techsNeeded} tech{techsNeeded > 1 ? "s" : ""})</span>
          <span className="text-sm font-medium" style={{ color: C.ink }}>{money(monthlyInHouseCost)}</span>
        </div>
        <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
          <span className="text-sm" style={{ color: C.subtle }}>Break-even volume</span>
          <span className="text-sm font-medium" style={{ color: C.ink }}>{breakEvenVolume} checks/mo</span>
        </div>
        <div className="mt-4 rounded-lg p-3 text-sm text-center font-medium" style={{ background: C.brandSoft, color: C.brand }}>
          At {checksPerMonth} checks/mo, {cheaper} is cheaper.
        </div>
      </Card>
    </div>
  );

  function setCheckPerMonthSafe(v) { setChecksPerMonth(v); }
}

export default function NetworkView({ vendors, quotes, recruits, addRecruit, setRecruitStatus, activateVendor }) {
  const [tab, setTab] = useState("vendors");
  return (
    <div>
      <TopBar title="Network" subtitle="Vendor roster, recruiting CRM, and break-even math." />
      <div className="flex gap-2 mb-5">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: tab === t.key ? C.brand : "transparent", color: tab === t.key ? "#fff" : C.subtle, border: `1px solid ${tab === t.key ? C.brand : C.line}` }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "vendors" && <VendorsTab vendors={vendors} quotes={quotes} />}
      {tab === "recruiting" && <RecruitingTab recruits={recruits} addRecruit={addRecruit} setRecruitStatus={setRecruitStatus} activateVendor={activateVendor} />}
      {tab === "calculator" && <BreakEvenCalc />}
    </div>
  );
}
