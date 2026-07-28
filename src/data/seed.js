/* Demo data. Replace each export with an API call to move onto a backend.
   Sites are spread one-per-industry so the catalog rebuild (8 verticals x
   6 compliance domains) is visible across the whole demo. */

// The client portal signs in as this client, scoped to every site they own
// (not a single hardcoded site) — see App.jsx's clientSites/clientSite.
export const CLIENT_ID = 1;

export const initialClients = [
  { id: 1, name: "Downtown Property Group", primaryContact: "Theo Papas", email: "theo@downtownloftspdx.com" },
];

export const initialSites = [
  { id: 1, name: "Riverside Grill", city: "Portland, OR", address: "412 SW River Pkwy, Portland, OR 97201", industry: "food_hospitality", assets: 14,
    contact: { name: "Marcus Diaz", role: "Owner", phone: "503-555-0114", email: "marcus@riversidegrillpdx.com" },
    categories: { kitchen_suppression: 88, grease_trap: 82, fire_extinguisher: 96, exit_lighting: 91, chemical_storage: 90, ammonia_refrigeration: 95, backflow_prevention: 93 } },
  { id: 2, name: "Harbor House Terminal", city: "Seattle, WA", address: "1180 Alaskan Way, Seattle, WA 98101", industry: "aviation_maritime", assets: 46,
    contact: { name: "Renee Foster", role: "Facilities Director", phone: "206-555-0177", email: "renee.foster@harborhouseterminal.com" },
    categories: { hangar_suppression: 74, fire_extinguisher: 94, guardrails: 89, walking_surfaces: 91, compressed_gas: 96, emergency_generator: 79 } },
  { id: 3, name: "Union Square Retail", city: "San Francisco, CA", address: "233 Geary St, San Francisco, CA 94102", industry: "commercial_re", assets: 22,
    contact: { name: "Alan Cho", role: "Store Manager", phone: "415-555-0163", email: "alan.cho@unionsquareretail.com" },
    categories: { elevator_inspection: 90, facade_envelope: 85, stairwell_pressurization: 93, legionella_testing: 88, backflow_prevention: 92, ada_signage: 95, fire_alarm: 87, panel_clearance: 76 } },
  { id: 4, name: "Meridian Data Center", city: "Denver, CO", address: "1801 California St, Denver, CO 80202", industry: "energy_utilities", assets: 38,
    contact: { name: "Sandra Kim", role: "Data Center Operations Manager", phone: "720-555-0142", email: "sandra.kim@meridiandatacenter.com" },
    categories: { ups_battery: 82, thermal_scan: 91, emergency_generator: 93, insulation_resistance: 90, containment_leak_test: 97, panel_clearance: 88 } },
  { id: 5, name: "Cascade Family Clinic", city: "Portland, OR", address: "5600 SE Powell Blvd, Portland, OR 97206", industry: "healthcare", assets: 19,
    contact: { name: "Dr. Lisa Nguyen", role: "Practice Manager", phone: "503-555-0189", email: "lnguyen@cascadefamilyclinic.com" },
    categories: { fire_extinguisher: 98, exit_lighting: 96, medical_gas_systems: 94, emergency_generator: 90, legionella_testing: 89, cleanroom_particle: 93, fire_sprinklers: 92, ada_signage: 99 } },
  { id: 6, name: "Bright Start Academy", city: "Tacoma, WA", address: "2210 6th Ave, Tacoma, WA 98403", industry: "education", assets: 12,
    contact: { name: "Karen Bell", role: "Director", phone: "253-555-0121", email: "karen.bell@brightstartacademy.com" },
    categories: { fire_extinguisher: 93, exit_lighting: 90, iaq_co2: 85, chemical_storage: 94, playground_safety: 77, egress_pathways: 96, backflow_prevention: 91 } },
  { id: 7, name: "Downtown Lofts Apartments", city: "Portland, OR", address: "88 SW 3rd Ave, Portland, OR 97204", industry: "residential", assets: 9, clientId: 1,
    contact: { name: "Theo Papas", role: "Property Manager", phone: "503-555-0198", email: "theo@downtownloftspdx.com" },
    categories: { fire_extinguisher: 92, exit_lighting: 88, water_heater_tp: 79, guardrails: 86, ada_signage: 94, egress_pathways: 90 } },
  { id: 8, name: "Lakeside Manufacturing Plant", city: "Spokane, WA", address: "801 N Lakeside Dr, Spokane, WA 99201", industry: "industrial", assets: 33,
    contact: { name: "Priya Malhotra", role: "Plant Manager", phone: "509-555-0156", email: "priya.malhotra@lakesidemfg.com" },
    categories: { fire_extinguisher: 95, panel_clearance: 88, thermal_scan: 91, dust_containment: 80, chemical_storage: 90, walking_surfaces: 91, guardrails: 86, ammonia_refrigeration: 93 } },
  { id: 9, name: "Riverside Commons Apartments", city: "Portland, OR", address: "1450 SE Riverside Dr, Portland, OR 97214", industry: "residential", assets: 14, clientId: 1,
    contact: { name: "Maria Alvarez", role: "On-Site Manager", phone: "503-555-0177", email: "maria@downtownloftspdx.com" },
    categories: { fire_extinguisher: 90, exit_lighting: 85, water_heater_tp: 88, guardrails: 92, ada_signage: 91, egress_pathways: 87 } },
];

export const initialVendors = [
  { id: 1, name: "Apex Fire Protection", checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "fire_sprinklers", "fire_doors"], rate: 40, capacity: 8, type: "subcontractor", rating: 4.8 },
  { id: 2, name: "Redline Fire & Safety", checks: ["fire_extinguisher", "kitchen_suppression", "fire_alarm", "fire_sprinklers", "hangar_suppression"], rate: 55, capacity: 6, type: "subcontractor", rating: 4.9 },
  { id: 3, name: "Cascade Mechanical", checks: ["hvac_maintenance", "emergency_generator", "ups_battery", "insulation_resistance", "thermal_scan", "panel_clearance"], rate: 90, capacity: 5, type: "subcontractor", rating: 4.6 },
  { id: 4, name: "Northwest Backflow Co.", checks: ["backflow_prevention", "grease_trap", "water_heater_tp", "ammonia_refrigeration", "legionella_testing"], rate: 65, capacity: 7, type: "subcontractor", rating: 4.7 },
  { id: 5, name: "In-House Maintenance Team", checks: ["fire_extinguisher", "exit_lighting", "walking_surfaces", "playground_safety"], rate: 30, capacity: 10, type: "in_house", rating: 5.0 },
];

export const initialQuotes = [
  { id: 201, siteId: 1, category: "kitchen_suppression", title: "Kitchen Hood Suppression System", description: "Semiannual service due, tag expired.", status: "contracted", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 240, vendorCost: 145, vendorStatus: "completed", dueDate: new Date(2026, 6, 14), source: "employee" },
  { id: 202, siteId: 1, category: "backflow_prevention", title: "Backflow Preventer Certification", description: "Annual certification lapsed two weeks ago.", status: "requested", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 160, vendorCost: 95, vendorStatus: "offered", dueDate: new Date(2026, 6, 29), source: "employee" },
  { id: 203, siteId: 2, category: "hangar_suppression", title: "Hangar Foam Suppression Trip Test", description: "Annual trip test overdue.", status: "requested", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 500, vendorCost: 300, vendorStatus: "offered", dueDate: new Date(2026, 7, 13), source: "client" },
  { id: 204, siteId: 2, category: "emergency_generator", title: "Emergency Generator Load-Bank Test", description: "Monthly load-bank test flagged low coolant.", status: "quoted", vendor: "Cascade Mechanical", vendorId: 3, clientPrice: 310, vendorCost: 190, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 5), source: "employee" },
  { id: 205, siteId: 3, category: "panel_clearance", title: "Electrical Panel Clearance & Labeling", description: "Panel labeling out of date, clearance partially blocked.", status: "needs_quote", vendor: null, vendorId: null, clientPrice: 190, vendorCost: 120, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 23), source: "employee" },
  { id: 211, siteId: 3, category: "fire_alarm", title: "Fire Alarm System Test", description: "Two pull stations failed test, retest scheduled.", status: "contracted", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 340, vendorCost: 210, vendorStatus: "accepted", dueDate: new Date(2026, 7, 4), source: "employee" },
  { id: 206, siteId: 4, category: "ups_battery", title: "UPS Battery Impedance Test", description: "Battery bank flagged elevated impedance on last scan.", status: "contracted", vendor: "Cascade Mechanical", vendorId: 3, clientPrice: 290, vendorCost: 175, vendorStatus: "accepted", dueDate: new Date(2026, 7, 1), source: "employee" },
  { id: 207, siteId: 5, category: "legionella_testing", title: "Cooling Tower Legionella Testing", description: "Annual test overdue by 3 weeks.", status: "requested", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 240, vendorCost: 145, vendorStatus: "offered", dueDate: new Date(2026, 7, 8), source: "employee" },
  { id: 208, siteId: 6, category: "playground_safety", title: "Playground Equipment Safety", description: "Fall-zone surfacing depth below standard.", status: "needs_quote", vendor: null, vendorId: null, clientPrice: 245, vendorCost: 150, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 18), source: "client" },
  { id: 209, siteId: 7, category: "water_heater_tp", title: "Water Heater T&P Relief Valve Check", description: "Relief discharge pipe not terminating within code height.", status: "quoted", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 125, vendorCost: 75, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 11), source: "client" },
  { id: 210, siteId: 8, category: "ammonia_refrigeration", title: "Ammonia Refrigeration Line Thickness Test", description: "Ultrasonic thickness test found wall loss near the valve manifold.", status: "contracted", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 430, vendorCost: 260, vendorStatus: "completed", dueDate: new Date(2026, 6, 19), source: "employee" },
];

export const initialLeads = [
  { id: 101, name: "Sunset Bistro", city: "Eugene, OR", contact: "Maria Chen", industry: "food_hospitality", value: 7200, stage: "new", termYears: null, converted: false, notes: "Referral from Riverside Grill.", findings: [] },
  { id: 102, name: "Pinecrest Business Park", city: "Boise, ID", contact: "Tom Reyes", industry: "commercial_re", value: 9800, stage: "audit_scheduled", termYears: null, converted: false, notes: "Free audit booked for next week.", findings: [] },
  { id: 103, name: "Golden Gate Daycare", city: "San Francisco, CA", contact: "Priya Patel", industry: "education", value: 5400, stage: "audit_complete", termYears: null, converted: false, notes: "", findings: [
    { checkKey: "fire_extinguisher", note: "3 units past inspection tag date." },
    { checkKey: "exit_lighting", note: "2 fixtures not illuminating on battery test." },
  ] },
  { id: 104, name: "Blue Ridge Diner", city: "Tacoma, WA", contact: "Sam Okafor", industry: "food_hospitality", value: 6100, stage: "proposal_sent", termYears: null, converted: false, notes: "", findings: [
    { checkKey: "kitchen_suppression", note: "Suppression system overdue for semiannual service." },
  ] },
  { id: 105, name: "Fairview Medical Plaza", city: "Denver, CO", contact: "Dana Wu", industry: "healthcare", value: 11200, stage: "signed", termYears: 3, converted: false, notes: "Ready to convert.", findings: [
    { checkKey: "emergency_generator", note: "Generator failed load-bank test, needs service before sign-off." },
  ] },
];

export const initialContracts = [
  { id: 301, siteId: 1, termYears: 2, startedOn: "Feb 2025", renewsOn: new Date(2027, 1, 1), annualValue: 8200, checks: ["kitchen_suppression", "grease_trap", "fire_extinguisher", "exit_lighting", "chemical_storage", "ammonia_refrigeration", "backflow_prevention"] },
  { id: 302, siteId: 2, termYears: 3, startedOn: "Sep 2023", renewsOn: new Date(2026, 8, 15), annualValue: 18500, checks: ["hangar_suppression", "fire_extinguisher", "guardrails", "walking_surfaces", "compressed_gas", "emergency_generator"] },
  { id: 303, siteId: 3, termYears: 1, startedOn: "Aug 2025", renewsOn: new Date(2026, 7, 10), annualValue: 7400, checks: ["elevator_inspection", "facade_envelope", "stairwell_pressurization", "legionella_testing", "backflow_prevention", "ada_signage", "fire_alarm", "panel_clearance"] },
  { id: 304, siteId: 4, termYears: 3, startedOn: "Jan 2024", renewsOn: new Date(2027, 0, 10), annualValue: 15600, checks: ["ups_battery", "thermal_scan", "emergency_generator", "insulation_resistance", "containment_leak_test", "panel_clearance"] },
  { id: 305, siteId: 5, termYears: 2, startedOn: "Mar 2025", renewsOn: new Date(2027, 2, 1), annualValue: 9800, checks: ["fire_extinguisher", "exit_lighting", "medical_gas_systems", "emergency_generator", "legionella_testing", "cleanroom_particle", "fire_sprinklers", "ada_signage"] },
  { id: 306, siteId: 6, termYears: 1, startedOn: "Oct 2025", renewsOn: new Date(2026, 9, 5), annualValue: 6200, checks: ["fire_extinguisher", "exit_lighting", "iaq_co2", "chemical_storage", "playground_safety", "egress_pathways", "backflow_prevention"] },
  { id: 307, siteId: 7, termYears: 3, startedOn: "Jun 2024", renewsOn: new Date(2027, 5, 1), annualValue: 4100, checks: ["fire_extinguisher", "exit_lighting", "water_heater_tp", "guardrails", "ada_signage", "egress_pathways"] },
  { id: 308, siteId: 8, termYears: 2, startedOn: "Dec 2024", renewsOn: new Date(2026, 11, 1), annualValue: 12800, checks: ["fire_extinguisher", "panel_clearance", "thermal_scan", "dust_containment", "chemical_storage", "walking_surfaces", "guardrails", "ammonia_refrigeration"] },
  { id: 309, siteId: 9, termYears: 2, startedOn: "Mar 2025", renewsOn: new Date(2027, 2, 1), annualValue: 5200, checks: ["fire_extinguisher", "exit_lighting", "water_heater_tp", "guardrails", "ada_signage", "egress_pathways"] },
];

export const initialRecruits = [
  { id: 401, company: "Summit Life Safety", contact: "Jordan Blake", email: "jordan@summitlifesafety.com", phone: "206-555-0142", city: "Seattle, WA", status: "not_contacted", checks: ["fire_extinguisher", "fire_alarm", "fire_sprinklers"], invitedAt: null, notes: "Found via state contractor license lookup.", vendorId: null },
  { id: 402, company: "Evergreen Backflow Testing", contact: "Casey Lin", email: "casey@evergreenbackflow.com", phone: "503-555-0198", city: "Portland, OR", status: "invited", checks: ["backflow_prevention", "grease_trap"], invitedAt: "Jul 10", notes: "Referred by Northwest Backflow Co.", vendorId: null },
  { id: 403, company: "Rocky Mountain HVAC Group", contact: "Priya Anand", email: "priya@rmhvacgroup.com", phone: "720-555-0177", city: "Denver, CO", status: "accepted", checks: ["hvac_maintenance", "emergency_generator", "ups_battery"], invitedAt: "Jul 2", notes: "Wants a 2027 start.", vendorId: null },
  { id: 404, company: "Titan Elevator Services", contact: "Marcus Webb", email: "marcus@titanelevator.com", phone: "425-555-0133", city: "Seattle, WA", status: "declined", checks: ["elevator_inspection"], invitedAt: "Jun 18", notes: "Rates too low for their minimum job size.", vendorId: null },
];

export const initialActivity = [
  { id: 501, type: "passed", title: "Job completed", detail: "Ammonia Refrigeration Line Thickness Test — Lakeside Manufacturing Plant", date: "Jul 19, 2026" },
  { id: 502, type: "vendor", title: "Vendor accepted job", detail: "UPS Battery Impedance Test — Meridian Data Center", date: "Jul 18, 2026" },
  { id: 503, type: "report", title: "New quote request", detail: "Union Square Retail — Electrical Panel Clearance & Labeling", date: "Jul 17, 2026" },
  { id: 504, type: "scheduled", title: "Quote requested from vendor", detail: "Cascade Family Clinic — Cooling Tower Legionella Testing", date: "Jul 16, 2026" },
  { id: 505, type: "signed", title: "Agreement renewed", detail: "Union Square Retail — 1 yr", date: "Jul 14, 2026" },
  { id: 506, type: "report", title: "Free audit completed", detail: "Golden Gate Daycare — 2 findings", date: "Jul 12, 2026" },
  { id: 507, type: "vendor", title: "Invite email sent", detail: "Evergreen Backflow Testing", date: "Jul 10, 2026" },
  { id: 508, type: "passed", title: "Job completed", detail: "Kitchen Hood Suppression System — Riverside Grill", date: "Jul 8, 2026" },
];

// Open marketplace bids: quotes with no vendor assigned (vendorId: null,
// vendorStatus: "unassigned") post automatically to every vendor whose
// `checks` cover that quote's category — see Marketplace.jsx.
export const initialBids = [
  { id: 601, quoteId: 205, vendorId: 3, vendorName: "Cascade Mechanical", amount: 110, note: "Can do same week.", submittedAt: "Jul 22" },
  { id: 602, quoteId: 208, vendorId: 5, vendorName: "In-House Maintenance Team", amount: 140, note: "", submittedAt: "Jul 23" },
];
