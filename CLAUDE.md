# AI Growth System — Projekt-Regeln

@AGENTS.md

## Projekt
- **Name**: AI Growth System — KI-Automatisierung für lokale Unternehmen (DE)
- **Stack**: Next.js 16.2, React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Repo**: github.com/Isaledeals/ai-growth-system
- **Pfad**: ~/ai-growth-system (Symlink: ~/Projects/ai-growth-system)
- **Domain**: TBD (Platzhalter: aigrowthsystem.de)
- **Deployment**: Vercel (Frankfurt fra1)

## Git
- Push: `git push https://Isaledeals:TOKEN@github.com/Isaledeals/ai-growth-system.git main`
- Conventional Commits, immer pushen nach Änderungen

## Architektur
- Single-Page Landing (app/page.tsx) mit lazy-loaded Sections
- Legal: /impressum, /datenschutz (Server Components)
- SEO: sitemap.ts, robots.ts, manifest.ts, JSON-LD in layout.tsx
- Config: lib/constants.ts → SITE_CONFIG (Booking, WhatsApp, Email, Domain)
- Overlays: FloatingCTA, WhatsAppButton, CookieConsent (alle client-side, dynamisch importiert)

## Sections (Reihenfolge)
1. Navbar → 2. Hero → 3. SocialProof → 4. Problem → 5. Module → 6. HowItWorks
7. ROI-Rechner → 8. CaseStudies → 9. Comparison → 10. Pricing → 11. FAQ → 12. FinalCTA → 13. Footer

## Pricing
- Starter: €997/Mo + €500 Setup
- Growth: €1.297/Mo + €500 Setup (Highlight)
- Complete: €1.797/Mo + GRATIS Setup

## Platzhalter (vor Launch ersetzen)
- `SITE_CONFIG.bookingUrl` → Calendly Link
- `SITE_CONFIG.whatsappNumber` → WhatsApp Nummer
- `SITE_CONFIG.phone` → Telefonnummer
- `SITE_CONFIG.email` → Email
- `SITE_CONFIG.domain` → Finale Domain

## Design
- Dark Theme: bg #0A0F1C, Primary #3B82F6, Accent #10B981
- Fonts: Inter (body), Plus Jakarta Sans (display), Geist Mono
- Glass-Card Pattern: rgba(17,24,39,0.7) + backdrop-blur
- Gradient: linear-gradient(135deg, #3B82F6, #10B981)
