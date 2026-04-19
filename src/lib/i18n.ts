export type Locale = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      agents: "Équipe",
      portfolio: "Portfolio",
      products: "Produits",
      contact: "Contact",
    },
    hero: {
      tagline1: "L'IA qui travaille",
      tagline2: "pour vous 24/7",
      subtitle: "Agence Digital + IA — Lens & Bruxelles",
      cta: "Découvrir",
    },
    about: {
      tag: "Notre Mission",
      title1: "Une agence",
      title2: "autonome",
      description:
        "Pulseia fusionne intelligence artificielle et création web. 400+ agents IA répartis en 9 divisions travaillent 24h/24 pour vos projets. Du site vitine à l'e-commerce, nous livrons en un temps record.",
      stat1value: "400+",
      stat1label: "Agents IA",
      stat2value: "9",
      stat2label: "Divisions",
      stat3value: "24/7",
      stat3label: "Disponibilité",
    },
    services: {
      tag: "Services",
      title1: "Ce que nous",
      title2: "faisons",
      items: [
        { title: "Création Web", desc: "Vitrine, e-commerce, landing page. Design premium, livraison rapide." },
        { title: "SEO Premium", desc: "Référencement naturel avancé. Positionnement garanti sur Google." },
        { title: "Réseaux Sociaux", desc: "Contenu viral, community management, stratégie social media." },
        { title: "Audio-visuel", desc: "Production photo, vidéo, motion design pour votre marque." },
        { title: "Agents IA", desc: "Automatisation, chatbots, sites autonomes. L'IA qui travaille pour vous." },
      ],
    },
    agents: {
      tag: "L'Équipe",
      title1: "Nos agents",
      title2: "IA",
      poles: [
        { name: "Strategy", members: ["Victor Stratos", "Elena Tech", "Marc Identity"] },
        { name: "Design", members: ["Clara Plume", "Iris Pixel", "Sacha Motion", "Thomas Frame"] },
        { name: "Engineering", members: ["Sofia Lex", "Julie Debug"] },
        { name: "Marketing", members: ["Hugo Social", "Léa Conversion", "Maxime Lead", "Damien Data"] },
        { name: "Client", members: ["Emma Care", "Robin Talent", "Oscar Rank", "Noa Automate", "Sarah Flow"] },
      ],
      ceo: "Arthur Sterling — CEO",
    },
    portfolio: {
      tag: "Portfolio",
      title1: "Nos",
      title2: "réalisations",
      items: [
        { name: "Gigi's Pasta", desc: "Restaurant italien — Next.js + GSAP", category: "Restaurant" },
        { name: "Bella Napoli", desc: "Pizzeria italienne — Next.js + Framer Motion", category: "Restaurant" },
        { name: "Café Noir", desc: "Café-restaurant avec CMS Notion", category: "Café" },
        { name: "Cyber Portfolio", desc: "Portfolio dev cyberpunk — Three.js + GSAP", category: "Portfolio" },
        { name: "Lumina Altea", desc: "Portfolio 3D avec smooth scroll — Lenis", category: "Portfolio" },
        { name: "HEAVORA", desc: "Artiste musique électronique", category: "Musique" },
        { name: "Asia Glow", desc: "E-commerce beauté coréenne", category: "E-commerce" },
      ],
    },
    products: {
      tag: "Produits",
      title1: "Nos",
      title2: "produits IA",
      items: [
        { title: "Second Brain", desc: "Gestion des connaissances avec IA locale, wikilinks, graphe et RAG." },
        { title: "CMS IA", desc: "Générateur de sites clients — livrés en 1 heure via Ollama + Claude." },
        { title: "Aurum Circle", desc: "Application de rencontre ultra-luxe pour UHNWI. Entrée 10 000€." },
        { title: "Pixel Agents", desc: "Extension VS Code qui anime les agents IA en pixel art." },
      ],
    },
    cta: {
      tag: "Contact",
      title1: "Travaillons",
      title2: "ensemble",
      description: "Contactez-nous pour un devis gratuit. Réponse rapide, sans engagement.",
      email: "contact@pulseia.agency",
      location: "Lens & Bruxelles, Belgique",
      packs: ["Startup Prestige", "Growth Engine", "Market Leader"],
      formName: "Nom",
      formEmail: "Email",
      formMessage: "Message",
      formSend: "Envoyer",
      formSent: "Message envoyé !",
    },
    audit: {
      button: "Audit IA gratuit",
      title: "Votre audit IA gratuit",
      description: "Découvrez où l'intelligence artificielle peut transformer votre activité. Analyse personnalisée, sans engagement.",
      website: "Site web (optionnel)",
      submit: "Obtenir mon audit",
      sent: "Demande envoyée ! Nous vous contactons sous 24h.",
    },
    footer: {
      tagline: "L'IA qui travaille pour vous 24/7",
      rights: "Tous droits réservés",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      agents: "Team",
      portfolio: "Portfolio",
      products: "Products",
      contact: "Contact",
    },
    hero: {
      tagline1: "AI that works",
      tagline2: "for you 24/7",
      subtitle: "Digital + AI Agency — Lens & Brussels",
      cta: "Discover",
    },
    about: {
      tag: "Our Mission",
      title1: "An autonomous",
      title2: "agency",
      description:
        "Pulseia fuses artificial intelligence and web creation. 400+ AI agents across 9 divisions work 24/7 on your projects. From showcase sites to e-commerce, we deliver in record time.",
      stat1value: "400+",
      stat1label: "AI Agents",
      stat2value: "9",
      stat2label: "Divisions",
      stat3value: "24/7",
      stat3label: "Availability",
    },
    services: {
      tag: "Services",
      title1: "What we",
      title2: "do",
      items: [
        { title: "Web Creation", desc: "Showcase, e-commerce, landing pages. Premium design, fast delivery." },
        { title: "SEO Premium", desc: "Advanced natural referencing. Guaranteed Google positioning." },
        { title: "Social Media", desc: "Viral content, community management, social media strategy." },
        { title: "Audio-visual", desc: "Photo, video, motion design production for your brand." },
        { title: "AI Agents", desc: "Automation, chatbots, autonomous websites. AI that works for you." },
      ],
    },
    agents: {
      tag: "The Team",
      title1: "Our AI",
      title2: "agents",
      poles: [
        { name: "Strategy", members: ["Victor Stratos", "Elena Tech", "Marc Identity"] },
        { name: "Design", members: ["Clara Plume", "Iris Pixel", "Sacha Motion", "Thomas Frame"] },
        { name: "Engineering", members: ["Sofia Lex", "Julie Debug"] },
        { name: "Marketing", members: ["Hugo Social", "Léa Conversion", "Maxime Lead", "Damien Data"] },
        { name: "Client", members: ["Emma Care", "Robin Talent", "Oscar Rank", "Noa Automate", "Sarah Flow"] },
      ],
      ceo: "Arthur Sterling — CEO",
    },
    portfolio: {
      tag: "Portfolio",
      title1: "Our",
      title2: "work",
      items: [
        { name: "Gigi's Pasta", desc: "Italian restaurant — Next.js + GSAP", category: "Restaurant" },
        { name: "Bella Napoli", desc: "Italian pizzeria — Next.js + Framer Motion", category: "Restaurant" },
        { name: "Café Noir", desc: "Café-restaurant with Notion CMS", category: "Café" },
        { name: "Cyber Portfolio", desc: "Cyberpunk dev portfolio — Three.js + GSAP", category: "Portfolio" },
        { name: "Lumina Altea", desc: "3D portfolio with smooth scroll — Lenis", category: "Portfolio" },
        { name: "HEAVORA", desc: "Electronic music artist", category: "Music" },
        { name: "Asia Glow", desc: "Korean beauty e-commerce", category: "E-commerce" },
      ],
    },
    products: {
      tag: "Products",
      title1: "Our AI",
      title2: "products",
      items: [
        { title: "Second Brain", desc: "Knowledge management with local AI, wikilinks, graph and RAG." },
        { title: "CMS IA", desc: "Client site generator — delivered in 1 hour via Ollama + Claude." },
        { title: "Aurum Circle", desc: "Ultra-luxury dating app for UHNWI. Entry €10,000." },
        { title: "Pixel Agents", desc: "VS Code extension animating AI agents in pixel art." },
      ],
    },
    cta: {
      tag: "Contact",
      title1: "Let's work",
      title2: "together",
      description: "Contact us for a free quote. Fast response, no commitment.",
      email: "contact@pulseia.agency",
      location: "Lens & Brussels, Belgium",
      packs: ["Startup Prestige", "Growth Engine", "Market Leader"],
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSend: "Send",
      formSent: "Message sent!",
    },
    audit: {
      button: "Free AI Audit",
      title: "Your free AI audit",
      description: "Discover where artificial intelligence can transform your business. Personalized analysis, no commitment.",
      website: "Website (optional)",
      submit: "Get my audit",
      sent: "Request sent! We'll contact you within 24h.",
    },
    footer: {
      tagline: "AI that works for you 24/7",
      rights: "All rights reserved",
    },
  },
} satisfies Record<Locale, object>;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? DeepStringify<U>[]
      : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof translations.fr>;