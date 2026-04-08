'use client'

/**
 * SectionTransition — Dark → Light
 *
 * Visualisiert den "Aufwind"-Moment:
 * Energie steigt aus dem dunklen Hero in den hellen Content.
 * - SVG-Welle: weißes Feld wölbt sich nach oben (wie Luft die hebt)
 * - Aufsteigende Leuchtpartikel die durch den Übergang driften
 * - Gradient-Fade der die harte Kante weich macht
 */

const particles = [
  { left: '8%',  delay: '0s',   size: 5,  color: '#60A5FA', dur: '3.2s' },
  { left: '20%', delay: '0.6s', size: 3,  color: '#34D399', dur: '2.8s' },
  { left: '35%', delay: '1.1s', size: 6,  color: '#60A5FA', dur: '3.5s' },
  { left: '50%', delay: '0.3s', size: 4,  color: '#A78BFA', dur: '3.0s' },
  { left: '63%', delay: '0.9s', size: 5,  color: '#34D399', dur: '2.6s' },
  { left: '78%', delay: '0.4s', size: 3,  color: '#60A5FA', dur: '3.8s' },
  { left: '90%', delay: '1.4s', size: 4,  color: '#34D399', dur: '2.9s' },
  { left: '14%', delay: '1.8s', size: 2,  color: '#FCD34D', dur: '3.3s' },
  { left: '42%', delay: '2.1s', size: 3,  color: '#60A5FA', dur: '2.7s' },
  { left: '72%', delay: '1.5s', size: 5,  color: '#A78BFA', dur: '3.6s' },
]

export default function SectionTransition() {
  return (
    <div
      className="pointer-events-none relative z-10 overflow-hidden"
      style={{ height: '140px', marginTop: '-2px', marginBottom: '-2px' }}
      aria-hidden="true"
    >
      {/* Dark → transparent gradient fade (top half) */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '60%',
          background: 'linear-gradient(to bottom, #0A0F1C 0%, rgba(10,15,28,0.85) 40%, transparent 100%)',
        }}
      />

      {/* White → transparent gradient fade (bottom half) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '60%',
          background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.9) 40%, transparent 100%)',
        }}
      />

      {/* SVG Wave — white wölbt sich nach oben (Aufwind-Form) */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
      >
        {/* Glowing blue line along the wave crest */}
        <path
          d="M0,100 C200,140 400,50 600,75 C800,100 1000,30 1200,65 C1320,85 1400,70 1440,72"
          fill="none"
          stroke="url(#wave-glow)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Main white wave fill */}
        <path
          d="M0,105 C200,145 400,55 600,80 C800,105 1000,35 1200,70 C1320,90 1400,75 1440,78 L1440,140 L0,140 Z"
          fill="white"
        />
        <defs>
          <linearGradient id="wave-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0" />
            <stop offset="25%"  stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="55%"  stopColor="#34D399" stopOpacity="0.7" />
            <stop offset="80%"  stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Rising particles through the transition zone */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}60`,
            animation: `aufwind-rise ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Subtle horizontal shimmer at the wave crest */}
      <div
        className="absolute inset-x-0"
        style={{
          top: '42%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.15) 20%, rgba(52,211,153,0.25) 50%, rgba(96,165,250,0.15) 80%, transparent 100%)',
        }}
      />
    </div>
  )
}
