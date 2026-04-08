'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, TrendingDown, Star, Clock } from 'lucide-react'

const liveActivities = [
  'Zahnarztpraxis Dr. Weber hat gerade 3 neue Termine gebucht',
  'Beauty Studio Glamour: 5-Sterne Bewertung erhalten',
  'Handwerksbetrieb Müller: Neuer Lead aus Google',
  'Immobilienbüro Kern: Follow-up automatisch versendet',
  'Physiotherapie Hansen: No-Show durch Erinnerung verhindert',
]

const metrics = [
  {
    icon: Calendar,
    value: 2400,
    suffix: '+',
    display: '2.400+',
    label: 'Termine gebucht',
  },
  {
    icon: TrendingDown,
    value: 74,
    suffix: '%',
    display: '74%',
    label: 'No-Shows reduziert',
  },
  {
    icon: Star,
    value: 850,
    suffix: '+',
    display: '850+',
    label: 'Google Bewertungen',
  },
  {
    icon: Clock,
    value: 15,
    suffix: 'h/Woche',
    display: '15h/Woche',
    label: 'Zeitersparnis',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const duration = 1600
    const startTime = performance.now()
    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [target])

  useEffect(() => {
    if (inView) animate()
  }, [inView, animate])

  const formatted = target >= 1000
    ? new Intl.NumberFormat('de-DE').format(count)
    : count.toString()

  return <>{formatted}{suffix}</>
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % liveActivities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
        >
          {/* Section label */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            Ergebnisse unserer Kunden
          </motion.p>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-extrabold text-blue-600 sm:text-3xl">
                    <AnimatedCounter
                      target={metric.value}
                      suffix={metric.suffix}
                      inView={isInView}
                    />
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {metric.label}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Live Activity Ticker */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-3 border-t border-slate-200 pt-5"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Live</span>
            </div>
            <div className="relative h-6 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' as const }}
                  className="absolute inset-0 text-sm font-medium text-slate-600 text-center sm:text-left"
                >
                  {liveActivities[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
