'use client'

import { motion, useInView } from 'framer-motion'
import { Calendar, TrendingDown, Star, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { useRef, useEffect, useState, useCallback } from 'react'

const stats = [
  { icon: Calendar, value: '2.400+', label: 'Termine', numericValue: 2400, suffix: '+' },
  { icon: TrendingDown, value: '74%', label: 'weniger No-Shows', numericValue: 74, suffix: '%' },
  { icon: Star, value: '850+', label: 'Bewertungen', numericValue: 850, suffix: '+' },
  { icon: Clock, value: '15h/Woche', label: 'gespart', numericValue: 15, suffix: 'h/Woche' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1800
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [target])

  useEffect(() => {
    if (inView) {
      animate()
    }
  }, [inView, animate])

  const formatted = target >= 1000
    ? new Intl.NumberFormat('de-DE').format(count)
    : count.toString()

  return <>{formatted}{suffix}</>
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 pt-20 sm:px-6 lg:px-8">
      {/* SVG Dot Grid Pattern Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.05 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F1F5F9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          backgroundImage: 'radial-gradient(circle, #3B82F6, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          backgroundImage: 'radial-gradient(circle, #10B981, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
        style={{
          backgroundImage: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
              Für lokale Unternehmen in Deutschland
            </span>
          </motion.div>

          {/* Urgency Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-300 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Nur noch 5 Plätze für April verfügbar
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Mehr Kunden. Weniger Arbeit.{' '}
            <span className="text-shimmer">
              Vollautomatisch.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
          >
            Deine Konkurrenz nutzt es bereits. 147+ lokale Unternehmen in Deutschland gewinnen jeden Monat automatisch neue Kunden — während du noch Anfragen verpasst.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href={SITE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse-glow inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-emerald-500/25 sm:text-lg"
              style={{
                backgroundImage: 'linear-gradient(135deg, #10B981, #059669)',
              }}
            >
              Kostenlose Demo buchen
            </a>
            <a
              href="#module"
              onClick={(e) => handleSmoothScroll(e, '#module')}
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:text-lg"
            >
              So funktioniert&apos;s
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-16 w-full sm:mt-20"
          >
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-4"
            >
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                    <span
                      className="text-2xl font-bold bg-clip-text text-transparent sm:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
                      }}
                    >
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        inView={statsInView}
                      />
                    </span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
