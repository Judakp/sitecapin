/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

import { Language, PageView, ThemeMode } from "./types";
import { getPageFromPath, getPagePath } from "./routing/routes";
import { detectBrowserLanguage } from "./routing/language";

/**
 * ============================================================
 * CHARGEMENT DIFFÉRÉ DES PAGES
 * ============================================================
 *
 * Chaque page est chargée uniquement lorsqu'elle est nécessaire.
 *
 * Cela évite notamment de charger dès la page d'accueil :
 * - le Playground IA
 * - le Dashboard
 * - Tiptap
 * - les pages du blog
 * - les pages de services détaillées
 * - les autres composants lourds
 *
 * Header et Footer restent chargés immédiatement car ils sont
 * présents sur pratiquement toutes les pages.
 */

const Home = lazy(() =>
  import("./components/Home").then((module) => ({
    default: module.Home,
  }))
);

const About = lazy(() =>
  import("./components/About").then((module) => ({
    default: module.About,
  }))
);

const Services = lazy(() =>
  import("./components/Services").then((module) => ({
    default: module.Services,
  }))
);

const ServiceDetail = lazy(() =>
  import("./components/ServiceDetail").then((module) => ({
    default: module.ServiceDetail,
  }))
);

const Portfolio = lazy(() =>
  import("./components/Portfolio").then((module) => ({
    default: module.Portfolio,
  }))
);

const Playground = lazy(() =>
  import("./components/Playground").then((module) => ({
    default: module.Playground,
  }))
);

const Blog = lazy(() =>
  import("./components/Blog").then((module) => ({
    default: module.Blog,
  }))
);

const BlogArticle = lazy(() =>
  import("./components/BlogArticle").then((module) => ({
    default: module.BlogArticle,
  }))
);

const NewsletterGuide = lazy(() =>
  import("./components/NewsletterGuide").then((module) => ({
    default: module.NewsletterGuide,
  }))
);

const ContactSection = lazy(() =>
  import("./components/ContactSection").then((module) => ({
    default: module.ContactSection,
  }))
);

const Dashboard = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

const LegalPage = lazy(() =>
  import("./components/LegalPage").then((module) => ({
    default: module.LegalPage,
  }))
);

/**
 * ============================================================
 * PAGES PUBLIQUES
 * ============================================================
 */

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
 * FALLBACK DE CHARGEMENT
 * ============================================================
 *
 * Affiché pendant que React télécharge le chunk de la page.
 *
 * Il reste volontairement très léger afin de ne pas ajouter
 * une nouvelle charge importante au chargement initial.
 */

function PageLoadingFallback() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Chargement de la page"
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}

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
 * WRAPPER POUR LA PAGE DÉTAILLÉE DES SERVICES
 * ============================================================
 *
 * Permet de récupérer :slug depuis l'URL.
 */

function ServiceDetailRouteWrapper({
  language,
  theme,
  onNavigate,
  onSelectPlaygroundTab,
}: {
  language: Language;
  theme: ThemeMode;
  onNavigate: (path: string) => void;
  onSelectPlaygroundTab: (
    tab: "automation" | "web_architect" | "studio_app"
  ) => void;
}) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <ServiceDetail
      slug={slug || "agents-ia-autonomes"}
      language={language}
      theme={theme}
      onNavigate={onNavigate}
      onNavigateToContact={() => onNavigate("contact")}
      onSelectPlaygroundTab={onSelectPlaygroundTab}
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

  /**
   * ----------------------------------------------------------
   * DÉTERMINATION DE LA PAGE ET DE LA LANGUE
   * ----------------------------------------------------------
   */

  const routeInfo = getPageFromPath(location.pathname);

  const language: Language = routeInfo?.language ?? "fr";

  const currentPage: PageView =
    routeInfo?.page && PUBLIC_PAGES.includes(routeInfo.page)
      ? routeInfo.page
      : "home";

  /**
   * ----------------------------------------------------------
   * ÉTATS
   * ----------------------------------------------------------
   */

  const [theme, setTheme] = useState<ThemeMode>("dark");

  const [playgroundInitialTab, setPlaygroundInitialTab] = useState<
    "automation" | "web_architect" | "studio_app"
  >("automation");

  const [contactPrefilledMessage, setContactPrefilledMessage] =
    useState<string>("");

  /**
   * ----------------------------------------------------------
   * GESTION DU THÈME
   * ----------------------------------------------------------
   */

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

  /**
   * ----------------------------------------------------------
   * NAVIGATION
   * ----------------------------------------------------------
   *
   * Supporte :
   * - les pages principales
   * - les services dynamiques
   * - les autres chemins dynamiques
   */

  const handleNavigate = (pathOrPage: string) => {
    if (pathOrPage === "dashboard") {
      navigate("/adminboss");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /**
     * Si c'est une page principale connue.
     */
    if (PUBLIC_PAGES.includes(pathOrPage as PageView)) {
      const path = getPagePath(
        language,
        pathOrPage as PageView
      );

      navigate(path);
    } else {
      /**
       * Sinon, on considère qu'il s'agit d'une URL dynamique.
       *
       * Exemple :
       * services/creation-sites-web
       */
      navigate(`/${language}/${pathOrPage}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * ----------------------------------------------------------
   * CHANGEMENT DE LANGUE
   * ----------------------------------------------------------
   */

  const handleToggleLanguage = () => {
    if (currentPage === "dashboard") {
      return;
    }

    const newLanguage: Language =
      language === "fr" ? "en" : "fr";

    /**
     * Si l'utilisateur se trouve sur une page de service
     * détaillée, on conserve le slug.
     */
    if (
      location.pathname.includes("/services/") &&
      !PUBLIC_PAGES.includes(currentPage)
    ) {
      const slug = location.pathname.split("/").pop();

      navigate(
        `/${newLanguage}/services/${slug}`
      );
    } else {
      const newPath = getPagePath(
        newLanguage,
        currentPage
      );

      navigate(newPath);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * ----------------------------------------------------------
   * BASCULE DU THÈME
   * ----------------------------------------------------------
   */

  const handleToggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  /**
   * ----------------------------------------------------------
   * TABULATEUR DE L'AUDIT IA
   * ----------------------------------------------------------
   */

  const handleSelectPlaygroundTab = (
    tab:
      | "automation"
      | "web_architect"
      | "studio_app"
  ) => {
    setPlaygroundInitialTab(tab);

    navigate(
      getPagePath(language, "test-ai")
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * ----------------------------------------------------------
   * ENVOI VERS LE CONTACT
   * ----------------------------------------------------------
   */

  const handleSendToContact = (
    blueprintText: string
  ) => {
    setContactPrefilledMessage(
      blueprintText
    );

    navigate(
      getPagePath(language, "contact")
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * ==========================================================
   * INTERFACE D'ADMINISTRATION
   * ==========================================================
   *
   * Dashboard est lazy-loaded.
   *
   * Ainsi :
   *
   * Visiteur normal
   *      ↓
   * ne télécharge PAS Dashboard
   *
   * /adminboss
   *      ↓
   * Dashboard est téléchargé
   *      ↓
   * Tiptap est téléchargé uniquement à ce moment-là
   */

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
        <Suspense fallback={<PageLoadingFallback />}>
          <Dashboard
            language={language}
            theme={theme}
            onNavigate={handleNavigate}
          />
        </Suspense>
      </div>
    );
  }

  /**
   * ==========================================================
   * SITE PUBLIC
   * ==========================================================
   */

  return (
    <div
      id="app-root"
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#09090B] text-slate-100 selection:bg-blue-600 selection:text-white"
          : "bg-[#F8FAFC] text-slate-900 selection:bg-blue-500 selection:text-white"
      }`}
    >
      <div
        className="mesh-bg-fixed"
        aria-hidden="true"
      />

      {/* 
       * --------------------------------------------------------
       * HEADER
       * --------------------------------------------------------
       *
       * Chargé immédiatement car il est présent sur toutes
       * les pages publiques.
       */}

      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="relative z-10 pt-20">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* ================================================= */}
            {/* FRANÇAIS                                          */}
            {/* ================================================= */}

            <Route
              path="/fr/accueil"
              element={
                <Home
                  language="fr"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            <Route
              path="/fr/a-propos"
              element={
                <About
                  language="fr"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* SERVICES                                          */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/services"
              element={
                <Services
                  language="fr"
                  theme={theme}
                  onSelectPlaygroundTab={
                    handleSelectPlaygroundTab
                  }
                  onNavigateToContact={() =>
                    handleNavigate("contact")
                  }
                  onNavigateToPage={
                    handleNavigate
                  }
                />
              }
            />

            <Route
              path="/fr/services/:slug"
              element={
                <ServiceDetailRouteWrapper
                  language="fr"
                  theme={theme}
                  onNavigate={handleNavigate}
                  onSelectPlaygroundTab={
                    handleSelectPlaygroundTab
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* PORTFOLIO                                         */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/portfolio"
              element={
                <Portfolio
                  language="fr"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* AUDIT IA                                          */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/audit-ia"
              element={
                <Playground
                  language="fr"
                  theme={theme}
                  initialTab={
                    playgroundInitialTab
                  }
                  onSendToContact={
                    handleSendToContact
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* BLOG                                              */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/blog"
              element={
                <Blog
                  language="fr"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            <Route
              path="/fr/blog/:slug"
              element={
                <BlogArticle
                  language="fr"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* GUIDE IA PRO                                      */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/guide-ia-pro"
              element={
                <NewsletterGuide
                  language="fr"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* CONTACT                                           */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/contact"
              element={
                <ContactSection
                  language="fr"
                  theme={theme}
                  prefilledMessage={
                    contactPrefilledMessage
                  }
                />
              }
            />

            {/* ================================================= */}
            {/* ENGLISH                                           */}
            {/* ================================================= */}

            <Route
              path="/en/home"
              element={
                <Home
                  language="en"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            <Route
              path="/en/about"
              element={
                <About
                  language="en"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* SERVICES                                          */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/services"
              element={
                <Services
                  language="en"
                  theme={theme}
                  onSelectPlaygroundTab={
                    handleSelectPlaygroundTab
                  }
                  onNavigateToContact={() =>
                    handleNavigate("contact")
                  }
                  onNavigateToPage={
                    handleNavigate
                  }
                />
              }
            />

            <Route
              path="/en/services/:slug"
              element={
                <ServiceDetailRouteWrapper
                  language="en"
                  theme={theme}
                  onNavigate={handleNavigate}
                  onSelectPlaygroundTab={
                    handleSelectPlaygroundTab
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* PORTFOLIO                                         */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/portfolio"
              element={
                <Portfolio
                  language="en"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* AI AUDIT                                           */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/ai-audit"
              element={
                <Playground
                  language="en"
                  theme={theme}
                  initialTab={
                    playgroundInitialTab
                  }
                  onSendToContact={
                    handleSendToContact
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* BLOG                                              */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/blog"
              element={
                <Blog
                  language="en"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            <Route
              path="/en/blog/:slug"
              element={
                <BlogArticle
                  language="en"
                  theme={theme}
                  onContactClick={() =>
                    handleNavigate("contact")
                  }
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* AI PRO GUIDE                                       */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/ai-pro-guide"
              element={
                <NewsletterGuide
                  language="en"
                  theme={theme}
                  onNavigate={handleNavigate}
                />
              }
            />

            {/* ------------------------------------------------- */}
            {/* CONTACT                                           */}
            {/* ------------------------------------------------- */}

            <Route
              path="/en/contact"
              element={
                <ContactSection
                  language="en"
                  theme={theme}
                  prefilledMessage={
                    contactPrefilledMessage
                  }
                />
              }
            />

            {/* ================================================= */}
            {/* RACCOURCIS & REDIRECTIONS                         */}
            {/* ================================================= */}

            {/* ------------------------------------------------- */}
            {/* PAGES JURIDIQUES                                  */}
            {/* ------------------------------------------------- */}

            <Route
              path="/fr/conditions-utilisation"
              element={
                <LegalPage
                  type="terms"
                  language="fr"
                  theme={theme}
                  onBack={() => handleNavigate("home")}
                />
              }
            />

            <Route
              path="/fr/confidentialite"
              element={
                <LegalPage
                  type="privacy"
                  language="fr"
                  theme={theme}
                  onBack={() => handleNavigate("home")}
                />
              }
            />

            <Route
              path="/en/terms-of-use"
              element={
                <LegalPage
                  type="terms"
                  language="en"
                  theme={theme}
                  onBack={() => handleNavigate("home")}
                />
              }
            />

            <Route
              path="/en/privacy-policy"
              element={
                <LegalPage
                  type="privacy"
                  language="en"
                  theme={theme}
                  onBack={() => handleNavigate("home")}
                />
              }
            />

            <Route
              path="/fr"
              element={
                <Navigate
                  to="/fr/accueil"
                  replace
                />
              }
            />

            <Route
              path="/en"
              element={
                <Navigate
                  to="/en/home"
                  replace
                />
              }
            />

            <Route
              path="/"
              element={<RootRedirect />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to={
                    language === "en"
                      ? "/en/home"
                      : "/fr/accueil"
                  }
                  replace
                />
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer
        language={language}
        theme={theme}
        onNavigate={handleNavigate}
      />

      <CookieConsentBanner language={language} />
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