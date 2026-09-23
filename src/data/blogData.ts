import { BlogPost, Language } from "../types";

/**
 * ============================================================
 * ARTICLES DE BLOG (VIDES PAR DÉFAUT)
 * ============================================================
 * 
 * Les données codées en dur ont été supprimées.
 * La publication, l'édition et la gestion des articles
 * se font désormais dynamiquement via Supabase et le Dashboard.
 */

export const blogPostsFr: BlogPost[] = [];

export const blogPostsEn: BlogPost[] = [];

export function getBlogPosts(lang: Language): BlogPost[] {
  return lang === "en" ? blogPostsEn : blogPostsFr;
}