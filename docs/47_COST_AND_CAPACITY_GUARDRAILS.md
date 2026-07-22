# Guardrails de costo y capacidad

No diseñar módulos con consumo ilimitado. Los límites concretos dependen del plan contratado y deben configurarse antes de activar cada proveedor.

## Presupuesto por superficie

| Superficie | Medida | Límite inicial configurable | Kill switch |
|---|---|---|---|
| IA | solicitudes/usuario/día y gasto/mes | requerido | `DISABLE_AI_ASSISTANT` |
| Documentos | MB/archivo, archivos/caso, GB/usuario | 10 MB por archivo; demás requerido | `DISABLE_DOCUMENT_UPLOADS` |
| Formularios | intentos/IP/usuario/ventana | requerido | `DISABLE_PUBLIC_INTAKE` |
| Comunidad | posts/comentarios/reportes por ventana | requerido | `DISABLE_COMMUNITY` |
| Citas | reservas/usuario/día y holds | requerido | `DISABLE_APPOINTMENTS` |
| Pagos | sesiones/orden y reintentos | requerido | `DISABLE_PAYMENTS` |
| Email | mensajes/usuario/día y rebotes | requerido | proveedor/outbox |
| Logs | GB/día y días de retención | requerido | nivel/sampling |
| Búsqueda | consultas/minuto | requerido | rate limit |
| Exportaciones | filas/archivo/día | requerido + AAL2 | feature administrativa |

## Reglas

- Rechazar trabajo antes de llamar al proveedor cuando se supera el límite.
- No usar retries infinitos; backoff, jitter y dead-letter.
- Idempotency key para pagos, jobs y notificaciones.
- Cuotas separadas por usuario, IP, organización y sistema.
- Alertas al 50 %, 75 %, 90 % y 100 % del presupuesto definido.
- No registrar cuerpos completos para “debug” como sustituto de observabilidad.
- Limitar tamaño de prompts, respuestas, búsquedas y contexto RAG.
- Paginar todas las listas y exportaciones.
- Jobs en lotes pequeños con checkpoint.
- Definir límites duros en DB/API además de la interfaz.

## Degradación segura

Cuando un proveedor falle o llegue al presupuesto:

- IA: mostrar contenido/búsqueda y contacto humano.
- WhatsApp: mostrar formulario o email.
- Video: permitir reprogramar; no publicar enlaces abiertos.
- Email: conservar notificación en app y cola con TTL.
- Stripe: impedir nuevas compras; mantener historial.
- Scanner: impedir nuevas cargas; no promover archivos sin analizar.
- Observabilidad: reducir sampling no crítico; conservar seguridad.

## Panel operativo

Mostrar sin exponer datos personales:

- consumo actual y tendencia;
- errores/reintentos;
- colas y jobs fallidos;
- almacenamiento por clase;
- IA por modelo/función;
- email por estado;
- Stripe por estado de orden;
- flags y límites efectivos;
- alertas y responsable.
