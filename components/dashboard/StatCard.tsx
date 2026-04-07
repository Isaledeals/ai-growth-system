"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, type LucideIcon } from "lucide-react";

export interface StatCardChange {
  value: number;
  trend: "up" | "down" | "neutral";
}

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: StatCardChange;
  icon: LucideIcon;
  iconColor?: string;
  sublabel?: string;
  className?: string;
}

function formatChange(value: number): string {
  const formatted = Math.abs(value).toLocaleString("de-DE", {
    maximumFractionDigits: 1,
  });
  if (value > 0) return `+${formatted}%`;
  if (value < 0) return `-${formatted}%`;
  return `${formatted}%`;
}

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor = "emerald",
  sublabel,
  className = "",
}: StatCardProps) {
  const iconBg: Record<string, string> = {
    blue: "bg-blue-500/10",
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
    purple: "bg-purple-500/10",
    red: "bg-red-500/10",
  };

  const iconText: Record<string, string> = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
    red: "text-red-400",
  };

  const bgClass = iconBg[iconColor] ?? "bg-emerald-500/10";
  const textClass = iconText[iconColor] ?? "text-emerald-400";

  const trendClasses =
    change?.trend === "up"
      ? "text-emerald-400"
      : change?.trend === "down"
      ? "text-red-400"
      : "text-gray-400";

  const TrendIcon =
    change?.trend === "up"
      ? ArrowUpRight
      : change?.trend === "down"
      ? ArrowDownRight
      : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`glass-card rounded-xl p-5 hover:border-white/20 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg ${bgClass}`}>
          <Icon className={`w-5 h-5 ${textClass}`} aria-hidden="true" />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${trendClasses}`}
          >
            <TrendIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {formatChange(change.value)}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        <p className="text-sm text-gray-400 mt-0.5">
          {label}
          {sublabel && (
            <span className="text-gray-600"> / {sublabel}</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
