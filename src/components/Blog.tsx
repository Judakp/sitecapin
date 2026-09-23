import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { BlogPost, Language, ThemeMode } from "../types";
import { getProfilePhoto } from "../data/contentStore";
import { useTranslation } from "../data/translations";
import { supabase } from "../lib/supabase";

interface BlogProps {
  language: Language;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const Blog: React.FC<BlogProps> = ({
  language,
  theme,
}) => {
  const t = useTranslation(language);
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [profilePhoto, setProfilePhoto] = useState<string>(() => getProfilePhoto());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Récupération des articles depuis Supabase filtrés par langue
  useEffect(() => {
    let isMounted = true;

    async function fetchSupabasePosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("language", language)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erreur lors de la récupération Supabase:", error.message);
        } else if (data && isMounted) {
          const formattedPosts: BlogPost[] = data.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            summary: item.summary,
            content: item.content,
            category: item.category,
            readTime: item.read_time,
            publishedDate: item.published_date,
            coverImage: item.cover_image,
            tags: item.tags || [],
            keyTakeaways: item.key_takeaways || [],
            author: item.author,
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error("Erreur réseau Supabase:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSupabasePosts();
    setProfilePhoto(getProfilePhoto());

    return () => {
      isMounted = false;
    };
  }, [language]);

  // Unique categories
  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];

  // Filtrage sécurisé des articles
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (post.title || "").toLowerCase().includes(query) ||
      (post.summary || "").toLowerCase().includes(query) ||
      (post.tags || []).some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleReadArticle = (post: BlogPost) => {
    const slug = post.slug || post.id;
    navigate(`/${language}/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* 3. Articles Grid / Loading State */}
      {loading ? (
        <div className="text-center py-24 space-y-3">
          <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" />
          <p className="text-xs text-zinc-400 font-mono">
            {language === "fr" ? "Chargement des articles..." : "Loading articles..."}
          </p>
        </div>
      ) : filteredPosts.length === 0 ? (
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
                    onClick={() => handleReadArticle(post)}
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
                    onClick={() => handleReadArticle(post)}
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
                      <img src={profilePhoto} alt={post.author?.name || "Capin Akpado"} className="w-full h-full object-cover" />
                    ) : (
                      <span>CA</span>
                    )}
                  </div>
                  <span className={`font-medium ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}`}>
                    {post.author?.name || "Capin Akpado"}
                  </span>
                </div>

                <button
                  id={`read-article-${post.id}`}
                  onClick={() => handleReadArticle(post)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                >
                  <span>{t.blog.readArticle}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};