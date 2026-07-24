# Índice de archivos

Este índice enumera el contenido del ZIP. La credencial temporal del administrador está fuera del paquete y no aparece aquí.

**Total previsto del paquete final:** 183 archivos, incluyendo este índice.

## Raíz

entrada, prompts consolidados, validación y configuración global

- `.env.example`
- `.gitignore`
- `00_START_HERE.md`
- `AGENTS.md`
- `CODEX_ALL_IN_ONE.md`
- `CODEX_MASTER_PROMPT.md`
- `PACKAGE_VALIDATION.md`
- `PROJECT_MANIFEST.md`
- `README.md`
- `SHA256SUMS.txt`
- `manifest.json`

## docs

especificaciones de producto, arquitectura, seguridad y operación

- `docs/01_PRODUCT_REQUIREMENTS.md`
- `docs/02_SCOPE_AND_NON_GOALS.md`
- `docs/03_INFORMATION_ARCHITECTURE_AND_ROUTES.md`
- `docs/04_USER_ROLES_AND_PERMISSIONS.md`
- `docs/05_FEATURE_SPECIFICATIONS.md`
- `docs/06_COUNTRY_CONTENT_MODEL.md`
- `docs/07_COMPARISON_AND_QUESTIONNAIRE.md`
- `docs/08_DESIGN_SYSTEM_ACCESSIBILITY.md`
- `docs/09_I18N_CONTENT_WORKFLOW.md`
- `docs/10_TECHNICAL_ARCHITECTURE.md`
- `docs/11_DATABASE_DATA_DICTIONARY.md`
- `docs/12_SUPABASE_AUTH_RLS_STORAGE.md`
- `docs/13_SECURITY_THREAT_MODEL.md`
- `docs/14_FILE_UPLOAD_SECURITY.md`
- `docs/15_STRIPE_PAYMENTS.md`
- `docs/16_WHATSAPP_CRM_AND_LEADS.md`
- `docs/17_APPOINTMENTS_AND_VIDEO.md`
- `docs/18_CASES_DOCUMENTS_AND_TRACKING.md`
- `docs/19_COURSES_AND_PRIVATE_COMMUNITY.md`
- `docs/20_AI_ASSISTANT_SAFETY_AND_RAG.md`
- `docs/21_PWA_PERFORMANCE_AND_SEO.md`
- `docs/22_ADMIN_CMS_AND_CONTENT_GOVERNANCE.md`
- `docs/23_TESTING_AND_QA_STRATEGY.md`
- `docs/24_GITHUB_CI_CD_AND_REPOSITORY.md`
- `docs/25_SUPABASE_VERCEL_DEPLOYMENT_RUNBOOK.md`
- `docs/26_ENVIRONMENT_VARIABLES_AND_SECRETS.md`
- `docs/27_OBSERVABILITY_BACKUP_AND_INCIDENT_RESPONSE.md`
- `docs/28_PRIVACY_LEGAL_AND_COMPLIANCE_CHECKLIST.md`
- `docs/29_IMPLEMENTATION_ROADMAP.md`
- `docs/30_ACCEPTANCE_CRITERIA.md`
- `docs/31_DEFINITION_OF_DONE.md`
- `docs/32_ASSUMPTIONS_DECISIONS_AND_OPEN_ITEMS.md`
- `docs/33_OFFICIAL_TECHNICAL_REFERENCES.md`
- `docs/34_ADMIN_BOOTSTRAP_RUNBOOK.md`
- `docs/35_CONTENT_SEED_AND_RESEARCH_GUIDE.md`
- `docs/36_REPOSITORY_STRUCTURE_AND_BOUNDARIES.md`
- `docs/37_DEPENDENCY_AND_SUPPLY_CHAIN_POLICY.md`
- `docs/38_EMAIL_AND_NOTIFICATION_CONTENT.md`
- `docs/39_SEARCH_AND_DISCOVERY.md`
- `docs/40_ANALYTICS_AND_EXPERIMENTATION.md`
- `docs/41_SUPPORT_AND_OPERATIONS_PLAYBOOK.md`
- `docs/42_DATA_RETENTION_SCHEDULE_TEMPLATE.md`
- `docs/43_BROWSER_ACCOUNT_PROVISIONING_GUARDRAILS.md`
- `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`
- `docs/45_POST_DEPLOYMENT_SECURITY_HARDENING.md`
- `docs/46_RELEASE_AND_DATABASE_MIGRATION_STRATEGY.md`
- `docs/47_COST_AND_CAPACITY_GUARDRAILS.md`

## supabase

configuración local, seed, migraciones y pruebas SQL

- `supabase/config.toml.example`
- `supabase/migrations/0001_extensions_schemas_and_types.sql`
- `supabase/migrations/0002_identity_and_content.sql`
- `supabase/migrations/0003_services_assessment_and_crm.sql`
- `supabase/migrations/0004_cases_documents_security_and_privacy.sql`
- `supabase/migrations/0005_payments_appointments_and_notifications.sql`
- `supabase/migrations/0006_courses_community_and_ai.sql`
- `supabase/migrations/0007_authorization_functions_and_triggers.sql`
- `supabase/migrations/0008_row_level_security.sql`
- `supabase/migrations/0009_storage_buckets_and_policies.sql`
- `supabase/migrations/0010_reference_seed.sql`
- `supabase/migrations/0011_views_and_maintenance.sql`
- `supabase/migrations/0012_atomic_admin_bootstrap.sql`
- `supabase/migrations/0013_password_change_completion.sql`
- `supabase/migrations/0014_public_content_search.sql`
- `supabase/migrations/20260722041004_harden_remote_security_advisors.sql`
- `supabase/migrations/20260722070000_restore_scoped_storage_select_policies.sql`
- `supabase/migrations/20260723140000_secure_registration_boundary.sql`
- `supabase/migrations/20260723143000_allow_signed_admin_provisioning.sql`
- `supabase/migrations/20260723165325_persist_versioned_terms_and_privacy_acceptance.sql`
- `supabase/migrations/20260723180000_remove_private_owner_email_from_public_configuration.sql`
- `supabase/migrations/20260723193000_harden_distinct_legal_acceptance.sql`
- `supabase/migrations/20260723194500_harden_privacy_request_intake.sql`
- `supabase/migrations/20260723200000_preserve_official_site_configuration.sql`
- `supabase/migrations/20260723203000_serialize_initial_admin_bootstrap.sql`
- `supabase/seed.sql`
- `supabase/tests/0001_security_invariants.sql`
- `supabase/tests/0002_public_content_rls.sql`
- `supabase/tests/0003_registration_auth_hook.sql`
- `supabase/tests/0004_consent_rls.sql`
- `supabase/tests/0005_site_settings_preservation.sql`

## github

workflows y configuración que Codex debe copiar a `.github`

- `github/.github/CODEOWNERS`
- `github/.github/ISSUE_TEMPLATE/bug.yml`
- `github/.github/ISSUE_TEMPLATE/config.yml`
- `github/.github/dependabot.yml`
- `github/.github/pull_request_template.md`
- `github/.github/workflows/ci.yml`
- `github/.github/workflows/codeql.yml`
- `github/.github/workflows/dependency-review.yml`
- `github/.github/workflows/secret-scan.yml`

## scripts

bootstrap, validación, generación de secretos y tipos

- `scripts/bootstrap-admin.ts`
- `scripts/check-no-secrets.sh`
- `scripts/ci-enable-auth-signup.mjs`
- `scripts/ci-map-supabase-env.mjs`
- `scripts/generate-secrets.mjs`
- `scripts/generate-supabase-types.sh`
- `scripts/lib/admin-provisioning-attestation.ts`
- `scripts/verify-env.mjs`

## starter

plantillas de código/configuración para iniciar la app

- `starter/README.md`
- `starter/crypto.ts.template`
- `starter/eslint-boundaries.md`
- `starter/feature-gate.ts.template`
- `starter/next.config.ts.template`
- `starter/package-requirements.json`
- `starter/proxy.ts.template`
- `starter/redacted-logger.ts.template`
- `starter/server-config.ts.template`
- `starter/tsconfig.json.template`

## api

contrato OpenAPI de los endpoints principales

- `api/openapi.yaml`

## config

configuración declarativa, flags y esquema de variables

- `config/env.schema.json`
- `config/feature-flags.json`
- `config/project-config.yaml`

## content

plantillas editoriales, investigación, fuentes y traducciones UI

- `content/RESEARCH_RECORD_TEMPLATE.csv`
- `content/SOURCE_REGISTER_TEMPLATE.csv`
- `content/assessment-rules-template.json`
- `content/country-page-template.json`
- `content/ui-copy/en.json`
- `content/ui-copy/es.json`
- `content/ui-copy/fr.json`
- `content/ui-copy/ht.json`
- `content/ui-copy/pt.json`

## design

tokens, estilo visual, UX y copy

- `design/COPY_AND_UX_GUIDELINES.md`
- `design/tokens.json`

## schemas

diagramas Mermaid de arquitectura y flujos

- `schemas/ai-flow.mmd`
- `schemas/architecture.mmd`
- `schemas/auth-flow.mmd`
- `schemas/content-workflow.mmd`
- `schemas/er-diagram.mmd`
- `schemas/payment-flow.mmd`
- `schemas/routes.mmd`
- `schemas/upload-flow.mmd`

## planning

backlog, riesgos, decisiones, roadmap y matriz de funciones

- `planning/BACKLOG.csv`
- `planning/DECISION_LOG.csv`
- `planning/FEATURE_MATRIX.csv`
- `planning/IMPLEMENTATION_PLAN.md`
- `planning/RISK_REGISTER.csv`

## qa

matriz de roles y casos de prueba

- `qa/QA_README.md`
- `qa/ROLE_MATRIX.csv`
- `qa/TEST_CASES.csv`

## security

clasificación, abuso y mapeo OWASP ASVS

- `security/ABUSE_CASES.csv`
- `security/ASVS_CONTROL_MAP.csv`
- `security/DATA_CLASSIFICATION.md`

## privacy

inventario de datos y registro de proveedores

- `privacy/DATA_INVENTORY.csv`
- `privacy/VENDOR_REGISTER.csv`

## legal

borradores legales que exigen revisión profesional

- `legal/AI_ASSISTANT_DISCLAIMER.md`
- `legal/COMMUNITY_GUIDELINES.md`
- `legal/COOKIE_POLICY_TEMPLATE.md`
- `legal/DOCUMENT_PROCESSING_CONSENT_TEMPLATE.md`
- `legal/EDITORIAL_TRANSPARENCY_POLICY.md`
- `legal/PRIVACY_POLICY_TEMPLATE.md`
- `legal/README.md`
- `legal/REFUND_POLICY_TEMPLATE.md`
- `legal/TERMS_OF_SERVICE_TEMPLATE.md`

## operations

runbooks e informes de despliegue, incidentes y mantenimiento

- `operations/ACCESS_REVIEW_TEMPLATE.csv`
- `operations/CODEX_FINAL_REPORT_TEMPLATE.md`
- `operations/DEPLOYMENT_REPORT_TEMPLATE.md`
- `operations/INCIDENT_RECORD_TEMPLATE.md`
- `operations/KEY_ROTATION_RUNBOOK.md`
- `operations/MAINTENANCE_SCHEDULE.md`
- `operations/RESTORE_DRILL_TEMPLATE.md`

## prompts

prompts especializados para IA, contenido, seguridad y fases

- `prompts/AI_SYSTEM_PROMPT.md`
- `prompts/CODEX_PHASE_PROMPTS.md`
- `prompts/CONTENT_REVIEW_PROMPT.md`
- `prompts/SECURITY_REVIEW_PROMPT.md`

## repository

políticas de contribución, seguridad y decisiones de arquitectura

- `repository/ARCHITECTURE_DECISIONS.md`
- `repository/CONTRIBUTING.md`
- `repository/SECURITY.md`

## checklists

gates operativos, de contenido, seguridad y lanzamiento

- `checklists/CODEX_COMPLETION_CHECKLIST.md`
- `checklists/CONTENT_LAUNCH_CHECKLIST.md`
- `checklists/LAUNCH_CHECKLIST.md`
- `checklists/MANUAL_ACCOUNT_SETUP.md`
- `checklists/SECURITY_CHECKLIST.md`

## vercel

cabeceras y configuración de despliegue

- `vercel/SECURITY_HEADERS.md`
- `vercel/vercel.json.example`
