import React from "react";
import { Building2, Wrench, UserCircle } from "lucide-react";
import { C, FONT_IMPORT } from "../theme";

const PORTALS = [
  { key: "employee", label: "Employee", desc: "Sites, schedule, leads, quotes, contracts, vendor network.", icon: Building2 },
  { key: "client", label: "Client", desc: "Compliance status, upcoming checks, service requests.", icon: UserCircle },
  { key: "vendor", label: "Vendor", desc: "Accept offered jobs, mark complete, track earnings.", icon: Wrench },
];

export default function PortalPicker({ onEnter }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: C.paper }}>
      <style>{FONT_IMPORT}</style>
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="font-display text-3xl sm:text-4xl" style={{ color: C.ink, fontWeight: 600 }}>Exhale Compliance</div>
          <p className="mt-2 text-sm" style={{ color: C.subtle }}>Pick a portal to sign in.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {PORTALS.map(({ key, label, desc, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onEnter(key)}
              className="text-left rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: C.shadow }}
            >
              <span className="grid place-items-center w-11 h-11 rounded-xl mb-4" style={{ background: C.brandSoft, color: C.brand }}>
                <Icon size={20} />
              </span>
              <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>{label}</div>
              <p className="mt-1 text-sm" style={{ color: C.subtle }}>{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
