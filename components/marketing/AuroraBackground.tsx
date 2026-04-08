'use client'

// Light-theme background: very subtle static blue/slate gradient blobs
// Replaces the dark aurora orbs. No animations to keep it clean and professional.

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white"
    >
      {/* Top-right soft blue blob */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '60vmax',
          height: '60vmax',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Bottom-left accent blob */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '50vmax',
          height: '50vmax',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  )
}
