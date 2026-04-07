"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, ArrowRight } from "lucide-react";

export interface ReferralWidgetProps {
  referralCode: string;
  earnedAmount?: number;
}

export default function ReferralWidget({
  referralCode,
  earnedAmount = 0,
}: ReferralWidgetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    },
    [referralCode]
  );

  const earnedLabel = earnedAmount.toLocaleString("de-DE");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl glass-card p-6"
    >
      {/* Decorative gradient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 to-emerald-500/30 blur-2xl"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg shadow-blue-500/20">
            <Gift className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">
              Empfehle uns weiter
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">
              €100 sparen pro aktivem Kunden den du wirbst
            </p>
          </div>
        </div>

        {/* Referral code block */}
        <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
            Dein Empfehlungs-Code
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <code className="truncate font-mono text-base font-bold text-white">
              {referralCode}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={
                copied ? "Code wurde kopiert" : "Code in Zwischenablage kopieren"
              }
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                copied
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Kopiert!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  Kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Earned display */}
        {earnedAmount > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-500/5 px-3 py-2 text-sm">
            <span className="text-gray-400">Bereits gespart</span>
            <span className="font-semibold text-emerald-400">
              €{earnedLabel}
            </span>
          </div>
        )}

        {/* CTA link */}
        <Link
          href="/dashboard/referral"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
        >
          Zur Übersicht
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.div>
  );
}
