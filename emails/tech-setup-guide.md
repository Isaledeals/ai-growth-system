# Tech-Stack Setup Guide
**AI Growth System | Technische Einrichtung | Trinity**

---

## ÜBERBLICK: DER TECH-STACK

```
Kundenanfrage (Website/WhatsApp/Instagram)
         ↓
    Chatbot (Claude API)
         ↓
    Make.com (Automation Hub)
    ├── WhatsApp Business API (360dialog)
    ├── Email (Brevo/Mailgun)
    ├── Kalender (Cal.com)
    └── CRM (HubSpot Free)
         ↓
   Google Reviews Automation
         ↓
   Dashboard (Airtable / n8n)
```

**Monatliche Kosten pro Kunde (Richtwert):**
- Make.com Pro: ~16€/Monat (10.000 Operationen)
- 360dialog WhatsApp: ~5€/Monat + Nachrichten-Gebühren
- Claude API: ~10-20€/Monat je nach Volumen
- Cal.com (Self-Hosted): 0€
- Brevo Email: 0€ (bis 300 Emails/Tag free)
- HubSpot CRM: 0€

**Gesamtkosten pro Kunde: ~35-55€/Monat**
**Marge bei 997€/Monat: ~94%**

---

## MODUL 1: MAKE.COM EINRICHTUNG

### Account Setup
1. Make.com Account erstellen (make.com)
2. Pro Plan aktivieren (16€/Monat, 10.000 Ops)
3. Neue Organisation für jeden Kunden erstellen (oder Ordner-Struktur)
4. API-Keys sicher ablegen (Bitwarden oder ähnliches)

### Basis-Flows (Templates)

**Flow 1: Chatbot-Trigger → Claude → WhatsApp Antwort**
```
Webhook (eingehende Nachricht)
  → Claude API (System Prompt mit Kundendaten)
  → 360dialog API (WhatsApp Antwort senden)
  → HubSpot (Konversation loggen)
```

**Flow 2: Lead-Qualifizierung → Kalender-Buchung**
```
Chatbot erkennt Buchungs-Intent
  → Cal.com API (verfügbare Slots abrufen)
  → Chatbot präsentiert Slots
  → Kunde wählt
  → Cal.com API (Termin buchen)
  → Bestätigung via WhatsApp + Email
```

**Flow 3: Angebot-Nachfassen (Handwerk/Makler)**
```
Trigger: 72h nach Angebot-Versand (manueller oder CRM-Trigger)
  → Personalisierte WhatsApp: "Haben Sie unser Angebot erhalten?"
  → Wenn keine Antwort in 48h: Email-Follow-up
  → Wenn keine Antwort: In 7 Tagen nochmal
  → Nach 3 Versuchen: Als "Kalt" markieren in HubSpot
```

**Flow 4: Google Review Automation**
```
Trigger: Termin in Cal.com als "completed" markiert
  → Warte 24 Stunden
  → WhatsApp senden: "Danke für Ihren Besuch! Kurze Bewertung? [Link]"
  → Wenn keine Reaktion nach 48h: Email senden
  → Tracking: Review-Eingang in Google My Business
```

**Flow 5: Kunden-Reaktivierung**
```
Trigger: Kontakt seit 60/90/180 Tagen nicht aktiv (aus HubSpot)
  → Personalisierte WhatsApp: "Wir vermissen Sie..."
  → Falls Öffnung/Reaktion: In CRM als "Warm" markieren
  → Kein Bot mehr — manuelle Übergabe ans Team
```

---

## MODUL 2: WHATSAPP BUSINESS API (360dialog)

### Account erstellen
1. account.360dialog.com → Registrieren
2. Facebook Business Manager verknüpfen (Meta Business Suite)
3. WhatsApp Business Account erstellen
4. Telefonnummer registrieren

**Wichtig:** Die Nummer kann nicht gleichzeitig auf einem normalen WhatsApp-Konto aktiv sein. Neue SIM-Karte oder VOIP-Nummer empfohlen für das System.

### Meta Business Verifizierung (Pflicht!)
1. business.facebook.com → Einstellungen → Business-Konto bestätigen
2. Ausweis-Dokument hochladen (dauert 1-5 Werktage)
3. Ohne Verifizierung: nur 1.000 Nachrichten/Monat möglich

### Message Templates erstellen
WhatsApp erlaubt nur genehmigte Templates für ausgehende Nachrichten:

**Template: Termin-Erinnerung**
```
Name: termin_erinnerung_24h
Sprache: de
Kategorie: UTILITY
Text: "Hallo {{1}}, wir erinnern Sie an Ihren Termin morgen um {{2}} Uhr bei {{3}}. 
Falls Sie absagen möchten, nutzen Sie bitte diesen Link: {{4}}"
```

**Template: Angebot-Nachfassen**
```
Name: angebot_nachfassen
Sprache: de
Kategorie: UTILITY  
Text: "Hallo {{1}}, wir wollten kurz fragen ob Sie unser Angebot vom {{2}} erhalten haben 
und ob noch Fragen offen sind. Über eine kurze Rückmeldung würde ich mich freuen — {{3}}"
```

**Template: Google Review Anfrage**
```
Name: google_review_anfrage
Sprache: de
Kategorie: MARKETING
Text: "Hallo {{1}}, vielen Dank für Ihr Vertrauen! Falls Sie kurz eine Bewertung 
hinterlassen möchten, würden wir uns sehr freuen: {{2}} 
Herzliche Grüße, {{3}}"
```

**Template: Reaktivierung**
```
Name: reaktivierung_60tage
Sprache: de
Kategorie: MARKETING
Text: "Hallo {{1}}, wir wollten mal kurz schauen wie es Ihnen geht! 
Kann ich etwas für Sie tun? {{2}}"
```

### Kosten-Übersicht WhatsApp API:
- Unter 1.000 Service-Nachrichten/Monat: kostenlos
- Marketing-Nachrichten (Reaktivierung, Reviews): ~0,05-0,12€ pro Gespräch
- Bei 200 Kunden/Monat: ~10-25€

---

## MODUL 3: CHATBOT (CLAUDE API)

### API Setup
```bash
# .env Datei
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-3-5-haiku-20241022  # Haiku für Chatbot (günstiger)
```

### System Prompt Template

```
Du bist [ASSISTENTEN_NAME], der freundliche digitale Assistent von [FIRMENNAME].

ÜBER UNS:
- Branche: [BRANCHE]
- Adresse: [ADRESSE]
- Öffnungszeiten: [ÖFFNUNGSZEITEN]
- Services: [SERVICES_LISTE]
- Preise: [PREISE wenn vorhanden]

DEINE AUFGABE:
- Beantworte Kundenfragen freundlich und hilfreich auf Deutsch
- Qualifiziere Anfragen: Was sucht der Kunde genau?
- Buche Termine wenn der Kunde bereit ist (nutze den Kalender-Link)
- Bei komplexen Fragen oder Beschwerden: direkt an das Team übergeben

REGELN:
- Nenne keine Preise die dir nicht gegeben wurden
- Versprich nichts was das Unternehmen nicht hält
- Bei dringenden Notfällen: [NOTFALL_KONTAKT] nennen
- Antworte IMMER auf Deutsch (außer Kunde schreibt in anderer Sprache)
- Halte Antworten kurz (max. 3-4 Sätze)
- Ende jede erste Nachricht mit einer Frage um das Gespräch am Laufen zu halten

TONALITÄT:
[Professionell und warm / Locker und freundlich / Sachlich und direkt]
— je nach Branche anpassen

TERMIN-BUCHUNG:
Wenn der Kunde einen Termin möchte, sag:
"Super! Schauen Sie sich gerne unsere verfügbaren Termine an: [CAL_LINK]
Wählen Sie einfach einen passenden Slot — ich freue mich auf Sie!"

ÜBERGABE ANS TEAM:
Wenn du nicht weiterhelfen kannst, sage:
"Das beantworte ich am besten persönlich für Sie. Ich gebe Ihre Anfrage direkt 
ans Team weiter — Sie hören innerhalb von [ZEITRAUM] von uns!"
Dann: Webhook triggern für manuelle Benachrichtigung.
```

### Kosten-Optimierung:
- Claude 3.5 Haiku für Chatbot (günstigste Option, sehr schnell)
- Durchschnittliche Kosten: ~0,001-0,003€ pro Konversation
- Bei 1.000 Konversationen/Monat: ~1-3€

---

## MODUL 4: CAL.COM (KALENDER)

### Self-Hosted Setup (Empfohlen für Kostenersparnis)

**Option A: Hetzner Cloud (empfohlen)**
```bash
# Server: CX11 = 4,15€/Monat
# Setup:
docker pull calcom/cal.com
docker run -d \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://termine.KUNDENDOMAIN.de" \
  -p 3000:3000 \
  calcom/cal.com
```

**Option B: Cal.com Cloud (einfacher)**
- Free: 1 Kalender, unlimited Buchungen
- Teams: 12€/Monat/User
- Empfehlung: Für ersten 3-5 Kunden Cloud nehmen, dann self-host

### Event Types konfigurieren:
```
- "Erstgespräch / Demo" — 30 Minuten, kostenlos
- "Beratungstermin" — 45-60 Minuten
- "Rückruf anfordern" — triggert WhatsApp-Benachrichtigung
```

### Webhook für Make.com:
```
Cal.com → Settings → Webhooks
URL: https://hook.make.com/DEIN_WEBHOOK
Events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
```

---

## MODUL 5: CRM (HUBSPOT FREE)

### Setup:
1. hubspot.com → Free Account erstellen
2. Custom Properties anlegen:
   - `ai_lead_source` (Chatbot/Website/Empfehlung)
   - `ai_status` (Neu/Qualifiziert/Termin/Abschluss/Kalt)
   - `last_followup_date`
   - `followup_count`

### Make.com → HubSpot Integration:
- Jeder neue Chatbot-Kontakt → HubSpot Contact erstellen
- Jeder Termin → Deal anlegen in Pipeline
- Jede Follow-up Mail → Aktivität loggen

### Pipeline Setup:
```
Neu → Kontakt aufgenommen
  → Qualifiziert → Interesse bestätigt
  → Demo/Termin → Gespräch gebucht
  → Angebot → Angebot verschickt
  → Abschluss → Kunde
  → Verloren → (mit Grund)
```

---

## MODUL 6: EMAIL (BREVO)

### Setup:
1. brevo.com → Free Account (300 Emails/Tag kostenlos)
2. Sending Domain verifizieren (SPF + DKIM + DMARC)
3. Separate Subdomain für Outreach: `hello@aigrowthsystem.de`

### Domain Warmup (KRITISCH für Zustellbarkeit):
```
Woche 1: 20 Emails/Tag
Woche 2: 50 Emails/Tag
Woche 3: 100 Emails/Tag
Woche 4: 200 Emails/Tag
Woche 5+: Volle Kapazität
```

### Brevo Sequenzen einrichten:
- Automation → "Email Campaign"
- Trigger: Kontakt-Tag gesetzt (z.B. "Segment_Zahnarzt")
- Verzögerungen: Tag 1 → Tag 3 → Tag 7 → Tag 10 → Tag 14

---

## SETUP-CHECKLISTE PRO NEUKUNDE

### Tag 1: Zugänge & Infos sammeln
- [ ] Onboarding-Dokument verschickt und ausgefüllt erhalten
- [ ] Logo, Farben, Firmendaten erhalten
- [ ] WhatsApp-Nummer für API confirmiert
- [ ] Kalender-Präferenz geklärt
- [ ] HubSpot Contact angelegt (intern)

### Tag 2: WhatsApp Setup
- [ ] 360dialog Account für Kunden erstellen
- [ ] Facebook Business Manager verknüpft
- [ ] WhatsApp Nummer registriert
- [ ] 3-4 Message Templates eingereicht (Genehmigung: 24-48h)

### Tag 3: Chatbot konfigurieren
- [ ] System Prompt mit Kundendaten befüllt
- [ ] Test-Konversationen (min. 10 Szenarien)
- [ ] Webhook in Make.com eingerichtet
- [ ] HubSpot Integration getestet

### Tag 4: Kalender + Flows
- [ ] Cal.com Event Types erstellt
- [ ] Buchungs-Confirmation WhatsApp getestet
- [ ] Erinnerungs-Flow (24h + 2h) live
- [ ] No-Show Flow konfiguriert

### Tag 5: Review + Follow-up Flows
- [ ] Google Review Template eingereicht und genehmigt
- [ ] Review-Flow getestet (24h nach Termin)
- [ ] Angebots-Follow-up Flow (falls relevant für Branche)
- [ ] Reaktivierungs-Flow konfiguriert

### Tag 6-7: Test & QA
- [ ] Vollständiger Testdurchlauf aller Flows
- [ ] Kunden-Feedback eingeholt
- [ ] Anpassungen implementiert
- [ ] Dashboard-Zugang an Kunden übergeben
- [ ] Launch-Call durchgeführt

---

## HÄUFIGE PROBLEME & LÖSUNGEN

**Problem: WhatsApp Template abgelehnt**
→ Lösung: Template darf nicht zu "werblich" klingen. Utility-Templates haben höhere Genehmigungsrate als Marketing. Formulierung anpassen, erneut einreichen.

**Problem: Claude antwortet zu lang**
→ Lösung: Im System Prompt explizit: "Antworte in maximal 2-3 kurzen Sätzen. Keine Aufzählungen."

**Problem: Make.com Operationen aufgebraucht**
→ Lösung: Flows optimieren — unnötige Schritte zusammenfassen. Pro 1.000 Nachrichten braucht man ca. 3.000-5.000 Operationen (je nach Flow-Komplexität). Nächste Plan-Stufe: 29€/Monat für 40.000 Ops.

**Problem: Cal.com Termine werden nicht in HubSpot geloggt**
→ Lösung: Webhook-URL in Cal.com prüfen. Make.com Scenario muss aktiv sein. Webhook-Response testen mit Webhook.site.

**Problem: WhatsApp-Nachrichten kommen nicht an**
→ Lösung: 1. Template-Status prüfen (genehmigt?). 2. Nummer-Format (+49 statt 0...). 3. 360dialog Dashboard auf Fehler prüfen.

---

## MONITORING & WARTUNG

### Wöchentlich prüfen:
- Make.com: Fehler in den letzten 7 Tagen?
- 360dialog: Zustellrate der Nachrichten (sollte >95% sein)
- HubSpot: Neue Leads diese Woche?
- Cal.com: Buchungsrate

### Monatlich:
- Claude API Kosten (Budget-Check)
- WhatsApp Template-Performance
- Kunden-Report erstellen (5-Minuten Zusammenfassung)

---

*AI Growth System | Tech-Setup Guide v1.0 | Trinity*
