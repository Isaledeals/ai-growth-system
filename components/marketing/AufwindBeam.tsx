'use client'

/**
 * AufwindBeam — Das Aufwind-Designmotiv
 *
 * Ein schmaler, animierter Leuchtstreifen (Blau → Grün)
 * der als "roter Faden" durch jede Section läuft.
 * Drei Varianten: line (Abschnitt-Trenner), badge (über Headings), glow (subtil im BG)
 */

interface Props {
  variant?: 'line' | 'badge' | 'wide'
  className?: string
  animated?: boolean
}

export default function AufwindBeam({ variant = 'line', className = '', animated = true }: Props) {
  if (variant === 'badge') {
    // Kleine Beam-Linie direkt über einer Section-Headline
    return (
      <div className={`flex items-center justify-center mb-4 ${className}`}>
        <div
          className="rounded-full"
          style={{
            width: '48px',
            height: '3px',
            background: 'linear-gradient(90deg, #2563EB, #059669)',
            boxShadow: '0 0 8px rgba(37,99,235,0.5), 0 0 16px rgba(5,150,105,0.3)',
            animation: animated ? 'beam-pulse 3s ease-in-out infinite' : undefined,
          }}
        />
      </div>
    )
  }

  if (variant === 'wide') {
    // Breite Section-Divider Linie mit Glow
    return (
      <div className={`relative flex items-center justify-center py-2 ${className}`} aria-hidden="true">
        <div
          className="w-full max-w-xs rounded-full"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #2563EB 30%, #059669 70%, transparent 100%)',
            boxShadow: '0 0 12px rgba(37,99,235,0.4), 0 0 24px rgba(5,150,105,0.2)',
            animation: animated ? 'beam-shimmer 4s ease-in-out infinite' : undefined,
          }}
        />
      </div>
    )
  }

  // Default: line — horizontale Beam-Trennlinie
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: '2px' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #2563EB 20%, #10B981 50%, #059669 80%, transparent 100%)',
          boxShadow: '0 0 16px rgba(37,99,235,0.45), 0 0 32px rgba(5,150,105,0.25)',
          animation: animated ? 'beam-travel 6s ease-in-out infinite' : undefined,
        }}
      />
    </div>
  )
}
