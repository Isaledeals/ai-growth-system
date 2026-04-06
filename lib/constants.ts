// ============================================================
// AI Growth System — Constants & Data
// German B2B SaaS for AI automation for local businesses
// ============================================================

// ------ Site Config (Placeholders — replace before launch) ------

export const SITE_CONFIG = {
  bookingUrl: "https://calendly.com/isaledeals/sales",
  whatsappNumber: "491234567890",                   // TODO: Replace with real WhatsApp number
  whatsappMessage: "Hallo! Ich interessiere mich für das AI Growth System.",
  phone: "+49 123 456 7890",                       // TODO: Replace with Telefonnummer
  email: "kostasdias.dubai@gmail.com",
  domain: "https://aigrowthsystem.de",             // TODO: Replace with real domain
} as const;

// ------ Pricing Tiers ------

export interface PricingTier {
  name: string;
  price: number;
  setup: number | "GRATIS";
  originalSetup?: number;
  modules: string[];
  highlight?: boolean;
  badge?: string;
}

export const PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: 997,
    setup: 500,
    modules: [
      "AI Chatbot 24/7",
      "Automatisches Follow-up",
      "KI-Terminbuchung",
    ],
  },
  {
    name: "Growth",
    price: 1297,
    setup: "GRATIS",
    originalSetup: 500,
    modules: [
      "AI Chatbot 24/7",
      "Automatisches Follow-up",
      "KI-Terminbuchung",
      "Reputations-Automatisierung",
    ],
    highlight: true,
    badge: "Beliebteste Wahl",
  },
  {
    name: "Complete",
    price: 1797,
    setup: "GRATIS",
    modules: [
      "AI Chatbot 24/7",
      "Automatisches Follow-up",
      "KI-Terminbuchung",
      "Reputations-Automatisierung",
      "Lead Scraping + Outreach",
      "Priority Support",
    ],
    badge: "Alles inklusive",
  },
];

// ------ Modules ------

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const MODULES: Module[] = [
  {
    id: "chatbot",
    title: "AI Chatbot 24/7",
    description:
      "Beantwortet Anfragen in Sekunden, qualifiziert Leads automatisch, 24/7 aktiv auf Website, WhatsApp & Social Media",
    icon: "MessageSquare",
  },
  {
    id: "followup",
    title: "Automatisches Follow-up",
    description:
      "WhatsApp + Email Sequenzen die Leads warm halten und nachfassen — kein Lead geht mehr verloren",
    icon: "MailCheck",
  },
  {
    id: "booking",
    title: "KI-Terminbuchung",
    description:
      "Bucht automatisch Termine in deinen Kalender, sendet Erinnerungen, reduziert No-Shows um 70-80%",
    icon: "CalendarCheck",
  },
  {
    id: "reputation",
    title: "Reputations-Automatisierung",
    description:
      "Sammelt automatisch Google Bewertungen nach jedem Termin — dein Ruf wächst auf Autopilot",
    icon: "Star",
  },
  {
    id: "scraping",
    title: "Lead Scraping + Outreach",
    description:
      "Findet monatlich neue potentielle Kunden in deiner Region und kontaktiert sie automatisch",
    icon: "Search",
  },
];

// ------ FAQ ------

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Wie lange dauert das Setup?",
    answer:
      "In der Regel ist dein System innerhalb von 5–7 Werktagen vollständig eingerichtet und einsatzbereit. Wir kümmern uns um alles — du musst nur deine Zugangsdaten bereitstellen.",
  },
  {
    question: "Brauche ich technisches Wissen?",
    answer:
      "Nein, überhaupt nicht. Wir richten alles für dich ein und du bekommst ein einfaches Dashboard, über das du alles im Blick hast. Bei Fragen ist unser Support jederzeit erreichbar.",
  },
  {
    question: "Ist das DSGVO-konform?",
    answer:
      "Ja, zu 100%. Alle Daten werden auf europäischen Servern verarbeitet und gespeichert. Wir arbeiten mit zertifizierten Partnern und stellen alle nötigen Datenschutz-Dokumente bereit.",
  },
  {
    question: "Was wenn ich kündigen will?",
    answer:
      "Du kannst jederzeit zum Monatsende kündigen — keine Mindestlaufzeit, keine versteckten Kosten. Deine Daten gehören dir und werden auf Wunsch vollständig gelöscht.",
  },
  {
    question: "Wie schnell sehe ich Ergebnisse?",
    answer:
      "Die meisten Kunden sehen bereits in den ersten 2–4 Wochen messbare Ergebnisse: mehr Terminbuchungen, weniger No-Shows und erste automatisch generierte Bewertungen.",
  },
  {
    question: "Funktioniert das für meine Branche?",
    answer:
      "Unser System funktioniert für alle lokalen Dienstleister — von Zahnärzten über Friseursalons bis hin zu Handwerksbetrieben, Immobilienbüros und Fitnessstudios. Wir passen die Automatisierung individuell auf dein Geschäftsmodell an.",
  },
  {
    question: "Was kostet mich das wirklich?",
    answer:
      "Es gibt keine versteckten Kosten. Du zahlst den monatlichen Preis deines gewählten Pakets plus die einmalige Setup-Gebühr. Alle Updates und der Support sind inklusive. Die meisten Kunden verdienen die Investition innerhalb der ersten 4–6 Wochen zurück.",
  },
  {
    question: "Kann ich das erstmal testen?",
    answer:
      "Ja! Wir bieten ein kostenloses Erstgespräch, in dem wir dir live zeigen, wie das System für dein Unternehmen funktionieren würde. Du siehst konkret, welche Ergebnisse realistisch sind — ohne Risiko und ohne Verpflichtung.",
  },
];

// ------ Case Studies ------

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  business: string;
  industry: string;
  stats: CaseStudyStat[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "zahnarzt-weber",
    business: "Zahnarzt Dr. Weber",
    industry: "Zahnarztpraxis",
    stats: [
      { label: "Mehr Terminbuchungen", value: "+34%" },
      { label: "Weniger No-Shows", value: "74%" },
      { label: "Neue Google Bewertungen", value: "47" },
    ],
  },
  {
    id: "beauty-glamour",
    business: "Beauty Studio Glamour",
    industry: "Beauty & Kosmetik",
    stats: [
      { label: "Neue Reviews in 60 Tagen", value: "40+" },
      { label: "Kundenreaktivierung", value: "20%" },
      { label: "Extra-Umsatz pro Monat", value: "€2.400" },
    ],
  },
  {
    id: "handwerk-mueller",
    business: "Handwerksbetrieb Müller",
    industry: "Handwerk",
    stats: [
      { label: "Neukunden pro Monat", value: "8" },
      { label: "Mehr Angebotsannahmen", value: "+28%" },
      { label: "Zeitersparnis pro Woche", value: "15h" },
    ],
  },
];

// ------ ROI Calculator Data ------

export interface IndustryRoiData {
  label: string;
  avgRevenue?: number;
  noShowRate?: number;
  noShowCost?: number;
  reactivationRate?: number;
  repeatRate?: number;
  avgReactivation?: number;
  avgDeal?: number;
  conversionBoost?: number;
  followupImprovement?: number;
  avgJob?: number;
  quoteToContract?: number;
  missedCallRate?: number;
}

export const ROI_DATA: Record<string, IndustryRoiData> = {
  zahnarzt: {
    label: "Zahnarztpraxis",
    avgRevenue: 150,
    noShowRate: 0.15,
    noShowCost: 120,
    reactivationRate: 0.2,
  },
  beauty: {
    label: "Beauty & Kosmetik",
    avgRevenue: 80,
    repeatRate: 0.65,
    reactivationRate: 0.2,
    avgReactivation: 2400,
  },
  immobilien: {
    label: "Immobilien",
    avgDeal: 8000,
    conversionBoost: 0.15,
    followupImprovement: 0.3,
  },
  handwerk: {
    label: "Handwerk",
    avgJob: 3500,
    quoteToContract: 0.28,
    missedCallRate: 0.3,
  },
};

// ------ Social Proof Stats ------

export interface SocialProofStat {
  label: string;
  value: string;
}

export const SOCIAL_PROOF: SocialProofStat[] = [
  { label: "Termine gebucht", value: "2.400+" },
  { label: "No-Shows reduziert", value: "74%" },
  { label: "Google Bewertungen", value: "850+" },
  { label: "Zeitersparnis", value: "15h/Woche" },
];
