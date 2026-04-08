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
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-100/80'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-[width] duration-150 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundImage: 'linear-gradient(90deg, #2563EB, #3B82F6)',
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll-Fortschritt"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          {/* Logo mark */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-black"
            style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}
            aria-hidden="true"
          >
            A
          </div>
          <span className="text-slate-900">
            Aufwind{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}
            >
              AI
            </span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE_CONFIG.bookingUrl}
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            Demo buchen
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
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
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
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
