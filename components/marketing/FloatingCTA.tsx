"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={SITE_CONFIG.bookingUrl}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:brightness-110 hover:shadow-emerald-500/40 sm:px-7 sm:py-4 sm:text-base"
          style={{
            backgroundImage: "linear-gradient(135deg, #10B981, #059669)",
          }}
          aria-label="Demo buchen"
        >
          {/* Pulse ring */}
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full opacity-20 bg-emerald-400" />

          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span>Demo buchen</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
