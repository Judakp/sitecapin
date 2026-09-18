/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Playground } from "./components/Playground";
import { Blog } from "./components/Blog";
import { BlogArticle } from "./components/BlogArticle";
import { NewsletterGuide } from "./components/NewsletterGuide";
import { ContactSection } from "./components/ContactSection";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";

import { Language, PageView, ThemeMode } from "./types";
import { getPageFromPath, getPagePath } from "./routing/routes";
import { detectBrowserLanguage } from "./routing/language";

const PUBLIC_PAGES: PageView[] = [
  "home",
  "about",
  "services",
  "portfolio",
  "test-ai",
  "blog",
  "guide-ia-pro",
  "contact",
];

/**
 * ============================================================
 * REDIRECTION INTELLIGENTE À LA RACINE ( / )
 * ============================================================
 */
function RootRedirect() {
  const language = detectBrowserLanguage();
  return (
    <Navigate
      to={language === "fr" ? "/fr/accueil" : "/en/home"}
      replace
    />
  );
}

/**
 * ============================================================
 * APPLICATION INTERNE
 * ============================================================
 */
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Déterminer la page et la langue à partir de l'URL
  const routeInfo = getPageFromPath(location.pathname);
  const language: Language = routeInfo?.language ?? "fr";
  const currentPage: PageView =
    routeInfo?.page && PUBLIC_PAGES.includes(routeInfo.page)
      ? routeInfo.page
      : "home";

  // États qui ne concernent pas directement l'URL
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [playgroundInitialTab, setPlaygroundInitialTab] = useState<
    "automation" | "web_architect" | "studio_app"
  >("automation");
  const [contactPrefilledMessage, setContactPrefilledMessage] = useState<string>("");

  // Gestion du Thème
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#F8FAFC";
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.style.backgroundColor = "#09090B";
    }
  }, [theme]);

  // Navigation
  const handleNavigate = (page: PageView) => {
    if (page === "dashboard") {
      navigate("/adminboss");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const path = getPagePath(language, page);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Changement de langue
  const handleToggleLanguage = () => {
    if (currentPage === "dashboard") return;
    
    const newLanguage: Language = language === "fr" ? "en" : "fr";
    const newPath = getPagePath(newLanguage, currentPage);
    
    navigate(newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Bascule Thème
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Tabulateur de l'Audit IA
  const handleSelectPlaygroundTab = (
    tab: "automation" | "web_architect" | "studio_app"
  ) => {
    setPlaygroundInitialTab(tab);
    navigate(getPagePath(language, "test-ai"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Envoi vers le Contact
  const handleSendToContact = (blueprintText: string) => {
    setContactPrefilledMessage(blueprintText);
    navigate(getPagePath(language, "contact"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Interface d'Administration
  if (location.pathname === "/adminboss") {
    return (
      <div
        id="app-root"
        className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
          theme === "dark"
            ? "bg-[#09090B] text-slate-100"
            : "bg-[#F8FAFC] text-slate-900"
        }`}
      >
        <Dashboard
          language={language}
          theme={theme}
          onNavigate={handleNavigate}
        />
      </div>
    );
  }

  // Site Public
  return (
    <div
      id="app-root"
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#09090B] text-slate-100 selection:bg-blue-600 selection:text-white"
          : "bg-[#F8FAFC] text-slate-900 selection:bg-blue-500 selection:text-white"
      }`}
    >
      <div className="mesh-bg-fixed" aria-hidden="true" />

      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="relative z-10 pt-20">
        <Routes>
          {/* ------------------------------------------------ */}
          {/* FRANÇAIS                                         */}
          {/* ------------------------------------------------ */}
          <Route path="/fr/accueil" element={<Home language="fr" theme={theme} onNavigate={handleNavigate} />} />
          <Route path="/fr/a-propos" element={<About language="fr" theme={theme} onNavigate={handleNavigate} />} />
          <Route
            path="/fr/services"
            element={<Services language="fr" theme={theme} onSelectPlaygroundTab={handleSelectPlaygroundTab} onNavigateToContact={() => handleNavigate("contact")} onNavigateToPage={handleNavigate} />}
          />
          <Route path="/fr/portfolio" element={<Portfolio language="fr" theme={theme} onContactClick={() => handleNavigate("contact")} />} />
          
          <Route
            path="/fr/audit-ia"
            element={<Playground language="fr" theme={theme} initialTab={playgroundInitialTab} onSendToContact={handleSendToContact} />}
          />
          
          <Route path="/fr/blog" element={<Blog language="fr" theme={theme} onContactClick={() => handleNavigate("contact")} />} />
          <Route
            path="/fr/blog/:slug"
            element={<BlogArticle language="fr" theme={theme} onContactClick={() => handleNavigate("contact")} />}
          />
          
          <Route path="/fr/guide-ia-pro" element={<NewsletterGuide language="fr" theme={theme} onNavigate={handleNavigate} />} />
          <Route path="/fr/contact" element={<ContactSection language="fr" theme={theme} prefilledMessage={contactPrefilledMessage} />} />

          {/* ------------------------------------------------ */}
          {/* ENGLISH                                          */}
          {/* ------------------------------------------------ */}
          <Route path="/en/home" element={<Home language="en" theme={theme} onNavigate={handleNavigate} />} />
          <Route path="/en/about" element={<About language="en" theme={theme} onNavigate={handleNavigate} />} />
          <Route
            path="/en/services"
            element={<Services language="en" theme={theme} onSelectPlaygroundTab={handleSelectPlaygroundTab} onNavigateToContact={() => handleNavigate("contact")} onNavigateToPage={handleNavigate} />}
          />
          <Route path="/en/portfolio" element={<Portfolio language="en" theme={theme} onContactClick={() => handleNavigate("contact")} />} />
          
          <Route
            path="/en/ai-audit"
            element={<Playground language="en" theme={theme} initialTab={playgroundInitialTab} onSendToContact={handleSendToContact} />}
          />
          
          <Route path="/en/blog" element={<Blog language="en" theme={theme} onContactClick={() => handleNavigate("contact")} />} />
          <Route
            path="/en/blog/:slug"
            element={<BlogArticle language="en" theme={theme} onContactClick={() => handleNavigate("contact")} />}
          />
          
          <Route path="/en/ai-pro-guide" element={<NewsletterGuide language="en" theme={theme} onNavigate={handleNavigate} />} />
          <Route path="/en/contact" element={<ContactSection language="en" theme={theme} prefilledMessage={contactPrefilledMessage} />} />

          {/* ------------------------------------------------ */}
          {/* RACCOURCIS & REDIRECTIONS                        */}
          {/* ------------------------------------------------ */}
          <Route path="/fr" element={<Navigate to="/fr/accueil" replace />} />
          <Route path="/en" element={<Navigate to="/en/home" replace />} />
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to={language === "en" ? "/en/home" : "/fr/accueil"} replace />} />
        </Routes>
      </main>

      <Footer language={language} theme={theme} onNavigate={handleNavigate} />
    </div>
  );
}

/**
 * ============================================================
 * ROOT APP
 * ============================================================
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}