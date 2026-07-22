/**
 * One-time privileged bootstrap.
 *
 * Run from a trusted local terminal with an external env file. This script
 * never prints the password and refuses ambiguous projects/accounts.
 */
import { createClient, type User } from "@supabase/supabase-js";

const REQUIRED_EMAIL = "admin@aumprodz.com";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function projectRefFromUrl(url: string): string {
  const host = new URL(url).hostname;
  const projectRef = host.match(/^([a-z0-9-]+)\.supabase\.co$/i)?.[1];
  if (!projectRef) throw new Error("Supabase URL is not a recognized remote project URL.");
  return projectRef;
}

async function main(): Promise<void> {
  if (process.env.ALLOW_ADMIN_BOOTSTRAP !== "true") {
    throw new Error("Refusing: ALLOW_ADMIN_BOOTSTRAP must be exactly true.");
  }

  const url = required("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = required("SUPABASE_SERVICE_ROLE_KEY");
  const email = required("BOOTSTRAP_ADMIN_EMAIL").toLowerCase();
  const password = required("BOOTSTRAP_ADMIN_PASSWORD");
  const expectedRef = required("EXPECTED_SUPABASE_PROJECT_REF");
  const actualRef = projectRefFromUrl(url);

  if (email !== REQUIRED_EMAIL) {
    throw new Error(`Refusing: bootstrap email must be ${REQUIRED_EMAIL}.`);
  }
  if (password.length < 32) {
    throw new Error("Refusing: temporary password must be at least 32 characters.");
  }
  if (expectedRef !== actualRef) {
    throw new Error(`Refusing: project ref mismatch (${actualRef}).`);
  }

  const admin = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { "X-Client-Info": "admin-bootstrap/1.0" } }
  });

  const { count: superAdminCount, error: countError } = await admin
    .from("user_roles")
    .select("*", { count: "exact", head: true })
    .eq("role", "super_admin");
  if (countError) throw countError;
  if ((superAdminCount ?? 0) > 0 && process.env.ALLOW_ADDITIONAL_SUPER_ADMIN !== "true") {
    throw new Error("Refusing: a super_admin already exists.");
  }

  let existing: User | null = null;
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;
    existing = data.users.find((user) => user.email?.toLowerCase() === email) ?? null;
    if (existing || data.users.length < 100) break;
  }
  if (existing) {
    throw new Error(
      "Refusing: the bootstrap email already exists. Do not reset it automatically; investigate manually."
    );
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { preferred_locale: "ht", bootstrap: true },
    app_metadata: { bootstrap_source: "one-time-script" }
  });
  if (error || !data.user) throw error ?? new Error("User creation returned no user.");

  const userId = data.user.id;

  const { error: bootstrapError } = await admin.rpc("bootstrap_initial_admin", {
    p_user_id: userId,
    p_expected_email: email
  });

  if (bootstrapError) {
    // The database function is transactional. Remove the newly-created Auth
    // identity as compensation so a failed bootstrap does not leave an
    // unmanaged account behind.
    const { error: cleanupError } = await admin.auth.admin.deleteUser(userId);
    if (cleanupError) {
      throw new Error(
        `Atomic role bootstrap failed and Auth cleanup also failed for user ${userId}. ` +
          "Stop and investigate before retrying.",
        { cause: bootstrapError }
      );
    }
    throw bootstrapError;
  }

  console.log(`Bootstrap succeeded for user id ${userId}.`);
  console.log("Immediately remove bootstrap variables, change the password, and enroll TOTP.");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown bootstrap error";
  console.error(`Bootstrap failed: ${message}`);
  process.exitCode = 1;
});
