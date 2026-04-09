import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import AuroraWrapper from "@/components/marketing/AuroraWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://aufwind.ai"),
  title: "Aufwind AI — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
  description:
    "Aufwind AI — das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren. 24/7 aktiv.",
  keywords: [
    "Aufwind AI",
    "KI Automatisierung",
    "lokale Unternehmen",
    "AI Chatbot",
    "Terminbuchung",
    "Lead Generierung",
    "Google Bewertungen",
    "WhatsApp Automatisierung",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aufwind AI — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
    description:
      "Aufwind AI — das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren. 24/7 aktiv.",
    url: "https://aufwind.ai",
    siteName: "Aufwind AI",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aufwind AI — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
    description:
      "Aufwind AI — das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren. 24/7 aktiv.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuroraWrapper />
        <LazyMotion features={domAnimation} strict>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "DIAS SALES SOLUTIONS - FZCO",
                  url: "https://aufwind.ai",
                  description:
                    "Aufwind AI — KI-gestütztes Wachstumssystem für lokale Unternehmen in Deutschland",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    availableLanguage: ["German", "English"],
                  },
                },
                {
                  "@type": "LocalBusiness",
                  name: "Aufwind AI by DIAS SALES SOLUTIONS",
                  url: "https://aufwind.ai",
                  description:
                    "Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv",
                  priceRange: "$$",
                  areaServed: {
                    "@type": "Country",
                    name: "Germany",
                  },
                  serviceType: [
                    "KI Automatisierung",
                    "AI Chatbot",
                    "Terminbuchung",
                    "Lead Generierung",
                    "Google Bewertungen Automatisierung",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Aufwind AI",
                  url: "https://aufwind.ai",
                  inLanguage: "de-DE",
                },
              ],
            }),
          }}
        />
        {children}
        </LazyMotion>
      </body>
    </html>
  );
}
