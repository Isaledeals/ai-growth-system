"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Stethoscope,
  Sparkles,
  Building2,
  Wrench,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Euro,
  Clock,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROI_DATA } from "@/lib/constants";

type IndustryKey = "zahnarzt" | "beauty" | "immobilien" | "handwerk";

interface IndustryOption {
  key: IndustryKey;
  label: string;
  icon: LucideIcon;
  defaultInquiries: number;
  defaultOrderValue: number;
  orderValueLabel: string;
}

const industries: IndustryOption[] = [
  {
    key: "zahnarzt",
    label: "Zahnarzt",
    icon: Stethoscope,
    defaultInquiries: 80,
    defaultOrderValue: 120,
    orderValueLabel: "Kosten pro No-Show €",
  },
  {
    key: "beauty",
    label: "Beauty/Kosmetik",
    icon: Sparkles,
    defaultInquiries: 60,
    defaultOrderValue: 80,
    orderValueLabel: "Durchschnittlicher Auftragswert €",
  },
  {
    key: "immobilien",
    label: "Immobilien",
    icon: Building2,
    defaultInquiries: 40,
    defaultOrderValue: 8000,
    orderValueLabel: "Durchschnittlicher Dealwert €",
  },
  {
    key: "handwerk",
    label: "Handwerk",
    icon: Wrench,
    defaultInquiries: 50,
    defaultOrderValue: 3500,
    orderValueLabel: "Durchschnittlicher Auftragswert €",
  },
];

const MONTHLY_COST = 1297; // Growth plan as reference

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function useAnimatedCounter(target: number, shouldAnimate: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  const animate = useCallback(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [target, duration]);

  useEffect(() => {
    if (shouldAnimate) {
      // Reset for new calculations
      animatedRef.current = false;
      setCount(0);
      // Small delay so the entering animation plays first
      const timer = setTimeout(() => animate(), 200);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, target, animate]);

  return count;
}

interface ResultsDisplayProps {
  results: { additionalRevenue: number; roi: number; daysToPayback: number };
  resultsKey: number;
  onGoBack: () => void;
}

function ResultsDisplay({ results, resultsKey, onGoBack }: ResultsDisplayProps) {
  const shouldAnimate = resultsKey > 0;
  const animatedRevenue = useAnimatedCounter(results.additionalRevenue, shouldAnimate, 1500);
  const animatedROI = useAnimatedCounter(Math.abs(results.roi), shouldAnimate, 1500);
  const animatedDays = useAnimatedCounter(results.daysToPayback, shouldAnimate, 1500);

  return (
    <>
      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {/* Additional Revenue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl bg-accent/10 ring-1 ring-accent/20 p-5 sm:p-6 text-center"
        >
          <Euro className="h-6 w-6 text-accent mx-auto mb-2" aria-hidden="true" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent tabular-nums">
            {formatCurrency(shouldAnimate ? animatedRevenue : results.additionalRevenue)}
          </div>
          <div className="text-sm text-muted mt-1">
            Zusätzlicher Umsatz/Monat
          </div>
        </motion.div>

        {/* ROI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl bg-primary/10 ring-1 ring-primary/20 p-5 sm:p-6 text-center"
        >
          <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tabular-nums">
            {results.roi > 0 ? "+" : results.roi < 0 ? "-" : ""}
            {shouldAnimate ? animatedROI : Math.abs(results.roi)}%
          </div>
          <div className="text-sm text-muted mt-1">ROI</div>
        </motion.div>

        {/* Days to Payback */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-xl bg-surface-light ring-1 ring-border p-5 sm:p-6 text-center"
        >
          <Clock className="h-6 w-6 text-foreground mx-auto mb-2" aria-hidden="true" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tabular-nums">
            {shouldAnimate ? animatedDays : results.daysToPayback}
          </div>
          <div className="text-sm text-muted mt-1">
            Amortisiert in Tagen
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/buchen"
          className="pulse-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Diese Ergebnisse für DEIN Unternehmen — Demo buchen
        </a>
        <p className="mt-3 text-xs text-muted">
          Kostenlos &middot; Unverbindlich &middot; Individuelle
          Berechnung
        </p>
      </div>

      {/* Back link */}
      <div className="mt-6 text-center">
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 text-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Werte anpassen
        </button>
      </div>
    </>
  );
}

export default function ROICalculator() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey | null>(
    null
  );
  const [monthlyInquiries, setMonthlyInquiries] = useState(60);
  const [orderValue, setOrderValue] = useState(0);
  const [resultsKey, setResultsKey] = useState(0);

  const currentIndustry = industries.find((i) => i.key === selectedIndustry);

  function handleIndustrySelect(key: IndustryKey) {
    const industry = industries.find((i) => i.key === key)!;
    setSelectedIndustry(key);
    setMonthlyInquiries(industry.defaultInquiries);
    setOrderValue(industry.defaultOrderValue);
    setDirection(1);
    setStep(2);
  }

  function goToStep(target: number) {
    setDirection(target > step ? 1 : -1);
    if (target === 3) {
      setResultsKey((k) => k + 1);
    }
    setStep(target);
  }

  const results = useMemo(() => {
    if (!selectedIndustry) return null;
    const data = ROI_DATA[selectedIndustry];
    let additionalRevenue = 0;

    switch (selectedIndustry) {
      case "zahnarzt":
        // additional_revenue = monthly_inquiries * noShowRate * noShowCost * 0.7
        additionalRevenue =
          monthlyInquiries *
          (data.noShowRate ?? 0.15) *
          orderValue *
          0.7;
        break;
      case "beauty":
        // additional_revenue = monthly_inquiries * reactivationRate * avgRevenue
        additionalRevenue =
          monthlyInquiries * (data.reactivationRate ?? 0.2) * orderValue;
        break;
      case "immobilien":
        // additional_revenue = (monthly_inquiries * conversionBoost * avgDeal) / 12
        additionalRevenue =
          (monthlyInquiries * (data.conversionBoost ?? 0.15) * orderValue) / 12;
        break;
      case "handwerk":
        // additional_revenue = monthly_inquiries * quoteToContract * avgJob * 0.28
        additionalRevenue =
          monthlyInquiries *
          (data.quoteToContract ?? 0.28) *
          orderValue *
          0.28;
        break;
    }

    const roi = Math.round(((additionalRevenue - MONTHLY_COST) / MONTHLY_COST) * 100);
    const daysToPayback =
      additionalRevenue > 0
        ? Math.max(1, Math.round((MONTHLY_COST / additionalRevenue) * 30))
        : 999;

    return {
      additionalRevenue: Math.round(additionalRevenue),
      roi,
      daysToPayback,
    };
  }, [selectedIndustry, monthlyInquiries, orderValue]);

  return (
    <section
      id="vorteile"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
            <Calculator className="h-4 w-4 text-accent" aria-hidden="true" />
            ROI-Rechner
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Berechne deinen ROI in{" "}
            <span className="gradient-text">30 Sekunden</span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (s === 1 || (s === 2 && selectedIndustry) || (s === 3 && selectedIndustry)) {
                    goToStep(s);
                  }
                }}
                aria-label={`Schritt ${s}${s === 1 ? ': Branche wählen' : s === 2 ? ': Deine Zahlen' : ': Ergebnis'}`}
                aria-current={s === step ? "step" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  s === step
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25"
                    : s < step
                    ? "bg-accent/20 text-accent ring-1 ring-accent/30"
                    : "bg-surface-light text-muted ring-1 ring-border"
                }`}
              >
                {s}
              </button>
              {s < 3 && (
                <div
                  className={`hidden sm:block w-16 h-[2px] rounded-full transition-colors duration-300 ${
                    s < step
                      ? "bg-gradient-to-r from-primary to-accent"
                      : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 min-h-[360px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Industry Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  Wähle deine Branche
                </h3>
                <p className="text-muted mb-8 text-sm sm:text-base">
                  Wir berechnen deinen ROI basierend auf echten Branchendaten.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {industries.map((industry) => {
                    const Icon = industry.icon;
                    const isSelected = selectedIndustry === industry.key;
                    return (
                      <button
                        key={industry.key}
                        onClick={() => handleIndustrySelect(industry.key)}
                        className={`group flex flex-col items-center gap-3 rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-accent/15 ring-2 ring-accent/40 shadow-lg shadow-accent/10"
                            : "bg-surface-light/50 ring-1 ring-border hover:ring-primary/30 hover:bg-surface-light"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-accent/20 text-accent"
                              : "bg-primary/10 text-primary group-hover:bg-primary/15"
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                        </div>
                        <span
                          className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                            isSelected ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {industry.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Input Fields */}
            {step === 2 && currentIndustry && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  Deine Zahlen
                </h3>
                <p className="text-muted mb-8 text-sm sm:text-base">
                  Passe die Werte an dein Unternehmen an.
                </p>

                <div className="space-y-8">
                  {/* Monthly Inquiries Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm sm:text-base font-medium text-foreground">
                        Monatliche Anfragen
                      </label>
                      <span className="text-xl sm:text-2xl font-bold gradient-text tabular-nums">
                        {monthlyInquiries}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      step={5}
                      value={monthlyInquiries}
                      aria-label={`Monatliche Anfragen: ${monthlyInquiries}`}
                      onChange={(e) =>
                        setMonthlyInquiries(Number(e.target.value))
                      }
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-light accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>10</span>
                      <span>200</span>
                    </div>
                  </div>

                  {/* Order Value Input */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-foreground mb-3">
                      {currentIndustry.orderValueLabel}
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" aria-hidden="true" />
                      <input
                        type="number"
                        value={orderValue}
                        onChange={(e) =>
                          setOrderValue(Number(e.target.value) || 0)
                        }
                        className="w-full rounded-xl bg-surface-light/80 border border-border px-12 py-3.5 text-lg font-semibold text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={() => goToStep(1)}
                    className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 text-sm sm:text-base"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Branche ändern
                  </button>
                  <button
                    onClick={() => goToStep(3)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
                  >
                    Berechnen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Results */}
            {step === 3 && results && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  Dein geschätzter ROI
                </h3>
                <p className="text-muted mb-8 text-sm sm:text-base">
                  Basierend auf Branchendurchschnitt für{" "}
                  <span className="text-foreground font-medium">
                    {ROI_DATA[selectedIndustry!]?.label}
                  </span>
                </p>

                {/* Results grid with animated counters */}
                <ResultsDisplay
                  results={results}
                  resultsKey={resultsKey}
                  onGoBack={() => goToStep(2)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
