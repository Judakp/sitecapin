import { Language } from "../types";

export interface ServiceDetailType {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  category: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  technologies: string[];
  process: { step: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export const servicesData: Record<Language, ServiceDetailType[]> = {
  fr: [
    {
      id: "ai-agent",
      slug: "agents-ia-autonomes",
      title: "Agents IA Autonomes & Intégrations",
      subtitle: "Automatisation de processus métier complexes avec les LLMs modernes.",
      iconName: "Bot",
      category: "Intelligence Artificielle",
      description:
        "Nous concevons et déployons des agents IA autonomes capables d'exécuter des tâches complexes, d'interagir avec vos bases de données et vos APIs (Google Gemini, Claude, OpenAI). Du support client intelligent à l'analyse prédictive de données, nous transformons vos opérations pour maximiser votre efficacité.",
      benefits: [
        "Réduction drastique des tâches manuelles et répétitives.",
        "Disponibilité continue 24/7 pour le traitement des requêtes.",
        "Intégration transparente dans vos CRMs, ERPs et applications web.",
        "Analyse de données en temps réel pour des décisions accélérées.",
      ],
      deliverables: [
        "Agent IA entraîné et configuré sur vos données métiers.",
        "APIs d'intégration et Webhooks sécurisés.",
        "Tableau de bord de suivi des interactions et des performances.",
        "Documentation technique complète et session de prise en main.",
      ],
      technologies: ["Google Gemini API", "Python", "Node.js", "Supabase", "TypeScript", "Docker"],
      process: [
        { step: "01", title: "Analyse des Besoins", description: "Cartographie de vos flux de travail et identification des opportunités IA." },
        { step: "02", title: "Prompt Engineering & Design", description: "Conception de la logique de l'agent et définition des règles de sécurité." },
        { step: "03", title: "Développement & Entraînement", description: "Implémentation technique, connexion aux APIs et tests rigoureux." },
        { step: "04", title: "Déploiement & Suivi", description: "Mise en production sécurisée et optimisation continue des résultats." },
      ],
      faq: [
        { question: "Mes données d'entreprise restent-elles confidentielles ?", answer: "Absolument. Nous utilisons des environnements API privés qui garantissent qu'aucune donnée d'entreprise n'est utilisée pour réentraîner des modèles publics." },
        { question: "L'agent peut-il s'intégrer à notre système actuel ?", answer: "Oui, nous créons des connecteurs sur mesure via des APIs REST/GraphQL ou Webhooks pour une synchronisation fluide." },
      ],
    },
    {
      id: "web-mobile",
      slug: "developpement-web-mobile",
      title: "Développement Web & Mobile Sur Mesure",
      subtitle: "Applications web réactives et applications mobiles haute performance.",
      iconName: "Globe",
      category: "Ingénierie Logicielle",
      description:
        "Création de plateformes web modernes et d'applications mobiles intuitives adaptées aux besoins de votre entreprise. De la conception d'un SaaS performant avec Next.js/React à une application mobile Flutter multiplateforme (iOS & Android), nous appliquons une architecture solide, typée et évolutive.",
      benefits: [
        "Vitesse de chargement optimale et excellente expérience utilisateur (UI/UX).",
        "Conception responsive adaptée à tous les écrans (Mobile, Tablette, PC).",
        "Code source propre, modulaire et évolutif.",
        "Optimisation native pour le référencement naturel (SEO).",
      ],
      deliverables: [
        "Code source complet et typé avec TypeScript.",
        "Application mobile fonctionnelle (iOS & Android) ou Web App PWA.",
        "Base de données relationnelle configurée (Supabase / PostgreSQL).",
        "Déploiement en ligne et configuration du nom de domaine.",
      ],
      technologies: ["React", "Next.js", "Flutter", "TypeScript", "Tailwind CSS", "Supabase"],
      process: [
        { step: "01", title: "Cahier des Charges & Maquettes", description: "Prototypage des interfaces et validation du parcours utilisateur." },
        { step: "02", title: "Développement Frontend & Backend", description: "Codage des fonctionnalités et intégration de la base de données." },
        { step: "03", title: "Tests & Optimisation", description: "Vérification des performances, du SEO et de la sécurité." },
        { step: "04", title: "Mise en Ligne & Formation", description: "Déploiement sur serveur cloud / App Stores et livraison." },
      ],
      faq: [
        { question: "Qui possède le code source ?", answer: "Vous devenez propriétaire à 100% du code source dès la livraison finale du projet." },
        { question: "Proposez-vous une maintenance après la livraison ?", answer: "Oui, nous proposons des contrats de maintenance préventive et évolutive selon vos besoins." },
      ],
    },
    {
      id: "seo-geo",
      slug: "seo-geo-visibilite-ia",
      title: "SEO & Generative Engine Optimization (GEO)",
      subtitle: "Référencement Google et visibilité dans les moteurs de recherche IA.",
      iconName: "Zap",
      category: "Marketing Digital & IA",
      description:
        "Le référencement a évolué. Au-delà du SEO traditionnel sur Google, nous optimisons votre présence web pour le GEO (Generative Engine Optimization) afin que vos produits et services soient recommandés par ChatGPT, Perplexity, Gemini et Claude. Nous associons audit technique, stratégie de mots-clés et données structurées.",
      benefits: [
        "Acquisition de trafic qualifié à fort potentiel de conversion.",
        "Visibilité accrue dans les réponses générées par l'IA (AI Overviews).",
        "Amélioration des performances techniques et du score Core Web Vitals.",
        "Positionnement d'autorité sur vos thématiques clés.",
      ],
      deliverables: [
        "Audit SEO & technique complet de votre plateforme.",
        "Stratégie de contenu d'autorité et balisage Schema.org.",
        "Optimisation de la vitesse et de la structure du code.",
        "Rapport mensuel de visibilité et d'indexation.",
      ],
      technologies: ["Google Search Console", "Google Analytics", "Schema.org", "Next.js SEO", "Open Graph"],
      process: [
        { step: "01", title: "Audit & Diagnostic", description: "Analyse technique approfondie et étude concurrentielle." },
        { step: "02", title: "Optimisation Technique", description: "Nettoyage du code, amélioration de la vitesse et balisage sémantique." },
        { step: "03", title: "Stratégie de Contenu GEO", description: "Rédaction et structuration adaptées aux algorithmes d'IA." },
        { step: "04", title: "Suivi & Ajustements", description: "Analyse du positionnement et optimisation continue." },
      ],
      faq: [
        { question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?", answer: "C'est l'ensemble des techniques permettant à votre site d'être sélectionné et cité en référence par les assistants IA lors des recherches des utilisateurs." },
        { question: "Combien de temps faut-il pour obtenir des résultats ?", answer: "Les gains techniques s'observent en 2 à 4 semaines, tandis que le positionnement de mots-clés s'établit sur 2 à 3 mois." },
      ],
    },
  ],
  en: [
    {
      id: "ai-agent",
      slug: "agents-ia-autonomes",
      title: "Autonomous AI Agents & Integrations",
      subtitle: "Automating complex workflows with modern LLMs.",
      iconName: "Bot",
      category: "Artificial Intelligence",
      description:
        "We build and deploy autonomous AI agents capable of executing complex workflows, interacting with databases, and integrating custom APIs (Google Gemini, Claude, OpenAI). From intelligent customer support to predictive data analytics, we streamline your business operations.",
      benefits: [
        "Significant reduction in manual and repetitive tasks.",
        "24/7 continuous availability for user requests.",
        "Seamless integration with CRMs, ERPs, and web platforms.",
        "Real-time data insights for faster decision making.",
      ],
      deliverables: [
        "Custom AI Agent trained on your domain data.",
        "Secure Integration APIs & Webhooks.",
        "Performance and interaction tracking dashboard.",
        "Comprehensive technical documentation and onboarding.",
      ],
      technologies: ["Google Gemini API", "Python", "Node.js", "Supabase", "TypeScript", "Docker"],
      process: [
        { step: "01", title: "Discovery & Analysis", description: "Workflow mapping and identifying AI automation opportunities." },
        { step: "02", title: "Prompt Engineering & Design", description: "Defining agent logic, guardrails, and security rules." },
        { step: "03", title: "Development & Training", description: "Technical implementation, API connectivity, and QA testing." },
        { step: "04", title: "Deployment & Monitoring", description: "Secure production launch and ongoing performance tuning." },
      ],
      faq: [
        { question: "Is my business data kept confidential?", answer: "Yes, we use private API setups ensuring no proprietary company data is used to retrain public models." },
        { question: "Can the agent integrate with our current system?", answer: "Yes, we build custom connectors via REST/GraphQL APIs or Webhooks for smooth data flow." },
      ],
    },
    {
      id: "web-mobile",
      slug: "developpement-web-mobile",
      title: "Custom Web & Mobile Development",
      subtitle: "Responsive web apps and high-performance mobile applications.",
      iconName: "Globe",
      category: "Software Engineering",
      description:
        "Creating modern web platforms and mobile apps tailored to your business goals. From high-converting SaaS applications built with Next.js/React to cross-platform Flutter mobile apps (iOS & Android), we deliver scalable, type-safe, and clean codebases.",
      benefits: [
        "Optimal loading speed and intuitive user experience (UI/UX).",
        "Fully responsive across all screen viewports.",
        "Clean, modular, and scalable architecture.",
        "Native search engine optimization (SEO) setup.",
      ],
      deliverables: [
        "100% type-safe TypeScript codebase.",
        "Functional Mobile App (iOS & Android) or Web PWA.",
        "Configured relational database (Supabase / PostgreSQL).",
        "Production deployment and domain setup.",
      ],
      technologies: ["React", "Next.js", "Flutter", "TypeScript", "Tailwind CSS", "Supabase"],
      process: [
        { step: "01", title: "Scoping & Wireframing", description: "UI prototyping and user journey validation." },
        { step: "02", title: "Frontend & Backend Coding", description: "Building core features and integrating database services." },
        { step: "03", title: "QA & Performance Tuning", description: "Testing responsiveness, speed, and security compliance." },
        { step: "04", title: "Deployment & Delivery", description: "Launching on cloud servers / App Stores with final handoff." },
      ],
      faq: [
        { question: "Who owns the source code?", answer: "You retain 100% full ownership of all source code upon final delivery." },
        { question: "Do you offer post-launch support?", answer: "Yes, we provide ongoing maintenance packages tailored to your growth." },
      ],
    },
    {
      id: "seo-geo",
      slug: "seo-geo-visibilite-ia",
      title: "SEO & Generative Engine Optimization (GEO)",
      subtitle: "Google ranking and visibility in AI search engines.",
      iconName: "Zap",
      category: "Digital Marketing & AI",
      description:
        "Search has evolved. Beyond traditional Google SEO, we optimize your digital presence for Generative Engine Optimization (GEO) so your brand gets recommended by ChatGPT, Perplexity, Gemini, and Claude. We combine technical audits, semantic content, and structured data.",
      benefits: [
        "Attract qualified organic leads ready to convert.",
        "Visibility in AI-generated answers (AI Overviews).",
        "Enhanced technical health and Core Web Vitals.",
        "Established topical authority in your domain.",
      ],
      deliverables: [
        "Complete Technical & SEO Audit.",
        "Authority content roadmap and Schema.org markup.",
        "Code speed and structure optimization.",
        "Monthly visibility and indexing report.",
      ],
      technologies: ["Google Search Console", "Google Analytics", "Schema.org", "Next.js SEO", "Open Graph"],
      process: [
        { step: "01", title: "Audit & Diagnosis", description: "In-depth technical analysis and competitor benchmark." },
        { step: "02", title: "Technical Optimization", description: "Code cleanup, speed enhancement, and semantic tagging." },
        { step: "03", title: "GEO Content Strategy", description: "Creating and structuring content tailored for AI engines." },
        { step: "04", title: "Monitoring & Refinement", description: "Tracking rankings, indexing, and ongoing adjustments." },
      ],
      faq: [
        { question: "What is Generative Engine Optimization (GEO)?", answer: "It refers to strategies designed to make your site discoverable, structured, and cited as a source by AI models during user searches." },
        { question: "How long until we see SEO results?", answer: "Technical fixes show impact in 2-4 weeks, while keyword authority builds over 2-3 months." },
      ],
    },
  ],
};