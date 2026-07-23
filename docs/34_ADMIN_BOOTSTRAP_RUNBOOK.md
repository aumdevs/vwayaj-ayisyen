# Runbook del administrador inicial

## Identidad

El correo privado del propietario se proporciona temporalmente mediante
`BOOTSTRAP_ADMIN_EMAIL`; no debe documentarse ni publicarse en el repositorio.

La contraseña temporal se encuentra en un archivo separado del ZIP. Ese archivo no debe copiarse al repositorio, tickets, chats, notas compartidas ni variables permanentes.

## Precondiciones

- Supabase remoto creado y migraciones aplicadas.
- Script `scripts/bootstrap-admin.ts` revisado.
- `profiles`, `user_roles` y trigger de alta funcionando.
- Hook `private.before_user_created` activo y clave HMAC de registro disponible
  en el gestor seguro del operador.
- MFA TOTP habilitado.
- La app fuerza cambio de contraseña y MFA.
- Terminal en equipo confiable.
- Historial de shell protegido.
- `.env.bootstrap.local` fuera del repo, permisos 600.

## Ejecución

1. Crear archivo temporal fuera del repo con:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `BOOTSTRAP_ADMIN_EMAIL`
   - `BOOTSTRAP_ADMIN_PASSWORD`
   - `EXPECTED_SUPABASE_PROJECT_REF`
   - `REGISTRATION_GATE_SIGNING_KEY`
   - `ALLOW_ADMIN_BOOTSTRAP=true`
2. Ejecutar el script sin imprimir variables.
3. El script:
   - rechaza producción salvo flag explícito y email exacto;
   - comprueba que no exista otro super admin inesperado;
   - firma propósito, email, fecha y nonce; Supabase Auth exige esa firma y
     `app_metadata.bootstrap_source=one-time-script` antes de crear la identidad;
   - crea/confirma usuario;
   - establece `force_password_change=true`;
   - llama a una función SQL transaccional que actualiza el perfil, añade roles `admin` y `super_admin` y registra auditoría;
   - elimina la identidad Auth recién creada si la transacción de roles falla;
   - termina con código no cero ante cualquier resultado no verificable.
4. Revocar `EXECUTE` para `service_role` sobre `public.bootstrap_initial_admin(uuid,text)` o eliminar la función después de verificar el acceso.
5. Desactivar `ALLOW_ADMIN_BOOTSTRAP`.
6. Eliminar variables/archivo temporal.
7. Verificar `git status`, historial y secret scan.

## Primer acceso

1. Ir a la URL real escribiéndola manualmente.
2. Iniciar sesión.
3. Cambiar contraseña antes de ver el panel.
4. La nueva contraseña debe ser única y guardada en un gestor.
5. Enrolar TOTP.
6. Guardar códigos de recuperación en lugar separado.
7. Confirmar sesión `aal2`.
8. Revisar actividad y datos del usuario.
9. Crear una cuenta admin cotidiana con permisos mínimos; reservar `super_admin` para emergencia cuando la operación lo permita.

## Verificaciones

- Login con contraseña temporal ya no funciona.
- Panel rechaza `aal1`.
- Editor/moderador no pueden asignar roles.
- Evento de rol y MFA está auditado.
- No hay email/password en logs.
- No queda variable bootstrap en local, Vercel, GitHub o historial.
- No hay cuenta duplicada.
- Recovery email/SMTP funciona.

## Recuperación

- No crear bypass universal.
- Recuperación de super admin requiere procedimiento de dos personas cuando exista equipo.
- Rotar sesiones y secretos ante compromiso.
- Revocar factores perdidos.
- Usar Supabase admin API sólo desde entorno privilegiado auditado.
- Documentar cada emergencia.

## Importante

La credencial entregada no representa una cuenta existente. La cuenta existirá sólo después de que Codex ejecute el bootstrap en el proyecto correcto.
