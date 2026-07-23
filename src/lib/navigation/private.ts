import type { AppRole } from "@/types/domain";

export const PRIVATE_AREAS = [
  "portal",
  "advisor",
  "professional",
  "editor",
  "moderation",
  "admin"
] as const;
export type PrivateArea = (typeof PRIVATE_AREAS)[number];

type AreaDefinition = {
  title: string;
  allowedRoles?: readonly AppRole[];
  routes: readonly { path: string; label: string }[];
};

export const privateAreas: Record<PrivateArea, AreaDefinition> = {
  portal: {
    title: "Espas mwen",
    routes: [
      { path: "", label: "Rezime" },
      { path: "profile", label: "Pwofil" },
      { path: "security", label: "Sekirite" },
      { path: "assessments", label: "Evalyasyon" },
      { path: "orders", label: "Peman ak kòmand" },
      { path: "cases", label: "Dosye" },
      { path: "appointments", label: "Randevou" },
      { path: "courses", label: "Kou" },
      { path: "community", label: "Kominote" },
      { path: "ai", label: "Asistan IA" },
      { path: "notifications", label: "Notifikasyon" },
      { path: "privacy", label: "Konfidansyalite" }
    ]
  },
  advisor: {
    title: "Espas konseye",
    allowedRoles: ["advisor", "admin", "super_admin"],
    routes: [
      { path: "", label: "Rezime" },
      { path: "leads", label: "Kontak" },
      { path: "cases", label: "Dosye" },
      { path: "calendar", label: "Kalandriye" },
      { path: "tasks", label: "Travay" },
      { path: "contacts", label: "Moun" }
    ]
  },
  professional: {
    title: "Espas pwofesyonèl",
    allowedRoles: ["professional", "admin", "super_admin"],
    routes: [
      { path: "", label: "Rezime" },
      { path: "assignments", label: "Misyon" },
      { path: "cases", label: "Dosye otorize" },
      { path: "calendar", label: "Kalandriye" },
      { path: "security", label: "Sekirite" }
    ]
  },
  editor: {
    title: "Espas editoryal",
    allowedRoles: ["content_editor", "admin", "super_admin"],
    routes: [
      { path: "", label: "Rezime" },
      { path: "content", label: "Kontni" },
      { path: "translations", label: "Tradiksyon" },
      { path: "sources", label: "Sous" },
      { path: "reviews", label: "Revizyon" }
    ]
  },
  moderation: {
    title: "Modération",
    allowedRoles: ["moderator", "admin", "super_admin"],
    routes: [
      { path: "", label: "Rezime" },
      { path: "reports", label: "Rapò" },
      { path: "users", label: "Itilizatè rapòte" }
    ]
  },
  admin: {
    title: "Administrasyon",
    allowedRoles: ["admin", "super_admin"],
    routes: [
      { path: "", label: "Rezime" },
      { path: "settings", label: "Paramèt" },
      { path: "countries", label: "Peyi" },
      { path: "content", label: "Kontni" },
      { path: "comparison", label: "Konparezon" },
      { path: "assessment", label: "Evalyasyon" },
      { path: "packages", label: "Pakè" },
      { path: "prices", label: "Pri" },
      { path: "whatsapp", label: "WhatsApp" },
      { path: "users", label: "Itilizatè" },
      { path: "invitations", label: "Envitasyon" },
      { path: "roles", label: "Wòl" },
      { path: "staff", label: "Ekip" },
      { path: "professionals", label: "Pwofesyonèl" },
      { path: "crm", label: "CRM" },
      { path: "cases", label: "Dosye" },
      { path: "documents", label: "Dokiman" },
      { path: "appointments", label: "Randevou" },
      { path: "courses", label: "Kou" },
      { path: "community", label: "Kominote" },
      { path: "ai", label: "Asistan IA" },
      { path: "notifications", label: "Notifikasyon" },
      { path: "audit", label: "Odit" },
      { path: "security", label: "Sekirite" },
      { path: "feature-flags", label: "Fonksyon" }
    ]
  }
};

const portalMobileRoutePaths = new Set(["", "cases", "appointments", "privacy", "profile"]);

export const portalMobileRoutes = privateAreas.portal.routes.filter(({ path }) =>
  portalMobileRoutePaths.has(path)
);

export function isPrivateArea(value: string): value is PrivateArea {
  return PRIVATE_AREAS.some((area) => area === value);
}
