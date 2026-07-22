-- 0013_password_change_completion.sql
begin;

create or replace function public.complete_required_password_change()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'authentication_required' using errcode = '28000';
  end if;

  update public.profiles
  set force_password_change = false,
      updated_at = now()
  where id = auth.uid();

  perform private.append_audit(
    'security.password_changed',
    'profiles',
    auth.uid()::text,
    null,
    null,
    jsonb_build_object('required_change_completed', true),
    'medium'
  );
end;
$$;

revoke all on function public.complete_required_password_change() from public, anon;
grant execute on function public.complete_required_password_change() to authenticated;

commit;
