/* Money, dates, and margin math. */

export function money(amount, opts = {}) {
  const n = Number(amount) || 0;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts.cents ? 2 : 0,
  });
}

export function fmtDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function fmtDateLong(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function daysBetween(a, b) {
  const MS = 1000 * 60 * 60 * 24;
  const da = a instanceof Date ? a : new Date(a);
  const db = b instanceof Date ? b : new Date(b);
  return Math.round((db.setHours(0, 0, 0, 0) - da.setHours(0, 0, 0, 0)) / MS);
}

export function margin(quote) {
  return (Number(quote.clientPrice) || 0) - (Number(quote.vendorCost) || 0);
}

export function marginPct(quote) {
  const price = Number(quote.clientPrice) || 0;
  if (!price) return 0;
  return (margin(quote) / price) * 100;
}

export function pct(n, digits = 0) {
  return `${(Number(n) || 0).toFixed(digits)}%`;
}
