// ============================================================
// Aufwind AI — Constants & Data
// German B2B SaaS for AI automation for local businesses
// ============================================================

// ------ Site Config ------

export const SITE_CONFIG = {
  brand: "Aufwind AI",
  brandShort: "Aufwind",
  tagline: "KI-Automatisierung für lokale Unternehmen",
  bookingUrl: "https://isale.deals/book/aufwind-demo",
  externalBookingUrl: "https://isale.deals/book/aufwind-demo",
  whatsappNumber: "971523523481",
  whatsappMessage: "Hallo! Ich interessiere mich für Aufwind AI.",
  phone: "+971 52 352 3481",
  email: "kontakt@aufwind.ai",
  domain: "https://aufwind.ai",
  url: "https://aufwind.ai",
  ogImage: "https://aufwind.ai/opengraph-image",
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
    badge: "Beliebteste Wahl",
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
    question: "Was kostet das wirklich — gibt es versteckte Kosten?",
    answer:
      "Pro kostet €697 pro Monat plus einmalig €499 Setup. Das ist alles. Kein Jahresvertrag im ersten Monat. Keine versteckten Onboarding-Gebühren. Monatlich kündbar ab Monat 3. Wenn es sich nach 60 Tagen nicht lohnt, erstatten wir die ersten zwei Monate vollständig zurück.",
  },
  {
    question: "Ist Aufwind AI auch für kleine Betriebe?",
    answer:
      "Unsere kleinsten Kunden haben 2 Mitarbeiter und 80 Patienten pro Monat. Unsere größten haben 8 Filialen. Kein Mindestumsatz, keine Mindestgröße. Wenn Sie täglich mit Terminen, Kunden und Rückrufen kämpfen — sind Sie genau richtig.",
  },
  {
    question: "Was wenn das System nicht funktioniert?",
    answer:
      "Sie müssen nichts konfigurieren, nichts lernen, nichts einrichten. Unser Team übernimmt den kompletten Setup in 5 Werktagen. Nach Tag 5 läuft Ihr KI-Assistent — ohne dass Sie auch nur einmal in ein Dashboard geschaut haben müssen.",
  },
  {
    question: "Ist das DSGVO-konform?",
    answer:
      "Alle Daten Ihrer Kunden werden ausschließlich auf deutschen Servern gespeichert (Frankfurt). Keine Weitergabe an US-Dienste. Kein KI-Training mit Ihren Kundendaten. AVV liegt jedem Vertrag bei. Für Arztpraxen: vollständig konform mit §203 StGB und §22 BDSG.",
  },
  {
    question: "Wie lange dauert der Setup?",
    answer:
      "Tag 1: Demo-Call (45 Min). Sie schicken uns Ihre bestehende Buchungs-URL. Tag 5: Ihr System ist live. Kein IT-Projekt, keine Wochen des Wartens.",
  },
  {
    question: "Wie schnell sehe ich Ergebnisse?",
    answer:
      "Ab Tag 1. Sobald das System live ist, verpassen Sie keinen Anruf und keine Nachricht mehr. In den ersten 2–4 Wochen sehen unsere Kunden im Schnitt 25% mehr Terminbuchungen, 70% weniger No-Shows und die ersten automatisch generierten Google-Bewertungen.",
  },
  {
    question: "Funktioniert das für meine Branche?",
    answer:
      "Unser System funktioniert für alle lokalen Dienstleister: Zahnärzte, Ärzte, Physiotherapeuten, Friseursalons, Beauty-Studios, Handwerksbetriebe, Fitnessstudios, Restaurants, Immobilienbüros und mehr. Wir passen jedes Modul individuell auf Ihr Geschäftsmodell an.",
  },
  {
    question: "Wie unterscheidet ihr euch von einer normalen Marketing-Agentur?",
    answer:
      "Eine Agentur bringt Ihnen Leads — aber wer kümmert sich um die? Wir automatisieren alles NACH dem Lead: Anrufannahme, Terminbuchung, Erinnerungen, Follow-ups, Reviews und Reaktivierung. Und das 24/7, nicht nur von 9-17 Uhr. Für einen Bruchteil der Agenturkosten.",
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
    business: "Beispiel: Zahnarztpraxis",
    industry: "Zahnarztpraxis, Großstadt",
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
    business: "Beispiel: Beauty Studio",
    industry: "Beauty & Kosmetik, Großstadt",
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
    business: "Beispiel: Elektrotechnik-Betrieb",
    industry: "Handwerk, Großstadt",
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

// ------ Industry Templates for Onboarding ------

export interface IndustryTemplate {
  id: string;
  name: string;
  icon: string;
  services: string[];
  defaultHours: { open: string; close: string };
  sampleGreeting: string;
  sampleConversation: { role: "customer" | "ai"; text: string }[];
}

export const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  zahnarzt: {
    id: "zahnarzt",
    name: "Zahnarzt",
    icon: "Stethoscope",
    services: [
      "Professionelle Zahnreinigung",
      "Kontrolluntersuchung",
      "Zahnfüllung",
      "Wurzelbehandlung",
      "Bleaching",
      "Zahnimplantat",
      "Kieferorthopädie",
      "Notfallbehandlung",
    ],
    defaultHours: { open: "08:00", close: "18:00" },
    sampleGreeting: "Willkommen bei unserer Zahnarztpraxis! Wie kann ich Ihnen helfen?",
    sampleConversation: [
      { role: "customer", text: "Hallo, ich hätte gerne einen Termin für eine Zahnreinigung." },
      { role: "ai", text: "Gerne! Ich kann Ihnen folgende Termine anbieten: Morgen um 10:00 Uhr oder Donnerstag um 14:30 Uhr. Was passt Ihnen besser?" },
      { role: "customer", text: "Donnerstag um 14:30 wäre super." },
      { role: "ai", text: "Perfekt! Ich habe Ihren Termin für Donnerstag, 14:30 Uhr für eine professionelle Zahnreinigung eingetragen. Sie erhalten eine Bestätigung per SMS. Bis dann!" },
    ],
  },
  friseur: {
    id: "friseur",
    name: "Friseur",
    icon: "Scissors",
    services: [
      "Herrenschnitt",
      "Damenschnitt",
      "Kinderschnitt",
      "Waschen & Föhnen",
      "Färben / Tönen",
      "Strähnen / Balayage",
      "Hochsteckfrisur",
      "Bartpflege",
    ],
    defaultHours: { open: "09:00", close: "19:00" },
    sampleGreeting: "Herzlich willkommen in unserem Salon! Was dürfen wir für Sie tun?",
    sampleConversation: [
      { role: "customer", text: "Hi, ich würde gerne einen Termin zum Färben machen." },
      { role: "ai", text: "Natürlich! Bei welcher Stylistin möchten Sie den Termin? Wir haben diese Woche noch Freitag um 11:00 oder Samstag um 09:30 frei." },
      { role: "customer", text: "Samstag um 09:30 bitte." },
      { role: "ai", text: "Wunderbar! Ihr Termin für Samstag um 09:30 Uhr zum Färben ist gebucht. Bitte planen Sie ca. 2 Stunden ein. Bis Samstag!" },
    ],
  },
  handwerk: {
    id: "handwerk",
    name: "Handwerk",
    icon: "Wrench",
    services: [
      "Erstberatung / Besichtigung",
      "Kostenvoranschlag",
      "Reparaturarbeiten",
      "Neuinstallation",
      "Wartung & Service",
      "Notdienst",
      "Umbau / Renovierung",
      "Energieberatung",
    ],
    defaultHours: { open: "07:00", close: "17:00" },
    sampleGreeting: "Willkommen! Wir sind Ihr zuverlässiger Handwerksbetrieb. Wie können wir helfen?",
    sampleConversation: [
      { role: "customer", text: "Hallo, unsere Heizung macht komische Geräusche. Können Sie vorbeikommen?" },
      { role: "ai", text: "Das klingt nach einem Fall für unsere Techniker! Ich kann Ihnen einen Besichtigungstermin anbieten: Morgen zwischen 8-12 Uhr oder Mittwoch zwischen 13-17 Uhr. Wann passt es Ihnen?" },
      { role: "customer", text: "Morgen Vormittag wäre perfekt." },
      { role: "ai", text: "Eingetragen! Unser Techniker kommt morgen zwischen 8-12 Uhr zu Ihnen. Sie erhalten vorab eine SMS mit dem genauen Zeitfenster. Ihre Adresse habe ich bereits gespeichert." },
    ],
  },
  beauty: {
    id: "beauty",
    name: "Beauty",
    icon: "Sparkles",
    services: [
      "Gesichtsbehandlung",
      "Maniküre",
      "Pediküre",
      "Waxing",
      "Wimpernverlängerung",
      "Augenbrauen-Styling",
      "Massage",
      "Make-up",
    ],
    defaultHours: { open: "09:00", close: "20:00" },
    sampleGreeting: "Willkommen in unserem Beauty Studio! Gönnen Sie sich etwas Gutes.",
    sampleConversation: [
      { role: "customer", text: "Hallo, ich hätte gerne einen Termin für Wimpernverlängerung." },
      { role: "ai", text: "Sehr gerne! Für die Wimpernverlängerung sollten wir ca. 90 Minuten einplanen. Ich habe noch Mittwoch um 15:00 oder Freitag um 10:00 frei. Was ist besser für Sie?" },
      { role: "customer", text: "Freitag um 10:00 bitte!" },
      { role: "ai", text: "Perfekt, Freitag um 10:00 Uhr ist gebucht! Bitte kommen Sie ungeschminkt und ohne Kontaktlinsen. Sie erhalten eine Terminbestätigung per WhatsApp. Bis Freitag!" },
    ],
  },
  gastro: {
    id: "gastro",
    name: "Gastro",
    icon: "UtensilsCrossed",
    services: [
      "Tischreservierung",
      "Catering-Anfrage",
      "Eventbuchung",
      "Take-Away Bestellung",
      "Gruppenreservierung",
      "Allergieberatung",
      "Geschenkgutschein",
      "Feedback",
    ],
    defaultHours: { open: "11:00", close: "23:00" },
    sampleGreeting: "Herzlich willkommen in unserem Restaurant! Wie dürfen wir Ihnen behilflich sein?",
    sampleConversation: [
      { role: "customer", text: "Ich möchte für Samstag einen Tisch für 6 Personen reservieren." },
      { role: "ai", text: "Sehr gerne! Für Samstag habe ich noch Plätze um 18:00 und um 20:30 Uhr. Haben Sie eine Vorliebe? Und darf ich fragen, ob besondere Anlässe anstehen?" },
      { role: "customer", text: "20:30 bitte, es ist ein Geburtstag!" },
      { role: "ai", text: "Wunderbar, herzlichen Glückwunsch! Tisch für 6 Personen am Samstag um 20:30 Uhr ist reserviert. Wir bereiten gerne eine kleine Überraschung vor. Haben Gäste Allergien oder besondere Wünsche?" },
    ],
  },
  physio: {
    id: "physio",
    name: "Physio",
    icon: "HeartPulse",
    services: [
      "Krankengymnastik",
      "Manuelle Therapie",
      "Lymphdrainage",
      "Sportphysiotherapie",
      "Massage",
      "Elektrotherapie",
      "Erstuntersuchung",
      "Hausbesuch",
    ],
    defaultHours: { open: "07:30", close: "19:00" },
    sampleGreeting: "Willkommen in unserer Physiotherapie-Praxis! Wir helfen Ihnen, schmerzfrei zu werden.",
    sampleConversation: [
      { role: "customer", text: "Hallo, ich brauche einen Termin für Krankengymnastik. Habe eine Verordnung vom Arzt." },
      { role: "ai", text: "Sehr gut! Bringen Sie die Verordnung bitte zum ersten Termin mit. Ich habe morgen um 8:00 oder Donnerstag um 16:30 frei. Was passt besser?" },
      { role: "customer", text: "Donnerstag um 16:30 bitte." },
      { role: "ai", text: "Eingetragen! Donnerstag, 16:30 Uhr — Krankengymnastik. Bitte bringen Sie Ihre Verordnung und bequeme Kleidung mit. Die Sitzung dauert ca. 25 Minuten. Bis dann!" },
    ],
  },
  anwalt: {
    id: "anwalt",
    name: "Anwalt",
    icon: "Scale",
    services: [
      "Erstberatung",
      "Vertragsrecht",
      "Arbeitsrecht",
      "Familienrecht",
      "Mietrecht",
      "Verkehrsrecht",
      "Strafrecht",
      "Erbrecht",
    ],
    defaultHours: { open: "08:30", close: "17:30" },
    sampleGreeting: "Willkommen in unserer Kanzlei. Wie können wir Ihnen rechtlich weiterhelfen?",
    sampleConversation: [
      { role: "customer", text: "Guten Tag, ich brauche eine Beratung zum Thema Mietrecht. Mein Vermieter hat die Miete erhöht." },
      { role: "ai", text: "Ich verstehe. Mieterhöhungen sind ein häufiges Thema. Für eine fundierte Erstberatung würde ich Ihnen einen Termin bei unserem Fachanwalt empfehlen. Nächste Woche Dienstag um 10:00 oder Mittwoch um 14:00?" },
      { role: "customer", text: "Dienstag um 10:00 wäre gut." },
      { role: "ai", text: "Perfekt! Dienstag um 10:00 Uhr — Erstberatung Mietrecht. Bitte bringen Sie Ihren Mietvertrag und das Mieterhöhungsschreiben mit. Die Erstberatung kostet €190 zzgl. MwSt. und dauert ca. 45 Minuten." },
    ],
  },
};
