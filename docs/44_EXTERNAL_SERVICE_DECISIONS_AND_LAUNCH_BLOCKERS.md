# Decisiones externas y bloqueadores de lanzamiento

El código puede quedar terminado sin inventar proveedores, datos legales o credenciales. Cada función de alto riesgo permanece desactivada hasta cumplir sus requisitos.

## Decisiones obligatorias

| Área | Decisión/evidencia necesaria | Estado actual | Efecto |
|---|---|---|---|
| Marca | nombre comercial | aprobado | **Vwayaj Ayisyen** es el nombre oficial y `https://vwayajayisyen.com` es la URL pública |
| Entidad legal | razón social, país, dirección, registro, contacto | parcial: Vwayaj ayisyen, Ltda., Brasil; domicilio público São Paulo; soporte y legal definidos; faltan CNPJ y dirección comercial completa | permite documentos informativos y Auth; bloquea venta y facturación |
| Alcance profesional | qué orientación puede prestar la entidad y cuándo interviene abogado/profesional autorizado | pendiente; el directorio público enlaza fuentes oficiales y no evalúa elegibilidad | bloquea promesas, guía migratoria detallada y flujos de alto impacto |
| Privacidad | bases, retención, transferencias, DPA y canal DSR | parcial: política ES/PT publicada, aceptación versionada y 18+/capacidad firmada, DSR autenticado, evento durable, cola y cierre administrativo AAL2 implementados; faltan calendario definitivo, contratos/DPA, validación de transferencias y revisión jurídica del procedimiento | permite cuenta mínima; bloquea formularios sensibles/documentos |
| WhatsApp | número E.164, propietario, horario, plantillas y privacidad | pendiente | `feature_whatsapp=false` |
| Stripe | cuenta, país, moneda, productos, precios, impuestos, reembolsos | Stripe elegido; CLI conectada a una cuenta de prueba, sin productos ni precios aprobados | `feature_payments=false` |
| Email y antiabuso | proveedor, dominio verificado, SPF/DKIM/DMARC, remitente, SMTP, recepción, CAPTCHA y gate de Auth | completo el 2026-07-23: Resend verificado para envío; Proton Mail recibe los tres alias oficiales; tres mensajes externos de prueba llegaron; Supabase usa SMTP, confirmación, Turnstile y hook HMAC; versiones legales exactas configuradas en Vercel | registro habilitado sólo en Production; Preview y Development permanecen cerrados |
| Malware | escáner privado, DPA, región, timeout y respuesta | pendiente | `feature_document_uploads=false` |
| Video | proveedor/URL segura, política de grabación y DPA | Zoom elegido; faltan credenciales, política de grabación y revisión de privacidad | `feature_appointments=false` o enlace manual restringido |
| IA | proveedor, DPA, modelos, evaluación, presupuesto y retención | OpenAI elegido; faltan clave del proyecto, modelo, evaluación, presupuesto y retención | `feature_ai_assistant=false` |
| Moderación | responsables, horario, apelación, SLAs y formación | pendiente | `feature_community=false` |
| Analítica | colector, DPA, base jurídica, región y retención | adaptador mínimo implementado sin IDs, query strings ni referrer; respeta DNT/GPC y permanece apagado sin `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | activación externa pendiente; la app funciona sin analítica |
| Observabilidad | proveedor, scrub de PII, alertas y retención | pendiente | bloquea go-live operativo completo |
| Soporte | correo, horario, idiomas, escalamiento y emergencias | `support@`, `legal@` y `promo@vwayajayisyen.com` activos en Proton Mail; recepción verificada; aviso de no-emergencia publicado; no se promete un horario o SLA todavía | permite cuenta mínima; servicios pagados y de alto riesgo siguen cerrados |
| Contenido piloto USA | país, locales, fuentes, revisión factual/legal/lingüística | dossier HT/EN creado con 15 secciones y 5 fuentes oficiales; sólo el directorio de fuentes está autorizado para exposición pública | bloquea publicar elegibilidad, costos, salarios, salud, servicios y recomendaciones hasta revisión humana nombrada |
| Indexación | aprobación editorial y variable de Production | canonical/hreflang, sitemap reducido, OG y datos estructurados listos; `NEXT_PUBLIC_ALLOW_INDEXING` sigue en `false` | activar sólo después de revisión legal/editorial y deploy de esta versión |

## Lo que sí puede lanzarse primero

La versión informativa y la cuenta mínima pueden publicarse con las funciones
sensibles cerradas. Pagos, documentos, IA, citas, comunidad y prestación
profesional requieren completar sus bloqueadores específicos antes de activarse.

- marca y contacto mínimos;
- textos legales revisados para el país operativo;
- contenido de cada país con fuente, fecha y revisión humana;
- kreyòl revisado;
- formularios sensibles apagados o validados;
- no se aceptan pagos ni documentos;
- comparador y cuestionario claramente orientativos;
- accesibilidad, seguridad, rendimiento y monitoreo básico aprobados;
- canal de correcciones y advertencias activo.

## Regla de activación

Para activar una función se requieren simultáneamente:

1. `DISABLE_*` explícitamente en `false` para el entorno correcto.
2. Feature flag de base de datos en `enabled=true`.
3. Todas las condiciones de `launch_requirements` verificadas.
4. Pruebas E2E y negativas aprobadas.
5. Revisión legal/privacidad cuando corresponda.
6. Entrada en auditoría con responsable, fecha y evidencia.

La ausencia de configuración produce **función no disponible**, nunca un fallback inseguro.
