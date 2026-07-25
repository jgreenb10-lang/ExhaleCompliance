# Data model & API surface

The prototype holds everything in React state in `src/App.jsx`. Each `useState`
seed maps onto one table below. Swap the seed for a fetch and the UI is unchanged.

Values marked **derived** are computed in `src/lib/` and should stay computed —
don't store them, or they'll drift.

---

## Tables

### `sites`
Active client locations under contract.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| name | text | |
| city | text | |
| industry | text | fk → industry key in `src/data/catalog.js` |
| assets | int | count of tracked physical assets |
| client_id | uuid fk | **missing in prototype** — needed for multi-location clients |
| created_at | timestamptz | |

`categories` (per-check compliance score) is currently a JSON blob on the site.
Better as its own table once real inspection results exist:

### `site_check_scores`
| column | type | notes |
|---|---|---|
| site_id | uuid fk | |
| check_key | text | fk → `CHECKS` |
| score | int | 0–100 |
| last_inspected_at | date | |

### `clients`
**Does not exist in the prototype.** Required to fix the single-site client portal.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| name | text | e.g. a restaurant group |
| primary_contact | text | |
| email | text | |

One client → many sites. The client portal should scope to `client_id`, not a
hardcoded site.

### `leads`
Prospects moving through the sales pipeline.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| name, city, contact | text | |
| industry | text | |
| value | numeric | estimated annual value |
| stage | enum | `new` → `audit_scheduled` → `audit_complete` → `proposal_sent` → `signed` |
| term_years | int | set at signature |
| converted | bool | true once a site exists |
| notes | text | |

### `audits`
The free walkthrough. One per lead (or per site for re-audits).

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| lead_id / site_id | uuid fk | one of the two |
| performed_by | uuid fk → users | |
| completed_at | timestamptz | |

### `audit_items`
| column | type | notes |
|---|---|---|
| audit_id | uuid fk | |
| check_key | text | |
| status | enum | `pass` \| `fail` \| `na` |
| note | text | becomes the quote description on fail |
| photo_url | text | prototype only stores a bool — needs real storage |

Failed items become quotes. See `quotesFromFindings()` in `src/lib/quotes.js`.

### `quotes`
A unit of billable work. This is where margin lives.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| site_id | uuid fk | |
| category | text | fk → `CHECKS` |
| title, description | text | |
| status | enum | `needs_quote` → `requested` → `quoted` → `contracted` |
| vendor_id | uuid fk nullable | |
| client_price | numeric | what the client pays |
| vendor_cost | numeric | what the sub is paid |
| vendor_status | enum | `unassigned` \| `offered` \| `accepted` \| `declined` \| `completed` |
| due_date | date | |
| source | enum | `employee` \| `client` |

**derived:** `margin = client_price − vendor_cost`, `margin_pct`.

### `vendors`
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| name | text | |
| rate | numeric | per check |
| capacity | int | checks per day |
| type | enum | `subcontractor` \| `in_house` |
| rating | numeric | |

### `vendor_checks`
Join table — which checks a vendor can perform.

| vendor_id | check_key |
|---|---|

### `recruits`
Subcontractor recruiting CRM.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| company, contact, email, phone, city | text | |
| status | enum | `not_contacted` \| `invited` \| `accepted` \| `active` \| `declined` |
| invited_at | timestamptz | |
| notes | text | |
| vendor_id | uuid fk nullable | set when activated |

`recruit_checks` join table mirrors `vendor_checks`.

### `contracts`
The recurring agreement — the actual product.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| site_id | uuid fk | |
| term_years | int | |
| started_on | date | |
| renews_on | date | |
| annual_value | numeric | |

`contract_checks` join table lists covered checks.

**derived:** status (`active` / `renewing` within 90d / `expired`), ARR.

### `activity`
Append-only event log.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| type | enum | `passed` \| `report` \| `scheduled` \| `vendor` \| `signed` |
| title, detail | text | |
| actor_id | uuid fk | |
| created_at | timestamptz | |

### `users`
**Does not exist in the prototype** — the portal picker is a stub.

| column | type | notes |
|---|---|---|
| id | uuid pk | |
| email | text unique | |
| role | enum | `employee` \| `client` \| `vendor` |
| client_id / vendor_id | uuid fk nullable | scopes what they can see |

---

## Derived values — keep computed, don't store

| value | where | why |
|---|---|---|
| Inspection due dates | `lib/schedule.js` | derived from check cadence + last inspection |
| Overdue / due-soon counts | `lib/schedule.js` | changes daily |
| Margin, margin % | `lib/format.js` | always `price − cost` |
| ARR | contracts sum | changes as contracts sign/lapse |
| Contract status | `lib/schedule.js` | purely a function of `renews_on` vs today |
| Compliance score | `overallScore()` | mean of per-check scores |

> **Note on the schedule engine:** the prototype fakes due dates with a stable
> hash so the demo is deterministic (`scheduleForSite`). In production, replace
> it with `last_inspected_at + cadence`. `TODAY` in `lib/schedule.js` is pinned
> to a fixed date for the demo — swap for `new Date()`.

---

## API endpoints

```
GET    /api/sites                    ?industry= &q=
GET    /api/sites/:id
GET    /api/sites/:id/schedule       derived
POST   /api/sites

GET    /api/leads
POST   /api/leads
PATCH  /api/leads/:id                { stage }
POST   /api/leads/:id/audit          { items[] }        -> creates audit + items
POST   /api/leads/:id/convert        -> site + contract + quotes from findings

GET    /api/quotes                   ?status= &site_id=
POST   /api/quotes
PATCH  /api/quotes/:id               { status, vendor_id, client_price, vendor_cost }

GET    /api/contracts                derived status + ARR
POST   /api/contracts/:id/renew

GET    /api/vendors
GET    /api/recruits
POST   /api/recruits
POST   /api/recruits/:id/invite      -> sends email, sets status=invited
PATCH  /api/recruits/:id             { status }
POST   /api/recruits/:id/activate    { rate, capacity } -> creates vendor

GET    /api/vendor/jobs              scoped to authed vendor
PATCH  /api/vendor/jobs/:id          { vendor_status }

GET    /api/activity
```

---

## Known gaps to close

1. **Auth** — the portal picker is cosmetic. Needs real sessions and row-level
   scoping by `role` + `client_id` / `vendor_id`.
2. **Multi-site clients** — `CLIENT_SITE_ID` is hardcoded in `data/seed.js`.
   Introduce `clients` and scope the client portal to it.
3. **Email dispatch** — `lib/email.js` composes the invite but nothing sends it.
   Wire to Postmark/SendGrid behind `POST /api/recruits/:id/invite`.
4. **Document storage** — `ClientDocuments` is hardcoded. Needs S3-style upload
   plus a `documents` table keyed by site and check.
5. **Photo capture** — audit items store a boolean, not a file.
