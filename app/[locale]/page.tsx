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
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Navbar dict={dict.navbar} locale={locale} />
      <main>
        <HeroSection dict={dict.hero} />
        <SectionTransition />
        <SocialProofBar dict={dict.socialProof} />
        <ProblemSection dict={dict.problem} />

        {/* CTA 1 — nach dem Schmerz, bevor Lösung erklärt wird */}
        <InlineCTA
          headline={dict.inlineCtas.cta1.headline}
          sub={dict.inlineCtas.cta1.sub}
          cta={dict.inlineCtas.cta1.cta}
        />

        <ModulesSection dict={dict.modules} />
        <HowItWorksSection dict={dict.howItWorks} />

        {/* CTA 2 — nach dem Setup-Verständnis, wenn Zweifel ausgeräumt */}
        <InlineCTA
          headline={dict.inlineCtas.cta2.headline}
          sub={dict.inlineCtas.cta2.sub}
          cta={dict.inlineCtas.cta2.cta}
        />

        {/* Erst Beweis, dann ROI-Berechnung — psychologisch stärker */}
        <CaseStudiesSection dict={dict.caseStudies} />
        <ROICalculator dict={dict.roi} />

        {/* CTA 3 — nach dem Beweis + eigenem ROI, maximale Kaufbereitschaft */}
        <InlineCTA
          headline={dict.inlineCtas.cta3.headline}
          cta={dict.inlineCtas.cta3.cta}
        />

        <ComparisonSection dict={dict.comparison} />
        <PricingSection dict={dict.pricing} />
        <FAQSection dict={dict.faq} />
        <FinalCTASection dict={dict.finalCta} />
      </main>
      <Footer dict={dict.footer} />
      <FAQSchema />
      <ClientOverlays />
    </>
  )
}
