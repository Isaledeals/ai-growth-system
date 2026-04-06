"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * DSGVO-compliant Google Analytics 4 loader.
 * Only injects GA scripts AFTER the user has explicitly accepted "all" cookies.
 * Listens for storage events so GA activates immediately when consent is given
 * in another tab or after the CookieConsent banner is accepted.
 */
export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    function checkConsent(): boolean {
      try {
        const raw = localStorage.getItem("cookie-consent");
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        return parsed?.level === "all";
      } catch {
        return false;
      }
    }

    // Check on mount
    setHasConsent(checkConsent());

    // Listen for changes from the CookieConsent banner (same tab)
    // The CookieConsent component calls localStorage.setItem which triggers
    // a custom "storage" event only in OTHER tabs. For same-tab detection,
    // we poll briefly after mount and also listen to the storage event.
    function handleStorage(e: StorageEvent) {
      if (e.key === "cookie-consent") {
        setHasConsent(checkConsent());
      }
    }

    // Listen for cross-tab storage changes
    window.addEventListener("storage", handleStorage);

    // For same-tab detection: observe localStorage changes via a short interval
    // that clears itself once consent is found (max ~10s of checking)
    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      const consent = checkConsent();
      if (consent || attempts >= maxAttempts) {
        setHasConsent(consent);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      {/* Global Site Tag (gtag.js) — Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${SITE_CONFIG.gaMeasurementId}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
