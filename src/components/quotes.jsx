import React, { useState } from "react";
import { X, Send, FileCheck2, Handshake } from "lucide-react";
import { C } from "../theme";
import { CHECKS, checkOf } from "../data/catalog";
import { money, margin, marginPct, fmtDate } from "../lib/format";
import { QUOTE_STATUS_LABELS, VENDOR_STATUS_LABELS } from "../data/status";
import { Pill, PrimaryButton } from "./ui";

function Sheet({ onClose, children, title, subtitle }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div
        className="w-full max-w-md h-full overflow-y-auto p-5 sm:p-6"
        style={{ background: C.paper }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="font-display text-xl" style={{ color: C.ink, fontWeight: 600 }}>{title}</div>
            {subtitle && <div className="text-sm mt-0.5" style={{ color: C.subtle }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} className="grid place-items-center w-8 h-8 rounded-lg shrink-0" style={{ color: C.faint }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = { background: C.surface, border: `1px solid ${C.line}`, color: C.ink };
const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]";

export function QuotePanel({ quote, site, vendors, onClose, onUpdate }) {
  const [clientPrice, setClientPrice] = useState(quote.clientPrice);
  const [vendorCost, setVendorCost] = useState(quote.vendorCost);
  const [vendorId, setVendorId] = useState(quote.vendorId || "");

  const eligibleVendors = vendors.filter((v) => v.checks.includes(quote.category));
  const m = margin({ clientPrice, vendorCost });
  const mPct = marginPct({ clientPrice, vendorCost });

  const applyEdits = (extra = {}) => {
    const vendor = vendors.find((v) => v.id === Number(vendorId));
    onUpdate({
      ...quote,
      clientPrice: Number(clientPrice) || 0,
      vendorCost: Number(vendorCost) || 0,
      vendor: vendor ? vendor.name : quote.vendor,
      vendorId: vendor ? vendor.id : quote.vendorId,
      ...extra,
    });
  };

  return (
    <Sheet onClose={onClose} title={quote.title} subtitle={site?.name}>
      <div className="flex items-center gap-2 mb-5">
        <Pill tone="brand">{QUOTE_STATUS_LABELS[quote.status] || quote.status}</Pill>
        <Pill tone={quote.vendorStatus === "completed" ? "good" : quote.vendorStatus === "declined" ? "bad" : "info"}>
          {VENDOR_STATUS_LABELS[quote.vendorStatus] || quote.vendorStatus}
        </Pill>
      </div>

      <p className="text-sm mb-5" style={{ color: C.subtle }}>{quote.description}</p>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Client price">
          <input type="number" className={inputClass} style={inputStyle} value={clientPrice}
            onChange={(e) => setClientPrice(e.target.value)} />
        </Field>
        <Field label="Vendor cost">
          <input type="number" className={inputClass} style={inputStyle} value={vendorCost}
            onChange={(e) => setVendorCost(e.target.value)} />
        </Field>
      </div>

      <Card className="p-4 mb-4 flex items-center justify-between">
        <span className="text-sm" style={{ color: C.subtle }}>Margin</span>
        <span className="font-display text-lg" style={{ color: m >= 0 ? C.good : C.bad, fontWeight: 600 }}>
          {money(m)} <span className="text-xs font-sans" style={{ color: C.faint }}>({mPct.toFixed(0)}%)</span>
        </span>
      </Card>

      <Field label="Assign vendor">
        <select className={inputClass} style={inputStyle} value={vendorId} onChange={(e) => setVendorId(e.target.value)}>
          <option value="">— Unassigned —</option>
          {eligibleVendors.map((v) => (
            <option key={v.id} value={v.id}>{v.name} · ${v.rate}/check</option>
          ))}
        </select>
      </Field>

      <Field label="Due date">
        <div className="text-sm" style={{ color: C.ink }}>{fmtDate(quote.dueDate)}</div>
      </Field>

      <div className="flex flex-col gap-2 mt-6">
        <PrimaryButton onClick={() => applyEdits()} className="justify-center">Save changes</PrimaryButton>
        {quote.status === "needs_quote" && (
          <IconButtonFull Icon={Send} label="Request quote from vendor" onClick={() => applyEdits({ status: "requested", vendorStatus: vendorId ? "offered" : quote.vendorStatus })} />
        )}
        {quote.status === "requested" && (
          <IconButtonFull Icon={FileCheck2} label="Mark quoted" onClick={() => applyEdits({ status: "quoted" })} />
        )}
        {quote.status === "quoted" && (
          <IconButtonFull Icon={Handshake} label="Contract work out" onClick={() => applyEdits({ status: "contracted", vendorStatus: vendorId ? "offered" : quote.vendorStatus })} />
        )}
      </div>
    </Sheet>
  );
}

function IconButtonFull({ Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/[0.03]"
      style={{ border: `1px solid ${C.line}`, color: C.ink }}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      {children}
    </div>
  );
}

export function NewQuoteModal({ sites, defaultSiteId, source, onClose, onCreate }) {
  const [siteId, setSiteId] = useState(defaultSiteId || sites[0]?.id || "");
  const [category, setCategory] = useState(Object.keys(CHECKS)[0]);
  const [description, setDescription] = useState("");
  const [clientPrice, setClientPrice] = useState(200);
  const [vendorCost, setVendorCost] = useState(120);

  const submit = (e) => {
    e.preventDefault();
    const check = checkOf(category);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    onCreate({
      id: Date.now(),
      siteId: Number(siteId),
      category,
      title: check.label,
      description: description || `Service request — ${check.label}`,
      status: "needs_quote",
      vendor: null,
      vendorId: null,
      clientPrice: Number(clientPrice) || 0,
      vendorCost: Number(vendorCost) || 0,
      vendorStatus: "unassigned",
      dueDate,
      source,
    });
    onClose();
  };

  return (
    <Sheet onClose={onClose} title="New quote request">
      <form onSubmit={submit}>
        <Field label="Site">
          <select className={inputClass} style={inputStyle} value={siteId} onChange={(e) => setSiteId(e.target.value)}>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="Check">
          <select className={inputClass} style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.values(CHECKS).map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </Field>
        <Field label="Description">
          <textarea rows={3} className={inputClass} style={inputStyle} value={description}
            onChange={(e) => setDescription(e.target.value)} placeholder="What did you find?" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client price">
            <input type="number" className={inputClass} style={inputStyle} value={clientPrice} onChange={(e) => setClientPrice(e.target.value)} />
          </Field>
          <Field label="Vendor cost">
            <input type="number" className={inputClass} style={inputStyle} value={vendorCost} onChange={(e) => setVendorCost(e.target.value)} />
          </Field>
        </div>
        <PrimaryButton type="submit" className="justify-center w-full mt-2">Create quote</PrimaryButton>
      </form>
    </Sheet>
  );
}
