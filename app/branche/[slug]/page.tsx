import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BRANCHEN_SLUGS,
  getBranchenTemplate,
  type BranchenSlug,
} from "@/lib/branchen-templates";
import { STAEDTE } from "@/lib/seo-data";
import { SITE_CONFIG } from "@/lib/constants";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import BranchePageContent from "./BranchePageContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// --------------------------- Static Params ---------------------------
export function generateStaticParams() {
  return BRANCHEN_SLUGS.map((slug) => ({ slug }));
}

// --------------------------- Metadata ---------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getBranchenTemplate(slug);

  if (!template) {
    return {
      title: "Branche nicht gefunden | AI Growth System",
    };
  }

  const title = `KI-Automatisierung für ${template.name} | AI Growth System`;
  const description = `KI-Chatbot, Telefonassistent & Automatisierung speziell für ${template.name}. Mehr Termine, weniger No-Shows, bessere Google-Bewertungen — 24/7 aktiv.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: template.seoKeywords,
    alternates: {
      canonical: `/branche/${template.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/branche/${template.slug}`,
      siteName: "AI Growth System",
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// --------------------------- Page ---------------------------
export default async function BranchePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getBranchenTemplate(slug);

  if (!template) {
    notFound();
  }

  // Schema.org Service JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `KI-Automatisierung für ${template.name}`,
    description: template.description,
    provider: {
      "@type": "Organization",
      name: "AI Growth System by DIAS SALES SOLUTIONS",
      url: SITE_CONFIG.domain,
    },
    serviceType: "KI-Automatisierung",
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "697",
      highPrice: "1297",
      offerCount: "2",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.domain}/branche/${template.slug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: template.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0F1C]">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pb-0 pt-28 sm:px-6 lg:px-8">
          <nav className="text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/branche" className="hover:text-blue-400">
                  Branchen
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">{template.name}</li>
            </ol>
          </nav>
        </div>

        <BranchePageContent template={template} />

        {/* Städte-Interne Links */}
        <section className="border-t border-white/5 bg-gray-950/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              {template.name} in deiner Stadt
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
              AI Growth System ist bundesweit verfügbar. Finde maßgeschneiderte
              Lösungen für {template.name} in deiner Stadt.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {STAEDTE.map((stadt) => (
                <Link
                  key={stadt.slug}
                  href={`/branche/${template.slug}/${stadt.slug}`}
                  className="rounded-lg border border-white/10 bg-gray-900/50 px-4 py-3 text-sm text-gray-300 transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-gray-900/80 hover:text-white"
                >
                  {template.name} {stadt.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Explicit type helper for casting in child components
export type BranchePageSlug = BranchenSlug;
