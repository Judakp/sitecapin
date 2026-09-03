import { CaseStudy, ServiceItem, MethodologyStep, Language } from "../types";

export const servicesDataFr: ServiceItem[] = [
  // 1ère Ligne - Position 1: Le Guide IA Pro de l'Entrepreneur
  {
    id: "guide-ia-pro",
    title: "Le Guide IA Pro de l'Entrepreneur",
    subtitle: "Conseil stratégique, cas d'usage & newsletter d'élite pour dirigeants",
    description: "Accompagnement personnalisé et partage continu de méthodes concrètes pour aider les entrepreneurs et chefs d'entreprises à adopter l'IA, automatiser leurs opérations critiques et maximiser leur ROI sans jargon technique.",
    iconName: "BookOpen",
    badge: "Conseil & Newsletter",
    highlights: [
      "Audit personnalisé des opportunités IA pour votre secteur d'activité",
      "Conseils stratégiques sur le choix des modèles (Claude 3.7, GPT-4.5, Gemini 2.0)",
      "Accès exclusif à la Newsletter hebdomadaire & aux prompts testés",
      "Optimisation des coûts d'API, sécurité des données et conformité",
    ],
    deliverables: [
      "Feuille de route stratégique IA à 90 jours",
      "Abonnement VIP à la Newsletter hebdomadaire",
      "Matrice comparative des outils & agents IA recommandés",
      "Sessions de conseil 1-to-1 avec Capin Akpado",
    ],
    idealFor: "Chefs d'entreprises, dirigeants de PME, créateurs et indépendants voulant intégrer l'IA avec discernement et rentabilité.",
    directAction: "guide-ia-pro",
  },
  // 1ère Ligne - Position 2: Création de Sites Web & Applications Web
  {
    id: "web-dev",
    title: "Création de Sites Web & Applications Web",
    subtitle: "Sites vitrines d'exception, plateformes SaaS & applications web ultra-rapides",
    description: "Conception et développement d'interfaces web fluides, réactives et optimisées pour la conversion. Une esthétique soignée alliée à des performances maximales et une architecture moderne (React, TypeScript, Next.js).",
    iconName: "Globe",
    badge: "Haute Performance",
    highlights: [
      "Design UX/UI sur-mesure adapté à votre positionnement de marque",
      "Vitesse de chargement optimale (< 1 seconde) & score SEO 100/100",
      "Architecture cloud moderne, typée, sécurisée et ultra-scalable",
      "Espace d'administration simple et autonome pour vos contenus",
    ],
    deliverables: [
      "Maquettes interactives Figma haute fidélité",
      "Code source propre, sécurisé & évolutif",
      "Intégration formulaires, outils marketing & paiements Stripe",
      "Formation vidéo & documentation d'utilisation personnalisée",
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
    idealFor: "Sociétés recevant des sollicitations récurrentes ou voulant convertir leurs visiteurs la nuit et le week-end.",
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
      "Ateliers pratiques en direct (intra-entreprise ou inter-entreprises)",
      "Blueprints d'agents IA prêts à être déployés en production",
      "Session de coaching et suivi post-formation (30 jours)",
    ],
    idealFor: "Développeurs, chefs de projet, équipes produit et managers souhaitant internaliser les compétences en agents IA.",
    directAction: "contact",
  },
  // 2ème Ligne - Position 2: Service d'Automatisation
  {
    id: "automation",
    title: "Automatisation de Processus Métier & Workflows",
    subtitle: "Suppression des tâches répétitives & synchronisation fluide de vos outils",
    description: "Création de passerelles automatiques entre vos logiciels du quotidien (Gmail, WhatsApp, CRM, Facturation, Calendriers, Airtable) pour vous faire gagner des dizaines d'heures chaque mois.",
    iconName: "Zap",
    badge: "Gain de Temps",
    highlights: [
      "Relance automatique des devis et factures impayées",
      "Création instantanée de fiches clients dès réception d'un lead",
      "Génération automatique de rapports d'activité et synthèses",
      "Zéro ressaisie manuelle entre vos différents logiciels",
    ],
    deliverables: [
      "Workflows automatisés robustes, monitorés et testés",
      "Alertes en temps réel sur WhatsApp ou Slack",
      "Tableau de bord de rentabilité et temps opérationnel gagné",
      "Support, surveillance et maintenance continue",
    ],
    idealFor: "Équipes débordées par l'administratif, la gestion de devis ou le suivi manuel des clients.",
    playgroundTab: "automation",
  },
  // 2ème Ligne - Position 3: Service de Création d'Application Mobile
  {
    id: "mobile-dev",
    title: "Création d'Applications Mobiles",
    subtitle: "Applications iOS & Android natives et cross-platform fluides et intelligentes",
    description: "Conception et développement d'applications mobiles performantes et intuitives (React Native, Flutter, Swift, Kotlin), connectées à votre écosystème cloud et enrichies de fonctionnalités modernes (IA embarquée, notifications push, mode hors-ligne).",
    iconName: "Smartphone",
    badge: "iOS & Android",
    highlights: [
      "Interfaces mobiles haute fidélité (60 fps) & expérience tactile soignée",
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
    subtitle: "Strategic advisory, actionable case studies & elite newsletter for executives",
    description: "Personalized coaching and continuous practical insights to help entrepreneurs and business owners implement AI, automate critical workflows, and maximize ROI without technical jargon.",
    iconName: "BookOpen",
    badge: "Advisory & Newsletter",
    highlights: [
      "Personalized AI opportunity audit for your specific business sector",
      "Strategic advice on model selection (Claude 3.7, GPT-4.5, Gemini 2.0)",
      "Exclusive access to the weekly Newsletter & tested prompt blueprints",
      "API cost optimization, enterprise data security & compliance",
    ],
    deliverables: [
      "90-day actionable AI strategic roadmap",
      "VIP subscription to the weekly Newsletter",
      "Curated AI tools & autonomous agents decision matrix",
      "1-on-1 strategic advisory sessions with Capin Akpado",
    ],
    idealFor: "Founders, SMB leaders, creators, and freelancers aiming for pragmatic, profitable AI adoption.",
    directAction: "guide-ia-pro",
  },
  // Row 1 - Position 2: Custom Web & Web App Development
  {
    id: "web-dev",
    title: "Custom Web & Web App Development",
    subtitle: "High-end corporate websites, SaaS platforms & lightning-fast web applications",
    description: "Engineering fluid, responsive, and conversion-optimized web interfaces. Refined aesthetics paired with peak performance to captivate your visitors from the first second.",
    iconName: "Globe",
    badge: "High Performance",
    highlights: [
      "Custom UX/UI tailored to your brand identity",
      "Ultra-fast loading speed (< 1 second) & 100/100 SEO optimization",
      "Modern, type-safe, resilient cloud architecture",
      "Intuitive and autonomous management portal for your team",
    ],
    deliverables: [
      "Interactive Figma high-fidelity prototypes",
      "Clean, scalable & secure codebase",
      "Form integrations & secured checkout/payments (Stripe)",
      "Video walkthroughs & custom documentation",
    ],
    idealFor: "Companies, creators, consultants, startups, and firms establishing digital authority.",
    playgroundTab: "web_architect",
  },
  // Row 1 - Position 3: Design & Deployment of AI Agents
  {
    id: "ai-integration",
    title: "Design & Deployment of AI Agents",
    subtitle: "Custom virtual assistants & autonomous agents connected to your data",
    description: "Deploying conversational agents and smart assistants capable of answering customer queries 24/7, qualifying incoming leads, parsing documents, and triggering business actions.",
    iconName: "Bot",
    badge: "Applied AI",
    highlights: [
      "24/7 Customer Support Agent with zero wait time",
      "Semantic search (RAG) across your business knowledge base",
      "Automated lead qualification before appointment booking",
      "Custom tone aligned with your editorial voice",
    ],
    deliverables: [
      "Plug-and-play AI chat widget for your website or customer portal",
      "Secure model training on your documents & FAQs",
      "Live conversation analytics dashboard",
      "Seamless human escalation mechanism",
    ],
    idealFor: "Businesses receiving frequent inquiries or looking to convert leads overnight.",
    playgroundTab: "automation",
  },
  // Row 2 - Position 1: AI Agents Training & Workshops
  {
    id: "formation-agents-ia",
    title: "AI Agents Training & Workshops",
    subtitle: "Master the engineering, orchestration, and deployment of autonomous agents",
    description: "Intensive, hands-on training tailored for technical teams and business leaders: learn how to build resilient AI agents, integrate them into core APIs, and automate multi-step operations reliably.",
    iconName: "GraduationCap",
    badge: "Training & Workshops",
    highlights: [
      "Advanced Prompt Engineering, Context Architecture & Structured Outputs",
      "Agent Design: Function Calling, Tool Use & Contextual Memory",
      "Real-world lab builds: Support Agent, Lead Triage Agent & Research Agent",
      "Reliability safeguards, hallucination prevention & unit testing",
    ],
    deliverables: [
      "Full interactive curriculum & hands-on GitHub repositories",
      "Live interactive workshops (in-company or remote cohorts)",
      "Ready-to-deploy production agent blueprints",
      "30-day post-training coaching and Q&A support",
    ],
    idealFor: "Engineers, product managers, operations teams, and leaders eager to internalize AI agent capabilities.",
    directAction: "contact",
  },
  // Row 2 - Position 2: Workflow Automation & Tool Integration
  {
    id: "automation",
    title: "Workflow Automation & Tool Integration",
    subtitle: "Eliminating repetitive tasks with seamless data syncing",
    description: "Building automated bridges between your daily software (Gmail, WhatsApp, Spreadsheets, Invoicing, Calendars) to reclaim dozens of operational hours every month.",
    iconName: "Zap",
    badge: "Time Saving",
    highlights: [
      "Automated quote & overdue invoice follow-ups",
      "Instant CRM customer creation on new lead reception",
      "Automatic daily report generation & summaries",
      "Zero manual copy-pasting across software",
    ],
    deliverables: [
      "Tested and resilient automated pipelines",
      "Real-time WhatsApp or Slack alerts",
      "Time-saved & ROI tracking dashboard",
      "Ongoing monitoring and maintenance",
    ],
    idealFor: "Teams overwhelmed by manual admin, quote chasing, or manual data entry.",
    playgroundTab: "automation",
  },
  // Row 2 - Position 3: Custom Mobile App Development
  {
    id: "mobile-dev",
    title: "Custom Mobile App Development",
    subtitle: "Fluid, high-performance & smart iOS and Android mobile applications",
    description: "Engineering high-performance cross-platform and native mobile apps (React Native, Flutter, Swift, Kotlin) with seamless cloud syncing, push notifications, and smart on-device or cloud AI capabilities.",
    iconName: "Smartphone",
    badge: "iOS & Android",
    highlights: [
      "Fluid 60fps animations & pixel-perfect mobile design",
      "Full App Store (iOS) & Google Play (Android) deployment",
      "Push notifications, offline-first caching & biometric login",
      "Smart AI features, geolocation & real-time chat/sync",
    ],
    deliverables: [
      "Production-ready builds for App Store & Google Play",
      "Scalable real-time backend & secure cloud database",
      "Interactive mobile prototypes (Figma)",
      "Store submission management & OS update maintenance",
    ],
    idealFor: "Startups, modern brands, and businesses looking to engage customers on mobile or equip field teams with dedicated tools.",
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
      "Maquettes modernes sur-mesure au style Frosted Glass",
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
      "Développement en TypeScript sécurisé et performant",
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
    title: "Strategic Discovery & Scoping",
    duration: "Day 1 to 3",
    description: "We pinpoint your exact goals, current operational bottlenecks, and projected quantifiable ROI.",
    bullets: [
      "Audit of existing software and workflows",
      "Clear technical and functional scope definition",
      "Transparent proposal with fixed timeline and pricing",
    ],
  },
  {
    number: "02",
    title: "UX/UI Design & Interactive Prototype",
    duration: "Week 1",
    description: "Crafting visual prototypes and interaction blueprints so you can test and approve the experience before coding starts.",
    bullets: [
      "Modern Frosted Glass interface design",
      "User journey & AI interaction validation",
      "Real-time collaborative iterations",
    ],
  },
  {
    number: "03",
    title: "Agile Development & AI Tuning",
    duration: "Weeks 2 to 3",
    description: "Engineering with modern web standards and fine-tuning AI models on your actual business knowledge.",
    bullets: [
      "Clean, scalable TypeScript architecture",
      "Secure API integrations & encrypted databases",
      "Rigorous quality assurance & load testing",
    ],
  },
  {
    number: "04",
    title: "Deployment, Training & Ongoing Growth",
    duration: "Week 3+",
    description: "Seamless zero-downtime release, personalized team onboarding, and continuous proactive support.",
    bullets: [
      "Production deployment with live health monitoring",
      "Clear video tutorials and hands-on guidance",
      "Uptime warranty and reactive support",
    ],
  },
];

export const caseStudiesDataFr: CaseStudy[] = [
  {
    id: "logistics-hub",
    title: "Automatisation du Support & Facturation pour un réseau de transport",
    client: "TransLog Express (PME 25 collaborateurs)",
    category: "Automatisation & Workflows",
    badge: "-70% de temps administratif",
    shortDescription: "Mise en place d'un agent de tri d'emails et d'un système de relance automatique des bons de livraison.",
    problem: "L'équipe passait plus de 18 heures par semaine à trier manuellement 200+ emails quotidiens, vérifier les numéros de colis et relancer les clients pour les signatures manquantes.",
    solution: "Déploiement d'un agent IA qui lit les pièces jointes, extrait automatiquement les données clés, met à jour le tableau de suivi et prépare les réponses types personnalisées en 3 secondes.",
    impact: [
      { metric: "-70%", label: "Temps passé sur le tri des emails" },
      { metric: "< 30s", label: "Délai de réponse aux urgences" },
      { metric: "+24h", label: "Gain moyen sur le règlement des factures" },
    ],
    technologies: ["Agent IA Traitement Documentaire", "Intégration Email / WhatsApp", "Tableau de Bord Réactif"],
    deliverables: [
      "Pipeline de tri automatique des pièces jointes",
      "Agent de réponse prédictif pour l'équipe support",
      "Synchronisation en direct avec le logiciel comptable",
    ],
    testimonial: {
      quote: "Nous avons retrouvé notre sérénité. Les erreurs de saisie ont disparu et nos clients sont bluffés par la rapidité des réponses.",
      author: "Marc D.",
      role: "Directeur des Opérations",
      company: "TransLog Express",
    },
  },
  {
    id: "cabinet-sante",
    title: "Portail Client & Prise de Rendez-vous Intelligent pour Cabinet Spécialisé",
    client: "Cabinet Santé & Posture",
    category: "Web & Plateforme",
    badge: "+45% de réservations en ligne",
    shortDescription: "Création d'un site web ultra-rapide avec questionnaire de pré-qualification et synchronisation d'agenda sans friction.",
    problem: "Le standard téléphonique était constamment saturé, entraînant des pertes d'appels et des rendez-vous mal orientés vers les mauvais spécialistes.",
    solution: "Conception d'une plateforme web épurée avec un guide d'orientation interactif en 3 clics qui recommande le praticien idéal et permet de réserver immédiatement.",
    impact: [
      { metric: "+45%", label: "Réservations directes en ligne" },
      { metric: "-80%", label: "Appels téléphoniques d'orientation" },
      { metric: "99.8%", label: "Taux de satisfaction des patients" },
    ],
    technologies: ["React / Tailwind CSS", "Tunnel de réservation fluide", "Système de rappels SMS automatiques"],
    deliverables: [
      "Site web responsive à chargement instantané",
      "Module d'orientation intelligente des patients",
      "Calendrier interactif avec synchronisation en temps réel",
    ],
    testimonial: {
      quote: "Notre agenda est plein 3 semaines à l'avance sans que la secrétaire n'ait à passer sa journée au téléphone.",
      author: "Dr. Sophie L.",
      role: "Praticienne Fondatrice",
      company: "Cabinet Santé & Posture",
    },
  },
  {
    id: "artisan-connect",
    title: "Application Mobile de Chantiers pour Artisans & Équipes Terrain",
    client: "Réseau Artisans Rénov",
    category: "Application Mobile",
    badge: "5h gagnées par semaine / technicien",
    shortDescription: "Application mobile utilisable d'une seule main pour photographier, dicter ses comptes-rendus et valider les étapes de chantier.",
    problem: "Les techniciens perdaient 1h chaque soir à ressaisir sur ordinateur leurs notes manuscrites et transférer les photos de chantiers prises avec leurs téléphones.",
    solution: "Développement d'une application mobile intuitive avec dictée vocale assistée par IA qui rédige un compte-rendu professionnel propre et l'envoie au client en 1 clic.",
    impact: [
      { metric: "5h", label: "Économisées par semaine par collaborateur" },
      { metric: "100%", label: "Rapports envoyés le jour même" },
      { metric: "0", label: "Perte d'informations ou de photos" },
    ],
    technologies: ["Application Mobile PWA", "Reconnaissance vocale IA", "Mode Hors-Ligne"],
    deliverables: [
      "Interface ultra-simplifiée pour le terrain",
      "Agent de mise en forme des notes vocales",
      "Génération automatique de PDF signables au doigt",
    ],
    testimonial: {
      quote: "Les gars sur le terrain l'ont adoptée le premier jour. C'est simple, rapide et ça nous évite les heures sup le soir.",
      author: "Julien V.",
      role: "Gérant",
      company: "Artisans Rénov",
    },
  },
  {
    id: "lead-qualifier",
    title: "Assistant IA de Qualification & Prise de Contact pour Agence Conseil",
    client: "Capitale Stratégie B2B",
    category: "Intégration IA",
    badge: "Réponse en 30s 24/7",
    shortDescription: "Agent conversationnel qui dialogue avec les visiteurs, identifie leur budget et planifie un appel de cadrage qualifié.",
    problem: "Les visiteurs qui remplissaient un formulaire de contact attendaient en moyenne 24h avant d'être rappelés, ce qui réduisait considérablement le taux de transformation.",
    solution: "Intégration d'un assistant conversationnel bienveillant qui engage le dialogue, pose les 3 questions indispensables et propose directement les créneaux disponibles des consultants.",
    impact: [
      { metric: "30s", label: "Temps moyen de premier contact" },
      { metric: "+35%", label: "Rendez-vous qualifiés générés" },
      { metric: "3x", label: "Multiplication des contacts le week-end" },
    ],
    technologies: ["Agent LLM Personnalisé", "Connecteur Agenda", "Notifications Instantanées"],
    deliverables: [
      "Agent IA entraîné sur l'expertise de l'agence",
      "Règles de qualification budgétaire sur-mesure",
      "Fiche synthèse générée pour le consultant avant chaque appel",
    ],
    testimonial: {
      quote: "L'assistant a signé son premier lead qualifié un dimanche soir à 23h. Un investissement rentabilisé en deux semaines.",
      author: "Émilie R.",
      role: "Responsable Développement",
      company: "Capitale Stratégie",
    },
  },
];

export const caseStudiesDataEn: CaseStudy[] = [
  {
    id: "logistics-hub",
    title: "Support & Invoicing Automation for a Regional Logistics Network",
    client: "TransLog Express (25 Employees SMB)",
    category: "Automation & Workflows",
    badge: "-70% administrative time",
    shortDescription: "Deployment of an email triage AI agent and automated delivery note reminder system.",
    problem: "The operations team spent over 18 hours weekly manually sorting 200+ daily emails, checking tracking numbers, and chasing clients for missing signatures.",
    solution: "Integrated an AI pipeline that parses PDF attachments, extracts structured data, syncs the live tracking board, and prepares tailored replies in 3 seconds.",
    impact: [
      { metric: "-70%", label: "Time spent on email triage" },
      { metric: "< 30s", label: "Urgent ticket response time" },
      { metric: "+24h", label: "Faster invoice payment collection" },
    ],
    technologies: ["Document AI Agent", "Email / WhatsApp Gateway", "Real-time Operations Board"],
    deliverables: [
      "Automated attachment parsing pipeline",
      "Predictive reply agent for support staff",
      "Direct synchronization with accounting software",
    ],
    testimonial: {
      quote: "We reclaimed peace of mind. Manual input errors are gone and our clients are impressed by our instant response times.",
      author: "Marc D.",
      role: "Head of Operations",
      company: "TransLog Express",
    },
  },
  {
    id: "cabinet-sante",
    title: "Client Portal & Smart Scheduling for Specialized Medical Practice",
    client: "Health & Posture Clinic",
    category: "Web & Platform",
    badge: "+45% online direct bookings",
    shortDescription: "Ultra-fast responsive web portal with intelligent patient pre-screening and zero-friction calendar sync.",
    problem: "The phone reception was constantly congested, leading to dropped calls and patients booking with the wrong clinical specialists.",
    solution: "Designed a clean web platform with a 3-click guided questionnaire that recommends the optimal practitioner and confirms appointment instantly.",
    impact: [
      { metric: "+45%", label: "Direct online bookings" },
      { metric: "-80%", label: "Triage phone calls" },
      { metric: "99.8%", label: "Patient satisfaction rate" },
    ],
    technologies: ["React / Tailwind CSS", "Seamless Booking Funnel", "Automated SMS Reminders"],
    deliverables: [
      "Instant-load responsive web application",
      "Smart patient triage & recommendation engine",
      "Interactive real-time calendar syncing",
    ],
    testimonial: {
      quote: "Our schedule is booked 3 weeks ahead without our secretary having to spend all day on the phone.",
      author: "Dr. Sophie L.",
      role: "Founder & Lead Practitioner",
      company: "Health & Posture Clinic",
    },
  },
  {
    id: "artisan-connect",
    title: "On-Site Field Operations Mobile App for Contractors & Technicians",
    client: "RenovCraft Network",
    category: "Mobile Application",
    badge: "5h saved weekly / technician",
    shortDescription: "Single-hand mobile PWA for photo logging, voice-dictated job reports, and instant client sign-offs.",
    problem: "Field workers lost an hour every evening retyping handwritten notes on desktop computers and sorting unorganized phone photos.",
    solution: "Engineered an offline-first mobile app with AI speech-to-text that drafts polished inspection summaries and exports signed PDFs in 1 tap.",
    impact: [
      { metric: "5h", label: "Reclaimed weekly per technician" },
      { metric: "100%", label: "Reports delivered same-day" },
      { metric: "0", label: "Lost job photos or paperwork" },
    ],
    technologies: ["Offline-first Mobile PWA", "AI Voice-to-Text", "Digital Signature"],
    deliverables: [
      "Simplified high-contrast field UI",
      "AI voice note formatter & summary engine",
      "One-tap PDF report generator",
    ],
    testimonial: {
      quote: "The team adopted it on day one. It is fast, intuitive, and completely eliminated overtime paperwork.",
      author: "Julien V.",
      role: "Managing Director",
      company: "RenovCraft",
    },
  },
  {
    id: "lead-qualifier",
    title: "AI Qualification & Instant Lead Booking Assistant for Advisory Firm",
    client: "Capital Strategy B2B",
    category: "AI Integration",
    badge: "30s 24/7 response time",
    shortDescription: "Conversational agent engaging visitors, identifying budget, and scheduling qualified strategy calls.",
    problem: "Inbound contact form leads waited an average of 24 hours for a callback, drastically degrading conversion rates.",
    solution: "Implemented an empathetic AI assistant that converses naturally, asks 3 essential qualification questions, and offers consultant calendar slots immediately.",
    impact: [
      { metric: "30s", label: "Average initial contact delay" },
      { metric: "+35%", label: "Qualified discovery calls booked" },
      { metric: "3x", label: "Weekend lead capture multiplier" },
    ],
    technologies: ["Custom LLM Agent", "Calendar Integration", "Real-time Notifications"],
    deliverables: [
      "AI agent trained on company advisory offerings",
      "Custom budget & fit qualification logic",
      "Executive summary sheet generated for consultants prior to calls",
    ],
    testimonial: {
      quote: "The assistant booked its first high-ticket lead on a Sunday at 11 PM. It paid for itself in two weeks.",
      author: "Émilie R.",
      role: "Head of Growth",
      company: "Capital Strategy",
    },
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
