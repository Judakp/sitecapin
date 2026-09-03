import React from "react";
import { Cpu, ArrowUp, Mail, Linkedin, Github, Sparkles, BookOpen } from "lucide-react";
import { Language, ThemeMode, PageView, LogoConfig } from "../types";
import { useTranslation } from "../data/translations";
import { getLogoConfig } from "../data/contentStore";

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
  const [logoConfig, setLogoConfig] = React.useState<LogoConfig>(getLogoConfig());

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      className={`border-t transition-colors ${
        theme === "dark"
          ? "bg-black/60 border-white/10 text-zinc-400"
          : "bg-slate-50/80 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission: Capin Akpado */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  borderRadius: logoConfig.borderRadius >= 999 ? "9999px" : `${logoConfig.borderRadius}px`,
                  padding: `${logoConfig.padding}px`,
                }}
                className={`w-9 h-9 ${getLogoBgClass()} flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-600/30 overflow-hidden relative border border-white/20 shrink-0`}
              >
                {logoConfig.url ? (
                  <img
                    src={logoConfig.url}
                    alt="Logo Capin Akpado"
                    style={{
                      objectFit: logoConfig.fit,
                    }}
                    className="w-full h-full"
                  />
                ) : (
                  <Cpu className="w-5 h-5" />
                )}
              </div>
              <span className={`font-semibold tracking-normal text-base font-sans ${
                theme === "dark" ? "text-zinc-100" : "text-slate-800"
              }`}>
                Capin <span className="text-blue-500 font-bold">Akpado</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm max-w-md leading-relaxed">
              {t.footer.roleTitle}. {t.hero.subtitle}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:judicaelakpado@gmail.com"
                className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                title="Email: judicaelakpado@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate("home");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("services");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("portfolio");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("test-ai");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors flex items-center gap-1 font-semibold text-blue-500"
                >
                  <Sparkles className="w-3 h-3" />
                  {t.nav.testAi}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("guide-ia-pro");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors flex items-center gap-1 font-semibold text-blue-500"
                >
                  <BookOpen className="w-3 h-3" />
                  {t.nav.guideIaPro}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("blog");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("about");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors font-medium text-blue-400"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("contact");
                    scrollToTop();
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Status */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="font-semibold">Capin Judicael Akpado</p>
              <p className="text-blue-500 font-mono">judicaelakpado@gmail.com</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[11px] border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.nav.statusAvailable}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Capin Judicael Akpado. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-zinc-500">
              {t.footer.geminiPowered}
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-xl glass-card hover:bg-white/10 transition-colors"
              title={t.footer.scrollTop}
            >
              <ArrowUp className="w-4 h-4" />
              <span>{t.footer.scrollTop}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
