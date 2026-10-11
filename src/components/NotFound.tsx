import React from "react";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Language, PageView, ThemeMode } from "../types";

interface NotFoundProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-[70vh] flex items-center justify-center px-4 py-24 ${
        isDark ? "bg-black text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-full max-w-2xl text-center space-y-7">
        <div className="mx-auto w-20 h-20 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-center">
          <SearchX className="w-10 h-10 text-blue-500" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-mono tracking-[0.3em] uppercase text-blue-500">
            404
          </p>

          <h1 className="text-3xl sm:text-5xl font-extrabold">
            {language === "fr" ? "Page introuvable" : "Page not found"}
          </h1>

          <p
            className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            {language === "fr"
              ? "L’adresse demandée ne correspond à aucune page disponible sur ce site."
              : "The requested address does not correspond to any page available on this website."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            {language === "fr" ? "Retour à l’accueil" : "Back to home"}
          </button>

          <button
            type="button"
            onClick={() => onNavigate("services")}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-colors ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200"
                : "border-slate-200 bg-white hover:bg-slate-100 text-slate-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "fr" ? "Voir les services" : "View services"}
          </button>
        </div>
      </div>
    </section>
  );
};
