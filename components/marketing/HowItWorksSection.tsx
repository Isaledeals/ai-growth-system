"use client";

import { motion } from "framer-motion";
import { Phone, Settings, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Phone,
    title: "45-Min Demo-Call",
    description:
      "Wir zeigen Ihnen wie es für Ihre Branche aussieht. Kostenlos, unverbindlich, ohne Vorbereitung Ihrerseits.",
  },
  {
    number: 2,
    icon: Settings,
    title: "Buchungs-URL + Telefonnummer",
    description:
      "Sie schicken uns Ihre bestehende Buchungs-URL und Ihre Telefonnummer. Das ist alles. Kein IT-Projekt.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Tag 5: Ihr System ist live",
    description:
      "Wir bauen alles. In 5 Werktagen ist Ihr KI-Assistent aktiv — ohne dass Sie auch nur einmal in ein Dashboard schauen müssen.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={stepVariants}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Number circle */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-blue-100 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-200/60 transition-transform duration-300 group-hover:scale-110">
          <span className="text-2xl font-bold text-white">
            {step.number}
          </span>
        </div>
      </div>

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-muted leading-relaxed text-sm sm:text-base max-w-xs mx-auto">
        {step.description}
      </p>

      {/* Step indicator pill */}
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        Schritt {index + 1} von {steps.length}
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-50 opacity-70 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Tag 1: Demo-Call.{" "}
            <span className="gradient-text">Tag 5: Ihr KI-Assistent ist live.</span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-blue-600" />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Connector line — horizontal on desktop */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #2563EB, #3B82F6, #2563EB)",
              opacity: 0.25,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </motion.div>

        {/* 60-Tage Garantie Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-6 text-center"
        >
          <p className="text-base font-bold text-emerald-800 sm:text-lg">
            60-Tage Garantie
          </p>
          <p className="mt-2 text-sm leading-relaxed text-emerald-700 max-w-2xl mx-auto">
            Wenn Sie nach 60 Tagen nicht mindestens 8 Stunden pro Woche einsparen — bekommen Sie jeden Euro zurück. Ohne Diskussion.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="/buchen"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200/70 hover:scale-105 active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Jetzt Demo-Call buchen
          </a>
          <p className="mt-3 text-sm text-muted">
            Kostenlos &middot; Unverbindlich &middot; 45 Minuten
          </p>
        </motion.div>
      </div>
    </section>
  );
}
