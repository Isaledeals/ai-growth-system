"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { PRICING, type PricingTier } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE");
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const isHighlight = tier.highlight === true;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: isHighlight ? 1.02 : 1.04 }}
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 transition-shadow duration-300 ${
        isHighlight
          ? "glass-card ring-2 ring-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)] lg:scale-105 lg:z-10"
          : "glass-card"
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white ${
            isHighlight
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
              : "bg-gradient-to-r from-blue-500 to-blue-600"
          }`}
        >
          {tier.badge}
        </div>
      )}

      {/* Tier Name */}
      <h3 className="mt-2 text-lg font-semibold text-foreground">
        {tier.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            isHighlight ? "gradient-text" : "text-foreground"
          }`}
        >
          &euro;{formatPrice(tier.price)}
        </span>
        <span className="text-muted text-sm font-medium">/Mo</span>
      </div>

      {/* Setup Fee */}
      <p className="mt-2 text-sm text-muted">
        Setup:{" "}
        <span
          className={
            tier.setup === "GRATIS"
              ? "font-semibold text-emerald-400"
              : "font-medium text-foreground"
          }
        >
          {tier.setup === "GRATIS"
            ? "GRATIS"
            : `€${formatPrice(tier.setup)} einmalig`}
        </span>
      </p>

      {/* Divider */}
      <div className="my-6 h-px bg-border/50" />

      {/* Feature List */}
      <ul className="flex flex-1 flex-col gap-3">
        {tier.modules.map((mod) => (
          <li key={mod} className="flex items-start gap-3 text-sm">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isHighlight ? "text-emerald-400" : "text-blue-400"
              }`}
              strokeWidth={2.5}
            />
            <span className="text-gray-300">{mod}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href="#demo"
        className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
          isHighlight
            ? "text-white hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/25"
            : "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
        }`}
        style={
          isHighlight
            ? {
                backgroundImage:
                  "linear-gradient(135deg, #10B981, #059669)",
              }
            : undefined
        }
      >
        {isHighlight ? "Jetzt starten" : "Demo buchen"}
      </a>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="preise"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Investiere in{" "}
            <span className="gradient-text">automatisches Wachstum</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            W&auml;hle das Paket das zu deinem Unternehmen passt. Alle Pakete
            beinhalten pers&ouml;nliches Onboarding und Support.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 items-start"
        >
          {PRICING.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </motion.div>

        {/* Footer notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="text-sm text-muted">
            Alle Preise zzgl. MwSt.
          </p>

          {/* Money-back guarantee badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400">
            <ShieldCheck className="h-4 w-4" strokeWidth={2} />
            30 Tage Geld-zur&uuml;ck-Garantie
          </div>
        </motion.div>
      </div>
    </section>
  );
}
