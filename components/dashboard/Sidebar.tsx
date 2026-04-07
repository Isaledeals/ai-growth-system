"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Star,
  Zap,
  BarChart3,
  Settings,
  Gift,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import OnboardingProgress from "./OnboardingProgress";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavItem[] = [
  { name: "Übersicht", href: "/dashboard", icon: LayoutDashboard },
  { name: "Gespräche", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Kontakte", href: "/dashboard/contacts", icon: Users },
  { name: "Bewertungen", href: "/dashboard/reviews", icon: Star },
  { name: "Automatisierungen", href: "/dashboard/automations", icon: Zap },
  { name: "Berichte", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Empfehlungen", href: "/dashboard/referral", icon: Gift },
  { name: "Einstellungen", href: "/dashboard/settings", icon: Settings },
];

export interface SidebarProps {
  onboardingStep?: number;
  onboardingTotal?: number;
  businessName?: string;
  planLabel?: string;
  initials?: string;
  onNavigate?: () => void;
}

export default function Sidebar({
  onboardingStep = 5,
  onboardingTotal = 5,
  businessName = "Muster Restaurant",
  planLabel = "Pro-Plan",
  initials = "MR",
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const showOnboarding = onboardingStep < onboardingTotal;

  return (
    <>
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight">
            AI Growth System
          </h1>
          <p className="text-[11px] text-gray-500">Dashboard</p>
        </div>
      </div>

      {/* Onboarding progress (only if incomplete) */}
      {showOnboarding && (
        <div className="px-3 pt-4">
          <OnboardingProgress
            currentStep={onboardingStep}
            totalSteps={onboardingTotal}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] flex-shrink-0 ${
                  active
                    ? "text-blue-400"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
                aria-hidden="true"
              />
              {item.name}
              {active && (
                <ChevronRight
                  className="w-3.5 h-3.5 ml-auto text-blue-400/60"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {businessName}
            </p>
            <p className="text-[11px] text-gray-500 truncate">{planLabel}</p>
          </div>
          <button
            type="button"
            aria-label="Abmelden"
            className="p-1.5 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
