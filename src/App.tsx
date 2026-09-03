/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Playground } from "./components/Playground";
import { Blog } from "./components/Blog";
import { NewsletterGuide } from "./components/NewsletterGuide";
import { ContactSection } from "./components/ContactSection";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { PageView, Language, ThemeMode } from "./types";

// Helper to check if URL targets the secret /adminboss route
const isAdminBossRoute = (): boolean => {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path === "/adminboss" ||
    path.endsWith("/adminboss") ||
    hash === "#adminboss" ||
    hash === "#/adminboss" ||
    search.includes("page=adminboss")
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    return isAdminBossRoute() ? "dashboard" : "home";
  });
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [playgroundInitialTab, setPlaygroundInitialTab] = useState<"automation" | "web_architect" | "studio_app">("automation");
  const [contactPrefilledMessage, setContactPrefilledMessage] = useState<string>("");

  // Sync with URL changes (/adminboss or hash)
  useEffect(() => {
    const handleUrlChange = () => {
      if (isAdminBossRoute()) {
        setCurrentPage("dashboard");
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  // Sync theme with document element for CSS variables & Tailwind
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

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    if (page === "dashboard") {
      try {
        window.history.pushState(null, "", "/adminboss");
      } catch {
        window.location.hash = "adminboss";
      }
    } else if (isAdminBossRoute()) {
      try {
        window.history.pushState(null, "", "/");
      } catch {
        window.location.hash = page;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPlaygroundTab = (tab: "automation" | "web_architect" | "studio_app") => {
    setPlaygroundInitialTab(tab);
    setCurrentPage("test-ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendToContact = (blueprintText: string) => {
    setContactPrefilledMessage(blueprintText);
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="app-root"
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#09090B] text-slate-100 selection:bg-blue-600 selection:text-white"
          : "bg-[#F8FAFC] text-slate-900 selection:bg-blue-500 selection:text-white"
      }`}
    >
      {/* Ambient Frosted Glass Mesh Background */}
      <div className="mesh-bg-fixed" aria-hidden="true" />

      {/* Header with Navigation, Explicit Language Selector & Theme Controls */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Distinct View Container */}
      <main className="relative z-10 pt-20">
        {currentPage === "home" && (
          <Home
            language={language}
            theme={theme}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "about" && (
          <About
            language={language}
            theme={theme}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "services" && (
          <Services
            language={language}
            theme={theme}
            onSelectPlaygroundTab={handleSelectPlaygroundTab}
            onNavigateToContact={() => handleNavigate("contact")}
            onNavigateToPage={handleNavigate}
          />
        )}

        {currentPage === "portfolio" && (
          <Portfolio
            language={language}
            theme={theme}
            onContactClick={() => handleNavigate("contact")}
          />
        )}

        {currentPage === "test-ai" && (
          <Playground
            language={language}
            theme={theme}
            initialTab={playgroundInitialTab}
            onSendToContact={handleSendToContact}
          />
        )}

        {currentPage === "guide-ia-pro" && (
          <NewsletterGuide
            language={language}
            theme={theme}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "blog" && (
          <Blog
            language={language}
            theme={theme}
            onContactClick={() => handleNavigate("contact")}
          />
        )}

        {currentPage === "contact" && (
          <ContactSection
            language={language}
            theme={theme}
            prefilledMessage={contactPrefilledMessage}
          />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            language={language}
            theme={theme}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        theme={theme}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
