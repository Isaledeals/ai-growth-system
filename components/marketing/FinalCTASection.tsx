"use client";

import { motion } from "framer-motion";
import { Calendar, ShieldCheck, Lock, BadgeCheck, ArrowRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const trustBadges = [
  { icon: ShieldCheck, label: "DSGVO-konform" },
  { icon: Lock, label: "SSL-verschlüsselt" },
  { icon: BadgeCheck, label: "60-Tage Garantie" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FinalCTASection() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #1E40AF 100%)' }}
    >
      {/* Background texture — subtle pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Radial highlight top */}
        <div
          className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)' }}
        />
        {/* Bottom right accent */}
        <div
          className="absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #93C5FD 0%, transparent 70%)' }}
        />
        {/* Subtle dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="dot-grid-cta" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-cta)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              23 Unternehmen haben diese Woche eine Demo gebucht
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ihr KI-Assistent.{' '}
            <span className="text-blue-200">Nie krank. Nie im Urlaub. Immer für Ihre Kunden da.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg"
          >
            Buchen Sie jetzt Ihren kostenlosen Demo-Call — in 48h zeigen wir Ihnen wie Aufwind AI für Ihre Branche aussieht.
          </motion.p>

          {/* Avatar row */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {['MK', 'SW', 'TH'].map((initials) => (
                <div
                  key={initials}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-700 text-xs font-bold text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-sm text-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              12 weitere schauen sich gerade diese Seite an
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href={SITE_CONFIG.bookingUrl}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] sm:text-lg"
            >
              <Calendar className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              Kostenlose Demo buchen
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href={SITE_CONFIG.bookingUrl}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/50 hover:scale-[1.02] sm:text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Erstgespräch vereinbaren (kostenlos)
            </a>
          </motion.div>

          {/* No-commitment note */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-5 text-sm font-medium text-blue-200"
          >
            Keine Kreditkarte &nbsp;·&nbsp; Keine Verpflichtung &nbsp;·&nbsp; 60-Tage Garantie
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm font-medium text-blue-100"
                >
                  <Icon className="h-4 w-4 text-blue-200" strokeWidth={2} aria-hidden="true" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
