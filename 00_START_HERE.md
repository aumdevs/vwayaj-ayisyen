# Empieza aquí — paquete de entrega para Codex

**Proyecto técnico provisional:** `haitian-legal-travel-platform`  
**Fecha del documento:** 2026-07-21  
**Propietario previsto del repositorio:** `aumdevs`  
**Grupo de Supabase:** `aumprodz Group`  
**Equipo de Vercel:** `aum prodz Group`

Este paquete contiene la especificación completa para construir desde cero una plataforma digital dirigida exclusivamente a la comunidad haitiana que desea informarse, prepararse y recibir acompañamiento legal y práctico para Estados Unidos, Chile, Brasil y México.

## Qué debe hacer Codex

1. Leer primero `CODEX_MASTER_PROMPT.md`.
2. Leer `AGENTS.md` y todos los documentos de `/docs`.
3. Crear un repositorio **privado** llamado `haitian-legal-travel-platform` bajo `aumdevs`.
4. Crear el proyecto de Supabase dentro de `aumprodz Group`.
5. Crear/importar el proyecto en Vercel dentro de `aum prodz Group`.
6. Construir, probar, securizar, desplegar y documentar la aplicación.
7. No inventar información migratoria, precios, requisitos legales ni testimonios.
8. No copiar credenciales a GitHub, logs, capturas, issues ni documentación pública.
9. Crear el administrador usando las credenciales privadas entregadas por separado y obligar cambio de contraseña + MFA TOTP en el primer acceso.
10. Entregar un informe final con URLs, estado de pruebas, configuración pendiente y riesgos conocidos.

## Archivos más importantes

- `CODEX_MASTER_PROMPT.md`: instrucciones generales y no negociables.
- `docs/01_PRODUCT_REQUIREMENTS.md`: producto, usuarios y alcance.
- `docs/10_TECHNICAL_ARCHITECTURE.md`: arquitectura de aplicación.
- `docs/11_DATABASE_DATA_DICTIONARY.md`: modelo de datos.
- `docs/12_SUPABASE_AUTH_RLS_STORAGE.md`: autenticación, autorización y Storage.
- `docs/13_SECURITY_THREAT_MODEL.md`: controles contra ataques y abuso.
- `docs/30_ACCEPTANCE_CRITERIA.md`: criterios que deben cumplirse antes de considerar el trabajo terminado.
- `docs/43_BROWSER_ACCOUNT_PROVISIONING_GUARDRAILS.md`: límites para usar las sesiones abiertas de GitHub, Supabase y Vercel.
- `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md`: decisiones reales que no deben inventarse.
- `docs/45_POST_DEPLOYMENT_SECURITY_HARDENING.md`: endurecimiento antes de manejar datos sensibles.
- `supabase/migrations/`: migraciones de referencia.
- `planning/BACKLOG.csv`: tareas ordenadas por dependencia.
- `legal/`: borradores que requieren revisión jurídica antes de publicar.
- `checklists/`: listas de verificación de infraestructura, seguridad y lanzamiento.

## Advertencias importantes

- El nombre público de la marca todavía no está definido. El slug técnico no debe mostrarse como marca final.
- El número de WhatsApp, dominio, entidad legal, dirección, correo de soporte, claves de Stripe, proveedor de correo y proveedor de IA no están incluidos.
- Las funciones que dependan de secretos faltantes deben quedar terminadas, probadas con mocks o modo de prueba, y protegidas por feature flags.
- La carga de documentos sensibles no debe habilitarse en producción hasta configurar validación de firma de archivo, cuarentena, análisis antimalware privado y políticas de retención.
- Todo contenido migratorio de alto impacto debe permanecer en borrador hasta ser revisado por una persona competente.

## Forma recomendada de entrega

Entregar a Codex el ZIP completo. Como alternativa, `CODEX_ALL_IN_ONE.md` reúne la documentación narrativa, pero las migraciones, esquemas, CSV, plantillas y workflows del ZIP siguen siendo la fuente ejecutable.
