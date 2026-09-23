import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Bot,
  Globe,
  Zap,
  Terminal,
  ShieldCheck,
  Layers,
  FolderKanban,
  BookOpen,
  Calendar,
  Clock,
  User,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Code2,
  Cpu,
} from "lucide-react";
import { Language, ThemeMode, PageView } from "../types";
import { useTranslation } from "../data/translations";
import {
  getStoredServices,
  getStoredCaseStudies,
  getStoredBlogPosts,
  getSiteSettings,
  getProfilePhoto,
} from "../data/contentStore";
import photoCapinWebp from "../assets/images/photo-capin.webp";
import { SEO } from "./SEO"; // <-- IMPORT DU COMPOSANT SEO

interface HomeProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ language, theme, onNavigate }) => {
  const t = useTranslation(language);
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());
  const [services, setServices] = useState(() => getStoredServices(language));
  const [caseStudies, setCaseStudies] = useState(() => getStoredCaseStudies(language));
  const [blogPosts, setBlogPosts] = useState(() => getStoredBlogPosts(language));
  const [profilePhoto, setProfilePhoto] = useState<string>(() => getProfilePhoto());

  const featuredStudy = caseStudies[0];

  // Image source effective (soit issue du store local, soit du fichier par défaut importé)
  const effectiveProfilePhoto = profilePhoto || photoCapinWebp;

  // Re-sync with store if changed
  useEffect(() => {
    setSiteSettings(getSiteSettings());
    setServices(getStoredServices(language));
    setCaseStudies(getStoredCaseStudies(language));
    setBlogPosts(getStoredBlogPosts(language));
    setProfilePhoto(getProfilePhoto());
  }, [language]);

  useEffect(() => {
    const handleStorageChange = () => {
      setSiteSettings(getSiteSettings());
      setServices(getStoredServices(language));
      setCaseStudies(getStoredCaseStudies(language));
      setBlogPosts(getStoredBlogPosts(language));
      setProfilePhoto(getProfilePhoto());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("capin_content_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("capin_content_updated", handleStorageChange);
    };
  }, [language]);

  return (
    <div id="home-page" className="space-y-24 pb-20">
      
      {/* BALISE SEO POUR L'ACCUEIL */}
      <SEO 
        title={language === "fr" ? "Accueil | Capin Akpado - Architecte IA & Web" : "Home | Capin Akpado - AI & Web Architect"}
        description={language === "fr" 
          ? "Accompagnement sur-mesure en développement web, création d'applications mobiles et intégration d'agents IA autonomes pour votre entreprise." 
          : "Custom web development, mobile apps, and autonomous AI agents integration for your business."}
        language={language}
        url={`https://capinakpado.com/${language}/${language === "fr" ? "accueil" : "home"}`}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[280px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Profile Avatar Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate("about")}
                  className="flex items-center gap-2.5 p-1 pr-3.5 rounded-full glass-card hover:border-blue-500/40 transition-all text-xs font-medium shadow-sm group"
                  title="Voir le profil de Capin Akpado"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 relative shrink-0 bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    <img
                      src={effectiveProfilePhoto}
                      alt="Capin Judicael Akpado"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#09090B]" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-blue-500 font-mono block leading-tight">
                      Capin Akpado
                    </span>
                    <span className={`text-[10px] ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                      {language === "fr" ? "Développeur web, mobile & IA" : "Web, mobile & AI developer"}
                    </span>
                  </div>
                </button>

                {/* Pill status */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-medium shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className={theme === "dark" ? "text-zinc-300" : "text-slate-700"}>
                    {t.hero.pill}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-blue-500 font-mono font-semibold">
                    {t.hero.pillBadge}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {(language === "fr" ? siteSettings.homeHeroTitleFr : siteSettings.homeHeroTitleEn) || (
                    <>
                      {t.hero.titleStart}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400">
                        {t.hero.titleHighlight}
                      </span>.
                    </>
                  )}
                </h1>
                <p className={`text-base sm:text-lg lg:text-xl max-w-2xl font-normal leading-relaxed ${
                  theme === "dark" ? "text-zinc-300" : "text-slate-600"
                }`}>
                  {(language === "fr" ? siteSettings.homeHeroSubtitleFr : siteSettings.homeHeroSubtitleEn) || t.hero.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  id="hero-cta-test-ai"
                  onClick={() => onNavigate("test-ai")}
                  className="group px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-white/20"
                >
                  <Sparkles className="w-5 h-5 text-blue-200" />
                  <span>{(language === "fr" ? siteSettings.homeCtaSecondaryFr : siteSettings.homeCtaSecondaryEn) || t.hero.ctaTestAi}</span>
                  <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-cta-portfolio-button"
                  onClick={() => onNavigate("portfolio")}
                  className="glass-card hover:bg-blue-600/10 px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 border border-slate-300/30"
                >
                  <FolderKanban className="w-4 h-4 text-blue-400" />
                  <span>{t.nav.portfolio}</span>
                </button>

                <button
                  id="hero-cta-portfolio"
                  onClick={() => onNavigate("portfolio")}
                  className={`px-4 py-3.5 text-sm font-medium transition-colors text-center sm:text-left ${
                    theme === "dark" ? "text-zinc-400 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {(language === "fr" ? siteSettings.homeCtaPrimaryFr : siteSettings.homeCtaPrimaryEn) || t.hero.ctaPortfolio}
                </button>
              </div>

              {/* Key Metrics */}
              <div className="pt-5 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6">
                <div className="glass-card p-3 sm:p-4 rounded-xl">
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    {siteSettings.metric1Val || t.hero.metric1Value}
                  </div>
                  <div className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    {(language === "fr" ? siteSettings.metric1LabelFr : siteSettings.metric1LabelEn) || t.hero.metric1Label}
                  </div>
                </div>
                <div className="glass-card p-3 sm:p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-500 tracking-tight">
                    {siteSettings.metric2Val || t.hero.metric2Value}
                  </div>
                  <div className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    {(language === "fr" ? siteSettings.metric2LabelFr : siteSettings.metric2LabelEn) || t.hero.metric2Label}
                  </div>
                </div>
                <div className="glass-card p-3 sm:p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 tracking-tight">
                    {siteSettings.metric3Val || t.hero.metric3Value}
                  </div>
                  <div className={`text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    {(language === "fr" ? siteSettings.metric3LabelFr : siteSettings.metric3LabelEn) || t.hero.metric3Label}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl glass-card border border-white/15 shadow-2xl p-5 sm:p-6 backdrop-blur-2xl">
                
                {/* Window Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className={`ml-2 text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                      {t.hero.liveCardTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-mono border border-blue-500/30">
                    <Zap className="w-3 h-3 text-blue-400" />
                    {t.hero.liveBadge}
                  </div>
                </div>

                {/* Simulated AI Flow */}
                <div className="space-y-3.5 font-mono text-xs">
                  
                  {/* User Request */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 font-semibold font-mono text-blue-400">
                        <Terminal className="w-3.5 h-3.5" /> {t.hero.userRequestLabel}
                      </span>
                      <span className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}>
                        {t.hero.userRequestTime}
                      </span>
                    </div>
                    <p className={`font-sans text-xs sm:text-sm ${theme === "dark" ? "text-zinc-200" : "text-slate-700"}`}>
                      {t.hero.userRequestText}
                    </p>
                  </div>

                  {/* Processing Status */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                    <Bot className="w-4 h-4 animate-spin" style={{ animationDuration: "4s" }} />
                    <span className="font-sans font-medium">{t.hero.aiProcessing}</span>
                    <span className="ml-auto text-[10px] bg-blue-500/20 px-2 py-0.5 rounded font-mono">
                      {t.hero.instantCalc}
                    </span>
                  </div>

                  {/* Diagnostic Card */}
                  <div className={`p-4 rounded-xl border space-y-2.5 ${
                    theme === "dark" ? "bg-black/40 border-white/10" : "bg-white/80 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-500 font-semibold font-sans flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.hero.diagTitle}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[11px] font-bold font-mono">
                        {t.hero.diagScore}
                      </span>
                    </div>

                    <div className={`space-y-2 font-sans text-xs ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{t.hero.sol1}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{t.hero.sol2}</span>
                      </div>
                    </div>

                    <button
                      id="hero-try-sim-btn"
                      onClick={() => onNavigate("test-ai")}
                      className="w-full mt-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-600/30 border border-white/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.hero.tryInTestAi}</span>
                    </button>
                  </div>

                  {/* Reassuring Badges */}
                  <div className={`flex items-center justify-between text-[11px] pt-1 font-sans ${
                    theme === "dark" ? "text-zinc-400" : "text-slate-500"
                  }`}>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {t.hero.zeroJargon}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-blue-500" /> {t.hero.readyToDeploy}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Spotlight Section: Rencontrez Capin Akpado (Photo & Présentation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-blue-500/20 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Photo Frame */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden glass-card border-2 border-blue-500/30 p-1.5 shadow-2xl group">
                <img
                  src={effectiveProfilePhoto}
                  alt="Capin Judicael Akpado"
                  className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105 duration-300"
                />

                {/* Active Indicator */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Actif</span>
                </div>
              </div>
            </div>

            {/* Right: Bio & Profile Pitch */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
                <User className="w-3.5 h-3.5" />
                <span>{language === "fr" ? "Développeur web, mobile & IA" : "Web, mobile & AI developer"}</span>
              </div>

              <div className="space-y-2">
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Capin Judicael Akpado
                </h2>
                <p className="text-sm sm:text-base font-semibold text-blue-500">
                  {language === "fr"
                    ? "Création de sites web, applications et solutions d'intelligence artificielle sur mesure"
                    : "Custom websites, applications, and AI solutions"}
                </p>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {language === "fr"
                  ? "Spécialiste de la création de sites web performants, d'applications mobiles sur mesure et de solutions IA, j'aide les entreprises et startups à transformer leurs idées en produits digitaux d'élite. De l'interface utilisateur au déploiement d'agents IA autonomes, je bâtis des outils robustes qui éliminent les tâches répétitives et maximisent votre rentabilité."
                  : "Specializing in high-performance website development, custom mobile applications, and AI solutions, I help startups and established businesses turn their ideas into elite digital products. From UI/UX design to deploying autonomous AI agents, I build robust tools that eliminate repetitive tasks and maximize your profitability."}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium glass-card text-blue-400 border border-blue-500/20">
                  ⚡ Website & App
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium glass-card text-indigo-400 border border-indigo-500/20">
                  🤖 AI Agents & LLM
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium glass-card text-emerald-400 border border-emerald-500/20">
                  ⚙️ Workflows & Automatisation
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium glass-card text-amber-400 border border-amber-500/20">
                  ✨ Tech Engine
                </span>
              </div>

              {/* Link to Full About Page */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate("about")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all border border-white/20"
                >
                  <span>{language === "fr" ? "Découvrir mon parcours complet" : "View full bio & journey"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="mailto:contact@capinakpado.com"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>contact@capinakpado.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Platform Overview: Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.home.badgeOverview}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.home.servicesPreviewTitle}
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
              {t.home.whatIDoDesc}
            </p>
          </div>

          <button
            onClick={() => onNavigate("services")}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-semibold transition-colors"
          >
            <span>{t.home.exploreServices}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onNavigate("services")}
              className="glass-card-hover cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
                    {service.iconName === "Globe" && <Globe className="w-5 h-5" />}
                    {service.iconName === "Bot" && <Bot className="w-5 h-5" />}
                    {service.iconName === "Zap" && <Zap className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-xs text-zinc-500 font-bold">0{index + 1}</span>
                </div>
                <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {service.title}
                </h3>
                <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                  theme === "dark" ? "text-zinc-300" : "text-slate-600"
                }`}>
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-blue-500 gap-1.5">
                <span>{t.services.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study Teaser & AI Simulator Invite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Case Study Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                  <FolderKanban className="w-3.5 h-3.5" />
                  {t.home.featuredProjectBadge}
                </span>
                <span className="text-xs font-mono text-emerald-500 font-bold">
                  {featuredStudy.badge}
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {featuredStudy.title}
              </h3>
              <p className={`text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                {t.portfolio.client} {featuredStudy.client}
              </p>

              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {featuredStudy.shortDescription}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {featuredStudy.impact.map((imp, idx) => (
                  <div key={idx} className="glass-card p-2.5 rounded-xl text-center">
                    <div className="text-sm sm:text-base font-extrabold font-mono text-blue-500">
                      {imp.metric}
                    </div>
                    <div className={`text-[10px] truncate ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                      {imp.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onNavigate("portfolio")}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
              >
                <span>{t.home.explorePortfolio}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Test AI Simulator Promo Card */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border-blue-500/30">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                {t.home.testAiTeaserBadge}
              </div>

              <h3 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.home.testAiTeaserTitle}
              </h3>

              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {t.home.testAiTeaserDesc}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg glass-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1. {t.testAi.tabAutomation}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg glass-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>2. {t.testAi.tabWeb}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg glass-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>3. {t.testAi.tabApp}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("test-ai")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{t.home.launchTestAi}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. Latest Blog Publication Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.home.blogTeaserBadge}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.home.blogTeaserTitle}
            </h2>
          </div>

          <button
            onClick={() => onNavigate("blog")}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-semibold transition-colors"
          >
            <span>{t.home.exploreBlog}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate("blog")}
              className="glass-card-hover cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime} {t.blog.readTime}
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {post.title}
                </h3>
                <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                  theme === "dark" ? "text-zinc-300" : "text-slate-600"
                }`}>
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={theme === "dark" ? "text-zinc-400" : "text-slate-500"}>
                  {post.publishedDate}
                </span>
                <span className="text-blue-500 font-semibold flex items-center gap-1">
                  {t.blog.readArticle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Direct Contact Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-blue-500/30">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.home.ctaBannerTitle}
            </h2>
            <p className={`text-base leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
              {t.home.ctaBannerDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 border border-white/20"
            >
              <Calendar className="w-5 h-5" />
              <span>{t.home.ctaBannerBtn}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};