# Experiencia de agencia y aplicación móvil

Fecha de decisión: 2026-09-04.

## Problema resuelto

Vwayaj Ayisyen deja de presentarse como un directorio general de cuatro países
y pasa a ser una agencia digital enfocada exclusivamente en Chile y Brasil. La
interfaz pública se publica únicamente en criollo haitiano.

## Alcance integrado

- Escritorio: inicio simple con elección Chile/Brasil, selector de residencia
  limitado a Haití, República Dominicana, Chile, Brasil, México y Estados
  Unidos, explicación contextual, acceso al trámite oficial y ayuda por
  WhatsApp cuando esté configurada.
- Móvil: splash, cuatro pantallas de onboarding, decisión de acceso, opción de
  invitado, instalación PWA, home de aplicación, navegación inferior y perfil.
- Viaje móvil: los botones principales abren un selector de residencia y 14
  rutas específicas (dos destinos por siete orígenes). La opción «Otro país»
  explica el límite de información y dirige al directorio consular.
- Países: portada, introducción y secciones desplegables para visa, trabajo,
  documentos, lugares, comunidad haitiana y noticias.
- Noticias: diez artículos destacados, índice por país y lectura en secciones
  cortas con regreso a noticias o al inicio.
- Cuenta móvil: una única acción «Continuar con Google», perfil con nombre,
  foto, teléfono, país de residencia, fecha de nacimiento y notificaciones.
- Perfil: noticias guardadas, diez preguntas frecuentes, formulario de soporte
  y acceso a WhatsApp cuando el número esté configurado.

## Cambios de datos

Firebase Authentication gestiona la identidad Google. Firestore guarda el
perfil, preferencias, noticias guardadas y contadores antiabuso. Cloud Storage
guarda avatares WebP privados de hasta 1 MB. Las reglas incluidas deniegan todo
acceso directo desde el navegador; las operaciones pasan por el servidor.

## Seguridad

- El acceso falla cerrado hasta que estén presentes todas las variables
  públicas y privadas de Firebase y ambos identificadores de proyecto coincidan.
- El servidor acepta solamente tokens recientes emitidos por el proveedor
  `google.com`, con correo verificado, y crea una cookie HttpOnly de cinco días.
- El navegador no puede elegir propietario, correo ni proveedor de identidad.
- Los avatares se convierten a WebP de 512 × 512, se guardan bajo el UUID del
  usuario y RLS impide escribir en carpetas ajenas.
- El formulario de soporte exige sesión, valida los campos y limita a cinco
  mensajes por hora y cuenta antes de enviarlos mediante Resend.
- WhatsApp permanece desactivado hasta definir un número válido y completar la
  revisión de privacidad.

## Variables nuevas

Todas están documentadas en `.env.example`: configuración web de Firebase,
credencial de servicio Firebase Admin, Resend, remitente y número de WhatsApp.

## Verificación requerida antes de producción

1. Aprobar el texto legal en criollo haitiano y fijar las versiones aprobadas.
2. Crear el proyecto Firebase, habilitar Google y registrar los dominios finales.
3. Desplegar las reglas Firestore y Storage y comprobar la denegación directa.
4. Configurar Resend, SPF/DKIM y la entrega a `support@vwayajayisyen.com`.
5. Verificar el número de WhatsApp y el mensaje inicial.
6. Ejecutar formato, lint, tipos, pruebas unitarias, E2E, build, auditoría de
   dependencias, detección de secretos y escaneo estático.

## Rollback

Para una reversión segura, retirar las variables Firebase del despliegue, lo que
desactiva el botón sin exponer un flujo incompleto, y desplegar la versión
anterior. No borrar `profiles` ni `avatars` sin autorización explícita.

## Riesgos y bloqueos pendientes

- No hay credenciales Firebase ni un proyecto remoto autorizado en el entorno
  local; por eso Google muestra un estado no disponible hasta configurarlo.
- El texto legal nuevo necesita aprobación profesional antes de habilitar altas.
- Las diez noticias son una selección editorial estática; requieren calendario
  de revisión y actualización, no se anuncian como un feed en tiempo real.
- El cambio está implementado localmente, pero no crea ni modifica recursos
  remotos de Firebase sin una cuenta, un ID de proyecto y autorización del dueño.
