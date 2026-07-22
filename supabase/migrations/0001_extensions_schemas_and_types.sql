-- 0001_extensions_schemas_and_types.sql
-- Review against the exact Supabase Postgres version before remote apply.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;
create extension if not exists pg_trgm with schema extensions;
create extension if not exists btree_gist with schema extensions;
create extension if not exists vector with schema extensions;

do $$ begin
  create type public.app_locale as enum ('ht','fr','es','pt','en');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.country_code as enum ('usa','chile','brazil','mexico');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.app_role as enum (
    'user','advisor','professional','content_editor','moderator','admin','super_admin'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.account_status as enum ('active','invited','suspended','closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.staff_status as enum ('invited','active','suspended','inactive');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum (
    'draft','fact_check','legal_review','translation_review','approved',
    'scheduled','published','changes_requested','expired','archived'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.information_type as enum ('official','practical','community','warning','commercial');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.risk_level as enum ('low','medium','high','critical');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.translation_status as enum ('missing','draft','machine_draft','review','approved','published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.package_status as enum ('draft','active','paused','archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_status as enum (
    'new','triage','qualified','appointment_pending','proposal_sent',
    'converted','not_eligible','closed','spam','do_not_contact'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.case_status as enum (
    'intake','awaiting_payment','active','waiting_user','waiting_third_party',
    'review','completed','cancelled','archived'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.case_participant_role as enum ('client','advisor','professional','observer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.task_status as enum ('todo','in_progress','blocked','submitted','approved','rejected','done');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.document_scan_status as enum (
    'uploading','pending_scan','scanning','clean','rejected','infected','error','deleted'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.document_classification as enum ('standard','confidential','highly_sensitive');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_status as enum (
    'draft','pending','paid','fulfilled','expired','cancelled',
    'partially_refunded','refunded','disputed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum (
    'requires_action','processing','succeeded','failed','cancelled',
    'partially_refunded','refunded','disputed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.appointment_status as enum ('hold','confirmed','completed','cancelled','no_show','expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_channel as enum ('in_app','email','sms','whatsapp');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.delivery_status as enum ('queued','sent','delivered','failed','suppressed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.community_content_status as enum ('draft','published','hidden','removed','under_review');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.community_report_status as enum ('open','triaged','actioned','dismissed','appealed','closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.moderation_action_type as enum (
    'warn','hide_content','remove_content','mute','suspend','ban','restore','dismiss_report'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.data_request_type as enum ('access','correct','delete','export','restrict','object');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.data_request_status as enum ('received','identity_check','in_progress','fulfilled','denied','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.ai_message_role as enum ('user','assistant','system');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.consent_type as enum (
    'terms','privacy','marketing','whatsapp','document_processing',
    'professional_share','recording','ai_processing','cookies'
  );
exception when duplicate_object then null; end $$;

commit;
