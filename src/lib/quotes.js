/* Turns failed audit findings into billable quote records. */

import { checkOf } from "../data/catalog";
import { TODAY } from "./schedule";

export function quotesFromFindings(findings, siteId) {
  return findings.map((f, i) => {
    const check = checkOf(f.checkKey);
    const vendorCost = check.vendorRate;
    const clientPrice = Math.round((vendorCost * 1.65) / 5) * 5;
    const dueDate = new Date(TODAY);
    dueDate.setDate(dueDate.getDate() + 14);
    return {
      id: Date.now() + i + Math.random(),
      siteId,
      category: f.checkKey,
      title: check.label,
      description: f.note || `Remediate failed ${check.label.toLowerCase()} finding.`,
      status: "needs_quote",
      vendor: null,
      vendorId: null,
      clientPrice,
      vendorCost,
      vendorStatus: "unassigned",
      dueDate,
      source: "employee",
    };
  });
}
