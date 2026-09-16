import { BlogPost, Language, LogoConfig, ServiceItem, CaseStudy, NewsletterSubscriber } from "../types";
import { blogPostsFr, blogPostsEn } from "./blogData";
import { servicesDataFr, servicesDataEn, caseStudiesDataFr, caseStudiesDataEn } from "./portfolioData";

export interface SiteSettings {
  authorName: string;
  authorRoleFr: string;
  authorRoleEn: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  whatsappUrl: string;
  bookingUrl: string;
  
  // Home Page
  homeHeroTitleFr: string;
  homeHeroTitleEn: string;
  homeHeroSubtitleFr: string;
  homeHeroSubtitleEn: string;
  homeCtaPrimaryFr: string;
  homeCtaPrimaryEn: string;
  homeCtaSecondaryFr: string;
  homeCtaSecondaryEn: string;
  metric1Val: string;
  metric1LabelFr: string;
  metric1LabelEn: string;
  metric2Val: string;
  metric2LabelFr: string;
  metric2LabelEn: string;
  metric3Val: string;
  metric3LabelFr: string;
  metric3LabelEn: string;
  
  // About Page
  aboutRoleFr: string;
  aboutRoleEn: string;
  aboutShortBioFr: string;
  aboutShortBioEn: string;
  aboutBioFr: string;
  aboutBioEn: string;
  aboutPhilosophyFr: string;
  aboutPhilosophyEn: string;
  aboutExperienceYears: string;
  aboutCompletedProjects: string;
  aboutSatisfactionRate: string;

  // Contact Page
  contactPitchFr: string;
  contactPitchEn: string;
  responseTimeFr: string;
  responseTimeEn: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  authorName: "Capin Judicael Akpado",
  authorRoleFr: "Développeur web, mobile et IA",
  authorRoleEn: "Web, mobile, and AI developer",
  email: "contact@capinakpado.com",
  phone: "+229 01 67 33 73 85",
  location: "Cotonou, Bénin / International (Distanciel)",
  linkedinUrl: "https://www.linkedin.com/in/capin-judica%C3%ABl-akpado-4a4780163/",
  githubUrl: "https://github.com/Judakp",
  whatsappUrl: "https://wa.me/2290167337385",
  bookingUrl: "https://calendly.com/capinakpado109",

  // Home Page Defaults
  homeHeroTitleFr: "Conception de sites web, applications mobiles  et agents IA.",
  homeHeroTitleEn: "Website, Mobile App & AI Agent Engineering",
  homeHeroSubtitleFr: "De la création de sites et d'applications web/mobiles au déploiement d'agents IA autonomes, je conçois des solutions logicielles robustes qui éliminent vos tâches répétitives et valorisent votre activité.",
  homeHeroSubtitleEn: "From custom website and web/mobile app development to deploying autonomous AI agents, I build robust software solutions that eliminate repetitive tasks and scale your business.",
  homeCtaPrimaryFr: "Explorer les Services",
  homeCtaPrimaryEn: "Explore Services",
  homeCtaSecondaryFr: "Analyser mon projet",
  homeCtaSecondaryEn: "Get my project diagnostic",
  metric1Val: "+15h",
  metric1LabelFr: "Économisées / semaine",
  metric1LabelEn: "Saved / week",
  metric2Val: "< 14j",
  metric2LabelFr: "Délai moyen de livraison",
  metric2LabelEn: "Avg delivery time",
  metric3Val: "100%",
  metric3LabelFr: "Code typé & Pérenne",
  metric3LabelEn: "Type-safe & Scalable",

  // About Page Defaults
  aboutRoleFr: "Architecte Solutions Web & Intelligence Artificielle",
  aboutRoleEn: "AI Solutions & Web Architect",
  aboutShortBioFr: "Ingénieur passionné par la convergence entre développement web moderne (React 19, TypeScript) et intelligence artificielle appliquée. J'accompagne les entreprises dans la création de solutions logicielles qui automatisent leurs processus clés.",
  aboutShortBioEn: "Engineer passionate about the convergence between modern web development (React 19, TypeScript) and applied artificial intelligence. I empower companies to craft digital solutions that automate their core operations.",
  aboutBioFr: "Spécialiste de la conception d'applications web d'élite et du déploiement d'agents IA autonomes. J'aide les dirigeants, startups et équipes ambitieuses à automatiser leurs processus métiers critiques et à accélérer leur croissance grâce à des solutions robustes, esthétiques et pérennes.",
  aboutBioEn: "Specialist in engineering elite web applications and deploying autonomous AI agents. I empower founders, SMBs, and modern teams to automate high-friction workflows and scale their digital capabilities through robust, elegant software.",
  aboutPhilosophyFr: "Je crois en une ingénierie pragmatique : chaque ligne de code et chaque agent IA doit résoudre un problème réel, générer un gain de temps tangible et s'intégrer harmonieusement dans votre écosystème.",
  aboutPhilosophyEn: "I believe in pragmatic engineering: every line of code and AI agent must solve a real business challenge, deliver measurable ROI, and seamlessly integrate into your workflow.",
  aboutExperienceYears: "+5 ans",
  aboutCompletedProjects: "40+ projets",
  aboutSatisfactionRate: "100%",

  // Contact Page Defaults
  responseTimeFr: "Réponse garantie sous 24 heures ouvrées",
  responseTimeEn: "Guaranteed response within 24 business hours",
  contactPitchFr: "Un projet web ambitieux ou un besoin d'automatisation IA ? Échangeons directement sur vos objectifs pour concevoir une solution sur-mesure.",
  contactPitchEn: "Have an ambitious web project or need AI automation? Let's discuss your objectives to craft a tailor-made, high-impact solution.",
};

const DEFAULT_LOGO_CONFIG: LogoConfig = {
  url: "",
  fit: "contain",
  padding: 3,
  bgColor: "blue",
  borderRadius: 12,
};

// --- Logo Storage ---
export function getLogoConfig(): LogoConfig {
  try {
    const raw = localStorage.getItem("capin_logo_config");
    if (raw) {
      return { ...DEFAULT_LOGO_CONFIG, ...JSON.parse(raw) };
    }
    // Backward compatibility for simple URL string
    const legacyUrl = localStorage.getItem("capin_custom_logo");
    if (legacyUrl) {
      return { ...DEFAULT_LOGO_CONFIG, url: legacyUrl };
    }
  } catch {
    // fallback
  }
  return DEFAULT_LOGO_CONFIG;
}

export function saveLogoConfig(config: LogoConfig): void {
  try {
    localStorage.setItem("capin_logo_config", JSON.stringify(config));
    if (config.url) {
      localStorage.setItem("capin_custom_logo", config.url);
    } else {
      localStorage.removeItem("capin_custom_logo");
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "logo" } }));
  } catch (e) {
    console.error("Failed to save logo config:", e);
  }
}

// --- Profile Photo Storage ---
export function getProfilePhoto(): string {
  try {
    return localStorage.getItem("capin_profile_photo") || "";
  } catch {
    return "";
  }
}

export function saveProfilePhoto(url: string): void {
  try {
    if (url) {
      localStorage.setItem("capin_profile_photo", url);
    } else {
      localStorage.removeItem("capin_profile_photo");
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "photo" } }));
  } catch (e) {
    console.error("Failed to save profile photo:", e);
  }
}

// --- Site Settings Storage ---
export function getSiteSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem("capin_site_settings");
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SETTINGS;
}

export function saveSiteSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem("capin_site_settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "settings" } }));
  } catch (e) {
    console.error("Failed to save site settings:", e);
  }
}

// --- Blog Posts Storage ---
export function getStoredBlogPosts(lang: Language): BlogPost[] {
  try {
    const storageKey = `capin_blog_posts_${lang}`;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return lang === "en" ? blogPostsEn : blogPostsFr;
}

export function saveBlogPost(post: BlogPost, lang: Language): void {
  try {
    const storageKey = `capin_blog_posts_${lang}`;
    const current = getStoredBlogPosts(lang);
    const existingIndex = current.findIndex((p) => p.id === post.id);

    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...current];
    }

    localStorage.setItem(storageKey, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "blog", lang } }));
  } catch (e) {
    console.error("Failed to save blog post:", e);
  }
}

export function deleteBlogPost(id: string, lang: Language): void {
  try {
    const storageKey = `capin_blog_posts_${lang}`;
    const current = getStoredBlogPosts(lang);
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "blog", lang } }));
  } catch (e) {
    console.error("Failed to delete blog post:", e);
  }
}

export function resetBlogPosts(lang?: Language): void {
  try {
    if (lang) {
      localStorage.removeItem(`capin_blog_posts_${lang}`);
    } else {
      localStorage.removeItem("capin_blog_posts_fr");
      localStorage.removeItem("capin_blog_posts_en");
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "blog" } }));
  } catch (e) {
    console.error("Failed to reset blog posts:", e);
  }
}

// --- Services Storage ---
export function getStoredServices(lang: Language): ServiceItem[] {
  try {
    const raw = localStorage.getItem(`capin_services_${lang}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return lang === "en" ? servicesDataEn : servicesDataFr;
}

export function saveServices(services: ServiceItem[], lang: Language): void {
  try {
    localStorage.setItem(`capin_services_${lang}`, JSON.stringify(services));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "services", lang } }));
  } catch (e) {
    console.error("Failed to save services:", e);
  }
}

// --- Case Studies Storage ---
export function getStoredCaseStudies(lang: Language): CaseStudy[] {
  try {
    const raw = localStorage.getItem(`capin_case_studies_${lang}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return lang === "en" ? caseStudiesDataEn : caseStudiesDataFr;
}

export function saveCaseStudies(cases: CaseStudy[], lang: Language): void {
  try {
    localStorage.setItem(`capin_case_studies_${lang}`, JSON.stringify(cases));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "cases", lang } }));
  } catch (e) {
    console.error("Failed to save case studies:", e);
  }
}

// --- Newsletter Subscribers Storage ---
const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "sub-1",
    email: "contact.entreprise@innovgroup.fr",
    name: "Marc Dupuis",
    businessType: "Dirigeant PME Conseil",
    subscribedAt: "2026-02-18T09:30:00.000Z",
    source: "presentation_page",
  },
  {
    id: "sub-2",
    email: "sarah.b@scaleup-tech.io",
    name: "Sarah Benali",
    businessType: "Fondatrice E-commerce & SaaS",
    subscribedAt: "2026-02-22T14:15:00.000Z",
    source: "presentation_page",
  },
];

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem("capin_newsletter_subscribers");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_SUBSCRIBERS;
}

export function saveNewsletterSubscriber(subscriber: Omit<NewsletterSubscriber, "id" | "subscribedAt">): NewsletterSubscriber {
  const current = getNewsletterSubscribers();
  const newSub: NewsletterSubscriber = {
    ...subscriber,
    id: `sub-${Date.now()}`,
    subscribedAt: new Date().toISOString(),
  };
  const updated = [newSub, ...current.filter((s) => s.email.toLowerCase() !== subscriber.email.toLowerCase())];
  try {
    localStorage.setItem("capin_newsletter_subscribers", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "newsletter" } }));
  } catch (e) {
    console.error("Failed to save newsletter subscriber:", e);
  }
  return newSub;
}

export function deleteNewsletterSubscriber(id: string): void {
  const current = getNewsletterSubscribers();
  const updated = current.filter((s) => s.id !== id);
  try {
    localStorage.setItem("capin_newsletter_subscribers", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "newsletter" } }));
  } catch (e) {
    console.error("Failed to delete subscriber:", e);
  }
}

// --- Export / Import Backup ---
export function exportAllData(): string {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    logoConfig: getLogoConfig(),
    profilePhoto: getProfilePhoto(),
    settings: getSiteSettings(),
    blogPostsFr: getStoredBlogPosts("fr"),
    blogPostsEn: getStoredBlogPosts("en"),
    servicesFr: getStoredServices("fr"),
    servicesEn: getStoredServices("en"),
    caseStudiesFr: getStoredCaseStudies("fr"),
    caseStudiesEn: getStoredCaseStudies("en"),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.logoConfig) localStorage.setItem("capin_logo_config", JSON.stringify(parsed.logoConfig));
    if (parsed.profilePhoto) localStorage.setItem("capin_profile_photo", parsed.profilePhoto);
    if (parsed.settings) localStorage.setItem("capin_site_settings", JSON.stringify(parsed.settings));
    if (parsed.blogPostsFr) localStorage.setItem("capin_blog_posts_fr", JSON.stringify(parsed.blogPostsFr));
    if (parsed.blogPostsEn) localStorage.setItem("capin_blog_posts_en", JSON.stringify(parsed.blogPostsEn));
    if (parsed.servicesFr) localStorage.setItem("capin_services_fr", JSON.stringify(parsed.servicesFr));
    if (parsed.servicesEn) localStorage.setItem("capin_services_en", JSON.stringify(parsed.servicesEn));
    if (parsed.caseStudiesFr) localStorage.setItem("capin_case_studies_fr", JSON.stringify(parsed.caseStudiesFr));
    if (parsed.caseStudiesEn) localStorage.setItem("capin_case_studies_en", JSON.stringify(parsed.caseStudiesEn));

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("capin_content_updated", { detail: { type: "all" } }));
    return true;
  } catch (e) {
    console.error("Import error:", e);
    return false;
  }
}
