"use client";

import dynamic from "next/dynamic";

const AuroraBackground = dynamic(
  () => import("@/components/marketing/AuroraBackground"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function AuroraWrapper() {
  return <AuroraBackground />;
}
