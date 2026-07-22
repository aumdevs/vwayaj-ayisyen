# Diccionario de datos

Este documento describe el propósito de las tablas. Las migraciones son la referencia ejecutable inicial.

## Identidad

### `profiles`

Perfil mínimo vinculado a `auth.users`.

Campos clave:

- `id`
- `display_name`
- `preferred_locale`
- `phone_e164`
- `country_of_residence`
- `avatar_path`
- `force_password_change`
- `account_status`
- timestamps

No contiene roles ni contraseña.

### `user_roles`

Roles server-side. Clave compuesta `user_id, role`.

### `staff_profiles`

Configuración de asesores, profesionales, editores y moderadores: estado, bio, zonas horarias, idiomas y capacidad.

### `professional_organizations`

Organizaciones externas verificadas.

### `professional_memberships`

Vínculo entre usuario profesional y organización.

## Contenido

### `countries`

Cuatro países y configuración.

### `country_translations`

Nombre, resumen y metadata por idioma.

### `content_items`

Unidad editorial con country, section, status, information type, risk, fechas, autor y revisor.

### `content_translations`

Título, resumen, Markdown, SEO y estado de traducción.

### `content_sources`

Fuentes asociadas, URL, publisher, official flag, access date y notas.

### `content_review_events`

Historial editorial.

### `glossary_terms` / `glossary_translations`

Términos oficiales y explicaciones.

### `faq_items` / `faq_translations`

Preguntas frecuentes.

### `site_settings`

Configuración pública y operativa no secreta. No guardar API keys.

### `feature_flags`

Activación controlada.

### `whatsapp_templates`

Mensajes por país, paquete, página e idioma.

## Servicios

### `service_packages`

Paquetes por país y nivel.

### `service_package_translations`

Nombre, descripción, incluye/no incluye.

### `package_prices`

Moneda, importe entero minor unit y Stripe Price ID.

### `package_features` / `package_feature_translations`

Beneficios ordenados.

## Comparador y evaluación

### `comparison_criteria`

Criterios y peso.

### `comparison_criterion_translations`

Nombre y ayuda.

### `country_comparison_scores`

Puntuación, confianza, fecha y fuentes.

### `country_comparison_score_translations`

Explicación localizada.

### `assessment_questions`

Pregunta, tipo, peso y versión.

### `assessment_options`

Opciones.

### `assessment_option_weights`

Peso por país.

### `assessment_sessions`

Sesión autenticada o anónima, consentimiento, versión y expiración.

### `assessment_answers`

Respuesta por pregunta.

### `assessment_results`

Ranking, explicación, versión y confianza.

## CRM

### `crm_contacts`

Contacto de usuario o lead. Email y teléfono cifrados en aplicación, con hashes HMAC para deduplicación.

### `leads`

Pipeline, país, objetivo, fuente, asesor y estado.

### `lead_assignments`

Historial de asignación.

### `crm_tags` / `crm_contact_tags`

Etiquetas.

### `crm_tasks`

Tareas CRM.

### `crm_notes`

Notas internas; nunca guardar credenciales ni documentos.

### `crm_activities`

Timeline de actividad.

### `intake_submissions`

Evaluación inicial vinculada a contacto; datos estructurados mínimos.

## Expedientes

### `cases`

Expediente del cliente, país, paquete, estado, referencia y fechas.

### `case_participants`

Usuarios con rol y permisos en un expediente.

### `case_status_history`

Cambios de estado.

### `case_tasks`

Checklist y tareas.

### `case_notes`

Notas internas o visibles al cliente.

### `case_messages`

Mensajes privados del expediente.

### `case_documents`

Metadata de archivo, bucket/path, hash, estado de análisis, retención y propietario.

### `document_access_grants`

Concesión granular temporal.

### `document_access_events`

Auditoría de visualización/descarga.

### `consent_records`

Consentimientos versionados.

## Pagos

### `orders`

Orden interna; nunca depende del redirect de éxito.

### `order_items`

Paquete y precio inmutable al momento de compra.

### `payments`

Intentos/resultado Stripe.

### `refunds`

Reembolsos.

### `stripe_webhook_events`

Eventos únicos procesados para idempotencia.

## Citas

### `advisor_availability_rules`

Horario recurrente.

### `advisor_availability_exceptions`

Bloqueos/horarios especiales.

### `appointments`

Reserva con inicio, fin, estado, tipo y enlace cifrado.

### `appointment_participants`

Participantes.

## Notificaciones

### `notifications`

In-app.

### `notification_preferences`

Preferencias por canal y categoría.

### `notification_deliveries`

Intentos de entrega sin contenido sensible.

## Cursos

### `courses` / `course_translations`

Catálogo.

### `course_modules` / `course_module_translations`

Módulos.

### `course_lessons` / `course_lesson_translations`

Lecciones.

### `course_enrollments`

Matrícula.

### `lesson_progress`

Progreso.

## Comunidad

### `community_categories` / translations

Categorías.

### `community_posts`

Texto, locale, status, autor y moderación.

### `community_comments`

Comentarios.

### `community_reactions`

Reacción única por usuario.

### `community_reports`

Reportes.

### `moderation_actions`

Acciones auditadas.

### `community_bans`

Restricciones temporales o permanentes.

## IA

### `content_chunks`

Fragmentos de contenido aprobado, embedding y metadata.

### `ai_conversations`

Conversaciones propias del usuario.

### `ai_messages`

Mensajes con retención y flags.

### `ai_message_citations`

Contenido citado.

### `ai_feedback`

Feedback.

## Seguridad y privacidad

### `audit_log`

Append-only, no editable desde cliente.

### `security_events`

Eventos de riesgo.

### `data_subject_requests`

Acceso, corrección, exportación o eliminación.

### `admin_invitations`

Invitaciones de personal, hash de token y expiración.
