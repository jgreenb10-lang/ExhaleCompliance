/* Master catalog: every inspectable check, and which checks each industry requires. */

const CADENCE_DAYS = { Monthly: 30, Quarterly: 90, Semiannual: 182, Annual: 365 };

export const CHECKS = {
  fire_extinguisher: { key: "fire_extinguisher", label: "Fire Extinguisher Inspection", category: "Fire & Life Safety", cadence: "Monthly", vendorRate: 12 },
  exit_lighting: { key: "exit_lighting", label: "Emergency Exit Lighting", category: "Fire & Life Safety", cadence: "Monthly", vendorRate: 15 },
  ansul_system: { key: "ansul_system", label: "Kitchen Suppression System", category: "Fire & Life Safety", cadence: "Semiannual", vendorRate: 145 },
  fire_alarm: { key: "fire_alarm", label: "Fire Alarm System Test", category: "Fire & Life Safety", cadence: "Annual", vendorRate: 210 },
  sprinkler: { key: "sprinkler", label: "Sprinkler System Inspection", category: "Fire & Life Safety", cadence: "Annual", vendorRate: 260 },
  backflow: { key: "backflow", label: "Backflow Prevention Test", category: "Water & Plumbing", cadence: "Annual", vendorRate: 95 },
  grease_trap: { key: "grease_trap", label: "Grease Trap Pump-Out", category: "Water & Plumbing", cadence: "Quarterly", vendorRate: 180 },
  hood_cleaning: { key: "hood_cleaning", label: "Kitchen Hood & Duct Cleaning", category: "Fire & Life Safety", cadence: "Quarterly", vendorRate: 220 },
  elevator: { key: "elevator", label: "Elevator Safety Inspection", category: "Equipment", cadence: "Annual", vendorRate: 340 },
  boiler: { key: "boiler", label: "Boiler / Pressure Vessel", category: "Equipment", cadence: "Annual", vendorRate: 300 },
  hvac: { key: "hvac", label: "HVAC Preventive Maintenance", category: "Equipment", cadence: "Quarterly", vendorRate: 165 },
  generator: { key: "generator", label: "Emergency Generator Test", category: "Equipment", cadence: "Semiannual", vendorRate: 190 },
  pest_control: { key: "pest_control", label: "Pest Control Service", category: "Sanitation", cadence: "Monthly", vendorRate: 85 },
  health_dept: { key: "health_dept", label: "Health Department Self-Audit", category: "Sanitation", cadence: "Quarterly", vendorRate: 110 },
  playground: { key: "playground", label: "Playground Equipment Safety", category: "Equipment", cadence: "Annual", vendorRate: 150 },
  pool_chem: { key: "pool_chem", label: "Pool Chemical & Drain Compliance", category: "Water & Plumbing", cadence: "Monthly", vendorRate: 70 },
  ada_signage: { key: "ada_signage", label: "ADA Signage & Access Review", category: "General", cadence: "Annual", vendorRate: 130 },
  electrical_panel: { key: "electrical_panel", label: "Electrical Panel Inspection", category: "Equipment", cadence: "Annual", vendorRate: 175 },
};

export const INDUSTRIES = {
  restaurant: {
    key: "restaurant",
    label: "Restaurant",
    checks: ["fire_extinguisher", "exit_lighting", "ansul_system", "grease_trap", "hood_cleaning", "pest_control", "health_dept", "backflow"],
  },
  hotel: {
    key: "hotel",
    label: "Hotel & Hospitality",
    checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "elevator", "boiler", "hvac", "generator", "pool_chem", "ada_signage"],
  },
  retail: {
    key: "retail",
    label: "Retail",
    checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "ada_signage", "electrical_panel", "pest_control"],
  },
  office: {
    key: "office",
    label: "Office / Commercial",
    checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "hvac", "generator", "elevator", "electrical_panel"],
  },
  healthcare: {
    key: "healthcare",
    label: "Healthcare Facility",
    checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "sprinkler", "generator", "hvac", "boiler", "ada_signage", "backflow"],
  },
  education: {
    key: "education",
    label: "Education / Childcare",
    checks: ["fire_extinguisher", "exit_lighting", "fire_alarm", "playground", "pest_control", "hvac", "backflow", "ada_signage"],
  },
};

export function industryOf(key) {
  return INDUSTRIES[key] || { key, label: key || "Unknown", checks: [] };
}

export function checkOf(key) {
  return CHECKS[key] || { key, label: key || "Unknown Check", category: "General", cadence: "Annual", vendorRate: 100 };
}

export function cadenceDays(cadence) {
  return CADENCE_DAYS[cadence] || 365;
}
