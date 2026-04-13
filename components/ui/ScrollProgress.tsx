'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })
  const height = useTransform(smooth, [0, 1], ['0%', '100%'])
  const glowOpacity = useTransform(smooth, [0, 0.1], [0, 0.6])

  return (
    <div className="fixed left-3 top-0 bottom-0 z-50 hidden lg:flex items-start" aria-hidden="true">
      {/* Track */}
      <div className="w-[2px] h-full bg-white/[0.04] rounded-full">
        {/* Active line */}
        <motion.div
          className="w-full rounded-full"
          style={{
            height,
            background: 'linear-gradient(to bottom, #3B82F6, #10B981)',
          }}
        />
      </div>
      {/* Glow dot at current position */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          top: height,
          opacity: glowOpacity,
          background: '#10B981',
          boxShadow: '0 0 12px rgba(16,185,129,0.8), 0 0 30px rgba(16,185,129,0.4)',
        }}
      />
    </div>
  )
}
