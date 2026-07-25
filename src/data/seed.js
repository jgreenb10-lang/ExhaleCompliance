/* Demo data. Replace each export with an API call to move onto a backend. */

export const CLIENT_SITE_ID = 7;

export const initialSites = [
  { id: 1, name: "Riverside Grill", city: "Portland, OR", industry: "restaurant", assets: 14,
    categories: { fire_extinguisher: 96, exit_lighting: 91, ansul_system: 88, grease_trap: 82, hood_cleaning: 74, pest_control: 95, health_dept: 90, backflow: 93 } },
  { id: 2, name: "Harbor House Hotel", city: "Seattle, WA", industry: "hotel", assets: 46,
    categories: { fire_extinguisher: 94, exit_lighting: 89, fire_alarm: 92, sprinkler: 90, elevator: 71, boiler: 85, hvac: 88, generator: 79, pool_chem: 96, ada_signage: 97 } },
  { id: 3, name: "Union Square Retail", city: "San Francisco, CA", industry: "retail", assets: 22,
    categories: { fire_extinguisher: 90, exit_lighting: 93, fire_alarm: 87, ada_signage: 95, electrical_panel: 76, pest_control: 92 } },
  { id: 4, name: "Meridian Office Tower", city: "Denver, CO", industry: "office", assets: 38,
    categories: { fire_extinguisher: 97, exit_lighting: 95, fire_alarm: 84, sprinkler: 91, hvac: 89, generator: 93, elevator: 90, electrical_panel: 88 } },
  { id: 5, name: "Cascade Family Clinic", city: "Portland, OR", industry: "healthcare", assets: 19,
    categories: { fire_extinguisher: 98, exit_lighting: 96, fire_alarm: 94, sprinkler: 92, generator: 90, hvac: 87, boiler: 91, ada_signage: 99, backflow: 89 } },
  { id: 6, name: "Bright Start Academy", city: "Tacoma, WA", industry: "education", assets: 12,
    categories: { fire_extinguisher: 93, exit_lighting: 90, fire_alarm: 88, playground: 77, pest_control: 94, hvac: 85, backflow: 91, ada_signage: 96 } },
  { id: 7, name: "Downtown Diner", city: "Portland, OR", industry: "restaurant", assets: 9,
    categories: { fire_extinguisher: 92, exit_lighting: 88, ansul_system: 81, grease_trap: 79, hood_cleaning: 83, pest_control: 90, health_dept: 86, backflow: 94 } },
  { id: 8, name: "Lakeside Suites", city: "Spokane, WA", industry: "hotel", assets: 33,
    categories: { fire_extinguisher: 95, exit_lighting: 92, fire_alarm: 90, sprinkler: 94, elevator: 84, boiler: 88, hvac: 91, generator: 86, pool_chem: 80, ada_signage: 93 } },
];

export const initialVendors = [
  { id: 1, name: "Apex Fire Protection", checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler"], rate: 40, capacity: 8, type: "subcontractor", rating: 4.8 },
  { id: 2, name: "Redline Fire & Safety", checks: ["fire_extinguisher", "ansul_system", "hood_cleaning", "fire_alarm", "sprinkler"], rate: 55, capacity: 6, type: "subcontractor", rating: 4.9 },
  { id: 3, name: "Cascade Mechanical", checks: ["hvac", "boiler", "generator", "electrical_panel"], rate: 90, capacity: 5, type: "subcontractor", rating: 4.6 },
  { id: 4, name: "Northwest Backflow Co.", checks: ["backflow", "grease_trap", "pool_chem"], rate: 65, capacity: 7, type: "subcontractor", rating: 4.7 },
  { id: 5, name: "In-House Maintenance Team", checks: ["fire_extinguisher", "exit_lighting", "pest_control"], rate: 30, capacity: 10, type: "in_house", rating: 5.0 },
];

export const initialQuotes = [
  { id: 201, siteId: 1, category: "hood_cleaning", title: "Kitchen Hood & Duct Cleaning", description: "Grease buildup exceeds tolerance on main line hood.", status: "contracted", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 380, vendorCost: 220, vendorStatus: "completed", dueDate: new Date(2026, 6, 14), source: "employee" },
  { id: 202, siteId: 1, category: "ansul_system", title: "Kitchen Suppression System", description: "Semiannual service due, tag expired.", status: "requested", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 240, vendorCost: 145, vendorStatus: "offered", dueDate: new Date(2026, 6, 29), source: "employee" },
  { id: 203, siteId: 2, category: "elevator", title: "Elevator Safety Inspection", description: "Annual cert lapses end of month.", status: "needs_quote", vendor: null, vendorId: null, clientPrice: 560, vendorCost: 340, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 13), source: "client" },
  { id: 204, siteId: 2, category: "generator", title: "Emergency Generator Test", description: "Load test found low coolant, needs follow-up.", status: "quoted", vendor: "Cascade Mechanical", vendorId: 3, clientPrice: 310, vendorCost: 190, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 5), source: "employee" },
  { id: 205, siteId: 3, category: "electrical_panel", title: "Electrical Panel Inspection", description: "Panel labeling out of date, one breaker flagged warm.", status: "needs_quote", vendor: null, vendorId: null, clientPrice: 290, vendorCost: 175, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 23), source: "employee" },
  { id: 206, siteId: 4, category: "fire_alarm", title: "Fire Alarm System Test", description: "Two pull stations failed test.", status: "contracted", vendor: "Redline Fire & Safety", vendorId: 2, clientPrice: 340, vendorCost: 210, vendorStatus: "accepted", dueDate: new Date(2026, 7, 1), source: "employee" },
  { id: 207, siteId: 5, category: "backflow", title: "Backflow Prevention Test", description: "Annual test overdue by 3 weeks.", status: "requested", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 160, vendorCost: 95, vendorStatus: "offered", dueDate: new Date(2026, 7, 8), source: "employee" },
  { id: 208, siteId: 6, category: "playground", title: "Playground Equipment Safety", description: "Fall-zone surfacing depth below standard.", status: "needs_quote", vendor: null, vendorId: null, clientPrice: 245, vendorCost: 150, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 18), source: "client" },
  { id: 209, siteId: 7, category: "grease_trap", title: "Grease Trap Pump-Out", description: "Trap at capacity, client flagged slow drain.", status: "quoted", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 300, vendorCost: 180, vendorStatus: "unassigned", dueDate: new Date(2026, 7, 11), source: "client" },
  { id: 210, siteId: 8, category: "pool_chem", title: "Pool Chemical & Drain Compliance", description: "Chemical log gaps found during walkthrough.", status: "contracted", vendor: "Northwest Backflow Co.", vendorId: 4, clientPrice: 115, vendorCost: 70, vendorStatus: "completed", dueDate: new Date(2026, 6, 19), source: "employee" },
];

export const initialLeads = [
  { id: 101, name: "Sunset Bistro", city: "Eugene, OR", contact: "Maria Chen", industry: "restaurant", value: 7200, stage: "new", termYears: null, converted: false, notes: "Referral from Riverside Grill.", findings: [] },
  { id: 102, name: "Pinecrest Business Park", city: "Boise, ID", contact: "Tom Reyes", industry: "office", value: 9800, stage: "audit_scheduled", termYears: null, converted: false, notes: "Free audit booked for next week.", findings: [] },
  { id: 103, name: "Golden Gate Daycare", city: "San Francisco, CA", contact: "Priya Patel", industry: "education", value: 5400, stage: "audit_complete", termYears: null, converted: false, notes: "", findings: [
    { checkKey: "fire_extinguisher", note: "3 units past inspection tag date." },
    { checkKey: "exit_lighting", note: "2 fixtures not illuminating on battery test." },
  ] },
  { id: 104, name: "Blue Ridge Diner", city: "Tacoma, WA", contact: "Sam Okafor", industry: "restaurant", value: 6100, stage: "proposal_sent", termYears: null, converted: false, notes: "", findings: [
    { checkKey: "ansul_system", note: "System overdue for semiannual service." },
  ] },
  { id: 105, name: "Fairview Medical Plaza", city: "Denver, CO", contact: "Dana Wu", industry: "healthcare", value: 11200, stage: "signed", termYears: 3, converted: false, notes: "Ready to convert.", findings: [
    { checkKey: "generator", note: "Generator failed load test, needs service before sign-off." },
  ] },
];

export const initialContracts = [
  { id: 301, siteId: 1, termYears: 2, startedOn: "Feb 2025", renewsOn: new Date(2027, 1, 1), annualValue: 8200, checks: ["fire_extinguisher", "exit_lighting", "ansul_system", "grease_trap", "hood_cleaning", "pest_control", "health_dept", "backflow"] },
  { id: 302, siteId: 2, termYears: 3, startedOn: "Sep 2023", renewsOn: new Date(2026, 8, 15), annualValue: 18500, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "elevator", "boiler", "hvac", "generator", "pool_chem", "ada_signage"] },
  { id: 303, siteId: 3, termYears: 1, startedOn: "Aug 2025", renewsOn: new Date(2026, 7, 10), annualValue: 7400, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "ada_signage", "electrical_panel", "pest_control"] },
  { id: 304, siteId: 4, termYears: 3, startedOn: "Jan 2024", renewsOn: new Date(2027, 0, 10), annualValue: 15600, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "hvac", "generator", "elevator", "electrical_panel"] },
  { id: 305, siteId: 5, termYears: 2, startedOn: "Mar 2025", renewsOn: new Date(2027, 2, 1), annualValue: 9800, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "generator", "hvac", "boiler", "ada_signage", "backflow"] },
  { id: 306, siteId: 6, termYears: 1, startedOn: "Oct 2025", renewsOn: new Date(2026, 9, 5), annualValue: 6200, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "playground", "pest_control", "hvac", "backflow", "ada_signage"] },
  { id: 307, siteId: 7, termYears: 3, startedOn: "Jun 2024", renewsOn: new Date(2027, 5, 1), annualValue: 4100, checks: ["fire_extinguisher", "exit_lighting", "ansul_system", "grease_trap", "hood_cleaning", "pest_control", "health_dept", "backflow"] },
  { id: 308, siteId: 8, termYears: 2, startedOn: "Dec 2024", renewsOn: new Date(2026, 11, 1), annualValue: 12800, checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "elevator", "boiler", "hvac", "generator", "pool_chem", "ada_signage"] },
];

export const initialRecruits = [
  { id: 401, company: "Summit Life Safety", contact: "Jordan Blake", email: "jordan@summitlifesafety.com", phone: "206-555-0142", city: "Seattle, WA", status: "not_contacted", checks: ["fire_extinguisher", "fire_alarm", "sprinkler"], invitedAt: null, notes: "Found via state contractor license lookup.", vendorId: null },
  { id: 402, company: "Evergreen Backflow Testing", contact: "Casey Lin", email: "casey@evergreenbackflow.com", phone: "503-555-0198", city: "Portland, OR", status: "invited", checks: ["backflow", "pool_chem"], invitedAt: "Jul 10", notes: "Referred by Northwest Backflow Co.", vendorId: null },
  { id: 403, company: "Rocky Mountain HVAC Group", contact: "Priya Anand", email: "priya@rmhvacgroup.com", phone: "720-555-0177", city: "Denver, CO", status: "accepted", checks: ["hvac", "boiler", "generator"], invitedAt: "Jul 2", notes: "Wants a 2027 start.", vendorId: null },
  { id: 404, company: "Titan Elevator Services", contact: "Marcus Webb", email: "marcus@titanelevator.com", phone: "425-555-0133", city: "Seattle, WA", status: "declined", checks: ["elevator"], invitedAt: "Jun 18", notes: "Rates too low for their minimum job size.", vendorId: null },
];

export const initialActivity = [
  { id: 501, type: "passed", title: "Job completed", detail: "Pool Chemical & Drain Compliance — Lakeside Suites", date: "Jul 19, 2026" },
  { id: 502, type: "vendor", title: "Vendor accepted job", detail: "Fire Alarm System Test — Meridian Office Tower", date: "Jul 18, 2026" },
  { id: 503, type: "report", title: "New quote request", detail: "Union Square Retail — Electrical Panel Inspection", date: "Jul 17, 2026" },
  { id: 504, type: "scheduled", title: "Quote requested from vendor", detail: "Cascade Family Clinic — Backflow Prevention Test", date: "Jul 16, 2026" },
  { id: 505, type: "signed", title: "Agreement renewed", detail: "Union Square Retail — 1 yr", date: "Jul 14, 2026" },
  { id: 506, type: "report", title: "Free audit completed", detail: "Golden Gate Daycare — 2 findings", date: "Jul 12, 2026" },
  { id: 507, type: "vendor", title: "Invite email sent", detail: "Evergreen Backflow Testing", date: "Jul 10, 2026" },
  { id: 508, type: "passed", title: "Job completed", detail: "Kitchen Hood & Duct Cleaning — Riverside Grill", date: "Jul 8, 2026" },
];
