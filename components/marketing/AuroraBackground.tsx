'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = {
  id: number
  left: string
  delay: string
  duration: string
  size: number
  hue: string
}

const PARTICLE_COLORS = [
  'rgba(255, 255, 255, 0.85)',
  'rgba(125, 211, 252, 0.75)', // sky-300
  'rgba(110, 231, 183, 0.7)',  // emerald-300
  'rgba(196, 181, 253, 0.6)',  // violet-300
]

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.round((Math.random() * 2 + 2) * 10) / 10 // 2.0 - 4.0 px
    const leftPercent = Math.round(Math.random() * 1000) / 10  // 0 - 100 %
    const duration = (Math.random() * 7 + 8).toFixed(2)         // 8 - 15 s
    const delay = (Math.random() * 15).toFixed(2)               // 0 - 15 s
    const hue = PARTICLE_COLORS[i % PARTICLE_COLORS.length]
    return {
      id: i,
      left: `${leftPercent}%`,
      delay: `${delay}s`,
      duration: `${duration}s`,
      size,
      hue,
    }
  })
}

export default function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion()
  // Particles are generated client-side only to avoid hydration mismatch
  // (Math.random() would differ between server and client render).
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const count = prefersReducedMotion ? 6 : 18
    setParticles(buildParticles(count))
  }, [prefersReducedMotion])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Layer 1 — Aurora Glow Orbs (CSS animated, GPU-accelerated) */}
      <div
        className="aurora-orb aurora-orb--blue"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '70vmax',
          height: '70vmax',
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.55), rgba(59, 130, 246, 0) 65%)',
          filter: 'blur(120px)',
          opacity: 0.22,
          willChange: prefersReducedMotion ? undefined : 'transform',
          animation: prefersReducedMotion
            ? undefined
            : 'auroraFloat 28s ease-in-out infinite alternate',
        }}
      />
      <div
        className="aurora-orb aurora-orb--emerald"
        style={{
          position: 'absolute',
          bottom: '-25%',
          right: '-15%',
          width: '75vmax',
          height: '75vmax',
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0) 65%)',
          filter: 'blur(140px)',
          opacity: 0.2,
          willChange: prefersReducedMotion ? undefined : 'transform',
          animation: prefersReducedMotion
            ? undefined
            : 'auroraFloatReverse 32s ease-in-out infinite alternate',
        }}
      />
      <div
        className="aurora-orb aurora-orb--violet"
        style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '55vmax',
          height: '55vmax',
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.35), rgba(139, 92, 246, 0) 65%)',
          filter: 'blur(130px)',
          opacity: 0.16,
          willChange: prefersReducedMotion ? undefined : 'transform',
          animation: prefersReducedMotion
            ? undefined
            : 'auroraDrift 26s ease-in-out infinite alternate',
        }}
      />

      {/* Layer 2 — Rising Particles ("Aufwind" metaphor) */}
      <div
        className="absolute inset-0"
        style={{ mixBlendMode: 'screen' }}
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="rising-particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.hue,
              boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
              animationDelay: p.delay,
              animationDuration: prefersReducedMotion ? '0s' : p.duration,
              animationPlayState: prefersReducedMotion ? 'paused' : 'running',
              opacity: prefersReducedMotion ? 0.35 : undefined,
            }}
          />
        ))}
      </div>

      {/* Layer 3 — Faint Dot Grid for depth */}
      <div
        className="absolute inset-0"
        style={{ opacity: 0.08 }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="aurora-dot-grid"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#F1F5F9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aurora-dot-grid)" />
        </svg>
      </div>

      {/* Layer 4 — Vignette to focus attention */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10, 15, 28, 0) 40%, rgba(10, 15, 28, 0.65) 100%)',
        }}
      />
    </div>
  )
}
