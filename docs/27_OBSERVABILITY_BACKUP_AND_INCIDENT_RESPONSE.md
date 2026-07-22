# Observabilidad, copias de seguridad e incidentes

## Objetivos

- Detectar errores y abuso sin convertir los logs en otra base de datos de PII.
- Recuperar servicio y datos con objetivos definidos.
- Responder de forma ordenada, trazable y humana a incidentes.

## Logging

Formato estructurado con:

- timestamp UTC;
- entorno;
- servicio/ruta;
- request ID;
- actor ID seudónimo;
- organización/rol cuando sea necesario;
- acción;
- resultado;
- latencia;
- código de error;
- señal de riesgo.

Nunca registrar:

- contraseñas, OTP, tokens, cookies o claves;
- documentos o URLs firmadas;
- cuerpos completos de formularios;
- números de identidad;
- datos de tarjeta;
- chats completos;
- contenido de comunidad;
- firmas de webhook;
- cifrado reversible o claves.

Implementar redacción centralizada y pruebas que fallen cuando detecten patrones sensibles.

## Métricas

- disponibilidad y latencia;
- errores por ruta;
- consultas lentas;
- fallos Auth/MFA;
- rate limits;
- firmas de webhook inválidas;
- uploads rechazados/escaneo;
- accesos denegados RLS;
- cambios de rol;
- descargas de documentos;
- gasto/latencia IA;
- colas/outbox;
- pagos/reconciliación;
- health de cron;
- Core Web Vitals agregados.

No usar etiquetas con email, teléfono o IDs de documento.

## Alertas

Prioridad alta:

- service role usado desde origen inesperado;
- creación/cambio de super admin;
- múltiples descargas en corto plazo;
- RLS desactivada o tabla nueva sin RLS;
- picos de login/recovery;
- firma webhook inválida sostenida;
- escáner caído con uploads activos;
- error de backups;
- fuga detectada por secret scanning;
- gasto IA/pagos anómalo;
- exportación masiva;
- fallos de CSP/seguridad críticos.

## Health checks

- `/api/health/live`: proceso vivo, sin dependencias ni datos.
- `/api/health/ready`: comprobaciones mínimas server-side, protegida contra abuso y sin detalles.
- Estado de integraciones en panel admin, sin revelar secretos.
- No consultar proveedores caros en cada request.

## Backups

### Base de datos

- Backups automáticos/PITR según plan.
- Export adicional cifrado cuando política lo requiera.
- Probar restauración en proyecto aislado.
- Documentar RPO/RTO tras decisión de negocio.
- Verificar extensiones, funciones, RLS, cron y secretos tras restore.
- Migraciones y seed no sustituyen backup de datos.

### Storage

Las copias de DB no implican necesariamente copia de los objetos de Storage. Crear una estrategia específica:

- versionado/replicación o export cifrado;
- inventario de objetos y hashes;
- recuperación de metadatos/rutas;
- prueba de restauración;
- retención coherente;
- no conservar objetos eliminados más allá de política sin base legal.

### Configuración

Respaldar de forma segura:

- configuración de Auth;
- templates;
- redirects;
- bucket settings;
- Vercel settings;
- Stripe webhook/product mapping;
- DNS;
- feature flags;
- runbooks.

Nunca incluir secretos en un backup de documentación sin cifrado y control.

## Respuesta a incidentes

### Severidad

- SEV-1: exposición activa, toma de cuenta privilegiada, indisponibilidad crítica, pagos/documentos comprometidos.
- SEV-2: degradación importante o acceso sospechoso contenido.
- SEV-3: problema limitado sin evidencia de exposición.
- SEV-4: hallazgo menor/mejora.

### Flujo

1. Detectar y abrir registro.
2. Asignar responsable.
3. Contener: flags, sesiones, claves, acceso, despliegue.
4. Preservar evidencia minimizada.
5. Evaluar alcance y datos afectados.
6. Erradicar causa.
7. Recuperar y validar.
8. Comunicar a usuarios/autoridades según obligación y asesoría legal.
9. Postmortem sin culpas.
10. Acciones con responsables y fecha.

### Kill switches

- registro;
- pagos;
- formularios;
- WhatsApp tracking;
- documentos;
- comunidad;
- IA;
- emails;
- citas;
- acceso profesional;
- aplicación completa en modo mantenimiento.

## Simulacros

Antes del lanzamiento y cada seis meses:

- restauración;
- secreto comprometido;
- cuenta admin comprometida;
- webhook replay;
- archivo malicioso;
- borrado accidental;
- filtración por RLS;
- proveedor IA caído;
- disputa de pago;
- contenido legal urgente desactualizado.
