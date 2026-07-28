/* Master catalog. Two independent axes on purpose — don't merge them:
   - DOMAINS + CHECKS: *what* gets physically inspected (a compliance discipline).
   - INDUSTRIES: *who* you're inspecting it for, and which regulators care.
   Every check lives in exactly one domain; every industry pulls a subset of
   checks. A check's domain never changes based on which industry uses it. */

const CADENCE_DAYS = { Monthly: 30, Quarterly: 90, Semiannual: 182, Annual: 365, FiveYear: 1825 };

export const DOMAINS = {
  life_safety_fire: { key: "life_safety_fire", label: "Life Safety & Fire Protection" },
  electrical_power: { key: "electrical_power", label: "Electrical & Power" },
  hvac_environmental: { key: "hvac_environmental", label: "HVAC, Air & Environmental" },
  plumbing_gas: { key: "plumbing_gas", label: "Plumbing & Gas" },
  structural_envelope: { key: "structural_envelope", label: "Structural & Envelope" },
  accessibility_egress: { key: "accessibility_egress", label: "Accessibility & Egress" },
};

export const CHECKS = {
  // Life Safety & Fire Protection
  fire_extinguisher: { key: "fire_extinguisher", label: "Fire Extinguisher Inspection", domain: "life_safety_fire", code: "NFPA 10", cadence: "Monthly", vendorRate: 12 },
  exit_lighting: { key: "exit_lighting", label: "Emergency Exit Lighting & Signage", domain: "life_safety_fire", code: "NFPA 101", cadence: "Monthly", vendorRate: 15 },
  kitchen_suppression: { key: "kitchen_suppression", label: "Kitchen Hood Suppression System", domain: "life_safety_fire", code: "NFPA 96", cadence: "Semiannual", vendorRate: 145 },
  fire_doors: { key: "fire_doors", label: "Fire Door & Assembly Inspection", domain: "life_safety_fire", code: "NFPA 80", cadence: "Annual", vendorRate: 90 },
  fire_sprinklers: { key: "fire_sprinklers", label: "Fire Sprinkler & Standpipe Test", domain: "life_safety_fire", code: "NFPA 13/25", cadence: "Annual", vendorRate: 220 },
  fire_alarm: { key: "fire_alarm", label: "Fire Alarm System Test", domain: "life_safety_fire", code: "NFPA 72", cadence: "Annual", vendorRate: 210 },
  medical_gas_systems: { key: "medical_gas_systems", label: "Medical Gas & Vacuum System Test", domain: "life_safety_fire", code: "NFPA 99", cadence: "Annual", vendorRate: 260 },
  hangar_suppression: { key: "hangar_suppression", label: "Hangar Foam Suppression Trip Test", domain: "life_safety_fire", code: "NFPA 409", cadence: "Annual", vendorRate: 300 },

  // Electrical & Power
  panel_clearance: { key: "panel_clearance", label: "Electrical Panel Clearance & Labeling", domain: "electrical_power", code: "OSHA 1910.303", cadence: "Annual", vendorRate: 120 },
  gfci_protection: { key: "gfci_protection", label: "GFCI Protection Test", domain: "electrical_power", code: "NEC / OSHA", cadence: "Annual", vendorRate: 60 },
  thermal_scan: { key: "thermal_scan", label: "Infrared Thermal Hot-Spot Scan", domain: "electrical_power", code: "NFPA 70B", cadence: "Annual", vendorRate: 150 },
  emergency_generator: { key: "emergency_generator", label: "Emergency Generator Load-Bank Test", domain: "electrical_power", code: "NFPA 110", cadence: "Monthly", vendorRate: 190 },
  ups_battery: { key: "ups_battery", label: "UPS Battery Impedance Test", domain: "electrical_power", code: "Uptime Institute", cadence: "Quarterly", vendorRate: 175 },
  insulation_resistance: { key: "insulation_resistance", label: "Motor Insulation Resistance (Megger) Test", domain: "electrical_power", code: "NETA", cadence: "Annual", vendorRate: 140 },

  // HVAC, Air & Environmental
  hvac_maintenance: { key: "hvac_maintenance", label: "HVAC Preventive Maintenance", domain: "hvac_environmental", code: "ASHRAE 180", cadence: "Quarterly", vendorRate: 165 },
  iaq_co2: { key: "iaq_co2", label: "Indoor Air Quality & CO2 Monitoring", domain: "hvac_environmental", code: "ASHRAE 62.1", cadence: "Annual", vendorRate: 95 },
  chemical_storage: { key: "chemical_storage", label: "Flammable & Chemical Storage Audit", domain: "hvac_environmental", code: "OSHA 1910.106", cadence: "Annual", vendorRate: 110 },
  dust_containment: { key: "dust_containment", label: "Dust & Fume Containment Check", domain: "hvac_environmental", code: "OSHA 1910.94", cadence: "Annual", vendorRate: 130 },
  legionella_testing: { key: "legionella_testing", label: "Cooling Tower Legionella Testing", domain: "hvac_environmental", code: "CMS / ASHRAE 188", cadence: "Annual", vendorRate: 145 },
  cleanroom_particle: { key: "cleanroom_particle", label: "Cleanroom Particle Count", domain: "hvac_environmental", code: "USP <797>", cadence: "Quarterly", vendorRate: 200 },

  // Plumbing & Gas
  water_heater_tp: { key: "water_heater_tp", label: "Water Heater T&P Relief Valve Check", domain: "plumbing_gas", code: "IPC", cadence: "Annual", vendorRate: 75 },
  backflow_prevention: { key: "backflow_prevention", label: "Backflow Preventer Certification", domain: "plumbing_gas", code: "AWWA", cadence: "Annual", vendorRate: 95 },
  grease_trap: { key: "grease_trap", label: "Grease Trap Pump-Out", domain: "plumbing_gas", code: "Local Health Code", cadence: "Quarterly", vendorRate: 180 },
  compressed_gas: { key: "compressed_gas", label: "Compressed Gas Cylinder Securement", domain: "plumbing_gas", code: "OSHA 1910.101", cadence: "Annual", vendorRate: 60 },
  ammonia_refrigeration: { key: "ammonia_refrigeration", label: "Ammonia Refrigeration Line Thickness Test", domain: "plumbing_gas", code: "PSM / RMP", cadence: "Annual", vendorRate: 260 },

  // Structural & Envelope
  walking_surfaces: { key: "walking_surfaces", label: "Walking & Working Surface Inspection", domain: "structural_envelope", code: "OSHA 1910.22", cadence: "Annual", vendorRate: 85 },
  guardrails: { key: "guardrails", label: "Guardrail & Handrail Inspection", domain: "structural_envelope", code: "OSHA 1910.23", cadence: "Annual", vendorRate: 90 },
  facade_envelope: { key: "facade_envelope", label: "Facade & Building Envelope Inspection", domain: "structural_envelope", code: "Local Law 11", cadence: "FiveYear", vendorRate: 900 },
  elevator_inspection: { key: "elevator_inspection", label: "Elevator Safety Inspection", domain: "structural_envelope", code: "ASME A17.1", cadence: "Annual", vendorRate: 340 },
  roof_inspection: { key: "roof_inspection", label: "Roof & Drainage Inspection", domain: "structural_envelope", code: "IBC", cadence: "Annual", vendorRate: 175 },
  containment_leak_test: { key: "containment_leak_test", label: "Containment Vessel Leak-Rate Test", domain: "structural_envelope", code: "NRC 10 CFR 50", cadence: "Annual", vendorRate: 500 },

  // Accessibility & Egress
  ada_signage: { key: "ada_signage", label: "ADA Signage & Access Review", domain: "accessibility_egress", code: "ADA Title III", cadence: "Annual", vendorRate: 130 },
  egress_pathways: { key: "egress_pathways", label: "Egress Pathway & Panic Hardware Check", domain: "accessibility_egress", code: "NFPA 101", cadence: "Annual", vendorRate: 100 },
  stairwell_pressurization: { key: "stairwell_pressurization", label: "Stairwell Pressurization Test", domain: "accessibility_egress", code: "NFPA 92", cadence: "Annual", vendorRate: 220 },
  playground_safety: { key: "playground_safety", label: "Playground Equipment Safety", domain: "accessibility_egress", code: "CPSC / ASTM", cadence: "Annual", vendorRate: 150 },
};

export const INDUSTRIES = {
  healthcare: {
    key: "healthcare",
    label: "Healthcare & Life Sciences",
    regulators: "Joint Commission, CMS, OSHA, FDA, NFPA 99/101",
    checks: ["fire_extinguisher", "exit_lighting", "medical_gas_systems", "emergency_generator", "legionella_testing", "cleanroom_particle", "fire_sprinklers", "ada_signage"],
  },
  education: {
    key: "education",
    label: "Education (K-12 & Higher Ed)",
    regulators: "State Depts of Education, EPA, Local Fire Marshals, OSHA",
    checks: ["fire_extinguisher", "exit_lighting", "iaq_co2", "chemical_storage", "playground_safety", "egress_pathways", "backflow_prevention"],
  },
  industrial: {
    key: "industrial",
    label: "Industrial, Manufacturing & Chemical Processing",
    regulators: "OSHA 1910, EPA RMP, DHS CFATS, ISO 9001/14001",
    checks: ["fire_extinguisher", "panel_clearance", "thermal_scan", "dust_containment", "chemical_storage", "walking_surfaces", "guardrails", "ammonia_refrigeration"],
  },
  aviation_maritime: {
    key: "aviation_maritime",
    label: "Aviation, Maritime & Transportation",
    regulators: "FAA, TSA, USCG, IMO, MARPOL, FTA",
    checks: ["hangar_suppression", "fire_extinguisher", "guardrails", "walking_surfaces", "compressed_gas", "emergency_generator"],
  },
  food_hospitality: {
    key: "food_hospitality",
    label: "Food & Beverage Processing, Hospitality & Agriculture",
    regulators: "FDA FSMA, USDA, Health Depts, OSHA",
    checks: ["kitchen_suppression", "grease_trap", "fire_extinguisher", "exit_lighting", "chemical_storage", "ammonia_refrigeration", "backflow_prevention"],
  },
  commercial_re: {
    key: "commercial_re",
    label: "Commercial Real Estate, High-Rise Offices & Retail",
    regulators: "Local Building Depts, NFPA, ADA, OSHA, ASHRAE",
    checks: ["elevator_inspection", "facade_envelope", "stairwell_pressurization", "legionella_testing", "backflow_prevention", "ada_signage", "fire_alarm", "panel_clearance"],
  },
  energy_utilities: {
    key: "energy_utilities",
    label: "Energy, Utilities & Mission-Critical Data Centers",
    regulators: "NERC-CIP, NRC, EPA, Uptime Institute, OSHA",
    checks: ["ups_battery", "thermal_scan", "emergency_generator", "insulation_resistance", "containment_leak_test", "panel_clearance"],
  },
  residential: {
    key: "residential",
    label: "Residential Multi-Family & Public Housing",
    regulators: "HUD, Local Housing Authorities, Fire Depts, Rent Boards",
    checks: ["fire_extinguisher", "exit_lighting", "water_heater_tp", "guardrails", "ada_signage", "egress_pathways"],
  },
};

export function industryOf(key) {
  return INDUSTRIES[key] || { key, label: key || "Unknown", regulators: "", checks: [] };
}

export function checkOf(key) {
  return CHECKS[key] || { key, label: key || "Unknown Check", domain: "life_safety_fire", code: "", cadence: "Annual", vendorRate: 100 };
}

export function domainOf(key) {
  return DOMAINS[key] || { key, label: "General" };
}

export function cadenceDays(cadence) {
  return CADENCE_DAYS[cadence] || 365;
}
