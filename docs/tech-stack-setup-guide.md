# Tech Stack Setup Guide
**AI Growth System | Vollständige Einrichtungsanleitung**

---

## Übersicht: Was wir verwenden und warum

| Tool | Zweck | Kosten/Monat | Priorität |
|------|-------|--------------|-----------|
| Make.com | Automatisierungen & Workflows | ~20-40€ | Kern |
| 360dialog | WhatsApp Business API | ~5€ + Nachrichten | Kern |
| Cal.com | Terminbuchungssystem | 0€ (Self-hosted) | Kern |
| Claude API (Anthropic) | AI Chatbot & Antworten | ~20-50€/Kunde | Kern |
| Brevo (ex-Sendinblue) | Email Marketing | ~25€ (25k Emails) | Email |
| Supabase | Datenbank & Auth | 0€ (Free Tier) | Backend |
| Vercel | Hosting Landing Page | 0€ (Hobby Plan) | Hosting |
| Google My Business API | Review-Automatisierung | 0€ | Reviews |

**Gesamtkosten pro Kunde (ca.):** 80-120€/Monat
**Preis an Kunde:** 900-1.500€/Monat
**Gross Margin:** ~90%

---

## TEIL 1: Make.com — Das Automatisierungs-Herz

Make.com ist der Klebstoff zwischen allen Tools. Hier laufen alle Flows zusammen.

### Account Setup

1. Account anlegen auf make.com
2. Plan wählen: **Core Plan** (~9$/Monat für Start, 10.000 Operationen)
3. Für jeden Kunden eine eigene **Organization** anlegen (sauber trennen)

### Wichtigste Connections einrichten

```
Settings → Connections → Create Connection:
- Google Calendar (OAuth2)
- Google Sheets (OAuth2)  
- HTTP (für WhatsApp/360dialog API)
- Anthropic / OpenAI (HTTP Module)
- Brevo/SMTP (für Email)
- Webhooks (für Website-Chatbot)
```

### Core Flows — was wir bauen

---

#### FLOW 1: Website Lead → WhatsApp Sofort-Antwort

**Trigger:** Webhook (wenn Formular auf Website abgeschickt)
**Schritte:**
1. Webhook empfängt Lead-Daten (Name, Tel, Anfrage-Text)
2. Claude API: Anfrage analysieren, passende Antwort generieren
3. 360dialog API: WhatsApp Nachricht an den Lead schicken
4. Google Sheets: Lead in Tracking-Sheet eintragen
5. Optional: Email-Benachrichtigung an Unternehmer

**Vorlage Webhook-Payload:**
```json
{
  "name": "Max Mustermann",
  "phone": "+49123456789",
  "message": "Wie viel kostet eine Reinigung?",
  "source": "website-kontaktformular",
  "timestamp": "2026-04-03T10:00:00Z"
}
```

---

#### FLOW 2: WhatsApp Eingehende Nachricht → AI Antwort

**Trigger:** 360dialog Webhook (eingehende WhatsApp Nachricht)
**Schritte:**
1. Nachricht empfangen
2. Konversationshistorie aus Supabase laden (letzten 10 Nachrichten)
3. Claude API: Kontext + System-Prompt + neue Nachricht → Antwort generieren
4. Antwort zurück via 360dialog schicken
5. Konversation in Supabase speichern
6. Wenn "Termin buchen" erkannt: Cal.com Link mitschicken

**System-Prompt Template:**
```
Du bist der freundliche AI-Assistent von [Firmenname].
Du hilfst Kunden bei Fragen zu: [Leistungen].
Öffnungszeiten: [Zeiten].
Preise: [Preisinfo oder "Bitte auf Anfrage"].
Wenn jemand einen Termin möchte: Schicke diesen Link: [Cal.com Link].
Wenn die Anfrage komplex ist oder du unsicher bist: Sag "Ich leite das kurz weiter".
Schreibe immer auf Deutsch. Sei freundlich aber kurz. Max 3-4 Sätze.
```

---

#### FLOW 3: Termin-Erinnerung (24h vorher)

**Trigger:** Scheduler (täglich 9 Uhr) ODER Cal.com Webhook
**Schritte:**
1. Cal.com API: Alle Termine der nächsten 24h abrufen
2. Für jeden Termin: WhatsApp Erinnerung schicken
3. Text: "Guten Morgen [Name]! Nur kurz: Ihr Termin bei [Firma] ist morgen um [Zeit]. Sehen wir uns dann? 👍 (Zum Absagen einfach hier antworten)"

---

#### FLOW 4: Post-Termin → Google Review Request

**Trigger:** Cal.com Webhook (Termin abgeschlossen) ODER Manueller Trigger
**Warten:** 2 Stunden nach Termin-Ende
**Schritte:**
1. WhatsApp Nachricht: "Hallo [Name], wie war Ihr Termin bei uns heute? Wir würden uns sehr über Ihr Feedback freuen: [Google Review Link] — Danke! 🙏"
2. Falls Reply "gut" / positiv: Automatisch danken
3. Falls Reply negativ: Interne Eskalation (Email an Unternehmer)

---

#### FLOW 5: Follow-up Sequenz (für Angebote)

**Trigger:** Webhook (wenn Angebot verschickt wird) ODER Manuell via Sheet
**Sequenz:**
- Tag 0: Angebot verschickt → Lead ins Sheet
- Tag 3: WhatsApp "Haben Sie unser Angebot erhalten?"
- Tag 7 (wenn keine Antwort): "Kurze Frage — haben Sie noch Interesse?"
- Tag 14 (wenn keine Antwort): "Letzter Kontakt von uns — falls Sie doch Fragen haben: [Termin buchen]"

---

## TEIL 2: 360dialog — WhatsApp Business API

360dialog ist der günstigste WhatsApp Business API Provider. Wichtig: Meta genehmigt Templates vorher.

### Setup Schritt für Schritt

**1. Account anlegen**
- Account auf 360dialog.com erstellen
- Business Verification: Gewerbeschein oder Impressum hochladen
- Warten: 1-3 Werktage für Approval

**2. WhatsApp Business Number verbinden**
- Entweder neue Nummer (SIM-Karte) oder bestehende Nummer portieren
- Achtung: Nummer kann danach NICHT mehr als normale WhatsApp genutzt werden
- Empfehlung für Kunden: Separate SIM für Business kaufen

**3. API Key generieren**
```
Dashboard → API → Generate Key
→ Diesen Key in Make.com als HTTP Header speichern:
  Header: D360-API-KEY: [KEY]
```

**4. Webhook URL eintragen**
```
Dashboard → Webhooks → Add Webhook:
URL: https://hook.eu1.make.com/[YOUR-MAKE-WEBHOOK-ID]
Events: messages, statuses
```

**5. Message Templates erstellen (für ausgehende Nachrichten)**

Template-Kategorien:
- **UTILITY**: Erinnerungen, Termine, Bestätigungen → Auto-approved
- **MARKETING**: Angebote, Reaktivierungen → Requires Meta review (1-3 Tage)
- **AUTHENTICATION**: OTP-Codes

Beispiel Template (Termin-Erinnerung):
```
Name: appointment_reminder_v1
Category: UTILITY
Language: de
Body: "Hallo {{1}}! Ihr Termin bei uns ist am {{2}} um {{3}} Uhr. 
Bis dann! Bei Fragen einfach antworten."
```

**Wichtige Limits:**
- 250 Nachrichten/Tag (initiales Limit, steigt mit Nutzung)
- Templates müssen 24h vorher genehmigt sein
- Freie Nachrichten (Replies) nur innerhalb 24h nach letzter Kunden-Nachricht möglich

---

## TEIL 3: Cal.com — Terminbuchungssystem

Cal.com ist Open Source und kann selbst gehostet werden (keine laufenden Kosten).

### Option A: Cal.com Cloud (einfacher)

1. Account auf cal.com
2. Free Plan: 1 User, 1 Event Type — ausreichend für Start
3. Event Types anlegen:
   - "Erstgespräch (kostenfrei)" → 20 Minuten
   - "Demo-Termin" → 30 Minuten
   - "[Branche]-Beratung" → 45 Minuten

### Option B: Cal.com Self-Hosted (empfohlen ab Kunde 3+)

**Voraussetzungen:** Hetzner VPS (CX21, 6€/Monat reicht)

**Installation:**
```bash
# Server vorbereiten
apt update && apt upgrade -y
apt install docker.io docker-compose -y

# Cal.com klonen
git clone https://github.com/calcom/cal.com.git
cd cal.com

# .env ausfüllen
cp .env.example .env
nano .env

# Wichtige .env Variablen:
DATABASE_URL="postgresql://user:pass@localhost:5432/calcom"
NEXTAUTH_SECRET="[random-32-char-string]"
NEXTAUTH_URL="https://termine.KUNDENOMAIN.de"
GOOGLE_API_CREDENTIALS="[Google OAuth JSON]"

# Starten
docker-compose up -d
```

### Cal.com in Make.com integrieren

**Webhook einrichten:**
```
Cal.com → Settings → Developer → Webhooks → Add Webhook
URL: https://hook.eu1.make.com/[WEBHOOK-ID]
Triggers: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
```

**API Key für Abfragen:**
```
Cal.com → Settings → Developer → API Keys → New Key
→ In Make.com als HTTP Header: Authorization: Bearer [KEY]
```

---

## TEIL 4: Claude API (Anthropic) — Der AI Brain

### API Key holen

1. console.anthropic.com → Account erstellen
2. API Keys → Create Key
3. Limits setzen! (wichtig: Spending Limit pro Monat setzen)

### Modell-Empfehlung für Chatbots

| Anwendungsfall | Modell | Kosten |
|----------------|--------|--------|
| Chatbot-Antworten | claude-haiku-3-5 | ~0,25$/1M Tokens |
| Komplexe Analysen | claude-sonnet-3-5 | ~3$/1M Tokens |
| Kritische Inhalte | claude-opus | ~15$/1M Tokens |

**Für 99% der Chatbot-Anfragen: Haiku reicht vollständig.**

### Make.com HTTP Module für Claude

```
URL: https://api.anthropic.com/v1/messages
Method: POST
Headers:
  x-api-key: [API_KEY]
  anthropic-version: 2023-06-01
  content-type: application/json

Body (JSON):
{
  "model": "claude-haiku-3-5-20241022",
  "max_tokens": 500,
  "system": "{{system_prompt}}",
  "messages": [
    {"role": "user", "content": "{{user_message}}"}
  ]
}
```

**Response auslesen:**
```
content[0].text → Das ist die Antwort von Claude
```

---

## TEIL 5: Google Review Automatisierung

### Vorbereitung: Google My Business API

1. Google Cloud Console → Neues Projekt
2. APIs & Services → My Business Business Information API aktivieren
3. My Business Account Management API aktivieren
4. OAuth 2.0 Credentials erstellen
5. Scope: `https://www.googleapis.com/auth/business.manage`

### Review-Link generieren

Der direkte Review-Link für jeden Kunden:
```
https://search.google.com/local/writereview?placeid=[PLACE_ID]
```

**Place ID finden:**
1. Google Maps → Unternehmen suchen
2. URL enthält `1s0x[...]` → Das ist die Place ID
3. Oder: Google Maps Platform → Place ID Finder

### WhatsApp Nachricht Template für Reviews

```
Hallo {{Vorname}}! 

Wir hoffen, dass alles zu Ihrer Zufriedenheit war. 
Hätten Sie 1 Minute Zeit für eine kurze Bewertung? 
Das hilft uns sehr! 🙏

➡️ {{Google_Review_Link}}

Vielen Dank,
{{Unternehmensname}}
```

---

## TEIL 6: Brevo — Email Marketing

Brevo (ex-Sendinblue) ist die beste Option für Deutschland (DSGVO-konform, EU-Server).

### Account Setup

1. brevo.com → Account erstellen
2. Free Plan: 300 Emails/Tag — gut für Tests
3. Starter Plan (ab 25€/Monat): 20.000 Emails/Monat → für Email-Kampagnen

### Domain Warmup (kritisch für Deliverability!)

**Eigene Sending Domain einrichten:**
```
Brevo → Senders & IPs → Domains → Add Domain
Domain z.B.: mail.ai-growth-system.de (SEPARATE Domain!)

DNS Einträge setzen:
SPF:  TXT  @  "v=spf1 include:sendinblue.com ~all"
DKIM: TXT  [brevo-selector]._domainkey  [brevo-dkim-value]
DMARC: TXT  _dmarc  "v=DMARC1; p=none; rua=mailto:dmarc@DOMAIN"
```

**Warmup-Plan (wichtig!):**
```
Woche 1: Max. 50 Emails/Tag (an beste Kontakte zuerst)
Woche 2: Max. 150 Emails/Tag
Woche 3: Max. 400 Emails/Tag
Woche 4: Max. 1.000 Emails/Tag
Ab Woche 5: Normal skalieren
```

### 13k Liste in Brevo importieren

1. CSV vorbereiten: Vorname, Nachname, Email, Branche, PLZ
2. Brevo → Contacts → Import
3. Je Zielgruppe eine eigene **Liste** anlegen:
   - Liste A: Ästhetik/Beauty/Kliniken
   - Liste B: Zahnärzte
   - Liste C: Immobilienmakler
   - Liste D: Handwerk/Dienstleister

### Email-Sequenz als Automation in Brevo

```
Automations → New Automation → "Email Sequence"

Trigger: "Contact added to list [A/B/C/D]"

Steps:
  → Tag 1:  Email 1 senden
  → Warten: 2 Tage
  → Email 2 senden
  → Warten: 3 Tage
  → Email 3 senden
  → Warten: 4 Tage
  → Email 4 senden
  → Warten: 4 Tage
  → Email 5 senden
  → Ende (Kontakt aus Sequenz entfernen)

Exit Condition: Kontakt hat geantwortet ODER Link geklickt
```

---

## TEIL 7: Supabase — Lead-Tracking Datenbank

### Schema für Lead-Management

```sql
-- Leads Tabelle
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  source TEXT, -- 'chatbot', 'website-form', 'whatsapp-direct'
  branche TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'demo-booked', 'customer', 'lost'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations Tabelle (WhatsApp Chat-History)
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  phone TEXT,
  role TEXT, -- 'user' oder 'assistant'
  content TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Termine Tabelle
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  cal_booking_id TEXT,
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'no-show'
  reminder_sent BOOLEAN DEFAULT FALSE,
  review_requested BOOLEAN DEFAULT FALSE
);
```

### Make.com → Supabase Connection

```
Make.com → Connections → Supabase → New Connection
URL: https://[PROJECT-ID].supabase.co
Service Role Key: [aus Supabase → Settings → API]
```

---

## TEIL 8: Deployment & Monitoring

### Checkliste vor Go-Live

**Make.com:**
- [ ] Alle Scenarios aktiv und getestet (Test-Runs durchgeführt)
- [ ] Error-Handling eingebaut (was passiert wenn API down ist?)
- [ ] Email-Benachrichtigung bei Fehlern aktiviert
- [ ] Limits gesetzt (max. Operations/Tag)

**360dialog / WhatsApp:**
- [ ] Alle Templates approved
- [ ] Webhook funktioniert (Testmessage gesendet)
- [ ] Opt-Out Keyword eingerichtet: "STOP" → Kontakt aus Sequenz entfernen

**Cal.com:**
- [ ] Testbuchung durchgeführt
- [ ] Webhook feuert korrekt
- [ ] Google Calendar Sync getestet
- [ ] Bestätigungs-Emails ankommen

**Brevo:**
- [ ] SPF/DKIM/DMARC verifiziert (grünes Häkchen)
- [ ] Test-Email aus Domain gesendet und empfangen
- [ ] Abmelde-Link funktioniert (legal requirement!)
- [ ] Automation mit Test-Kontakt durchgespielt

**Supabase:**
- [ ] Row Level Security aktiviert
- [ ] Test-Lead erstellt und aus Make.com abrufbar
- [ ] Backups aktiviert

### Monitoring Setup

**Was wir täglich checken:**
```
Make.com → Scenarios → Check failed executions
360dialog → Dashboard → Delivery Rate (sollte >95% sein)
Supabase → Table Editor → Neue Leads heute?
Brevo → Campaigns → Open Rate, Bounce Rate
```

**Alert wenn:**
- Make.com Scenario schlägt 3x fehl → Email Alert
- Bounce Rate in Brevo > 5% → Sofort stoppen und Liste prüfen
- WhatsApp Delivery Rate < 90% → Template prüfen

---

## TEIL 9: Kosten-Übersicht pro Kunde

### Kalkulation (monatlich)

| Tool | Kosten | Anmerkung |
|------|--------|-----------|
| Make.com Core | 9€ | Geteilt über alle Kunden, ~1-2€/Kunde |
| 360dialog | 5€ + ~0,05€/Nachricht | Ca. 200 Nachrichten = 15€ |
| Cal.com | 0€ | Self-hosted auf Hetzner |
| Claude API (Haiku) | ~20-30€ | Je nach Chatbot-Volumen |
| Brevo | ~3€ | Anteil am Starter Plan |
| Supabase | 0€ | Free Tier reicht für viele Kunden |
| Hetzner VPS | ~6€ | Geteilt, ~1€/Kunde |
| **Gesamt** | **~50-65€** | Pro Kunde pro Monat |

**Preis an Kunden: 900-1.500€**
**Margin: 85-93%**

---

## QUICK-START CHECKLISTE (für neuen Kunden)

```
Tag 1:
□ Make.com Organization für Kunden anlegen
□ 360dialog Account + Webhook Setup
□ Cal.com Event Types anlegen
□ Supabase Tabellen anlegen
□ Claude API Key anlegen (Limit setzen: 50$/Monat)

Tag 2-3:
□ System-Prompt für Kunden-Chatbot schreiben
□ Flow 1 (Lead → WhatsApp) bauen und testen
□ Flow 2 (Chat-Antworten) bauen und testen
□ Flow 3 (Termin-Erinnerung) bauen und testen

Tag 4-5:
□ Flow 4 (Review Request) bauen
□ Flow 5 (Follow-up Sequenz) bauen
□ Google Review Link des Kunden eintragen
□ Alle Templates bei 360dialog einreichen

Tag 6-7:
□ Full Test: Kompletten Flow einmal durchspielen
□ Onboarding-Call mit Kunde
□ Go Live 🚀
```

---

*AI Growth System | Tech Stack Setup Guide v1.0 | April 2026*
