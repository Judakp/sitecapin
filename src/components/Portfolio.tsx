import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderKanban,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  X,
  Quote,
  Layers,
  Cpu,
  Shield,
  Zap,
  ExternalLink,
} from "lucide-react";
import { CaseStudy, Language, ThemeMode } from "../types";
import { getCaseStudies } from "../data/portfolioData";
import { useTranslation } from "../data/translations";
import { SEO } from "./SEO";

interface PortfolioProps {
  language: Language;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  language,
  theme,
  onContactClick,
}) => {
  const t = useTranslation(language);
  const caseStudies = getCaseStudies(language);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = [
    { id: "all", label: t.portfolio.filterAll },
    { id: "ai-automation", label: t.portfolio.filterAutomation },
    { id: "seo", label: t.portfolio.filterSeo },
    { id: "web", label: t.portfolio.filterWeb },
    { id: "mobile", label: t.portfolio.filterMobile },
  ];

  const filteredStudies = caseStudies.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "ai-automation") return item.category.includes("Auto") || item.category.includes("IA") || item.category.includes("AI");
    if (selectedCategory === "seo") return item.category.includes("SEO") || item.category.includes("Marketing");
    if (selectedCategory === "web") return item.category.includes("Web");
    if (selectedCategory === "mobile") return item.category.includes("Mobil");
    return true;
  });

  return (
    <div id="portfolio-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* BALISE SEO POUR LE PORTFOLIO */}
      <SEO 
        title={language === "fr" ? "Portfolio & Études de cas | Capin Akpado" : "Portfolio & Case Studies | Capin Akpado"}
        description={language === "fr" 
          ? "Explorez mes projets récents et études de cas en développement web, applications mobiles et intégration d'IA pour des entreprises variées." 
          : "Explore my recent projects and case studies in web development, mobile apps, and AI integration for various businesses."}
        language={language}
        url={`https://capinakpado.com/${language}/portfolio`}
      />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>{t.portfolio.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {t.portfolio.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
            {t.portfolio.titleHighlight}
          </span>
        </h1>

        <p className={`text-base sm:text-lg ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
          {t.portfolio.desc}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold"
                : "glass-card hover:bg-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Case Studies Grid (Animated with Framer Motion) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            id={`study-card-${study.id}`}
            className="glass-card-hover group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Category & Badge Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                  theme === "dark" ? "bg-white/[0.04] border-white/10 text-zinc-300" : "bg-slate-100 border-slate-200 text-slate-700"
                }`}>
                  {study.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-1.5 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {study.badge}
                </span>
              </div>

              {/* Title & Client / Cible */}
              <div>
                <h2 className={`text-xl font-bold transition-colors ${
                  theme === "dark" ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-600"
                }`}>
                  {study.title}
                </h2>
                <p className={`text-xs font-mono mt-1.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                  {t.portfolio.client} <span className={theme === "dark" ? "text-zinc-200 font-semibold" : "text-slate-800 font-semibold"}>{study.client}</span>
                </p>
              </div>

              {/* Structured Problem / Solution */}
              <div className="space-y-3 pt-2">
                <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  theme === "dark" ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-200"
                }`}>
                  <div className="text-rose-500 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                    <span>✕</span> {t.portfolio.initialProblem}
                  </div>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}`}>
                    {study.problem}
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  theme === "dark" ? "bg-blue-500/5 border-blue-500/20" : "bg-blue-50 border-blue-200"
                }`}>
                  <div className="text-blue-500 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> {t.portfolio.deployedSolution}
                  </div>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}`}>
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Impact Metrics Row */}
              <div className="pt-3 border-t border-white/10">
                <div className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                  theme === "dark" ? "text-zinc-400" : "text-slate-500"
                }`}>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  {t.portfolio.measuredImpact}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {study.impact.map((imp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl glass-card text-center">
                      <div className="text-base sm:text-lg font-extrabold font-mono text-blue-500">
                        {imp.metric}
                      </div>
                      <div className={`text-[10px] leading-tight mt-0.5 line-clamp-2 ${
                        theme === "dark" ? "text-zinc-400" : "text-slate-500"
                      }`}>
                        {imp.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {study.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] px-2.5 py-0.5 rounded-md font-mono border ${
                      theme === "dark" ? "bg-white/[0.04] text-zinc-300 border-white/10" : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-6 mt-6 border-t border-white/10 flex gap-2">
              <button
                id={`view-study-${study.id}`}
                onClick={() => setActiveModalStudy(study)}
                className="w-full py-2.5 rounded-xl glass-card hover:bg-blue-600 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t.portfolio.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* Tech Stack & Engineering Standards Banner */}
      <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.portfolio.statsCardTitle}
            </h3>
            <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
              {t.portfolio.statsCardDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            "Frontend & UI/UX Moderne",
            "Architecture TypeScript & Web",
            "Ingénierie d'Agents IA & LLM",
            "Automatisation & Workflows",
            "Bases de Données & Cloud",
            "Conception & Intégration d'APIs",
            "Déploiement & DevOps",
            "SEO & Stratégie Content Marketing"
          ].map((skill, i) => (
            <div key={i} className="p-2.5 rounded-xl glass-card flex items-center gap-2 text-xs font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail (Animated with Framer Motion AnimatePresence) */}
      <AnimatePresence>
        {activeModalStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="study-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveModalStudy(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel p-6 sm:p-8 text-left shadow-2xl space-y-6 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="close-study-modal"
                onClick={() => setActiveModalStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-xl glass-card text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="pr-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-mono">
                    {activeModalStudy.category}
                  </span>
                  <span className="text-xs text-emerald-500 font-bold font-mono">
                    {activeModalStudy.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold">
                  {activeModalStudy.title}
                </h3>
                <p className={`text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                  {t.portfolio.client} {activeModalStudy.client}
                </p>
              </div>

              {/* Details */}
              <div className={`space-y-4 text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}`}>
                <div className={`p-4 rounded-xl border space-y-2 ${
                  theme === "dark" ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-200"
                }`}>
                  <h4 className="font-bold text-rose-500 text-xs uppercase tracking-wider font-mono">
                    {t.portfolio.modalProblem}
                  </h4>
                  <p className="leading-relaxed">{activeModalStudy.problem}</p>
                </div>

                <div className={`p-4 rounded-xl border space-y-2 ${
                  theme === "dark" ? "bg-blue-500/5 border-blue-500/20" : "bg-blue-50 border-blue-200"
                }`}>
                  <h4 className="font-bold text-blue-500 text-xs uppercase tracking-wider font-mono">
                    {t.portfolio.modalSolution}
                  </h4>
                  <p className="leading-relaxed">{activeModalStudy.solution}</p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-blue-500" />
                    {t.portfolio.modalDeliverables}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {activeModalStudy.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg glass-card">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial if present */}
                {activeModalStudy.testimonial && (
                  <div className={`p-4 rounded-xl border space-y-2 relative ${
                    theme === "dark" ? "bg-blue-500/5 border-blue-500/20" : "bg-blue-50 border-blue-200"
                  }`}>
                    <Quote className="w-6 h-6 text-blue-500/30 absolute top-3 right-3" />
                    <p className="italic text-xs sm:text-sm">
                      « {activeModalStudy.testimonial.quote} »
                    </p>
                    <div className={`text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                      <strong className={theme === "dark" ? "text-white" : "text-slate-900"}>
                        {activeModalStudy.testimonial.author}
                      </strong> — {activeModalStudy.testimonial.role}, {activeModalStudy.testimonial.company}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                {activeModalStudy.liveUrl && (
                  <a
                    href={activeModalStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 border border-white/20 cursor-pointer"
                  >
                    <span>Visiter le site en direct</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  id="modal-cta-contact"
                  onClick={() => {
                    setActiveModalStudy(null);
                    onContactClick();
                  }}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 border border-white/20 cursor-pointer"
                >
                  <span>{t.portfolio.discussSimilar}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="py-3 px-5 rounded-xl glass-card text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                  {t.portfolio.close}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};