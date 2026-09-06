# Cuentas Google con Firebase

Fecha de decisión: 2026-09-04.

## Alcance

La cuenta pública usa exclusivamente Google mediante Firebase Authentication.
La misma acción conecta a una persona existente o crea su primer perfil. No hay
formularios, rutas activas ni acciones de contraseña propias.

Al iniciar sesión, el servidor valida un ID token reciente de Google y emite una
cookie de sesión HttpOnly, `SameSite=Lax`, con cinco días de duración. El perfil
muestra el nombre y la foto de Google, y permite editar nombre visible, avatar,
teléfono, país de residencia, fecha de nacimiento y notificaciones. El correo se
muestra como solo lectura.

## Datos

- `profiles/{uid}`: identidad confiable de Google, campos editables, preferencia
  de notificación y slugs de noticias guardadas.
- `support_rate_limits/{uid}`: ventana y contador antiabuso, sin contenido del
  mensaje.
- `avatars/{uid}/profile.webp`: avatar privado normalizado a 512 × 512 y máximo
  1 MB.

El contenido de soporte se transmite a Resend para entregarlo a
`support@vwayajayisyen.com`; no se almacena en Firestore.

## Configuración remota necesaria

1. Crear o seleccionar un proyecto Firebase propiedad de Vwayaj Ayisyen.
2. Registrar la aplicación web y copiar las cinco variables públicas.
3. Habilitar Google en Authentication y autorizar localhost y el dominio final.
4. Crear Firestore y Cloud Storage en la región aprobada por el responsable de
   privacidad.
5. Desplegar `firestore.rules`, `storage.rules` y `firestore.indexes.json`.
6. Crear una cuenta de servicio de privilegios mínimos para el servidor y cargar
   las tres variables `FIREBASE_ADMIN_*` únicamente en el entorno del servidor.
7. Configurar Resend, el remitente verificado y el número de WhatsApp.

La aplicación falla cerrada si falta una variable o si el ID público y el ID de
la credencial Admin no coinciden.

## Seguridad

Las reglas deniegan toda lectura y escritura directa. Perfil, avatar, noticias
guardadas y soporte se procesan en rutas o acciones autenticadas del servidor.
El servidor exige proveedor `google.com`, correo verificado, origen confiable y
token de inicio de sesión con antigüedad máxima de cinco minutos. Los avatares se
reprocesan en el navegador y se vuelven a validar por tipo, tamaño y firma WebP.

## Pruebas y rollback

Antes de producción se debe probar inicio, cierre y revocación de sesión; dos
cuentas aisladas; edición de todos los campos; carga de avatar; guardar y quitar
noticias; límite de soporte; reglas denegadas y accesibilidad móvil.

Para desactivar cuentas sin perder datos, se retiran las variables Firebase del
despliegue. No se eliminan usuarios, documentos o avatares durante el rollback.

## Bloqueo externo actual

El repositorio está preparado y la CLI local tiene una sesión Google autorizada.
El 4 de septiembre de 2026 se intentó crear el proyecto independiente
`vwayaj-ayisyen`, pero Google Cloud rechazó la operación porque la cuenta alcanzó
su cuota de creación de proyectos. Con autorización explícita del propietario,
los proyectos `aum-akademi`, `aum-os`, `aumprodz`, `solidarite-ayiti` y
`solidarite-ayiti-staging` quedaron en estado `DELETE_REQUESTED`. No se reutilizó
ninguno porque pertenecían a otras marcas y no debían compartir datos, permisos
ni credenciales con Vwayaj Ayisyen.

Después, el propietario pidió conservar `aumprodz`; se restauró durante la
ventana de recuperación y se confirmó nuevamente en estado `ACTIVE`. Los otros
cuatro proyectos permanecen en estado `DELETE_REQUESTED`.

Google mantiene los proyectos eliminados de forma no definitiva durante 30 días
y siguen contando contra la cuota durante ese período. Para continuar sin esperar,
el propietario debe solicitar un aumento de cuota o proporcionar el ID de un
proyecto vacío creado expresamente para Vwayaj Ayisyen. Después se debe repetir
la creación de la app web, habilitar Google Authentication, crear Firestore y
Storage, desplegar las reglas y cargar las credenciales en el entorno local y de
producción.
