# Patch juridique + SEO pour capinakpado.com

Ce dossier contient les fichiers à ajouter/remplacer dans le projet.

## Remplacements

- `src/App.tsx` : corrige le commentaire `/** HEADER ... */` qui était placé directement dans le JSX et pouvait être rendu comme du texte visible. Ajoute aussi les routes juridiques et la bannière.
- `src/components/Footer.tsx` : supprime le bloc de compétences/technologies et ajoute les liens vers CGU, confidentialité et gestion des préférences.
- `src/components/CookieConsentBanner.tsx` : nouvelle bannière.
- `src/components/LegalPage.tsx` : pages CGU et politique de confidentialité.

## Fichiers publics

Copier dans `public/` :
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `.htaccess`
- `.well-known/security.txt`

## Important avant publication

La politique de confidentialité est adaptée au code du ZIP fourni : formulaire Formspree, Supabase/outil IA, localStorage et Calendly.

Avant publication définitive, vérifier et compléter :
1. l'identité juridique exacte de l'éditeur (nom commercial, forme juridique/RCCM/IFU si applicable) ;
2. l'adresse professionnelle exacte ;
3. l'hébergeur et ses coordonnées ;
4. les durées de conservation réellement appliquées ;
5. les formalités APDP qui vous sont applicables ;
6. le prestataire/modèle IA réellement utilisé par la fonction Supabase `analyze-playground`.

Le bandeau est un bandeau de consentement aux traceurs optionnels, pas une acceptation des CGU. Une acceptation des CGU ne doit pas être déduite d'un clic sur « Accepter » dans une bannière cookies.
