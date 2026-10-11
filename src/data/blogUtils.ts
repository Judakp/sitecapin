import { BlogPost, Language } from "../types";
import { supabase } from "../lib/supabase";

export interface SupabaseBlogRow {
  id: string;
  slug: string;
  language: Language;
  title: string;
  summary: string;
  content: string | string[];
  category: string;
  read_time: string;
  published_date: string;
  cover_image?: string | null;
  tags?: string[] | null;
  key_takeaways?: string[] | null;
  author?: BlogPost["author"] | null;
  status?: "published" | "draft" | "scheduled" | null;
  scheduled_at?: string | null;
  published_at?: string | null;
  created_at?: string | null;
}

export function isBlogPostPublic(row: Pick<SupabaseBlogRow, "status" | "scheduled_at" | "published_at">): boolean {
  if (row.status === "draft") return false;

  if (row.status === "scheduled") {
    if (!row.scheduled_at) return false;
    return new Date(row.scheduled_at).getTime() <= Date.now();
  }

  // Backward compatibility: existing published rows may not have status/published_at.
  return true;
}

export function formatBlogPost(item: SupabaseBlogRow): BlogPost {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    content: item.content,
    category: item.category,
    readTime: item.read_time,
    publishedDate: item.published_date,
    coverImage: item.cover_image || undefined,
    tags: item.tags || [],
    keyTakeaways: item.key_takeaways || [],
    author: item.author || {
      name: "Capin Akpado",
      role: "Architecte IA & Full-Stack",
    },
  };
}

export async function fetchPublicBlogPosts(
  language: Language,
  limit?: number,
): Promise<BlogPost[]> {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("language", language)
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(Math.max(1, limit * 4));
  }

  const { data, error } = await query;

  if (error) throw error;

  const publicPosts = (data || [])
    .filter((item) => isBlogPostPublic(item as SupabaseBlogRow))
    .map((item) => formatBlogPost(item as SupabaseBlogRow));

  return typeof limit === "number" ? publicPosts.slice(0, limit) : publicPosts;
}

export async function fetchPublicBlogPost(
  language: Language,
  slug: string,
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("language", language)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data || !isBlogPostPublic(data as SupabaseBlogRow)) return null;

  return formatBlogPost(data as SupabaseBlogRow);
}