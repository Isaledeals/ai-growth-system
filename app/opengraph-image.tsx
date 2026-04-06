import { ImageResponse } from 'next/og'

export const alt = 'AI Growth System — KI-Automatisierung für lokale Unternehmen'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0F1C',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '200px',
            width: '800px',
            height: '800px',
            borderRadius: '400px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '60px 80px',
          }}
        >
          {/* Logo icon - gradient rounded square */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '72px',
              height: '72px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3B82F6, #10B981)',
              marginBottom: '8px',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 17l10 5 10-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          {/* Title with gradient text via backgroundClip */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: 800,
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            AI Growth System
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 500,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.3,
              display: 'flex',
            }}
          >
            KI-Automatisierung für lokale Unternehmen
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#9CA3AF',
              textAlign: 'center',
              lineHeight: 1.4,
              marginTop: '4px',
              display: 'flex',
            }}
          >
            Mehr Kunden. Weniger Aufwand. Rund um die Uhr.
          </div>
        </div>

        {/* Bottom gradient accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'linear-gradient(90deg, #3B82F6, #10B981, #3B82F6)',
            display: 'flex',
          }}
        />

        {/* Bottom subtle glow behind the bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '240px',
            right: '240px',
            height: '60px',
            background: 'linear-gradient(0deg, rgba(59,130,246,0.15) 0%, transparent 100%)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
