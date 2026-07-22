# Citas y videollamadas

## Alcance inicial

La plataforma administra disponibilidad, reserva, reprogramación, cancelación, recordatorios y acceso controlado a una URL de reunión creada por un proveedor externo. No se construirá infraestructura propia de videollamada en la primera versión.

## Tipos de cita

- orientación inicial;
- revisión de preparación;
- seguimiento de caso;
- sesión con profesional externo;
- sesión grupal/curso, si se habilita.

Cada tipo define duración, buffer, roles permitidos, precio si aplica, país, modalidad, política de cancelación y plazo mínimo.

## Disponibilidad

- Guardar en UTC; mostrar en zona del usuario y del asesor.
- Cada miembro configura zona IANA, horario semanal, ausencias y excepciones.
- Usar una restricción de exclusión o transacción bloqueada para evitar doble reserva.
- Reservar temporalmente un slot durante Checkout sólo por un TTL corto.
- Liberar holds vencidos mediante cron.
- No confiar en la hora enviada por el cliente.
- Manejar horario de verano con librería compatible con Temporal o una solución bien probada.

## Flujo

1. Usuario elige tipo y ve slots calculados por servidor.
2. Servidor vuelve a validar disponibilidad.
3. Si requiere pago, crea hold + orden; confirma únicamente con webhook.
4. Si no requiere pago, confirma en transacción.
5. Crear `appointment`, participantes y evento de notificación.
6. Crear/reutilizar reunión mediante adaptador del proveedor.
7. Mostrar URL sólo a participantes autenticados y dentro de una ventana razonable.
8. Registrar cambios, no la conversación.

## Integración de video

Crear interfaz `MeetingProvider` con métodos:

- `createMeeting`
- `updateMeeting`
- `cancelMeeting`
- `getJoinInfo`

Implementación inicial puede ser `ManualMeetingProvider`, donde un administrador añade una URL segura. Añadir Google Meet, Zoom u otro proveedor sólo cuando existan credenciales y revisión de privacidad.

### Reglas

- No mostrar URL en correo completo; usar enlace autenticado al portal.
- No indexar.
- No registrar URL en analytics.
- Rotar/recrear cuando se reasigna una cita.
- Sala de espera y contraseña cuando el proveedor lo permita.
- No grabar por defecto.
- Grabación exige consentimiento específico, política de retención y revisión legal.
- No permitir URLs `javascript:`, dominios no autorizados o enlaces acortados.
- Auditoría de quién visualizó el enlace.

## Cancelaciones y no-show

- Políticas versionadas por tipo/paquete.
- Usuario ve el efecto antes de confirmar.
- Reembolso, si corresponde, pasa por el flujo financiero.
- Marcar `no_show` sólo por personal autorizado.
- Evitar penalizaciones automáticas sin revisión.
- Recordatorios no deben revelar el motivo migratorio en pantalla bloqueada.

## Pruebas

- Dos reservas simultáneas no pueden ocupar el mismo asesor/slot.
- DST no mueve una cita a fecha incorrecta.
- Usuario ajeno no ve cita ni URL.
- Cita cancelada invalida acceso.
- Pago fallido libera hold.
- Recordatorios respetan idioma, zona horaria y preferencias.
