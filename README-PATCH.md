# Patch Capin Akpado — 404 + CMS bilingue

Fichiers complets :
- src/App.tsx
- src/components/NotFound.tsx
- src/components/ServiceDetail.tsx
- src/components/Dashboard.tsx
- src/components/BilingualBlogEditor.tsx
- src/data/contentStore.ts
- server.ts
- supabase/cms_bilingual.sql

Objectifs :
1. Les URLs inconnues n'effectuent plus de redirection silencieuse vers l'accueil.
2. /fr/services/bonjour affiche la vraie page 404 au lieu du premier service / Guide IA Pro.
3. Les slugs d'articles inexistants restent gérés par BlogArticle et reçoivent aussi un HTTP 404 en production quand Supabase est accessible.
4. Le Dashboard permet de créer un article FR + EN et de publier/programmer les deux versions avec un seul bouton.
5. La section « Je retiens » est conservée séparément en FR et EN.
6. Le Dashboard propose désormais un éditeur plus complet pour les textes configurables de l'identité, de l'accueil, de la page À propos et de la page Contact.
7. Les réglages de pages sont synchronisés dans Supabase et restent mis en cache dans localStorage pour conserver le comportement actuel.

IMPORTANT :
- Exécuter supabase/cms_bilingual.sql dans Supabase SQL Editor avant d'utiliser la publication bilingue.
- Le Dashboard utilise déjà Supabase Auth ; la table site_settings autorise la lecture publique et les écritures uniquement aux utilisateurs authentifiés.
- Les anciens articles sans translation_group_id restent compatibles avec l'ancien éditeur.
