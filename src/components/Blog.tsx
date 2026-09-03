import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  X,
  Sparkles,
  User,
  Image as ImageIcon,
} from "lucide-react";
import { BlogPost, Language, ThemeMode } from "../types";
import { getStoredBlogPosts, getProfilePhoto } from "../data/contentStore";
import { useTranslation } from "../data/translations";

interface BlogProps {
  language: Language;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const Blog: React.FC<BlogProps> = ({
  language,
  theme,
  onContactClick,
}) => {
  const t = useTranslation(language);
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts(language));
  const [profilePhoto, setProfilePhoto] = useState<string>(() => getProfilePhoto());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setPosts(getStoredBlogPosts(language));
    setProfilePhoto(getProfilePhoto());
  }, [language]);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts(language));
      setProfilePhoto(getProfilePhoto());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("capin_content_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("capin_content_updated", handleUpdate);
    };
  }, [language]);

  // Unique categories
  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Helper to parse paragraph (supports Markdown image ![alt](url))
  const renderParagraphContent = (paragraph: string, i: number) => {
    // Check if it's an image markdown: ![alt](url)
    const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      const altText = imageMatch[1] || "Illustration de l'article";
      const imageUrl = imageMatch[2];
      return (
        <figure key={i} className="my-6 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-xl">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full max-h-[420px] object-cover hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
          {altText && (
            <figcaption className={`p-2.5 text-center text-xs font-mono italic border-t ${
              theme === "dark" ? "bg-white/[0.02] border-white/10 text-zinc-400" : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              {altText}
            </figcaption>
          )}
        </figure>
      );
    }

    if (paragraph.startsWith("### ")) {
      return (
        <h3
          key={i}
          className={`text-lg sm:text-xl font-bold pt-4 pb-1 ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          {paragraph.replace("### ", "")}
        </h3>
      );
    }
    if (paragraph.startsWith("## ")) {
      return (
        <h2
          key={i}
          className={`text-xl sm:text-2xl font-bold pt-5 pb-1 ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          {paragraph.replace("## ", "")}
        </h2>
      );
    }
    if (paragraph.startsWith("- ")) {
      return (
        <div key={i} className="flex items-start gap-2 pl-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
          <span>{paragraph.replace("- ", "")}</span>
        </div>
      );
    }
    return <p key={i}>{paragraph}</p>;
  };

  return (
    <div id="blog-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.blog.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {t.blog.title}
        </h1>

        <p className={`text-base sm:text-lg ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
          {t.blog.desc}
        </p>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            theme === "dark" ? "text-zinc-400" : "text-slate-400"
          }`} />
          <input
            id="blog-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.blog.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                  : "glass-card hover:bg-white/10"
              }`}
            >
              {cat === "all" ? t.blog.filterAll : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 space-y-3 glass-card rounded-2xl">
          <BookOpen className="w-8 h-8 mx-auto text-zinc-500" />
          <p className="text-sm text-zinc-400">{t.blog.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              className="glass-card-hover group rounded-2xl p-5 sm:p-7 flex flex-col justify-between space-y-5 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Optional Cover Image Banner */}
                {post.coverImage && (
                  <div
                    onClick={() => setActivePost(post)}
                    className="w-full h-44 sm:h-52 rounded-xl overflow-hidden cursor-pointer relative group-hover:opacity-95 transition-opacity border border-white/10"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* Meta Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/30 font-semibold">
                    {post.category}
                  </span>
                  <div className={`flex items-center gap-3 ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime} {t.blog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
                    </span>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h2
                    onClick={() => setActivePost(post)}
                    className={`text-lg sm:text-xl font-bold transition-colors leading-snug cursor-pointer ${
                      theme === "dark" ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-600"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <p className={`text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed ${
                    theme === "dark" ? "text-zinc-300" : "text-slate-600"
                  }`}>
                    {post.summary}
                  </p>
                </div>

                {/* Key takeaways box preview */}
                {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    theme === "dark" ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="text-blue-500 font-semibold flex items-center gap-1.5 font-mono text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> {t.blog.keyTakeaways}
                    </div>
                    <ul className="space-y-1">
                      {post.keyTakeaways.slice(0, 2).map((k, i) => (
                        <li key={i} className={`flex items-start gap-1.5 ${
                          theme === "dark" ? "text-zinc-300" : "text-slate-600"
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{k}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] px-2.5 py-0.5 rounded-md font-mono border ${
                        theme === "dark" ? "bg-white/[0.03] text-zinc-400 border-white/10" : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Read Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 border border-white/20">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>CA</span>
                    )}
                  </div>
                  <span className={`font-medium ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}`}>
                    {post.author.name}
                  </span>
                </div>

                <button
                  id={`read-article-${post.id}`}
                  onClick={() => setActivePost(post)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                >
                  <span>{t.blog.readArticle}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4. Full Article Reader Modal */}
      {activePost && (
        <div
          id="article-reader-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActivePost(null)}
        >
          <div
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel p-5 sm:p-8 md:p-10 text-left shadow-2xl space-y-6 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Navigation Top */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.blog.backToArticles}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activePost)}
                  className="px-3 py-1.5 rounded-xl glass-card text-xs flex items-center gap-1.5 text-zinc-400 hover:text-white"
                  title="Partager"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Lien copié !" : t.blog.shareArticle}</span>
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-1.5 rounded-xl glass-card text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cover Image in Modal */}
            {activePost.coverImage && (
              <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/30 text-xs font-mono font-semibold">
                  {activePost.category}
                </span>
                <span className={`text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                  {activePost.publishedDate} • {activePost.readTime} {t.blog.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {activePost.title}
              </h1>

              {/* Author Bar */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/20">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt={activePost.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>CA</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm">{activePost.author.name}</div>
                  <div className={`text-xs font-mono ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    {activePost.author.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Takeaways Box */}
            {activePost.keyTakeaways && activePost.keyTakeaways.length > 0 && (
              <div className={`p-5 rounded-2xl border space-y-3 ${
                theme === "dark" ? "bg-blue-500/5 border-blue-500/30" : "bg-blue-50 border-blue-200"
              }`}>
                <div className="text-blue-500 font-bold flex items-center gap-2 text-sm font-mono">
                  <Sparkles className="w-4 h-4" /> {t.blog.keyTakeaways}
                </div>
                <ul className="space-y-2">
                  {activePost.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs sm:text-sm ${
                      theme === "dark" ? "text-zinc-200" : "text-slate-700"
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body Content */}
            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
              theme === "dark" ? "text-zinc-300" : "text-slate-700"
            }`}>
              {activePost.content.map((paragraph, i) => renderParagraphContent(paragraph, i))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {activePost.tags.map((tagItem, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-lg font-mono border ${
                    theme === "dark" ? "glass-card text-zinc-300" : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  #{tagItem}
                </span>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="p-6 rounded-2xl glass-card border border-blue-500/30 text-center space-y-4">
              <h4 className="font-bold text-base">{t.blog.ctaArticleTitle}</h4>
              <button
                id="blog-modal-contact-cta"
                onClick={() => {
                  setActivePost(null);
                  onContactClick();
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <span>{t.blog.ctaArticleBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
