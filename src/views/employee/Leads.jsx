import React, { useState } from "react";
import { Plus, X, ArrowRight, ClipboardCheck, Send, PenLine, CheckCircle2 } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, Pill, PrimaryButton } from "../../components/ui";
import { STAGE_ORDER, STAGE_LABELS } from "../../data/status";
import { INDUSTRIES, industryOf, checkOf } from "../../data/catalog";
import { money } from "../../lib/format";

const inputStyle = { background: C.surface, border: `1px solid ${C.line}`, color: C.ink };
const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";

function Modal({ onClose, title, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div className={`w-full ${wide ? "max-w-lg" : "max-w-md"} max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-6`}
        style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>{title}</div>
          <button onClick={onClose} style={{ color: C.faint }}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AuditModal({ lead, onClose, onComplete }) {
  const checks = industryOf(lead.industry).checks;
  const [items, setItems] = useState(() => checks.map((key) => ({ checkKey: key, status: "pass", note: "", photo: false })));

  const setItem = (idx, patch) => setItems((cur) => cur.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const submit = () => {
    const findings = items.filter((it) => it.status === "fail").map((it) => ({ checkKey: it.checkKey, note: it.note || `${checkOf(it.checkKey).label} failed inspection.` }));
    onComplete(lead, items, findings);
    onClose();
  };

  return (
    <Modal onClose={onClose} title={`Free audit — ${lead.name}`} wide>
      <div className="flex flex-col gap-3 mb-5">
        {items.map((it, idx) => {
          const check = checkOf(it.checkKey);
          return (
            <Card key={it.checkKey} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: C.ink }}>{check.label}</span>
                <div className="flex gap-1">
                  {["pass", "fail", "na"].map((s) => (
                    <button key={s} onClick={() => setItem(idx, { status: s })}
                      className="px-2.5 py-1 rounded-md text-xs font-medium capitalize"
                      style={{
                        background: it.status === s ? (s === "fail" ? C.bad : s === "pass" ? C.good : C.faint) : "transparent",
                        color: it.status === s ? "#fff" : C.subtle,
                        border: `1px solid ${it.status === s ? "transparent" : C.line}`,
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {it.status === "fail" && (
                <input
                  className={inputClass} style={{ ...inputStyle, fontSize: 13 }}
                  placeholder="Note what you found..."
                  value={it.note}
                  onChange={(e) => setItem(idx, { note: e.target.value })}
                />
              )}
            </Card>
          );
        })}
      </div>
      <PrimaryButton onClick={submit} className="justify-center w-full">Complete audit</PrimaryButton>
    </Modal>
  );
}

function SignModal({ lead, onClose, onSign }) {
  const [term, setTerm] = useState(2);
  return (
    <Modal onClose={onClose} title={`Sign on site — ${lead.name}`}>
      <p className="text-sm mb-4" style={{ color: C.subtle }}>Select the agreement term and capture signature.</p>
      <div className="flex gap-2 mb-5">
        {[1, 2, 3].map((y) => (
          <button key={y} onClick={() => setTerm(y)}
            className="flex-1 py-2 rounded-lg text-sm font-medium"
            style={{ background: term === y ? C.brand : "transparent", color: term === y ? "#fff" : C.ink, border: `1px solid ${term === y ? C.brand : C.line}` }}>
            {y} yr
          </button>
        ))}
      </div>
      <div className="rounded-lg p-4 mb-5 text-center text-sm" style={{ border: `1px dashed ${C.line}`, color: C.faint }}>
        <PenLine size={18} className="mx-auto mb-1" /> Signature captured on device
      </div>
      <PrimaryButton onClick={() => { onSign(lead, term); onClose(); }} className="justify-center w-full">Sign & continue</PrimaryButton>
    </Modal>
  );
}

function LeadCard({ lead, advanceLead, convertLead, setAuditingLead, sendProposal, setSigningLead }) {
  return (
    <Card className="p-3">
      <div className="font-medium text-sm" style={{ color: C.ink }}>{lead.name}</div>
      <div className="text-xs mt-0.5" style={{ color: C.subtle }}>{lead.city} · {industryOf(lead.industry).label}</div>
      <div className="text-sm font-medium mt-2" style={{ color: C.ink }}>{money(lead.value)}<span className="text-xs font-normal" style={{ color: C.faint }}>/yr</span></div>

      {lead.findings?.length > 0 && (
        <div className="text-xs mt-2" style={{ color: C.warn }}>{lead.findings.length} finding{lead.findings.length > 1 ? "s" : ""}</div>
      )}

      <div className="mt-3">
        {lead.stage === "new" && (
          <button onClick={() => advanceLead(lead)} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.brand }}>
            Schedule audit <ArrowRight size={12} />
          </button>
        )}
        {lead.stage === "audit_scheduled" && (
          <button onClick={() => setAuditingLead(lead)} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.brand }}>
            <ClipboardCheck size={13} /> Start free audit
          </button>
        )}
        {lead.stage === "audit_complete" && (
          <button onClick={() => sendProposal(lead)} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.brand }}>
            <Send size={13} /> Send proposal
          </button>
        )}
        {lead.stage === "proposal_sent" && (
          <button onClick={() => setSigningLead(lead)} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.brand }}>
            <PenLine size={13} /> Sign on site
          </button>
        )}
        {lead.stage === "signed" && !lead.converted && (
          <button onClick={() => convertLead(lead)} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.good }}>
            <CheckCircle2 size={13} /> Convert to site
          </button>
        )}
        {lead.stage === "signed" && lead.converted && (
          <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: C.good }}>
            <CheckCircle2 size={13} /> Converted
          </span>
        )}
      </div>
    </Card>
  );
}

export function LeadsBoard({ leads, setShowNewLead, advanceLead, convertLead, completeAudit, sendProposal, signProposal }) {
  const [auditingLead, setAuditingLead] = useState(null);
  const [signingLead, setSigningLead] = useState(null);

  return (
    <div>
      <TopBar title="Leads" subtitle={`${leads.length} prospects in the pipeline.`}
        actions={<PrimaryButton onClick={() => setShowNewLead(true)}><Plus size={15} /> New lead</PrimaryButton>} />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGE_ORDER.map((stage) => {
          const inStage = leads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: C.faint }}>{STAGE_LABELS[stage]}</span>
                <Pill tone="brand">{inStage.length}</Pill>
              </div>
              <div className="flex flex-col gap-2">
                {inStage.map((l) => (
                  <LeadCard key={l.id} lead={l} advanceLead={advanceLead} convertLead={convertLead}
                    setAuditingLead={setAuditingLead} sendProposal={sendProposal} setSigningLead={setSigningLead} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {auditingLead && <AuditModal lead={auditingLead} onClose={() => setAuditingLead(null)} onComplete={completeAudit} />}
      {signingLead && <SignModal lead={signingLead} onClose={() => setSigningLead(null)} onSign={signProposal} />}
    </div>
  );
}

export function NewLeadModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [industry, setIndustry] = useState(Object.keys(INDUSTRIES)[0]);
  const [value, setValue] = useState(6000);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ id: Date.now(), name, city, contact, industry, value: Number(value) || 0, stage: "new", termYears: null, converted: false, notes: "", findings: [] });
    onClose();
  };

  return (
    <Modal onClose={onClose} title="New lead">
      <form onSubmit={submit}>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Business name</span>
          <input className={inputClass} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>City</span>
          <input className={inputClass} style={inputStyle} value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Contact</span>
          <input className={inputClass} style={inputStyle} value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Industry</span>
          <select className={inputClass} style={inputStyle} value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {Object.values(INDUSTRIES).map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}
          </select>
        </label>
        <label className="block mb-4">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Estimated annual value</span>
          <input type="number" className={inputClass} style={inputStyle} value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <PrimaryButton type="submit" className="justify-center w-full">Add lead</PrimaryButton>
      </form>
    </Modal>
  );
}
