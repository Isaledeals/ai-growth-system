# Kunden-Onboarding Guide
**AI Growth System | Internes Dokument | Trinity**

---

## Übersicht

Dieses Dokument beschreibt den vollständigen Onboarding-Prozess für neue Kunden des AI Growth Systems — von der Unterzeichnung bis zum Go-Live in 7 Werktagen.

**Dauer:** 5-7 Werktage
**Aufwand für den Kunden:** 2-3 Stunden gesamt
**Aufwand für uns:** ~6-8 Stunden Setup-Zeit

---

## Phase 1: Vertragsabschluss & Kick-off (Tag 0-1)

### Schritt 1: Vertrag & Zahlung
- [ ] Vertrag digital unterzeichnen (DocuSign oder einfaches PDF)
- [ ] Setup-Fee (500€ einmalig) eingegangen bestätigen
- [ ] Erstes Abo-Monat vorab
- [ ] Willkommens-Email an Kunden senden

### Schritt 2: Willkommens-Email an den Kunden

Betreff: Herzlich willkommen! Hier sind die nächsten Schritte.

---

Hallo [Vorname],

willkommen an Bord! Wir freuen uns darauf, Ihr Wachstumssystem in den nächsten 7 Tagen einzurichten.

Was jetzt passiert:
1. Sie erhalten heute noch unser Onboarding-Formular (dauert 10 Minuten)
2. Wir richten alles technisch ein — ohne Ihr Zutun
3. In 5-7 Werktagen ist Ihr System live

Nächster Schritt: Bitte füllen Sie das Onboarding-Formular aus.
[Link zum Formular]

Bei Fragen: Einfach antworten oder [Telefon].

[Name]

---

### Schritt 3: Onboarding-Formular versenden (Typeform oder Notion Form)

Fragen im Formular:
1. Firmenname & Website-URL
2. Hauptkontakt: Name, Email, Telefon
3. Google Business Profil URL (falls vorhanden)
4. Welche Kanäle nutzen Sie aktuell? (WhatsApp Business, Email, Telefon, Facebook, Instagram)
5. Welches Kalender-System nutzen Sie? (Google Calendar, Outlook, Papier, anderes)
6. Was ist Ihre häufigste Kundenanfrage? (Freitext)
7. Wie viele Anfragen bekommen Sie pro Woche ungefähr?
8. Gibt es Informationen die der Chatbot NICHT beantworten soll? (Preise, bestimmte Themen)
9. Wie klingt Ihre Marke? (Professionell/formell, Freundlich/locker, Nahbar/persönlich)
10. Logo + Farben (Upload)

---

## Phase 2: Technisches Setup (Tag 1-4)

### 2.1 Chatbot einrichten (Make.com + Claude)

**Was wir tun:**
- [ ] Unternehmensinformationen in System-Prompt einpflegen (basierend auf Formular)
- [ ] FAQ-Datenbank aufbauen (aus Website-Content + Formular)
- [ ] Chatbot-Persönlichkeit konfigurieren (Ton des Unternehmens)
- [ ] Fallback-Logik definieren (was passiert bei unbekannten Fragen)
- [ ] Test-Gespräche durchführen (min. 20 verschiedene Szenarien)

**Integrations-Punkte:**
- Website: Widget-Code (1 Zeile JavaScript)
- WhatsApp: 360dialog Webhook konfigurieren
- Facebook/Instagram: Meta Business Integration (optional)

**Übergabe-Szenarien (wenn menschlicher Agent nötig):**
- Preisverhandlungen > 20% Rabatt
- Beschwerden / unzufriedene Kunden
- Komplexe Spezialanfragen
- Notsituationen

---

### 2.2 Terminbuchung einrichten (Cal.com)

- [ ] Cal.com Account erstellen (oder bestehendes nutzen)
- [ ] Verfügbarkeiten mit Kunden abklären (welche Tage/Zeiten)
- [ ] Event-Types erstellen (z.B. "Erstgespräch 30min", "Besichtigung 60min")
- [ ] Google Calendar / Outlook Sync einrichten
- [ ] Bestätigungs-Emails anpassen (Branding)
- [ ] Erinnerungs-Sequenz aktivieren (24h + 2h vorher)
- [ ] Cal.com-Link in Chatbot integrieren

**Erinnerungs-Setup in Cal.com:**
- 48h vorher: Email-Erinnerung
- 24h vorher: WhatsApp via 360dialog
- 2h vorher: SMS (optional)
- Nach Termin: Automatische Bewertungs-Anfrage

---

### 2.3 WhatsApp Follow-up einrichten (360dialog + Make.com)

**Voraussetzungen:**
- [ ] Meta Business Konto des Kunden verifiziert
- [ ] WhatsApp Business Nummer aktiv
- [ ] 360dialog Account erstellt
- [ ] Message Templates bei Meta eingereicht und genehmigt

**Templates die wir einreichen:**

Template 1 — Angebotsbestätigung:
"Hallo {{1}}, vielen Dank für Ihre Anfrage. Ihr Angebot ist unterwegs! Haben Sie Fragen? Einfach hier antworten."

Template 2 — Angebots-Follow-up (3 Tage):
"Hallo {{1}}, kurze Erinnerung: Haben Sie das Angebot erhalten? Bei Fragen stehe ich gerne zur Verfügung. Soll ich einen Termin für Sie eintragen? {{2}}"

Template 3 — Bewertungs-Anfrage:
"Hallo {{1}}, wir hoffen alles hat gepasst! Falls Sie mögen, würden wir uns über eine kurze Bewertung freuen: {{2}} — das hilft uns sehr. Danke! 🙏"

Template 4 — Termin-Erinnerung:
"Hallo {{1}}, Erinnerung: Ihr Termin am {{2}} um {{3}} Uhr. Bis dann! Falls Sie verschieben müssen: {{4}}"

**Make.com Flows:**
- Flow A: Neue Anfrage → Chatbot → Qualifizierung → Termin
- Flow B: Angebot versendet → 3-Tage-Follow-up → 7-Tage-Follow-up
- Flow C: Termin gebucht → Erinnerungen → Nach-Termin-Bewertung
- Flow D: Monatliche Reaktivierung alter Kunden (60/90-Tage-Segmente)

---

### 2.4 Google Reviews Automation einrichten

- [ ] Google Business API Zugang einrichten (oder Zapier/Make Webhook)
- [ ] Review-Request Template erstellen und testen
- [ ] Versand-Trigger definieren: Wann geht die Anfrage raus?
  - Option A: 24h nach abgeschlossenem Termin (Cal.com Trigger)
  - Option B: Manueller Auslöser durch Kunden (Button in Dashboard)
  - Option C: WhatsApp-Eingang vom Kunden endet mit positivem Signal
- [ ] Negative-Review-Filter: Wenn Kunde "unzufrieden" signalisiert → intern weiterleiten, nicht Google

---

## Phase 3: Testing & Go-Live (Tag 5-6)

### 3.1 Interne Tests

**Chatbot-Tests:**
- [ ] 20 verschiedene Anfrage-Szenarien durchspielen
- [ ] Edge Cases testen (unhöfliche Nachrichten, Spam, Off-Topic)
- [ ] Terminbuchungs-Flow vollständig durchlaufen
- [ ] WhatsApp-Nachrichten erhalten und beantworten
- [ ] Review-Request-Link funktioniert

**Qualitäts-Checkliste:**
- [ ] Antworten klingen wie ein echter Mitarbeiter — nicht roboterhaft
- [ ] Keine falschen Informationen über das Unternehmen
- [ ] Übergabe an menschlichen Agent funktioniert
- [ ] Datenschutz: Keine sensiblen Daten gespeichert ohne Einwilligung
- [ ] DSGVO-konform: Opt-in für WhatsApp-Nachrichten vorhanden

---

### 3.2 Kunden-Abnahme (30 Minuten Call)

Agenda des Abnahme-Calls:
1. Live-Demo der gesamten Customer Journey (15 Minuten)
2. Fragen & Anpassungswünsche klären (10 Minuten)
3. Login-Daten und Zugänge übergeben (5 Minuten)

Was dem Kunden übergeben wird:
- [ ] Cal.com Login
- [ ] Make.com Beobachter-Zugang (optional — für Transparenz)
- [ ] Monthly Report Dashboard Link
- [ ] WhatsApp-Business Zugang (falls neu eingerichtet)
- [ ] Notfall-Kontakt für technische Probleme

---

### 3.3 Go-Live

- [ ] Widget auf Website des Kunden live schalten
- [ ] Ersten Live-Test durchführen
- [ ] Monitoring für erste 48 Stunden erhöhen
- [ ] Kunden-Update: "Ihr System ist live!" senden

---

## Phase 4: Laufende Betreuung

### Monatlicher Report (bis 5. des Folgemonats)

Enthält:
- Anzahl Chatbot-Gespräche
- Terminbuchungen über System
- Follow-up-Emails/WhatsApps versendet
- Neue Google-Bewertungen (Monat)
- Gesamtbewertungsstand
- Response-Rate auf Angebots-Follow-ups
- Empfehlungen für den nächsten Monat

### Monatlicher Check-in Call (30 Minuten)
- Zahlen besprechen
- Optimierungen vornehmen
- Neue Ideen & Wünsche aufnehmen
- Upsell-Möglichkeiten prüfen (zusätzliche Kanäle, Lead-Scraping etc.)

---

## Wichtige Kontakte & Tools (intern)

| Tool | Zweck | Account |
|------|-------|---------|
| Make.com | Workflow-Automatisierung | [Account-Link] |
| 360dialog | WhatsApp API | [Account-Link] |
| Cal.com | Terminbuchung | [Account-Link] |
| Claude API | AI Chatbot | [Account-Link] |
| Google Business API | Review-Anfragen | Pro Kunde |
| Brevo / Instantly | Email-Versand | [Account-Link] |

---

## FAQ: Was Kunden häufig fragen

**"Müssen wir selbst etwas einrichten?"**
Nein. Wir richten alles ein. Sie füllen das Onboarding-Formular aus (10 Minuten) und nehmen am Abnahme-Call teil. Das war's.

**"Was wenn der Chatbot eine Frage falsch beantwortet?"**
Wir trainieren ihn mit Ihren spezifischen Informationen. Wenn doch mal was nicht stimmt — einmal melden, wir korrigieren das innerhalb von 24 Stunden.

**"Was wenn ich das System nicht mehr möchte?"**
Monatlich kündbar. Keine Mindestlaufzeit (außer beim 6-Monats-Paket mit reduzierter Setup-Fee).

**"Kann ich das System selbst anpassen?"**
Für kleinere Änderungen (Verfügbarkeiten, Preise, Öffnungszeiten) ja, wir zeigen Ihnen wie. Größere Änderungen machen wir für Sie.

**"Ist das DSGVO-konform?"**
Ja. Alle Daten liegen auf EU-Servern. Wir stellen Ihnen eine Datenschutzerklärung und AV-Vertrag bereit.

---

*AI Growth System | Onboarding Guide | Trinity — letzte Aktualisierung 03.04.2026*
