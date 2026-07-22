# Guardrails para aprovisionar cuentas desde sesiones del navegador

Este documento aplica cuando Codex dispone de sesiones ya iniciadas en Safari para GitHub, Supabase y Vercel. Una sesión abierta permite realizar acciones autorizadas; **no autoriza extraer cookies, contraseñas, tokens, claves de recuperación ni otros secretos del navegador**.

## Destinos autorizados

| Servicio | Cuenta/equipo | Recurso nuevo |
|---|---|---|
| GitHub | `aumdevs` | repositorio `haitian-legal-travel-platform`; público sólo tras autorización y auditoría de secretos |
| Supabase | `aumprodz Group` | proyecto `haitian-legal-travel-platform` |
| Vercel | `aum prodz Group` | proyecto `haitian-legal-travel-platform` importado desde GitHub |

No modificar, borrar, transferir ni reutilizar recursos existentes que no hayan sido creados para este trabajo.

## Verificación antes de crear

1. Confirmar visualmente el propietario/equipo mostrado por el servicio.
2. Buscar un recurso con el mismo nombre.
3. Si existe:
   - no sobrescribirlo;
   - no importar datos ni cambiar ajustes;
   - inspeccionar sólo metadatos no sensibles suficientes para determinar si pertenece a este encargo;
   - registrar el conflicto en el informe final y detener únicamente esa operación.
4. Confirmar que GitHub quede en modo **privado** antes del primer push; cualquier cambio posterior a público exige autorización expresa, auditoría del historial y licencia definida.
5. Confirmar que Vercel y Supabase estén en el grupo indicado, no en una cuenta personal distinta.

## Acciones prohibidas

- Exportar cookies, almacenamiento local, llaveros, contraseñas o tokens del navegador.
- Desactivar MFA, alertas, protección de secretos o controles de organización.
- Guardar screenshots que muestren claves, códigos QR de MFA, tokens, credenciales o datos personales.
- Pegar secretos en GitHub Issues, PR, commits, logs, chats o documentación.
- Aceptar cambios de facturación, upgrades o compras no imprescindibles sin dejar la operación pendiente y documentada.
- Hacer público un recurso sin autorización expresa y auditoría previa.
- Usar el navegador para eludir un paso de confirmación o una política del proveedor.

## MFA, passkeys y confirmaciones

Cuando el proveedor solicite MFA, passkey, captcha, verificación de email o confirmación de pago:

- conservar la pantalla en el paso seguro;
- no intentar evadirlo;
- no leer ni registrar el secreto;
- permitir la intervención del propietario de la cuenta cuando sea necesaria;
- continuar sólo después de que el proveedor confirme la acción.

## Secuencia recomendada

1. Crear el repositorio inicialmente privado en GitHub; cambiar su visibilidad sólo después de la auditoría autorizada.
2. Subir una base mínima sin secretos y activar controles del repositorio.
3. Crear proyecto Supabase y registrar sólo su `project_ref`, región y URLs públicas.
4. Aplicar migraciones desde CLI/repo; evitar cambios manuales no versionados.
5. Configurar variables locales y de CI mediante gestores de secretos.
6. Importar el repositorio en Vercel dentro del equipo correcto.
7. Configurar variables por entorno sin mostrarlas en logs.
8. Crear Preview y ejecutar smoke tests.
9. Activar Production sólo después de los gates de seguridad.
10. Crear el administrador mediante el bootstrap de una sola ejecución.

## Evidencia permitida

El informe puede contener:

- URL del repositorio;
- nombre y visibilidad;
- proyecto/equipo de Vercel;
- URL pública y deployment ID;
- referencia y región de Supabase;
- nombres de variables configuradas, nunca valores;
- estado de branch protection, MFA, RLS, CI y feature flags;
- IDs de producto/precio de Stripe sólo cuando no sean secretos.

## Higiene al terminar

- Cerrar pestañas con secretos visibles.
- Eliminar archivos temporales de bootstrap.
- Revocar la ejecución de la función de bootstrap.
- Eliminar variables temporales de GitHub/Vercel/local.
- Revisar el historial de terminal y clipboard cuando hayan contenido secretos.
- Ejecutar secret scan antes del push final.
- No cerrar sesión ni modificar la cuenta global salvo que sea necesario para la operación solicitada.
