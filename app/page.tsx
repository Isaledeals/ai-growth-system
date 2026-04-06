import dynamic from "next/dynamic";
import Navbar from "@/components/marketing/Navbar";
import HeroSection from "@/components/marketing/HeroSection";
import Footer from "@/components/marketing/Footer";
import ClientOverlays from "@/components/marketing/ClientOverlays";
import FAQSchema from "@/components/marketing/FAQSchema";

// Lazy load below-the-fold sections
const SocialProofBar = dynamic(() => import("@/components/marketing/SocialProofBar"));
const ProblemSection = dynamic(() => import("@/components/marketing/ProblemSection"));
const ModulesSection = dynamic(() => import("@/components/marketing/ModulesSection"));
const HowItWorksSection = dynamic(() => import("@/components/marketing/HowItWorksSection"));
const ROICalculator = dynamic(() => import("@/components/marketing/ROICalculator"));
const CaseStudiesSection = dynamic(() => import("@/components/marketing/CaseStudiesSection"));
const ComparisonSection = dynamic(() => import("@/components/marketing/ComparisonSection"));
const PricingSection = dynamic(() => import("@/components/marketing/PricingSection"));
const FAQSection = dynamic(() => import("@/components/marketing/FAQSection"));
const FinalCTASection = dynamic(() => import("@/components/marketing/FinalCTASection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <ProblemSection />
        <ModulesSection />
        <HowItWorksSection />
        <ROICalculator />
        <CaseStudiesSection />
        <ComparisonSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FAQSchema />
      <ClientOverlays />
    </>
  );
}
