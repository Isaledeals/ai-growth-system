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

export default function ClientOverlays() {
  return (
    <>
      <FloatingCTA />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
