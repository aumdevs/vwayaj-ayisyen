-- Keep privacy-request workflow fields server-owned. Authenticated users submit
-- only the request type, interface locale and optional description through this
-- restricted RPC; status, verification, assignment and resolution fields
-- cannot be forged through the Data API.
begin;

revoke insert on public.data_subject_requests from authenticated;
revoke update on public.data_subject_requests from authenticated;
drop policy if exists dsr_own_insert on public.data_subject_requests;
drop policy if exists dsr_admin_update on public.data_subject_requests;

create index if not exists dsr_user_open_type_idx
on public.data_subject_requests(user_id, request_type, created_at desc)
where status in ('received', 'identity_check', 'in_progress');

create unique index if not exists outbox_privacy_request_received_unique_idx
on public.outbox_events(event_type, aggregate_id)
where event_type = 'privacy.data_subject_request.received';

create unique index if not exists outbox_privacy_request_completed_unique_idx
on public.outbox_events(event_type, aggregate_id)
where event_type = 'privacy.data_subject_request.completed';

create or replace function public.submit_data_subject_request(
  p_request_type public.data_request_type,
  p_locale public.app_locale,
  p_description text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_description text;
  v_request_id uuid;
  v_request_locale public.app_locale;
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise insufficient_privilege using message = 'Authentication required.';
  end if;

  if char_length(coalesce(p_description, '')) > 2000 then
    raise string_data_right_truncation using message = 'Description is too long.';
  end if;
  v_description := nullif(btrim(coalesce(p_description, '')), '');

  -- Serialize intake per account, then make retries idempotent while the same
  -- right is already open. With six request types this also bounds each user
  -- to at most six simultaneous open queue rows.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text, 20260723)
  );

  select request.id, request.locale
  into v_request_id, v_request_locale
  from public.data_subject_requests as request
  where request.user_id = v_user_id
    and request.request_type = p_request_type
    and request.status in ('received', 'identity_check', 'in_progress')
  order by request.created_at desc
  limit 1;

  if v_request_id is not null then
    insert into public.outbox_events(
      event_type,
      aggregate_type,
      aggregate_id,
      payload
    )
    values (
      'privacy.data_subject_request.received',
      'data_subject_request',
      v_request_id::text,
      jsonb_build_object(
        'locale', v_request_locale::text,
        'request_type', p_request_type::text
      )
    )
    on conflict do nothing;

    return v_request_id;
  end if;

  insert into public.data_subject_requests(
    user_id,
    request_type,
    status,
    locale,
    description,
    identity_verification_method
  )
  values (
    v_user_id,
    p_request_type,
    'received',
    p_locale,
    v_description,
    'authenticated_session'
  )
  returning id into v_request_id;

  v_request_locale := p_locale;

  insert into public.outbox_events(
    event_type,
    aggregate_type,
    aggregate_id,
    payload
  )
  values (
    'privacy.data_subject_request.received',
    'data_subject_request',
    v_request_id::text,
    jsonb_build_object(
      'locale', v_request_locale::text,
      'request_type', p_request_type::text
    )
  )
  on conflict do nothing;

  return v_request_id;
end;
$$;

revoke all on function public.submit_data_subject_request(
  public.data_request_type,
  public.app_locale,
  text
) from public, anon, service_role;
grant execute on function public.submit_data_subject_request(
  public.data_request_type,
  public.app_locale,
  text
) to authenticated;

create or replace function public.complete_data_subject_request(
  p_request_id uuid,
  p_terminal_status public.data_request_status,
  p_identity_verification_method text,
  p_resolution_summary text
)
returns public.data_subject_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_after public.data_subject_requests;
  v_before public.data_subject_requests;
  v_identity_verification_method text;
  v_resolution_summary text;
begin
  if auth.uid() is null or not private.is_admin_aal2() then
    raise insufficient_privilege using message = 'Administrator AAL2 is required.';
  end if;

  if p_terminal_status is null
    or p_terminal_status not in (
      'fulfilled'::public.data_request_status,
      'denied'::public.data_request_status,
      'cancelled'::public.data_request_status
    )
  then
    raise invalid_parameter_value using message = 'A terminal status is required.';
  end if;

  v_identity_verification_method :=
    nullif(btrim(coalesce(p_identity_verification_method, '')), '');
  v_resolution_summary := nullif(btrim(coalesce(p_resolution_summary, '')), '');
  if v_identity_verification_method is null
    or char_length(v_identity_verification_method) not between 3 and 160
    or v_resolution_summary is null
    or char_length(v_resolution_summary) not between 10 and 2000
  then
    raise invalid_parameter_value
      using message = 'Verification method or resolution summary is invalid.';
  end if;

  select request.*
  into v_before
  from public.data_subject_requests as request
  where request.id = p_request_id
  for update;

  if not found then
    raise no_data_found using message = 'Privacy request was not found.';
  end if;
  if v_before.status in ('fulfilled', 'denied', 'cancelled') then
    raise check_violation using message = 'Privacy request is already complete.';
  end if;

  update public.data_subject_requests
  set
    assigned_to = auth.uid(),
    completed_at = clock_timestamp(),
    identity_verification_method = v_identity_verification_method,
    resolution_summary = v_resolution_summary,
    status = p_terminal_status
  where id = p_request_id
  returning * into v_after;

  perform private.append_audit(
    p_action => 'privacy_request_completed',
    p_target_table => 'data_subject_requests',
    p_target_id => p_request_id::text,
    p_reason => v_resolution_summary,
    p_before => jsonb_build_object(
      'assigned_to', v_before.assigned_to,
      'completed_at', v_before.completed_at,
      'identity_verification_method', v_before.identity_verification_method,
      'status', v_before.status
    ),
    p_after => jsonb_build_object(
      'assigned_to', v_after.assigned_to,
      'completed_at', v_after.completed_at,
      'identity_verification_method', v_after.identity_verification_method,
      'status', v_after.status
    ),
    p_risk => 'high',
    p_metadata => jsonb_build_object(
      'locale', v_after.locale::text,
      'request_type', v_after.request_type::text
    )
  );

  insert into public.outbox_events(
    event_type,
    aggregate_type,
    aggregate_id,
    payload
  )
  values (
    'privacy.data_subject_request.completed',
    'data_subject_request',
    v_after.id::text,
    jsonb_build_object(
      'locale', v_after.locale::text,
      'request_type', v_after.request_type::text,
      'status', v_after.status::text
    )
  )
  on conflict do nothing;

  return v_after;
end;
$$;

revoke all on function public.complete_data_subject_request(
  uuid,
  public.data_request_status,
  text,
  text
) from public, anon, service_role;
grant execute on function public.complete_data_subject_request(
  uuid,
  public.data_request_status,
  text,
  text
) to authenticated;

commit;
