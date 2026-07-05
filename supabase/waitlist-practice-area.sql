-- Migration: add practice_area to existing waitlist table

alter table public.waitlist
  add column if not exists practice_area text;

update public.waitlist
set practice_area = 'other'
where practice_area is null;

alter table public.waitlist
  alter column practice_area set not null;

alter table public.waitlist
  drop constraint if exists waitlist_practice_area_valid;

alter table public.waitlist
  add constraint waitlist_practice_area_valid check (
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
  );

drop policy if exists "Allow validated anonymous inserts" on public.waitlist;

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
