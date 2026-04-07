"use client";

import { useEffect, useRef } from "react";

interface SuccessTrackerProps {
  sessionId: string;
  plan: string;
}

// Triggers internal "checkout success" tracking once on mount.
// The Stripe webhook is the source of truth for actual provisioning;
// this is purely for analytics + a best-effort n8n ping.
export default function SuccessTracker({ sessionId, plan }: SuccessTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (!sessionId) return;
    fired.current = true;

    fetch("/api/checkout/track-success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, plan }),
    }).catch((err) => {
      // Silent — analytics, niemals user-facing
      console.warn("[success-tracker] tracking failed", err);
    });
  }, [sessionId, plan]);

  return null;
}
