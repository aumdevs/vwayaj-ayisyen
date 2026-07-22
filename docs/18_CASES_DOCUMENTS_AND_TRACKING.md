# Expedientes, tareas, mensajes y seguimiento

## Objetivo

Dar al cliente una visión clara de su acompañamiento y permitir al equipo trabajar con separación estricta de funciones. Un expediente no representa una decisión oficial ni una garantía migratoria.

## Entidades principales

- caso;
- participantes;
- asignaciones;
- etapas y estado;
- tareas/checklist;
- notas internas;
- mensajes cliente-equipo;
- documentos y versiones;
- solicitudes de documento;
- consentimientos;
- hitos;
- actividad/auditoría;
- permisos temporales para profesionales.

## Estados del caso

`intake`, `awaiting_payment`, `active`, `waiting_user`, `waiting_third_party`, `review`, `completed`, `cancelled`, `archived`.

El estado es independiente de cualquier proceso gubernamental. Etiquetar claramente los estados externos como información reportada, no verificada salvo evidencia.

## Acceso

- Cliente: sólo sus casos y campos explícitamente visibles.
- Asesor: casos asignados.
- Profesional: casos con concesión activa, alcance y expiración.
- Administrador: acceso justificado; no acceso silencioso.
- Editor/moderador: sin acceso por su rol.
- Super admin: acceso excepcional auditado, no uso cotidiano.
- Todo acceso privilegiado exige `aal2`.

## Notas y mensajes

### Notas internas

- Sólo personal autorizado.
- Etiquetas de sensibilidad.
- No usar para insultos, diagnósticos ni especulación discriminatoria.
- Ediciones preservan historial o generan nueva versión.
- Prohibir archivos embebidos y HTML.
- Descarga/exportación restringida.

### Mensajes

- Texto plano/Markdown limitado y saneado.
- Adjuntos únicamente mediante el flujo de documentos.
- Notificaciones contienen resumen neutro y enlace al portal.
- Bloqueo de spam y flood.
- No mensajería directa entre usuarios de comunidad y personal fuera del caso.

## Tareas

- Plantillas por país/paquete.
- Responsable, fecha, estado, visibilidad y evidencia opcional.
- Estados: `todo`, `in_progress`, `blocked`, `submitted`, `approved`, `rejected`, `done`.
- Rechazo requiere motivo visible apropiado.
- Cambios críticos auditados.
- No automatizar decisiones legales a partir de una tarea.

## Documentos

Ver `docs/14_FILE_UPLOAD_SECURITY.md`.

Metadatos mínimos:

- tipo documental genérico;
- país/caso;
- estado de escaneo;
- clasificación;
- propietario;
- ruta opaca;
- hash;
- MIME detectado;
- tamaño;
- fechas de subida/retención;
- versión;
- actor que verificó;
- motivo de rechazo.

No guardar el número completo del documento salvo necesidad contractual revisada. Nunca usarlo en nombres de archivo o rutas.

## Concesiones a profesionales externos

- Creadas por administrador/asesor con permiso.
- Alcance: caso, categorías de documentos, acciones permitidas.
- Inicio/expiración.
- Motivo.
- MFA obligatorio.
- Revocación inmediata.
- Cada lectura/descarga queda en `document_access_logs`.
- No acceso a otros clientes del asesor.

## Cierre y retención

Al completar/cancelar:

1. informar al usuario qué se conserva;
2. bloquear nuevas cargas;
3. cerrar accesos temporales;
4. iniciar reloj de retención;
5. conservar registros financieros/auditoría según obligación;
6. eliminar o anonimizar lo demás;
7. emitir comprobante de eliminación cuando proceda.

## Indicadores de progreso

Mostrar al usuario:

- etapa actual;
- tareas pendientes;
- última actualización;
- próximo paso;
- próxima cita;
- documentos solicitados;
- contacto asignado.

Nunca mostrar un porcentaje engañoso de “probabilidad de aprobación”.
