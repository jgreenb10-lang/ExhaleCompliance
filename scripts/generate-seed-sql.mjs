// One-off generator: turns src/data/seed.js into supabase/seed.sql so the
// live database starts with the same demo data the prototype shipped with.
// Run with: node scripts/generate-seed-sql.mjs > supabase/seed.sql
import crypto from "node:crypto";
import {
  initialSites, initialVendors, initialRecruits, initialQuotes,
  initialLeads, initialContracts, initialActivity, CLIENT_SITE_ID,
} from "../src/data/seed.js";

const uuid = () => crypto.randomUUID();
const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const num = (v) => (v === null || v === undefined ? "null" : Number(v));
const bool = (v) => (v ? "true" : "false");
const date = (v) => (v ? `'${new Date(v).toISOString().slice(0, 10)}'` : "null");

const siteId = new Map();
const vendorId = new Map();
const leadId = new Map();
let sql = "-- Generated from src/data/seed.js — run after schema.sql.\n\n";

sql += "insert into clients (id, name, primary_contact, email) values\n";
const demoClientId = uuid();
sql += `  (${q(demoClientId)}, 'Downtown Lofts Apartments Group', 'Theo Papas', 'theo@downtownloftspdx.com');\n\n`;

sql += "insert into vendors (id, name, rate, capacity, type, rating) values\n";
sql += initialVendors.map((v) => {
  const id = uuid();
  vendorId.set(v.id, id);
  return `  (${q(id)}, ${q(v.name)}, ${num(v.rate)}, ${num(v.capacity)}, ${q(v.type)}, ${num(v.rating)})`;
}).join(",\n") + ";\n\n";

sql += "insert into vendor_checks (vendor_id, check_key) values\n";
sql += initialVendors.flatMap((v) => v.checks.map((c) => `  (${q(vendorId.get(v.id))}, ${q(c)})`)).join(",\n") + ";\n\n";

sql += "insert into sites (id, client_id, name, city, address, industry, assets, contact_name, contact_role, contact_phone, contact_email) values\n";
sql += initialSites.map((s) => {
  const id = uuid();
  siteId.set(s.id, id);
  const clientId = s.id === CLIENT_SITE_ID ? demoClientId : "null";
  return `  (${q(id)}, ${clientId}, ${q(s.name)}, ${q(s.city)}, ${q(s.address)}, ${q(s.industry)}, ${num(s.assets)}, ${q(s.contact?.name)}, ${q(s.contact?.role)}, ${q(s.contact?.phone)}, ${q(s.contact?.email)})`;
}).join(",\n") + ";\n\n";

sql += "insert into site_check_scores (site_id, check_key, score) values\n";
sql += initialSites.flatMap((s) => Object.entries(s.categories).map(([k, score]) =>
  `  (${q(siteId.get(s.id))}, ${q(k)}, ${num(score)})`
)).join(",\n") + ";\n\n";

sql += "insert into leads (id, name, city, contact, industry, value, stage, term_years, converted, notes) values\n";
sql += initialLeads.map((l) => {
  const id = uuid();
  leadId.set(l.id, id);
  return `  (${q(id)}, ${q(l.name)}, ${q(l.city)}, ${q(l.contact)}, ${q(l.industry)}, ${num(l.value)}, ${q(l.stage)}, ${num(l.termYears)}, ${bool(l.converted)}, ${q(l.notes)})`;
}).join(",\n") + ";\n\n";

const leadsWithFindings = initialLeads.filter((l) => l.findings?.length);
if (leadsWithFindings.length) {
  sql += "-- one synthetic audit per lead that already has findings, plus its audit_items\n";
  for (const l of leadsWithFindings) {
    const auditId = uuid();
    sql += `insert into audits (id, lead_id) values (${q(auditId)}, ${q(leadId.get(l.id))});\n`;
    sql += "insert into audit_items (audit_id, check_key, status, note) values\n";
    sql += l.findings.map((f) => `  (${q(auditId)}, ${q(f.checkKey)}, 'fail', ${q(f.note)})`).join(",\n") + ";\n\n";
  }
}

sql += "insert into quotes (site_id, category, title, description, status, vendor_id, client_price, vendor_cost, vendor_status, due_date, source) values\n";
sql += initialQuotes.map((qt) =>
  `  (${q(siteId.get(qt.siteId))}, ${q(qt.category)}, ${q(qt.title)}, ${q(qt.description)}, ${q(qt.status)}, ${qt.vendorId ? q(vendorId.get(qt.vendorId)) : "null"}, ${num(qt.clientPrice)}, ${num(qt.vendorCost)}, ${q(qt.vendorStatus)}, ${date(qt.dueDate)}, ${q(qt.source)})`
).join(",\n") + ";\n\n";

sql += "insert into recruits (id, company, contact, email, phone, city, status, notes) values\n";
sql += initialRecruits.map((r) => {
  const id = uuid();
  return `  (${q(id)}, ${q(r.company)}, ${q(r.contact)}, ${q(r.email)}, ${q(r.phone)}, ${q(r.city)}, ${q(r.status)}, ${q(r.notes)})`;
}).join(",\n") + ";\n\n";

sql += "insert into contracts (site_id, term_years, started_on, renews_on, annual_value) values\n";
sql += initialContracts.map((c) =>
  `  (${q(siteId.get(c.siteId))}, ${num(c.termYears)}, ${date(c.startedOn)}, ${date(c.renewsOn)}, ${num(c.annualValue)})`
).join(",\n") + ";\n\n";

sql += "insert into activity (type, title, detail) values\n";
sql += initialActivity.map((a) => `  (${q(a.type)}, ${q(a.title)}, ${q(a.detail)})`).join(",\n") + ";\n";

console.log(sql);
console.error(`\n-- generated ${initialSites.length} sites, ${initialVendors.length} vendors, ${initialQuotes.length} quotes, ${initialLeads.length} leads, ${initialContracts.length} contracts`);
console.error(`-- demo client_id: ${demoClientId} (owns site "${initialSites.find(s => s.id === CLIENT_SITE_ID)?.name}")`);
console.error("-- NOTE: contract.startedOn strings like 'Feb 2025' parse via Date() below; verify supabase/seed.sql output before running.");
