# Tech Stack — AI Growth System

## Architektur-Übersicht

```
Kundenanfrage (WhatsApp / Website Widget)
        ↓
   Make.com Orchestration
        ↓
   Claude API (AI Chatbot)
        ↓
   HubSpot CRM (Lead Storage)
        ↓
   Cal.com (Terminbuchung)
        ↓
   Google Business API (Review Request)
        ↓
   Email/WhatsApp Follow-up Sequenz
```

---

## Komponenten im Detail

### 1. Chatbot Layer

**Tool**: Make.com + WhatsApp Business API + Claude API

- WhatsApp Business API: Meta Cloud API (kostenlos für erste 1.000 Nachrichten/Monat)
- Make.com: Orchestrierung aller Flows — Template pro Kundenbranche
- Claude API (Haiku): Antworten generieren, Leads qualifizieren
  - Kosten: ~3-5€/Kunde/Monat bei 100-200 Chats

**System Prompt Template (anpassbar pro Branche)**:
"Du bist die digitale Assistentin von [FIRMENNAME]. Du bist freundlich, professionell und hilfreich. Deine Aufgabe ist es, Kundenanfragen sofort zu beantworten, den Bedarf zu qualifizieren und einen Termin zu vereinbaren. Antworte immer auf Deutsch. Bei komplexen Fragen sage: 'Ich leite das direkt an [Inhaber-Name] weiter.'"

### 2. CRM & Follow-up

**Tool**: HubSpot Free + Make.com Automation

- Jeder neue Lead → automatisch in HubSpot
- Follow-up Sequenz: 3 automatische WhatsApp/Email Nachrichten über 7 Tage
- Erinnerungen für gebuchte Termine (-24h, -1h)
- After-Appointment: Review Request nach 2h

### 3. Terminbuchung

**Tool**: Cal.com (self-hosted auf Hetzner VPS)

- Jeder Kunde bekommt eigenen Kalender (slug: cal.com/[kundenname])
- Integration: WhatsApp-Bot schickt direkt Cal.com Link
- Sync mit Google Calendar des Kunden
- SMS/WhatsApp Erinnerungen automatisch
- Kosten: ~1-2€/Kunde/Monat (geteilte VPS-Kosten)

### 4. Google Review Automatisierung

**Flow**:
1. Termin als "abgeschlossen" markiert (Make.com Trigger)
2. 2 Stunden warten
3. WhatsApp Nachricht: "Vielen Dank für Ihren Besuch! Wären Sie so nett und hinterlassen uns eine kurze Google-Bewertung? [Direktlink]"
4. Falls keine Reaktion: 3 Tage später Email Follow-up

**Direktlink generieren**: `https://search.google.com/local/writereview?placeid=[GOOGLE_PLACE_ID]`

Kosten: 0€ (alles über Make.com Automation)

### 5. Lead Scraping

**Tool**: Apollo.io API (49$/Monat)

- Input: Branche + Stadt/Region
- Output: Firmenname, Inhaber-Name, Email, Telefon
- Export → direkt in Brevo für Email-Kampagne
- Export → CSV für Cold Caller

**Alternativ (0€)**: Python Script für Google Maps Scraping
→ /scripts/lead-scraper.py

---

## Kostenstruktur pro Kunde

| Komponente | Monatliche Kosten |
|-----------|------------------|
| WhatsApp Business API | 5-10€ |
| Make.com (geteilt, 10 Kunden) | 4€ |
| Claude API | 4€ |
| Cal.com VPS (geteilt) | 2€ |
| HubSpot | 0€ (Free) |
| Google Business API | 0€ |
| Apollo.io (geteilt) | 5€ |
| **Total** | **~20-25€/Kunde** |

**Marge bei 900€**: 875€ → **97% Marge**
**Marge bei 1.500€**: 1.475€ → **98% Marge**

---

## Onboarding-Prozess (2 Stunden pro Kunde)

1. **Intake Form** (15 Min): Firmenname, Logo, Öffnungszeiten, Services, Kalender-Zugang
2. **Make.com Template clonen** (20 Min): Branche-Template auswählen, Kundendaten eintragen
3. **WhatsApp Business verifizieren** (30 Min): Gemeinsam mit Kunde
4. **Cal.com Kalender einrichten** (15 Min): Google Calendar Sync
5. **Google Place ID ermitteln** (5 Min): Review-Link generieren
6. **Test-Run** (15 Min): Testanfrage schicken, alles prüfen
7. **Kunde schulen** (15 Min): HubSpot Dashboard zeigen, wie man Termine sieht

**Ziel**: 10 Kunden onboarden = ~20 Stunden Arbeit einmalig

---

## Skalierung (ab 20 Kunden)

- Eigenes Onboarding-Portal (Next.js) bauen
- Kunde füllt Intake-Form aus → Auto-Setup via Make.com
- Stripe Integration für automatische Abrechnung
- Support-System (Crisp.chat oder Intercom)
