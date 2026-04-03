# Tech Stack — AI Growth System
### Tools & APIs pro Modul

---

## Modul 1: AI Chatbot

**Primär:** Voiceflow oder Botpress (Chatbot Builder)
**AI Engine:** Claude API (Anthropic) oder OpenAI GPT-4
**Integration:** Tidio, Intercom oder eigener Widget-Code
**Kanäle:** Website, WhatsApp Business API, Facebook Messenger, Instagram DM

**Kosten:** ~50-80€/Monat pro Kunde (Toolkosten)

---

## Modul 2: Automatisches Follow-up

**Email:** Instantly.ai, Smartlead oder Brevo (Sendinblue)
**WhatsApp:** WhatsApp Business API via 360dialog oder WATI
**Automatisierung:** Make (Integromat) oder n8n (selbst gehostet = kostenlos)
**CRM-Sync:** optional HubSpot Free oder Airtable

**Kosten:** ~30-60€/Monat pro Kunde

---

## Modul 3: AI Terminbuchung

**Primär:** Calendly (Business) oder TidyCal
**Erinnerungen:** Twilio (SMS) + eigene WhatsApp API
**Kalender-Sync:** Google Calendar API, Microsoft Outlook API
**No-Show-Prevention:** Automatische 3-fach Erinnerung (24h, 2h, 30min vorher)

**Kosten:** ~20-40€/Monat pro Kunde

---

## Modul 4: Reputations-Automatisierung

**Primär:** NiceJob, Birdeye oder eigene Lösung via Make
**Trigger:** Nach Termin/Zahlung automatisch WhatsApp/SMS/Email
**Google-Integration:** Google Business API
**Negative Bewertungs-Intercept:** Erst interne Feedback-Seite, dann weiterleiten

**Kosten:** ~20-30€/Monat pro Kunde

---

## Modul 5: Lead Scraping + Outreach

**Scraping:** iSale.deals eigene Funktion + Apify oder PhantomBuster
**Email-Outreach:** Instantly.ai oder Lemlist
**LinkedIn-Outreach:** optional Expandi oder Dux-Soup
**Daten-Anreicherung:** Hunter.io oder Apollo.io

**Kosten:** ~40-60€/Monat pro Kunde

---

## Gesamtkosten pro Kunde (Complete Paket)

| Tool-Kategorie | Monatliche Kosten |
|---------------|-------------------|
| Chatbot + AI | 60€ |
| Follow-up (Email + WhatsApp) | 50€ |
| Terminbuchung | 30€ |
| Reputation | 25€ |
| Lead Scraping | 50€ |
| Hosting + Sonstiges | 20€ |
| **GESAMT** | **~235€** |

**Marge bei 1.500€ Complete Paket: ~1.265€/Monat**

---

## Automatisierungs-Backbone

**n8n (selbst gehostet auf Hetzner):**
- Kostenlos, unbegrenzte Workflows
- Verbindet alle Tools miteinander
- Unser zentrales Automatisierungs-Tool
- Bereits auf unserem Server verfügbar

**Warum n8n:**
- Keine per-Task Kosten wie Make
- Läuft auf unserem Hetzner Server
- Vollständige Kontrolle über Daten
- DSGVO-konform (Daten bleiben in EU)

---

## Setup-Prozess pro Neukunde

1. Onboarding-Fragebogen (15 Min)
2. Chatbot trainieren mit Unternehmens-Infos (2h)
3. WhatsApp Business Account verbinden (1h)
4. Kalender-Integration (30 Min)
5. Reputations-Flows aktivieren (30 Min)
6. Test-Durchlauf mit Kunde (1h)
7. Go-Live + Einweisung (30 Min)

**Gesamt Setup-Zeit: ~6 Stunden pro Kunde**
