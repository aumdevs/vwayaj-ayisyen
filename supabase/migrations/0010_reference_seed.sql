-- 0010_reference_seed.sql
-- Only structural, non-legal seed data. No visa requirements, salaries or claims.
begin;

insert into public.countries(code, iso2, display_order, active)
values
  ('usa','US',1,true),
  ('chile','CL',2,true),
  ('brazil','BR',3,true),
  ('mexico','MX',4,true)
on conflict (code) do update set
  iso2 = excluded.iso2,
  display_order = excluded.display_order,
  active = excluded.active;

insert into public.country_translations(country_code, locale, name, short_summary, translation_status)
values
  ('usa','ht','Etazini','Kontni detaye pou peyi sa a ap prepare epi li dwe revize anvan piblikasyon.','approved'),
  ('usa','fr','États-Unis','Le contenu détaillé est en préparation et doit être vérifié avant publication.','approved'),
  ('usa','es','Estados Unidos','El contenido detallado está en preparación y debe revisarse antes de publicarse.','approved'),
  ('usa','pt','Estados Unidos','O conteúdo detalhado está em preparação e deve ser revisado antes da publicação.','approved'),
  ('usa','en','United States','Detailed content is being prepared and must be reviewed before publication.','approved'),

  ('chile','ht','Chili','Kontni detaye pou peyi sa a ap prepare epi li dwe revize anvan piblikasyon.','approved'),
  ('chile','fr','Chili','Le contenu détaillé est en préparation et doit être vérifié avant publication.','approved'),
  ('chile','es','Chile','El contenido detallado está en preparación y debe revisarse antes de publicarse.','approved'),
  ('chile','pt','Chile','O conteúdo detalhado está em preparação e deve ser revisado antes da publicação.','approved'),
  ('chile','en','Chile','Detailed content is being prepared and must be reviewed before publication.','approved'),

  ('brazil','ht','Brezil','Kontni detaye pou peyi sa a ap prepare epi li dwe revize anvan piblikasyon.','approved'),
  ('brazil','fr','Brésil','Le contenu détaillé est en préparation et doit être vérifié avant publication.','approved'),
  ('brazil','es','Brasil','El contenido detallado está en preparación y debe revisarse antes de publicarse.','approved'),
  ('brazil','pt','Brasil','O conteúdo detalhado está em preparação e deve ser revisado antes da publicação.','approved'),
  ('brazil','en','Brazil','Detailed content is being prepared and must be reviewed before publication.','approved'),

  ('mexico','ht','Meksik','Kontni detaye pou peyi sa a ap prepare epi li dwe revize anvan piblikasyon.','approved'),
  ('mexico','fr','Mexique','Le contenu détaillé est en préparation et doit être vérifié avant publication.','approved'),
  ('mexico','es','México','El contenido detallado está en preparación y debe revisarse antes de publicarse.','approved'),
  ('mexico','pt','México','O conteúdo detalhado está em preparação e deve ser revisado antes da publicação.','approved'),
  ('mexico','en','Mexico','Detailed content is being prepared and must be reviewed before publication.','approved')
on conflict (country_code, locale) do update set
  name = excluded.name,
  short_summary = excluded.short_summary,
  translation_status = excluded.translation_status;

insert into public.site_settings(key, value, is_public, description)
values
  ('brand', '{"status":"pending","name":null,"logo_path":null}'::jsonb, true, 'Public brand; must be completed before launch'),
  ('support', '{"email":"support@vwayajayisyen.com","legal_email":"legal@vwayajayisyen.com","marketing_email":"promo@vwayajayisyen.com","whatsapp_e164":null,"hours":null}'::jsonb, true, 'Public support configuration'),
  ('legal_entity', '{"status":"required","legal_name":null,"country":null,"address":null}'::jsonb, false, 'Launch blocker'),
  ('default_locale', '{"locale":"ht"}'::jsonb, true, 'Default public locale'),
  ('supported_locales', '{"locales":["ht","fr","es","pt","en"]}'::jsonb, true, 'Supported locales')
on conflict (key) do update set
  value = excluded.value,
  is_public = excluded.is_public,
  description = excluded.description;

insert into public.feature_flags(key, enabled, public_readable, launch_requirements)
values
  ('feature_payments',false,true,'["stripe_test_e2e","webhook_verified","legal_approved"]'),
  ('feature_document_uploads',false,true,'["private_scanner","storage_restore","consent","pentest"]'),
  ('feature_ai_assistant',false,true,'["rag_eval","privacy_review","cost_controls"]'),
  ('feature_community',false,true,'["moderation_ready","guidelines","appeal"]'),
  ('feature_appointments',false,true,'["timezone_tests","provider","policy"]'),
  ('feature_whatsapp',false,true,'["number","templates","privacy_notice"]'),
  ('feature_public_intake',false,true,'["captcha","rate_limit","crm_encryption","consent"]'),
  ('feature_courses',true,true,'["approved_content","captions"]'),
  ('feature_pwa',true,true,'["private_cache_tests"]')
on conflict (key) do update set
  enabled = excluded.enabled,
  public_readable = excluded.public_readable,
  launch_requirements = excluded.launch_requirements;

insert into public.comparison_criteria(code, default_weight, higher_is_better, status, display_order)
values
  ('income_potential',1,true,'draft',1),
  ('cost_of_living',1,false,'draft',2),
  ('initial_budget',1,false,'draft',3),
  ('language_fit',1,true,'draft',4),
  ('study_access',1,true,'draft',5),
  ('family_fit',1,true,'draft',6),
  ('entrepreneurship',1,true,'draft',7),
  ('legal_process_complexity',1,false,'draft',8),
  ('community_support',1,true,'draft',9),
  ('climate_preference',1,true,'draft',10)
on conflict (code) do nothing;

-- Create globally unique, country-prefixed package codes.
insert into public.service_packages(code, country_code, tier, status, remote_only, display_order)
select c.code::text || '_' || p.code, c.code, p.tier, 'draft'::public.package_status, true, p.tier
from public.countries c
cross join (
  values
    ('initial_orientation',1),
    ('complete_preparation',2),
    ('settlement_and_adaptation',3)
) as p(code,tier)
on conflict (code) do nothing;

insert into public.service_package_translations(package_id, locale, name, short_description, status)
select sp.id, x.locale::public.app_locale, x.name, x.description, 'draft'::public.translation_status
from public.service_packages sp
cross join (
  values
    ('ht','Oryantasyon inisyal','Premye evalyasyon ak lis etap yo.'),
    ('fr','Orientation initiale','Première évaluation et liste des étapes.'),
    ('es','Orientación inicial','Primera evaluación y lista de pasos.'),
    ('pt','Orientação inicial','Primeira avaliação e lista de etapas.'),
    ('en','Initial orientation','Initial assessment and list of steps.')
) as x(locale,name,description)
where sp.tier = 1
on conflict (package_id, locale) do nothing;

insert into public.service_package_translations(package_id, locale, name, short_description, status)
select sp.id, x.locale::public.app_locale, x.name, x.description, 'draft'::public.translation_status
from public.service_packages sp
cross join (
  values
    ('ht','Preparasyon konplè','Preparasyon òganize anvan vwayaj la.'),
    ('fr','Préparation complète','Préparation organisée avant le voyage.'),
    ('es','Preparación completa','Preparación organizada antes del viaje.'),
    ('pt','Preparação completa','Preparação organizada antes da viagem.'),
    ('en','Complete preparation','Organized preparation before travel.')
) as x(locale,name,description)
where sp.tier = 2
on conflict (package_id, locale) do nothing;

insert into public.service_package_translations(package_id, locale, name, short_description, status)
select sp.id, x.locale::public.app_locale, x.name, x.description, 'draft'::public.translation_status
from public.service_packages sp
cross join (
  values
    ('ht','Enstalasyon ak adaptasyon','Oryantasyon pratik pou premye etap yo apre arive.'),
    ('fr','Installation et adaptation','Orientation pratique pour les premières étapes après l’arrivée.'),
    ('es','Instalación y adaptación','Orientación práctica para los primeros pasos después de llegar.'),
    ('pt','Instalação e adaptação','Orientação prática para os primeiros passos após a chegada.'),
    ('en','Settlement and adaptation','Practical orientation for the first steps after arrival.')
) as x(locale,name,description)
where sp.tier = 3
on conflict (package_id, locale) do nothing;

insert into public.content_items(
  country_code, section_key, slug, information_type, risk_level, status, current_version_no
)
select c.code, s.section_key, s.slug, s.info_type, s.risk, 'draft'::public.content_status, 0
from public.countries c
cross join (
  values
    ('overview','overview','practical'::public.information_type,'medium'::public.risk_level),
    ('who_it_may_suit','who-it-may-suit','practical','medium'),
    ('who_it_may_not_suit','who-it-may-not-suit','practical','medium'),
    ('legal_pathways','legal-pathways','official','critical'),
    ('haitian_community_reality','haitian-community-reality','community','high'),
    ('work_and_income','work-and-income','practical','high'),
    ('cost_of_living','cost-of-living','practical','high'),
    ('banking_and_money','banking-and-money','practical','high'),
    ('housing','housing','practical','high'),
    ('education','education','official','high'),
    ('health','health','official','high'),
    ('first_30_days','first-30-days','practical','high'),
    ('scams_and_risks','scams-and-risks','warning','critical'),
    ('sources','sources','official','high')
) as s(section_key,slug,info_type,risk)
on conflict (country_code, slug) do nothing;

insert into public.appointment_types(
  code, duration_minutes, minimum_notice_hours, cancellation_notice_hours, active
)
values
  ('initial_orientation',45,24,24,false),
  ('case_follow_up',30,12,12,false),
  ('professional_consultation',60,48,24,false)
on conflict (code) do nothing;

insert into public.community_categories(code, country_code, active, display_order)
values
  ('general',null,false,1),
  ('usa', 'usa',false,2),
  ('chile','chile',false,3),
  ('brazil','brazil',false,4),
  ('mexico','mexico',false,5),
  ('scam_warnings',null,false,6)
on conflict (code) do nothing;

commit;
