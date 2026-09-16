-- Run this once in the Supabase SQL Editor.
-- Keeps registration profile fields present and repairs profiles created before
-- the backend started writing these fields.
alter table public.users
  add column if not exists mobile text,
  add column if not exists university text,
  add column if not exists course text;

update public.users as profiles
set
  mobile = coalesce(profiles.mobile, auth_users.raw_user_meta_data ->> 'mobile'),
  university = coalesce(profiles.university, auth_users.raw_user_meta_data ->> 'university'),
  course = coalesce(profiles.course, auth_users.raw_user_meta_data ->> 'course')
from auth.users as auth_users
where profiles.id = auth_users.id
  and (
    profiles.mobile is null
    or profiles.university is null
    or profiles.course is null
  );