'use client'

import { useEffect, useRef } from 'react'

interface Wisp {
  x: number
  y: number
  rx: number       // ellipse x-radius
  ry: number       // ellipse y-radius (taller = more stream-like)
  speed: number
  opacity: number
  hue: number      // 215 = blue, 155 = green, 195 = cyan
  phase: number    // sway offset
  swayAmp: number  // sway amplitude px
}

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  opacity: number
  hue: number
  phase: number
}

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let vw = window.innerWidth
    let vh = window.innerHeight

    const resize = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      canvas.width = vw
      canvas.height = vh
    }
    resize()

    // ── Wisps: large soft elongated blobs that rise like warm air ──
    const WISP_COUNT = 18
    const wisps: Wisp[] = []

    const hues = [215, 215, 215, 155, 195, 155] // mostly blue, some green/cyan

    function makeWisp(startY?: number): Wisp {
      return {
        x: Math.random() * vw,
        y: startY !== undefined ? startY : vh + Math.random() * 300,
        rx: Math.random() * 90 + 40,
        ry: Math.random() * 220 + 120,
        speed: Math.random() * 0.35 + 0.1,
        opacity: Math.random() * 0.055 + 0.015,
        hue: hues[Math.floor(Math.random() * hues.length)],
        phase: Math.random() * Math.PI * 2,
        swayAmp: Math.random() * 35 + 10,
      }
    }

    for (let i = 0; i < WISP_COUNT; i++) {
      wisps.push(makeWisp(Math.random() * vh * 1.8))
    }

    // ── Sparkle particles ──
    const PARTICLE_COUNT = 55
    const particles: Particle[] = []

    function makeParticle(startY?: number): Particle {
      return {
        x: Math.random() * vw,
        y: startY !== undefined ? startY : vh + Math.random() * 100,
        r: Math.random() * 1.8 + 0.4,
        speed: Math.random() * 0.55 + 0.2,
        opacity: Math.random() * 0.18 + 0.04,
        hue: Math.random() > 0.5 ? 215 : 155,
        phase: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(makeParticle(Math.random() * vh))
    }

    let t = 0
    const c = ctx // non-null alias

    function draw() {
      c.clearRect(0, 0, vw, vh)
      t += 0.004

      // ── Draw wisps ──
      for (const w of wisps) {
        w.y -= w.speed
        w.x += Math.sin(t * 0.4 + w.phase) * 0.25

        if (w.y + w.ry < -50) {
          Object.assign(w, makeWisp())
        }

        // Horizontal sway: shift x smoothly
        const dx = Math.sin(t * 0.25 + w.phase) * w.swayAmp

        const grad = c.createRadialGradient(
          w.x + dx, w.y, 0,
          w.x + dx, w.y, Math.max(w.rx, w.ry)
        )
        grad.addColorStop(0,   `hsla(${w.hue}, 85%, 62%, ${w.opacity})`)
        grad.addColorStop(0.35, `hsla(${w.hue}, 75%, 58%, ${w.opacity * 0.55})`)
        grad.addColorStop(1,   `hsla(${w.hue}, 70%, 55%, 0)`)

        c.save()
        c.translate(w.x + dx, w.y)
        c.scale(w.rx / Math.max(w.rx, w.ry), w.ry / Math.max(w.rx, w.ry))
        c.beginPath()
        c.arc(0, 0, Math.max(w.rx, w.ry), 0, Math.PI * 2)
        c.fillStyle = grad
        c.fill()
        c.restore()
      }

      // ── Draw sparkles ──
      for (const p of particles) {
        p.y -= p.speed
        p.x += Math.sin(t * 0.6 + p.phase) * 0.45

        if (p.y < -10) {
          p.y = vh + 10
          p.x = Math.random() * vw
        }

        // Tiny glow dot
        const glow = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        glow.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.opacity})`)
        glow.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`)
        c.beginPath()
        c.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        c.fillStyle = glow
        c.fill()
      }
    }

    function loop() {
      draw()
      animId = requestAnimationFrame(loop)
    }

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    window.addEventListener('resize', resize)
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Static ambient base — subtle gradient floor */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.04) 0%, transparent 70%)',
        }}
      />
      {/* Top-right accent */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '55vmax',
          height: '55vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Bottom-left green accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '45vmax',
          height: '45vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}
