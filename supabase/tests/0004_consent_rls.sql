-- Prove that a browser session cannot fabricate the signed legal evidence
-- created by the Auth hook, while an unrelated self-service consent remains
-- available for future opt-in flows.
begin;

create extension if not exists pgtap with schema extensions;
grant usage on schema extensions to authenticated;
set local search_path = extensions, public, pg_temp;

select plan(3);

insert into auth.users(
  id,
  instance_id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000000041'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'consent-rls-test@example.invalid',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  clock_timestamp(),
  clock_timestamp()
);

select set_config(
  'request.jwt.claim.sub',
  '00000000-0000-4000-8000-000000000041',
  true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select throws_ok(
  $sql$
    insert into public.consent_records(
      user_id, consent_type, policy_version, locale, granted
    )
    values (
      auth.uid(), 'terms', 'forged-terms-v1', 'es', true
    )
  $sql$,
  '42501',
  null,
  'Authenticated users cannot fabricate Terms acceptance'
);

select throws_ok(
  $sql$
    insert into public.consent_records(
      user_id, consent_type, policy_version, locale, granted
    )
    values (
      auth.uid(), 'privacy', 'forged-privacy-v1', 'es', true
    )
  $sql$,
  '42501',
  null,
  'Authenticated users cannot fabricate Privacy acknowledgement'
);

select lives_ok(
  $sql$
    insert into public.consent_records(
      user_id, consent_type, policy_version, locale, granted
    )
    values (
      auth.uid(), 'marketing', 'marketing-test-v1', 'es', true
    )
  $sql$,
  'A separate non-registration opt-in remains available to its owner'
);

reset role;
select * from finish();
rollback;
