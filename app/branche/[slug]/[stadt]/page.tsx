import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BRANCHEN_SLUGS,
  getBranchenTemplate,
} from "@/lib/branchen-templates";
import { STAEDTE, getStadtBySlug } from "@/lib/seo-data";
import { SITE_CONFIG } from "@/lib/constants";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import BranchePageContent from "../BranchePageContent";

interface PageProps {
  params: Promise<{ slug: string; stadt: string }>;
}

// --------------------------- Static Params ---------------------------
export function generateStaticParams() {
  return BRANCHEN_SLUGS.flatMap((slug) =>
    STAEDTE.map((stadt) => ({
      slug,
      stadt: stadt.slug,
    })),
  );
}

// --------------------------- Metadata ---------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, stadt: stadtSlug } = await params;
  const template = getBranchenTemplate(slug);
  const stadt = getStadtBySlug(stadtSlug);

  if (!template || !stadt) {
    return {
      title: "Seite nicht gefunden | Aufwind AI",
    };
  }

  const title = `KI-Chatbot für ${template.name} in ${stadt.name} | Aufwind AI`;
  const description = `KI-Automatisierung für ${template.name} in ${stadt.name}: Telefonassistent, Chatbot, Terminbuchung. Mehr Termine, weniger No-Shows — 24/7.`;

  const keywords = [
    ...template.seoKeywords,
    `${template.name} ${stadt.name}`,
    `KI ${template.name} ${stadt.name}`,
    `Automatisierung ${stadt.name}`,
    `Chatbot ${stadt.name}`,
  ];

  return {
    title,
    description: description.slice(0, 160),
    keywords,
    alternates: {
      canonical: `/branche/${template.slug}/${stadt.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/branche/${template.slug}/${stadt.slug}`,
      siteName: "Aufwind AI",
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
export default async function StadtBranchePage({ params }: PageProps) {
  const { slug, stadt: stadtSlug } = await params;
  const template = getBranchenTemplate(slug);
  const stadt = getStadtBySlug(stadtSlug);

  if (!template || !stadt) {
    notFound();
  }

  // Schema.org LocalBusiness JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Aufwind AI — KI für ${template.name} in ${stadt.name}`,
    description: `${template.description} Speziell für ${template.name} in ${stadt.name}.`,
    url: `${SITE_CONFIG.domain}/branche/${template.slug}/${stadt.slug}`,
    areaServed: {
      "@type": "City",
      name: stadt.name,
      containedInPlace: {
        "@type": "Country",
        name: "Germany",
      },
    },
    serviceType: `KI-Automatisierung für ${template.name}`,
    priceRange: "€€",
    provider: {
      "@type": "Organization",
      name: "DIAS SALES SOLUTIONS - FZCO",
      url: SITE_CONFIG.domain,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "697",
      highPrice: "1297",
      offerCount: "2",
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Branchen",
        item: `${SITE_CONFIG.domain}/branche`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: template.name,
        item: `${SITE_CONFIG.domain}/branche/${template.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: stadt.name,
        item: `${SITE_CONFIG.domain}/branche/${template.slug}/${stadt.slug}`,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-[#0A0F1C]">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pb-0 pt-28 sm:px-6 lg:px-8">
          <nav className="text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-gray-500">
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
              <li>
                <Link
                  href={`/branche/${template.slug}`}
                  className="hover:text-blue-400"
                >
                  {template.name}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">{stadt.name}</li>
            </ol>
          </nav>
        </div>

        <BranchePageContent template={template} stadtName={stadt.name} />

        {/* Andere Städte */}
        <section className="border-t border-white/5 bg-gray-950/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              {template.name} in weiteren Städten
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
              Aufwind AI ist deutschlandweit verfügbar. Entdecke unsere
              Lösungen für {template.name} in weiteren Städten:
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {STAEDTE.filter((s) => s.slug !== stadt.slug)
                .slice(0, 20)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/branche/${template.slug}/${s.slug}`}
                    className="rounded-lg border border-white/10 bg-gray-900/50 px-4 py-3 text-sm text-gray-300 transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-gray-900/80 hover:text-white"
                  >
                    {template.name} {s.name}
                  </Link>
                ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={`/branche/${template.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Alle Städte ansehen →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
