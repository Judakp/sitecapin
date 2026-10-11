import React, { useEffect } from "react";
import {
  ArrowLeft,
  Bot,
  Globe,
  Zap,
  BookOpen,
  GraduationCap,
  Smartphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  Code2,
} from "lucide-react";
import { Language, ThemeMode, PageView, ServiceItem } from "../types";
import { getServices, getFaq, getMethodology } from "../data/portfolioData";
import { SEO } from "./SEO"; // <-- IMPORT DU COMPOSANT SEO
import { NotFound } from "./NotFound";

interface ServiceDetailProps {
  slug: string;
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
  onNavigateToContact: () => void;
  onSelectPlaygroundTab?: (tab: "automation" | "web_architect" | "studio_app") => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  slug,
  language,
  theme,
  onNavigate,
  onNavigateToContact,
  onSelectPlaygroundTab,
}) => {
  // Remonter en haut de page lors du chargement
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Récupérer la liste des services depuis votre portfolioData.ts
  const services = getServices(language);
  const faqList = getFaq(language);
  const methodologySteps = getMethodology(language);

  // Le slug doit correspondre exactement à un service existant.
  // Aucun fallback vers le premier service : une URL inconnue doit rester 404.
  const service = services.find(
    (s) =>
      s.id === slug ||
      s.title.toLowerCase() === slug.toLowerCase()
  );

  if (!service) {
    return (
      <NotFound
        language={language}
        theme={theme}
        onNavigate={onNavigate}
      />
    );
  }

  // Helper pour les icônes Lucide
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-8 h-8 text-blue-400" />;
      case "Globe":
        return <Globe className="w-8 h-8 text-blue-400" />;
      case "Bot":
        return <Bot className="w-8 h-8 text-cyan-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-8 h-8 text-indigo-400" />;
      case "Zap":
        return <Zap className="w-8 h-8 text-amber-400" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-emerald-400" />;
      default:
        return <Code2 className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div id="service-detail-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* BALISE SEO DYNAMIQUE */}
      <SEO 
        title={service.title}
        description={service.description.substring(0, 160) + (service.description.length > 160 ? '...' : '')}
        language={language}
        url={`https://capinakpado.com/${language}/services/${service.id}`}
        type="website"
      />

      {/* Bouton Retour */}
      <div>
        <button
          onClick={() => onNavigate("services")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 glass-card px-4 py-2 rounded-xl border border-blue-500/20 transition-all hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "fr" ? "Retour aux Services" : "Back to Services"}</span>
        </button>
      </div>

      {/* HERO SECTION DU SERVICE */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-blue-500/20 shadow-2xl relative overflow-hidden space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 z-10 relative">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
              {renderIcon(service.iconName)}
              <span>{service.badge || "Expertise Sur-Mesure"}</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl font-extrabold leading-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {service.title}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
              {service.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all border border-white/20 cursor-pointer"
            >
              <span>{language === "fr" ? "Discuter de votre Projet" : "Discuss Your Project"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {service.playgroundTab && onSelectPlaygroundTab && (
              <button
                onClick={() => onSelectPlaygroundTab(service.playgroundTab!)}
                className="px-6 py-3 rounded-2xl glass-card hover:bg-white/10 text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-blue-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "fr" ? "Tester la Démo IA" : "Try Interactive Demo"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DESCRIPTION DÉTAILLÉE, POINTS FORTS & LIVRABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Colonne Gauche : Présentation & Livrables */}
        <div className="lg:col-span-7 space-y-10">
          
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400 font-mono">
              <Cpu className="w-5 h-5" />
              <span>{language === "fr" ? "Présentation de la prestation" : "Service Overview"}</span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
              {service.description}
            </p>
          </div>

          {/* Livrables Inclus */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400 font-mono">
                <ShieldCheck className="w-5 h-5" />
                <span>{language === "fr" ? "Ce qui est inclus (Livrables)" : "Included Deliverables"}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <p className="text-xs text-zinc-300 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Méthodologie globale */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400 font-mono">
              <Layers className="w-5 h-5" />
              <span>{language === "fr" ? "Méthodologie d'Accompagnement" : "Execution Workflow"}</span>
            </h2>

            <div className="space-y-4">
              {methodologySteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-start">
                  <span className="text-2xl font-mono font-extrabold text-blue-400 shrink-0">
                    {step.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne Droite : Points Forts, Public Cible & FAQ */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Points Forts (Highlights) */}
          <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400 font-mono">
              <Sparkles className="w-5 h-5" />
              <span>{language === "fr" ? "Points Forts & Valeur Ajoutée" : "Key Benefits"}</span>
            </h2>

            <ul className="space-y-3">
              {service.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Public Cible (Ideal For) */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              {language === "fr" ? "Incontournable Pour :" : "Ideal For:"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {service.idealFor}
            </p>
          </div>

          {/* FAQ */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400 font-mono">
              <HelpCircle className="w-5 h-5" />
              <span>Questions Fréquentes</span>
            </h2>

            <div className="space-y-4">
              {faqList.slice(0, 3).map((faqItem, i) => (
                <div key={i} className="space-y-1.5 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-white">{faqItem.question}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{faqItem.answer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};