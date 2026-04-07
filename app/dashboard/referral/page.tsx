"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Share2,
  Gift,
  Users,
  UserCheck,
  Euro,
  MessageCircle,
  Mail,
  Briefcase,
  ArrowRight,
  Check,
  Clock,
  UserPlus,
  Zap,
} from "lucide-react";

// ────────────────── Mock Data ──────────────────

const REFERRAL_CODE = "WACHSTUM-A7K2";
const REFERRAL_LINK = `aigrowthsystem.de/ref/${REFERRAL_CODE}`;

const stats = [
  {
    label: "Empfehlungen gesendet",
    value: "7",
    icon: Share2,
    color: "blue",
  },
  {
    label: "Angemeldet",
    value: "4",
    icon: UserPlus,
    color: "purple",
  },
  {
    label: "Aktive Kunden",
    value: "2",
    icon: UserCheck,
    color: "emerald",
  },
  {
    label: "Deine Ersparnis",
    value: "200",
    prefix: "\u20AC",
    suffix: "/Mo",
    icon: Euro,
    color: "amber",
  },
];

const referrals = [
  {
    name: "Dr. Thomas Weber",
    business: "Zahnarztpraxis Weber",
    status: "aktiv" as const,
    date: "12.03.2026",
    savings: 100,
  },
  {
    name: "Sarah Müller",
    business: "Beauty Studio Glamour",
    status: "aktiv" as const,
    date: "28.03.2026",
    savings: 100,
  },
  {
    name: "Michael Schmidt",
    business: "Elektro Schmidt GmbH",
    status: "registriert" as const,
    date: "02.04.2026",
    savings: 0,
  },
  {
    name: "Lisa Hoffmann",
    business: "Physiotherapie Hoffmann",
    status: "registriert" as const,
    date: "04.04.2026",
    savings: 0,
  },
  {
    name: "Andreas Becker",
    business: "Restaurant Zum Goldenen Hirsch",
    status: "eingeladen" as const,
    date: "05.04.2026",
    savings: 0,
  },
  {
    name: "Julia Fischer",
    business: "Friseursalon Fischer",
    status: "eingeladen" as const,
    date: "06.04.2026",
    savings: 0,
  },
  {
    name: "Markus Wagner",
    business: "Kanzlei Wagner & Partner",
    status: "eingeladen" as const,
    date: "06.04.2026",
    savings: 0,
  },
];

const howItWorks = [
  {
    step: 1,
    icon: Share2,
    title: "Teile deinen Link",
    description: "Teile deinen Link mit anderen Unternehmern",
  },
  {
    step: 2,
    icon: Gift,
    title: "Sie sparen 50%",
    description: "Sie bekommen 50% Rabatt im ersten Monat",
  },
  {
    step: 3,
    icon: Euro,
    title: "Du sparst \u20AC100",
    description: "Du sparst \u20AC100/Monat pro aktivem Empfehlung",
  },
];

// ────────────────── Helpers ──────────────────

const statusConfig = {
  eingeladen: {
    label: "Eingeladen",
    color: "bg-gray-500/10 text-gray-400",
    icon: Clock,
  },
  registriert: {
    label: "Registriert",
    color: "bg-blue-500/10 text-blue-400",
    icon: UserPlus,
  },
  aktiv: {
    label: "Aktiv",
    color: "bg-emerald-500/10 text-emerald-400",
    icon: Zap,
  },
};

const bgColorMap: Record<string, string> = {
  blue: "bg-blue-500/10",
  purple: "bg-purple-500/10",
  emerald: "bg-emerald-500/10",
  amber: "bg-amber-500/10",
};

const textColorMap: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ────────────────── Component ──────────────────

export default function ReferralPage() {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${REFERRAL_LINK}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Ich nutze das AI Growth System für mein Geschäft und spare extrem viel Zeit. Mit meinem Code ${REFERRAL_CODE} bekommst du 50% Rabatt im ersten Monat: https://${REFERRAL_LINK}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(
      "50% Rabatt auf das AI Growth System"
    );
    const body = encodeURIComponent(
      `Hallo,\n\nich nutze das AI Growth System und bin begeistert. Damit verliere ich keinen einzigen Kundenanruf mehr und spare über 15 Stunden pro Woche.\n\nMit meinem persönlichen Code ${REFERRAL_CODE} bekommst du 50% Rabatt im ersten Monat:\nhttps://${REFERRAL_LINK}\n\nProbier es aus!\n\nViele Grüße`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(`https://${REFERRAL_LINK}`);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Empfehlungsprogramm</h1>
        <p className="text-sm text-gray-400 mt-1">
          Empfehle uns weiter und spare jeden Monat bares Geld.
        </p>
      </motion.div>

      {/* Referral Code Card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur p-6 sm:p-8"
      >
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Dein persönlicher Empfehlungscode
            </p>

            {/* Big Code Display */}
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-dashed border-blue-500/40 bg-blue-500/5">
              <span className="text-2xl sm:text-3xl font-bold tracking-widest gradient-text">
                {REFERRAL_CODE}
              </span>
              <button
                onClick={copyCode}
                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
              >
                {codeCopied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="flex items-center gap-2 max-w-md mx-auto">
            <div className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800/80 border border-white/10 text-sm text-gray-400 truncate">
              {REFERRAL_LINK}
            </div>
            <button
              onClick={copyLink}
              className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {linkCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Kopieren
                </>
              )}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={shareEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              E-Mail
            </button>
            <button
              onClick={shareLinkedIn}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] text-sm font-medium hover:bg-[#0A66C2]/20 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              LinkedIn
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
          >
            <div className={`p-2.5 rounded-lg w-fit ${bgColorMap[stat.color]}`}>
              <stat.icon className={`w-5 h-5 ${textColorMap[stat.color]}`} />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">
                {stat.prefix || ""}
                {stat.value}
                {stat.suffix || ""}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 sm:p-8"
      >
        <h3 className="text-lg font-semibold text-white mb-6 text-center">
          So funktioniert&apos;s
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mt-4">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps (hidden on last) */}
              {i < howItWorks.length - 1 && (
                <div className="hidden sm:block absolute top-7 -right-3 lg:-right-4">
                  <ArrowRight className="w-5 h-5 text-gray-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referrals List */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">
            Deine Empfehlungen
          </h3>
          <span className="text-xs text-gray-500">
            {referrals.length} insgesamt
          </span>
        </div>

        <div className="space-y-1">
          {referrals.map((referral, index) => {
            const config = statusConfig[referral.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                  {referral.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    {referral.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {referral.business}
                  </p>
                </div>

                {/* Date */}
                <span className="text-xs text-gray-600 hidden sm:block">
                  {referral.date}
                </span>

                {/* Savings */}
                {referral.savings > 0 && (
                  <span className="text-xs font-medium text-emerald-400 hidden sm:block">
                    -&euro;{referral.savings}/Mo
                  </span>
                )}

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${config.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {config.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
