import React, { useState } from "react";
import { X, Send, MapPin, CheckCircle2, Store } from "lucide-react";
import { C } from "../../theme";
import { TopBar, Card, PrimaryButton, EmptyState } from "../../components/ui";
import { money, fmtDate } from "../../lib/format";

const inputStyle = { background: C.surface, border: `1px solid ${C.line}`, color: C.ink };
const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";

function BidModal({ quote, existing, onClose, onSubmit }) {
  const [amount, setAmount] = useState(existing?.amount ?? quote.vendorCost ?? 0);
  const [note, setNote] = useState(existing?.note ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,27,25,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5 sm:p-6" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>{existing ? "Update your bid" : "Place a bid"}</div>
          <button onClick={onClose} style={{ color: C.faint }}><X size={18} /></button>
        </div>
        <div className="text-sm font-medium mb-1" style={{ color: C.ink }}>{quote.title}</div>
        <div className="text-xs mb-4" style={{ color: C.subtle }}>Target price: {money(quote.vendorCost)}</div>
        <label className="block mb-3">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Your bid</span>
          <input type="number" className={inputClass} style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: C.faint }}>Note (optional)</span>
          <textarea rows={2} className={inputClass} style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Availability, questions..." />
        </label>
        <PrimaryButton onClick={() => { onSubmit(Number(amount) || 0, note); onClose(); }} className="justify-center w-full">
          <Send size={15} /> {existing ? "Update bid" : "Submit bid"}
        </PrimaryButton>
      </div>
    </div>
  );
}

export function MarketplaceView({ vendor, quotes, sites, bids, onBid }) {
  const [bidding, setBidding] = useState(null);
  const open = quotes.filter((q) => !q.vendorId && q.vendorStatus === "unassigned" && vendor.checks.includes(q.category));

  return (
    <div>
      <TopBar title="Marketplace" subtitle="Open jobs matching your specialty — place a bid to win the work." />
      <Card className="p-0 overflow-hidden">
        {open.map((q) => {
          const site = sites.find((s) => s.id === q.siteId);
          const myBid = bids.find((b) => b.quoteId === q.id && b.vendorId === vendor.id);
          const bidCount = bids.filter((b) => b.quoteId === q.id).length;
          return (
            <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{q.title}</div>
                <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: C.subtle }}>
                  <MapPin size={11} /> {site?.name} · {site?.city} · due {fmtDate(q.dueDate)}
                </div>
                <div className="text-xs mt-1" style={{ color: C.faint }}>
                  Target price {money(q.vendorCost)}{bidCount > 0 ? ` · ${bidCount} bid${bidCount > 1 ? "s" : ""} so far` : ""}
                </div>
              </div>
              <div className="shrink-0">
                {myBid ? (
                  <button onClick={() => setBidding(q)} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md" style={{ border: `1px solid ${C.line}`, color: C.good }}>
                    <CheckCircle2 size={13} /> Bid: {money(myBid.amount)}
                  </button>
                ) : (
                  <button onClick={() => setBidding(q)} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md text-white" style={{ background: C.brand }}>
                    <Send size={13} /> Place bid
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {open.length === 0 && <EmptyState Icon={Store} title="No open jobs right now" hint="New unassigned jobs matching your specialty will show up here." />}
      </Card>

      {bidding && (
        <BidModal
          quote={bidding}
          existing={bids.find((b) => b.quoteId === bidding.id && b.vendorId === vendor.id)}
          onClose={() => setBidding(null)}
          onSubmit={(amount, note) => onBid(bidding.id, vendor.id, amount, note)}
        />
      )}
    </div>
  );
}
