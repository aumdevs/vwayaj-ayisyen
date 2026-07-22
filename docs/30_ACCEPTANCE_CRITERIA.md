# Criterios de aceptación globales

## Producto público

- [ ] La raíz redirige/selecciona kreyòl sin perder accesibilidad.
- [ ] USA, Chile, Brasil y México tienen estructura uniforme.
- [ ] No se publica contenido legal de relleno.
- [ ] Cada afirmación de alto impacto muestra fuente, tipo y fecha.
- [ ] Comparador explica puntuaciones.
- [ ] Cuestionario devuelve 1–2 sugerencias y razonamiento, no garantía.
- [ ] WhatsApp cambia por país/paquete y no filtra PII.
- [ ] Diseño funciona a 320 px y con teclado/lector.
- [ ] Páginas públicas tienen SEO/hreflang correctos.

## Auth y roles

- [ ] Registro, verificación, recuperación y cierre funcionan.
- [ ] No hay enumeración de cuenta observable.
- [ ] Roles no dependen de `user_metadata`.
- [ ] Personal entra sólo por invitación.
- [ ] Personal requiere TOTP y `aal2`.
- [ ] Usuario A nunca accede a datos de usuario B.
- [ ] Editor/moderador no accede a expedientes.
- [ ] Cambios de rol quedan auditados.
- [ ] Admin temporal cambia contraseña y enrola MFA.

## Datos/RLS

- [ ] RLS activa en toda tabla del esquema expuesto.
- [ ] No hay `using (true)` mutante para anon/authenticated.
- [ ] Funciones security-definer tienen `search_path` fijo y privilegios mínimos.
- [ ] Tests positivos/negativos por rol pasan.
- [ ] Foreign keys e índices críticos existen.
- [ ] Migraciones levantan DB desde cero.
- [ ] Tipos TS están sincronizados.

## Expedientes/documentos

- [ ] Acceso sólo por participación/grant.
- [ ] URLs firmadas cortas y auditadas.
- [ ] Archivos pasan cuarentena y escaneo.
- [ ] MIME/magic bytes/tamaño se verifican.
- [ ] Uploads se bloquean sin escáner.
- [ ] Archivos ajenos/limpios no enumerables.
- [ ] Retención/eliminación probada.
- [ ] Backup/restore de Storage probado.
- [ ] Pentest completado antes de datos reales.

## Pagos/citas

- [ ] Precios se resuelven en servidor.
- [ ] Firma webhook e idempotencia probadas.
- [ ] Return URL no marca pago.
- [ ] Reembolso exige MFA/auditoría.
- [ ] Dos usuarios no reservan el mismo slot.
- [ ] Zonas horarias/DST probadas.
- [ ] URL de reunión sólo para participantes.
- [ ] Entorno test/live separado.

## CRM

- [ ] Contactos cifrados.
- [ ] Hashes ciegos no permiten reversión.
- [ ] Exportaciones restringidas/auditadas.
- [ ] DNC se respeta.
- [ ] Retención aplicada.
- [ ] No hay PII en logs/analytics.

## Comunidad/cursos

- [ ] Comunidad requiere login.
- [ ] Sin DMs/adjuntos al lanzamiento.
- [ ] Reporte, moderación y apelación funcionan.
- [ ] Moderador no ve casos.
- [ ] Cursos tienen subtítulos/transcripciones.
- [ ] Progreso no se presenta como certificación oficial.

## IA

- [ ] Sólo usa contenido publicado/revisado.
- [ ] Citas visibles y correctas.
- [ ] Se abstiene sin evidencia.
- [ ] No accede a casos/documentos/CRM.
- [ ] Prompt injection suite pasa.
- [ ] PII se advierte/redacta.
- [ ] Rate/cost/kill switch funcionan.
- [ ] Está apagada hasta aprobación.

## Seguridad/operación

- [ ] CI completa.
- [ ] CodeQL/secret scan/dependency review.
- [ ] CSP/cabeceras verificadas.
- [ ] Rate limit/BotID en rutas de abuso.
- [ ] Logs redactados.
- [ ] Alertas/health checks.
- [ ] Backups y restore drill.
- [ ] Incident drill.
- [ ] Feature flags/rollback.
- [ ] Revisión legal/privacidad.
- [ ] WCAG 2.2 AA validada.
