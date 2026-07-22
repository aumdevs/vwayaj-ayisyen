-- 0007_authorization_functions_and_triggers.sql
begin;

create or replace function private.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.profiles p on p.id = ur.user_id
    where ur.user_id = auth.uid()
      and ur.role = required_role
      and p.account_status = 'active'
  );
$$;

create or replace function private.has_any_role(required_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.profiles p on p.id = ur.user_id
    where ur.user_id = auth.uid()
      and ur.role = any(required_roles)
      and p.account_status = 'active'
  );
$$;

create or replace function private.is_aal2()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;

create or replace function private.is_privileged()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.has_any_role(array[
    'advisor'::public.app_role,
    'professional'::public.app_role,
    'content_editor'::public.app_role,
    'moderator'::public.app_role,
    'admin'::public.app_role,
    'super_admin'::public.app_role
  ]);
$$;

create or replace function private.is_case_participant(p_case_id uuid, p_permission text default null)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.cases c
    where c.id = p_case_id
      and c.client_user_id = auth.uid()
  )
  or exists (
    select 1
    from public.case_participants cp
    where cp.case_id = p_case_id
      and cp.user_id = auth.uid()
      and cp.revoked_at is null
      and cp.starts_at <= now()
      and (cp.expires_at is null or cp.expires_at > now())
      and case p_permission
        when 'view_documents' then cp.can_view_documents
        when 'upload_documents' then cp.can_upload_documents
        when 'message' then cp.can_message
        when 'manage_tasks' then cp.can_manage_tasks
        else true
      end
  );
$$;

create or replace function private.is_case_staff(p_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.case_participants cp
    where cp.case_id = p_case_id
      and cp.user_id = auth.uid()
      and cp.participant_role in ('advisor','professional','observer')
      and cp.revoked_at is null
      and cp.starts_at <= now()
      and (cp.expires_at is null or cp.expires_at > now())
  );
$$;

create or replace function private.has_document_access(p_document_id uuid, p_permission text default 'view')
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.case_documents d
    where d.id = p_document_id
      and d.deleted_at is null
      and private.is_case_participant(
        d.case_id,
        case when p_permission in ('view','download','verify') then 'view_documents' else null end
      )
  )
  or exists (
    select 1
    from public.document_access_grants g
    where g.document_id = p_document_id
      and g.grantee_user_id = auth.uid()
      and g.permission in (p_permission, 'verify')
      and g.revoked_at is null
      and g.starts_at <= now()
      and g.expires_at > now()
  );
$$;

create or replace function private.is_lead_staff(p_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and (
      private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role])
      or exists (
        select 1 from public.leads l
        where l.id = p_lead_id and l.assigned_advisor_id = auth.uid()
      )
    );
$$;

create or replace function private.shares_case_with(p_other_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.cases c
    left join public.case_participants me
      on me.case_id = c.id and me.user_id = auth.uid()
      and me.revoked_at is null and (me.expires_at is null or me.expires_at > now())
    left join public.case_participants them
      on them.case_id = c.id and them.user_id = p_other_user
      and them.revoked_at is null and (them.expires_at is null or them.expires_at > now())
    where (c.client_user_id = auth.uid() or me.user_id is not null)
      and (c.client_user_id = p_other_user or them.user_id is not null)
  );
$$;

create or replace function private.shares_appointment_with(p_other_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.appointments a
    left join public.appointment_participants me
      on me.appointment_id = a.id and me.user_id = auth.uid()
    left join public.appointment_participants them
      on them.appointment_id = a.id and them.user_id = p_other_user
    where (a.booked_by = auth.uid() or a.advisor_id = auth.uid() or me.user_id is not null)
      and (a.booked_by = p_other_user or a.advisor_id = p_other_user or them.user_id is not null)
  );
$$;

create or replace function private.can_read_profile(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() = p_user_id
    or (
      private.is_aal2()
      and private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role])
    )
    or private.shares_case_with(p_user_id)
    or private.shares_appointment_with(p_user_id);
$$;

create or replace function private.is_appointment_participant(p_appointment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.appointments a
    where a.id = p_appointment_id
      and (a.booked_by = auth.uid() or a.advisor_id = auth.uid())
  )
  or exists (
    select 1 from public.appointment_participants ap
    where ap.appointment_id = p_appointment_id
      and ap.user_id = auth.uid()
  );
$$;

create or replace function private.is_course_accessible(p_course_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.courses c
    where c.id = p_course_id and c.status = 'published'
      and (c.public_access or auth.uid() is not null)
  );
$$;

create or replace function private.is_community_banned(p_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_bans b
    where b.user_id = p_user_id
      and b.revoked_at is null
      and b.starts_at <= now()
      and (b.permanent or b.expires_at > now())
  );
$$;

create or replace function private.append_audit(
  p_action text,
  p_target_table text default null,
  p_target_id text default null,
  p_reason text default null,
  p_before jsonb default null,
  p_after jsonb default null,
  p_risk public.risk_level default 'medium',
  p_metadata jsonb default '{}'::jsonb
)
returns bigint
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_id bigint;
  v_role public.app_role;
begin
  select ur.role into v_role
  from public.user_roles ur
  where ur.user_id = auth.uid()
  order by case ur.role
    when 'super_admin' then 1 when 'admin' then 2 when 'professional' then 3
    when 'advisor' then 4 when 'content_editor' then 5 when 'moderator' then 6 else 7 end
  limit 1;

  insert into public.audit_log(
    actor_id, actor_role, action, target_table, target_id, reason,
    before_data, after_data, risk_level, metadata
  ) values (
    auth.uid(), v_role, p_action, p_target_table, p_target_id, p_reason,
    p_before, p_after, p_risk, coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.update_my_profile(
  p_display_name text,
  p_preferred_locale public.app_locale,
  p_timezone text,
  p_country_of_residence text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'authentication_required' using errcode = '28000';
  end if;
  if p_display_name is not null and char_length(trim(p_display_name)) not between 1 and 120 then
    raise exception 'invalid_display_name' using errcode = '22023';
  end if;
  if p_timezone is null or char_length(p_timezone) not between 1 and 100 then
    raise exception 'invalid_timezone' using errcode = '22023';
  end if;

  update public.profiles
  set display_name = nullif(trim(p_display_name), ''),
      preferred_locale = p_preferred_locale,
      timezone = p_timezone,
      country_of_residence = nullif(trim(p_country_of_residence), ''),
      updated_at = now()
  where id = auth.uid()
    and account_status = 'active'
  returning * into v_profile;

  if v_profile.id is null then
    raise exception 'profile_not_found' using errcode = 'P0002';
  end if;

  perform private.append_audit(
    'profile.updated', 'profiles', auth.uid()::text, null, null,
    jsonb_build_object('preferred_locale', p_preferred_locale, 'timezone', p_timezone),
    'low'
  );
  return v_profile;
end;
$$;

create or replace function public.mark_notification_read(p_notification_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.notifications
  set read_at = coalesce(read_at, now())
  where id = p_notification_id and user_id = auth.uid();
  if not found then
    raise exception 'not_found' using errcode = 'P0002';
  end if;
end;
$$;

create or replace function public.admin_set_user_role(
  p_target_user_id uuid,
  p_role public.app_role,
  p_enabled boolean,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_before boolean;
  v_after boolean;
  v_super_admin_count integer;
begin
  if auth.uid() is null or not private.is_aal2() then
    raise exception 'aal2_required' using errcode = '42501';
  end if;
  if not private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role]) then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if p_reason is null or char_length(trim(p_reason)) < 5 then
    raise exception 'reason_required' using errcode = '22023';
  end if;
  if p_role in ('admin','super_admin') and not private.has_role('super_admin') then
    raise exception 'super_admin_required' using errcode = '42501';
  end if;
  if p_target_user_id = auth.uid() and p_role = 'super_admin' and not p_enabled then
    raise exception 'cannot_remove_own_super_admin' using errcode = '42501';
  end if;

  select exists (
    select 1 from public.user_roles
    where user_id = p_target_user_id and role = p_role
  ) into v_before;

  if p_enabled then
    insert into public.user_roles(user_id, role, granted_by, reason)
    values (p_target_user_id, p_role, auth.uid(), trim(p_reason))
    on conflict (user_id, role) do nothing;
  else
    if p_role = 'super_admin' then
      select count(*) into v_super_admin_count
      from public.user_roles where role = 'super_admin';
      if v_super_admin_count <= 1 then
        raise exception 'cannot_remove_last_super_admin' using errcode = '42501';
      end if;
    end if;
    delete from public.user_roles
    where user_id = p_target_user_id and role = p_role;
  end if;

  select exists (
    select 1 from public.user_roles
    where user_id = p_target_user_id and role = p_role
  ) into v_after;

  perform private.append_audit(
    case when p_enabled then 'role.granted' else 'role.revoked' end,
    'user_roles',
    p_target_user_id::text || ':' || p_role::text,
    trim(p_reason),
    jsonb_build_object('enabled', v_before),
    jsonb_build_object('enabled', v_after),
    'critical',
    '{}'::jsonb
  );
end;
$$;

create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles(id, display_name, preferred_locale, account_status)
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 120), ''),
    case
      when coalesce(new.raw_user_meta_data ->> 'preferred_locale', '') in ('ht','fr','es','pt','en')
        then (new.raw_user_meta_data ->> 'preferred_locale')::public.app_locale
      else 'ht'::public.app_locale
    end,
    'active'
  )
  on conflict (id) do nothing;

  insert into public.user_roles(user_id, role, reason)
  values (new.id, 'user', 'automatic signup role')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_auth_user();

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','staff_profiles','professional_organizations','site_settings','feature_flags',
    'content_items','glossary_terms','faq_items','whatsapp_templates',
    'service_packages','comparison_criteria','crm_contacts','leads','crm_tasks',
    'cases','case_tasks','case_documents','data_subject_requests',
    'orders','payments','refunds','appointment_types','appointments',
    'notification_preferences','courses','course_lessons','community_reports',
    'ai_conversations'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function private.set_updated_at()',
      t
    );
  end loop;
end $$;

create or replace function private.prevent_audit_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'audit_log_is_append_only' using errcode = '42501';
end;
$$;

drop trigger if exists audit_log_no_update on public.audit_log;
create trigger audit_log_no_update
before update or delete on public.audit_log
for each row execute function private.prevent_audit_mutation();

create or replace function private.validate_published_content()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_item uuid;
  v_status public.content_status;
  v_ht_status public.translation_status;
  v_sources integer;
begin
  if new.status = 'published' or new.published_version_id is not null then
    if new.published_version_id is null then
      raise exception 'published_version_required' using errcode = '23514';
    end if;
    select cv.content_item_id, cv.status into v_item, v_status
    from public.content_versions cv where cv.id = new.published_version_id;

    if v_item is distinct from new.id or v_status not in ('approved','scheduled','published') then
      raise exception 'invalid_published_version' using errcode = '23514';
    end if;

    select ct.status into v_ht_status
    from public.content_translations ct
    where ct.content_version_id = new.published_version_id and ct.locale = 'ht';

    if v_ht_status not in ('approved','published') then
      raise exception 'approved_kreyol_required' using errcode = '23514';
    end if;

    select count(*) into v_sources
    from public.content_sources cs where cs.content_version_id = new.published_version_id;

    if new.risk_level in ('high','critical') and v_sources = 0 then
      raise exception 'source_required_for_high_risk_content' using errcode = '23514';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists validate_content_publication on public.content_items;
create trigger validate_content_publication
before insert or update of status, published_version_id on public.content_items
for each row execute function private.validate_published_content();

grant usage on schema private to authenticated;
grant execute on function private.has_role(public.app_role) to authenticated;
grant execute on function private.has_any_role(public.app_role[]) to authenticated;
grant execute on function private.is_aal2() to authenticated;
grant execute on function private.is_privileged() to authenticated;
grant execute on function private.is_case_participant(uuid,text) to authenticated;
grant execute on function private.is_case_staff(uuid) to authenticated;
grant execute on function private.has_document_access(uuid,text) to authenticated;
grant execute on function private.is_lead_staff(uuid) to authenticated;
grant execute on function private.can_read_profile(uuid) to authenticated;
grant execute on function private.is_appointment_participant(uuid) to authenticated;
grant execute on function private.is_course_accessible(uuid) to anon, authenticated;
grant execute on function private.is_community_banned(uuid) to authenticated;

revoke all on function private.append_audit(text,text,text,text,jsonb,jsonb,public.risk_level,jsonb)
  from public, anon, authenticated;
grant execute on function public.update_my_profile(text,public.app_locale,text,text) to authenticated;
grant execute on function public.mark_notification_read(uuid) to authenticated;
grant execute on function public.admin_set_user_role(uuid,public.app_role,boolean,text) to authenticated;

commit;
