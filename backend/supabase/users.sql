-- Run this once in the Supabase SQL Editor.
-- Signup now stores only name and email in the public profile table.
alter table public.users
  drop column if exists mobile,
  drop column if exists university,
  drop column if exists course;