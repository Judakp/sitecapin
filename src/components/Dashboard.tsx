import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Save,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Upload,
  Download,
  Sliders,
  Clock,
  Calendar,
  Layers,
  User,
  Mail,
  ExternalLink,
  Tag,
  Share2,
  Bot,
  Terminal,
  HelpCircle,
  Copy,
} from "lucide-react";
import { BlogPost, Language, ThemeMode, PageView, LogoConfig } from "../types";
import {
  getLogoConfig,
  saveLogoConfig,
  getProfilePhoto,
  saveProfilePhoto,
  getStoredBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  resetBlogPosts,
  getSiteSettings,
  saveSiteSettings,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
  exportAllData,
  importAllData,
  SiteSettings,
} from "../data/contentStore";

interface DashboardProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  // Navigation tabs within dashboard
  const [activeTab, setActiveTab] = useState<"blog" | "logo" | "pages" | "newsletter" | "backup">("blog");
  const [subscribers, setSubscribers] = useState(() => getNewsletterSubscribers());

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- LOGO & MEDIA STATE ---
  const [logoConfig, setLogoConfigState] = useState<LogoConfig>(getLogoConfig());
  const [profilePhoto, setProfilePhotoState] = useState<string>(getProfilePhoto());
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  // --- BLOG STATE ---
  const [blogLang, setBlogLang] = useState<Language>(language);
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts(language));
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [blogPreviewMode, setBlogPreviewMode] = useState(false);
  const [aiPromptTopic, setAiPromptTopic] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Form fields for editing/creating post
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Intelligence Artificielle");
  const [postReadTime, setPostReadTime] = useState("5");
  const [postPublishedDate, setPostPublishedDate] = useState(
    new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  );
  const [postSummary, setPostSummary] = useState("");
  const [postContentText, setPostContentText] = useState("");
  const [postKeyTakeawaysText, setPostKeyTakeawaysText] = useState("");
  const [postTagsText, setPostTagsText] = useState("");

  // --- SITE PAGES & SETTINGS STATE ---
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  // Reload data on custom storage event
  useEffect(() => {
    const handleContentUpdate = () => {
      setLogoConfigState(getLogoConfig());
      setProfilePhotoState(getProfilePhoto());
      setPosts(getStoredBlogPosts(blogLang));
      setSettings(getSiteSettings());
    };
    window.addEventListener("storage", handleContentUpdate);
    window.addEventListener("capin_content_updated", handleContentUpdate);
    return () => {
      window.removeEventListener("storage", handleContentUpdate);
      window.removeEventListener("capin_content_updated", handleContentUpdate);
    };
  }, [blogLang]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const updated = { ...logoConfig, url: result };
        setLogoConfigState(updated);
        saveLogoConfig(updated);
        showToast("✅ Nouveau logo importé avec succès !");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateLogoSetting = (key: keyof LogoConfig, val: any) => {
    const updated = { ...logoConfig, [key]: val };
    setLogoConfigState(updated);
    saveLogoConfig(updated);
  };

  // Handle Profile Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfilePhotoState(result);
        saveProfilePhoto(result);
        showToast("✅ Photo de profil mise à jour !");
      };
      reader.readAsDataURL(file);
    }
  };

  // Initialize Blog Editor with a post
  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreatingNew(false);
    setPostTitle(post.title);
    setPostCategory(post.category);
    setPostReadTime(post.readTime);
    setPostPublishedDate(post.publishedDate);
    setPostSummary(post.summary);
    setPostContentText(post.content.join("\n\n"));
    setPostKeyTakeawaysText(post.keyTakeaways.join("\n"));
    setPostTagsText(post.tags.join(", "));
    setBlogPreviewMode(false);
  };

  const startNewPost = () => {
    const newId = "article-" + Date.now();
    setEditingPost({
      id: newId,
      slug: newId,
      title: "",
      summary: "",
      category: "Intelligence Artificielle",
      readTime: "5",
      publishedDate: new Date().toLocaleDateString(blogLang === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      author: {
        name: settings.authorName,
        role: blogLang === "fr" ? settings.authorRoleFr : settings.authorRoleEn,
      },
      tags: ["Intelligence Artificielle", "Productivité"],
      keyTakeaways: [],
      content: [],
    });
    setIsCreatingNew(true);
    setPostTitle("");
    setPostCategory("Intelligence Artificielle");
    setPostReadTime("5");
    setPostPublishedDate(
      new Date().toLocaleDateString(blogLang === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    setPostSummary("");
    setPostContentText("");
    setPostKeyTakeawaysText("");
    setPostTagsText("Intelligence Artificielle, Automatisation, Web");
    setBlogPreviewMode(false);
  };

  // Save Blog Post
  const handleSaveCurrentPost = () => {
    if (!postTitle.trim()) {
      showToast("⚠️ Veuillez saisir un titre pour l'article.");
      return;
    }

    const contentArray = postContentText
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const takeawaysArray = postKeyTakeawaysText
      .split("\n")
      .map((t) => t.trim().replace(/^[-*•]\s*/, ""))
      .filter((t) => t.length > 0);

    const tagsArray = postTagsText
      .split(/[,#]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const slug = postTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const postToSave: BlogPost = {
      id: editingPost?.id || "post-" + Date.now(),
      slug: slug || "article-" + Date.now(),
      title: postTitle,
      category: postCategory,
      summary: postSummary,
      readTime: postReadTime || "5",
      publishedDate: postPublishedDate,
      author: {
        name: settings.authorName,
        role: blogLang === "fr" ? settings.authorRoleFr : settings.authorRoleEn,
      },
      tags: tagsArray.length > 0 ? tagsArray : ["Technologie"],
      keyTakeaways: takeawaysArray,
      content: contentArray.length > 0 ? contentArray : [postSummary],
    };

    saveBlogPost(postToSave, blogLang);
    setPosts(getStoredBlogPosts(blogLang));
    setEditingPost(null);
    setIsCreatingNew(false);
    showToast(`✅ Article "${postTitle}" sauvegardé et publié avec succès !`);
  };

  // Delete Blog Post
  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${title}" ?`)) {
      deleteBlogPost(id, blogLang);
      setPosts(getStoredBlogPosts(blogLang));
      if (editingPost?.id === id) {
        setEditingPost(null);
        setIsCreatingNew(false);
      }
      showToast("🗑️ Article supprimé.");
    }
  };

  // AI Generator Assistant for Blog
  const handleGenerateAiArticleDraft = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const topic = aiPromptTopic.trim() || "L'impact des Agents IA autonomes et de React 19 pour les PME en 2026";
      setPostTitle(
        blogLang === "fr"
          ? `${topic} : Stratégies et Guide Pratique 2026`
          : `${topic}: Strategies and Practical Guide 2026`
      );
      setPostCategory("Intelligence Artificielle");
      setPostReadTime("6");
      setPostSummary(
        blogLang === "fr"
          ? `Découvrez comment intégrer les dernières innovations en matière d'agents IA autonomes et d'architecture web pour transformer vos opérations et libérer plus de 15 heures par semaine.`
          : `Discover how to leverage autonomous AI agents and modern web architecture to streamline business operations and reclaim over 15 hours every week.`
      );
      setPostKeyTakeawaysText(
        blogLang === "fr"
          ? `- L'automatisation intelligente remplace les tâches répétitives par des agents connectés à vos outils métiers.\n- Un retour sur investissement mesurable dès les 30 premiers jours de mise en production.\n- L'importance d'une architecture robuste avec typage TypeScript et sécurité native.`
          : `- Intelligent automation replaces repetitive friction with agents integrated into your stack.\n- Measurable ROI achieved within the first 30 days of deployment.\n- The importance of robust type-safe web architecture and end-to-end security.`
      );
      setPostTagsText(
        blogLang === "fr"
          ? "Intelligence Artificielle, Automatisation, Productivité, PME, React 19"
          : "Artificial Intelligence, Automation, Productivity, Web Development"
      );
      setPostContentText(
        blogLang === "fr"
          ? `En 2026, l'intelligence artificielle n'est plus une simple fonctionnalité de confort : elle est le cœur battant de l'efficacité opérationnelle des entreprises modernes.\n\n### 1. Pourquoi franchir le pas dès aujourd'hui ?\n\nLes entreprises qui adoptent des flux automatisés constatent une réduction drastique des délais de traitement et une satisfaction client décuplée. Les tâches manuelles de saisie et de relance sont désormais déléguées à des agents autonomes fiables.\n\n### 2. Une architecture conçue pour la pérennité\n\nPour garantir des performances optimales, nous recommandons une stack moderne combinant React 19, TypeScript et des APIs serveurs sécurisées. Cette approche protège vos données stratégiques tout en offrant une expérience utilisateur fluide et soignée.\n\n### 3. Conclusion et passage à l'action\n\nCommencez par automatiser un premier processus clé pour valider l'impact immédiat sur votre quotidien avant d'étendre la démarche à l'ensemble de votre organisation.`
          : `In 2026, artificial intelligence is no longer an optional add-on: it has become the driving force behind modern operational excellence.\n\n### 1. Why Take Action Today?\n\nOrganizations implementing automated workflows experience drastic turnaround time reductions and elevated customer satisfaction. Manual data ingestion and follow-ups are seamlessly delegated to reliable autonomous agents.\n\n### 2. Architecting for Resilience\n\nTo ensure peak performance, we recommend combining React 19, TypeScript, and server-side API proxying. This safeguards strategic credentials while delivering an ultra-fast, delightful user experience.\n\n### 3. Key Takeaway and Next Steps\n\nStart by automating one high-friction process to validate immediate ROI before scaling across your entire digital ecosystem.`
      );
      setIsGeneratingAi(false);
      showToast("✨ Ébauche rédigée par l'assistant IA ! Vous pouvez l'ajuster avant de publier.");
    }, 900);
  };

  // Save Settings
  const handleSaveSettings = () => {
    saveSiteSettings(settings);
    showToast("✅ Informations et textes des pages enregistrés !");
  };

  // Export / Import
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportAllData());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `capin-site-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("💾 Sauvegarde JSON téléchargée avec succès !");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importAllData(content);
        if (success) {
          setLogoConfigState(getLogoConfig());
          setProfilePhotoState(getProfilePhoto());
          setPosts(getStoredBlogPosts(blogLang));
          setSettings(getSiteSettings());
          showToast("🎉 Données importées et appliquées avec succès !");
        } else {
          showToast("❌ Erreur lors de l'import du fichier JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div id="admin-dashboard-page" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-2xl shadow-blue-600/50 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/20">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Top Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Espace Administration & Gestion de Contenu</span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Tableau de Bord de Capin Akpado
          </h1>
          <p className={`text-xs sm:text-sm max-w-2xl ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
            Gérez votre logo, rédigez vos articles de blog, modifiez les textes de vos pages et personnalisez votre présence en direct.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => onNavigate("home")}
            className="px-4 py-2.5 rounded-xl glass-card hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-all"
            title="Voir le site en tant que visiteur"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>Voir le site</span>
          </button>

          <button
            onClick={() => onNavigate("blog")}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
          >
            <BookOpen className="w-4 h-4" />
            <span>Voir le Blog public</span>
          </button>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => {
            setActiveTab("blog");
            setEditingPost(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "blog"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>✍️ Rédaction Blog & Articles ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("logo")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "logo"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>🖼️ Logo & Format du Cadre</span>
        </button>

        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "pages"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>📄 Textes & Contenus des Pages</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("newsletter");
            setSubscribers(getNewsletterSubscribers());
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "newsletter"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>📬 Guide IA Pro & Abonnés ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("backup")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "backup"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>💾 Sauvegarde / Export JSON</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BLOG & ARTICLES MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "blog" && (
        <div className="space-y-8">
          
          {/* If NOT editing, show article list & create button */}
          {!editingPost ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Vos Articles Publiés & Brouillons
                  </h2>
                  <div className="flex items-center gap-1 p-1 rounded-lg glass-card text-xs font-mono">
                    <button
                      onClick={() => setBlogLang("fr")}
                      className={`px-2.5 py-1 rounded-md ${blogLang === "fr" ? "bg-blue-600 text-white font-bold" : "text-zinc-400"}`}
                    >
                      🇫🇷 FR
                    </button>
                    <button
                      onClick={() => setBlogLang("en")}
                      className={`px-2.5 py-1 rounded-md ${blogLang === "en" ? "bg-blue-600 text-white font-bold" : "text-zinc-400"}`}
                    >
                      🇬🇧 EN
                    </button>
                  </div>
                </div>

                <button
                  onClick={startNewPost}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Rédiger un nouvel article</span>
                </button>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-semibold">
                          {post.category}
                        </span>
                        <span className={theme === "dark" ? "text-zinc-400" : "text-slate-500"}>
                          {post.publishedDate}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold line-clamp-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {post.title}
                      </h3>

                      <p className={`text-xs line-clamp-3 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                        {post.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEditPost(post)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                          title="Modifier l'article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Éditer</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs transition-colors"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* BLOG POST EDITOR FORM */
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 space-y-6">
              
              {/* Editor Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
                <button
                  onClick={() => setEditingPost(null)}
                  className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour à la liste des articles</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBlogPreviewMode(!blogPreviewMode)}
                    className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold flex items-center gap-1.5 hover:bg-white/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>{blogPreviewMode ? "Mode Édition" : "Aperçu en Direct"}</span>
                  </button>

                  <button
                    onClick={handleSaveCurrentPost}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer & Publier</span>
                  </button>
                </div>
              </div>

              {/* AI Drafting Helper Bar */}
              <div className="p-4 rounded-2xl glass-card border border-blue-500/30 space-y-3 bg-blue-500/5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-4 h-4" /> Assistant de Rédaction IA pour Capin Akpado
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Génère instantanément un plan structuré et des paragraphes optimisés
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={aiPromptTopic}
                    onChange={(e) => setAiPromptTopic(e.target.value)}
                    placeholder="Ex: Automatisation du support client avec Gemini 2.0 en 2026..."
                    className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs focus:outline-none"
                  />
                  <button
                    onClick={handleGenerateAiArticleDraft}
                    disabled={isGeneratingAi}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    {isGeneratingAi ? <Bot className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>{isGeneratingAi ? "Génération..." : "Générer l'ébauche"}</span>
                  </button>
                </div>
              </div>

              {/* Form or Live Preview */}
              {!blogPreviewMode ? (
                <div className="space-y-5">
                  
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Titre de l'Article *
                    </label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Ex: Comment les Agents IA Révolutionnent les PME en 2026"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>

                  {/* Meta Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        placeholder="Intelligence Artificielle, Web, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                        Temps de Lecture (min)
                      </label>
                      <input
                        type="text"
                        value={postReadTime}
                        onChange={(e) => setPostReadTime(e.target.value)}
                        placeholder="5"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                        Date de Publication
                      </label>
                      <input
                        type="text"
                        value={postPublishedDate}
                        onChange={(e) => setPostPublishedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Summary / Hook */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Résumé d'accroche (Summary)
                    </label>
                    <textarea
                      rows={2}
                      value={postSummary}
                      onChange={(e) => setPostSummary(e.target.value)}
                      placeholder="Une brève description captivante qui apparaîtra sur les cartes de présentation..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
                    />
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Points Clés à Retenir (1 point par ligne)
                    </label>
                    <textarea
                      rows={3}
                      value={postKeyTakeawaysText}
                      onChange={(e) => setPostKeyTakeawaysText(e.target.value)}
                      placeholder="- Point clé 1&#10;- Point clé 2&#10;- Point clé 3"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed font-mono"
                    />
                  </div>

                  {/* Main Article Content */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                        Corps de l'Article (Paragraphes, Titres ###, Puces -)
                      </label>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        Astuce : Séparez les paragraphes par un double saut de ligne
                      </span>
                    </div>
                    <textarea
                      rows={12}
                      value={postContentText}
                      onChange={(e) => setPostContentText(e.target.value)}
                      placeholder="Rédigez ici le contenu complet de votre article...&#10;&#10;### 1. Titre de section&#10;&#10;Votre paragraphe explicatif...&#10;&#10;- Élément de liste 1&#10;- Élément de liste 2"
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed font-mono"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Mots-clés / Tags (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      value={postTagsText}
                      onChange={(e) => setPostTagsText(e.target.value)}
                      placeholder="Intelligence Artificielle, React 19, TypeScript, Productivité"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>

                </div>
              ) : (
                /* LIVE PREVIEW OF THE ARTICLE */
                <div className="p-6 sm:p-8 rounded-2xl glass-card border border-blue-500/30 space-y-6">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 font-semibold">
                      {postCategory}
                    </span>
                    <span className="text-zinc-400">
                      {postPublishedDate} • {postReadTime} min
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold">{postTitle || "Titre de l'article"}</h1>

                  <p className="text-sm text-zinc-300 italic">{postSummary}</p>

                  {/* Key Takeaways Box Preview */}
                  {postKeyTakeawaysText && (
                    <div className="p-4 rounded-xl glass-panel border-blue-500/30 space-y-2">
                      <div className="text-blue-500 font-bold text-xs font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Points Clés à Retenir
                      </div>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {postKeyTakeawaysText.split("\n").filter(Boolean).map((t, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{t.replace(/^[-*•]\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Content Paragraphs */}
                  <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {postContentText.split("\n\n").filter(Boolean).map((par, i) => {
                      if (par.startsWith("### ")) {
                        return <h3 key={i} className="text-lg font-bold text-white pt-2">{par.replace("### ", "")}</h3>;
                      }
                      if (par.startsWith("- ")) {
                        return (
                          <div key={i} className="flex items-start gap-2 pl-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{par.replace("- ", "")}</span>
                          </div>
                        );
                      }
                      return <p key={i}>{par}</p>;
                    })}
                  </div>
                </div>
              )}

              {/* Editor Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2.5 rounded-xl glass-card text-xs font-semibold hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveCurrentPost}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 border border-white/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer & Publier</span>
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LOGO & VISUAL IDENTITY (ADAPT LOGO TO CONTAINER FRAME) */}
      {/* ========================================================================= */}
      {activeTab === "logo" && (
        <div className="space-y-8">
          
          {/* Logo Frame Customization Card */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-8">
            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Ajustement du Logo dans son Cadre
              </h2>
              <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                Personnalisez le format, le cadrage, les marges intérieures et l'arrière-plan du logo pour un rendu parfait sur le menu et le pied de page.
              </p>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={logoFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="dashboard-logo-upload-input"
            />
            <input
              ref={photoFileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="dashboard-photo-upload-input"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Live Interactive Preview */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl glass-card border border-white/15 space-y-6 text-center">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Aperçu du Logo dans le Cadre
                </span>

                {/* The Exact Logo Container Box */}
                <div
                  style={{
                    padding: `${logoConfig.padding}px`,
                    borderRadius: `${logoConfig.borderRadius}px`,
                  }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 shadow-2xl transition-all flex items-center justify-center relative overflow-hidden border border-white/20 ${
                    logoConfig.bgColor === "blue"
                      ? "bg-blue-600 shadow-blue-600/40"
                      : logoConfig.bgColor === "dark"
                      ? "bg-black/90 shadow-black/80"
                      : logoConfig.bgColor === "white"
                      ? "bg-white shadow-slate-200"
                      : "bg-transparent backdrop-blur-md"
                  }`}
                >
                  {logoConfig.url ? (
                    <img
                      src={logoConfig.url}
                      alt="Logo Capin Akpado"
                      style={{
                        objectFit: logoConfig.fit,
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-white font-bold text-sm font-mono flex flex-col items-center">
                      <Sparkles className="w-6 h-6 mb-1 text-white" />
                      <span>LOGO</span>
                    </div>
                  )}
                </div>

                {/* Navbar Preview Simulator */}
                <div className="w-full p-3 rounded-xl glass-card border border-white/10 flex items-center gap-3 text-left">
                  <div
                    style={{
                      padding: `${logoConfig.padding / 2}px`,
                      borderRadius: `${logoConfig.borderRadius * 0.8}px`,
                    }}
                    className={`w-9 h-9 shadow-md flex items-center justify-center relative overflow-hidden border border-white/20 shrink-0 ${
                      logoConfig.bgColor === "blue"
                        ? "bg-blue-600"
                        : logoConfig.bgColor === "dark"
                        ? "bg-black/90"
                        : logoConfig.bgColor === "white"
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  >
                    {logoConfig.url ? (
                      <img
                        src={logoConfig.url}
                        alt="Logo"
                        style={{ objectFit: logoConfig.fit }}
                        className="w-full h-full"
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-white">CA</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">CAPIN AKPADO</div>
                    <div className="text-[10px] text-zinc-400 font-mono">Aperçu en situation dans le menu</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => logoFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/30"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{logoConfig.url ? "Changer le logo" : "Importer mon logo"}</span>
                  </button>

                  {logoConfig.url && (
                    <button
                      onClick={() => {
                        handleUpdateLogoSetting("url", "");
                        showToast("Logo réinitialisé.");
                      }}
                      className="p-2 rounded-xl glass-card text-zinc-400 hover:text-rose-400 text-xs"
                      title="Supprimer le logo personnalisé"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Controls & Sliders */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Fit mode (Contain vs Cover) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-400" /> Mode d'Ajustement du Logo
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleUpdateLogoSetting("fit", "contain")}
                      className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                        logoConfig.fit === "contain"
                          ? "bg-blue-600/20 border-blue-500 text-white"
                          : "glass-card hover:bg-white/5 text-zinc-400"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">📐 Ajuster à l'intérieur (Contain)</div>
                      <div className="text-[11px] text-zinc-400">Le logo apparaît en entier sans être rogné</div>
                    </button>

                    <button
                      onClick={() => handleUpdateLogoSetting("fit", "cover")}
                      className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                        logoConfig.fit === "cover"
                          ? "bg-blue-600/20 border-blue-500 text-white"
                          : "glass-card hover:bg-white/5 text-zinc-400"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">🖼️ Remplir le cadre (Cover)</div>
                      <div className="text-[11px] text-zinc-400">Le logo remplit tout le cadre géométrique</div>
                    </button>
                  </div>
                </div>

                {/* 2. Inner Padding */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Marge Intérieure (Padding) : {logoConfig.padding}px
                    </label>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      (Ajuste l'espace pour que le logo respire)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 2, 4, 6, 8, 10].map((p) => (
                      <button
                        key={p}
                        onClick={() => handleUpdateLogoSetting("padding", p)}
                        className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                          logoConfig.padding === p
                            ? "bg-blue-600 text-white shadow"
                            : "glass-card hover:bg-white/10 text-zinc-400"
                        }`}
                      >
                        {p}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Background Color */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                    Couleur de Fond du Cadre
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "blue", label: "Bleu Royal", bgClass: "bg-blue-600" },
                      { id: "dark", label: "Fond Sombre", bgClass: "bg-black" },
                      { id: "white", label: "Blanc Pur", bgClass: "bg-white text-slate-900" },
                      { id: "transparent", label: "Transparent", bgClass: "glass-card" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleUpdateLogoSetting("bgColor", c.id)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          logoConfig.bgColor === c.id
                            ? "border-blue-500 ring-2 ring-blue-500/40 bg-blue-500/10 text-white"
                            : "glass-card text-zinc-400"
                        }`}
                      >
                        <div className={`w-4 h-4 mx-auto rounded-full mb-1 ${c.bgClass} border border-white/20`} />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Rounded Corners */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                    Forme des Coins du Cadre
                  </label>
                  <div className="flex items-center gap-2">
                    {[
                      { r: 8, label: "Carré doux (8px)" },
                      { r: 12, label: "Moderne (12px)" },
                      { r: 16, label: "Arrondi (16px)" },
                      { r: 999, label: "Cercle (Rond)" },
                    ].map((b) => (
                      <button
                        key={b.r}
                        onClick={() => handleUpdateLogoSetting("borderRadius", b.r)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          logoConfig.borderRadius === b.r
                            ? "bg-blue-600 text-white font-bold"
                            : "glass-card hover:bg-white/10 text-zinc-400"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Profile Photo Management */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden glass-card border border-blue-500/30 relative shrink-0 bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Capin Akpado" className="w-full h-full object-cover" />
                ) : (
                  <span>CA</span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base">Photo de Profil Portrait (Capin Akpado)</h3>
                <p className="text-xs text-zinc-400">
                  Cette photo est automatiquement affichée sur la page d'accueil et la page « À propos ».
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => photoFileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/30"
              >
                <Upload className="w-4 h-4" />
                <span>{profilePhoto ? "Changer la photo" : "Téléverser ma photo"}</span>
              </button>

              {profilePhoto && (
                <button
                  onClick={() => {
                    saveProfilePhoto("");
                    setProfilePhotoState("");
                    showToast("Photo réinitialisée.");
                  }}
                  className="p-2.5 rounded-xl glass-card text-zinc-400 hover:text-rose-400 text-xs"
                  title="Supprimer la photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PAGES & TEXT CONTENT MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "pages" && (
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Contenus & Textes Clés du Site
                </h2>
                <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                  Modifiez vos coordonnées, titres, métriques et bios pour synchroniser l'ensemble des pages.
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 border border-white/20 self-start sm:self-auto"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les Textes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Identity & Contact */}
              <div className="space-y-4 glass-card p-5 rounded-2xl">
                <div className="font-bold text-sm text-blue-400 flex items-center gap-2 font-mono">
                  <User className="w-4 h-4" /> Identité & Coordonnées
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Nom Complet</label>
                  <input
                    type="text"
                    value={settings.authorName}
                    onChange={(e) => setSettings({ ...settings, authorName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Titre / Rôle Principal (FR)</label>
                  <input
                    type="text"
                    value={settings.authorRoleFr}
                    onChange={(e) => setSettings({ ...settings, authorRoleFr: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Email de Contact</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Localisation / Disponibilité</label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              {/* Key Metrics on Home */}
              <div className="space-y-4 glass-card p-5 rounded-2xl">
                <div className="font-bold text-sm text-blue-400 flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4" /> Métriques Clés (Page d'Accueil)
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Métrique 1 (Valeur)</label>
                    <input
                      type="text"
                      value={settings.metric1Val}
                      onChange={(e) => setSettings({ ...settings, metric1Val: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold text-blue-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Libellé Métrique 1 (FR)</label>
                    <input
                      type="text"
                      value={settings.metric1LabelFr}
                      onChange={(e) => setSettings({ ...settings, metric1LabelFr: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Métrique 2 (Valeur)</label>
                    <input
                      type="text"
                      value={settings.metric2Val}
                      onChange={(e) => setSettings({ ...settings, metric2Val: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold text-emerald-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Libellé Métrique 2 (FR)</label>
                    <input
                      type="text"
                      value={settings.metric2LabelFr}
                      onChange={(e) => setSettings({ ...settings, metric2LabelFr: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Métrique 3 (Valeur)</label>
                    <input
                      type="text"
                      value={settings.metric3Val}
                      onChange={(e) => setSettings({ ...settings, metric3Val: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold text-indigo-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Libellé Métrique 3 (FR)</label>
                    <input
                      type="text"
                      value={settings.metric3LabelFr}
                      onChange={(e) => setSettings({ ...settings, metric3LabelFr: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bio & Pitch */}
              <div className="md:col-span-2 space-y-4 glass-card p-5 rounded-2xl">
                <div className="font-bold text-sm text-blue-400 flex items-center gap-2 font-mono">
                  <FileText className="w-4 h-4" /> Présentation & Biographie (À Propos & Accueil)
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Texte d'Accroche Hero (FR)</label>
                  <textarea
                    rows={2}
                    value={settings.heroPitchFr}
                    onChange={(e) => setSettings({ ...settings, heroPitchFr: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Biographie Complète (FR)</label>
                  <textarea
                    rows={4}
                    value={settings.aboutBioFr}
                    onChange={(e) => setSettings({ ...settings, aboutBioFr: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs leading-relaxed"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer toutes les modifications</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: NEWSLETTER & SUBSCRIBERS */}
      {/* ========================================================================= */}
      {activeTab === "newsletter" && (
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Abonnés au Guide IA Pro de l'Entrepreneur
                </h2>
                <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                  Liste des dirigeants et professionnels inscrits depuis la page de présentation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const emails = subscribers.map((s) => s.email).join(", ");
                    navigator.clipboard.writeText(emails);
                    showToast("📋 Emails copiés dans le presse-papiers !");
                  }}
                  className="px-3.5 py-2 rounded-xl glass-card hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5"
                  title="Copier tous les emails"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                  <span>Copier les emails</span>
                </button>

                <button
                  onClick={() => {
                    const header = "ID,Email,Nom,Role / Entreprise,Date Inscription,Source\n";
                    const rows = subscribers
                      .map(
                        (s) =>
                          `"${s.id}","${s.email}","${s.name || ""}","${s.businessType || ""}","${s.subscribedAt}","${s.source}"`
                      )
                      .join("\n");
                    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `abonnes_guide_ia_pro_${new Date().toISOString().split("T")[0]}.csv`;
                    link.click();
                    showToast("📥 Export CSV téléchargé !");
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter CSV</span>
                </button>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 font-medium">Total Abonnés Inscrits</span>
                <p className="text-2xl font-extrabold text-blue-500">{subscribers.length}</p>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 font-medium">Fréquence de Parution</span>
                <p className="text-2xl font-extrabold text-indigo-400">1x / Mardi</p>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 font-medium">Taux d'Engagement Moyen</span>
                <p className="text-2xl font-extrabold text-emerald-400">62.4%</p>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theme === "dark" ? "bg-zinc-900/90 text-zinc-400 font-mono text-[11px]" : "bg-slate-100 text-slate-600 font-mono text-[11px]"}>
                  <tr>
                    <th className="p-3.5">Email Professionnel</th>
                    <th className="p-3.5">Nom / Contact</th>
                    <th className="p-3.5">Activité / Poste</th>
                    <th className="p-3.5">Date Inscription</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-400">
                        Aucun abonné pour le moment.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub) => (
                      <tr
                        key={sub.id}
                        className={theme === "dark" ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"}
                      >
                        <td className="p-3.5 font-semibold text-blue-400">
                          {sub.email}
                        </td>
                        <td className="p-3.5">
                          {sub.name || <span className="text-zinc-500 italic">Non renseigné</span>}
                        </td>
                        <td className="p-3.5">
                          {sub.businessType || <span className="text-zinc-500 italic">Entrepreneur</span>}
                        </td>
                        <td className="p-3.5 font-mono text-xs text-zinc-400">
                          {new Date(sub.subscribedAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Supprimer l'abonné ${sub.email} ?`)) {
                                deleteNewsletterSubscriber(sub.id);
                                setSubscribers(getNewsletterSubscribers());
                                showToast("🗑️ Abonné supprimé.");
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick link to see public page */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-blue-400">Voir la page publique du Guide IA Pro</h4>
                <p className="text-xs text-zinc-400">Présentation, formulaire d'inscription et ressources offertes.</p>
              </div>
              <button
                onClick={() => onNavigate("guide-ia-pro")}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
              >
                <span>Accéder à la page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BACKUP & DATA MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "backup" && (
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-8">
            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Sauvegarde & Restauration Intégrale
              </h2>
              <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                Exportez tous vos articles, réglages de logo, photo et textes sous forme de fichier JSON sécurisé.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export Card */}
              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base">Exporter mes données (JSON)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Téléchargez un fichier de sauvegarde contenant l'ensemble de vos articles de blog rédigés, configurations de logo et textes.
                </p>
                <button
                  onClick={handleExport}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger la Sauvegarde JSON</span>
                </button>
              </div>

              {/* Import Card */}
              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base">Restaurer une sauvegarde (JSON)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Importez un fichier JSON précédemment sauvegardé pour restaurer immédiatement vos articles et styles.
                </p>
                <label className="w-full py-2.5 rounded-xl glass-card hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/20">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Choisir un fichier JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Danger Zone: Reset to factory defaults */}
            <div className="pt-6 border-t border-rose-500/20 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-rose-400">Réinitialiser aux valeurs d'origine</h4>
                <p className="text-xs text-zinc-400">
                  Efface les personnalisations locales et recharge les articles et textes initiaux.
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir réinitialiser les articles et textes aux valeurs d'origine ?")) {
                    resetBlogPosts();
                    localStorage.removeItem("capin_site_settings");
                    setPosts(getStoredBlogPosts(blogLang));
                    setSettings(getSiteSettings());
                    showToast("🔄 Valeurs d'origine restaurées.");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
