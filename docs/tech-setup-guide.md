# Tech Setup Guide — AI Growth System
## Vollständige Einrichtungs-Anleitung für jeden neuen Kunden

**Version:** 1.0 | April 2026  
**Zielgruppe:** Internes Team (Setup-Techniker)  
**Geschätzte Setup-Zeit:** 5-7 Stunden pro Neukunde

---

## ÜBERSICHT: TOOLS & ACCOUNTS

| Tool | Zweck | Kosten/Monat | Account |
|------|-------|-------------|---------|
| Make.com | Automatisierungs-Backbone | 9-29€ (geteilt) | 1 Master-Account |
| 360dialog | WhatsApp Business API | 49€/Kunde | Pro Kunde 1 Kanal |
| Cal.com (Self-hosted) | Terminbuchung | ~5€ Server | Hetzner, 1 Instanz |
| Claude API | AI Chatbot Engine | ~20-40€/Kunde | 1 API Key |
| Brevo | Email Sequences | 0-25€ | 1 Master-Account |
| HubSpot | CRM (Growth/Pro) | 0€ Free | Pro Kunde 1 Pipeline |
| Apollo.io | Lead Scraping (Pro) | 49€ | 1 Master-Account |

---

## MODUL 1: WHATSAPP BUSINESS API SETUP

### 1.1 Meta Business Account

**Voraussetzungen:**
- Kundenname und Firmenadresse
- Offizielle Website des Kunden
- Handynummer die noch NICHT mit WhatsApp verknüpft ist (oder verifizierte Geschäftsnummer)

**Schritte:**
1. Gehe zu business.facebook.com → "Konto erstellen"
2. Firmenname eintragen (offizieller Name!)
3. Business-Kategorie wählen (passend zur Branche)
4. Website-URL eintragen
5. E-Mail-Adresse des Kunden für Verifizierung

**Wichtig:** Meta verifiziert Business Accounts — das dauert 1-3 Werktage. Immer sofort nach Intake-Gespräch starten!

### 1.2 360dialog Account einrichten

**Setup:**
1. Gehe zu hub.360dialog.com → "Add WABA Channel"
2. Facebook Business Manager verbinden
3. Nummer einreichen (muss per SMS verifizierbar sein)
4. WhatsApp Business Profile einrichten:
   - Profilbild: Kundenlogo (min. 640x640px)
   - Firmenname
   - Beschreibung (max. 256 Zeichen)
   - Email + Website eintragen
5. API Key generieren → in Make.com eintragen

**WhatsApp Message Templates einrichten:**
Templates müssen von Meta vorab genehmigt werden (24-48h). Immer frühzeitig einreichen!

```
Template 1: appointment_reminder_24h
"Hallo {{1}}, wir erinnern Sie an Ihren Termin bei {{2}} morgen um {{3}} Uhr. 
Änderungen oder Absagen: {{4}}"

Template 2: review_request
"Hallo {{1}}, danke für Ihren Besuch bei {{2}}! 
Wenn Sie kurz Zeit haben: Hier können Sie uns bewerten: {{3}} 
Das hilft uns sehr — herzlichen Dank!"

Template 3: offer_followup
"Hallo {{1}}, ich wollte kurz nachfragen ob Sie Fragen zu unserem Angebot haben. 
Gerne bin ich für Sie da: {{2}}"

Template 4: welcome_new_lead
"Hallo {{1}}, danke für Ihre Anfrage bei {{2}}! 
Wir melden uns innerhalb von {{3}} bei Ihnen. 
Für dringende Fragen: {{4}}"
```

---

## MODUL 2: MAKE.COM AUTOMATISIERUNGEN

### 2.1 Master-Template klonen

Wir haben 4 Branche-Templates vorbereitet:
- `template-zahnarzt.json`
- `template-kosmetik.json`
- `template-makler.json`
- `template-handwerk.json`

**Klonen:**
1. Make.com öffnen → Templates Ordner
2. Passendes Template → "Clone Scenario"
3. Umbenennen: "[Kundenname] - [Branche] - Main Flow"
4. Alle Variablen ersetzen (siehe Abschnitt 2.2)

### 2.2 Kunden-Variablen ersetzen

In jedem geklonten Scenario folgende Werte ersetzen:

```
CUSTOMER_NAME = "Max Mustermann"
COMPANY_NAME = "Mustermann Zahnarzt GmbH"
COMPANY_PHONE = "+49 89 1234567"
COMPANY_EMAIL = "info@mustermann-zahnarzt.de"
WHATSAPP_NUMBER = "+49 89 1234567"
CAL_LINK = "https://cal.aigrowthsystem.de/mustermann"
GOOGLE_REVIEW_LINK = "https://g.page/r/xxx/review"
HUBSPOT_PIPELINE_ID = "xxxxxxx"
INDUSTRY = "zahnarzt"
```

### 2.3 Kern-Flows (für jede Branche)

**Flow 1: Neue WhatsApp-Anfrage → AI Antwort**
```
Trigger: 360dialog Webhook (neue Nachricht)
↓
Filter: Ist es eine neue Konversation? (ja/nein)
↓
IF JA:
  → Claude API: Nachricht analysieren + antworten
  → Lead in HubSpot erstellen
  → Wenn Termin gewünscht: Cal.com Link senden
  → Interne Benachrichtigung an Inhaber

IF NEIN (Follow-up):
  → Claude API: Kontext lesen + antworten
  → HubSpot: Konversation updaten
```

**Flow 2: Termin gebucht (Cal.com) → Bestätigung + Erinnerungen**
```
Trigger: Cal.com Webhook (booking.created)
↓
→ WhatsApp: Buchungsbestätigung senden (sofort)
→ HubSpot: Deal erstellen / updaten
→ Schedule: WhatsApp-Erinnerung 48h vor Termin
→ Schedule: WhatsApp-Erinnerung 24h vor Termin
→ Schedule: WhatsApp-Erinnerung 2h vor Termin
```

**Flow 3: Termin abgeschlossen → Review Request**
```
Trigger: Google Calendar Event endet (oder manueller Trigger)
       ODER: Cal.com no-show? 
↓
Wait: 2 Stunden
↓
→ WhatsApp: Review-Request Template senden
→ Wait: 3 Tage
→ IF kein Review: Email-Follow-up senden (Brevo)
→ HubSpot: Deal auf "Abgeschlossen" setzen
```

**Flow 4: Angebot nachfassen (Handwerk/Makler)**
```
Trigger: Manueller Input ODER HubSpot Deal created (Stage: "Angebot gesendet")
↓
Wait: 3 Tage
→ WhatsApp: "Haben Sie Fragen zu unserem Angebot?"
↓
Wait: 4 weitere Tage (Tag 7)
→ IF keine Antwort: Email via Brevo
↓
Wait: 7 weitere Tage (Tag 14)
→ IF keine Antwort: Letzte WhatsApp ("Gilt das Angebot noch?")
↓
Wait: 30 Tage (Reaktivierung)
→ IF noch kein Auftrag: "Haben sich Ihre Pläne geändert?"
```

**Flow 5: Bestandskunden-Reaktivierung (Handwerk/Kosmetik)**
```
Trigger: Scheduled (1x/Monat)
↓
HubSpot: Kunden filtern (letzter Kontakt > 90 Tage)
↓
FOR EACH Kunde:
  → Personalisierte WhatsApp basierend auf Branche + Jahreszeit
  → HubSpot: Letzten Kontakt updaten
```

### 2.4 Claude API Prompt-Templates

**Basis-Prompt (gilt für alle Branchen):**

```
Du bist ein freundlicher, professioneller Kundenservice-Assistent für {{COMPANY_NAME}}.

ÜBER DAS UNTERNEHMEN:
- Name: {{COMPANY_NAME}}
- Branche: {{INDUSTRY}}
- Dienstleistungen: {{SERVICES_LIST}}
- Öffnungszeiten: {{OPENING_HOURS}}
- Standort: {{ADDRESS}}
- Terminbuchung: {{CAL_LINK}}
- Telefon: {{PHONE}}

DEINE AUFGABE:
1. Beantworte Kundenfragen freundlich und hilfreich
2. Wenn der Kunde einen Termin will → schick den Buchungs-Link
3. Wenn du etwas nicht weißt → sag "Ich verbinde Sie mit unserem Team"
4. Halte Antworten kurz (max 3-4 Sätze)
5. Sprich den Kunden mit Vornamen an wenn bekannt
6. Immer auf Deutsch antworten

NICHT TUN:
- Keine Preise nennen die du nicht kennst
- Keine Diagnosen stellen (Ärzte/Kosmetik)
- Keine Versprechungen machen über Ergebnisse

AKTUELLE KUNDENANFRAGE:
{{USER_MESSAGE}}

KONVERSATIONS-HISTORIE:
{{CONVERSATION_HISTORY}}
```

---

## MODUL 3: CAL.COM SETUP (SELF-HOSTED)

### 3.1 Hetzner Server Setup

Cal.com läuft auf unserem zentralen Hetzner Server (bereits installiert).

**Neuen Kunden anlegen:**

```bash
# SSH zum Hetzner Server
ssh root@[HETZNER-IP]

# Cal.com Admin Panel öffnen
# https://cal.aigrowthsystem.de/admin

# Neuen User anlegen:
# Email: [kundenname]@aigrowthsystem.de
# Passwort: Generieren und sicher speichern
```

**Via Admin-Panel:**
1. Cal.com Admin → Users → "Add User"
2. User anlegen: `[slug]@aigrowthsystem.de` (z.B. `mueller-zahnarzt@aigrowthsystem.de`)
3. Booking Slug setzen: `mueller-zahnarzt`
4. Event Types einrichten (Beratungsgespräch, Folgetermin, etc.)

### 3.2 Kunden-Kalender konfigurieren

**Google Calendar verbinden:**
1. Login mit Kunden-Account
2. Integrations → Google Calendar → Connect
3. Kalender-Zugang mit Kunde gemeinsam einrichten (Google-Login nötig)
4. Primären Kalender auswählen

**Availability einstellen:**
- Öffnungszeiten aus Intake-Formular übernehmen
- Pufferzeit: 15 Min nach jedem Termin (verhindert direkte Doppelbuchungen)
- Maximale Buchungen pro Tag: je nach Branche (Zahnarzt: 8, Kosmetik: 6, Makler: 4)

**Booking Form anpassen:**
```
Pflichtfelder:
- Name (Vorname + Nachname)
- Telefonnummer (für WhatsApp-Erinnerung)
- Email (für Email-Bestätigung)
- Anliegen (kurze Beschreibung)

Optional je Branche:
- Zahnarzt: "Privat- oder Kassenpatient?"
- Kosmetik: "Welche Behandlung interessiert Sie?"
- Makler: "Kaufen oder verkaufen?"
```

**Automatische Bestätigungs-Email:**
- Subject: "Ihr Termin bei {{Firmenname}} am {{Datum}}"
- Reply-To: Kunden-Email einstellen

---

## MODUL 4: HUBSPOT CRM SETUP

### 4.1 Account einrichten (Free Tier)

1. HubSpot.com → "Get started free"
2. Firmenname: "[Kundenname] via AI Growth System"
3. Email des Kunden als Admin-Email
4. Branche auswählen

**Wichtig:** Free Tier reicht für die meisten Kunden aus!

### 4.2 Pipeline konfigurieren

**Standard Deal Stages:**
```
Neue Anfrage (0%)
  ↓
Qualifiziert (20%)
  ↓
Demo/Beratung gebucht (40%)
  ↓
Angebot gesendet (60%)
  ↓
Verhandlung (80%)
  ↓
Gewonnen (100%)
  ↓
Verloren (0%)
```

**Branchenspezifische Anpassungen:**

*Zahnarzt:*
```
Neue Anfrage → Termin gebucht → Erstuntersuchung → Behandlungsplan → Patient
```

*Kosmetik:*
```
Neue Anfrage → Beratung gebucht → Ersttermin → Stammkunde
```

*Makler:*
```
Lead → Qualifiziert → Besichtigung → Angebot → Verhandlung → Unterschrift
```

### 4.3 Make.com Integration

HubSpot API Key holen:
1. HubSpot → Settings → Integrations → API Key
2. Key kopieren
3. In Make.com: Connections → HubSpot → API Key eintragen

---

## MODUL 5: BREVO EMAIL SETUP

### 5.1 Account & Sending Domain

**Eigene Sending Domain einrichten (PFLICHT für hohe Zustellrate):**

```
Domain: mail.aigrowthsystem.de  (NICHT die Haupt-Domain!)
        oder: outreach.aigrowthsystem.de

DNS Records hinzufügen (in Hetzner DNS oder Cloudflare):
- SPF: "v=spf1 include:sendinblue.com ~all"
- DKIM: [Von Brevo generiert]
- DMARC: "v=DMARC1; p=none; rua=mailto:dmarc@aigrowthsystem.de"
```

**Domain Warmup (PFLICHT für neue Domains!):**
- Woche 1: Max 50 Emails/Tag
- Woche 2: Max 200 Emails/Tag
- Woche 3: Max 1.000 Emails/Tag
- Woche 4+: Unbegrenzt (mit gesunder Bounce-Rate)

### 5.2 Email-Sequenzen einrichten

**Neue Kampagne für jeden Kunden:**
1. Brevo → Automation → "Create Automation"
2. Template auswählen (basierend auf Branche)
3. Sender-Name: "[Mitarbeitername] von [Firmenname]" (persönlich!)
4. Reply-To: Kunden-Email (damit Antworten direkt ankommen)

**Wichtige Einstellungen:**
- Versandzeit: Di-Do, 9:00 Uhr oder 13:00 Uhr (höchste Open Rates)
- Kein Versand am Montag (voller Posteingang) oder Freitag (Wochenend-Mindset)
- Unsubscribe-Link: PFLICHT (DSGVO!)

---

## MODUL 6: GOOGLE REVIEW LINK GENERIEREN

**Place ID finden:**

```
1. Google Maps öffnen
2. Firmennamen suchen
3. URL kopieren: https://www.google.com/maps/place/.../@...
4. ODER: https://developers.google.com/maps/documentation/places/web-service/place-id
   → "Find Place ID" eingeben
5. Place ID sieht aus wie: ChIJxxxxxxxxxxxxxxxx
```

**Review-Link generieren:**
```
https://search.google.com/local/writereview?placeid=[PLACE_ID]

Beispiel:
https://search.google.com/local/writereview?placeid=ChIJxxxxxxxxxxxxxxxx
```

**In WhatsApp Template einfügen:**
- Link in Template Variable {{3}} eintragen
- URL-Shortener nutzen für bessere Darstellung (bit.ly oder eigene Domain)

---

## CHECKLISTE: VOLLSTÄNDIGES SETUP

### Vor dem Kundengespräch
- [ ] Intake-Formular ausgefüllt und zurückbekommen
- [ ] Meta Business Account Antrag gestartet (braucht Zeit!)
- [ ] Branche-Template identifiziert

### Tag 1-2: Accounts & APIs
- [ ] 360dialog Kanal erstellt
- [ ] WhatsApp Business Profile eingerichtet
- [ ] Message Templates eingereicht (warte auf Genehmigung)
- [ ] Cal.com User erstellt + Slug vergeben
- [ ] HubSpot Account + Pipeline eingerichtet
- [ ] HubSpot API Key gespeichert
- [ ] Brevo Sending-Domain eingerichtet (DNS Records!)

### Tag 3-4: Make.com Flows
- [ ] Branche-Template geklont
- [ ] Alle Kunden-Variablen ersetzt
- [ ] Flow 1: WhatsApp-Anfrage → AI Antwort — TEST BESTANDEN
- [ ] Flow 2: Termin gebucht → Erinnerungen — TEST BESTANDEN
- [ ] Flow 3: Termin vorbei → Review Request — TEST BESTANDEN
- [ ] Flow 4: Angebot Nachfass (wenn relevant) — TEST BESTANDEN
- [ ] Claude Prompt mit Kunden-Infos befüllt

### Tag 5: Cal.com Konfiguration
- [ ] Google Calendar verbunden + Sync getestet
- [ ] Verfügbarkeiten eingestellt
- [ ] Booking Form angepasst
- [ ] Test-Buchung durchgeführt → Bestätigung erhalten?
- [ ] Make.com Webhook getriggert? ✓

### Tag 6: Brevo Email-Sequenz
- [ ] Email-Template für Branche ausgewählt
- [ ] Sender-Name personalisiert
- [ ] Automation eingerichtet
- [ ] Test-Email an eigene Adresse gesendet → Formatting ok?
- [ ] DKIM/SPF/DMARC validiert (mxtoolbox.com)

### Tag 7: Übergabe
- [ ] Vollständiger End-to-End Test mit Kundenhandy
- [ ] Dashboard-Zugang an Kunden übergeben
- [ ] Kunden-Onboarding Dokument gesendet
- [ ] Ersten Check-in Termin vereinbart (Woche 2)
- [ ] Intern: Kunden-Mappe mit allen Zugangsdaten speichern (sicher!)

---

## TROUBLESHOOTING — HÄUFIGE PROBLEME

### WhatsApp Template abgelehnt
- Meta lehnt oft Templates ab die zu "salesy" klingen
- Lösung: Template neutral formulieren, Markenname entfernen, erneut einreichen
- Kontakt: 360dialog Support (reagiert innerhalb 24h)

### Make.com Webhook kommt nicht an
- 360dialog Webhook URL prüfen (https, kein Trailing Slash)
- Make.com Scenario ist aktiv? (grüner Schalter)
- Test: Manuell eine WhatsApp an die Nummer schicken → Logs checken

### Cal.com Buchungen tauchen nicht in Google Calendar auf
- Google OAuth Token abgelaufen → neu verbinden
- Kalender-Sync Interval: Auf "Real-time" setzen (statt 15 Min)

### Brevo Emails landen im Spam
- Domain Warmup nicht abgeschlossen → Warten und kleinere Batches
- DMARC Policy zu streng → Erst `p=none` setzen, dann nach 2 Wochen `p=quarantine`
- Content prüfen: Zu viele Links? Spam-Wörter? ("kostenlos", "JETZT", etc.)

### HubSpot + Make.com Verbindung bricht ab
- API Key ggf. abgelaufen → Neu generieren + in Make.com updaten
- HubSpot Free: Rate Limits beachten (100 Calls/10 Sekunden)

---

## INTERNE DOKUMENTATION

**Nach jedem Setup speichern in /root/projects/ai-growth-system/clients/[kundenname]/:**

```
clients/
  mueller-zahnarzt/
    ├── intake-form.md          (ausgefülltes Formular)
    ├── credentials.md          (ALLE Zugangsdaten — verschlüsselt!)
    ├── make-scenario-ids.txt   (Scenario IDs in Make.com)
    ├── cal-slug.txt            (z.B. "mueller-zahnarzt")
    ├── google-place-id.txt
    ├── setup-notes.md          (Was war besonders? Probleme? Lösungen?)
    └── checklist-done.md       (abgehakte Checkliste)
```

**Passwort-Management:**
- ALLE Passwörter in Bitwarden (Team-Account) speichern
- Kundenpasswörter NIEMALS in Klartext in Git speichern
- Separate Bitwarden-Collection pro Kunde

---

*AI Growth System | Tech Setup Guide v1.0 | April 2026 | Internes Dokument*
