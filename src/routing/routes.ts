import type { Language, PageView } from "../types";

/**
 * ============================================================
 * ROUTES PRINCIPALES
 * ============================================================
 *
 * Une seule source de vérité pour les URLs du site.
 *
 * FR :
 * /fr/accueil
 * /fr/a-propos
 * /fr/services
 * /fr/audit-ia
 * /fr/blog
 * /fr/blog/:slug
 *
 * EN :
 * /en/home
 * /en/about
 * /en/services
 * /en/ai-audit
 * /en/blog
 * /en/blog/:slug
 */

export const routeNames = {
  fr: {
    home: "accueil",
    about: "a-propos",
    services: "services",
    portfolio: "portfolio",
    testAi: "audit-ia",
    blog: "blog",
    guideIaPro: "guide-ia-pro",
    contact: "contact",
  },

  en: {
    home: "home",
    about: "about",
    services: "services",
    portfolio: "portfolio",
    testAi: "ai-audit",
    blog: "blog",
    guideIaPro: "ai-pro-guide",
    contact: "contact",
  },
} as const;

/**
 * ============================================================
 * CONVERSION PAGEVIEW → URL
 * ============================================================
 */

export function getPagePath(
  language: Language,
  page: PageView,
  slug?: string
): string {
  const routes = routeNames[language];

  switch (page) {
    case "home":
      return `/${language}/${routes.home}`;

    case "about":
      return `/${language}/${routes.about}`;

    case "services":
      return `/${language}/${routes.services}`;

    case "portfolio":
      return `/${language}/${routes.portfolio}`;

    case "test-ai":
      return `/${language}/${routes.testAi}`;

    case "blog":
      return slug ? `/${language}/${routes.blog}/${slug}` : `/${language}/${routes.blog}`;

    case "guide-ia-pro":
      return `/${language}/${routes.guideIaPro}`;

    case "contact":
      return `/${language}/${routes.contact}`;

    case "dashboard":
      return "/adminboss";

    default:
      return `/${language}/${routes.home}`;
  }
}

/**
 * ============================================================
 * URL → PAGEVIEW
 * ============================================================
 */

export function getPageFromPath(
  pathname: string
): {
  language: Language;
  page: PageView;
  slug?: string;
} | null {
  const normalizedPath = pathname
    .toLowerCase()
    .replace(/\/+$/, "");

  if (normalizedPath === "/adminboss") {
    return {
      language: "fr",
      page: "dashboard",
    };
  }

  if (normalizedPath === "/fr") {
    return {
      language: "fr",
      page: "home",
    };
  }

  if (normalizedPath === "/en") {
    return {
      language: "en",
      page: "home",
    };
  }

  if (normalizedPath.startsWith("/fr/")) {
    const parts = normalizedPath.split("/");
    const section = parts[2];
    const slug = parts[3];

    switch (section) {
      case routeNames.fr.home:
        return { language: "fr", page: "home" };

      case routeNames.fr.about:
        return { language: "fr", page: "about" };

      case routeNames.fr.services:
        return { language: "fr", page: "services" };

      case routeNames.fr.portfolio:
        return { language: "fr", page: "portfolio" };

      case routeNames.fr.testAi:
        return { language: "fr", page: "test-ai" };

      case routeNames.fr.blog:
        return { language: "fr", page: "blog", slug };

      case routeNames.fr.guideIaPro:
        return { language: "fr", page: "guide-ia-pro" };

      case routeNames.fr.contact:
        return { language: "fr", page: "contact" };

      default:
        return null;
    }
  }

  if (normalizedPath.startsWith("/en/")) {
    const parts = normalizedPath.split("/");
    const section = parts[2];
    const slug = parts[3];

    switch (section) {
      case routeNames.en.home:
        return { language: "en", page: "home" };

      case routeNames.en.about:
        return { language: "en", page: "about" };

      case routeNames.en.services:
        return { language: "en", page: "services" };

      case routeNames.en.portfolio:
        return { language: "en", page: "portfolio" };

      case routeNames.en.testAi:
        return { language: "en", page: "test-ai" };

      case routeNames.en.blog:
        return { language: "en", page: "blog", slug };

      case routeNames.en.guideIaPro:
        return { language: "en", page: "guide-ia-pro" };

      case routeNames.en.contact:
        return { language: "en", page: "contact" };

      default:
        return null;
    }
  }

  return null;
}