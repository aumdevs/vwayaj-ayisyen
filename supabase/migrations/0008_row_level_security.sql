-- 0008_row_level_security.sql
-- RLS is defense-in-depth. Sensitive server-only DAL must still authorize before using service role.
begin;

create or replace function private.is_admin_aal2()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role]);
$$;

create or replace function private.can_manage_content()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and private.has_any_role(array[
      'content_editor'::public.app_role,'admin'::public.app_role,'super_admin'::public.app_role
    ]);
$$;

create or replace function private.can_moderate()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and private.has_any_role(array[
      'moderator'::public.app_role,'admin'::public.app_role,'super_admin'::public.app_role
    ]);
$$;

create or replace function private.can_manage_finance()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role]);
$$;

create or replace function private.can_manage_case(p_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2()
    and (
      private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role])
      or private.is_case_staff(p_case_id)
    );
$$;

create or replace function private.can_access_contact(p_contact_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_aal2() and (
    private.has_any_role(array['admin'::public.app_role,'super_admin'::public.app_role])
    or exists (
      select 1 from public.leads l
      where l.contact_id = p_contact_id and l.assigned_advisor_id = auth.uid()
    )
  );
$$;

grant execute on function private.is_admin_aal2() to authenticated;
grant execute on function private.can_manage_content() to authenticated;
grant execute on function private.can_moderate() to authenticated;
grant execute on function private.can_manage_finance() to authenticated;
grant execute on function private.can_manage_case(uuid) to authenticated;
grant execute on function private.can_access_contact(uuid) to authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','user_roles','staff_profiles','professional_organizations','professional_memberships',
    'site_settings','feature_flags','countries','country_translations',
    'content_items','content_versions','content_translations','content_sources','content_review_events',
    'glossary_terms','glossary_translations','faq_items','faq_translations','whatsapp_templates',
    'service_packages','service_package_translations','package_prices','package_features','package_feature_translations',
    'comparison_criteria','comparison_criterion_translations','country_comparison_scores',
    'country_comparison_score_translations','assessment_questions','assessment_question_translations',
    'assessment_options','assessment_option_translations','assessment_option_weights',
    'assessment_sessions','assessment_answers','assessment_results',
    'crm_contacts','leads','lead_assignments','crm_tags','crm_contact_tags','crm_tasks','crm_notes',
    'crm_activities','intake_submissions',
    'cases','case_participants','case_status_history','case_tasks','case_notes','case_messages',
    'case_documents','document_access_grants','document_access_events','consent_records',
    'audit_log','security_events','data_subject_requests','admin_invitations','outbox_events',
    'orders','order_items','payments','refunds','stripe_webhook_events',
    'appointment_types','appointment_type_translations','advisor_availability_rules',
    'advisor_availability_exceptions','appointments','appointment_participants',
    'notifications','notification_preferences','notification_deliveries',
    'courses','course_translations','course_modules','course_module_translations',
    'course_lessons','course_lesson_translations','course_enrollments','lesson_progress',
    'community_categories','community_category_translations','community_posts','community_comments',
    'community_reactions','community_reports','moderation_actions','community_bans',
    'content_chunks','ai_conversations','ai_messages','ai_message_citations','ai_feedback'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
  end loop;
end $$;

-- Remove broad API grants; grant back only what the app intentionally exposes.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;

-- Identity
grant select on public.profiles, public.user_roles to authenticated;

create policy profiles_read_authorized on public.profiles
for select to authenticated
using (private.can_read_profile(id));

create policy user_roles_read_self_or_admin on public.user_roles
for select to authenticated
using (user_id = auth.uid() or private.is_admin_aal2());

create policy staff_profiles_self_or_admin on public.staff_profiles
for select to authenticated
using (user_id = auth.uid() or private.is_admin_aal2());

create policy staff_profiles_admin_manage on public.staff_profiles
for all to authenticated
using (private.is_admin_aal2())
with check (private.is_admin_aal2());

create policy professional_org_member_read on public.professional_organizations
for select to authenticated
using (
  private.is_admin_aal2()
  or exists (
    select 1 from public.professional_memberships pm
    where pm.organization_id = id and pm.user_id = auth.uid()
  )
);

create policy professional_org_admin_manage on public.professional_organizations
for all to authenticated
using (private.is_admin_aal2())
with check (private.is_admin_aal2());

create policy professional_memberships_self_or_admin on public.professional_memberships
for select to authenticated
using (user_id = auth.uid() or private.is_admin_aal2());

create policy professional_memberships_admin_manage on public.professional_memberships
for all to authenticated
using (private.is_admin_aal2())
with check (private.is_admin_aal2());

-- Public settings and catalog
grant select on public.site_settings, public.feature_flags, public.countries, public.country_translations
to anon, authenticated;
grant insert, update, delete on public.site_settings, public.feature_flags, public.country_translations
to authenticated;

create policy site_settings_public_read on public.site_settings
for select to anon, authenticated using (is_public);
create policy site_settings_admin_all on public.site_settings
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy feature_flags_public_read on public.feature_flags
for select to anon, authenticated using (public_readable);
create policy feature_flags_admin_all on public.feature_flags
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy countries_active_public on public.countries
for select to anon, authenticated using (active);
create policy countries_admin_all on public.countries
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy country_translations_public on public.country_translations
for select to anon, authenticated
using (
  translation_status in ('approved','published')
  and exists (select 1 from public.countries c where c.code = country_code and c.active)
);
create policy country_translations_content_manage on public.country_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

-- Editorial content
grant select on public.content_items, public.content_versions, public.content_translations,
  public.content_sources, public.glossary_terms, public.glossary_translations,
  public.faq_items, public.faq_translations, public.whatsapp_templates
to anon, authenticated;
grant select, insert, update, delete on public.content_review_events to authenticated;
grant insert, update, delete on public.content_items, public.content_versions, public.content_translations,
  public.content_sources, public.glossary_terms, public.glossary_translations,
  public.faq_items, public.faq_translations, public.whatsapp_templates
to authenticated;

create policy content_items_public on public.content_items
for select to anon, authenticated
using (status = 'published' and published_version_id is not null and deleted_at is null);
create policy content_items_staff on public.content_items
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy content_versions_public on public.content_versions
for select to anon, authenticated
using (
  exists (
    select 1 from public.content_items ci
    where ci.id = content_item_id
      and ci.status = 'published'
      and ci.published_version_id = content_versions.id
      and ci.deleted_at is null
  )
);
create policy content_versions_staff on public.content_versions
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy content_translations_public on public.content_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (
    select 1 from public.content_items ci
    where ci.published_version_id = content_version_id
      and ci.status = 'published' and ci.deleted_at is null
  )
);
create policy content_translations_staff on public.content_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy content_sources_public on public.content_sources
for select to anon, authenticated
using (
  exists (
    select 1 from public.content_items ci
    where ci.published_version_id = content_version_id
      and ci.status = 'published' and ci.deleted_at is null
  )
);
create policy content_sources_staff on public.content_sources
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy content_review_staff on public.content_review_events
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy glossary_public on public.glossary_terms
for select to anon, authenticated using (status = 'published');
create policy glossary_staff on public.glossary_terms
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy glossary_translations_public on public.glossary_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.glossary_terms g where g.id = term_id and g.status = 'published')
);
create policy glossary_translations_staff on public.glossary_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy faq_public on public.faq_items
for select to anon, authenticated using (status = 'published');
create policy faq_staff on public.faq_items
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy faq_translations_public on public.faq_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.faq_items f where f.id = faq_id and f.status = 'published')
);
create policy faq_translations_staff on public.faq_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy whatsapp_templates_public on public.whatsapp_templates
for select to anon, authenticated using (active);
create policy whatsapp_templates_admin on public.whatsapp_templates
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

-- Services, comparison and assessment
grant select on public.service_packages, public.service_package_translations, public.package_prices,
  public.package_features, public.package_feature_translations, public.comparison_criteria,
  public.comparison_criterion_translations, public.country_comparison_scores,
  public.country_comparison_score_translations, public.assessment_questions,
  public.assessment_question_translations, public.assessment_options,
  public.assessment_option_translations, public.assessment_option_weights
to anon, authenticated;
grant select, insert, update, delete on public.service_packages, public.service_package_translations,
  public.package_prices, public.package_features, public.package_feature_translations,
  public.comparison_criteria, public.comparison_criterion_translations,
  public.country_comparison_scores, public.country_comparison_score_translations,
  public.assessment_questions, public.assessment_question_translations,
  public.assessment_options, public.assessment_option_translations, public.assessment_option_weights
to authenticated;
grant select on public.assessment_sessions, public.assessment_answers, public.assessment_results to authenticated;

create policy packages_public on public.service_packages
for select to anon, authenticated using (status = 'active');
create policy packages_admin on public.service_packages
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy package_translations_public on public.service_package_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.service_packages p where p.id = package_id and p.status = 'active')
);
create policy package_translations_admin on public.service_package_translations
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy package_prices_public on public.package_prices
for select to anon, authenticated
using (
  active and (valid_from is null or valid_from <= now())
  and (valid_until is null or valid_until > now())
  and exists (select 1 from public.service_packages p where p.id = package_id and p.status = 'active')
);
create policy package_prices_admin on public.package_prices
for all to authenticated using (private.can_manage_finance()) with check (private.can_manage_finance());

create policy package_features_public on public.package_features
for select to anon, authenticated
using (exists (select 1 from public.service_packages p where p.id = package_id and p.status = 'active'));
create policy package_features_admin on public.package_features
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy package_feature_translations_public on public.package_feature_translations
for select to anon, authenticated
using (
  exists (
    select 1 from public.package_features pf
    join public.service_packages sp on sp.id = pf.package_id
    where pf.id = feature_id and sp.status = 'active'
  )
);
create policy package_feature_translations_admin on public.package_feature_translations
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy comparison_criteria_public on public.comparison_criteria
for select to anon, authenticated using (status = 'published');
create policy comparison_criteria_staff on public.comparison_criteria
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy comparison_criterion_translations_public on public.comparison_criterion_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.comparison_criteria c where c.id = criterion_id and c.status = 'published')
);
create policy comparison_criterion_translations_staff on public.comparison_criterion_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy comparison_scores_public on public.country_comparison_scores
for select to anon, authenticated using (status = 'published');
create policy comparison_scores_staff on public.country_comparison_scores
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy comparison_score_translations_public on public.country_comparison_score_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.country_comparison_scores s where s.id = score_id and s.status = 'published')
);
create policy comparison_score_translations_staff on public.country_comparison_score_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy assessment_questions_public on public.assessment_questions
for select to anon, authenticated using (status = 'published');
create policy assessment_questions_staff on public.assessment_questions
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy assessment_question_translations_public on public.assessment_question_translations
for select to anon, authenticated
using (
  status in ('approved','published')
  and exists (select 1 from public.assessment_questions q where q.id = question_id and q.status = 'published')
);
create policy assessment_question_translations_staff on public.assessment_question_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy assessment_options_public on public.assessment_options
for select to anon, authenticated
using (exists (select 1 from public.assessment_questions q where q.id = question_id and q.status = 'published'));
create policy assessment_options_staff on public.assessment_options
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy assessment_option_translations_public on public.assessment_option_translations
for select to anon, authenticated
using (
  exists (
    select 1 from public.assessment_options o
    join public.assessment_questions q on q.id = o.question_id
    where o.id = option_id and q.status = 'published'
  )
);
create policy assessment_option_translations_staff on public.assessment_option_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy assessment_weights_public on public.assessment_option_weights
for select to anon, authenticated
using (
  exists (
    select 1 from public.assessment_options o
    join public.assessment_questions q on q.id = o.question_id
    where o.id = option_id and q.status = 'published'
  )
);
create policy assessment_weights_staff on public.assessment_option_weights
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy assessment_sessions_own on public.assessment_sessions
for select to authenticated using (user_id = auth.uid());
create policy assessment_answers_own on public.assessment_answers
for select to authenticated
using (exists (select 1 from public.assessment_sessions s where s.id = session_id and s.user_id = auth.uid()));
create policy assessment_results_own on public.assessment_results
for select to authenticated
using (exists (select 1 from public.assessment_sessions s where s.id = session_id and s.user_id = auth.uid()));

-- CRM (server-only ciphertext tables; policies still constrain user-scoped DB access)
grant select, insert, update, delete on public.leads, public.lead_assignments, public.crm_tags,
  public.crm_contact_tags, public.crm_tasks, public.crm_notes, public.crm_activities, public.intake_submissions
to authenticated;
-- Do not grant crm_contacts to browser API. Server-only DAL uses service role after explicit authorization.

create policy crm_contacts_staff on public.crm_contacts
for all to authenticated
using (private.can_access_contact(id))
with check (private.can_access_contact(id) or private.is_admin_aal2());

create policy leads_staff on public.leads
for all to authenticated using (private.is_lead_staff(id)) with check (
  private.is_admin_aal2() or assigned_advisor_id = auth.uid()
);
create policy lead_assignments_staff on public.lead_assignments
for all to authenticated using (private.is_lead_staff(lead_id)) with check (private.is_lead_staff(lead_id));
create policy crm_tags_staff on public.crm_tags
for all to authenticated using (
  private.is_aal2() and private.has_any_role(array[
    'advisor'::public.app_role,'admin'::public.app_role,'super_admin'::public.app_role
  ])
) with check (private.is_admin_aal2());
create policy crm_contact_tags_staff on public.crm_contact_tags
for all to authenticated using (private.can_access_contact(contact_id)) with check (private.can_access_contact(contact_id));
create policy crm_tasks_staff on public.crm_tasks
for all to authenticated using (
  (lead_id is not null and private.is_lead_staff(lead_id))
  or (contact_id is not null and private.can_access_contact(contact_id))
) with check (
  (lead_id is not null and private.is_lead_staff(lead_id))
  or (contact_id is not null and private.can_access_contact(contact_id))
);
create policy crm_notes_staff on public.crm_notes
for all to authenticated using (private.can_access_contact(contact_id)) with check (private.can_access_contact(contact_id));
create policy crm_activities_staff on public.crm_activities
for all to authenticated using (private.can_access_contact(contact_id)) with check (private.can_access_contact(contact_id));
create policy intake_staff on public.intake_submissions
for all to authenticated using (private.can_access_contact(contact_id)) with check (private.can_access_contact(contact_id));

-- Cases
grant select, update on public.cases to authenticated;
grant select, insert, update, delete on public.case_participants, public.case_status_history,
  public.case_tasks, public.case_notes, public.case_messages, public.document_access_grants,
  public.consent_records to authenticated;
grant select (
  id, case_id, uploaded_by, requested_by, task_id, document_type_code, classification,
  detected_mime, declared_mime, byte_size, sha256_hex, scan_status, version_no,
  supersedes_id, verified_by, verified_at, rejection_reason, retention_until,
  deleted_at, created_at, updated_at
) on public.case_documents to authenticated;
grant select on public.document_access_events to authenticated;

create policy cases_read on public.cases
for select to authenticated using (private.is_case_participant(id));
create policy cases_staff_update on public.cases
for update to authenticated using (private.can_manage_case(id)) with check (private.can_manage_case(id));

create policy case_participants_read on public.case_participants
for select to authenticated using (private.is_case_participant(case_id));
create policy case_participants_manage on public.case_participants
for all to authenticated using (private.can_manage_case(case_id)) with check (private.can_manage_case(case_id));

create policy case_history_read on public.case_status_history
for select to authenticated using (
  private.can_manage_case(case_id)
  or (visible_to_client and private.is_case_participant(case_id))
);
create policy case_history_manage on public.case_status_history
for insert to authenticated with check (private.can_manage_case(case_id));

create policy case_tasks_read on public.case_tasks
for select to authenticated using (
  private.can_manage_case(case_id)
  or (visible_to_client and private.is_case_participant(case_id))
);
create policy case_tasks_manage on public.case_tasks
for all to authenticated using (private.can_manage_case(case_id)) with check (private.can_manage_case(case_id));

create policy case_notes_read on public.case_notes
for select to authenticated using (
  private.can_manage_case(case_id)
  or (visible_to_client and private.is_case_participant(case_id))
);
create policy case_notes_manage on public.case_notes
for insert to authenticated with check (private.can_manage_case(case_id));

create policy case_messages_read on public.case_messages
for select to authenticated using (private.is_case_participant(case_id, 'message'));
create policy case_messages_insert on public.case_messages
for insert to authenticated with check (
  sender_id = auth.uid() and private.is_case_participant(case_id, 'message')
);

create policy case_documents_read on public.case_documents
for select to authenticated using (private.has_document_access(id, 'view'));

create policy document_grants_read on public.document_access_grants
for select to authenticated using (
  grantee_user_id = auth.uid() or private.can_manage_case(case_id)
);
create policy document_grants_manage on public.document_access_grants
for all to authenticated using (private.can_manage_case(case_id)) with check (private.can_manage_case(case_id));

create policy document_access_events_staff on public.document_access_events
for select to authenticated using (private.can_manage_case(case_id));

create policy consent_read on public.consent_records
for select to authenticated using (
  user_id = auth.uid() or (case_id is not null and private.can_manage_case(case_id))
);
create policy consent_insert_self_non_registration on public.consent_records
for insert to authenticated with check (
  user_id = auth.uid()
  and consent_type not in ('terms'::public.consent_type, 'privacy'::public.consent_type)
);
create policy consent_admin_manage on public.consent_records
for update to authenticated using (
  case_id is not null and private.can_manage_case(case_id)
) with check (case_id is not null and private.can_manage_case(case_id));

-- Audit, security, privacy, invitations
grant select on public.audit_log, public.security_events, public.admin_invitations to authenticated;
grant select, update on public.data_subject_requests to authenticated;

create policy audit_admin_read on public.audit_log
for select to authenticated using (private.is_admin_aal2());
create policy security_admin_read on public.security_events
for select to authenticated using (private.is_admin_aal2());
create policy security_admin_update on public.security_events
for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy dsr_own_read on public.data_subject_requests
for select to authenticated using (user_id = auth.uid() or private.is_admin_aal2());
create policy dsr_admin_update on public.data_subject_requests
for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy admin_invitations_admin on public.admin_invitations
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

-- No authenticated policies/grants for outbox. It is server worker only.

-- Payments
grant select on public.orders, public.order_items, public.payments, public.refunds to authenticated;
grant select on public.stripe_webhook_events to authenticated;

create policy orders_read on public.orders
for select to authenticated using (user_id = auth.uid() or private.can_manage_finance());
create policy orders_finance_manage on public.orders
for all to authenticated using (private.can_manage_finance()) with check (private.can_manage_finance());

create policy order_items_read on public.order_items
for select to authenticated using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or private.can_manage_finance())
  )
);
create policy order_items_finance_manage on public.order_items
for all to authenticated using (private.can_manage_finance()) with check (private.can_manage_finance());

create policy payments_read on public.payments
for select to authenticated using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or private.can_manage_finance())
  )
);
create policy payments_finance_manage on public.payments
for all to authenticated using (private.can_manage_finance()) with check (private.can_manage_finance());

create policy refunds_read on public.refunds
for select to authenticated using (
  private.can_manage_finance()
  or exists (
    select 1 from public.payments p
    join public.orders o on o.id = p.order_id
    where p.id = payment_id and o.user_id = auth.uid()
  )
);
create policy refunds_finance_manage on public.refunds
for all to authenticated using (private.can_manage_finance()) with check (private.can_manage_finance());

create policy stripe_events_finance_read on public.stripe_webhook_events
for select to authenticated using (private.can_manage_finance());

-- Appointments
grant select on public.appointment_types, public.appointment_type_translations to anon, authenticated;
grant select, insert, update, delete on public.appointment_types, public.appointment_type_translations,
  public.advisor_availability_rules, public.advisor_availability_exceptions,
  public.appointment_participants to authenticated;
grant select (
  id, appointment_type_id, booked_by, advisor_id, case_id, order_id, status,
  starts_at, ends_at, hold_expires_at, user_timezone, advisor_timezone,
  meeting_provider, cancellation_reason, cancelled_by, cancelled_at,
  completed_at, created_at, updated_at
) on public.appointments to authenticated;

create policy appointment_types_public on public.appointment_types
for select to anon, authenticated using (active);
create policy appointment_types_admin on public.appointment_types
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy appointment_type_translations_public on public.appointment_type_translations
for select to anon, authenticated
using (exists (select 1 from public.appointment_types t where t.id = appointment_type_id and t.active));
create policy appointment_type_translations_admin on public.appointment_type_translations
for all to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());

create policy availability_rules_staff on public.advisor_availability_rules
for all to authenticated using (
  private.is_aal2() and (advisor_id = auth.uid() or private.is_admin_aal2())
) with check (
  private.is_aal2() and (advisor_id = auth.uid() or private.is_admin_aal2())
);
create policy availability_exceptions_staff on public.advisor_availability_exceptions
for all to authenticated using (
  private.is_aal2() and (advisor_id = auth.uid() or private.is_admin_aal2())
) with check (
  private.is_aal2() and (advisor_id = auth.uid() or private.is_admin_aal2())
);

create policy appointments_read on public.appointments
for select to authenticated using (private.is_appointment_participant(id));
create policy appointment_participants_read on public.appointment_participants
for select to authenticated using (private.is_appointment_participant(appointment_id));
create policy appointment_participants_staff_manage on public.appointment_participants
for all to authenticated using (
  private.is_aal2() and exists (
    select 1 from public.appointments a
    where a.id = appointment_id
      and (a.advisor_id = auth.uid() or private.is_admin_aal2())
  )
) with check (
  private.is_aal2() and exists (
    select 1 from public.appointments a
    where a.id = appointment_id
      and (a.advisor_id = auth.uid() or private.is_admin_aal2())
  )
);

-- Notifications
grant select on public.notifications, public.notification_preferences, public.notification_deliveries to authenticated;
grant insert, update, delete on public.notification_preferences to authenticated;

create policy notifications_own on public.notifications
for select to authenticated using (user_id = auth.uid());
create policy notification_preferences_own on public.notification_preferences
for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy notification_deliveries_own on public.notification_deliveries
for select to authenticated using (
  exists (select 1 from public.notifications n where n.id = notification_id and n.user_id = auth.uid())
);

-- Courses
grant select on public.courses, public.course_translations, public.course_modules,
  public.course_module_translations, public.course_lessons, public.course_lesson_translations
to anon, authenticated;
grant select, insert, update, delete on public.courses, public.course_translations,
  public.course_modules, public.course_module_translations, public.course_lessons,
  public.course_lesson_translations to authenticated;
grant select, insert, update, delete on public.course_enrollments, public.lesson_progress to authenticated;

create policy courses_read on public.courses
for select to anon, authenticated using (
  status = 'published' and (public_access or auth.uid() is not null)
);
create policy courses_staff on public.courses
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());
create policy course_translations_read on public.course_translations
for select to anon, authenticated using (
  status in ('approved','published')
  and exists (
    select 1 from public.courses c
    where c.id = course_id and c.status = 'published'
      and (c.public_access or auth.uid() is not null)
  )
);
create policy course_translations_staff on public.course_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy course_modules_read on public.course_modules
for select to anon, authenticated using (private.is_course_accessible(course_id));
create policy course_modules_staff on public.course_modules
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy course_module_translations_read on public.course_module_translations
for select to anon, authenticated using (
  exists (
    select 1 from public.course_modules m
    where m.id = module_id and private.is_course_accessible(m.course_id)
  )
);
create policy course_module_translations_staff on public.course_module_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy course_lessons_read on public.course_lessons
for select to anon, authenticated using (
  status = 'published'
  and exists (
    select 1 from public.course_modules m
    where m.id = module_id and private.is_course_accessible(m.course_id)
  )
);
create policy course_lessons_staff on public.course_lessons
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy course_lesson_translations_read on public.course_lesson_translations
for select to anon, authenticated using (
  status in ('approved','published')
  and exists (
    select 1 from public.course_lessons l
    join public.course_modules m on m.id = l.module_id
    where l.id = lesson_id and l.status = 'published' and private.is_course_accessible(m.course_id)
  )
);
create policy course_lesson_translations_staff on public.course_lesson_translations
for all to authenticated using (private.can_manage_content()) with check (private.can_manage_content());

create policy course_enrollments_own on public.course_enrollments
for all to authenticated using (user_id = auth.uid()) with check (
  user_id = auth.uid() and private.is_course_accessible(course_id)
);
create policy lesson_progress_own on public.lesson_progress
for all to authenticated using (user_id = auth.uid()) with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.course_lessons l
    join public.course_modules m on m.id = l.module_id
    where l.id = lesson_id and private.is_course_accessible(m.course_id)
  )
);

-- Private community
grant select on public.community_categories, public.community_category_translations,
  public.community_posts, public.community_comments, public.community_reactions,
  public.community_reports, public.moderation_actions, public.community_bans
to authenticated;
grant insert on public.community_posts, public.community_comments, public.community_reactions,
  public.community_reports to authenticated;
grant delete on public.community_reactions to authenticated;
grant insert, update, delete on public.moderation_actions, public.community_bans,
  public.community_reports, public.community_posts, public.community_comments
to authenticated;

create policy community_categories_auth on public.community_categories
for select to authenticated using (active);
create policy community_categories_moderate on public.community_categories
for all to authenticated using (private.can_moderate()) with check (private.can_moderate());
create policy community_category_translations_auth on public.community_category_translations
for select to authenticated using (
  exists (select 1 from public.community_categories c where c.id = category_id and c.active)
);
create policy community_category_translations_moderate on public.community_category_translations
for all to authenticated using (private.can_moderate()) with check (private.can_moderate());

create policy community_posts_read on public.community_posts
for select to authenticated using (
  status = 'published' or author_id = auth.uid() or private.can_moderate()
);
create policy community_posts_insert on public.community_posts
for insert to authenticated with check (
  author_id = auth.uid()
  and status in ('draft','published')
  and not private.is_community_banned(auth.uid())
);
create policy community_posts_moderate on public.community_posts
for update to authenticated using (private.can_moderate()) with check (private.can_moderate());

create policy community_comments_read on public.community_comments
for select to authenticated using (
  status = 'published' or author_id = auth.uid() or private.can_moderate()
);
create policy community_comments_insert on public.community_comments
for insert to authenticated with check (
  author_id = auth.uid()
  and status = 'published'
  and not private.is_community_banned(auth.uid())
  and exists (
    select 1 from public.community_posts p where p.id = post_id and p.status = 'published'
  )
);
create policy community_comments_moderate on public.community_comments
for update to authenticated using (private.can_moderate()) with check (private.can_moderate());

create policy community_reactions_read on public.community_reactions
for select to authenticated using (true);
create policy community_reactions_insert on public.community_reactions
for insert to authenticated with check (
  user_id = auth.uid() and not private.is_community_banned(auth.uid())
);
create policy community_reactions_delete on public.community_reactions
for delete to authenticated using (user_id = auth.uid());

create policy community_reports_own_or_moderator on public.community_reports
for select to authenticated using (reporter_id = auth.uid() or private.can_moderate());
create policy community_reports_insert on public.community_reports
for insert to authenticated with check (reporter_id = auth.uid());
create policy community_reports_moderate on public.community_reports
for update to authenticated using (private.can_moderate()) with check (private.can_moderate());

create policy moderation_actions_moderator on public.moderation_actions
for all to authenticated using (private.can_moderate()) with check (
  private.can_moderate() and moderator_id = auth.uid()
);
create policy community_bans_self_or_moderator on public.community_bans
for select to authenticated using (user_id = auth.uid() or private.can_moderate());
create policy community_bans_moderator on public.community_bans
for all to authenticated using (private.can_moderate()) with check (private.can_moderate());

-- AI: conversations are user-owned; generation/indexing remains server-only.
grant select on public.ai_conversations, public.ai_messages, public.ai_message_citations to authenticated;
grant select, insert, update on public.ai_feedback to authenticated;
grant select on public.content_chunks to authenticated;

create policy content_chunks_content_staff on public.content_chunks
for select to authenticated using (private.can_manage_content());

create policy ai_conversations_own on public.ai_conversations
for select to authenticated using (user_id = auth.uid() and deleted_at is null);
create policy ai_messages_own on public.ai_messages
for select to authenticated using (
  exists (
    select 1 from public.ai_conversations c
    where c.id = conversation_id and c.user_id = auth.uid() and c.deleted_at is null
  )
);
create policy ai_citations_own on public.ai_message_citations
for select to authenticated using (
  exists (
    select 1 from public.ai_messages m
    join public.ai_conversations c on c.id = m.conversation_id
    where m.id = message_id and c.user_id = auth.uid() and c.deleted_at is null
  )
);
create policy ai_feedback_own on public.ai_feedback
for all to authenticated using (user_id = auth.uid()) with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.ai_messages m
    join public.ai_conversations c on c.id = m.conversation_id
    where m.id = message_id and c.user_id = auth.uid()
  )
);

commit;
