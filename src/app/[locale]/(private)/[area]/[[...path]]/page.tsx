import { notFound } from "next/navigation";
import {
  completePrivacyRequestAction,
  transitionPrivacyRequestAction
} from "@/app/[locale]/privacy-admin-actions";
import { submitPrivacyRequestAction } from "@/app/[locale]/privacy-actions";
import { PrivateAreaShell } from "@/components/private/private-area-shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { isPrivateArea, privateAreas } from "@/lib/navigation/private";
import { requireViewer } from "@/server/auth/viewer";
import { getAdminPrivacyRequestQueue } from "@/server/privacy/admin-queue";
import { getPrivacyCenterData } from "@/server/privacy/center";

type PrivatePageProps = {
  params: Promise<{ locale: string; area: string; path?: string[] }>;
};

function pathIsSafe(path: readonly string[]): boolean {
  return path.length <= 3 && path.every((segment) => /^[a-z0-9-]{1,64}$/i.test(segment));
}

export default async function PrivatePage({ params }: PrivatePageProps) {
  const { locale, area, path = [] } = await params;
  if (!isLocale(locale) || !isPrivateArea(area) || !pathIsSafe(path)) notFound();
  const definition = privateAreas[area];
  const topLevel = path[0] ?? "";
  if (!definition.routes.some((route) => route.path === topLevel)) notFound();
  const viewer = await requireViewer(locale, definition.allowedRoles);
  const dictionary = getDictionary(locale);
  const localizedPrivacyAdminAction = completePrivacyRequestAction.bind(null, locale);
  const localizedPrivacyAdminTransitionAction = transitionPrivacyRequestAction.bind(null, locale);
  const localizedPrivacyRequestAction = submitPrivacyRequestAction.bind(null, locale);
  const privacyCenterData =
    area === "portal" && topLevel === "privacy" ? await getPrivacyCenterData(viewer.id) : null;
  const privacyAdminQueueData =
    area === "admin" && topLevel === "privacy-requests"
      ? await getAdminPrivacyRequestQueue()
      : null;

  return (
    <PrivateAreaShell
      area={area}
      assuranceLevel={viewer.assuranceLevel}
      dictionary={dictionary}
      email={viewer.email}
      locale={locale}
      path={path}
      privacyAdminAction={localizedPrivacyAdminAction}
      privacyAdminTransitionAction={localizedPrivacyAdminTransitionAction}
      privacyAdminQueueData={privacyAdminQueueData}
      privacyCenterData={privacyCenterData}
      privacyRequestAction={localizedPrivacyRequestAction}
    />
  );
}
