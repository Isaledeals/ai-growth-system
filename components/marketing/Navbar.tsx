'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
  { label: 'Funktionen', href: '#module' },
  { label: 'Preise', href: '#preise' },
  { label: 'Branchen', href: '#branchen' },
  { label: 'Über uns', href: '#demo' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-black shadow-lg"
            style={{ background: 'linear-gradient(135deg, #2563EB, #059669)' }}
            aria-hidden="true"
          >
            A
          </div>
          <span className={`transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            Aufwind{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA, #34D399)' }}
            >
              AI
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE_CONFIG.bookingUrl}
            className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                : 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
            }`}
          >
            Demo buchen
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 transition-colors md:hidden ${
            scrolled
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' as const }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0F1C]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE_CONFIG.bookingUrl}
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700"
              >
                Demo buchen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
