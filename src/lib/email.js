/* Composes the subcontractor recruiting invite. Draft only — nothing sends it
   until POST /api/recruits/:id/invite is wired to a real provider. */

import { checkOf } from "../data/catalog";

export function inviteEmail(recruit) {
  const checksList = (recruit.checks || []).map((k) => checkOf(k).label).join(", ") || "general compliance checks";
  const subject = `Exhale Compliance — subcontractor opportunity for ${recruit.company}`;
  const body = `Hi ${recruit.contact || "there"},

We work with property owners across the region to keep their locations
compliant on fire, life-safety, and equipment inspections. We're building out
our vendor network for ${checksList} and came across ${recruit.company}.

We handle sales, scheduling, and client billing — you handle the on-site
work at an agreed per-check rate, paid on completion. No cold-calling, no
invoicing clients directly.

If you're interested, reply here and we'll get you set up with a rate and
capacity for your area.

Thanks,
Exhale Compliance`;
  return { to: recruit.email, subject, body };
}
