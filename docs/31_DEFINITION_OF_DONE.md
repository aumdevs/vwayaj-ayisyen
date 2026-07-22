# Definition of Done

Una historia, ruta o función no está terminada hasta cumplir lo aplicable.

## Código

- TypeScript estricto, sin `any` injustificado.
- Server Component por defecto.
- Entradas validadas en servidor.
- Errores tipados y sin datos sensibles.
- Dependencias justificadas y fijadas en lockfile.
- Sin TODO crítico oculto.
- Código/migraciones legibles y documentados.

## Autorización

- Política de quién puede leer/escribir definida.
- Comprobación en DAL/servidor.
- RLS/Storage policy.
- Tests positivos y negativos.
- MFA/reauth cuando es crítico.
- Auditoría cuando corresponde.

## Datos

- Migración versionada.
- Índices/FK.
- Retención/clasificación.
- Seed sintético.
- Tipos generados.
- Backward compatibility/rollback.

## UX

- estado carga/vacío/error/éxito;
- móvil y escritorio;
- teclado/lector;
- texto kreyòl;
- traducciones pendientes marcadas;
- lenguaje claro;
- confirmación para irreversible;
- no promesas engañosas.

## Seguridad

- threat case revisado;
- rate limit;
- sanitización;
- no secretos/logs;
- CSP compatible;
- abuso/spam;
- prueba de caché;
- feature flag si dependencia incompleta.

## Operación

- logging/metrics;
- alerta si crítico;
- runbook;
- soporte;
- rollback;
- configuración por entorno;
- health cuando aplica.

## QA

- unitarias;
- integración;
- E2E crítico;
- regresión;
- accesibilidad;
- rendimiento razonable;
- PR/checks aprobados.

## Documentación

- usuario/admin;
- API/esquema;
- decisiones;
- variables;
- riesgos/conocidos;
- fecha/revisor para contenido.

Nada se declara “production-ready” sólo porque `pnpm build` termina.
