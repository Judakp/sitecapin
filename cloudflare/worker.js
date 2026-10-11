// ============================================================
// Cloudflare Worker — métadonnées dynamiques des articles de blog
// capinakpado.com  (origine : LWS, base : Supabase)
// ============================================================
//
// Le Worker n'est appelé que par les routes :
//   capinakpado.com/fr/blog/*   et   capinakpado.com/en/blog/*
//
// Il lit l'article dans Supabase et réécrit le <head> du index.html
// servi par LWS. Chaque réponse porte l'en-tête X-Meta-Source :
//
//   worker             métadonnées de l'article injectées (cas normal)
//   worker-cache       idem, servi depuis le cache Cloudflare (60 s)
//   fallback-notfound  article introuvable / brouillon / programmé : HTML d'accueil
//   fallback-error     erreur Supabase, secrets absents, etc. : HTML d'accueil
//   fallback-origin    l'origine LWS n'a pas répondu en 2xx : réponse brute
//
// Si l'en-tête est absent, la requête n'est pas passée par ce Worker.

const BLOG_PATH_RE = /^\/(fr|en)\/blog\/([^/?#]+)\/?$/i;
const CACHE_TTL_SECONDS = 60;
const SITE_URL = "https://capinakpado.com";
const SITE_NAME = "Capin Akpado";
const DEFAULT_IMAGE = `${SITE_URL}/og-default-image.png`;
const SUPABASE_TIMEOUT_MS = 4000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const match = url.pathname.match(BLOG_PATH_RE);

    // Seules les lectures d'un article sont traitées. Aucune condition sur
    // l'en-tête Accept : un robot social peut envoyer "*/*" sans "text/html".
    if (!match || (request.method !== "GET" && request.method !== "HEAD")) {
      return fetchOrigin(request, env);
    }

    try {
      const language = match[1].toLowerCase();
      const slug = safeDecode(match[2]);

      // Cache Cloudflare (clé normalisée : sans paramètres utm, etc.)
      const cache = caches.default;
      const cacheKey = new Request(`${url.origin}${url.pathname}`, { method: "GET" });
      const cached = await cache.match(cacheKey);
      if (cached) return withHeaders(cached, { "X-Meta-Source": "worker-cache" });

      const article = await getPublicArticle(env, language, slug);

      if (!article) {
        // Article absent, brouillon ou programmé : on laisse la SPA gérer.
        return passThrough(request, env, "fallback-notfound", true);
      }

      const originResponse = await fetchOrigin(request, env);
      const contentType = originResponse.headers.get("content-type") || "";

      if (!originResponse.ok || !contentType.includes("text/html")) {
        return withHeaders(originResponse, { "X-Meta-Source": "fallback-origin" });
      }

      const rewritten = new HTMLRewriter()
        .on("html", new SetAttribute("lang", language))
        .on("title", new ReplaceTitle(article.fullTitle))
        // On retire toutes les balises concernées, quel que soit le contenu de
        // index.html, puis on réinjecte un jeu complet et cohérent dans <head>.
        .on('meta[name="description"]', new RemoveElement())
        .on('meta[property^="og:"]', new RemoveElement())
        .on('meta[name^="twitter:"]', new RemoveElement())
        .on('meta[property^="article:"]', new RemoveElement())
        .on('link[rel="canonical"]', new RemoveElement())
        .on("head", new AppendToHead(buildHeadTags(article)))
        .transform(originResponse);

      const headers = new Headers(rewritten.headers);
      headers.set(
        "Cache-Control",
        `public, max-age=60, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=300`
      );
      headers.set("X-Meta-Source", "worker");
      headers.delete("Content-Length"); // le corps a changé de taille

      const finalResponse = new Response(rewritten.body, {
        status: rewritten.status,
        statusText: rewritten.statusText,
        headers,
      });

      ctx.waitUntil(cache.put(cacheKey, finalResponse.clone()));
      return finalResponse;
    } catch (error) {
      console.error("Blog metadata worker error:", error && error.message ? error.message : error);
      // Ne jamais casser la SPA parce que la couche métadonnées a échoué,
      // et ne pas laisser un navigateur / CDN mémoriser ce HTML d'accueil.
      return passThrough(request, env, "fallback-error", true);
    }
  },
};

// ------------------------------------------------------------
// Origine LWS
// ------------------------------------------------------------

async function fetchOrigin(request, env) {
  if (!env.ORIGIN_URL) {
    return new Response("Cloudflare Worker: ORIGIN_URL is not configured.", { status: 500 });
  }

  const incomingUrl = new URL(request.url);
  const originUrl = new URL(incomingUrl.pathname + incomingUrl.search, env.ORIGIN_URL);

  const headers = new Headers(request.headers);
  headers.delete("Host"); // Host est fixé par l'URL de l'origine
  headers.delete("Cookie");
  // On veut un HTML complet, non compressé et non conditionnel, pour pouvoir le réécrire.
  headers.delete("Accept-Encoding");
  headers.delete("If-None-Match");
  headers.delete("If-Modified-Since");
  headers.delete("Range");

  try {
    return await fetch(originUrl.toString(), {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "manual",
    });
  } catch (error) {
    console.error("Origin fetch failed:", error && error.message ? error.message : error);
    return new Response("Origin unreachable.", { status: 502 });
  }
}

async function passThrough(request, env, source, noStore) {
  const response = await fetchOrigin(request, env);
  const extra = { "X-Meta-Source": source };
  if (noStore) extra["Cache-Control"] = "no-store";
  return withHeaders(response, extra);
}

function withHeaders(response, extra) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(extra)) headers.set(key, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// ------------------------------------------------------------
// Supabase
// ------------------------------------------------------------

async function getPublicArticle(env, language, slug) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY not configured");
  }

  const endpoint = new URL(`${env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/blog_posts`);
  endpoint.searchParams.set(
    "select",
    "slug,language,title,summary,cover_image,status,scheduled_at,published_at,published_date"
  );
  endpoint.searchParams.set("language", `eq.${language}`);
  endpoint.searchParams.set("slug", `eq.${slug}`);
  endpoint.searchParams.set("limit", "1");

  const response = await fetch(endpoint.toString(), {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}`);
  }

  const rows = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) return null;

  // Même règle que isBlogPostPublic() dans src/data/blogUtils.ts
  if (row.status === "draft") return null;
  if (row.status === "scheduled") {
    if (!row.scheduled_at || new Date(row.scheduled_at).getTime() > Date.now()) return null;
  }

  const title = cleanText(row.title) || "Article";
  const summary = cleanText(row.summary).slice(0, 300) || title;
  const image = /^https:\/\//i.test(String(row.cover_image || "")) ? row.cover_image : DEFAULT_IMAGE;
  const publishedAt =
    row.published_at || (row.status === "scheduled" ? row.scheduled_at : null) || null;

  return {
    title,
    fullTitle: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    summary,
    url: `${SITE_URL}/${language}/blog/${encodeURIComponent(row.slug)}`,
    image,
    locale: language === "fr" ? "fr_FR" : "en_US",
    publishedAt,
  };
}

// ------------------------------------------------------------
// Construction du <head>
// ------------------------------------------------------------

function buildHeadTags(a) {
  const e = escapeHtmlAttribute;
  const tags = [
    `<meta name="description" content="${e(a.summary)}">`,
    `<link rel="canonical" href="${e(a.url)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="${e(SITE_NAME)}">`,
    `<meta property="og:title" content="${e(a.fullTitle)}">`,
    `<meta property="og:description" content="${e(a.summary)}">`,
    `<meta property="og:url" content="${e(a.url)}">`,
    `<meta property="og:image" content="${e(a.image)}">`,
    `<meta property="og:image:alt" content="${e(a.title)}">`,
    `<meta property="og:locale" content="${e(a.locale)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${e(a.fullTitle)}">`,
    `<meta name="twitter:description" content="${e(a.summary)}">`,
    `<meta name="twitter:image" content="${e(a.image)}">`,
  ];
  if (a.publishedAt) {
    tags.push(`<meta property="article:published_time" content="${e(a.publishedAt)}">`);
  }
  return tags.join("\n    ");
}

// ------------------------------------------------------------
// Utilitaires
// ------------------------------------------------------------

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Supprime le balisage HTML éventuel et normalise les espaces.
function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtmlAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

class ReplaceTitle {
  constructor(value) {
    this.value = value;
  }
  text(text) {
    if (text.lastInTextNode) {
      text.replace(this.value); // échappé automatiquement (mode texte)
    } else {
      text.remove();
    }
  }
}

class SetAttribute {
  constructor(attribute, value) {
    this.attribute = attribute;
    this.value = value;
  }
  element(element) {
    element.setAttribute(this.attribute, this.value);
  }
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

class AppendToHead {
  constructor(html) {
    this.html = html;
  }
  element(element) {
    element.append(`\n    ${this.html}\n  `, { html: true });
  }
}
