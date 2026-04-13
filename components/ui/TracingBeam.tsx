'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface TracingBeamProps {
  children: React.ReactNode
  className?: string
}

export default function TracingBeam({ children, className = '' }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(smoothProgress, [0, 0.05], [0, 1])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Beam container — only visible on lg */}
      <div className="absolute left-4 top-0 bottom-0 hidden lg:block xl:left-8">
        {/* Track (faint line) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

        {/* Active beam (grows with scroll) */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full"
          style={{
            height,
            opacity,
            background: 'linear-gradient(to bottom, #3B82F6, #10B981)',
            boxShadow: '0 0 8px rgba(59,130,246,0.5), 0 0 20px rgba(16,185,129,0.3)',
          }}
        />

        {/* Glow dot at the end of the beam */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            top: height,
            opacity,
            background: 'radial-gradient(circle, #10B981, transparent)',
            boxShadow: '0 0 12px rgba(16,185,129,0.8)',
          }}
        />
      </div>

      {/* Content with left padding for beam */}
      <div className="lg:pl-16 xl:pl-20">
        {children}
      </div>
    </div>
  )
}
