'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface RiseSectionProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
  delay?: number
}

export default function RiseSection({
  children,
  className = '',
  intensity = 'medium',
  delay = 0,
}: RiseSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  const config = {
    subtle: { rotateX: 3, y: 40, scale: 0.98 },
    medium: { rotateX: 6, y: 80, scale: 0.96 },
    strong: { rotateX: 10, y: 120, scale: 0.93 },
  }[intensity]

  const opacity = useTransform(smooth, [0, 0.6], [0, 1])
  const y = useTransform(smooth, [0, 1], [config.y, 0])
  const rotateX = useTransform(smooth, [0, 1], [config.rotateX, 0])
  const scale = useTransform(smooth, [0, 1], [config.scale, 1])

  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={className}>
      <motion.div
        style={{ opacity, y, rotateX, scale, transformOrigin: 'center bottom' }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
