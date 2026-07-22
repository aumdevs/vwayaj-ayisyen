# Arquitectura de información y rutas

## Convenciones

- `locale`: `ht`, `fr`, `es`, `pt`, `en`.
- `country`: `usa`, `chile`, `brazil`, `mexico`.
- Todas las rutas públicas tienen versión localizada.
- Las rutas privadas no se consideran protegidas sólo por ocultarlas.

## Rutas públicas

```text
/[locale]
/[locale]/countries
/[locale]/countries/[country]
/[locale]/countries/[country]/legal-pathways
/[locale]/countries/[country]/work
/[locale]/countries/[country]/cost-of-living
/[locale]/countries/[country]/banking
/[locale]/countries/[country]/housing
/[locale]/countries/[country]/study
/[locale]/countries/[country]/health
/[locale]/countries/[country]/first-30-days
/[locale]/countries/[country]/risks
/[locale]/compare
/[locale]/find-my-country
/[locale]/guides
/[locale]/guides/[country]/[slug]
/[locale]/services
/[locale]/services/[country]
/[locale]/services/[country]/[package]
/[locale]/courses
/[locale]/courses/[slug]
/[locale]/about
/[locale]/faq
/[locale]/contact
/[locale]/search
/[locale]/legal/terms
/[locale]/legal/privacy
/[locale]/legal/cookies
/[locale]/legal/refunds
/[locale]/legal/ai
/[locale]/legal/community
/[locale]/legal/editorial
```

## Autenticación

```text
/[locale]/auth/sign-in
/[locale]/auth/sign-up
/[locale]/auth/verify
/[locale]/auth/forgot-password
/[locale]/auth/reset-password
/[locale]/auth/mfa
/[locale]/auth/callback
```

No revelar si un correo existe durante recuperación o invitación.

## Portal de usuario

```text
/[locale]/portal
/[locale]/portal/profile
/[locale]/portal/security
/[locale]/portal/assessments
/[locale]/portal/orders
/[locale]/portal/cases
/[locale]/portal/cases/[caseId]
/[locale]/portal/cases/[caseId]/tasks
/[locale]/portal/cases/[caseId]/documents
/[locale]/portal/cases/[caseId]/messages
/[locale]/portal/appointments
/[locale]/portal/courses
/[locale]/portal/courses/[courseId]
/[locale]/portal/community
/[locale]/portal/ai
/[locale]/portal/notifications
/[locale]/portal/privacy
```

## Panel de asesor

```text
/[locale]/advisor
/[locale]/advisor/leads
/[locale]/advisor/leads/[leadId]
/[locale]/advisor/cases
/[locale]/advisor/cases/[caseId]
/[locale]/advisor/calendar
/[locale]/advisor/tasks
/[locale]/advisor/contacts/[contactId]
```

## Panel de profesional externo

```text
/[locale]/professional
/[locale]/professional/assignments
/[locale]/professional/cases/[caseId]
/[locale]/professional/calendar
/[locale]/professional/security
```

## Editorial y moderación

```text
/[locale]/editor
/[locale]/editor/content
/[locale]/editor/content/[contentId]
/[locale]/editor/translations
/[locale]/editor/sources
/[locale]/editor/reviews
/[locale]/moderation
/[locale]/moderation/reports
/[locale]/moderation/users/[userId]
```

## Administración

```text
/[locale]/admin
/[locale]/admin/settings
/[locale]/admin/countries
/[locale]/admin/content
/[locale]/admin/comparison
/[locale]/admin/assessment
/[locale]/admin/packages
/[locale]/admin/prices
/[locale]/admin/whatsapp
/[locale]/admin/users
/[locale]/admin/invitations
/[locale]/admin/roles
/[locale]/admin/staff
/[locale]/admin/professionals
/[locale]/admin/crm
/[locale]/admin/cases
/[locale]/admin/documents
/[locale]/admin/appointments
/[locale]/admin/courses
/[locale]/admin/community
/[locale]/admin/ai
/[locale]/admin/notifications
/[locale]/admin/audit
/[locale]/admin/security
/[locale]/admin/feature-flags
```

## Route Handlers

```text
/api/health
/api/auth/admin-bootstrap          # sólo script/entorno, no público
/api/stripe/checkout
/api/stripe/webhook
/api/whatsapp/link
/api/intake
/api/uploads/initiate
/api/uploads/complete
/api/documents/[id]/download
/api/appointments/[id]/meeting
/api/ai/chat
/api/ai/feedback
/api/search
/api/cron/content-staleness
/api/cron/appointment-reminders
/api/cron/document-retention
/api/cron/notification-delivery
```

## Reglas de navegación

- Cabecera pública con máximo seis decisiones principales.
- Menú móvil a pantalla completa con texto.
- Breadcrumbs en guías.
- Botón de regresar visible.
- CTAs claros: “Comparar”, “Encontrar mi país”, “Hablar por WhatsApp”.
- El panel privado usa navegación por rol, no muestra opciones sin permiso.
- Ningún error debe revelar IDs internos, roles, SQL o stack traces.
