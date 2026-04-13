'use client'

import { motion } from 'framer-motion'

interface BackgroundPathsProps {
  className?: string
}

export default function BackgroundPaths({ className = '' }: BackgroundPathsProps) {
  const paths = [
    { d: 'M0,120 C150,180 350,40 500,120 C650,200 850,60 1000,120', color: '#3B82F6', opacity: 0.08, duration: 18, delay: 0 },
    { d: 'M0,200 C200,100 400,280 600,180 C800,80 900,260 1000,180', color: '#10B981', opacity: 0.06, duration: 22, delay: 2 },
    { d: 'M0,80 C100,160 300,20 500,100 C700,180 850,40 1000,80', color: '#3B82F6', opacity: 0.05, duration: 25, delay: 4 },
    { d: 'M0,160 C250,60 450,240 650,140 C850,40 950,200 1000,160', color: '#10B981', opacity: 0.07, duration: 20, delay: 1 },
    { d: 'M0,240 C180,140 380,300 580,200 C780,100 880,280 1000,220', color: '#3B82F6', opacity: 0.04, duration: 28, delay: 3 },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        fill="none"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            stroke={path.color}
            strokeWidth="1.5"
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              pathLength: { duration: path.duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
              opacity: { duration: 1, delay: path.delay },
            }}
          />
        ))}
      </svg>
    </div>
  )
}
