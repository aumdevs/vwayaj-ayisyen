# Roles y permisos

## Roles

| Rol | Propósito |
|---|---|
| user | Persona registrada/cliente |
| advisor | Asesor interno con expedientes asignados |
| professional | Profesional externo con concesiones explícitas |
| content_editor | Redacción, traducción y mantenimiento |
| moderator | Moderación comunitaria |
| admin | Administración operativa |
| super_admin | Seguridad, roles, settings críticos y administración total |

Una persona puede tener más de un rol. Los roles nunca se aceptan desde el cliente.

## Matriz resumida

| Recurso | Usuario | Asesor | Profesional | Editor | Moderador | Admin |
|---|---:|---:|---:|---:|---:|---:|
| Contenido publicado | Leer | Leer | Leer | Leer | Leer | Todo |
| Borradores | No | No | No | Asignados | No | Todo |
| Perfil propio | Todo limitado | Todo limitado | Todo limitado | Todo limitado | Todo limitado | Todo |
| Roles | Ver propios | Ver propios | Ver propios | Ver propios | Ver propios | Gestionar |
| Lead | Propio si vinculado | Asignados | No | No | No | Todo |
| Expediente | Propio | Asignados | Concesión | No | No | Todo |
| Documento | Propio | Asignados + AAL2 | Concesión + AAL2 | No | No | Todo + AAL2 |
| Nota interna | No | Asignados | Sólo compartida | No | No | Todo |
| Pago | Propio | Estado necesario | No | No | No | Todo |
| Cita | Participante | Propias | Propias | No | No | Todo |
| Curso | Consumir | Consumir | Consumir | Editar asignado | No | Todo |
| Comunidad | Participar | Participar | Participar | Participar | Moderar | Todo |
| Auditoría | No | No | No | No | Acciones propias | Todo + AAL2 |
| Settings críticos | No | No | No | No | No | Super admin |

## Condiciones adicionales

- Todo rol privilegiado requiere MFA.
- Documentos, roles, pagos y exportaciones requieren `aal2`.
- Un asesor no obtiene acceso a un expediente sólo por conocer su UUID.
- Un profesional requiere un registro de concesión activo, permisos específicos y expiración.
- Un editor no puede aprobar su propio contenido de alto impacto cuando hay revisor disponible.
- Un moderador no accede a expedientes.
- Un admin normal no puede quitar el último `super_admin`.
- Cambios de rol y concesiones generan evento de auditoría.
- La desactivación de un empleado revoca sesiones y permisos de inmediato.
