-- Run this once in the Supabase SQL Editor.
-- Signup now stores only name and email in the public profile table.
alter table public.users
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists role text default 'user',
  add column if not exists active boolean default true,
  drop column if exists mobile,
  drop column if exists university,
  drop column if exists course;

create unique index if not exists users_email_unique_idx
  on public.users (lower(email));