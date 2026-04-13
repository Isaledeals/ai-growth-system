'use client'

import dynamic from 'next/dynamic'

const MeshGradientInner = dynamic(
  () =>
    import('@paper-design/shaders-react').then((mod) => {
      const { MeshGradient } = mod
      function MeshGradientComponent() {
        return (
          <div className="absolute inset-0 -z-10">
            <MeshGradient
              colors={['#0A0F1C', '#1e3a5f', '#064e3b', '#0f172a', '#1e2d5a']}
              speed={0.3}
              distortion={0.6}
              swirl={0.08}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )
      }
      return MeshGradientComponent
    }),
  { ssr: false }
)

export default function MeshGradientBg() {
  return <MeshGradientInner />
}
