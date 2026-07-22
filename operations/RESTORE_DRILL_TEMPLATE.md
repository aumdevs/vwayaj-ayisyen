# Simulacro de restauración

- Fecha:
- Responsable:
- Fuente backup:
- Destino aislado:
- RPO objetivo/observado:
- RTO objetivo/observado:

## Alcance

- Postgres
- Auth/config
- Storage objects
- migraciones/functions/RLS
- secretos reinyectados de forma segura
- proveedores

## Procedimiento

1. Crear proyecto aislado.
2. Restaurar DB.
3. Aplicar configuración/migraciones faltantes.
4. Restaurar objetos y verificar hashes.
5. Configurar secretos de prueba.
6. Ejecutar RLS/health/E2E.
7. Confirmar que no se envían emails/pagos reales.
8. Destruir o proteger entorno de simulacro.

## Resultados

| Control | Esperado | Observado | Pass |
|---|---|---|---|

## Hallazgos/acciones

No guardar datos reales restaurados más tiempo del necesario.
