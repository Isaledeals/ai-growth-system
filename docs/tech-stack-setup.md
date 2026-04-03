# Tech-Stack Setup Guide
**AI Growth System | Vollständige Einrichtungsanleitung | Trinity**

---

## Überblick: Das komplette System

```
Kundenwebsite / Social Media
        ↓
    AI Chatbot (Make.com + Claude API)
        ↓
  Lead-Qualifizierung & Antwort
        ↓
   ┌────────────────────────┐
   │  Terminbuchung:        │
   │  Cal.com → Google Cal  │
   └────────────────────────┘
        ↓
  WhatsApp Follow-up (360dialog)
        ↓
  Google Reviews Anfrage (nach Termin)
        ↓
  Reporting Dashboard (Make.com → Sheets)
```

---

## TOOL 1: Make.com (Zentrale Automatisierung)

### Was Make.com macht:
Make.com ist das "Gehirn" des Systems — es verbindet alle Tools und steuert die Abläufe.

### Account einrichten:
1. Konto auf make.com erstellen (Pro-Plan: 16€/Monat — notwendig für Webhooks)
2. Organisation anlegen: "AI Growth System — [Kundenname]"
3. Separate Szenarien pro Modul anlegen (nicht alles in ein Szenario)

### Szenario 1: Chatbot → Lead erfassen
```
Webhook (eingehende Chatbot-Nachricht)
  → Claude API (Antwort generieren)
  → Antwort zurückschicken
  → Lead in HubSpot/Google Sheets speichern
  → Bei Terminwunsch: Cal.com Link schicken
```

### Szenario 2: Neuer Termin → Follow-up starten
```
Cal.com Webhook (neuer Termin gebucht)
  → 48h warten
  → WhatsApp Erinnerung senden (360dialog)
  → 24h warten
  → WhatsApp Erinnerung senden
  → 3h vor Termin: "Müssen Sie absagen?" senden
```

### Szenario 3: Nach Termin → Review anfragen
```
Cal.com Webhook (Termin abgeschlossen / manuell markiert)
  → 2h warten
  → WhatsApp senden: "Wie war Ihr Besuch? [Google Link]"
  → Falls keine Antwort: 24h warten → Email senden
```

### Szenario 4: Lead-Reaktivierung
```
Google Sheets / HubSpot: Täglich prüfen
  → Wer hat seit 90 Tagen keinen Kontakt?
  → WhatsApp Reaktivierungs-Nachricht senden
  → Response tracken
```

---

## TOOL 2: Claude API (AI-Chatbot-Kern)

### Setup:
1. API Key bei console.anthropic.com erstellen
2. In Make.com unter "API Keys" eintragen
3. Modell: claude-3-5-haiku (günstig + schnell für Chatbot-Antworten)

### System Prompt Template (pro Kunde anpassen):
```
Du bist [Name], der digitale Assistent von [Unternehmensname] in [Stadt].

Du hilfst potenziellen Kunden bei folgenden Fragen:
- [Hauptleistung 1] (Preis: [X])
- [Hauptleistung 2] (Preis: [X])
- [Hauptleistung 3] (Preis: [X])

Öffnungszeiten: [Tage], [Zeiten]
Adresse: [Adresse]
Telefon: [Nummer]

Dein Ziel: Dem Kunden helfen UND — wenn er interessiert scheint — einen Beratungstermin vorschlagen.

Bei Fragen zu Preisen: Immer eine grobe Richtung nennen, aber auf "persönliches Gespräch für genaue Einschätzung" hinweisen.

Bei konkretem Terminwunsch: "Ich schicke Ihnen direkt den Buchungslink" → [Cal.com Link]

Sprache: Deutsch, freundlich, professionell. Keine Roboter-Antworten.
Maximal 3-4 Sätze pro Antwort.
```

### Kosten schätzen:
- claude-3-5-haiku: ~0,001€ pro Chatbot-Konversation
- Bei 500 Konversationen/Monat: ~0,50€ API-Kosten
- Kein Kostenproblem — vernachlässigbar

---

## TOOL 3: 360dialog (WhatsApp Business API)

### Warum 360dialog und nicht direkt Meta:
- Günstigster WhatsApp API Provider (~7€/Monat)
- Einfachste Make.com Integration
- Kein Meta Business Verification nötig für Einstieg

### Account einrichten:
1. Konto auf 360dialog.com erstellen
2. WhatsApp Business Nummer verifizieren (Nummer des Kunden)
3. Make.com Modul: "360dialog" → API Key eintragen
4. Webhook URL aus Make.com eintragen

### Wichtig: WhatsApp Template Messages
WhatsApp erlaubt nur vorab genehmigte Templates für erste Kontaktaufnahme.
Für Follow-ups nach Kundeninitiative: freie Nachrichten möglich.

**Template-Beispiele (vorab einreichen bei 360dialog):**

Template 1 — Termin-Erinnerung:
```
Hallo {{1}}, Ihr Termin bei {{2}} ist morgen um {{3}} Uhr.
Wir freuen uns auf Sie! Falls Sie absagen müssen: {{4}}
```

Template 2 — Review-Anfrage:
```
Hallo {{1}}, vielen Dank für Ihren Besuch bei {{2}}!
Wenn Sie zufrieden waren: {{3}} (dauert 2 Minuten)
```

Template 3 — Reaktivierung:
```
Hallo {{1}}, wir haben Sie schon eine Weile nicht gesehen.
Wann darf ich Sie wieder bei {{2}} begrüßen? {{3}}
```

**Genehmigungsdauer:** 1-3 Werktage bei Meta.

---

## TOOL 4: Cal.com (Terminbuchung)

### Warum Cal.com:
- Open Source, selbst hostbar (kostenlos auf eigenem Server)
- Oder: Cal.com Cloud ab 0€ (Free Tier ausreichend für Start)
- Beste Make.com Integration

### Setup (Cloud-Version — empfohlen für Start):
1. Konto auf cal.com erstellen
2. Kalender-Typ anlegen: "Erstgespräch (20 Minuten)"
3. Verfügbarkeit eintragen (Kundenvorgabe)
4. Google Calendar verknüpfen (OAuth)
5. Make.com Webhook: Neuer Termin → Szenario 2 triggern

### Buchungslink anpassen:
- URL: cal.com/[kundenname]/erstgespraech
- Felder: Name, Email, Telefon, Branche/Problem (optional)
- Bestätigungs-Email: automatisch von Cal.com

### Self-Hosted Option (für Hetzner):
```bash
# Docker Setup
docker pull calcom/cal.com
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e NEXTAUTH_SECRET=... \
  calcom/cal.com
```

---

## TOOL 5: Domain & Email Deliverability

### Separate Sending-Domain (PFLICHT):
Niemals von der Haupt-Domain aus emailen — Spam-Risiko!

**Empfohlene Struktur:**
- Haupt: aigrowthsystem.de
- Sending: mail.aigrowthsystem.de oder outreach-[kundenname].de

### DNS Einträge (bei dem Registrar eintragen):

**SPF Record:**
```
TXT @ "v=spf1 include:_spf.brevo.com ~all"
```
(je nach Email-Provider anpassen)

**DKIM Record:**
Aus dem Email-Provider Dashboard kopieren und als TXT eintragen.

**DMARC Record:**
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@aigrowthsystem.de"
```

### Domain-Warmup mit Instantly.ai:
1. Sending-Domain in Instantly.ai eintragen
2. Warmup einschalten: Instantly schickt automatisch echte Emails zu bekannten Adressen
3. Zeitplan:
   - Woche 1: 20 Mails/Tag
   - Woche 2: 50 Mails/Tag
   - Woche 3: 100 Mails/Tag
   - Woche 4+: Vollbetrieb (max. 200/Tag pro Domain)
4. Health Score täglich checken → über 90% halten

---

## TOOL 6: HubSpot CRM (kostenlos)

### Warum HubSpot Free:
- Kostenlos für bis zu 1 Million Kontakte
- Perfekt für Lead-Tracking
- Make.com Integration nativ vorhanden

### Setup:
1. Free Account auf hubspot.com erstellen
2. Make.com verbinden (OAuth)
3. Pipeline anlegen:
   - Stage 1: Lead eingegangen
   - Stage 2: Chatbot-Kontakt
   - Stage 3: Demo gebucht
   - Stage 4: Angebot versendet
   - Stage 5: Abschluss
   - Stage 6: Onboarding

### Custom Properties anlegen:
- Branche (Dropdown: Zahnarzt / Ästhetik / Makler / Handwerk)
- Erstanfrage-Kanal (Website / WhatsApp / Email / Telefon)
- Letzter Kontakt (Datum)
- System live seit (Datum)

---

## TOOL 7: Brevo (Email-Versand)

### Warum Brevo:
- Kostenloser Plan bis 300 Mails/Tag
- Günstigste bezahlte Pläne in Europa
- DSGVO-konform (Server in EU)
- Gute Deliverability

### Alternativen:
- Instantly.ai (besser für Cold Email, teurer)
- Mailchimp (bekannter, aber teurer und US-basiert)
- SendGrid (gut, aber komplexer)

### Setup:
1. Account auf brevo.com erstellen
2. Sending Domain verifizieren (SPF/DKIM von Brevo eintragen)
3. Kontaktliste importieren (CSV mit Segmenten)
4. Automatisierung anlegen: Email-Sequenz nach Segment

---

## Kostenübersicht pro Kunde

| Tool | Kosten/Monat | Notizen |
|------|-------------|---------|
| Make.com Pro | 16€ | Notwendig für Webhooks |
| 360dialog | 7€ | WhatsApp API |
| Cal.com Cloud | 0€ | Free Tier ausreichend |
| Brevo Starter | 9€ | Bis 5.000 Mails/Monat |
| HubSpot CRM | 0€ | Free dauerhaft |
| Instantly.ai | 37€ | Nur wenn Cold Email |
| Claude API | ~1-5€ | Abhängig von Volumen |
| **Gesamt (Basis)** | **~32€** | Ohne Instantly |
| **Gesamt (Full)** | **~75€** | Mit Instantly |

**Marge:** 
- Starter-Paket 897€ − 32€ Kosten = **865€ Marge (96%)**
- Complete-Paket 1.497€ − 75€ Kosten = **1.422€ Marge (95%)**

---

## Setup-Reihenfolge (Für neuen Kunden)

```
Tag 1: Onboarding-Call → Infos sammeln
Tag 2: HubSpot anlegen + Lead des Kunden eintragen
       Cal.com Kalender einrichten + Google Cal verbinden
       Chatbot-Prompt schreiben (kundenspezifisch)
Tag 3: Make.com Szenarien aufbauen (Szenario 1+2)
       360dialog Account / WhatsApp verifizieren (braucht Zeit)
       WhatsApp Templates einreichen
Day 4: Claude API testen (Chatbot-Antworten prüfen)
       Chatbot-Widget auf Kunden-Website einfügen
       Szenario 3 (Review) bauen
Tag 5: Alles intern testen (5-10 Testkonversationen)
       Fehler korrigieren
Tag 6: Kunden über Testphasen informieren
       Live-Schaltung
Tag 7: 24h Monitoring, erste echte Konversationen auswerten
```

---

## Fehlerbehebung: Häufige Probleme

**Problem: WhatsApp-Nachrichten kommen nicht an**
→ Template noch nicht genehmigt (warten 1-3 Tage)
→ Telefonnummer hat kein WhatsApp (prüfen)
→ 360dialog Webhook URL falsch konfiguriert

**Problem: Chatbot antwortet komisch**
→ System Prompt zu vage (konkreter werden)
→ Falsche Kundeninformationen im Prompt
→ Modell zu langsam (Haiku wählen statt Sonnet)

**Problem: Emails landen im Spam**
→ SPF/DKIM nicht korrekt (DNS Checker nutzen: mxtoolbox.com)
→ Domain-Warmup nicht abgeschlossen
→ Zu viele Mails auf einmal (Limit reduzieren)

**Problem: Cal.com Sync funktioniert nicht**
→ Google Calendar OAuth Token abgelaufen (neu verknüpfen)
→ Make.com Szenario auf "off" (einschalten)

---

## Sicherheit & DSGVO

**Datenspeicherung:**
- Alle Kundendaten in EU-Servern (Brevo, HubSpot EU)
- Make.com Server: EU-Option wählen
- Keine Daten in US-Tools ohne Einwilligung

**WhatsApp / Datenschutz:**
- WhatsApp Business API: DSGVO-konform nutzbar mit korrektem Opt-in
- Beim Chatbot: Kurzer Hinweis "Datenschutzhinweise: [Link]"

**Opt-out:**
- Jede Email: Abmelde-Link (Pflicht nach DSGVO)
- WhatsApp: "STOP" = sofortige Abmeldung (automatisch in 360dialog)

---

*AI Growth System | Tech-Stack Setup Guide | Trinity*
