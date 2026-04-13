'use client'

import { type ReactNode } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
}

export default function AnimatedBorder({ children, className = '', borderWidth = 2 }: AnimatedBorderProps) {
  return (
    <div className={`relative rounded-2xl ${className}`}>
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-75"
        style={{
          background: 'conic-gradient(from var(--border-angle, 0deg), #3B82F6, #10B981, #34D399, #3B82F6)',
          animation: 'border-spin 4s linear infinite',
          padding: `${borderWidth}px`,
        }}
      />
      {/* Content */}
      <div className="relative rounded-2xl bg-[#0A0F1C]">
        {children}
      </div>
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes border-spin {
          to { --border-angle: 360deg; }
        }
      `}</style>
    </div>
  )
}
