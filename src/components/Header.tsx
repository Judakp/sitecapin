import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Menu,
  X,
  ArrowUpRight,
  Cpu,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import { Language, ThemeMode, PageView, LogoConfig } from "../types";
import { useTranslation } from "../data/translations";
import { getLogoConfig } from "../data/contentStore";
import logoPrincipal from "../assets/images/logo-principal.svg";

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(getLogoConfig());

  const t = useTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for storage changes across windows/components
  useEffect(() => {
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

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems: {
    id: PageView;
    label: string;
    icon?: React.ReactNode;
  }[] = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "portfolio", label: t.nav.portfolio },
    {
      id: "test-ai",
      label: t.nav.testAi,
      icon: (
        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
      ),
    },
    { id: "blog", label: t.nav.blog },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  // Background style helper for logo container
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
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60 py-3"
            : "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-200/40 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Identity: Capin Akpado */}
          <div className="flex items-center gap-3">
            <button
  id="logo-icon-button"
  type="button"
  onClick={() => handleNavClick("home")}
  title="Capin Akpado"
  style={{
    borderRadius:
      logoConfig.borderRadius >= 999
        ? "9999px"
        : `${logoConfig.borderRadius}px`,
    padding: "0px",
  }}
  className={`w-10 h-10 ${getLogoBgClass()} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30 hover:scale-105 transition-all border border-white/20 overflow-hidden relative group cursor-pointer shrink-0`}
>
  <img
    src={logoPrincipal}
    alt="Logo Capin Akpado"
    className="w-full h-full object-cover"
  />
</button>
            <button
              id="logo-text-button"
              onClick={() => handleNavClick("home")}
              className="text-left group transition-all flex items-center gap-2"
            >
              <span
                className={`font-semibold tracking-normal text-sm sm:text-[15px] font-sans transition-colors ${
                  theme === "dark"
                    ? "text-zinc-100 group-hover:text-white"
                    : "text-slate-800 group-hover:text-slate-900"
                }`}
              >
                Capin <span className="text-blue-500 font-bold">Akpado</span>
              </span>

              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/30">
                {t.nav.role}
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav
            id="desktop-navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-xl transition-colors ${
              theme === "dark"
                ? "bg-white/[0.03] border-white/10 shadow-lg shadow-black/20"
                : "bg-white/70 border-slate-200 shadow-md shadow-slate-200/50"
            }`}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isTestAi = item.id === "test-ai";

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all font-medium flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                      : isTestAi
                      ? "text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20"
                      : theme === "dark"
                      ? "text-zinc-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Explicit Language Switcher, Theme & Primary CTA */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Highly Explicit Dual Language Switcher: 🇫🇷 FR | 🇬🇧 EN */}
            <div
              id="header-language-selector"
              className={`flex items-center p-1 rounded-full border transition-all ${
                theme === "dark"
                  ? "glass-card border-white/10 bg-white/[0.03]"
                  : "bg-white/80 border-slate-200 shadow-sm"
              }`}
              title={
                language === "fr"
                  ? "Changer de langue : Français / Anglais"
                  : "Change language: French / English"
              }
            >
              <button
                type="button"
                onClick={() => {
                  if (language !== "fr") onToggleLanguage();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  language === "fr"
                    ? "bg-blue-600 text-white shadow-sm"
                    : theme === "dark"
                    ? "text-zinc-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>🇫🇷 FR</span>
              </button>

              <span className="text-zinc-500 text-[10px] px-0.5">/</span>

              <button
                type="button"
                onClick={() => {
                  if (language !== "en") onToggleLanguage();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  language === "en"
                    ? "bg-blue-600 text-white shadow-sm"
                    : theme === "dark"
                    ? "text-zinc-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>EN EN</span>
              </button>
            </div>

            {/* Theme Switcher Button (Dark / Light) */}
            <button
              id="header-theme-toggle"
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all ${
                theme === "dark"
                  ? "glass-card text-amber-300 hover:text-amber-200 hover:bg-white/10 border-white/10"
                  : "bg-white/80 text-slate-700 hover:text-blue-600 border-slate-200 shadow-sm"
              }`}
              title={
                theme === "dark"
                  ? t.nav.switchThemeLight
                  : t.nav.switchThemeDark
              }
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Primary Action Button: Le Guide IA Pro */}
            <button
              id="header-cta-guide-ia-pro"
              onClick={() => handleNavClick("guide-ia-pro")}
              className="relative group overflow-hidden px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-200" />
              <span>
                {t.nav.guideIaProShort || t.nav.guideIaPro}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu & Quick Controls */}
          <div className="flex items-center gap-2 md:hidden">
            
            {/* Mobile Explicit Language Switcher */}
            <div
              className={`flex items-center p-0.5 rounded-lg border text-xs font-mono font-bold ${
                theme === "dark"
                  ? "glass-card border-white/10"
                  : "bg-white border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  if (language !== "fr") onToggleLanguage();
                }}
                className={`px-2 py-1 rounded-md text-[11px] ${
                  language === "fr"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-zinc-400"
                }`}
              >
                FR
              </button>

              <button
                type="button"
                onClick={() => {
                  if (language !== "en") onToggleLanguage();
                }}
                className={`px-2 py-1 rounded-md text-[11px] ${
                  language === "en"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-zinc-400"
                }`}
              >
                EN
              </button>
            </div>

            <button
              id="mobile-theme-toggle"
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border ${
                theme === "dark"
                  ? "glass-card text-amber-300 border-white/10"
                  : "bg-white text-slate-800 border-slate-200"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                theme === "dark"
                  ? "glass-card text-zinc-300 border-white/10"
                  : "bg-white text-slate-800 border-slate-200"
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-dropdown"
            className={`md:hidden mt-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 ${
              theme === "dark"
                ? "bg-black/95 border-white/10 text-white"
                : "bg-white/95 border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white font-bold"
                        : theme === "dark"
                        ? "text-zinc-200 hover:bg-white/5"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>

                    {item.id === "test-ai" && !isActive && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600/20 text-blue-400">
                        Live
                      </span>
                    )}
                  </button>
                );
              })}

              <div
                className={`pt-3 mt-2 border-t flex flex-col gap-2 ${
                  theme === "dark"
                    ? "border-zinc-800"
                    : "border-slate-200"
                }`}
              >
                <button
                  id="mobile-nav-guide"
                  onClick={() => handleNavClick("guide-ia-pro")}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {t.nav.guideIaProShort || t.nav.guideIaPro}
                  </span>
                </button>

                <button
                  id="mobile-nav-book"
                  onClick={() => handleNavClick("contact")}
                  className={`w-full py-2.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "border-zinc-700 hover:bg-zinc-800 text-zinc-200"
                      : "border-slate-300 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.book15min}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};