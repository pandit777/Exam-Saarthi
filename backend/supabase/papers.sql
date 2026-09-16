-- Run this once in the Supabase SQL Editor.
-- Existing papers stay intact; new admin uploads keep their actual exam year.
alter table public.papers
  add column if not exists year text;

create index if not exists papers_course_semester_idx
  on public.papers (course_name, semester);
