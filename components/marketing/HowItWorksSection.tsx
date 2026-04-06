"use client";

import { motion } from "framer-motion";
import { Phone, Settings, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Phone,
    title: "Kostenloser Demo-Call",
    description:
      "In 15 Minuten zeigen wir dir live wie das System f\u00fcr DEINE Branche funktioniert. Keine Verpflichtung.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Wir richten alles ein",
    description:
      "Unser Team konfiguriert das komplette System f\u00fcr dich. Du musst keinen Finger r\u00fchren.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Dein Business w\u00e4chst automatisch",
    description:
      "Das System arbeitet 24/7. Du bekommst mehr Anfragen, mehr Termine, mehr Kunden \u2014 auf Autopilot.",
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

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
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
            In 3 Schritten zum{" "}
            <span className="gradient-text">automatischen Wachstum</span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Connector line - horizontal on lg, vertical on smaller */}
          {/* Desktop horizontal line */}
          <div className="hidden lg:block absolute top-[72px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
          {/* Mobile/tablet vertical line */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-[2px] bg-gradient-to-b from-primary via-accent to-primary opacity-20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0 pl-16 lg:pl-0"
                >
                  {/* Step number with gradient */}
                  <div className="absolute left-0 lg:relative flex-shrink-0">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-md" />
                      {/* Number circle */}
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-surface ring-2 ring-accent/30">
                        <span className="text-2xl font-bold gradient-text">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:mt-6">
                    {/* Icon */}
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 lg:mx-auto">
                      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted leading-relaxed text-sm sm:text-base max-w-xs lg:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
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
