import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Eye,
  Loader2,
  Save,
  Sparkles,
  Upload,
} from "lucide-react";
import { Language, ThemeMode } from "../types";
import { SiteSettings } from "../data/contentStore";
import { TipTapEditor } from "./TipTapEditor";
import { supabase } from "../lib/supabase";

interface BilingualBlogEditorProps {
  theme: ThemeMode;
  settings: SiteSettings;
  onClose: () => void;
  onSaved: () => void;
  uploadFileToSupabase: (file: File, folder: string) => Promise<string | null>;
  showToast: (message: string) => void;
}

type DraftLanguage = "fr" | "en";

interface Draft {
  title: string;
  slug: string;
  category: string;
  summary: string;
  contentHtml: string;
  keyTakeaways: string;
  tags: string;
  publishedDate: string;
}

function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

function todayFor(language: DraftLanguage): string {
  return new Date().toLocaleDateString(
    language === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

const EMPTY_DRAFT = (language: DraftLanguage): Draft => ({
  title: "",
  slug: "",
  category:
    language === "fr"
      ? "Intelligence Artificielle"
      : "Artificial Intelligence",
  summary: "",
  contentHtml: "",
  keyTakeaways: "",
  tags:
    language === "fr"
      ? "Intelligence Artificielle, Automatisation, Web"
      : "Artificial Intelligence, Automation, Web Development",
  publishedDate: todayFor(language),
});

export const BilingualBlogEditor: React.FC<BilingualBlogEditorProps> = ({
  theme,
  settings,
  onClose,
  onSaved,
  uploadFileToSupabase,
  showToast,
}) => {
  const isDark = theme === "dark";
  const [activeLanguage, setActiveLanguage] = useState<DraftLanguage>("fr");
  const [fr, setFr] = useState<Draft>(() => EMPTY_DRAFT("fr"));
  const [en, setEn] = useState<Draft>(() => EMPTY_DRAFT("en"));
  const [readTime, setReadTime] = useState("5");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "scheduled">(
    "published"
  );
  const [scheduledAt, setScheduledAt] = useState("");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const activeDraft = activeLanguage === "fr" ? fr : en;

  const updateActiveDraft = (patch: Partial<Draft>) => {
    if (activeLanguage === "fr") {
      setFr((current) => ({ ...current, ...patch }));
    } else {
      setEn((current) => ({ ...current, ...patch }));
    }
  };

  const setActiveLanguageAndPreserve = (next: DraftLanguage) => {
    setActiveLanguage(next);
    setPreview(false);
  };

  const buildTakeaways = (value: string): string[] =>
    value
      .split("\n")
      .map((item) => item.trim().replace(/^[-*•]\s*/, ""))
      .filter(Boolean);

  const buildTags = (value: string): string[] =>
    value
      .split(/[,#]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const saveBothLanguages = async () => {
    if (!fr.title.trim() || !en.title.trim()) {
      showToast(
        "⚠️ Saisissez les titres français et anglais avant de publier les deux versions."
      );
      setActiveLanguage(!fr.title.trim() ? "fr" : "en");
      return;
    }

    if (!fr.contentHtml.trim() || !en.contentHtml.trim()) {
      showToast(
        "⚠️ Le contenu français et le contenu anglais sont nécessaires pour une publication bilingue."
      );
      setActiveLanguage(!fr.contentHtml.trim() ? "fr" : "en");
      return;
    }

    setSaving(true);

    try {
      const translationGroupId = crypto.randomUUID();
      const slugFr = fr.slug.trim() || generateSlug(fr.title);
      const slugEn = en.slug.trim() || generateSlug(en.title);

      const commonStatus = scheduledAt ? "scheduled" : status;
      const commonScheduledAt = scheduledAt
        ? new Date(scheduledAt).toISOString()
        : null;
      const commonPublishedAt = commonScheduledAt
        ? commonScheduledAt
        : commonStatus === "published"
          ? new Date().toISOString()
          : null;

      const rows = [
        {
          translation_group_id: translationGroupId,
          slug: slugFr || `article-fr-${Date.now()}`,
          language: "fr",
          title: fr.title.trim(),
          category: fr.category.trim(),
          summary: fr.summary.trim(),
          read_time: readTime || "5",
          published_date: fr.publishedDate.trim() || todayFor("fr"),
          author: {
            name: settings.authorName || "Capin Akpado",
            role: settings.authorRoleFr,
          },
          tags: buildTags(fr.tags),
          key_takeaways: buildTakeaways(fr.keyTakeaways),
          content: fr.contentHtml,
          cover_image: coverImage.trim(),
          status: commonStatus,
          scheduled_at: commonScheduledAt,
          published_at: commonPublishedAt,
        },
        {
          translation_group_id: translationGroupId,
          slug: slugEn || `article-en-${Date.now()}`,
          language: "en",
          title: en.title.trim(),
          category: en.category.trim(),
          summary: en.summary.trim(),
          read_time: readTime || "5",
          published_date: en.publishedDate.trim() || todayFor("en"),
          author: {
            name: settings.authorName || "Capin Akpado",
            role: settings.authorRoleEn,
          },
          tags: buildTags(en.tags),
          key_takeaways: buildTakeaways(en.keyTakeaways),
          content: en.contentHtml,
          cover_image: coverImage.trim(),
          status: commonStatus,
          scheduled_at: commonScheduledAt,
          published_at: commonPublishedAt,
        },
      ];

      const { error } = await supabase
        .from("blog_posts")
        .upsert(rows, {
          onConflict: "translation_group_id,language",
        });

      if (error) {
        console.error("Erreur de publication bilingue :", error);
        showToast(
          `❌ Publication bilingue impossible : ${error.message}`
        );
        return;
      }

      showToast(
        scheduledAt
          ? "📅 Les deux versions FR et EN ont été programmées."
          : "🎉 Les versions française et anglaise ont été publiées en un clic."
      );

      onSaved();
    } catch (error) {
      console.error("Erreur de publication bilingue :", error);
      showToast("❌ Une erreur est survenue pendant la publication.");
    } finally {
      setSaving(false);
    }
  };

  const handleCoverUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadFileToSupabase(file, "blog");
      if (publicUrl) {
        setCoverImage(publicUrl);
        showToast("🖼️ Image de couverture téléchargée.");
      }
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const activeLabel = useMemo(
    () => (activeLanguage === "fr" ? "Français" : "English"),
    [activeLanguage]
  );

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 space-y-7">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="space-y-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste des articles
          </button>

          <div>
            <h2
              className={`text-xl sm:text-2xl font-extrabold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Nouvel article bilingue
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Rédigez les deux versions puis publiez-les simultanément avec une
              seule action.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreview((value) => !value)}
            className="px-3.5 py-2 rounded-xl glass-card text-xs font-semibold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            {preview ? "Mode édition" : `Aperçu ${activeLabel}`}
          </button>

          <button
            type="button"
            onClick={saveBothLanguages}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Publication..." : "Publier FR + EN"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setActiveLanguageAndPreserve("fr")}
          className={`text-left p-4 rounded-2xl border transition-all ${
            activeLanguage === "fr"
              ? "border-blue-500 bg-blue-500/10"
              : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-red-400 font-bold">
            🇫🇷 Français
          </div>
          <div className="mt-1 text-sm font-bold">
            {fr.title || "Titre français à rédiger"}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveLanguageAndPreserve("en")}
          className={`text-left p-4 rounded-2xl border transition-all ${
            activeLanguage === "en"
              ? "border-blue-500 bg-blue-500/10"
              : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-sky-400 font-bold">
            🇬🇧 English
          </div>
          <div className="mt-1 text-sm font-bold">
            {en.title || "English title to write"}
          </div>
        </button>
      </div>

      <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-zinc-300">
        <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
          <CheckCircle2 className="w-4 h-4" />
          Publication liée
        </div>
        Les deux lignes utilisent le même identifiant de traduction. Vous
        pouvez donc conserver des slugs différents pour le référencement tout
        en gardant les versions FR et EN liées.
      </div>

      {!preview ? (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              Titre {activeLabel} *
            </label>
            <input
              value={activeDraft.title}
              onChange={(event) =>
                updateActiveDraft({ title: event.target.value })
              }
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-bold focus:outline-none"
              placeholder={
                activeLanguage === "fr"
                  ? "Titre de l’article"
                  : "Article title"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Slug {activeLabel}
              </label>
              <input
                value={activeDraft.slug}
                onChange={(event) =>
                  updateActiveDraft({ slug: event.target.value })
                }
                placeholder={
                  activeLanguage === "fr"
                    ? "laisser vide pour générer automatiquement"
                    : "leave empty to generate automatically"
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Catégorie
              </label>
              <input
                value={activeDraft.category}
                onChange={(event) =>
                  updateActiveDraft({ category: event.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Temps de lecture
              </label>
              <input
                value={readTime}
                onChange={(event) => setReadTime(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Date affichée
              </label>
              <input
                value={activeDraft.publishedDate}
                onChange={(event) =>
                  updateActiveDraft({ publishedDate: event.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Statut
              </label>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as "published" | "draft" | "scheduled"
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
                <option value="scheduled">Programmé</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              Résumé {activeLabel}
            </label>
            <textarea
              rows={3}
              value={activeDraft.summary}
              onChange={(event) =>
                updateActiveDraft({ summary: event.target.value })
              }
              className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              « Je retiens » — {activeLabel} (1 point par ligne)
            </label>
            <textarea
              rows={4}
              value={activeDraft.keyTakeaways}
              onChange={(event) =>
                updateActiveDraft({ keyTakeaways: event.target.value })
              }
              placeholder="- Point clé 1\n- Point clé 2\n- Point clé 3"
              className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              Contenu {activeLabel} — TipTap *
            </label>
            <TipTapEditor
              content={activeDraft.contentHtml}
              onChange={(html) => updateActiveDraft({ contentHtml: html })}
              theme={theme}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              Tags {activeLabel}
            </label>
            <input
              value={activeDraft.tags}
              onChange={(event) =>
                updateActiveDraft({ tags: event.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-3 p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <label className="text-xs font-bold text-blue-400 font-mono flex items-center gap-1.5">
              <Upload className="w-4 h-4" />
              Image de couverture commune
            </label>
            <div className="flex gap-2">
              <input
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="URL de l’image"
                className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
              <label className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1">
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                PC
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <div>
              <label className="text-xs font-bold text-blue-400 font-mono flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4" />
                Programmer
              </label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
            <div className="text-xs text-zinc-400 self-end">
              Si une date est définie, les deux versions seront programmées
              ensemble.
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-6 rounded-2xl border border-blue-500/20 space-y-6">
          {coverImage && (
            <img
              src={coverImage}
              alt="Couverture"
              className="w-full max-h-80 object-cover rounded-2xl"
            />
          )}
          <div className="space-y-3">
            <span className="text-xs text-blue-400 font-mono">
              {activeDraft.category} · {activeDraft.publishedDate} · {readTime} min
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              {activeDraft.title || "Titre de l'article"}
            </h1>
            <p className="text-sm text-zinc-400 italic">
              {activeDraft.summary}
            </p>

            {activeDraft.keyTakeaways.trim() && (
              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <div className="text-blue-400 font-bold text-xs mb-2">
                  ✨ {activeLanguage === "fr" ? "Je retiens" : "Key takeaways"}
                </div>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {buildTakeaways(activeDraft.keyTakeaways).map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="prose prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeDraft.contentHtml }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl glass-card text-xs font-semibold"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={saveBothLanguages}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Publier les deux versions
        </button>
      </div>
    </div>
  );
};