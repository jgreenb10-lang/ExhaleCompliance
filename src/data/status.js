/* Lifecycle enums shared by leads, quotes, contracts, and vendors. */

export const STAGE_ORDER = ["new", "audit_scheduled", "audit_complete", "proposal_sent", "signed"];

export const STAGE_LABELS = {
  new: "New",
  audit_scheduled: "Audit Scheduled",
  audit_complete: "Findings Ready",
  proposal_sent: "Proposal Sent",
  signed: "Signed",
};

export const QUOTE_STATUS_LABELS = {
  needs_quote: "Needs Quote",
  requested: "Requested",
  quoted: "Quoted",
  contracted: "Contracted",
};

export const VENDOR_STATUS_LABELS = {
  unassigned: "Unassigned",
  offered: "Offered",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
};

export const RECRUIT_STATUS_LABELS = {
  not_contacted: "Not Contacted",
  invited: "Invited",
  accepted: "Accepted",
  active: "Active",
  declined: "Declined",
};

export const CONTRACT_STATUS_LABELS = {
  active: "Active",
  renewing: "Renewing Soon",
  expired: "Expired",
};
