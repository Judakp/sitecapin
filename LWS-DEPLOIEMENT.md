# Déploiement LWS — SEO dynamique des articles

Cette version conserve le fonctionnement SPA React et ajoute un petit rendu PHP uniquement pour les URLs d'articles :

- `/fr/blog/<slug>`
- `/en/blog/<slug>`

Le PHP interroge directement Supabase pour récupérer le titre, le résumé, l'image et le statut de l'article, puis injecte les métadonnées dans `index.html` avant de l'envoyer au visiteur/crawler.

## 1. Construire le projet

Sur l'ordinateur de développement :

```bash
npm install
npm run build
```

Le dossier `dist/` contient alors notamment :

- `index.html`
- `article-meta.php`
- `article-meta-config.php`
- `.htaccess`
- les assets Vite
- `robots.txt`
- `sitemap.xml`
- `llms.txt`

## 2. Envoyer le contenu de `dist/` sur LWS

Envoyer **le contenu de `dist/`** dans le dossier racine utilisé par le domaine `capinakpado.com`.

Ne pas envoyer le dossier `dist` lui-même si LWS attend directement `index.html` à la racine web.

## 3. Configuration Supabase

`article-meta-config.php` contient :

- l'URL du projet Supabase ;
- la clé publique `anon/publishable` ;
- le domaine canonique ;
- l'image Open Graph par défaut.

La clé utilisée doit être une clé publique Supabase. **Ne jamais mettre une clé `service_role` dans ce fichier.**

## 4. Publication d'un nouvel article

Aucun nouveau build n'est nécessaire pour chaque article.

Après publication dans le dashboard :

```text
Dashboard
   ↓
Supabase blog_posts
   ↓
Nouvelle URL de l'article
   ↓
Apache / LWS
   ↓
article-meta.php
   ↓
Supabase
   ↓
HTML avec les métadonnées de l'article
```

## 5. Test

Après déploiement, ouvrir directement l'URL d'un article avec un navigateur.

Puis utiliser l'affichage du code source de la page et vérifier que le `<title>`, `description`, `og:title`, `og:description`, `og:image` et `canonical` correspondent à l'article.

Important : il faut examiner **le code source HTML reçu du serveur**, pas seulement le DOM après exécution de React.

## 6. Limitation volontaire

Le contenu de l'article reste chargé par React/Supabase comme avant. PHP sert principalement de couche de rendu des métadonnées initiales pour les robots et plateformes sociales.

Les brouillons et articles programmés dont la date n'est pas encore atteinte ne reçoivent pas de métadonnées publiques d'article.
