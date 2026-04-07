"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Stethoscope,
  Scissors,
  Wrench,
  UtensilsCrossed,
  HeartPulse,
  Scale,
  type LucideIcon,
} from "lucide-react";
import type { BranchenTemplate } from "@/lib/branchen-templates";
import { SITE_CONFIG } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Scissors,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Scale,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface Props {
  template: BranchenTemplate;
  stadtName?: string;
}

export default function BranchePageContent({ template, stadtName }: Props) {
  const Icon = ICON_MAP[template.icon] ?? Stethoscope;
  const titleSuffix = stadtName ? ` in ${stadtName}` : "";

  return (
    <>
      {/* ----------- HERO ----------- */}
      <section className="relative overflow-hidden pb-20 pt-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-emerald-500/5 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 ring-1 ring-white/10">
                <Icon className="h-8 w-8 text-blue-400" />
              </div>
            </motion.div>

            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300"
            >
              {template.name}
              {stadtName ? ` · ${stadtName}` : ""}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mb-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              KI-Automatisierung für{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {template.name}
              </span>
              {stadtName ? (
                <>
                  {" "}
                  in{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {stadtName}
                  </span>
                </>
              ) : null}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mb-10 max-w-2xl text-lg text-gray-400"
            >
              {template.description}
              {stadtName
                ? ` Lokale ${template.name} in ${stadtName} vertrauen auf AI Growth System.`
                : ""}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Kostenlosen Demo-Call buchen
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/#preise"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Preise ansehen
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------- PAIN POINTS ----------- */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Typische Probleme in {template.name}
              {titleSuffix}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Diese Herausforderungen kennst du als Betreiber von{" "}
              {template.name}
              {titleSuffix} vermutlich nur zu gut:
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {template.painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut" as const,
                }}
                className="flex items-start gap-4 rounded-2xl border border-red-500/10 bg-gradient-to-br from-red-500/5 to-gray-900/60 p-6 backdrop-blur-sm"
              >
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 ring-1 ring-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <p className="text-gray-300">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------- WAS DU BEKOMMST / SERVICES ----------- */}
      <section className="border-t border-white/5 bg-gray-950/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="mb-14 text-center"
          >
            <span className="mb-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-300">
              Was du bekommst
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Komplette Automatisierung für {template.name}
              {titleSuffix}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Alle Services, die unser System für dich übernimmt — rund um die
              Uhr, ohne dass du einen Finger rühren musst.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {template.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: "easeOut" as const,
                }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-gray-900/60 p-4 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-200">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------- ROI TABELLE ----------- */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300">
              <TrendingUp className="mr-2 h-3.5 w-3.5" />
              Reale Ergebnisse
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Das ist möglich mit AI Growth System
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Durchschnittliche Verbesserungen, die unsere Kunden in{" "}
              {template.name}
              {titleSuffix} nach 90 Tagen erreichen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-sm"
          >
            <div className="grid grid-cols-3 border-b border-white/10 bg-gray-900/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <div>Kennzahl</div>
              <div className="text-center">Vorher</div>
              <div className="text-right">Nachher</div>
            </div>
            {template.roiExample.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center border-b border-white/5 px-6 py-5 last:border-b-0"
              >
                <div className="text-sm text-gray-300 sm:text-base">
                  {row.metric}
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center rounded-lg bg-red-500/10 px-3 py-1 text-sm font-medium text-red-300">
                    {row.before}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {row.after}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <a
              href={SITE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Jetzt ROI für deinen Betrieb berechnen
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ----------- FAQ ----------- */}
      <section className="border-t border-white/5 bg-gray-950/40 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="mb-14 text-center"
          >
            <span className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300">
              <HelpCircle className="mr-2 h-3.5 w-3.5" />
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Alles was du wissen musst
            </h2>
          </motion.div>

          <div className="space-y-4">
            {template.faq.map((item, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut" as const,
                }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left font-semibold text-white transition-colors hover:text-blue-300">
                  <span className="text-base sm:text-lg">{item.question}</span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-blue-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 text-gray-400">{item.answer}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------- FINAL CTA ----------- */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/15 via-gray-900/80 to-emerald-500/15 p-10 text-center backdrop-blur-sm sm:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="relative">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Bereit für mehr Termine in {template.name}
                {titleSuffix}?
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-gray-300">
                Kostenloser 30-Minuten Demo-Call. Wir zeigen dir live, wie das
                System in deinem Betrieb läuft. Keine Verpflichtung.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={SITE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Demo-Call buchen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/#preise"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Preise ansehen
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
