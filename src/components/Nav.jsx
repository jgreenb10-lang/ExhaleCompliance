import React, { useState } from "react";
import {
  LayoutDashboard, Building2, CalendarClock, Users, FileText, Receipt,
  Share2, MessageSquarePlus, FolderOpen, Briefcase, Wallet, LogOut,
  MoreHorizontal, X, Leaf,
} from "lucide-react";
import { C } from "../theme";

const NAV_ITEMS = {
  employee: [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "sites", label: "Sites", icon: Building2 },
    { key: "schedule", label: "Schedule", icon: CalendarClock },
    { key: "leads", label: "Leads", icon: Users },
    { key: "contracts", label: "Contracts", icon: FileText },
    { key: "quotes", label: "Quotes", icon: Receipt },
    { key: "network", label: "Network", icon: Share2 },
  ],
  client: [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "schedule", label: "Schedule", icon: CalendarClock },
    { key: "requests", label: "Requests", icon: MessageSquarePlus },
    { key: "documents", label: "Documents", icon: FolderOpen },
  ],
  vendor: [
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "earnings", label: "Earnings", icon: Wallet },
  ],
};

const ROLE_LABEL = { employee: "Employee Portal", client: "Client Portal", vendor: "Vendor Portal" };

function Logo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <span className="grid place-items-center w-8 h-8 rounded-lg" style={{ background: C.brand, color: "#fff" }}>
        <Leaf size={16} />
      </span>
      <span className="font-display text-base" style={{ color: C.ink, fontWeight: 600 }}>Exhale</span>
    </div>
  );
}

export function Sidebar({ active, setActive, role, onLogout, vendorName }) {
  const items = NAV_ITEMS[role] || [];
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-full px-3 py-5" style={{ background: C.surface, borderRight: `1px solid ${C.line}` }}>
      <Logo />
      <div className="mt-1 px-2 text-xs" style={{ color: C.faint }}>{ROLE_LABEL[role]}</div>
      {role === "vendor" && vendorName && <div className="mt-2 px-2 text-sm font-medium" style={{ color: C.brand }}>{vendorName}</div>}
      <nav className="mt-6 flex-1 flex flex-col gap-1">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors"
              style={{
                background: isActive ? C.brandSoft : "transparent",
                color: isActive ? C.brand : C.subtle,
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          );
        })}
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors hover:bg-black/[0.03]"
        style={{ color: C.subtle }}
      >
        <LogOut size={17} />
        Switch portal
      </button>
    </aside>
  );
}

export function MobileHeader({ onLogout }) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3" style={{ background: C.surface, borderBottom: `1px solid ${C.line}` }}>
      <Logo />
      <button onClick={onLogout} className="grid place-items-center w-9 h-9 rounded-lg" style={{ color: C.subtle }}>
        <LogOut size={18} />
      </button>
    </header>
  );
}

export function BottomNav({ active, setActive, role }) {
  const items = NAV_ITEMS[role] || [];
  const [showMore, setShowMore] = useState(false);
  const primary = items.slice(0, 4);
  const overflow = items.slice(4);
  const activeInOverflow = overflow.some((i) => i.key === active);

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-stretch"
        style={{ background: C.surface, borderTop: `1px solid ${C.line}`, paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {primary.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium"
              style={{ color: isActive ? C.brand : C.faint }}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
        {overflow.length > 0 && (
          <button
            onClick={() => setShowMore(true)}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium"
            style={{ color: activeInOverflow ? C.brand : C.faint }}
          >
            <MoreHorizontal size={18} />
            More
          </button>
        )}
      </nav>

      {showMore && (
        <div className="md:hidden fixed inset-0 z-40 flex items-end" style={{ background: "rgba(28,27,25,0.4)" }} onClick={() => setShowMore(false)}>
          <div
            className="w-full rounded-t-2xl p-4 pb-8"
            style={{ background: C.surface }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: C.ink }}>More</span>
              <button onClick={() => setShowMore(false)} style={{ color: C.faint }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-1">
              {overflow.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setActive(key); setShowMore(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left"
                  style={{ background: active === key ? C.brandSoft : "transparent", color: active === key ? C.brand : C.ink }}
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
