import React from "react";
import {
  Globe,
  Bot,
  Zap,
  BookOpen,
  GraduationCap,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Clock,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { ServiceItem, Language, ThemeMode, PageView } from "../types";
import { getServices, getMethodology } from "../data/portfolioData";
import { useTranslation } from "../data/translations";

interface ServicesProps {
  language: Language;
  theme: ThemeMode;
  onSelectPlaygroundTab: (tab: "automation" | "web_architect" | "studio_app") => void;
  onNavigateToContact: () => void;
  onNavigateToPage?: (page: PageView) => void;
}

export const Services: React.FC<ServicesProps> = ({
  language,
  theme,
  onSelectPlaygroundTab,
  onNavigateToContact,
  onNavigateToPage,
}) => {
  const t = useTranslation(language);
  const services = getServices(language);
  const methodologySteps = getMethodology(language);

  const getIcon = (iconName: ServiceItem["iconName"]) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-blue-500" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-indigo-500" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-emerald-500" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-blue-500" />;
      case "Bot":
        return <Bot className="w-6 h-6 text-cyan-500" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-500" />;
      default:
        return <Code2 className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div id="services-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Services Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>{t.services.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {t.services.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
            {t.services.titleHighlight}
          </span>
        </h1>

        <p className={`text-base sm:text-lg ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
          {t.services.desc}
        </p>
      </div>

      {/* 2. Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className="glass-card-hover group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Header Icon, Badge & Number */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-blue-500/10">
                  {getIcon(service.iconName)}
                </div>
                <div className="flex items-center gap-2">
                  {service.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      {service.badge}
                    </span>
                  )}
                  <span className={`text-xl font-mono font-bold transition-colors ${
                    theme === "dark" ? "text-zinc-600 group-hover:text-blue-400" : "text-slate-300 group-hover:text-blue-500"
                  }`}>
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Titles */}
              <div>
                <h2 className={`text-xl font-bold transition-colors ${
                  theme === "dark" ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-600"
                }`}>
                  {service.title}
                </h2>
                <p className="text-xs text-blue-500 font-medium mt-1">
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {service.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className={`text-xs font-semibold uppercase tracking-wider font-mono ${
                  theme === "dark" ? "text-zinc-400" : "text-slate-500"
                }`}>
                  {t.services.pointsForts}
                </span>
                <ul className="space-y-2">
                  {service.highlights.map((h, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs ${
                      theme === "dark" ? "text-zinc-300" : "text-slate-700"
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className={`p-3 rounded-xl border text-[12px] ${
                theme === "dark" ? "bg-white/[0.02] border-white/10 text-zinc-400" : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <strong className={theme === "dark" ? "text-zinc-200" : "text-slate-800"}>
                  {t.services.idealFor}
                </strong>{" "}
                {service.idealFor}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-6 mt-6 border-t border-white/10">
              {service.directAction === "guide-ia-pro" ? (
                <button
                  id={`service-cta-${service.id}`}
                  onClick={() => {
                    if (onNavigateToPage) onNavigateToPage("guide-ia-pro");
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 group/btn cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.services.discoverGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              ) : service.directAction === "contact" ? (
                <button
                  id={`service-cta-${service.id}`}
                  onClick={onNavigateToContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 group/btn cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{t.services.requestTraining}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              ) : service.playgroundTab ? (
                <button
                  id={`service-cta-${service.id}`}
                  onClick={() => onSelectPlaygroundTab(service.playgroundTab!)}
                  className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-blue-600 text-blue-500 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all group/btn cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover/btn:text-white" />
                  <span>{t.services.testThisInTestAi}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  id={`service-cta-${service.id}`}
                  onClick={onNavigateToContact}
                  className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-blue-600 text-blue-500 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all group/btn cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.services.discussProject}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Integrated Working Methodology */}
      <div className="pt-12 border-t border-white/10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.services.methodologyBadge}</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            {t.services.methodologyTitle}
          </h2>

          <p className={`text-sm sm:text-base ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
            {t.services.methodologyDesc}
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologySteps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Step number + Duration */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono text-blue-500">
                    {step.number}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </span>
                </div>

                <h3 className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {step.title}
                </h3>

                <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                  {step.description}
                </p>

                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  {step.bullets.map((b, i) => (
                    <div key={i} className={`flex items-start gap-1.5 text-[11px] ${
                      theme === "dark" ? "text-zinc-400" : "text-slate-600"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="rounded-2xl glass-card border border-emerald-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.services.guaranteeTitle}
              </h3>
              <p className={`text-xs sm:text-sm mt-0.5 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {t.services.guaranteeDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToContact}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
          >
            <span>{t.contact.badge} →</span>
          </button>
        </div>
      </div>

    </div>
  );
};

