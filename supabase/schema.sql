-- Exhale Compliance — core schema + row-level security.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is guarded with IF NOT EXISTS / OR REPLACE / DROP...IF EXISTS.

create extension if not exists "uuid-ossp";

-- ── Enums ────────────────────────────────────────────────────────────────
do $$ begin
  create type user_role as enum ('employee','client','vendor');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_stage as enum ('new','audit_scheduled','audit_complete','proposal_sent','signed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type quote_status as enum ('needs_quote','requested','quoted','contracted');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vendor_job_status as enum ('unassigned','offered','accepted','declined','completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type quote_source as enum ('employee','client');
exception when duplicate_object then null; end $$;

do $$ begin
  create type recruit_status as enum ('not_contacted','invited','accepted','active','declined');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vendor_type as enum ('subcontractor','in_house');
exception when duplicate_object then null; end $$;

do $$ begin
  create type activity_type as enum ('passed','report','scheduled','vendor','signed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type audit_item_status as enum ('pass','fail','na');
exception when duplicate_object then null; end $$;

-- ── Tables ───────────────────────────────────────────────────────────────

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  primary_contact text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists vendors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  rate numeric not null default 0,
  capacity int not null default 0,
  type vendor_type not null default 'subcontractor',
  rating numeric not null default 5.0,
  created_at timestamptz not null default now()
);

create table if not exists vendor_checks (
  vendor_id uuid references vendors(id) on delete cascade,
  check_key text not null,
  primary key (vendor_id, check_key)
);

create table if not exists sites (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete set null,
  name text not null,
  city text,
  address text,
  industry text not null,
  assets int not null default 0,
  contact_name text,
  contact_role text,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now()
);

create table if not exists site_check_scores (
  site_id uuid references sites(id) on delete cascade,
  check_key text not null,
  score int not null default 100,
  last_inspected_at date,
  primary key (site_id, check_key)
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text,
  contact text,
  industry text not null,
  value numeric not null default 0,
  stage lead_stage not null default 'new',
  term_years int,
  converted boolean not null default false,
  notes text,
  site_id uuid references sites(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists audits (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  site_id uuid references sites(id) on delete cascade,
  performed_by uuid references auth.users(id),
  completed_at timestamptz default now()
);

create table if not exists audit_items (
  id uuid primary key default uuid_generate_v4(),
  audit_id uuid references audits(id) on delete cascade,
  check_key text not null,
  status audit_item_status not null,
  note text,
  photo_url text
);

create table if not exists quotes (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid references sites(id) on delete cascade,
  category text not null,
  title text not null,
  description text,
  status quote_status not null default 'needs_quote',
  vendor_id uuid references vendors(id) on delete set null,
  client_price numeric not null default 0,
  vendor_cost numeric not null default 0,
  vendor_status vendor_job_status not null default 'unassigned',
  due_date date,
  source quote_source not null default 'employee',
  created_at timestamptz not null default now()
);

create table if not exists recruits (
  id uuid primary key default uuid_generate_v4(),
  company text not null,
  contact text,
  email text,
  phone text,
  city text,
  status recruit_status not null default 'not_contacted',
  invited_at timestamptz,
  notes text,
  vendor_id uuid references vendors(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists recruit_checks (
  recruit_id uuid references recruits(id) on delete cascade,
  check_key text not null,
  primary key (recruit_id, check_key)
);

create table if not exists contracts (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid references sites(id) on delete cascade,
  term_years int not null,
  started_on date not null,
  renews_on date not null,
  annual_value numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contract_checks (
  contract_id uuid references contracts(id) on delete cascade,
  check_key text not null,
  primary key (contract_id, check_key)
);

create table if not exists activity (
  id uuid primary key default uuid_generate_v4(),
  type activity_type not null,
  title text not null,
  detail text,
  actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- Extends auth.users with the role + scoping every RLS policy below reads.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'client',
  client_id uuid references clients(id) on delete set null,
  vendor_id uuid references vendors(id) on delete set null,
  created_at timestamptz not null default now()
);

-- New auth.users row -> matching profiles row, defaulting to the least-privileged role.
-- An employee must promote it via: update profiles set role='employee' where email='...';
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Role helpers (used by RLS policies below) ───────────────────────────
create or replace function public.current_role() returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.current_client_id() returns uuid as $$
  select client_id from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.current_vendor_id() returns uuid as $$
  select vendor_id from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

-- ── Row-level security ───────────────────────────────────────────────────
-- Employees: full access to everything (the internal ops tool).
-- Clients: read-only on their own sites/quotes/contracts, can create service requests.
-- Vendors: read their own vendor row + jobs assigned to them, can update job status on those.

alter table clients enable row level security;
alter table vendors enable row level security;
alter table vendor_checks enable row level security;
alter table sites enable row level security;
alter table site_check_scores enable row level security;
alter table leads enable row level security;
alter table audits enable row level security;
alter table audit_items enable row level security;
alter table quotes enable row level security;
alter table recruits enable row level security;
alter table recruit_checks enable row level security;
alter table contracts enable row level security;
alter table contract_checks enable row level security;
alter table activity enable row level security;
alter table profiles enable row level security;

-- profiles
drop policy if exists "profiles_self_select" on profiles;
create policy "profiles_self_select" on profiles for select using (id = auth.uid() or current_role() = 'employee');
drop policy if exists "profiles_self_update" on profiles;
create policy "profiles_self_update" on profiles for update using (id = auth.uid());

-- clients
drop policy if exists "clients_employee_all" on clients;
create policy "clients_employee_all" on clients for all using (current_role() = 'employee');
drop policy if exists "clients_self_select" on clients;
create policy "clients_self_select" on clients for select using (id = current_client_id());

-- vendors
drop policy if exists "vendors_employee_all" on vendors;
create policy "vendors_employee_all" on vendors for all using (current_role() = 'employee');
drop policy if exists "vendors_self_select" on vendors;
create policy "vendors_self_select" on vendors for select using (id = current_vendor_id());

-- vendor_checks
drop policy if exists "vendor_checks_employee_all" on vendor_checks;
create policy "vendor_checks_employee_all" on vendor_checks for all using (current_role() = 'employee');
drop policy if exists "vendor_checks_self_select" on vendor_checks;
create policy "vendor_checks_self_select" on vendor_checks for select using (vendor_id = current_vendor_id());

-- sites
drop policy if exists "sites_employee_all" on sites;
create policy "sites_employee_all" on sites for all using (current_role() = 'employee');
drop policy if exists "sites_client_select" on sites;
create policy "sites_client_select" on sites for select using (client_id = current_client_id());
drop policy if exists "sites_vendor_select" on sites;
create policy "sites_vendor_select" on sites for select using (
  id in (select site_id from quotes where vendor_id = current_vendor_id())
);

-- site_check_scores
drop policy if exists "scores_employee_all" on site_check_scores;
create policy "scores_employee_all" on site_check_scores for all using (current_role() = 'employee');
drop policy if exists "scores_client_select" on site_check_scores;
create policy "scores_client_select" on site_check_scores for select using (
  site_id in (select id from sites where client_id = current_client_id())
);

-- leads — employees only
drop policy if exists "leads_employee_all" on leads;
create policy "leads_employee_all" on leads for all using (current_role() = 'employee');

-- audits / audit_items — employees only
drop policy if exists "audits_employee_all" on audits;
create policy "audits_employee_all" on audits for all using (current_role() = 'employee');
drop policy if exists "audit_items_employee_all" on audit_items;
create policy "audit_items_employee_all" on audit_items for all using (current_role() = 'employee');

-- quotes
drop policy if exists "quotes_employee_all" on quotes;
create policy "quotes_employee_all" on quotes for all using (current_role() = 'employee');
drop policy if exists "quotes_client_select" on quotes;
create policy "quotes_client_select" on quotes for select using (
  site_id in (select id from sites where client_id = current_client_id())
);
drop policy if exists "quotes_client_insert" on quotes;
create policy "quotes_client_insert" on quotes for insert with check (
  site_id in (select id from sites where client_id = current_client_id()) and source = 'client'
);
drop policy if exists "quotes_vendor_select" on quotes;
create policy "quotes_vendor_select" on quotes for select using (vendor_id = current_vendor_id());
drop policy if exists "quotes_vendor_update" on quotes;
create policy "quotes_vendor_update" on quotes for update using (vendor_id = current_vendor_id());

-- recruits / recruit_checks — employees only
drop policy if exists "recruits_employee_all" on recruits;
create policy "recruits_employee_all" on recruits for all using (current_role() = 'employee');
drop policy if exists "recruit_checks_employee_all" on recruit_checks;
create policy "recruit_checks_employee_all" on recruit_checks for all using (current_role() = 'employee');

-- contracts / contract_checks
drop policy if exists "contracts_employee_all" on contracts;
create policy "contracts_employee_all" on contracts for all using (current_role() = 'employee');
drop policy if exists "contracts_client_select" on contracts;
create policy "contracts_client_select" on contracts for select using (
  site_id in (select id from sites where client_id = current_client_id())
);
drop policy if exists "contract_checks_employee_all" on contract_checks;
create policy "contract_checks_employee_all" on contract_checks for all using (current_role() = 'employee');
drop policy if exists "contract_checks_client_select" on contract_checks;
create policy "contract_checks_client_select" on contract_checks for select using (
  contract_id in (select id from contracts where site_id in (select id from sites where client_id = current_client_id()))
);

-- activity — employees only
drop policy if exists "activity_employee_all" on activity;
create policy "activity_employee_all" on activity for all using (current_role() = 'employee');

-- ── Storage ──────────────────────────────────────────────────────────────
-- One bucket for both client documents and audit photos, split by folder prefix.
-- Run in the SQL editor too (storage.buckets/objects are just tables under the hood).
insert into storage.buckets (id, name, public)
values ('exhale-files', 'exhale-files', false)
on conflict (id) do nothing;

drop policy if exists "files_employee_all" on storage.objects;
create policy "files_employee_all" on storage.objects for all using (
  bucket_id = 'exhale-files' and current_role() = 'employee'
);
drop policy if exists "files_client_select" on storage.objects;
create policy "files_client_select" on storage.objects for select using (
  bucket_id = 'exhale-files' and (storage.foldername(name))[1] = 'sites' and
  (storage.foldername(name))[2] in (select id::text from sites where client_id = current_client_id())
);
