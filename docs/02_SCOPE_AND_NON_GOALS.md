# Alcance y no objetivos

## Alcance de la primera versión

La primera versión incluye todos los módulos solicitados, pero las integraciones externas dependientes de cuentas o claves quedan protegidas por feature flags hasta ser configuradas.

### Público

- Inicio.
- Cuatro páginas de país.
- Guías y buscador.
- Comparador.
- Cuestionario.
- Servicios y paquetes.
- FAQs.
- Sobre nosotros.
- Contacto y WhatsApp dinámico.
- Términos, privacidad, cookies, reembolsos, IA y normas.

### Cuenta y portal

- Registro y login.
- Verificación y recuperación.
- Perfil y preferencias.
- MFA.
- Evaluaciones guardadas.
- Órdenes y pagos.
- Expedientes.
- Documentos.
- Citas.
- Notificaciones.
- Cursos.
- Comunidad.
- Asistente de IA.
- Solicitudes de datos y eliminación.

### Operación

- CRM.
- Asignaciones.
- Tareas y notas.
- Panel de asesor.
- Panel de profesional.
- Panel editorial.
- Moderación.
- Panel administrador.
- Auditoría y seguridad.

## Fuera de alcance por defecto

- Aplicación iOS/Android nativa.
- Representación legal automática.
- Presentación directa de solicitudes a gobiernos sin integración y autorización formal.
- Garantía de empleo, visa, residencia o entrada.
- Marketplace abierto de terceros.
- Mensajes privados entre usuarios.
- Archivos adjuntos en comunidad.
- Cobro en efectivo administrado por la web.
- Criptomonedas.
- Rutas clandestinas.
- Verificación biométrica.
- Reconocimiento OCR de pasaportes en el lanzamiento.
- Traducción automática publicada sin revisión.
- Integración de video propietaria sin credenciales.
- Acceso del asistente de IA a expedientes o documentos.
- Publicación automática de cambios legales.
- Scraping de sitios gubernamentales sin permiso.

## Feature flags obligatorias

- `payments_enabled`
- `document_uploads_enabled`
- `ai_assistant_enabled`
- `community_enabled`
- `email_notifications_enabled`
- `web_push_enabled`
- `video_provider_enabled`
- `public_registration_enabled`
- `professional_portal_enabled`

Las funciones de alto riesgo empiezan desactivadas en producción hasta superar su checklist.
