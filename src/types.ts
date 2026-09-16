export type Language = "fr" | "en";
export type ThemeMode = "dark" | "light";
export type PageView = "home" | "about" | "services" | "portfolio" | "test-ai" | "blog" | "contact" | "dashboard" | "guide-ia-pro";

export interface LogoConfig {
  url: string;
  fit: "contain" | "cover";
  padding: number; // in pixels (e.g. 0 to 12)
  bgColor: "transparent" | "blue" | "dark" | "white";
  borderRadius: number; // in pixels (e.g. 8 to 999)
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 
    | "Web & Plateforme" 
    | "Intégration IA" 
    | "Agents IA"
    | "Automatisation & Workflows" 
    | "Automatisation"
    | "SEO & Marketing Digital"
    | "Application Mobile" 
    | "Web & Platform" 
    | "AI Integration" 
    | "AI Agents"
    | "Automation & Workflows" 
    | "Automation"
    | "SEO & Digital Marketing"
    | "Mobile Application"
    | string;
  badge: string;
  shortDescription: string;
  problem: string;
  solution: string;
  impact: {
    metric: string;
    label: string;
  }[];
  technologies: string[];
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  liveUrl?: string; // <-- Lien facultatif vers le site en direct
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "Globe" | "Bot" | "Zap" | "Smartphone" | "BookOpen" | "GraduationCap" | "Sparkles" | "Layers" | string;
  highlights: string[];
  deliverables: string[];
  idealFor: string;
  playgroundTab?: "automation" | "web_architect" | "studio_app";
  badge?: string;
  directAction?: "guide-ia-pro" | "contact" | "playground";
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  businessType?: string;
  subscribedAt: string;
  source?: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  bullets: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  category: string;
  readTime: string;
  publishedDate: string;
  coverImage?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  keyTakeaways: string[];
}

export interface AutomationResult {
  score: number;
  scoreRationale: string;
  timeSavings: {
    title: string;
    hoursSavedPerWeek: string;
    explanation: string;
    priority: string;
  }[];
  virtualAssistants: {
    name: string;
    role: string;
    concreteMission: string;
    toolIntegrations: string[];
    trigger: string;
  }[];
  quickWin: string;
}

export interface WebArchitectResult {
  catchphrase: string;
  toneSummary: string;
  pages: {
    name: string;
    purpose: string;
    keySections: string[];
    callToAction: string;
  }[];
  aiAgents: {
    name: string;
    placement: string;
    userBenefit: string;
  }[];
  teaserMessage: string;
}

export interface StudioAppResult {
  indispensableFeatures: {
    name: string;
    description: string;
    userValue: string;
  }[];
  bonusFeatures: {
    name: string;
    description: string;
    differentiator: string;
  }[];
  userJourney: {
    stepNumber: number;
    stepTitle: string;
    action: string;
    screenType: string;
  }[];
  embeddedAiAgents: {
    name: string;
    role: string;
    inAppTrigger: string;
  }[];
  architectureRecommendation: string;
}

export interface BookingSlot {
  date: string;
  time: string;
  dayName: string;
}