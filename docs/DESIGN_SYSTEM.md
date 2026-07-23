# Sistema de diseño premium

Fecha: 2026-07-22

## Tokens

Los tokens viven en `src/app/globals.css` y usan nombres semánticos.

| Token | Valor base | Uso |
|---|---:|---|
| `--ink-950` | `#0B1324` | títulos y texto de máximo contraste |
| `--ink-800` | `#1C2A3A` | texto fuerte |
| `--ink-600` | `#526170` | texto secundario |
| `--canvas` | `#F6F7FB` | fondo de producto |
| `--warm-canvas` | `#FBF7F0` | secciones editoriales |
| `--surface` | `#FFFFFF` | tarjetas y formularios |
| `--border` | `#E3E7EE` | divisores |
| `--brand-600` | `#3157D9` | acción principal |
| `--brand-700` | `#2647B8` | hover/activo |
| `--aqua-600` | `#0D9488` | confianza y orientación |
| `--coral-500` | `#E86B58` | acento humano |
| `--gold-500` | `#D6A13A` | detalle premium |

## Escala

- contenedor público: 1320 px;
- lectura: 760 px;
- gutters: 20 px móvil, 36 px tableta, 64 px escritorio;
- botones e inputs: radio 13 px;
- tarjetas: radio 20 px;
- editoriales: radio 28 px;
- target interactivo mínimo: 44 px.

## Componentes

### Navegación

- `SiteHeader`
- `PublicNavigation` con mega-menús accesibles
- `MobileNavigationDrawer`
- `LanguageSwitcher`
- `SiteFooter`
- `ContextualAdvisorCTA`
- `MobileAppBar`
- `MobileBottomNavigation`
- `InstallAppPrompt`
- `PwaUpdatePrompt`

### Editorial y marketing

- `HeroSection`
- `SectionHeading`
- `CountryCard`
- `EditorialCard`
- `PackageCard`
- `TrustStrip`
- `CountryQuickFacts`

### Producto y operación

- `AppSidebar` / `AppTopbar` integrados en `PrivateAreaShell`
- `MetricCard`
- `Timeline`
- `DataTable`
- `StatusBadge`
- `EmptyState`
- `FeatureUnavailable` para estados privados/configurados, nunca para repetir placeholders públicos

### Formularios

- campos con labels reales;
- ayuda sólo cuando aporta;
- error junto al campo y resumen accesible;
- password visible/oculta;
- requisitos al enfocar o escribir;
- loading y disabled distinguibles sin depender sólo del color.

## Estados

Cada superficie contempla loading, vacío, primera vez, permiso insuficiente, sesión expirada, error, mantenimiento y éxito. Los estados públicos no exponen códigos internos; el ID de incidente sólo aparece cuando existe uno real.

## Activación de App Shell

Se activa con CSS y detección cliente cuando se cumple al menos una condición:

- ancho menor o igual a 767 px;
- ancho menor o igual a 1366 px con puntero `coarse` y sin hover;
- `display-mode: standalone`;
- `display-mode: fullscreen`.

Una tableta táctil conserva el App Shell en vertical y horizontal. Laptop y
escritorio con puntero preciso conservan la web normal. No se detecta el
dispositivo por marca para decidir el layout.

## Accesibilidad

- landmarks y jerarquía semántica;
- foco de 3 px con offset;
- drawer, mega-menú y bottom sheet con Escape y retorno de foco;
- overlays con `aria-modal`;
- `aria-live` sólo en feedback dinámico;
- imágenes con alt contextual;
- tablas con caption y encabezados;
- reduced motion y zoom 200–400 %.

## Regla de color

No existen `dark:`, `.dark`, `prefers-color-scheme: dark` ni `color-scheme:
dark`. Los fondos oscuros no se usan en páginas, cards, footer, login o
dashboard. El azul intenso sólo se admite en botones/CTA cuya combinación de
texto cumple contraste.
