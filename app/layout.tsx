import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aigrowthsystem.de"),
  title: "AI Growth System — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
  description:
    "Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv",
  keywords: [
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
    title: "AI Growth System — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
    description:
      "Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv",
    url: "https://aigrowthsystem.de",
    siteName: "AI Growth System",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Growth System — Mehr Kunden. Weniger Arbeit. Vollautomatisch.",
    description:
      "Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv",
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
  themeColor: "#030712",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${plusJakarta.variable} ${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "DIAS SALES SOLUTIONS - FZCO",
                  url: "https://aigrowthsystem.de",
                  description:
                    "AI Growth System — KI-gestütztes Wachstumssystem für lokale Unternehmen in Deutschland",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    availableLanguage: ["German", "English"],
                  },
                },
                {
                  "@type": "LocalBusiness",
                  name: "AI Growth System by DIAS SALES SOLUTIONS",
                  url: "https://aigrowthsystem.de",
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
                  name: "AI Growth System",
                  url: "https://aigrowthsystem.de",
                  inLanguage: "de-DE",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
