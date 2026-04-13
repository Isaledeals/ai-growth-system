export type Dictionary = {
  metadata: { title: string; description: string }
  navbar: { links: { label: string; href: string }[]; cta: string }
  hero: { badge: string; headline: string; sub: string; cta: string; ctaSub: string }
}

const de: Dictionary = {
  metadata: {
    title: 'Aufwind AI — Mehr Kunden. Weniger Arbeit. Vollautomatisch.',
    description:
      'Aufwind AI — das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren. 24/7 aktiv.',
  },
  navbar: {
    links: [
      { label: 'Funktionen', href: '#module' },
      { label: 'Preise', href: '#preise' },
      { label: 'Branchen', href: '#branchen' },
      { label: 'Über uns', href: '#demo' },
    ],
    cta: 'Demo buchen',
  },
  hero: {
    badge: 'KI-Automatisierung für lokale Unternehmen',
    headline: 'Mehr Kunden. Weniger Arbeit. Vollautomatisch.',
    sub: 'Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv.',
    cta: 'Kostenlose Demo buchen',
    ctaSub: 'Keine Kreditkarte. Kein Risiko.',
  },
}

export default de
