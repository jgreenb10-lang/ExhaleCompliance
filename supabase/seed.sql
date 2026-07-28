-- Generated from src/data/seed.js — run after schema.sql.

insert into clients (id, name, primary_contact, email) values
  ('c9b4da6c-b130-41ae-908a-c5243304d080', 'Downtown Lofts Apartments Group', 'Theo Papas', 'theo@downtownloftspdx.com');

insert into vendors (id, name, rate, capacity, type, rating) values
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'Apex Fire Protection', 40, 8, 'subcontractor', 4.8),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'Redline Fire & Safety', 55, 6, 'subcontractor', 4.9),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'Cascade Mechanical', 90, 5, 'subcontractor', 4.6),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'Northwest Backflow Co.', 65, 7, 'subcontractor', 4.7),
  ('e24c79ad-659a-495f-af93-9f32cdded490', 'In-House Maintenance Team', 30, 10, 'in_house', 5);

insert into vendor_checks (vendor_id, check_key) values
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'fire_extinguisher'),
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'exit_lighting'),
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'fire_alarm'),
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'fire_sprinklers'),
  ('26004bbc-33ff-4c1f-a51d-5fe814e59cba', 'fire_doors'),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'fire_extinguisher'),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'kitchen_suppression'),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'fire_alarm'),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'fire_sprinklers'),
  ('638ef30b-d758-4f5d-9706-5bc408f30f67', 'hangar_suppression'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'hvac_maintenance'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'emergency_generator'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'ups_battery'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'insulation_resistance'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'thermal_scan'),
  ('762e89a4-fccf-4079-8050-8ffc83016593', 'panel_clearance'),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'backflow_prevention'),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'grease_trap'),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'water_heater_tp'),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'ammonia_refrigeration'),
  ('9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 'legionella_testing'),
  ('e24c79ad-659a-495f-af93-9f32cdded490', 'fire_extinguisher'),
  ('e24c79ad-659a-495f-af93-9f32cdded490', 'exit_lighting'),
  ('e24c79ad-659a-495f-af93-9f32cdded490', 'walking_surfaces');

insert into sites (id, client_id, name, city, address, industry, assets, contact_name, contact_role, contact_phone, contact_email) values
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', null, 'Riverside Grill', 'Portland, OR', '412 SW River Pkwy, Portland, OR 97201', 'food_hospitality', 14, 'Marcus Diaz', 'Owner', '503-555-0114', 'marcus@riversidegrillpdx.com'),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', null, 'Harbor House Terminal', 'Seattle, WA', '1180 Alaskan Way, Seattle, WA 98101', 'aviation_maritime', 46, 'Renee Foster', 'Facilities Director', '206-555-0177', 'renee.foster@harborhouseterminal.com'),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', null, 'Union Square Retail', 'San Francisco, CA', '233 Geary St, San Francisco, CA 94102', 'commercial_re', 22, 'Alan Cho', 'Store Manager', '415-555-0163', 'alan.cho@unionsquareretail.com'),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', null, 'Meridian Data Center', 'Denver, CO', '1801 California St, Denver, CO 80202', 'energy_utilities', 38, 'Sandra Kim', 'Data Center Operations Manager', '720-555-0142', 'sandra.kim@meridiandatacenter.com'),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', null, 'Cascade Family Clinic', 'Portland, OR', '5600 SE Powell Blvd, Portland, OR 97206', 'healthcare', 19, 'Dr. Lisa Nguyen', 'Practice Manager', '503-555-0189', 'lnguyen@cascadefamilyclinic.com'),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', null, 'Bright Start Academy', 'Tacoma, WA', '2210 6th Ave, Tacoma, WA 98403', 'education', 12, 'Karen Bell', 'Director', '253-555-0121', 'karen.bell@brightstartacademy.com'),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', c9b4da6c-b130-41ae-908a-c5243304d080, 'Downtown Lofts Apartments', 'Portland, OR', '88 SW 3rd Ave, Portland, OR 97204', 'residential', 9, 'Theo Papas', 'Property Manager', '503-555-0198', 'theo@downtownloftspdx.com'),
  ('252651cd-e243-4387-9502-c48f16160708', null, 'Lakeside Manufacturing Plant', 'Spokane, WA', '801 N Lakeside Dr, Spokane, WA 99201', 'industrial', 33, 'Priya Malhotra', 'Plant Manager', '509-555-0156', 'priya.malhotra@lakesidemfg.com');

insert into site_check_scores (site_id, check_key, score) values
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'kitchen_suppression', 88),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'grease_trap', 82),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'fire_extinguisher', 96),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'exit_lighting', 91),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'chemical_storage', 90),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'ammonia_refrigeration', 95),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'backflow_prevention', 93),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'hangar_suppression', 74),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'fire_extinguisher', 94),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'guardrails', 89),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'walking_surfaces', 91),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'compressed_gas', 96),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'emergency_generator', 79),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'elevator_inspection', 90),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'facade_envelope', 85),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'stairwell_pressurization', 93),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'legionella_testing', 88),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'backflow_prevention', 92),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'ada_signage', 95),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'fire_alarm', 87),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'panel_clearance', 76),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'ups_battery', 82),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'thermal_scan', 91),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'emergency_generator', 93),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'insulation_resistance', 90),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'containment_leak_test', 97),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'panel_clearance', 88),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'fire_extinguisher', 98),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'exit_lighting', 96),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'medical_gas_systems', 94),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'emergency_generator', 90),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'legionella_testing', 89),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'cleanroom_particle', 93),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'fire_sprinklers', 92),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'ada_signage', 99),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'fire_extinguisher', 93),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'exit_lighting', 90),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'iaq_co2', 85),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'chemical_storage', 94),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'playground_safety', 77),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'egress_pathways', 96),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'backflow_prevention', 91),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'fire_extinguisher', 92),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'exit_lighting', 88),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'water_heater_tp', 79),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'guardrails', 86),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'ada_signage', 94),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'egress_pathways', 90),
  ('252651cd-e243-4387-9502-c48f16160708', 'fire_extinguisher', 95),
  ('252651cd-e243-4387-9502-c48f16160708', 'panel_clearance', 88),
  ('252651cd-e243-4387-9502-c48f16160708', 'thermal_scan', 91),
  ('252651cd-e243-4387-9502-c48f16160708', 'dust_containment', 80),
  ('252651cd-e243-4387-9502-c48f16160708', 'chemical_storage', 90),
  ('252651cd-e243-4387-9502-c48f16160708', 'walking_surfaces', 91),
  ('252651cd-e243-4387-9502-c48f16160708', 'guardrails', 86),
  ('252651cd-e243-4387-9502-c48f16160708', 'ammonia_refrigeration', 93);

insert into leads (id, name, city, contact, industry, value, stage, term_years, converted, notes) values
  ('7021730c-f90c-489d-964b-149c4c1015eb', 'Sunset Bistro', 'Eugene, OR', 'Maria Chen', 'food_hospitality', 7200, 'new', null, false, 'Referral from Riverside Grill.'),
  ('a9313581-42a1-4b81-9b74-ec6f2658123a', 'Pinecrest Business Park', 'Boise, ID', 'Tom Reyes', 'commercial_re', 9800, 'audit_scheduled', null, false, 'Free audit booked for next week.'),
  ('16433027-4bfa-427f-9db6-8e16acf42059', 'Golden Gate Daycare', 'San Francisco, CA', 'Priya Patel', 'education', 5400, 'audit_complete', null, false, ''),
  ('9d4bfa0f-e278-472f-b4cc-236019d4c36a', 'Blue Ridge Diner', 'Tacoma, WA', 'Sam Okafor', 'food_hospitality', 6100, 'proposal_sent', null, false, ''),
  ('4abd9981-4df5-4df9-b3fe-fb92a9cdb9c0', 'Fairview Medical Plaza', 'Denver, CO', 'Dana Wu', 'healthcare', 11200, 'signed', 3, false, 'Ready to convert.');

-- one synthetic audit per lead that already has findings, plus its audit_items
insert into audits (id, lead_id) values ('38e9d891-345a-4e72-8c39-7015906ba1e6', '16433027-4bfa-427f-9db6-8e16acf42059');
insert into audit_items (audit_id, check_key, status, note) values
  ('38e9d891-345a-4e72-8c39-7015906ba1e6', 'fire_extinguisher', 'fail', '3 units past inspection tag date.'),
  ('38e9d891-345a-4e72-8c39-7015906ba1e6', 'exit_lighting', 'fail', '2 fixtures not illuminating on battery test.');

insert into audits (id, lead_id) values ('8c4cf15a-e258-4c7e-89a2-30e354ebf54a', '9d4bfa0f-e278-472f-b4cc-236019d4c36a');
insert into audit_items (audit_id, check_key, status, note) values
  ('8c4cf15a-e258-4c7e-89a2-30e354ebf54a', 'kitchen_suppression', 'fail', 'Suppression system overdue for semiannual service.');

insert into audits (id, lead_id) values ('43e1f761-f57c-487d-bedf-8dff5a1fa496', '4abd9981-4df5-4df9-b3fe-fb92a9cdb9c0');
insert into audit_items (audit_id, check_key, status, note) values
  ('43e1f761-f57c-487d-bedf-8dff5a1fa496', 'emergency_generator', 'fail', 'Generator failed load-bank test, needs service before sign-off.');

insert into quotes (site_id, category, title, description, status, vendor_id, client_price, vendor_cost, vendor_status, due_date, source) values
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'kitchen_suppression', 'Kitchen Hood Suppression System', 'Semiannual service due, tag expired.', 'contracted', '638ef30b-d758-4f5d-9706-5bc408f30f67', 240, 145, 'completed', '2026-07-14', 'employee'),
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 'backflow_prevention', 'Backflow Preventer Certification', 'Annual certification lapsed two weeks ago.', 'requested', '9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 160, 95, 'offered', '2026-07-29', 'employee'),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'hangar_suppression', 'Hangar Foam Suppression Trip Test', 'Annual trip test overdue.', 'requested', '638ef30b-d758-4f5d-9706-5bc408f30f67', 500, 300, 'offered', '2026-08-13', 'client'),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 'emergency_generator', 'Emergency Generator Load-Bank Test', 'Monthly load-bank test flagged low coolant.', 'quoted', '762e89a4-fccf-4079-8050-8ffc83016593', 310, 190, 'unassigned', '2026-08-05', 'employee'),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'panel_clearance', 'Electrical Panel Clearance & Labeling', 'Panel labeling out of date, clearance partially blocked.', 'needs_quote', null, 190, 120, 'unassigned', '2026-08-23', 'employee'),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 'fire_alarm', 'Fire Alarm System Test', 'Two pull stations failed test, retest scheduled.', 'contracted', '638ef30b-d758-4f5d-9706-5bc408f30f67', 340, 210, 'accepted', '2026-08-04', 'employee'),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 'ups_battery', 'UPS Battery Impedance Test', 'Battery bank flagged elevated impedance on last scan.', 'contracted', '762e89a4-fccf-4079-8050-8ffc83016593', 290, 175, 'accepted', '2026-08-01', 'employee'),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 'legionella_testing', 'Cooling Tower Legionella Testing', 'Annual test overdue by 3 weeks.', 'requested', '9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 240, 145, 'offered', '2026-08-08', 'employee'),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 'playground_safety', 'Playground Equipment Safety', 'Fall-zone surfacing depth below standard.', 'needs_quote', null, 245, 150, 'unassigned', '2026-08-18', 'client'),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 'water_heater_tp', 'Water Heater T&P Relief Valve Check', 'Relief discharge pipe not terminating within code height.', 'quoted', '9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 125, 75, 'unassigned', '2026-08-11', 'client'),
  ('252651cd-e243-4387-9502-c48f16160708', 'ammonia_refrigeration', 'Ammonia Refrigeration Line Thickness Test', 'Ultrasonic thickness test found wall loss near the valve manifold.', 'contracted', '9f5a8b9c-8ba4-4ea7-9696-f228e9e1d5e0', 430, 260, 'completed', '2026-07-19', 'employee');

insert into recruits (id, company, contact, email, phone, city, status, notes) values
  ('5a2e86de-076e-4e44-ad56-dc1b0291794e', 'Summit Life Safety', 'Jordan Blake', 'jordan@summitlifesafety.com', '206-555-0142', 'Seattle, WA', 'not_contacted', 'Found via state contractor license lookup.'),
  ('08f8c461-c7d7-47b7-bd06-d8d8c96a6317', 'Evergreen Backflow Testing', 'Casey Lin', 'casey@evergreenbackflow.com', '503-555-0198', 'Portland, OR', 'invited', 'Referred by Northwest Backflow Co.'),
  ('afd9c1ab-66a6-46ec-90a1-d52ca73eff58', 'Rocky Mountain HVAC Group', 'Priya Anand', 'priya@rmhvacgroup.com', '720-555-0177', 'Denver, CO', 'accepted', 'Wants a 2027 start.'),
  ('7ba8c4c8-5f07-4483-83c8-463e5901d82f', 'Titan Elevator Services', 'Marcus Webb', 'marcus@titanelevator.com', '425-555-0133', 'Seattle, WA', 'declined', 'Rates too low for their minimum job size.');

insert into contracts (site_id, term_years, started_on, renews_on, annual_value) values
  ('fb9a3fb9-e2f9-49e7-8b91-fbd0132667c0', 2, '2025-02-01', '2027-02-01', 8200),
  ('d6a7b253-acfd-494a-812e-113afdc156b3', 3, '2023-09-01', '2026-09-15', 18500),
  ('86a473d4-ad39-484a-a340-10eacb672c3e', 1, '2025-08-01', '2026-08-10', 7400),
  ('45ca4519-c210-4ee1-b51b-587f1da35473', 3, '2024-01-01', '2027-01-10', 15600),
  ('ec9b9b64-4de5-45c1-a843-e37b5c4d0438', 2, '2025-03-01', '2027-03-01', 9800),
  ('bfd961ab-b403-4fe7-8021-20f5ee4af066', 1, '2025-10-01', '2026-10-05', 6200),
  ('af97c4d8-79b2-4444-894d-6582bb735f3e', 3, '2024-06-01', '2027-06-01', 4100),
  ('252651cd-e243-4387-9502-c48f16160708', 2, '2024-12-01', '2026-12-01', 12800);

insert into activity (type, title, detail) values
  ('passed', 'Job completed', 'Ammonia Refrigeration Line Thickness Test — Lakeside Manufacturing Plant'),
  ('vendor', 'Vendor accepted job', 'UPS Battery Impedance Test — Meridian Data Center'),
  ('report', 'New quote request', 'Union Square Retail — Electrical Panel Clearance & Labeling'),
  ('scheduled', 'Quote requested from vendor', 'Cascade Family Clinic — Cooling Tower Legionella Testing'),
  ('signed', 'Agreement renewed', 'Union Square Retail — 1 yr'),
  ('report', 'Free audit completed', 'Golden Gate Daycare — 2 findings'),
  ('vendor', 'Invite email sent', 'Evergreen Backflow Testing'),
  ('passed', 'Job completed', 'Kitchen Hood Suppression System — Riverside Grill');

