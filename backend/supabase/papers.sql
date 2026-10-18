-- Run this once in the Supabase SQL Editor.
create table if not exists public.papers (
  id uuid primary key default gen_random_uuid(),
  paper_id text not null,
  paper_name text not null,
  course_name text not null,
  semester text not null,
  year text,
  google_drive_link text not null,
  created_at timestamptz not null default now()
);

-- Existing papers stay intact; new admin uploads keep their actual exam year.
alter table public.papers
  add column if not exists year text;

create index if not exists papers_course_semester_idx
  on public.papers (course_name, semester);

alter table public.papers enable row level security;
revoke all on public.papers from anon, authenticated;
grant all on public.papers to service_role;
