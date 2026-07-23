-- Keep privacy-request workflow fields server-owned. Authenticated users submit
-- only the request type, interface locale and optional description through this
-- restricted RPC; status, verification, assignment and resolution fields
-- cannot be forged through the Data API.
begin;

revoke insert on public.data_subject_requests from authenticated;
drop policy if exists dsr_own_insert on public.data_subject_requests;

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
