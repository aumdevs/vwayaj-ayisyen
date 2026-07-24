"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import {
  isStandaloneExperience,
  useAppExperience,
  useKeyboardOpen
} from "@/components/pwa/app-experience";
import type { Locale } from "@/types/domain";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const SESSION_KEY = "vwayaj-install-prompt-shown";
const INSTALLED_KEY = "vwayaj-pwa-installed";

const copy = {
  ht: {
    title: "Enstale Vwayaj Ayisyen",
    body: "Ajoute aplikasyon an sou ekran telefòn ou pou ouvri li pi fasil.",
    install: "Enstale aplikasyon an",
    later: "Pa kounye a",
    close: "Fèmen",
    instructions: "Etap pou enstale sou iPhone oswa iPad",
    steps: [
      "Peze bouton Pataje a.",
      "Chwazi Ajoute sou ekran dakèy.",
      "Aktive Louvri kòm aplikasyon entènèt.",
      "Peze Ajoute."
    ]
  },
  fr: {
    title: "Installer Vwayaj Ayisyen",
    body: "Ajoutez l’application à votre écran d’accueil pour y accéder plus rapidement.",
    install: "Installer l’application",
    later: "Pas maintenant",
    close: "Fermer",
    instructions: "Étapes pour installer sur iPhone ou iPad",
    steps: [
      "Touchez le bouton Partager.",
      "Choisissez Sur l’écran d’accueil.",
      "Activez Ouvrir comme app web si cette option apparaît.",
      "Touchez Ajouter."
    ]
  },
  es: {
    title: "Instala Vwayaj Ayisyen",
    body: "Añade la aplicación a tu pantalla de inicio para acceder más rápidamente.",
    install: "Instalar aplicación",
    later: "Ahora no",
    close: "Cerrar",
    instructions: "Pasos para instalar en iPhone o iPad",
    steps: [
      "Toca el botón Compartir.",
      "Elige Añadir a pantalla de inicio.",
      "Activa Abrir como app web si aparece la opción.",
      "Toca Añadir."
    ]
  },
  pt: {
    title: "Instale o Vwayaj Ayisyen",
    body: "Adicione o aplicativo à tela inicial para acessar com mais rapidez.",
    install: "Instalar aplicativo",
    later: "Agora não",
    close: "Fechar",
    instructions: "Etapas para instalar no iPhone ou iPad",
    steps: [
      "Toque no botão Compartilhar.",
      "Escolha Adicionar à Tela de Início.",
      "Ative Abrir como App da Web, se a opção aparecer.",
      "Toque em Adicionar."
    ]
  },
  en: {
    title: "Install Vwayaj Ayisyen",
    body: "Add the app to your home screen for faster access.",
    install: "Install app",
    later: "Not now",
    close: "Close",
    instructions: "Steps to install on iPhone or iPad",
    steps: [
      "Tap the Share button.",
      "Choose Add to Home Screen.",
      "Enable Open as Web App if the option appears.",
      "Tap Add."
    ]
  }
} satisfies Record<
  Locale,
  {
    title: string;
    body: string;
    install: string;
    later: string;
    close: string;
    instructions: string;
    steps: readonly [string, string, string, string];
  }
>;

function isAppleMobileDevice(): boolean {
  const platform = navigator.platform;
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function InstallAppPrompt({ locale }: { locale: Locale }) {
  const appExperience = useAppExperience();
  const keyboardOpen = useKeyboardOpen();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const text = copy[locale];

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      window.localStorage.removeItem(INSTALLED_KEY);
      setInstalled(false);
      setDeferredPrompt(installEvent);
    };
    const onInstalled = () => {
      window.localStorage.setItem(INSTALLED_KEY, "true");
      setInstalled(true);
      setDeferredPrompt(null);
      setOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    const detectionTimer = window.setTimeout(() => {
      setIos(isAppleMobileDevice());
      setInstalled(
        isStandaloneExperience() || window.localStorage.getItem(INSTALLED_KEY) === "true"
      );
    }, 0);
    return () => {
      window.clearTimeout(detectionTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (
      !appExperience ||
      keyboardOpen ||
      installed ||
      isStandaloneExperience() ||
      (!ios && !deferredPrompt) ||
      window.sessionStorage.getItem(SESSION_KEY) === "true"
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setOpen(true);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [appExperience, deferredPrompt, installed, ios, keyboardOpen]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const closeOnKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>("button, a[href]")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", closeOnKeyboard);
    return () => window.removeEventListener("keydown", closeOnKeyboard);
  }, [open]);

  if (!open || keyboardOpen || installed) return null;

  async function install() {
    if (ios) {
      setInstructionsOpen(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setOpen(false);
    if (choice.outcome === "accepted") {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }
  }

  return (
    <div className="install-prompt-layer">
      <section
        aria-labelledby="install-prompt-title"
        aria-modal="true"
        className="install-app-prompt"
        ref={sheetRef}
        role="dialog"
      >
        <button
          aria-label={text.close}
          className="install-prompt-close"
          onClick={() => setOpen(false)}
          ref={closeRef}
          type="button"
        >
          <X aria-hidden="true" size={20} />
        </button>
        <span className="install-prompt-icon" aria-hidden="true">
          <LogoMark />
        </span>
        <div>
          <h2 id="install-prompt-title">{text.title}</h2>
          <p>{text.body}</p>
        </div>
        {instructionsOpen ? (
          <div className="ios-install-instructions">
            <strong>
              <Share2 aria-hidden="true" size={18} /> {text.instructions}
            </strong>
            <ol>
              {text.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ) : null}
        <div className="install-prompt-actions">
          <button className="button" onClick={() => void install()} type="button">
            <Download aria-hidden="true" size={18} /> {text.install}
          </button>
          <button className="button button-quiet" onClick={() => setOpen(false)} type="button">
            {text.later}
          </button>
        </div>
      </section>
    </div>
  );
}
