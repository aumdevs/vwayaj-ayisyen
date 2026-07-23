-- Prove that a browser session cannot fabricate the signed legal evidence
-- created by the Auth hook, while an unrelated self-service consent remains
-- available for future opt-in flows.
begin;

create extension if not exists pgtap with schema extensions;
grant usage on schema extensions to authenticated;
set local search_path = extensions, public, pg_temp;

select plan(20);

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
  'A repeated open request updates the existing queue record'
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

select throws_ok(
  $sql$
    select public.complete_data_subject_request(
      (
        select id
        from public.data_subject_requests
        where user_id = auth.uid()
          and request_type = 'access'
      ),
      'fulfilled',
      'forged user verification',
      'A browser user cannot resolve their own privacy request.'
    )
  $sql$,
  '42501',
  'Administrator AAL2 is required.',
  'An ordinary authenticated user cannot complete a privacy request'
);

reset role;

select ok(
  (
    select
      count(*) = 1
      and bool_and(
        status = 'received'::public.data_request_status
        and identity_verification_method = 'authenticated_session'
        and description = 'Retry after a lost response.'
        and locale = 'pt'::public.app_locale
        and assigned_to is null
        and due_at is null
        and resolution_summary is null
        and completed_at is null
      )
    from public.data_subject_requests
    where user_id = '00000000-0000-4000-8000-000000000041'::uuid
      and request_type = 'access'
  ),
  'The RPC preserves server-owned state while persisting repeated request details'
);

select throws_ok(
  $sql$
    insert into public.consent_records(
      user_id,
      consent_type,
      policy_version,
      locale,
      scope,
      granted,
      evidence_hash
    )
    values (
      '00000000-0000-4000-8000-000000000041'::uuid,
      'terms',
      'forged-provenance-v1',
      'es',
      '{"mechanism":"signup_terms_checkbox","provenance":"auth_hook_signed_v1","separate_acceptance":true}'::jsonb,
      true,
      'not-a-valid-evidence-hash'
    )
  $sql$,
  '23514',
  null,
  'Granted legal evidence requires signed Auth-hook provenance'
);

select is(
  (
    select count(*)
    from public.outbox_events
    where event_type = 'privacy.data_subject_request.received'
      and aggregate_id = (
        select id::text
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      )
  ),
  1::bigint,
  'A privacy request creates exactly one durable operations event'
);

select ok(
  (
    select bool_and(
      aggregate_type = 'data_subject_request'
      and payload = '{"locale":"es","request_type":"access"}'::jsonb
    )
    from public.outbox_events
    where event_type = 'privacy.data_subject_request.received'
      and aggregate_id = (
        select id::text
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      )
  ),
  'The operations event contains only the minimal routing metadata'
);

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
  '00000000-0000-4000-8000-000000000042'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'privacy-admin-test@example.invalid',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  clock_timestamp(),
  clock_timestamp()
);

insert into public.user_roles(user_id, role, reason)
values (
  '00000000-0000-4000-8000-000000000042'::uuid,
  'admin',
  'pgTAP privacy completion test'
);

select set_config(
  'request.jwt.claim.sub',
  '00000000-0000-4000-8000-000000000042',
  true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-4000-8000-000000000042","role":"authenticated","aal":"aal1"}',
  true
);
set local role authenticated;

select throws_ok(
  $sql$
    select public.complete_data_subject_request(
      (
        select id
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      ),
      'fulfilled',
      'email challenge',
      'Identity verified and account data was delivered.'
    )
  $sql$,
  '42501',
  'Administrator AAL2 is required.',
  'An administrator without AAL2 cannot complete a privacy request'
);

reset role;
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-4000-8000-000000000042","role":"authenticated","aal":"aal2"}',
  true
);
set local role authenticated;

select lives_ok(
  $sql$
    select public.complete_data_subject_request(
      (
        select id
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      ),
      'fulfilled',
      'MFA session and email challenge',
      'Identity was verified and the requested account data was delivered.'
    )
  $sql$,
  'An AAL2 administrator can complete a privacy request through the RPC'
);

select throws_ok(
  $sql$
    select public.complete_data_subject_request(
      (
        select id
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      ),
      'denied',
      'MFA session',
      'A completed request cannot be resolved a second time.'
    )
  $sql$,
  '23514',
  'Privacy request is already complete.',
  'A terminal privacy request cannot be completed twice'
);

reset role;

select ok(
  (
    select
      status = 'fulfilled'::public.data_request_status
      and assigned_to = '00000000-0000-4000-8000-000000000042'::uuid
      and completed_at is not null
      and identity_verification_method = 'MFA session and email challenge'
      and resolution_summary =
        'Identity was verified and the requested account data was delivered.'
    from public.data_subject_requests
    where user_id = '00000000-0000-4000-8000-000000000041'::uuid
      and request_type = 'access'
  ),
  'Completion fields are server-owned and persisted together'
);

select ok(
  (
    select count(*) = 1
      and bool_and(
        actor_id = '00000000-0000-4000-8000-000000000042'::uuid
        and actor_role = 'admin'::public.app_role
        and risk_level = 'high'::public.risk_level
        and reason = 'terminal_status:fulfilled'
        and not (before_data ? 'identity_verification_method')
        and not (after_data ? 'identity_verification_method')
        and position(
          'Identity was verified and the requested account data was delivered.'
          in concat_ws(' ', reason, before_data::text, after_data::text, metadata::text)
        ) = 0
        and position(
          'MFA session and email challenge'
          in concat_ws(' ', reason, before_data::text, after_data::text, metadata::text)
        ) = 0
      )
    from public.audit_log
    where action = 'privacy_request_completed'
      and target_id = (
        select id::text
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      )
  ),
  'Completion creates an attributable high-risk audit record'
);

select ok(
  (
    select count(*) = 1
      and bool_and(
        aggregate_type = 'data_subject_request'
        and payload =
          '{"locale":"pt","request_type":"access","status":"fulfilled"}'::jsonb
      )
    from public.outbox_events
    where event_type = 'privacy.data_subject_request.completed'
      and aggregate_id = (
        select id::text
        from public.data_subject_requests
        where user_id = '00000000-0000-4000-8000-000000000041'::uuid
          and request_type = 'access'
      )
  ),
  'Completion emits exactly one minimal durable operations event'
);

select set_config(
  'request.jwt.claim.sub',
  '00000000-0000-4000-8000-000000000041',
  true
);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-4000-8000-000000000041","role":"authenticated","aal":"aal1"}',
  true
);
set local role authenticated;

select lives_ok(
  $sql$
    select public.submit_data_subject_request(
      'access',
      'fr',
      'A later request after the prior one was completed.'
    )
  $sql$,
  'A completed request does not block a later request for the same right'
);

select is(
  (
    select count(*)
    from public.data_subject_requests
    where user_id = auth.uid()
      and request_type = 'access'
  ),
  2::bigint,
  'A new request receives its own durable workflow after the prior terminal request'
);

select * from finish();
rollback;
