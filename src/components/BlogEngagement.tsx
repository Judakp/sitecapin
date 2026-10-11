import React, { useEffect, useMemo, useState } from "react";
import { Heart, Loader2, MessageCircle, Send } from "lucide-react";
import { Language } from "../types";
import { supabase } from "../lib/supabase";

interface BlogEngagementProps {
  postId: string;
  language: Language;
  theme: "dark" | "light";
}

interface CommentRow {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

function getVisitorId(): string {
  const key = "capin_blog_visitor_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const generated = crypto.randomUUID();
  localStorage.setItem(key, generated);
  return generated;
}

export const BlogEngagement: React.FC<BlogEngagementProps> = ({
  postId,
  language,
  theme,
}) => {
  const isDark = theme === "dark";
  const visitorId = useMemo(() => getVisitorId(), []);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const copy = language === "fr"
    ? {
        like: "J’aime",
        liked: "J’aime déjà",
        comments: "Commentaires",
        name: "Votre nom",
        placeholder: "Partagez votre avis sur cet article…",
        send: "Publier",
        success: "Votre commentaire a été publié.",
        error: "Impossible de publier le commentaire. Réessayez.",
        required: "Indiquez votre nom et votre commentaire.",
      }
    : {
        like: "Like",
        liked: "Liked",
        comments: "Comments",
        name: "Your name",
        placeholder: "Share your thoughts about this article…",
        send: "Post",
        success: "Your comment has been published.",
        error: "Unable to publish the comment. Please try again.",
        required: "Please enter your name and comment.",
      };

  const loadEngagement = async () => {
    setLoading(true);
    try {
      const [likesResult, commentsResult] = await Promise.all([
        supabase
          .from("blog_likes")
          .select("id", { count: "exact", head: true })
          .eq("post_id", postId),
        supabase
          .from("blog_comments")
          .select("id, author_name, content, created_at")
          .eq("post_id", postId)
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      if (likesResult.error) throw likesResult.error;
      if (commentsResult.error) throw commentsResult.error;

      setLikes(likesResult.count || 0);
      setComments((commentsResult.data || []) as CommentRow[]);

      const { data: existingLike } = await supabase
        .from("blog_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("visitor_id", visitorId)
        .maybeSingle();

      setLiked(Boolean(existingLike));
    } catch (error) {
      console.error("Erreur de chargement des interactions du blog :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEngagement();
  }, [postId, visitorId]);

  const toggleLike = async () => {
    if (liked) {
      const { error } = await supabase
        .from("blog_likes")
        .delete()
        .eq("post_id", postId)
        .eq("visitor_id", visitorId);
      if (error) {
        console.error("Impossible de retirer le like :", error);
        return;
      }
      setLiked(false);
      setLikes((value) => Math.max(0, value - 1));
      return;
    }

    const { error } = await supabase.from("blog_likes").insert({
      post_id: postId,
      visitor_id: visitorId,
    });

    if (error && error.code !== "23505") {
      console.error("Impossible d’ajouter le like :", error);
      return;
    }

    setLiked(true);
    if (error?.code !== "23505") setLikes((value) => value + 1);
  };

  const submitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    const cleanName = authorName.trim().slice(0, 80);
    const cleanComment = comment.trim().slice(0, 2000);

    if (!cleanName || !cleanComment) {
      setMessage(copy.required);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("blog_comments").insert({
        post_id: postId,
        author_name: cleanName,
        content: cleanComment,
        is_approved: true,
      });

      if (error) throw error;

      setAuthorName("");
      setComment("");
      setMessage(copy.success);
      await loadEngagement();
    } catch (error) {
      console.error("Impossible de publier le commentaire :", error);
      setMessage(copy.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-8 border-t border-white/10 space-y-7" aria-label={copy.comments}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            liked
              ? "bg-blue-600/15 border-blue-500/40 text-blue-400"
              : isDark
                ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-blue-500/40"
                : "bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-400"
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          {liked ? copy.liked : copy.like}
          <span className="font-mono text-xs">{likes}</span>
        </button>

        <div className="inline-flex items-center gap-2 text-sm text-zinc-400">
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length} {copy.comments.toLowerCase()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
          {copy.comments}
        </h2>

        <form onSubmit={submitComment} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              maxLength={80}
              placeholder={copy.name}
              aria-label={copy.name}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={2000}
            rows={4}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm leading-relaxed"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">{comment.length}/2000</span>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {copy.send}
            </button>
          </div>
        </form>

        {message && <p className="text-xs text-blue-400" role="status">{message}</p>}

        <div className="space-y-3">
          {loading ? (
            <div className="text-sm text-zinc-500">…</div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-zinc-500">
              {language === "fr" ? "Soyez le premier à commenter." : "Be the first to comment."}
            </p>
          ) : (
            comments.map((item) => (
              <article key={item.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm">{item.author_name}</strong>
                  <time className="text-[11px] text-zinc-500" dateTime={item.created_at}>
                    {new Date(item.created_at).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                  </time>
                </div>
                <p className="text-sm text-zinc-300 whitespace-pre-wrap break-words">{item.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};