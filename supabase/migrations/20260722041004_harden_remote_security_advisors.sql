-- Remove implicit PUBLIC execution from privileged RPCs. PostgreSQL grants
-- EXECUTE to PUBLIC on new functions unless it is explicitly revoked.
begin;

revoke all on function public.admin_set_user_role(uuid, public.app_role, boolean, text)
  from public, anon;
revoke all on function public.complete_privileged_onboarding()
  from public, anon;
revoke all on function public.mark_notification_read(uuid)
  from public, anon;
revoke all on function public.update_my_profile(text, public.app_locale, text, text)
  from public, anon;

grant execute on function public.admin_set_user_role(uuid, public.app_role, boolean, text)
  to authenticated, service_role;
grant execute on function public.complete_privileged_onboarding()
  to authenticated, service_role;
grant execute on function public.mark_notification_read(uuid)
  to authenticated, service_role;
grant execute on function public.update_my_profile(text, public.app_locale, text, text)
  to authenticated, service_role;

-- Public buckets already permit direct public object URLs. Broad SELECT
-- policies additionally expose object listings and are not required.
drop policy if exists content_media_public_read on storage.objects;
drop policy if exists avatars_public_read on storage.objects;

commit;
