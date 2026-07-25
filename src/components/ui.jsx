import React from "react";
import { Inbox, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { fmtDate } from "../lib/format";

export function Card({ children, className = "", style, onClick }) {
  return (
    <div
      className={`rounded-2xl ${onClick ? "cursor-pointer transition-transform hover:-translate-y-0.5" : ""} ${className}`}
      style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: C.shadow, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function TopBar({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl" style={{ color: C.ink, fontWeight: 600 }}>{title}</h1>
        {subtitle && <p className="mt-1 text-sm" style={{ color: C.subtle }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

const TONE_COLORS = {
  brand: [C.brand, C.brandSoft],
  good: [C.good, C.goodSoft],
  warn: [C.warn, C.warnSoft],
  bad: [C.bad, C.badSoft],
  info: [C.info, C.infoSoft],
};

export function Stat({ label, value, sub, icon: Icon, tone = "brand" }) {
  const [fg, bg] = TONE_COLORS[tone] || TONE_COLORS.brand;
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: C.faint }}>{label}</span>
        {Icon && (
          <span className="grid place-items-center w-8 h-8 rounded-lg" style={{ background: bg, color: fg }}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <div className="font-display text-2xl" style={{ color: C.ink, fontWeight: 600 }}>{value}</div>
      {sub && <div className="mt-1 text-xs" style={{ color: C.subtle }}>{sub}</div>}
    </Card>
  );
}

export function Pill({ children, tone = "brand" }) {
  const [fg, bg] = TONE_COLORS[tone] || TONE_COLORS.brand;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ color: fg, background: bg }}>
      {children}
    </span>
  );
}

export function scoreTone(score) {
  if (score >= 90) return "good";
  if (score >= 75) return "warn";
  return "bad";
}

export function EmptyState({ Icon = Inbox, title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <span className="grid place-items-center w-12 h-12 rounded-full mb-4" style={{ background: C.brandSoft, color: C.brand }}>
        <Icon size={22} />
      </span>
      <div className="font-display text-lg" style={{ color: C.ink, fontWeight: 600 }}>{title}</div>
      {hint && <p className="mt-1 text-sm max-w-sm" style={{ color: C.subtle }}>{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ScheduleRow({ item, onClick }) {
  const tone = item.status === "overdue" ? "bad" : item.status === "dueSoon" ? "warn" : "good";
  const label = item.status === "overdue" ? `${Math.abs(item.daysUntilDue)}d overdue` : item.status === "dueSoon" ? `Due in ${item.daysUntilDue}d` : `Due ${fmtDate(item.dueDate)}`;
  return (
    <div
      className={`flex items-center justify-between gap-3 py-3 px-4 ${onClick ? "cursor-pointer hover:bg-black/[0.02]" : ""}`}
      style={{ borderBottom: `1px solid ${C.line}` }}
      onClick={onClick}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: C.ink }}>{item.check.label}</div>
        <div className="text-xs truncate" style={{ color: C.subtle }}>{item.siteName}</div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Pill tone={tone}>{label}</Pill>
        {onClick && <ChevronRight size={16} style={{ color: C.faint }} />}
      </div>
    </div>
  );
}

export function IconButton({ Icon, label, onClick, tone = "brand" }) {
  const [fg] = TONE_COLORS[tone] || TONE_COLORS.brand;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/[0.03]"
      style={{ color: fg, border: `1px solid ${C.line}` }}
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}

export function PrimaryButton({ children, onClick, type = "button", disabled, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 ${className}`}
      style={{ background: C.brand }}
    >
      {children}
    </button>
  );
}
