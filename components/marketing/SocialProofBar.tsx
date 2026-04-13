'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, TrendingDown, Star, Users, ShieldCheck, MapPin, RefreshCw } from 'lucide-react'
import AufwindBeam from '@/components/marketing/AufwindBeam'

const metricIcons = [Calendar, TrendingDown, Star, Users]
const trustBadgeIcons = [ShieldCheck, MapPin, RefreshCw]

interface SocialProofDict {
  metrics: { display: string; label: string }[]
  trustBadges: { text: string }[]
  liveActivities: string[]
}

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

export default function SocialProofBar({ dict }: { dict: SocialProofDict }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dict.liveActivities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [dict.liveActivities.length])

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
          style={{ animation: 'glow-pulse 4s ease-in-out infinite' }}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <AufwindBeam variant="badge" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Ergebnisse unserer Kunden
            </p>
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {dict.metrics.map((metric, idx) => {
              const Icon = metricIcons[idx] ?? Calendar
              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <span className="gradient-number text-2xl font-extrabold sm:text-3xl">
                    {metric.display}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {metric.label}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-5"
          >
            {dict.trustBadges.map((badge, idx) => {
              const Icon = trustBadgeIcons[idx] ?? ShieldCheck
              return (
                <div
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                  {badge.text}
                </div>
              )
            })}
          </motion.div>

          {/* Live Activity Ticker */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex items-center justify-center gap-3 border-t border-slate-200 pt-4"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Live</span>
            </div>
            <div
              className="relative h-6 flex-1 overflow-hidden border-l-2 pl-3"
              style={{ borderColor: 'rgba(37,99,235,0.4)' }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' as const }}
                  className="absolute inset-0 text-sm font-medium text-slate-600 text-center sm:text-left"
                >
                  {dict.liveActivities[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
