-- Run this once in the Supabase SQL Editor before enabling email registration.
create table if not exists public.registration_otps (
  email text primary key check (email = lower(email)),
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0 check (attempts between 0 and 5),
  consumed_at timestamptz,
  last_sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.registration_otps enable row level security;
revoke all on public.registration_otps from anon, authenticated;
grant all on public.registration_otps to service_role;

create or replace function public.store_registration_otp(p_email text, p_code_hash text)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  issued_email text;
begin
  insert into public.registration_otps (email, code_hash, expires_at, attempts, consumed_at, last_sent_at)
  values (p_email, p_code_hash, now() + interval '10 minutes', 0, null, now())
  on conflict (email) do update set
    code_hash = excluded.code_hash,
    expires_at = excluded.expires_at,
    attempts = 0,
    consumed_at = null,
    last_sent_at = excluded.last_sent_at
  where public.registration_otps.last_sent_at <= now() - interval '1 minute'
  returning email into issued_email;

  return issued_email is not null;
end;
$$;

create or replace function public.check_registration_otp(p_email text, p_code_hash text)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_otp public.registration_otps%rowtype;
  next_attempts integer;
begin
  select * into current_otp
  from public.registration_otps
  where email = p_email
  for update;

  if not found
    or current_otp.consumed_at is not null
    or current_otp.attempts >= 5
    or current_otp.expires_at <= now() then
    return 0;
  end if;

  update public.registration_otps
  set attempts = attempts + 1
  where email = p_email
  returning attempts into next_attempts;

  if current_otp.code_hash = p_code_hash then
    return next_attempts;
  end if;

  return -1;
end;
$$;

revoke all on function public.check_registration_otp(text, text) from public, anon, authenticated;
grant execute on function public.check_registration_otp(text, text) to service_role;

create or replace function public.consume_registration_otp(p_email text, p_code_hash text)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  consumed_email text;
begin
  update public.registration_otps
  set consumed_at = now()
  where email = p_email
    and code_hash = p_code_hash
    and consumed_at is null
    and attempts between 1 and 5
    and expires_at > now()
  returning email into consumed_email;

  return consumed_email is not null;
end;
$$;

revoke all on function public.store_registration_otp(text, text) from public, anon, authenticated;
revoke all on function public.consume_registration_otp(text, text) from public, anon, authenticated;
grant execute on function public.store_registration_otp(text, text) to service_role;
grant execute on function public.consume_registration_otp(text, text) to service_role;