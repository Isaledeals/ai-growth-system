import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface FooterDict {
  tagline: string
  columns: {
    product: { title: string; links: { label: string; href: string }[] }
    company: { title: string; links: { label: string; href: string }[] }
    legal: { title: string; links: { label: string; href: string }[] }
  }
  copyright: string
  madeIn: string
}

const defaultFooterDict: FooterDict = {
  tagline: 'Das KI-System für lokale Unternehmen in Deutschland.',
  columns: {
    product: { title: 'Produkt', links: [{ label: 'KI-Module', href: '#module' }, { label: 'Preise', href: '#preise' }, { label: 'ROI-Rechner', href: '#roi' }, { label: 'FAQ', href: '#faq' }] },
    company: { title: 'Unternehmen', links: [{ label: "So funktioniert's", href: '#so-funktionierts' }, { label: 'Case Studies', href: '#ergebnisse' }, { label: 'Demo buchen', href: '' }, { label: 'Kontakt', href: '' }] },
    legal: { title: 'Rechtliches', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Datenschutz', href: '/datenschutz' }, { label: 'AGB', href: '/agb' }] },
  },
  copyright: 'Alle Rechte vorbehalten.',
  madeIn: 'Entwickelt in Deutschland · DSGVO-konform',
}

const socialLinks: { icon: ReactNode; href: string; label: string }[] = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-slate-900">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ dict = defaultFooterDict }: { dict?: FooterDict }) {
  const productLinks = dict.columns.product.links
  const companyLinks = dict.columns.company.links.map((l) => ({
    ...l,
    href: l.href || (l.label.toLowerCase().includes('demo') ? SITE_CONFIG.bookingUrl : `mailto:${SITE_CONFIG.email}`),
  }))
  const legalLinks = dict.columns.legal.links

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top area */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
                style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}
                aria-hidden="true"
              >
                A
              </div>
              <span className="text-xl font-bold text-slate-900">
                Aufwind{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}
                >
                  AI
                </span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {dict.tagline}
            </p>

            {/* Contact info */}
            <div className="mt-5 flex flex-col gap-1.5">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkColumn title={dict.columns.product.title} links={productLinks} />
          <FooterLinkColumn title={dict.columns.company.title} links={companyLinks} />
          <FooterLinkColumn title={dict.columns.legal.title} links={legalLinks} />
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-slate-200" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Aufwind AI. {dict.copyright}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <p className="text-xs text-slate-400">
              {dict.madeIn}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
