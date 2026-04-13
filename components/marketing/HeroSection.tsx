'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Phone, Calendar, Star, MessageSquare, Bell } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import ShimmerButton from '@/components/ui/ShimmerButton'
import ShinyText from '@/components/ui/ShinyText'
import BlurText from '@/components/ui/BlurText'
import MeshGradientBg from '@/components/ui/MeshGradientBg'

const branchen = [
  'Zahnarztpraxis', 'Physiotherapie', 'Anwaltskanzlei',
  'Handwerksbetrieb', 'Beauty Studio', 'Immobilien',
]

const mockActivities = [
  { icon: Phone,         text: 'Zahnarztpraxis Weber: Anruf entgegengenommen', time: 'gerade eben', color: '#60A5FA' },
  { icon: Calendar,      text: 'Beauty Studio: 3 Termine gebucht',              time: 'vor 2 Min',   color: '#34D399' },
  { icon: Star,          text: 'Handwerk Müller: 5★ Google-Bewertung',          time: 'vor 5 Min',   color: '#FCD34D' },
  { icon: MessageSquare, text: 'Physiotherapie Kern: Follow-up gesendet',       time: 'vor 8 Min',   color: '#A78BFA' },
  { icon: Bell,          text: 'Immobilienbüro Schmitt: No-Show verhindert',    time: 'vor 12 Min',  color: '#34D399' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0F1C] px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:px-8">

      {/* ── MeshGradient WebGL Background ── */}
      <MeshGradientBg />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-start">

            {/* Live badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Über 150 lokale Unternehmen vertrauen Aufwind AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]"
            >
              <ShinyText className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">
                74% weniger
              </ShinyText>
              <br />
              No-Shows.
              <br />
              <span className="text-slate-400">Automatisch.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              <BlurText
                text="Ihr KI-Assistent schläft nie, wird nie krank und vergisst keinen Rückruf — für Zahnarztpraxen, Physiotherapeuten, Anwaltskanzleien und Handwerksbetriebe."
                delay={0.4}
              />
            </motion.p>

            {/* Bullets */}
            <motion.ul custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-7 flex flex-col gap-3">
              {[
                '74% weniger No-Shows — nachgewiesen',
                'Live in 5 Werktagen — kein Setup-Aufwand für Sie',
                '60-Tage Geld-zurück-Garantie — kein Risiko',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <ShimmerButton href={SITE_CONFIG.bookingUrl} size="md">
                Kostenlose Demo buchen
                <ArrowRight className="h-5 w-5" />
              </ShimmerButton>
              <a
                href="#wie-es-funktioniert"
                onClick={(e) => { e.preventDefault(); document.querySelector('#wie-es-funktioniert')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-slate-300 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/25 hover:text-white"
              >
                Wie es funktioniert
              </a>
            </motion.div>

            {/* Branchen pills */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mt-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-600">Ihre Branche dabei?</p>
              <div className="flex flex-wrap gap-2">
                {branchen.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs font-medium text-slate-500 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-blue-500/8 hover:text-blue-400 cursor-default"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' as const }}
            className="relative hidden lg:block"
          >
            {/* Blue glow behind card */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.25) 0%, transparent 70%)',
                filter: 'blur(35px)',
                transform: 'scale(1.15)',
              }}
              aria-hidden="true"
            />

            {/* Card */}
            <div
              className="relative rounded-2xl p-5"
              style={{
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Live Dashboard</p>
                  <h3 className="mt-0.5 text-sm font-bold text-white">Aufwind AI — Aktivitätsfeed</h3>
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">Online</span>
                </div>
              </div>

              {/* Activity feed */}
              <div className="flex flex-col gap-2">
                {mockActivities.map((activity, i) => {
                  const Icon = activity.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease: 'easeOut' as const }}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${activity.color}18` }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: activity.color }} />
                      </div>
                      <p className="min-w-0 flex-1 truncate text-xs font-medium text-slate-300">{activity.text}</p>
                      <span className="shrink-0 text-[10px] text-slate-600">{activity.time}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Stats */}
              <div
                className="mt-4 grid grid-cols-3 gap-2 border-t pt-4"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                {[
                  { label: 'Heute gebucht', value: '12', color: '#60A5FA' },
                  { label: 'No-Shows',       value: '0',  color: '#34D399' },
                  { label: 'Neue Reviews',   value: '3',  color: '#FCD34D' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-10"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {[
            '🔒 DSGVO-konform',
            '🇩🇪 Server Deutschland',
            '⚡ Live in 5 Tagen',
            '↩ Monatlich kündbar',
            '✅ 60-Tage Garantie',
          ].map((item) => (
            <span key={item} className="text-sm font-medium text-slate-600">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
