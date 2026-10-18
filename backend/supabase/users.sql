-- Run this once in the Supabase SQL Editor.
-- Signup stores verified name, email, university, and course in the public profile table.
alter table public.users
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists mobile text,
  add column if not exists university text,
  add column if not exists course text,
  add column if not exists avatar_url text,
  add column if not exists role text default 'user',
  add column if not exists active boolean default true,
  add column if not exists last_login_at timestamptz;

create unique index if not exists users_email_unique_idx
  on public.users (lower(email));

create index if not exists users_last_login_idx
  on public.users (last_login_at);

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

-- User activity log, available only to the backend service role.
create table if not exists public.user_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  user_email text,
  name text,
  ip_address text,
  action text not null,
  details text,
  created_at timestamptz not null default now()
);

alter table public.user_logs
  add column if not exists user_id uuid,
  add column if not exists user_email text,
  add column if not exists name text,
  add column if not exists ip_address text,
  add column if not exists action text,
  add column if not exists details text,
  add column if not exists created_at timestamptz not null default now();

create index if not exists user_logs_created_at_idx
  on public.user_logs (created_at desc);

alter table public.user_logs enable row level security;
revoke all on public.user_logs from anon, authenticated;
grant all on public.user_logs to service_role;