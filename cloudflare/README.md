# Cloudflare Worker — métadonnées dynamiques du blog

Ce Worker est conçu pour conserver le site React/Vite sur LWS tout en injectant les métadonnées SEO/Open Graph/Twitter des articles depuis Supabase.

## Architecture

- LWS reste l'origine du site statique.
- Cloudflare devient le proxy public de `capinakpado.com`.
- Le Worker intercepte uniquement `/fr/blog/<slug>` et `/en/blog/<slug>` pour les requêtes HTML.
- Le Worker lit les métadonnées de `blog_posts` dans Supabase avec la clé publique/anon.
- Le HTML de `index.html` fourni par LWS est transformé avec `HTMLRewriter`.
- Si Supabase ou le Worker rencontre une erreur, le Worker laisse passer le HTML d'origine afin de ne pas casser la SPA.
- Un cache court de 60 secondes est utilisé pour éviter une requête Supabase à chaque visite.

## Important : éviter une boucle Cloudflare

Le Worker ne doit pas récupérer `https://capinakpado.com` comme origine, car ce domaine sera lui-même proxifié par Cloudflare.

Créer un sous-domaine d'origine, par exemple :

`origin.capinakpado.com`

Ce sous-domaine doit pointer vers l'hébergement LWS et être configuré en DNS-only (nuage gris dans Cloudflare). Il doit servir exactement le même contenu que l'origine LWS.

## Variables/secrets

Configurer :

- `ORIGIN_URL=https://origin.capinakpado.com`
- `SUPABASE_URL=https://<projet>.supabase.co`
- `SUPABASE_ANON_KEY=<clé publique/anon ou publishable>`

Ne jamais utiliser `service_role` dans le Worker.

## Déploiement

1. Installer Wrangler : `npm install -D wrangler` ou utiliser Wrangler via `npx`.
2. Depuis ce dossier : `npx wrangler login`.
3. Configurer les secrets :
   - `npx wrangler secret put ORIGIN_URL`
   - `npx wrangler secret put SUPABASE_URL`
   - `npx wrangler secret put SUPABASE_ANON_KEY`
4. Déployer : `npx wrangler deploy`.
5. Dans Cloudflare, créer une route Worker pour :
   - `capinakpado.com/fr/blog/*`
   - `capinakpado.com/en/blog/*`
6. Le domaine `capinakpado.com` doit être proxifié par Cloudflare.

## Après déploiement

Tester le HTML source brut d'un article, pas uniquement le DOM après exécution de React.

Vérifier notamment :

- `<title>`
- `meta[name="description"]`
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `link[rel="canonical"]`

## Publication d'un nouvel article

Aucun `npm run build` n'est nécessaire après la publication d'un article. Le Worker lit directement `blog_posts` dans Supabase.

Le cache étant volontairement court (60 secondes), les nouvelles métadonnées deviennent disponibles rapidement.
