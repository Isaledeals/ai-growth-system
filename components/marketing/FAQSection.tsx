"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ, type FaqItem } from "@/lib/constants";
import AufwindBeam from "@/components/marketing/AufwindBeam";

const FAQ_GLOW_COLOR = "rgba(59, 130, 246, 0.2)";

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      style={{ "--hover-glow": FAQ_GLOW_COLOR } as React.CSSProperties}
      className={`glass-card relative rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_var(--hover-glow)] hover:border-white/20 ${isOpen ? 'border-l-2 border-blue-500 pl-0' : ''}`}
    >
      {/* Spotlight radial gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--hover-glow), transparent 60%)",
        }}
      />

      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/5"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold text-foreground leading-snug">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative px-6 pb-5 pt-0">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
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
            H&auml;ufige{" "}
            <span className="gradient-text">Fragen</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl mx-auto">
            Alles was Sie wissen m&uuml;ssen &mdash; transparent und ehrlich.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {FAQ.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
