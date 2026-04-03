# Tech Stack Setup-Guide
## AI Growth System — Schritt-für-Schritt Einrichtung pro Neukunde

**Version 1.0 | Intern | Stand: April 2026**
**Zielgruppe:** Technisches Team / Onboarding-Manager

---

## ÜBERSICHT: Die 5 Module

| Modul | Tool | Zeitaufwand Setup | Kosten/Kunde/Monat |
|-------|------|-------------------|--------------------|
| 1. AI Chatbot | Voiceflow + Claude API | 2-3h | 45-60€ |
| 2. WhatsApp Follow-up | 360dialog + Make.com | 1-2h | 35-50€ |
| 3. Terminbuchung | Cal.com (self-hosted) | 30-45min | 5€ (Hosting) |
| 4. Google Reviews | Make.com Flow | 30min | 5€ (Make) |
| 5. Lead Scraping | Apollo.io / Scraper | 1h | 40-50€ |
| **GESAMT** | | **~6-7h** | **~130-165€** |

**Brutto-Marge bei 1.297€/Monat: ~87%**

---

## VORAUSSETZUNGEN (BEVOR DU ANFÄNGST)

### Was du vom Kunden brauchst (aus Onboarding-Fragebogen):
- [ ] Ausgefüllter Fragebogen (alle Felder)
- [ ] WhatsApp Business-Telefonnummer (neu oder bestehend)
- [ ] Zugang zu Google Calendar ODER Outlook
- [ ] Website-URL (für Chatbot-Einbettung)
- [ ] Google Business Profil URL

### Was du vorbereitet haben musst:
- [ ] Hetzner Server läuft (n8n + Cal.com installiert)
- [ ] 360dialog Partner-Account aktiv
- [ ] Voiceflow Workspace bereit
- [ ] Make.com Account mit freien Operationen
- [ ] Claude API Key aktiv

---

## MODUL 1: AI CHATBOT EINRICHTEN

### Tool: Voiceflow (Frontend) + Claude API (AI-Backend)

#### Schritt 1: Neues Voiceflow-Projekt anlegen

```
1. Login: app.voiceflow.com
2. "New Project" → Sprache: Deutsch
3. Projekt benennen: "[Kundenname] - Chatbot"
4. Template: "Customer Support" wählen
```

#### Schritt 2: Wissensbasis aufbauen (Knowledge Base)

Dokument vorbereiten mit folgenden Infos aus dem Onboarding-Fragebogen:
```
# [Unternehmensname] — Chatbot Wissensbasis

## Über das Unternehmen
[Name, Branche, Standort, Kurzbeschreibung]

## Dienstleistungen
[Alle Dienstleistungen mit kurzer Erklärung]

## Preise
[Preisrange oder "auf Anfrage" — je nach Kundenwunsch]

## Häufige Fragen
Q: [Frage 1]
A: [Antwort 1]
[...]

## Terminbuchung
"Termine können direkt über diesen Link gebucht werden: [Cal.com Link]"

## Kontakt
Telefon: [Nummer]
Email: [Email]
Adresse: [Adresse]
Öffnungszeiten: [Zeiten]
```

#### Schritt 3: Claude API als AI-Integration

```
In Voiceflow:
1. Integrations → AI Model → "Custom Model"
2. API Endpoint: https://api.anthropic.com/v1/messages
3. API Key: [Claude API Key aus unserem Account]
4. Model: claude-3-5-haiku-20241022 (günstig, schnell, gut für Chatbot)
5. System Prompt (anpassen):

---
SYSTEM PROMPT TEMPLATE:
Du bist der freundliche Assistent von [Unternehmensname]. 
Du beantwortest Fragen zu unseren Dienstleistungen auf Deutsch.
Dein Ton ist: professionell aber warm, nicht zu formal, nicht zu locker.
Wenn du eine Frage nicht beantworten kannst: Sage das ehrlich und biete an, den 
Inhaber direkt zu kontaktieren.
Bei Terminanfragen: Leite immer zum Buchungslink weiter.
Halte Antworten kurz (max. 3-4 Sätze).
Stell keine Gegenfragen außer wenn wirklich nötig.
---
```

#### Schritt 4: Chatbot in Website einbetten

```
In Voiceflow: Publish → Web Chat → Widget-Code kopieren

Beim Kunden einbetten:
Option A: WordPress → Plugin "WP Code" → Code vor </body> einfügen
Option B: Direkt im HTML → vor </body> Tag einfügen
Option C: Google Tag Manager → Custom HTML Tag

Code sieht so aus:
<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: 'DEIN_PROJECT_ID' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    }
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; 
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

#### Schritt 5: Testen

```
Checkliste Chatbot Test:
✅ "Was kostet [Hauptdienstleistung]?" → Korrekte Antwort?
✅ "Wann habt ihr geöffnet?" → Korrekte Zeiten?
✅ "Ich möchte einen Termin" → Leitet zum Buchungslink?
✅ "Ich habe eine Beschwerde" → Freundliche Antwort + Weiterleitung?
✅ Unbekannte Frage → Ehrliche Antwort ohne Fantasien?
✅ Mehrere Nachrichten hintereinander → Funktioniert der Kontext?
```

---

## MODUL 2: WHATSAPP FOLLOW-UP EINRICHTEN

### Tool: 360dialog (WhatsApp Business API) + Make.com (Automatisierung)

#### Schritt 1: WhatsApp Business API aktivieren (360dialog)

```
1. Login: hub.360dialog.com → Partner Dashboard
2. "New Client" → Kundendaten eingeben
3. WhatsApp Business-Nummer des Kunden eingeben
4. Facebook Business Manager ID des Kunden (optional, falls vorhanden)
5. 360dialog schickt Verification-Code → Kundentelefon
6. Code eingeben → Aktivierung 24-48h
7. API Key notieren → wird für Make.com gebraucht
```

**WICHTIG:** Die Nummer kann danach nicht mehr als normale WhatsApp genutzt werden. Kunde muss eine neue oder dezidierte Nummer verwenden wenn er WhatsApp privat behalten will.

#### Schritt 2: Message Templates erstellen (für First Contact)

WhatsApp erlaubt nur vorher genehmigte Templates für erste Kontaktaufnahme:

```
Template 1: Angebots-Follow-up
Name: angebot_followup_3tage
Sprache: Deutsch
Kategorie: UTILITY

Text:
"Hallo {{1}},
wir haben vor ein paar Tagen ein Angebot an Sie geschickt – haben Sie alles bekommen?
Falls Sie Fragen haben oder wir etwas anpassen sollen, melden Sie sich einfach.
Herzliche Grüße,
{{2}}"

Variablen: {{1}} = Kundenname, {{2}} = Unternehmensname
```

```
Template 2: Bewertungsanfrage nach Termin
Name: bewertung_anfrage
Sprache: Deutsch
Kategorie: UTILITY

Text:
"Hallo {{1}},
vielen Dank für Ihren Besuch bei uns! 😊
Wie war Ihre Erfahrung? Wir würden uns sehr über eine kurze Bewertung freuen:
{{2}}
Das dauert nur 1 Minute – und hilft uns sehr!
Herzlichen Dank,
{{3}}"

Variablen: {{1}} = Name, {{2}} = Google Review Link, {{3}} = Unternehmensname
```

```
Template 3: Termin-Erinnerung
Name: termin_erinnerung_24h
Sprache: Deutsch
Kategorie: UTILITY

Text:
"Hallo {{1}},
wir erinnern freundlich an Ihren Termin morgen:

📅 {{2}} um {{3}} Uhr
📍 {{4}}

Falls Sie absagen oder umbuchen möchten: {{5}}

Wir freuen uns auf Sie!
{{6}}"

Variablen: Datum, Uhrzeit, Adresse, Umbuchungslink, Unternehmensname
```

**Templates einreichen:** Dashboard → Templates → Submit for Review
**Wartezeit:** 24-72h Freigabe durch Meta

#### Schritt 3: Make.com Flows einrichten

**Flow 1: Angebots-Follow-up (3 Tage nach Angebotsversand)**

```
Trigger: Webhook (wenn Angebot aus eurem System verschickt wird)
ODER: Google Sheets Zeile hinzugefügt (wenn Angebot manuell geloggt wird)

Schritte:
1. Warte 3 Tage (Delay Modul: 72h)
2. Check: Hat Kunde geantwortet? (Filter: Status ≠ "beantwortet")
3. Wenn nein: WhatsApp Template senden via 360dialog API
4. Log in Google Sheets: "Follow-up 1 gesendet" + Timestamp

Flow 2: 7 Tage später
1. Trigger: Gleicher Webhook aber 7 Tage Delay
2. Check: Status noch immer offen?
3. Wenn ja: Email Follow-up + WhatsApp (andere Message)
```

**Flow 2: Bewertungsanfrage nach Termin**

```
Trigger: Neuer abgeschlossener Termin in Google Calendar
(Erkennungsmerkmal: Event-Titel enthält "[ERLEDIGT]" oder spezifischen Tag)

Alternativ: Webhook von Kassen-/Buchungssystem

Schritte:
1. 2h nach Termin-Ende: WhatsApp Template "bewertung_anfrage" senden
2. Log in Google Sheets

Wenn kein Google Calendar Trigger möglich:
→ Kunde loggt abgeschlossene Termine manuell in Google Sheet
→ Make.com hört auf neue Zeilen in diesem Sheet
```

**Flow 3: Termin-Erinnerungen**

```
Trigger: Neuer Termin gebucht in Cal.com → Webhook zu Make.com

Schritte:
1. Sofort: Bestätigungs-WhatsApp senden
2. 48h vorher: Erinnerungs-WhatsApp (Template termin_erinnerung_24h)
3. 24h vorher: SMS via Twilio (optional)
4. 3h vorher: Letzte WhatsApp mit Umbuchungslink
```

**Make.com Module die du brauchst:**
- HTTP Module (für 360dialog API Calls)
- Google Sheets (für Logging)
- Google Calendar (für Trigger)
- Delay / Sleep (für zeitversetztes Senden)
- Filter (für Bedingungen)

---

## MODUL 3: TERMINBUCHUNG EINRICHTEN

### Tool: Cal.com (self-hosted auf Hetzner)

#### Schritt 1: Neuen User in Cal.com anlegen

```
SSH: ssh root@[Hetzner IP]
Navigiere zur Cal.com Installation

Cal.com CLI:
yarn workspace @calcom/prisma db-seed-user \
  --email "[kunde@example.de]" \
  --name "[Kundenname]" \
  --password "[sicheres-passwort]"
```

Alternativ über Admin-Interface:
```
1. Login als Admin auf cal.aigrowthsystem.de
2. Admin → Users → Invite User
3. Kundendaten eingeben
4. User erhält Setup-Link per Email
```

#### Schritt 2: Event Types konfigurieren

Im Cal.com Interface des Kunden:
```
1. "New Event Type" erstellen
2. Typ: "[Erstgespräch / Beratungstermin / etc.]"
3. Dauer: [aus Onboarding-Fragebogen]
4. Verfügbarkeit: [Öffnungszeiten aus Fragebogen]
5. Buffer: 15min nach jedem Termin (für Nachbereitung)
6. Max. Buchungen pro Tag: [aus Fragebogen]
7. Mindest-Vorlaufzeit: 24h (damit Kunden nicht auf Knopfdruck Termine buchen)
```

#### Schritt 3: Google Calendar / Outlook verbinden

```
Cal.com → Settings → Integrations → Calendar

Google Calendar:
1. "Connect Google Calendar"
2. OAuth Flow → Google Account des Kunden
3. Primären Kalender wählen
4. Conflict Check aktivieren (verhindert Doppelbuchungen)

Outlook:
1. "Connect Office 365"
2. Microsoft Account → OAuth
3. Kalender auswählen
```

#### Schritt 4: Buchungsseite anpassen

```
Cal.com → Event Type → Edit → Appearance
- Logo hochladen (Kundenlogo)
- Unternehmensname eingetragen
- Beschreibung der Buchungsseite
- Bestätigungs-Email-Text anpassen

Booking URL: cal.aigrowthsystem.de/[kundenname]/erstgespraech
Oder Custom Domain: cal.[kundenwebsite.de] (falls gewünscht)
```

#### Schritt 5: Webhook zu Make.com einrichten

```
Cal.com → Event Type → Integrations → Webhooks
URL: https://hook.eu1.make.com/[WEBHOOK-ID]
Events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED

Dieser Webhook triggert Make.com Flow 3 (Erinnerungen)
```

---

## MODUL 4: GOOGLE REVIEWS AUTOMATISIERUNG

### Tool: Make.com + 360dialog WhatsApp

#### Schritt 1: Google Review Link vorbereiten

```
1. Kunden-Google Business Profil aufrufen
2. In der Verwaltungsoberfläche: "Mehr" → "Link teilen"
3. Kurzen Review-Link kopieren:
   Sieht so aus: https://g.page/r/XXXXXXXXXX/review
4. Diesen Link in Make.com Template hinterlegen
```

#### Schritt 2: Make.com Flow für Review-Anfragen

Dieser Flow läuft aus Modul 2 Flow 2 heraus (nach Termin-Abschluss):

```
Erweiterung des Bewertungs-Flows:

Wenn Kunde auf Bewertungsanfrage antwortet mit 1-3 (intern):
→ Interne Nachricht an Unternehmer mit Feedback
→ KEIN Google-Link (schlechte Reviews abfangen)

Wenn Kunde antwortet mit 4-5 oder "gut" / "super" / "danke" etc.:
→ Sofort: "Freut mich! Dürfen wir Sie um eine kurze Google-Bewertung bitten?"
→ Google Review Link senden

Wenn keine Antwort nach 24h:
→ Einmal freundliche Erinnerung
→ Danach: abschließen, nicht nerven
```

**Sentiment-Check (einfach):**
```
Make.com: Text Parser Modul
Keywords für positiv: "gut", "super", "toll", "prima", "ja", "gerne", "4", "5"
Keywords für negativ: "nicht gut", "schlecht", "enttäuscht", "nein", "3", "2", "1"
Neutral / keine Antwort: Einmal Nachfassen, dann stopp
```

#### Schritt 3: Monitoring

```
Jeden Monat prüfen:
1. Google Business → Statistiken → Bewertungen
2. Anzahl neue Reviews (vorher/nachher)
3. Durchschnittsbewertung Entwicklung
4. Google Maps Ranking für Haupt-Keyword prüfen
   Tool: Lokal.ly oder manuell suchen in Inkognito-Modus
```

---

## MODUL 5: LEAD SCRAPING (nur Complete Paket)

### Tool: Apollo.io + Google Maps Scraper

#### Schritt 1: Zielgruppe definieren

```
Basierend auf Kundenprofil und Onboarding:

Template für Apollo.io Suche:
- Industry: [Branche des Zielkunden]
- Employee Count: 1-20 (Micro-Businesses)
- Location: [Zielregion aus Fragebogen]
- Keywords: [Branchenspezifisch]

Beispiel Zahnarzt sucht Privatpatienten:
→ nicht sinnvoll (B2C, kein Tool)
Beispiel Unternehmensberater sucht KMU-Kunden:
→ Apollo.io: Industry "SMB", Location "München Radius 50km"
```

#### Schritt 2: Google Maps Scraping für lokale Unternehmen

```
Für unser Outreach (neue Kunden für AI Growth System):

Script: /root/projects/ai-growth-system/scripts/lead-scraper.py
Benötigt: Google Places API Key

Ausführen:
python3 lead-scraper.py \
  --query "Zahnarzt" \
  --location "München" \
  --radius 20000 \
  --output zahnarzt-muenchen.csv

Output: CSV mit Name, Adresse, Telefon, Website, Bewertungen, Email (falls vorhanden)
```

#### Schritt 3: Email-Anreicherung

```
Falls Email fehlt:
1. Hunter.io: Domain eingeben → findet Pattern (info@, name@, etc.)
2. Apollo.io: Company search → Email verify
3. Manuell: Website durchsuchen nach Impressum/Kontakt

DSGVO-Note: Nur Business-Emails verwenden.
Private Emails (Gmail, etc.) niemals für Cold Outreach.
```

---

## QUALITÄTSSICHERUNG VOR GO-LIVE

### Test-Checkliste (muss vollständig abgehakt sein)

**Chatbot:**
- [ ] 10 verschiedene Fragen gestellt, alle sinnvoll beantwortet
- [ ] Terminanfrage → leitet zum Cal.com Link
- [ ] Unbekannte Frage → keine Fantasie-Antwort
- [ ] Auf Mobilgerät getestet
- [ ] Ladezeit unter 3 Sekunden

**WhatsApp:**
- [ ] Test-Nachricht erfolgreich über 360dialog geschickt
- [ ] Template-Nachrichten freigegeben von Meta
- [ ] Abmelde-Funktion funktioniert
- [ ] Keine doppelten Nachrichten (Make.com Filter prüfen)

**Terminbuchung:**
- [ ] Termin von Testperson gebucht
- [ ] Erscheint in Kunden-Kalender
- [ ] Bestätigungs-Email geht an Bucher
- [ ] Erinnerungs-WhatsApp getestet (manuell getriggert)
- [ ] Umbuchung funktioniert
- [ ] Stornierung funktioniert

**Google Reviews:**
- [ ] Test-Durchlauf: Manuell Flow getriggert
- [ ] WhatsApp mit Review-Link angekommen
- [ ] Link öffnet direkt Google Review-Formular

**Make.com:**
- [ ] Alle Flows aktiv (nicht pausiert)
- [ ] Error-Handling konfiguriert (Email bei Fehler an support@aigrowthsystem.de)
- [ ] Operationen reichen für den Monat (nicht ausgeschöpft)

---

## ÜBERGABE AN KUNDEN (30-Minuten-Call)

### Was du im Call zeigst:

**Teil 1: Das Dashboard (5 Minuten)**
```
Zeige Make.com History: "Hier sehen Sie alle Nachrichten die automatisch rausgegangen sind"
Zeige Cal.com: "Hier sehen Sie alle Buchungen"
Zeige Google Business: "Hier sehen Sie die Bewertungen"
```

**Teil 2: Was der Kunde tun muss (10 Minuten)**
```
Abgeschlossene Termine tracken: [Je nach Workflow]
Was tun bei falschen Chatbot-Antworten: "Screenshot machen und uns schicken"
Was tun bei WhatsApp-Beschwerden: "Weiterleiten an uns"
```

**Teil 3: Fragen beantworten (15 Minuten)**

### Übergabe-Dokument für Kunden:
→ Schicke personalisierte Version von /docs/onboarding-neukunde.md

---

## MONATLICHE WARTUNG

### Was jeden Monat zu tun ist:

```
[ ] Make.com Operationen prüfen → genug für nächsten Monat?
[ ] 360dialog Rechnung prüfen
[ ] Chatbot-Logs durchsehen → neue häufige Fragen? → Wissensbasis updaten
[ ] Google Reviews des Kunden prüfen → negative Reviews eskalieren
[ ] Cal.com prüfen → läuft stabil?
[ ] Monatsbericht erstellen und an Kunden schicken
[ ] Kurzes Check-in mit Kunden (Email oder 10-min Call)
```

---

## TROUBLESHOOTING: Häufige Probleme

### WhatsApp Nachrichten kommen nicht an
```
1. 360dialog Dashboard → API Logs prüfen
2. Fehlermeldung lesen (403 = Template nicht genehmigt, 429 = Rate Limit)
3. Falls Template abgelehnt: Neu formulieren, weniger werblich
4. Falls Rate Limit: Nachrichten über mehr Zeit verteilen
```

### Chatbot antwortet falsch
```
1. Voiceflow → Conversations → Konversation anschauen
2. Wissensbasis-Dokument updaten
3. Claude System Prompt anpassen
4. Re-Test
```

### Make.com Flow läuft nicht
```
1. Make.com → History → Fehlerhafte Runs anschauen
2. Häufige Ursachen: Webhook-URL geändert, API Key abgelaufen, Operationen aufgebraucht
3. Bei Operationen aufgebraucht: Plan upgraden oder auf nächsten Monat warten
```

### Cal.com Termine erscheinen nicht im Kalender
```
1. Cal.com → Settings → Connected Calendars
2. Google Calendar: Token abgelaufen? → Neu verbinden
3. Doppelbuchungs-Check: Kalender ist als "primary" markiert?
```

---

## KOSTEN-TRACKING PRO KUNDE

Trage für jeden Kunden in die interne Tabelle ein:

```
Kunde: [Name]
Startdatum: [Datum]
Paket: Starter (997€) / Standard (1.297€) / Complete (1.497€)

Monatliche Tool-Kosten:
- Voiceflow: [X]€
- 360dialog: [X]€ (nach Nachrichtenvolumen)
- Make.com: [X]€ (anteilig)
- Cal.com Hosting: ~5€ (geteilt auf alle Kunden)
- Claude API: [X]€ (nach Usage)
- Gesamt: [X]€

Marge: [Preis] - [Kosten] = [€] / Monat
```

---

*AI Growth System | Tech Stack Setup-Guide v1.0 | Intern | Trinity*
