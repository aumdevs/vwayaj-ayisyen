import Link from "next/link";
import {
  Bell,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Database,
  FileText,
  FolderKanban,
  Gauge,
  Globe2,
  Home,
  LayoutGrid,
  LockKeyhole,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon
} from "lucide-react";
import type { PrivacyAdminActionState } from "@/app/[locale]/privacy-admin-actions";
import type { PrivacyRequestActionState } from "@/app/[locale]/privacy-actions";
import { signOutAction } from "@/app/[locale]/auth/actions";
import { LogoMark } from "@/components/brand/logo-mark";
import { PrivacyAdminQueue } from "@/components/private/privacy-admin-queue";
import { PrivacyRequestPanel } from "@/components/private/privacy-request-panel";
import { BRAND } from "@/config/brand";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { portalMobileRoutes, privateAreas, type PrivateArea } from "@/lib/navigation/private";
import type { Locale } from "@/types/domain";
import type { PrivacyAdminQueueData, PrivacyCenterData } from "@/types/privacy";

type PrivateAreaShellProps = {
  area: PrivateArea;
  dictionary: Dictionary;
  locale: Locale;
  path: readonly string[];
  email: string | null;
  assuranceLevel: "aal1" | "aal2" | null;
  privacyAdminAction: (
    _previous: PrivacyAdminActionState,
    formData: FormData
  ) => Promise<PrivacyAdminActionState>;
  privacyAdminQueueData: PrivacyAdminQueueData | null;
  privacyCenterData: PrivacyCenterData | null;
  privacyRequestAction: (
    _previous: PrivacyRequestActionState,
    formData: FormData
  ) => Promise<PrivacyRequestActionState>;
};

const routeIcons: Record<string, LucideIcon> = {
  "": Gauge,
  profile: CircleUserRound,
  security: ShieldCheck,
  assessments: ClipboardList,
  orders: FileText,
  cases: FolderKanban,
  appointments: CalendarDays,
  calendar: CalendarDays,
  courses: BookOpenText,
  community: MessageSquare,
  ai: Sparkles,
  notifications: Bell,
  privacy: LockKeyhole,
  "privacy-requests": LockKeyhole,
  leads: Users,
  contacts: Users,
  tasks: ClipboardList,
  assignments: BriefcaseBusiness,
  content: FileText,
  translations: Globe2,
  sources: BookOpenText,
  reviews: Check,
  reports: ClipboardList,
  users: Users,
  settings: Settings,
  countries: Globe2,
  comparison: LayoutGrid,
  assessment: ClipboardList,
  packages: BriefcaseBusiness,
  prices: FileText,
  whatsapp: MessageSquare,
  invitations: Users,
  roles: ShieldCheck,
  staff: Users,
  professionals: BriefcaseBusiness,
  crm: Database,
  documents: FileText,
  audit: Search,
  "feature-flags": Settings
};

const uiCopy = {
  ht: {
    navigation: "Navigasyon",
    publicSite: "Sit piblik",
    session: "Sesyon aktyèl",
    workspace: "Espas pwoteje",
    emptyTitle: "Pa gen done pou montre isit la.",
    emptyBody: "Espas sa a rete vid jiskaske yon fonksyon apwouve oswa done otorize disponib.",
    activity: "Aktivite sekirite",
    access: "Nivo aksè",
    environment: "Anviwònman",
    groups: ["Jeneral", "Kontni", "Moun", "Operasyon", "Sistèm"]
  },
  fr: {
    navigation: "Navigation",
    publicSite: "Site public",
    session: "Session active",
    workspace: "Espace protégé",
    emptyTitle: "Aucune donnée à afficher ici.",
    emptyBody:
      "Cet espace reste vide jusqu’à ce qu’une fonction approuvée ou des données autorisées soient disponibles.",
    activity: "Activité de sécurité",
    access: "Niveau d’accès",
    environment: "Environnement",
    groups: ["Général", "Contenu", "Personnes", "Opérations", "Système"]
  },
  es: {
    navigation: "Navegación",
    publicSite: "Sitio público",
    session: "Sesión activa",
    workspace: "Espacio protegido",
    emptyTitle: "No hay datos para mostrar aquí.",
    emptyBody:
      "Este espacio permanece vacío hasta que haya una función aprobada o datos autorizados disponibles.",
    activity: "Actividad de seguridad",
    access: "Nivel de acceso",
    environment: "Entorno",
    groups: ["General", "Contenido", "Personas", "Operaciones", "Sistema"]
  },
  pt: {
    navigation: "Navegação",
    publicSite: "Site público",
    session: "Sessão ativa",
    workspace: "Espaço protegido",
    emptyTitle: "Não há dados para mostrar aqui.",
    emptyBody:
      "Este espaço permanece vazio até que uma função aprovada ou dados autorizados estejam disponíveis.",
    activity: "Atividade de segurança",
    access: "Nível de acesso",
    environment: "Ambiente",
    groups: ["Geral", "Conteúdo", "Pessoas", "Operações", "Sistema"]
  },
  en: {
    navigation: "Navigation",
    publicSite: "Public site",
    session: "Active session",
    workspace: "Protected workspace",
    emptyTitle: "There is no data to show here.",
    emptyBody: "This space stays empty until an approved feature or authorized data is available.",
    activity: "Security activity",
    access: "Access level",
    environment: "Environment",
    groups: ["General", "Content", "People", "Operations", "System"]
  }
} satisfies Record<
  Locale,
  {
    navigation: string;
    publicSite: string;
    session: string;
    workspace: string;
    emptyTitle: string;
    emptyBody: string;
    activity: string;
    access: string;
    environment: string;
    groups: readonly [string, string, string, string, string];
  }
>;

function routeHref(locale: Locale, area: PrivateArea, path: string) {
  return localizedPath(locale, `${area}${path ? `/${path}` : ""}`);
}

function EnvironmentBadge({ label }: { label: string }) {
  const environment =
    process.env.VERCEL_ENV === "production"
      ? "Production"
      : process.env.VERCEL_ENV === "preview"
        ? "Preview"
        : "Local";
  return (
    <span className={`environment-badge environment-${environment.toLowerCase()}`}>
      {label}: {environment}
    </span>
  );
}

function SignOutForm({
  dictionary,
  locale,
  compact = false
}: {
  dictionary: Dictionary;
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <form action={signOutAction}>
      <input name="locale" type="hidden" value={locale} />
      <button className={compact ? "private-icon-action" : "private-signout"} type="submit">
        <LockKeyhole aria-hidden="true" size={17} /> <span>{dictionary.auth.logout}</span>
      </button>
    </form>
  );
}

function PortalShell({
  definition,
  dictionary,
  locale,
  section,
  title,
  email,
  assuranceLevel,
  privacyCenterData,
  privacyRequestAction
}: {
  definition: (typeof privateAreas)["portal"];
  dictionary: Dictionary;
  locale: Locale;
  section: string;
  title: string;
  email: string | null;
  assuranceLevel: "aal1" | "aal2" | null;
  privacyCenterData: PrivacyCenterData | null;
  privacyRequestAction: (
    _previous: PrivacyRequestActionState,
    formData: FormData
  ) => Promise<PrivacyRequestActionState>;
}) {
  const copy = uiCopy[locale];
  const selectedIcon = routeIcons[section] ?? LayoutGrid;
  const SelectedIcon = selectedIcon;

  return (
    <div className="private-app portal-app">
      <aside className="portal-sidebar">
        <Link className="private-brand" href={localizedPath(locale, "portal")}>
          <LogoMark className="brand-mark" />
          <strong>{BRAND.shortName}</strong>
        </Link>
        <p className="private-nav-label">{copy.navigation}</p>
        <nav aria-label={definition.title}>
          {definition.routes.map((route) => {
            const Icon = routeIcons[route.path] ?? LayoutGrid;
            return (
              <Link
                aria-current={route.path === section ? "page" : undefined}
                href={routeHref(locale, "portal", route.path)}
                key={route.path}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="portal-sidebar-footer">
          <Link href={localizedPath(locale)}>
            <Globe2 aria-hidden="true" size={17} /> {copy.publicSite}
          </Link>
          <SignOutForm dictionary={dictionary} locale={locale} />
        </div>
      </aside>

      <div className="portal-workspace">
        <header className="private-topbar">
          <div>
            <small>{copy.workspace}</small>
            <strong>{definition.title}</strong>
          </div>
          <div className="private-user-summary">
            <span aria-hidden="true">
              <CircleUserRound size={20} />
            </span>
            <div>
              <strong>{email ?? "—"}</strong>
              <small>{assuranceLevel ?? "aal1"}</small>
            </div>
          </div>
        </header>
        <main className="private-main" id="main-content" tabIndex={-1}>
          <header className="private-page-heading">
            <div>
              <p className="eyebrow">
                <LockKeyhole aria-hidden="true" size={15} /> {copy.workspace}
              </p>
              <h1>{title}</h1>
            </div>
            <span className="assurance-badge">
              <ShieldCheck aria-hidden="true" size={17} /> {copy.access}: {assuranceLevel ?? "aal1"}
            </span>
          </header>

          {section === "" ? (
            <div className="portal-overview-grid">
              <article className="portal-overview-primary">
                <span aria-hidden="true">
                  <Home size={24} />
                </span>
                <p className="status-label">{dictionary.dashboard.next_step}</p>
                <h2>{dictionary.dashboard.title}</h2>
                <p>{dictionary.common.in_preparation}</p>
              </article>
              <article>
                <ShieldCheck aria-hidden="true" size={23} />
                <h3>{dictionary.dashboard.privacy}</h3>
                <p>{dictionary.security.do_not_share}</p>
              </article>
              <article>
                <Bell aria-hidden="true" size={23} />
                <h3>{dictionary.dashboard.notifications}</h3>
                <p>{copy.emptyBody}</p>
              </article>
            </div>
          ) : section === "privacy" && privacyCenterData ? (
            <PrivacyRequestPanel
              action={privacyRequestAction}
              data={privacyCenterData}
              legalEmail={BRAND.contact.legal}
              locale={locale}
            />
          ) : (
            <section className="private-empty-panel">
              <span aria-hidden="true">
                <SelectedIcon size={29} />
              </span>
              <p className="eyebrow">{title}</p>
              <h2>{copy.emptyTitle}</h2>
              <p>{copy.emptyBody}</p>
              <small>
                <ShieldCheck aria-hidden="true" size={16} /> {dictionary.security.do_not_share}
              </small>
            </section>
          )}
        </main>

        <nav className="portal-mobile-nav" aria-label={definition.title}>
          {portalMobileRoutes.map((route) => {
            const Icon = routeIcons[route.path] ?? LayoutGrid;
            return (
              <Link
                aria-current={route.path === section ? "page" : undefined}
                href={routeHref(locale, "portal", route.path)}
                key={route.path}
              >
                <Icon aria-hidden="true" size={20} />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function groupRoutes(area: PrivateArea, routes: (typeof privateAreas)[PrivateArea]["routes"]) {
  if (area !== "admin") return [routes, [], [], [], []] as const;
  const content = new Set([
    "countries",
    "content",
    "comparison",
    "assessment",
    "packages",
    "prices"
  ]);
  const people = new Set(["users", "invitations", "roles", "staff", "professionals"]);
  const operations = new Set([
    "crm",
    "cases",
    "documents",
    "appointments",
    "courses",
    "community",
    "ai",
    "notifications",
    "privacy-requests"
  ]);
  const system = new Set(["settings", "whatsapp", "audit", "security", "feature-flags"]);
  return [
    routes.filter(({ path }) => path === ""),
    routes.filter(({ path }) => content.has(path)),
    routes.filter(({ path }) => people.has(path)),
    routes.filter(({ path }) => operations.has(path)),
    routes.filter(({ path }) => system.has(path))
  ] as const;
}

function StaffShell({
  area,
  definition,
  dictionary,
  locale,
  section,
  title,
  email,
  assuranceLevel,
  privacyAdminAction,
  privacyAdminQueueData
}: {
  area: Exclude<PrivateArea, "portal">;
  definition: (typeof privateAreas)[Exclude<PrivateArea, "portal">];
  dictionary: Dictionary;
  locale: Locale;
  section: string;
  title: string;
  email: string | null;
  assuranceLevel: "aal1" | "aal2" | null;
  privacyAdminAction: (
    _previous: PrivacyAdminActionState,
    formData: FormData
  ) => Promise<PrivacyAdminActionState>;
  privacyAdminQueueData: PrivacyAdminQueueData | null;
}) {
  const copy = uiCopy[locale];
  const groups = groupRoutes(area, definition.routes);
  const SelectedIcon = routeIcons[section] ?? LayoutGrid;

  const navigation = (
    <>
      {groups.map((routes, index) =>
        routes.length > 0 ? (
          <section className="staff-nav-group" key={copy.groups[index]}>
            <p>{copy.groups[index]}</p>
            <nav aria-label={copy.groups[index]}>
              {routes.map((route) => {
                const Icon = routeIcons[route.path] ?? LayoutGrid;
                return (
                  <Link
                    aria-current={route.path === section ? "page" : undefined}
                    href={routeHref(locale, area, route.path)}
                    key={route.path}
                  >
                    <Icon aria-hidden="true" size={17} />
                    <span>{route.label}</span>
                    <ChevronRight aria-hidden="true" size={14} />
                  </Link>
                );
              })}
            </nav>
          </section>
        ) : null
      )}
    </>
  );

  return (
    <div className="private-app staff-app">
      <aside className="staff-sidebar">
        <Link className="private-brand private-brand-inverse" href={routeHref(locale, area, "")}>
          <LogoMark className="brand-mark" />
          <div>
            <strong>{BRAND.shortName}</strong>
            <small>{definition.title}</small>
          </div>
        </Link>
        <EnvironmentBadge label={copy.environment} />
        <div className="staff-navigation">{navigation}</div>
        <div className="staff-sidebar-footer">
          <Link href={localizedPath(locale)}>
            <Globe2 aria-hidden="true" size={17} /> {copy.publicSite}
          </Link>
          <SignOutForm dictionary={dictionary} locale={locale} />
        </div>
      </aside>

      <div className="staff-workspace">
        <header className="private-topbar staff-topbar">
          <details className="staff-mobile-menu">
            <summary>
              <Menu aria-hidden="true" size={20} /> {copy.navigation}
            </summary>
            <div>{navigation}</div>
          </details>
          <div className="staff-topbar-title">
            <small>{definition.title}</small>
            <strong>{title}</strong>
          </div>
          <div className="private-user-summary">
            <span aria-hidden="true">
              <CircleUserRound size={20} />
            </span>
            <div>
              <strong>{email ?? "—"}</strong>
              <small>{assuranceLevel ?? "aal1"}</small>
            </div>
          </div>
        </header>

        <main className="private-main staff-main" id="main-content" tabIndex={-1}>
          <header className="private-page-heading staff-page-heading">
            <div>
              <p className="eyebrow">
                <SelectedIcon aria-hidden="true" size={16} /> {definition.title}
              </p>
              <h1>{title}</h1>
              <p>{copy.emptyBody}</p>
            </div>
            <EnvironmentBadge label={copy.environment} />
          </header>

          {section === "" ? (
            <section className="staff-timeline-panel">
              <header>
                <div>
                  <p className="status-label">{copy.activity}</p>
                  <h2>{copy.workspace}</h2>
                </div>
                <ShieldCheck aria-hidden="true" size={25} />
              </header>
              <ol>
                <li>
                  <span>
                    <Check size={16} />
                  </span>
                  <div>
                    <strong>{copy.session}</strong>
                    <p>{email ?? "—"}</p>
                  </div>
                </li>
                <li>
                  <span>
                    <ShieldCheck size={16} />
                  </span>
                  <div>
                    <strong>{copy.access}</strong>
                    <p>{assuranceLevel ?? "aal1"}</p>
                  </div>
                </li>
                <li>
                  <span>
                    <LockKeyhole size={16} />
                  </span>
                  <div>
                    <strong>{dictionary.dashboard.privacy}</strong>
                    <p>{dictionary.security.do_not_share}</p>
                  </div>
                </li>
              </ol>
            </section>
          ) : area === "admin" && section === "privacy-requests" && privacyAdminQueueData ? (
            <PrivacyAdminQueue
              action={privacyAdminAction}
              data={privacyAdminQueueData}
              legalEmail={BRAND.contact.legal}
              locale={locale}
            />
          ) : (
            <section className="staff-table-panel">
              <header>
                <div>
                  <p className="status-label">{title}</p>
                  <h2>{copy.workspace}</h2>
                </div>
                <span>
                  <SelectedIcon aria-hidden="true" size={22} />
                </span>
              </header>
              <div className="staff-table" role="table" aria-label={title}>
                <div className="staff-table-head" role="row">
                  <span role="columnheader">{title}</span>
                  <span role="columnheader">{copy.access}</span>
                  <span role="columnheader">{copy.activity}</span>
                </div>
                <div className="staff-table-empty" role="row">
                  <span role="cell">
                    <SelectedIcon aria-hidden="true" size={27} />
                    <strong>{copy.emptyTitle}</strong>
                    <small>{copy.emptyBody}</small>
                  </span>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export function PrivateAreaShell({
  area,
  dictionary,
  locale,
  path,
  email,
  assuranceLevel,
  privacyAdminAction,
  privacyAdminQueueData,
  privacyCenterData,
  privacyRequestAction
}: PrivateAreaShellProps) {
  const definition = privateAreas[area];
  const section = path[0] ?? "";
  const selected = definition.routes.find((route) => route.path === section);
  const title = selected?.label ?? dictionary.common.full_explanation;

  if (area === "portal") {
    return (
      <PortalShell
        assuranceLevel={assuranceLevel}
        definition={privateAreas.portal}
        dictionary={dictionary}
        email={email}
        locale={locale}
        privacyCenterData={privacyCenterData}
        privacyRequestAction={privacyRequestAction}
        section={section}
        title={title}
      />
    );
  }

  return (
    <StaffShell
      area={area}
      assuranceLevel={assuranceLevel}
      definition={privateAreas[area]}
      dictionary={dictionary}
      email={email}
      locale={locale}
      privacyAdminAction={privacyAdminAction}
      privacyAdminQueueData={privacyAdminQueueData}
      section={section}
      title={title}
    />
  );
}
