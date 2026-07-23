# Atención y operación

## Canales

- portal autenticado para casos/documentos;
- email de soporte general;
- WhatsApp para contacto inicial no sensible;
- teléfono/horario [REQUIRED];
- canal privado de seguridad/privacidad.

## Triage

### Urgente

- cuenta comprometida;
- documento enviado a persona equivocada;
- pago duplicado;
- amenaza/trata/violencia;
- cambio migratorio crítico;
- caída de scanner con uploads.

Escalar mediante runbook, no resolver sólo por WhatsApp.

### Normal

- navegación;
- paquete;
- cita;
- estado de tarea;
- curso;
- corrección de perfil.

## Verificación de identidad

No pedir contraseña/OTP. Para caso sensible, el usuario inicia sesión y abre solicitud. Soporte no acepta documento por email/WhatsApp para “verificar”.

## Macros

Macros multilingües revisadas, sin diagnósticos ni garantías. Siempre personalizar con información mínima.

## Acceso del personal

- cuenta individual;
- MFA;
- no cuentas compartidas;
- no descargar salvo necesidad;
- no guardar en dispositivos personales;
- pantalla bloqueada;
- revocación al salir;
- revisión trimestral.

## Quejas/correcciones

- ID;
- categoría;
- severidad;
- responsable;
- plazo;
- evidencia;
- respuesta;
- aprendizaje.

Corrección editorial de alto riesgo puede despublicar primero y revisar después.

## Solicitudes de privacidad

- `https://vwayajayisyen.com/es/admin/privacy-requests` es la cola operativa de solicitudes abiertas.
- Sólo personal administrador con MFA (`aal2`) puede verla; RLS vuelve a comprobar el rol en la base de datos.
- Revisar la cola cada día hábil y al iniciar cada turno operativo. No se promete un SLA público hasta validarlo jurídicamente.
- Cada alta genera en la misma transacción un evento `privacy.data_subject_request.received` en `outbox_events`; un reintento no duplica la solicitud ni el evento y actualiza su metadata de idioma mientras siga pendiente.
- La cola muestra directamente la descripción opcional a todo administrador AAL2
  autorizado para que pueda tramitar la solicitud. Tratarla como confidencial,
  abrir la cola sólo cuando sea necesario y no copiar ese texto a logs,
  auditoría, outbox, email ni herramientas externas.
- Si la cola no está disponible, escalar inmediatamente a `legal@vwayajayisyen.com` y registrar la incidencia.
- No marcar una solicitud como atendida sin conservar la decisión, la verificación proporcional y la respuesta aplicable.

## Capacidad

Mostrar horarios/tiempos reales. No prometer 24/7. Colas por país/idioma/urgencia. Evitar que un solo administrador sea punto único de fallo.

## Capacitación

- alcance/no garantía;
- privacidad;
- fraude/trata;
- documentos;
- discriminación;
- lenguaje claro;
- seguridad;
- incidentes;
- derivación profesional.
