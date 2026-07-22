# Manifiesto del paquete

## Entregables

Este paquete incluye:

- Prompt maestro para Codex.
- Requisitos funcionales y no funcionales.
- Arquitectura técnica.
- Modelo de datos y migraciones de referencia.
- Matriz de roles y permisos.
- Especificación de RLS y Storage.
- Modelo de amenazas.
- Estrategia de carga segura de archivos.
- Stripe, WhatsApp, CRM, citas, videollamadas, expedientes, cursos, comunidad e IA.
- Diseño, accesibilidad, internacionalización, PWA, rendimiento y SEO.
- CI/CD, GitHub, Supabase y Vercel.
- Estrategia de pruebas.
- Checklists de seguridad y lanzamiento.
- Borradores legales.
- Backlog, matriz de riesgos, pruebas y criterios de aceptación.
- Guardrails para aprovisionamiento mediante sesiones abiertas del navegador.
- Estrategia de releases, migraciones, costos y endurecimiento posterior al despliegue.
- Credencial temporal del administrador en un archivo separado, excluido del ZIP principal.

## Lo que no contiene

- Credenciales de Supabase, Vercel, GitHub, Stripe, OpenAI, correo o WhatsApp.
- Contenido jurídico listo para publicar.
- Datos personales reales.
- Un dominio.
- Activos definitivos de marca distintos del nombre oficial **Vwayaj Ayisyen**.
- Compromiso de que una región, plan o función de terceros esté disponible sin verificarlo en el momento de implementación.

## Regla de verdad

Las fuentes oficiales definen requisitos y procedimientos. La experiencia comunitaria se presenta como experiencia, no como ley. Los consejos prácticos se etiquetan. Las opiniones no se publican como hechos.

## Estado de esta entrega

Es un handoff de ingeniería y producto, no una afirmación de que la aplicación ya esté desplegada. Las migraciones son una base de referencia que Codex debe ejecutar, probar y adaptar con la versión exacta de Supabase disponible al implementar. Los marcadores `[REQUIRED]` son bloqueadores intencionales, no contenido faltante que pueda inventarse.

## Inventario final

El ZIP final contiene **166 archivos**:

- 47 especificaciones numeradas en `/docs`.
- 12 migraciones SQL y 2 suites pgTAP de referencia.
- 4 workflows de GitHub Actions, más Dependabot, CODEOWNERS y plantillas.
- 9 borradores/políticas legales.
- 5 checklists de ejecución y lanzamiento.
- 5 archivos de planificación y 3 de QA.
- 7 runbooks/plantillas operativas.
- 6 scripts de bootstrap y validación.
- 8 diagramas Mermaid.
- 5 catálogos iniciales de copy por idioma.
- Contrato OpenAPI, configuraciones, plantillas de código, hashes e índice completo.
