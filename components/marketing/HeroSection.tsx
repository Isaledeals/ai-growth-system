'use client'

import { motion, useInView } from 'framer-motion'
import {
  Calendar,
  TrendingDown,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ChevronDown,
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { useRef, useEffect, useState, useCallback } from 'react'

const stats = [
  { icon: Calendar, value: '2.400+', label: 'Termine', numericValue: 2400, suffix: '+' },
  { icon: TrendingDown, value: '74%', label: 'weniger No-Shows', numericValue: 74, suffix: '%' },
  { icon: Star, value: '850+', label: 'Bewertungen', numericValue: 850, suffix: '+' },
  { icon: Clock, value: '15h/Woche', label: 'gespart', numericValue: 15, suffix: 'h/Woche' },
]

const trustAvatars = [
  { letter: 'Z', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
  { letter: 'F', gradient: 'linear-gradient(135deg, #10B981, #047857)' },
  { letter: 'B', gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' },
  { letter: 'H', gradient: 'linear-gradient(135deg, #F59E0B, #B45309)' },
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      {/* SVG Dot Grid Pattern — Hero-specific subtle overlay on top of global aurora */}
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

          {/* Urgency Badge — with rising trend icon (Aufwind metaphor) */}
          <motion.div variants={fadeUpVariants}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-300 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Nur noch 5 Plätze für April verfügbar
              <TrendingUp className="h-3.5 w-3.5 text-red-300/80" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.15))',
              lineHeight: 1.1,
            }}
          >
            Mehr Kunden. Weniger Arbeit.{' '}
            <motion.span
              className="text-shimmer inline-block"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(16, 185, 129, 0.25))',
              }}
            >
              Vollautomatisch.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl"
          >
            Nie wieder verpasste Anrufe. Nie wieder No-Shows. Nie wieder vergessene Kunden.{' '}
            <span
              className="relative text-white"
              style={{
                textShadow: '0 0 24px rgba(59, 130, 246, 0.35)',
              }}
            >
              147+ lokale Unternehmen in Deutschland stoppen bereits den Umsatzverlust — vollautomatisch mit KI.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href={SITE_CONFIG.bookingUrl}
              className="pulse-glow group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:brightness-110 hover:shadow-emerald-500/25 sm:text-lg"
              style={{
                backgroundImage: 'linear-gradient(135deg, #10B981, #059669)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 30px -10px rgba(16,185,129,0.5)',
              }}
            >
              Kostenlose Demo buchen
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#module"
              onClick={(e) => handleSmoothScroll(e, '#module')}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/40 hover:bg-white/10 sm:text-lg"
            >
              <Sparkles
                className="h-5 w-5 text-emerald-300 transition-transform duration-200 group-hover:rotate-12"
                aria-hidden="true"
              />
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
              className="relative grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-white/10 lg:gap-0"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px -20px rgba(59,130,246,0.15)',
              }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="group flex flex-col items-center gap-2 px-2 text-center transition-all duration-300 hover:-translate-y-1 lg:px-4"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/20 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:ring-emerald-400/40"
                      style={{
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)',
                      }}
                    >
                      <Icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <span
                      className="bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
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

          {/* Trusted by mini-bar */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <div className="flex -space-x-2">
              {trustAvatars.map((avatar) => (
                <div
                  key={avatar.letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-950/80 text-xs font-semibold text-white/90 grayscale transition-all duration-300 hover:grayscale-0"
                  style={{
                    backgroundImage: avatar.gradient,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                  aria-hidden="true"
                >
                  {avatar.letter}
                </div>
              ))}
            </div>
            <span className="text-xs font-medium tracking-wide text-gray-500 sm:text-sm">
              Vertrauen von 147+ lokalen Unternehmen
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-white/60" />
          <ChevronDown className="h-4 w-4 animate-bounce text-white/50" />
        </div>
      </motion.div>
    </section>
  )
}
