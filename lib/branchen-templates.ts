// ============================================================
// Aufwind AI — Branchen-Templates
// Comprehensive industry templates for programmatic SEO pages
// ============================================================

export interface FollowUpStep {
  delay: string;
  channel: string;
  message: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ROIExample {
  metric: string;
  before: string;
  after: string;
}

export interface BranchenTemplate {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  painPoints: string[];
  services: string[];
  systemPromptTemplate: string;
  chatbotGreeting: string;
  reviewRequestTemplate: string;
  followUpSequence: FollowUpStep[];
  reactivationMessage: string;
  socialMediaTopics: string[];
  faq: FAQItem[];
  seoKeywords: string[];
  roiExample: ROIExample[];
}

// ---------------------------------------------------------------------------
// Valid branchen slugs (used in routing to avoid conflicts with /impressum etc)
// ---------------------------------------------------------------------------
export const BRANCHEN_SLUGS = [
  "zahnarzt",
  "friseur",
  "handwerk",
  "beauty",
  "gastro",
  "physio",
  "anwalt",
] as const;

export type BranchenSlug = (typeof BRANCHEN_SLUGS)[number];

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

export const BRANCHEN_TEMPLATES: Record<BranchenSlug, BranchenTemplate> = {
  // ===================== 1. ZAHNARZT =====================
  zahnarzt: {
    id: "zahnarzt",
    name: "Zahnarztpraxis",
    slug: "zahnarzt",
    icon: "Stethoscope",
    description:
      "KI-Automatisierung speziell entwickelt fuer Zahnarztpraxen. Nie wieder verpasste Anrufe, automatische Terminerinnerungen und mehr Google-Bewertungen — alles auf Autopilot.",
    painPoints: [
      "62% der Patientenanrufe kommen ausserhalb der Sprechzeiten",
      "No-Show-Rate von 15-20% kostet bis zu 2.000 EUR pro Monat",
      "Rezeptionistinnen verbringen 60% ihrer Zeit am Telefon statt bei Patienten",
      "Nur 3-5% der zufriedenen Patienten hinterlassen freiwillig eine Google-Bewertung",
      "Patienten die laenger als 6 Monate nicht da waren kommen selten von allein zurueck",
      "Manuelles Terminmanagement kostet 8+ Stunden pro Woche",
    ],
    services: [
      "Professionelle Zahnreinigung (PZR)",
      "Zahnimplantate",
      "Aesthetische Zahnheilkunde / Veneers",
      "Bleaching",
      "Kieferorthopaedische Behandlungen",
      "Wurzelbehandlungen",
      "Parodontose-Behandlung",
      "Kinderzahnheilkunde",
      "Angstpatienten-Behandlung",
      "Zahnersatz / Kronen / Bruecken",
    ],
    systemPromptTemplate:
      "Du bist der freundliche und professionelle KI-Assistent der Zahnarztpraxis {firmenname} in {stadt}. Deine Hauptaufgabe ist es, Patienten kompetent und empathisch zu betreuen — sowohl bestehende als auch neue Patienten. Du beantwortest Fragen zu unseren Leistungen ({leistungen}), Oeffnungszeiten ({oeffnungszeiten}) und Preisen. Du buchst Termine direkt in unseren Kalender und sendest automatische Bestaetigungen per SMS oder WhatsApp. Bei Schmerzpatienten zeigst du besonderes Verstaendnis und versuchst, einen schnellstmoeglichen Notfalltermin zu vermitteln. Bei Angstpatienten kommunizierst du besonders einfuehlsam und weist auf unsere spezielle Angstpatienten-Sprechstunde hin. Du kannst Fragen zu Kosten und Kassenzulaessigkeit beantworten, weist aber darauf hin, dass individuelle Kostenplaene im persoenlichen Gespraech erstellt werden. Verweise bei komplexen medizinischen Fragen immer auf das persoenliche Arzt-Patienten-Gespraech. Du sprichst Deutsch, bist per Du oder per Sie — je nach Praeferenz des Patienten. Dein Ton ist warmherzig, professionell und vertrauenswuerdig. Am Ende jedes Gespraechs fragst du, ob du bei etwas weiterem helfen kannst.",
    chatbotGreeting:
      "Willkommen bei {firmenname}! Ich bin Ihr digitaler Praxis-Assistent. Wie kann ich Ihnen helfen? Moechten Sie einen Termin vereinbaren, haben Sie eine Frage zu unseren Leistungen oder benoetigen Sie einen Notfalltermin?",
    reviewRequestTemplate:
      "Liebe/r {patientenname}, vielen Dank fuer Ihren Besuch bei {firmenname}! Wir hoffen, Sie fuehlen sich rundum gut betreut. Ihre Meinung ist uns wichtig — wuerden Sie uns mit einer kurzen Google-Bewertung unterstuetzen? Das dauert nur 30 Sekunden: {review_link} Vielen Dank! Ihr Praxis-Team",
    followUpSequence: [
      {
        delay: "5 Minuten",
        channel: "WhatsApp",
        message:
          "Vielen Dank fuer Ihre Anfrage bei {firmenname}! Wir haben Ihre Nachricht erhalten und melden uns schnellstmoeglich. Moechten Sie direkt einen Termin buchen? Hier geht's zum Online-Kalender: {booking_link}",
      },
      {
        delay: "1 Stunde",
        channel: "SMS",
        message:
          "Wir haben bemerkt, dass Ihre Terminbuchung bei {firmenname} noch aussteht. Sollen wir Ihnen bei der Terminwahl helfen? Antworten Sie einfach auf diese Nachricht.",
      },
      {
        delay: "24 Stunden",
        channel: "Email",
        message:
          "Hallo {patientenname}, Sie haben sich gestern bei uns gemeldet, aber noch keinen Termin vereinbart. Wir haben diese Woche noch freie Termine. Buchen Sie jetzt direkt online: {booking_link} — Ihr Team von {firmenname}",
      },
      {
        delay: "3 Tage",
        channel: "WhatsApp",
        message:
          "Hallo {patientenname}, nur eine kurze Erinnerung: Regelmaessige Zahnarztbesuche sind der beste Schutz fuer Ihre Zahngesundheit. Wir freuen uns auf Sie! Termin buchen: {booking_link}",
      },
    ],
    reactivationMessage:
      "Hallo {patientenname}, wir haben Sie schon lange nicht mehr gesehen! Ihr letzter Besuch bei {firmenname} war vor {monate} Monaten. Regelmaessige Kontrollen und professionelle Zahnreinigung sind wichtig fuer Ihre Zahngesundheit. Buchen Sie jetzt Ihren naechsten Termin — wir freuen uns auf Sie! {booking_link}",
    socialMediaTopics: [
      "Tipps fuer die taeglich Zahnpflege",
      "Vorher/Nachher Bleaching-Ergebnisse",
      "Warum regelmaessige PZR so wichtig ist",
      "Mythen ueber Zahnimplantate aufklaeren",
      "Neue Bewertung von zufriedenen Patienten teilen",
      "Vorstellung des Praxis-Teams",
      "Freie Termine diese Woche",
      "Tipps gegen Zahnarzt-Angst",
      "Kinderzahnheilkunde — so macht der Zahnarzt Spass",
      "Neue Technologien in unserer Praxis",
    ],
    faq: [
      {
        question: "Wie hilft KI-Automatisierung meiner Zahnarztpraxis?",
        answer:
          "Unser System uebernimmt die telefonische Erreichbarkeit rund um die Uhr, bucht Termine automatisch, reduziert No-Shows durch intelligente Erinnerungen und generiert automatisch Google-Bewertungen von zufriedenen Patienten. Das spart Ihrer Rezeption bis zu 15 Stunden pro Woche.",
      },
      {
        question: "Koennen Patienten direkt ueber den Chatbot Termine buchen?",
        answer:
          "Ja! Der KI-Chatbot ist direkt mit Ihrem Praxiskalender verbunden. Patienten koennen 24/7 ueber Website, WhatsApp oder Telefon Termine buchen — ohne Wartezeiten am Telefon.",
      },
      {
        question: "Wie reduziert das System No-Shows in der Praxis?",
        answer:
          "Durch automatische Erinnerungen per SMS und WhatsApp 48h, 24h und 2h vor dem Termin. Bei Absagen wird der Termin automatisch ueber eine Warteliste nachbesetzt. Unsere Kunden senken ihre No-Show-Rate durchschnittlich von 18% auf unter 5%.",
      },
      {
        question: "Ist das System DSGVO-konform fuer Patientendaten?",
        answer:
          "Absolut. Alle Daten werden auf europaeischen Servern verarbeitet und verschluesselt. Das System erfuellt alle Anforderungen der DSGVO und der aerztlichen Schweigepflicht. Wir stellen alle noetige Datenschutz-Dokumentation bereit.",
      },
      {
        question: "Wie hilft das System bei Google-Bewertungen?",
        answer:
          "Nach jedem Termin erhalten zufriedene Patienten automatisch eine freundliche Bewertungsanfrage per WhatsApp oder SMS. Unzufriedene Patienten werden direkt an Sie weitergeleitet — bevor sie eine negative Bewertung schreiben. So steigern Sie Ihre Sternebewertung systematisch.",
      },
      {
        question: "Wie lange dauert die Einrichtung fuer meine Praxis?",
        answer:
          "Die komplette Einrichtung dauert 5-7 Werktage. Wir konfigurieren alle Module individuell fuer Ihre Praxis — inklusive Telefonassistent, Chatbot, Terminbuchung und Review-System. Sie muessen nur 30 Minuten fuer das Onboarding-Gespraech einplanen.",
      },
    ],
    seoKeywords: [
      "KI Zahnarztpraxis",
      "Zahnarzt Terminbuchung automatisieren",
      "Zahnarzt No-Show reduzieren",
      "Google Bewertungen Zahnarzt",
      "KI Telefonassistent Zahnarzt",
      "Praxismanagement KI",
      "Zahnarzt Chatbot",
      "Patientengewinnung Zahnarzt",
      "Zahnarzt Kundenreaktivierung",
      "Zahnarzt Automatisierung",
    ],
    roiExample: [
      { metric: "Verpasste Anrufe", before: "22%", after: "0%" },
      { metric: "No-Show-Rate", before: "18%", after: "4%" },
      { metric: "Neue Google-Bewertungen / Monat", before: "2-3", after: "15-20" },
      { metric: "Terminbuchungen / Monat", before: "180", after: "240+" },
      { metric: "Reaktivierte Patienten / Quartal", before: "0", after: "35+" },
    ],
  },

  // ===================== 2. FRISEUR =====================
  friseur: {
    id: "friseur",
    name: "Friseursalon",
    slug: "friseur",
    icon: "Scissors",
    description:
      "KI-Automatisierung fuer Friseursalons — automatische Terminbuchung, weniger No-Shows, mehr Stammkunden und eine volle Terminliste dank intelligentem Kundenmanagement.",
    painPoints: [
      "Bis zu 25% No-Show-Rate bei Friseurterminen",
      "Telefon klingelt waehrend der Behandlung — Kunden gehen verloren",
      "Kunden die den Salon wechseln kommen nicht von allein zurueck",
      "Social Media Praesenz ist zeitaufwaendig aber unverzichtbar",
      "Online-Terminbuchung fehlt oder ist umstaendlich",
      "Stammkunden vergessen ihre naechsten Termine",
    ],
    services: [
      "Damenhaarschnitt & Styling",
      "Herrenhaarschnitt & Bartpflege",
      "Faerben / Straehnchen / Balayage",
      "Dauerwelle / Glaettung",
      "Hochzeitsfrisuren & Event-Styling",
      "Haarpflege-Treatments",
      "Extensions / Haarverlaengerung",
      "Kinderhaarschnitte",
      "Kopfhaut-Behandlungen",
      "Brautfrisuren & Beratung",
    ],
    systemPromptTemplate:
      "Du bist der freundliche KI-Assistent des Friseursalons {firmenname} in {stadt}. Du hilfst Kunden bei der Terminbuchung, beraetst zu unseren Dienstleistungen ({leistungen}) und beantwortest Fragen zu Preisen und Verfuegbarkeiten. Du kennst alle Stylisten im Team und kannst Empfehlungen geben, welcher Stylist am besten zum Kundenwunsch passt. Bei Neukunden fragst du nach Haartyp, gewuenschtem Ergebnis und Praeferenzen, um den perfekten Termin zu finden. Du weisst ueber aktuelle Trends Bescheid und kannst zu Farb- und Schnittberatung erste Hinweise geben — weist aber darauf hin, dass die finale Beratung im Salon stattfindet. Bei Termin-Buchungen fragst du immer nach gewuenschtem Stylist, Dienstleistung und bevorzugter Uhrzeit. Du sprichst locker und freundlich auf Deutsch und nutzt das Du. Am Ende jeder Konversation bietest du an, den Termin per WhatsApp oder SMS zu bestaetigen.",
    chatbotGreeting:
      "Hey! Willkommen bei {firmenname}! Ich bin dein digitaler Salon-Assistent. Moechtest du einen Termin buchen, hast eine Frage zu unseren Leistungen oder brauchst eine Beratung? Ich helfe dir gern!",
    reviewRequestTemplate:
      "Hey {kundenname}, danke fuer deinen Besuch bei {firmenname}! Wir hoffen, du liebst dein neues Styling. Wuerdest du uns mit einer kurzen Google-Bewertung supporten? Das hilft uns mega und dauert nur 30 Sekunden: {review_link} Danke dir! Dein {firmenname}-Team",
    followUpSequence: [
      {
        delay: "5 Minuten",
        channel: "WhatsApp",
        message:
          "Hey, danke fuer deine Anfrage bei {firmenname}! Wir haben noch freie Termine diese Woche. Moechtest du direkt online buchen? {booking_link}",
      },
      {
        delay: "2 Stunden",
        channel: "SMS",
        message:
          "Du wolltest einen Termin bei {firmenname}? Unsere beliebtesten Zeiten sind schnell ausgebucht — sichere dir jetzt deinen Wunschtermin: {booking_link}",
      },
      {
        delay: "1 Tag",
        channel: "WhatsApp",
        message:
          "Hi {kundenname}, nur eine kurze Erinnerung: Wir haben noch ein paar Slots diese Woche frei. Buche jetzt, bevor alles weg ist! {booking_link}",
      },
    ],
    reactivationMessage:
      "Hey {kundenname}, lange nicht gesehen! Dein letzter Besuch bei {firmenname} war vor {monate} Monaten. Zeit fuer einen frischen Look? Wir haben diese Woche noch Termine frei. Buche jetzt mit 10% Willkommen-zurueck-Rabatt: {booking_link}",
    socialMediaTopics: [
      "Vorher/Nachher Transformationen",
      "Trend-Frisuren der Saison",
      "Behind the Scenes im Salon",
      "Haar-Pflege-Tipps fuer zu Hause",
      "Team-Vorstellung: Unsere Stylisten",
      "Freie Termine heute und morgen",
      "Neue Google-Bewertungen teilen",
      "Brautfrisuren-Inspiration",
      "Farbtrends: Was ist gerade angesagt?",
      "Salon-Alltag & Fun-Momente",
    ],
    faq: [
      {
        question: "Wie hilft KI meinem Friseursalon konkret?",
        answer:
          "Der KI-Assistent nimmt Anrufe an wenn ihr beschaeftigt seid, bucht Termine automatisch, erinnert Kunden an ihre Termine und holt inaktive Stammkunden zurueck. Das Ergebnis: Volle Terminliste, weniger No-Shows und mehr Bewertungen.",
      },
      {
        question: "Koennen Kunden ihren Lieblings-Stylisten direkt buchen?",
        answer:
          "Ja! Das Buchungssystem kennt alle Teammitglieder, deren Verfuegbarkeiten und Spezialisierungen. Kunden koennen ihren Wunsch-Stylisten direkt waehlen — online, per WhatsApp oder am Telefon.",
      },
      {
        question: "Was passiert wenn ein Kunde seinen Termin nicht absagt?",
        answer:
          "Unser No-Show-Killer sendet automatische Erinnerungen 24h und 2h vor dem Termin. Bei Absage wird der Termin sofort ueber die Warteliste nachbesetzt. So bleibt kein Stuhl leer und Sie verlieren keinen Umsatz.",
      },
      {
        question: "Hilft das System auch bei der Neukundengewinnung?",
        answer:
          "Absolut. Durch bessere Google-Bewertungen, 24/7 Erreichbarkeit und automatische Social-Media-Posts werden Sie online sichtbarer. Neukunden koennen jederzeit Termine buchen — auch nachts oder am Wochenende.",
      },
      {
        question: "Wie funktioniert die Kundenreaktivierung?",
        answer:
          "Das System erkennt automatisch Kunden, die laenger als 6-8 Wochen nicht da waren, und sendet personalisierte Nachrichten mit einem Anreiz zurueckzukommen. Im Schnitt koennen Sie so 20-30 Kunden pro Quartal reaktivieren.",
      },
      {
        question: "Brauche ich technisches Wissen fuer die Einrichtung?",
        answer:
          "Nein, ueberhaupt nicht. Wir richten alles fuer Sie ein und schulen Ihr Team in einem 30-minuetigen Onboarding. Danach laeuft alles automatisch. Bei Fragen ist unser Support jederzeit per WhatsApp erreichbar.",
      },
    ],
    seoKeywords: [
      "KI Friseursalon",
      "Friseur Online-Terminbuchung",
      "Friseur No-Show reduzieren",
      "Google Bewertungen Friseur",
      "Friseur Kundenmanagement",
      "Salon Automatisierung",
      "Friseur Chatbot",
      "Friseursalon Marketing",
      "Friseur Kundenreaktivierung",
      "Friseur Telefonassistent",
    ],
    roiExample: [
      { metric: "No-Show-Rate", before: "25%", after: "5%" },
      { metric: "Verpasste Anrufe", before: "35%", after: "0%" },
      { metric: "Google-Bewertungen / Monat", before: "1-2", after: "10-15" },
      { metric: "Reaktivierte Kunden / Monat", before: "0", after: "12+" },
      { metric: "Online-Buchungen / Monat", before: "10", after: "80+" },
    ],
  },

  // ===================== 3. HANDWERK =====================
  handwerk: {
    id: "handwerk",
    name: "Handwerksbetrieb",
    slug: "handwerk",
    icon: "Wrench",
    description:
      "KI-Automatisierung fuer Handwerksbetriebe — kein verpasster Anruf mehr auf der Baustelle, automatische Angebotsverfolgung und systematische Neukundengewinnung.",
    painPoints: [
      "30-40% der Anrufe werden verpasst weil man auf der Baustelle ist",
      "Angebote werden geschrieben aber nicht nachverfolgt",
      "Kein Ueberblick ueber potenzielle Kunden und deren Status",
      "Mundpropaganda ist gut aber unzuverlaessig fuer stetiges Wachstum",
      "Abends und am Wochenende gehen Auftraege an die Konkurrenz",
      "Keine Zeit fuer Marketing neben dem Tagesgeschaeft",
    ],
    services: [
      "Elektroinstallation & Reparatur",
      "Heizung / Sanitaer / Klima",
      "Malerei & Lackierung",
      "Tischlerei & Schreinerarbeiten",
      "Dachdeckerei",
      "Fliesenleger-Arbeiten",
      "Garten- und Landschaftsbau",
      "Bauunternehmen / Trockenbau",
      "Schluessseldienst & Sicherheitstechnik",
      "Gebaeudereinigung",
    ],
    systemPromptTemplate:
      "Du bist der professionelle KI-Assistent des Handwerksbetriebs {firmenname} in {stadt}. Deine Aufgabe ist es, jeden Anruf und jede Nachricht entgegenzunehmen — auch wenn der Chef und das Team auf der Baustelle sind. Du erfasst den Kundenwunsch detailliert: Was muss gemacht werden? Wo befindet sich das Objekt? Ist es dringend? Du buchst Besichtigungstermine direkt in den Kalender des Betriebs und sammelst alle relevanten Informationen (Adresse, Telefonnummer, Beschreibung des Problems, Fotos wenn moeglich). Bei Notfaellen (Rohrbruch, Stromausfall, etc.) markierst du die Anfrage als dringend und versuchst, schnellstmoeglich einen Termin zu finden. Du beantwortest Fragen zu den angebotenen Leistungen ({leistungen}), zu groben Preisrahmen und Verfuegbarkeiten. Du weist immer darauf hin, dass ein genaues Angebot nach der Besichtigung erstellt wird. Du bist freundlich, zuverlaessig und vermittelst Kompetenz. Du fragst am Ende, ob der Kunde eine Terminbestaetigung per WhatsApp oder SMS wuenscht.",
    chatbotGreeting:
      "Guten Tag! Willkommen bei {firmenname}. Wir sind gerade im Einsatz, aber ich kuemmere mich sofort um Ihr Anliegen. Wie kann ich Ihnen helfen? Brauchen Sie einen Handwerker-Termin, ein Angebot oder haben Sie eine dringende Reparatur?",
    reviewRequestTemplate:
      "Hallo {kundenname}, vielen Dank fuer Ihren Auftrag an {firmenname}! Wir hoffen, Sie sind mit unserer Arbeit zufrieden. Eine kurze Google-Bewertung hilft uns sehr und dauert nur 30 Sekunden: {review_link} Vielen Dank! Ihr {firmenname}-Team",
    followUpSequence: [
      {
        delay: "10 Minuten",
        channel: "WhatsApp",
        message:
          "Vielen Dank fuer Ihre Anfrage bei {firmenname}! Wir haben Ihr Anliegen aufgenommen und melden uns in Kuerze fuer einen Besichtigungstermin. Fuer schnelle Terminvereinbarung: {booking_link}",
      },
      {
        delay: "4 Stunden",
        channel: "SMS",
        message:
          "Ihr Angebot von {firmenname} steht noch aus? Wir haben diese Woche noch Kapazitaeten fuer eine Besichtigung. Antworten Sie kurz oder buchen Sie direkt: {booking_link}",
      },
      {
        delay: "2 Tage",
        channel: "Email",
        message:
          "Hallo {kundenname}, wir haben Ihnen vor 2 Tagen ein Angebot zugesandt. Haben Sie noch Fragen dazu? Wir beraten Sie gern — melden Sie sich einfach oder buchen Sie einen Rueckruf: {booking_link}",
      },
      {
        delay: "5 Tage",
        channel: "WhatsApp",
        message:
          "Hallo {kundenname}, nur eine kurze Rueckmeldung: Ist Ihr Auftrag noch aktuell? Wir haben naechste Woche noch freie Kapazitaeten und koennten zeitnah starten. Lassen Sie es uns wissen!",
      },
    ],
    reactivationMessage:
      "Hallo {kundenname}, Ihr letzter Auftrag bei {firmenname} ist schon {monate} Monate her. Steht bei Ihnen vielleicht wieder etwas an? Ob Reparatur, Renovierung oder Wartung — wir sind fuer Sie da. Buchen Sie jetzt einen kostenlosen Beratungstermin: {booking_link}",
    socialMediaTopics: [
      "Vorher/Nachher von abgeschlossenen Projekten",
      "Tipps: Wann braucht man einen Fachmann?",
      "Hinter den Kulissen: Unser Team bei der Arbeit",
      "Zufriedene Kunden und ihre Bewertungen",
      "Saisonale Wartungstipps (Heizung, Dach, etc.)",
      "Neue Auftraege und aktuelle Verfuegbarkeit",
      "Vorstellung unserer Fachkraefte",
      "Energieeffizienz-Tipps fuer Hausbesitzer",
      "Notfall-Tipps: Was tun bei Rohrbruch?",
      "Trends im Handwerk und neue Technologien",
    ],
    faq: [
      {
        question: "Ich bin den ganzen Tag auf der Baustelle — wie hilft mir das System?",
        answer:
          "Genau dafuer ist es gemacht! Der KI-Telefonassistent nimmt jeden Anruf an, erfasst alle Details und bucht Besichtigungstermine direkt in Ihren Kalender. Sie verpassen keinen Auftrag mehr, auch wenn Sie auf der Baustelle sind.",
      },
      {
        question: "Funktioniert das auch fuer Notfall-Anfragen?",
        answer:
          "Ja! Bei Notfaellen wie Rohrbruch oder Stromausfall erkennt das System die Dringlichkeit und benachrichtigt Sie sofort per Push-Nachricht. Gleichzeitig beruhigt der KI-Assistent den Kunden und versucht, einen schnellstmoeglichen Termin zu finden.",
      },
      {
        question: "Wie hilft das System bei der Angebotsverfolgung?",
        answer:
          "Nach dem Versand eines Angebots sendet das System automatische Follow-up-Nachrichten: Nach 2, 5 und 10 Tagen. So bleiben Sie im Kopf des Kunden, ohne selbst daran denken zu muessen. Die Abschlussquote steigt im Schnitt um 25-30%.",
      },
      {
        question: "Kann das System auch Fotos und Beschreibungen aufnehmen?",
        answer:
          "Ja! Ueber den WhatsApp-Chatbot koennen Kunden Fotos des Problems senden. Diese werden automatisch Ihrer Anfrage zugeordnet, sodass Sie sich schon vor der Besichtigung ein Bild machen koennen.",
      },
      {
        question: "Wie steigere ich mit dem System meine Google-Bewertungen?",
        answer:
          "Nach jedem abgeschlossenen Auftrag erhaelt der Kunde automatisch eine freundliche Bewertungsanfrage. Das System filtert: Zufriedene Kunden werden auf Google geleitet, unzufriedene direkt an Sie — bevor eine negative Bewertung entsteht.",
      },
      {
        question: "Lohnt sich das fuer einen kleinen Betrieb mit 2-5 Mitarbeitern?",
        answer:
          "Gerade fuer kleine Betriebe ist es besonders wertvoll! Jeder verpasste Anruf bedeutet im Handwerk durchschnittlich 350 EUR verlorenen Umsatz. Wenn das System nur 5 Anrufe pro Monat rettet, hat es sich bereits bezahlt gemacht.",
      },
    ],
    seoKeywords: [
      "KI Handwerksbetrieb",
      "Handwerker Telefonassistent",
      "Handwerk Anrufe verpassen",
      "Handwerker Online-Terminbuchung",
      "Google Bewertungen Handwerk",
      "Handwerk Kundenmanagement",
      "Handwerker Automatisierung",
      "Handwerk Lead Management",
      "Handwerker Angebotsverfolgung",
      "Handwerk Neukundengewinnung",
    ],
    roiExample: [
      { metric: "Verpasste Anrufe", before: "35%", after: "0%" },
      { metric: "Angebots-Abschlussquote", before: "28%", after: "42%" },
      { metric: "Neue Auftraege / Monat", before: "15", after: "23+" },
      { metric: "Google-Bewertungen / Monat", before: "0-1", after: "8-12" },
      { metric: "Zeitersparnis / Woche", before: "0h", after: "15h" },
    ],
  },

  // ===================== 4. BEAUTY =====================
  beauty: {
    id: "beauty",
    name: "Beauty & Kosmetik Studio",
    slug: "beauty",
    icon: "Sparkles",
    description:
      "KI-Automatisierung fuer Beauty-Studios und Kosmetiksalons — maximale Auslastung, treue Stammkunden und eine strahlende Online-Reputation auf Autopilot.",
    painPoints: [
      "20-30% No-Show-Rate bei Beauty-Terminen",
      "Kunden buchen bei der Konkurrenz weil niemand ans Telefon geht",
      "Stammkunden vergessen ihre regelmaessigen Behandlungen",
      "Instagram ist zeitintensiv aber entscheidend fuer Neukunden",
      "Keine systematische Nachbetreuung nach Behandlungen",
      "Upselling-Potenzial wird nicht ausgeschoepft",
    ],
    services: [
      "Gesichtsbehandlungen / Facials",
      "Wimpernverlaengerung / Lash Lifting",
      "Augenbrauen-Styling / Microblading",
      "Maniuere & Pediuere / Gel-Naegel",
      "Haarentfernung / Waxing / IPL",
      "Massagen & Wellness",
      "Permanent Make-up",
      "Hautanalyse & Beratung",
      "Anti-Aging Treatments",
      "Braut-Styling & Make-up",
    ],
    systemPromptTemplate:
      "Du bist der charmante und kompetente KI-Assistent des Beauty-Studios {firmenname} in {stadt}. Du beraetst Kundinnen und Kunden freundlich zu allen Behandlungen ({leistungen}), hilfst bei der Terminbuchung und beantwortest Fragen zu Preisen, Dauer und Ablauf der Behandlungen. Du kennst die Unterschiede zwischen verschiedenen Treatments und kannst Empfehlungen geben basierend auf den Wuenschen und Hauttyp der Kundin. Bei Neukunden fragst du nach bisherigen Erfahrungen und besonderen Wuenschen. Du weist auf aktuelle Angebote und Pakete hin, wenn sie zum Kundenwunsch passen. Du erinnerst daran, dass bestimmte Behandlungen Vorlaufzeit benoetigen (z.B. kein Sonnenbad vor IPL). Dein Ton ist warmherzig, wertschaetzend und professionell — du gibst den Kundinnen das Gefuehl, in besten Haenden zu sein. Du duzt die Kundinnen, es sei denn, sie bevorzugen das Sie. Am Ende jeder Konversation fragst du, ob du noch bei etwas helfen kannst und bietest an, den Termin per WhatsApp zu bestaetigen.",
    chatbotGreeting:
      "Hey! Willkommen bei {firmenname}! Ich bin deine digitale Beauty-Beraterin. Moechtest du einen Termin buchen, eine Behandlung anfragen oder brauchst du eine persoenliche Beratung? Ich bin fuer dich da!",
    reviewRequestTemplate:
      "Hey {kundenname}, danke fuer deinen Besuch bei {firmenname}! Wir hoffen, du fuehlst dich wunderschoen. Deine Meinung bedeutet uns sehr viel — wuerdest du uns mit einer kurzen Google-Bewertung unterstuetzen? {review_link} Danke dir! Dein {firmenname}-Team",
    followUpSequence: [
      {
        delay: "5 Minuten",
        channel: "WhatsApp",
        message:
          "Hey, danke fuer deine Anfrage bei {firmenname}! Wir haben noch freie Termine. Moechtest du direkt online buchen? {booking_link}",
      },
      {
        delay: "3 Stunden",
        channel: "SMS",
        message:
          "Dein Termin bei {firmenname} wartet auf dich! Unsere beliebten Zeitfenster sind schnell vergeben — jetzt buchen: {booking_link}",
      },
      {
        delay: "1 Tag",
        channel: "WhatsApp",
        message:
          "Hi {kundenname}, goenne dir etwas Gutes! Wir haben diese Woche noch Termine frei. Schau dir unsere Behandlungen an und buche jetzt: {booking_link}",
      },
    ],
    reactivationMessage:
      "Hey {kundenname}, wir vermissen dich! Dein letzter Besuch bei {firmenname} war vor {monate} Monaten. Zeit, dir wieder etwas Gutes zu tun? Buche jetzt und erhalte 15% Rabatt auf deine naechste Behandlung: {booking_link}",
    socialMediaTopics: [
      "Vorher/Nachher Behandlungsergebnisse",
      "Beauty-Tipps fuer die aktuelle Saison",
      "Neue Behandlungen im Angebot",
      "Kundinnen-Reviews und Testimonials",
      "Behind the Scenes im Studio",
      "Pflege-Tipps fuer zu Hause",
      "Freie Termine diese Woche",
      "Team-Vorstellung und Expertise",
      "Trends: Was ist gerade angesagt?",
      "Braut-Styling Inspirationen",
    ],
    faq: [
      {
        question: "Wie hilft KI-Automatisierung meinem Beauty-Studio?",
        answer:
          "Das System sorgt fuer volle Terminkalaender durch 24/7-Buchungsmoeglichkeit, reduziert No-Shows um bis zu 80% und bringt inaktive Kundinnen automatisch zurueck. Zusaetzlich steigert es Ihre Google-Bewertungen und spart Ihnen bis zu 12 Stunden Verwaltungsarbeit pro Woche.",
      },
      {
        question: "Kann das System auch Produktempfehlungen geben?",
        answer:
          "Ja! Der Chatbot kann basierend auf der gebuchten Behandlung passende Pflegeprodukte empfehlen und Upselling-Moeglichkeiten vorschlagen — zum Beispiel eine Augenpflege zum Facial oder eine Hand-Massage zur Maniuere.",
      },
      {
        question: "Wie funktioniert die Kundenreaktivierung im Beauty-Bereich?",
        answer:
          "Das System erkennt automatisch Kundinnen, deren letzte Behandlung ueberfaellig ist (z.B. Wimpern-Refill nach 3 Wochen, Gesichtsbehandlung nach 4-6 Wochen) und sendet personalisierte Erinnerungen mit einem Buchungslink.",
      },
      {
        question: "Hilft das System auch bei Instagram-Marketing?",
        answer:
          "Der Social Media Autopilot erstellt automatisch Posts fuer Instagram und Facebook — zum Beispiel wenn eine neue Bewertung eingeht, freie Termine verfuegbar sind oder saisonale Angebote laufen. Sie muessen nur noch gelegentlich Vorher/Nachher-Fotos hochladen.",
      },
      {
        question: "Was kostet mich ein No-Show im Beauty-Bereich?",
        answer:
          "Im Durchschnitt kostet ein No-Show ein Beauty-Studio 65-120 EUR pro Ausfall. Bei 5 No-Shows pro Woche sind das bis zu 2.400 EUR Umsatzverlust im Monat. Unser System reduziert diese Rate auf unter 5%.",
      },
      {
        question: "Ist das System auch fuer kleine Studios geeignet?",
        answer:
          "Absolut! Gerade fuer Einzelunternehmerinnen und kleine Teams ist die Automatisierung Gold wert. Waehrend Sie eine Kundin behandeln, kuemmert sich das System um Anrufe, Buchungen und Erinnerungen. Kein Auftrag geht mehr verloren.",
      },
    ],
    seoKeywords: [
      "KI Beauty Studio",
      "Kosmetikstudio Terminbuchung",
      "Beauty Studio No-Show",
      "Google Bewertungen Beauty",
      "Beauty Chatbot",
      "Kosmetik Kundenmanagement",
      "Beauty Studio Automatisierung",
      "Kosmetik Marketing",
      "Beauty Kundenreaktivierung",
      "Beauty Studio Online-Buchung",
    ],
    roiExample: [
      { metric: "No-Show-Rate", before: "25%", after: "4%" },
      { metric: "Reaktivierte Kundinnen / Monat", before: "0", after: "15+" },
      { metric: "Google-Bewertungen", before: "4.2 Sterne", after: "4.8 Sterne" },
      { metric: "Extra-Umsatz / Monat", before: "0 EUR", after: "2.400+ EUR" },
      { metric: "Zeitersparnis / Woche", before: "0h", after: "12h" },
    ],
  },

  // ===================== 5. GASTRO =====================
  gastro: {
    id: "gastro",
    name: "Restaurant / Gastronomie",
    slug: "gastro",
    icon: "UtensilsCrossed",
    description:
      "KI-Automatisierung fuer Restaurants und Gastronomiebetriebe — automatische Reservierungen, weniger No-Shows bei Tischbuchungen und eine starke Online-Praesenz fuer mehr Gaeste.",
    painPoints: [
      "Telefonische Reservierungen waehrend des Service sind kaum machbar",
      "15-20% No-Show-Rate bei Reservierungen kostet bares Geld",
      "Negative Bewertungen durch Wartezeiten oder Missverstaendnisse",
      "Kein Ueberblick ueber Stammgaeste und deren Praeferenzen",
      "Social Media braucht taegliche Aufmerksamkeit",
      "Saisonale Schwankungen ohne aktive Gegensteuerung",
    ],
    services: [
      "Tischreservierung",
      "Catering & Event-Buchung",
      "Mittagstisch / Business Lunch",
      "Abendmenue / A-la-carte",
      "Private Dining / Veranstaltungen",
      "Take-away / Lieferservice",
      "Brunch / Fruehstueck",
      "Weinproben & Verkostungen",
      "Geburtstags- & Feierplanung",
      "Gutschein-Verkauf",
    ],
    systemPromptTemplate:
      "Du bist der zuvorkommende KI-Assistent des Restaurants {firmenname} in {stadt}. Du nimmst Reservierungen entgegen, beantwortest Fragen zur Speisekarte, zu Oeffnungszeiten, Allergenen und besonderen Wuenschen. Bei Reservierungen erfasst du: Anzahl der Gaeste, gewuenschtes Datum und Uhrzeit, besondere Anlaesse (Geburtstag, Geschaeftsessen, etc.), Sitzplatz-Praeferenzen (drinnen, draussen, Separee) und Unvertraeglichkeiten. Du kennst die aktuelle Speisekarte mit Tagesgericht und Empfehlungen. Bei grossen Gruppen (ab 8 Personen) weist du darauf hin, dass ein separates Menue moeglich ist und bietest an, den Kontakt zum Eventplaner herzustellen. Du beantwortest Fragen zu Parkmoglichkeiten, Erreichbarkeit und Barrierefreiheit. Dein Ton ist gastfreundlich, professionell und einladend. Du sprichst Deutsch und bist per Sie, wechselst aber zum Du wenn der Gast es vorzieht. Du vermittelst die Atmosphaere des Restaurants und machst Lust auf einen Besuch.",
    chatbotGreeting:
      "Herzlich willkommen bei {firmenname}! Ich bin Ihr digitaler Gastgeber. Moechten Sie einen Tisch reservieren, haben Sie Fragen zu unserer Speisekarte oder planen Sie ein besonderes Event? Ich helfe Ihnen gern!",
    reviewRequestTemplate:
      "Liebe/r {kundenname}, vielen Dank fuer Ihren Besuch bei {firmenname}! Wir hoffen, es hat Ihnen geschmeckt. Eine kurze Google-Bewertung wuerde uns sehr freuen und hilft anderen Gaesten bei der Entscheidung: {review_link} Herzlichen Dank! Ihr {firmenname}-Team",
    followUpSequence: [
      {
        delay: "5 Minuten",
        channel: "WhatsApp",
        message:
          "Vielen Dank fuer Ihre Reservierungsanfrage bei {firmenname}! Wir pruefen die Verfuegbarkeit und bestaetigen Ihren Tisch in Kuerze. Direkt online reservieren: {booking_link}",
      },
      {
        delay: "2 Stunden",
        channel: "SMS",
        message:
          "Ihre Reservierung bei {firmenname} ist noch nicht abgeschlossen. Sichern Sie sich jetzt Ihren Tisch — unsere beliebten Zeiten sind schnell vergeben! {booking_link}",
      },
      {
        delay: "1 Tag",
        channel: "WhatsApp",
        message:
          "Hallo {kundenname}, Sie wollten bei uns reservieren? Wir haben dieses Wochenende noch schoene Tische frei. Reservieren Sie jetzt: {booking_link}",
      },
    ],
    reactivationMessage:
      "Hallo {kundenname}, wir haben Sie schon lange nicht mehr bei {firmenname} begruessen duerfen! Seit {monate} Monaten vermissen wir Sie. Kommen Sie uns wieder besuchen — wir haben neue Gerichte auf der Karte und eine Ueberraschung fuer Sie. Jetzt reservieren: {booking_link}",
    socialMediaTopics: [
      "Tagesgericht und Empfehlung des Kuechen chefs",
      "Behind the Scenes in der Kueche",
      "Neue Gerichte auf der Speisekarte",
      "Zufriedene Gaeste und ihre Bewertungen",
      "Saisonale Specials und Events",
      "Freie Tische heute Abend",
      "Unser Team stellt sich vor",
      "Food-Fotografie: Unsere besten Gerichte",
      "Wein-Empfehlungen passend zum Menue",
      "Rezept-Tipps fuer zu Hause",
    ],
    faq: [
      {
        question: "Wie hilft KI meinem Restaurant bei Reservierungen?",
        answer:
          "Der KI-Assistent nimmt Reservierungen 24/7 entgegen — per Telefon, WhatsApp und Website. Er kennt Ihre Tischplaene, Kapazitaeten und besonderen Arrangements. Waehrend des Service muessen Sie nie wieder ans Telefon.",
      },
      {
        question: "Was passiert bei No-Shows bei Reservierungen?",
        answer:
          "Unser System sendet automatische Erinnerungen am Vortag und 2 Stunden vor der Reservierung. Bei Absagen wird der Tisch sofort wieder freigegeben und Gaeste von der Warteliste informiert. Die No-Show-Rate sinkt im Schnitt von 20% auf unter 5%.",
      },
      {
        question: "Kann das System auch Catering-Anfragen bearbeiten?",
        answer:
          "Ja! Der Chatbot erfasst alle relevanten Details fuer Catering und Events: Personenzahl, Budget, Allergien, gewuenschtes Menue und Lieferadresse. Die Anfrage wird direkt an Ihr Event-Team weitergeleitet.",
      },
      {
        question: "Hilft das System bei negativen Google-Bewertungen?",
        answer:
          "Unser Reputationssystem erkennt unzufriedene Gaeste und leitet sie direkt an Sie weiter — bevor sie eine negative Bewertung schreiben. Nur zufriedene Gaeste erhalten die Einladung zur Google-Bewertung.",
      },
      {
        question: "Wie werden Stammgaeste behandelt?",
        answer:
          "Das System erkennt Stammgaeste und merkt sich deren Praeferenzen (Lieblingstisch, Lieblingsgerichte, Allergien). So koennen Sie personalisierten Service bieten und Gaeste, die laenger nicht da waren, automatisch zur Rueckkehr einladen.",
      },
      {
        question: "Funktioniert das auch fuer Bars und Cafes?",
        answer:
          "Ja, das System ist flexibel anpassbar auf Restaurants, Bars, Cafes, Bistros und alle anderen Gastronomiebetriebe. Die Module werden individuell auf Ihren Betrieb konfiguriert.",
      },
    ],
    seoKeywords: [
      "KI Restaurant",
      "Restaurant Reservierung automatisieren",
      "Restaurant No-Show reduzieren",
      "Google Bewertungen Restaurant",
      "Restaurant Chatbot",
      "Gastronomie Automatisierung",
      "Restaurant Kundenmanagement",
      "Gastronomie Marketing",
      "Restaurant Telefonassistent",
      "Restaurant Online-Reservierung",
    ],
    roiExample: [
      { metric: "No-Show-Rate", before: "20%", after: "4%" },
      { metric: "Verpasste Reservierungen", before: "8/Woche", after: "0" },
      { metric: "Google-Bewertungen / Monat", before: "3-5", after: "20+" },
      { metric: "Stammgast-Rueckkehrrate", before: "40%", after: "65%" },
      { metric: "Online-Reservierungen", before: "15%", after: "60%" },
    ],
  },

  // ===================== 6. PHYSIO =====================
  physio: {
    id: "physio",
    name: "Physiotherapie / Arztpraxis",
    slug: "physio",
    icon: "HeartPulse",
    description:
      "KI-Automatisierung fuer Physiotherapiepraxen und Arztpraxen — lueckenlose Erreichbarkeit, automatische Terminverwaltung und systematische Patientenbindung.",
    painPoints: [
      "Hohe Ausfallraten bei Serienterminen (Physio-Serien von 6-10 Terminen)",
      "Rezeption ist ueberlastet mit Telefonannahme und Terminverwaltung",
      "Patienten brechen Behandlungsserien vorzeitig ab",
      "Wartelisten werden manuell und ineffizient gefuehrt",
      "Nachsorge und Eigenuebuungen werden nicht verfolgt",
      "Aerztliche Verordnungen laufen aus ohne Folgeverordnung",
    ],
    services: [
      "Krankengymnastik / Physiotherapie",
      "Manuelle Therapie",
      "Lymphdrainage",
      "Sportphysiotherapie",
      "Massage (klassisch, Fango, etc.)",
      "Ruecken-Training / Praevention",
      "Kiefergelenksbehandlung (CMD)",
      "Neurologische Behandlung (Bobath, PNF)",
      "Hausbesuche / Mobile Therapie",
      "Reha-Nachsorge",
    ],
    systemPromptTemplate:
      "Du bist der kompetente und einfuehlsame KI-Assistent der Physiotherapiepraxis {firmenname} in {stadt}. Du kuemmerst dich um Terminbuchungen, Serientermine und Fragen zu unseren Behandlungen ({leistungen}). Bei neuen Patienten fragst du nach der aerztlichen Verordnung (Heilmittelverordnung), dem Beschwerdebild und der gewuenschten Behandlung. Du kennst die Unterschiede zwischen den verschiedenen Therapieformen und kannst eine erste Orientierung geben — weist aber immer darauf hin, dass die therapeutische Befundung in der Praxis stattfindet. Bei Serienterminen (6er/10er Karten) hilfst du bei der Planung der gesamten Serie und achtest darauf, dass Termine regelmaessig gelegt werden. Du erinnerst Patienten an auslaufende Verordnungen und empfiehlst, rechtzeitig eine Folgeverordnung beim Arzt zu holen. Dein Ton ist professionell, freundlich und empathisch. Du nimmst Schmerzen und Beschwerden ernst und vermittelst, dass die Praxis die richtige Anlaufstelle ist. Du bist per Sie mit den Patienten.",
    chatbotGreeting:
      "Guten Tag! Willkommen bei {firmenname}. Ich bin Ihr digitaler Praxis-Assistent und helfe Ihnen gerne bei der Terminbuchung, Fragen zu unseren Therapieangeboten oder organisatorischen Anliegen. Wie kann ich Ihnen helfen?",
    reviewRequestTemplate:
      "Liebe/r {patientenname}, vielen Dank fuer Ihr Vertrauen in {firmenname}! Wir hoffen, Ihre Behandlung zeigt gute Fortschritte. Wuerden Sie Ihre Erfahrung mit anderen teilen? Eine kurze Google-Bewertung hilft anderen Patienten bei der Suche: {review_link} Herzlichen Dank! Ihr Praxis-Team",
    followUpSequence: [
      {
        delay: "5 Minuten",
        channel: "WhatsApp",
        message:
          "Vielen Dank fuer Ihre Anfrage bei {firmenname}! Wir melden uns schnellstmoeglich. Fuer eine direkte Terminbuchung: {booking_link}",
      },
      {
        delay: "3 Stunden",
        channel: "SMS",
        message:
          "Wir haben bemerkt, dass Ihre Terminbuchung bei {firmenname} noch aussteht. Wir haben diese Woche noch freie Kapazitaeten — jetzt buchen: {booking_link}",
      },
      {
        delay: "1 Tag",
        channel: "Email",
        message:
          "Hallo {patientenname}, Sie haben sich gestern bei uns gemeldet. Haben Sie noch Fragen zu unseren Behandlungen oder moechten Sie einen Termin vereinbaren? Wir sind gerne fuer Sie da: {booking_link}",
      },
      {
        delay: "3 Tage",
        channel: "WhatsApp",
        message:
          "Denken Sie daran: Ihre aerztliche Verordnung hat eine begrenzte Gueltigkeit. Buchen Sie jetzt Ihren ersten Therapietermin, damit Sie die Behandlung rechtzeitig beginnen koennen: {booking_link}",
      },
    ],
    reactivationMessage:
      "Hallo {patientenname}, Ihre letzte Behandlung bei {firmenname} ist {monate} Monate her. Wie geht es Ihnen? Falls die Beschwerden zurueckgekehrt sind oder Sie praeventiv etwas tun moechten — wir sind fuer Sie da. Buchen Sie jetzt Ihren naechsten Termin: {booking_link}",
    socialMediaTopics: [
      "Uebungen fuer den Ruecken im Homeoffice",
      "Was hilft bei Nackenverspannungen?",
      "Vorstellung unseres Therapeuten-Teams",
      "Praeventions-Tipps fuer den Alltag",
      "Neue Bewertungen von zufriedenen Patienten",
      "Freie Therapie-Termine diese Woche",
      "Wann ist Physiotherapie sinnvoll?",
      "Sport-Verletzungen richtig behandeln",
      "Ergonomie am Arbeitsplatz",
      "FAQ: Haeufige Fragen zur Physiotherapie",
    ],
    faq: [
      {
        question: "Wie hilft KI meiner Physiotherapiepraxis?",
        answer:
          "Das System uebernimmt die telefonische Erreichbarkeit, bucht Einzel- und Serientermine automatisch, erinnert Patienten an Termine und auslaufende Verordnungen, und holt inaktive Patienten zurueck. So kann sich Ihr Team voll auf die Behandlung konzentrieren.",
      },
      {
        question: "Wie werden Serientermine verwaltet?",
        answer:
          "Das System plant die gesamte Terminserie im Voraus (z.B. 6 oder 10 Termine), achtet auf regelmaessige Intervalle und erinnert den Patienten an jeden einzelnen Termin. Bei Ausfaellen wird automatisch ein Ersatztermin vorgeschlagen.",
      },
      {
        question: "Kann das System an auslaufende Verordnungen erinnern?",
        answer:
          "Ja! Wenn die letzte Behandlung einer Serie naht, erinnert das System den Patienten automatisch, beim Arzt eine Folgeverordnung zu holen — so entsteht keine Behandlungsluecke.",
      },
      {
        question: "Wie reduziert das System Terminausfaelle?",
        answer:
          "Durch automatische Erinnerungen 24h und 2h vor dem Termin per SMS und WhatsApp. Bei Absagen greift die Warteliste automatisch. Das reduziert Ausfaelle im Schnitt von 20% auf unter 5%.",
      },
      {
        question: "Ist das System fuer Kassenpatienten und Privatpatienten geeignet?",
        answer:
          "Ja, das System unterscheidet zwischen Kassen- und Privatpatienten und kann unterschiedliche Informationen bereitstellen, z.B. zu Zuzahlungen, Rezeptgueltigkeiten und Zusatzleistungen.",
      },
      {
        question: "Kann ich das System auch fuer Hausbesuche nutzen?",
        answer:
          "Ja! Das Terminbuchungssystem beruecksichtigt auch Hausbesuche mit Fahrtzeiten und plant diese intelligent in den Tagesablauf Ihrer Therapeuten ein.",
      },
    ],
    seoKeywords: [
      "KI Physiotherapie",
      "Physiotherapie Terminbuchung",
      "Physiotherapie No-Show",
      "Google Bewertungen Physiotherapie",
      "Arztpraxis Telefonassistent",
      "Physiotherapie Automatisierung",
      "Praxis Terminmanagement",
      "Physiotherapie Patientenbindung",
      "Arztpraxis Chatbot",
      "Physiotherapie Kundenreaktivierung",
    ],
    roiExample: [
      { metric: "Terminausfaelle", before: "20%", after: "4%" },
      { metric: "Verpasste Anrufe", before: "25%", after: "0%" },
      { metric: "Serientermin-Abbruchrate", before: "30%", after: "8%" },
      { metric: "Google-Bewertungen / Monat", before: "1-2", after: "10+" },
      { metric: "Patientenreaktivierung / Quartal", before: "0", after: "25+" },
    ],
  },

  // ===================== 7. ANWALT =====================
  anwalt: {
    id: "anwalt",
    name: "Rechtsanwaltskanzlei",
    slug: "anwalt",
    icon: "Scale",
    description:
      "KI-Automatisierung fuer Rechtsanwaltskanzleien — nie wieder verpasste Mandantenanfragen, automatische Erstberatungstermine und professionelle Online-Reputation.",
    painPoints: [
      "Potenzielle Mandanten rufen an und erreichen niemanden",
      "Erstberatungsgespraeche werden schlecht nachverfolgt",
      "Mandantenakquise ueber Google wird vernachlaessigt",
      "Kanzleiassistenz verbringt zu viel Zeit mit Telefonaten",
      "Keine systematische Follow-up-Strategie nach Erstgespraechen",
      "Online-Bewertungen werden nicht aktiv gemanagt",
    ],
    services: [
      "Arbeitsrecht",
      "Familienrecht / Scheidung",
      "Mietrecht / Immobilienrecht",
      "Verkehrsrecht",
      "Strafrecht",
      "Erbrecht / Nachlassplanung",
      "Gesellschaftsrecht / Handelsrecht",
      "Vertragsrecht",
      "Medizinrecht / Arzthaftung",
      "IT-Recht / Datenschutzrecht",
    ],
    systemPromptTemplate:
      "Du bist der professionelle und diskrete KI-Assistent der Rechtsanwaltskanzlei {firmenname} in {stadt}. Deine Aufgabe ist es, Anfragen von potenziellen und bestehenden Mandanten entgegenzunehmen und qualifiziert zu erfassen. Du stellst die relevanten Fragen: Um welches Rechtsgebiet geht es? Was ist der Sachverhalt in Kurzform? Gibt es Fristen (z.B. Kuendigungsfristen, Verjährung)? Ist es dringend? Du buchst Erstberatungstermine direkt in den Kanzleikalender und weist darauf hin, welche Unterlagen der Mandant mitbringen sollte. Du gibst KEINE rechtliche Beratung — du weist immer darauf hin, dass eine qualifizierte Rechtsberatung nur im persoenlichen Gespraech mit dem Anwalt erfolgen kann. Bei dringenden Angelegenheiten (z.B. Verhaftung, einstweilige Verfuegung, Fristablauf) markierst du die Anfrage als dringend und versuchst, schnellstmoeglich einen Termin zu vermitteln. Dein Ton ist professionell, vertrauenswuerdig und empathisch — viele Mandanten wenden sich in schwierigen Lebenssituationen an eine Kanzlei. Du bist per Sie und verwendest eine formelle, juristisch korrekte Sprache ohne zu viel Fachjargon.",
    chatbotGreeting:
      "Guten Tag! Willkommen bei {firmenname}. Ich bin der digitale Kanzlei-Assistent und helfe Ihnen gerne weiter. Moechten Sie einen Beratungstermin vereinbaren oder haben Sie eine Frage zu unserem Leistungsspektrum? Ich bin fuer Sie da.",
    reviewRequestTemplate:
      "Sehr geehrte/r {mandantenname}, vielen Dank fuer Ihr Vertrauen in die Kanzlei {firmenname}. Wir hoffen, wir konnten Ihnen weiterhelfen. Wenn Sie mit unserer Arbeit zufrieden waren, wuerden wir uns ueber eine kurze Google-Bewertung sehr freuen: {review_link} Herzlichen Dank! Ihr Kanzlei-Team",
    followUpSequence: [
      {
        delay: "10 Minuten",
        channel: "Email",
        message:
          "Sehr geehrte/r {mandantenname}, vielen Dank fuer Ihre Anfrage bei {firmenname}. Wir haben Ihr Anliegen aufgenommen und melden uns kurzfristig. Fuer eine direkte Terminvereinbarung: {booking_link}",
      },
      {
        delay: "4 Stunden",
        channel: "SMS",
        message:
          "Ihre Anfrage bei {firmenname} ist eingegangen. Moechten Sie direkt einen Erstberatungstermin vereinbaren? Jetzt buchen: {booking_link}",
      },
      {
        delay: "2 Tage",
        channel: "Email",
        message:
          "Sehr geehrte/r {mandantenname}, wir moechten sicherstellen, dass Ihr Anliegen nicht unbearbeitet bleibt. Gerne vereinbaren wir einen Beratungstermin mit Ihnen. Beachten Sie bitte, dass bei bestimmten Rechtsfragen Fristen laufen koennen. Termin buchen: {booking_link}",
      },
    ],
    reactivationMessage:
      "Sehr geehrte/r {mandantenname}, wir hoffen, es geht Ihnen gut. Ihr letzter Kontakt mit {firmenname} liegt {monate} Monate zurueck. Sollten Sie erneut rechtliche Unterstuetzung benoetigen, stehen wir Ihnen jederzeit zur Verfuegung. Vereinbaren Sie gerne einen Termin: {booking_link}",
    socialMediaTopics: [
      "Rechtstipp der Woche (allgemein gehalten)",
      "Aenderungen in der Gesetzgebung erklaert",
      "Wann sollte man zum Anwalt? Checkliste",
      "Das Kanzlei-Team stellt sich vor",
      "Mandanten-Bewertungen und Erfolgsgeschichten",
      "FAQ: Haeufige Rechtsfragen einfach erklaert",
      "Neues aus der Kanzlei",
      "Wichtige Fristen und Stichtage",
      "Kosten einer Rechtsberatung transparent erklaert",
      "Vorsorge: Vollmacht, Testament, Patientenverfuegung",
    ],
    faq: [
      {
        question: "Wie hilft KI meiner Kanzlei bei der Mandantenakquise?",
        answer:
          "Der KI-Telefonassistent nimmt jeden Anruf an, qualifiziert die Anfrage und bucht direkt Erstberatungstermine. Kein potenzieller Mandant geht mehr verloren — auch ausserhalb der Buerozeiten. Das Follow-up-System verfolgt offene Anfragen automatisch nach.",
      },
      {
        question: "Gibt der KI-Assistent rechtliche Beratung?",
        answer:
          "Nein, niemals. Der Assistent qualifiziert Anfragen, erfasst den Sachverhalt und bucht Termine — aber rechtliche Beratung erfolgt ausschliesslich im persoenlichen Gespraech mit dem Anwalt. Dies wird auch klar kommuniziert.",
      },
      {
        question: "Wie wird die anwaltliche Verschwiegenheit gewaehrleistet?",
        answer:
          "Alle Daten werden auf europaeischen Servern verschluesselt verarbeitet. Das System erfuellt alle Anforderungen der DSGVO und der berufsrechtlichen Verschwiegenheitspflicht. Es werden nur die fuer die Terminvereinbarung notwendigen Daten erfasst.",
      },
      {
        question: "Kann das System dringende Faelle erkennen?",
        answer:
          "Ja. Wenn der Mandant Dringlichkeit signalisiert (Fristablauf, Kuendigung, Verhaftung), markiert das System die Anfrage als dringend und benachrichtigt den zustaendigen Anwalt sofort per Push-Nachricht.",
      },
      {
        question: "Wie hilft das System bei Google-Bewertungen fuer Kanzleien?",
        answer:
          "Nach erfolgreicher Mandatsbearbeitung erhaelt der Mandant eine diskrete Bewertungsanfrage. Das System erkennt unzufriedene Mandanten und leitet diese zunaechst an Sie weiter. So bauen Sie systematisch Ihre Online-Reputation auf.",
      },
      {
        question: "Ist das System auch fuer spezialisierte Kanzleien geeignet?",
        answer:
          "Absolut. Der KI-Assistent wird individuell auf Ihre Rechtsgebiete und Kanzlei-Schwerpunkte konfiguriert. Ob Familienrecht, Strafrecht oder IT-Recht — das System kennt die relevanten Fragen und Prozesse.",
      },
    ],
    seoKeywords: [
      "KI Kanzlei",
      "Rechtsanwalt Telefonassistent",
      "Kanzlei Mandantenakquise",
      "Google Bewertungen Anwalt",
      "Kanzlei Automatisierung",
      "Anwalt Online-Terminbuchung",
      "Kanzlei Chatbot",
      "Rechtsanwalt Lead Management",
      "Kanzlei Digitalisierung",
      "Anwalt Kundenmanagement",
    ],
    roiExample: [
      { metric: "Verpasste Anfragen", before: "30%", after: "0%" },
      { metric: "Erstberatungstermine / Monat", before: "12", after: "22+" },
      { metric: "Mandatsuebernahme-Quote", before: "45%", after: "62%" },
      { metric: "Google-Bewertungen / Monat", before: "0-1", after: "6-10" },
      { metric: "Follow-up-Rate", before: "20%", after: "100%" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helper: Get template by slug
// ---------------------------------------------------------------------------
export function getBranchenTemplate(slug: string): BranchenTemplate | undefined {
  return BRANCHEN_TEMPLATES[slug as BranchenSlug];
}

// ---------------------------------------------------------------------------
// Helper: Get all templates as array
// ---------------------------------------------------------------------------
export function getAllBranchenTemplates(): BranchenTemplate[] {
  return BRANCHEN_SLUGS.map((slug) => BRANCHEN_TEMPLATES[slug]);
}
