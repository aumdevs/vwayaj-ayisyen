# Estrategia de releases y migraciones

## Flujo

- `main` es la única rama de producción.
- Todo cambio entra por PR con checks obligatorios.
- Preview usa datos de prueba y un proyecto no productivo cuando sea posible.
- El artefacto probado se promueve; no se reconstruye con dependencias diferentes sin repetir checks.
- Feature flags separan despliegue técnico de activación comercial.

## Migraciones de base de datos

Aplicar el patrón **expandir → migrar → contraer**:

1. Añadir columnas/tablas/políticas compatibles.
2. Desplegar código que soporte formato anterior y nuevo.
3. Migrar/backfill en lotes idempotentes y observables.
4. Validar conteos, constraints, RLS y rendimiento.
5. Cambiar lecturas/escrituras al nuevo formato.
6. Retirar lo antiguo en una release posterior con backup verificado.

No combinar en una sola release:

- borrado irreversible y cambio de aplicación dependiente;
- renombre destructivo y eliminación;
- activación de una política RLS no probada;
- migración masiva sin límite/observabilidad;
- cambios de Storage sin plan de objetos y metadatos.

## Gate por migración

- ejecución desde base vacía;
- `supabase db lint` sin hallazgos bloqueantes;
- pgTAP/RLS aprobados;
- diff esperado revisado;
- índices evaluados;
- backup/PITR conforme al plan;
- estimación de locks/tiempo;
- rollback o forward-fix documentado;
- no secretos ni datos reales en seed;
- tipos TypeScript regenerados.

## RLS

Un cambio de RLS se considera de seguridad crítica. Cada PR debe incluir pruebas de:

- acceso permitido esperado;
- acceso denegado por vecino/otro rol;
- AAL1 frente a AAL2;
- grants expirados/revocados;
- propiedad manipulada;
- llamada directa a API, no sólo UI.

## Rollback

- Revertir código sólo cuando el esquema siga siendo compatible.
- Preferir forward-fix para migraciones ya aplicadas.
- Nunca restaurar producción sobre sí misma sin procedimiento y autorización.
- Probar restauración en proyecto aislado.
- Los objetos de Storage requieren plan propio; no asumir que una restauración de DB recupera archivos.

## Stripe y proveedores

- Versionar contratos internos y eventos procesados.
- Mantener webhook idempotente y compatible con eventos retrasados.
- No activar un nuevo Price ID hasta probar Checkout/webhook/reembolso.
- Conservar feature flag para desactivar creación de pagos sin perder consulta de órdenes existentes.

## Release report

Cada Production debe registrar:

- commit SHA;
- migraciones aplicadas;
- flags modificadas;
- variables añadidas/eliminadas por nombre;
- pruebas y smoke tests;
- responsable;
- fecha UTC;
- incidencias y rollback/forward-fix.
