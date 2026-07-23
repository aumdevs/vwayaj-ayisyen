# Changelog del rediseño premium

Fecha: 2026-07-23

Rama de cierre: `agent/legal-center-production`

## Reemplazado

- sistema visual completo, tipografía y tokens;
- header, navegación móvil, selector de idioma y footer;
- home y narrativa editorial;
- índice y detalle de países;
- comparador, recomendador, servicios y guías;
- páginas About, FAQ, contacto, cursos, búsqueda y legal;
- shell de autenticación;
- shell de cliente y navegación móvil privada;
- shells operativos para asesor, profesional, editorial, moderación y administración;
- estados vacíos, 404, offline y error.
- mega-menús claros en laptop/escritorio;
- App Shell para teléfono, tableta táctil y standalone;
- instalación Android e instrucciones iPhone/iPad;
- actualización controlada y protección de formularios;
- manifest completo, iconos propios y screenshots reales.

## Conservado

- App Router y rutas localizadas;
- acciones y flujos Supabase Auth;
- MFA y requisito AAL2;
- `requireViewer`, roles y redirects server-side;
- RLS, migraciones, Storage y tipos generados;
- Stripe, uploads, citas, WhatsApp e IA detrás de sus gates existentes;
- CSP con nonce, headers de seguridad y caché privada;
- sitemap, robots y estructura SEO existente.

## Eliminado

- módulo heredado de reproducción de página;
- implementación, copias y controles asociados en cinco idiomas;
- navegación pública compartida con Auth y áreas privadas;
- repetición de placeholders técnicos;
- puntuaciones, precios o métricas ficticias.
- superficies grandes oscuras en footer, Auth, dashboard y cards.

## Activos editoriales

Se generaron cinco imágenes originales mediante el generador de imágenes integrado:

1. comunidad haitiana preparando una decisión de viaje;
2. escena urbana para Estados Unidos;
3. escena urbana para Chile;
4. escena urbana para Brasil;
5. escena urbana para México.

Los prompts pidieron fotografía editorial realista, personas haitianas tratadas con dignidad, luz natural, composición adaptable y ausencia de texto, logos, banderas dominantes o afirmaciones.

## Seguridad y QA verificados

- 81 pruebas unitarias aprobadas;
- 33 pruebas E2E aprobadas y 7 saltos intencionales por plataforma;
- 91 invariantes/RLS pgTAP aprobadas;
- lint de base de datos sin hallazgos;
- schema drift vacío;
- aceptación legal ligada por HMAC al hash SHA-256 exacto de cada documento oficial y locale;
- evidencia legal inmutable para case managers y columnas sensibles sin permiso
  de actualización desde navegador;
- migración de configuración oficial no destructiva para datos operativos o
  legales ya completados;
- cierre administrativo autorizado en la acción por rol y AAL2, además del RPC protegido;
- reenvíos de una solicitud de privacidad conservan una sola fila y actualizan sus detalles;
- 35 capturas finales sin error de navegador ni overflow, sin supresión general
  de errores 404 en el acceso al portal;
- consulta asíncrona del service worker cancelada al desmontar para evitar
  actualizaciones de estado React tardías entre navegaciones;
- integraciones riesgosas continúan fail-closed;
- ningún secreto productivo se incorporó al cliente ni al repositorio.

## PWA implementada

- manifest con `id`, scope, standalone, tema blanco, shortcuts, iconos y screenshots;
- iconos 48–512, maskable, monochrome, favicon y Apple Touch Icon;
- caché versionada sólo para navegación/activos públicos;
- limpieza explícita de cachés heredadas y fallback limitado a la versión vigente;
- exclusión de APIs, Auth, privado, Authorization, `private` y `no-store`;
- actualización sólo tras acción explícita;
- reintento offline nativo, funcional incluso sin hidratación de JavaScript;
- invitación una vez por sesión y ocultamiento en standalone;
- navegación inferior y App Bar en teléfono/tableta táctil, con acceso de cuenta dirigido al portal;
- cola de privacidad localizada con detalle enviado visible sólo al administrador y auditoría terminal
  mínima, sin copiar texto libre ni método de verificación;
- evidencia en `docs/screenshots/pwa-acceptance/`.

## Preview verificado

- el Preview histórico quedó protegido, sin datos productivos y con sus rutas principales en `200`;
- el build PWA final generó 35 capturas locales sin errores ni overflow;
- Lighthouse móvil final: 96 Performance, 100 Accessibility y 100 Best Practices;
- Lighthouse escritorio final: 100 Performance, 100 Accessibility y 100 Best Practices;
- SEO conserva `noindex` por decisión explícita de lanzamiento.

## Evidencia relacionada

- `docs/REDESIGN_AUDIT.md`
- `docs/DESIGN_DIRECTION.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/SCREEN_INVENTORY.md`
- `docs/RESPONSIVE_QA.md`
- `docs/ACCESSIBILITY_QA.md`
- `docs/VERIFIED_ROUTES.md`
- `docs/FEATURE_FLAGS.md`
- `docs/REDESIGN_BLOCKERS.md`
- `docs/LIGHTHOUSE_REPORT.md`
