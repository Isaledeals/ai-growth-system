"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ChevronRight } from "lucide-react";

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps = 5,
}: OnboardingProgressProps) {
  if (currentStep >= totalSteps) {
    return null;
  }

  const safeStep = Math.max(0, Math.min(currentStep, totalSteps));
  const percent = Math.round((safeStep / totalSteps) * 100);

  return (
    <Link
      href="/dashboard/onboarding"
      aria-label={`Setup fortsetzen – ${safeStep} von ${totalSteps} Schritten abgeschlossen`}
      className="group block"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-emerald-500/10 p-4 transition-colors hover:border-blue-500/40"
      >
        <div className="relative flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg shadow-blue-500/20">
            <Rocket className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-white">
                Setup abschließen
              </p>
              <ChevronRight
                className="h-3.5 w-3.5 flex-shrink-0 text-blue-400/70 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
            <p className="mt-0.5 text-[11px] text-gray-400">
              {safeStep} von {totalSteps} Schritten
            </p>

            {/* Progress bar */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
