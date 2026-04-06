"use client";

import dynamic from "next/dynamic";

const FloatingCTA = dynamic(() => import("@/components/marketing/FloatingCTA"), {
  ssr: false,
});
const WhatsAppButton = dynamic(
  () => import("@/components/marketing/WhatsAppButton"),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/marketing/CookieConsent"),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("@/components/marketing/ScrollToTop"),
  { ssr: false }
);
const GoogleAnalytics = dynamic(
  () => import("@/components/marketing/GoogleAnalytics"),
  { ssr: false }
);

export default function ClientOverlays() {
  return (
    <>
      <GoogleAnalytics />
      <FloatingCTA />
      <WhatsAppButton />
      <CookieConsent />
      <ScrollToTop />
    </>
  );
}
