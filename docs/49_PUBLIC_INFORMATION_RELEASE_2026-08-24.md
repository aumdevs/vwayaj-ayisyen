# Lanzamiento público de información

Fecha: 2026-08-24.

## Problema resuelto

La aplicación mezclaba una web informativa con accesos, paneles y servicios que
no debían estar disponibles. Además, sólo Estados Unidos tenía un directorio
promocionable y la interfaz conservaba mensajes internos.

## Alcance entregado

- experiencia exclusivamente pública y PWA;
- eliminación de autenticación, paneles, APIs, base de datos y dependencias de
  servicios privados;
- 32 fuentes gubernamentales para Estados Unidos, Chile, Brasil y México;
- contenido y navegación en cinco idiomas, con kreyòl por defecto;
- nuevo sistema visual premium para todas las páginas públicas;
- SEO, sitemap, robots, manifest y service worker ajustados al alcance actual;
- términos, privacidad, cookies, FAQ y contacto adaptados al servicio público.

## Fuentes oficiales revisadas

Las fuentes pertenecen a los siguientes organismos:

- Estados Unidos: Department of State, Embajada de Estados Unidos en Haití,
  USCIS, CBP, DHS y Department of Justice;
- Chile: Embajada de Chile en Haití, ChileAtiende, Servicio Nacional de
  Migraciones y Ministerio de Educación;
- Brasil: Ministério das Relações Exteriores, Polícia Federal, Ministério do
  Trabalho e Emprego, Receita Federal, Ministério da Educação y Ministério da
  Saúde;
- México: Embajada de México en Haití, Secretaría de Relaciones Exteriores,
  Instituto Nacional de Migración, RENAPO y Secretaría de Educación Pública.

La fecha visible de revisión es 24 de agosto de 2026. Los requisitos dinámicos
se consultan directamente en las autoridades responsables.

## Cambios de datos y seguridad

- no se conserva una base de datos de usuarios;
- no se solicitan ni reciben documentos personales;
- no hay secretos de aplicación ni integraciones privadas en el runtime;
- no hay formularios de captación ni decisiones enviadas desde el navegador;
- el caché offline sólo admite navegación y recursos públicos del mismo origen.

## Pruebas de salida

- formato y lint;
- TypeScript;
- pruebas unitarias y cobertura;
- pruebas E2E en escritorio y teléfono;
- accesibilidad automática y desbordamiento;
- build de producción;
- auditoría de dependencias y escaneo de secretos;
- captura visual de escritorio, móvil y tableta;
- comprobación de rutas retiradas y enlaces oficiales.

## Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ALLOW_INDEXING`

El dominio oficial `vwayajayisyen.com` queda indexable por definición de la
versión pública aprobada. La segunda variable mantiene los entornos de prueba y
preview fuera de los buscadores salvo activación explícita. No se requieren
otras variables para ejecutar la web pública.

## Rollback

Restaurar el deployment de producción anterior en Vercel y revertir el commit
de lanzamiento. No hay migraciones ni datos que deban revertirse.

## Riesgos pendientes

Los organismos externos pueden cambiar enlaces o requisitos. El directorio debe
revisarse periódicamente y cualquier reporte de enlace roto debe atenderse sin
copiar información no verificada.
