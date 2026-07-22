# WhatsApp, formularios públicos y CRM

## WhatsApp

El botón de WhatsApp es un canal de contacto, no un mecanismo para transmitir datos sensibles.

### Configuración editable

- Número principal E.164.
- Número alternativo por país.
- Plantillas por locale, país, paquete, servicio y página.
- Horario y aviso de tiempo de respuesta.
- Estado activo/inactivo.
- Texto de consentimiento de canal externo.

### Reglas

- Generar enlaces en servidor o desde configuración pública saneada.
- Mensajes prellenados genéricos: país, código de paquete y código de origen.
- No incluir nombre completo, pasaporte, estado migratorio, salud, documentos, ingresos ni respuestas del cuestionario en la URL.
- Nunca afirmar que WhatsApp es un canal seguro para enviar documentos.
- Mostrar enlace alternativo al formulario.
- Registrar sólo el clic agregado, salvo consentimiento para atribución.
- Validar `https://wa.me/<numero>?text=<urlencoded>` y bloquear esquemas arbitrarios.

Ejemplo conceptual:

`Bonjou, mwen enterese nan sèvis [PACKAGE_CODE] pou [COUNTRY_CODE]. Sous: [PAGE_CODE].`

## Formularios de evaluación

### Protección

- Route Handler del servidor.
- Zod y normalización.
- CSRF/origin checks cuando aplique.
- CAPTCHA/BotID tras señal de riesgo.
- Honeypot y tiempo mínimo razonable.
- Rate limit por IP, fingerprint de bajo riesgo y destinatario.
- Tamaño máximo por campo y por request.
- Sin HTML.
- Consentimiento versionado.
- Respuesta indistinguible para evitar enumeración.
- No enviar la evaluación completa por correo.

### Datos iniciales

Recoger solamente lo necesario:

- país de interés;
- país actual;
- objetivo;
- rango de edad, no fecha de nacimiento completa;
- idiomas;
- situación familiar en categorías;
- rango de presupuesto;
- nivel de estudios;
- área de experiencia laboral;
- lista de documentos disponibles, no copias;
- fecha aproximada;
- ayuda solicitada;
- canal de contacto y consentimiento.

No recoger por formulario público: números de pasaporte, documentos, biometría, antecedentes, información médica detallada ni credenciales.

## CRM

El CRM administra relaciones y trabajo comercial sin convertirse en un depósito indiscriminado de PII.

### Entidades

- `crm_contacts`
- `crm_contact_channels`
- `leads`
- `lead_activities`
- `lead_assignments`
- `lead_tags`
- `lead_consents`
- `lead_conversion_links`

### Estados sugeridos

`new`, `triage`, `qualified`, `appointment_pending`, `proposal_sent`, `converted`, `not_eligible`, `closed`, `spam`, `do_not_contact`.

### Controles

- Cifrado de campos de contacto mediante AES-256-GCM del lado servidor.
- Índices ciegos HMAC para búsqueda exacta de email/teléfono normalizado.
- Claves versionadas fuera de DB.
- DTO mínimos: listas no devuelven notas completas ni datos innecesarios.
- Exportación desactivada por defecto; permiso explícito, MFA, justificación y auditoría.
- Regla de “do not contact” inviolable por automatizaciones.
- Vistas limitadas por asignación/equipo.
- Notas estructuradas; prohibir pegar documentos o secretos.
- Retención y anonimización para leads cerrados/inactivos.
- Dedupe seguro usando hashes, sin revelar coincidencias a usuarios no autorizados.
- Auditoría de lectura de perfiles sensibles.

## Conversión de lead a usuario/caso

1. Asesor marca lead como elegible.
2. Sistema envía invitación única, expirable y de un solo uso.
3. El interesado crea/verifica su cuenta.
4. Con consentimiento, se enlazan los registros; no se copian notas internas innecesarias.
5. La creación de caso se realiza después del pago o autorización administrativa.
6. Cada paso queda auditado.

## Métricas permitidas

- Conteos por país, origen, estado y mes.
- Conversión agregada.
- Tiempo promedio de respuesta.
- No exponer segmentos pequeños que permitan reidentificación.
- No usar origen nacional, raza u otras características sensibles para publicidad discriminatoria.
