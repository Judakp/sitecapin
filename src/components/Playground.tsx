import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Bot,
  Zap,
  Layout,
  Smartphone,
  Copy,
  Check,
  Send,
  Loader2,
  Cpu,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  Layers,
  FileText,
  DollarSign,
  Workflow,
  AlertTriangle,
  Calendar,
  Eye,
  Code2,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Language, ThemeMode } from "../types";
import { useTranslation } from "../data/translations";
import { supabase } from "../lib/supabase";
import { SEO } from "./SEO"; // <-- IMPORT DU COMPOSANT SEO

interface PlaygroundProps {
  language: Language;
  theme: ThemeMode;
  initialTab?: "automation" | "web_architect" | "studio_app";
  onSendToContact: (blueprintText: string) => void;
}

interface AnalysisData {
  title: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
    icon: any;
    color: string;
  }[];
  diagnostics: {
    problem: string;
    impact: string;
    severity: "high" | "medium" | "low";
  }[];
  architecture: {
    agentName: string;
    role: string;
    tech: string;
    description: string;
  }[];
  gains: {
    timeSaved: string;
    paybackDays: string;
    revenueBoost: string;
    score: number;
  };
  phases: {
    step: string;
    title: string;
    timeline: string;
    deliverable: string;
  }[];
  rawBlueprint: string;
}

// Fonction globale d'assainissement anti-XSS
const sanitizeInput = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const Playground: React.FC<PlaygroundProps> = ({
  language,
  theme,
  initialTab = "automation",
  onSendToContact,
}) => {
  const t = useTranslation(language);
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<"automation" | "web_architect" | "studio_app">(initialTab);
  const [viewMode, setViewMode] = useState<"visual" | "raw">("visual");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);

  // Gestion du Quota quotidien (2 par jour)
  const MAX_DAILY_SIMULATIONS = 2;
  const [remainingSimulations, setRemainingSimulations] = useState<number>(MAX_DAILY_SIMULATIONS);
  const [quotaReached, setQuotaReached] = useState<boolean>(false);

  useEffect(() => {
    checkDailyQuota();
  }, []);

  const checkDailyQuota = () => {
    const today = new Date().toISOString().split("T")[0]; // Ex: "2026-09-17"
    const storedData = localStorage.getItem("capin_ai_playground_quota");

    if (storedData) {
      try {
        const { date, count } = JSON.parse(storedData);
        if (date === today) {
          const remaining = Math.max(0, MAX_DAILY_SIMULATIONS - count);
          setRemainingSimulations(remaining);
          setQuotaReached(count >= MAX_DAILY_SIMULATIONS);
          return;
        }
      } catch {
        // En cas de corruption des données, réinitialisation
      }
    }

    // Nouveau jour ou première visite
    localStorage.setItem("capin_ai_playground_quota", JSON.stringify({ date: today, count: 0 }));
    setRemainingSimulations(MAX_DAILY_SIMULATIONS);
    setQuotaReached(false);
  };

  const incrementDailyQuota = () => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = localStorage.getItem("capin_ai_playground_quota");
    let count = 0;

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.date === today) {
          count = parsed.count;
        }
      } catch {}
    }

    const newCount = count + 1;
    localStorage.setItem("capin_ai_playground_quota", JSON.stringify({ date: today, count: newCount }));
    setRemainingSimulations(Math.max(0, MAX_DAILY_SIMULATIONS - newCount));
    setQuotaReached(newCount >= MAX_DAILY_SIMULATIONS);
  };

  // ---------------------------------------------------------------------------
  // Bilingual Playground content
  // The internal values are localized too, so the AI receives coherent data
  // in the selected language. User-edited values are preserved when switching
  // language; only untouched default values are translated automatically.
  // ---------------------------------------------------------------------------
  const playgroundDefaults = {
    fr: {
      automation: {
        industry: "Services & Conseil B2B",
        description: "Cabinet de conseil en stratégie et organisation pour dirigeants de PME. Nous accompagnons nos clients sur des missions de 3 à 6 mois.",
        team: "5-15 personnes",
        bottleneck: "Relance des devis en attente et tri manuel des emails entrants",
        volume: "60+ dossiers / mois",
      },
      web: {
        activity: "Cabinet de Conseil & Stratégie",
        description: "Cabinet d'avocats d'affaires et juristes spécialisés dans les fusions, levées de fonds et structuration contractuelle.",
        goal: "Générer des rendez-vous qualifiés",
        style: "Frosted Glass Épuré, Moderne & High-End",
        conversion: "Prise de RDV Calendly directe avec questionnaire",
      },
      app: {
        type: "Application Terrain pour Techniciens & Experts",
        description: "Société de maintenance et d'audit technique dont les experts réalisent 4 à 8 visites par jour sur site.",
        feature: "Dictée vocale IA & Génération de rapports d'intervention PDF signés",
        platform: "PWA & Mobile (iOS / Android) avec mode hors-ligne",
      },
    },
    en: {
      automation: {
        industry: "B2B Consulting & Advisory",
        description: "Strategy and organizational consulting firm supporting SME executives and general managers on 3-to-6-month engagements.",
        team: "5-15 people",
        bottleneck: "Following up on pending quotes and manually sorting incoming emails",
        volume: "60+ cases / month",
      },
      web: {
        activity: "Consulting & Strategy Firm",
        description: "Business law and corporate legal advisory firm specializing in mergers, fundraising and contract structuring.",
        goal: "Generate qualified appointments",
        style: "Clean Frosted Glass, Modern & High-End",
        conversion: "Direct Calendly booking with qualification questionnaire",
      },
      app: {
        type: "Field App for Technicians & Experts",
        description: "Maintenance and technical auditing company whose experts conduct 4 to 8 on-site visits per day.",
        feature: "AI voice dictation & generation of signed PDF service reports",
        platform: "PWA & Mobile (iOS / Android) with offline mode",
      },
    },
  } as const;

  const [autoIndustry, setAutoIndustry] = useState(playgroundDefaults[language].automation.industry);
  const [autoDescription, setAutoDescription] = useState(playgroundDefaults[language].automation.description);
  const [autoTeamSize, setAutoTeamSize] = useState(playgroundDefaults[language].automation.team);
  const [autoBottleneck, setAutoBottleneck] = useState(playgroundDefaults[language].automation.bottleneck);
  const [autoVolume, setAutoVolume] = useState(playgroundDefaults[language].automation.volume);

  const [webActivity, setWebActivity] = useState(playgroundDefaults[language].web.activity);
  const [webDescription, setWebDescription] = useState(playgroundDefaults[language].web.description);
  const [webGoal, setWebGoal] = useState(playgroundDefaults[language].web.goal);
  const [webStyle, setWebStyle] = useState(playgroundDefaults[language].web.style);
  const [webConversion, setWebConversion] = useState(playgroundDefaults[language].web.conversion);

  const [appType, setAppType] = useState(playgroundDefaults[language].app.type);
  const [appDescription, setAppDescription] = useState(playgroundDefaults[language].app.description);
  const [appFeature, setAppFeature] = useState(playgroundDefaults[language].app.feature);
  const [appPlatform, setAppPlatform] = useState(playgroundDefaults[language].app.platform);

  const previousLanguageRef = useRef<Language>(language);

  useEffect(() => {
    const previousLanguage = previousLanguageRef.current;
    if (previousLanguage === language) return;

    const previous = playgroundDefaults[previousLanguage];
    const next = playgroundDefaults[language];

    // Translate only values that still contain the previous language's default.
    // This avoids overwriting information typed by the visitor.
    setAutoIndustry((current) => current === previous.automation.industry ? next.automation.industry : current);
    setAutoDescription((current) => current === previous.automation.description ? next.automation.description : current);
    setAutoTeamSize((current) => current === previous.automation.team ? next.automation.team : current);
    setAutoBottleneck((current) => current === previous.automation.bottleneck ? next.automation.bottleneck : current);
    setAutoVolume((current) => current === previous.automation.volume ? next.automation.volume : current);

    setWebActivity((current) => current === previous.web.activity ? next.web.activity : current);
    setWebDescription((current) => current === previous.web.description ? next.web.description : current);
    setWebGoal((current) => current === previous.web.goal ? next.web.goal : current);
    setWebStyle((current) => current === previous.web.style ? next.web.style : current);
    setWebConversion((current) => current === previous.web.conversion ? next.web.conversion : current);

    setAppType((current) => current === previous.app.type ? next.app.type : current);
    setAppDescription((current) => current === previous.app.description ? next.app.description : current);
    setAppFeature((current) => current === previous.app.feature ? next.app.feature : current);
    setAppPlatform((current) => current === previous.app.platform ? next.app.platform : current);

    previousLanguageRef.current = language;
  }, [language]);

  const automationPresets = language === "fr"
    ? [
        {
          name: "💼 Conseil B2B",
          industry: "Cabinet de Conseil & Stratégie",
          description: "Conseil en transformation et gestion d'entreprise pour dirigeants et directeurs généraux.",
          team: "5-15 personnes",
          bottleneck: "Relance de devis sans réponse et tri des demandes de contact",
          volume: "40+ devis / mois",
        },
        {
          name: "🛒 E-commerce & SAV",
          industry: "Boutique E-commerce & D2C",
          description: "Boutique en ligne avec catalogue de 500+ références et flux régulier de commandes et questions clients.",
          team: "1-4 personnes",
          bottleneck: "Réponses répétitives au SAV (suivi de colis, retours, FAQ)",
          volume: "300+ tickets / mois",
        },
        {
          name: "🏢 Immobilier & Gestion",
          industry: "Agence Immobilière & Gestion Locative",
          description: "Agence immobilière indépendante gérant mandats de vente, locations et états des lieux.",
          team: "5-15 personnes",
          bottleneck: "Qualification des acquéreurs et planification des visites",
          volume: "120+ leads / mois",
        },
        {
          name: "🛠️ Artisans & BTP",
          industry: "Rénovation & Second Œuvre",
          description: "Entreprise artisanale de rénovation avec chantiers actifs et gestion administrative le soir.",
          team: "1-4 personnes",
          bottleneck: "Rédaction des devis le soir après les chantiers et relances",
          volume: "25 chantiers / mois",
        },
      ]
    : [
        {
          name: "💼 B2B Consulting",
          industry: "Consulting & Strategy Firm",
          description: "Transformation and business management consultancy supporting executives and general managers.",
          team: "5-15 people",
          bottleneck: "Following up on unanswered quotes and sorting incoming contact requests",
          volume: "40+ quotes / month",
        },
        {
          name: "🛒 E-commerce & Support",
          industry: "E-commerce & D2C Store",
          description: "Online store with 500+ products and a steady flow of orders and customer questions.",
          team: "1-4 people",
          bottleneck: "Repetitive customer support replies (delivery tracking, returns, FAQ)",
          volume: "300+ tickets / month",
        },
        {
          name: "🏢 Real Estate & Property",
          industry: "Real Estate & Property Management Agency",
          description: "Independent real estate agency managing sales mandates, rentals and property inspections.",
          team: "5-15 people",
          bottleneck: "Qualifying buyers and scheduling property visits",
          volume: "120+ leads / month",
        },
        {
          name: "🛠️ Contractors & Construction",
          industry: "Renovation & Finishing Works",
          description: "Renovation company with active construction sites and administrative work handled after hours.",
          team: "1-4 people",
          bottleneck: "Writing quotes after construction work and following up with prospects",
          volume: "25 projects / month",
        },
      ];

  const webPresets = language === "fr"
    ? [
        {
          name: "🏛️ Cabinet d'Avocats / Conseil",
          activity: "Cabinet d'Avocats d'Affaires",
          description: "Prestations juridiques et fiscales haut de gamme pour chefs d'entreprise et investisseurs.",
          goal: "Générer des rendez-vous qualifiés",
          style: "Frosted Glass Épuré, Neutre Sombre & Typographie Prestige",
          conversion: "Prise de RDV direct connectée à l'agenda avec questionnaire",
        },
        {
          name: "💻 SaaS & Startup B2B",
          activity: "Plateforme Logicielle B2B",
          description: "Solution SaaS facilitant la gestion de projets et la collaboration entre équipes décentralisées.",
          goal: "Vendre des prestations / abonnements",
          style: "Moderne Tech, Micro-animations fluides & Dark Mode",
          conversion: "Démonstrateur produit interactif & Essai gratuit 14 jours",
        },
        {
          name: "🎓 Académie & Formation",
          activity: "Organisme de Formation Dirigeants",
          description: "Programmes immersifs et masterclasses certifiantes pour cadres et entrepreneurs.",
          goal: "Asseoir l'autorité & recruter",
          style: "High-Contrast Lumineux & Preuves Sociales",
          conversion: "Téléchargement de syllabus & Candidature express",
        },
      ]
    : [
        {
          name: "🏛️ Law Firm / Advisory",
          activity: "Business Law Firm",
          description: "High-end legal and tax services for business owners and investors.",
          goal: "Generate qualified appointments",
          style: "Clean Frosted Glass, Dark Neutral & Prestige Typography",
          conversion: "Direct calendar booking with qualification questionnaire",
        },
        {
          name: "💻 SaaS & B2B Startup",
          activity: "B2B Software Platform",
          description: "SaaS solution that simplifies project management and collaboration for distributed teams.",
          goal: "Sell services / subscriptions",
          style: "Modern Tech, Smooth Micro-animations & Dark Mode",
          conversion: "Interactive product demo & 14-day free trial",
        },
        {
          name: "🎓 Academy & Training",
          activity: "Executive Training Organization",
          description: "Immersive programs and certified masterclasses for executives and entrepreneurs.",
          goal: "Build authority & recruit",
          style: "Bright High-Contrast & Social Proof",
          conversion: "Syllabus download & Express application",
        },
      ];

  const appPresets = language === "fr"
    ? [
        {
          name: "📋 Diagnostic Terrain",
          type: "Application Terrain pour Techniciens & Experts",
          description: "Techniciens itinérants effectuant des audits techniques et diagnostics sur le terrain.",
          feature: "Dictée vocale IA & Génération de rapports d'intervention PDF signés",
          platform: "PWA & Mobile (iOS / Android) avec mode hors-ligne",
        },
        {
          name: "👥 Portail Client VIP",
          type: "Portail Client Privé & Validation de Livrables",
          description: "Cabinet d'audit délivrant des documents confidentiels et des suivis de projets personnalisés.",
          feature: "Chatbot IA avec mémoire de projet et validation de jalons en 1 clic",
          platform: "Web & Mobile PWA sécurisée",
        },
        {
          name: "📊 Tableau de Bord Décisionnel",
          type: "Cockpit Opérationnel Dirigeant",
          description: "Groupe multisites avec besoin de centraliser et consolider les métriques financières en direct.",
          feature: "Synthèse quotidienne IA des KPIs financiers & alertes de marge",
          platform: "Multi-écrans & Mobile Responsive",
        },
      ]
    : [
        {
          name: "📋 Field Diagnostics",
          type: "Field App for Technicians & Experts",
          description: "Mobile technicians performing technical audits and diagnostics on customer sites.",
          feature: "AI voice dictation & generation of signed PDF service reports",
          platform: "PWA & Mobile (iOS / Android) with offline mode",
        },
        {
          name: "👥 VIP Client Portal",
          type: "Private Client Portal & Deliverable Approval",
          description: "Audit firm delivering confidential documents and personalized project tracking.",
          feature: "AI chatbot with project memory and one-click milestone approval",
          platform: "Secure Web & Mobile PWA",
        },
        {
          name: "📊 Executive Decision Dashboard",
          type: "Executive Operations Cockpit",
          description: "Multi-site group needing to centralize and consolidate financial metrics in real time.",
          feature: "Daily AI summary of financial KPIs & margin alerts",
          platform: "Multi-screen & Responsive Mobile",
        },
      ];

  const triggerConfetti = () => {
    try {
      confetti.reset();
      const duration = 7 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 45, spread: 360, ticks: 160, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      confetti({
        ...defaults,
        particleCount: 120,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#10b981", "#f59e0b", "#8b5cf6"],
      });

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          try { confetti.reset(); } catch {}
          return;
        }

        const particleCount = 35 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
          colors: ["#3b82f6", "#60a5fa", "#10b981", "#f59e0b", "#8b5cf6"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
          colors: ["#3b82f6", "#60a5fa", "#10b981", "#f59e0b", "#ec4899"],
        });
      }, 380);

      setTimeout(() => {
        clearInterval(interval);
        try { confetti.reset(); } catch {}
      }, 7000);
    } catch {}
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.rawBlueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSimulation = async () => {
    if (quotaReached) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      // Nettoyage sécurisé des données soumises
      const sanitizedParameters =
        activeTab === "automation"
          ? {
              autoIndustry: sanitizeInput(autoIndustry),
              autoDescription: sanitizeInput(autoDescription),
              autoTeamSize: sanitizeInput(autoTeamSize),
              autoBottleneck: sanitizeInput(autoBottleneck),
              autoVolume: sanitizeInput(autoVolume),
            }
          : activeTab === "web_architect"
          ? {
              webActivity: sanitizeInput(webActivity),
              webDescription: sanitizeInput(webDescription),
              webGoal: sanitizeInput(webGoal),
              webStyle: sanitizeInput(webStyle),
              webConversion: sanitizeInput(webConversion),
            }
          : {
              appType: sanitizeInput(appType),
              appDescription: sanitizeInput(appDescription),
              appFeature: sanitizeInput(appFeature),
              appPlatform: sanitizeInput(appPlatform),
            };

      const promptData = {
        tab: activeTab,
        language,
        parameters: sanitizedParameters,
      };

      const { data: responseData, error } = await supabase.functions.invoke("analyze-playground", {
        body: promptData,
      });

      if (error || !responseData?.data) {
        throw new Error(error?.message || "Erreur de génération via Supabase");
      }

      const data: AnalysisData = responseData.data;

      const icons = [Clock, TrendingUp, ShieldCheck, Zap];
      data.metrics = data.metrics.map((metric, index) => ({
        ...metric,
        icon: icons[index % icons.length],
      }));

      setAnalysisResult(data);
      incrementDailyQuota();
      triggerConfetti();
    } catch (error) {
      console.error("Échec de la génération :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="test-ai-page" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* ================= BALISE SEO ================= */}
      <SEO 
        title={language === "fr" ? "Simulateur IA & Blueprint | Capin Akpado" : "AI Simulator & Blueprint | Capin Akpado"}
        description={language === "fr" 
          ? "Testez mon moteur d'intelligence artificielle en direct. Générez une architecture sur-mesure et un plan d'action pour votre entreprise en 1 clic." 
          : "Test my artificial intelligence engine live. Generate a custom architecture and action plan for your business in 1 click."}
        language={language}
        url={`https://capinakpado.com/${language}/test-ai`}
      />

      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-blue-500/10 text-blue-500 border border-blue-500/25">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.testAi.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          {t.testAi.title}
        </h1>

        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
          {t.testAi.desc}
        </p>

        {/* Quota Indicator */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 ${
            quotaReached
              ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>
              {language === "fr"
                ? `Simulations restantes aujourd'hui : ${remainingSimulations}/${MAX_DAILY_SIMULATIONS}`
                : `Simulations remaining today: ${remainingSimulations}/${MAX_DAILY_SIMULATIONS}`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Simulator Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
        <button
          id="tab-automation"
          onClick={() => {
            setActiveTab("automation");
            setAnalysisResult(null);
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "automation"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/40"
              : isDark
              ? "bg-zinc-900/70 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
          }`}
        >
          <Bot className="w-4 h-4 text-blue-400" />
          <span>{t.testAi.tabAutomation}</span>
        </button>

        <button
          id="tab-web"
          onClick={() => {
            setActiveTab("web_architect");
            setAnalysisResult(null);
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "web_architect"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/40"
              : isDark
              ? "bg-zinc-900/70 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
          }`}
        >
          <Layout className="w-4 h-4 text-cyan-400" />
          <span>{t.testAi.tabWeb}</span>
        </button>

        <button
          id="tab-app"
          onClick={() => {
            setActiveTab("studio_app");
            setAnalysisResult(null);
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "studio_app"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/40"
              : isDark
              ? "bg-zinc-900/70 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>{t.testAi.tabApp}</span>
        </button>
      </div>

      {/* 3. Simulator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters & Presets Form */}
        <div
          className={`lg:col-span-4 rounded-2xl sm:rounded-3xl border p-6 sm:p-7 space-y-6 flex flex-col justify-between ${
            isDark
              ? "bg-zinc-900/70 border-zinc-800"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3.5 border-white/10">
              <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                isDark ? "text-zinc-200" : "text-slate-900"
              }`}>
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>{language === "fr" ? "Paramètres & Données" : "Simulation Parameters"}</span>
              </h3>
              <span className="text-[10px] font-mono text-blue-500 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                AI Engine
              </span>
            </div>

            {/* Quick Presets for Current Tab */}
            <div className="space-y-2">
              <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === "fr" ? "Scénarios Pré-remplis (1 clic) :" : "Quick Presets (1 click):"}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeTab === "automation" &&
                  automationPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAutoIndustry(preset.industry);
                        setAutoDescription(preset.description);
                        setAutoTeamSize(preset.team);
                        setAutoBottleneck(preset.bottleneck);
                        setAutoVolume(preset.volume);
                      }}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium transition-all text-left ${
                        autoIndustry === preset.industry
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : isDark
                          ? "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}

                {activeTab === "web_architect" &&
                  webPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setWebActivity(preset.activity);
                        setWebDescription(preset.description);
                        setWebGoal(preset.goal);
                        setWebStyle(preset.style);
                        setWebConversion(preset.conversion);
                      }}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium transition-all text-left ${
                        webActivity === preset.activity
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : isDark
                          ? "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}

                {activeTab === "studio_app" &&
                  appPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAppType(preset.type);
                        setAppDescription(preset.description);
                        setAppFeature(preset.feature);
                        setAppPlatform(preset.platform);
                      }}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium transition-all text-left ${
                        appType === preset.type
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : isDark
                          ? "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Helper Notice */}
            <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2.5 ${
              isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-blue-900"
            }`}>
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p>
                {language === "fr"
                  ? "Vous pouvez saisir vos propres informations pour décrire votre activité sur-mesure, ou choisir l'un des scénarios pré-remplis ci-dessus en un clic."
                  : "You can enter your own custom information to describe your business, or select one of the pre-filled scenarios above in 1 click."}
              </p>
            </div>

            {/* TAB 1: Automation Inputs */}
            {activeTab === "automation" && (
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Secteur / Métier" : "Industry / Field"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={autoIndustry}
                    onChange={(e) => setAutoIndustry(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Description de l'activité & Contexte" : "Activity Description & Context"}
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={autoDescription}
                    onChange={(e) => setAutoDescription(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none resize-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Taille de l'équipe" : "Team Size"}
                  </label>
                  <select
                    value={autoTeamSize}
                    onChange={(e) => setAutoTeamSize(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  >
                    <option value={language === "fr" ? "1 à 4 personnes" : "1-4 people"}>
                      {language === "fr" ? "1 à 4 personnes (Solo / Petite équipe)" : "1 to 4 people (Solo / Small team)"}
                    </option>
                    <option value={language === "fr" ? "5-15 personnes" : "5-15 people"}>
                      {language === "fr" ? "5 à 15 personnes (PME en croissance)" : "5 to 15 people (Growing SME)"}
                    </option>
                    <option value={language === "fr" ? "20+ collaborateurs" : "20+ employees"}>
                      {language === "fr" ? "20+ collaborateurs (Structure établie)" : "20+ employees (Established organization)"}
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Tâche répétitive à automatiser" : "Repetitive Bottleneck"}
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={autoBottleneck}
                    onChange={(e) => setAutoBottleneck(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none resize-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Volume mensuel" : "Volume / Month"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={autoVolume}
                    onChange={(e) => setAutoVolume(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Site Web & Landing Page Inputs */}
            {activeTab === "web_architect" && (
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Votre activité & cible" : "Activity & Audience"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={webActivity}
                    onChange={(e) => setWebActivity(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Description détaillée de l'activité" : "Detailed Activity Description"}
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={webDescription}
                    onChange={(e) => setWebDescription(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none resize-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Objectif principal du site" : "Main Goal"}
                  </label>
                  <input
                    type="text"
                    maxLength={150}
                    value={webGoal}
                    onChange={(e) => setWebGoal(e.target.value)}
                    placeholder={
                      language === "fr"
                        ? "Ex: Générer des rendez-vous qualifiés, vendre des prestations..."
                        : "Ex: Book discovery calls, sell courses, showcase portfolio..."
                    }
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Style visuel & Ambiance" : "Visual Style"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={webStyle}
                    onChange={(e) => setWebStyle(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Action attendue des visiteurs" : "Desired Visitor Action"}
                  </label>
                  <input
                    type="text"
                    maxLength={150}
                    value={webConversion}
                    onChange={(e) => setWebConversion(e.target.value)}
                    placeholder={
                      language === "fr"
                        ? "Ex: Prise de RDV Calendly, formulaire en 3 étapes, achat direct..."
                        : "Ex: Calendly booking, 3-step lead form, direct checkout..."
                    }
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Mobile App Inputs */}
            {activeTab === "studio_app" && (
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Type d'application souhaitée" : "Application Scope"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={appType}
                    onChange={(e) => setAppType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Description de l'activité & Cas d'usage" : "Activity & Field Use Case"}
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none resize-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Fonctionnalité IA prioritaire" : "Core AI Capability"}
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1000}
                    value={appFeature}
                    onChange={(e) => setAppFeature(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none resize-none`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {language === "fr" ? "Plateforme cible & Résilience" : "Platform & Resilience"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={appPlatform}
                    onChange={(e) => setAppPlatform(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark
                        ? "bg-zinc-800/80 border-zinc-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500"
                    } outline-none`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              id="generate-simulation-btn"
              onClick={generateSimulation}
              disabled={isLoading || quotaReached}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all border border-white/20 cursor-pointer ${
                quotaReached
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white shadow-blue-600/30"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.testAi.generatingBtn}</span>
                </>
              ) : quotaReached ? (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === "fr" ? "Limite quotidienne atteinte (2/2)" : "Daily limit reached (2/2)"}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.testAi.generateBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Results Display Panel */}
        <div
          className={`lg:col-span-8 rounded-2xl sm:rounded-3xl border p-6 sm:p-8 flex flex-col justify-between min-h-125 relative overflow-hidden transition-all ${
            isDark
              ? "bg-zinc-900/80 border-zinc-800"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-24">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                <Bot className="w-7 h-7 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-base font-bold tracking-tight">
                  {t.testAi.loadingText}
                </p>
                <p className={`text-xs font-mono animate-pulse ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                  {language === "fr" ? "Élaboration du diagnostic en cours..." : "Generating strategic blueprint..."}
                </p>
              </div>
            </div>
          ) : analysisResult ? (
            <div className="space-y-8 flex flex-col justify-between h-full relative z-10">
              
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === "fr" ? "Diagnostic & Architecture Générés" : "Audit & Blueprint Generated"}</span>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {analysisResult.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-xl border flex items-center gap-1 text-xs ${
                    isDark ? "bg-zinc-800/80 border-zinc-700" : "bg-slate-100 border-slate-300"
                  }`}>
                    <button
                      onClick={() => setViewMode("visual")}
                      className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                        viewMode === "visual"
                          ? "bg-blue-600 text-white shadow-sm"
                          : isDark ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === "fr" ? "Visuel" : "Visual"}</span>
                    </button>
                    <button
                      onClick={() => setViewMode("raw")}
                      className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                        viewMode === "raw"
                          ? "bg-blue-600 text-white shadow-sm"
                          : isDark ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{language === "fr" ? "Blueprint Brut" : "Raw"}</span>
                    </button>
                  </div>

                  <button
                    id="copy-blueprint-btn"
                    onClick={handleCopy}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      copied
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : isDark
                        ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                        : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.testAi.copiedBtn : t.testAi.copyBtn}</span>
                  </button>
                </div>
              </div>

              {/* View Mode: Visual Cards */}
              {viewMode === "visual" ? (
                <div className="space-y-6">
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {analysisResult.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {analysisResult.metrics.map((metric, idx) => {
                      const IconComp = metric.icon;
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 sm:p-4 rounded-xl border relative overflow-hidden transition-all ${
                            isDark
                              ? "bg-zinc-950/60 border-zinc-800 hover:border-blue-500/40"
                              : "bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[11px] font-semibold ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                              {metric.label}
                            </span>
                            <div className={`p-1.5 rounded-lg bg-linear-to-br ${metric.color} text-white shadow-sm`}>
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xl sm:text-2xl font-extrabold text-blue-500 font-mono">
                            {metric.value}
                          </div>
                          <div className={`text-[10px] mt-0.5 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                            {metric.sub}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === "fr" ? "1. Points de Friction Identifiés & Gains Potentiels" : "1. Identified Friction Points & Gains"}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {analysisResult.diagnostics.map((diag, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs space-y-1 ${
                            isDark ? "bg-zinc-950/40 border-zinc-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{diag.problem}</span>
                          </div>
                          <p className={`text-[11px] leading-snug ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                            {diag.impact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5 text-blue-400" />
                      <span>{language === "fr" ? "2. Architecture Recommandée & Agents Déployés" : "2. Recommended Multi-Agent Architecture"}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {analysisResult.architecture.map((agent, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                            isDark
                              ? "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm"
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold">
                                {agent.role}
                              </span>
                            </div>
                            <h5 className="font-bold text-xs sm:text-sm">{agent.agentName}</h5>
                            <p className={`text-[11px] leading-relaxed ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                              {agent.description}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-zinc-400">
                              Tech: <strong className="text-blue-400">{agent.tech}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === "fr" ? "3. Plan de Déploiement en 3 Jalons" : "3. Deployment Roadmap (3 Milestones)"}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {analysisResult.phases.map((phase, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs space-y-1 ${
                            isDark ? "bg-zinc-950/40 border-zinc-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 font-bold">
                            <span>{phase.step}</span>
                            <span className="text-zinc-400 font-normal">{phase.timeline}</span>
                          </div>
                          <div className="font-bold text-xs">{phase.title}</div>
                          <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                            {phase.deliverable}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    className={`p-5 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto border max-h-105 ${
                      isDark
                        ? "bg-black/80 text-zinc-200 border-zinc-800"
                        : "bg-slate-900 text-slate-100 border-slate-800"
                    }`}
                  >
                    {analysisResult.rawBlueprint}
                  </div>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="send-to-contact-btn"
                  onClick={() => onSendToContact(analysisResult.rawBlueprint)}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer border border-white/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.testAi.sendToContactBtn}</span>
                </button>

                <button
                  onClick={generateSimulation}
                  disabled={quotaReached}
                  className={`w-full sm:w-auto px-4 py-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    quotaReached
                      ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed"
                      : isDark
                      ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                      : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === "fr" ? "Recalculer" : "Re-simulate"}</span>
                </button>
              </div>

            </div>
          ) : (
            /* Idle State */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-20">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/10">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              
              <div className="max-w-md space-y-2">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {t.testAi.readyTitle}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                  {t.testAi.readyDesc}
                </p>
              </div>

              <button
                onClick={generateSimulation}
                disabled={quotaReached}
                className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all border border-white/20 ${
                  quotaReached
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 active:scale-[0.99]"
                }`}
              >
                <span>{quotaReached ? (language === "fr" ? "Limite atteinte (2/2)" : "Limit reached (2/2)") : t.testAi.generateBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};