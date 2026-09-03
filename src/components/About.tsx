import React, { useState, useEffect } from "react";
import {
  User,
  Cpu,
  Sparkles,
  CheckCircle2,
  Calendar,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Award,
  Terminal,
  ShieldCheck,
  Zap,
  Code2,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Language, ThemeMode, PageView } from "../types";
import { useTranslation } from "../data/translations";
import { getSiteSettings, getProfilePhoto } from "../data/contentStore";

interface AboutProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const About: React.FC<AboutProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const t = useTranslation(language);
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());
  const [profilePhoto, setProfilePhoto] = useState<string>(() => getProfilePhoto());

  useEffect(() => {
    setSiteSettings(getSiteSettings());
    setProfilePhoto(getProfilePhoto());
  }, [language]);

  useEffect(() => {
    const handleUpdate = () => {
      setSiteSettings(getSiteSettings());
      setProfilePhoto(getProfilePhoto());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("capin_content_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("capin_content_updated", handleUpdate);
    };
  }, [language]);

  const techCategories = [
    {
      name: language === "fr" ? "Frontend & Design UX" : "Frontend & UX Design",
      icon: <Code2 className="w-4 h-4 text-blue-500" />,
      skills: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "Motion"],
    },
    {
      name: language === "fr" ? "Intelligence Artificielle & Agents" : "Artificial Intelligence & Agents",
      icon: <Cpu className="w-4 h-4 text-indigo-500" />,
      skills: ["Gemini 2.0 / Flash", "LLM Prompting & Function Calling", "RAG & Vector Search", "Agents Autonomes", "LangChain"],
    },
    {
      name: language === "fr" ? "Backend & Automatisation" : "Backend & Automation",
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      skills: ["Node.js / Express", "Python", "Make / Zapier API", "Webhooks & REST APIs", "WebSockets"],
    },
    {
      name: language === "fr" ? "Bases de Données & Cloud" : "Databases & Cloud",
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      skills: ["PostgreSQL", "Firestore / Firebase", "Docker", "Git / GitHub CI", "Cloud Run"],
    },
  ];

  return (
    <div id="about-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* 1. Header & Identity Presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
          <User className="w-3.5 h-3.5" />
          <span>{t.about.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {t.about.title}
        </h1>

        <p className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400">
          {(language === "fr" ? siteSettings.aboutRoleFr : siteSettings.aboutRoleEn) || t.about.role}
        </p>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
          theme === "dark" ? "text-zinc-300" : "text-slate-600"
        }`}>
          {(language === "fr" ? siteSettings.aboutShortBioFr : siteSettings.aboutShortBioEn) || t.about.shortBio}
        </p>
      </div>

      {/* 2. Hero Profile Card with Photo & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Profile Photo & Fast Facts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 text-center relative border border-blue-500/20 shadow-2xl">
            
            {/* Photo Container */}
            <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden glass-card border-2 border-blue-500/30 p-1.5 shadow-xl group">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Capin Judicael Akpado"
                  className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105 duration-300"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-black flex flex-col items-center justify-center text-center p-4 border border-white/10">
                  <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-600/40 mb-2">
                    CA
                  </div>
                  <span className="text-xs font-bold font-mono tracking-tight text-white">
                    {siteSettings.authorName || "Capin J. Akpado"}
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono mt-0.5">
                    {(language === "fr" ? siteSettings.authorRoleFr : siteSettings.authorRoleEn) || "Architecte IA & Dev"}
                  </span>
                </div>
              )}

              {/* Status Badge overlay */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Actif</span>
              </div>
            </div>

            {/* Quick Contact & Links */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-left">
              <div className="flex items-center gap-2 text-blue-500 font-mono">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${siteSettings.email || "judicaelakpado@gmail.com"}`} className="hover:underline truncate">
                  {siteSettings.email || "judicaelakpado@gmail.com"}
                </a>
              </div>
              <div className={`flex items-center gap-2 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                <MapPin className="w-4 h-4 shrink-0 text-zinc-400" />
                <span>{siteSettings.location || t.about.location}</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`mailto:${siteSettings.email || "judicaelakpado@gmail.com"}`}
                  className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.linkedinUrl || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.githubUrl || "https://github.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-card hover:text-blue-500 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="glass-card p-3.5 rounded-2xl">
              <div className="text-xl sm:text-2xl font-extrabold text-blue-500 font-mono">
                {siteSettings.aboutExperienceYears || "5+"}
              </div>
              <div className={`text-[10px] sm:text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                {language === "fr" ? "Années Exp." : "Years Exp."}
              </div>
            </div>
            <div className="glass-card p-3.5 rounded-2xl">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-500 font-mono">
                {siteSettings.aboutCompletedProjects || "40+"}
              </div>
              <div className={`text-[10px] sm:text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                {language === "fr" ? "Projets Livrés" : "Completed Projects"}
              </div>
            </div>
            <div className="glass-card p-3.5 rounded-2xl">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-500 font-mono">
                {siteSettings.aboutSatisfactionRate || "100%"}
              </div>
              <div className={`text-[10px] sm:text-xs mt-0.5 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: In-depth Story & Vision */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-blue-500 font-mono text-xs font-semibold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>{t.about.storyTitle}</span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {language === "fr"
                ? "Bâtir des outils digitaux d'exception qui libèrent le potentiel humain."
                : "Building high-performance digital tools that unlock human potential."}
            </h2>

            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
              theme === "dark" ? "text-zinc-300" : "text-slate-600"
            }`}>
              <p>
                {(language === "fr" ? siteSettings.aboutBioFr : siteSettings.aboutBioEn) || (
                  language === "fr" ? (
                    <>
                      Bonjour ! Je suis <strong className="text-blue-500 font-semibold">{siteSettings.authorName || "Capin Judicael Akpado"}</strong>. Architecte de solutions web et expert en intelligence artificielle, j'accompagne les dirigeants, entrepreneurs et équipes modernes pour concevoir des logiciels sur-mesure et déployer des agents autonomes.
                    </>
                  ) : (
                    <>
                      Hello! I am <strong className="text-blue-500 font-semibold">{siteSettings.authorName || "Capin Judicael Akpado"}</strong>. As a web solutions architect and artificial intelligence expert, I partner with executives, founders, and modern teams to engineer custom software and deploy autonomous agents.
                    </>
                  )
                )}
              </p>
              <p>
                {(language === "fr" ? siteSettings.aboutPhilosophyFr : siteSettings.aboutPhilosophyEn) || t.about.storyP2}
              </p>
              <p>{t.about.storyP3}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.about.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("portfolio")}
                className="glass-card hover:bg-white/10 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all"
              >
                <span>{t.nav.portfolio}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Tech Stack & Core Competencies */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Stack & Outils</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.about.skillsTitle}
          </h2>
          <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
            {t.about.skillsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 space-y-4 hover:border-blue-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  {cat.icon}
                </div>
                <h3 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {cat.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                      theme === "dark"
                        ? "bg-white/[0.03] text-zinc-300 border-white/10"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Values & Work Principles */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-emerald-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Principes</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.about.valuesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.about.values.map((val, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-500 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <h3 className={theme === "dark" ? "text-white" : "text-slate-900"}>{val.title}</h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed pl-7 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Career Journey & Milestones */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-indigo-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Parcours</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.about.timelineTitle}
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {t.about.timeline.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border">
              <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-500 font-mono font-bold text-xs sm:text-sm shrink-0 w-fit border border-blue-500/20">
                {item.year}
              </div>
              <div className="space-y-1">
                <h3 className={`font-bold text-sm sm:text-base ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CTA Banner */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 text-center space-y-6 border border-blue-500/30">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.about.ctaTitle}
          </h2>
          <p className={`text-sm sm:text-base ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
            {t.about.ctaDesc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 border border-white/20"
          >
            <Calendar className="w-5 h-5" />
            <span>{t.about.ctaButton}</span>
          </button>
          
          <a
            href="mailto:judicaelakpado@gmail.com"
            className="px-6 py-4 rounded-xl glass-card hover:bg-white/10 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>{t.about.ctaDirectEmail}</span>
          </a>
        </div>
      </div>

    </div>
  );
};
