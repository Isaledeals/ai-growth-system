"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Zap } from "lucide-react";
import AufwindBeam from "@/components/marketing/AufwindBeam";
import { PRICING, type PricingTier } from "@/lib/constants";
import CheckoutButton from "./CheckoutButton";
import AnimatedBorder from "@/components/ui/AnimatedBorder";

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

function mapTierToPlan(tier: PricingTier): "pro" | "premium" {
  if (tier.name === "Premium") return "premium";
  return "pro";
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const isHighlight = tier.highlight === true;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);

    // 3D tilt — nur auf lg screens
    if (window.innerWidth >= 1024) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 6;
      setTilt({ rotateX, rotateY });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? 'transform 0.4s ease' : 'transform 0.1s ease',
  };

  const cardContent = (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      animate={isHighlight ? {
        boxShadow: [
          '0 0 20px rgba(37,99,235,0.3)',
          '0 0 40px rgba(37,99,235,0.5)',
          '0 0 20px rgba(37,99,235,0.3)',
        ],
      } : undefined}
      transition={isHighlight ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
      className={`spotlight-card relative flex flex-col rounded-2xl p-6 sm:p-8 transition-colors duration-300 group overflow-hidden ${
        isHighlight
          ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-200"
          : "bg-white border-2 border-blue-200 shadow-lg"
      }`}
    >
      {/* Spotlight overlay — subtle on premium, light on pro */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
        style={{
          background: isHighlight
            ? "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.08), transparent 60%)"
            : "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(37,99,235,0.05), transparent 60%)",
        }}
      />

      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
          {tier.badge}
        </div>
      )}

      {/* Tier Name */}
      <h3
        className={`relative mt-2 text-lg font-semibold ${
          isHighlight ? "text-white" : "text-foreground"
        }`}
      >
        {tier.name}
      </h3>

      {/* Subtitle */}
      {tier.subtitle && (
        <p
          className={`relative text-sm ${
            isHighlight ? "text-blue-100" : "text-muted"
          }`}
        >
          {tier.subtitle}
        </p>
      )}

      {/* Price */}
      <div className="relative mt-4 flex items-baseline gap-1">
        <span
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            isHighlight ? "text-white" : "gradient-number"
          }`}
        >
          &euro;{formatPrice(tier.price)}
        </span>
        <span
          className={`text-sm font-medium ${
            isHighlight ? "text-blue-100" : "text-muted"
          }`}
        >
          /Mo
        </span>
      </div>

      {/* Setup Fee */}
      <p
        className={`relative mt-2 text-sm ${
          isHighlight ? "text-blue-100" : "text-muted"
        }`}
      >
        Setup:{" "}
        {tier.originalSetup ? (
          <>
            <span className="line-through opacity-60">
              &euro;{formatPrice(tier.originalSetup)}
            </span>{" "}
            <span
              className={`font-semibold ${
                isHighlight ? "text-emerald-300" : "text-emerald-600"
              }`}
            >
              GRATIS
            </span>
          </>
        ) : (
          <span className="font-medium">
            {tier.setup === "GRATIS"
              ? "GRATIS"
              : `\u20AC${formatPrice(tier.setup as number)} einmalig`}
          </span>
        )}
      </p>

      {/* Urgency label */}
      {isHighlight && tier.originalSetup && (
        <div className="relative mt-3 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center">
          <p className="text-xs font-semibold text-emerald-300">
            Spare &euro;{formatPrice(tier.originalSetup)} &mdash; Setup GRATIS bei Buchung diese Woche
          </p>
        </div>
      )}

      {/* Divider */}
      <div
        className={`relative my-6 h-px ${
          isHighlight ? "bg-white/20" : "bg-slate-100"
        }`}
      />

      {/* Feature List */}
      <ul className="relative flex flex-1 flex-col gap-3">
        {tier.modules.map((mod) => (
          <li key={mod} className="flex items-start gap-3 text-sm">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isHighlight ? "text-emerald-300" : "text-emerald-600"
              }`}
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span
              className={isHighlight ? "text-blue-50" : "text-slate-700"}
            >
              {mod}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <CheckoutButton
        plan={mapTierToPlan(tier)}
        branche="default"
        className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {/* Shimmer sweep */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" aria-hidden="true" />
        <span className="relative z-10">Jetzt starten</span>
      </CheckoutButton>
    </motion.div>
  );

  if (isHighlight) {
    return (
      <AnimatedBorder className="lg:scale-105 lg:z-10">
        {cardContent}
      </AnimatedBorder>
    );
  }

  return cardContent;
}

export default function PricingSection() {
  return (
    <section
      id="preise"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-100 opacity-30 blur-3xl" />
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
          <AufwindBeam variant="badge" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Transparent. Fair.{" "}
            <span className="gradient-text">Kein Kleingedrucktes.</span>
          </h2>

          {/* Preisanker — zeigt Kontext BEVOR die Preise sichtbar sind */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { label: 'Vollzeit-Empfang', price: '€3.500', sub: 'pro Monat', note: 'Urlaub · Krank · Kündigt', muted: true },
              { label: 'Marketing-Agentur', price: '€4.000+', sub: 'pro Monat', note: 'Nur Leads, kein Service', muted: true },
              { label: 'Aufwind AI', price: 'ab €697', sub: 'pro Monat', note: '24/7 · Nie krank · Vollauto.', muted: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-3 text-center ${item.muted ? 'bg-slate-100 opacity-70' : 'bg-white border-2 shadow-md'}`}
                style={!item.muted ? { borderColor: '#2563EB', boxShadow: '0 4px 20px rgba(37,99,235,0.15)' } : {}}
              >
                <p className={`text-[11px] font-semibold uppercase tracking-wide mb-1 ${item.muted ? 'text-slate-400' : 'text-blue-600'}`}>{item.label}</p>
                <p className={`text-xl font-extrabold tracking-tight ${item.muted ? 'text-slate-400 line-through' : 'gradient-number'}`}>{item.price}</p>
                <p className={`text-[11px] ${item.muted ? 'text-slate-400' : 'text-slate-500'}`}>{item.sub}</p>
                <p className={`mt-1.5 text-[10px] font-medium ${item.muted ? 'text-slate-400' : 'text-emerald-600'}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto lg:gap-8 items-center"
        >
          {PRICING.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </motion.div>

        {/* Garantie Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 max-w-2xl mx-auto rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-center"
        >
          <p className="text-sm font-bold text-emerald-800">
            Keine Überraschungen. Monatlich kündbar ab Monat 3. Keine versteckten Kosten.
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            60-Tage Geld-zurück-Garantie wenn es sich nicht lohnt.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-sm text-muted">Alle Preise zzgl. MwSt.</p>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              60 Tage Geld-zur&uuml;ck
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Monatlich k&uuml;ndbar
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
              <Zap className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Live in 5 Werktagen
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
