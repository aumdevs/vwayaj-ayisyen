# Endurecimiento posterior al primer despliegue

Ningún sistema es “imposible de hackear”. El objetivo es reducir superficie, detectar abuso, limitar impacto y responder con rapidez. Este plan comienza inmediatamente después del primer Preview y antes de admitir datos reales.

## Antes de Production

- Ejecutar CI completa y pruebas RLS con matriz de roles.
- Validar CSP en modo report-only y luego enforcement.
- Confirmar HSTS, `frame-ancestors`, `object-src`, `base-uri`, `form-action`, Referrer-Policy y Permissions-Policy.
- Verificar que ninguna ruta privada se cachee públicamente.
- Confirmar que sourcemaps privados no sean públicos.
- Revisar logs buscando email, teléfono, tokens, cookies, cuerpos y rutas de documentos.
- Activar protección de bots/rate limits en auth, formularios, Stripe, comunidad e IA.
- Probar recuperación de contraseña sin enumeración de cuentas.
- Verificar MFA/AAL2 en cada acción privilegiada.
- Ejecutar pruebas IDOR por usuario, asesor, profesional, editor, moderador y admin.
- Ejecutar escaneo de dependencias, CodeQL, secret scan y revisión manual.
- Confirmar backups y completar una restauración de ensayo.

## Primeras 24 horas

- Revisar errores 4xx/5xx, intentos de login, rate limits y webhooks inválidos.
- Confirmar que Preview y Production usan proyectos/secretos separados.
- Verificar que las kill switches de módulos no aprobados continúan activas.
- Comprobar DNS, TLS, redirects, canonical y dominios de Auth.
- Confirmar que el administrador cambió la contraseña temporal y enroló TOTP.
- Revocar/eliminar la función y variables de bootstrap.
- Verificar que GitHub, Supabase y Vercel no contengan secretos en logs.

## Primera semana

- Revisar cuentas privilegiadas y eliminar accesos innecesarios.
- Afinar reglas de bots y límites con falsos positivos reales.
- Ejecutar pruebas manuales de accesibilidad con teclado y lector de pantalla.
- Probar degradación con internet lento y móvil económico.
- Verificar alertas de contenido obsoleto.
- Simular incidente de credencial comprometida.
- Probar reembolso test, replay de webhook y doble reserva.
- Ejecutar restore drill de base de datos y objetos críticos según el plan contratado.

## Primer mes

- Pentest independiente antes de activar documentos o expedientes sensibles a escala.
- Revisión formal OWASP ASVS nivel 2.
- Revisión de proveedores, DPA, retención y subprocesadores.
- Revisar costos, egress, IA, logs, storage y emails.
- Rotar secretos que hayan intervenido durante bootstrap/configuración.
- Verificar borrado/retención con datos de prueba.
- Revisar moderación, apelaciones y abuso si la comunidad está activa.

## Cadencia permanente

| Frecuencia | Actividades |
|---|---|
| diaria | alertas críticas, fallos de auth/webhook, disponibilidad y abuso |
| semanal | dependencias, errores, cuentas privilegiadas y contenido crítico vencido |
| mensual | restore parcial, revisión de acceso, costos, logs y proveedores |
| trimestral | threat model, ASVS, DSR, retención y ejercicios de incidente |
| semestral | pentest focalizado, recuperación completa y revisión legal/editorial |
| ante cambio material | nueva evaluación de seguridad, privacidad y accesibilidad |

## Criterio de contención

Ante una señal seria, priorizar:

1. desactivar la función afectada;
2. revocar sesiones/secretos;
3. preservar evidencia mínima;
4. limitar acceso a datos;
5. investigar y corregir;
6. notificar según obligaciones aplicables;
7. restaurar gradualmente con pruebas.
