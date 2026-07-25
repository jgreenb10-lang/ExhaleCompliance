/* Recurring due-date engine. Due dates are derived from a stable hash of
   site + check so the demo is deterministic across refreshes — in
   production this becomes last_inspected_at + cadence. */

import { checkOf, cadenceDays } from "../data/catalog";
import { daysBetween } from "./format";

export const TODAY = new Date(2026, 6, 24);

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function scheduleForSite(site) {
  const keys = Object.keys(site.categories || {});
  return keys
    .map((key) => {
      const check = checkOf(key);
      const period = cadenceDays(check.cadence);
      const daysAgoInspected = hash(`${site.id}:${key}`) % (period + 15);
      const lastInspected = new Date(TODAY);
      lastInspected.setDate(lastInspected.getDate() - daysAgoInspected);
      const dueDate = new Date(lastInspected);
      dueDate.setDate(dueDate.getDate() + period);
      const daysUntilDue = daysBetween(new Date(TODAY), new Date(dueDate));
      let status = "ok";
      if (daysUntilDue < 0) status = "overdue";
      else if (daysUntilDue <= 30) status = "dueSoon";
      return {
        siteId: site.id,
        siteName: site.name,
        checkKey: key,
        check,
        lastInspected,
        dueDate,
        daysUntilDue,
        status,
        score: site.categories[key],
      };
    })
    .sort((a, b) => a.dueDate - b.dueDate);
}

export function scheduleForSites(sites) {
  return sites.flatMap(scheduleForSite).sort((a, b) => a.dueDate - b.dueDate);
}

export function overdueCount(sites) {
  return scheduleForSites(sites).filter((s) => s.status === "overdue").length;
}

export function dueSoonCount(sites) {
  return scheduleForSites(sites).filter((s) => s.status === "dueSoon").length;
}

export function contractStatus(contract) {
  const daysUntil = daysBetween(new Date(TODAY), new Date(contract.renewsOn));
  if (daysUntil < 0) return "expired";
  if (daysUntil <= 90) return "renewing";
  return "active";
}

export function overallScore(site) {
  const vals = Object.values(site.categories || {});
  if (!vals.length) return 100;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
