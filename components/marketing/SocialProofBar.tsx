'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, TrendingDown, Star, Clock } from 'lucide-react'

const liveActivities = [
  'Zahnarztpraxis Dr. Weber hat gerade 3 neue Termine gebucht',
  'Beauty Studio Glamour: 5-Sterne Bewertung erhalten',
  'Handwerksbetrieb Müller: Neuer Lead aus Google',
  'Immobilienbüro Kern: Follow-up automatisch versendet',
]

const metrics = [
  {
    icon: Calendar,
    value: '2.400+',
    label: 'Termine gebucht',
  },
  {
    icon: TrendingDown,
    value: '74%',
    label: 'No-Shows reduziert',
  },
  {
    icon: Star,
    value: '850+',
    label: 'Google Bewertungen',
  },
  {
    icon: Clock,
    value: '15h/Woche',
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
    <section className="relative bg-gray-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Icon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <span
                    className="text-2xl font-bold bg-clip-text text-transparent sm:text-3xl"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    {metric.label}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Live Activity Ticker */}
          <div className="mt-6 flex items-center justify-center gap-3 border-t border-white/5 pt-5">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Live</span>
            </div>
            <div className="relative h-6 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 text-sm text-gray-300 text-center sm:text-left"
                >
                  {liveActivities[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
