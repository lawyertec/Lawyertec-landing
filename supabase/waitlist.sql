-- Run this in your Supabase SQL Editor to create the waitlist table.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow inserts from the anon key (used by the landing page API).
create policy "Allow anonymous inserts"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Restrict reads to service role only.
create policy "No public reads"
  on public.waitlist
  for select
  to anon
  using (false);
