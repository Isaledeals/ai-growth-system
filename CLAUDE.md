# Aufwind AI — Project Dashboard

@AGENTS.md

---

## Projekt-Kern
- **Brand**: Aufwind AI — KI-Automatisierung für lokale Unternehmen (DACH)
- **Domain**: aufwind.ai (Namecheap, 2 Jahre) — DNS noch nicht auf Vercel gezeigt
- **Live URL**: ai-growth-system-seven.vercel.app (bis Domain verbunden)
- **Email**: kontakt@aufwind.ai (noch nicht aktiviert)
- **Pfad**: ~/ai-growth-system | Repo: github.com/Isaledeals/ai-growth-system
- **Stack**: Next.js 16.2, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion 12

---

## Architektur-Übersicht

### Frontend (Vercel)
- Landing Page: app/page.tsx (lazy-loaded Sections)
- Legal: /impressum, /datenschutz, /agb (Server Components)
- Customer Dashboard: /dashboard (8 Seiten, Framer Motion)
- SEO: 363 Seiten (sitemap.ts, robots.ts, /branche/[slug]/[stadt])

### Backend (Trinity VPS — 116.203.51.48)
- Multi-Tenant API: /root/trinity/src/growth-system.ts (Port 3000)
- n8n Workflows: Port 5678 (nur via SSH-Tunnel)
- Storage: /root/trinity/data/growth-customers.json (→ Supabase in Prod)

### Datenbank (Supabase)
- Project Ref: wlaaumcsdynemspewlzg | Region: eu-central-1 (Frankfurt)
- 10 Tables: tenants, contacts, conversations, reviews, appointments, health_events, referrals, dunning_events, monthly_stats, tenant_overview

---

## Sections (Reihenfolge Landing Page)
1. Navbar → 2. Hero → 3. SocialProof → 4. Problem → 5. Module (8 Stück)
6. HowItWorks → 7. ROI-Rechner → 8. CaseStudies → 9. Comparison
10. Pricing → 11. FAQ → 12. FinalCTA → 13. Footer

---

## Die 8 Module (Produkt-Features)
| # | Modul | Icon | Killer-Feature? |
|---|-------|------|-----------------|
| 1 | KI-Chatbot 24/7 | Bot | — |
| 2 | KI-Telefonassistent | Phone | JA |
| 3 | Smart Terminbuchung | CalendarCheck | — |
| 4 | Automatisches Follow-up | MessageCircle | — |
| 5 | No-Show Killer | ShieldCheck | — |
| 6 | Reputations-Autopilot | Star | — |
| 7 | Kundenreaktivierung | UserCheck | — |
| 8 | Social Media Autopilot | Share2 | — |

---

## Pricing & Stripe
| Paket | Preis | Setup | Stripe Price ID |
|-------|-------|-------|-----------------|
| Pro | €697/Mo | €499 einmalig | price_1TJHYy3OGNnjB7n16Y8F0Q0h / price_1TJHZI3OGNnjB7n18zaM9fDm |
| Premium | €1.297/Mo | GRATIS | price_1TJHh93OGNnjB7n1S4sS4U6s |
- Webhook: we_1TJTC33OGNnjB7n1QrkIRODa → /api/webhooks/stripe
- Kein GoHighLevel — eigener Stack (iSale.deals + Trinity + n8n) spart $497/Mo

---

## n8n Workflows (alle AKTIV)
| Workflow | Webhook/Schedule | Funktion |
|----------|------------------|----------|
| AGS — Onboarding | /webhook/ags-onboarding | Neukunde → Welcome → Setup |
| AGS — No-Show Killer | /webhook/ags-noshow-reminder | 24h/1h Erinnerungen |
| AGS — Review Request | /webhook/ags-review-request | Nach Termin → Google Review |
| AGS — Kundenreaktivierung | Schedule 09:00 Berlin | Inaktive Kunden |
| AGS — Daily Report | Schedule 08:00 Bangkok | MRR/Churn/Pipeline → Telegram |

---

## Config-Platzhalter (vor Launch ersetzen)
Alle in lib/constants.ts → SITE_CONFIG:
- bookingUrl → iSale.deals Booking-Link (/book/aufwind-demo)
- whatsappNumber → WhatsApp Business Nummer
- phone → Telefonnummer
- gaMeasurementId → GA4 Measurement ID
- domain → aufwind.ai (nach DNS-Setup)

---

## Design-System
- Dark Theme: bg #0A0F1C | Primary #3B82F6 | Accent #10B981
- Fonts: Inter (body), Plus Jakarta Sans (display), Geist Mono (code)
- Cards: Glass-Pattern (rgba(17,24,39,0.7) + backdrop-blur)
- Gradient: linear-gradient(135deg, #3B82F6, #10B981)
- Spotlight Cursor-Glow auf interaktiven Karten (useRef + onMouseMove → CSS-Vars)

---

## Git
- Push: `git push https://Isaledeals:TOKEN@github.com/Isaledeals/ai-growth-system.git main`
- Conventional Commits, sofort pushen nach Änderungen

---

## Offene Tasks (blockiert auf Kostas)
- [ ] DNS aufwind.ai → Vercel (A @ 76.76.21.21 + CNAME www)
- [ ] aufwind.ai in Vercel Project hinzufügen
- [ ] GA4 Measurement ID → SITE_CONFIG
- [ ] WhatsApp Nummer → SITE_CONFIG
- [ ] Email kontakt@aufwind.ai aktivieren
- [ ] Booking-Link in iSale.deals anlegen

## Offene Tasks (Claude autonom)
- [ ] Sitemap + robots.txt auf aufwind.ai aktualisieren (nach DNS)
- [ ] n8n Webhooks mit echten APIs ersetzen (nach Nummern)
