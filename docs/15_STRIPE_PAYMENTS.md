# Stripe, pedidos, pagos y reembolsos

## Objetivo

Cobrar paquetes de acompañamiento sin almacenar ni procesar datos de tarjeta dentro de la aplicación. La integración inicial usa Stripe Checkout alojado y mantiene Postgres como registro operativo, mientras Stripe conserva la autoridad sobre el estado financiero.

## Principios obligatorios

1. El navegador nunca decide el precio, moneda, descuento, impuestos ni identidad del producto.
2. El servidor consulta un `package_price` activo y crea una orden interna antes de iniciar Checkout.
3. Toda operación mutante usa idempotencia.
4. El webhook con firma válida es la fuente de verdad del pago.
5. Nunca se marca una orden como pagada por el `success_url`.
6. Los eventos se guardan por `stripe_event_id` y se procesan exactamente una vez.
7. No guardar PAN, CVC, datos de banda, ni respuestas completas innecesarias.
8. El portal no expone claves, `client_secret` ni metadatos privados.
9. Reembolsos y anulaciones requieren rol autorizado, MFA `aal2`, motivo y auditoría.
10. La función permanece desactivada hasta configurar secretos, productos, webhooks y pruebas de extremo a extremo.

## Flujo de compra

1. Usuario autenticado elige país y paquete.
2. Servidor verifica:
   - paquete publicado y precio activo;
   - moneda admitida;
   - usuario no bloqueado;
   - aceptación de términos y política de reembolso;
   - rate limit y evaluación antifraude básica.
3. Crear `orders` con estado `pending`.
4. Crear sesión de Checkout usando exclusivamente el `stripe_price_id` almacenado.
5. Incluir únicamente IDs internos opacos en metadata.
6. Redirigir a Stripe.
7. Stripe llama al webhook.
8. Verificar firma contra el **cuerpo crudo**.
9. Insertar evento en `payment_webhook_events`; si ya existe, responder 200 sin repetir efectos.
10. Actualizar pago/orden mediante transición válida.
11. Crear caso o derecho de servicio sólo tras evento confirmado.
12. Enviar notificación sin información financiera sensible.

## Estados internos

### Orden

`draft → pending → paid → fulfilled`

Alternativas: `expired`, `cancelled`, `partially_refunded`, `refunded`, `disputed`.

### Pago

`requires_action`, `processing`, `succeeded`, `failed`, `cancelled`, `partially_refunded`, `refunded`, `disputed`.

No permitir transiciones arbitrarias desde el cliente.

## Eventos mínimos

- `checkout.session.completed`
- `checkout.session.expired`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `charge.dispute.created`
- `charge.dispute.closed`

Codex debe validar la lista contra la versión de API seleccionada y fijar explícitamente esa versión.

## Seguridad del webhook

- Ruta dedicada sin parsing previo que altere el body.
- `Stripe-Signature` obligatorio.
- Límite de tamaño.
- Tolerancia temporal estándar de Stripe.
- Secretos distintos para test y producción.
- Respuesta rápida; trabajo pesado a una cola/outbox.
- No registrar el cuerpo completo.
- Alertar firmas inválidas repetidas.
- Nunca permitir que un evento cambie una orden que no corresponde con sus IDs internos.
- Reconciliación diaria entre órdenes internas y Stripe.

## Checkout y precios

- Un paquete puede tener múltiples precios por país, moneda o modalidad.
- Precio en DB referencia un objeto Price real de Stripe.
- Los administradores no escriben valores libres para cobro sin crear/sincronizar el Price.
- Descuentos sólo mediante promociones explícitamente habilitadas.
- No habilitar suscripciones en la primera implementación salvo decisión de negocio documentada.
- Mostrar claramente impuestos, moneda, alcance y política de reembolso antes de salir a Checkout.

## Reembolsos

- Flujo con doble confirmación.
- Exigir `admin` o permiso financiero específico y `aal2`.
- Registrar importe, moneda, motivo, actor, orden, respuesta normalizada y fecha.
- Si Stripe acepta el reembolso, el webhook confirma el estado final.
- Nunca eliminar el registro de la orden.
- Aplicar la política vigente aceptada por el usuario y conservar su versión.

## Pruebas de aceptación

- Importe manipulado en cliente no altera el cobro.
- Webhook sin firma o con body modificado es rechazado.
- Evento duplicado no duplica caso, derecho ni notificación.
- `success_url` sin webhook no marca pago.
- Reembolso requiere MFA y queda auditado.
- Entornos test/producción no comparten claves, productos ni webhooks.
- Ningún log contiene secretos o información de tarjeta.
- Disputa suspende la activación automática según regla de negocio.
