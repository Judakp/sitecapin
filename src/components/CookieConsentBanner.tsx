import React, { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import type { Language } from "../types";

const CONSENT_KEY = "capin_cookie_consent";
const CONSENT_EVENT = "capin_cookie_consent_changed";

type ConsentValue = "accepted" | "refused";

interface CookieConsentBannerProps {
  language: Language;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  language,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(CONSENT_KEY) === null);
    } catch {
      setVisible(false);
    }
  }, []);

  const saveConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
    } catch {
      // Le site reste utilisable même si le stockage local est indisponible.
    }

    setVisible(false);
  };

  useEffect(() => {
    const reopen = () => setVisible(true);

    window.addEventListener(CONSENT_EVENT, reopen);

    return () => {
      window.removeEventListener(CONSENT_EVENT, reopen);
    };
  }, []);

  if (!visible) return null;

  const fr = language === "fr";

  return (
    <aside
      id="cookie-consent-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-[#09090B]/95 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 sm:flex">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 id="cookie-consent-title" className="text-sm font-bold sm:text-base">
              {fr ? "Confidentialité et traceurs" : "Privacy and trackers"}
            </h2>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-zinc-300 sm:text-sm">
              {fr
                ? "Ce site utilise des mécanismes de stockage nécessaires à son fonctionnement et à la mémorisation de vos préférences. Si des traceurs optionnels nécessitant votre consentement sont activés, votre choix sera appliqué avant leur utilisation."
                : "This site uses storage mechanisms that are necessary for operation and to remember your preferences. If optional trackers requiring consent are enabled, your choice will be applied before they are used."}
            </p>

            <p className="mt-2 text-xs text-zinc-400">
              <a
                href={fr ? "/fr/confidentialite" : "/en/privacy-policy"}
                className="text-blue-400 underline-offset-2 hover:underline"
              >
                {fr ? "Politique de confidentialité" : "Privacy Policy"}
              </a>
              <span className="mx-2 text-zinc-600">·</span>
              <a
                href={fr ? "/fr/conditions-utilisation" : "/en/terms-of-use"}
                className="text-blue-400 underline-offset-2 hover:underline"
              >
                {fr ? "Conditions d'utilisation" : "Terms of Use"}
              </a>
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => saveConsent("refused")}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            {fr ? "Refuser" : "Decline"}
          </button>

          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            {fr ? "Accepter" : "Accept"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => saveConsent("refused")}
          aria-label={fr ? "Fermer" : "Close"}
          className="absolute right-2 top-2 rounded-lg p-1.5 text-zinc-500 hover:bg-white/10 hover:text-white sm:right-3 sm:top-3"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};

export function reopenCookieConsent(): void {
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
