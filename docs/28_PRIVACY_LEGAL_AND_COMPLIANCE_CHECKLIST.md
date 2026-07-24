# Privacidad, legal y cumplimiento — requisitos de revisión profesional

> Este documento es una lista de producto/ingeniería, no asesoría jurídica. El propietario confirmó los datos públicos mínimos del operador el 23 de julio de 2026. La publicación actual se limita al sitio informativo, cuentas protegidas y ejercicio de derechos de privacidad. Un abogado competente debe revisar los documentos y flujos antes de vender servicios o aceptar documentos/datos sensibles.

## Datos confirmados para el lanzamiento limitado de cuentas

- nombre legal: `Vwayaj ayisyen`;
- tipo y país: `Ltda.`, Brasil;
- domicilio público: São Paulo, Brasil;
- ley: Brasil y cualquier norma imperativa aplicable;
- foro: São Paulo, sin excluir el foro obligatorio del consumidor;
- idiomas jurídicos oficiales: portugués y español;
- contactos públicos: `support@vwayajayisyen.com`, `legal@vwayajayisyen.com` y `promo@vwayajayisyen.com`;
- alcance actual: información, herramientas de preparación, cuentas y centro de privacidad; no asesoría profesional ni garantía de resultados;
- Términos, Privacidad y Cookies publicados con fecha y versión;
- Términos y aviso de Privacidad presentados en controles separados, no premarcados, con evidencia firmada por versión, idioma y fecha;
- confirmación separada de 18+/capacidad en el alta, con fecha y mecanismo firmados;
- versiones activas de Términos/Privacidad controladas por una tabla privada que el hook de Auth valida de forma fail-closed;
- solicitudes de derechos autenticadas, limitadas, con evento durable y cola administrativa protegida por MFA;
- cierre de solicitudes sólo mediante RPC AAL2, con verificación, resumen, auditoría y evento outbox;
- pagos, documentos, citas, comunidad, IA y video desactivados.

## Bloqueos del lanzamiento comercial o de funciones de alto riesgo

Antes de activar la función afectada, completar y revisar:

- CNPJ/identificador fiscal y domicilio registral completo para facturación y comercio;
- países desde los que se venderá;
- profesionales autorizados, contratos, licencias y jurisdicciones si se ofrece un servicio profesional;
- impuestos/facturación;
- política de precios/reembolsos;
- WhatsApp, Stripe, email, IA, video y otros encargados;
- base jurídica/consentimientos;
- plazos de retención;
- validación jurídica de plazos, excepciones y procedimiento final de solicitudes de privacidad;
- transferencia internacional de datos;
- procedimiento para menores;
- seguro/responsabilidad profesional cuando aplique.

Estos pendientes no autorizan a activar pagos, documentos sensibles ni servicios profesionales. Las banderas de esas funciones deben seguir cerradas.

## Mensajes que deben evitarse

- “visa garantizada”;
- “entrada segura”;
- “trabajo garantizado”;
- “aprobación asegurada”;
- “somos abogados” sin autorización;
- “somos socios de una autoridad” sin relación formal;
- porcentajes de éxito sin metodología/verificación;
- urgencia artificial;
- testimonios que impliquen resultado típico;
- ocultar costos de terceros.

## Consentimientos separados

- términos del servicio;
- privacidad;
- comunicaciones operativas;
- marketing opcional;
- WhatsApp/canal externo;
- documentos sensibles;
- grabación, si alguna vez se activa;
- compartir con profesional externo;
- uso de testimonio;
- cookies/analítica cuando corresponda;
- IA y proveedor externo, si persiste conversación.

No agrupar marketing obligatorio con la prestación principal.

## Minimización

- Solicitar documentos sólo cuando una tarea concreta lo requiere.
- No pedir datos “por si acaso”.
- Evitar fecha de nacimiento exacta en preevaluación.
- Evitar categoría migratoria detallada en analytics.
- No conservar mensajes de WhatsApp dentro del CRM sin consentimiento/razón.
- No usar documentos para entrenamiento.
- Separar identidad, expediente, comunidad y analítica.
- Campos opcionales verdaderamente opcionales.

## Derechos/solicitudes

Panel/proceso para:

- acceso;
- corrección;
- eliminación;
- portabilidad;
- restricción/oposición;
- retirar marketing;
- cerrar cuenta;
- información sobre terceros.

Verificar identidad de forma proporcional sin solicitar más documentos de los necesarios. Registrar solicitud, plazo, respuesta y excepción legal.

## Menores

La plataforma no debe permitir que menores contraten o carguen documentos por sí solos en la primera versión. Datos de hijos se gestionan por representante legal, sólo cuando el servicio lo requiere, con protección reforzada. Definir edad y reglas según jurisdicción.

## Profesionales y proveedores

- DPA/contrato.
- Confidencialidad.
- mínimo acceso.
- subencargados.
- localización/transferencia.
- notificación de incidentes.
- eliminación al terminar.
- auditoría.
- licencias profesionales verificadas.
- no reutilización comercial de leads.

## Contenido migratorio

- Fuentes oficiales enlazadas.
- Fecha de revisión/efectividad.
- Jurisdicción y alcance.
- Distinción entre información, experiencia y opinión.
- Advertencia de cambios.
- Derivación a autoridad/profesional.
- Procedimiento urgente para cambios regulatorios.
- Correcciones públicas.

## E-commerce

- precio total y moneda;
- alcance/no incluido;
- impuestos;
- política de cancelación/reembolso;
- entrega/plazos;
- identidad del vendedor;
- soporte;
- comprobante;
- aceptación versionada;
- chargebacks;
- consumidor local.

## Estado de los documentos legales

Términos, Privacidad y Cookies se publican en `/legal` en español y portugués, con versiones inmutables. Reembolsos, IA, Comunidad y Editorial continúan como estados informativos sin texto contractual y no deben presentarse como políticas vigentes hasta su revisión.

## Registro de decisiones

Conservar:

- versión aceptada de términos/política;
- timestamp;
- user ID;
- locale;
- hash/version;
- IP truncada o evidencia proporcional;
- consentimientos revocados;
- base de retención.

## Revisión continua

- revisión anual y por cambio material;
- inventario de datos;
- mapa de flujos;
- proveedores;
- DPIA/impact assessment para documentos/IA;
- entrenamiento del personal;
- tabla de retención;
- simulacro de solicitud y borrado.
