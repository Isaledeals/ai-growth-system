'use client'

import { motion, useInView } from 'framer-motion'
import {
  Calendar,
  TrendingDown,
  Star,
  Clock,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronDown,
  Phone,
  MessageSquare,
  Bell,
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
  { letter: 'Z', bg: '#2563EB' },
  { letter: 'F', bg: '#059669' },
  { letter: 'B', bg: '#7C3AED' },
  { letter: 'H', bg: '#D97706' },
  { letter: 'M', bg: '#DC2626' },
]

const mockActivities = [
  { icon: Phone, text: 'Zahnarztpraxis Weber: Anruf entgegengenommen', time: 'gerade eben', color: '#2563EB' },
  { icon: Calendar, text: 'Beauty Studio: 3 Termine gebucht', time: 'vor 2 Min', color: '#059669' },
  { icon: Star, text: 'Handwerk Müller: 5★ Google-Bewertung', time: 'vor 5 Min', color: '#D97706' },
  { icon: MessageSquare, text: 'Physiotherapie Kern: Follow-up gesendet', time: 'vor 8 Min', color: '#7C3AED' },
  { icon: Bell, text: 'Immobilienbüro Schmitt: No-Show verhindert', time: 'vor 12 Min', color: '#059669' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      {/* Background: subtle blue gradient blobs top-right */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large soft blue blob top-right */}
        <div
          className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        {/* Smaller accent blob */}
        <div
          className="absolute top-48 right-16 h-[300px] w-[300px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
        {/* Very subtle bottom-left blob */}
        <div
          className="absolute -bottom-16 -left-16 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        {/* Subtle dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="dot-grid-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0F172A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-light)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeUpVariants}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                Über 150 lokale Unternehmen vertrauen Aufwind AI
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.05]"
            >
              Mehr Kunden.{' '}
              <br className="hidden sm:block" />
              Weniger Arbeit.{' '}
              <br />
              <motion.span
                className="text-shimmer inline-block"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut' as const,
                  repeat: Infinity,
                }}
              >
                Vollautomatisch.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl"
            >
              Aufwind AI übernimmt Terminbuchung, Telefonassistenz und Kundenkommunikation — 24/7, ohne dass du einen Finger rührst.
            </motion.p>

            {/* Feature bullets */}
            <motion.ul variants={fadeUpVariants} className="mt-6 flex flex-col gap-2.5">
              {[
                'Kein verpasster Anruf mehr — nie wieder',
                'No-Show-Rate sinkt um bis zu 74%',
                'Setup in 48h — kein technisches Wissen nötig',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={SITE_CONFIG.bookingUrl}
                className="pulse-glow-blue group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] sm:text-lg"
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:scale-[1.02] sm:text-lg"
              >
                <Play className="h-4 w-4 text-blue-600" aria-hidden="true" />
                Wie es funktioniert
              </a>
            </motion.div>

            {/* Trust Avatars */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {trustAvatars.map((avatar) => (
                  <div
                    key={avatar.letter}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: avatar.bg }}
                    aria-hidden="true"
                  >
                    {avatar.letter}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-600">
                  150+ Unternehmen vertrauen uns bereits
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' as const }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              {/* Card header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Dashboard</p>
                  <h3 className="mt-0.5 text-base font-bold text-slate-900">Aufwind AI — Aktivitätsfeed</h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">Online</span>
                </div>
              </div>

              {/* Activity feed */}
              <div className="flex flex-col gap-3">
                {mockActivities.map((activity, i) => {
                  const Icon = activity.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: 'easeOut' as const }}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: activity.color }} aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-slate-700">{activity.text}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-slate-400">{activity.time}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                {[
                  { label: 'Heute gebucht', value: '12' },
                  { label: 'No-Shows', value: '0' },
                  { label: 'Neue Reviews', value: '3' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-slate-50 p-3 text-center">
                    <p
                      className="text-xl font-bold"
                      style={{ color: '#2563EB' }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — top left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, ease: 'easeInOut' as const, repeat: Infinity }}
              className="absolute -left-8 top-8 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Anruf beantwortet</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, ease: 'easeInOut' as const, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-6 bottom-12 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-700">5-Sterne Bewertung</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' as const }}
          className="mt-16 sm:mt-20"
        >
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-200 lg:gap-0"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center gap-2 px-2 text-center transition-all duration-300 hover:-translate-y-1 lg:px-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 ring-1 ring-blue-200 transition-all duration-300 group-hover:bg-blue-200">
                    <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600 sm:text-3xl">
                    <AnimatedCounter
                      target={stat.numericValue}
                      suffix={stat.suffix}
                      inView={statsInView}
                    />
                  </span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
              )
            })}
          </div>
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
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-slate-400" />
          <ChevronDown className="h-4 w-4 animate-bounce text-slate-400" />
        </div>
      </motion.div>
    </section>
  )
}
