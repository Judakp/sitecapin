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
  Loader2,
  Lock,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { BlogPost, Language, ThemeMode, PageView, LogoConfig } from "../types";
import {
  getLogoConfig,
  saveLogoConfig,
  getProfilePhoto,
  saveProfilePhoto,
  getSiteSettings,
  saveSiteSettings,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
  exportAllData,
  importAllData,
  SiteSettings,
} from "../data/contentStore";
import { TipTapEditor } from "./TipTapEditor";
import { BilingualBlogEditor } from "./BilingualBlogEditor";
import { supabase } from "../lib/supabase";

interface DashboardProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}


const pageSettingGroups: {
  title: string;
  description: string;
  fields: Array<{
    key: keyof SiteSettings;
    label: string;
    long?: boolean;
  }>;
}[] = [
  {
    title: "Identité & Contact",
    description: "Informations générales utilisées dans plusieurs sections du site.",
    fields: [
      { key: "authorName", label: "Nom complet" },
      { key: "authorRoleFr", label: "Fonction — Français" },
      { key: "authorRoleEn", label: "Role — English" },
      { key: "email", label: "E-mail" },
      { key: "phone", label: "Téléphone" },
      { key: "location", label: "Localisation" },
      { key: "linkedinUrl", label: "LinkedIn" },
      { key: "githubUrl", label: "GitHub" },
      { key: "whatsappUrl", label: "WhatsApp" },
      { key: "bookingUrl", label: "Lien de prise de rendez-vous" },
    ],
  },
  {
    title: "Page d'accueil",
    description: "Modifiez directement les textes visibles sur les versions FR et EN de l'accueil.",
    fields: [
      { key: "homeHeroTitleFr", label: "Hero — titre FR" },
      { key: "homeHeroTitleEn", label: "Hero — title EN" },
      { key: "homeHeroSubtitleFr", label: "Hero — sous-titre FR", long: true },
      { key: "homeHeroSubtitleEn", label: "Hero — subtitle EN", long: true },
      { key: "homeCtaPrimaryFr", label: "CTA principal FR" },
      { key: "homeCtaPrimaryEn", label: "Primary CTA EN" },
      { key: "homeCtaSecondaryFr", label: "CTA secondaire FR" },
      { key: "homeCtaSecondaryEn", label: "Secondary CTA EN" },
      { key: "metric1Val", label: "Indicateur 1 — valeur" },
      { key: "metric1LabelFr", label: "Indicateur 1 — FR" },
      { key: "metric1LabelEn", label: "Metric 1 — EN" },
      { key: "metric2Val", label: "Indicateur 2 — valeur" },
      { key: "metric2LabelFr", label: "Indicateur 2 — FR" },
      { key: "metric2LabelEn", label: "Metric 2 — EN" },
      { key: "metric3Val", label: "Indicateur 3 — valeur" },
      { key: "metric3LabelFr", label: "Indicateur 3 — FR" },
      { key: "metric3LabelEn", label: "Metric 3 — EN" },
    ],
  },
  {
    title: "Page À propos",
    description: "Biographie, positionnement et indicateurs de présentation.",
    fields: [
      { key: "aboutRoleFr", label: "Fonction — FR" },
      { key: "aboutRoleEn", label: "Role — EN" },
      { key: "aboutShortBioFr", label: "Bio courte — FR", long: true },
      { key: "aboutShortBioEn", label: "Short bio — EN", long: true },
      { key: "aboutBioFr", label: "Biographie — FR", long: true },
      { key: "aboutBioEn", label: "Biography — EN", long: true },
      { key: "aboutPhilosophyFr", label: "Philosophie — FR", long: true },
      { key: "aboutPhilosophyEn", label: "Philosophy — EN", long: true },
      { key: "aboutExperienceYears", label: "Expérience" },
      { key: "aboutCompletedProjects", label: "Projets réalisés" },
      { key: "aboutSatisfactionRate", label: "Taux de satisfaction" },
    ],
  },
  {
    title: "Page Contact",
    description: "Textes d'accroche et délai de réponse.",
    fields: [
      { key: "contactPitchFr", label: "Accroche — FR", long: true },
      { key: "contactPitchEn", label: "Pitch — EN", long: true },
      { key: "responseTimeFr", label: "Délai de réponse — FR" },
      { key: "responseTimeEn", label: "Response time — EN" },
    ],
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  // --- AUTHENTICATION STATE (SUPABASE AUTH) ---
  const [session, setSession] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Navigation tabs within dashboard
  const [activeTab, setActiveTab] = useState<"blog" | "logo" | "pages" | "newsletter" | "backup">("blog");
  const [subscribers, setSubscribers] = useState(() => getNewsletterSubscribers());

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- LOGO & MEDIA STATE (SUPABASE STORAGE INTEGRATION) ---
  const [logoConfig, setLogoConfigState] = useState<LogoConfig>(getLogoConfig());
  const [profilePhoto, setProfilePhotoState] = useState<string>(getProfilePhoto());
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // --- BLOG STATE (SUPABASE INTEGRATION) ---
  const [blogLang, setBlogLang] = useState<Language>(language);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [showBilingualEditor, setShowBilingualEditor] = useState(false);
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
  const [postContentHtml, setPostContentHtml] = useState("");
  const [postKeyTakeawaysText, setPostKeyTakeawaysText] = useState("");
  const [postTagsText, setPostTagsText] = useState("");
  const [postCoverImage, setPostCoverImage] = useState("");

  // Nouveaux champs pour la Programmation d'articles
  const [postStatus, setPostStatus] = useState<"published" | "draft" | "scheduled">("published");
  const [postScheduledAt, setPostScheduledAt] = useState("");

  // --- SITE PAGES & SETTINGS STATE ---
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  // 1. SUPABASE AUTH CHECK: Vérification de la session active
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. SUPABASE FETCH: Chargement des articles
  const fetchPostsFromSupabase = async (lang: Language) => {
    setLoadingPosts(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("language", lang)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur de chargement Supabase:", error.message);
        showToast("⚠️ Impossible de charger les articles depuis Supabase.");
      } else if (data) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Erreur de connexion Supabase:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPostsFromSupabase(blogLang);
    }
  }, [blogLang, session]);

  // Auth Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    if (error) {
      setAuthError("Email ou mot de passe incorrect : " + error.message);
    } else {
      showToast("🔒 Authentification réussie !");
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("Déconnexion réussie.");
  };

  // Helper pour uploader un fichier sur Supabase Storage
  const uploadFileToSupabase = async (file: File, folder: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(filePath, file);

    if (uploadError) {
      showToast("❌ Erreur d'envoi : " + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);
    return data?.publicUrl || null;
  };

  // Handle Logo Upload via Supabase Storage
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingMedia(true);
      const publicUrl = await uploadFileToSupabase(file, "logo");
      if (publicUrl) {
        const updated = { ...logoConfig, url: publicUrl };
        setLogoConfigState(updated);
        saveLogoConfig(updated);
        showToast("✅ Nouveau logo importé et stocké sur Supabase !");
      }
      setIsUploadingMedia(false);
    }
  };

  const handleUpdateLogoSetting = (key: keyof LogoConfig, val: any) => {
    const updated = { ...logoConfig, [key]: val };
    setLogoConfigState(updated);
    saveLogoConfig(updated);
  };

  // Handle Profile Photo Upload via Supabase Storage
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingMedia(true);
      const publicUrl = await uploadFileToSupabase(file, "profile");
      if (publicUrl) {
        setProfilePhotoState(publicUrl);
        saveProfilePhoto(publicUrl);
        showToast("✅ Photo de profil mise à jour sur Supabase !");
      }
      setIsUploadingMedia(false);
    }
  };

  // Handle Cover Image Upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingMedia(true);
      const publicUrl = await uploadFileToSupabase(file, "blog");
      if (publicUrl) {
        setPostCoverImage(publicUrl);
        showToast("🖼️ Image de couverture téléchargée avec succès !");
      }
      setIsUploadingMedia(false);
    }
  };

  // Initialize Blog Editor with a post
  const startEditPost = (post: any) => {
    setShowBilingualEditor(false);
    setEditingPost(post);
    setPostTitle(post.title || "");
    setPostCategory(post.category || "Intelligence Artificielle");
    setPostReadTime(post.read_time || "5");
    setPostPublishedDate(post.published_date || new Date().toLocaleDateString("fr-FR"));
    setPostSummary(post.summary || "");

    const formattedContent = Array.isArray(post.content)
      ? post.content.join("")
      : post.content || "";

    setPostContentHtml(formattedContent);
    setPostKeyTakeawaysText(Array.isArray(post.key_takeaways) ? post.key_takeaways.join("\n") : "");
    setPostTagsText(Array.isArray(post.tags) ? post.tags.join(", ") : "");
    setPostCoverImage(post.cover_image || "");
    setPostStatus(post.status || "published");
    setPostScheduledAt(post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : "");
    setBlogPreviewMode(false);
  };

  const startNewPost = () => {
    setShowBilingualEditor(false);
    setEditingPost({
      id: "",
      slug: "",
      title: "",
      summary: "",
      category: "Intelligence Artificielle",
      read_time: "5",
      published_date: new Date().toLocaleDateString(blogLang === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      author: {
        name: settings.authorName,
        role: blogLang === "fr" ? settings.authorRoleFr : settings.authorRoleEn,
      },
      tags: ["Intelligence Artificielle", "Productivité"],
      key_takeaways: [],
      content: "",
    });
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
    setPostContentHtml("<p>Rédigez le contenu de votre article ici avec TipTap...</p>");
    setPostKeyTakeawaysText("");
    setPostTagsText("Intelligence Artificielle, Automatisation, Web");
    setPostCoverImage("");
    setPostStatus("published");
    setPostScheduledAt("");
    setBlogPreviewMode(false);
  };

  // 3. SUPABASE SAVE: Sauvegarder ou programmer un article
  const handleSaveCurrentPost = async () => {
    if (!postTitle.trim()) {
      showToast("⚠️ Veuillez saisir un titre pour l'article.");
      return;
    }

    setIsSaving(true);

    const takeawaysArray = postKeyTakeawaysText
      .split("\n")
      .map((t) => t.trim().replace(/^[-*•]\s*/, ""))
      .filter((t) => t.length > 0);

    const tagsArray = postTagsText
      .split(/[,#]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const generatedSlug = postTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const payload = {
      ...(editingPost?.id ? { id: editingPost.id } : {}),
      slug: editingPost?.slug || generatedSlug || `article-${Date.now()}`,
      language: blogLang,
      title: postTitle,
      category: postCategory,
      summary: postSummary,
      read_time: postReadTime || "5",
      published_date: postPublishedDate,
      author: {
        name: settings.authorName || "Capin Akpado",
        role: blogLang === "fr" ? settings.authorRoleFr : settings.authorRoleEn,
      },
      tags: tagsArray.length > 0 ? tagsArray : ["Technologie"],
      key_takeaways: takeawaysArray,
      content: postContentHtml,
      cover_image: postCoverImage,
      status: postScheduledAt ? "scheduled" : postStatus,
      scheduled_at: postScheduledAt ? new Date(postScheduledAt).toISOString() : null,
      published_at: postScheduledAt
        ? new Date(postScheduledAt).toISOString()
        : postStatus === "published"
          ? new Date().toISOString()
          : null,
    };

    try {
      const { error } = await supabase.from("blog_posts").upsert(payload);

      if (error) {
        console.error("Erreur de sauvegarde Supabase:", error.message);
        showToast("❌ Échec de la publication sur Supabase.");
      } else {
        const msg = postScheduledAt
          ? `📅 Article programmé pour le ${new Date(postScheduledAt).toLocaleString("fr-FR")} !`
          : `🎉 Article "${postTitle}" sauvegardé sur Supabase et disponible en ligne !`;
        showToast(msg);
        setEditingPost(null);
        fetchPostsFromSupabase(blogLang);
      }
    } catch (err) {
      console.error("Erreur réseau Supabase:", err);
      showToast("❌ Erreur de connexion au serveur.");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. SUPABASE DELETE: Supprimer un article
  const handleDeletePost = async (id: string, title: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${title}" de Supabase ?`)) {
      try {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);

        if (error) {
          console.error("Erreur de suppression Supabase:", error.message);
          showToast("❌ Impossible de supprimer l'article.");
        } else {
          showToast("🗑️ Article supprimé de Supabase.");
          if (editingPost?.id === id) {
            setEditingPost(null);
          }
          fetchPostsFromSupabase(blogLang);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
      }
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
          ? `Découvrez comment intégrer les dernières innovations en matière d'agents IA autonomes et d'architecture web pour transformer vos opérations.`
          : `Discover how to leverage autonomous AI agents and modern web architecture to streamline business operations.`
      );
      setPostKeyTakeawaysText(
        blogLang === "fr"
          ? `- L'automatisation intelligente remplace les tâches répétitives par des agents connectés.\n- Un retour sur investissement mesurable dès les 30 premiers jours.\n- L'importance d'une architecture robuste avec typage TypeScript.`
          : `- Intelligent automation replaces repetitive friction with integrated agents.\n- Measurable ROI achieved within the first 30 days.\n- The importance of robust type-safe web architecture.`
      );
      setPostTagsText(
        blogLang === "fr"
          ? "Intelligence Artificielle, Automatisation, Productivité, PME, React 19"
          : "Artificial Intelligence, Automation, Productivity, Web Development"
      );
      setPostContentHtml(
        blogLang === "fr"
          ? `<p>En 2026, l'intelligence artificielle n'est plus une simple fonctionnalité de confort : elle est le cœur battant de l'efficacité opérationnelle des entreprises modernes.</p><h2>1. Pourquoi franchir le pas dès aujourd'hui ?</h2><p>Les entreprises qui adoptent des flux automatisés constatent une réduction drastique des délais de traitement et une satisfaction client décuplée.</p><blockquote class="p-4 my-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-200 text-xs font-medium"><strong>💡 Point Clé :</strong> L'automatisation ciblée libère jusqu'à 15 heures par semaine pour les tâches à forte valeur ajoutée.</blockquote><h2>2. Une architecture conçue pour la pérennité</h2><p>Pour garantir des performances optimales, nous recommandons une stack moderne combinant React 19, TypeScript et des APIs serveurs sécurisées.</p>`
          : `<p>In 2026, artificial intelligence is no longer an optional add-on: it has become the driving force behind modern operational excellence.</p><h2>1. Why Take Action Today?</h2><p>Organizations implementing automated workflows experience drastic turnaround time reductions.</p>`
      );
      setIsGeneratingAi(false);
      showToast("✨ Ébauche rédigée par l'assistant IA ! Vous pouvez l'ajuster avec TipTap.");
    }, 900);
  };

  // Save Settings — local cache + Supabase CMS
  const handleSaveSettings = async () => {
    saveSiteSettings(settings);

    const { error } = await supabase
      .from("site_settings")
      .upsert(
        {
          id: "global",
          settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Erreur de sauvegarde des réglages CMS :", error);
      showToast(
        "⚠️ Les réglages ont été conservés sur cet appareil, mais la synchronisation Supabase a échoué."
      );
      return;
    }

    showToast("✅ Contenus des pages enregistrés et synchronisés.");
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
          setSettings(getSiteSettings());
          fetchPostsFromSupabase(blogLang);
          showToast("🎉 Données importées et appliquées avec succès !");
        } else {
          showToast("❌ Erreur lors de l'import du fichier JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  // --- ÉCRAN DE CONNEXION SÉCURISÉ (SI NON AUTHENTIFIÉ) ---
  if (!session) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="glass-panel p-8 sm:p-10 rounded-3xl border border-blue-500/30 max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30 shadow-lg shadow-blue-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Espace Administration</h1>
            <p className="text-xs text-zinc-400">
              Veuillez vous authentifier pour accéder au Tableau de Bord et à la gestion Supabase.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {authError}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Email Administrateur
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="votre-email@exemple.com"
                className="w-full px-4 py-3 rounded-xl glass-input text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Mot de Passe Unique
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl glass-input text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{isLoggingIn ? "Vérification en cours..." : "Se Connecter à l'Administration"}</span>
          </button>
        </form>
      </div>
    );
  }

  // --- DASHBOARD PRINCIPAL (UTILISATEUR AUTHENTIFIÉ) ---
  return (
    <div id="admin-dashboard-page" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Inputs cachés pour l'upload d'images vers Supabase Storage */}
      <input ref={logoFileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
      <input ref={photoFileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
      <input ref={coverImageInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-2xl shadow-blue-600/50 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/20">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Espace Administration Supabase & TipTap</span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Tableau de Bord de Capin Akpado
          </h1>
          <p className={`text-xs sm:text-sm max-w-2xl ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
            Publiez vos articles en direct sur votre base Supabase, rédigez avec TipTap et gérez l'ensemble de votre site.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 flex-wrap">
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

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all border border-rose-500/30"
            title="Se déconnecter de la session"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => {
            setActiveTab("blog");
            setEditingPost(null);
            setShowBilingualEditor(false);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "blog"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "glass-card hover:bg-white/10"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>✍️ Rédaction Supabase & TipTap ({posts.length})</span>
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
          <span>🖼️ Logo & Photo (Supabase Storage)</span>
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

      {/* TAB 1: BLOG & ARTICLES MANAGEMENT */}
      {activeTab === "blog" && (
        <div className="space-y-8">
          
          {showBilingualEditor ? (
            <BilingualBlogEditor
              theme={theme}
              settings={settings}
              onClose={() => setShowBilingualEditor(false)}
              onSaved={() => {
                setShowBilingualEditor(false);
                fetchPostsFromSupabase(blogLang);
              }}
              uploadFileToSupabase={uploadFileToSupabase}
              showToast={showToast}
            />
          ) : !editingPost ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Articles en Base de Données (Supabase)
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
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Rédiger un nouvel article</span>
                </button>
              </div>

              {/* Articles Grid or Loading */}
              {loadingPosts ? (
                <div className="text-center py-20 space-y-3 glass-card rounded-2xl">
                  <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" />
                  <p className="text-xs text-zinc-400 font-mono">Connexion à Supabase...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16 space-y-3 glass-card rounded-2xl border border-dashed border-white/20">
                  <BookOpen className="w-8 h-8 mx-auto text-zinc-500" />
                  <p className="text-sm text-zinc-400">Aucun article dans Supabase pour la langue ({blogLang.toUpperCase()}).</p>
                  <button
                    onClick={startNewPost}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Créer le premier article</span>
                  </button>
                </div>
              ) : (
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
                            {post.status === "scheduled" ? "📅 Programmé" : post.published_date}
                          </span>
                        </div>

                        <h3 className={`text-base font-bold line-clamp-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {post.title}
                        </h3>

                        <p className={`text-xs line-clamp-3 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                          {post.summary}
                        </p>

                        <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                          {(Array.isArray(post.tags) ? post.tags : []).slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => startEditPost(post)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                          title="Modifier l'article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Éditer</span>
                        </button>

                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs transition-colors"
                          title="Supprimer l'article de Supabase"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    type="button"
                    onClick={() => {
                      setEditingPost(null);
                      setShowBilingualEditor(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-semibold hover:bg-blue-600/25"
                  >
                    🇫🇷🇬🇧 Nouvel article bilingue
                  </button>
                  <button
                    onClick={() => setBlogPreviewMode(!blogPreviewMode)}
                    className="px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold flex items-center gap-1.5 hover:bg-white/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>{blogPreviewMode ? "Mode Édition" : "Aperçu en Direct"}</span>
                  </button>

                  <button
                    onClick={handleSaveCurrentPost}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{isSaving ? "Publication..." : postScheduledAt ? "Programmer l'Article" : "Publier sur Supabase"}</span>
                  </button>
                </div>
              </div>

              {/* AI Drafting Helper Bar */}
              <div className="p-4 rounded-2xl glass-card border border-blue-500/30 space-y-3 bg-blue-500/5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-4 h-4" /> Assistant de Rédaction IA
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Génère instantanément une ébauche compatible TipTap
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

              {/* BARRE PROGRAMMATION & COUVERTURE */}
              <div className="p-4 rounded-2xl glass-card border border-blue-500/30 grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-500/5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-400 font-mono flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> Programmation de Publication
                  </label>
                  <input
                    type="datetime-local"
                    value={postScheduledAt}
                    onChange={(e) => setPostScheduledAt(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-400">Laissez vide pour publier immédiatement sur votre site.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-400 font-mono flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> Image de Couverture
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={postCoverImage}
                      onChange={(e) => setPostCoverImage(e.target.value)}
                      placeholder="URL ou téléchargez depuis votre PC ->"
                      className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => coverImageInputRef.current?.click()}
                      disabled={isUploadingMedia}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1"
                    >
                      {isUploadingMedia ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Image PC</span>
                    </button>
                  </div>
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
                        Date de Publication Affichée
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
                      placeholder="Une brève description captivante..."
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

                  {/* TIPTAP RICH TEXT EDITOR INTEGRATION */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                      Corps de l'Article (Éditeur Rich Text TipTap)
                    </label>
                    
                    <TipTapEditor
                      content={postContentHtml}
                      onChange={(html) => setPostContentHtml(html)}
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
                  {postCoverImage && (
                    <img src={postCoverImage} alt="Couverture" className="w-full max-h-80 object-cover rounded-2xl border border-white/10" />
                  )}

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

                  {/* Rendu HTML dynamique généré par TipTap */}
                  <div
                    className="prose prose-invert max-w-none text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ __html: postContentHtml }}
                  />
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
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 border border-white/20"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? "Publication..." : postScheduledAt ? "Programmer l'Article" : "Publier sur Supabase"}</span>
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* TAB 2: LOGO & VISUAL IDENTITY (SUPABASE STORAGE INTEGRATION) */}
      {activeTab === "logo" && (
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-8">
            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Ajustement du Logo & Photos (Supabase Storage)
              </h2>
              <p className="text-xs text-zinc-400">
                Les fichiers importés depuis votre PC sont automatiquement hébergés dans le bucket public Supabase Storage.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl glass-card border border-white/15 space-y-6 text-center">
                <div
                  style={{
                    padding: `${logoConfig.padding}px`,
                    borderRadius: `${logoConfig.borderRadius}px`,
                  }}
                  className={`w-28 h-28 shadow-2xl flex items-center justify-center border border-white/20 overflow-hidden ${
                    logoConfig.bgColor === "blue" ? "bg-blue-600" : "bg-black/90"
                  }`}
                >
                  {logoConfig.url ? (
                    <img src={logoConfig.url} alt="Logo" style={{ objectFit: logoConfig.fit }} className="w-full h-full" />
                  ) : (
                    <span className="text-white font-bold font-mono">LOGO</span>
                  )}
                </div>
                <button
                  onClick={() => logoFileInputRef.current?.click()}
                  disabled={isUploadingMedia}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
                >
                  {isUploadingMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>Changer le logo depuis votre PC</span>
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-zinc-400 uppercase">Mode d'Ajustement</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleUpdateLogoSetting("fit", "contain")}
                      className={`p-3 rounded-xl border text-xs font-bold ${logoConfig.fit === "contain" ? "bg-blue-600/20 border-blue-500 text-white" : "glass-card text-zinc-400"}`}
                    >
                      Ajuster (Contain)
                    </button>
                    <button
                      onClick={() => handleUpdateLogoSetting("fit", "cover")}
                      className={`p-3 rounded-xl border text-xs font-bold ${logoConfig.fit === "cover" ? "bg-blue-600/20 border-blue-500 text-white" : "glass-card text-zinc-400"}`}
                    >
                      Remplir (Cover)
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass-card space-y-4">
                  <h3 className="text-xs font-bold font-mono text-zinc-400 uppercase">Photo de Profil</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-white/20 overflow-hidden bg-blue-600/20 flex items-center justify-center shrink-0">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profil" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                    <button
                      onClick={() => photoFileInputRef.current?.click()}
                      disabled={isUploadingMedia}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      {isUploadingMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>Changer la photo PC</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAGES CONTENT */}
      {activeTab === "pages" && (
        <div className="space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Éditeur du contenu du site
                </h2>
                <p className="text-xs text-zinc-400 mt-2 max-w-3xl">
                  Modifiez les contenus configurables de l'accueil, de la page
                  À propos, de la page Contact et de votre identité sans
                  toucher au code. Les versions françaises et anglaises sont
                  conservées séparément.
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Enregistrer toutes les modifications
              </button>
            </div>
          </div>

          {pageSettingGroups.map((group) => (
            <section
              key={group.title}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-2xl space-y-6"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold">{group.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {group.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {group.fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.long ? "lg:col-span-2 space-y-2" : "space-y-2"}
                  >
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      {field.label}
                    </label>

                    {field.long ? (
                      <textarea
                        rows={5}
                        value={String(settings[field.key] ?? "")}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            [field.key]: event.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(settings[field.key] ?? "")}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            [field.key]: event.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: NEWSLETTER */}
      {activeTab === "newsletter" && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold">Abonnés ({subscribers.length})</h2>
          <div className="space-y-2">
            {subscribers.map((sub) => (
              <div key={sub.id} className="flex justify-between p-3 glass-card rounded-xl text-xs">
                <span>{sub.email}</span>
                <span className="text-zinc-400">{sub.subscribedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP */}
      {activeTab === "backup" && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold">Sauvegarde des Données</h2>
          <div className="flex gap-4 flex-wrap">
            <button onClick={handleExport} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Télécharger la Sauvegarde JSON</span>
            </button>

            <label className="px-5 py-2.5 rounded-xl glass-card hover:bg-white/10 text-xs font-bold cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Importer un Fichier JSON</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};