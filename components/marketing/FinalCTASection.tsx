"use client";

import { motion } from "framer-motion";
import { Calendar, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const trustBadges = [
  { icon: ShieldCheck, label: "DSGVO-konform" },
  { icon: Lock, label: "SSL-verschl\u00fcsselt" },
  { icon: BadgeCheck, label: "30-Tage Garantie" },
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
  hidden: { opacity: 0, y: 30 },
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #3B82F6, #10B981)",
          }}
        />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
          >
            Bereit f&uuml;r{" "}
            <span className="gradient-text">automatisches Wachstum</span>?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl"
          >
            In 15 Minuten zeigen wir dir live, wie dein Unternehmen mit KI
            mehr Kunden gewinnt &mdash; vollautomatisch.
          </motion.p>

          {/* Live Counter */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            23 Unternehmen haben diese Woche eine Demo gebucht
          </motion.div>

          {/* Avatar row + live viewers */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {['MK', 'SW', 'TH'].map((initials) => (
                <div
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 text-xs font-bold text-white"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #3B82F6, #10B981)',
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              und 12 weitere schauen sich gerade diese Seite an
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <a
              href={SITE_CONFIG.bookingUrl}
              className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:brightness-110 hover:shadow-emerald-500/25 hover:scale-[1.03]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #10B981, #059669)",
              }}
            >
              <Calendar className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              Jetzt kostenlosen Demo-Call buchen
            </a>
          </motion.div>

          {/* No-commitment note */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-5 text-sm text-muted"
          >
            Keine Verpflichtung &mdash; Keine Kreditkarte &mdash; 100%
            kostenlos
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <Icon className="h-4 w-4 text-emerald-400" strokeWidth={2} aria-hidden="true" />
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
