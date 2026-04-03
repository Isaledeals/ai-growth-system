# Tech-Stack Setup Guide
**AI Growth System | Vollständige Einrichtungs-Dokumentation**

---

## Übersicht

Dieses Dokument beschreibt die komplette technische Einrichtung des AI Growth Systems für einen neuen Kunden. Es richtet sich an das interne Team das die Onboardings durchführt.

**Gesamtdauer Einrichtung:** 4-6 Stunden (verteilt über 2-3 Tage)
**Benötigte Zugänge:** Siehe Kundenübergabe-Checkliste (onboarding-kunde.md)

---

## Stack-Übersicht

| Komponente | Tool | Zweck | Kosten |
|-----------|------|-------|--------|
| Automatisierung | Make.com (ehemals Integromat) | Alle Workflows orchestrieren | ab 9€/Monat |
| WhatsApp | 360dialog | WhatsApp Business API | ab 5€/Monat + per Nachricht |
| Chatbot | Claude API (Anthropic) | AI-Antworten generieren | ~0,01€/Nachricht |
| Kalender | Cal.com (Self-hosted) | Terminbuchung | kostenlos (selbst gehostet) |
| Datenbank | Airtable oder Notion | Leads & Kontakte speichern | ab 0€ |
| Email Backup | Brevo (Sendinblue) | Email-Fallback wenn kein WhatsApp | bis 300/Tag kostenlos |
| Google Business | Google API | Review-Anfragen + Monitoring | kostenlos |
| CRM-Basis | HubSpot Free oder Airtable | Lead-Tracking | kostenlos |

---

## SCHRITT 1: Make.com Setup

### Account erstellen
1. Gehe auf make.com → Account erstellen (Team-Account empfohlen)
2. Erstelle einen neuen "Space" für den Kunden: `[Kundenname]-workspace`
3. Benenne alle Szenarien mit Präfix: `[Kundenname] - [Funktion]`

### Szenarien die eingerichtet werden müssen

#### Szenario A: Website-Chatbot → Terminbuchung
```
Trigger: Webhook (von Chatbot auf Website)
  ↓
Filter: Ist das eine Terminbuchungs-Anfrage?
  ↓
Cal.com: Verfügbare Slots abfragen
  ↓
Claude API: Antwort generieren mit Slot-Angeboten
  ↓
360dialog: WhatsApp-Nachricht an Interessenten senden
  ↓
Airtable: Lead-Datensatz anlegen
```

**Make.com Modul-Konfiguration:**
- Webhook-URL generieren → in Website-Chatbot eintragen
- Cal.com Connection: API Key aus Cal.com Settings
- Claude API: HTTP Module → POST zu api.anthropic.com/v1/messages
- 360dialog: HTTP Module → POST zu eu.chat-api.com/v1/messages

#### Szenario B: Termin-Erinnerungen (WhatsApp)
```
Trigger: Cal.com Webhook (neue Buchung)
  ↓
Daten speichern: Airtable (Name, Nummer, Termin-Zeit)
  ↓
Schedule: 48h vor Termin
  ↓
360dialog: WhatsApp-Erinnerung senden
  ↓
Schedule: 3h vor Termin
  ↓
360dialog: Letzte Erinnerung + Absage-Link
```

**Wichtig:** Make.com "Sleep" Modul oder Google Sheets als Scheduler nutzen für zeitgesteuerte Nachrichten.

**Alternative:** Direkt in Cal.com Reminder-Emails einrichten + 360dialog für WhatsApp via Zapier-Trigger.

#### Szenario C: Nach-Termin → Google Review
```
Trigger: Cal.com Webhook (Termin abgeschlossen / Status: "done")
  ODER: Manuelle Trigger-Liste in Airtable (für Handwerker)
  ↓
Wait: 2 Stunden
  ↓
360dialog: WhatsApp → "Wie war Ihr Besuch?"
  ↓
Trigger: Antwort-Webhook (bei positiver Antwort)
  ↓
360dialog: Google Review Link senden
```

**Tipp:** Google Business Review-Link generieren:
`https://search.google.com/local/writereview?placeid=[PLACE_ID]`
Place ID über Google Maps API oder manuell in Google Business finden.

#### Szenario D: Angebots-Nachfassen (Handwerk/Dienstleister)
```
Trigger: Manuelle Eingabe in Airtable ODER CSV-Import
  (Felder: Kundenname, Handynummer, Angebotsdatum, Angebotssumme)
  ↓
Tag 3: 360dialog → WhatsApp Nachfass-Nachricht 1
  ↓
Tag 7: 360dialog → WhatsApp Nachfass-Nachricht 2
  ↓
Tag 14: Airtable → Lead als "keine Antwort" markieren
```

#### Szenario E: Lead-Reaktivierung
```
Trigger: Airtable Scheduled Search — alle 7 Tage
  (Filter: letzter Kontakt > 90 Tage UND reaktivierung_gesendet = false)
  ↓
Claude API: Personalisierte Reaktivierungs-Nachricht generieren
  ↓
360dialog: WhatsApp senden
  ↓
Airtable: reaktivierung_gesendet = true, reaktivierung_datum = heute
```

---

## SCHRITT 2: 360dialog WhatsApp API

### Setup-Prozess
1. Account erstellen auf hub.360dialog.com
2. Neue WhatsApp Business Nummer registrieren
3. Kundennummer verifizieren (OTP per SMS oder Anruf)
4. Channel Partner Request — WICHTIG: 24h+ Wartezeit einplanen
5. API Key generieren: Settings → Developers → API Key

### WhatsApp Message Templates
WhatsApp erfordert für ausgehende Nachrichten (außerhalb 24h-Fenster) genehmigte Templates.

**Templates die eingereicht werden müssen:**

**Template 1: Terminbestätigung**
```
Name: termin_bestaetigung
Kategorie: UTILITY
Sprache: de

Hallo {{1}}, 

Ihr Termin am {{2}} um {{3}} Uhr ist bestätigt.

Adresse: {{4}}

Bei Fragen: Einfach hier antworten.
```

**Template 2: Termin-Erinnerung 48h**
```
Name: termin_erinnerung_48h
Kategorie: UTILITY
Sprache: de

Hallo {{1}},

kurze Erinnerung: Morgen haben Sie einen Termin um {{2}} Uhr.

Falls Sie absagen müssen, klicken Sie hier: {{3}}
```

**Template 3: Termin-Erinnerung 3h**
```
Name: termin_erinnerung_3h
Kategorie: UTILITY
Sprache: de

Hallo {{1}}, bis gleich! Ihr Termin beginnt in ca. 3 Stunden ({{2}} Uhr).

Absagen nur noch per Anruf möglich: {{3}}
```

**Template 4: Google Review Anfrage**
```
Name: review_anfrage
Kategorie: UTILITY
Sprache: de

Hallo {{1}},

schön dass Sie heute da waren! Wenn Sie zufrieden waren, würden wir uns über eine kurze Google-Bewertung freuen:

{{2}}

Danke & bis zum nächsten Mal!
```

**Template 5: Angebots-Nachfassen**
```
Name: angebot_nachfassen
Kategorie: MARKETING
Sprache: de

Hallo {{1}},

ich wollte kurz nachfragen ob Sie unser Angebot vom {{2}} erhalten haben und ob noch Fragen offen sind.

Bei Interesse können Sie hier direkt einen Termin buchen: {{3}}
```

**Einreichung:** Templates über 360dialog Hub einreichen. Genehmigung dauert 24-48h.

### Kosten-Kalkulation 360dialog
- Monatliche Grundgebühr: ca. 5€ pro Nummer
- Pro gesendete Nachricht (außerhalb 24h): ca. 0,05-0,10€
- Bei 500 Kunden-Nachrichten/Monat: ca. 30-55€

---

## SCHRITT 3: Claude API — Chatbot Integration

### API Key Setup
1. console.anthropic.com → API Keys → New Key
2. Key sicher speichern (wird nur einmal angezeigt)
3. In Make.com: HTTP Module → Authorization Header: `x-api-key: [KEY]`

### System Prompt Template (anpassbar pro Kunde)

```
Du bist ein freundlicher Assistent für [UNTERNEHMENSNAME], ein [BRANCHE]-Unternehmen in [STADT].

DEINE AUFGABEN:
1. Beantworte Kundenfragen zu unseren Leistungen und Preisen
2. Qualifiziere Interessenten (Was suchen sie? Wann? Kontaktdaten?)
3. Biete Terminbuchung an wenn der Kunde konkret interessiert ist
4. Gib bei Notfällen die Notfall-Nummer durch: [NUMMER]

UNSERE LEISTUNGEN:
[Hier Leistungen und Preise des Kunden eintragen]

TONALITÄT:
[Formell/Informell — je nach Branche]
Kurze, klare Antworten. Keine langen Texte.
Immer freundlich, nie aufdringlich.

WENN DU NICHT WEISST:
Sage: "Das beantworte ich gerne persönlich — darf ich Sie zurückrufen oder möchten Sie direkt einen Termin buchen?"

NIEMALS:
- Preise nennen die wir nicht kennen
- Versprechen die der Kunde nicht verifiziert hat
- Auf Konkurrenten eingehen
```

### Make.com HTTP-Modul Konfiguration für Claude

```
URL: https://api.anthropic.com/v1/messages
Method: POST
Headers:
  x-api-key: [ANTHROPIC_API_KEY]
  anthropic-version: 2023-06-01
  content-type: application/json

Body (JSON):
{
  "model": "claude-3-5-haiku-20241022",
  "max_tokens": 300,
  "system": "[SYSTEM PROMPT]",
  "messages": [
    {
      "role": "user",
      "content": "{{1.message_text}}"
    }
  ]
}
```

**Hinweis:** claude-3-5-haiku ist das günstigste Modell — ideal für einfache Chatbot-Antworten. Kosten: ca. 0,001€ pro Antwort.

---

## SCHRITT 4: Cal.com Setup (Self-Hosted auf Hetzner)

### Empfohlene Server-Konfiguration
- Hetzner CX21: 2 vCPU, 4GB RAM, 40GB SSD — reicht für Cal.com
- Monatliche Kosten: ca. 6€
- Alternativ: Cal.com Cloud (ab 12$/Monat) — einfacher, kein Server-Management

### Self-Hosted Installation

```bash
# Server vorbereiten
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y

# Cal.com klonen
git clone https://github.com/calcom/cal.com.git
cd cal.com

# Umgebungsvariablen einrichten
cp .env.example .env
nano .env

# Wichtige .env Einträge:
NEXTAUTH_SECRET=[random_32_char_string]
DATABASE_URL=postgresql://[user]:[pass]@localhost:5432/calcom
NEXTAUTH_URL=https://termine.[kundendomain].de
EMAIL_FROM=[email]
SMTP_HOST=[smtp_server]
SMTP_PORT=587
SMTP_USER=[email]
SMTP_PASSWORD=[pass]

# Starten
docker-compose up -d
```

### Nginx Reverse Proxy (für SSL/Domain)

```nginx
server {
    server_name termine.kundendomain.de;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# SSL mit Certbot
certbot --nginx -d termine.kundendomain.de
```

### Cal.com Konfiguration pro Kunde
1. Admin-Account erstellen
2. Event Types anlegen (Erstgespräch, Besichtigung, Behandlung etc.)
3. Verfügbarkeiten konfigurieren
4. Webhook einrichten: Settings → Webhooks → BOOKING_CREATED, BOOKING_CANCELLED
5. Webhook-URL: Make.com Webhook-URL für Szenario B

### Kalender-Integration
- Google Calendar: OAuth-Verbindung in Cal.com Settings
- Outlook: OAuth-Verbindung
- iCal: Import/Export URL

---

## SCHRITT 5: Chatbot auf Kunden-Website integrieren

### Option A: JavaScript Widget (empfohlen)

Einfachste Option — ein Script-Tag in den HTML `<head>` oder vor `</body>`:

```html
<!-- AI Growth System Chatbot Widget -->
<script>
  window.AGSConfig = {
    webhookUrl: 'https://hook.make.com/[WEBHOOK_ID]',
    primaryColor: '#[KUNDENFARBE]',
    greeting: 'Hallo! Wie kann ich Ihnen helfen?',
    position: 'bottom-right',
    businessName: '[UNTERNEHMENSNAME]'
  };
</script>
<script src="https://cdn.aigrowthsystem.de/widget.js" async></script>
```

**Hinweis:** Widget-Script muss noch gebaut werden (Next.js Component → CDN deployen).
Kurzfristig Alternative: Tidio oder Crisp als Frontend, Make.com als Backend.

### Option B: Tidio (kurzfristige Lösung)

Tidio kostenlos nutzen als Chat-Interface, Anfragen per Webhook an Make.com weitersenden:
1. Tidio-Account erstellen
2. Widget auf Website einbetten (1 Zeile Code)
3. Tidio Automation: Bei neuer Nachricht → HTTP Request an Make.com Webhook
4. Make.com verarbeitet, Claude antwortet, zurück an Tidio

Kosten: Tidio kostenlos (bis 100 Unterhaltungen/Monat), dann 29$/Monat

### Option C: Crisp Chat (Alternative)

Ähnlich wie Tidio, aber bessere API-Integration und günstiger im Pro-Plan.

---

## SCHRITT 6: Airtable Datenbank

### Basis-Tabellen Setup

**Tabelle: Kontakte**
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| Name | Single line | Kundenname |
| Telefon | Phone | WhatsApp-Nummer |
| Email | Email | Optional |
| Status | Select | lead / aktiv / inaktiv / reaktiviert |
| Letzte_Interaktion | Date | Automatisch aktualisiert |
| Quelle | Select | chatbot / empfehlung / kaltakquise |
| Notizen | Long text | Manuell oder automatisch |

**Tabelle: Termine**
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| Kontakt | Link to Contacts | Verknüpft |
| Termin_Datum | Date & Time | |
| Status | Select | geplant / abgeschlossen / abgesagt / no-show |
| Erinnerung_48h | Checkbox | Gesendet? |
| Erinnerung_3h | Checkbox | Gesendet? |
| Review_Anfrage | Checkbox | Gesendet? |

**Tabelle: Angebote (für Handwerk)**
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| Kontakt | Link to Contacts | |
| Angebots_Datum | Date | |
| Betrag | Currency | |
| Status | Select | gesendet / nachgefasst / gewonnen / verloren |
| Nachfassen_1 | Checkbox | Tag 3 gesendet? |
| Nachfassen_2 | Checkbox | Tag 7 gesendet? |

---

## SCHRITT 7: Brevo Email-Integration (Backup & Kampagnen)

### Wofür Brevo genutzt wird
- Fallback wenn WhatsApp-Nachricht nicht zugestellt wird
- Email-Sequenzen für Kalt-Outreach (13k Liste)
- Transaktionale Emails (Terminbestätigungen als Email-Backup)

### Setup
1. Account auf brevo.com erstellen (kostenlos bis 300 Emails/Tag)
2. Sending Domain verifizieren: SPF + DKIM einrichten
3. API Key generieren: Account → SMTP & API → API Keys
4. In Make.com: Brevo Module hinzufügen oder HTTP Module für API

### Email-Sender-Domain Setup (WICHTIG für Deliverability)

```
Für Kalt-Outreach: EIGENE Domain kaufen, NIEMALS die Haupt-Domain!
Empfehlung: [kunde]-info.de oder [kunde]-team.de

SPF Record (DNS):
v=spf1 include:spf.brevo.com ~all

DKIM: Brevo generiert Key → in DNS als TXT Record eintragen

DMARC:
v=DMARC1; p=quarantine; rua=mailto:[email]
```

**Domain Warmup:** Neue Domains brauchen 2-3 Wochen Warmup bevor große Kampagnen gesendet werden können. Täglich 20-50 Emails starten, langsam steigern.

---

## SCHRITT 8: Google Business API Integration

### Review-Link generieren (ohne API)
Schnellste Methode — kein API-Zugang nötig:

1. Google Maps → Unternehmen suchen
2. "Bewertung schreiben" Button → URL kopieren
3. Diese URL in Template-Variablen speichern

Format: `https://search.google.com/local/writereview?placeid=[PLACE_ID]`

### Place ID finden
1. maps.google.com → Unternehmen suchen
2. URL anschauen: `...place/ChIJ...` → das ist die Place ID
3. Oder: developers.google.com/maps/documentation/places/web-service/place-id

### Negative Review Umleitung
Bei negativer Antwort auf Review-Anfrage: NICHT zu Google leiten, sondern:
- Direkt an Kundeninhaber weiterleiten: WhatsApp oder Email
- Template: "Oh, das tut mir leid! Darf ich mich kurz melden um das zu klären?"

---

## Kosten-Übersicht pro Kunde (monatlich)

| Service | Kosten |
|---------|--------|
| Make.com (Team) | 9-29€ (geteilt über mehrere Kunden) |
| 360dialog | 5€ Grundgebühr + ~20-40€ Nachrichten |
| Claude API | 5-15€ (abhängig von Chatbot-Nutzung) |
| Cal.com (self-hosted) | ~1€ (Anteil am Hetzner Server) |
| Airtable | 0€ (Free Plan reicht für Start) |
| Brevo | 0€ (Free Plan: 300 Emails/Tag) |
| **Gesamt pro Kunde** | **~40-90€ COGS** |
| **Kunden-Preis** | **997-1.497€** |
| **Gross Margin** | **~91-96%** |

---

## Troubleshooting — Häufige Probleme

**WhatsApp-Nachrichten kommen nicht an:**
- Template noch nicht genehmigt → 24-48h warten
- 24h-Fenster überschritten → Template-Message statt Freitext verwenden
- Nummer nicht als WhatsApp verifiziert → in 360dialog prüfen

**Make.com Szenario läuft nicht:**
- Webhook nicht korrekt verknüpft → URL neu generieren und testen
- API-Limit erreicht → Operationen-Verbrauch in Make.com prüfen
- JSON-Format falsch → Make.com Error Logs prüfen

**Claude antwortet falsch:**
- System Prompt zu lang oder unklar → vereinfachen
- max_tokens zu niedrig → auf 500 erhöhen
- Temperature zu hoch → 0 setzen für konsistentere Antworten

**Cal.com Termine werden nicht getriggert:**
- Webhook-URL in Cal.com Settings falsch → neu eintragen
- Webhook-Events nicht ausgewählt → alle BOOKING_* Events aktivieren

---

## Checkliste: Go-Live

Vor dem ersten Kunden-Go-Live:

- [ ] Make.com alle 5 Szenarien aktiv und getestet
- [ ] WhatsApp Templates genehmigt (alle 5)
- [ ] 360dialog Nummer verifiziert und live
- [ ] Cal.com Termintypen angelegt, Kalender verknüpft
- [ ] Chatbot auf Test-Website getestet (10 Test-Gespräche)
- [ ] Airtable Tabellen korrekt verknüpft
- [ ] Google Review Link korrekt
- [ ] Negative Review Umleitung getestet
- [ ] Angebots-Nachfassen getestet mit Test-Nummer
- [ ] Reaktivierungs-Szenario mit Test-Datensatz geprüft
- [ ] Brevo Domain verifiziert (SPF + DKIM)
- [ ] Kunde hat Texte und Tonalität genehmigt
- [ ] Notfall-Kontakt des Kunden hinterlegt

---

*AI Growth System | Tech-Stack Setup Guide | Version 1.0 | Trinity*
