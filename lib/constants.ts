// ============================================================
// AI Growth System — Constants & Data
// German B2B SaaS for AI automation for local businesses
// ============================================================

// ------ Site Config (Placeholders — replace before launch) ------

export const SITE_CONFIG = {
  bookingUrl: "https://isale.deals/book/ai-growth-demo", // TODO: Booking-Link Slug in iSale.deals anlegen
  whatsappNumber: "491234567890",                   // TODO: Replace with real WhatsApp number
  whatsappMessage: "Hallo! Ich interessiere mich für das AI Growth System.",
  phone: "+49 123 456 7890",                       // TODO: Replace with Telefonnummer
  email: "kostasdias.dubai@gmail.com",
  domain: "https://aigrowthsystem.de",             // TODO: Replace with real domain
  gaMeasurementId: "G-XXXXXXXXXX",                 // TODO: Replace with real GA4 Measurement ID
} as const;

// ------ Pricing Tiers ------

export interface PricingTier {
  name: string;
  subtitle: string;
  price: number;
  setup: number | "GRATIS";
  originalSetup?: number;
  modules: string[];
  highlight?: boolean;
  badge?: string;
}

export const PRICING: PricingTier[] = [
  {
    name: "Pro",
    subtitle: "Alle 8 Module. Null Aufwand.",
    price: 697,
    setup: 499,
    modules: [
      "KI-Chatbot 24/7",
      "KI-Telefonassistent",
      "Smart Terminbuchung",
      "No-Show Killer",
      "Automatisches Follow-up",
      "Reputations-Autopilot",
      "Kundenreaktivierung",
      "Social Media Autopilot",
    ],
  },
  {
    name: "Premium",
    subtitle: "White-Glove Service für maximales Wachstum",
    price: 1297,
    setup: "GRATIS",
    originalSetup: 499,
    modules: [
      "Alle 8 KI-Module inklusive",
      "Dedicated Account Manager",
      "Monatliche Strategie-Calls",
      "Priority Support (< 2h)",
      "Individuelle Anpassungen",
      "Quartalsweise Optimierung",
    ],
    highlight: true,
    badge: "Empfohlen",
  },
];

// ------ Modules (8 — jedes löst ein echtes Alltagsproblem) ------

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  painPoint: string;
}

export const MODULES: Module[] = [
  {
    id: "chatbot",
    title: "KI-Chatbot 24/7",
    description:
      "Beantwortet Kundenanfragen in Sekunden — auf Website, WhatsApp, Instagram und Facebook. Qualifiziert Leads automatisch und bucht direkt Termine.",
    icon: "Bot",
    painPoint: "62% der Anfragen kommen außerhalb der Öffnungszeiten",
  },
  {
    id: "phone",
    title: "KI-Telefonassistent",
    description:
      "Dein virtueller Mitarbeiter am Telefon. Nimmt jeden Anruf an, beantwortet Fragen, bucht Termine — auch um 23 Uhr oder am Wochenende.",
    icon: "Phone",
    painPoint: "Jeder verpasste Anruf = Ø €150 verlorener Umsatz",
  },
  {
    id: "booking",
    title: "Smart Terminbuchung",
    description:
      "Kunden buchen online, per Chat oder am Telefon. Automatische Kalender-Synchronisation, Bestätigungen und intelligente Terminfindung.",
    icon: "CalendarCheck",
    painPoint: "Manuelles Hin-und-Her kostet 5+ Stunden pro Woche",
  },
  {
    id: "followup",
    title: "Automatisches Follow-up",
    description:
      "WhatsApp- und Email-Sequenzen die Interessenten warm halten. Nach 5 Min, 1 Std, 1 Tag — bis der Termin steht. Kein Lead geht mehr verloren.",
    icon: "MessageCircle",
    painPoint: "80% der Leads brauchen 3-5 Kontaktpunkte bis zur Buchung",
  },
  {
    id: "noshow",
    title: "No-Show Killer",
    description:
      "SMS- und WhatsApp-Erinnerungen 24h und 1h vor dem Termin. Bei Absage: Wartelisten-Nachbesetzung in Minuten statt leerem Stuhl.",
    icon: "ShieldCheck",
    painPoint: "No-Shows kosten lokale Unternehmen Ø €800-2.000/Monat",
  },
  {
    id: "reputation",
    title: "Reputations-Autopilot",
    description:
      "Nach jedem Termin geht automatisch eine Review-Anfrage raus. Zufriedene Kunden bewerten auf Google, unzufriedene melden sich direkt bei dir.",
    icon: "Star",
    painPoint: "Nur 5% der zufriedenen Kunden hinterlassen freiwillig eine Bewertung",
  },
  {
    id: "reactivation",
    title: "Kundenreaktivierung",
    description:
      "Automatisch Kunden kontaktieren die seit 3, 6 oder 12 Monaten nicht mehr da waren. Personalisierte Nachrichten mit Angeboten bringen sie zurück.",
    icon: "UserCheck",
    painPoint: "Bestehende Kunden zurückzugewinnen kostet 5x weniger als Neukunden",
  },
  {
    id: "social",
    title: "Social Media Autopilot",
    description:
      "KI generiert Posts für Instagram, Facebook und Google Business. Automatische Updates wie freie Termine, neue Bewertungen oder Aktionen.",
    icon: "Share2",
    painPoint: "Konsistente Social-Media-Präsenz bringt 3x mehr Anfragen",
  },
];

// ------ FAQ ------

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Wie funktioniert der KI-Telefonassistent?",
    answer:
      "Unser KI-Telefonassistent nimmt Anrufe entgegen, wenn du nicht erreichbar bist — oder auf Wunsch immer. Er beantwortet häufige Fragen (Öffnungszeiten, Preise, Leistungen), bucht Termine direkt in deinen Kalender und leitet dringende Anliegen an dich weiter. Er klingt natürlich und professionell — deine Kunden merken keinen Unterschied.",
  },
  {
    question: "Wie lange dauert das Setup?",
    answer:
      "In der Regel ist dein System innerhalb von 5–7 Werktagen vollständig eingerichtet und einsatzbereit. Wir kümmern uns um alles — du musst nur deine Zugangsdaten bereitstellen und uns 30 Minuten für das Onboarding-Gespräch geben.",
  },
  {
    question: "Brauche ich technisches Wissen?",
    answer:
      "Nein, überhaupt nicht. Wir richten alles für dich ein. Du bekommst ein einfaches Dashboard und kannst alles per Smartphone überwachen. Bei Fragen ist unser Support jederzeit erreichbar — per WhatsApp, Email oder Telefon.",
  },
  {
    question: "Ist das DSGVO-konform?",
    answer:
      "Ja, zu 100%. Alle Daten werden auf europäischen Servern verarbeitet. Der KI-Telefonassistent informiert Anrufer über die Aufzeichnung. Wir stellen alle nötigen Datenschutz-Dokumente bereit und helfen bei der Integration in deine bestehende Datenschutzerklärung.",
  },
  {
    question: "Was passiert mit Kunden die sich beschweren?",
    answer:
      "Unser Reputations-System erkennt unzufriedene Kunden und leitet sie direkt an dich weiter — BEVOR sie eine negative Google-Bewertung schreiben. Nur zufriedene Kunden werden zum Bewerten eingeladen. So schützt du deinen Ruf aktiv.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja. Monatlich kündbar, keine Mindestlaufzeit, keine versteckten Kosten. Aber ehrlich: Die meisten Kunden bleiben, weil das System sich ab dem ersten Monat bezahlt macht. Dazu gibt es 30 Tage Geld-zurück-Garantie — null Risiko.",
  },
  {
    question: "Wie schnell sehe ich Ergebnisse?",
    answer:
      "Ab Tag 1. Sobald das System live ist, verpasst du keinen Anruf und keine Nachricht mehr. In den ersten 2–4 Wochen sehen unsere Kunden im Schnitt 25% mehr Terminbuchungen, 70% weniger No-Shows und die ersten automatisch generierten Google-Bewertungen.",
  },
  {
    question: "Funktioniert das für meine Branche?",
    answer:
      "Unser System funktioniert für alle lokalen Dienstleister: Zahnärzte, Ärzte, Physiotherapeuten, Friseursalons, Beauty-Studios, Handwerksbetriebe, Fitnessstudios, Restaurants, Immobilienbüros und mehr. Wir passen jedes Modul individuell auf dein Geschäftsmodell an.",
  },
  {
    question: "Was kostet mich das wirklich?",
    answer:
      "Nur den monatlichen Paketpreis. Keine versteckten Kosten, keine zusätzlichen Lizenzen. Alle Updates und Support sind inklusive. Rechne selbst: Ein verpasster Anruf kostet dich Ø €150. Wenn unser System nur 7 Anrufe pro Monat rettet, hat es sich schon bezahlt.",
  },
  {
    question: "Wie unterscheidet ihr euch von einer normalen Marketing-Agentur?",
    answer:
      "Eine Agentur bringt dir Leads — aber wer kümmert sich um die? Wir automatisieren alles NACH dem Lead: Anrufannahme, Terminbuchung, Erinnerungen, Follow-ups, Reviews und Reaktivierung. Und das 24/7, nicht nur von 9-17 Uhr. Für einen Bruchteil der Agenturkosten.",
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
  quote: string;
  stats: CaseStudyStat[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "zahnarzt-weber",
    business: "Zahnarztpraxis Dr. Weber",
    industry: "Zahnarztpraxis, München",
    quote: "Wir verpassen keinen Anruf mehr. Allein der KI-Telefonassistent hat uns im ersten Monat 12 neue Patienten gebracht die sonst bei der Konkurrenz gelandet wären.",
    stats: [
      { label: "Mehr Terminbuchungen", value: "+34%" },
      { label: "No-Show-Rate gesenkt", value: "von 18% auf 4%" },
      { label: "Neue Google-Bewertungen", value: "47 in 60 Tagen" },
      { label: "Verpasste Anrufe", value: "0" },
    ],
  },
  {
    id: "beauty-glamour",
    business: "Beauty Studio Glamour",
    industry: "Beauty & Kosmetik, Hamburg",
    quote: "Die Kundenreaktivierung allein bringt uns €2.400 Extra-Umsatz pro Monat. Kunden die wir komplett vergessen hatten kommen jetzt regelmäßig wieder.",
    stats: [
      { label: "Reaktivierte Kunden", value: "38 in 90 Tagen" },
      { label: "Extra-Umsatz/Monat", value: "€2.400" },
      { label: "Google-Bewertungen", value: "4.2 → 4.8 Sterne" },
      { label: "Zeitersparnis/Woche", value: "12 Stunden" },
    ],
  },
  {
    id: "handwerk-mueller",
    business: "Müller Elektrotechnik",
    industry: "Handwerk, Stuttgart",
    quote: "Früher haben wir 30% der Anrufe verpasst weil wir auf der Baustelle waren. Jetzt nimmt die KI jeden Anruf an und bucht direkt Besichtigungstermine.",
    stats: [
      { label: "Verpasste Anrufe", value: "von 30% auf 0%" },
      { label: "Neue Aufträge/Monat", value: "+8" },
      { label: "Angebotsannahme", value: "+28%" },
      { label: "Zeitersparnis/Woche", value: "15 Stunden" },
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
  missedCallValue?: number;
}

export const ROI_DATA: Record<string, IndustryRoiData> = {
  zahnarzt: {
    label: "Zahnarztpraxis",
    avgRevenue: 150,
    noShowRate: 0.18,
    noShowCost: 120,
    reactivationRate: 0.2,
    missedCallRate: 0.22,
    missedCallValue: 150,
  },
  beauty: {
    label: "Beauty & Kosmetik",
    avgRevenue: 85,
    repeatRate: 0.65,
    reactivationRate: 0.2,
    avgReactivation: 2400,
    noShowRate: 0.2,
    noShowCost: 65,
    missedCallRate: 0.15,
    missedCallValue: 85,
  },
  immobilien: {
    label: "Immobilien",
    avgDeal: 8000,
    conversionBoost: 0.15,
    followupImprovement: 0.3,
    missedCallRate: 0.25,
    missedCallValue: 500,
  },
  handwerk: {
    label: "Handwerk",
    avgJob: 3500,
    quoteToContract: 0.28,
    missedCallRate: 0.3,
    missedCallValue: 350,
  },
  physio: {
    label: "Physiotherapie / Ärzte",
    avgRevenue: 90,
    noShowRate: 0.2,
    noShowCost: 90,
    reactivationRate: 0.15,
    missedCallRate: 0.2,
    missedCallValue: 90,
  },
  gastro: {
    label: "Restaurant / Gastro",
    avgRevenue: 45,
    noShowRate: 0.15,
    noShowCost: 120,
    reactivationRate: 0.1,
    missedCallRate: 0.2,
    missedCallValue: 120,
  },
};

// ------ Social Proof Stats ------

export interface SocialProofStat {
  label: string;
  value: string;
}

export const SOCIAL_PROOF: SocialProofStat[] = [
  { label: "Verpasste Anrufe gerettet", value: "4.200+" },
  { label: "No-Shows reduziert", value: "78%" },
  { label: "Google Bewertungen generiert", value: "1.250+" },
  { label: "Ø ROI nach 30 Tagen", value: "340%" },
];
