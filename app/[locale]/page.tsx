import dynamic from 'next/dynamic'
import Navbar from '@/components/marketing/Navbar'
import HeroSection from '@/components/marketing/HeroSection'
import SectionTransition from '@/components/marketing/SectionTransition'
import InlineCTA from '@/components/marketing/InlineCTA'
import Footer from '@/components/marketing/Footer'
import ClientOverlays from '@/components/marketing/ClientOverlays'
import FAQSchema from '@/components/marketing/FAQSchema'
import RiseSection from '@/components/ui/RiseSection'
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

        <RiseSection intensity="subtle">
          <SocialProofBar dict={dict.socialProof} />
        </RiseSection>

        <RiseSection intensity="subtle">
          <ProblemSection dict={dict.problem} />
        </RiseSection>

        {/* CTA 1 — nach dem Schmerz, bevor Lösung erklärt wird */}
        <RiseSection intensity="subtle">
          <InlineCTA
            headline={dict.inlineCtas.cta1.headline}
            sub={dict.inlineCtas.cta1.sub}
            cta={dict.inlineCtas.cta1.cta}
          />
        </RiseSection>

        <RiseSection intensity="medium">
          <ModulesSection dict={dict.modules} />
        </RiseSection>

        <RiseSection intensity="medium">
          <HowItWorksSection dict={dict.howItWorks} />
        </RiseSection>

        {/* CTA 2 — nach dem Setup-Verständnis, wenn Zweifel ausgeräumt */}
        <RiseSection intensity="subtle">
          <InlineCTA
            headline={dict.inlineCtas.cta2.headline}
            sub={dict.inlineCtas.cta2.sub}
            cta={dict.inlineCtas.cta2.cta}
          />
        </RiseSection>

        {/* Erst Beweis, dann ROI-Berechnung — psychologisch stärker */}
        <RiseSection intensity="medium">
          <CaseStudiesSection dict={dict.caseStudies} />
        </RiseSection>

        <RiseSection intensity="medium">
          <ROICalculator dict={dict.roi} />
        </RiseSection>

        {/* CTA 3 — nach dem Beweis + eigenem ROI, maximale Kaufbereitschaft */}
        <RiseSection intensity="subtle">
          <InlineCTA
            headline={dict.inlineCtas.cta3.headline}
            cta={dict.inlineCtas.cta3.cta}
          />
        </RiseSection>

        <RiseSection intensity="medium">
          <ComparisonSection dict={dict.comparison} />
        </RiseSection>

        <RiseSection intensity="strong">
          <PricingSection dict={dict.pricing} />
        </RiseSection>

        <RiseSection intensity="subtle">
          <FAQSection dict={dict.faq} />
        </RiseSection>

        <RiseSection intensity="strong">
          <FinalCTASection dict={dict.finalCta} />
        </RiseSection>
      </main>
      <Footer dict={dict.footer} />
      <FAQSchema />
      <ClientOverlays />
    </>
  )
}
