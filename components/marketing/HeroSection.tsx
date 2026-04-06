'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendingDown, Star, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const stats = [
  { icon: Calendar, value: '2.400+', label: 'Termine' },
  { icon: TrendingDown, value: '74%', label: 'weniger No-Shows' },
  { icon: Star, value: '850+', label: 'Bewertungen' },
  { icon: Clock, value: '15h/Woche', label: 'gespart' },
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

export default function HeroSection() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 pt-20 sm:px-6 lg:px-8">
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
            <span className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
              Für lokale Unternehmen in Deutschland
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Mehr Kunden. Weniger Arbeit.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
              }}
            >
              Vollautomatisch.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
          >
            Das KI-System das lokale Unternehmen in Deutschland nutzen um keine Anfrage mehr zu
            verlieren — 24/7 aktiv
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
              className="inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-emerald-500/25 sm:text-lg"
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
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-emerald-400" />
                    <span
                      className="text-2xl font-bold bg-clip-text text-transparent sm:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
                      }}
                    >
                      {stat.value}
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
