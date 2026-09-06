"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, Plane } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AccountUnavailableNotice } from "@/components/auth/account-unavailable-notice";
import { BrandLogo, LogoMark } from "@/components/brand/logo-mark";
import { FirebaseGoogleButton } from "@/components/auth/firebase-google-button";
import { APP_EXPERIENCE_MEDIA_QUERY } from "@/components/pwa/app-experience";
import { INSTALL_PROMPT_EVENT } from "@/components/pwa/install-app-prompt";

const ONBOARDING_KEY = "vwayaj-mobile-onboarding-v1";
const SPLASH_SESSION_KEY = "vwayaj-mobile-splash-v1";
export const ACCOUNT_STATE_KEY = "vwayaj-account-state";

const slides = [
  {
    image: "/images/editorial/onboarding-guidance.webp",
    imageAlt: "De moun ayisyen k ap konpare enfòmasyon pou prepare yon pwojè vwayaj",
    kicker: "Byenvini",
    title: "Planifye pwojè w ak bon enfòmasyon.",
    body: "Konpare Chili ak Brezil, konprann sa chak destinasyon mande epi chwazi chemen ki adapte ak sitiyasyon pa w."
  },
  {
    image: "/images/editorial/onboarding-preparation.webp",
    imageAlt: "Dokiman ak lis etap yon moun ap prepare anvan yon vwayaj",
    kicker: "Prepare pwojè ou",
    title: "Prepare chak etap anvan ou pati.",
    body: "Gade ki viza, dokiman ak delè pou verifye depi peyi kote w ap viv la, anvan ou achte tikè oswa depanse lajan."
  },
  {
    image: "/images/editorial/onboarding-support.webp",
    imageAlt: "Yon konseye ayisyen k ap eksplike yon plan vwayaj bay yon kliyan",
    kicker: "Yon ajans ki la pou ou",
    title: "Jwenn èd lè ou bezwen li.",
    body: "Nou montre w sous ofisyèl yo ak etap ou ka fè poukont ou. Si yon bagay pa klè, ekip la disponib pou oryante w."
  },
  {
    image: "/images/editorial/onboarding-news.webp",
    imageAlt: "Yon moun ayisyen k ap li nouvèl vwayaj sou telefòn li epi pran nòt",
    kicker: "Rete enfòme",
    title: "Rete ajou san w pa pèdi tan.",
    body: "Li rezime kout sou chanjman ki ka touche viza, rezidans ak lavi nan Chili oswa Brezil, epi anrejistre sa ki enpòtan pou ou."
  }
] as const;

type EntryPhase = "checking" | "splash" | "onboarding" | "login" | "hidden";

export function MobileEntryGate({ accountsReady }: { accountsReady: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<EntryPhase>("checking");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let phaseTimer: number | undefined;
    let installTimer: number | undefined;
    const setupTimer = window.setTimeout(() => {
      const media = window.matchMedia(APP_EXPERIENCE_MEDIA_QUERY);
      const accountReady = searchParams.get("account") === "ready";
      if (!media.matches || pathname.includes("/auth/")) {
        setPhase("hidden");
        return;
      }

      if (searchParams.get("onboarding") === "restart") {
        window.localStorage.removeItem(ONBOARDING_KEY);
        window.localStorage.removeItem(ACCOUNT_STATE_KEY);
        window.sessionStorage.setItem(SPLASH_SESSION_KEY, "shown");
        window.history.replaceState({}, "", pathname);
        setSlideIndex(0);
        setPhase("onboarding");
        return;
      }

      if (accountReady) {
        window.localStorage.setItem(ONBOARDING_KEY, "done");
        window.localStorage.setItem(ACCOUNT_STATE_KEY, "member");
        window.history.replaceState({}, "", pathname);
        setPhase("hidden");
        installTimer = window.setTimeout(
          () => window.dispatchEvent(new Event(INSTALL_PROMPT_EVENT)),
          250
        );
        return;
      }

      const onboardingDone = window.localStorage.getItem(ONBOARDING_KEY) === "done";
      const splashShown = window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "shown";
      if (splashShown) {
        setPhase(onboardingDone ? "hidden" : "onboarding");
        return;
      }

      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "shown");
      setPhase("splash");
      phaseTimer = window.setTimeout(
        () => setPhase(onboardingDone ? "hidden" : "onboarding"),
        1350
      );
    }, 0);
    return () => {
      window.clearTimeout(setupTimer);
      if (phaseTimer) window.clearTimeout(phaseTimer);
      if (installTimer) window.clearTimeout(installTimer);
    };
  }, [pathname, searchParams]);

  if (phase === "checking" || phase === "hidden") return null;

  if (phase === "splash") {
    return (
      <div className="mobile-entry-layer mobile-splash" aria-label="Vwayaj Ayisyen ap louvri">
        <BrandLogo className="mobile-splash-logo" priority />
        <small>Chili · Brezil · Nou bò kote w</small>
      </div>
    );
  }

  if (phase === "login") {
    return (
      <div className="mobile-entry-layer mobile-entry-auth">
        <header className="mobile-entry-auth-page-header">
          <span className="mobile-entry-auth-page-brand">
            <span aria-hidden="true">
              <LogoMark />
            </span>
            <strong>Vwayaj Ayisyen</strong>
          </span>
          <span className="mobile-entry-auth-destinations">
            <strong>Chili · Brezil</strong>
            <small>Pi pre rèv ou</small>
          </span>
          <span className="mobile-entry-auth-route" aria-hidden="true">
            <Plane size={24} />
          </span>
        </header>
        <section className="mobile-entry-auth-card" aria-labelledby="mobile-account-title">
          <header className="mobile-entry-auth-brand">
            <span className="mobile-entry-auth-icon" aria-hidden="true">
              <LogoMark />
            </span>
            <span>
              <strong>Vwayaj Ayisyen</strong>
              <small>Chili · Brezil</small>
            </span>
          </header>
          <div className="mobile-entry-auth-copy">
            <p className="eyebrow">Espas pèsonèl ou</p>
            <h1 id="mobile-account-title">Kenbe pwojè w toupre w.</h1>
            <p>
              {accountsReady
                ? "Konekte ak Google pou jwenn tout sa ou te chwazi yo nan yon sèl kote."
                : "Li tout gid ak nouvèl sou Chili ak Brezil san ou pa bezwen kreye yon kont."}
            </p>
          </div>
          <div className="mobile-entry-auth-benefits" aria-label="Avantaj kont lan">
            <span>Nouvèl ou sove</span>
            <span>Pwofil ou</span>
            <span>Notifikasyon</span>
          </div>
          {accountsReady ? (
            <>
              <FirebaseGoogleButton enabled />
              <div className="mobile-entry-auth-divider" aria-hidden="true">
                <span>oswa</span>
              </div>
            </>
          ) : (
            <AccountUnavailableNotice />
          )}
          <button
            className="mobile-guest-link"
            onClick={() => {
              window.localStorage.setItem(ONBOARDING_KEY, "done");
              window.localStorage.setItem(ACCOUNT_STATE_KEY, "guest");
              setPhase("hidden");
            }}
            type="button"
          >
            Kontinye kòm envite
          </button>
          <small className="mobile-entry-auth-note">
            Ou toujou ka li tout gid piblik yo san kont.
          </small>
        </section>
      </div>
    );
  }

  const slide = slides[slideIndex] ?? slides[0];
  const isLast = slideIndex === slides.length - 1;

  return (
    <div className="mobile-entry-layer mobile-onboarding">
      <header>
        <span className="mobile-onboarding-brand">
          <span aria-hidden="true">
            <LogoMark />
          </span>
          <strong>Vwayaj Ayisyen</strong>
        </span>
        <button
          onClick={() => {
            setSlideIndex(slides.length - 1);
            setPhase("login");
          }}
          type="button"
        >
          Pase
        </button>
      </header>
      <span className="mobile-onboarding-motto" aria-hidden="true">
        Plis posibilite
        <br />
        pou demen w
      </span>
      <span className="mobile-onboarding-route" aria-hidden="true">
        <Plane size={24} />
      </span>
      <main>
        <div className="onboarding-visual">
          <Image
            alt={slide.imageAlt}
            fill
            priority={slideIndex === 0}
            sizes="(max-width: 767px) calc(100vw - 2rem), 320px"
            src={slide.image}
          />
        </div>
        <div className="onboarding-copy">
          <p className="eyebrow">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p>{slide.body}</p>
        </div>
      </main>
      <footer>
        <div className="onboarding-progress">
          <div
            className="onboarding-dots"
            aria-label={`Etap ${slideIndex + 1} sou ${slides.length}`}
          >
            {slides.map((item, index) => (
              <span className={index === slideIndex ? "active" : ""} key={item.title} />
            ))}
          </div>
          <small>
            {slideIndex + 1} / {slides.length}
          </small>
        </div>
        <button
          className="button"
          onClick={() => {
            if (isLast) {
              window.localStorage.setItem(ONBOARDING_KEY, "done");
              setPhase("login");
            } else {
              setSlideIndex((current) => current + 1);
            }
          }}
          type="button"
        >
          {isLast ? "Kòmanse" : "Kontinye"} <ArrowRight aria-hidden="true" size={18} />
        </button>
      </footer>
    </div>
  );
}
