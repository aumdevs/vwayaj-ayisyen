# Panel administrativo, CMS y gobernanza editorial

## Objetivo

Permitir operación diaria sin editar código y evitar que una sola persona publique información migratoria crítica sin control.

## Módulos del panel

- configuración y marca;
- países/secciones;
- fuentes;
- flujo editorial;
- traducciones;
- comparador;
- cuestionario/reglas;
- paquetes/precios;
- WhatsApp;
- FAQ/glosario;
- medios;
- cursos;
- comunidad/moderación;
- CRM;
- expedientes;
- citas;
- órdenes/pagos;
- usuarios/roles;
- flags;
- auditoría;
- seguridad/alertas;
- privacidad/retención.

## Flujo editorial

`draft → fact_check → legal_review → translation_review → approved → scheduled → published`

Alternativas: `changes_requested`, `expired`, `archived`.

### Separación de funciones

- Autor no puede aprobar su propia versión de alto impacto.
- Editor puede redactar pero no asignarse `admin`.
- Revisor legal/factual queda identificado.
- Publicación de requisitos, costos, vías legales o alertas requiere dos personas cuando el equipo lo permita.
- Un `super_admin` no debe saltar el flujo sin motivo y auditoría.
- Traducciones heredan el estado, pero requieren revisión propia.

## Modelo de contenido

Cada bloque tiene:

- tipo de información;
- país;
- locale;
- título/resumen/cuerpo estructurado;
- audiencia;
- fuentes;
- jurisdicción;
- fecha efectiva;
- última verificación;
- próxima revisión;
- autor;
- revisores;
- nivel de riesgo;
- estado;
- historial de versiones.

No usar HTML libre. Componentes permitidos: párrafo, lista, pasos, tabla accesible, aviso, glosario, recurso, CTA y fuente.

## Control de actualidad

- Alto riesgo: revisión cada 30–90 días según tipo.
- Costo de vida/salarios: fecha y metodología.
- Experiencia comunitaria: fecha, lugar, tamaño de muestra y limitaciones.
- Fuentes rotas generan tarea.
- Contenido vencido deja de alimentar IA y puede mostrar advertencia o despublicarse.
- Alertas urgentes permiten banner con fecha de expiración.

## Auditoría

Registrar:

- creación/edición/aprobación/publicación;
- antes/después normalizado o referencia de versión;
- actor;
- IP/riesgo sin sobrecolectar;
- hora UTC;
- motivo para acciones excepcionales.

La auditoría es append-only y no editable desde UI.

## Medios

- Biblioteca con licencia, alt text y crédito.
- No usar fotografías humillantes o sensacionalistas.
- Consentimiento verificable para testimonios/fotos de personas.
- Metadatos EXIF removidos.
- SVG sólo de origen interno revisado y saneado; no permitir subida pública de SVG.
- Borrado comprueba referencias.

## Administración segura

- MFA `aal2`.
- Reautenticación para roles, pagos, exportaciones, borrado y publicación de alto riesgo.
- Paginación y búsqueda server-side.
- Confirmación escribiendo un identificador para acciones destructivas.
- “Impersonation” no permitida inicialmente; soporte mediante vistas auditadas.
- No exponer service role ni consultas directas desde navegador.
