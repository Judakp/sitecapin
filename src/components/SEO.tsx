import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOProps {
  title: string;
  description: string;
  image?: string; // URL de l'image de couverture
  url?: string;   // URL de la page actuelle
  type?: 'website' | 'article';
  language: Language;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://capinakpado.com/og-default-image.png', // Remplacez par votre vraie image par défaut (ex: un beau visuel de votre portfolio)
  url = 'https://capinakpado.com',
  type = 'website',
  language,
}) => {
  const siteTitle = 'Capin Akpado';
  // Évite de dupliquer le nom du site s'il est déjà dans le titre
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Balises standards */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Balises Open Graph (LinkedIn, Facebook, WhatsApp) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Balises Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};