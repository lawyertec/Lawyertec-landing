-- Run this in your Supabase SQL Editor to create the waitlist table.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  practice_area text not null,
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_format check (
    email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and length(email) <= 254
  ),
  constraint waitlist_name_length check (
    name is null or length(name) <= 100
  ),
  constraint waitlist_practice_area_valid check (
    practice_area in (
      'corporate',
      'labor',
      'tax',
      'criminal',
      'civil',
      'administrative',
      'intellectual_property',
      'constitutional',
      'other'
    )
  )
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

revoke all on public.waitlist from anon, authenticated;
grant insert on public.waitlist to anon;

-- Validated inserts only; no reads/updates/deletes for public roles.
create policy "Allow validated anonymous inserts"
  on public.waitlist
  for insert
  to anon
  with check (
    email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and length(email) <= 254
    and (name is null or length(name) <= 100)
    and practice_area in (
      'corporate',
      'labor',
      'tax',
      'criminal',
      'civil',
      'administrative',
      'intellectual_property',
      'constitutional',
      'other'
    )
  );

create policy "Deny anonymous reads"
  on public.waitlist
  for select
  to anon
  using (false);

create policy "Deny anonymous updates"
  on public.waitlist
  for update
  to anon
  using (false);

create policy "Deny anonymous deletes"
  on public.waitlist
  for delete
  to anon
  using (false);
