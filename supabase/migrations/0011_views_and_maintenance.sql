-- 0011_views_and_maintenance.sql
begin;

create or replace view public.published_country_content
with (security_invoker = true, security_barrier = true)
as
select
  ci.id as content_item_id,
  ci.country_code,
  ci.section_key,
  ci.slug,
  ci.information_type,
  ci.risk_level,
  cv.id as content_version_id,
  cv.version_no,
  cv.last_verified_at,
  cv.next_review_at,
  ct.locale,
  ct.title,
  ct.summary,
  ct.body,
  ct.seo_title,
  ct.seo_description
from public.content_items ci
join public.content_versions cv on cv.id = ci.published_version_id
join public.content_translations ct on ct.content_version_id = cv.id
where ci.status = 'published'
  and ci.deleted_at is null
  and ct.status in ('approved','published')
  and (cv.effective_from is null or cv.effective_from <= now())
  and (cv.effective_until is null or cv.effective_until > now());

grant select on public.published_country_content to anon, authenticated;

create or replace view public.public_package_catalog
with (security_invoker = true, security_barrier = true)
as
select
  sp.id,
  sp.code,
  sp.country_code,
  sp.tier,
  sp.remote_only,
  sp.duration_days,
  spt.locale,
  spt.name,
  spt.short_description,
  spt.full_description,
  spt.includes_summary,
  spt.excludes_summary
from public.service_packages sp
join public.service_package_translations spt on spt.package_id = sp.id
where sp.status = 'active'
  and spt.status in ('approved','published');

grant select on public.public_package_catalog to anon, authenticated;

create or replace function public.complete_privileged_onboarding()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null
     or not private.is_privileged()
     or not private.is_aal2() then
    raise exception 'privileged_aal2_required' using errcode = '42501';
  end if;

  update public.profiles
  set force_password_change = false, updated_at = now()
  where id = auth.uid();

  perform private.append_audit(
    'privileged.onboarding_completed',
    'profiles',
    auth.uid()::text,
    'password changed and TOTP aal2 verified',
    null,
    jsonb_build_object('force_password_change', false),
    'high'
  );
end;
$$;
grant execute on function public.complete_privileged_onboarding() to authenticated;

create or replace function private.expire_time_bound_access()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_grants integer;
  v_participants integer;
  v_holds integer;
  v_assessments integer;
begin
  update public.document_access_grants
  set revoked_at = coalesce(revoked_at, now())
  where revoked_at is null and expires_at <= now();
  get diagnostics v_grants = row_count;

  update public.case_participants
  set revoked_at = coalesce(revoked_at, now()),
      revoke_reason = coalesce(revoke_reason, 'expired automatically')
  where revoked_at is null and expires_at is not null and expires_at <= now();
  get diagnostics v_participants = row_count;

  update public.appointments
  set status = 'expired', updated_at = now()
  where status = 'hold' and hold_expires_at <= now();
  get diagnostics v_holds = row_count;

  delete from public.assessment_sessions
  where expires_at < now() - interval '30 days'
    and user_id is null;
  get diagnostics v_assessments = row_count;

  return jsonb_build_object(
    'document_grants', v_grants,
    'case_participants', v_participants,
    'appointment_holds', v_holds,
    'anonymous_assessments', v_assessments
  );
end;
$$;
revoke all on function private.expire_time_bound_access() from public, anon, authenticated;

create or replace function private.expire_stale_content()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  update public.content_items
  set status = 'expired', updated_at = now()
  where status = 'published'
    and next_review_at is not null
    and next_review_at < now()
    and risk_level in ('high','critical');
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;
revoke all on function private.expire_stale_content() from public, anon, authenticated;

create or replace function private.purge_expired_ai_data()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  delete from public.ai_conversations
  where retention_until <= now();
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;
revoke all on function private.purge_expired_ai_data() from public, anon, authenticated;

commit;
