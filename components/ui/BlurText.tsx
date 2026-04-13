'use client'

import { motion } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export default function BlurText({ text, className = '', delay = 0.3 }: BlurTextProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ filter: 'blur(8px)', opacity: 0, y: 8 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
