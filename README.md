# Exhale Compliance

A two-sided platform for physical-world compliance work: find businesses that
need inspections, audit them free, contract the remediation out to
subcontractors, and put them on a recurring agreement.

Three portals share one codebase:

| Portal | Who | What they do |
|---|---|---|
| **Employee** | Exhale staff | Sites, schedule, leads, quotes, contracts, vendor network |
| **Client** | Location owner | Compliance status, upcoming checks, service requests |
| **Vendor** | Subcontractor | Accept offered jobs, mark complete, track earnings |

## Running it

```bash
npm install
npm run dev
```

Opens on <http://localhost:5173>. No backend required — all state is in-memory
and resets on refresh.

## Project layout

```
src/
  App.jsx                  state + routing for all three portals
  theme.js                 design tokens (colours, shadows, fonts)
  data/
    catalog.js             CHECKS and INDUSTRIES — the master catalog
    status.js              lifecycle enums (quote, lead, contract, vendor)
    seed.js                demo data; replace with API calls
  lib/
    schedule.js            recurring due-date engine
    format.js              money, dates, margin math
    quotes.js              audit findings -> quote records
    email.js               subcontractor invite composer
  components/
    ui.jsx                 Card, Stat, TopBar, EmptyState, ScheduleRow...
    Nav.jsx                sidebar + mobile bottom nav w/ overflow sheet
    PortalPicker.jsx       role selection
    quotes.jsx             quote card, detail panel, creation modal
  views/
    employee/              Dashboard, Sites, Leads, Contracts, Network
    client/                ClientPortal
    vendor/                VendorPortal
docs/
  SCHEMA.md                tables, endpoints, and what to build next
```

## Core flows

**Sales motion** — Leads board: a prospect moves New → Audit Scheduled →
Findings Ready → Proposal Sent → Signed. "Start free audit" opens a
step-by-step field checklist (pass/fail/na, note, photo) for every check that
industry requires. Failures become findings; findings become a proposal with
term selection and an on-site signature. Converting a signed lead creates the
site, the recurring contract, and the remediation quotes in one step.

**Margin** — every quote carries `clientPrice` and `vendorCost`. The spread is
the business, so it surfaces on the quote panel (live as you type), quote
cards, the Quotes page totals, vendor cards, and the dashboard.

**Recurring schedule** — each check has a cadence (Monthly → Annual). The
engine in `lib/schedule.js` derives the live due calendar that drives the
Schedule page, overdue counts, and the client's "what's coming up".

**Vendor network** — the Network page holds the checks catalog (which vendors
can do what, at what rate), the vendor roster, a recruiting CRM with a
ready-to-send invite email, and an in-house-vs-subcontractor break-even
calculator.

## Demo data

Signing in with any portal uses seeded data:

- 8 sites across 6 industries
- $82,600 ARR across 8 recurring agreements, 3 renewals inside 90 days
- 38 tracked recurring checks — 4 overdue, 16 due within 30 days
- ~29% blended margin on priced quotes
- Vendor portal is scoped to Redline Fire & Safety, seeded with offered,
  accepted, and completed jobs

## Status

The frontend is feature-complete as a prototype. What's stubbed:

- **No persistence** — refresh resets everything
- **No auth** — the portal picker is cosmetic
- **Client portal is single-site** — `CLIENT_SITE_ID` is hardcoded
- **Invite email drafts but doesn't send**
- **Documents page is placeholder rows**
- **Audit photos are a boolean, not a file**

See [`docs/SCHEMA.md`](docs/SCHEMA.md) for the table design, API surface, and
the order to tackle these in.
