# AI Growth System — Tech Setup Guide
**Vollständige Schritt-für-Schritt Anleitung für jeden neuen Kunden**
**Version 1.0 | Trinity**

---

## ÜBERSICHT: WAS WIRD GEBAUT

Für jeden Kunden richten wir folgende Systeme ein:

1. **WhatsApp Business API** (via 360dialog) — AI-Chatbot Kanal
2. **Make.com Automations** — Das Gehirn: verbindet alles miteinander
3. **Cal.com** — Terminbuchung, selbst gehostet auf Hetzner
4. **Claude API Chatbot** — AI-Antworten für WhatsApp
5. **Google Reviews Automation** — Reputation Management
6. **HubSpot Free CRM** — Lead-Tracking und Übersicht

**Gesamte Setup-Zeit pro Kunde: ca. 4-6 Stunden intern**

---

## MODUL 1: WHATSAPP BUSINESS API (360dialog)

### Voraussetzungen
- Meta Business Manager Account (neu erstellen oder vorhanden nutzen)
- Facebook-Unternehmensseite (obligatorisch)
- Telefonnummer die noch NICHT in regulärer WhatsApp App registriert ist
- Unternehmens-Website (URL wird von Meta überprüft)

### Schritt-für-Schritt

**1.1 Meta Business Manager vorbereiten**
```
1. business.facebook.com aufrufen
2. Neues Business erstellen (falls nicht vorhanden)
3. Unternehmensname, Email, Website eingeben
4. Unternehmens-Verifikation starten (dauert 1-3 Werktage)
   → Einstellungen → Sicherheitscenter → Unternehmens-Verifizierung
```

**1.2 360dialog Account anlegen**
```
1. app.360dialog.com aufrufen
2. "Create Account" → mit Meta Business Manager verknüpfen
3. WhatsApp Business Konto hinzufügen
4. Telefonnummer eingeben und per SMS/Anruf verifizieren
5. API Key wird generiert → SICHER AUFBEWAHREN
```

**1.3 WhatsApp Profil einrichten**
```
1. In 360dialog Dashboard: "Profile Settings"
2. Firmenname, Adresse, Beschreibung eintragen
3. Profilbild hochladen (min. 640x640px)
4. Kategorie wählen (passend zur Branche)
5. Webseite und Email hinterlegen
```

**1.4 Webhook konfigurieren**
```
Webhook URL: https://hook.eu1.make.com/[WEBHOOK-ID]
(Diese URL kommt aus Make.com — erst in Schritt 2 verfügbar)

In 360dialog:
1. Developer Settings → Webhook
2. URL eintragen
3. "Verify & Save"
```

**Wichtige Hinweise:**
- Meta-Verifizierung des Business Accounts kann 1-3 Tage dauern → Früh starten!
- Displayname des WhatsApp Profils muss dem Unternehmensnamen ähneln — sonst Ablehnung
- Messaging-Limit startet bei 250 Gespräche/Tag, steigt automatisch mit positiver Nutzung

---

## MODUL 2: MAKE.COM AUTOMATIONS

### Voraussetzungen
- Make.com Account (Pro oder Business Plan für mehrere Kunden empfohlen)
- 360dialog API Key (aus Modul 1)
- Cal.com API Key (aus Modul 3)
- Claude API Key (aus Anthropic Console)

### Übersicht der Workflows (Scenarios)

Für jeden Kunden werden folgende Make.com Scenarios geklont und angepasst:

**Scenario 1: WhatsApp Eingehend → AI Antwort**
**Scenario 2: Termin gebucht → WhatsApp Bestätigung**
**Scenario 3: Termin Erinnerungen (24h + 2h)**
**Scenario 4: After-Appointment → Google Review Request**
**Scenario 5: Kunden-Reaktivierung (monatlich)**
**Scenario 6: Neues Lead → HubSpot CRM Entry**

---

### SCENARIO 1: WhatsApp Eingehend → AI Antwort

**Trigger:** 360dialog Webhook (eingehende WhatsApp Nachricht)

**Flow:**
```
[360dialog Webhook]
    ↓
[Router: Ist es eine neue Anfrage oder laufendes Gespräch?]
    ↓ NEU
[HTTP: Claude API aufrufen]
    → System Prompt: [Kunden-spezifisch - siehe unten]
    → User Message: Eingehende WhatsApp Nachricht
    → Max Tokens: 300
    ↓
[360dialog: Antwort senden]
    ↓
[HubSpot: Kontakt anlegen / aktualisieren]
    ↓
[HubSpot: Notiz mit Gesprächs-Log speichern]
```

**Claude System Prompt Template (anpassen pro Kunde):**
```
Du bist der digitale Assistent von [FIRMENNAME] in [STADT].

Über das Unternehmen:
- Spezialisierung: [LEISTUNGEN]
- Öffnungszeiten: [ÖFFNUNGSZEITEN]
- Adresse: [ADRESSE]

Deine Aufgabe:
1. Beantworte Kundenfragen kurz und freundlich (max 3 Sätze)
2. Bei Terminwunsch: Schicke direkt den Buchungslink: [CAL.COM LINK]
3. Bei komplexen Fragen: Biete Rückruf an
4. Preise NICHT nennen außer: [FALLS VORGEGEBEN]
5. Immer auf Deutsch antworten
6. Ton: freundlich, professionell, nicht zu förmlich

Häufige Fragen und Antworten:
[KUNDENDATEN AUS INTAKE EINFÜGEN]

Falls du eine Frage nicht beantworten kannst:
"Dafür melde ich kurz unser Team — die kommen gleich auf Sie zu."
```

**Make.com Setup:**
```
1. Neues Scenario erstellen
2. Webhook Modul: "Custom Webhook" → URL kopieren
3. URL in 360dialog eintragen (Modul 1, Schritt 1.4)
4. HTTP Modul: POST zu https://api.anthropic.com/v1/messages
   Headers:
   - x-api-key: [CLAUDE API KEY]
   - anthropic-version: 2023-06-01
   - content-type: application/json
   Body (JSON):
   {
     "model": "claude-3-5-haiku-20241022",
     "max_tokens": 300,
     "messages": [
       {"role": "user", "content": "{{WhatsApp Nachrichtentext}}"}
     ],
     "system": "[SYSTEM PROMPT]"
   }
5. 360dialog Modul: Send Message
   → To: {{Absender-Nummer}}
   → Message: {{Claude API Response.content[0].text}}
6. Scenario aktivieren
```

**Kosten-Hinweis:** claude-3-5-haiku für Chatbot-Antworten — günstigste Option, für einfache Kundenanfragen vollkommen ausreichend.

---

### SCENARIO 2: Termin gebucht → WhatsApp Bestätigung

**Trigger:** Cal.com Webhook (neuer Termin gebucht)

**Flow:**
```
[Cal.com Webhook: booking.created]
    ↓
[Formatter: Datum und Uhrzeit formatieren (Deutsch)]
    ↓
[360dialog: Bestätigungs-WhatsApp senden]
    Nachricht: "Hallo [Name], Ihr Termin bei [Firma] am [Datum] um [Uhrzeit] 
    ist bestätigt! Bei Fragen einfach hier antworten. Bis bald!"
    ↓
[HubSpot: Deal/Kontakt aktualisieren → Status: "Termin gebucht"]
```

**Wichtig:** Cal.com gibt Telefonnummer nur weiter wenn sie im Buchungsformular als Pflichtfeld gesetzt ist. Sicherstellen!

---

### SCENARIO 3: Termin-Erinnerungen (24h + 2h)

**Trigger:** Scheduled (läuft täglich 2x)

**Flow:**
```
[Schedule: Täglich 10:00 Uhr]
    ↓
[Cal.com API: Termine für morgen abrufen]
    ↓
[Iterator: Für jeden Termin]
    ↓
[Filter: Hat der Kontakt WhatsApp Nummer?]
    ↓ JA
[360dialog: 24h-Erinnerung senden]
    Nachricht: "Hallo [Name]! Kurze Erinnerung: Ihr Termin bei [Firma] 
    ist morgen, [Datum] um [Uhrzeit]. Alles gut? Falls Sie absagen müssen: 
    [Umbuchungs-Link]"

[Schedule: Täglich 08:00 Uhr → gleicher Flow für 2h-Erinnerung]
    Nachricht: "Guten Morgen [Name], Ihr Termin in 2 Stunden 
    ([Uhrzeit]) wartet auf Sie! Wir freuen uns auf Sie."
```

---

### SCENARIO 4: After-Appointment → Google Review Request

**Trigger:** Cal.com Webhook (booking.completed) ODER Schedule 2h nach Termin

**Flow:**
```
[Cal.com Webhook: booking.completed]
    ↓
[Warte-Modul: 120 Minuten Pause]
    ↓
[360dialog: Review-Request senden]
    Nachricht: "Hallo [Name], schön dass Sie heute bei uns waren! 
    Wenn alles gepasst hat — würde uns eine kurze Google-Bewertung 
    sehr helfen: [GOOGLE REVIEW LINK] Danke und bis bald! 🙏"
    ↓
[Warte-Modul: 72 Stunden Pause]
    ↓
[Filter: Hat der Kontakt schon eine Bewertung hinterlassen? (Manual Check oder API)]
    ↓ NEIN
[360dialog: Follow-up senden]
    Nachricht: "Hallo [Name], nur eine kurze Nachfrage — hatten Sie 
    schon eine Minute für unsere Bewertung? [LINK] 
    Wir würden uns sehr freuen!"
```

**Google Review Link generieren:**
```
1. Google Business Profil öffnen
2. "Rezensionen erhalten" → Link kopieren
3. Dieser Link direkt in die Nachricht einfügen
Format: https://g.page/r/[PLACE-ID]/review
```

---

### SCENARIO 5: Kunden-Reaktivierung

**Trigger:** Schedule — 1x monatlich

**Flow:**
```
[Schedule: 1. des Monats, 10:00 Uhr]
    ↓
[HubSpot API: Kontakte filtern → letzter Termin > 60 Tage]
    ↓
[Iterator: Für jeden Kontakt]
    ↓
[Filter: Hat WhatsApp Nummer? UND Hat nicht "Kein Kontakt" Tag?]
    ↓ JA
[360dialog: Reaktivierungs-Nachricht senden]
    Nachricht: "Hallo [Name]! Wir haben lange nichts voneinander gehört. 
    Alles gut bei Ihnen? Falls Sie demnächst wieder [LEISTUNG] brauchen — 
    wir sind für Sie da: [BUCHUNGS-LINK]"
    ↓
[HubSpot: Notiz: "Reaktivierungs-Nachricht gesendet am [Datum]"]
```

---

## MODUL 3: CAL.COM (SELBST GEHOSTET)

### Option A: Cal.com Cloud (empfohlen für Start)
Einfacher Einstieg, keine Server-Konfiguration nötig.

```
1. cal.com aufrufen → Account erstellen
2. Team-Account für AI Growth System: team.cal.com/aigrowthsystem
3. Pro jeden Kunden: Sub-Team oder eigene Event-Types
4. URL Format: cal.com/aigrowthsystem/[kundenslug]
```

### Option B: Cal.com Self-Hosted auf Hetzner (für Skalierung)
Vollständige Kontrolle, DSGVO-vorteil, günstiger ab 10+ Kunden.

**Server-Anforderungen:**
- Hetzner CX22 (2 vCPU, 4GB RAM) — reicht für 10-20 Kunden
- Ubuntu 22.04
- Docker + Docker Compose

**Installation:**
```bash
# Server vorbereiten
apt update && apt upgrade -y
apt install -y docker.io docker-compose git

# Cal.com Repository klonen
git clone https://github.com/calcom/cal.com.git
cd cal.com

# .env Datei erstellen
cp .env.example .env

# Wichtige .env Variablen:
# DATABASE_URL="postgresql://calcom:password@localhost:5432/calcom"
# NEXTAUTH_SECRET="[random string - min 32 chars]"
# NEXTAUTH_URL="https://cal.aigrowthsystem.de"
# EMAIL_FROM="noreply@aigrowthsystem.de"
# EMAIL_SERVER_HOST="smtp.brevo.com"
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER="[brevo api key]"
# EMAIL_SERVER_PASSWORD="[brevo smtp password]"

# Docker Compose starten
docker-compose up -d

# Nginx Reverse Proxy konfigurieren
# + Certbot SSL Zertifikat
```

### Cal.com pro Kunde konfigurieren

**Buchungsformular (Pflichtfelder):**
```
1. Name (Pflicht)
2. Email (Pflicht)
3. Telefonnummer (Pflicht — für WhatsApp Automations!)
4. Anliegen / Notiz (Optional)
```

**Event Types pro Branche:**

Zahnarzt:
- "Erstberatung Neupatienten" (30 Min)
- "Routinekontrolle" (45 Min)
- "Akuttermin" (20 Min, begrenzte Slots)

Kosmetik:
- "Erstberatung" (20 Min, kostenlos)
- "Behandlung" (60 Min)
- "Folgetermin" (45 Min)

Makler:
- "Kostenloses Bewertungsgespräch" (45 Min)
- "Besichtigung" (60 Min)

Handwerk:
- "Beratung vor Ort" (60 Min)
- "Telefon-Beratung" (20 Min)

**Webhook konfigurieren:**
```
1. Cal.com Settings → Developer → Webhooks
2. "New Webhook"
3. URL: https://hook.eu1.make.com/[WEBHOOK-ID-SCENARIO-2]
4. Events: booking.created, booking.cancelled, booking.completed
5. Save
```

---

## MODUL 4: CLAUDE API CHATBOT SETUP

### API Key Setup
```
1. console.anthropic.com aufrufen
2. "API Keys" → "Create Key"
3. Name: "AI Growth System - [Kundenname]"
4. Key sicher in Make.com Connections speichern
```

### Modell-Empfehlung
- **Chatbot-Antworten:** claude-3-5-haiku-20241022 (schnell, günstig)
- **Komplexe Systeme / Lead-Qualifizierung:** claude-3-5-sonnet-20241022

### Kosten-Kalkulation pro Kunde
```
Annahmen:
- 50 Gespräche/Tag × 30 Tage = 1.500 Gespräche/Monat
- Ø 300 Token Input + 200 Token Output pro Gespräch
- Haiku Preis: $0.80/1M Input, $4.00/1M Output

Monatliche Kosten:
- Input: 1.500 × 300 = 450.000 Token = $0.36
- Output: 1.500 × 200 = 300.000 Token = $1.20
- Gesamt: ~$1.56/Monat pro Kunde
```

Extrem günstig — selbst bei 5x mehr Volumen sind es unter $10/Monat.

### System Prompt Best Practices

**Tun:**
- Klare Persona geben ("Du bist der Assistent von...")
- Spezifische Unternehmensdaten eintragen
- Buchungslink immer bei Terminwunsch senden
- Maximale Antwortlänge definieren (300 Token reicht)
- Tonalität festlegen (Du vs. Sie, förmlich/informell)

**Nicht tun:**
- Keinen Preis nennen lassen außer wenn explizit erlaubt
- Keine Versprechen über Leistungen machen lassen
- Nie "Als KI..." sagen lassen
- Keine persönlichen Daten erfragen lassen (DSGVO)

---

## MODUL 5: HUBSPOT CRM (FREE)

### Setup pro Kunde
```
1. hubspot.com → Neues Konto erstellen
2. Branche einstellen
3. Deal-Pipeline erstellen:
   - Neue Anfrage
   - Termin gebucht
   - Termin stattgefunden
   - Angebot gesendet
   - Abgeschlossen (gewonnen)
   - Abgeschlossen (verloren)
4. Custom Properties anlegen:
   - WhatsApp Nummer
   - Branche
   - Letzter Termin (Datum)
   - Review gesendet (Ja/Nein)
5. API Key generieren: Settings → Integrations → API Key
```

### Make.com → HubSpot Verbindung
```
In Make.com:
1. HubSpot App hinzufügen
2. Mit HubSpot Account verbinden (OAuth)
3. In den relevanten Scenarios:
   - Kontakt erstellen: "Create Contact"
   - Kontakt finden oder anlegen: "Search/Create Contact"
   - Deal aktualisieren: "Update Deal"
```

---

## MODUL 6: EMAIL SETUP (BREVO)

### Warum Brevo?
- DSGVO-konform (Server in EU)
- Kostenlos bis 300 Emails/Tag
- SMTP für transaktionale Emails
- API für Kampagnen

### Setup
```
1. brevo.com → Account erstellen
2. Domain verifizieren (aigrowthsystem.de oder Kunden-Domain)
3. SPF und DKIM Einträge in DNS setzen:
   SPF: v=spf1 include:sendinblue.com ~all
   DKIM: Brevo Dashboard → Domains → DKIM Key kopieren
4. SMTP Zugangsdaten für Cal.com eintragen
5. API Key für Make.com generieren
```

---

## DEPLOYMENT CHECKLISTE PRO NEUKUNDE

### Tag 1 (nach Intake-Gespräch)
- [ ] HubSpot Konto erstellt + Pipeline konfiguriert
- [ ] Cal.com Event Types angelegt, Buchungsformular konfiguriert
- [ ] Brevo Domain verifiziert, SMTP funktioniert
- [ ] Cal.com Email-Erinnerungen getestet

### Tag 2-3
- [ ] Meta Business Manager Verifizierung angestoßen (kann länger dauern!)
- [ ] 360dialog Account angelegt, Nummer verifiziert
- [ ] WhatsApp Profil eingerichtet (Logo, Beschreibung)
- [ ] Claude System Prompt geschrieben + getestet

### Tag 4-5
- [ ] Make.com Scenarios geklont + angepasst
- [ ] Scenario 1 (Chatbot): Getestet mit 3 verschiedenen Testnachrichten
- [ ] Scenario 2 (Buchungsbestätigung): Testbuchung durchgeführt
- [ ] Scenario 3 (Erinnerungen): Schedule getestet, Nachrichten überprüft
- [ ] Scenario 4 (Google Reviews): Test-Flow durchgelaufen
- [ ] Scenario 5 (Reaktivierung): Logik überprüft

### Tag 6 (Go-Live)
- [ ] Vollständiger End-to-End Test:
  - Testnachricht via WhatsApp → AI antwortet ✓
  - Terminbuchung → Bestätigung via WhatsApp ✓
  - Termin im Google Calendar des Kunden sichtbar ✓
  - Erinnerung: Manuellen Trigger testen ✓
  - Google Review Request: Manuell auslösen + testen ✓
- [ ] Kunden-Dashboard Login erstellt und übergeben
- [ ] Go-Live Call mit Kunde (30 Min)

### Tag 7 (Post-Launch)
- [ ] Monitoring: Alle Make.com Scenarios laufen fehlerfrei?
- [ ] WhatsApp Nachrichten: Werden sie zugestellt?
- [ ] Erste echte Interaktionen beobachten
- [ ] Kundenfeedback einholen

---

## FEHLERBEHANDLUNG & MONITORING

### Häufige Probleme und Lösungen

**Problem:** Meta verweigert WhatsApp Business API Zugang
**Lösung:** Business Verifizierung beschleunigen (alle Dokumente einreichen), alternative: WATI.io als 360dialog-Alternative

**Problem:** Claude antwortet zu langsam (>3 Sek)
**Lösung:** Haiku-Modell nutzen, Max Tokens auf 200 reduzieren, System Prompt kürzen

**Problem:** Make.com Scenario schlägt fehl
**Lösung:** Make.com → Scenarios → Error Logs prüfen. Häufig: API Key abgelaufen oder Rate Limit

**Problem:** Cal.com Termin erscheint nicht in Google Calendar
**Lösung:** OAuth-Token erneuern: Cal.com Settings → Integrations → Google Calendar → Neu verbinden

**Problem:** WhatsApp Nachrichten kommen nicht an
**Lösung:** 360dialog Dashboard → Logs → Fehlermeldung prüfen. Häufig: Nummer blockiert oder Template nicht genehmigt

### Monitoring einrichten

**Make.com:**
- Scenarios auf "Instant Error Notification" stellen
- Error Email an support@aigrowthsystem.de

**360dialog:**
- Message Delivery Rate täglich checken (> 95% = ok)
- Bei Problemen: 360dialog Support über Discord

**HubSpot:**
- Wöchentlich: Neue Kontakte, Deal-Bewegungen prüfen
- Monatlich: Report an Kunden schicken

---

## SKALIERUNG & MULTI-KUNDEN MANAGEMENT

### Wenn du mehr als 5 Kunden hast:

**Make.com Organisation:**
```
Ordnerstruktur:
├── TEMPLATES (Basis-Scenarios nicht anfassen!)
│   ├── Template: Chatbot
│   ├── Template: Buchungsbestätigung
│   ├── Template: Erinnerungen
│   ├── Template: Google Reviews
│   └── Template: Reaktivierung
├── KUNDE_01_[Name]
│   ├── Chatbot
│   ├── Buchungsbestätigung
│   └── ...
└── KUNDE_02_[Name]
    └── ...
```

**Namens-Konvention:**
```
[KUNDENNAME] - [Scenario-Name] - v[Version]
Beispiel: "Mueller_Zahnarzt - Chatbot - v2"
```

**API Key Management:**
- Alle API Keys in einem Passwort-Manager (Bitwarden empfohlen)
- Pro Kunde eigener Claude API Key (Tracking, Limits)
- Monatliche Kosten-Review: Welcher Kunde verursacht welche API-Kosten?

---

*AI Growth System | Tech Setup Guide v1.0 | Stand: April 2026*
*Intern — nicht für Kunden bestimmt*
