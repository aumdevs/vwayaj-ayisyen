# Inventario de pantallas web y PWA

Fecha: 2026-07-22

## Público

| Superficie | Ruta base | Estado previo | Resultado implementado |
|---|---|---|---|
| Inicio | `/[locale]` | hero sin fotografía y avisos internos | narrativa editorial completa |
| Países | `/[locale]/countries` | cuatro enlaces simples | índice visual con objetivos y guía de elección |
| País | `/[locale]/countries/[country]` | quince placeholders | contenido real o una sola landing editorial |
| Sección país | `/[locale]/countries/[country]/[section]` | indisponibilidad técnica | artículo publicado o alternativa útil |
| Comparador | `/[locale]/compare` | selector bloqueado técnico | selección visual y espera premium sin puntuaciones falsas |
| Recomendador | `/[locale]/find-my-country` | formulario de muestra roto | explicación clara y ruta alternativa mientras está cerrado |
| Servicios | `/[locale]/services/...` | placeholder único | tres niveles, inclusiones, proceso, límites y FAQ |
| Guías | `/[locale]/guides/...` | placeholder único | índice editorial con búsqueda y categorías |
| Cursos | `/[locale]/courses/...` | placeholder único | colección cerrada con explicación y acceso alternativo |
| About/FAQ/Contacto | rutas homónimas | cards genéricas | páginas editoriales coherentes |
| Legal | `/[locale]/legal/[document]` | mensaje técnico | estado legal único, sobrio y no contractual |
| Búsqueda | `/[locale]/search` | formulario básico | búsqueda editorial y vacío útil |
| 404/Error/Offline | global | cards de Auth | estados diferenciados, acciones seguras y offline público |

## Autenticación

- iniciar sesión;
- crear cuenta cerrada de forma segura;
- verificar correo;
- recuperar contraseña;
- establecer contraseña;
- MFA TOTP.

Todas usan un shell independiente y conservan las acciones Supabase actuales.

El alta de cuenta en Production muestra aceptación separada de Términos,
reconocimiento de Privacidad y confirmación de mayoría de edad/capacidad. Las
versiones activas se verifican de nuevo dentro de PostgreSQL.

## Cliente

- Resumen;
- Perfil;
- Seguridad;
- Evaluaciones;
- Pagos/órdenes;
- Expedientes;
- Citas;
- Cursos;
- Comunidad;
- IA;
- Notificaciones;
- Privacidad.

## Operación

- Asesor: resumen, leads, expedientes, calendario, tareas y contactos.
- Profesional: resumen, asignaciones, casos autorizados, calendario y seguridad.
- Editorial: resumen, contenido, traducciones, fuentes y revisiones.
- Moderación: resumen, reportes y usuarios restringidos.
- Admin: resumen y 24 módulos de configuración/operación.

Las rutas privadas siguen usando la frontera `requireViewer` y sólo cambian de shell/presentación.

## App Shell y estados PWA

- home con tareas rápidas;
- barra superior con idioma, atrás y “Más”;
- navegación inferior: Inicio, Países, Comparar, Guías y Cuenta;
- instalación Android;
- instrucciones iPhone/iPad;
- modo standalone sin invitación;
- offline público;
- aviso de actualización;
- bloqueo de actualización con formulario en progreso;
- red offline visible;
- safe areas y teclado móvil.

## Viewports de aceptación

`360×800`, `390×844`, `430×932`, `768×1024`, `1024×768`, `1280×800`, `1440×900`, `1728×1117`.
