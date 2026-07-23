-- Keep privacy-request workflow fields server-owned. Authenticated users submit
-- only the request type, interface locale and optional description through this
-- restricted RPC; status, verification, assignment and resolution fields
-- cannot be forged through the Data API.
begin;

revoke insert on public.data_subject_requests from authenticated;
drop policy if exists dsr_own_insert on public.data_subject_requests;

create index if not exists dsr_user_open_type_idx
on public.data_subject_requests(user_id, request_type, created_at desc)
where status in ('received', 'identity_check', 'in_progress');

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

  select request.id
  into v_request_id
  from public.data_subject_requests as request
  where request.user_id = v_user_id
    and request.request_type = p_request_type
    and request.status in ('received', 'identity_check', 'in_progress')
  order by request.created_at desc
  limit 1;

  if v_request_id is not null then
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

commit;
