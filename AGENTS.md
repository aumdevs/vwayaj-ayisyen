# Instrucciones permanentes para agentes de programación

Estas reglas se aplican a Codex y a cualquier agente que trabaje en este repositorio.

## Conducta de implementación

- Lee toda la documentación antes de modificar arquitectura, permisos o base de datos.
- Trabaja por fases, pero deja cada fase integrada, probada y documentada.
- No sustituyas requisitos difíciles por placeholders silenciosos.
- Cuando falte una credencial externa, implementa la integración completa detrás de una feature flag, prueba con mocks o modo sandbox y registra el bloqueo exacto.
- No inventes datos legales, salarios, requisitos migratorios, tiempos administrativos, precios comerciales, testimonios ni estadísticas.
- No mezcles este proyecto con ninguna otra marca o producto.
- Código, nombres de tablas, variables y comentarios técnicos en inglés. Interfaz predeterminada en kreyòl haitiano.
- No uses `any` salvo una excepción documentada.
- No ignores errores de TypeScript, ESLint, pruebas, migraciones o auditorías.
- No desactives controles de seguridad para hacer pasar una prueba.

## Seguridad obligatoria

- Trata toda entrada, parámetro, cookie, cabecera, archivo, webhook y respuesta de terceros como no confiable.
- Verifica autenticación y autorización dentro de cada Server Action, Route Handler, RPC y Edge Function.
- Nunca confíes en un rol enviado por el cliente ni en `user_metadata`.
- Usa roles almacenados del lado servidor y políticas RLS de denegación por defecto.
- La `service_role` y otras claves secretas sólo pueden existir en módulos `server-only`.
- Nunca uses una variable `NEXT_PUBLIC_*` para un secreto.
- MFA TOTP y sesión `aal2` son obligatorios para administrador, asesor, profesional, editor y moderador en acciones sensibles.
- No uses `dangerouslySetInnerHTML` para contenido editable. Renderiza Markdown con sanitización estricta.
- No interpolar SQL manualmente.
- Verifica firma e idempotencia de webhooks.
- No confíes en precios, permisos, identificadores de propietario ni estados de pago enviados por el navegador.
- Los documentos privados deben usar nombres UUID, buckets privados, URLs firmadas breves, registro de descargas y cuarentena.
- No enviar documentos personales al proveedor de IA.
- No registrar tokens, contraseñas, documentos, números de identidad, contenido completo de formularios ni URLs firmadas.

## Calidad

Antes de fusionar a `main` deben pasar:

- Formato
- Lint
- Typecheck
- Pruebas unitarias
- Pruebas de integración
- Pruebas RLS
- Pruebas E2E críticas
- Build de producción
- Auditoría de dependencias
- Detección de secretos
- Escaneo estático
- Comprobación de migraciones

## Entrega

Cada PR debe incluir:

- Problema resuelto
- Alcance
- Cambios de base de datos
- Cambios de seguridad
- Pruebas ejecutadas
- Capturas accesibles cuando cambie UI
- Plan de rollback
- Variables de entorno nuevas
- Riesgos pendientes
