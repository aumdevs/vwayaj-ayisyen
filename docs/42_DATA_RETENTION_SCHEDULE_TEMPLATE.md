# Calendario de retención — plantilla

> Completar con abogado, contabilidad, profesionales y proveedores. Los plazos son `[REQUIRED]`; no inventarlos.

| Categoría | Finalidad | Inicio del plazo | Plazo activo | Backup | Acción final | Base/excepción |
|---|---|---|---|---|---|---|
| Cuenta | Autenticación/servicio | Cierre | [REQUIRED] | [REQUIRED] | Eliminar/anonimizar | [REQUIRED] |
| Lead no convertido | Contacto | Última actividad | [REQUIRED] | [REQUIRED] | Eliminar/anonimizar | DNC mínimo |
| Expediente | Servicio/reclamos | Cierre | [REQUIRED] | [REQUIRED] | Eliminar/archivar limitado | [REQUIRED] |
| Documentos | Tarea concreta | Cierre/tarea | [REQUIRED] | [REQUIRED] | Borrado objeto + metadata | [REQUIRED] |
| Pagos/facturas | Fiscal | Transacción | [REQUIRED] | [REQUIRED] | Archivar/eliminar | Legal |
| Mensajes | Servicio | Cierre | [REQUIRED] | [REQUIRED] | Eliminar/anonimizar | [REQUIRED] |
| Auditoría | Seguridad | Evento | [REQUIRED] | [REQUIRED] | Eliminar agregado | [REQUIRED] |
| Security logs | Detección | Evento | [REQUIRED] | [REQUIRED] | Eliminar/agregar | [REQUIRED] |
| Comunidad | Publicación/cierre | Eliminación/cierre | [REQUIRED] | [REQUIRED] | Borrar/seudonimizar | Moderación |
| IA | Ayuda | Conversación | Corto [REQUIRED] | No o corto | Eliminar | Consent/base |
| Assessment anónimo | Resultado | Expiración | 30 días propuesto | No | Eliminar | Validar |
| Consentimiento | Evidencia | Retiro/servicio | [REQUIRED] | [REQUIRED] | Conservar mínimo | Legal |
| DSR | Cumplimiento | Cierre | [REQUIRED] | [REQUIRED] | Eliminar evidencia excesiva | Legal |

## Implementación

- `retention_until` por registro/objeto.
- Cron idempotente.
- Legal hold separado y autorizado.
- Dry run/reporte.
- Doble control para borrado masivo.
- Backups expiran.
- Hash/inventario de objetos.
- Métricas sin PII.
- Confirmar eliminación a usuario cuando proceda.
