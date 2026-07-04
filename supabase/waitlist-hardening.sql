# Hardening migration — run if you already created the waitlist table

alter table public.waitlist
  drop constraint if exists waitlist_email_format,
  drop constraint if exists waitlist_name_length;

alter table public.waitlist
  add constraint waitlist_email_format check (
    email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and length(email) <= 254
  ),
  add constraint waitlist_name_length check (
    name is null or length(name) <= 100
  );

drop policy if exists "Allow anonymous inserts" on public.waitlist;
drop policy if exists "No public reads" on public.waitlist;
drop policy if exists "Allow validated anonymous inserts" on public.waitlist;
drop policy if exists "Deny anonymous reads" on public.waitlist;
drop policy if exists "Deny anonymous updates" on public.waitlist;
drop policy if exists "Deny anonymous deletes" on public.waitlist;

revoke all on public.waitlist from anon, authenticated;
grant insert on public.waitlist to anon;

create policy "Allow validated anonymous inserts"
  on public.waitlist
  for insert
  to anon
  with check (
    email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and length(email) <= 254
    and (name is null or length(name) <= 100)
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
