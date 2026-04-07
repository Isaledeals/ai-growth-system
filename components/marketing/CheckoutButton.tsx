"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";

export interface CheckoutButtonProps {
  plan: "pro" | "premium";
  branche?: string;
  businessName?: string;
  email?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  fallbackUrl?: string;
}

export default function CheckoutButton({
  plan,
  branche,
  businessName,
  email,
  className,
  style,
  children,
  fallbackUrl = "/buchen",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const payload: Record<string, string> = { plan };
      if (branche) payload.branche = branche;
      if (businessName) payload.businessName = businessName;
      if (email) payload.email = email;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        fallbackUrl?: string;
        error?: string;
      };

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      // Stripe nicht verfuegbar oder Server-Fehler — eleganter Redirect zur
      // Demo-Buchung. Niemals den User mit technischen Errors konfrontieren.
      console.warn(
        `[CheckoutButton] Checkout unavailable (${res.status}): ${data.error ?? "unknown"}`
      );
      window.location.href = data.fallbackUrl ?? fallbackUrl;
    } catch (err) {
      console.error("[CheckoutButton] Network error", err);
      window.location.href = fallbackUrl;
    } finally {
      // Loading bleibt visuell aktiv waehrend des Redirects;
      // Reset nur als Edge-Case Fallback
      setTimeout(() => setIsLoading(false), 4000);
    }
  }, [plan, branche, businessName, email, fallbackUrl, isLoading]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      className={className}
      style={style}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Lade...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
