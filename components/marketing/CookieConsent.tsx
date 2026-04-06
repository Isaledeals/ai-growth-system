"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept(level: "all" | "necessary") {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ level, timestamp: Date.now() })
    );
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl glass-card rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Wir verwenden Cookies, um dir die bestm&ouml;gliche Erfahrung
                  zu bieten. Mehr dazu in unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="underline text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Datenschutzerkl&auml;rung
                  </Link>
                  .
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleAccept("necessary")}
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Nur notwendige
                </button>
                <button
                  onClick={() => handleAccept("all")}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/25"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #10B981, #059669)",
                  }}
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
