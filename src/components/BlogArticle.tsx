import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { Language, ThemeMode } from "../types";
import { getBlogPosts } from "../data/blogData";

interface BlogArticleProps {
  language: Language;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const BlogArticle: React.FC<BlogArticleProps> = ({
  language,
  theme,
  onContactClick,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const posts = getBlogPosts(language);
  const article = posts.find((p) => p.slug === slug || p.id === slug);

  // Mettre à jour le titre SEO de la page dynamiquement
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Capin Akpado`;
    } else {
      document.title = "Article non trouvé | Capin Akpado";
    }
  }, [article]);

  if (!article) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {language === "fr" ? "Article non trouvé" : "Article Not Found"}
        </h1>
        <p className="text-zinc-400 text-sm">
          {language === "fr" 
            ? "L'article que vous cherchez n'existe pas ou a été déplacé." 
            : "The article you are looking for does not exist or has been moved."}
        </p>
        <button
          onClick={() => navigate(`/${language}/blog`)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "fr" ? "Retour au blog" : "Back to Blog"}</span>
        </button>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Bouton Retour */}
      <div>
        <button
          onClick={() => navigate(`/${language}/blog`)}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isDark
              ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === "fr" ? "Tous les articles" : "All Articles"}</span>
        </button>
      </div>

      {/* En-tête Article */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
            {article.category}
          </span>
          <span className="text-zinc-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-zinc-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedDate}
          </span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          {article.title}
        </h1>

        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
          {article.summary}
        </p>
      </div>

      {/* Image de couverture si présente */}
      {article.coverImage && (
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* BLOC : CE QUE JE RETIENS (Keepers preserved) */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-3">
          <h3 className="text-sm font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{language === "fr" ? "Ce que je retiens :" : "Key Takeaways:"}</span>
          </h3>
          <ul className="space-y-2">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contenu principal de l'article */}
      <div className={`prose max-w-none text-sm sm:text-base leading-relaxed space-y-4 ${
        isDark ? "text-zinc-300" : "text-slate-700"
      }`}>
        {Array.isArray(article.content) ? (
          article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>{article.content}</p>
        )}
      </div>

      {/* Footer Article & CTA Contact */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-zinc-400 font-mono">
          Auteur : <strong className="text-white">{article.author.name}</strong> ({article.author.role})
        </div>

        <button
          onClick={onContactClick}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
        >
          <span>{language === "fr" ? "Discuter d'un projet similaire" : "Discuss a Similar Project"}</span>
        </button>
      </div>

    </article>
  );
};