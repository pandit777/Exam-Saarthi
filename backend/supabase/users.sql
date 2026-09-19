-- Run this once in the Supabase SQL Editor.
-- Signup now stores only name and email in the public profile table.
alter table public.users
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists mobile text,
  add column if not exists university text,
  add column if not exists course text,
  add column if not exists avatar_url text,
  add column if not exists role text default 'user',
  add column if not exists active boolean default true;

create unique index if not exists users_email_unique_idx
  on public.users (lower(email));

-- These fields are not collected during signup and must not block profile creation.
alter table public.users
  alter column name drop not null,
  alter column email drop not null,
  alter column role set default 'user',
  alter column active set default true;

-- Profile photos are stored in Supabase Storage; only their public URL is kept here.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;