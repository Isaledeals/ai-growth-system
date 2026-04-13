'use client'

import { type ReactNode } from 'react'

interface ShimmerButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ShimmerButton({ children, href, onClick, className = '', size = 'md' }: ShimmerButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-12 py-5 text-lg',
  }

  const inner = (
    <span className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] ${sizeClasses[size]} ${className}`}>
      {/* Shimmer overlay */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </span>
  )

  if (href) {
    return <a href={href}>{inner}</a>
  }
  return <button onClick={onClick} type="button">{inner}</button>
}
