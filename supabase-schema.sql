-- PC REZA CENTER - Supabase setup
-- Run this script in Supabase Dashboard > SQL Editor.
-- After creating your account with phone + password, set its role to admin using the query at the bottom.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.service_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text default '',
  icon text default '📌',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  details text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.service_items enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Public can read active services" on public.service_items;
create policy "Public can read active services" on public.service_items
for select to anon, authenticated using (active = true);

drop policy if exists "Admins manage services" on public.service_items;
create policy "Admins manage services" on public.service_items
for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
for select to authenticated using (id = auth.uid());

drop policy if exists "Public can submit orders" on public.orders;
create policy "Public can submit orders" on public.orders
for insert to anon, authenticated with check (true);

drop policy if exists "Admins can read and update orders" on public.orders;
create policy "Admins can read and update orders" on public.orders
for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 1) First create your manager account from Supabase Authentication > Users
--    Use phone number and password. Then copy that user's UUID.
-- 2) Replace USER_UUID below and run:
-- insert into public.profiles (id, role) values ('USER_UUID', 'admin')
-- on conflict (id) do update set role = 'admin';
