'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

interface Props {
  headline: string
  sub?: string
  cta?: string
}

export default function InlineCTA({ headline, sub, cta = 'Kostenlose Demo buchen' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* Subtle gradient bg strip */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(5,150,105,0.03) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Top/bottom beam lines */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.2), rgba(5,150,105,0.2), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.2), rgba(5,150,105,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <p className="text-lg font-semibold text-slate-800 sm:text-xl">{headline}</p>
        {sub && <p className="text-sm text-slate-500">{sub}</p>}
        <a
          href={SITE_CONFIG.bookingUrl}
          className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          style={{ boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
        <p className="text-xs text-slate-400">Keine Kreditkarte · Keine Verpflichtung · 60-Tage Garantie</p>
      </div>
    </motion.div>
  )
}
