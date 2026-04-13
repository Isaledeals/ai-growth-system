import dynamic from 'next/dynamic'
import Navbar from '@/components/marketing/Navbar'
import HeroSection from '@/components/marketing/HeroSection'
import SectionTransition from '@/components/marketing/SectionTransition'
import InlineCTA from '@/components/marketing/InlineCTA'
import Footer from '@/components/marketing/Footer'
import ClientOverlays from '@/components/marketing/ClientOverlays'
import FAQSchema from '@/components/marketing/FAQSchema'
import { getDictionary, type Locale } from '@/lib/dictionaries'

// Lazy load below-the-fold sections
const SocialProofBar = dynamic(() => import('@/components/marketing/SocialProofBar'))
const ProblemSection = dynamic(() => import('@/components/marketing/ProblemSection'))
const ModulesSection = dynamic(() => import('@/components/marketing/ModulesSection'))
const HowItWorksSection = dynamic(() => import('@/components/marketing/HowItWorksSection'))
const CaseStudiesSection = dynamic(() => import('@/components/marketing/CaseStudiesSection'))
const ROICalculator = dynamic(() => import('@/components/marketing/ROICalculator'))
const ComparisonSection = dynamic(() => import('@/components/marketing/ComparisonSection'))
const PricingSection = dynamic(() => import('@/components/marketing/PricingSection'))
const FAQSection = dynamic(() => import('@/components/marketing/FAQSection'))
const FinalCTASection = dynamic(() => import('@/components/marketing/FinalCTASection'))

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  // dict available for future i18n wiring of components
  await getDictionary(locale)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionTransition />
        <SocialProofBar />
        <ProblemSection />

        {/* CTA 1 — nach dem Schmerz, bevor Lösung erklärt wird */}
        <InlineCTA
          headline="Erkannt? Aufwind AI löst genau das — in 5 Tagen."
          sub="Buchen Sie jetzt Ihren kostenlosen Demo-Call und sehen Sie wie es für Ihre Branche aussieht."
          cta="Jetzt Demo vereinbaren"
        />

        <ModulesSection />
        <HowItWorksSection />

        {/* CTA 2 — nach dem Setup-Verständnis, wenn Zweifel ausgeräumt */}
        <InlineCTA
          headline="Bereit loszulegen? Ihr System ist in 5 Tagen live."
          sub="Kein technisches Wissen nötig. Wir bauen alles für Sie."
          cta="Demo-Call buchen"
        />

        {/* Erst Beweis, dann ROI-Berechnung — psychologisch stärker */}
        <CaseStudiesSection />
        <ROICalculator />

        {/* CTA 3 — nach dem Beweis + eigenem ROI, maximale Kaufbereitschaft */}
        <InlineCTA
          headline="Sie haben die Zahlen gesehen. Jetzt Ihre eigene Praxis transformieren."
          cta="Kostenlose Demo buchen"
        />

        <ComparisonSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FAQSchema />
      <ClientOverlays />
    </>
  )
}
