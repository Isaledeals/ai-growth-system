'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, TrendingDown, Star, Clock } from 'lucide-react'

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
                    <Icon className="h-5 w-5 text-blue-400" />
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
        </motion.div>
      </div>
    </section>
  )
}
