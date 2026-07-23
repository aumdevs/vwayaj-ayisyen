# Feature flags del rediseño

Fecha: 2026-07-23

El rediseño no activa ninguna integración. Para habilitar una función deben pasar el kill switch del entorno, la configuración requerida, el flag de base de datos y su gate de revisión.

| Función | Flag de base | Kill switch | Estado seguro |
|---|---|---|---|
| Pagos | `feature_payments` | `DISABLE_PAYMENTS` | cerrado |
| Documentos | `feature_document_uploads` | `DISABLE_DOCUMENT_UPLOADS` | cerrado |
| Asistente IA | `feature_ai_assistant` | `DISABLE_AI_ASSISTANT` | cerrado |
| Comunidad | `feature_community` | `DISABLE_COMMUNITY` | cerrado |
| Citas | `feature_appointments` | `DISABLE_APPOINTMENTS` | cerrado |
| WhatsApp | `feature_whatsapp` | `DISABLE_WHATSAPP` | cerrado |
| Captación pública | `feature_public_intake` | `DISABLE_PUBLIC_INTAKE` | cerrado |
| Cursos | `feature_courses` | `DISABLE_COURSES` | contenido aprobado requerido |
| Portal profesional | — | `DISABLE_PROFESSIONAL_PORTAL` | cerrado |
| Registro público | — | `DISABLE_PUBLIC_REGISTRATION` | SMTP + Turnstile + hook HMAC listos; requiere versión publicada en `REGISTRATION_TERMS_VERSION`, prueba real y `disable_signup=false` en Supabase |

La ausencia de una variable o de una aprobación produce indisponibilidad, nunca un fallback inseguro.
