import { CaseStudy, ServiceItem, MethodologyStep, Language } from "../types";

export const servicesDataFr: ServiceItem[] = [
  // 1ère Ligne - Position 1: Le Guide IA Pro de l'Entrepreneur
  {
    id: "guide-ia-pro",
    title: "Le Guide IA Pro de l'Entrepreneur",
    subtitle: "Conseil stratégique, cas d'usage & newsletter d'élite pour entrepreneurs et dirigeants",
    description: "Accompagnement personnalisé et partage continu de méthodes concrètes pour aider les entrepreneurs et chefs d'entreprises à adopter l'IA, automatiser leurs opérations critiques et maximiser leur ROI sans jargon technique.",
    iconName: "BookOpen",
    badge: "Conseil & Newsletter",
    highlights: [
      "Audit personnalisé des opportunités IA pour votre secteur d'activité",
      "Conseils stratégiques sur le choix des meilleurs modèles en fonction des besoins réels de votre entreprise",
      "Accès exclusif à la Newsletter hebdomadaire & aux prompts testés",
      "Optimisation des coûts d'API, sécurité des données et conformité",
    ],
    deliverables: [
      "Feuille de route stratégique IA à 90 jours",
      "Abonnement VIP à la Newsletter hebdomadaire",
      "Matrice comparative des outils & agents IA recommandés",
      "Sessions de conseil 1-to-1 avec Capin Akpado",
    ],
    idealFor: "Entrepreneurs, chefs d'entreprises, dirigeants de PME, créateurs et indépendants voulant intégrer l'IA avec discernement et rentabilité.",
    directAction: "guide-ia-pro",
  },
  // 1ère Ligne - Position 2: Création de Sites Web & Applications Web
  {
    id: "web-dev",
    title: "Création de Sites Web & Applications Web",
    subtitle: "Sites vitrines d'exception, plateformes SaaS & applications web ultra-performants",
    description: "Conception et développement d'interfaces web fluides, réactives et optimisées pour la conversion. Une esthétique soignée alliée à des performances maximales et une architecture moderne.",
    iconName: "Globe",
    badge: "Haute Performance",
    highlights: [
      "Design UX/UI sur-mesure adapté à votre positionnement de marque",
      "Vitesse de chargement optimale & score maximale",
      "Architecture cloud moderne, typée, sécurisée et ultra-scalable",
      "Espace d'administration simple et autonome pour vos contenus",
    ],
    deliverables: [
      "Maquettes interactives haute fidélité et déploiement en ligne de votre solution web",
      "Code source propre, sécurisé & évolutif",
      "Intégration formulaires, outils marketing, paiements Stripe & autres fonctionnalités",
      "Formation vidéo et/ou documentation d'utilisation personnalisée en fonction de vos besoins.",
    ],
    idealFor: "Entreprises, créateurs, indépendants, startups et cabinets voulant asseoir une autorité numérique incontestable.",
    playgroundTab: "web_architect",
  },
  // 1ère Ligne - Position 3: Conception & Déploiement d'Agents IA
  {
    id: "ai-integration",
    title: "Conception & Déploiement d'Agents IA",
    subtitle: "Assistants virtuels autonomes & agents sur-mesure connectés à vos données",
    description: "Déploiement d'agents conversationnels et d'assistants intelligents capables de répondre à vos clients 24/7, de qualifier les demandes entrantes, d'analyser vos documents et d'exécuter des actions précises.",
    iconName: "Bot",
    badge: "IA Appliquée",
    highlights: [
      "Agent Support Client 24/7 sans temps d'attente",
      "Agent IA sur-mesure pour résoudre un problème spécifique de votre entreprise",
      "Recherche intelligente (RAG) dans votre base de connaissances métier",
      "Qualification automatique des prospects avant prise de rendez-vous",
      "Ton et personnalité personnalisés respectant votre identité de marque",
    ],
    deliverables: [
      "Bulle de chat IA prête à brancher sur votre site ou espace client",
      "Entraînement sécurisé sur vos documents, tarifs & FAQ",
      "Tableau de bord de suivi des conversations & analytics",
      "Système d'escalade fluide vers un humain si nécessaire",
    ],
    idealFor: "Sociétés, entreprises ou particuliers, recevant des sollicitations récurrentes ou voulant convertir leurs visiteurs la nuit et le week-end.",
    playgroundTab: "automation",
  },
  // 2ème Ligne - Position 1: Service de Formation
  {
    id: "formation-agents-ia",
    title: "Formation & Ateliers en Agents IA",
    subtitle: "Maîtrisez la création, l'orchestration et le déploiement d'agents autonomes",
    description: "Programmes de formation pratiques et intensifs pour équipes techniques et décideurs : apprenez à concevoir des agents IA fiables, connectés à vos API métiers et capables d'exécuter des workflows complexes en autonomie.",
    iconName: "GraduationCap",
    badge: "Formation & Ateliers",
    highlights: [
      "Prompt Engineering avancé, Context Engineering & Structured Outputs",
      "Architecture d'agents : Function Calling, Tool Use & mémoire contextuelle",
      "Cas pratiques réels : Agent Support, Agent Tri Lead & Agent Veille",
      "Bonnes pratiques de robustesse, limitation des hallucinations & tests",
    ],
    deliverables: [
      "Supports de cours complets & dépôts GitHub interactifs",
      "Ateliers pratiques en direct",
      "Blueprints d'agents IA prêts à être déployés en production",
      "Session de coaching et suivi post-formation (30 jours)",
    ],
    idealFor: "Chefs de projet, équipes produit, managers, entrepreneurs et indépendants souhaitant internaliser les compétences en agents IA.",
    directAction: "contact",
  },
  // 2ème Ligne - Position 2: Service d'Automatisation
  {
    id: "automation",
    title: "Automatisation de Processus Métier & Workflows",
    subtitle: "Suppression des tâches répétitives & synchronisation fluide de vos outils",
    description: "Création de passerelles automatiques entre vos logiciels du quotidien (Gmail, WhatsApp, CRM, Facturation, Calendriers, Airtable, etc) et outils d'analyse rapide pour vous faire gagner des centaines d'heures chaque mois.",
    iconName: "Zap",
    badge: "Gain de Temps",
    highlights: [
      "Relance automatique des devis et factures impayées",
      "Analyses approfondies des requetes spécifiques des internautes et transmission de solutions adaptées sans intervention humaines",
      "Création instantanée de fiches clients dès réception d'un lead",
      "Génération automatique de rapports d'activité et synthèses",
      "Zéro ressaisie manuelle entre vos différents logiciels",
    ],
    deliverables: [
      "Workflows automatisés robustes, monitorés et testés",
      "Alertes en temps réel sur WhatsApp Slack et autres outils digitaux",
      "Tableau de bord de rentabilité et temps opérationnel gagné",
      "Support, surveillance et maintenance continue",
    ],
    idealFor: "Équipes débordées par l'administratif, les taches répétitives, les opérations chronophages a faible rentabilité directe, la gestion de devis ou le suivi manuel des clients.",
    playgroundTab: "automation",
  },
  // 2ème Ligne - Position 3: Service de Création d'Application Mobile
  {
    id: "mobile-dev",
    title: "Création d'Applications Mobiles",
    subtitle: "Applications iOS & Android natives et cross-platform fluides et intelligentes",
    description: "Conception et développement d'applications mobiles performantes et intuitives (Dart, React Native, Flutter, Swift, Kotlin et autres), connectées à votre écosystème cloud et enrichies de fonctionnalités modernes (IA embarquée, notifications push, mode hors-ligne).",
    iconName: "Smartphone",
    badge: "iOS & Android",
    highlights: [
      "Interfaces mobiles haute fidélité & expérience tactile soignée",
      "Déploiement certifié sur l'App Store (Apple) & Google Play Store",
      "Mode hors-ligne, synchronisation temps réel & notifications push ciblées",
      "Sécurité renforcée, biométrie (FaceID / TouchID) & fonctionnalités IA",
    ],
    deliverables: [
      "Applications mobiles prêtes pour publication sur les stores",
      "Maquettes interactives UI/UX mobile sur Figma",
      "Backend temps réel & API sécurisée pour la gestion des données",
      "Documentation technique, analytics d'usage & maintenance applicative",
    ],
    idealFor: "Startups, entreprises, marques et créateurs souhaitant lancer une application mobile d'exception ou digitaliser leurs équipes terrain.",
    playgroundTab: "studio_app",
  },
];

export const servicesDataEn: ServiceItem[] = [
  // Row 1 - Position 1: The AI Pro Entrepreneur's Guide
  {
    id: "guide-ia-pro",
    title: "The AI Pro Entrepreneur's Guide",
    subtitle: "Strategic advisory, actionable case studies & elite newsletter for entrepreneurs and executives",
    description: "Personalized coaching and continuous sharing of practical methods to help entrepreneurs and business leaders adopt AI, automate critical operations, and maximize ROI without technical jargon.",
    iconName: "BookOpen",
    badge: "Advisory & Newsletter",
    highlights: [
      "Personalized AI opportunity audit tailored to your business sector",
      "Strategic advice on selecting the best models based on your real business needs",
      "Exclusive access to the weekly Newsletter & tested prompt blueprints",
      "API cost optimization, enterprise data security, and compliance",
    ],
    deliverables: [
      "90-day actionable AI strategic roadmap",
      "VIP subscription to the weekly Newsletter",
      "Comparative decision matrix of recommended AI tools & agents",
      "1-on-1 strategic advisory sessions with Capin Akpado",
    ],
    idealFor: "Entrepreneurs, business owners, SMB leaders, creators, and freelancers looking to integrate AI with discernment and profitability.",
    directAction: "guide-ia-pro",
  },
  // Row 1 - Position 2: Custom Web & Web App Development
  {
    id: "web-dev",
    title: "Website & Web Application Development",
    subtitle: "Exceptional corporate showcase sites, SaaS platforms & high-performance web applications",
    description: "Engineering fluid, responsive, and conversion-optimized web interfaces. Refined aesthetics paired with peak performance and a modern architecture.",
    iconName: "Globe",
    badge: "High Performance",
    highlights: [
      "Custom UX/UI design tailored to your brand positioning",
      "Optimal loading speed & maximum performance score",
      "Modern, type-safe, secure, and ultra-scalable cloud architecture",
      "Simple and autonomous admin portal for managing your content",
    ],
    deliverables: [
      "Interactive high-fidelity prototypes & online deployment of your web solution",
      "Clean, secure & scalable codebase",
      "Form integrations, marketing tools, Stripe payments & custom features",
      "Video tutorial and/or custom user documentation based on your needs",
    ],
    idealFor: "Companies, creators, freelancers, startups, and firms seeking to establish indisputable digital authority.",
    playgroundTab: "web_architect",
  },
  // Row 1 - Position 3: Design & Deployment of AI Agents
  {
    id: "ai-integration",
    title: "Design & Deployment of AI Agents",
    subtitle: "Autonomous virtual assistants & custom agents connected to your enterprise data",
    description: "Deployment of conversational agents and smart assistants capable of answering customer queries 24/7, qualifying incoming leads, analyzing documents, and executing precise actions.",
    iconName: "Bot",
    badge: "Applied AI",
    highlights: [
      "24/7 Customer Support Agent with zero wait time",
      "Custom AI Agent designed to solve a specific problem in your business",
      "Semantic search (RAG) across your business knowledge base",
      "Automated lead qualification prior to appointment booking",
      "Custom tone and personality aligned with your brand identity",
    ],
    deliverables: [
      "Plug-and-play AI chat widget for your website or customer portal",
      "Secure model training on your documents, pricing & FAQs",
      "Live conversation analytics & tracking dashboard",
      "Seamless human escalation workflow when necessary",
    ],
    idealFor: "Companies, businesses, or individuals receiving recurring inquiries or aiming to convert visitors overnight and on weekends.",
    playgroundTab: "automation",
  },
  // Row 2 - Position 1: AI Agents Training & Workshops
  {
    id: "formation-agents-ia",
    title: "AI Agents Training & Workshops",
    subtitle: "Master the creation, orchestration, and deployment of autonomous agents",
    description: "Practical and intensive training programs for technical teams and decision-makers: learn how to build reliable AI agents, connect them to your business APIs, and execute complex workflows autonomously.",
    iconName: "GraduationCap",
    badge: "Training & Workshops",
    highlights: [
      "Advanced Prompt Engineering, Context Engineering & Structured Outputs",
      "Agent Architecture: Function Calling, Tool Use & Contextual Memory",
      "Real-world case studies: Support Agent, Lead Triage Agent & Research Agent",
      "Reliability safeguards, hallucination limitation & unit testing",
    ],
    deliverables: [
      "Comprehensive course materials & interactive GitHub repositories",
      "Live hands-on workshops",
      "Ready-to-deploy production AI agent blueprints",
      "Coaching session and post-training support (30 days)",
    ],
    idealFor: "Project managers, product teams, executives, entrepreneurs, and freelancers seeking to internalize AI agent skills.",
    directAction: "contact",
  },
  // Row 2 - Position 2: Business Process & Workflow Automation
  {
    id: "automation",
    title: "Business Process & Workflow Automation",
    subtitle: "Elimination of repetitive tasks & seamless synchronization of your tools",
    description: "Building automated bridges between your daily software (Gmail, WhatsApp, CRM, Invoicing, Calendars, Airtable, etc.) and fast analytical tools to save you hundreds of hours every month.",
    iconName: "Zap",
    badge: "Time Saving",
    highlights: [
      "Automated follow-ups for quotes and overdue invoices",
      "In-depth analysis of specific user requests and delivery of tailored solutions without human intervention",
      "Instant client profile creation upon receiving a new lead",
      "Automated generation of activity reports and executive summaries",
      "Zero manual copy-pasting across your various software platforms",
    ],
    deliverables: [
      "Robust, monitored, and thoroughly tested automated workflows",
      "Real-time alerts on WhatsApp, Slack, and other digital tools",
      "ROI & operational time saved dashboard",
      "Ongoing support, monitoring, and continuous maintenance",
    ],
    idealFor: "Teams overwhelmed by administration, repetitive tasks, low-ROI time-consuming operations, quote management, or manual customer follow-ups.",
    playgroundTab: "automation",
  },
  // Row 2 - Position 3: Custom Mobile App Development
  {
    id: "mobile-dev",
    title: "Custom Mobile App Development",
    subtitle: "Fluid, smart, native & cross-platform iOS and Android mobile applications",
    description: "Conception and engineering of high-performance, intuitive mobile apps (Dart, React Native, Flutter, Swift, Kotlin and others), connected to your cloud ecosystem and enhanced with modern features (embedded AI, push notifications, offline mode).",
    iconName: "Smartphone",
    badge: "iOS & Android",
    highlights: [
      "High-fidelity mobile interfaces & polished tactile experience",
      "Certified deployment on Apple App Store & Google Play Store",
      "Offline mode, real-time sync & targeted push notifications",
      "Enhanced security, biometrics (FaceID / TouchID) & AI features",
    ],
    deliverables: [
      "Production-ready mobile applications for store publication",
      "Interactive UI/UX mobile prototypes on Figma",
      "Real-time backend & secure API for data management",
      "Technical documentation, usage analytics & app maintenance",
    ],
    idealFor: "Startups, enterprises, brands, and creators looking to launch an exceptional mobile app or digitalize their field teams.",
    playgroundTab: "studio_app",
  },
];
export const methodologyDataFr: MethodologyStep[] = [
  {
    number: "01",
    title: "Diagnostic & Cadrage Stratégique",
    duration: "Jour 1 à 3",
    description: "Nous identifions ensemble vos objectifs précis, les goulots d'étranglement de vos processus actuels et les gains mesurables attendus.",
    bullets: [
      "Audit des outils existants et des flux de travail",
      "Définition précise du périmètre technique et fonctionnel",
      "Validation d'un devis transparent sans coût caché",
    ],
  },
  {
    number: "02",
    title: "Conception UX/UI & Prototype Interactif",
    duration: "Semaine 1",
    description: "Création des maquettes visuelles et des scénarios d'interaction pour vous permettre de tester la solution avant la moindre ligne de code.",
    bullets: [
      "Maquettes modernes sur-mesure",
      "Validation des parcours utilisateurs et des flux IA",
      "Ajustements collaboratifs en temps réel",
    ],
  },
  {
    number: "03",
    title: "Développement Agile & Entraînement IA",
    duration: "Semaine 2 à 3",
    description: "Codage avec les standards techniques les plus rigoureux et configuration fine des modèles d'intelligence artificielle sur vos données.",
    bullets: [
      "Développement sécurisé et performant",
      "Connexion sécurisée aux APIs et bases de données",
      "Tests intensifs et validation de chaque fonctionnalité",
    ],
  },
  {
    number: "04",
    title: "Déploiement, Formation & Suivi Évolutif",
    duration: "Semaine 3+",
    description: "Mise en ligne sans interruption de service, formation personnalisée de vos équipes et accompagnement continu pour pérenniser vos résultats.",
    bullets: [
      "Mise en production sécurisée & monitoring live",
      "Tutoriels vidéos clairs et prise en main guidée",
      "Garantie de bon fonctionnement et support réactif",
    ],
  },
];

export const methodologyDataEn: MethodologyStep[] = [
  {
    number: "01",
    title: "Diagnostic & Strategic Discovery",
    duration: "Day 1 to 3",
    description: "Together, we identify your exact goals, current process bottlenecks, and expected quantifiable gains.",
    bullets: [
      "Audit of existing tools and operational workflows",
      "Precise definition of technical and functional scope",
      "Validation of a transparent quote with no hidden costs",
    ],
  },
  {
    number: "02",
    title: "UX/UI Design & Interactive Prototype",
    duration: "Week 1",
    description: "Creation of visual wireframes and interaction scenarios allowing you to test the solution before a single line of code is written.",
    bullets: [
      "Modern custom high-fidelity designs",
      "Validation of user journeys and AI workflows",
      "Real-time collaborative adjustments",
    ],
  },
  {
    number: "03",
    title: "Agile Development & AI Fine-Tuning",
    duration: "Weeks 2 to 3",
    description: "Engineering according to the most rigorous technical standards and precise fine-tuning of AI models on your business data.",
    bullets: [
      "Secure and high-performance development",
      "Encrypted connection to APIs and databases",
      "Intensive testing and feature-by-feature validation",
    ],
  },
  {
    number: "04",
    title: "Deployment, Training & Ongoing Growth",
    duration: "Week 3+",
    description: "Zero-downtime release, personalized onboarding for your team, and continuous support to ensure long-term results.",
    bullets: [
      "Secure production deployment & live monitoring",
      "Clear video tutorials and guided hands-on onboarding",
      "Operational uptime warranty and responsive support",
    ],
  },
];

export const caseStudiesDataFr: CaseStudy[] = [
  {
    id: "extinction-countdown",
    title: "Extinction Countdown",
    client: "Passionnés d'astronomie, chercheurs & grand public",
    category: "Web & Plateforme",
    badge: "Plateforme Live",
    shortDescription: "Analyse des risques cosmiques et catastrophes naturelles.",
    problem: "Pénurie de plateformes centralisant les données de risques planétaires de façon accessible et visuelle.",
    solution: "Développement d'une application web interactive intégrant la modélisation de scénarios d'impact.",
    impact: [
      { metric: "100%", label: "Autonome & Live" },
      { metric: "Securisé", label: "Cybersecurité" },
      { metric: "SEO", label: "Indexé Search Console" },
    ],
    technologies: ["React", "TypeScript", "Supabase", "LWS"],
    deliverables: [
      "Application web responsive",
      "Base de données temps réel",
      "Module d'analyse d'impacts",
    ],
    liveUrl: "https://extinctioncountdown.com", // Lien direct vers le site
  },

  {
    id: "finance-ai-expert",
    title: "Finance AI Expert",
    client: "Particuliers & Actifs souhaitant optimiser leurs finances",
    category: "Agents IA & Automatisation",
    badge: "Agent Bilingue Live",
    shortDescription: "Assistant virtuel intelligent dédié au conseil financier personnalisé, à l'épargne et à la gestion des dépenses.",
    problem: "Difficulté pour les particuliers à obtenir des conseils financiers personnalisés et structurés sans engager de coûts de gestion élevés.",
    solution: "Déploiement d'un agent IA bilingue (FR/EN) capable d'analyser les habitudes de dépenses, de proposer des stratégies d'épargne sur-mesure et d'orienter vers des opportunités d'investissement adaptées.",
    impact: [
      { metric: "24/7", label: "Disponibilité continue" },
      { metric: "FR / EN", label: "Agent 100% bilingue" },
      { metric: "< 3s", label: "Temps de réponse moyen" },
    ],
    technologies: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Agent IA conversationnel bilingue",
      "Interface utilisateur réactive & intuitive",
      "Module d'analyse budgétaire et d'épargne",
    ],
    liveUrl: "https://melodic-gnome-62029b.netlify.app/",
  },

  {
    id: "paygenius-hr",
    title: "PayGenius HR",
    client: "Directions RH, CEO & Gestionnaires de paie d'entreprise",
    category: "Agents IA & Automatisation",
    badge: "Génération automatique",
    shortDescription: "Plateforme RH de génération automatique de bulletins de paie avec gestion stricte des rôles et accès sécurisés.",
    problem: "Processus de gestion des paies chronophage sur tableurs et risques de fuite de données confidentielles entre collaborateurs.",
    solution: "Développement d'une application web centralisée automatisant l'édition des fiches de paie pour les décideurs, avec espace sécurisé cloisonné pour chaque employé.",
    impact: [
      { metric: "-80%", label: "Temps de génération des paies" },
      { metric: "100%", label: "Confidentialité & Droits cloisonnés" },
      { metric: "0", label: "Ressaisie manuelle de données" },
    ],
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Système de génération automatique de PDF de paie",
      "Module d'authentification RBAC (CEO / DRH / Employés)",
      "Espace de téléchargement sécurisé pour les salariés",
    ],
    liveUrl: "https://fabulous-dieffenbachia-627f92.netlify.app/",
  },

  // 2. Luxious Immobilier
  {
    id: "luxious-immobilier",
    title: "Luxious Immobilier",
    client: "Acheteurs haut de gamme, vendeurs & investisseurs immobiliers",
    category: "Web & Plateforme",
    badge: "Immobilier de Luxe",
    shortDescription: "Vitrine web d'exception et outil d'estimation en ligne pour l'immobilier d'habitation d'élite.",
    problem: "Manque de visibilité en ligne et absence d'outils d'estimation instantanée pour capturer des mandats d'exception.",
    solution: "Conception d'une plateforme web haut de gamme facilitant l'exploration de biens d'élite, l'estimation en ligne et la prise de contact directe.",
    impact: [
      { metric: "+50%", label: "Demandes d'estimation en ligne" },
      { metric: "< 2s", label: "Temps de chargement des visuels" },
      { metric: "100%", label: "UX/UI Responsive haut de gamme" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Catalogue interactif de biens de prestige (Villas, Appartements)",
      "Module d'estimation et d'évaluation immobilière",
      "Formulaire de mise en relation directe avec l'agence",
    ],
    liveUrl: "https://taupe-starburst-d64cd8.netlify.app/",
  },

  // 3. Urgencia
  {
    id: "urgencia",
    title: "Urgencia Ouidah",
    client: "Touristes, résidents & services de santé de la ville de Ouidah",
    category: "Web & Plateforme",
    badge: "Plateforme Locale Live",
    shortDescription: "Guide et géolocalisation d'urgence pour les pharmacies, hôpitaux et pompiers à Ouidah.",
    problem: "Difficulté pour les résidents et touristes non familiarisés avec la ville de trouver immédiatement des soins ou secours en cas d'urgence.",
    solution: "Déploiement d'une application web responsive répertoriant en temps réel les services essentiels de santé et de sécurité avec itinéraires rapides.",
    impact: [
      { metric: "24/7", label: "Accès instantané aux secours" },
      { metric: "< 1s", label: "Temps de réponse de la carte" },
      { metric: "100%", label: "Couverture des urgences à Ouidah" },
    ],
    technologies: ["React", "JavaScript", "CSS", "Geolocation API", "Netlify"],
    deliverables: [
      "Répertoire interactif des pharmacies de garde et hôpitaux",
      "Boutons d'appel d'urgence rapide (Sapeurs-Pompiers, Secours)",
      "Système de géolocalisation et guidage local",
    ],
    liveUrl: "https://urgencia2.netlify.app/",
  },

  // 4. Coach Good Pasta
  {
    id: "coach-good-pasta",
    title: "Coach Good Pasta",
    client: "Équipes RH, nouveaux employés & managers de Good Pasta",
    category: "Agents IA & Automatisation",
    badge: "Assistant Onboarding IA",
    shortDescription: "Agent IA d'intégration et de support opérationnel par département pour les salariés de Good Pasta.",
    problem: "Interruptions fréquentes et perte de productivité du personnel expérimenté sollicité en continu par les nouveaux arrivants.",
    solution: "Conception d'un agent IA conversationnel entraîné sur les procédures internes pour orienter et former les employés selon leur pôle métier.",
    impact: [
      { metric: "-60%", label: "Sollicitations répétitives du personnel" },
      { metric: "2x", label: "Vitesse d'intégration des recrues" },
      { metric: "24/7", label: "Disponibilité du support interne" },
    ],
    technologies: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Agent IA de support par département métier",
      "Base de connaissances interne structurée pour l'IA",
      "Interface conversationnelle d'onboarding autonome",
    ],
    liveUrl: "https://lighthearted-madeleine-7ef1dc.netlify.app/",
  },

  // 5. PixelDebate
  {
    id: "pixeldebate",
    title: "PixelDebate",
    client: "Amateurs d'art, psychologues & public curieux du comportement humain",
    category: "Agents IA & Automatisation",
    badge: "Projet Hackathon IA",
    shortDescription: "Chatbot multimodal analysant les dessins utilisateurs pour en déduire des traits psycho-sociologiques.",
    problem: "Absence d'outils interactifs ludiques liant l'expression artistique visuelle à l'analyse comportementale et psychologique.",
    solution: "Création d'une application IA où l'utilisateur dessine sur un canevas numérique et reçoit une analyse psycho-sociologique instantanée générée par vision multimodale.",
    impact: [
      { metric: "100%", label: "Analyse multimodale automatique" },
      { metric: "< 4s", label: "Génération du profil psychologique" },
      { metric: "Hackathon", label: "Projet primé en compétition" },
    ],
    technologies: ["React", "TypeScript", "Gemini Vision API", "HTML5 Canvas", "Netlify"],
    deliverables: [
      "Canevas de dessin interactif en ligne",
      "Pipeline d'analyse d'image par vision artificielle",
      "Moteur d'interprétation comportementale et sociologique",
    ],
    liveUrl: "https://fluffy-marzipan-694223.netlify.app/",
  },

  // 6. Rose Bloom
  {
    id: "rose-bloom",
    title: "Rose Bloom",
    client: "Amateurs d'artisanat d'art, décorateurs & acheteurs d'objets en bois",
    category: "Web & Plateforme",
    badge: "E-commerce & Artisanat",
    shortDescription: "Site vitrine et catalogue d'artisanat d'art valorisant des créations uniques en bois sur-mesure.",
    problem: "Difficulté pour l'artisan d'exposer son catalogue de créations en bois et de capter des commandes personnalisées hors atelier.",
    solution: "Développement d'une plateforme web élégante et épurée mettant en valeur le travail du bois et facilitant la demande de devis.",
    impact: [
      { metric: "100%", label: "Mise en valeur du catalogue" },
      { metric: "+40%", label: "Demandes de devis en ligne" },
      { metric: "< 1.5s", label: "Chargement de la galerie" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Galerie d'exposition haute résolution des objets d'art",
      "Formulaire de commande et devis sur-mesure",
      "Présentation de l'histoire et du savoir-faire artisanal",
    ],
    liveUrl: "https://elaborate-scone-c66085.netlify.app/",
  },

  // 7. CapinAkpado.com
  {
    id: "capinakpado-portfolio",
    title: "Capin Akpado",
    client: "Entreprises, PME & Startups à la recherche d'experts Web, Mobile & IA",
    category: "Web & Plateforme",
    badge: "Hub Tech & IA",
    shortDescription: "Plateforme professionnelle bilingue intégrant un simulateur d'Audit IA et un portfolio d'études de cas.",
    problem: "Besoin de faire la démonstration concrète de compétences en développement web/mobile d'élite et en ingénierie d'agents IA.",
    solution: "Ingénierie d'une plateforme web ultra-performante dotée d'un mode bilingue, d'un thème sombre/clair dynamique et d'un générateur d'audit IA.",
    impact: [
      { metric: "100%", label: "Architecture TypeScript Strict" },
      { metric: "FR / EN", label: "Support bilingue dynamique" },
      { metric: "30+", label: "Projets & Compétences valorisés" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "LWS"],
    deliverables: [
      "Architecture web hautement performante et typée",
      "Simulateur d'Audit IA interactif",
      "Système de filtrage de Case Studies temps réel",
    ],
    liveUrl: "https://capinakpado.com",
  },

  // 8. Newsletter Le Guide IA de l'Entrepreneur
  {
    id: "guide-ia-newsletter",
    title: "Le Guide IA de l'Entrepreneur",
    client: "Entrepreneurs, dirigeants de PME & décideurs économiques",
    category: "SEO & Marketing Digital",
    badge: "Newsletter Stratégique",
    shortDescription: "Publication hebdomadaire guidant les dirigeants sur l'adoption rentable et stratégique de l'IA.",
    problem: "Surinformation technique et manque de méthodes concrètes orientées ROI pour intégrer l'IA dans les entreprises.",
    solution: "Lancement d'une newsletter sur LinkedIn délivrant chaque semaine des cas d'usage réels, des blueprints d'agents et des analyses financières pour entrepreneurs.",
    impact: [
      { metric: "Hebdo", label: "Publication régulière à fort impact" },
      { metric: "100%", label: "Contenu orienté ROI & Business" },
      { metric: "B2B", label: "Audience de décideurs qualifiés" },
    ],
    technologies: ["LinkedIn Publishing", "Copywriting B2B", "Stratégie de Contenu", "Prompt Engineering"],
    deliverables: [
      "Éditions hebdomadaires de veille et stratégie IA",
      "Blueprints d'agents et instructions système partagés",
      "Frameworks d'automatisation rentables",
    ],
    liveUrl: "https://www.linkedin.com/newsletters/le-guide-ia-de-l-entrepreneur-7471228391753592832/",
  },

  {
  id: "ia-site-web-marketing-digital",
  title: "IA & Performance des sites web",
  client: "Entreprises, entrepreneurs & professionnels du digital",
  category: "SEO & Marketing Digital",
  badge: "Publication experte",
  shortDescription: "Analyse de 7 cas d’usage concrets de l’intelligence artificielle pour améliorer l’expérience utilisateur, la conversion et la performance marketing des sites web.",
  problem: "Les entreprises doivent faire évoluer leurs sites web au-delà de leur rôle de simple vitrine afin de répondre à des visiteurs plus exigeants, personnaliser leurs parcours et améliorer leur visibilité et leurs performances commerciales.",
  solution: "Étude de sept applications concrètes de l’IA sur les sites web : conseiller virtuel, moteur de recommandation prédictif, recherche sémantique intelligente, lead scoring, assistant comptable en libre-service, génération de fiches produits et formulaires B2B intelligents. L’article met en perspective leur potentiel pour l’expérience utilisateur, la conversion, le contenu et le référencement.",
  impact: [
    { metric: "7", label: "Cas d’usage de l’IA analysés" },
    { metric: "SEO", label: "Optimisation de la visibilité digitale" },
    { metric: "UX", label: "Expérience utilisateur personnalisée" }
  ],
  technologies: [
    "Intelligence artificielle",
    "Traitement automatique du langage naturel",
    "Machine Learning",
    "OCR",
    "IA générative"
  ],
  deliverables: [
    "Article d’expertise publié sur Webmarketing & co’m",
    "Analyse de 7 cas d’usage de l’IA appliquée au web",
    "Recommandations autour de l’expérience utilisateur et de la conversion",
    "Réflexion sur l’intégration de l’IA dans les stratégies SEO et marketing digital"
  ],
  liveUrl: "https://www.webmarketing-com.com/entreprise-7-cas-usage-concrets-integrer-ia-site-web"
},

{
id: "choix-reseaux-sociaux-entreprise",
title: "Choix des réseaux sociaux d’une entreprise",
client: "Entrepreneurs, entreprises & professionnels du marketing digital",
category: "SEO & Marketing Digital",
badge: "Publication experte",
shortDescription: "Guide pratique présentant 7 critères essentiels pour choisir les réseaux sociaux les plus adaptés à une entreprise, à son audience et à ses objectifs marketing.",
problem: "Être présent sur tous les réseaux sociaux ne garantit pas une meilleure visibilité. Les entreprises doivent identifier les plateformes réellement adaptées à leur audience, à leur activité, à leurs capacités de production de contenu et à leurs objectifs commerciaux.",
solution: "Rédaction d’un article d’expertise publié sur Webmarketing & co’m présentant sept critères pour orienter le choix des réseaux sociaux d’une entreprise : caractéristiques du Persona, compatibilité avec l’activité, objectifs de communication, capacité à produire les contenus adaptés, priorités en ligne, fonctionnement propre à chaque plateforme et formation nécessaire à leur utilisation.",
impact: [
{ metric: "7", label: "Critères analysés" },
{ metric: "Social Media", label: "Stratégie de présence digitale" },
{ metric: "Persona", label: "Approche centrée sur l’audience" }
],
technologies: [
"Webmarketing",
"Marketing digital",
"Social Media",
"Community Management",
"Rédaction Web"
],
deliverables: [
"Article d’expertise publié sur Webmarketing & co’m",
"Analyse de 7 critères de sélection des réseaux sociaux",
"Réflexion sur l’adéquation entre Persona, activité et plateformes sociales",
"Conseils sur les contenus, les objectifs marketing et la stratégie de présence digitale"
],
liveUrl: "https://www.webmarketing-com.com/choix-reseaux-sociaux-entreprise-top-7-criteres"
},

{
    id: "tendances-consommation-2023",
    title: "Top 7 des Tendance de Consommation",
    client: "Marques, e-commerçants & directeurs marketing",
    category: "SEO & Marketing Digital",
    badge: "Article Média B2B",
    shortDescription: "Analyse stratégique des évolutions du comportement d'achat et des leviers marketing publiée sur Webmarketing & co'm.",
    problem: "Instabilité des stratégies marketing traditionnelles face aux mutations socio-économiques et au changement des habitudes d'achat.",
    solution: "Rédaction d'une étude prospective détaillée décortiquant les 7 tendances majeures (réemploi, commerce local, e-commerce social, économie collaborative) avec recommandations stratégiques.",
    impact: [
      { metric: "Top Média", label: "Publié sur Webmarketing & co'm" },
      { metric: "100% SEO", label: "Optimisé pour le référencement B2B" },
      { metric: "7 Leviers", label: "Tendances de consommation analysées" },
    ],
    technologies: ["Rédaction Web B2B", "SEO Content Strategy", "Étude de Marché", "Copywriting Digital"],
    deliverables: [
      "Article d'analyse stratégique à forte valeur ajoutée",
      "Optimisation sémantique et structuration SEO",
      "Framework d'analyse des comportements d'achat",
    ],
    liveUrl: "https://www.webmarketing-com.com/top-7-tendances-consommation-2023",
  },

  {
    id: "tendances-ecommerce-2022",
    title: "Top 10 des Tendances E-commerce",
    client: "E-commerçants, marques D2C & directeurs de la stratégie digitale",
    category: "SEO & Marketing Digital",
    badge: "Article Média B2B",
    shortDescription: "Analyse approfondie des leviers d'innovation e-commerce et des comportements d'achat post-pandémie sur Webmarketing & co'm.",
    problem: "Nécessité pour les acteurs de la vente en ligne de constamment réadapter leurs tunnels de conversion et stratégies marketing face à l'évolution rapide des technologies et attentes des consommateurs.",
    solution: "Rédaction d'une étude stratégique analysant 10 piliers d'innovation e-commerce (chatbots vocaux, re-commerce, live shopping, social selling, recherche par image inversée et paiements instantanés).",
    impact: [
      { metric: "Top Média", label: "Publié sur Webmarketing & co'm" },
      { metric: "100% SEO", label: "Positionné sur la recherche E-commerce" },
      { metric: "10 Leviers", label: "Innovations digitales décortiquées" },
    ],
    technologies: ["Rédaction Web B2B", "SEO Content Strategy", "Analyse E-commerce", "Conversion & Growth Strategy"],
    deliverables: [
      "Article de veille stratégique e-commerce à forte valeur ajoutée",
      "Optimisation sémantique et structuration SEO",
      "Guide des innovations de conversion et de paiement",
    ],
    liveUrl: "https://www.webmarketing-com.com/top-10-tendances-e-commerce-2022",
  },

  {
    id: "secrets-webmarketing-newsletter",
    title: "Les Secrets du Webmarketing",
    client: "Entrepreneurs, indépendants, consultants & créateurs de contenu",
    category: "SEO & Marketing Digital",
    badge: "Newsletter LinkedIn",
    shortDescription: "Publication régulière délivrant des conseils stratégiques et méthodologies concrètes pour développer sa visibilité et acquérir des clients.",
    problem: "Difficulté pour les indépendants et entrepreneurs à structurer une stratégie webmarketing efficace sans se disperser ou gaspiller du budget publicitaire.",
    solution: "Rédaction et diffusion d'une newsletter thématique proposant des guides pratiques, astuces d'acquisition, leviers de conversion et meilleures pratiques SEO/Digital.",
    impact: [
      { metric: "B2B", label: "Audience d'entrepreneurs & indépendants" },
      { metric: "100%", label: "Conseils actionnables & sans jargon" },
      { metric: "LinkedIn", label: "Canal d'acquisition & d'autorité" },
    ],
    technologies: ["LinkedIn Publishing", "Inbound Marketing", "Copywriting B2B", "SEO Strategy"],
    deliverables: [
      "Éditions thématiques axées sur la croissance et la conversion",
      "Guides pratiques d'acquisition et de fidélisation",
      "Analyses des meilleures pratiques du marketing digital",
    ],
    liveUrl: "https://www.linkedin.com/newsletters/les-secrets-du-webmarketing-7084567011980124160/",
  },
  
  {
    id: "migration-site-web-etapes",
    title: "Migration d’un Site Web : Top 10 des Étapes",
    client: "Développeurs, chefs de projet & propriétaires de sites web",
    category: "SEO & Marketing Digital",
    badge: "Article Technique SEO",
    shortDescription: "Guide méthodologique complet pour réussir la migration d'un site web sans perte de trafic ni de référencement naturel.",
    problem: "Risques élevés de perte de trafic organique, d'erreurs 404 et de chute de classement SEO lors des changements d'hébergeur ou de structure web.",
    solution: "Rédaction d'un guide technique étape par étape couvrant l'analyse de contenu, le mapping d'URL, les redirections 301, les tests pré-lancement et la configuration Google Search Console.",
    impact: [
      { metric: "10 Étapes", label: "Méthodologie séquentielle complète" },
      { metric: "0 Perte", label: "Stratégie de préservation du SEO" },
      { metric: "B2B / Tech", label: "Guide orienté bonnes pratiques NTIC" },
    ],
    technologies: ["Architecture Web", "SEO Technique", "Redirections 301", "Google Search Console", "Rédaction B2B"],
    deliverables: [
      "Guide méthodologique de migration web",
      "Checklist des vérifications SEO et techniques",
      "Procédures d'export/import de bases de données et redirections",
    ],
    liveUrl: "https://belleinitiative.over-blog.com/2025/03/migration-d-un-site-web-top-10-des-etapes-a-respecter-pour-une-operation-efficace.html",
  },

  {
    id: "plateformes-formation-en-ligne",
    title: "5 Plateformes de Formation en Ligne",
    client: "Professionnels, indépendants & créateurs de contenus pédagogiques",
    category: "SEO & Marketing Digital",
    badge: "Article Média Digital",
    shortDescription: "Analyse comparative des meilleures solutions de formation continue et de monétisation de connaissances en ligne.",
    problem: "Risque d'obsolescence des compétences face à l'évolution rapide du marché du travail et complexité à choisir la bonne plateforme d'e-learning.",
    solution: "Rédaction d'un panorama comparatif sélectionnant 5 outils clés (System.io, Udemy, Didacte, Learnybox, 1TPE) axés sur le perfectionnement professionnel et la vente de formations.",
    impact: [
      { metric: "5 Outils", label: "Solutions e-learning comparées" },
      { metric: "100% SEO", label: "Optimisé pour la recherche EdTech" },
      { metric: "B2B / B2C", label: "Guide orienté compétences & ROI" },
    ],
    technologies: ["Rédaction Web B2B", "SEO Content Strategy", "EdTech Benchmarking", "Inbound Marketing"],
    deliverables: [
      "Article d'analyse comparative des plateformes e-learning",
      "Optimisation sémantique et structuration SEO",
      "Guide de sélection pour formateurs et apprenants",
    ],
    liveUrl: "https://belleinitiative.over-blog.com/2019/12/5-plateformes-de-formation-en-ligne-qui-vont-changer-votre-vie.html",
  },

];

export const caseStudiesDataEn: CaseStudy[] = [
  
  {
    id: "extinction-countdown",
    title: "Extinction Countdown",
    client: "Astronomy enthusiasts, researchers & general public",
    category: "Web & Platform",
    badge: "Live Platform",
    shortDescription: "Cosmic risk analysis and natural disaster tracking.",
    problem: "Lack of centralized platforms displaying planetary risk data in an accessible and visual format.",
    solution: "Engineering of an interactive web application featuring impact scenario modeling.",
    impact: [
      { metric: "100%", label: "Autonomous & Live" },
      { metric: "Secure", label: "Cybersecurity" },
      { metric: "SEO", label: "Search Console Indexed" },
    ],
    technologies: ["React", "TypeScript", "Supabase", "LWS"],
    deliverables: [
      "Responsive web application",
      "Real-time database integration",
      "Impact analysis module",
    ],
    liveUrl: "https://extinctioncountdown.com",
  },
  
  {
    id: "finance-ai-expert",
    title: "Finance AI Expert",
    client: "Individuals & Professionals seeking financial optimization",
    category: "AI Agents & Automation",
    badge: "Live Bilingual Agent",
    shortDescription: "Intelligent virtual assistant dedicated to personalized financial advice, savings strategies, and expense tracking.",
    problem: "Lack of accessible, tailored, and structured financial guidance for individuals without paying high advisory fees.",
    solution: "Deployment of a bilingual (FR/EN) AI agent capable of analyzing spending habits, crafting custom savings plans, and guiding users toward suitable investment decisions.",
    impact: [
      { metric: "24/7", label: "Instant availability" },
      { metric: "FR / EN", label: "Fully bilingual" },
      { metric: "< 3s", label: "Average response time" },
    ],
    technologies: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Bilingual conversational AI agent",
      "Responsive & intuitive user interface",
      "Budgeting & savings recommendation engine",
    ],
    liveUrl: "https://melodic-gnome-62029b.netlify.app/",
  },

  {
    id: "paygenius-hr",
    title: "PayGenius HR",
    client: "HR Leaders, CEOs & Corporate Payroll Managers",
    category: "AI Agents & Automation",
    badge: "Automated Generation",
    shortDescription: "Automated HR payroll generation platform featuring strict role-based permissions and secure access.",
    problem: "Time-consuming spreadsheet payroll workflows prone to security risks and internal data leaks.",
    solution: "Engineered a centralized web application automating payslip creation for executives with isolated client access for staff.",
    impact: [
      { metric: "-80%", label: "Payroll processing time" },
      { metric: "100%", label: "Data privacy & RBAC enforced" },
      { metric: "0", label: "Manual data re-entry" },
    ],
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Automated PDF payslip generation engine",
      "Role-based authentication system (CEO / HR / Staff)",
      "Secure employee download portal",
    ],
    liveUrl: "https://fabulous-dieffenbachia-627f92.netlify.app/",
  },

  // 2. Luxious Immobilier
  {
    id: "luxious-immobilier",
    title: "Luxious Immobilier",
    client: "High-net-worth Buyers, Sellers & Real Estate Investors",
    category: "Web & Platform",
    badge: "Luxury Real Estate",
    shortDescription: "High-end real estate web portal with online property valuation and listing presentation.",
    problem: "Lack of brand digital authority and absence of instant online property valuation tools to secure exclusive mandates.",
    solution: "Designed a premium luxury real estate platform enabling fluid property exploration, valuation estimation, and direct inquiry.",
    impact: [
      { metric: "+50%", label: "Online valuation leads" },
      { metric: "< 2s", label: "High-res media load speed" },
      { metric: "100%", label: "Premium responsive UI/UX" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Interactive luxury property showcase (Villas, Apartments)",
      "Online property valuation module",
      "Direct contact & inquiry booking system",
    ],
    liveUrl: "https://taupe-starburst-d64cd8.netlify.app/",
  },

  // 3. Urgencia
  {
    id: "urgencia",
    title: "Urgencia Ouidah",
    client: "Tourists, Local Residents & Healthcare Services in Ouidah",
    category: "Web & Platform",
    badge: "Live Local App",
    shortDescription: "Emergency location finder for pharmacies, hospitals, and fire stations in Ouidah.",
    problem: "Difficulty for tourists and residents unfamiliar with the city to rapidly locate emergency care and rescue services.",
    solution: "Deployed a responsive real-time web app mapping essential healthcare services and emergency responders with instant navigation.",
    impact: [
      { metric: "24/7", label: "Instant emergency access" },
      { metric: "< 1s", label: "Interactive map load time" },
      { metric: "100%", label: "Emergency coverage in Ouidah" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Geolocation API", "Netlify"],
    deliverables: [
      "Interactive directory of open pharmacies & medical centers",
      "One-tap emergency call triggers (Firefighters, Ambulance)",
      "Geolocation & local route guidance system",
    ],
    liveUrl: "https://urgencia2.netlify.app/",
  },

  // 4. Coach Good Pasta
  {
    id: "coach-good-pasta",
    title: "Coach Good Pasta",
    client: "HR Teams, Onboarding Employees & Department Managers",
    category: "AI Agents & Automation",
    badge: "AI Onboarding Assistant",
    shortDescription: "Departmental AI onboarding assistant and operational support agent for Good Pasta employees.",
    problem: "Frequent workflow interruptions and productivity drops for senior staff handling constant repetitive inquiries from new hires.",
    solution: "Built a conversational AI agent bilingual, trained on company SOPs to guide, answer questions, and onboard employees by department.",
    impact: [
      { metric: "-60%", label: "Repetitive senior staff inquiries" },
      { metric: "2x", label: "Faster new hire onboarding" },
      { metric: "24/7", label: "Internal support availability" },
    ],
    technologies: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Netlify"],
    deliverables: [
      "Department-specific AI support agent",
      "Structured internal AI knowledge base",
      "Autonomous conversational onboarding interface",
    ],
    liveUrl: "https://lighthearted-madeleine-7ef1dc.netlify.app/",
  },

  // 5. PixelDebate
  {
    id: "pixeldebate",
    title: "PixelDebate",
    client: "Art Enthusiasts, Psychologists & Behavioral Science Researchers",
    category: "AI Agents & Automation",
    badge: "AI Hackathon Winner",
    shortDescription: "Multimodal AI agent evaluating user canvas sketches to deduce psycho-sociological behavior.",
    problem: "Lack of interactive tools blending digital artistic expression with instant psychological and behavioral analysis.",
    solution: "Engineered an AI application where users sketch on a digital canvas and receive real-time behavioral insights via multimodal computer vision.",
    impact: [
      { metric: "100%", label: "Automated vision analysis" },
      { metric: "< 4s", label: "Psychological profile generation" },
      { metric: "Hackathon", label: "Award-winning project build" },
    ],
    technologies: ["React", "TypeScript", "Gemini Vision API", "HTML5 Canvas", "Netlify"],
    deliverables: [
      "Interactive online drawing canvas",
      "Computer vision image parsing pipeline",
      "Behavioral & sociological interpretation engine",
    ],
    liveUrl: "https://fluffy-marzipan-694223.netlify.app/",
  },

  // 6. Rose Bloom
  {
    id: "rose-bloom",
    title: "Rose Bloom",
    client: "Woodcraft Enthusiasts, Interior Designers & Custom Art Buyers",
    category: "Web & Platform",
    badge: "Artisan E-commerce",
    shortDescription: "Artisanal showcase website highlighting handcrafted custom wooden creations and art objects.",
    problem: "Limited reach for fine woodworking artisans to showcase their portfolio and capture custom orders beyond their physical workshop.",
    solution: "Built an elegant web showcase designed to display woodwork craftsmanship and capture custom quote requests effortlessly.",
    impact: [
      { metric: "100%", label: "Artistic catalog exposure" },
      { metric: "+40%", label: "Online quote inquiries" },
      { metric: "< 1.5s", label: "Gallery page load time" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Netlify"],
    deliverables: [
      "High-resolution art craft gallery",
      "Custom project quote request form",
      "Artisan background & craftsmanship storytelling section",
    ],
    liveUrl: "https://elaborate-scone-c66085.netlify.app/",
  },

  // 7. CapinAkpado.com
  {
    id: "capinakpado-portfolio",
    title: "CapinAkpado.com",
    client: "Enterprises, SMBs & Startups hiring Web, Mobile & AI Engineers",
    category: "Web & Platform",
    badge: "Tech & AI Hub",
    shortDescription: "Bilingual professional hub featuring interactive AI Audit tools and case study demonstrations.",
    problem: "Need for a clear, high-performance platform demonstrating production-grade web/mobile skills and AI agent architecture.",
    solution: "Engineered a high-performance web platform featuring multi-language support, dynamic dark/light theme, and an AI audit simulator.",
    impact: [
      { metric: "100%", label: "Strict TypeScript architecture" },
      { metric: "FR / EN", label: "Dynamic bilingual support" },
      { metric: "30+", label: "Demonstrated skills & projects" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "LWS"],
    deliverables: [
      "High-performance type-safe web architecture",
      "Interactive AI Audit Simulator module",
      "Real-time filterable Case Study system",
    ],
    liveUrl: "https://capinakpado.com",
  },

  // 8. Newsletter Le Guide IA de l'Entrepreneur
  {
    id: "guide-ia-newsletter",
    title: "The AI Pro Entrepreneur's Guide",
    client: "Entrepreneurs, SMB CEOs & Economic Decision-Makers",
    category: "SEO & Digital Marketing",
    badge: "Strategic Newsletter",
    shortDescription: "Weekly executive publication guiding founders on profitable & strategic AI adoption.",
    problem: "Technical noise and lack of actionable, ROI-focused methods for business leaders integrating AI into operations.",
    solution: "Launched a LinkedIn briefing delivering weekly field notes, AI agent blueprints, and business ROI frameworks to founders.",
    impact: [
      { metric: "Weekly", label: "High-impact regular publication" },
      { metric: "100%", label: "Business ROI-focused content" },
      { metric: "B2B", label: "Qualified executive audience" },
    ],
    technologies: ["LinkedIn Publishing", "B2B Copywriting", "Content Strategy", "Prompt Engineering"],
    deliverables: [
      "Weekly AI briefings & operational strategy playbooks",
      "Shared agent architecture blueprints & system prompts",
      "Profitable automation frameworks",
    ],
    liveUrl: "https://www.linkedin.com/newsletters/le-guide-ia-de-l-entrepreneur-7471228391753592832/",
  },
 
 {
  id: "ia-site-web-marketing-digital",
  title: "AI & Website Performance",
  client: "Businesses, entrepreneurs & digital professionals",
  category: "SEO & Digital Marketing",
  badge: "Expert Publication",
  shortDescription: "An analysis of 7 practical use cases for artificial intelligence to improve user experience, conversion, and website marketing performance.",
  problem: "Businesses need to evolve their websites beyond their role as simple digital showcases in order to meet increasingly demanding visitors, personalize user journeys, and improve their visibility and commercial performance.",
  solution: "An analysis of seven practical applications of AI on websites: virtual advisor, predictive recommendation engine, intelligent semantic search, lead scoring, self-service AI accounting assistant, AI-powered product description generation, and intelligent B2B forms. The article explores their potential for user experience, conversion, content, and SEO.",
  impact: [
    { metric: "7", label: "AI use cases analyzed" },
    { metric: "SEO", label: "Digital visibility optimization" },
    { metric: "UX", label: "Personalized user experience" }
  ],
  technologies: [
    "Artificial Intelligence",
    "Natural Language Processing",
    "Machine Learning",
    "OCR",
    "Generative AI"
  ],
  deliverables: [
    "Expert article published on Webmarketing & co’m",
    "Analysis of 7 AI use cases applied to websites",
    "Recommendations focused on user experience and conversion",
    "Insights into integrating AI into SEO and digital marketing strategies"
  ],
  liveUrl: "https://www.webmarketing-com.com/entreprise-7-cas-usage-concrets-integrer-ia-site-web"
},


{
id: "choix-reseaux-sociaux-entreprise",
title: "Choosing Social Media Platforms for a Business",
client: "Entrepreneurs, businesses & digital marketing professionals",
category: "SEO & Digital Marketing",
badge: "Expert Publication",
shortDescription: "A practical guide covering 7 essential criteria for choosing the social media platforms best suited to a business, its audience, and its marketing objectives.",
problem: "Being present on every social media platform does not necessarily lead to greater visibility. Businesses need to identify the platforms that actually match their audience, industry, content production capabilities, and commercial objectives.",
solution: "An expert article published on Webmarketing & co’m covering seven criteria for choosing the right social media platforms for a business: audience persona, business compatibility, communication objectives, content production capabilities, online priorities, platform-specific characteristics, and the training required to manage them effectively.",
impact: [
{ metric: "7", label: "Criteria analyzed" },
{ metric: "Social Media", label: "Digital presence strategy" },
{ metric: "Persona", label: "Audience-focused approach" }
],
technologies: [
"Web Marketing",
"Digital Marketing",
"Social Media",
"Community Management",
"Web Writing"
],
deliverables: [
"Expert article published on Webmarketing & co’m",
"Analysis of 7 social media selection criteria",
"Analysis of the relationship between audience, business activity, and social platforms",
"Recommendations covering content, marketing objectives, and digital presence strategy"
],
liveUrl: "https://www.webmarketing-com.com/choix-reseaux-sociaux-entreprise-top-7-criteres"
},

{
    id: "tendances-consommation-2023",
    title: "Top 7 Consumer Behavior Trends",
    client: "Brands, E-commerce Owners & Marketing Directors",
    category: "SEO & Digital Marketing",
    badge: "B2B Media Article",
    shortDescription: "Strategic analysis of shifting buyer behaviors and digital marketing levers published on Webmarketing & co'm.",
    problem: "Instability of traditional marketing strategies when faced with rapid socio-economic shifts and evolving purchasing habits.",
    solution: "Authored an in-depth trend report dissecting 7 major consumer behavior shifts (re-use economy, local sourcing, social commerce, sharing economy) with actionable business insights.",
    impact: [
      { metric: "Top Media", label: "Published on Webmarketing & co'm" },
      { metric: "100% SEO", label: "Optimized for B2B search intent" },
      { metric: "7 Pillars", label: "Consumer trends analyzed" },
    ],
    technologies: ["B2B Web Copywriting", "SEO Content Strategy", "Market Research", "Digital Copywriting"],
    deliverables: [
      "High-value strategic thought leadership article",
      "Semantic optimization and SEO structure",
      "Consumer behavior analysis framework",
    ],
    liveUrl: "https://www.webmarketing-com.com/top-7-tendances-consommation-2023",
  },

  {
    id: "tendances-ecommerce-2022",
    title: "Top 10 E-commerce Trends",
    client: "E-commerce Founders, D2C Brands & Digital Strategy Directors",
    category: "SEO & Digital Marketing",
    badge: "B2B Media Article",
    shortDescription: "In-depth strategic analysis of post-pandemic e-commerce innovations and buyer journey shifts published on Webmarketing & co'm.",
    problem: "Online retailers constantly face conversion friction and rapid changes in buyer behaviors driven by emerging technology and market expectations.",
    solution: "Authored an executive trend analysis dissecting 10 core e-commerce innovation pillars (voice AI chatbots, re-commerce, live shopping, social commerce, visual search, and friction-free instant payments).",
    impact: [
      { metric: "Top Media", label: "Published on Webmarketing & co'm" },
      { metric: "100% SEO", label: "Optimized for e-commerce search intent" },
      { metric: "10 Pillars", label: "Digital innovations dissected" },
    ],
    technologies: ["B2B Web Copywriting", "SEO Content Strategy", "E-commerce Benchmarking", "Conversion Rate Optimization"],
    deliverables: [
      "High-impact B2B thought leadership article",
      "Semantic optimization and structured SEO headings",
      "E-commerce conversion & tech innovation framework",
    ],
    liveUrl: "https://www.webmarketing-com.com/top-10-tendances-e-commerce-2022",
  },

  {
    id: "secrets-webmarketing-newsletter",
    title: "The Secrets of Webmarketing",
    client: "Entrepreneurs, Freelancers, Consultants & Content Creators",
    category: "SEO & Digital Marketing",
    badge: "LinkedIn Newsletter",
    shortDescription: "Regular strategic publication sharing actionable frameworks and web marketing tactics for client acquisition and online growth.",
    problem: "Solopreneurs and business owners struggle to structure a high-converting web marketing strategy without wasting effort or ad spend.",
    solution: "Publication of a dedicated weekly/bi-weekly LinkedIn newsletter delivering hands-on acquisition guides, SEO growth playbooks, and conversion optimization insights.",
    impact: [
      { metric: "B2B", label: "Targeted founder & freelancer audience" },
      { metric: "100%", label: "Actionable growth insights" },
      { metric: "LinkedIn", label: "Direct authority & lead channel" },
    ],
    technologies: ["LinkedIn Publishing", "Inbound Marketing", "B2B Copywriting", "SEO Strategy"],
    deliverables: [
      "Targeted growth and conversion-focused issues",
      "Actionable lead generation playbooks",
      "Analysis of modern digital marketing best practices",
    ],
    liveUrl: "https://www.linkedin.com/newsletters/les-secrets-du-webmarketing-7084567011980124160/",
  },

{
    id: "migration-site-web-etapes",
    title: "Website Migration: Top 10 Critical Steps",
    client: "Web Developers, Project Managers & Website Owners",
    category: "SEO & Digital Marketing",
    badge: "Technical SEO Article",
    shortDescription: "Comprehensive methodological guide to executing seamless website migrations without losing traffic or search rankings.",
    problem: "High risk of organic traffic loss, broken 404 links, and SEO ranking drops during web hosting changes or structural site revamps.",
    solution: "Authored a step-by-step technical playbook covering pre-migration content audits, URL mapping, 301 redirect strategies, pre-launch testing, and Search Console post-checks.",
    impact: [
      { metric: "10 Steps", label: "Complete sequential methodology" },
      { metric: "Zero Loss", label: "SEO rank preservation strategy" },
      { metric: "B2B / Tech", label: "Best-practices tech guide" },
    ],
    technologies: ["Web Architecture", "Technical SEO", "301 Redirects", "Google Search Console", "B2B Copywriting"],
    deliverables: [
      "Comprehensive website migration playbook",
      "Technical & SEO pre-launch verification checklist",
      "Database export/import & URL mapping procedures",
    ],
    liveUrl: "https://belleinitiative.over-blog.com/2025/03/migration-d-un-site-web-top-10-des-etapes-a-respecter-pour-une-operation-efficace.html",
  },

  {
    id: "plateformes-formation-en-ligne",
    title: "Top 5 Online Learning Platforms",
    client: "Professionals, Solopreneurs & Digital Course Creators",
    category: "SEO & Digital Marketing",
    badge: "Digital Media Article",
    shortDescription: "Comparative analysis of leading online platforms for upskilling and knowledge monetization.",
    problem: "Rapid skill obsolescence in modern careers and confusion surrounding the choice of e-learning platforms for professional growth.",
    solution: "Authored a curated comparative review evaluating 5 core EdTech solutions (System.io, Udemy, Didacte, Learnybox, 1TPE) for skill acquisition and course sales.",
    impact: [
      { metric: "5 Tools", label: "E-learning platforms reviewed" },
      { metric: "100% SEO", label: "Optimized for EdTech search intent" },
      { metric: "B2B / B2C", label: "Skill-building & ROI focused guide" },
    ],
    technologies: ["B2B Web Copywriting", "SEO Content Strategy", "EdTech Benchmarking", "Inbound Marketing"],
    deliverables: [
      "Comparative analysis article on e-learning hubs",
      "Semantic optimization and structured SEO headings",
      "Selection guide for educators and online learners",
    ],
    liveUrl: "https://belleinitiative.over-blog.com/2019/12/5-plateformes-de-formation-en-ligne-qui-vont-changer-votre-vie.html",
  },

];

export const faqDataFr = [
  {
    question: "Comment se déroule un projet type ensemble ?",
    answer: "Tout commence par un court échange de 15 minutes pour cadrer votre besoin. Ensuite, je conçois une maquette interactive ou un prototype fonctionnel sous 3 à 5 jours. Après votre validation, je développe la solution complète et assure le déploiement ainsi que votre formation.",
  },
  {
    question: "Faut-il des compétences techniques pour utiliser les outils livrés ?",
    answer: "Absolument aucune. Toutes mes réalisations sont conçues pour être utilisables immédiatement par vous et votre équipe, sans jargon technique. Vous recevez des tutoriels vidéos clairs et personnalisés.",
  },
  {
    question: "Comment fonctionnent les agents IA pour mon entreprise ?",
    answer: "Les agents IA sont des assistants virtuels configurés spécialement pour vos processus métiers. Ils sont entraînés sur vos données (documents, grilles tarifaires, FAQ) et peuvent répondre à vos clients ou automatiser vos tâches sans jamais inventer d'informations.",
  },
  {
    question: "Quels sont les délais moyens de réalisation ?",
    answer: "Pour un site web stratégique ou un premier agent d'automatisation, comptez généralement entre 1 et 3 semaines. Pour une application web ou mobile complète, les délais varient entre 3 et 6 semaines selon la complexité.",
  },
  {
    question: "Proposez-vous un suivi et de la maintenance ?",
    answer: "Oui, chaque projet bénéficie d'une garantie de bon fonctionnement et d'un accompagnement après livraison. Des forfaits de maintenance évolutive sont également disponibles pour faire grandir vos outils sereinement.",
  },
];

export const faqDataEn = [
  {
    question: "How does a typical project unfold?",
    answer: "We start with a quick 15-minute discovery call to scope your goals. Within 3 to 5 days, I deliver an interactive prototype. Upon your review and approval, I engineer the full solution, handle production deployment, and train your team.",
  },
  {
    question: "Do I need technical skills to use the delivered systems?",
    answer: "None at all. Everything is built to be immediately intuitive for you and your staff with zero jargon. You receive tailored video walkthroughs and clean documentation.",
  },
  {
    question: "How do custom AI agents work for my business?",
    answer: "AI agents are purpose-built virtual assistants configured specifically for your workflows. Trained on your secure data (docs, pricing, FAQs), they assist customers and execute tasks reliably without hallucinating.",
  },
  {
    question: "What are the typical project timelines?",
    answer: "A high-conversion website or initial automation workflow usually takes 1 to 3 weeks. A comprehensive web platform or mobile application takes 3 to 6 weeks depending on feature complexity.",
  },
  {
    question: "Do you offer post-launch maintenance & updates?",
    answer: "Yes, every delivery includes an operational warranty and hands-on onboarding. Flexible continuous improvement packages are available to scale your tools as your business grows.",
  },
];

export function getServices(lang: Language): ServiceItem[] {
  return lang === "en" ? servicesDataEn : servicesDataFr;
}

export function getCaseStudies(lang: Language): CaseStudy[] {
  return lang === "en" ? caseStudiesDataEn : caseStudiesDataFr;
}

export function getMethodology(lang: Language): MethodologyStep[] {
  return lang === "en" ? methodologyDataEn : methodologyDataFr;
}

export function getFaq(lang: Language) {
  return lang === "en" ? faqDataEn : faqDataFr;
}
