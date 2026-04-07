"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: wire these to real session/tenant data
  const onboardingStep = 5;
  const onboardingTotal = 5;
  const businessName = "Muster Restaurant";
  const planLabel = "Pro-Plan";
  const initials = "MR";

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#0A0F1C] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-950/80 backdrop-blur-xl border-r border-white/5 z-30">
        <Sidebar
          onboardingStep={onboardingStep}
          onboardingTotal={onboardingTotal}
          businessName={businessName}
          planLabel={planLabel}
          initials={initials}
        />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeSidebar}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-gray-950 border-r border-white/5 z-50 lg:hidden flex flex-col"
            >
              <button
                type="button"
                onClick={closeSidebar}
                aria-label="Navigation schließen"
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <Sidebar
                onboardingStep={onboardingStep}
                onboardingTotal={onboardingTotal}
                businessName={businessName}
                planLabel={planLabel}
                initials={initials}
                onNavigate={closeSidebar}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Navigation öffnen"
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-sm font-semibold text-white">
                  {businessName}
                </h2>
                <p className="text-xs text-gray-500">
                  Willkommen zurück, Max
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <button
                type="button"
                aria-label="Benachrichtigungen"
                className="relative p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#0A0F1C]" />
              </button>

              {/* Mobile Avatar */}
              <div className="lg:hidden w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
