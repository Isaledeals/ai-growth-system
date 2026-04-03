# AI Growth System 🚀
### Das komplette AI-Wachstumssystem für lokale Unternehmen

---

## Was ist das AI Growth System?

Ein gebündeltes, vollständig automatisiertes Wachstumssystem für lokale Unternehmen — 5 Module, ein Preis, ein Ergebnis: **mehr Kunden, mehr Umsatz, weniger Aufwand.**

Kein technisches Wissen nötig. Wir richten alles ein. Der Unternehmer macht weiter was er kann — wir übernehmen den Rest.

---

## Die 5 Module

### 1. 🤖 AI Chatbot — 24/7 Lead-Qualifizierung
- Beantwortet Anfragen automatisch rund um die Uhr
- Qualifiziert Leads bevor ein Mensch Zeit investiert
- Integriert auf Website, Facebook, Instagram, WhatsApp
- Spricht wie ein echter Mitarbeiter — keine roboterhaften Antworten
- **Tech:** Voiceflow + Claude API (Haiku)

### 2. 📱 Automatisches Follow-up — WhatsApp + Email
- Kein Lead fällt mehr durchs Raster
- Automatische Nachfass-Sequenz nach jeder Anfrage
- Persönlich wirkende Nachrichten, vollautomatisch
- Reaktivierung alter Kunden nach 30/60/90 Tagen
- **Tech:** 360dialog (WhatsApp) + Brevo (Email) + Make.com

### 3. 📅 AI Terminbuchung — direkt in den Kalender
- Kunden buchen 24/7 selbst — ohne Anruf, ohne Sekretärin
- Automatische Erinnerungen reduzieren No-Shows um bis zu 80%
- Sync mit Google Calendar, Outlook, Cal.com
- **Tech:** Cal.com (self-hosted auf Hetzner)

### 4. ⭐ Reputations-Automatisierung — Google Reviews
- Automatisch nach jedem Termin/Kauf um Bewertung bitten
- Mehr 5-Sterne-Reviews = mehr organische Neukunden
- Negative Bewertungen intern auffangen bevor sie online gehen
- Durchschnittliche Steigerung: +1,2 Sterne in 60 Tagen
- **Tech:** Make.com Flow + 360dialog WhatsApp

### 5. 🎯 Lead Scraping + erstes Outreach (Complete Paket)
- Neue potenzielle Kunden automatisch identifizieren
- Erstes Outreach vollautomatisch per Email/WhatsApp
- Gezielte Regionen und Branchen targetbar
- **Tech:** Google Places API + Apollo.io + Instantly.ai

---

## Pricing

| Paket | Preis/Monat | Module | Marge |
|-------|-------------|--------|-------|
| Starter | 997€ | Module 1-3 | ~92% |
| Standard | 1.297€ | Module 1-4 | ~90% |
| Complete | 1.497€ | Alle 5 Module | ~87% |

**Setup-Fee:** 500€ einmalig (optional erlassen bei 6-Monats-Commitment)
**Tool-Kosten pro Kunde:** ~35-165€/Monat (je nach Paket & Volumen)

---

## Zielgruppen (Priorität)

| Prio | Segment | Größter Pain | ROI-Hook |
|------|---------|-------------|----------|
| 1 | Zahnarztpraxen | No-Shows & verpasste Anfragen | "1 No-Show/Tag = 3.000€ Verlust/Monat" |
| 2 | Ästhetik/Beauty/Kliniken | Anfragen die abends verloren gehen | "+4 Behandlungen/Monat aus Chatbot" |
| 3 | Immobilienmakler | Leads die abtauchen, kein Follow-up | "1 reaktivierter Deal = 10.000€+" |
| 4 | Handwerk & Dienstleister | Angebote ohne Antwort | "+20-25% mehr Auftragsabschlüsse" |
| 5 | Physiotherapie-Praxen | Patienten die nicht wiederkommen | "Privatpatienten-Reaktivierung" |

---

## Sales-Strategie

- 2 Cold Call Agents (500€ Provision pro Abschluss)
- 13.000 Unternehmensleads für Email-Kampagne (segmentiert nach Branche)
- Lead Scraping über Google Places API für neue Targets
- Demo-Call → Pitch Deck → Onboarding innerhalb 7 Tage

---

## Projektstruktur

```
ai-growth-system/
│
├── README.md                           ← Diese Datei (Gesamt-Überblick)
├── BUSINESS-PLAN.md                    ← MRR-Ziele, Umsatzplanung
├── PRICING.md                          ← Preisstruktur & Paket-Details
├── TECH_STACK.md                       ← Tool-Übersicht (alt)
├── ZIELGRUPPEN.md                      ← Zielgruppen Pain Points & Hooks
├── COLD-CALL-SCRIPTS.md                ← Cold Call Scripts alle Branchen
├── COLD_CALL_SCRIPT.md                 ← Cold Call Script (erweitert)
│
├── emails/
│   ├── email-sequenz-aesthetik.md      ← Sequenz A: Ästhetik/Beauty/Kliniken (5 Emails)
│   ├── email-sequenz-zahnarzt.md       ← Sequenz B: Ärzte/Zahnarzt (5 Emails)
│   ├── email-sequenz-immobilien.md     ← Sequenz C: Immobilien/Makler (5 Emails)
│   └── email-sequenz-handwerk.md       ← Sequenz D: Handwerk/Dienstleister (5 Emails)
│
├── docs/
│   ├── onboarding-neukunde.md          ← Kunden-Onboarding-Dokument (extern)
│   ├── setup-guide-tech-stack.md       ← Tech Setup-Guide Modul 1-5 (intern)
│   ├── 01-business-plan.md             ← Business Plan (Detail)
│   ├── 02-tech-stack.md                ← Tech Stack Analyse
│   ├── 03-90-tage-plan.md              ← 90-Tage Launch Plan
│   ├── 04-pitch-deck-outline.md        ← Demo-Call / Pitch Struktur
│   ├── business-plan.md                ← Business Plan (v2)
│   ├── cold-call-script.md             ← Cold Call (v2)
│   ├── email-kampagne.md               ← Allgemeine Email-Strategie
│   ├── tech-stack.md                   ← Tech Details (v2)
│   ├── zielgruppen-analyse.md          ← Zielgruppen (v2)
│   ├── 01-business-strategy.md
│   └── 01-strategie-zielgruppe.md
│
├── scripts/
│   ├── cold-call-script-DE.md          ← Cold Call Scripts Deutsch
│   ├── email-kampagne-13k.md           ← Email Kampagnen-Strategie 13k Leads
│   └── lead-scraper.py                 ← Google Maps Lead Scraper (Python)
│
└── templates/                          ← Make.com Flows & Onboarding Templates
```

---

## Email-Kampagnen: 4 Zielgruppen-Sequenzen (13.000 Leads)

### Segmentierung der Liste:

| Segment | Zielgruppe | Filter-Keywords | Datei |
|---------|-----------|-----------------|-------|
| A | Ästhetik/Beauty/Kliniken | Kosmetik, Beauty, Ästhetik, Botox, Salon, Klinik | `emails/email-sequenz-aesthetik.md` |
| B | Ärzte/Zahnarzt | Zahnarzt, Praxis, Arzt, Dental, Medizin, Heilpraxis | `emails/email-sequenz-zahnarzt.md` |
| C | Immobilien/Makler | Immobilien, Makler, Real Estate, Hausvermittlung | `emails/email-sequenz-immobilien.md` |
| D | Handwerk/Dienstleister | GmbH, Handwerk, Bau, Elektro, Sanitär, KFZ, Reinigung | `emails/email-sequenz-handwerk.md` |

### Sequenz-Struktur (alle 4 Segmente):

| Email | Tag | Thema |
|-------|-----|-------|
| 1 | Tag 1 | Hook — Der größte Pain der Branche |
| 2 | Tag 3 | Social Proof — Konkrete Zahlen & Ergebnisse |
| 3 | Tag 6 | Visualisierung / Differenzierungsargument |
| 4 | Tag 10 | Story / Konkretes Kundenbeispiel |
| 5 | Tag 14 | Last Chance + kostenloses Strategiegespräch |

### Technischer Versand:

```
Tool:           Instantly.ai ODER Brevo (Transactional für Sequenzen)
Sending Domain: Separate Sub-Domain — NICHT Hauptdomain verwenden
                Beispiel: mail.aigrowthsystem.de oder campaign.aigrowthsystem.de
Domain Warmup:  3-4 Wochen mit Instantly.ai Warmup BEVOR Launch
SPF/DKIM/DMARC: Pflicht — ohne diese: Spam-Ordner

Versandzeiten:
- Dienstag/Donnerstag: 8:00-9:00 Uhr (beste Open Rates)
- Mittwoch: 10:00-11:00 Uhr (Second Choice)
- Handwerk: Montag/Mittwoch 7:00 Uhr (vor Arbeitsbeginn)

Ziel-Metriken:
- Open Rate: >35%
- Reply Rate: >5%
- Demo-Buchungsrate: >1,5% der Liste
```

---

## Onboarding & Tech Setup

### Für neue Kunden:
**→ `docs/onboarding-neukunde.md`**
- Willkommensdokument (extern, geht an Kunden)
- Onboarding-Fragebogen (15 Min)
- Was passiert in den ersten 7 Tagen
- Erwartungen für 30/60/90 Tage
- FAQ & DSGVO-Hinweise

### Für das interne Team (Setup-Anleitung):
**→ `docs/setup-guide-tech-stack.md`**
- Vollständige Schritt-für-Schritt Einrichtung aller 5 Module
- Make.com Flow-Aufbau (alle 3 Flows)
- 360dialog WhatsApp API Setup
- Voiceflow Chatbot + Claude API Integration
- Cal.com Self-Hosted Setup
- Google Reviews Automatisierung
- Quality Assurance Checkliste vor Go-Live
- Troubleshooting häufige Probleme
- Monatliche Wartungs-Checkliste

**Setup-Dauer:** 6-7 Stunden pro Neukunde
**Go-Live:** 5-7 Werktage nach Onboarding-Fragebogen

---

## Tech Stack (Überblick)

| Tool | Modul | Kosten/Monat/Kunde |
|------|-------|-------------------|
| Voiceflow + Claude API | Chatbot | 45-60€ |
| 360dialog | WhatsApp Business API | 35-50€ |
| Make.com | Automatisierung (alle Flows) | 5-15€ anteilig |
| Cal.com Self-Hosted | Terminbuchung | ~5€ (Hetzner anteilig) |
| Brevo | Email Sequenzen | 0-15€ |
| Apollo.io (Complete) | Lead Scraping | 40-50€ |
| **Gesamt** | | **~130-195€** |

---

## Offene Aufgaben (Priorisiert)

### 🔴 Kritisch / Sofort
- [ ] Brevo Account anlegen + Domain Warmup starten (3-4 Wochen!)
- [ ] Sending Domain kaufen + DNS konfigurieren
- [ ] 13k Leads segmentieren (Excel/Google Sheets nach Branche sortieren)
- [ ] Ersten Cold Caller rekrutieren (Upwork / LinkedIn)

### 🟡 Wichtig / Diese Woche
- [ ] Landing Page bauen (Next.js) → Domain: ai-growth-system.de
- [ ] Make.com Account aufsetzen, erste Templates bauen
- [ ] 360dialog Partner-Account aktivieren
- [ ] Cal.com auf Hetzner installieren

### 🟢 Mittelfristig
- [ ] Pilot-Kunden onboarden (reduzierter Preis für Case Study)
- [ ] Demo-Video aufnehmen (Loom) für Email-Sequenzen
- [ ] GoHighLevel als Alternative evaluieren
- [ ] Cold Call Agent Provision-Struktur dokumentieren

---

## Schlüssel-Entscheidungen (offen — Boss muss entscheiden)

1. **Firmenname/Brand** für das Produkt (AI Growth System bleibt? oder anderer Name?)
2. **WhatsApp Business API:** Meta Business Manager konto nötig → wer legt es an?
3. **Pilot-Branche:** Starten wir mit Handwerk oder Kosmetik für ersten Kunden?
4. **Cold Caller:** Upwork, LinkedIn oder eigenes Netzwerk?
5. **Domain:** ai-growth-system.de kaufen?

---

*AI Growth System | Stand: April 2026 | Gebaut mit Trinity 🖤*
