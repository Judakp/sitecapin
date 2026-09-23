import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  BookOpen,
  Code2,
  Smartphone,
  Bot,
  Calendar,
} from "lucide-react";
import { Language, ThemeMode, PageView, LogoConfig } from "../types";
import { useTranslation } from "../data/translations";
import { getLogoConfig } from "../data/contentStore";
import logoPrincipal from "../assets/images/logo-principal.svg";
import { reopenCookieConsent } from "./CookieConsentBanner";

interface FooterProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const t = useTranslation(language);

  const [logoConfig, setLogoConfig] = React.useState<LogoConfig>(
    getLogoConfig()
  );

  React.useEffect(() => {
    const handleStorageChange = () => {
      setLogoConfig(getLogoConfig());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("capin_content_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("capin_content_updated", handleStorageChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getLogoBgClass = () => {
    switch (logoConfig.bgColor) {
      case "dark":
        return "bg-black/90";
      case "white":
        return "bg-white";
      case "transparent":
        return "bg-transparent";
      case "blue":
      default:
        return "bg-blue-600";
    }
  };

  return (
    <footer
      id="main-footer"
      className={`border-t transition-colors relative overflow-hidden ${
        theme === "dark"
          ? "bg-black/80 border-white/10 text-zinc-400"
          : "bg-slate-50/90 border-slate-200 text-slate-600"
      }`}
    >
      {/* Halo lumineux d'arrière-plan */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* =========================================================
              1. BRAND, PILLIERS & STACK (2 Cols sur large écran)
          ========================================================= */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div
                id="footer-logo"
                style={{
                  borderRadius:
                    logoConfig.borderRadius >= 999
                      ? "9999px"
                      : `${logoConfig.borderRadius}px`,
                  padding: "0px",
                }}
                className={`w-10 h-10 ${getLogoBgClass()} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30 overflow-hidden relative border border-white/20 shrink-0`}
              >
                <img
                  src={logoPrincipal}
                  alt="Logo Capin Akpado"
                  className="w-full h-full object-cover"
                />
              </div>

              <span
                className={`font-semibold tracking-normal text-base font-sans ${
                  theme === "dark" ? "text-zinc-100" : "text-slate-800"
                }`}
              >
                Capin <span className="text-blue-500 font-bold">Akpado</span>
              </span>
            </div>

            {/* Subtitle / Value proposition */}
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footer.roleTitle}. {t.hero.subtitle}
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="mailto:contact@capinakpado.com"
                className={`p-2.5 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-blue-500/50 hover:text-blue-400"
                    : "bg-white border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm"
                }`}
                title="Email: contact@capinakpado.com"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-blue-500/50 hover:text-blue-400"
                    : "bg-white border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm"
                }`}
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-blue-500/50 hover:text-blue-400"
                    : "bg-white border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm"
                }`}
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* =========================================================
              2. NAVIGATION STRATÉGIQUE
          ========================================================= */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold font-mono uppercase tracking-wider ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {t.footer.navTitle}
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate("home"); scrollToTop(); }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("services"); scrollToTop(); }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("portfolio"); scrollToTop(); }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("blog"); scrollToTop(); }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("about"); scrollToTop(); }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* =========================================================
              3. EXPERTISES & OUTILS IA
          ========================================================= */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold font-mono uppercase tracking-wider ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {language === "fr" ? "Laboratoire & IA" : "Lab & AI Tools"}
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate("test-ai"); scrollToTop(); }}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium text-blue-500"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{t.nav.testAi}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("guide-ia-pro"); scrollToTop(); }}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium text-blue-500"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.nav.guideIaPro}</span>
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] font-mono text-zinc-500 block">
                  {language === "fr" ? "Solutions :" : "Solutions:"}
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {language === "fr"
                    ? "Web • Mobile • IA • Automatisation • Sur mesure"
                    : "Web • Mobile • AI • Automation • Custom Build"}
                </span>
              </li>
            </ul>
          </div>

          {/* =========================================================
              4. DISPONIBILITÉ & CONTACT PRO
          ========================================================= */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold font-mono uppercase tracking-wider ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {t.footer.contactTitle}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Capin Judicael Akpado
                </p>
                <a
                  href="mailto:contact@capinakpado.com"
                  className="text-blue-500 font-mono hover:underline block pt-0.5"
                >
                  contact@capinakpado.com
                </a>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[11px] border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.nav.statusAvailable}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => { onNavigate("contact"); scrollToTop(); }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.nav.book15min}</span>
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================
            BOTTOM BAR: COPYRIGHT & MENTIONS
        ========================================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Capin Judicael Akpado. {t.footer.rights}</p>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="text-[11px] font-mono text-zinc-500">
              {language === "fr"
                ? "Développeur Fullstack & Intégrateur IA"
                : "Fullstack Developer & AI Specialist"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link
              to={language === "fr" ? "/fr/conditions-utilisation" : "/en/terms-of-use"}
              className="text-[11px] font-medium text-zinc-500 transition-colors hover:text-blue-500"
            >
              {language === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
            </Link>

            <Link
              to={language === "fr" ? "/fr/confidentialite" : "/en/privacy-policy"}
              className="text-[11px] font-medium text-zinc-500 transition-colors hover:text-blue-500"
            >
              {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
            </Link>

            <button
              type="button"
              onClick={reopenCookieConsent}
              className="text-[11px] font-medium text-zinc-500 transition-colors hover:text-blue-500"
            >
              {language === "fr" ? "Gérer mes préférences" : "Manage preferences"}
            </button>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300"
                  : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm"
              }`}
              title={t.footer.scrollTop}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t.footer.scrollTop}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};