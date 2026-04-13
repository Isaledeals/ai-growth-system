import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { LazyMotion, domAnimation } from 'framer-motion'
import AuroraWrapper from '@/components/marketing/AuroraWrapper'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { getDictionary, type Locale } from '@/lib/dictionaries'
import '../globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)
  return {
    metadataBase: new URL('https://aufwind.ai'),
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: [
      'Aufwind AI',
      'KI Automatisierung',
      'lokale Unternehmen',
      'AI Chatbot',
      'Terminbuchung',
      'Lead Generierung',
      'Google Bewertungen',
      'WhatsApp Automatisierung',
    ],
    alternates: {
      canonical: `https://aufwind.ai/${locale}`,
      languages: { de: '/de', en: '/en' },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://aufwind.ai/${locale}`,
      siteName: 'Aufwind AI',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
  colorScheme: 'light',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <html
      lang={locale}
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
          <ScrollProgress />
          <SmoothScroll>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Organization',
                    name: 'DIAS SALES SOLUTIONS - FZCO',
                    url: 'https://aufwind.ai',
                    description:
                      'Aufwind AI — KI-gestütztes Wachstumssystem für lokale Unternehmen in Deutschland',
                    contactPoint: {
                      '@type': 'ContactPoint',
                      contactType: 'sales',
                      availableLanguage: ['German', 'English'],
                    },
                  },
                  {
                    '@type': 'LocalBusiness',
                    name: 'Aufwind AI by DIAS SALES SOLUTIONS',
                    url: 'https://aufwind.ai',
                    description:
                      'Das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren — 24/7 aktiv',
                    priceRange: '$$',
                    areaServed: { '@type': 'Country', name: 'Germany' },
                    serviceType: [
                      'KI Automatisierung',
                      'AI Chatbot',
                      'Terminbuchung',
                      'Lead Generierung',
                      'Google Bewertungen Automatisierung',
                    ],
                  },
                  {
                    '@type': 'WebSite',
                    name: 'Aufwind AI',
                    url: 'https://aufwind.ai',
                    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
                  },
                ],
              }),
            }}
          />
          {children}
          </SmoothScroll>
        </LazyMotion>
      </body>
    </html>
  )
}
