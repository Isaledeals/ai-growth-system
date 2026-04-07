# Aufwind AI — Projekt-Regeln

@AGENTS.md

## Projekt
- **Name**: Aufwind AI — KI-Automatisierung für lokale Unternehmen (DE)
- **Stack**: Next.js 16.2, React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Repo**: github.com/Isaledeals/ai-growth-system (Ordner-Pfad bleibt vorerst, nur Brand wird umgestellt)
- **Pfad**: ~/ai-growth-system (Symlink: ~/Projects/ai-growth-system)
- **Domain**: aufwind.ai (gekauft via Namecheap, 2 Jahre)
- **Email**: kontakt@aufwind.ai
- **Deployment**: Vercel (Frankfurt fra1)

## Git
- Push: `git push https://Isaledeals:TOKEN@github.com/Isaledeals/ai-growth-system.git main`
- Conventional Commits, immer pushen nach Änderungen

## Architektur
- Single-Page Landing (app/page.tsx) mit lazy-loaded Sections
- Legal: /impressum, /datenschutz, /agb (Server Components)
- SEO: sitemap.ts, robots.ts, manifest.ts, JSON-LD in layout.tsx
- Config: lib/constants.ts → SITE_CONFIG (brand, brandShort, tagline, Booking, WhatsApp, Email, Domain)
- Overlays: FloatingCTA, WhatsAppButton, CookieConsent (alle client-side, dynamisch importiert)

## Sections (Reihenfolge)
1. Navbar → 2. Hero → 3. SocialProof → 4. Problem → 5. Module → 6. HowItWorks
7. ROI-Rechner → 8. CaseStudies → 9. Comparison → 10. Pricing → 11. FAQ → 12. FinalCTA → 13. Footer

## Pricing (2 Pakete)
- Pro: €697/Mo + €499 Setup
- Premium: €1.297/Mo + GRATIS Setup (Highlight)

## Platzhalter (vor Launch ersetzen)
- `SITE_CONFIG.bookingUrl` → Calendly Link
- `SITE_CONFIG.whatsappNumber` → WhatsApp Nummer
- `SITE_CONFIG.phone` → Telefonnummer
- `SITE_CONFIG.gaMeasurementId` → GA4 Measurement ID

## Design
- Dark Theme: bg #0A0F1C, Primary #3B82F6, Accent #10B981
- Fonts: Inter (body), Plus Jakarta Sans (display), Geist Mono
- Glass-Card Pattern: rgba(17,24,39,0.7) + backdrop-blur
- Gradient: linear-gradient(135deg, #3B82F6, #10B981)

## TODO Brand-Migration (Infrastruktur)
- [ ] Vercel Project umbenennen (ai-growth-system → aufwind-ai)
- [ ] GitHub Repo umbenennen (optional)
- [ ] Lokalen Ordner umbenennen (~/ai-growth-system → ~/aufwind)
- [ ] Email kontakt@aufwind.ai aktivieren (Namecheap Email Forwarding oder Workspace)
- [ ] n8n Workflows umbenennen (AGS → Aufwind)
