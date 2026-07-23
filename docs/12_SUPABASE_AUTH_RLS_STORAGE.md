# Supabase: Auth, RLS y Storage

## Principio

Supabase ofrece acceso desde navegador sólo si RLS limita cada fila. La app debe suponer que cualquier usuario puede llamar la API directamente.

## Auth SSR

- Usar `@supabase/ssr`.
- Cookies `HttpOnly` cuando el flujo lo permita, Secure en producción y SameSite Lax/Strict según ruta.
- Refrescar sesión en proxy/middleware siguiendo documentación actual.
- Evitar cachear respuestas con `Set-Cookie`.
- Validar usuario en servidor con método que contacte Auth cuando la seguridad lo requiera.
- No confiar en datos de sesión enviados por el cliente.

## Contraseñas

Configuración recomendada:

- Longitud mínima 12 para usuarios.
- 16 para staff cuando la plataforma permita políticas diferenciadas; si no, 12 + MFA.
- Mayúscula, minúscula, número y símbolo.
- Protección contra contraseñas filtradas si el plan lo permite.
- Email verificado.
- Rate limits.
- Cloudflare Turnstile en registro, conexión y recuperación; el token se valida en Supabase Auth, no sólo en el navegador.
- Mensajes que eviten enumeración.

El alta pública queda disponible únicamente cuando coinciden todos los
controles: proveedor remoto habilitado, `DISABLE_PUBLIC_REGISTRATION=false`,
Turnstile listo, `REGISTRATION_TERMS_VERSION` fijada a una versión publicada y
la misma clave HMAC disponible como `REGISTRATION_GATE_SIGNING_KEY` en el
servidor y como `vwayaj_registration_gate_hmac` en Supabase Vault. La acción de
servidor firma email, versión, fecha y nonce; el hook
`private.before_user_created` rechaza dentro de Supabase Auth cualquier alta
directa o manipulada. El trigger de perfil sólo conserva una versión y fecha de
aceptación cuya firma siga siendo válida.

Supabase mantiene el secreto de Turnstile, la contraseña SMTP y la copia HMAC de
Vault fuera del navegador. El `supabase/config.toml` versionado es
exclusivamente local/CI, usa callbacks locales, el buzón de pruebas, activa el
hook y mantiene `enable_signup=false`; la configuración remota de Producción se
aplica y verifica de forma explícita.

## MFA

- TOTP.
- Obligatorio para roles privilegiados.
- UI de enrolamiento, desafío, recuperación y gestión.
- RLS y DAL deben comprobar `aal2` en acciones sensibles.
- No basta con esconder botones.

## Roles

- Tabla `user_roles`.
- Sólo admin/service puede mutar.
- Función `private.has_role`.
- `search_path` fijo.
- No usar `raw_user_meta_data` para autorización.
- `app_metadata` puede ser una optimización, no única fuente de verdad.

## Reglas RLS

- Enable RLS en todas las tablas de `public`.
- Políticas específicas por operación.
- `anon` sólo lee contenido publicado.
- Inputs públicos se escriben mediante servidor protegido, no insert directo.
- Usuario: propio/participante.
- Asesor: asignado.
- Profesional: grant activo.
- Staff sensible: `aal2`.
- Admin: explícito, no wildcard accidental.
- `service_role` sólo en servidor.

## Pruebas RLS mínimas

Por tabla sensible:

- Anónimo no lee.
- Usuario A no lee B.
- Usuario no puede cambiar propietario.
- Asesor no asignado no lee.
- Asesor asignado en AAL1 no descarga.
- Asesor asignado en AAL2 sí.
- Profesional sin grant no lee.
- Grant expirado no lee.
- Editor no accede a CRM.
- Moderador no accede a casos.
- Admin AAL1 no ejecuta acción sensible.
- Service role sólo desde tests controlados.

## Storage

### `content-media`

- Público.
- Sólo editor/admin sube.
- Imágenes sanitizadas.
- Sin SVG por defecto.

### `avatars`

- Público o signed según decisión final.
- Sólo imágenes.
- Usuario sólo su carpeta.
- Reprocesar y eliminar metadata EXIF.

### `course-assets`

- Privado.
- Acceso por lección/curso publicado o matrícula.
- URLs firmadas.

### `case-documents-quarantine`

- Privado.
- Usuario sube a su prefijo UUID.
- Usuario ve estado, pero no descarga para compartir hasta validación.
- Staff no descarga.

### `case-documents-clean`

- Privado.
- Sólo servicio de escaneo/promoción inserta.
- Propietario y participantes autorizados leen.
- Staff requiere AAL2.
- URL firmada corta, un uso lógico y auditada.

## Nombres de objetos

```text
{user_uuid}/{case_uuid}/{document_uuid}/{random_uuid}.pdf
```

Nunca:

```text
passport-john-doe.pdf
```

## Service role

- `SUPABASE_SERVICE_ROLE_KEY` no pública.
- Módulo separado.
- No importar en Client Component.
- No registrar.
- No usar para “arreglar” RLS.
- Rotar si se expone.
