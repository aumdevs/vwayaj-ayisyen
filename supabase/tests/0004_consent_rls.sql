-- Prove that a browser session cannot fabricate the signed legal evidence
-- created by the Auth hook, while an unrelated self-service consent remains
-- available for future opt-in flows.
begin;

create extension if not exists pgtap with schema extensions;
grant usage on schema extensions to authenticated;
set local search_path = extensions, public, pg_temp;

select plan(8);

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

select throws_ok(
  $sql$
    insert into public.data_subject_requests(
      user_id,
      request_type,
      status,
      locale,
      identity_verification_method,
      assigned_to,
      resolution_summary,
      completed_at
    )
    values (
      auth.uid(),
      'access',
      'fulfilled',
      'es',
      'forged',
      auth.uid(),
      'Forged resolution',
      clock_timestamp()
    )
  $sql$,
  '42501',
  null,
  'Authenticated users cannot forge privacy-request workflow state'
);

select lives_ok(
  $sql$
    select public.submit_data_subject_request(
      'access',
      'es',
      '  Send me my account data.  '
    )
  $sql$,
  'Authenticated users can submit a privacy request through the restricted RPC'
);

select lives_ok(
  $sql$
    select public.submit_data_subject_request(
      'access',
      'pt',
      'Retry after a lost response.'
    )
  $sql$,
  'A repeated open request is handled as an idempotent retry'
);

select is(
  (
    select count(*)
    from public.data_subject_requests
    where user_id = auth.uid()
      and request_type = 'access'
  ),
  1::bigint,
  'Repeated submissions cannot flood the queue with the same open request type'
);

reset role;

select ok(
  (
    select
      count(*) = 1
      and bool_and(
        status = 'received'::public.data_request_status
        and identity_verification_method = 'authenticated_session'
        and description = 'Send me my account data.'
        and assigned_to is null
        and due_at is null
        and resolution_summary is null
        and completed_at is null
      )
    from public.data_subject_requests
    where user_id = '00000000-0000-4000-8000-000000000041'::uuid
      and request_type = 'access'
  ),
  'The RPC owns status, verification, assignment and resolution fields'
);

select * from finish();
rollback;
