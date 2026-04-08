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
    title: "Demo buchen",
    description:
      "In 15 Minuten zeigen wir dir live wie das System f\u00fcr DEINE Branche funktioniert. Kostenlos und unverbindlich.",
  },
  {
    number: 2,
    icon: Settings,
    title: "Setup durch unser Team",
    description:
      "Unser Team konfiguriert das komplette System f\u00fcr dich. Kein technisches Wissen n\u00f6tig — du musst keinen Finger r\u00fchren.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "KI l\u00e4uft 24/7",
    description:
      "Das System arbeitet rund um die Uhr. Mehr Anfragen, mehr Termine, mehr Kunden \u2014 vollautomatisch auf Autopilot.",
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
            In 3 Schritten live &mdash;{" "}
            <span className="gradient-text">in 48 Stunden.</span>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/buchen"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200/70 hover:scale-105 active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Jetzt Demo-Call buchen
          </a>
          <p className="mt-3 text-sm text-muted">
            Kostenlos &middot; Unverbindlich &middot; 15 Minuten
          </p>
        </motion.div>
      </div>
    </section>
  );
}
