# Inventario actual de pantallas

Fecha: 2026-09-04.

## Sitio público

| Pantalla | Ruta |
|---|---|
| Inicio | `/[locale]` |
| Países | `/[locale]/countries` |
| Chile | `/[locale]/countries/chile` |
| Brasil | `/[locale]/countries/brazil` |
| Noticias | `/[locale]/news` |
| Artículo | `/[locale]/news/[slug]` |
| Perfil | `/[locale]/profile` |
| Selección de residencia para viajar | `/[locale]/travel/[destination]` |
| Guía por destino y residencia | `/[locale]/travel/[destination]/from/[residence]` |
| Conexión | `/[locale]/auth/sign-in` |
| Registro | `/[locale]/auth/sign-up` |
| Verificación de correo | `/[locale]/auth/verify-email` |
| Nosotros | `/[locale]/about` |
| Preguntas frecuentes | `/[locale]/faq` |
| Contacto | `/[locale]/contact` |
| Privacidad, términos y cookies | `/[locale]/legal/[document]` |
| Sin conexión | `/offline` |
| Página no encontrada | global |

Cada ruta pública se sirve exclusivamente en kreyòl haitiano. Las rutas con los
prefijos `fr`, `es`, `pt` o `en` redirigen a `ht`. Estados Unidos y México no
son destinos; solo aparecen como posibles países de residencia en el selector.

## PWA

- splash y cuatro pantallas de onboarding en el primer acceso;
- conexión, registro o entrada directa como invitado;
- propuesta de instalación después de autenticarse y opción de continuar web;
- navegación inferior a Inicio, Chile, Brasil, Noticias y Perfil;
- instalación en Android y guía de instalación para iPhone/iPad;
- recordatorio obligatorio de cuenta tras cinco minutos como invitado, solo
  cuando el servicio de cuentas está habilitado;
- aviso de actualización controlada;
- páginas públicas esenciales disponibles sin conexión.

Viewports de aceptación: `360×800`, `390×844`, `430×932`, `768×1024`,
`1024×768`, `1280×800`, `1440×900` y `1728×1117`.
