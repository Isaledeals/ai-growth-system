'use client'

interface ShinyTextProps {
  children: string
  className?: string
  speed?: number // seconds for one cycle
}

export default function ShinyText({ children, className = '', speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #3B82F6 35%, #10B981 45%, #34D399 50%, #10B981 55%, #3B82F6 65%)',
        backgroundSize: '250% 100%',
        animation: `shiny-sweep ${speed}s ease-in-out infinite`,
      }}
    >
      {children}
      <style>{`
        @keyframes shiny-sweep {
          0% { background-position: 100% 50%; }
          100% { background-position: -50% 50%; }
        }
      `}</style>
    </span>
  )
}
