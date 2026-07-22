# Decisiones externas y bloqueadores de lanzamiento

El código puede quedar terminado sin inventar proveedores, datos legales o credenciales. Cada función de alto riesgo permanece desactivada hasta cumplir sus requisitos.

## Decisiones obligatorias

| Área | Decisión/evidencia necesaria | Estado inicial | Efecto |
|---|---|---|---|
| Marca | nombre comercial, logo, dominio, colores definitivos | pendiente | usar identidad provisional no registrable |
| Entidad legal | razón social, país, dirección, registro, contacto | pendiente | bloquea venta y textos contractuales finales |
| Alcance profesional | qué orientación puede prestar la entidad y cuándo interviene abogado/profesional autorizado | pendiente | bloquea promesas y flujos de alto impacto |
| Privacidad | bases, retención, transferencias, DPA y canal DSR | pendiente | bloquea formularios sensibles/documentos |
| WhatsApp | número E.164, propietario, horario, plantillas y privacidad | pendiente | `feature_whatsapp=false` |
| Stripe | cuenta, país, moneda, productos, precios, impuestos, reembolsos | pendiente | `feature_payments=false` |
| Email | proveedor, dominio verificado, SPF/DKIM/DMARC y remitente | pendiente | sólo notificaciones en app |
| Malware | escáner privado, DPA, región, timeout y respuesta | pendiente | `feature_document_uploads=false` |
| Video | proveedor/URL segura, política de grabación y DPA | pendiente | `feature_appointments=false` o enlace manual restringido |
| IA | proveedor, DPA, modelos, evaluación, presupuesto y retención | pendiente | `feature_ai_assistant=false` |
| Moderación | responsables, horario, apelación, SLAs y formación | pendiente | `feature_community=false` |
| Analítica | herramienta, consentimiento, exclusiones y retención | pendiente | sólo métricas técnicas mínimas |
| Observabilidad | proveedor, scrub de PII, alertas y retención | pendiente | bloquea go-live operativo completo |
| Soporte | correo, horario, idiomas, escalamiento y emergencias | pendiente | debe publicarse antes del lanzamiento |

## Lo que sí puede lanzarse primero

Una versión informativa pública puede salir cuando se cumplan todos estos puntos:

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
