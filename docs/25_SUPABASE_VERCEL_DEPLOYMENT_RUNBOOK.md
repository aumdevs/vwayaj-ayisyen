# Runbook de aprovisionamiento y despliegue

## 0. Precondiciones

- Sesión correcta en GitHub `aumdevs`.
- Sesión correcta en Supabase, grupo `aumprodz Group`.
- Sesión correcta en Vercel, equipo `aum prodz Group`.
- Confirmar que no se está operando en una cuenta personal equivocada.
- Dominio final, entidad legal, teléfono WhatsApp y Stripe pueden quedar como bloqueos documentados.
- No pegar secretos en el chat, commits ni capturas.

## 1. Crear repositorio

1. Verificar el repo público con licencia propietaria `aumdevs/vwayaj-ayisyen`.
2. Inicializar desde el código generado.
3. Configurar descripción técnica sin promesas comerciales.
4. Subir `main`.
5. Activar reglas, CodeQL, Dependabot, secret scanning y alertas disponibles.
6. Verificar que `.env*` sensible está ignorado.
7. Ejecutar búsqueda de secretos antes del primer push.

## 2. Desarrollo local

1. Instalar Node LTS y pnpm fijado.
2. Instalar Supabase CLI y Docker compatible.
3. `supabase init` si el scaffold no existe.
4. Levantar Supabase local.
5. Aplicar migraciones/seed.
6. Generar tipos.
7. Crear `.env.local` fuera de Git.
8. Ejecutar lint, typecheck, tests, DB tests y build.
9. Crear datos sintéticos, no reales.

## 3. Crear Supabase

1. En `aumprodz Group`, crear el proyecto **Vwayaj Ayisyen**.
2. Elegir región disponible cercana a usuarios/operación, preferiblemente São Paulo si cumple requisitos; registrar decisión.
3. Generar contraseña de DB con gestor seguro; no reutilizar.
4. Guardar `project_ref` sin tratarlo como secreto.
5. Enlazar CLI.
6. Aplicar migraciones mediante proceso controlado.
7. Configurar Auth:
   - Site URL;
   - redirects exactos de preview/producción;
   - verificación de email;
   - recuperación;
   - CAPTCHA;
   - restricciones de contraseña;
   - MFA TOTP;
   - límites;
   - plantillas multilingües.
   Mantener `enable_signup=false` tanto en `[auth]` como en `[auth.email]` mientras
   `DISABLE_PUBLIC_REGISTRATION=true`. La barrera de la aplicación es secundaria:
   el endpoint público de Supabase Auth también debe permanecer cerrado.
   En producción, permitir callbacks únicamente en `https://vwayajayisyen.com/**`.
   No aceptar wildcards del equipo Vercel ni localhost; Preview debe usar un backend aislado.
8. Crear/configurar buckets y límites.
9. Configurar SMTP propio antes del lanzamiento.
10. Activar backups/PITR según plan y criticidad.
11. Configurar logs/alertas y políticas de red disponibles.
12. Verificar RLS en todas las tablas expuestas.
13. Ejecutar pruebas remotas mínimas de RLS sin datos reales.

## 4. Crear Vercel

1. Importar repo bajo `aum prodz Group`.
2. Nombre `vwayaj-ayisyen`.
3. Framework Next.js.
4. Definir Node runtime compatible y pnpm.
5. Configurar variables por Preview/Production.
6. No usar service role en cliente ni variables `NEXT_PUBLIC_*`.
7. Activar controles de firewall/BotID/Attack Mode disponibles.
8. Configurar previews para entorno aislado.
9. Desplegar.
10. Verificar cabeceras, CSP, robots, sitemap, PWA, health checks y logs.
11. Asociar dominio sólo después de revisión.

## 5. Stripe test

1. Crear productos/precios en test.
2. Guardar IDs en DB/seed operativo, no valores secretos.
3. Añadir secret key y webhook secret sólo a entornos correspondientes.
4. Crear webhook hacia `/api/webhooks/stripe`.
5. Probar éxito, fallo, expiración, duplicado, reembolso y disputa.
6. Mantener `FEATURE_PAYMENTS=false` hasta aceptación.
7. Repetir configuración independiente en live cuando negocio/legal estén listos.

## 6. Admin inicial

Seguir `docs/34_ADMIN_BOOTSTRAP_RUNBOOK.md` y usar el archivo de credenciales separado. No guardar la contraseña en el repo ni en Vercel de forma permanente.

## 7. Integraciones opcionales

Para cada una: cuenta, DPA/términos, secretos, staging, pruebas, kill switch y runbook.

- proveedor de email;
- escáner antimalware privado;
- OpenAI/proveedor IA;
- reunión/video;
- WhatsApp API, si se usa más que enlace;
- observabilidad;
- soporte.

## 8. Go-live

- Completar `checklists/LAUNCH_CHECKLIST.md`.
- Revisión legal/editorial.
- Penetration test para documentos.
- Simular restauración.
- Activar feature flags una por una.
- Monitorear.
- Mantener rollback y canal de incidentes.

## 9. Prohibiciones

- No crear datos reales en previews.
- No compartir proyecto Supabase entre proyectos diferentes.
- No exponer service role.
- No “arreglar” RLS desactivándola.
- No ejecutar SQL destructivo sin backup/plan.
- No publicar contenido legal de relleno.
- No activar uploads sin escáner.
