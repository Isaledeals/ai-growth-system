"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Scissors,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Scale,
  ChevronRight,
  ChevronLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Plus,
  X,
  Check,
  MessageSquare,
  Send,
  Bot,
  Copy,
  PartyPopper,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { INDUSTRY_TEMPLATES, type IndustryTemplate } from "@/lib/constants";

// ────────────────── Types ──────────────────

interface BusinessData {
  companyName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
}

interface DayHours {
  enabled: boolean;
  open: string;
  close: string;
}

type WeekHours = Record<string, DayHours>;

interface AgentSettings {
  tone: "formal" | "informal";
  greeting: string;
}

// ────────────────── Icon Map ──────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Scissors,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Scale,
};

// ────────────────── Constants ──────────────────

const DAYS = [
  { key: "mo", label: "Montag" },
  { key: "di", label: "Dienstag" },
  { key: "mi", label: "Mittwoch" },
  { key: "do", label: "Donnerstag" },
  { key: "fr", label: "Freitag" },
  { key: "sa", label: "Samstag" },
  { key: "so", label: "Sonntag" },
];

const STEP_TITLES = [
  "Branche wählen",
  "Geschäftsdaten",
  "Services & Öffnungszeiten",
  "KI-Agent testen",
  "Fertig!",
];

const defaultWeekHours = (
  open: string,
  close: string
): WeekHours => ({
  mo: { enabled: true, open, close },
  di: { enabled: true, open, close },
  mi: { enabled: true, open, close },
  do: { enabled: true, open, close },
  fr: { enabled: true, open, close },
  sa: { enabled: true, open: open === "07:00" ? "08:00" : open, close: close === "23:00" ? "22:00" : close },
  so: { enabled: false, open: "10:00", close: "14:00" },
});

// ────────────────── Slide Variants ──────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// ────────────────── Confetti Particle ──────────────────

function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  const randomX = Math.random() * 100;
  const randomDuration = 2 + Math.random() * 2;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        left: `${randomX}%`,
        top: -10,
      }}
      initial={{ y: -10, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, 400 + Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [1, 1, 0],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
        scale: [1, 0.5],
      }}
      transition={{
        duration: randomDuration,
        delay,
        ease: "easeOut" as const,
      }}
    />
  );
}

function ConfettiExplosion() {
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.8,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} delay={p.delay} color={p.color} />
      ))}
    </div>
  );
}

// ────────────────── Main Component ──────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Step 1: Industry
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Step 2: Business data
  const [businessData, setBusinessData] = useState<BusinessData>({
    companyName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    website: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BusinessData, boolean>>>({});

  // Step 3: Services & hours
  const [services, setServices] = useState<{ name: string; enabled: boolean }[]>([]);
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [weekHours, setWeekHours] = useState<WeekHours>(
    defaultWeekHours("09:00", "18:00")
  );

  // Step 4: Agent settings
  const [agentSettings, setAgentSettings] = useState<AgentSettings>({
    tone: "formal",
    greeting: "",
  });
  const [chatMessages, setChatMessages] = useState<
    { role: "customer" | "ai"; text: string }[]
  >([]);
  const [chatAnimationDone, setChatAnimationDone] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Step 5: Confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const [widgetCodeCopied, setWidgetCodeCopied] = useState(false);

  // Get current industry template
  const currentTemplate: IndustryTemplate | null = selectedIndustry
    ? INDUSTRY_TEMPLATES[selectedIndustry]
    : null;

  // When industry changes, populate services and hours
  useEffect(() => {
    if (currentTemplate) {
      setServices(
        currentTemplate.services.map((s) => ({ name: s, enabled: true }))
      );
      setWeekHours(
        defaultWeekHours(
          currentTemplate.defaultHours.open,
          currentTemplate.defaultHours.close
        )
      );
      setAgentSettings((prev) => ({
        ...prev,
        greeting: currentTemplate.sampleGreeting,
      }));
    }
  }, [selectedIndustry]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animate chat messages on step 4
  useEffect(() => {
    if (currentStep === 3 && currentTemplate && !chatAnimationDone) {
      setChatMessages([]);
      const msgs = currentTemplate.sampleConversation;
      let timeouts: NodeJS.Timeout[] = [];

      msgs.forEach((msg, i) => {
        const t = setTimeout(() => {
          setChatMessages((prev) => [...prev, msg]);
        }, (i + 1) * 1200);
        timeouts.push(t);
      });

      const doneTimeout = setTimeout(() => {
        setChatAnimationDone(true);
      }, (msgs.length + 1) * 1200);
      timeouts.push(doneTimeout);

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [currentStep, currentTemplate, chatAnimationDone]);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Confetti on step 5
  useEffect(() => {
    if (currentStep === 4) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  // ── Validation ──

  const validateStep = useCallback((): boolean => {
    if (currentStep === 0) {
      return selectedIndustry !== null;
    }
    if (currentStep === 1) {
      const required: (keyof BusinessData)[] = [
        "companyName",
        "address",
        "city",
        "zip",
        "phone",
        "email",
      ];
      const errors: Partial<Record<keyof BusinessData, boolean>> = {};
      let valid = true;
      for (const field of required) {
        if (!businessData[field].trim()) {
          errors[field] = true;
          valid = false;
        }
      }
      setFormErrors(errors);
      return valid;
    }
    return true;
  }, [currentStep, selectedIndustry, businessData]);

  // ── Navigation ──

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (currentStep < 4) {
      setDirection(1);
      if (currentStep === 3) {
        setChatAnimationDone(false);
      }
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, validateStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  // ── Service Helpers ──

  const toggleService = (index: number) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const addCustomService = () => {
    const trimmed = customServiceInput.trim();
    if (trimmed && !services.some((s) => s.name === trimmed)) {
      setServices((prev) => [...prev, { name: trimmed, enabled: true }]);
      setCustomServiceInput("");
    }
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const applyTypicalHours = () => {
    if (currentTemplate) {
      setWeekHours(
        defaultWeekHours(
          currentTemplate.defaultHours.open,
          currentTemplate.defaultHours.close
        )
      );
    }
  };

  const updateDayHours = (
    day: string,
    field: keyof DayHours,
    value: string | boolean
  ) => {
    setWeekHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  // ── Widget Code ──

  const widgetCode = `<script src="https://aigrowthsystem.de/widget.js" data-tenant="${businessData.companyName.toLowerCase().replace(/\s+/g, "-") || "mein-unternehmen"}"></script>`;

  const copyWidgetCode = () => {
    navigator.clipboard.writeText(widgetCode);
    setWidgetCodeCopied(true);
    setTimeout(() => setWidgetCodeCopied(false), 2000);
  };

  // ────────────────── Render Steps ──────────────────

  const renderStep = () => {
    switch (currentStep) {
      // ── STEP 1: Branche wählen ──
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Welche Branche passt zu dir?
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Dies bestimmt die KI-Vorlagen für dein Geschäft
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Object.values(INDUSTRY_TEMPLATES).map((template) => {
                const Icon = iconMap[template.icon] || Building2;
                const isSelected = selectedIndustry === template.id;
                return (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedIndustry(template.id)}
                    className={`relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "border-white/10 bg-gray-900/50 hover:border-white/20 hover:bg-gray-900/70"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        isSelected ? "bg-blue-500/20" : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-blue-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-blue-300" : "text-gray-300"
                      }`}
                    >
                      {template.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      // ── STEP 2: Geschäftsdaten ──
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Deine Geschäftsdaten
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Diese Informationen nutzt dein KI-Agent
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  Firmenname *
                </label>
                <input
                  type="text"
                  value={businessData.companyName}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, companyName: e.target.value }));
                    setFormErrors((err) => ({ ...err, companyName: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.companyName
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                  placeholder="z.B. Zahnarztpraxis Dr. Müller"
                />
                {formErrors.companyName && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Adresse *
                </label>
                <input
                  type="text"
                  value={businessData.address}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, address: e.target.value }));
                    setFormErrors((err) => ({ ...err, address: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.address ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Musterstraße 123"
                />
                {formErrors.address && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                  Stadt *
                </label>
                <input
                  type="text"
                  value={businessData.city}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, city: e.target.value }));
                    setFormErrors((err) => ({ ...err, city: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.city ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Berlin"
                />
                {formErrors.city && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* ZIP */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                  PLZ *
                </label>
                <input
                  type="text"
                  value={businessData.zip}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, zip: e.target.value }));
                    setFormErrors((err) => ({ ...err, zip: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.zip ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="10115"
                />
                {formErrors.zip && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={businessData.phone}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, phone: e.target.value }));
                    setFormErrors((err) => ({ ...err, phone: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.phone ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="+49 30 1234567"
                />
                {formErrors.phone && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                  <Mail className="w-4 h-4 text-gray-500" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={businessData.email}
                  onChange={(e) => {
                    setBusinessData((d) => ({ ...d, email: e.target.value }));
                    setFormErrors((err) => ({ ...err, email: false }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/80 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    formErrors.email ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="info@praxis-mueller.de"
                />
                {formErrors.email && (
                  <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>
                )}
              </div>

              {/* Website */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                  <Globe className="w-4 h-4 text-gray-500" />
                  Website{" "}
                  <span className="text-gray-600 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={businessData.website}
                  onChange={(e) =>
                    setBusinessData((d) => ({ ...d, website: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/80 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="https://www.praxis-mueller.de"
                />
              </div>
            </div>
          </div>
        );

      // ── STEP 3: Services & Öffnungszeiten ──
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Services &amp; Öffnungszeiten
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Passe deine Dienstleistungen und Zeiten an
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Deine Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                      service.enabled
                        ? "border-blue-500/30 bg-blue-500/5"
                        : "border-white/5 bg-gray-900/30"
                    }`}
                  >
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.enabled}
                        onChange={() => toggleService(index)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          service.enabled
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-600 bg-transparent"
                        }`}
                      >
                        {service.enabled && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          service.enabled ? "text-gray-200" : "text-gray-500"
                        }`}
                      >
                        {service.name}
                      </span>
                    </label>
                    <button
                      onClick={() => removeService(index)}
                      className="p-1 rounded hover:bg-white/5 text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add custom service */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={customServiceInput}
                  onChange={(e) => setCustomServiceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomService();
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-900/80 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Eigenen Service hinzufügen..."
                />
                <button
                  onClick={addCustomService}
                  className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Öffnungszeiten
                </h3>
                <button
                  onClick={applyTypicalHours}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/30"
                >
                  Typische Öffnungszeiten
                </button>
              </div>

              <div className="space-y-2">
                {DAYS.map((day) => {
                  const hours = weekHours[day.key];
                  return (
                    <div
                      key={day.key}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                        hours.enabled
                          ? "border-white/10 bg-gray-900/30"
                          : "border-white/5 bg-gray-900/20"
                      }`}
                    >
                      <label className="flex items-center gap-2 w-28 cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={hours.enabled}
                          onChange={(e) =>
                            updateDayHours(day.key, "enabled", e.target.checked)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            hours.enabled
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-gray-600 bg-transparent"
                          }`}
                        >
                          {hours.enabled && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            hours.enabled ? "text-gray-200" : "text-gray-500"
                          }`}
                        >
                          {day.label}
                        </span>
                      </label>

                      {hours.enabled ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              updateDayHours(day.key, "open", e.target.value)
                            }
                            className="px-2 py-1.5 rounded bg-gray-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 [color-scheme:dark]"
                          />
                          <span className="text-gray-500 text-sm">bis</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              updateDayHours(day.key, "close", e.target.value)
                            }
                            className="px-2 py-1.5 rounded bg-gray-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 [color-scheme:dark]"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-600 text-sm">
                          Geschlossen
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // ── STEP 4: KI-Agent testen ──
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Dein KI-Agent ist bereit!
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                So antwortet dein KI-Agent auf Kundenanfragen
              </p>
            </div>

            {/* Chat Preview */}
            <div className="max-w-lg mx-auto">
              <div className="rounded-xl border border-white/10 bg-gray-900/70 overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {businessData.companyName || "Dein Unternehmen"} — KI
                    </p>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={chatContainerRef}
                  className="p-4 space-y-3 h-72 overflow-y-auto"
                >
                  {/* Greeting */}
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="max-w-[80%] px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-sm text-gray-300">
                        {agentSettings.greeting}
                      </p>
                    </div>
                  </div>

                  {/* Animated Messages */}
                  <AnimatePresence>
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2 ${
                          msg.role === "customer" ? "justify-end" : ""
                        }`}
                      >
                        {msg.role === "ai" && (
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-blue-400" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-lg ${
                            msg.role === "customer"
                              ? "bg-blue-500/20 border border-blue-500/20"
                              : "bg-white/5 border border-white/5"
                          }`}
                        >
                          <p className="text-sm text-gray-300">{msg.text}</p>
                        </div>
                        {msg.role === "customer" && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <MessageSquare className="w-3 h-3 text-emerald-400" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {!chatAnimationDone &&
                    chatMessages.length <
                      (currentTemplate?.sampleConversation.length || 0) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-blue-400" />
                        </div>
                        <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                </div>

                {/* Chat Input (decorative) */}
                <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-white/5 text-gray-500 text-sm"
                    placeholder="Nachricht eingeben..."
                  />
                  <button
                    disabled
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Agent Settings */}
            <div className="max-w-lg mx-auto space-y-4">
              {/* Tone Toggle */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Tonalität
                </label>
                <div className="flex rounded-lg border border-white/10 overflow-hidden">
                  <button
                    onClick={() =>
                      setAgentSettings((s) => ({ ...s, tone: "formal" }))
                    }
                    className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${
                      agentSettings.tone === "formal"
                        ? "bg-blue-500/20 text-blue-400 border-r border-blue-500/30"
                        : "bg-gray-900/50 text-gray-500 border-r border-white/5 hover:text-gray-300"
                    }`}
                  >
                    Formell (Sie)
                  </button>
                  <button
                    onClick={() =>
                      setAgentSettings((s) => ({ ...s, tone: "informal" }))
                    }
                    className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${
                      agentSettings.tone === "informal"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-gray-900/50 text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Informell (Du)
                  </button>
                </div>
              </div>

              {/* Greeting Text */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                  Begrüßungstext
                </label>
                <textarea
                  value={agentSettings.greeting}
                  onChange={(e) =>
                    setAgentSettings((s) => ({
                      ...s,
                      greeting: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/80 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                  placeholder="Willkommen! Wie kann ich Ihnen helfen?"
                />
              </div>
            </div>
          </div>
        );

      // ── STEP 5: Fertig! ──
      case 4:
        return (
          <div className="space-y-8 relative">
            {showConfetti && <ConfettiExplosion />}

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 200,
                  delay: 0.2,
                }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-4"
              >
                <Rocket className="w-10 h-10 text-emerald-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white"
              >
                Dein AI Growth System ist{" "}
                <span className="gradient-text">live!</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mt-2"
              >
                Alles ist eingerichtet. Dein KI-Agent arbeitet ab jetzt rund um
                die Uhr.
              </motion.p>
            </div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto rounded-xl border border-white/10 bg-gray-900/50 p-6 space-y-3"
            >
              {[
                "KI-Chatbot aktiv",
                "KI-Telefonassistent aktiv",
                "Terminbuchung eingerichtet",
                "Follow-up Automationen aktiv",
                "No-Show Erinnerungen aktiv",
                "Google Reviews Autopilot aktiv",
                "Kundenreaktivierung aktiv",
                "Social Media Autopilot aktiv",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/25"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #10B981, #059669)",
                }}
              >
                <Rocket className="w-4 h-4" />
                Dashboard öffnen
              </button>

              <button
                onClick={copyWidgetCode}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <Copy className="w-4 h-4" />
                {widgetCodeCopied ? "Kopiert!" : "Widget-Code kopieren"}
              </button>
            </motion.div>

            {/* Widget Code Preview */}
            {widgetCodeCopied && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="max-w-md mx-auto"
              >
                <div className="rounded-lg bg-gray-900 border border-white/10 p-3">
                  <code className="text-xs text-gray-400 break-all">
                    {widgetCode}
                  </code>
                </div>
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // ────────────────── Main Render ──────────────────

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-400">
            Schritt {currentStep + 1} von 5
          </p>
          <p className="text-sm font-medium text-white">
            {STEP_TITLES[currentStep]}
          </p>
        </div>

        {/* Step Dots + Progress */}
        <div className="relative">
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3B82F6, #10B981)",
              }}
              initial={false}
              animate={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-2">
            {STEP_TITLES.map((title, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    i <= currentStep
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-800 border-gray-600"
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 hidden sm:block ${
                    i <= currentStep ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-sm p-6 sm:p-8 min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentStep === 0
                ? "text-gray-700 cursor-not-allowed"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>

          <button
            onClick={goNext}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110 ${
              currentStep === 0 && !selectedIndustry
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : ""
            }`}
            style={
              currentStep === 0 && !selectedIndustry
                ? undefined
                : {
                    backgroundImage:
                      "linear-gradient(135deg, #3B82F6, #10B981)",
                  }
            }
            disabled={currentStep === 0 && !selectedIndustry}
          >
            {currentStep === 3 ? "Abschließen" : "Weiter"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
