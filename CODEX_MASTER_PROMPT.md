# Prompt maestro para Codex

Actúa como arquitecto principal, ingeniero full-stack senior, ingeniero de seguridad, diseñador de producto accesible, especialista en Supabase/Postgres y responsable de DevOps. Debes construir desde cero una aplicación web de producción, no una demo visual.

## 1. Resultado esperado

Construye y despliega una plataforma digital completa, segura, multilingüe y accesible dirigida exclusivamente a la comunidad haitiana. Ayudará a personas que desean viajar, estudiar, trabajar, vivir o establecerse legalmente en Estados Unidos, Chile, Brasil o México.

La aplicación debe combinar:

- Información oficial con fuentes y fecha de revisión.
- Consejos prácticos.
- Experiencias de la comunidad claramente etiquetadas.
- Advertencias sobre riesgos y estafas.
- Comparador de países.
- Cuestionario determinista que sugiera países explicando el resultado.
- Paquetes pagados de acompañamiento.
- Formularios de evaluación.
- Botones dinámicos de WhatsApp.
- Registro, autenticación y área privada.
- Expedientes, tareas, estados, notas, mensajes y documentos.
- Stripe Checkout.
- Agenda y acceso a videollamadas.
- CRM.
- Cursos gratuitos.
- Comunidad privada moderada.
- Asistente de IA con recuperación desde contenido aprobado.
- PWA instalable.
- Paneles de usuario, asesor, profesional externo, editor, moderador y administrador.

No prometas ni comuniques visas, residencia, entrada, trabajo o resultados garantizados.

## 2. Infraestructura que debes crear

Usa las sesiones existentes del navegador cuando estén disponibles.

### GitHub

- Propietario: `aumdevs`
- Repositorio público con licencia propietaria de Aum Prodz: `vwayaj-ayisyen`; conservar auditoría de secretos y controles de seguridad activos.
- Rama principal: `main`
- Activa las protecciones disponibles: PR obligatorio, checks, bloqueo de force-push, eliminación de rama tras merge, Dependabot, CodeQL, detección de secretos y reglas de revisión.
- No introduzcas secretos en Git, commits, issues, PR, Actions logs o artefactos.

### Supabase

- Organización/grupo: `aumprodz Group`
- Nombre del proyecto: **Vwayaj Ayisyen** (`vwayaj-ayisyen` como slug técnico)
- Prefiere una región de Sudamérica disponible, documentando la región elegida. No cambies de región después de almacenar datos reales sin un plan de migración.
- Usa migraciones versionadas dentro del repositorio. No hagas cambios irreproducibles sólo desde el Dashboard.
- Activa RLS en toda tabla expuesta.
- Configura Auth, Storage, Edge Functions, Cron y los controles de producción disponibles.
- Genera tipos TypeScript desde el esquema.
- Usa un proyecto de staging separado si el plan y permisos lo permiten; de lo contrario, mantén entorno local reproducible y evita ejecutar datos destructivos en producción.

### Vercel

- Equipo: `aum prodz Group`
- Proyecto: `vwayaj-ayisyen`
- Importa el repositorio de GitHub.
- Configura Preview y Production.
- Variables separadas por entorno.
- Activa Firewall, BotID, Attack Mode, protección de logs y demás controles disponibles y apropiados.
- El despliegue de producción debe salir únicamente de `main` después de pasar CI.

### Stripe

- Implementa Stripe Checkout alojado.
- Usa modo test hasta disponer de claves y productos definitivos.
- Nunca confíes en importes recibidos del cliente.
- El webhook verificado es la fuente de verdad del pago.
- Si no existe una cuenta Stripe accesible, termina el código y las pruebas en sandbox, deja feature flag desactivada y documenta el paso manual exacto.

## 3. Stack

Al momento de ejecutar:

- Usa la última versión estable y compatible de Next.js App Router.
- Usa Node.js 24 LTS o una LTS más reciente que esté oficialmente soportada.
- Usa pnpm y fija la versión con `packageManager`.
- TypeScript estricto.
- Tailwind CSS.
- Componentes accesibles basados en Radix/shadcn cuando sea útil.
- Zod para validación compartida.
- React Hook Form para formularios complejos.
- Supabase `@supabase/ssr` para sesiones en cookies.
- Postgres como fuente de verdad.
- `server-only` para todo módulo privilegiado.
- Markdown sanitizado y componentes estructurados para contenido editorial; no HTML libre.
- Playwright para E2E y Vitest para unitarias/integración.
- PWA sin cachear páginas privadas, tokens ni respuestas sensibles.

No fijes dependencias vulnerables o obsoletas sólo porque aparecen en este documento. Verifica compatibilidad, fija versiones exactas en el lockfile y explica cambios sustanciales.

## 4. Nombre y marca

El nombre comercial oficial es **Vwayaj Ayisyen**.

- El slug técnico es `vwayaj-ayisyen`.
- Presenta **Vwayaj Ayisyen** como marca pública.
- Implementa `site_settings` editable desde administración: nombre, logotipo, colores, correo, WhatsApp, entidad legal, dominio y redes.
- Usa la identidad oficial **Vwayaj Ayisyen**.
- No menciones ni reutilices nombres, logos, textos, bases de datos o diseños de proyectos anteriores.

## 5. Idiomas

- Predeterminado: `ht` — kreyòl haitiano.
- Adicionales: `fr`, `es`, `pt`, `en`.
- Rutas con locale.
- Selector de idioma grande y comprensible.
- Términos oficiales conservan su nombre original y se explican en kreyòl.
- Kreyòl es obligatorio antes de publicar contenido público de alto impacto.
- Registra estado de traducción y revisor.
- No publiques traducciones automáticas sin revisión humana.

## 6. UX y accesibilidad

La interfaz debe ser sencilla para adultos mayores y personas con baja alfabetización digital, pero verse como un producto premium.

Requisitos:

- Objetivo WCAG 2.2 AA.
- Tipografía corporal de al menos 18 px en contenido principal.
- Targets táctiles de al menos 44 × 44 px; preferir 48 × 48.
- Contraste verificado.
- Navegación por teclado y foco visible.
- Etiquetas, ayuda y errores asociados a campos.
- Párrafos cortos, lenguaje claro, resúmenes y pasos numerados.
- Sin autoplay.
- Videos con subtítulos y transcripción.
- Botón WhatsApp persistente sin bloquear contenido.
- Modo de bajo consumo de datos.
- Opción “escuchar” mediante SpeechSynthesis como mejora progresiva, nunca como único acceso.
- No depender sólo de colores, banderas o iconos.
- Prueba con viewport móvil pequeño y conexión lenta.

## 7. Arquitectura de rutas

Implementa las rutas descritas en `docs/03_INFORMATION_ARCHITECTURE_AND_ROUTES.md`.

Separa claramente:

- Público
- Autenticación
- Portal de usuario
- Portal de asesor
- Portal de profesional externo
- Panel editorial/moderación
- Administración
- Route Handlers y webhooks

No protejas sólo la interfaz: cada lectura y escritura debe verificar permisos en DAL, servidor y RLS.

## 8. Modelo de datos

Usa las migraciones de `/supabase/migrations` como punto de partida, no como sustituto de validación.

Debes:

- Revisar y ejecutar localmente todas las migraciones.
- Corregir cualquier incompatibilidad con la versión actual de Supabase.
- Mantener IDs UUID.
- Usar UTC en base de datos.
- Añadir índices para FKs, filtros, estados, fechas y búsqueda.
- Usar soft-delete sólo donde haga falta y retención definida para documentos.
- Evitar duplicar datos sensibles.
- Implementar auditoría append-only.
- Implementar funciones de autorización sin recursión RLS.
- Crear pruebas SQL para políticas.
- Generar tipos TypeScript.

## 9. Autenticación y permisos

### Usuarios

- Email + contraseña.
- Verificación de correo.
- Recuperación segura.
- CAPTCHA/BotID y rate limiting.
- Contraseña mínima fuerte según la configuración disponible.
- Protección contra contraseñas filtradas cuando el plan lo permita.
- MFA opcional para usuarios normales.

### Personal privilegiado

Roles:

- `user`
- `advisor`
- `professional`
- `content_editor`
- `moderator`
- `admin`
- `super_admin`

Para cualquier rol privilegiado:

- Invitación sólo por administrador.
- MFA TOTP obligatorio.
- Exigir `aal2` para expedientes, documentos, CRM, pagos, roles, publicación, exportaciones y auditoría.
- Reautenticación para cambio de email, contraseña, MFA, rol, descarga masiva, eliminación o exportación.
- Sesiones más cortas y revocación administrativa.
- No confiar en `user_metadata`.
- El rol se determina del lado servidor y con RLS.

### Administrador inicial

Email: `admin@aumprodz.com`

La contraseña temporal se entrega en un archivo separado. Crea el usuario mediante script de bootstrap de una sola ejecución, sin imprimir la contraseña.

Después:

1. Marcar `force_password_change = true`.
2. Confirmar el email sólo durante bootstrap.
3. Asignar `super_admin` y `admin`.
4. En el primer acceso, obligar a cambiar contraseña.
5. Después, obligar a enrolar TOTP.
6. No permitir acceso al panel hasta alcanzar `aal2`.
7. Eliminar variables de bootstrap y rotar cualquier secreto temporal.

## 10. Seguridad de aplicación

Trata `docs/13_SECURITY_THREAT_MODEL.md` y `checklists/SECURITY_CHECKLIST.md` como requisitos de aceptación.

Mínimo:

- Objetivo OWASP ASVS nivel 2, con controles reforzados para documentos y administración.
- Protección frente a Broken Access Control, IDOR, inyección, XSS, CSRF, SSRF, subida maliciosa, spam, scraping, abuso de IA, suplantación de webhooks y filtración de secretos.
- CSP estricta. Usa nonce para superficies privadas sensibles; evalúa SRI/hash CSP para páginas públicas estáticas.
- HSTS, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, Referrer-Policy y Permissions-Policy.
- No `unsafe-eval` en producción.
- Validación Zod en servidor.
- DAL `server-only` con DTO mínimos.
- Rate limiting por IP, usuario, ruta y riesgo.
- BotID/CAPTCHA en signup, login, recuperación, formulario público, checkout, IA y publicaciones.
- Logs estructurados sin PII sensible.
- Alertas para intentos de elevación de privilegios, descargas anómalas, fallos repetidos, webhooks inválidos y cambios de rol.
- Dependabot, CodeQL, Gitleaks/secret scan y auditoría de paquetes.
- Backups y simulación de restauración.
- Plan de incidente y rotación de claves.

## 11. Documentos sensibles

Buckets:

- `case-documents-quarantine`
- `case-documents-clean`
- `course-assets`
- `content-media`
- `avatars`

Reglas:

- Buckets de expedientes privados.
- Subidas únicamente con ruta UUID no predecible.
- No usar el nombre original como ruta.
- Máximo inicial: 10 MB por archivo.
- Tipos iniciales: PDF, JPEG, PNG y WebP.
- Verificar extensión, MIME y magic bytes.
- Rechazar SVG, HTML, scripts, ejecutables, archivos comprimidos y formatos de oficina hasta contar con sanitización adecuada.
- Cuarentena primero.
- No permitir al personal descargar hasta que el estado sea `clean`.
- Integrar un proveedor de análisis antimalware privado o un servicio ClamAV aislado. No usar VirusTotal para pasaportes o documentos personales.
- Si el escáner no está configurado, la función de carga debe permanecer desactivada en producción.
- URLs firmadas de duración corta.
- Forzar descarga; no renderizar documentos arbitrarios inline.
- Registrar cada acceso y descarga.
- Retención configurable y eliminación automática.
- Consentimiento explícito antes de subir.

## 12. Contenido

Las páginas de país tendrán una estructura uniforme:

1. Resumen.
2. Para quién puede ser adecuado.
3. Para quién puede no serlo.
4. Vías legales de entrada.
5. Realidad de la comunidad haitiana.
6. Trabajo y salarios.
7. Costo de vida.
8. Bancos y dinero.
9. Vivienda.
10. Estudios.
11. Salud.
12. Primeros 30 días.
13. Estafas y riesgos.
14. Paquetes.
15. Fuentes y fecha de revisión.

Cada bloque debe etiquetarse como:

- Información oficial.
- Consejo práctico.
- Experiencia de la comunidad.
- Advertencia.

No publiques datos legales sin fuente, revisión y fecha. Si falta contenido real, muestra estado “en preparación”; no rellenes con invenciones.

## 13. Comparador y cuestionario

- El comparador usa criterios editables, puntuación 1–5, explicación, fuente y fecha.
- El cuestionario usa reglas deterministas y pesos visibles para administradores.
- No usar IA para decidir el país.
- No usar raza, religión, discapacidad o información sensible para puntuar.
- La edad sólo sirve para detectar menores, adaptar mensajes o requisitos revisados; no para discriminar.
- El resultado debe mostrar razones, ventajas, dificultades, incertidumbre y próxima acción.
- Debe decir “podría adaptarse mejor”, nunca “es definitivamente el mejor”.
- Permitir uso anónimo y guardar sólo con consentimiento.

## 14. Paquetes, Stripe y órdenes

Tres niveles iniciales por país:

- Orientación inicial.
- Preparación completa.
- Instalación y adaptación.

Los precios empiezan desactivados hasta que el administrador configure importes y Stripe Price IDs.

Flujo:

1. Cliente elige paquete.
2. Servidor lee precio y disponibilidad desde DB.
3. Crea orden pendiente e idempotency key.
4. Crea Stripe Checkout Session.
5. Redirige a Stripe.
6. Webhook verificado actualiza orden/pago.
7. Redirect de éxito sólo muestra estado consultado al servidor.
8. Compra pagada puede crear expediente y tareas iniciales.
9. Reembolsos y disputas quedan auditados.

## 15. WhatsApp

- Número configurado en `site_settings` o variable pública no secreta.
- Plantillas por país, paquete, página e idioma.
- Construye `wa.me` con texto codificado.
- No introduzcas PII del usuario en el mensaje automático sin consentimiento.
- Registra sólo evento de clic, país, paquete y página; no el contenido del mensaje.
- Si no hay número, muestra formulario/contacto sin enlace roto.

## 16. CRM y expedientes

Implementa:

- Contactos y leads.
- Asignación de asesor.
- Etiquetas.
- Tareas.
- Notas internas.
- Actividad.
- Formularios de evaluación.
- Expedientes.
- Participantes.
- Estados e historial.
- Checklist.
- Mensajes.
- Documentos.
- Accesos temporales para profesionales externos.
- Auditoría.
- Exportación limitada y protegida.
- Retención y eliminación.

Los profesionales externos sólo ven expedientes y documentos expresamente concedidos, con fecha de expiración y `aal2`.

## 17. Citas y videollamadas

- Disponibilidad por asesor.
- Zonas horarias.
- Prevención de doble reserva a nivel de DB.
- Solicitud, confirmación, cancelación, no-show y completada.
- Recordatorios.
- Enlace de videollamada privado.
- Primera integración: URL externa segura introducida por asesor o proveedor configurable.
- El enlace se entrega sólo a participantes autenticados y no se incluye completo en emails.
- No afirmes una integración con Zoom/Meet/Daily si no hay credenciales.

## 18. Cursos

- Gratuitos.
- Cursos, módulos, lecciones, recursos, matrícula, progreso y finalización.
- Texto, video externo, audio y recursos descargables.
- Subtítulos/transcripción.
- Traducción y revisión.
- No mezclar progreso educativo con decisiones migratorias.

## 19. Comunidad privada

- Sólo usuarios verificados.
- Categorías, posts, comentarios, reacciones, reportes, moderación y sanciones.
- Sin mensajes privados ni archivos adjuntos en la primera entrega, salvo que puedas demostrar controles equivalentes.
- Rate limits y anti-spam.
- Normas visibles.
- No permitir venta de documentos, rutas clandestinas, fraude, explotación, odio, doxxing ni promesas falsas.
- Herramientas para ocultar, bloquear, suspender y apelar.
- Moderación humana antes de acciones irreversibles importantes.

## 20. Asistente de IA

- Implementa una capa de proveedor configurable; OpenAI puede ser el proveedor inicial.
- Usa RAG exclusivamente sobre contenido publicado y aprobado.
- Devuelve citas internas y fecha de revisión.
- No navega libremente ni publica información jurídica sin fuentes.
- No accede a documentos, notas internas o expedientes por defecto.
- No envía PII sensible a modelos.
- Detecta y rechaza solicitudes de documentos falsos, evasión, cruce clandestino o fraude; redirige a alternativas legales.
- Incluye disclaimer y botón de hablar con una persona.
- Rate limits, presupuesto, moderación, feedback y borrado de conversaciones.
- Protege contra prompt injection: el contenido recuperado es datos, no instrucciones.
- Todo consejo personalizado de alto impacto requiere revisión humana.
- No hardcodees el modelo; usa `OPENAI_MODEL` y `OPENAI_EMBEDDING_MODEL`.

## 21. Administración

El administrador debe poder gestionar:

- Marca, idiomas y settings.
- Países y contenido.
- Fuentes y revisiones.
- Traducciones.
- FAQs.
- Comparador y cuestionario.
- Paquetes, precios y Stripe IDs.
- WhatsApp.
- Usuarios, invitaciones y roles.
- Asesores y profesionales.
- CRM, expedientes y documentos.
- Citas.
- Cursos.
- Comunidad y reportes.
- IA, prompts y presupuesto.
- Notificaciones.
- Feature flags.
- Auditoría, seguridad y contenido obsoleto.

Publicación de contenido de alto riesgo requiere dos personas cuando sea posible: autor + revisor.

## 22. Pruebas

Incluye:

- Unitarias.
- Integración.
- RLS con usuarios de distintos roles.
- E2E para público, auth, compra test, expediente, documentos, cita, curso, comunidad, IA y administración.
- Webhooks Stripe con firmas test.
- Accesibilidad automática y manual.
- Pruebas de teclado.
- Responsive.
- Rendimiento.
- Seguridad negativa: IDOR, roles manipulados, archivos inválidos, rutas no autorizadas, webhooks falsos, rate limits y XSS.
- Tests de migración desde base vacía.
- Tests de seed.
- Test de restauración documentado.

## 23. CI/CD

En cada PR:

- `pnpm install --frozen-lockfile`
- format check
- lint
- typecheck
- unit/integration
- Supabase start/reset y pruebas SQL
- build
- E2E relevante
- dependency audit
- secret scan
- CodeQL

Producción:

- Sólo `main`.
- Migración con backup/rollback.
- Smoke tests.
- No desplegar si faltan variables críticas.
- Preview no debe usar datos reales de producción.
- Protección de deployments preview cuando expongan paneles.

## 24. Aprovisionamiento, releases y operación

- Sigue `docs/43_BROWSER_ACCOUNT_PROVISIONING_GUARDRAILS.md` al usar sesiones abiertas.
- No extraigas secretos del navegador ni modifiques recursos ajenos.
- Trata `docs/44_EXTERNAL_SERVICE_DECISIONS_AND_LAUNCH_BLOCKERS.md` como matriz de gates.
- Sigue `docs/46_RELEASE_AND_DATABASE_MIGRATION_STRATEGY.md` para cambios de esquema.
- Aplica `docs/47_COST_AND_CAPACITY_GUARDRAILS.md` antes de habilitar proveedores.
- Completa `docs/45_POST_DEPLOYMENT_SECURITY_HARDENING.md` antes de manejar datos sensibles.

## 25. Entrega final de Codex

No concluyas hasta entregar:

- URL del repositorio.
- URL de Vercel Preview y Production.
- Referencia del proyecto Supabase.
- Región y planes usados.
- Estado de Stripe.
- Lista de variables configuradas y faltantes, sin valores secretos.
- Usuario admin creado, sin imprimir contraseña.
- Confirmación de cambio obligatorio y MFA.
- Resultados de pruebas.
- Resultado de auditoría de seguridad.
- Funciones activas y feature flags desactivadas.
- Limitaciones honestas.
- Pasos manuales exactos pendientes.
- Plan de mantenimiento y actualización de contenido.

## 26. Orden de ejecución

1. Lee la documentación.
2. Crea repo privado e infraestructura.
3. Inicializa Next.js y Supabase local.
4. Implementa esquema y RLS con tests.
5. Implementa Auth + roles + MFA.
6. Implementa shell, diseño, i18n y accesibilidad.
7. Implementa contenido público.
8. Comparador y cuestionario.
9. Servicios, WhatsApp y formularios.
10. Stripe.
11. CRM y expedientes.
12. Documentos con cuarentena.
13. Citas.
14. Cursos.
15. Comunidad.
16. IA.
17. PWA, SEO y rendimiento.
18. Paneles.
19. Pruebas, revisión de seguridad y despliegue.
20. Informe final.

Ante una incompatibilidad entre documentos, gana la opción más segura y el requisito más específico. Registra la decisión en `docs/DECISIONS_IMPLEMENTED.md`.
