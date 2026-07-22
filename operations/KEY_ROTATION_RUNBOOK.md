# Rotación de claves

## Alcance

- Supabase service role;
- DB password;
- Stripe;
- email;
- IA;
- scanner;
- meeting;
- observability;
- app signing;
- CRM encryption/HMAC;
- meeting/document metadata encryption;
- cron.

## Rotación estándar

1. Abrir cambio/incidente según causa.
2. Crear nueva clave sin desactivar anterior.
3. Añadir versión `V2`.
4. Desplegar lectura V1+V2 y escritura V2.
5. Migrar/re-encriptar en lotes idempotentes.
6. Verificar conteo, tags y muestras sintéticas.
7. Revocar V1.
8. Eliminar env vieja.
9. Actualizar inventario.
10. Vigilar errores.
11. Documentar.

## Compromiso

- Contener primero.
- Revocar sesiones/tokens.
- Rotar dependencias.
- Buscar uso/historial.
- Secret scan completo.
- Evaluar datos.
- Comunicar según incidente.

## Cifrado de aplicación

- Nunca reusar IV.
- Tag GCM obligatorio.
- Key version en cada fila.
- HMAC key separada.
- Recalcular blind indexes durante rotación.
- Backup/rollback cifrado.
- No imprimir plaintext.
- Proceso resumible.
