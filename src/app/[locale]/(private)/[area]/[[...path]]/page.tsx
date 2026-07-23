import { notFound } from "next/navigation";
import { PrivateAreaShell } from "@/components/private/private-area-shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { isPrivateArea, privateAreas } from "@/lib/navigation/private";
import { requireViewer } from "@/server/auth/viewer";
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
  const privacyCenterData =
    area === "portal" && topLevel === "privacy" ? await getPrivacyCenterData(viewer.id) : null;

  return (
    <PrivateAreaShell
      area={area}
      assuranceLevel={viewer.assuranceLevel}
      dictionary={dictionary}
      email={viewer.email}
      locale={locale}
      path={path}
      privacyCenterData={privacyCenterData}
    />
  );
}
